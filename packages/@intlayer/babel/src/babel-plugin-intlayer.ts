import type { PluginObj, PluginPass } from '@babel/core';
import { parse } from '@babel/parser';
import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import {
  generateDictionaryListContent,
  getBuiltDictionariesPath,
} from '@intlayer/chokidar';
import { getAppLogger, getConfiguration } from '@intlayer/config';
import { extname, relative, sep } from 'path';

type PluginState = PluginPass & {
  opts: {
    enableTransform?: boolean;
  };
  // Add tracking for imports per file
  importedPackages?: Set<string>;
  hasValidIntlayerImport?: boolean;
};

// ────────────────────────────────────────────────────────────
// shared state across ALL files (1 build = 1 Node process)
const PACKAGE_LIST = [
  'react-intlayer',
  'react-intlayer/client',
  'react-intlayer/server',
  'next-intlayer',
  'next-intlayer/server',
  'next-intlayer/client',
  'svelte-intlayer',
  'vue-intlayer',
  'angular-intlayer',
  'preact-intlayer',
  'solid-intlayer',
];
const CALLER_LIST = ['useIntlayer', 'getIntlayer'];
const globalUsedKeys = new Set<string>();
let isThreeShakable = true;
// ────────────────────────────────────────────────────────────

// Helper function to check if file is in contentDir
const isFileInContentDir = (
  filePath: string,
  contentDirs: string[]
): boolean => {
  return contentDirs.some((dir) => {
    const normalizedDir = dir.replace(/[/\\]+$/, '');
    return filePath.startsWith(normalizedDir);
  });
};

// Helper function to check if import is from valid package
const isValidIntlayerImport = (source: string): boolean => {
  return PACKAGE_LIST.includes(source);
};

export const babelPluginIntlayer = (): PluginObj<PluginState> => {
  const configuration = getConfiguration();
  const dictionariesRoot: string = configuration.content.mainDir.replace(
    /[/\\]+$/,
    ''
  );
  const contentDir: string[] = configuration.content.contentDir;
  const appLogger = getAppLogger(configuration);

  return {
    name: 'babel-plugin-intlayer-prune',

    visitor: {
      Program: {
        enter(_programPath, state: PluginState) {
          // Initialize per-file state
          state.importedPackages = new Set<string>();
          state.hasValidIntlayerImport = false;

          const filePath: string = state.file.opts.filename ?? '';

          // Skip files that are not in contentDir
          if (!isFileInContentDir(filePath, contentDir)) {
            return;
          }
        },

        /*
         * After the whole file has been walked, decide if THIS file is the
         * dictionary entry-point.  If it is, swap its body for the generated
         * code that imports only the used dictionaries.
         */
        exit(programPath, state: PluginState) {
          const filePath: string = state.file.opts.filename ?? '';

          // Skip files that are not in contentDir
          if (!isFileInContentDir(filePath, contentDir)) return;

          // Skip files is bundle is not three-shakable
          if (!isThreeShakable) return;

          // Is this *the* entry-point we want to shrink?
          if (!filePath.startsWith(dictionariesRoot)) return;

          const keys = Array.from(globalUsedKeys);
          if (!keys.length) return; // nothing collected yet – leave the file untouched

          const extension = extname(filePath); // .js / .mjs / .cjs
          const format = extension === '.cjs' ? 'cjs' : 'esm';

          // Pick only the dictionaries whose basename matches a collected key
          const dictionaries = getBuiltDictionariesPath(configuration).filter(
            (p) => keys.some((k) => p.endsWith(`${sep}${k}.json`))
          );

          const generatedSrc = generateDictionaryListContent(
            dictionaries,
            format,
            configuration
          );
          if (!generatedSrc) return;

          // Replace the current AST with the new one
          const newAst = parse(generatedSrc, {
            sourceType: format === 'cjs' ? 'script' : 'module',
            plugins: ['importMeta'],
          });

          appLogger('Unused dictionaries pruned to reduce bundle size', {
            level: 'info',
          });

          // Clear and inject
          programPath.node.body = [];
          programPath.pushContainer('body', newAst.program.body);

          // Optional: mark the file as "transformed" for other tooling
          state.file.metadata = {
            ...state.file.metadata,
            intlayerPruned: true,
          };
        },
      },

      ImportDeclaration(
        path: NodePath<t.ImportDeclaration>,
        state: PluginState
      ) {
        const filePath: string = state.file.opts.filename ?? '';

        // Skip files that are not in contentDir
        if (!isFileInContentDir(filePath, contentDir)) {
          return;
        }

        const source = path.node.source.value;
        state.importedPackages?.add(source);

        // Check if this import is from a valid intlayer package
        if (isValidIntlayerImport(source)) {
          // Check if any of the imported specifiers include useIntlayer or getIntlayer
          const hasIntlayerFunction = path.node.specifiers.some((specifier) => {
            if (
              t.isImportSpecifier(specifier) &&
              t.isIdentifier(specifier.imported)
            ) {
              return CALLER_LIST.includes(specifier.imported.name);
            }
            return false;
          });

          if (hasIntlayerFunction) {
            state.hasValidIntlayerImport = true;
          }
        }
      },

      CallExpression(path: NodePath<t.CallExpression>, state: PluginState) {
        const filePath: string = state.file.opts.filename ?? '';

        // Skip files that are not in contentDir
        if (!isFileInContentDir(filePath, contentDir)) return;
        if (!isThreeShakable) return;

        const { node } = path;

        const renderError = (message: string) => {
          const filePath: string = state.file.opts.filename ?? '';

          // Generate code frame to show the error context
          const codeFrame = path.buildCodeFrameError('').message;

          console.info(''); // For formating
          appLogger(message, {
            level: 'error',
          });
          appLogger(`At ${relative(process.cwd(), filePath)}`, {
            level: 'error',
          });
          appLogger(codeFrame.split('\n').slice(1).join('\n'), {
            level: 'error',
          });
        };

        if (
          t.isIdentifier(node.callee) &&
          CALLER_LIST.includes(node.callee.name)
        ) {
          // Check if the function is imported from a valid package
          if (!state.hasValidIntlayerImport) {
            isThreeShakable = false;

            renderError(
              `For dictionary optimization to work, ${node.callee.name} must be imported from one of these packages: ${PACKAGE_LIST.join(', ')}`
            );
            return;
          }

          // Check if arguments exist
          if (!node.arguments.length) {
            isThreeShakable = false;

            renderError(`${node.callee.name} requires at least one argument`);

            return;
          }

          // Check if the first argument is a string literal
          if (!t.isStringLiteral(node.arguments[0])) {
            isThreeShakable = false;

            renderError(
              `For dictionary optimization to work, ${node.callee.name} key must be a literal string, otherwise tree shaking cannot be performed properly`
            );
            return;
          }

          globalUsedKeys.add(node.arguments[0].value);
        }
      },
    },
  };
};

import type { NodePath, PluginObj, PluginPass } from '@babel/core';
import * as t from '@babel/types';
import { getFileHash } from '@intlayer/chokidar';
import { dirname, join, relative } from 'node:path';

/* ────────────────────────────────────────── constants ───────────────────── */

const PACKAGE_LIST = [
  'react-intlayer',
  'react-intlayer/client',
  'react-intlayer/server',
  'next-intlayer',
  'next-intlayer/client',
  'next-intlayer/server',
  'svelte-intlayer',
  'vue-intlayer',
  'angular-intlayer',
  'preact-intlayer',
  'solid-intlayer',
];

const CALLER_LIST = ['useIntlayer', 'getIntlayer'] as const;

/* ────────────────────────────────────────── types ───────────────────────── */

type State = PluginPass & {
  opts: { dictionariesDir: string; dictionariesEntryPath: string };
  /** map key → generated ident (per-file) */
  _newImports?: Map<string, t.Identifier>;
  /** whether the current file imported *any* intlayer package */
  _hasValidImport?: boolean;
  /** whether the current file *is* the dictionaries entry file */
  _isDictEntry?: boolean;
};

/* ────────────────────────────────────────── helpers ─────────────────────── */

/**
 * Replicates the xxHash64 → Base-62 algorithm used by the SWC version
 * and prefixes an underscore so the generated identifiers never collide
 * with user-defined ones.
 */
const makeIdent = (key: string): t.Identifier => {
  const hash = getFileHash(key);
  return t.identifier(`_${hash}`);
};

const computeRelativeImport = (
  fromFile: string,
  dictDir: string,
  key: string
): string => {
  const jsonPath = join(dictDir, `${key}.json`);
  let rel = relative(dirname(fromFile), jsonPath).replace(/\\/g, '/'); // win →
  if (!rel.startsWith('./') && !rel.startsWith('../')) rel = `./${rel}`;
  return rel;
};

/* ────────────────────────────────────────── plugin ──────────────────────── */

/**
 * Babel plugin that transforms `useIntlayer/getIntlayer` calls into
 * `useDictionary/getDictionary` and auto-imports the required JSON dictionaries.
 *
 * **New behaviour**: if the currently processed file matches `dictionariesEntryPath`,
 * its entire contents are replaced with a simple `export default {}` so that it
 * never contains stale or circular references.
 *
 * The **critical detail** (bug-fix) is that we still **only rewrite** an import
 * specifier when its *imported* name is `useIntlayer`/`getIntlayer`.
 *
 * This means cases like:
 * ```ts
 * import { useDictionary as useIntlayer } from 'react-intlayer';
 * ```
 * —where `useIntlayer` is merely an *alias* or re-export—are left untouched
 * because `imported.name` is `useDictionary`.
 */
export const intlayerBabelPlugin = (): PluginObj<State> => {
  return {
    name: 'babel-plugin-intlayer-transform',

    pre() {
      this._newImports = new Map();
      this._hasValidImport = false;
      this._isDictEntry = false;
    },

    visitor: {
      /* 0. If this file *is* the dictionaries entry, short-circuit: export {} */
      Program: {
        enter(programPath, state) {
          const filename = state.file.opts.filename!;
          if (filename === state.opts.dictionariesEntryPath) {
            state._isDictEntry = true;
            // Replace all existing statements with: export default {}
            programPath.node.body = [
              t.exportDefaultDeclaration(t.objectExpression([])),
            ];
            // Stop further traversal for this plugin – nothing else to transform
            programPath.stop();
          }
        },

        /* 3. After full traversal, inject the JSON dictionary imports. */
        exit(programPath, state) {
          if (state._isDictEntry) return; // nothing else to do – already replaced
          if (!state._hasValidImport) return; // early-out if we touched nothing

          const file = state.file.opts.filename!;
          const dictDir = state.opts.dictionariesDir;
          const imports: t.ImportDeclaration[] = [];

          for (const [key, ident] of state._newImports!) {
            const rel = computeRelativeImport(file, dictDir, key);
            imports.push(
              t.importDeclaration(
                [t.importDefaultSpecifier(t.identifier(ident.name))],
                t.stringLiteral(rel)
              )
            );
          }

          if (!imports.length) return;

          /* Keep "use client" / "use server" directives at the very top. */
          const bodyPaths = programPath.get('body') as NodePath<t.Statement>[];
          let insertPos = 0;
          for (const stmtPath of bodyPaths) {
            const stmt = stmtPath.node;
            if (
              t.isExpressionStatement(stmt) &&
              t.isStringLiteral(stmt.expression) &&
              (stmt.expression.value === 'use client' ||
                stmt.expression.value === 'use server')
            ) {
              insertPos += 1;
            } else {
              break;
            }
          }

          programPath.node.body.splice(insertPos, 0, ...imports);
        },
      },

      /* 1. Inspect *every* intlayer import. */
      ImportDeclaration(path, state) {
        if (state._isDictEntry) return; // skip if entry file – already handled

        const src = path.node.source.value;
        if (!PACKAGE_LIST.includes(src)) return;

        // Mark that we do import from an intlayer package in this file; this is
        // enough to know that we *might* need to inject runtime helpers later.
        state._hasValidImport = true;

        for (const spec of path.node.specifiers) {
          if (!t.isImportSpecifier(spec)) continue;

          // ⚠️  We now key off *imported* name, *not* local name.
          const importedName = t.isIdentifier(spec.imported)
            ? spec.imported.name
            : (spec.imported as t.StringLiteral).value;

          if (importedName === 'useIntlayer') {
            spec.imported = t.identifier('useDictionary');
          } else if (importedName === 'getIntlayer') {
            spec.imported = t.identifier('getDictionary');
          }
        }
      },

      /* 2. Replace calls: useIntlayer("foo") → useDictionary(_hash) */
      CallExpression(path, state) {
        if (state._isDictEntry) return; // skip if entry file – already handled

        const callee = path.node.callee;
        if (!t.isIdentifier(callee)) return;
        if (!CALLER_LIST.includes(callee.name as any)) return;

        // Ensure we ultimately emit helper imports for files that *invoke*
        // the hooks, even if they didn’t import them directly (edge cases with
        // re-exports).
        state._hasValidImport = true;

        const arg = path.node.arguments[0];
        if (!arg || !t.isStringLiteral(arg)) return; // must be literal

        const key = arg.value;
        // per-file cache
        let ident = state._newImports!.get(key);
        if (!ident) {
          ident = makeIdent(key);
          state._newImports!.set(key, ident);
        }

        // replace first arg with ident
        path.node.arguments[0] = t.identifier(ident.name);
      },
    },
  };
};

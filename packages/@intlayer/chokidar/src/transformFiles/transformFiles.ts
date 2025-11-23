import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import {
  ANSIColors,
  camelCaseToKebabCase,
  colorizePath,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { Node, Project, type SourceFile, SyntaxKind } from 'ts-morph';
import { writeContentDeclaration } from '../writeContentDeclaration';
import { detectFormatCommand } from '../writeContentDeclaration/detectFormatCommand';
import { extractDictionaryKey } from './extractDictionaryKey';

// ==========================================
// 1. Shared Utilities
// ==========================================

const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
];

const shouldExtract = (text: string): boolean => {
  const trimmed = text.trim();
  if (!trimmed) return false;
  if (!trimmed.includes(' ')) return false;
  // Starts with Capital letter
  if (!/^[A-Z]/.test(trimmed)) return false;
  // Filter out template logic identifiers (simple check)
  if (trimmed.startsWith('{') || trimmed.startsWith('v-')) return false;
  return true;
};

const generateKey = (text: string, existingKeys: Set<string>): string => {
  const maxWords = 5;
  let key = text
    .replace(/\s+/g, ' ')
    .replace(/_+/g, ' ')
    .replace(/-+/g, ' ')
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, maxWords)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  if (!key) key = 'content';
  if (existingKeys.has(key)) {
    let i = 1;
    while (existingKeys.has(`${key}${i}`)) i++;
    key = `${key}${i}`;
  }
  return key;
};

const writeContentHelper = async (
  extractedContent: Record<string, string>,
  componentKey: string,
  filePath: string,
  configuration: IntlayerConfig,
  outputDir?: string
) => {
  const { defaultLocale } = configuration.internationalization;
  const { baseDir } = configuration.content;

  const dirName = outputDir ? resolve(outputDir) : dirname(filePath);
  const ext = extname(filePath);
  const baseName = basename(filePath, ext);
  const contentBaseName = baseName.charAt(0).toLowerCase() + baseName.slice(1);

  const contentFilePath = join(dirName, `${contentBaseName}.content.ts`);
  const relativeContentFilePath = relative(baseDir, contentFilePath);

  const dictionary: Dictionary = {
    key: componentKey,
    content: extractedContent,
    locale: defaultLocale,
    filePath: relativeContentFilePath,
  };

  const relativeDir = relative(baseDir, dirName);
  await writeContentDeclaration(dictionary, configuration, {
    newDictionariesPath: relativeDir,
  });

  return contentFilePath;
};

type TsReplacement = {
  node: Node;
  key: string;
  type: 'jsx-text' | 'jsx-attribute' | 'string-literal';
};

const extractTsContent = (
  sourceFile: SourceFile,
  existingKeys: Set<string>
): {
  extractedContent: Record<string, string>;
  replacements: TsReplacement[];
} => {
  const extractedContent: Record<string, string> = {};
  const replacements: TsReplacement[] = [];

  sourceFile.forEachDescendant((node) => {
    // 1. JSX Text
    if (Node.isJsxText(node)) {
      const text = node.getText();
      if (shouldExtract(text)) {
        const key = generateKey(text, existingKeys);
        existingKeys.add(key);
        extractedContent[key] = text.replace(/\s+/g, ' ').trim();
        replacements.push({ node, key, type: 'jsx-text' });
      }
    }

    // 2. JSX Attributes
    else if (Node.isJsxAttribute(node)) {
      const name = node.getNameNode().getText();
      if (ATTRIBUTES_TO_EXTRACT.includes(name)) {
        const initializer = node.getInitializer();
        if (Node.isStringLiteral(initializer)) {
          const text = initializer.getLiteralValue();
          if (shouldExtract(text)) {
            const key = generateKey(text, existingKeys);
            existingKeys.add(key);
            extractedContent[key] = text.trim();
            replacements.push({ node, key, type: 'jsx-attribute' });
          }
        }
      }
    }

    // 3. String Literals (Variables, Arrays, etc.)
    else if (Node.isStringLiteral(node)) {
      const text = node.getLiteralValue();
      if (shouldExtract(text)) {
        const parent = node.getParent();

        // Skip if inside ImportDeclaration
        if (
          parent?.getKindName() === 'ImportDeclaration' ||
          parent?.getKindName() === 'ImportSpecifier' ||
          parent?.getKindName() === 'ModuleSpecifier'
        ) {
          return;
        }

        // Skip if it's a JSX Attribute value (handled above)
        if (Node.isJsxAttribute(parent)) return;

        // Skip console.log
        if (Node.isCallExpression(parent)) {
          const expression = parent.getExpression();
          if (expression.getText().includes('console.log')) return;
        }

        // Skip Object Keys: { key: "value" } -> "key" is PropertyAssignment name if not computed
        if (Node.isPropertyAssignment(parent)) {
          if (parent.getNameNode() === node) return; // It's the key
        }

        const key = generateKey(text, existingKeys);
        existingKeys.add(key);
        extractedContent[key] = text.trim();
        replacements.push({ node, key, type: 'string-literal' });
      }
    }
  });

  return { extractedContent, replacements };
};

// ==========================================
// 2. React (TS-Morph) Strategy
// ==========================================

const processReactFile = async (
  filePath: string,
  componentKey: string,
  packageName: string,
  project: Project,
  save: boolean = true
) => {
  let sourceFile: SourceFile;
  try {
    sourceFile = project.addSourceFileAtPath(filePath);
  } catch {
    sourceFile = project.getSourceFileOrThrow(filePath);
  }

  const existingKeys = new Set<string>();
  const { extractedContent, replacements } = extractTsContent(
    sourceFile,
    existingKeys
  );

  if (Object.keys(extractedContent).length === 0) return null;

  for (const { node, key, type } of replacements) {
    if (type === 'jsx-text' && Node.isJsxText(node)) {
      node.replaceWithText(`{content.${key}}`);
    } else if (type === 'jsx-attribute' && Node.isJsxAttribute(node)) {
      node.setInitializer(`{content.${key}.value}`);
    } else if (type === 'string-literal' && Node.isStringLiteral(node)) {
      // For React/JS variables, we usually want the value
      node.replaceWithText(`content.${key}.value`);
    }
  }

  // Inject hook
  const importDecl = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === packageName
  );
  if (!importDecl) {
    sourceFile.addImportDeclaration({
      namedImports: ['useIntlayer'],
      moduleSpecifier: packageName,
    });
  } else if (
    !importDecl.getNamedImports().some((n) => n.getName() === 'useIntlayer')
  ) {
    importDecl.addNamedImport('useIntlayer');
  }

  // Insert hook at start of component
  sourceFile.getFunctions().forEach((f) => {
    f.getBody()
      ?.asKind(SyntaxKind.Block)
      ?.insertStatements(0, `const content = useIntlayer("${componentKey}");`);
  });

  // Also handle const/arrow components
  sourceFile.getVariableDeclarations().forEach((v) => {
    const init = v.getInitializer();
    if (Node.isArrowFunction(init) || Node.isFunctionExpression(init)) {
      const body = init.getBody();
      if (Node.isBlock(body)) {
        // Heuristic: check if it returns JSX or uses hooks
        if (
          body.getText().includes('return') ||
          body.getText().includes('use')
        ) {
          body.insertStatements(
            0,
            `const content = useIntlayer("${componentKey}");`
          );
        }
      }
    }
  });

  if (save) {
    await sourceFile.save();
  }
  return extractedContent;
};

// ==========================================
// 5. Main Dispatcher
// ==========================================

export type PackageName =
  | 'next-intlayer'
  | 'react-intlayer'
  | 'vue-intlayer'
  | 'svelte-intlayer'
  | 'preact-intlayer'
  | 'solid-intlayer'
  | 'angular-intlayer'
  | 'express-intlayer';

export type ExtractIntlayerOptions = {
  configOptions?: GetConfigurationOptions;
  outputDir?: string;
  codeOnly?: boolean;
  declarationOnly?: boolean;
};

export const extractIntlayer = async (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayerOptions,
  project?: Project
) => {
  const saveComponent = !options?.declarationOnly;
  const writeContent = !options?.codeOnly;

  const configuration = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);
  const { baseDir } = configuration.content;

  // Setup Project for TS/React files if needed
  const _project =
    project || new Project({ skipAddingFilesFromTsConfig: true });

  const baseName = extractDictionaryKey(
    filePath,
    (await fs.readFile(filePath)).toString()
  );
  const componentKey = camelCaseToKebabCase(baseName);
  const ext = extname(filePath);

  let extractedContent: Record<string, string> | null = null;

  if (ext === '.vue') {
    try {
      const { processVueFile } = (await import(
        '@intlayer/vue-transformer'
      )) as any;
      extractedContent = await processVueFile(
        filePath,
        componentKey,
        packageName,
        {
          generateKey,
          shouldExtract,
          extractTsContent,
        },
        saveComponent
      );
    } catch (error: any) {
      if (
        error.code === 'ERR_MODULE_NOT_FOUND' ||
        error.message?.includes('Cannot find module')
      ) {
        throw new Error(
          `Please install ${colorizePath('@intlayer/vue-transformer', ANSIColors.YELLOW)} to process Vue files.`
        );
      }
      throw error;
    }
  } else if (ext === '.svelte') {
    try {
      const { processSvelteFile } = (await import(
        '@intlayer/svelte-transformer'
      )) as any;
      extractedContent = await processSvelteFile(
        filePath,
        componentKey,
        packageName,
        {
          generateKey,
          shouldExtract,
          extractTsContent,
        },
        saveComponent
      );
    } catch (error: any) {
      if (
        error.code === 'ERR_MODULE_NOT_FOUND' ||
        error.message?.includes('Cannot find module')
      ) {
        throw new Error(
          `Please install ${colorizePath('@intlayer/svelte-transformer', ANSIColors.YELLOW)} to process Svelte files.`
        );
      }
      throw error;
    }
  } else if (['.tsx', '.jsx', '.ts', '.js'].includes(ext)) {
    extractedContent = await processReactFile(
      filePath,
      componentKey,
      packageName,
      _project,
      saveComponent
    );
  }

  if (!extractedContent) {
    appLogger(`No extractable text found in ${baseName}`);
    return;
  }

  // Shared Write Logic
  if (writeContent) {
    const contentFilePath = await writeContentHelper(
      extractedContent,
      componentKey,
      filePath,
      configuration,
      options?.outputDir
    );

    const relativeContentFilePath = relative(
      configuration.content.baseDir,
      contentFilePath
    );
    appLogger(`Created content file: ${colorizePath(relativeContentFilePath)}`);
  }

  // Optional: Format
  if (saveComponent) {
    try {
      const formatCommand = detectFormatCommand(configuration);
      if (formatCommand) {
        execSync(formatCommand.replace('{{file}}', filePath), {
          stdio: 'ignore', // Silent
          cwd: baseDir,
        });
      }
    } catch {
      // Ignore format errors
    }

    appLogger(
      `Updated component: ${colorizePath(relative(baseDir, filePath))}`
    );
  }
};

export const transformFiles = async (
  filePaths: string[],
  packageName: PackageName,
  options?: ExtractIntlayerOptions
) => {
  const configuration = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  const project = new Project({
    skipAddingFilesFromTsConfig: true,
  });

  for (const filePath of filePaths) {
    try {
      await extractIntlayer(filePath, packageName, options, project);
    } catch (error) {
      appLogger(`Failed to transform ${filePath}: ${(error as Error).message}`);
    }
  }
};

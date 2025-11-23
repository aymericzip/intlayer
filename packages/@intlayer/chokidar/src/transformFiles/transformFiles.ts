import { execSync } from 'node:child_process';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import {
  camelCaseToKebabCase,
  colorizePath,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { Node, Project, type SourceFile } from 'ts-morph';
import { writeContentDeclaration } from '../writeContentDeclaration';
import { detectFormatCommand } from '../writeContentDeclaration/detectFormatCommand';
import { extractDictionaryKey } from './extractDictionaryKey';

const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
];

const generateKey = (text: string, existingKeys: Set<string>): string => {
  const maxWords = 5;
  let key = text
    .replace(/\s+/g, ' ') // Normalize whitespace to single spaces
    .replace(/[^a-zA-Z0-9 ]/g, '') // Remove special chars
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

  // Fallback for empty keys (e.g. only symbols)
  if (!key) key = 'content';

  // Handle duplicates
  if (existingKeys.has(key)) {
    let i = 1;
    while (existingKeys.has(`${key}${i}`)) i++;
    key = `${key}${i}`;
  }

  return key;
};

type Replacement = {
  node: Node;
  key: string;
  type: 'jsx-text' | 'jsx-attribute' | 'string-literal';
};

export const shouldExtract = (text: string): boolean => {
  const trimmed = text.trim();
  // 1. Must have some text
  if (!trimmed) return false;
  // 2. Must contain spaces (not a single camelCase/kebab-case word)
  if (!trimmed.includes(' ')) return false;
  // 3. Must start with a capital letter
  // We check the first non-whitespace character
  if (!/^[A-Z]/.test(trimmed)) return false;

  return true;
};

/**
 * 1. Extraction of content
 */
export const extractContent = (sourceFile: SourceFile) => {
  const extractedContent: Record<string, string> = {};
  const existingKeys = new Set<string>();
  const replacements: Replacement[] = [];

  const processText = (text: string, node: Node, type: Replacement['type']) => {
    if (!shouldExtract(text)) return;

    const key = generateKey(text.trim(), existingKeys);
    existingKeys.add(key);
    extractedContent[key] =
      type === 'jsx-text' ? text.replace(/\s+/g, ' ').trim() : text.trim();
    replacements.push({ node, key, type });
  };

  sourceFile.forEachDescendant((node) => {
    // Case A: JSX Text (e.g., <h2>Title</h2>)
    if (Node.isJsxText(node)) {
      processText(node.getText(), node, 'jsx-text');
    }

    // Case B: JSX Attributes (e.g., placeholder="Search")
    if (Node.isJsxAttribute(node)) {
      const name = node.getNameNode().getText();
      if (ATTRIBUTES_TO_EXTRACT.includes(name)) {
        const initializer = node.getInitializer();
        if (Node.isStringLiteral(initializer)) {
          processText(initializer.getLiteralValue(), node, 'jsx-attribute');
        }
      }
    }

    // Case C: String Literals in specific contexts
    if (Node.isStringLiteral(node)) {
      const parent = node.getParent();

      // 1. State initialization: useState('...')
      if (Node.isCallExpression(parent)) {
        const expression = parent.getExpression();
        if (
          Node.isIdentifier(expression) &&
          expression.getText() === 'useState'
        ) {
          processText(node.getLiteralValue(), node, 'string-literal');
        }
      }

      // 2. Ternary operators in JSX: { isTrue ? 'Text' : 'Other' }
      if (Node.isConditionalExpression(parent)) {
        // Check if this conditional is inside a JSX expression
        let current: Node | undefined = parent.getParent();
        let isInsideJsx = false;
        while (current) {
          if (Node.isJsxExpression(current)) {
            isInsideJsx = true;
            break;
          }
          if (Node.isBlock(current) || Node.isSourceFile(current)) break;
          current = current.getParent();
        }

        if (isInsideJsx) {
          processText(node.getLiteralValue(), node, 'string-literal');
        }
      }

      // 3. Array elements (simple heuristic: inside array literal)
      if (Node.isArrayLiteralExpression(parent)) {
        processText(node.getLiteralValue(), node, 'string-literal');
      }

      // 4. Object property values (e.g. { value: "Text" })
      if (Node.isPropertyAssignment(parent)) {
        const initializer = parent.getInitializer();
        if (initializer === node) {
          processText(node.getLiteralValue(), node, 'string-literal');
        }
      }

      // 5. Return statements
      if (Node.isReturnStatement(parent)) {
        processText(node.getLiteralValue(), node, 'string-literal');
      }
    }
  });

  return { extractedContent, replacements };
};

/**
 * 2. Write content declaration
 */
export const writeContent = async (
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

const isComponent = (node: Node): boolean => {
  let name: string | undefined;

  if (Node.isFunctionDeclaration(node)) {
    name = node.getName();
  } else if (Node.isFunctionExpression(node) || Node.isArrowFunction(node)) {
    const parent = node.getParent();
    if (Node.isVariableDeclaration(parent)) {
      name = parent.getName();
    }
  }

  if (!name) return false;
  // Check for PascalCase
  return /^[A-Z]/.test(name);
};

/**
 * 3. Transform component
 */
export const transformComponent = async (
  sourceFile: SourceFile,
  replacements: Replacement[],
  componentKey: string,
  packageName: string
) => {
  if (replacements.length === 0) return;

  const componentsToInjectHook = new Map<Node, 'hook' | 'function'>();

  for (const { node, key, type } of replacements) {
    // Find the parent function/component
    let current = node.getParent();
    while (current) {
      if (
        (Node.isFunctionDeclaration(current) ||
          Node.isArrowFunction(current) ||
          Node.isFunctionExpression(current)) &&
        // Ensure body exists and is a block for injection
        // Using explicit casting/checking to avoid "undefined" type error
        (() => {
          const body = (current as any).getBody?.();
          return body && Node.isBlock(body);
        })()
      ) {
        // Determine if it's a component or helper
        const isComp = isComponent(current);
        const injectionType = isComp ? 'hook' : 'function';

        // Check if we already decided on a type for this component
        const existing = componentsToInjectHook.get(current);
        if (!existing) {
          componentsToInjectHook.set(current, injectionType);
        } else if (existing === 'function' && injectionType === 'hook') {
          // Upgrade to hook if detected as component by another usage?
          // Actually, isComponent checks the definition, so it shouldn't change.
          // But strictness matters.
          componentsToInjectHook.set(current, 'hook');
        }

        break;
      }
      current = current.getParent();
    }

    const replaceText = (isJsx: boolean) => {
      const needsValue =
        !isJsx &&
        (packageName === 'react-intlayer' || packageName === 'next-intlayer');
      return needsValue ? `content.${key}.value` : `content.${key}`;
    };

    if (type === 'jsx-text' && Node.isJsxText(node)) {
      node.replaceWithText(`{${replaceText(true)}}`);
    } else if (type === 'jsx-attribute' && Node.isJsxAttribute(node)) {
      node.setInitializer(`{${replaceText(false)}}`);
    } else if (type === 'string-literal' && Node.isStringLiteral(node)) {
      node.replaceWithText(replaceText(false));
    }
  }

  let injectedUseIntlayer = false;
  let injectedGetIntlayer = false;

  // Inject hook/function in all affected components
  for (const [componentBody, injectionType] of componentsToInjectHook) {
    const body = (componentBody as any).getBody();
    if (Node.isBlock(body)) {
      const text = body.getText();
      const statement =
        injectionType === 'hook'
          ? `const content = useIntlayer("${componentKey}");`
          : `const content = getIntlayer("${componentKey}");`;

      // Check if already injected (naive check)
      if (
        !text.includes(`useIntlayer("${componentKey}")`) &&
        !text.includes(`getIntlayer("${componentKey}")`)
      ) {
        body.insertStatements(0, statement);
      }

      if (injectionType === 'hook') injectedUseIntlayer = true;
      if (injectionType === 'function') injectedGetIntlayer = true;
    }
  }

  // Insert Imports
  const isClientComponent =
    packageName === 'next-intlayer' &&
    (sourceFile.getText().includes('"use client"') ||
      sourceFile.getText().includes("'use client'"));

  // Determine import sources
  const useIntlayerSource =
    packageName === 'next-intlayer'
      ? isClientComponent
        ? 'next-intlayer'
        : 'next-intlayer/server'
      : packageName;

  // getIntlayer is always from 'next-intlayer' for next-intlayer package
  const getIntlayerSource =
    packageName === 'next-intlayer' ? 'next-intlayer' : packageName;

  // Handle useIntlayer import
  if (injectedUseIntlayer) {
    const existingUseIntlayerImport = sourceFile.getImportDeclaration(
      (d) => d.getModuleSpecifierValue() === useIntlayerSource
    );

    if (!existingUseIntlayerImport) {
      sourceFile.addImportDeclaration({
        namedImports: ['useIntlayer'],
        moduleSpecifier: useIntlayerSource,
      });
    } else {
      const currentNamedImports = existingUseIntlayerImport
        .getNamedImports()
        .map((n) => n.getName());
      if (!currentNamedImports.includes('useIntlayer')) {
        existingUseIntlayerImport.addNamedImport('useIntlayer');
      }
    }
  }

  // Handle getIntlayer import (always from 'next-intlayer' for next-intlayer package)
  if (injectedGetIntlayer) {
    const existingGetIntlayerImport = sourceFile.getImportDeclaration(
      (d) => d.getModuleSpecifierValue() === getIntlayerSource
    );

    if (!existingGetIntlayerImport) {
      sourceFile.addImportDeclaration({
        namedImports: ['getIntlayer'],
        moduleSpecifier: getIntlayerSource,
      });
    } else {
      const currentNamedImports = existingGetIntlayerImport
        .getNamedImports()
        .map((n) => n.getName());
      if (!currentNamedImports.includes('getIntlayer')) {
        existingGetIntlayerImport.addNamedImport('getIntlayer');
      }
    }
  }

  await sourceFile.save();
};

type ExtractIntlayer = {
  configOptions?: GetConfigurationOptions;
  outputDir?: string;
};

export type PackageName =
  | 'next-intlayer'
  | 'react-intlayer'
  | 'vue-intlayer'
  | 'preact-intlayer'
  | 'solid-intlayer'
  | 'angular-intlayer'
  | 'svelte-intlayer'
  | 'express-intlayer';

export const extractIntlayer = async (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayer,
  project?: Project
) => {
  const configuration = getConfiguration(options?.configOptions);
  const { baseDir } = configuration.content;
  const appLogger = getAppLogger(configuration);

  // Use provided project or create new one (optimized)
  const _project =
    project ||
    new Project({
      skipAddingFilesFromTsConfig: true,
    });

  let sourceFile: SourceFile;
  try {
    sourceFile = _project.addSourceFileAtPath(filePath);
  } catch {
    // If file is already added, get it
    sourceFile = _project.getSourceFileOrThrow(filePath);
  }

  const baseName = extractDictionaryKey(filePath, sourceFile.getText());
  const componentKey = camelCaseToKebabCase(baseName);

  // 1. Extract content
  const { extractedContent, replacements } = extractContent(sourceFile);

  if (Object.keys(extractedContent).length === 0) {
    appLogger(`No extractable text found in ${baseName}`);
    // Cleanup if we created the project just for this file
    if (!project) {
      // _project.removeSourceFile(sourceFile); // Not strictly necessary if process exits, but good practice
    }
    return;
  }

  // 2. Write content declaration
  const contentFilePath = await writeContent(
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

  // 3. Transform component
  await transformComponent(sourceFile, replacements, componentKey, packageName);

  try {
    const formatCommand = detectFormatCommand(configuration);

    if (formatCommand) {
      execSync(formatCommand.replace('{{file}}', filePath), {
        stdio: 'inherit',
        cwd: baseDir,
      });
    }
  } catch (error) {
    console.error(error);
  }

  const relativeFilePath = relative(baseDir, filePath);

  appLogger(`Updated component: ${colorizePath(relativeFilePath)}`);

  // Cleanup to free memory if we are processing many files and passed a persistent project?
  // If 'project' is passed, we probably want to keep it?
  // Actually, for a CLI command running once, memory growth is acceptable if not too huge.
  // But removing source file is safer if not needed anymore.
  if (project) {
    sourceFile.forget(); // Remove from project to save memory
  }
};

export const transformFiles = async (
  filePaths: string[],
  packageName: PackageName,
  options?: ExtractIntlayer
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

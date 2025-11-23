import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import {
  camelCaseToKebabCase,
  colorizePath,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { parse as parseVue } from '@vue/compiler-sfc';
import MagicString from 'magic-string';
import * as svelteCompiler from 'svelte/compiler'; // Works for Svelte 3/4/5
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
  project: Project
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

  await sourceFile.save();
  return extractedContent;
};

// ==========================================
// 3. Vue Strategy
// ==========================================

const processVueFile = async (
  filePath: string,
  componentKey: string,
  packageName: string
) => {
  const code = await fs.readFile(filePath, 'utf-8');
  const sfc = parseVue(code);
  const magic = new MagicString(code);

  const extractedContent: Record<string, string> = {};
  const existingKeys = new Set<string>();

  // 3a. Template Extraction
  if (sfc.descriptor.template) {
    const walkVueAst = (node: any) => {
      if (node.type === 2) {
        // NodeTypes.TEXT
        const text = node.content;
        if (shouldExtract(text)) {
          const key = generateKey(text, existingKeys);
          existingKeys.add(key);
          extractedContent[key] = text.replace(/\s+/g, ' ').trim();
          magic.overwrite(
            node.loc.start.offset,
            node.loc.end.offset,
            `{{ content.${key} }}`
          );
        }
      } else if (node.type === 1) {
        // NodeTypes.ELEMENT
        node.props.forEach((prop: any) => {
          if (
            prop.type === 6 && // NodeTypes.ATTRIBUTE
            ATTRIBUTES_TO_EXTRACT.includes(prop.name) &&
            prop.value
          ) {
            const text = prop.value.content;
            if (shouldExtract(text)) {
              const key = generateKey(text, existingKeys);
              existingKeys.add(key);
              extractedContent[key] = text.trim();
              magic.overwrite(
                prop.loc.start.offset,
                prop.loc.end.offset,
                `:${prop.name}="content.${key}"`
              );
            }
          }
        });
      }

      if (node.children) {
        node.children.forEach(walkVueAst);
      }
    };
    walkVueAst(sfc.descriptor.template.ast);
  }

  // 3b. Script Extraction
  const scriptBlock = sfc.descriptor.scriptSetup || sfc.descriptor.script;
  if (scriptBlock) {
    const scriptContent = scriptBlock.content;
    const scriptOffset = scriptBlock.loc.start.offset;
    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const sourceFile = project.createSourceFile('temp.ts', scriptContent);

    const { extractedContent: scriptExtracted, replacements } =
      extractTsContent(sourceFile, existingKeys);
    Object.assign(extractedContent, scriptExtracted);

    for (const { node, key } of replacements) {
      // Calculate absolute pos
      const start = scriptOffset + node.getStart();
      const end = scriptOffset + node.getEnd();
      magic.overwrite(start, end, `content.${key}`);
    }
  }

  if (Object.keys(extractedContent).length === 0) return null;

  // Inject Script
  const importStmt = `import { useIntlayer } from '${packageName}';`;
  const contentDecl = `const content = useIntlayer('${componentKey}');`;

  if (sfc.descriptor.scriptSetup) {
    magic.appendLeft(
      sfc.descriptor.scriptSetup.loc.start.offset,
      `\n${importStmt}\n${contentDecl}\n`
    );
  } else if (sfc.descriptor.script) {
    magic.appendLeft(
      sfc.descriptor.script.loc.start.offset,
      `\n${importStmt}\n${contentDecl}\n`
    );
  } else {
    magic.prepend(`<script setup>\n${importStmt}\n${contentDecl}\n</script>\n`);
  }

  await fs.writeFile(filePath, magic.toString());
  return extractedContent;
};

// ==========================================
// 4. Svelte Strategy
// ==========================================

const processSvelteFile = async (
  filePath: string,
  componentKey: string,
  packageName: string
) => {
  const code = await fs.readFile(filePath, 'utf-8');
  // @ts-ignore
  const ast = svelteCompiler.parse(code);
  const magic = new MagicString(code);

  const extractedContent: Record<string, string> = {};
  const existingKeys = new Set<string>();

  // 4a. Template Extraction
  const walkSvelte = (node: any) => {
    if (node.type === 'Text') {
      const text = node.data;
      if (shouldExtract(text)) {
        const key = generateKey(text, existingKeys);
        existingKeys.add(key);
        extractedContent[key] = text.replace(/\s+/g, ' ').trim();
        magic.overwrite(node.start, node.end, `{$content.${key}}`);
      }
    } else if (
      node.type === 'Attribute' &&
      ATTRIBUTES_TO_EXTRACT.includes(node.name)
    ) {
      if (
        node.value &&
        node.value.length === 1 &&
        node.value[0].type === 'Text'
      ) {
        const text = node.value[0].data;
        if (shouldExtract(text)) {
          const key = generateKey(text, existingKeys);
          existingKeys.add(key);
          extractedContent[key] = text.trim();
          magic.overwrite(
            node.start,
            node.end,
            `${node.name}={$content.${key}}`
          );
        }
      }
    }

    if (node.children) node.children.forEach(walkSvelte);
    else if (node.fragment?.children)
      node.fragment.children.forEach(walkSvelte);
    if (node.attributes) node.attributes.forEach(walkSvelte);
  };

  walkSvelte(ast.html);

  // 4b. Script Extraction
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
  const match = scriptRegex.exec(code);
  let scriptExtractedKeys = 0;

  if (match) {
    const scriptContent = match[1];
    // Offset: index + length of opening tag. match[0] is whole tag, match[1] is content.
    // match.index is start of <script...
    const openTagLength = match[0].indexOf(scriptContent);
    const scriptOffset = match.index + openTagLength;

    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const sourceFile = project.createSourceFile('temp.ts', scriptContent);

    const { extractedContent: scriptExtracted, replacements } =
      extractTsContent(sourceFile, existingKeys);
    Object.assign(extractedContent, scriptExtracted);
    scriptExtractedKeys = Object.keys(scriptExtracted).length;

    for (const { node, key } of replacements) {
      const start = scriptOffset + node.getStart();
      const end = scriptOffset + node.getEnd();
      magic.overwrite(start, end, `get(content).${key}`);
    }
  }

  if (Object.keys(extractedContent).length === 0) return null;

  // Inject Script
  const importStmt = `import { useIntlayer } from '${packageName}';`;
  const getImportStmt = `import { get } from 'svelte/store';`;
  const callStmt = `const content = useIntlayer('${componentKey}');`;

  if (match) {
    const scriptContentStart = match.index + match[0].indexOf('>') + 1;
    magic.appendLeft(
      scriptContentStart,
      `\n  ${importStmt}\n  ${scriptExtractedKeys > 0 ? getImportStmt : ''}\n  ${callStmt}\n`
    );
  } else {
    magic.prepend(`<script>\n  ${importStmt}\n  ${callStmt}\n</script>\n`);
  }

  await fs.writeFile(filePath, magic.toString());
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
};

export const extractIntlayer = async (
  filePath: string,
  packageName: PackageName,
  options?: { configOptions?: GetConfigurationOptions; outputDir?: string },
  project?: Project
) => {
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

  // --- DISPATCH BASED ON EXTENSION ---
  if (ext === '.vue') {
    extractedContent = await processVueFile(
      filePath,
      componentKey,
      packageName
    );
  } else if (ext === '.svelte') {
    extractedContent = await processSvelteFile(
      filePath,
      componentKey,
      packageName
    );
  } else if (['.tsx', '.jsx', '.ts', '.js'].includes(ext)) {
    extractedContent = await processReactFile(
      filePath,
      componentKey,
      packageName,
      _project
    );
  }

  if (!extractedContent) {
    appLogger(`No extractable text found in ${baseName}`);
    return;
  }

  // Shared Write Logic
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

  // Optional: Format
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

  appLogger(`Updated component: ${colorizePath(relative(baseDir, filePath))}`);
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

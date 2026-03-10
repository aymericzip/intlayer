import { readFile, writeFile } from 'node:fs/promises';
import { parse as babelParse, types as t, traverse } from '@babel/core';
import type { Locale } from '@intlayer/types/locale';
import vueSfc from '@vue/compiler-sfc';

export type ExtractedContent = Record<string, string>;

export type ExtractResult = {
  dictionaryKey: string;
  filePath: string;
  content: ExtractedContent;
  locale: Locale;
};

export type ExtractPluginOptions = {
  defaultLocale?: string;
  packageName?: string;
  filesList?: string[];
  shouldExtract?: (text: string) => boolean;
  onExtract?: (result: ExtractResult) => void;
  dictionaryKey?: string;
  attributesToExtract?: readonly string[];
  extractDictionaryKeyFromPath?: (path: string) => string;
  generateKey?: (text: string, existingKeys: Set<string>) => string;
};

type Replacement = {
  start: number;
  end: number;
  replacement: string;
  key: string;
  value: string;
};

export const shouldProcessFile = (
  filename: string | undefined,
  filesList?: string[]
): boolean => {
  if (!filename) return false;
  if (!filesList || filesList.length === 0) return true;

  const normalizedFilename = filename.replace(/\\/g, '/');
  return filesList.some((f) => {
    const normalizedF = f.replace(/\\/g, '/');
    return normalizedF === normalizedFilename;
  });
};

type VueParseResult = {
  descriptor: {
    template?: {
      ast: VueAstNode;
      loc: { start: { offset: number }; end: { offset: number } };
    };
    script?: {
      content: string;
      loc: { start: { offset: number }; end: { offset: number } };
    };
    scriptSetup?: {
      content: string;
      loc: { start: { offset: number }; end: { offset: number } };
    };
  };
};

type VueAstNode = {
  type: number;
  content?: string;
  children?: VueAstNode[];
  props?: VueAstProp[];
  loc: { start: { offset: number }; end: { offset: number } };
};

type VueAstProp = {
  type: number;
  name: string;
  value?: { content: string };
  loc: { start: { offset: number }; end: { offset: number } };
};

const NODE_TYPES = {
  TEXT: 2,
  ELEMENT: 1,
  ATTRIBUTE: 6,
};

type MagicStringType = {
  overwrite: (start: number, end: number, content: string) => void;
  appendLeft: (index: number, content: string) => void;
  prepend: (content: string) => void;
  toString: () => string;
  generateMap: (options: {
    source: string;
    includeContent: boolean;
  }) => unknown;
};

export const intlayerVueExtract = async (
  code: string,
  filename: string,
  options: ExtractPluginOptions = {}
): Promise<{ code: string; map?: unknown; extracted: boolean } | null> => {
  const {
    defaultLocale = 'en',
    packageName = 'vue-intlayer',
    filesList,
    shouldExtract,
    onExtract,
    dictionaryKey: dictionaryKeyOption,
    attributesToExtract = [],
    extractDictionaryKeyFromPath,
    generateKey,
  } = options;

  if (!shouldProcessFile(filename, filesList)) return null;
  if (!filename.endsWith('.vue')) return null;

  let parseVue: (code: string) => VueParseResult;
  let MagicString: new (code: string) => MagicStringType;

  try {
    parseVue = vueSfc.parse as unknown as (code: string) => VueParseResult;
  } catch {
    console.warn('Vue extraction: @vue/compiler-sfc not found.');
    return null;
  }

  try {
    const magicStringModule = await import('magic-string');
    MagicString = magicStringModule.default;
  } catch {
    console.warn('Vue extraction: magic-string not found.');
    return null;
  }

  const sfc = parseVue(code);
  const magic = new MagicString(code);

  const extractedContent: ExtractedContent = {};
  const existingKeys = new Set<string>();
  const dictionaryKey =
    dictionaryKeyOption ?? extractDictionaryKeyFromPath?.(filename) ?? '';
  const replacements: Replacement[] = [];

  // 1. Walk Vue Template AST
  if (sfc.descriptor.template) {
    const walkVueAst = (node: VueAstNode) => {
      if (node.type === NODE_TYPES.TEXT) {
        const text = node.content ?? '';
        if (shouldExtract?.(text) && generateKey) {
          const key = generateKey(text, existingKeys);
          existingKeys.add(key);
          replacements.push({
            start: node.loc.start.offset,
            end: node.loc.end.offset,
            replacement: `{{ content.${key} }}`,
            key,
            value: text.replace(/\s+/g, ' ').trim(),
          });
        }
      } else if (node.type === NODE_TYPES.ELEMENT) {
        node.props?.forEach((prop) => {
          if (
            prop.type === NODE_TYPES.ATTRIBUTE &&
            (attributesToExtract as readonly string[]).includes(prop.name) &&
            prop.value
          ) {
            const text = prop.value.content;
            if (shouldExtract?.(text) && generateKey) {
              const key = generateKey(text, existingKeys);
              existingKeys.add(key);
              replacements.push({
                start: prop.loc.start.offset,
                end: prop.loc.end.offset,
                replacement: `:${prop.name}="content.${key}"`,
                key,
                value: text.trim(),
              });
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

  // 2. Extract and Walk Script using Babel
  const scriptBlock = sfc.descriptor.scriptSetup ?? sfc.descriptor.script;

  if (scriptBlock) {
    const scriptText = scriptBlock.content;
    const offset = scriptBlock.loc.start.offset;

    try {
      const ast = babelParse(scriptText, {
        parserOpts: {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        },
      });

      if (ast) {
        traverse(ast, {
          StringLiteral(path: any) {
            if (path.parentPath.isImportDeclaration()) return;
            if (path.parentPath.isExportDeclaration()) return;
            if (path.parentPath.isImportSpecifier()) return;
            if (path.parentPath.isObjectProperty() && path.key === 'key')
              return;

            if (path.parentPath.isCallExpression()) {
              const callee = path.parentPath.node.callee;
              if (
                t.isMemberExpression(callee) &&
                t.isIdentifier(callee.object) &&
                callee.object.name === 'console'
              )
                return;

              if (
                t.isIdentifier(callee) &&
                (callee.name === 'useIntlayer' || callee.name === 't')
              )
                return;

              if (callee.type === 'Import') return;
              if (t.isIdentifier(callee) && callee.name === 'require') return;
            }

            const text = path.node.value;
            if (shouldExtract?.(text) && generateKey) {
              const key = generateKey(text, existingKeys);
              existingKeys.add(key);

              if (path.node.start != null && path.node.end != null) {
                replacements.push({
                  start: offset + path.node.start,
                  end: offset + path.node.end,
                  replacement: `content.${key}`,
                  key,
                  value: text.trim(),
                });
              }
            }
          },
        });
      }
    } catch (e) {
      console.warn(
        `Vue extraction: Failed to parse script content for ${filename}`,
        e
      );
    }
  }

  // Abort if nothing was extracted
  if (replacements.length === 0) return null;

  // 3. Apply Replacements in Reverse Order
  replacements.sort((a, b) => b.start - a.start);
  for (const { start, end, replacement, key, value } of replacements) {
    magic.overwrite(start, end, replacement);
    extractedContent[key] = value;
  }

  // 4. Inject necessary imports and setup
  const finalScriptContent = scriptBlock?.content ?? '';

  const hasUseIntlayerImport =
    /import\s*{[^}]*useIntlayer[^}]*}\s*from\s*['"][^'"]+['"]/.test(
      finalScriptContent
    ) ||
    /import\s+useIntlayer\s+from\s*['"][^'"]+['"]/.test(finalScriptContent);

  const hasContentDeclaration = /const\s+content\s*=\s*useIntlayer\s*\(/.test(
    finalScriptContent
  );

  const importStmt = hasUseIntlayerImport
    ? ''
    : `import { useIntlayer } from '${packageName}';`;
  const contentDecl = hasContentDeclaration
    ? ''
    : `const content = useIntlayer('${dictionaryKey}');`;

  const injectionParts = [importStmt, contentDecl].filter(Boolean);

  if (injectionParts.length > 0) {
    const injection = `\n${injectionParts.join('\n')}\n`;

    if (sfc.descriptor.scriptSetup) {
      magic.appendLeft(sfc.descriptor.scriptSetup.loc.start.offset, injection);
    } else if (sfc.descriptor.script) {
      magic.appendLeft(sfc.descriptor.script.loc.start.offset, injection);
    } else {
      magic.prepend(
        `<script setup>\n${importStmt}\n${contentDecl}\n</script>\n`
      );
    }
  }

  if (onExtract) {
    onExtract({
      dictionaryKey,
      filePath: filename,
      content: { ...extractedContent },
      locale: defaultLocale,
    });
  }

  return {
    code: magic.toString(),
    map: magic.generateMap({ source: filename, includeContent: true }),
    extracted: true,
  };
};

type Tools = {
  generateKey: (text: string, existingKeys: Set<string>) => string;
  shouldExtract: (text: string) => boolean;
  extractDictionaryKeyFromPath: (path: string) => string;
  attributesToExtract: readonly string[];
  extractTsContent: any;
};

export const processVueFile = async (
  filePath: string,
  _componentKey: string,
  packageName: string,
  tools: Tools,
  save: boolean = true
): Promise<Record<string, string> | null> => {
  const code = await readFile(filePath, 'utf-8');
  let extractedContent: Record<string, string> = {};

  const result = await intlayerVueExtract(code, filePath, {
    packageName,
    dictionaryKey: _componentKey,
    shouldExtract: tools.shouldExtract,
    generateKey: tools.generateKey,
    extractDictionaryKeyFromPath: tools.extractDictionaryKeyFromPath,
    attributesToExtract: tools.attributesToExtract,
    onExtract: (extractResult) => {
      extractedContent = extractResult.content;
    },
  });

  if (!result) return null;

  if (save) {
    await writeFile(filePath, result.code);
  }

  return extractedContent;
};

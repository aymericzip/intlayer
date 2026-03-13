import { readFileSync, writeFileSync } from 'node:fs';
import { parse as babelParse, types as t, traverse } from '@babel/core';
import { DefaultValues } from '@intlayer/config/client';
import type { Locale } from '@intlayer/types/allLocales';
import vueSfc from '@vue/compiler-sfc';
import MagicString from 'magic-string';

type ExistingCallInfo = {
  isDestructured: boolean;
  existingDestructuredKeys: string[];
  /** The variable name used to store the call result (e.g. `t` in `const t = useIntlayer(...)`) */
  variableName: string;
  /** Absolute position of `}` in the full file — only valid when `isDestructured` */
  closingBraceAbsolutePos: number;
  /** Absolute position of end of last property — only valid when `isDestructured` */
  lastPropAbsoluteEnd: number;
} | null;

/**
 * Detects whether the script block already contains a `useIntlayer` /
 * `getIntlayer` call and, if so, whether its result is destructured.
 *
 * @param scriptText    Raw text of the script block content.
 * @param absoluteOffset Byte offset of `scriptText[0]` in the full SFC source.
 */
const detectExistingIntlayerCall = (
  scriptText: string,
  absoluteOffset: number
): ExistingCallInfo => {
  let info: ExistingCallInfo = null;

  try {
    const ast = babelParse(scriptText, {
      parserOpts: { sourceType: 'module', plugins: ['typescript', 'jsx'] },
    });

    if (!ast) return null;

    traverse(ast, {
      CallExpression(path: any) {
        const callee = path.node.callee;

        if (
          !t.isIdentifier(callee) ||
          (callee.name !== 'useIntlayer' && callee.name !== 'getIntlayer')
        )
          return;

        const parent = path.parent;

        if (t.isVariableDeclarator(parent) && t.isObjectPattern(parent.id)) {
          const properties = parent.id.properties;
          const existingDestructuredKeys = properties
            .filter(
              (property: any): property is typeof t.objectProperty =>
                t.isObjectProperty(property) && t.isIdentifier(property.key)
            )
            .map((property: any) => (property.key as any).name as string);
          const lastProp = properties[properties.length - 1];

          info = {
            isDestructured: true,
            variableName: 'content',
            existingDestructuredKeys,
            closingBraceAbsolutePos: absoluteOffset + (parent.id.end! - 1),
            lastPropAbsoluteEnd: absoluteOffset + lastProp.end!,
          };
        } else {
          const variableName =
            t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)
              ? parent.id.name
              : 'content';

          info = {
            isDestructured: false,
            variableName,
            existingDestructuredKeys: [],
            closingBraceAbsolutePos: -1,
            lastPropAbsoluteEnd: -1,
          };
        }

        path.stop();
      },
    });
  } catch {
    // Silently ignore parse failures — fall back to no-info
  }

  return info;
};

export type ExtractedContent = Record<string, string>;

export type ExtractResult = {
  dictionaryKey: string;
  filePath: string;
  content: ExtractedContent;
  locale: Locale;
};

export type ExtractPluginOptions = {
  defaultLocale?: Locale;
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
  INTERPOLATION: 5,
};

export const intlayerVueExtract = (
  code: string,
  filename: string,
  options: ExtractPluginOptions = {}
): { code: string; map?: unknown; extracted: boolean } | null => {
  const {
    defaultLocale = DefaultValues.Internationalization.DEFAULT_LOCALE,
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

  try {
    parseVue = vueSfc.parse as unknown as (code: string) => VueParseResult;
  } catch {
    console.warn('Vue extraction: @vue/compiler-sfc not found.');
    return null;
  }

  const sfc = parseVue(code);
  const magic = new MagicString(code);

  const extractedContent: ExtractedContent = {};
  const existingKeys = new Set<string>();
  const dictionaryKey =
    dictionaryKeyOption ?? extractDictionaryKeyFromPath?.(filename) ?? '';
  const replacements: Replacement[] = [];

  // Detect existing useIntlayer / getIntlayer call in the script block BEFORE
  // walking the template, so the correct access pattern can be chosen.
  const scriptBlock = sfc.descriptor.scriptSetup ?? sfc.descriptor.script;
  const existingCallInfo = scriptBlock
    ? detectExistingIntlayerCall(
        scriptBlock.content,
        scriptBlock.loc.start.offset
      )
    : null;

  const isDestructured = existingCallInfo?.isDestructured ?? false;
  const varName = existingCallInfo?.variableName ?? 'content';

  // Walk Vue Template AST
  if (sfc.descriptor.template) {
    const walkVueAst = (node: VueAstNode) => {
      if (node.type === NODE_TYPES.TEXT) {
        const text = node.content ?? '';

        if (shouldExtract?.(text) && generateKey) {
          const key = generateKey(text, existingKeys);
          existingKeys.add(key);
          // When the existing call is destructured, access the key directly;
          // otherwise use the `content` variable.
          const ref = isDestructured ? key : `${varName}.${key}`;
          replacements.push({
            start: node.loc.start.offset,
            end: node.loc.end.offset,
            replacement: `{{ ${ref} }}`,
            key,
            value: text.replace(/\s+/g, ' ').trim(),
          });
        }
      } else if (node.type === NODE_TYPES.ELEMENT) {
        const children = node.children ?? [];

        // Try to handle as insertion (mixed TEXT + INTERPOLATION children)
        if (
          children.length > 0 &&
          children.some((c) => c.type === NODE_TYPES.INTERPOLATION)
        ) {
          const parts: {
            type: 'text' | 'var';
            value: string;
            originalExpr: string;
          }[] = [];
          let hasSignificantText = false;
          let isValid = true;

          for (const child of children) {
            if (child.type === NODE_TYPES.TEXT) {
              const text = child.content ?? '';
              if (text.trim().length > 0) hasSignificantText = true;
              parts.push({ type: 'text', value: text, originalExpr: '' });
            } else if (child.type === NODE_TYPES.INTERPOLATION) {
              // Extract the expression source between {{ and }}
              const exprCode = code
                .slice(child.loc.start.offset + 2, child.loc.end.offset - 2)
                .trim();
              const varName = exprCode.includes('.')
                ? exprCode
                    .split('.')
                    .pop()!
                    .replace(/[^\w$]/g, '')
                : exprCode;
              parts.push({
                type: 'var',
                value: varName,
                originalExpr: exprCode,
              });
            } else {
              isValid = false;
              break;
            }
          }

          if (
            isValid &&
            hasSignificantText &&
            parts.some((p) => p.type === 'var')
          ) {
            let combined = '';
            for (const p of parts) {
              combined += p.type === 'var' ? `{{${p.value}}}` : p.value;
            }
            const cleanString = combined.replace(/\s+/g, ' ').trim();

            if (shouldExtract?.(cleanString) && generateKey) {
              const key = generateKey(cleanString, existingKeys);
              existingKeys.add(key);
              const ref = isDestructured ? key : `${varName}.${key}`;

              const uniqueVarPairs = [
                ...new Set(
                  parts
                    .filter((p) => p.type === 'var')
                    .map((p) => `${p.value}: ${p.originalExpr}`)
                ),
              ];
              const varArgs = uniqueVarPairs.join(', ');
              const replacement = `{{ ${ref}({ ${varArgs} }) }}`;

              const firstChild = children[0];
              const lastChild = children[children.length - 1];
              replacements.push({
                start: firstChild.loc.start.offset,
                end: lastChild.loc.end.offset,
                replacement,
                key,
                value: cleanString,
              });

              // Process props but skip children (they are replaced)
              node.props?.forEach((prop) => {
                if (
                  prop.type === NODE_TYPES.ATTRIBUTE &&
                  (attributesToExtract as readonly string[]).includes(
                    prop.name
                  ) &&
                  prop.value
                ) {
                  const text = prop.value.content;
                  if (shouldExtract?.(text) && generateKey) {
                    const propKey = generateKey(text, existingKeys);
                    existingKeys.add(propKey);
                    const propRef = isDestructured
                      ? propKey
                      : `${varName}.${propKey}`;
                    replacements.push({
                      start: prop.loc.start.offset,
                      end: prop.loc.end.offset,
                      replacement: `:${prop.name}="${propRef}"`,
                      key: propKey,
                      value: text.trim(),
                    });
                  }
                }
              });
              return; // don't recurse into children
            }
          }
        }

        // Regular element: handle props
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
              const ref = isDestructured ? key : `${varName}.${key}`;
              replacements.push({
                start: prop.loc.start.offset,
                end: prop.loc.end.offset,
                replacement: `:${prop.name}="${ref}"`,
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

  // Extract and Walk Script using Babel
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
                const ref = isDestructured ? key : `${varName}.${key}`;
                replacements.push({
                  start: offset + path.node.start,
                  end: offset + path.node.end,
                  replacement: ref,
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

  // Apply Replacements in Reverse Order
  replacements.sort((a, b) => b.start - a.start);

  for (const { start, end, replacement, key, value } of replacements) {
    magic.overwrite(start, end, replacement);
    extractedContent[key] = value;
  }

  // When the existing call is destructured, inject only the missing keys into
  // the ObjectPattern — no new `content` variable is needed.
  if (
    existingCallInfo?.isDestructured &&
    existingCallInfo.closingBraceAbsolutePos >= 0
  ) {
    const missingKeys = Object.keys(extractedContent).filter(
      (k) => !existingCallInfo.existingDestructuredKeys.includes(k)
    );

    if (missingKeys.length > 0) {
      // Insert right after the last property so the space/newline before `}`
      // is naturally preserved: `{ a }` → `{ a, b }`.
      magic.appendLeft(
        existingCallInfo.lastPropAbsoluteEnd,
        `, ${missingKeys.join(', ')}`
      );
    }
  }

  // Inject necessary imports and setup (only when no existing call was detected)
  const finalScriptContent = scriptBlock?.content ?? '';

  const hasUseIntlayerImport =
    /import\s*{[^}]*useIntlayer[^}]*}\s*from\s*['"][^'"]+['"]/.test(
      finalScriptContent
    ) ||
    /import\s+useIntlayer\s+from\s*['"][^'"]+['"]/.test(finalScriptContent);

  // An existing call (destructured or not) means no new declaration is needed.
  const hasContentDeclaration =
    existingCallInfo !== null ||
    /const\s+content\s*=\s*useIntlayer\s*\(/.test(finalScriptContent);

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

export const processVueFile = (
  filePath: string,
  _componentKey: string,
  packageName: string,
  tools: Tools,
  save: boolean = true
): {
  extractedContent: Record<string, string>;
  code: string;
  map?: any;
} | null => {
  const code = readFileSync(filePath, 'utf-8');
  let extractedContent: Record<string, string> = {};

  const result = intlayerVueExtract(code, filePath, {
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
    writeFileSync(filePath, result.code);
  }

  return {
    extractedContent,
    code: result.code,
    map: result.map,
  };
};

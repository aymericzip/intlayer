import { readFileSync, writeFileSync } from 'node:fs';
import { parse as babelParse, types as t, traverse } from '@babel/core';
import { DEFAULT_LOCALE } from '@intlayer/config/defaultValues';
import type { Locale } from '@intlayer/types/allLocales';
import MagicString from 'magic-string';
import { parse } from 'svelte/compiler';

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
 * Detects whether a script block already contains a `useIntlayer` /
 * `getIntlayer` call and whether its result is destructured.
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
              (p: any): p is typeof t.objectProperty =>
                t.isObjectProperty(p) && t.isIdentifier(p.key)
            )
            .map((p: any) => (p.key as any).name as string);
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

/* ────────────────────────────────────────── helpers ─────────────────────── */

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

/* ────────────────────────────────────────── plugin ──────────────────────── */

export const intlayerSvelteExtract = (
  code: string,
  filename: string,
  options: ExtractPluginOptions = {}
): { code: string; map?: unknown; extracted: boolean } | null => {
  const {
    defaultLocale = DEFAULT_LOCALE,
    packageName = 'svelte-intlayer',
    filesList,
    shouldExtract,
    onExtract,
    dictionaryKey: dictionaryKeyOption,
    attributesToExtract = [],
    extractDictionaryKeyFromPath,
    generateKey,
  } = options;

  if (!shouldProcessFile(filename, filesList)) return null;
  if (!filename.endsWith('.svelte')) return null;

  const magic = new MagicString(code);
  const extractedContent: ExtractedContent = {};
  const existingKeys = new Set<string>();
  const dictionaryKey =
    dictionaryKeyOption ?? extractDictionaryKeyFromPath?.(filename) ?? '';
  const replacements: Replacement[] = [];

  // Extract and walk Script using Babel
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
  const scriptMatch = scriptRegex.exec(code);
  let hasScriptExtraction = false;
  const scriptContent = scriptMatch ? scriptMatch[1] : '';

  // Detect existing call BEFORE walking the template so the access pattern
  // (bare key vs. $content.key) can be chosen consistently.
  const existingCallInfo = scriptMatch
    ? detectExistingIntlayerCall(
        scriptContent,
        scriptMatch.index + scriptMatch[0].indexOf('>') + 1
      )
    : null;

  const isDestructured = existingCallInfo?.isDestructured ?? false;
  const varName = existingCallInfo?.variableName ?? 'content';

  let ast: any;
  try {
    ast = parse(code);
  } catch (e) {
    console.warn(
      `Svelte extraction: Failed to parse Svelte AST for ${filename}`,
      e
    );
    return null;
  }

  // Walk Svelte HTML AST.
  // Svelte 4 used numeric type constants; Svelte 5 uses string type names.
  // We check for both to remain compatible.
  const isTextNode = (node: any) => node.type === 'Text' || node.type === 3;
  const isAttributeNode = (node: any) =>
    node.type === 'Attribute' || node.type === 6;
  const isExpressionTagNode = (node: any): boolean =>
    node.type === 'MustacheTag' ||
    node.type === 8 || // Svelte 4 numeric
    node.type === 'ExpressionTag'; // Svelte 5

  const walkSvelte = (node: any) => {
    if (isTextNode(node)) {
      const text = node.data ?? node.content ?? '';
      if (shouldExtract?.(text) && generateKey) {
        const key = generateKey(text, existingKeys);
        existingKeys.add(key);
        // Destructured: each property is a plain value → `{key}`.
        // Otherwise use the reactive store subscription `{$content.key}`.
        const ref = isDestructured ? key : `$${varName}.${key}`;
        replacements.push({
          start: node.start,
          end: node.end,
          replacement: `{${ref}}`,
          key,
          value: text.replace(/\s+/g, ' ').trim(),
        });
      }
    } else if (
      isAttributeNode(node) &&
      (attributesToExtract as readonly string[]).includes(node.name)
    ) {
      if (node.value && node.value.length === 1 && isTextNode(node.value[0])) {
        const text = node.value[0].data ?? node.value[0].content ?? '';
        if (shouldExtract?.(text) && generateKey) {
          const key = generateKey(text, existingKeys);
          existingKeys.add(key);
          const ref = isDestructured ? key : `$${varName}.${key}`;
          replacements.push({
            start: node.start,
            end: node.end,
            replacement: `${node.name}={${ref}}`,
            key,
            value: text.trim(),
          });
        }
      }
    }

    const children =
      node.children ?? node.fragment?.nodes ?? node.fragment?.children;

    // Try to handle mixed text + expression children as an insertion
    if (children?.some(isExpressionTagNode)) {
      const parts: {
        type: 'text' | 'var';
        value: string;
        originalExpr: string;
      }[] = [];
      let hasSignificantText = false;
      let isValid = true;

      for (const child of children) {
        if (isTextNode(child)) {
          const text = child.data ?? child.content ?? '';
          if (text.trim().length > 0) hasSignificantText = true;
          parts.push({ type: 'text', value: text, originalExpr: '' });
        } else if (isExpressionTagNode(child)) {
          // Source slice: skip the leading `{` and trailing `}`
          const exprCode = code.slice(child.start + 1, child.end - 1).trim();
          const varName = exprCode.includes('.')
            ? exprCode
                .split('.')
                .pop()!
                .replace(/[^\w$]/g, '')
            : exprCode;
          parts.push({ type: 'var', value: varName, originalExpr: exprCode });
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
          const ref = isDestructured ? key : `$${varName}.${key}`;

          const uniqueVarPairs = [
            ...new Set(
              parts
                .filter((p) => p.type === 'var')
                .map((p) => `${p.value}: ${p.originalExpr}`)
            ),
          ];
          const varArgs = uniqueVarPairs.join(', ');
          const replacement = `{${ref}({ ${varArgs} })}`;

          const firstChild = children[0];
          const lastChild = children[children.length - 1];
          replacements.push({
            start: firstChild.start,
            end: lastChild.end,
            replacement,
            key,
            value: cleanString,
          });

          // Don't recurse into these children
          if (node.attributes) node.attributes.forEach(walkSvelte);
          return;
        }
      }
    }

    if (children) children.forEach(walkSvelte);
    if (node.attributes) node.attributes.forEach(walkSvelte);
  };

  if (ast.html) {
    walkSvelte(ast.html);
  }

  if (scriptMatch) {
    const openTagEndIndex = scriptMatch[0].indexOf('>') + 1;
    const offset = scriptMatch.index + openTagEndIndex;

    try {
      const babelAst = babelParse(scriptContent, {
        parserOpts: {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        },
      });

      if (babelAst) {
        traverse(babelAst, {
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
              hasScriptExtraction = true;

              if (path.node.start != null && path.node.end != null) {
                // Destructured: each property is a plain value → access directly.
                // Otherwise use `get(content).key` to read the Svelte store.
                const ref = isDestructured ? key : `get(${varName}).${key}`;
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
    } catch (error) {
      console.warn(
        `Svelte extraction: Failed to parse script content for ${filename}`,
        error
      );
    }
  }

  // Abort if nothing was extracted
  if (replacements.length === 0) return null;

  // Apply Replacements in Reverse Order (prevents magic-string chunk errors)
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

  // Inject necessary imports and setup
  const hasUseIntlayerImport =
    /import\s*{[^}]*useIntlayer[^}]*}\s*from\s*['"][^'"]+['"]/.test(
      scriptContent
    ) || /import\s+useIntlayer\s+from\s*['"][^'"]+['"]/.test(scriptContent);

  const hasGetImport =
    /import\s*{[^}]*get[^}]*}\s*from\s*['"]svelte\/store['"]/.test(
      scriptContent
    );

  // An existing call (destructured or not) means no new declaration is needed.
  const hasContentDeclaration =
    existingCallInfo !== null ||
    /const\s+content\s*=\s*useIntlayer\s*\(/.test(scriptContent);

  const importStmt = hasUseIntlayerImport
    ? ''
    : `import { useIntlayer } from '${packageName}';`;
  const getImportStmt =
    hasScriptExtraction && !isDestructured && !hasGetImport
      ? `import { get } from 'svelte/store';`
      : '';
  const contentDecl = hasContentDeclaration
    ? ''
    : `const content = useIntlayer('${dictionaryKey}');`;

  const injectionParts = [importStmt, getImportStmt, contentDecl].filter(
    Boolean
  );

  if (injectionParts.length > 0) {
    const injection = `\n  ${injectionParts.join('\n  ')}\n`;

    if (scriptMatch) {
      const scriptContentStart =
        scriptMatch.index + scriptMatch[0].indexOf('>') + 1;
      magic.appendLeft(scriptContentStart, injection);
    } else {
      magic.prepend(
        `<script>\n  ${importStmt}\n  ${hasScriptExtraction ? "import { get } from 'svelte/store';" : ''}\n  ${contentDecl}\n</script>\n\n`
      );
    }
  }

  if (onExtract) {
    onExtract({
      dictionaryKey,
      filePath: filename,
      content: extractedContent,
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

export const processSvelteFile = (
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
  let extractedContent: Record<string, string> | null = null;

  const result = intlayerSvelteExtract(code, filePath, {
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
    extractedContent: extractedContent!,
    code: result.code,
    map: result.map,
  };
};

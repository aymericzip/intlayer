import { readFile, writeFile } from 'node:fs/promises';
import { parse as babelParse, types as t, traverse } from '@babel/core';
import {
  ATTRIBUTES_TO_EXTRACT,
  shouldExtract as defaultShouldExtract,
  extractDictionaryKeyFromPath,
  generateKey,
} from '@intlayer/chokidar/cli';
import MagicString from 'magic-string';
import * as svelteCompiler from 'svelte/compiler';

/* ────────────────────────────────────────── types ───────────────────────── */

export type ExtractedContent = Record<string, string>;

export type ExtractResult = {
  dictionaryKey: string;
  filePath: string;
  content: ExtractedContent;
  locale: string;
};

export type ExtractPluginOptions = {
  defaultLocale?: string;
  packageName?: string;
  filesList?: string[];
  shouldExtract?: (text: string) => boolean;
  onExtract?: (result: ExtractResult) => void;
  dictionaryKey?: string;
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
    defaultLocale = 'en',
    packageName = 'svelte-intlayer',
    filesList,
    shouldExtract = defaultShouldExtract,
    onExtract,
    dictionaryKey: dictionaryKeyOption,
  } = options;

  if (!shouldProcessFile(filename, filesList)) return null;
  if (!filename.endsWith('.svelte')) return null;

  const magic = new MagicString(code);
  const extractedContent: ExtractedContent = {};
  const existingKeys = new Set<string>();
  const dictionaryKey =
    dictionaryKeyOption ?? extractDictionaryKeyFromPath(filename);
  const replacements: Replacement[] = [];

  let ast: any;
  try {
    ast = svelteCompiler.parse(code);
  } catch (e) {
    console.warn(
      `Svelte extraction: Failed to parse Svelte AST for ${filename}`,
      e
    );
    return null;
  }

  // 1. Walk Svelte HTML AST
  const walkSvelte = (node: any) => {
    if (node.type === 'Text') {
      const text = node.data;
      if (shouldExtract(text)) {
        const key = generateKey(text, existingKeys);
        existingKeys.add(key);
        replacements.push({
          start: node.start,
          end: node.end,
          replacement: `{$content.${key}}`,
          key,
          value: text.replace(/\s+/g, ' ').trim(),
        });
      }
    } else if (
      node.type === 'Attribute' &&
      (ATTRIBUTES_TO_EXTRACT as readonly string[]).includes(node.name)
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
          replacements.push({
            start: node.start,
            end: node.end,
            replacement: `${node.name}={$content.${key}}`,
            key,
            value: text.trim(),
          });
        }
      }
    }

    if (node.children) node.children.forEach(walkSvelte);
    else if (node.fragment?.children)
      node.fragment.children.forEach(walkSvelte);
    if (node.attributes) node.attributes.forEach(walkSvelte);
  };

  if (ast.html) {
    walkSvelte(ast.html);
  }

  // 2. Extract and walk Script using Babel
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
  const scriptMatch = scriptRegex.exec(code);
  let hasScriptExtraction = false;
  const scriptContent = scriptMatch ? scriptMatch[1] : '';

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
            if (shouldExtract(text)) {
              const key = generateKey(text, existingKeys);
              existingKeys.add(key);
              hasScriptExtraction = true;

              if (path.node.start != null && path.node.end != null) {
                replacements.push({
                  start: offset + path.node.start,
                  end: offset + path.node.end,
                  replacement: `get(content).${key}`,
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
        `Svelte extraction: Failed to parse script content for ${filename}`,
        e
      );
    }
  }

  // Abort if nothing was extracted
  if (replacements.length === 0) return null;

  // 3. Apply Replacements in Reverse Order (prevents magic-string chunk errors)
  replacements.sort((a, b) => b.start - a.start);
  for (const { start, end, replacement, key, value } of replacements) {
    magic.overwrite(start, end, replacement);
    extractedContent[key] = value;
  }

  // 4. Inject necessary imports and setup
  const hasUseIntlayerImport =
    /import\s*{[^}]*useIntlayer[^}]*}\s*from\s*['"][^'"]+['"]/.test(
      scriptContent
    ) || /import\s+useIntlayer\s+from\s*['"][^'"]+['"]/.test(scriptContent);

  const hasGetImport =
    /import\s*{[^}]*get[^}]*}\s*from\s*['"]svelte\/store['"]/.test(
      scriptContent
    );
  const hasContentDeclaration = /const\s+content\s*=\s*useIntlayer\s*\(/.test(
    scriptContent
  );

  const importStmt = hasUseIntlayerImport
    ? ''
    : `import { useIntlayer } from '${packageName}';`;
  const getImportStmt =
    hasScriptExtraction && !hasGetImport
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
  extractTsContent: any;
};

export const processSvelteFile = async (
  filePath: string,
  _componentKey: string,
  packageName: string,
  tools: Tools,
  save: boolean = true
): Promise<Record<string, string> | null> => {
  const code = await readFile(filePath, 'utf-8');
  let extractedContent: Record<string, string> | null = null;

  const result = await intlayerSvelteExtract(code, filePath, {
    packageName,
    dictionaryKey: _componentKey,
    shouldExtract: tools.shouldExtract,
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

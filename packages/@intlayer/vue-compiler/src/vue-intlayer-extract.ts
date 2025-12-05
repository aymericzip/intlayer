import { basename, dirname, extname } from 'node:path';
import { parse, types as t, traverse } from '@babel/core';

/* ────────────────────────────────────────── constants ───────────────────── */

/**
 * Attributes that should be extracted for localization
 */
export const ATTRIBUTES_TO_EXTRACT = [
  'title',
  'placeholder',
  'alt',
  'aria-label',
  'label',
];

/* ────────────────────────────────────────── types ───────────────────────── */

export type ExtractedContent = Record<string, string>;

/**
 * Extracted content result from a file transformation
 */
export type ExtractResult = {
  /** Dictionary key derived from the file path */
  dictionaryKey: string;
  /** File path that was processed */
  filePath: string;
  /** Extracted content key-value pairs */
  content: ExtractedContent;
  /** Default locale used */
  locale: string;
};

/**
 * Options for extraction plugins
 */
export type ExtractPluginOptions = {
  /**
   * The default locale for the extracted content
   * @default 'en'
   */
  defaultLocale?: string;
  /**
   * The package to import useIntlayer from
   * @default 'vue-intlayer'
   */
  packageName?: string;
  /**
   * Files list to traverse. If provided, only files in this list will be processed.
   */
  filesList?: string[];
  /**
   * Custom function to determine if a string should be extracted
   */
  shouldExtract?: (text: string) => boolean;
  /**
   * Callback function called when content is extracted from a file.
   * This allows the compiler to capture the extracted content and write it to files.
   * The dictionary will be updated: new keys added, unused keys removed.
   */
  onExtract?: (result: ExtractResult) => void;
};

/* ────────────────────────────────────────── helpers ─────────────────────── */

/**
 * Default function to determine if a string should be extracted
 */
export const defaultShouldExtract = (text: string): boolean => {
  const trimmed = text.trim();
  if (!trimmed) return false;
  // Must contain at least one space (likely a sentence/phrase)
  if (!trimmed.includes(' ')) return false;
  // Must start with a capital letter
  if (!/^[A-Z]/.test(trimmed)) return false;
  // Filter out template logic identifiers
  if (trimmed.startsWith('{') || trimmed.startsWith('v-')) return false;
  return true;
};

/**
 * Generate a unique key from text
 */
export const generateKey = (
  text: string,
  existingKeys: Set<string>
): string => {
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

/**
 * Extract dictionary key from file path
 */
export const extractDictionaryKeyFromPath = (filePath: string): string => {
  const ext = extname(filePath);
  let baseName = basename(filePath, ext);

  if (baseName === 'index') {
    baseName = basename(dirname(filePath));
  }

  // Convert to kebab-case
  const key = baseName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

  return `comp-${key}`;
};

/**
 * Check if a file should be processed based on filesList
 */
export const shouldProcessFile = (
  filename: string | undefined,
  filesList?: string[]
): boolean => {
  if (!filename) return false;
  if (!filesList || filesList.length === 0) return true;

  // Normalize paths for comparison (handle potential path separator issues)
  const normalizedFilename = filename.replace(/\\/g, '/');
  return filesList.some((f) => {
    const normalizedF = f.replace(/\\/g, '/');
    return normalizedF === normalizedFilename;
  });
};

/* ────────────────────────────────────────── Vue types ───────────────────── */

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

// Vue AST NodeTypes
const NODE_TYPES = {
  TEXT: 2,
  ELEMENT: 1,
  ATTRIBUTE: 6,
};

// MagicString type for dynamic import
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

/* ────────────────────────────────────────── plugin ──────────────────────── */

/**
 * Vue extraction plugin that extracts content and transforms Vue SFC to use useIntlayer.
 *
 * This plugin:
 * 1. Scans Vue SFC files for extractable text (template text, attributes)
 * 2. Auto-injects useIntlayer import and composable call
 * 3. Reports extracted content via onExtract callback (for the compiler to write dictionaries)
 * 4. Replaces extractable strings with content references
 *
 * ## Input
 * ```vue
 * <template>
 *   <div>Hello World</div>
 * </template>
 * ```
 *
 * ## Output
 * ```vue
 * <script setup>
 * import { useIntlayer } from 'vue-intlayer';
 * const content = useIntlayer('hello-world');
 * </script>
 * <template>
 *   <div>{{ content.helloWorld }}</div>
 * </template>
 * ```
 */
export const intlayerVueExtract = async (
  code: string,
  filename: string,
  options: ExtractPluginOptions = {}
): Promise<{ code: string; map?: unknown; extracted: boolean } | null> => {
  const {
    defaultLocale = 'en',
    packageName = 'vue-intlayer',
    filesList,
    shouldExtract = defaultShouldExtract,
    onExtract,
  } = options;

  // Check if file should be processed
  if (!shouldProcessFile(filename, filesList)) {
    return null;
  }

  // Skip non-Vue files
  if (!filename.endsWith('.vue')) {
    return null;
  }

  // Dynamic imports for dependencies (peer dependencies)
  let parseVue: (code: string) => VueParseResult;
  let MagicString: new (code: string) => MagicStringType;

  try {
    const vueSfc = await import('@vue/compiler-sfc');
    // Type assertion needed because Vue's SFCParseResult uses `null` for optional properties
    // while our VueParseResult uses `undefined` (optional). This is safe since we check
    // for truthy values before accessing template/script properties.
    parseVue = vueSfc.parse as unknown as (code: string) => VueParseResult;
  } catch {
    console.warn(
      'Vue extraction: @vue/compiler-sfc not found. Install it to enable Vue content extraction.'
    );
    return null;
  }

  try {
    const magicStringModule = await import('magic-string');
    MagicString = magicStringModule.default;
  } catch {
    console.warn(
      'Vue extraction: magic-string not found. Install it to enable Vue content extraction.'
    );
    return null;
  }

  const sfc = parseVue(code);
  const magic = new MagicString(code);

  const extractedContent: ExtractedContent = {};
  const existingKeys = new Set<string>();
  const dictionaryKey = extractDictionaryKeyFromPath(filename);

  // Walk the template AST
  if (sfc.descriptor.template) {
    const walkVueAst = (node: VueAstNode) => {
      if (node.type === NODE_TYPES.TEXT) {
        // Text node
        const text = node.content ?? '';
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
      } else if (node.type === NODE_TYPES.ELEMENT) {
        // Element node - check attributes
        node.props?.forEach((prop) => {
          if (
            prop.type === NODE_TYPES.ATTRIBUTE &&
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
                `:${prop.name}="content.${key}.value"`
              );
            }
          }
        });
      }

      // Recurse into children
      if (node.children) {
        node.children.forEach(walkVueAst);
      }
    };

    walkVueAst(sfc.descriptor.template.ast);
  }

  // Extract script content
  const scriptBlock = sfc.descriptor.scriptSetup ?? sfc.descriptor.script;

  if (scriptBlock) {
    const scriptContent = scriptBlock.content;
    const offset = scriptBlock.loc.start.offset;

    try {
      const ast = parse(scriptContent, {
        parserOpts: {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        },
      });

      traverse(ast, {
        StringLiteral(path) {
          if (path.parentPath.isImportDeclaration()) return;
          if (path.parentPath.isExportDeclaration()) return;
          if (path.parentPath.isImportSpecifier()) return;
          if (path.parentPath.isObjectProperty() && path.key === 'key') return;

          if (path.parentPath.isCallExpression()) {
            const callee = path.parentPath.node.callee;
            if (
              t.isMemberExpression(callee) &&
              t.isIdentifier(callee.object) &&
              callee.object.name === 'console'
            ) {
              return;
            }
            if (
              t.isIdentifier(callee) &&
              (callee.name === 'useIntlayer' || callee.name === 't')
            ) {
              return;
            }

            // Check for dynamic import import()
            if (callee.type === 'Import') return;

            // Check for require()
            if (t.isIdentifier(callee) && callee.name === 'require') return;
          }

          const text = path.node.value;
          if (shouldExtract(text)) {
            const key = generateKey(text, existingKeys);
            existingKeys.add(key);
            extractedContent[key] = text.trim();

            if (path.node.start != null && path.node.end != null) {
              magic.overwrite(
                offset + path.node.start,
                offset + path.node.end,
                `content.${key}`
              );
            }
          }
        },
      });
    } catch (e) {
      console.warn(
        `Vue extraction: Failed to parse script content for ${filename}`,
        e
      );
    }
  }

  // If nothing was extracted, return null
  if (Object.keys(extractedContent).length === 0) {
    return null;
  }

  // Get script content for checking existing imports/declarations
  const scriptContent =
    sfc.descriptor.scriptSetup?.content ?? sfc.descriptor.script?.content ?? '';

  // Check if useIntlayer is already imported
  const hasUseIntlayerImport =
    /import\s*{[^}]*useIntlayer[^}]*}\s*from\s*['"][^'"]+['"]/.test(
      scriptContent
    ) || /import\s+useIntlayer\s+from\s*['"][^'"]+['"]/.test(scriptContent);

  // Check if content variable is already declared with useIntlayer
  const hasContentDeclaration = /const\s+content\s*=\s*useIntlayer\s*\(/.test(
    scriptContent
  );

  // Skip injection if already using useIntlayer
  if (hasUseIntlayerImport && hasContentDeclaration) {
    return null;
  }

  // Prepare injection statements (only what's missing)
  const importStmt = hasUseIntlayerImport
    ? ''
    : `import { useIntlayer } from '${packageName}';`;
  const contentDecl = hasContentDeclaration
    ? ''
    : `const content = useIntlayer('${dictionaryKey}');`;

  // Build injection string
  const injectionParts = [importStmt, contentDecl].filter(Boolean);
  if (injectionParts.length === 0) {
    return null;
  }
  const injection = `\n${injectionParts.join('\n')}\n`;

  if (sfc.descriptor.scriptSetup) {
    // Insert at the beginning of script setup content
    magic.appendLeft(sfc.descriptor.scriptSetup.loc.start.offset, injection);
  } else if (sfc.descriptor.script) {
    // Insert at the beginning of script content
    magic.appendLeft(sfc.descriptor.script.loc.start.offset, injection);
  } else {
    // No script block, create one
    magic.prepend(`<script setup>\n${importStmt}\n${contentDecl}\n</script>\n`);
  }

  // Call the onExtract callback with extracted content
  if (onExtract) {
    const result: ExtractResult = {
      dictionaryKey,
      filePath: filename,
      content: { ...extractedContent },
      locale: defaultLocale,
    };
    onExtract(result);
  }

  return {
    code: magic.toString(),
    map: magic.generateMap({ source: filename, includeContent: true }),
    extracted: true,
  };
};

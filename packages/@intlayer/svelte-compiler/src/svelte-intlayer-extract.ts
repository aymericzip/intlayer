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
   * @default 'svelte-intlayer'
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

/* ────────────────────────────────────────── MagicString type ────────────── */

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
 * Svelte extraction plugin that extracts content and transforms Svelte components to use useIntlayer.
 *
 * This plugin:
 * 1. Scans Svelte files for extractable text (template text, attributes)
 * 2. Auto-injects useIntlayer import and store binding
 * 3. Reports extracted content via onExtract callback (for the compiler to write dictionaries)
 * 4. Replaces extractable strings with content references using Svelte's reactive `$` prefix
 *
 * ## Input
 * ```svelte
 * <h1>Hello World</h1>
 * <p>Welcome to our app</p>
 * ```
 *
 * ## Output
 * ```svelte
 * <script>
 * import { useIntlayer } from 'svelte-intlayer';
 * const content = useIntlayer('hello-world');
 * </script>
 * <h1>{$content.helloWorld}</h1>
 * <p>{$content.welcomeToOurApp}</p>
 * ```
 *
 * Note: Svelte uses reactive stores with `$` prefix for automatic subscription.
 * The `useIntlayer` composable returns a Svelte store that can be accessed reactively.
 */
export const intlayerSvelteExtract = async (
  code: string,
  filename: string,
  options: ExtractPluginOptions = {}
): Promise<{ code: string; map?: unknown; extracted: boolean } | null> => {
  const {
    defaultLocale = 'en',
    packageName = 'svelte-intlayer',
    filesList,
    shouldExtract = defaultShouldExtract,
    onExtract,
  } = options;

  // Check if file should be processed
  if (!shouldProcessFile(filename, filesList)) {
    return null;
  }

  // Skip non-Svelte files
  if (!filename.endsWith('.svelte')) {
    return null;
  }

  // Dynamic import for MagicString
  let MagicString: new (code: string) => MagicStringType;

  try {
    const magicStringModule = await import('magic-string');
    MagicString = magicStringModule.default;
  } catch {
    console.warn(
      'Svelte extraction: magic-string not found. Install it to enable Svelte content extraction.'
    );
    return null;
  }

  const magic = new MagicString(code);
  const extractedContent: ExtractedContent = {};
  const existingKeys = new Set<string>();
  const dictionaryKey = extractDictionaryKeyFromPath(filename);

  // Collect all replacements first, then apply them in reverse order
  // This prevents MagicString "chunk already edited" errors
  type Replacement = {
    start: number;
    end: number;
    replacement: string;
    key: string;
    value: string;
  };
  const replacements: Replacement[] = [];

  // Extract template content (everything outside <script> and <style> tags)
  // This regex-based approach works with both TypeScript and JavaScript files
  const scriptBlockRegex = /<script[^>]*>[\s\S]*?<\/script>/gi;
  const styleBlockRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;

  // Get ranges of script and style blocks to skip
  const skipRanges: Array<{ start: number; end: number }> = [];

  // Find all script blocks
  const scriptMatches = code.matchAll(scriptBlockRegex);
  for (const match of scriptMatches) {
    if (match.index !== undefined) {
      skipRanges.push({
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }

  // Find all style blocks
  const styleMatches = code.matchAll(styleBlockRegex);
  for (const match of styleMatches) {
    if (match.index !== undefined) {
      skipRanges.push({
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  }

  // Sort ranges by start position
  skipRanges.sort((a, b) => a.start - b.start);

  // Function to check if a position is within a skip range
  const isInSkipRange = (pos: number): boolean => {
    return skipRanges.some((range) => pos >= range.start && pos < range.end);
  };

  // Extract text content between HTML tags (but not inside script/style)
  // Match text that's between > and < (tag content)
  const textContentRegex = />([^<]+)</g;
  const textMatches = code.matchAll(textContentRegex);
  for (const match of textMatches) {
    if (match.index === undefined) continue;

    const textStart = match.index + 1; // Skip the >
    const text = match[1];
    const textEnd = textStart + text.length;

    // Skip if inside script or style block
    if (isInSkipRange(textStart)) {
      continue;
    }

    if (shouldExtract(text)) {
      const key = generateKey(text, existingKeys);
      existingKeys.add(key);
      const normalizedValue = text.replace(/\s+/g, ' ').trim();
      // Collect replacement instead of applying immediately
      replacements.push({
        start: textStart,
        end: textEnd,
        replacement: `{$content.${key}}`,
        key,
        value: normalizedValue,
      });
    }
  }

  // Extract localizable attributes (title, placeholder, alt, aria-label, label)
  for (const attrName of ATTRIBUTES_TO_EXTRACT) {
    // Match attribute="value" or attribute='value'
    const attrRegex = new RegExp(`(${attrName})=["']([^"']+)["']`, 'gi');
    const attrMatches = code.matchAll(attrRegex);
    for (const match of attrMatches) {
      if (match.index === undefined) continue;

      const attrStart = match.index;
      const attrEnd = attrStart + match[0].length;
      const text = match[2];

      // Skip if inside script or style block
      if (isInSkipRange(attrStart)) {
        continue;
      }

      if (shouldExtract(text)) {
        const key = generateKey(text, existingKeys);
        existingKeys.add(key);
        // Collect replacement instead of applying immediately
        replacements.push({
          start: attrStart,
          end: attrEnd,
          replacement: `${attrName}={$content.${key}.value}`,
          key,
          value: text.trim(),
        });
      }
    }
  }

  // Sort replacements by start position in REVERSE order (end to start)
  // This ensures earlier edits don't affect the positions of later edits
  replacements.sort((a, b) => b.start - a.start);

  // Apply all replacements and collect extracted content
  for (const { start, end, replacement, key, value } of replacements) {
    magic.overwrite(start, end, replacement);
    extractedContent[key] = value;
  }

  // Extract script content
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/;
  const scriptMatch = scriptRegex.exec(code);
  let hasScriptExtraction = false;
  const scriptContent = scriptMatch ? scriptMatch[1] : '';

  if (scriptMatch) {
    // Calculate offset: scriptMatch.index is start of <script...
    // We need to find the end of the opening tag >
    const openTagEndIndex = scriptMatch[0].indexOf('>') + 1;
    const offset = scriptMatch.index + openTagEndIndex;

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
            hasScriptExtraction = true;

            if (path.node.start != null && path.node.end != null) {
              magic.overwrite(
                offset + path.node.start,
                offset + path.node.end,
                `get(content).${key}`
              );
            }
          }
        },
      });
    } catch (e) {
      console.warn(
        `Svelte extraction: Failed to parse script content for ${filename}`,
        e
      );
    }
  }

  // If nothing was extracted, return null
  if (Object.keys(extractedContent).length === 0) {
    return null;
  }

  // Check if useIntlayer is already imported
  const hasUseIntlayerImport =
    /import\s*{[^}]*useIntlayer[^}]*}\s*from\s*['"][^'"]+['"]/.test(
      scriptContent
    ) || /import\s+useIntlayer\s+from\s*['"][^'"]+['"]/.test(scriptContent);

  // Check if get is already imported from svelte/store
  const hasGetImport =
    /import\s*{[^}]*get[^}]*}\s*from\s*['"]svelte\/store['"]/.test(
      scriptContent
    );

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

  const getImportStmt =
    hasScriptExtraction && !hasGetImport
      ? `import { get } from 'svelte/store';`
      : '';

  const contentDecl = hasContentDeclaration
    ? ''
    : `const content = useIntlayer('${dictionaryKey}');`;

  // Build injection string
  const injectionParts = [importStmt, getImportStmt, contentDecl].filter(
    Boolean
  );
  if (injectionParts.length === 0) {
    return null;
  }
  const injection = `\n  ${injectionParts.join('\n  ')}\n`;

  if (scriptMatch) {
    // Insert at the beginning of script content
    const scriptContentStart =
      scriptMatch.index + scriptMatch[0].indexOf('>') + 1;
    magic.appendLeft(scriptContentStart, injection);
  } else {
    // No script block, create one
    magic.prepend(
      `<script>\n  ${importStmt}\n  ${hasScriptExtraction ? "import { get } from 'svelte/store';" : ''}\n  ${contentDecl}\n</script>\n\n`
    );
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

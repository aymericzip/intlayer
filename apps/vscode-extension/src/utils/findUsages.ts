import { extname, resolve } from 'node:path';
import {
  collectCallerBindings,
  collectMessageUsages,
} from '@intlayer/lsp/utils';
import fg from 'fast-glob';
import { Range, Uri, workspace } from 'vscode';
import {
  ANGULAR_INLINE_TEMPLATE_PATTERN,
  extractScriptContent,
} from './extractScript';
import { getCachedConfig } from './intlayerCache';
import { createOffsetToPosition } from './textPosition';

/** Usage marker: field usage cannot be tracked, every field may be read. */
export const ALL_FIELDS_USED = '__ALL__';

/** Usage marker: the dictionary is only referenced, no field is read. */
const EXISTENCE_CHECK_ONLY = '__EXISTENCE_CHECK__';

export interface UsageLocation {
  uri: Uri;
  range: Range;
  keysUsed: Set<string>;
  keyLocations: Map<string, Range[]>;
}

/**
 * Extracts script content from a given file text, with special handling for Angular templates
 * when the file is a TypeScript component.
 */
const extractScriptContentWithAngularTemplate = (
  text: string,
  extension: string
): string => {
  let processedText = extractScriptContent(text, extension);

  if (extension === '.ts' && text.includes('@Component')) {
    processedText = processedText.replace(
      ANGULAR_INLINE_TEMPLATE_PATTERN,
      (_match, _quote, content) => {
        const expressions: string[] = [];
        const sanitize = (e: string) => {
          let s = e;
          s = s.replace(/;/g, ',');
          s = s.replace(/\s+as\s+/g, ',');
          s = s.replace(/\b\w+\s+of\s+/g, '');
          s = s.replace(/\btrack\s+/g, '');
          s = s.replace(/\blet\s+/g, '');
          return s.trim();
        };

        for (const interpolationMatch of content.matchAll(/{{([\s\S]*?)}}/g)) {
          expressions.push(sanitize(interpolationMatch[1]));
        }
        for (const bindingMatch of content.matchAll(
          /(?:\[.*?\]|bind-.*?)\s*=\s*(["'])(.*?)\1/g
        )) {
          expressions.push(sanitize(bindingMatch[2]));
        }
        for (const structMatch of content.matchAll(
          /\*\w+\s*=\s*(["'])(.*?)\1/g
        )) {
          expressions.push(sanitize(structMatch[2]));
        }
        for (const controlFlowMatch of content.matchAll(/@\w+\s*\((.*?)\)/g)) {
          expressions.push(sanitize(controlFlowMatch[1]));
        }

        return `template: [${expressions.join(', ')}]`;
      }
    );
  }

  return processedText;
};

/**
 * Source files of the project: those matched by the build traverse and
 * compiler transform patterns, across the base and code directories, content
 * declaration files excluded.
 */
const listProjectSourceFiles = async (projectDir: string): Promise<Uri[]> => {
  const { build, compiler, content, system } =
    await getCachedConfig(projectDir);

  const patterns = [
    ...[build.traversePattern ?? []].flat(),
    ...[compiler.transformPattern ?? []].flat(),
  ].filter((pattern): pattern is string => typeof pattern === 'string');

  const includePatterns = patterns.filter(
    (pattern) => !pattern.startsWith('!')
  );
  const ignorePatterns = [
    ...patterns
      .filter((pattern) => pattern.startsWith('!'))
      .map((pattern) => pattern.slice(1)),
    ...(content.fileExtensions ?? []).map((extension) => `**/*${extension}`),
  ];

  const searchRoots = new Set(
    [system.baseDir, ...(content.codeDir ?? [])].map((directory) =>
      resolve(directory)
    )
  );
  const filePaths = new Set<string>();

  for (const searchRoot of searchRoots) {
    const matchedPaths = await fg(includePatterns, {
      cwd: searchRoot,
      ignore: ignorePatterns,
      absolute: true,
      dot: false,
    });

    for (const filePath of matchedPaths) filePaths.add(filePath);
  }

  return [...filePaths].map((filePath) => Uri.file(filePath));
};

/** Files read in parallel while scanning the project. */
const FILE_READ_CONCURRENCY = 10;

/**
 * Every source file of the project using `dictionaryKey`, with the fields it
 * reads. Scans the files matched by the build traverse / compiler patterns.
 */
export const findUsagesOfDictionary = async (
  projectDir: string,
  dictionaryKey: string
): Promise<UsageLocation[]> => {
  const relevantFiles = await listProjectSourceFiles(projectDir);

  const usageLocations: UsageLocation[] = [];

  const analyzeFile = async (fileUri: Uri): Promise<void> => {
    try {
      const text = new TextDecoder('utf-8').decode(
        await workspace.fs.readFile(fileUri)
      );

      // Cheap pre-filter before parsing
      if (!text.includes(dictionaryKey)) return;

      const scriptContent = extractScriptContentWithAngularTemplate(
        text,
        extname(fileUri.fsPath).toLowerCase()
      );
      const fileUsage = analyzeFileForUsages(scriptContent, dictionaryKey);

      if (fileUsage) {
        usageLocations.push({ uri: fileUri, ...fileUsage });
      }
    } catch (error) {
      console.error(`Error parsing ${fileUri.fsPath}`, error);
    }
  };

  for (
    let index = 0;
    index < relevantFiles.length;
    index += FILE_READ_CONCURRENCY
  ) {
    await Promise.all(
      relevantFiles.slice(index, index + FILE_READ_CONCURRENCY).map(analyzeFile)
    );
  }

  return usageLocations;
};

/**
 * Analyse one file's script content for usages of `targetKey`, using the
 * registry-driven analyzer from `@intlayer/lsp` (covers useIntlayer member
 * chains and every compat form: t() calls, formatMessage, JSX components,
 * lingui tagged templates).
 *
 * Returned markers:
 *  - dotted field keys (+ parent prefixes) with precise ranges
 *  - `__ALL__` when field usage cannot be fully tracked (variable escapes,
 *    translator functions that may be forwarded or used in templates)
 *  - `__EXISTENCE_CHECK__` when the dictionary is referenced without any
 *    trackable binding (bare `getIntlayer('key')` call)
 */
const analyzeFileForUsages = (
  scriptContent: string,
  targetKey: string
): {
  range: Range;
  keysUsed: Set<string>;
  keyLocations: Map<string, Range[]>;
} | null => {
  const usages = collectMessageUsages(scriptContent).filter(
    (usage) => usage.dictionaryKey === targetKey
  );

  if (usages.length === 0) return null;

  const keysUsed = new Set<string>();
  const keyLocations = new Map<string, Range[]>();

  const offsetToPosition = createOffsetToPosition(scriptContent);
  const offsetsToRange = (start: number, end: number): Range => {
    const startPosition = offsetToPosition(start);
    const endPosition = offsetToPosition(end);
    return new Range(
      startPosition.line,
      startPosition.character,
      endPosition.line,
      endPosition.character
    );
  };

  const addLocation = (dottedKey: string, start: number, end: number) => {
    keysUsed.add(dottedKey);

    const parts = dottedKey.split('.');
    for (let i = 1; i < parts.length; i++) {
      keysUsed.add(parts.slice(0, i).join('.'));
    }

    const range = offsetsToRange(start, end);
    const list = keyLocations.get(dottedKey) ?? [];
    list.push(range);
    keyLocations.set(dottedKey, list);
  };

  let hasFieldUsage = false;

  for (const usage of usages) {
    if (usage.kind === 'namespace') continue;

    if (usage.fieldPath.length === 0) {
      // Bare reference to the whole content object — the variable escapes,
      // any field may be read.
      keysUsed.add(ALL_FIELDS_USED);
      continue;
    }

    hasFieldUsage = true;

    // Member chains anchor on the leaf property; other usages on their span.
    const leafSpan = usage.fieldSpans?.[usage.fieldSpans.length - 1];
    const start =
      usage.kind === 'member' && leafSpan ? leafSpan.start : usage.start;
    const end = usage.kind === 'member' && leafSpan ? leafSpan.end : usage.end;

    addLocation(usage.fieldPath.join('.'), start, end);
  }

  const bindings = collectCallerBindings(scriptContent).filter(
    (binding) => binding.dictionaryKey === targetKey
  );

  // Translator functions (t) may be forwarded, called with dynamic keys or
  // used inside stripped template regions — stay conservative.
  if (bindings.some((binding) => binding.bindingKind === 'translator')) {
    keysUsed.add(ALL_FIELDS_USED);
  }

  if (!hasFieldUsage && keysUsed.size === 0) {
    // Content binding without any tracked field usage: the usages are likely
    // in a stripped template region (Vue/Svelte) — don't flag fields unused.
    // Without any binding at all, the call only proves the dictionary exists.
    keysUsed.add(bindings.length > 0 ? ALL_FIELDS_USED : EXISTENCE_CHECK_ONLY);
  }

  const firstUsage = usages[0]!;

  return {
    range: offsetsToRange(firstUsage.start, firstUsage.end),
    keysUsed,
    keyLocations,
  };
};

/**
 * Scan results per `${projectDir}:${dictionaryKey}`. Cleared by the workspace
 * watchers when a source file is saved, created, deleted or renamed; the
 * `maxAge` of each caller bounds staleness from edits made outside VS Code.
 */
const usageCache = new Map<
  string,
  { timestamp: number; usages: UsageLocation[] }
>();

/**
 * `findUsagesOfDictionary`, reusing a scan younger than `maxAge` — a project
 * scan reads every source file.
 *
 * @param maxAge - Maximum age of a reused scan, in milliseconds.
 */
export const findCachedUsagesOfDictionary = async (
  projectDir: string,
  dictionaryKey: string,
  maxAge: number
): Promise<UsageLocation[]> => {
  const cacheKey = `${projectDir}:${dictionaryKey}`;
  const cached = usageCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.usages;
  }

  const usages = await findUsagesOfDictionary(projectDir, dictionaryKey);

  usageCache.set(cacheKey, { timestamp: Date.now(), usages });

  return usages;
};

export const clearUsageCache = (): void => {
  usageCache.clear();
};

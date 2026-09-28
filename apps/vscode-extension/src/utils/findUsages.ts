import { extname, resolve } from 'node:path';
import {
  collectCallerBindings,
  collectMessageUsages,
} from '@intlayer/lsp/utils';
import fg from 'fast-glob';
import { Range, Uri, workspace } from 'vscode';
import { extractScriptContent } from './extractScript';
import { getCachedConfig } from './intlayerCache';
import { offsetToLineCol } from './oxcParser';

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
const extractScriptContentWithAngular = (
  text: string,
  extension: string
): string => {
  let processedText = extractScriptContent(text, extension);

  if (extension === '.ts' && text.includes('@Component')) {
    const templateRegex = /template\s*:\s*(["'`])([\s\S]*?)\1/g;

    processedText = processedText.replace(
      templateRegex,
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

export const findUsagesOfDictionary = async (
  projectDir: string,
  dictionaryKey: string
): Promise<UsageLocation[]> => {
  const config = await getCachedConfig(projectDir);

  const traversePatterns = (config.build.traversePattern ?? []) as string[];
  const compilerPatterns: string[] = config.compiler.transformPattern
    ? ((Array.isArray(config.compiler.transformPattern)
        ? config.compiler.transformPattern
        : [config.compiler.transformPattern]) as string[])
    : [];

  const allPatterns = [...traversePatterns, ...compilerPatterns].filter(
    (p): p is string => typeof p === 'string'
  );
  const includePatterns = allPatterns.filter((p) => !p.startsWith('!'));
  const excludePatterns = [
    ...allPatterns.filter((p) => p.startsWith('!')).map((p) => p.slice(1)),
    ...(config.content.fileExtensions ?? []).map((ext) => `**/*${ext}`),
  ];

  const allRoots = [config.system.baseDir, ...(config.content.codeDir ?? [])];
  const uniqueRoots = [...new Set(allRoots.map((d) => resolve(d)))];

  const seenPaths = new Set<string>();
  const relevantFiles: Uri[] = [];

  for (const root of uniqueRoots) {
    const files = await fg(includePatterns, {
      cwd: root,
      ignore: excludePatterns,
      absolute: true,
      dot: false,
    });
    for (const f of files) {
      if (!seenPaths.has(f)) {
        seenPaths.add(f);
        relevantFiles.push(Uri.file(f));
      }
    }
  }

  const usageLocations: UsageLocation[] = [];
  const CONCURRENCY_LIMIT = 10;
  const chunks: Uri[][] = [];

  for (let i = 0; i < relevantFiles.length; i += CONCURRENCY_LIMIT) {
    chunks.push(relevantFiles.slice(i, i + CONCURRENCY_LIMIT));
  }

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (fileUri) => {
        try {
          const content = await workspace.fs.readFile(fileUri);
          const text = new TextDecoder('utf-8').decode(content);

          if (!text.includes(dictionaryKey)) return;

          const extension = extname(fileUri.fsPath).toLowerCase();
          const scriptContent = extractScriptContentWithAngular(
            text,
            extension
          );

          const fileUsage = analyzeFileForUsages(scriptContent, dictionaryKey);

          if (fileUsage) {
            usageLocations.push({ uri: fileUri, ...fileUsage });
          }
        } catch (e) {
          console.error(`Error parsing ${fileUri.fsPath}`, e);
        }
      })
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

  const offsetsToRange = (start: number, end: number): Range => {
    const startPosition = offsetToLineCol(scriptContent, start);
    const endPosition = offsetToLineCol(scriptContent, end);
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
      keysUsed.add('__ALL__');
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
    keysUsed.add('__ALL__');
  }

  if (!hasFieldUsage && keysUsed.size === 0) {
    // Content binding without any tracked field usage: the usages are likely
    // in a stripped template region (Vue/Svelte) — don't flag fields unused.
    // Without any binding at all, the call only proves the dictionary exists.
    keysUsed.add(bindings.length > 0 ? '__ALL__' : '__EXISTENCE_CHECK__');
  }

  const firstUsage = usages[0]!;

  return {
    range: offsetsToRange(firstUsage.start, firstUsage.end),
    keysUsed,
    keyLocations,
  };
};

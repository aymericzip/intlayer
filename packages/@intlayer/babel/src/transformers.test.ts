import { describe, expect, it, vi } from 'vitest';
import { buildNestedRenameMapFromContent } from './babel-plugin-intlayer-field-rename';
import type { OptimizePluginOptions } from './babel-plugin-intlayer-optimize';
import {
  createPruneContext,
  INTLAYER_CALLER_NAMES,
  type PruneContext,
} from './babel-plugin-intlayer-usage-analyzer';
import {
  analyzeFieldUsageInFile,
  buildUsageCheckRegex,
  getUsageCheckRegex,
  INTLAYER_USAGE_REGEX,
  optimizeSourceFile,
  renameFieldsInSourceFile,
} from './transformers';

vi.mock('@intlayer/engine/utils', () => ({
  getPathHash: (key: string) => `dicHash_${key}`,
}));

/**
 * TanStack Start route shape: the dictionary is read from an async `head`,
 * through `getIntlayerAsync` alone — no `useIntlayer` anywhere in the file.
 */
const ROUTE_HEAD_SOURCE = `
  import { createFileRoute } from '@tanstack/react-router';
  import { getIntlayerAsync } from 'intlayer';

  export const Route = createFileRoute('/{-$locale}')({
    head: async ({ params }) => {
      const { title, keywords } = await getIntlayerAsync(
        'locale-metadata',
        params.locale
      );

      return {
        meta: [{ title }, { name: 'keywords', content: keywords.join(', ') }],
      };
    },
  });
`;

describe('usage-check regexes', () => {
  it('matches every native caller name', () => {
    for (const callerName of INTLAYER_CALLER_NAMES) {
      expect(
        INTLAYER_USAGE_REGEX.test(`const content = ${callerName}('key');`)
      ).toBe(true);
    }
  });

  it('matches a file whose only caller is getIntlayerAsync', () => {
    // A miss here opts the whole file out of the optimize / purge / minify
    // passes, leaving the call to resolve through the dictionary registry —
    // which is empty in browser bundles.
    expect(INTLAYER_USAGE_REGEX.test(ROUTE_HEAD_SOURCE)).toBe(true);
    expect(buildUsageCheckRegex().test(ROUTE_HEAD_SOURCE)).toBe(true);
    expect(getUsageCheckRegex().test(ROUTE_HEAD_SOURCE)).toBe(true);
  });

  it('keeps matching the compat caller names it is given', () => {
    const usageCheckRegex = buildUsageCheckRegex(['useTranslation']);

    expect(usageCheckRegex.test(`const t = useTranslation('ns');`)).toBe(true);
    expect(usageCheckRegex.test(`const t = getIntlayerAsync('key');`)).toBe(
      true
    );
  });

  it('does not match unrelated identifiers', () => {
    expect(INTLAYER_USAGE_REGEX.test('const useIntlayerish = 1;')).toBe(false);
    expect(INTLAYER_USAGE_REGEX.test('const myGetIntlayer = 1;')).toBe(false);
  });
});

describe('analyzeFieldUsageInFile', () => {
  it('records the fields a getIntlayerAsync-only file consumes', async () => {
    const pruneContext = createPruneContext();

    await analyzeFieldUsageInFile(
      '/app/src/routes/{-$locale}/route.tsx',
      ROUTE_HEAD_SOURCE,
      pruneContext
    );

    expect(
      pruneContext.dictionaryKeyToFieldUsageMap.get('locale-metadata')
    ).toEqual(new Set(['title', 'keywords']));
  });
});

describe('optimizeSourceFile with field renaming', () => {
  const makeOptions = (filePath: string): OptimizePluginOptions => ({
    dictionariesDir: '/app/.intlayer/dictionary',
    dictionariesEntryPath: '/app/.intlayer/main/dictionaries.mjs',
    dynamicDictionariesDir: '/app/.intlayer/dynamic_dictionary',
    dynamicDictionariesEntryPath:
      '/app/.intlayer/main/dynamic_dictionaries.mjs',
    fetchDictionariesDir: '/app/.intlayer/fetch_dictionary',
    fetchDictionariesEntryPath: '/app/.intlayer/main/fetch_dictionaries.mjs',
    unmergedDictionariesDir: '/app/.intlayer/unmerged_dictionary',
    unmergedDictionariesEntryPath: '/app/.intlayer/main/unmerged.mjs',
    replaceDictionaryEntry: false,
    importMode: 'static',
    filesList: [filePath],
    dictionaryModeMap: {},
  });

  /** `about` dictionary renamed as `subtitle` → `a`, `title` → `b`. */
  const makeRenameContext = (): PruneContext => {
    const pruneContext = createPruneContext();
    pruneContext.dictionaryKeyToFieldRenameMap.set(
      'about',
      buildNestedRenameMapFromContent({ subtitle: 'S', title: 'T' })
    );
    return pruneContext;
  };

  it('renames and optimizes in one pass, matching two separate passes', async () => {
    const filePath = '/app/src/About.tsx';
    const code = `
      import { useIntlayer } from 'react-intlayer';
      export const About = () => {
        const { title } = useIntlayer('about');
        return title;
      };
    `;
    const options = makeOptions(filePath);

    const renamedCode =
      (await renameFieldsInSourceFile(filePath, code, makeRenameContext())) ??
      code;
    const twoPassResult = await optimizeSourceFile(
      renamedCode,
      filePath,
      options
    );
    const onePassResult = await optimizeSourceFile(
      code,
      filePath,
      options,
      makeRenameContext()
    );

    expect(onePassResult?.code).toBe(twoPassResult?.code);
    expect(onePassResult?.code).toContain('b: title');
    expect(onePassResult?.code).toContain('useDictionary');
    expect(onePassResult?.code).not.toContain("useIntlayer('about')");
  });
});

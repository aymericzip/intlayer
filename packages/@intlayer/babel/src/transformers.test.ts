import { describe, expect, it } from 'vitest';
import {
  createPruneContext,
  INTLAYER_CALLER_NAMES,
} from './babel-plugin-intlayer-usage-analyzer';
import {
  analyzeFieldUsageInFile,
  buildUsageCheckRegex,
  getUsageCheckRegex,
  INTLAYER_USAGE_REGEX,
} from './transformers';

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

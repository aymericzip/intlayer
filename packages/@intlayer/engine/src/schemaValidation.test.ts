import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { zodToTsString } from './createType/createModuleAugmentation';
import { filterInvalidDictionaries } from './filterInvalidDictionaries';

const configuration = {
  internationalization: { locales: ['en', 'fr'], strictMode: 'strict' },
  schemas: { seo: z.object({ title: z.string().min(3) }) },
} as unknown as IntlayerConfig;
const dictionary = (schema: string, title: unknown, location = 'local') =>
  ({
    key: 'page',
    schema,
    location,
    content: { title },
  }) as unknown as Dictionary;

describe('dictionary schemas', () => {
  it('rejects unknown names', () => {
    expect(() =>
      filterInvalidDictionaries(
        [dictionary('missing', 'title')],
        configuration,
        { checkSchema: true, throwOnSchemaError: true }
      )
    ).toThrow('unknown or invalid schema');
  });
  it('validates remote content and fails builds', () => {
    expect(() =>
      filterInvalidDictionaries(
        [dictionary('seo', 'x', 'remote')],
        configuration,
        { checkSchema: true, throwOnSchemaError: true }
      )
    ).toThrow('Schema validation failed');
  });
  it('filters invalid content in development', () => {
    expect(
      filterInvalidDictionaries([dictionary('seo', 'x')], configuration, {
        checkSchema: true,
      })
    ).toEqual([]);
  });
  it('converts Zod 4 records, tuples, defaults and optional fields', () => {
    const result = zodToTsString(
      z.object({
        values: z.record(z.string(), z.number()),
        pair: z.tuple([z.string(), z.number()]),
        enabled: z.boolean().default(true),
        optional: z.string().optional(),
        tags: z.array(z.string()),
      })
    );
    expect(result).toContain('Record<string, number>');
    expect(result).toContain('[string, number]');
    expect(result).toContain('"enabled"?: boolean');
    expect(result).toContain('"optional"?: string | undefined');
    expect(result).toContain('Array<string>');
  });
});

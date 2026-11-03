import { format } from 'prettier';
import { describe, expect, it } from 'vitest';
import intlayerPlugin, { createLocaleComparator } from './index';

const formatWithPlugin = (
  source: string,
  parser: string,
  pinnedLocales?: string[]
): Promise<string> =>
  format(source, {
    parser,
    plugins: [intlayerPlugin],
    singleQuote: true,
    ...(pinnedLocales ? { intlayerPinnedLocales: pinnedLocales } : {}),
  });

describe('createLocaleComparator', () => {
  it('keeps pinned locales first, then sorts alphabetically', () => {
    const compareLocales = createLocaleComparator(['en', 'fr']);

    expect(
      ['zh', 'fr', 'de', 'en-GB', 'en', 'ar'].sort(compareLocales)
    ).toEqual(['en', 'fr', 'ar', 'de', 'en-GB', 'zh']);
  });
});

describe('prettier-plugin-intlayer', () => {
  it('sorts t() locales with en pinned first', async () => {
    const source = `const content = {
  invitationNotFound: t({
    en: 'Invitation not found',
    ru: 'Приглашение не найдено',
    fr: 'Invitation introuvable',
    'he-IL': 'ההזמנה לא נמצאה',
    'en-GB': 'Invitation not found',
    ar: 'الدعوة غير موجودة',
  }),
};
`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(`const content = {
  invitationNotFound: t({
    en: 'Invitation not found',
    ar: 'الدعوة غير موجودة',
    'en-GB': 'Invitation not found',
    fr: 'Invitation introuvable',
    'he-IL': 'ההזמנה לא נמצאה',
    ru: 'Приглашение не найдено',
  }),
};
`);
  });

  it('honours intlayerPinnedLocales', async () => {
    const source = `t({ en: 'a', es: 'b', fr: 'c', de: 'd' });\n`;

    expect(await formatWithPlugin(source, 'babel', ['fr', 'en'])).toBe(
      `t({ fr: 'c', en: 'a', de: 'd', es: 'b' });\n`
    );
  });

  it('keeps comments attached to their locale', async () => {
    const source = `t({
  fr: 'b',
  // English copy
  en: 'a',
  de: 'c', // German copy
});
`;

    expect(await formatWithPlugin(source, 'babel-ts')).toBe(`t({
  // English copy
  en: 'a',
  de: 'c', // German copy
  fr: 'b',
});
`);
  });

  it('leaves objects with spreads or computed keys untouched', async () => {
    const source = `t({ fr: 'b', ...base, en: 'a' });\nt({ fr: 'b', [key]: 'c', en: 'a' });\n`;

    expect(await formatWithPlugin(source, 'babel')).toBe(source);
  });

  it('ignores objects outside of t()', async () => {
    const source = `const value = { fr: 'b', en: 'a' };\nother({ fr: 'b', en: 'a' });\n`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(source);
  });

  it('sorts serialized translation nodes in .content.json files', async () => {
    const source = `{
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "fr": "Bonjour", "es": "Hola", "en": "Hello" }
    }
  }
}
`;

    expect(await formatWithPlugin(source, 'json')).toBe(`{
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "es": "Hola", "fr": "Bonjour" }
    }
  }
}
`);
  });

  it('sorts plural() categories in CLDR order', async () => {
    const source = `plural({ other: 'd', many: 'c', one: 'a', few: 'b' });\n`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(
      `plural({ one: 'a', few: 'b', many: 'c', other: 'd' });\n`
    );
  });

  it('leaves plural() with unknown keys untouched', async () => {
    const source = `plural({ other: 'b', custom: 'a' });\n`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(source);
  });

  it('sorts enu() conditions by threshold, fallback last', async () => {
    const source = `enu({ fallback: 'e', '>=3': 'd', '2': 'c', '<-1': 'a', '0': 'b' });\n`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(
      `enu({ '<-1': 'a', '0': 'b', '2': 'c', '>=3': 'd', fallback: 'e' });\n`
    );
  });

  it('keeps enu() order when it decides which condition wins', async () => {
    // '<1' shadows '<=-2.3' for every negative quantity.
    const source = `enu({ '>5': 'a', '>=3': 'b' });\nenu({ '<1': 'a', '<=-2.3': 'b' });\n`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(source);
  });

  it('sorts serialized plural and enumeration nodes', async () => {
    const source = `{
  "a": { "nodeType": "plural", "plural": { "other": "x", "one": "y" } },
  "b": { "nodeType": "enumeration", "enumeration": { "fallback": "x", "1": "y", "0": "z" } }
}
`;

    expect(await formatWithPlugin(source, 'json')).toBe(`{
  "a": { "nodeType": "plural", "plural": { "one": "y", "other": "x" } },
  "b": {
    "nodeType": "enumeration",
    "enumeration": { "0": "z", "1": "y", "fallback": "x" }
  }
}
`);
  });

  it('sorts select() cases alphabetically, fallback last', async () => {
    const source = `select({ fallback: 'd', scheduled: 'c', draft: 'a', published: 'b' });\n`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(
      `select({ draft: 'a', published: 'b', scheduled: 'c', fallback: 'd' });\n`
    );
  });

  it('keeps the implicit select() fallback (last key) last', async () => {
    const source = `select({ scheduled: 'c', draft: 'a', unknown: 'z', published: 'b' });\n`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(
      `select({ draft: 'a', scheduled: 'c', unknown: 'z', published: 'b' });\n`
    );
  });

  describe('intlayerSortContentKeys', () => {
    const formatContentFile = (
      source: string,
      filepath: string,
      parser: string,
      sortContentKeys = true
    ): Promise<string> =>
      format(source, {
        parser,
        filepath,
        plugins: [intlayerPlugin],
        singleQuote: true,
        intlayerSortContentKeys: sortContentKeys,
      } as Parameters<typeof format>[1]);

    const source = `const content = {
  key: 'app',
  title: 'kept',
  content: {
    zeta: t({ fr: 'b', en: 'a' }),
    alpha: {
      gamma: 'c',
      beta: [{ y: 1, x: 2 }],
    },
    when: cond({ true: 'a', false: 'b' }),
    nested: t({ en: { b: 1, a: 2 } }),
  },
} satisfies Dictionary;

export default content;
`;

    it('sorts content and nested object keys in .content files', async () => {
      expect(
        await formatContentFile(source, 'src/app.content.ts', 'typescript')
      ).toBe(`const content = {
  key: 'app',
  title: 'kept',
  content: {
    alpha: {
      beta: [{ x: 2, y: 1 }],
      gamma: 'c',
    },
    nested: t({ en: { a: 2, b: 1 } }),
    when: cond({ true: 'a', false: 'b' }),
    zeta: t({ en: 'a', fr: 'b' }),
  },
} satisfies Dictionary;

export default content;
`);
    });

    it('sorts objects nested in every content helper', async () => {
      const helperSource = `export default {
  key: 'app',
  content: {
    plural: plural({ other: { b: 1, a: 2 }, one: { d: 1, c: 2 } }),
    select: select({ fallback: 'y', published: { b: 1, a: 2 }, draft: 'x' }),
    cond: cond({ true: { b: 1, a: 2 }, false: 'x' }),
    gender: gender({ male: { b: 1, a: 2 }, female: 'x' }),
    markdown: md(t({ fr: '# b', en: '# a' })),
    insert: insert(t({ en: { b: 1, a: 2 } })),
    file: file('./about.md'),
  },
};
`;

      expect(
        await formatContentFile(helperSource, 'app.content.ts', 'typescript')
      ).toBe(`export default {
  key: 'app',
  content: {
    cond: cond({ true: { a: 2, b: 1 }, false: 'x' }),
    file: file('./about.md'),
    gender: gender({ male: { a: 2, b: 1 }, female: 'x' }),
    insert: insert(t({ en: { a: 2, b: 1 } })),
    markdown: md(t({ en: '# a', fr: '# b' })),
    plural: plural({ one: { c: 2, d: 1 }, other: { a: 2, b: 1 } }),
    select: select({ draft: 'x', published: { a: 2, b: 1 }, fallback: 'y' }),
  },
};
`);
    });

    it('is off by default and outside .content files', async () => {
      const disabled = await formatContentFile(
        source,
        'src/app.content.ts',
        'typescript',
        false
      );
      const otherFile = await formatContentFile(
        source,
        'src/app.ts',
        'typescript'
      );

      expect(disabled).toContain('zeta: t({ en:');
      expect(disabled.indexOf('zeta')).toBeLessThan(disabled.indexOf('alpha'));
      expect(otherFile).toBe(disabled);
    });

    it('sorts .content.json files, keeping serialized nodes intact', async () => {
      const jsonSource = `{
  "key": "app",
  "content": {
    "b": { "nodeType": "translation", "translation": { "fr": "x", "en": "y" } },
    "a": "z"
  }
}
`;

      expect(
        await formatContentFile(jsonSource, 'app.content.json', 'json')
      ).toBe(`{
  "key": "app",
  "content": {
    "a": "z",
    "b": { "nodeType": "translation", "translation": { "en": "y", "fr": "x" } }
  }
}
`);
    });
  });

  describe('intlayerCollapseIdenticalTranslations', () => {
    const formatFile = (
      source: string,
      filepath: string,
      parser: string,
      collapse?: boolean
    ): Promise<string> =>
      format(source, {
        parser,
        filepath,
        plugins: [intlayerPlugin],
        singleQuote: true,
        ...(collapse === undefined
          ? {}
          : { intlayerCollapseIdenticalTranslations: collapse }),
      } as Parameters<typeof format>[1]);

    const source = `export default {
  key: 'demo',
  content: {
    nextjs: t({ en: 'Next.js', fr: 'Next.js', 'en-GB': 'Next.js' }),
    title: t({ en: 'Hello', fr: 'Bonjour' }),
    single: t({ en: 'Only' }),
    typed: t<string>({ en: 'Same', fr: 'Same' }),
    commented: t({
      en: 'Same', // keep me
      fr: 'Same',
    }),
    rich: t({ en: md('# a'), fr: md('# a') }),
  },
};
`;

    it('collapses t() whose locales share one string, in .content files', async () => {
      expect(
        await formatFile(source, 'demo.content.ts', 'typescript')
      ).toBe(`export default {
  key: 'demo',
  content: {
    nextjs: 'Next.js',
    title: t({ en: 'Hello', fr: 'Bonjour' }),
    single: t({ en: 'Only' }),
    typed: t<string>({ en: 'Same', fr: 'Same' }),
    commented: t({
      en: 'Same', // keep me
      fr: 'Same',
    }),
    rich: t({ en: md('# a'), fr: md('# a') }),
  },
};
`);
    });

    it('can be disabled, and never runs outside .content files', async () => {
      const disabled = await formatFile(
        source,
        'demo.content.ts',
        'typescript',
        false
      );

      expect(disabled).toContain("nextjs: t({ en: 'Next.js'");
      expect(await formatFile(source, 'demo.ts', 'typescript')).toBe(disabled);
    });

    it('collapses serialized translation nodes in .content.json', async () => {
      const jsonSource = `{
  "key": "demo",
  "content": {
    "nextjs": { "nodeType": "translation", "translation": { "en": "Next.js", "fr": "Next.js" } },
    "title": { "nodeType": "translation", "translation": { "fr": "Bonjour", "en": "Hello" } }
  }
}
`;

      expect(await formatFile(jsonSource, 'demo.content.json', 'json')).toBe(`{
  "key": "demo",
  "content": {
    "nextjs": "Next.js",
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour" }
    }
  }
}
`);
    });
  });
});

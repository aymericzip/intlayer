import type { IntlayerConfig } from '@intlayer/types/config';
import { describe, expect, it } from 'vitest';
import {
  mergeWithExistingMultilingualDictionary,
  mergeWithExistingPerLocaleDictionary,
} from './contentWriter';
import { detectExtractableContent } from './detectExtractableContent';
import { processTsxFile } from './processTsxFile';
import { getReadFieldsByDictionary } from './utils/getReadFields';

const configuration = {
  internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
  compiler: { dictionaryKeyPrefix: '' },
  content: { fileExtensions: ['.content.ts'], contentDir: ['/project/src'] },
  system: { baseDir: '/project' },
} as unknown as IntlayerConfig;

const componentCode = `export const Home = () => (
  <div>
    <h1>My title</h1>
    <input placeholder="Search here" />
    {/* intlayer-ignore-next-line */}
    <p>Brand name</p>
  </div>
);
`;

describe('detectExtractableContent', () => {
  const detected = detectExtractableContent(
    componentCode,
    '/project/src/Home.tsx',
    configuration
  );

  it('lists the strings the extractor would pick up, ignored ones excluded', () => {
    expect(detected.map((content) => content.text)).toEqual([
      'My title',
      'Search here',
    ]);
  });

  it('spans the rewritten source', () => {
    const [title] = detected;

    expect(componentCode.slice(title!.start, title!.end)).toBe('My title');
  });

  it('picks the comment syntax valid above each line', () => {
    expect(detected.map((content) => content.ignoreCommentStyle)).toEqual([
      'jsx',
      'jsx',
    ]);

    const [statementLevel] = detectExtractableContent(
      `export const label = () => 'Hello world';\n`,
      '/project/src/label.ts',
      configuration
    );

    expect(statementLevel?.ignoreCommentStyle).toBe('js');
  });

  it('returns nothing for an ignored file', () => {
    expect(
      detectExtractableContent(
        `// intlayer-ignore-file\n${componentCode}`,
        '/project/src/Home.tsx',
        configuration
      )
    ).toEqual([]);
  });
});

describe('processTsxFile with a selection', () => {
  const connectedCode = `import { useIntlayer } from 'react-intlayer';

export const Home = () => {
  const content = useIntlayer('home');

  return (
    <div>
      <h2>{content.myTitle}</h2>
      <h1>My title</h1>
      <input placeholder="Search here" />
    </div>
  );
};
`;
  const titleStart = connectedCode.indexOf('My title');

  const result = processTsxFile(
    '/project/src/Home.tsx',
    'home',
    'react-intlayer',
    configuration,
    false,
    { home: [{ key: 'home', content: { myTitle: 'Existing title' } }] },
    connectedCode,
    { start: titleStart, end: titleStart + 'My title'.length }
  );

  it('extracts the selected string only', () => {
    expect(Object.values(result!.extractedContent.home!)).toEqual(['My title']);
    expect(result!.modifiedCode).toContain('placeholder="Search here"');
    expect(result!.modifiedCode).toContain('<h1>{content.myTitle1}</h1>');
  });

  it('never reuses a field already declared in the dictionary', () => {
    expect(Object.keys(result!.extractedContent.home!)).toEqual(['myTitle1']);
  });
});

describe('mergeWithExistingMultilingualDictionary without pruning', () => {
  it('keeps the existing fields', () => {
    const merged = mergeWithExistingMultilingualDictionary(
      { added: 'Added' },
      {
        key: 'home',
        content: {
          kept: { nodeType: 'translation', translation: { en: 'Kept' } },
        },
      } as never,
      'en',
      false
    );

    expect(Object.keys(merged)).toEqual(['kept', 'added']);
  });
});

describe('extraction next to fields the component already reads', () => {
  const sidebarCode = `import { useIntlayer } from 'react-intlayer';

export const Home = () => {
  const content = useIntlayer('sidebar');

  return (
    <div>
      <h2>{content.myTitle}</h2>
      <h1>My title</h1>
    </div>
  );
};
`;
  const unmergedDictionaries = {
    sidebar: [{ key: 'sidebar', content: { myTitle: 'Existing title' } }],
  };
  const titleStart = sidebarCode.indexOf('My title');

  it('reserves the fields of the dictionary the component names', () => {
    const result = processTsxFile(
      '/project/src/Home.tsx',
      'home',
      'react-intlayer',
      configuration,
      false,
      unmergedDictionaries,
      sidebarCode,
      { start: titleStart, end: titleStart + 'My title'.length }
    );

    expect(result!.extractedContent).toEqual({
      sidebar: { myTitle1: 'My title' },
    });
  });

  it('never gives a read field to another text on a full extraction', () => {
    const result = processTsxFile(
      '/project/src/Home.tsx',
      'home',
      'react-intlayer',
      configuration,
      false,
      {},
      sidebarCode
    );

    expect(result!.extractedContent).toEqual({
      sidebar: { myTitle1: 'My title' },
    });
  });
});

describe('getReadFieldsByDictionary', () => {
  it('lists member, computed and destructured reads per dictionary', () => {
    const readFields = getReadFieldsByDictionary(`
      const A = () => {
        const content = useIntlayer('a');
        return <p title={content['label']}>{content.title.value}</p>;
      };
      const B = () => {
        const { first, second: renamed } = useIntlayer('b');
        return <p>{first}{renamed}</p>;
      };
    `);

    expect([...(readFields.get('a') as Set<string>)]).toEqual([
      'label',
      'title',
    ]);
    expect([...(readFields.get('b') as Set<string>)]).toEqual([
      'first',
      'second',
    ]);
  });

  it('gives up when the dictionary is read where fields cannot be traced', () => {
    const readFields = getReadFieldsByDictionary(`
      const A = () => {
        const content = useIntlayer('a');
        return <Child content={content} />;
      };
      const B = () => {
        const { first, ...rest } = useIntlayer('b');
        return <Child {...rest} />;
      };
    `);

    expect(readFields.get('a')).toBe('all');
    expect(readFields.get('b')).toBe('all');
  });
});

describe('pruning merge with kept fields', () => {
  it('spares the fields the component reads (multilingual)', () => {
    const merged = mergeWithExistingMultilingualDictionary(
      { added: 'Added' },
      {
        key: 'home',
        content: {
          read: { nodeType: 'translation', translation: { en: 'Read' } },
          stale: { nodeType: 'translation', translation: { en: 'Stale' } },
        },
      } as never,
      'en',
      true,
      new Set(['read'])
    );

    expect(Object.keys(merged)).toEqual(['read', 'added']);
  });

  it('spares the fields the component reads (per-locale)', () => {
    const merged = mergeWithExistingPerLocaleDictionary(
      { added: 'Added' },
      {
        key: 'home',
        locale: 'en',
        content: { read: 'Read', stale: 'Stale' },
      } as never,
      true,
      new Set(['read'])
    );

    expect(merged).toEqual({ read: 'Read', added: 'Added' });
  });

  it('keeps every existing field without pruning (per-locale)', () => {
    const merged = mergeWithExistingPerLocaleDictionary(
      { added: 'Added' },
      {
        key: 'home',
        locale: 'en',
        content: { kept: 'Kept' },
      } as never,
      false
    );

    expect(merged).toEqual({ kept: 'Kept', added: 'Added' });
  });
});

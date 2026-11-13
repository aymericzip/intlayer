import { describe, expect, it } from 'vitest';
import {
  buildCompilerTextPattern,
  type CompilerDictionary,
  collectCompilerTextFields,
  findCompilerTextAtOffset,
  findCompilerTextSpans,
  toComponentFilePath,
} from './compilerTextUsage';

const translation = (values: Record<string, string>) => ({
  nodeType: 'translation',
  translation: values,
});

const multilingualDictionary: CompilerDictionary = {
  key: 'home',
  componentFilePath: 'src/Home.tsx',
  content: {
    myTitle: translation({ en: 'My title', fr: 'Mon titre' }),
    add: translation({ en: 'Add', fr: 'Ajouter' }),
    addItem: translation({ en: 'Add item', fr: 'Ajouter un élément' }),
    greeting: {
      nodeType: 'insertion',
      insertion: translation({
        en: 'Hello {{name}}!',
        fr: 'Bonjour {{name}} !',
      }),
      fields: ['name'],
    },
  },
};

describe('toComponentFilePath', () => {
  it('returns a POSIX path relative to the project root', () => {
    expect(toComponentFilePath('/project', '/project/src/Home.tsx')).toBe(
      'src/Home.tsx'
    );
  });
});

describe('collectCompilerTextFields', () => {
  it('reads the source-locale text of translation and insertion nodes', () => {
    expect(collectCompilerTextFields([multilingualDictionary], 'en')).toEqual([
      { dictionaryKey: 'home', fieldPath: ['myTitle'], text: 'My title' },
      { dictionaryKey: 'home', fieldPath: ['add'], text: 'Add' },
      { dictionaryKey: 'home', fieldPath: ['addItem'], text: 'Add item' },
      {
        dictionaryKey: 'home',
        fieldPath: ['greeting'],
        text: 'Hello {{name}}!',
      },
    ]);
  });

  it('reads plain strings of the source-locale per-locale dictionary only', () => {
    const fields = collectCompilerTextFields(
      [
        {
          key: 'home',
          locale: 'en',
          componentFilePath: 'src/Home.tsx',
          content: { myTitle: 'My title' },
        },
        {
          key: 'home',
          locale: 'fr',
          componentFilePath: 'src/Home.tsx',
          content: { myTitle: 'Mon titre' },
        },
      ],
      'en'
    );

    expect(fields).toEqual([
      { dictionaryKey: 'home', fieldPath: ['myTitle'], text: 'My title' },
    ]);
  });

  it('ignores dictionaries the compiler did not generate', () => {
    expect(
      collectCompilerTextFields(
        [{ key: 'home', content: { myTitle: 'My title' } }],
        'en'
      )
    ).toEqual([]);
  });
});

describe('findCompilerTextSpans', () => {
  it('matches JSX text wrapped over several lines', () => {
    const source = '<h1>\n  My\n  title\n</h1>';

    const start = source.indexOf('My');

    expect(findCompilerTextSpans(source, 'My title')).toEqual([
      { start, end: source.indexOf('\n</h1>') },
    ]);
  });

  it('matches interpolations in every source form', () => {
    const sources = [
      '<p>Hello {name}!</p>',
      '`Hello ${user.name}!`',
      '<p>Hello {{ name }}!</p>',
    ];

    for (const source of sources) {
      expect(findCompilerTextSpans(source, 'Hello {{name}}!')).toHaveLength(1);
    }
  });

  it('matches whole words only', () => {
    const source = 'const onSave = () => {}; <button>Save</button> Saved';

    const start = source.indexOf('>Save<') + 1;

    expect(findCompilerTextSpans(source, 'Save')).toEqual([
      { start, end: start + 'Save'.length },
    ]);
  });

  it('matches escaped quotes in string literals', () => {
    expect(findCompilerTextSpans("'Don\\'t stop'", "Don't stop")).toHaveLength(
      1
    );
  });

  it('matches text written with entities or escape sequences', () => {
    const cases: [source: string, text: string][] = [
      ['<p>Fish &amp; chips</p>', 'Fish & chips'],
      ['<p>Hello&nbsp;world</p>', 'Hello\u00a0world'],
      ["const label = 'Line one\\nLine two'", 'Line one\nLine two'],
      ["const label = 'Caf\\u00e9 open'", 'Café open'],
    ];

    for (const [source, text] of cases) {
      expect(findCompilerTextSpans(source, text)).toHaveLength(1);
    }
  });

  it('builds no pattern for placeholder-only text', () => {
    expect(buildCompilerTextPattern('{{count}}')).toBeNull();
  });
});

describe('findCompilerTextAtOffset', () => {
  const fields = collectCompilerTextFields([multilingualDictionary], 'en');

  it('returns the field written at the offset', () => {
    const source = '<h1>My title</h1>';

    expect(
      findCompilerTextAtOffset(source, source.indexOf('title'), fields)?.field
        .fieldPath
    ).toEqual(['myTitle']);
  });

  it('prefers the longest text when several fields overlap', () => {
    const source = '<button>Add item</button><button>Add</button>';

    expect(
      findCompilerTextAtOffset(source, source.indexOf('Add'), fields)?.field
        .fieldPath
    ).toEqual(['addItem']);
    expect(
      findCompilerTextAtOffset(source, source.lastIndexOf('Add'), fields)?.field
        .fieldPath
    ).toEqual(['add']);
  });

  it('returns null outside any extracted text', () => {
    const source = '<h1 className="title">My title</h1>';

    expect(findCompilerTextAtOffset(source, 5, fields)).toBeNull();
  });

  it('gives text shared by several dictionaries to the one named above', () => {
    const sharedFields = [
      { dictionaryKey: 'header', fieldPath: ['save'], text: 'Save' },
      { dictionaryKey: 'footer', fieldPath: ['save'], text: 'Save' },
    ];
    const source = [
      "const Header = () => { useIntlayer('header'); return <b>Save</b>; };",
      "const Footer = () => { useIntlayer('footer'); return <b>Save</b>; };",
    ].join('\n');

    expect(
      findCompilerTextAtOffset(source, source.indexOf('Save'), sharedFields)
        ?.field.dictionaryKey
    ).toBe('header');
    expect(
      findCompilerTextAtOffset(source, source.lastIndexOf('Save'), sharedFields)
        ?.field.dictionaryKey
    ).toBe('footer');
  });
});

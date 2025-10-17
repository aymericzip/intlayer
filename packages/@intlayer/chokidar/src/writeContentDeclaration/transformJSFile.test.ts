import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cond, enu, gender, insert, md, nest, t } from '@intlayer/core';
import { fileContent as file } from '@intlayer/core/file';
import {
  type CustomIntlayerConfig,
  type Dictionary,
  Locales,
} from '@intlayer/types';
import deepmerge from 'deepmerge';
import { describe, expect, it, vi } from 'vitest';
import { transformJSFile } from './transformJSFile';

// Compute absolute path to the test content file
const testFilePath = resolve(
  process.cwd(),
  'src/writeContentDeclaration/_test.content.ts'
);

vi.mock('@intlayer/config/built', () => ({
  default: {
    content: {
      baseDir: process.cwd(),
    } as CustomIntlayerConfig,
  },
}));

// Read the file contents as string for the transform
const initialFileContentString = await readFile(testFilePath, 'utf-8');

// Import after globals are set so `file()` can resolve paths
const { default: initialFileContent } = await import('./_test.content');

describe('transformJSFile', () => {
  it('should not change the file if the dictionary is the same', async () => {
    const result = await transformJSFile(
      initialFileContentString,
      initialFileContent
    );

    expect(typeof result).toBe('string');
    expect(result).toBe(initialFileContentString);
  });

  it('add new string entries', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        title: 'Hello',
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    // Title should be replaced with a string literal "Hello"
    expect(result).toContain('title: "Hello"');
  });

  it('add new translation entries', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        title: t({
          en: 'Hello',
          fr: 'Bonjour',
          es: 'Hola',
        }),
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('title: t({');
    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
    expect(result).toContain('es: "Hola"');
  });

  it('update existing translation entries', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        welcomeMessage: t({
          en: 'Hello',
          fr: 'Bonjour',
          es: 'Hola',
        }),
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('welcomeMessage: t({');
    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
    expect(result).toContain('es: "Hola"');
  });

  it('add new translation entries in an array', async () => {
    const dictionary: Dictionary = deepmerge(
      initialFileContent,
      {
        content: {
          arrayOfTranslations: [
            t({
              en: 'Hello 3',
              fr: 'Bonjour 3',
            }),
            t({
              en: 'Hello 2',
              fr: 'Bonjour 2',
            }),
          ],
        },
      },
      {
        arrayMerge: (_destinationArray, sourceArray) => sourceArray,
      }
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayOfTranslations: [');
    expect(result).toContain('t({');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('fr: "Bonjour 3"');
    expect(result).toContain('t({');
    expect(result).toContain('en: "Hello 2"');
    expect(result).toContain('fr: "Bonjour 2"');
  });

  it('add new primitive entries (number, boolean, null)', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        newNumber: 42,
        newBoolean: true,
        newNull: null as any,
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('newNumber: 42');
    expect(result).toContain('newBoolean: true');
    expect(result).toContain('newNull: null');
  });

  it('supports hyphenated locale keys and keeps proper quoting', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        hyphenTrans: t({
          en: 'Hi',
          'en-GB': 'Hello',
        }),
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('hyphenTrans: t({');
    expect(result).toContain('en: "Hi"');
    expect(result).toContain('"en-GB": "Hello"');
  });

  it('skips translation updates when values are not plain strings', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        // Simulate non-string translation values; implementation should skip
        badTrans: t({ en: 123 as any }),
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).not.toContain('badTrans: t({');
  });

  it('update translation entries locale in an array or translation', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        contentMultilingual: t({
          en: 'Hello 3',
          fr: 'Bonjour 3',
        }),
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('contentMultilingual: t({');
    expect(result).toContain('en: "Hello 3"');
  });

  it('update translation entries locale in an markdown', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        markdownMultilingual: md(t({ en: 'Hello 3', fr: 'Bonjour 3' })),
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('markdownMultilingual: md(t({');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('fr: "Bonjour 3"');
  });

  it('update translation entries locale in an markdown', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        markdownMultilingual2: md(t({ en: 'Hello 3', fr: 'Bonjour 3' })),
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('markdownMultilingual2: md(');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('fr: "Bonjour 3"');
  });

  it('works with ESM default export (object literal)', async () => {
    const esmContent = `export default { key: 'x', content: { existing: 'value' } };`;
    const dict: Dictionary = { content: { title: 'Hello' } } as any;
    const result = await transformJSFile(esmContent, dict);
    expect(result).toContain('title: "Hello"');
    expect(result).toContain('export default');
  });

  it('works with ESM default export (identifier)', async () => {
    const esmContent = `const d = { key: 'x', content: { existing: 'value' } };\nexport default d;`;
    const dict: Dictionary = { content: { title: 'Hello' } } as any;
    const result = await transformJSFile(esmContent, dict);
    expect(result).toContain('title: "Hello"');
    expect(result).toContain('export default d');
  });

  it('works with CJS module.exports assignment', async () => {
    const cjsContent = `module.exports = { key: 'x', content: { existing: 'value' } };`;
    const dict: Dictionary = { content: { title: 'Hello' } } as any;
    const result = await transformJSFile(cjsContent, dict);
    expect(result).toContain('title: "Hello"');
    expect(result).toContain('module.exports');
  });

  it('works with CJS exports.default assignment', async () => {
    const cjsContent = `exports.default = { key: 'x', content: { existing: 'value' } };`;
    const dict: Dictionary = { content: { title: 'Hello' } } as any;
    const result = await transformJSFile(cjsContent, dict);
    expect(result).toContain('title: "Hello"');
    expect(result).toContain('exports.default');
  });

  it('adds enum node', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        enumTest: enu({ '0': 'none', '1': 'one', '>1': 'many' }),
      },
    });
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toContain('enumTest: enu({');
    expect(result).toContain('"0": "none"');
    expect(result).toContain('"1": "one"');
    expect(result).toContain('">1": "many"');
  });

  it('adds markdown nodes (inline and from file)', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        mdInline: md('# Title'),
        mdFromFile: md(file('./file.md')),
      },
    });
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toContain('mdInline: md("# Title")');
    expect(result).toContain('mdFromFile: md(file("./file.md"))');
  });

  it('adds cond, gender, insert, and nest nodes', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        condNode: cond({ true: 'y', false: 'n', fallback: 'f' }),
        genderNode: gender({ male: 'm', female: 'f', fallback: 'x' }),
        insertNode: insert('Hello {{name}}'),
        nestNode: nest('code'),
      },
    });
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toContain('condNode: cond({');
    expect(result).toContain('"true": "y"');
    expect(result).toContain('"false": "n"');
    expect(result).toContain('fallback: "f"');
    expect(result).toContain('genderNode: gender({');
    expect(result).toContain('male: "m"');
    expect(result).toContain('female: "f"');
    expect(result).toContain('fallback: "x"');
    expect(result).toContain('insertNode: insert("Hello {{name}}")');
    expect(result).toContain('nestNode: nest("code")');
  });

  it('ignores object literal additions', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        newObject: { foo: 'bar' },
      },
    });
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toBe(initialFileContentString);
  });

  it('ignores nested translations inside new nested objects', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        nested: { title: t({ en: 'X', fr: 'Y' }) },
      },
    });
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toBe(initialFileContentString);
  });

  it('adds a new string element to an existing array', async () => {
    const dictionary: Dictionary = deepmerge(
      initialFileContent,
      {
        content: {
          arrayContent: [
            'string',
            'string2',
            'string3',
            'string4',
            'string5',
            'string6',
          ],
        },
      },
      {
        arrayMerge: (_destinationArray, sourceArray) => sourceArray,
      }
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayContent: [');
    expect(result).toContain('"string6"');
  });

  it('creates a new array property with a t() node element', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        arrayWithTranslations: [
          t({
            en: 'Hello',
            fr: 'Bonjour',
          }),
        ],
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayWithTranslations: [');
    expect(result).toContain('t({');
    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
  });

  it('update translation entries with fallback locale', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        welcomeMessage: 'Hello',
      },
    });

    const result = await transformJSFile(
      initialFileContentString,
      dictionary,
      Locales.ENGLISH
    );

    expect(result).toContain('welcomeMessage: t({');
    expect(result).toContain('en: "Hello"');
  });

  it('adds missing import for t() when adding new translation', async () => {
    const fileWithoutImports = `export default { key: 'test', content: { existing: 'value' } };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        title: t({ en: 'Hello', fr: 'Bonjour' }),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    // Check that the import was added
    expect(result).toContain('import { t } from "intlayer"');
    // Check that the content was added
    expect(result).toContain('title: t({ en: "Hello", fr: "Bonjour" })');
  });

  it('adds missing import for enu() when adding enumeration', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        count: enu({ '0': 'none', '1': 'one', '>1': 'many' }),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { enu } from "intlayer"');
    expect(result).toContain('count: enu({');
  });

  it('adds missing import for cond() when adding condition', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        status: cond({ true: 'yes', false: 'no', fallback: 'maybe' }),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { cond } from "intlayer"');
    expect(result).toContain('status: cond({');
  });

  it('adds missing import for gender() when adding gender node', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        pronoun: gender({ male: 'he', female: 'she', fallback: 'they' }),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { gender } from "intlayer"');
    expect(result).toContain('pronoun: gender({');
  });

  it('adds missing import for insert() when adding insertion', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        greeting: insert('Hello {{name}}'),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { insert } from "intlayer"');
    expect(result).toContain('greeting: insert("Hello {{name}}")');
  });

  it('adds missing import for md() when adding markdown', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        description: md('# Title'),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { md } from "intlayer"');
    expect(result).toContain('description: md("# Title")');
  });

  it('adds missing imports for md() and file() when adding markdown with file', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        readme: md(file('./README.md')),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { md } from "intlayer"');
    expect(result).toContain('import { file } from "intlayer/file"');
    expect(result).toContain('readme: md(file("./README.md"))');
  });

  it('adds missing import for nest() when adding nested content', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        nested: nest('other-key'),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { nest } from "intlayer"');
    expect(result).toContain('nested: nest("other-key")');
  });

  it('adds multiple missing imports at once', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        title: t({ en: 'Hello' }),
        count: enu({ '0': 'none', '1': 'one' }),
        description: md('# Title'),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { enu, md, t } from "intlayer"');
  });

  it('does not duplicate existing imports', async () => {
    const fileWithExistingImport = `import { t } from "intlayer";\nexport default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        title: t({ en: 'Hello' }),
      },
    };

    const result = await transformJSFile(fileWithExistingImport, dict);

    // Should not add a second import
    const importCount = (result.match(/import \{ t \} from "intlayer"/g) || [])
      .length;
    expect(importCount).toBe(1);
  });

  it('adds to existing import statement when some imports are missing', async () => {
    const fileWithPartialImport = `import { t } from "intlayer";\nexport default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        title: t({ en: 'Hello' }),
        count: enu({ '0': 'none' }),
      },
    };

    const result = await transformJSFile(fileWithPartialImport, dict);

    // Should add enu to existing import
    expect(result).toContain('import { enu, t } from "intlayer"');
  });

  it('adds imports for translations within arrays', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        messages: [t({ en: 'Hello', fr: 'Bonjour' })],
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { t } from "intlayer"');
    expect(result).toContain('messages: [ t({');
  });

  it('adds imports for insert() with nested translation', async () => {
    const fileWithoutImports = `export default { key: 'test', content: {} };`;
    const dict: Dictionary = {
      key: 'test',
      content: {
        greeting: insert(t({ en: 'Hello {{name}}', fr: 'Bonjour {{name}}' })),
      },
    };

    const result = await transformJSFile(fileWithoutImports, dict);

    expect(result).toContain('import { insert, t } from "intlayer"');
    expect(result).toContain('greeting: insert(t({');
  });

  it('update translation entries with fallback locale', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        welcomeMessage: 'Hello',
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('welcomeMessage: t({');
    expect(result).toContain('en: "Hello"');
  });

  it('update translation entries with fallback locale in an array', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        arrayOfTranslations: ['Hello 3', 'Hello 2'],
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayOfTranslations: [');
    expect(result).toContain('en: "Hello 3"');
  });

  it('update translation entries with fallback locale in an array or translation', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        arrayOfTranslations: ['Hello 3', 'Hello 2'],
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayOfTranslations: [');
    expect(result).toContain('en: "Hello 3"');
  });

  it('update translation entries locale in an array of translations', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        translationOfArray: ['Hello 3', 'Hello 2'],
      },
    });

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('translationOfArray: [');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('en: "Hello 2"');
  });

  it('update translation entries locale in an markdown with fallback locale', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        markdownMultilingual: md('Hello 3'),
      },
    });

    const result = await transformJSFile(
      initialFileContentString,
      dictionary,
      Locales.ENGLISH
    );

    expect(result).toContain('markdownMultilingual: md(');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('fr: "## test fr"');
  });

  it('update translation entries locale in an markdown with fallback locale', async () => {
    const dictionary: Dictionary = deepmerge(initialFileContent, {
      content: {
        markdownMultilingual2: md('Hello 3'),
      },
    });

    const result = await transformJSFile(
      initialFileContentString,
      dictionary,
      Locales.ENGLISH
    );

    expect(result).toContain('markdownMultilingual2: md(t({');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('fr: "## test fr"');
  });
});

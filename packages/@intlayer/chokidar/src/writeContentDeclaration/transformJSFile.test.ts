import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  cond,
  type Dictionary,
  enu,
  gender,
  insert,
  md,
  nest,
  t,
} from '@intlayer/core';
import { file as intFile } from '@intlayer/core/file';
import deepmerge from 'deepmerge';
import { describe, expect, it } from 'vitest';
import { transformJSFile } from './transformJSFile';

// Compute absolute path to the test content file
const testFilePath = resolve(
  process.cwd(),
  'src/writeContentDeclaration/_test.content.ts'
);

// Inject globals required by `file()` before importing the content module
(globalThis as any).intlayer_file_path = testFilePath;
(globalThis as any).intlayer_file_dir = dirname(testFilePath);

// Also set them as global variables for direct access
(global as any).intlayer_file_path = testFilePath;
(global as any).intlayer_file_dir = dirname(testFilePath);

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
        mdFromFile: md(intFile('./file.md')),
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
    const dictionary: Dictionary = deepmerge(initialFileContent, {
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
    });

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
});

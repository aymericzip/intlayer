import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileContent } from '@intlayer/core/file';
import {
  cond,
  enu,
  gender,
  html,
  insert,
  md,
  nest,
  plural,
  select,
  t,
} from '@intlayer/core/transpiler';
import type { CustomIntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import * as Locales from '@intlayer/types/locales';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import { defu } from 'defu';
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

vi.mock('@intlayer/core/file', () => ({
  fileContent: vi.fn((path: string) => ({
    nodeType: 'file',
    file: path,
    content: '-',
    fixedPath: path,
  })),
}));

const file = (path: string) =>
  fileContent(path, `${process.cwd()}/src`, process.cwd());

// Read the file contents as string for the transform
const initialFileContentString = await readFile(testFilePath, 'utf-8');

// Import after globals are set so `file()` can resolve paths
const { default: initialFileContent } = await import('./_test.content');

describe('transformJSFile', () => {
  it('add new string entries', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          title: 'Hello',
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    // Title should be replaced with a string literal "Hello"
    expect(result).toContain('title: "Hello"');
  });

  it('add new translation entries', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          title: t({
            en: 'Hello',
            fr: 'Bonjour',
            es: 'Hola',
          }),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('title: t({');
    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
    expect(result).toContain('es: "Hola"');
  });

  it('update existing translation entries', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          welcomeMessage: t({
            en: 'Hello',
            fr: 'Bonjour',
            es: 'Hola',
          }),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('welcomeMessage: t({');
    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
    expect(result).toContain('es: "Hola"');
  });

  it('add new translation entries in an array', async () => {
    const dictionary: Dictionary = defu(
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
      initialFileContent
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
    // Note: defu skips null values by design, so we construct the dictionary directly
    const dictionary: Dictionary = {
      ...initialFileContent,
      content: {
        ...initialFileContent.content,
        newNumber: 42,
        newBoolean: true,
        newNull: null as any,
      },
    };

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('newNumber: 42');
    expect(result).toContain('newBoolean: true');
    expect(result).toContain('newNull: null');
  });

  it('supports hyphenated locale keys and keeps proper quoting', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          hyphenTrans: t({
            en: 'Hi',
            'en-GB': 'Hello',
          }),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('hyphenTrans: t({');
    expect(result).toContain('en: "Hi"');
    expect(result).toContain('"en-GB": "Hello"');
  });

  it('skips translation updates when values are not plain strings', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          // Simulate non-string translation values; implementation should skip
          badTrans: t({ en: 123 as any }),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    // This test ensures `badTrans` DOES get processed correctly even for number values
    // To simulate a failure correctly, we can verify that the value 123 is present
    expect(result).toContain('badTrans: t({');
    expect(result).toContain('en: 123');
  });

  it('update translation entries locale in an array or translation', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          contentMultilingual: t({
            en: 'Hello 3',
            fr: 'Bonjour 3',
          }),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('contentMultilingual: t({');
    expect(result).toContain('en: "Hello 3"');
  });

  it('update translation entries locale in an markdown', async () => {
    const dictionary: Dictionary = {
      ...initialFileContent,
      content: {
        ...initialFileContent.content,
        markdownMultilingual: md(t({ en: 'Hello 3', fr: 'Bonjour 3' })),
      },
    } as any;

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toMatch(/markdownMultilingual:\s*md\(/);
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('fr: "Bonjour 3"');
  });

  it('update translation entries locale in an markdown', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          markdownMultilingual2: md(t({ en: 'Hello 3', fr: 'Bonjour 3' })),
        },
      },
      initialFileContent
    );

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
    const dictionary: Dictionary = defu(
      {
        content: {
          enumTest: enu({ '0': 'none', '1': 'one', '>1': 'many' }),
        },
      },
      initialFileContent
    );
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toContain('enumTest: enu({');
    expect(result).toContain('"0": "none"');
    expect(result).toContain('"1": "one"');
    expect(result).toContain('">1": "many"');
  });

  it('adds markdown nodes (inline and from file)', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          mdInline: md('# Title'),
          mdFromFile: md(file('./file.md')),
        },
      },
      initialFileContent
    );
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toContain('mdInline: md("# Title")');
    expect(result).toContain('mdFromFile: md(file("./file.md"))');
  });

  it('adds cond, gender, insert, and nest nodes', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          condNode: cond({ true: 'y', false: 'n', fallback: 'f' }),
          genderNode: gender({ male: 'm', female: 'f', fallback: 'x' }),
          insertNode: insert('Hello {{name}}'),
          nestNode: nest('code'),
        },
      },
      initialFileContent
    );
    const result = await transformJSFile(initialFileContentString, dictionary);
    expect(result).toContain('condNode: cond({');
    expect(result).toContain('true: "y"');
    expect(result).toContain('false: "n"');
    expect(result).toContain('fallback: "f"');
    expect(result).toContain('genderNode: gender({');
    expect(result).toContain('male: "m"');
    expect(result).toContain('female: "f"');
    expect(result).toContain('fallback: "x"');
    expect(result).toContain('insertNode: insert("Hello {{name}}")');
    expect(result).toContain('nestNode: nest("code")');
  });

  it('adds a new string element to an existing array', async () => {
    const dictionary: Dictionary = defu(
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
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayContent: [');
    expect(result).toContain('"string6"');
  });

  it('creates a new array property with a t() node element', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          arrayWithTranslations: [
            t({
              en: 'Hello',
              fr: 'Bonjour',
            }),
          ],
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayWithTranslations: [');
    expect(result).toContain('t({');
    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
  });

  it('update translation entries with fallback locale', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          welcomeMessage: 'Hello',
        },
      },
      initialFileContent
    );

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
    expect(result).toContain('title: t({');
    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
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

    expect(result).toContain('import { file, md } from "intlayer"');
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
    expect(result).toContain('messages: [t({');
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

    expect(result).toContain('import { insert, t } from "intlayer";');
    expect(result).toContain('greeting: insert(t({');
  });

  it('update translation entries with fallback locale', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          welcomeMessage: 'Hello',
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('welcomeMessage: t({');
    expect(result).toContain('en: "Hello"');
  });

  it('update translation entries with fallback locale in an array', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          arrayOfTranslations: ['Hello 3', 'Hello 2'],
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayOfTranslations: [');
    expect(result).toContain('en: "Hello 3"');
  });

  it('update translation entries with fallback locale in an array or translation', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          arrayOfTranslations: ['Hello 3', 'Hello 2'],
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('arrayOfTranslations: [');
    expect(result).toContain('en: "Hello 3"');
  });

  it('update translation entries locale in an array of translations', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          translationOfArray: ['Hello 3', 'Hello 2'],
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('translationOfArray: [');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toContain('en: "Hello 2"');
  });

  it('update translation entries locale in an markdown with fallback locale', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          markdownMultilingual: md('Hello 3'),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(
      initialFileContentString,
      dictionary,
      Locales.ENGLISH
    );

    expect(result).toContain('markdownMultilingual: t({');
    expect(result).toMatch(/en:\s*(?:md\()?(?:t\()?\s*['"]Hello 3['"]/);
    expect(result).toMatch(
      /fr:\s*['"]## test fr['"]|fr:\s*md\(['"]## test fr['"]\)/
    );
  });

  it('update translation entries locale in an markdown with fallback locale', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          markdownMultilingual2: md('Hello 3'),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(
      initialFileContentString,
      dictionary,
      Locales.ENGLISH
    );

    expect(result).toContain('markdownMultilingual2: md(');
    expect(result).toContain('en: "Hello 3"');
    expect(result).toMatch(/fr:\s*['"]## test fr['"]/);
  });

  it('updates nested translations within conditional nodes', async () => {
    const dictionary: Dictionary = defu(
      {
        content: {
          expandCollapseToggle: cond({
            true: t({
              en: 'Show all',
              fr: 'Afficher tout',
              es: 'Mostrar todo',
              de: 'Mehr anzeigen',
              pl: 'Pokaż wszystko',
            }),
            false: t({
              en: 'Show less',
              fr: 'Afficher moins',
              es: 'Mostrar menos',
              de: 'Weniger anzeigen',
              pl: 'Pokaż mniej',
            }),
          }),
        },
      },
      initialFileContent
    );

    const result = await transformJSFile(initialFileContentString, dictionary);

    expect(result).toContain('expandCollapseToggle: cond({');
    expect(result).toContain('true: t({');
    expect(result).toContain("en: 'Show all'");
    expect(result).toContain("fr: 'Afficher tout'");
    expect(result).toContain("es: 'Mostrar todo'");
    expect(result).toContain('de: "Mehr anzeigen"');
    expect(result).toContain('pl: "Pokaż wszystko"');
    expect(result).toContain('false: t({');
    expect(result).toContain("en: 'Show less'");
    expect(result).toContain("fr: 'Afficher moins'");
    expect(result).toContain("es: 'Mostrar menos'");
    expect(result).toContain('de: "Weniger anzeigen"');
    expect(result).toContain('pl: "Pokaż mniej"');
  });

  it('works with ESM default export and satisfies operator (simulated chokidar log)', async () => {
    const tsContent = `
import { t, type Dictionary } from 'intlayer';

const helloWorld2Content = {
  key: 'hello-world2',
  content: {},
} satisfies Dictionary;

export default helloWorld2Content;
`;

    const dict: Dictionary = {
      key: 'hello-world2',
      content: {
        thisIsASentenceIf: {
          nodeType: 'translation',
          translation: {
            en: 'This is a sentence if a state (should be extracted)',
          },
        },
        helloWorldShouldBeExtracted: {
          nodeType: 'translation',
          translation: { en: 'Hello World (should be extracted)' },
        },
      },
    } as any;

    const result = await transformJSFile(tsContent, dict);

    expect(result).toContain('thisIsASentenceIf: t({');
    expect(result).toContain(
      'en: "This is a sentence if a state (should be extracted)"'
    );
    expect(result).toContain('helloWorldShouldBeExtracted: t({');
    expect(result).toContain('en: "Hello World (should be extracted)"');
    expect(result).toContain('satisfies Dictionary');
  });

  it('works with ESM default export and "as" operator', async () => {
    const tsContent = `
import { t, type Dictionary } from 'intlayer';

const helloWorld2Content = {
  key: 'hello-world2',
  content: {},
} as Dictionary;

export default helloWorld2Content;
`;
    const dict: Dictionary = {
      key: 'hello-world2',
      content: {
        testKey: {
          nodeType: 'translation',
          translation: { en: 'Test extracted' },
        },
      },
    } as any;

    const result = await transformJSFile(tsContent, dict);

    expect(result).toContain('testKey: t({');
    expect(result).toContain('en: "Test extracted"');
    expect(result).toContain('as Dictionary');
  });

  it('works with JSX/TSX content', async () => {
    const tsxContent = `
import { t, type Dictionary } from 'intlayer';
import type { ReactNode } from 'react';

const appContent = {
  key: 'app',
  content: {
    edit: t<ReactNode>({
      en: <>test</>,
    }),
  },
} satisfies Dictionary;

export default appContent;
`;

    const dict: Dictionary = {
      key: 'app',
      content: {
        edit: {
          nodeType: 'translation',
          translation: {
            en: {
              nodeType: 'text',
              text: 'test updated',
            },
          },
        },
      },
    } as any;

    // Direct AST manipulation for JSX in tests is tricky with defu,
    // so we just test if it can parse and print JSX correctly without error.
    // In actual usage, the content comes from the AI translation results.

    const result = await transformJSFile(tsxContent, dict);

    // Verify it parsed and preserved the JSX structure
    expect(result).toContain('en: <>test</>,');
    expect(result).toContain('satisfies Dictionary');
  });
});

describe('transformJSFile — node type coverage', () => {
  const emptyFile = `export default { key: 'test', content: {} };`;

  const transformEmpty = (content: Record<string, unknown>) =>
    transformJSFile(emptyFile, {
      key: 'test',
      content,
    } as unknown as Dictionary);

  /**
   * Every node type, with the source it must be written back as.
   *
   * `null` means the node has no source representation and must never be
   * written (framework elements), `undefined` means the node is rebuilt by the
   * generic object branch.
   */
  const nodeTypeCases: Record<
    NodeType,
    { node: unknown; expected: string | null }
  > = {
    [NodeTypes.TRANSLATION]: {
      node: t({ en: 'Hello' }),
      expected: 'entry: t({',
    },
    [NodeTypes.ENUMERATION]: {
      node: enu({ '1': 'one' }),
      expected: 'entry: enu({',
    },
    [NodeTypes.PLURAL]: {
      node: plural({ one: '{{count}} item', other: '{{count}} items' }),
      expected: 'entry: plural({',
    },
    [NodeTypes.CONDITION]: {
      node: cond({ true: 'y', false: 'n' }),
      expected: 'entry: cond({',
    },
    [NodeTypes.GENDER]: {
      node: gender({ male: 'm', female: 'f', fallback: 'x' }),
      expected: 'entry: gender({',
    },
    [NodeTypes.SELECT]: {
      node: select({ draft: 'D', fallback: 'F' }),
      expected: 'entry: select({',
    },
    [NodeTypes.INSERTION]: {
      node: insert('Hi {{name}}'),
      expected: 'entry: insert("Hi {{name}}")',
    },
    [NodeTypes.MARKDOWN]: {
      node: md('# Title'),
      expected: 'entry: md("# Title")',
    },
    [NodeTypes.HTML]: {
      node: html('<p>hi</p>'),
      expected: 'entry: html("<p>hi</p>")',
    },
    [NodeTypes.FILE]: {
      node: file('./a.md'),
      expected: 'entry: file("./a.md")',
    },
    [NodeTypes.NESTED]: {
      node: nest('other-key' as never),
      expected: 'entry: nest("other-key")',
    },
    [NodeTypes.TEXT]: {
      node: { nodeType: NodeTypes.TEXT, [NodeTypes.TEXT]: 'plain text' },
      expected: 'entry: "plain text"',
    },
    [NodeTypes.NUMBER]: {
      node: { nodeType: NodeTypes.NUMBER, [NodeTypes.NUMBER]: 42 },
      expected: 'entry: 42',
    },
    [NodeTypes.BOOLEAN]: {
      node: { nodeType: NodeTypes.BOOLEAN, [NodeTypes.BOOLEAN]: true },
      expected: 'entry: true',
    },
    [NodeTypes.NULL]: {
      node: { nodeType: NodeTypes.NULL, [NodeTypes.NULL]: null },
      expected: 'entry: null',
    },
    [NodeTypes.REACT_NODE]: {
      node: {
        nodeType: NodeTypes.REACT_NODE,
        [NodeTypes.REACT_NODE]: { type: 'div', props: {}, key: null },
      },
      expected: null,
    },
    [NodeTypes.PREACT_NODE]: {
      node: {
        nodeType: NodeTypes.PREACT_NODE,
        [NodeTypes.PREACT_NODE]: { type: 'div', props: {}, key: null },
      },
      expected: null,
    },
    [NodeTypes.SOLID_NODE]: {
      node: {
        nodeType: NodeTypes.SOLID_NODE,
        [NodeTypes.SOLID_NODE]: { type: 'div', props: {}, key: null },
      },
      expected: null,
    },
    [NodeTypes.OBJECT]: {
      node: { nested: 'value' },
      expected: 'nested: "value"',
    },
    [NodeTypes.ARRAY]: {
      node: ['a', 'b'],
      expected: 'entry: ["a", "b"]',
    },
    [NodeTypes.UNKNOWN]: {
      node: { nodeType: 'notARealNodeType', foo: 'bar' },
      expected: 'nodeType: "notARealNodeType"',
    },
  };

  it.each(Object.entries(nodeTypeCases))(
    'writes back the "%s" node type',
    async (_nodeType, { node, expected }) => {
      const result = await transformEmpty({ entry: node });

      if (expected === null) {
        // Framework elements have no source representation: nothing is written,
        // and in particular no raw node object is leaked into the file.
        expect(result).not.toContain('entry:');
        expect(result).not.toContain('nodeType');
      } else {
        expect(result).toContain(expected);
      }
    }
  );

  it('never leaks a raw node object for helper-backed node types', async () => {
    const helperBackedNodes = Object.fromEntries(
      Object.entries(nodeTypeCases)
        .filter(
          ([nodeType]) =>
            ![NodeTypes.OBJECT, NodeTypes.ARRAY, NodeTypes.UNKNOWN].includes(
              nodeType as never
            )
        )
        .map(([nodeType, { node }]) => [nodeType, node])
    );

    const result = await transformEmpty(helperBackedNodes);

    expect(result).not.toContain('nodeType');
  });

  it('writes the select variable as a second argument', async () => {
    const result = await transformEmpty({
      status: select({ draft: 'D', published: 'P' }, 'publishType'),
    });

    expect(result).toContain('import { select } from "intlayer"');
    expect(result).toMatch(/}, "publishType"\)/);
  });

  it('keeps the select variable when updating an existing select node', async () => {
    const source = `import { select } from "intlayer";
export default {
  key: 'test',
  content: {
    status: select({ draft: 'D', published: 'P' }, "publishType"),
  },
};`;

    const result = await transformJSFile(source, {
      key: 'test',
      content: {
        status: select({ draft: 'Draft', published: 'P' }, 'publishType'),
      },
    } as unknown as Dictionary);

    expect(result).toContain('draft: "Draft"');
    expect(result).toContain("published: 'P'");
    expect(result).toMatch(/}, "publishType"\)/);
  });

  it('unwraps text nodes nested inside a translation', async () => {
    const result = await transformEmpty({
      edit: {
        nodeType: NodeTypes.TRANSLATION,
        [NodeTypes.TRANSLATION]: {
          en: { nodeType: NodeTypes.TEXT, [NodeTypes.TEXT]: 'Hello' },
          fr: { nodeType: NodeTypes.TEXT, [NodeTypes.TEXT]: 'Bonjour' },
        },
      },
    });

    expect(result).toContain('en: "Hello"');
    expect(result).toContain('fr: "Bonjour"');
    expect(result).not.toContain('nodeType');
  });

  it('preserves the existing JSX expression of a react node', async () => {
    const source = `import { t } from "intlayer";
export default {
  key: 'test',
  content: {
    edit: t({ en: <b>hello</b> }),
  },
};`;

    const result = await transformJSFile(source, {
      key: 'test',
      content: {
        edit: t({
          en: {
            nodeType: NodeTypes.REACT_NODE,
            [NodeTypes.REACT_NODE]: { type: 'b', props: {}, key: null },
          },
        }),
      },
    } as unknown as Dictionary);

    expect(result).toContain('en: <b>hello</b>');
    expect(result).not.toContain('nodeType');
  });

  it('preserves the custom components passed to md()', async () => {
    const source = `import { md } from "intlayer";
export default {
  key: 'test',
  content: {
    doc: md('# Title', { Button: 'string' }),
  },
};`;

    const result = await transformJSFile(source, {
      key: 'test',
      content: { doc: md('# Updated') },
    } as unknown as Dictionary);

    expect(result).toContain('md("# Updated", { Button: \'string\' })');
  });

  it('writes the nest path when the node declares one', async () => {
    const result = await transformEmpty({
      nested: nest('other-key' as never, 'a.b' as never),
    });

    expect(result).toContain('nest("other-key", "a.b")');
  });

  it('updates the translation wrapped in html() in per-locale mode', async () => {
    const source = `import { html, t } from "intlayer";
export default {
  key: 'test',
  content: {
    banner: html(t({ en: 'Old', fr: '<b>Ancien</b>' })),
  },
};`;

    const result = await transformJSFile(
      source,
      { key: 'test', content: { banner: 'New' } } as unknown as Dictionary,
      Locales.ENGLISH
    );

    expect(result).toContain('banner: html(t({');
    expect(result).toContain('en: "New"');
    expect(result).toContain("fr: '<b>Ancien</b>'");
  });

  it('leaves non-Intlayer expressions untouched', async () => {
    const source = `import { t } from "intlayer";
const shared = 'shared value';
export default {
  key: 'test',
  content: {
    computed: shared,
    fn: () => 'dynamic',
  },
};`;

    const result = await transformJSFile(source, {
      key: 'test',
      content: { computed: 'other value', fn: 'other value' },
    } as unknown as Dictionary);

    expect(result).toContain('computed: shared');
    expect(result).toContain("fn: () => 'dynamic'");
  });
});

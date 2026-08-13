import {
  mkdirSync,
  mkdtempSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterAll } from 'vitest';
import { createRuleTester, SOURCE_FILENAME } from '../utils/_ruleTester';
import { noUnusedContent } from './noUnusedContent';

/**
 * A throwaway Intlayer project on disk.
 *
 * This rule answers "does anything else read this?", so it can only be
 * exercised against real files: the fixture holds the *consumers*, while each
 * test case supplies the content declaration being linted.
 */
const projectDir = realpathSync(
  mkdtempSync(join(tmpdir(), 'intlayer-eslint-'))
);

/**
 * Write a file into the fixture project, creating its directory.
 *
 * @param relativePath - Path relative to the project root.
 * @param contents - File contents.
 */
const writeProjectFile = (relativePath: string, contents: string): void => {
  const filePath = join(projectDir, relativePath);

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents, 'utf-8');
};

writeProjectFile(
  'package.json',
  JSON.stringify({ name: 'unused-content-fixture', version: '0.0.0' })
);
writeProjectFile('intlayer.config.json', '{}');

// Reads a single field of `used`, leaving every other field of it unread.
writeProjectFile(
  'src/UsedComponent.tsx',
  `
    import { useIntlayer } from 'react-intlayer';

    export const UsedComponent = () => {
      const content = useIntlayer('used');

      return content.title;
    };
  `
);

// Hands the whole content object to another function: which fields it reads
// cannot be known, so none of them may be reported.
writeProjectFile(
  'src/EscapedComponent.tsx',
  `
    import { useIntlayer } from 'react-intlayer';
    import { render } from './render';

    export const EscapedComponent = () => {
      const content = useIntlayer('escaped');

      return render(content);
    };
  `
);

// Names a dictionary without binding or reading anything from it: that proves
// the dictionary is alive but says nothing about which of its fields are read.
writeProjectFile(
  'src/BareComponent.tsx',
  `
    import { useIntlayer } from 'react-intlayer';

    export const BareComponent = () => {
      useIntlayer('bare');

      return null;
    };
  `
);

// Pulls another dictionary in from a content declaration, which the source scan
// deliberately skips.
writeProjectFile(
  'src/hub.content.ts',
  `
    import { nest } from 'intlayer';

    export default {
      key: 'hub',
      content: { section: nest('nested-dictionary') },
    };
  `
);

// Consumes a declaration through a direct import, never naming its key.
writeProjectFile(
  'src/DirectComponent.tsx',
  `
    import { useDictionary } from 'react-intlayer';
    import directDictionary from './direct.content';

    export const DirectComponent = () => useDictionary(directDictionary);
  `
);

// Build output the duplicate report reads.
writeProjectFile(
  '.intlayer/unmerged_dictionary/duplicated.json',
  JSON.stringify([
    { key: 'duplicated', filePath: 'src/duplicated.content.ts' },
    { key: 'duplicated', filePath: 'src/legacy.content.ts' },
  ])
);

afterAll(() => {
  rmSync(projectDir, { recursive: true, force: true });
});

/** Rule options pinned to the fixture, with caching off so each case rescans. */
const options = [{ baseDir: projectDir, cacheTtl: 0 }] as const;

/**
 * Absolute path of a content declaration inside the fixture.
 *
 * @param name - File name under `src/`.
 */
const contentFile = (name: string): string => join(projectDir, 'src', name);

const ruleTester = createRuleTester();

ruleTester.run('no-unused-content', noUnusedContent, {
  valid: [
    {
      name: 'every declared field is read',
      filename: contentFile('used.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'used',
          content: { title: t({ en: 'Title' }) },
        };
      `,
    },
    {
      name: 'content object escapes, so no field can be called unread',
      filename: contentFile('escaped.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'escaped',
          content: { title: t({ en: 'Title' }), footer: t({ en: 'Footer' }) },
        };
      `,
    },
    {
      name: 'a bare reference proves the dictionary lives, not which fields do',
      filename: contentFile('bare.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'bare',
          content: { title: t({ en: 'Title' }), unread: t({ en: 'Unread' }) },
        };
      `,
    },
    {
      name: 'dictionary reached through nest() from another declaration',
      filename: contentFile('nested.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'nested-dictionary',
          content: { title: t({ en: 'Title' }) },
        };
      `,
    },
    {
      name: 'declaration consumed through a direct import',
      filename: contentFile('direct.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'direct',
          content: { title: t({ en: 'Title' }), unread: t({ en: 'Unread' }) },
        };
      `,
    },
    {
      name: 'a spread makes the field list non-exhaustive',
      filename: contentFile('used.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'used',
          content: { title: t({ en: 'Title' }), ...extraFields },
        };
      `,
    },
    {
      name: 'a source file is not a content declaration',
      filename: SOURCE_FILENAME,
      options: [...options],
      code: `
        export default {
          key: 'orphan',
          content: { title: t({ en: 'Title' }) },
        };
      `,
    },
    {
      name: 'unused fields can be ignored by pattern',
      filename: contentFile('used.content.ts'),
      options: [{ baseDir: projectDir, cacheTtl: 0, ignoreFields: ['^meta'] }],
      code: `
        export default {
          key: 'used',
          content: { title: t({ en: 'Title' }), metaDescription: t({ en: 'Meta' }) },
        };
      `,
    },
    {
      name: 'reports can be turned off individually',
      filename: contentFile('orphan.content.ts'),
      options: [
        {
          baseDir: projectDir,
          cacheTtl: 0,
          reportUnusedDictionaries: false,
          reportUnusedFields: false,
          reportDuplicateKeys: false,
        },
      ],
      code: `
        export default {
          key: 'orphan',
          content: { title: t({ en: 'Title' }) },
        };
      `,
    },
  ],

  invalid: [
    {
      name: 'no caller anywhere asks for the dictionary',
      filename: contentFile('orphan.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'orphan',
          content: { title: t({ en: 'Title' }) },
        };
      `,
      errors: [
        {
          messageId: 'unusedDictionary',
          data: { dictionaryKey: 'orphan' },
        },
      ],
    },
    {
      name: 'a declared field nothing reads',
      filename: contentFile('used.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'used',
          content: { title: t({ en: 'Title' }), subtitle: t({ en: 'Subtitle' }) },
        };
      `,
      errors: [
        {
          messageId: 'unusedField',
          data: { fieldPath: 'subtitle', dictionaryKey: 'used' },
        },
      ],
    },
    {
      name: 'an unused subtree is reported once, at its root',
      filename: contentFile('used.content.ts'),
      options: [...options],
      code: `
        export default {
          key: 'used',
          content: {
            title: t({ en: 'Title' }),
            hero: { subtitle: t({ en: 'Subtitle' }) },
          },
        };
      `,
      errors: [
        {
          messageId: 'unusedField',
          data: { fieldPath: 'hero', dictionaryKey: 'used' },
        },
      ],
    },
    {
      name: 'the same key is declared by another file',
      filename: contentFile('duplicated.content.ts'),
      options: [
        { baseDir: projectDir, cacheTtl: 0, reportUnusedFields: false },
      ],
      code: `
        export default {
          key: 'duplicated',
          content: { title: t({ en: 'Title' }) },
        };
      `,
      errors: [
        { messageId: 'duplicateDictionary' },
        { messageId: 'unusedDictionary' },
      ],
    },
  ],
});

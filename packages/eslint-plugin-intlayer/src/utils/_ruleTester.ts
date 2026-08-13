import { RuleTester } from 'eslint';
import { parser } from 'typescript-eslint';

/**
 * A `RuleTester` wired to the TypeScript parser with JSX enabled — the shape of
 * a real Intlayer project, and the only combination under which the TS-only
 * wrapper nodes (`as const`, `!`) the rules unwrap actually appear.
 *
 * `RuleTester` is a test-only helper, so this module is imported exclusively
 * from `*.test.ts` files.
 */
export const createRuleTester = (): RuleTester =>
  new RuleTester({
    languageOptions: {
      parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  });

/** Filename used by cases that must not be treated as a content declaration. */
export const SOURCE_FILENAME = '/project/src/Component.tsx';

/** Filename of a content declaration file, where raw strings are expected. */
export const CONTENT_FILENAME = '/project/src/component.content.ts';

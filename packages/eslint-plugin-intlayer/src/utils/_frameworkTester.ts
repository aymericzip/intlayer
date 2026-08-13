import angularTemplateParser from '@angular-eslint/template-parser';
import * as astroParser from 'astro-eslint-parser';
import { Linter } from 'eslint';
import * as svelteParser from 'svelte-eslint-parser';
import { parser as typeScriptParser } from 'typescript-eslint';
import * as vueParser from 'vue-eslint-parser';
import { rules } from '../index';

/**
 * Every framework Intlayer ships an integration for, paired with the ESLint
 * parser its files need. Used by the framework matrix tests to prove the rules
 * behave identically across all of them.
 *
 * `RuleTester` takes a single parser per instance, so these cases go through
 * `Linter` directly — that is also closer to how a real project runs, where the
 * parser is selected per file glob.
 */
export type FrameworkFixture = {
  /** Display name of the framework. */
  framework: string;
  /** Filename the snippet would have in a real project. */
  filename: string;
  /** Glob the parser is registered under. */
  glob: string;
  /** The parser handling this file type. */
  parser: unknown;
};

export const FRAMEWORK_FIXTURES = {
  react: {
    framework: 'React',
    filename: 'Component.tsx',
    glob: '**/*.tsx',
    parser: typeScriptParser,
  },
  vue: {
    framework: 'Vue',
    filename: 'Component.vue',
    glob: '**/*.vue',
    parser: vueParser,
  },
  svelte: {
    framework: 'Svelte',
    filename: 'Component.svelte',
    glob: '**/*.svelte',
    parser: svelteParser,
  },
  angularComponent: {
    framework: 'Angular (component)',
    filename: 'app.component.ts',
    glob: '**/*.ts',
    parser: typeScriptParser,
  },
  angularTemplate: {
    framework: 'Angular (template)',
    filename: 'app.component.html',
    glob: '**/*.html',
    parser: angularTemplateParser,
  },
  astro: {
    framework: 'Astro',
    filename: 'index.astro',
    glob: '**/*.astro',
    parser: astroParser,
  },
} satisfies Record<string, FrameworkFixture>;

export type FrameworkKey = keyof typeof FRAMEWORK_FIXTURES;

/** One reported problem, reduced to what the assertions care about. */
export type LintResult = {
  ruleId: string | null;
  messageId?: string;
  message: string;
};

/**
 * Lint a snippet with one of this plugin's rules under the parser its framework
 * requires.
 *
 * @param fixture - The framework to lint as.
 * @param ruleName - Rule to enable.
 * @param code - Source to lint.
 * @param options - Rule options.
 */
export const lintAs = (
  fixture: FrameworkFixture,
  ruleName: keyof typeof rules,
  code: string,
  options: unknown[] = []
): LintResult[] => {
  const linter = new Linter();

  const messages = linter.verify(
    code,
    [
      {
        files: [fixture.glob],
        plugins: { intlayer: { rules } },
        languageOptions: {
          parser: fixture.parser as never,
          ecmaVersion: 2022,
          sourceType: 'module',
          parserOptions: { ecmaFeatures: { jsx: true } },
        },
        rules: { [`intlayer/${ruleName}`]: ['error', ...options] as never },
      },
    ],
    fixture.filename
  );

  const fatal = messages.filter((message) => message.fatal);

  if (fatal.length > 0) {
    throw new Error(
      `${fixture.framework}: parse failure — ${fatal[0]?.message}`
    );
  }

  const unmatched = messages.filter((message) => message.ruleId === null);

  if (unmatched.length > 0) {
    throw new Error(
      `${fixture.framework}: ${unmatched[0]?.message} (no config matched ${fixture.filename})`
    );
  }

  return messages.map((message) => ({
    ruleId: message.ruleId,
    messageId: message.messageId,
    message: message.message,
  }));
};

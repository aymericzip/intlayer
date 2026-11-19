import { describe, expect, it } from 'vitest';
import { shouldExtract } from './shouldExtract';

describe('shouldExtract', () => {
  it('should return false for empty strings', () => {
    expect(shouldExtract('')).toBe(false);
    expect(shouldExtract('   ')).toBe(false);
  });

  it('should return false for emails', () => {
    expect(shouldExtract('contact@intlayer.org')).toBe(false);
    expect(shouldExtract('test.user@example.com')).toBe(false);
  });

  it('should return false for dynamic content patterns', () => {
    expect(shouldExtract('{varName}')).toBe(false);
    expect(shouldExtract('v-bind:href')).toBe(false);
    expect(shouldExtract('v-if')).toBe(false);
    expect(shouldExtract('{ content.value }')).toBe(false);
  });

  it('should return true for single capitalized words (UI labels)', () => {
    expect(shouldExtract('Contact')).toBe(true);
    expect(shouldExtract('Submit')).toBe(true);
    expect(shouldExtract('Counter')).toBe(true);
    expect(shouldExtract('Settings')).toBe(true);
  });

  it('should return false for single or short uncapitalized strings (<= 2 words)', () => {
    expect(shouldExtract('home')).toBe(false);
    expect(shouldExtract('camelCase')).toBe(false);
    expect(shouldExtract('kebab-case')).toBe(false);
    expect(shouldExtract('lowercase sentence')).toBe(false);
  });

  it('should return true for capitalized strings with 1 or 2 words', () => {
    expect(shouldExtract('Valid Sentence')).toBe(true);
    expect(shouldExtract('Hello World')).toBe(true);
  });

  it('should return true for strings with more than 2 words, even if uncapitalized', () => {
    expect(
      shouldExtract(
        'i18n Benchmark — Open-source project. Built with React, Vite & TanStack Router.'
      )
    ).toBe(true);
    expect(
      shouldExtract('this is a longer sentence with lowercase starting letter')
    ).toBe(true);
  });

  it('should return false for technical identifiers in single words', () => {
    expect(shouldExtract('CamelCaseProperty')).toBe(false);
    expect(shouldExtract('camelCaseProperty')).toBe(false);
    expect(shouldExtract('kebab-case-property')).toBe(false);
    expect(shouldExtract('snake_case_property')).toBe(false);
    expect(shouldExtract('UPPER_CASE_PROPERTY')).toBe(false);
    expect(shouldExtract('v1.2.3')).toBe(false);
  });

  it('should return true for capitalized multi-word labels', () => {
    expect(shouldExtract('Contact us')).toBe(true);
    expect(shouldExtract('About the project')).toBe(true);
    expect(shouldExtract('Welcome back')).toBe(true);
  });

  it('should not extract single technical values that are not capitalized', () => {
    expect(shouldExtract('12345')).toBe(false);
    expect(shouldExtract('id-123')).toBe(false);
  });

  it('should return true for text with parentheses', () => {
    expect(shouldExtract('Example of (text) under parentisis')).toBe(true);
    expect(shouldExtract('(Optional) field')).toBe(true);
  });

  it('should extract strings with many special characters correctly', () => {
    expect(
      shouldExtract(
        'This is a string including \'"!@#$%^&*()_+-=[]{} special characters:'
      )
    ).toBe(true);
  });

  it('should return false for Tailwind/CSS utility class strings', () => {
    expect(shouldExtract('my-4 flex w-full justify-center')).toBe(false);
    expect(shouldExtract('items-center justify-between gap-4')).toBe(false);
    expect(shouldExtract('hover:bg-blue-500 dark:text-white')).toBe(false);
    expect(shouldExtract('sm:px-6 lg:px-8 xl:px-12')).toBe(false);
    expect(shouldExtract('flex flex-col gap-2 rounded-lg border p-4')).toBe(
      false
    );
    expect(shouldExtract('!text-error font-bold')).toBe(false);
    expect(shouldExtract('text-sm/6 font-semibold')).toBe(false);
  });

  it('should not filter real lowercase sentences that have no hyphenated tokens', () => {
    expect(shouldExtract('back to top')).toBe(true);
    expect(
      shouldExtract('this is a longer sentence with lowercase starting letter')
    ).toBe(true);
  });

  it('should return false for strings without letters', () => {
    expect(shouldExtract('0 0 2704 517')).toBe(false);
    expect(shouldExtract('100% 50%')).toBe(false);
    expect(shouldExtract('0 0 {{WIDTH}} {{HEIGHT}}')).toBe(false);
  });

  it('should return false for SVG path data', () => {
    expect(
      shouldExtract('M5 46C5 21.1472 25.1472 1 50 1H295C319.853 1 340 21.1472Z')
    ).toBe(false);
    expect(shouldExtract('M841.5 403H840.5V404H841.5V403ZM841.5 38V37Z')).toBe(
      false
    );
    expect(shouldExtract('m 10 20 l 5 5 z')).toBe(false);
  });

  it('should still extract text starting with M', () => {
    expect(shouldExtract('Mail')).toBe(true);
    expect(shouldExtract('More details')).toBe(true);
    expect(shouldExtract('Intlayer logo')).toBe(true);
  });

  it('should return false for one or two character strings', () => {
    expect(shouldExtract('L')).toBe(false);
    expect(shouldExtract('M')).toBe(false);
    expect(shouldExtract('OK')).toBe(false);
    expect(shouldExtract(' X ')).toBe(false);
  });

  it('should return false for Tailwind classes with arbitrary values and modifiers', () => {
    for (const className of [
      'rounded-lg [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl',
      'rounded-[2.5rem] [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[3rem]',
      'rounded-2xl border-[1.3px] border-current! bg-current/0 *:text-current!',
      'hover:border-transparent hover:bg-current/30! focus-visible:bg-current/20',
      'min-h-7 px-3 text-xs max-md:py-1',
      'rounded-lg border-none bg-current/0 transition *:text-current! hover:bg-current/10 aria-[current]:bg-current/5',
      '[box-shadow:none] focus:[box-shadow:none]',
    ]) {
      expect(shouldExtract(className)).toBe(false);
    }
  });

  it('should return false for generated code', () => {
    expect(shouldExtract('{{name}} as {{alias}}')).toBe(false);
    expect(shouldExtract("import {{defaultImport}} from '{{source}}';")).toBe(
      false
    );
    expect(
      shouldExtract("/** @type {import('{{modulePath}}').{{typeName}}} */")
    ).toBe(false);
    expect(shouldExtract('module.exports = {{defaultExport}};')).toBe(false);
    expect(shouldExtract("const config = require('./config')")).toBe(false);
  });

  it('should still extract text with placeholders', () => {
    expect(shouldExtract('{{count}} items selected')).toBe(true);
    expect(shouldExtract('Page {{page}} of {{total}}')).toBe(true);
    expect(shouldExtract('Import your files')).toBe(true);
  });

  it('should return false for CSS rules and function values', () => {
    expect(
      shouldExtract(
        '[data-input-otp]::selection { background: transparent !important; color: transparent !important; }'
      )
    ).toBe(false);
    expect(
      shouldExtract('[data-input-otp]:autofill { {{autofillStyles}} }')
    ).toBe(false);
    expect(
      shouldExtract('[data-input-otp] + * { pointer-events: all !important; }')
    ).toBe(false);
    expect(shouldExtract('calc(100% + {{PWM_BADGE_SPACE_WIDTH}})')).toBe(false);
    expect(shouldExtract('inset(0 {{PWM_BADGE_SPACE_WIDTH}} 0 0)')).toBe(false);
    expect(shouldExtract('rgba(0, 0, 0, 0.5)')).toBe(false);
  });

  it('should still extract text with parentheses or placeholders', () => {
    expect(shouldExtract('Save (recommended)')).toBe(true);
    expect(shouldExtract('Hello {{name}}, welcome back')).toBe(true);
  });

  it('should return false for CSS shorthand values', () => {
    expect(shouldExtract('width 200ms ease-in-out')).toBe(false);
    expect(shouldExtract('1px solid #ccc')).toBe(false);
    expect(shouldExtract('opacity 0.3s, transform 0.3s ease')).toBe(false);
    expect(shouldExtract('0 4px 12px rgba(0,0,0,0.1)')).toBe(false);
  });

  it('should still extract sentences containing durations', () => {
    expect(shouldExtract('Wait 5s before retrying')).toBe(true);
    expect(shouldExtract('Resizable component')).toBe(true);
  });
});

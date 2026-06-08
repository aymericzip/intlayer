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

  it('should return true for single capitalized words', () => {
    expect(shouldExtract('Contact')).toBe(true);
    expect(shouldExtract('Submit')).toBe(true);
    expect(shouldExtract('Home')).toBe(true);
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

  it('should still return true for normal single capitalized words', () => {
    expect(shouldExtract('Contact')).toBe(true);
    expect(shouldExtract('About')).toBe(true);
    expect(shouldExtract('Welcome')).toBe(true);
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
});

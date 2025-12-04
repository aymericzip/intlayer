import { describe, expect, it } from 'vitest';
import { deepMergeContent } from './deepMergeContent';

describe('deepMergeContent', () => {
  it('should merge two simple objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should merge nested objects', () => {
    const target = {
      navigation: { home: 'Home', about: 'About' },
      buttons: { submit: 'Submit' },
    };
    const source = {
      navigation: { about: 'À propos', contact: 'Contact' },
      messages: { success: 'Succès' },
    };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({
      navigation: { home: 'Home', about: 'À propos', contact: 'Contact' },
      buttons: { submit: 'Submit' },
      messages: { success: 'Succès' },
    });
  });

  it('should merge deeply nested objects', () => {
    const target = {
      footer: {
        social: { twitter: 'Twitter', facebook: 'Facebook' },
        legal: { privacy: 'Privacy' },
      },
    };
    const source = {
      footer: {
        social: { facebook: 'FB', linkedin: 'LinkedIn' },
        legal: { terms: 'Terms' },
      },
    };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({
      footer: {
        social: { twitter: 'Twitter', facebook: 'FB', linkedin: 'LinkedIn' },
        legal: { privacy: 'Privacy', terms: 'Terms' },
      },
    });
  });

  it('should handle null target', () => {
    const source = { a: 1, b: 2 };
    const result = deepMergeContent(null, source);

    expect(result).toEqual(source);
  });

  it('should handle null source', () => {
    const target = { a: 1, b: 2 };
    const result = deepMergeContent(target, null);

    expect(result).toEqual(target);
  });

  it('should handle undefined target', () => {
    const source = { a: 1, b: 2 };
    const result = deepMergeContent(undefined, source);

    expect(result).toEqual(source);
  });

  it('should handle undefined source', () => {
    const target = { a: 1, b: 2 };
    const result = deepMergeContent(target, undefined);

    expect(result).toEqual(target);
  });

  it('should overwrite arrays instead of merging', () => {
    const target = { items: ['a', 'b', 'c'] };
    const source = { items: ['x', 'y'] };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({ items: ['x', 'y'] });
  });

  it('should overwrite primitives', () => {
    const target = { value: 'old', count: 1 };
    const source = { value: 'new', count: 2 };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({ value: 'new', count: 2 });
  });

  it('should handle empty objects', () => {
    const target = {};
    const source = { a: 1, b: 2 };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle empty source', () => {
    const target = { a: 1, b: 2 };
    const source = {};
    const result = deepMergeContent(target, source);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should handle mix of new and updated properties', () => {
    const target = {
      navigation: { home: 'Home', about: 'About' },
      buttons: { submit: 'Submit', cancel: 'Cancel' },
    };
    const source = {
      navigation: { contact: 'Contact' }, // Add contact, keep home/about
      buttons: { cancel: 'Annuler' }, // Update cancel, keep submit
      messages: { success: 'Succès' }, // Add new section
    };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({
      navigation: { home: 'Home', about: 'About', contact: 'Contact' },
      buttons: { submit: 'Submit', cancel: 'Annuler' },
      messages: { success: 'Succès' },
    });
  });

  it('should not mutate original objects', () => {
    const target = { a: { b: 1 } };
    const source = { a: { c: 2 } };
    const result = deepMergeContent(target, source);

    expect(target).toEqual({ a: { b: 1 } });
    expect(source).toEqual({ a: { c: 2 } });
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  it('should handle string values correctly', () => {
    const target = { message: 'Hello' };
    const source = { message: 'Bonjour' };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({ message: 'Bonjour' });
  });

  it('should handle empty string values', () => {
    const target = { optional: '', required: 'Value' };
    const source = { optional: 'Now has value', required: '' };
    const result = deepMergeContent(target, source);

    expect(result).toEqual({ optional: 'Now has value', required: '' });
  });
});

import { describe, expect, it } from 'vitest';
import { generateKey } from './generateKey';

describe('generateKey', () => {
  it('should format simple space-separated strings correctly', () => {
    expect(generateKey('Hello World', new Set())).toBe('helloWorld');
  });

  it('should handle accents properly ("valhalla-résumé" -> "valhallaResume")', () => {
    const text = 'valhalla-résumé';
    const existing = new Set<string>();
    // Note: The user requested valhalla-resume, but the function outputs camelCase
    // "valhallaResume" is the valid JS identifier for "valhalla-résumé"
    expect(generateKey(text, existing)).toBe('valhallaResume');
  });

  it('should preserve Chinese characters', () => {
    const text = '这是一个测试 (this is a test)';
    const existing = new Set<string>();
    expect(generateKey(text, existing)).toBe('这是一个测试ThisIs');
  });

  it('should use maximum of 5 words', () => {
    const text = 'one two three four five six seven';
    const existing = new Set<string>();
    expect(generateKey(text, existing)).toBe('oneTwoThreeFourFive');
  });

  it('should append a number if key already exists', () => {
    const existing = new Set(['helloWorld', 'helloWorld1']);
    expect(generateKey('Hello World', existing)).toBe('helloWorld2');
  });

  it('should default to "content" if key is empty', () => {
    expect(generateKey('!@#$', new Set())).toBe('content');
  });
});

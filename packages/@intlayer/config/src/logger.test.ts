import { describe, expect, it } from 'vitest';
import { BEIGE, BLUE, GREY_DARK, GREY_LIGHT, RED, WHITE } from './colors';
import { colorizeObject, removeColor } from './logger';

describe('colorizeObject', () => {
  it('should colorize null, boolean, and number values with BLUE', () => {
    const nullColored = colorizeObject(null);
    expect(nullColored).toContain(BLUE);
    expect(removeColor(nullColored)).toBe('null');

    const trueColored = colorizeObject(true);
    expect(trueColored).toContain(BLUE);
    expect(removeColor(trueColored)).toBe('true');

    const numColored = colorizeObject(42);
    expect(numColored).toContain(BLUE);
    expect(removeColor(numColored)).toBe('42');
  });

  it('should colorize short strings without spaces with BLUE', () => {
    const strColored = colorizeObject('hello');
    expect(strColored).toContain(BLUE);
    expect(removeColor(strColored)).toBe('"hello"');
  });

  it('should colorize strings with spaces with WHITE', () => {
    const strColored = colorizeObject('This is a test application');
    expect(strColored).toContain(WHITE);
    expect(removeColor(strColored)).toBe('"This is a test application"');
  });

  it('should colorize URLs with GREY_DARK', () => {
    const urlColored = colorizeObject('https://intlayer.org');
    expect(urlColored).toContain(GREY_DARK);
    expect(removeColor(urlColored)).toBe('"https://intlayer.org"');
  });

  it('should colorize paths with GREY_DARK', () => {
    const pathColored = colorizeObject('/usr/bin/path');
    expect(pathColored).toContain(GREY_DARK);
    expect(removeColor(pathColored)).toBe('"/usr/bin/path"');
  });

  it('should colorize hex identifiers and secrets with RED, short strings with BLUE', () => {
    const obj = {
      repository: 'intlayer-vite-react-cp',
      organizationId: '6890eb2a9843114d6fe7008a',
    };
    const objColored = colorizeObject(obj);
    expect(objColored).toContain(GREY_LIGHT); // Key name is colored with GREY_LIGHT
    expect(objColored).toContain(RED); // Hex ID value is colored with RED
    expect(objColored).toContain(BLUE); // Short no-space string is colored with BLUE
  });

  it('should colorize dates with BEIGE', () => {
    const dateColored = colorizeObject('2025-08-04T17:17:40.341Z');
    expect(dateColored).toContain(BEIGE);
  });

  it('should handle nested arrays and objects correctly', () => {
    const obj = {
      list: [1, 'https://test.com', false],
    };
    const objColored = colorizeObject(obj);
    expect(removeColor(objColored)).toBe(
      '{\n  "list": [\n    1,\n    "https://test.com",\n    false\n  ]\n}'
    );
  });
});

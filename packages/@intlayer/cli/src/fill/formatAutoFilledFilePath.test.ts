import { describe, expect, it } from 'vitest';
import { formatAutoFilledFilePath } from './formatAutoFilledFilePath';

describe('formatAutoFilledFilePath', () => {
  const baseDir = '/project/root';

  describe('relative paths', () => {
    it('should preserve original path when filePath is provided and just change extension', () => {
      const result = formatAutoFilledFilePath(
        './{{key}}.content.json',
        'dictionary-field-editor',
        'src/components/DictionaryFieldEditor/dictionaryFieldEditor.content.ts',
        baseDir
      );

      expect(result).toBe(
        'src/components/DictionaryFieldEditor/dictionaryFieldEditor.content.json'
      );
    });

    it('should handle relative paths with ./ correctly', () => {
      const result = formatAutoFilledFilePath(
        './{{key}}.content.json',
        'test-key',
        'components/test.content.ts',
        baseDir
      );

      expect(result).toBe('components/test.content.json');
    });

    it('should handle relative paths with ../ correctly', () => {
      const result = formatAutoFilledFilePath(
        '../{{key}}.content.json',
        'test-key',
        'src/components/test.content.ts',
        baseDir
      );

      expect(result).toBe('src/test.content.json');
    });

    it('should handle locale replacement in relative paths', () => {
      const result = formatAutoFilledFilePath(
        './{{key}}/{{locale}}.content.json',
        'test-key',
        'components/test.content.ts',
        baseDir,
        'en'
      );

      expect(result).toBe('components/test/en.content.json');
    });

    it('should handle nested relative paths with ../', () => {
      const result = formatAutoFilledFilePath(
        '../../shared/{{key}}.content.json',
        'test-key',
        'src/components/feature/test.content.ts',
        baseDir
      );

      expect(result).toBe('src/shared/test.content.json');
    });
  });

  describe('absolute paths', () => {
    it('should handle absolute paths relative to project root', () => {
      const result = formatAutoFilledFilePath(
        '/absolute/path/{{key}}.content.json',
        'test-key',
        'src/test.content.ts',
        baseDir
      );

      expect(result).toBe('absolute/path/test.content.json');
    });

    it('should handle absolute system paths', () => {
      const result = formatAutoFilledFilePath(
        '/usr/local/{{key}}.content.json',
        'test-key',
        'src/test.content.ts',
        baseDir
      );

      expect(result).toBe('/usr/local/test.content.json');
    });

    it('should handle /Users/ system paths', () => {
      const result = formatAutoFilledFilePath(
        '/Users/shared/{{key}}.content.json',
        'test-key',
        'src/test.content.ts',
        baseDir
      );

      expect(result).toBe('/Users/shared/test.content.json');
    });

    it('should handle locale replacement in absolute paths relative to project', () => {
      const result = formatAutoFilledFilePath(
        '/locales/{{key}}/{{locale}}.content.json',
        'test-key',
        'src/test.content.ts',
        baseDir,
        'en'
      );

      expect(result).toBe('locales/test/en.content.json');
    });
  });

  describe('error cases', () => {
    it('should throw error for invalid inputs', () => {
      expect(() =>
        formatAutoFilledFilePath('', 'key', 'path', baseDir)
      ).toThrow('autoFillField must be a non-empty string');

      expect(() =>
        formatAutoFilledFilePath('./test.json', '', 'path', baseDir)
      ).toThrow('dictionaryKey must be a non-empty string');

      expect(() =>
        formatAutoFilledFilePath('./test.json', 'key', '', baseDir)
      ).toThrow('dictionaryFilePath must be a non-empty string');

      expect(() =>
        formatAutoFilledFilePath('./test.json', 'key', 'path', '')
      ).toThrow('baseDir must be a non-empty string');
    });
  });
});

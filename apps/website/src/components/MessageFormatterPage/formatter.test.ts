import { describe, expect, it } from 'bun:test';
import { evaluateMessagePreview } from '../MessageConverterPage/converterUtils';
import { SNIPPETS_BY_DIALECT } from './snippets';
import { TEMPLATE_CATEGORIES, TEMPLATES_BY_DIALECT } from './templates';
import {
  validateI18nextMessage,
  validateICUMessage,
  validateIntlayerMessage,
  validatePOMessage,
  validateVueI18nMessage,
} from './validation';

describe('Message Formatter Page', () => {
  describe('Templates and Snippets Coverage', () => {
    it('should have populated template collections for all dialects', () => {
      expect(TEMPLATES_BY_DIALECT.intlayer.length).toBeGreaterThanOrEqual(15);
      expect(TEMPLATES_BY_DIALECT.icu.length).toBeGreaterThanOrEqual(20);
      expect(TEMPLATES_BY_DIALECT.i18next.length).toBeGreaterThanOrEqual(10);
      expect(TEMPLATES_BY_DIALECT['vue-i18n'].length).toBeGreaterThanOrEqual(8);
      expect(TEMPLATES_BY_DIALECT.po.length).toBeGreaterThanOrEqual(8);
    });

    it('should have snippets configured for every dialect', () => {
      expect(SNIPPETS_BY_DIALECT.intlayer.length).toBeGreaterThanOrEqual(8);
      expect(SNIPPETS_BY_DIALECT.icu.length).toBeGreaterThan(5);
      expect(SNIPPETS_BY_DIALECT.i18next.length).toBeGreaterThan(4);
      expect(SNIPPETS_BY_DIALECT['vue-i18n'].length).toBeGreaterThan(4);
      expect(SNIPPETS_BY_DIALECT.po.length).toBeGreaterThan(3);
    });

    it('should contain all 15 expected template categories', () => {
      const categoryIds = TEMPLATE_CATEGORIES.map((c) => c.id);
      expect(categoryIds).toContain('basic');
      expect(categoryIds).toContain('pluralization');
      expect(categoryIds).toContain('select');
      expect(categoryIds).toContain('ordinal');
      expect(categoryIds).toContain('numbers');
      expect(categoryIds).toContain('dates');
      expect(categoryIds).toContain('real-world');
    });

    it('should have valid tags array and non-empty description for all templates', () => {
      for (const [dialect, templates] of Object.entries(TEMPLATES_BY_DIALECT)) {
        for (const t of templates) {
          expect(Array.isArray(t.tags)).toBe(true);
          expect(t.tags.slice(0, 3)).toBeDefined();
          expect(t.description).toBeDefined();
          expect(t.description.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('ICU Message Validation', () => {
    it('should pass on valid ICU simple message', () => {
      const result = validateICUMessage('Hello {name}!');
      expect(result.isValid).toBe(true);
    });

    it('should pass on valid ICU plural with other clause', () => {
      const result = validateICUMessage(
        '{count, plural, one {# item} other {# items}}'
      );
      expect(result.isValid).toBe(true);
    });

    it('should fail on ICU plural missing other clause', () => {
      const result = validateICUMessage('{count, plural, one {# item}}');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('other');
    });

    it('should fail on unclosed braces', () => {
      const result = validateICUMessage('Hello {name');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('Unclosed curly brace');
    });

    it('should fail on odd number of single quotes', () => {
      const result = validateICUMessage("Don't forget");
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('Unclosed single quote');
    });

    it('should pass with escaped apostrophe', () => {
      const result = validateICUMessage("Don''t forget");
      expect(result.isValid).toBe(true);
    });
  });

  describe('i18next Validation', () => {
    it('should pass on balanced double braces', () => {
      const result = validateI18nextMessage('Hello {{name}}!');
      expect(result.isValid).toBe(true);
    });

    it('should fail on unbalanced double braces', () => {
      const result = validateI18nextMessage('Hello {{name}!');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('Mismatched double braces');
    });

    it('should validate JSON dictionaries', () => {
      const validJson = '{"key": "value"}';
      expect(validateI18nextMessage(validJson).isValid).toBe(true);

      const invalidJson = '{"key": "value",}';
      expect(validateI18nextMessage(invalidJson).isValid).toBe(false);
    });
  });

  describe('Vue I18n Validation', () => {
    it('should pass on valid pipe plural', () => {
      const result = validateVueI18nMessage('0 items | 1 item | {n} items');
      expect(result.isValid).toBe(true);
    });

    it('should fail on empty pipe segment', () => {
      const result = validateVueI18nMessage('0 items || {n} items');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('Empty plural choice segment');
    });
  });

  describe('Intlayer Message Validation', () => {
    it('should pass on valid double-brace interpolation', () => {
      const result = validateIntlayerMessage('Hello {{name}}!');
      expect(result.isValid).toBe(true);
    });

    it('should fail on mismatched double braces', () => {
      const result = validateIntlayerMessage('Hello {{name}!');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('Mismatched double braces');
    });

    it('should pass on valid Intlayer helper function syntax', () => {
      const helperCode =
        'plural({\n  one: "1 item",\n  other: "{{count}} items"\n})';
      const result = validateIntlayerMessage(helperCode);
      expect(result.isValid).toBe(true);
    });

    it('should fail on mismatched parentheses in helper calls', () => {
      const invalidCode = 'plural({ one: "1 item"';
      const result = validateIntlayerMessage(invalidCode);
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toContain('Mismatched parentheses');
    });

    it('should pass on valid JSON dictionaries', () => {
      const validJson = JSON.stringify({
        nodeType: 'translation',
        translation: { en: 'Hello', fr: 'Bonjour' },
      });
      expect(validateIntlayerMessage(validJson).isValid).toBe(true);
    });

    it('should fail on unclosed string literals', () => {
      const invalid = 't({ en: "Hello })';
      expect(validateIntlayerMessage(invalid).isValid).toBe(false);
      expect(validateIntlayerMessage(invalid).errorMessage).toContain(
        'Unterminated string literal'
      );
    });
  });

  describe('Intlayer Live Preview Evaluation', () => {
    it('should evaluate double-brace variable interpolation', () => {
      const result = evaluateMessagePreview(
        'Hello {{name}}, welcome to {{app}}!',
        { name: 'Aymeric', app: 'Intlayer' },
        'en',
        'intlayer'
      );
      expect(result).toBe('Hello Aymeric, welcome to Intlayer!');
    });

    it('should evaluate t() multilingual translation based on locale', () => {
      const code = 't({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" })';
      expect(evaluateMessagePreview(code, {}, 'fr', 'intlayer')).toBe(
        'Bienvenue'
      );
      expect(evaluateMessagePreview(code, {}, 'es', 'intlayer')).toBe(
        'Bienvenido'
      );
      expect(evaluateMessagePreview(code, {}, 'en', 'intlayer')).toBe(
        'Welcome'
      );
    });

    it('should evaluate plural() helper with count variable', () => {
      const code =
        'plural({ "=0": "No items", one: "1 item", other: "{{count}} items" })';
      expect(evaluateMessagePreview(code, { count: 0 }, 'en', 'intlayer')).toBe(
        'No items'
      );
      expect(evaluateMessagePreview(code, { count: 1 }, 'en', 'intlayer')).toBe(
        '1 item'
      );
      expect(evaluateMessagePreview(code, { count: 5 }, 'en', 'intlayer')).toBe(
        '5 items'
      );
    });

    it('should evaluate enu() helper with exact numeric matches', () => {
      const code = 'enu({ 0: "Zero", 1: "One", fallback: "{{count}} items" })';
      expect(evaluateMessagePreview(code, { count: 0 }, 'en', 'intlayer')).toBe(
        'Zero'
      );
      expect(evaluateMessagePreview(code, { count: 1 }, 'en', 'intlayer')).toBe(
        'One'
      );
      expect(
        evaluateMessagePreview(code, { count: 42 }, 'en', 'intlayer')
      ).toBe('42 items');
    });

    it('should evaluate cond() helper with boolean condition', () => {
      const code = 'cond({ true: "Online", false: "Offline" })';
      expect(
        evaluateMessagePreview(code, { condition: true }, 'en', 'intlayer')
      ).toBe('Online');
      expect(
        evaluateMessagePreview(code, { condition: false }, 'en', 'intlayer')
      ).toBe('Offline');
    });
  });

  describe('Gettext PO Validation', () => {
    it('should pass on valid msgid and msgstr', () => {
      const valid = 'msgid "Hello"\nmsgstr "Bonjour"';
      expect(validatePOMessage(valid).isValid).toBe(true);
    });

    it('should fail on mismatched double quotes', () => {
      const invalid = 'msgid "Hello\nmsgstr "Bonjour"';
      expect(validatePOMessage(invalid).isValid).toBe(false);
      expect(validatePOMessage(invalid).errorMessage).toContain(
        'Mismatched double quotes'
      );
    });

    it('should fail on msgstr without msgid', () => {
      const invalid = 'msgstr "Bonjour"';
      expect(validatePOMessage(invalid).isValid).toBe(false);
      expect(validatePOMessage(invalid).errorMessage).toContain(
        'requires a "msgid"'
      );
    });
  });
});

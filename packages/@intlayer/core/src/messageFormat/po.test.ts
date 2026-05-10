import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import { enu, gender, html, insert, plural } from '../transpiler';
import {
  intlayerToPortableObjectFormatter,
  portableObjectToIntlayerFormatter,
} from './po';

describe('PO Formatter', () => {
  describe('intlayerToPortableObjectFormatter', () => {
    it('should transform simple string', () => {
      const result = intlayerToPortableObjectFormatter('Hello' as any);
      expect(result).toEqual({ msgid: 'Hello', msgstr: ['Hello'] });
    });

    it('should correctly format variables to Gettext C-style %(var)s', () => {
      const result = intlayerToPortableObjectFormatter(
        insert('Hello {{name}}') as any
      );
      expect(result).toEqual({
        msgid: 'Hello %(name)s',
        msgstr: ['Hello %(name)s'],
      });
    });

    it('should transform plural forms predictably', () => {
      const input = plural({
        one: 'One item',
        few: 'Few items',
        other: '{{count}} items',
      });
      const result = intlayerToPortableObjectFormatter(input as any);
      expect(result).toEqual({
        msgctxt: undefined,
        msgid: 'One item',
        msgid_plural: '%(count)s items',
        msgstr: ['One item', 'Few items', '%(count)s items'],
      });
    });

    it('should process composite arrays into unified strings', () => {
      const input = ['Hello ', insert('{{name}}')];
      const result = intlayerToPortableObjectFormatter(input as any);
      expect(result).toEqual({
        msgid: 'Hello %(name)s',
        msgstr: ['Hello %(name)s'],
      });
    });
  });

  describe('portableObjectToIntlayerFormatter (Parsing Edge Cases)', () => {
    it('should handle missing and empty fields gracefully', () => {
      const input = { msgid: '', msgstr: [] };
      expect(portableObjectToIntlayerFormatter(input)).toBe('');
    });

    it('should parse Gettext Python/C-style variables into Intlayer syntax', () => {
      const input = { msgid: 'Hello %(name)s', msgstr: ['Hello %(name)s'] };
      expect(portableObjectToIntlayerFormatter(input)).toEqual(
        insert('Hello {{name}}')
      );
    });

    it('should wrap elements containing HTML tags properly', () => {
      const input = {
        msgid: '<strong>Hi</strong>',
        msgstr: ['<strong>Hi</strong>'],
      };
      expect(portableObjectToIntlayerFormatter(input)).toEqual(
        html('<strong>Hi</strong>')
      );
    });

    it('should infer 2-form plurals', () => {
      const input = {
        msgid: 'One',
        msgid_plural: 'Many',
        msgstr: ['One', 'Many'],
      };
      expect(portableObjectToIntlayerFormatter(input)).toEqual(
        plural({
          one: 'One',
          other: 'Many',
        })
      );
    });

    it('should dynamically map 6-form plurals (e.g. Arabic)', () => {
      const input = {
        msgid: 'Zero items',
        msgid_plural: 'Many items',
        msgstr: ['Zero', 'One', 'Two', 'Few', 'Many', 'Other'],
      };
      expect(portableObjectToIntlayerFormatter(input)).toEqual(
        plural({
          zero: 'Zero',
          one: 'One',
          two: 'Two',
          few: 'Few',
          many: 'Many',
          other: 'Other',
        })
      );
    });

    it('should correctly interpret msgctxt for gender mapping', () => {
      const input = {
        msgctxt: 'gender',
        msgid: 'They',
        msgstr: ['He', 'She', 'They'],
      };
      expect(portableObjectToIntlayerFormatter(input)).toEqual(
        gender({
          male: 'He',
          female: 'She',
          fallback: 'They',
        })
      );
    });
  });
});

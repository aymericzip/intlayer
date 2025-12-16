import { NodeType } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { enu, gender, insert } from '../transpiler';
import { icuToIntlayerFormatter, intlayerToICUFormatter } from './ICU';

describe('ICU Formatter', () => {
  describe('icuToIntlayerFormatter', () => {
    it('should transform simple string', () => {
      const result = icuToIntlayerFormatter('Hello World');
      expect(result).toBe('Hello World');
    });

    it('should transform interpolation', () => {
      const result = icuToIntlayerFormatter('Hello {name}');
      expect(result).toEqual({
        nodeType: NodeType.Insertion,
        insertion: 'Hello {{name}}',
        fields: ['name'],
      });
    });

    it('should transform plural', () => {
      // Using =1 to test exact match mapping as requested
      const result = icuToIntlayerFormatter(
        '{count, plural, =0 {No items} =1 {One item} other {# items}}'
      );

      expect(result).toEqual({
        nodeType: NodeType.Enumeration,
        enumeration: {
          '0': 'No items',
          '1': 'One item',
          fallback: '{{count}} items',
          __intlayer_icu_var: 'count',
        },
      });
    });

    it('should transform complex plural', () => {
      const result = icuToIntlayerFormatter(
        '{count, plural, =0 {No items} one {One item} two {Two items} few {Few items} many {Many items} other {# items}}'
      );

      expect(result).toEqual({
        nodeType: NodeType.Enumeration,
        enumeration: {
          '0': 'No items',
          '1': 'One item',
          '2': 'Two items',
          '<=3': 'Few items',
          '>=4': 'Many items',
          fallback: '{{count}} items',
          __intlayer_icu_var: 'count',
        },
      });
    });

    it('should transform select/gender', () => {
      const result = icuToIntlayerFormatter(
        '{gender, select, male {He} female {She} other {They}}'
      );

      expect(result).toEqual({
        nodeType: NodeType.Gender,
        gender: {
          male: 'He',
          female: 'She',
          fallback: 'They',
        },
      });
    });

    it('should transform nested complex structures', () => {
      const input =
        '{gender, select, male {He has {count, plural, =0 {no cars} other {# cars}}} other {They have {count, plural, =0 {no cars} other {# cars}}}}';
      const result = icuToIntlayerFormatter(input);

      expect(result).toEqual({
        nodeType: NodeType.Gender,
        gender: {
          male: [
            'He has ',
            {
              nodeType: NodeType.Enumeration,
              enumeration: {
                0: 'no cars',
                fallback: '{{count}} cars',
                __intlayer_icu_var: 'count',
              },
            },
          ],
          fallback: [
            'They have ',
            {
              nodeType: NodeType.Enumeration,
              enumeration: {
                0: 'no cars',
                fallback: '{{count}} cars',
                __intlayer_icu_var: 'count',
              },
            },
          ],
        },
      });
    });
  });

  describe('intlayerToICUFormatter', () => {
    it('should transform interpolation', () => {
      const result = intlayerToICUFormatter(insert('Hello {{name}}'));
      expect(result).toBe('Hello {name}');
    });

    it('should transform enumeration (using default var n)', () => {
      const input = enu({
        '0': 'No items',
        '1': 'One item',
        fallback: '{{n}} items',
      });

      const result = intlayerToICUFormatter(input);
      expect(result).toContain('{n, plural,');
      expect(result).toContain('=0 {No items}');
      expect(result).toContain('=1 {One item}');
      expect(result).toContain('other {# items}');
    });

    it('should transform complex enumeration', () => {
      const input = enu({
        '0': 'No items',
        '1': 'One item',
        '2': 'Two items',
        '<=3': 'Few items',
        '>=4': 'Many items',
        fallback: '{{n}} items',
      });

      const result = intlayerToICUFormatter(input);
      expect(result).toContain('{n, plural,');
      expect(result).toContain('=0 {No items}');
      expect(result).toContain('=1 {One item}');
      expect(result).toContain('=2 {Two items}');
      expect(result).toContain('few {Few items}');
      expect(result).toContain('many {Many items}');
      expect(result).toContain('other {# items}');
    });

    it('should transform gender', () => {
      const input = gender({
        male: 'He',
        female: 'She',
        fallback: 'They',
      });

      const result = intlayerToICUFormatter(input);
      expect(result).toContain('{gender, select,');
      expect(result).toContain('male {He}');
      expect(result).toContain('female {She}');
      expect(result).toContain('other {They}');
    });

    it('should handle nested structures', () => {
      const input = gender({
        male: enu({
          '0': 'He has no cars',
          fallback: 'He has many cars',
        }),
        female: enu({
          '0': 'She has no cars',
          fallback: 'She has many cars',
        }),
        fallback: enu({
          '0': 'They have no cars',
          fallback: 'They have many cars',
        }),
      });

      const result = intlayerToICUFormatter(input);
      expect(result).toContain('{gender, select,');
      // The array should be joined - ICU format uses single braces {var}, not double braces {{var}}
      expect(result).toContain(
        'male {{n, plural, =0 {He has no cars} other {He has many cars}}}'
      );
      expect(result).toContain(
        'female {{n, plural, =0 {She has no cars} other {She has many cars}}}'
      );
    });
  });

  describe('ICU Roundtrip', () => {
    it('should maintain consistency after roundtrip transformation', () => {
      const original = {
        ICUExamples: {
          gender: {
            welcome:
              '{gender, select, male {Welcome, sir!} female {Welcome, madam!} other {Welcome!}}',
            invitation:
              '{gender, select, male {He is invited} female {She is invited} other {They are invited}}',
            possession:
              '{gender, select, male {His account} female {Her account} other {Their account}}',
          },
          insert: {
            greeting: 'Hello, {name}!',
            formattedNumber: 'Price: {price, number, currency}',
            formattedDate: 'Today is {date, date, long}',
            formattedTime: 'Current time: {time, time, short}',
            percentage: 'Progress: {progress, number, percent}',
            complex:
              'User {name} has {count, plural, =0 {no} =1 {one} other {#}} {itemType, select, message {message} notification {notification} other {item}}{count, plural, =0 {} =1 {} other {s}}',
          },
          combined: {
            userMessages:
              '{gender, select, male {He has} female {She has} other {They have}} {count, plural, =0 {no messages} =1 {one message} other {# messages}}',
            itemCount:
              'You have {count, plural, =0 {no items} =1 {one item} other {# items}} in your {category, select, cart {cart} wishlist {wishlist} other {list}}',
            notification:
              '{userName} {gender, select, male {shared} female {shared} other {shared}} {itemCount, plural, =0 {nothing} =1 {an item} other {# items}} with you on {date, date, medium}',
          },
          numberFormatting: {
            currency: 'Total: {amount, number, currency}',
            decimal: 'Value: {value, number}',
            percent: 'Completion: {percentage, number, percent}',
            compact: 'Views: {views, number, compactShort}',
          },
          dateTimeFormatting: {
            dateShort: '{date, date, short}',
            dateMedium: '{date, date, medium}',
            dateLong: '{date, date, long}',
            dateFull: '{date, date, full}',
            timeShort: '{time, time, short}',
            timeMedium: '{time, time, medium}',
            timeLong: '{time, time, long}',
            dateTime: '{datetime, date, medium} at {datetime, time, short}',
          },
        },
      };

      const toIntlayer = icuToIntlayerFormatter(original as any);
      const backToICU = intlayerToICUFormatter(toIntlayer as any);

      expect(backToICU).toEqual(original);
    });
  });
});

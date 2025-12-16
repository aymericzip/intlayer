import { describe, expect, it } from 'vitest';
import {
  type EnumerationContentState,
  enu,
  gender,
  insert,
} from '../transpiler';
import {
  i18nextToIntlayerFormatter,
  intlayerToI18nextFormatter,
} from './i18next';

describe('i18next', () => {
  describe('i18nextToIntlayerFormatter', () => {
    it('should transform interpolation', () => {
      expect(i18nextToIntlayerFormatter('Hello {{name}}')).toEqual(
        insert('Hello {{name}}')
      );
    });

    it('should transform ICU interpolation', () => {
      expect(i18nextToIntlayerFormatter('Hello {name}')).toEqual(
        insert('Hello {{name}}')
      );
    });

    it('should transform plural', () => {
      expect(
        i18nextToIntlayerFormatter(
          '{count, plural, =0 {no items} one {one item} other {# items}}'
        )
      ).toEqual(
        enu({
          0: 'no items',
          '1': 'one item',
          fallback: '{{count}} items',
          __intlayer_icu_var: 'count',
        } as EnumerationContentState<any>)
      );
    });

    it('should transform complex plural', () => {
      expect(
        i18nextToIntlayerFormatter(
          '{count, plural, =0 {no items} one {one item} two {two items} few {few items} many {many items} other {# items}}'
        )
      ).toEqual(
        enu({
          0: 'no items',
          '1': 'one item',
          '2': 'two items',
          '<=3': 'few items',
          '>=4': 'many items',
          fallback: '{{count}} items',
          __intlayer_icu_var: 'count',
        } as EnumerationContentState<any>)
      );
    });

    it('should transform gender', () => {
      expect(
        i18nextToIntlayerFormatter(
          '{gender, select, male {He} female {She} other {They}}'
        )
      ).toEqual(
        gender({
          male: 'He',
          female: 'She',
          fallback: 'They',
        })
      );
    });
  });

  describe('intlayerToI18nextFormatter', () => {
    it('should transform insertion', () => {
      expect(intlayerToI18nextFormatter(insert('Hello {{name}}'))).toEqual(
        'Hello {{name}}'
      );
    });

    it('should transform enumeration', () => {
      expect(
        intlayerToI18nextFormatter(
          enu({
            '0': 'no items',
            '1': 'one item',
            fallback: '{{count}} items',
          })
        )
      ).toEqual('{count, plural, =0 {no items} =1 {one item} other {# items}}');
    });

    it('should transform complex enumeration', () => {
      expect(
        intlayerToI18nextFormatter(
          enu({
            '0': 'no items',
            '1': 'one item',
            '2': 'two items',
            '<=3': 'few items',
            '>=4': 'many items',
            fallback: '{{count}} items',
          })
        )
      ).toEqual(
        '{count, plural, =0 {no items} =1 {one item} =2 {two items} few {few items} many {many items} other {# items}}'
      );
    });
  });

  describe('i18next Roundtrip', () => {
    it('should maintain consistency after roundtrip transformation', () => {
      const original = {
        i18nextExamples: {
          gender: {
            welcome:
              '{gender, select, male {Welcome, sir!} female {Welcome, madam!} other {Welcome!}}',
            invitation:
              '{gender, select, male {He is invited} female {She is invited} other {They are invited}}',
            possession:
              '{gender, select, male {His account} female {Her account} other {Their account}}',
          },
          insert: {
            greeting: 'Hello, {{name}}!',
            formattedNumber: 'Price: {price, number, currency}',
            formattedDate: 'Today is {date, date, long}',
            formattedTime: 'Current time: {time, time, short}',
            percentage: 'Progress: {progress, number, percent}',
            complex:
              'User {{name}} has {count, plural, =0 {no} =1 {one} other {#}} {itemType, select, message {message} notification {notification} other {item}}{count, plural, =0 {} =1 {} other {s}}',
          },
          combined: {
            userMessages:
              '{gender, select, male {He has} female {She has} other {They have}} {count, plural, =0 {no messages} =1 {one message} other {# messages}}',
            itemCount:
              'You have {count, plural, =0 {no items} =1 {one item} other {# items}} in your {category, select, cart {cart} wishlist {wishlist} other {list}}',
            notification:
              '{{userName}} {gender, select, male {shared} female {shared} other {shared}} {itemCount, plural, =0 {nothing} =1 {an item} other {# items}} with you on {date, date, medium}',
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

      const toIntlayer = i18nextToIntlayerFormatter(original as any);
      const backToI18next = intlayerToI18nextFormatter(toIntlayer as any);

      // Helper to normalize the output for comparison if needed,
      // but ideally they should be identical
      expect(backToI18next).toEqual(original);
    });
  });
});

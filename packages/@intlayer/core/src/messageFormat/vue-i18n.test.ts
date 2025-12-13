import { describe, expect, it } from 'vitest';
import { enu, insert } from '../transpiler';
import {
  intlayerToVueI18nFormatter,
  vueI18nToIntlayerFormatter,
} from './vue-i18n';

describe('vue-i18n', () => {
  describe('vueI18nToIntlayerFormatter', () => {
    it('should transform simple string', () => {
      expect(vueI18nToIntlayerFormatter('Hello World')).toEqual('Hello World');
    });

    it('should transform interpolation', () => {
      expect(vueI18nToIntlayerFormatter('Hello {name}')).toEqual(
        insert('Hello {{name}}')
      );
    });

    it('should transform plural (2 choices)', () => {
      // Input has spaces, and our parser now trims them.
      // So expected values should NOT have spaces.
      expect(vueI18nToIntlayerFormatter('car | cars')).toEqual(
        enu({
          '1': 'car',
          fallback: 'cars',
          __intlayer_vue_i18n_var: 'count',
        })
      );
    });

    it('should transform plural (3 choices)', () => {
      // Input has spaces, parser trims them.
      // Fallback part has {count} which becomes insertion node.
      expect(
        vueI18nToIntlayerFormatter('no apples | one apple | {count} apples')
      ).toEqual(
        enu({
          '0': 'no apples',
          '1': 'one apple',
          // Note: " {count} apples" trimmed is "{count} apples".
          // The insert helper creates an object for this.
          fallback: insert('{{count}} apples'),
          __intlayer_vue_i18n_var: 'count',
        })
      );
    });

    it('should handle escaped pipe', () => {
      expect(vueI18nToIntlayerFormatter('Start \\| End')).toEqual(
        'Start | End'
      );
    });
  });

  describe('intlayerToVueI18nFormatter', () => {
    it('should transform insertion', () => {
      expect(intlayerToVueI18nFormatter(insert('Hello {{name}}'))).toEqual(
        'Hello {name}'
      );
    });

    it('should transform enumeration (2 choices)', () => {
      // We updated implementation to use ' | ' separator
      expect(
        intlayerToVueI18nFormatter(
          enu({
            '1': 'car',
            fallback: 'cars',
          })
        )
      ).toEqual('car | cars');
    });

    it('should transform enumeration (3 choices)', () => {
      expect(
        intlayerToVueI18nFormatter(
          enu({
            '0': 'no apples',
            '1': 'one apple',
            fallback: '{{count}} apples',
          })
        )
      ).toEqual('no apples | one apple | {count} apples');
    });

    it('should transform enumeration with gaps (0, 2, fallback)', () => {
      // 0 -> no items
      // 1 -> (empty)
      // 2 -> pair
      // fallback -> many
      expect(
        intlayerToVueI18nFormatter(
          enu({
            '0': 'none',
            '2': 'pair',
            fallback: 'many',
          })
        )
      ).toEqual('none | | pair | many');
    });
  });

  describe('VueI18n Roundtrip', () => {
    it('should maintain consistency after roundtrip transformation', () => {
      const original = {
        vueExamples: {
          simple: 'Hello World',
          interpolation: 'Hello {name}',
          plural2: 'car | cars',
          plural3: 'no apples | one apple | {count} apples',
          pluralComplex: 'zero | one | two | three | many',
        },
      };

      const toIntlayer = vueI18nToIntlayerFormatter(original as any);
      const backToVue = intlayerToVueI18nFormatter(toIntlayer as any);

      expect(backToVue).toEqual(original);
    });
  });
});

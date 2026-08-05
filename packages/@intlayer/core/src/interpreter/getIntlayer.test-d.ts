import { describe, expectTypeOf, it } from 'vitest';
import { getIntlayer } from './getIntlayer';

/**
 * The second argument of `getIntlayer` is almost always a value the framework
 * hands over as a plain `string`: a router param (`params.locale`), a cookie, a
 * header. Constraining it to the declared locales made every such call site a
 * compile error, so the declared locales are offered as suggestions while any
 * string is still accepted.
 */
describe('getIntlayer — locale argument', () => {
  it('should accept a locale literal', () => {
    expectTypeOf(getIntlayer('lesson', 'fr')).not.toBeNever();
  });

  it('should accept a `string | undefined` router param', () => {
    const routerLocale = 'fr' as string | undefined;

    expectTypeOf(getIntlayer('lesson', routerLocale)).not.toBeNever();
  });

  it('should accept a selector carrying a widened locale', () => {
    const routerLocale = 'fr' as string;

    expectTypeOf(
      getIntlayer('lesson', { locale: routerLocale, item: 1 })
    ).not.toBeNever();
  });
});

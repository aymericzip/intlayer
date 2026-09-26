// @vitest-environment node
import '@angular/compiler';
import {
  type Injector,
  Injector as InjectorClass,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => ({
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
}));

const dictionaryContents = vi.hoisted(
  (): Record<string, Record<string, unknown>> => ({
    en: {
      home: {
        title: 'Hello {{ name }}',
        nav: { about: 'About' },
        items: (values: { count: number }) =>
          values.count === 1 ? '1 item' : `${values.count} items`,
      },
    },
    fr: { home: { title: 'Bonjour {{ name }}' } },
  })
);

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: () => ({ home: {} }),
}));

vi.mock('@intlayer/core/interpreter', () => ({
  getIntlayer: (key: string, locale: string) =>
    dictionaryContents[locale]?.[key],
}));

const intlayerLocale = vi.hoisted(() => ({ current: null as never }));

vi.mock('angular-intlayer', () => {
  const locale = signal('en');
  intlayerLocale.current = locale as never;
  return {
    createIntlayerClient: () => ({
      locale: locale.asReadonly(),
      setLocale: (value: string) => locale.set(value),
    }),
  };
});

const {
  _,
  provideTranslateLoader,
  provideTranslateService,
  TranslateLoader,
  TranslatePipe,
  TranslateService,
  translate,
} = await import('./index');

const createInjector = (
  config: Parameters<typeof provideTranslateService>[0] = {}
): Injector =>
  InjectorClass.create({ providers: provideTranslateService(config) });

describe('ngx-translate compat adapter', () => {
  let injector: Injector;
  let service: InstanceType<typeof TranslateService>;

  beforeEach(() => {
    (intlayerLocale.current as ReturnType<typeof signal<string>>).set('en');
    injector = createInjector({ fallbackLang: 'en' });
    service = injector.get(TranslateService);
  });

  it('resolves keys through the intlayer dictionaries', () => {
    expect(service.instant('home.title', { name: 'Ada' })).toBe('Hello Ada');
    expect(service.instant('home.items', { count: 3 })).toBe('3 items');
    expect(service.instant('home.nav')).toEqual({ about: 'About' });
    expect(service.instant(['home.nav.about', 'missing'])).toEqual({
      'home.nav.about': 'About',
      missing: 'missing',
    });
    expect(service.instant('')).toBe('');
  });

  it('shares the language with angular-intlayer', () => {
    const languages: string[] = [];
    service.onLangChange.subscribe(({ lang }) => languages.push(lang));

    service.use('fr');

    expect(service.getCurrentLang()).toBe('fr');
    expect(languages).toEqual(['fr']);
    expect(service.instant('home.title', { name: 'Ada' })).toBe('Bonjour Ada');
    // Missing in `fr` → fallback language.
    expect(service.instant('home.nav.about')).toBe('About');
    expect(service.getLangs()).toEqual(['en', 'fr']);
  });

  it('prefers runtime translations and honours the loader', async () => {
    service.setTranslation('en', { home: { nav: { about: 'Custom' } } });
    expect(service.instant('home.nav.about')).toBe('Custom');

    service.set('extra.key', 'Value {{ n }}');
    expect(service.instant('extra.key', { n: 1 })).toBe('Value 1');

    const loadingInjector = createInjector({
      loader: provideTranslateLoader(() => ({
        getTranslation: (lang: string) => of({ loaded: `from ${lang}` }),
      })),
    });
    const loadingService = loadingInjector.get(TranslateService);
    expect(loadingInjector.get(TranslateLoader)).toBeDefined();

    await firstValueFrom(loadingService.use('fr'));
    expect(loadingService.instant('loaded')).toBe('from fr');
  });

  it('exposes reactive signals and observables', async () => {
    const title = runInInjectionContext(injector, () =>
      translate('home.title', { name: 'Bo' })
    );
    expect(title()).toBe('Hello Bo');

    service.use('fr');
    expect(title()).toBe('Bonjour Bo');

    const values: unknown[] = [];
    const subscription = service
      .stream('home.title', { name: 'Cy' })
      .subscribe((value) => values.push(value));
    service.use('en');
    subscription.unsubscribe();
    expect(values).toEqual(['Bonjour Cy', 'Hello Cy']);

    await expect(firstValueFrom(service.get('home.nav.about'))).resolves.toBe(
      'About'
    );
  });

  it('translates through the pipe', () => {
    const pipe = runInInjectionContext(injector, () => new TranslatePipe());

    expect(pipe.transform('home.title', { name: 'Ada' })).toBe('Hello Ada');
    expect(pipe.transform('home.title', "{name: 'Eve'}")).toBe('Hello Eve');
    expect(pipe.transform(null)).toBeNull();
  });

  it('keeps `_` as an extraction marker', () => {
    expect(_('home.title')).toBe('home.title');
  });
});

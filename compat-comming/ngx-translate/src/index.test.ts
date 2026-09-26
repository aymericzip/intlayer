// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  equals,
  getValue,
  insertValue,
  mergeDeep,
  provideTranslateService,
  TranslatePipe,
  TranslateService,
  translate,
} from './index';

describe('ngx-translate compat adapter', () => {
  it('provides TranslateService with instant and use', () => {
    const service = new TranslateService();

    service.setTranslation('en', {
      GREETING: 'Hello {{name}}!',
      ABOUT: {
        TITLE: 'About Us',
      },
    });

    service.use('en');
    expect(service.getCurrentLang()).toBe('en');
    expect(service.currentLang()).toBe('en');

    // Simple key
    expect(service.instant('GREETING', { name: 'World' })).toBe('Hello World!');

    // Nested key
    expect(service.instant('ABOUT.TITLE')).toBe('About Us');

    // Array of keys
    const multi = service.instant(['GREETING', 'ABOUT.TITLE'], {
      name: 'Alice',
    });
    expect(multi.GREETING).toBe('Hello Alice!');
    expect(multi['ABOUT.TITLE']).toBe('About Us');
  });

  it('provides observable get and stream', async () => {
    const service = new TranslateService();
    service.setTranslation('en', { HELLO: 'Hello' });
    service.use('en');

    let emitted: any;
    service.get('HELLO').subscribe((val) => {
      emitted = val;
    });

    expect(emitted).toBe('Hello');
  });

  it('falls back to key when translation is missing', () => {
    const service = new TranslateService();
    expect(service.instant('NON_EXISTENT_KEY')).toBe('NON_EXISTENT_KEY');
  });

  it('provides utility functions (equals, getValue, insertValue, mergeDeep)', () => {
    expect(equals({ a: 1, b: [2] }, { a: 1, b: [2] })).toBe(true);
    expect(equals({ a: 1 }, { a: 2 })).toBe(false);

    const obj = { user: { profile: { name: 'John' } } };
    expect(getValue(obj, 'user.profile.name')).toBe('John');
    expect(getValue(obj, 'user.profile.age')).toBeUndefined();

    const inserted = insertValue({ a: { b: 1 } }, 'a.c', 2);
    expect((inserted as any).a.c).toBe(2);

    const merged = mergeDeep({ a: { x: 1 } }, { a: { y: 2 }, b: 3 });
    expect(merged.a.x).toBe(1);
    expect(merged.a.y).toBe(2);
    expect(merged.b).toBe(3);
  });

  it('provides standalone translate signal function', () => {
    const service = new TranslateService();
    service.setTranslation('en', { HELLO: 'Hello' });
    service.use('en');

    // Standalone function translate reads from service
    const sig = translate('HELLO');
    expect(sig()).toBe('HELLO');
  });

  it('provides TranslatePipe', () => {
    const pipe = new TranslatePipe();
    expect(pipe.transform('TEST')).toBe('TEST');
  });

  it('provides DI providers', () => {
    const providers = provideTranslateService({ fallbackLang: 'en' });
    expect(Array.isArray(providers)).toBe(true);
    expect(providers.length).toBeGreaterThan(0);
  });
});

import type { Dictionary } from '@intlayer/types';
import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import { getPerLocaleDictionary } from './getLocalizedContent';

describe('getPerLocaleDictionary', () => {
  const dictionary = {
    key: 'website-structured-data',
    content: {
      keywords: t<string[]>({
        en: [
          'translation',
          'localization',
          'multilingual',
          'Internationalization',
          'i18n',
          'Web Development',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Content Management System',
        ],
        fr: [
          'Traduction',
          'Localisation',
          'Multilingue',
          'SEO',
          'Internationalisation',
          'i18n',
          'Développement Web',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Content Management System',
        ],
        es: [
          'Traducción',
          'Localización',
          'Multilingüe',
          'SEO',
          'Internacionalización',
          'i18n',
          'Next.js',
          'Desarrollo Web',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Content Management System',
        ],
        'en-GB': [
          'translation',
          'localisation',
          'multilingual',
          'Internationalization',
          'i18n',
          'Web Development',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Content Management System',
        ],
        de: [
          'Übersetzung',
          'Lokalisierung',
          'Mehrsprachig',
          'SEO',
          'Internationalisierung',
          'i18n',
          'Webentwicklung',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Content-Management-System',
        ],
        it: [
          'Traduzione',
          'Localizzazione',
          'Multilingue',
          'SEO',
          'Internazionalizzazione',
          'i18n',
          'Sviluppo Web',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Sistema di gestione dei contenuti',
        ],
        ja: [
          '翻訳',
          'ローカリゼーション',
          '多言語',
          'SEO',
          '国際化',
          'i18n',
          'ウェブ開発',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'コンテンツ管理システム',
        ],
        ko: [
          '번역',
          '현지화',
          '다국어',
          'SEO',
          '국제화',
          'i18n',
          '웹 개발',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          '콘텐츠 관리 시스템',
        ],
        zh: [
          '翻译',
          '本地化',
          '多语言',
          'SEO',
          '国际化',
          'i18n',
          '网页开发',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          '内容管理系统',
        ],
        pt: [
          'Tradução',
          'Localização',
          'Multilíngue',
          'SEO',
          'Internacionalização',
          'i18n',
          'Desenvolvimento Web',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Sistema de Gestão de Conteúdo',
        ],
        hi: [
          'अनुवाद',
          'स्थानीयकरण',
          'बहुभाषी',
          'एसईओ',
          'अंतर्राष्ट्रीयकरण',
          'i18n',
          'वेब विकास',
          'Next.js',
          'जावास्क्रिप्ट',
          'Vite',
          'React',
          'CMS',
          'सामग्री प्रबंधन प्रणाली',
        ],
        ar: [
          'ترجمة',
          'توطين',
          'متعدد اللغات',
          'SEO',
          'التدويل',
          'i18n',
          'تطوير الويب',
          'Next.js',
          'جافا سكريبت',
          'Vite',
          'React',
          'CMS',
          'نظام إدارة المحتوى',
        ],
        ru: [
          'перевод',
          'локализация',
          'многоязычный',
          'SEO',
          'интернационализация',
          'i18n',
          'веб-разработка',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'Система управления контентом',
        ],
        tr: [
          'çeviri',
          'yerelleştirme',
          'çok dilli',
          'Uluslararasılaştırma',
          'i18n',
          'Web Geliştirme',
          'Next.js',
          'JavaScript',
          'Vite',
          'React',
          'CMS',
          'İçerik Yönetim Sistemi',
        ],
      }),
    },
  } satisfies Dictionary;

  it('should return Turkish content when Turkish locale is requested', () => {
    const result = getPerLocaleDictionary(dictionary, 'tr');

    expect(result.key).toBe('website-structured-data');
    expect(result.locale).toBe('tr');
    expect(result.content.keywords).toEqual([
      'çeviri',
      'yerelleştirme',
      'çok dilli',
      'Uluslararasılaştırma',
      'i18n',
      'Web Geliştirme',
      'Next.js',
      'JavaScript',
      'Vite',
      'React',
      'CMS',
      'İçerik Yönetim Sistemi',
    ]);
  });

  it('should return English content when English locale is requested', () => {
    const result = getPerLocaleDictionary(dictionary, 'en');

    expect(result.key).toBe('website-structured-data');
    expect(result.locale).toBe('en');
    expect(result.content.keywords).toEqual([
      'translation',
      'localization',
      'multilingual',
      'Internationalization',
      'i18n',
      'Web Development',
      'Next.js',
      'JavaScript',
      'Vite',
      'React',
      'CMS',
      'Content Management System',
    ]);
  });

  it('should return French content when French locale is requested', () => {
    const result = getPerLocaleDictionary(dictionary, 'fr');

    expect(result.key).toBe('website-structured-data');
    expect(result.locale).toBe('fr');
    expect(result.content.keywords).toEqual([
      'Traduction',
      'Localisation',
      'Multilingue',
      'SEO',
      'Internationalisation',
      'i18n',
      'Développement Web',
      'Next.js',
      'JavaScript',
      'Vite',
      'React',
      'CMS',
      'Content Management System',
    ]);
  });

  it('should fallback to English when requested locale is not available', () => {
    const result = getPerLocaleDictionary(dictionary, 'xx', 'en');

    expect(result.key).toBe('website-structured-data');
    expect(result.locale).toBe('xx');
    expect(result.content.keywords).toEqual([
      'translation',
      'localization',
      'multilingual',
      'Internationalization',
      'i18n',
      'Web Development',
      'Next.js',
      'JavaScript',
      'Vite',
      'React',
      'CMS',
      'Content Management System',
    ]);
  });

  it('should fallback to French when requested locale is not available and French is specified as fallback', () => {
    const result = getPerLocaleDictionary(dictionary, 'xx', 'fr');

    expect(result.key).toBe('website-structured-data');
    expect(result.locale).toBe('xx');
    expect(result.content.keywords).toEqual([
      'Traduction',
      'Localisation',
      'Multilingue',
      'SEO',
      'Internationalisation',
      'i18n',
      'Développement Web',
      'Next.js',
      'JavaScript',
      'Vite',
      'React',
      'CMS',
      'Content Management System',
    ]);
  });

  it('should return undefined content when locale and fallback are not available', () => {
    const result = getPerLocaleDictionary(dictionary, 'xx', 'yy');

    expect(result.key).toBe('website-structured-data');
    expect(result.content.keywords).toBeUndefined();
  });

  it('should fallback to English when locale exists but value is undefined', () => {
    const dictionaryWithUndefinedLocale = {
      key: 'test-undefined-locale',
      content: {
        title: t({
          en: 'test en',
          fr: 'test fr',
          es: undefined,
        }),
      },
    } satisfies Dictionary;

    const result = getPerLocaleDictionary(
      dictionaryWithUndefinedLocale,
      Locales.SPANISH,
      Locales.ENGLISH
    );

    expect(result.key).toBe('test-undefined-locale');
    expect(result.locale).toBe(Locales.SPANISH);
    expect(result.content.title).toBe('test en');
  });

  it('should handle en-GB locale correctly', () => {
    const result = getPerLocaleDictionary(dictionary, 'en-GB');

    expect(result.key).toBe('website-structured-data');
    expect(result.locale).toBe('en-GB');
    expect(result.content.keywords).toEqual([
      'translation',
      'localisation',
      'multilingual',
      'Internationalization',
      'i18n',
      'Web Development',
      'Next.js',
      'JavaScript',
      'Vite',
      'React',
      'CMS',
      'Content Management System',
    ]);
  });
});

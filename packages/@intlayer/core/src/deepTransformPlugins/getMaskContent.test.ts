import { describe, expect, it } from 'vitest';
import { buildMaskPlugin, getMaskContent } from './getMaskContent';

describe('getMaskContent', () => {
  it('should transform a simple dictionary content to mask format', () => {
    const simpleDictionary = {
      key: 'simple-test',
      content: {
        title: 'Simple Title',
        description: 'Simple Description',
      },
    };

    const result = getMaskContent(simpleDictionary);

    expect(result).toEqual({
      key: 'simple-test',
      content: {
        title: true,
        description: true,
      },
    });
  });

  it('should transform complex nested dictionary content to mask format', () => {
    const complexDictionary = {
      key: 'complex-test',
      content: {
        title: 'Complex Title',
        nested: {
          level1: {
            level2: 'Deep Value',
            anotherValue: 'Another Deep Value',
          },
          simpleValue: 'Simple',
        },
        arrayValue: ['item1', 'item2', 'item3'],
      },
    };

    const result = getMaskContent(complexDictionary);

    expect(result).toEqual({
      key: 'complex-test',
      content: {
        title: true,
        nested: {
          level1: {
            level2: true,
            anotherValue: true,
          },
          simpleValue: true,
        },
        arrayValue: [true, true, true],
      },
    });
  });

  it('should transform translation nodes to mask format', () => {
    const translationDictionary = {
      key: 'translation-test',
      content: {
        title: {
          nodeType: 'translation',
          translation: {
            en: 'Onboarding',
            'en-GB': 'Onboarding',
            fr: 'Configurer votre compte',
            es: 'Configurar tu cuenta',
            de: 'Ihr Konto einrichten',
            ja: 'オンボーディング',
            ko: '온보딩',
            zh: '入门',
            it: 'Onboarding',
            pt: 'Configuração da sua conta',
            hi: 'ऑनबोर्डिंग',
            ar: 'إعداد الحساب',
            ru: 'Настройка аккаунта',
          },
        },
      },
    };

    const result = getMaskContent(translationDictionary);

    expect(result).toEqual({
      key: 'translation-test',
      content: {
        title: {
          en: true,
          'en-GB': true,
          fr: true,
          es: true,
          de: true,
          ja: true,
          ko: true,
          zh: true,
          it: true,
          pt: true,
          hi: true,
          ar: true,
          ru: true,
        },
      },
    });
  });

  it('should transform the onboarding page content data to mask format', () => {
    const onboardingDictionary = {
      key: 'onboard-page',
      content: {
        test1: {
          nodeType: 'translation',
          translation: {
            en: 'Test 1 en',
            'en-GB': 'Test 1 en',
            fr: 'Test 1 fr',
            es: 'Test 1 es',
            de: 'Test 1 de',
            ja: 'Test 1 ja',
            ko: 'Test 1 ko',
            zh: 'Test 1 zh',
            it: 'Test 1 it',
            pt: 'Test 1 pt',
            hi: 'Test 1 hi',
            ar: 'Test 1 ar',
            ru: 'Test 1 ru',
          },
        },
        test: {
          test2: {
            test3: {
              nodeType: 'translation',
              translation: {
                en: 'Test 3 en',
                fr: 'Test 3 fr',
                hi: 'टेस्ट 3 हिंदी',
                pt: 'Teste 3 pt',
                'en-GB': 'Test 3 en',
                it: 'Test 3 it',
                ar: 'اختبار 3 بالعربية',
                de: 'Test 3 de',
                es: 'Prueba 3 es',
                zh: '测试 3 zh',
                ko: '테스트 3 ko',
                ja: 'テスト 3 ja',
                ru: 'Тест 3 на русском',
              },
            },
          },
          test4: {
            nodeType: 'translation',
            translation: {
              en: 'Test 4 en',
              fr: 'Test 4 fr',
              hi: 'टेस्ट 4 हिंदी',
              pt: 'Teste 4 pt',
              'en-GB': 'Test 4 en',
              it: 'Test 4 it',
              ar: 'اختبار 4 بالعربية',
              de: 'Test 4 de',
              es: 'Prueba 4 es',
              zh: '测试 4 zh',
              ko: '테스트 4 ko',
              ja: 'テスト 4 ja',
              ru: 'Тест 4 на русском',
            },
          },
          test6: [
            {
              nodeType: 'translation',
              translation: {
                en: 'Test 6 en',
                fr: 'Test 6 fr',
              },
            },
            {
              nodeType: 'translation',
              translation: {
                en: 'Test 7 en',
                fr: 'Test 7 fr',
              },
            },
          ],
        },
      },
    };

    const result = getMaskContent(onboardingDictionary);

    expect(result).toEqual({
      key: 'onboard-page',
      content: {
        test1: {
          en: true,
          fr: true,
          hi: true,
          pt: true,
          'en-GB': true,
          it: true,
          ar: true,
          de: true,
          es: true,
          zh: true,
          ko: true,
          ja: true,
          ru: true,
        },
        test: {
          test2: {
            test3: {
              en: true,
              fr: true,
              hi: true,
              pt: true,
              'en-GB': true,
              it: true,
              ar: true,
              de: true,
              es: true,
              zh: true,
              ko: true,
              ja: true,
              ru: true,
            },
          },
          test4: {
            en: true,
            fr: true,
            hi: true,
            pt: true,
            'en-GB': true,
            it: true,
            ar: true,
            de: true,
            es: true,
            zh: true,
            ko: true,
            ja: true,
            ru: true,
          },
          test6: [
            {
              en: true,
              fr: true,
            },
            {
              en: true,
              fr: true,
            },
          ],
        },
      },
    });
  });

  it('should handle mixed content types', () => {
    const mixedDictionary = {
      key: 'mixed-test',
      content: {
        plainString: 'Plain String',
        number: 42,
        translationNode: {
          nodeType: 'translation',
          translation: {
            en: 'English',
            fr: 'French',
          },
        },
        nested: {
          anotherString: 'Another String',
          deepNested: {
            value: 'Deep Value',
          },
        },
        array: ['item1', 2, 'item3'],
      },
    };

    const result = getMaskContent(mixedDictionary);

    expect(result).toEqual({
      key: 'mixed-test',
      content: {
        plainString: true,
        number: true,
        translationNode: {
          en: true,
          fr: true,
        },
        nested: {
          anotherString: true,
          deepNested: {
            value: true,
          },
        },
        array: [true, true, true],
      },
    });
  });

  it('should preserve dictionary key', () => {
    const testDictionary = {
      key: 'preserve-key-test',
      content: {
        title: 'Title',
      },
    };

    const result = getMaskContent(testDictionary);

    expect(result.key).toBe('preserve-key-test');
  });

  it('should handle empty content', () => {
    const emptyDictionary = {
      key: 'empty-test',
      content: {},
    };

    const result = getMaskContent(emptyDictionary);

    expect(result).toEqual({
      key: 'empty-test',
      content: {},
    });
  });
});

describe('buildMaskPlugin', () => {
  it('should have correct id', () => {
    expect(buildMaskPlugin.id).toBe('build-mask-plugin');
  });

  it('should handle strings', () => {
    expect(buildMaskPlugin.canHandle('test string')).toBe(true);
  });

  it('should handle numbers', () => {
    expect(buildMaskPlugin.canHandle(42)).toBe(true);
    expect(buildMaskPlugin.canHandle(0)).toBe(true);
    expect(buildMaskPlugin.canHandle(-1)).toBe(true);
  });

  it('should not handle objects', () => {
    expect(buildMaskPlugin.canHandle({})).toBe(false);
    expect(buildMaskPlugin.canHandle([])).toBe(false);
    expect(buildMaskPlugin.canHandle(null)).toBe(false);
  });

  it('should not handle undefined', () => {
    expect(buildMaskPlugin.canHandle(undefined)).toBe(false);
  });
});

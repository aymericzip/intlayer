import { describe, expect, it } from 'vitest';
import { applyMask } from './applyMask';
import { buildMask } from './buildMask';

describe('applyMask', () => {
  it('should return the full dictionary when mask is true', () => {
    const fullDictionary = {
      key: 'test-key',
      content: {
        title: 'Test Title',
        description: 'Test Description',
      },
    };

    const result = applyMask(fullDictionary, true);

    expect(result).toEqual(fullDictionary);
  });

  it('should apply simple object mask to filter dictionary content', () => {
    const fullDictionary = {
      key: 'test-key',
      content: {
        title: 'Test Title',
        description: 'Test Description',
        hiddenField: 'Hidden Value',
      },
    };

    const mask = {
      key: 'test-key',
      content: {
        title: true,
        description: true,
      },
    };

    const result = applyMask(fullDictionary, mask);

    expect(result).toEqual({
      key: 'test-key',
      content: {
        title: 'Test Title',
        description: 'Test Description',
      },
    });
  });

  it('should preserve nodeType objects when applying mask', () => {
    const fullDictionary = {
      key: 'onboard-page',
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

    const mask = {
      key: 'onboard-page',
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
    };

    const result = applyMask(fullDictionary, mask);

    expect(result).toEqual(fullDictionary);
    expect(result.content.title).toHaveProperty('nodeType', 'translation');
  });

  it('should handle array structures correctly', () => {
    const fullDictionary = {
      key: 'test-key',
      content: {
        items: ['Item 1', 'Item 2', 'Item 3'],
      },
    };

    const mask = {
      key: 'test-key',
      content: {
        items: [true, true, true],
      },
    };

    const result = applyMask(fullDictionary, mask);

    expect(result).toEqual(fullDictionary);
  });

  it('should handle complex onboarding dictionary structure from the provided example', () => {
    // This is the reduced result that should be produced after applyMask
    const expectedReducedResult = {
      key: 'onboard-page',
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
            hi: 'ऑনबोर्डिंग',
            ar: 'إعداد الحساب',
            ru: 'Настройка аккаунта',
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
        test5: {
          nodeType: 'translation',
          translation: {
            en: 'Test 5 en',
            fr: 'Test 5 fr',
            hi: 'टेस्ट 5 हिंदी',
            pt: 'Teste 5 pt',
            'en-GB': 'Test 5 en',
            it: 'Test 5 it',
            ar: 'اختبار 5 بالعربية',
            de: 'Test 5 de',
            es: 'Prueba 5 es',
            zh: '测试 5 zh',
            ko: '테스트 5 ko',
            ja: 'テスト 5 ja',
            ru: 'Тест 5 на русском',
          },
        },
        description: {
          nodeType: 'translation',
          translation: {
            en: 'Set up your Intlayer account by following the instructions.',
            'en-GB':
              'Set up your Intlayer account by following the instructions.',
            fr: 'Suivez les instructions pour configurer votre compte Intlayer.',
            es: 'Sigue las instrucciones para configurar tu cuenta de Intlayer.',
            de: 'Richten Sie Ihr Intlayer-Konto ein, indem Sie die Anweisungen befolgen.',
            ja: '指示に従ってIntlayerアカウントを設定します。',
            ko: '지침에 따라 Intlayer 계정을 설정하십시오.',
            zh: '按照说明设置您的Intlayer帐户。',
            it: 'Configura il tuo account Intlayer seguendo le istruzioni.',
            pt: 'Configure sua conta Intlayer seguindo as instruções.',
            hi: 'निर्देशों का पालन करके अपना Intlayer खाता सेट करें।',
            ar: 'قم بإعداد حسابك في Intlayer باتباع التعليمات.',
            ru: 'Настройте свою учетную запись Intlayer, следуя инструкциям.',
          },
        },
      },
    };

    // Create the full dictionary including the test6 array which should be filtered out
    const fullOnboardingDictionary = {
      key: 'onboard-page',
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
            hi: 'ऑনबोर्डिंग',
            ar: 'إعداد الحساب',
            ru: 'Настройка аккаунта',
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
        test5: {
          nodeType: 'translation',
          translation: {
            en: 'Test 5 en',
            fr: 'Test 5 fr',
            hi: 'टेस्ट 5 हिंदी',
            pt: 'Teste 5 pt',
            'en-GB': 'Test 5 en',
            it: 'Test 5 it',
            ar: 'اختبار 5 بالعربية',
            de: 'Test 5 de',
            es: 'Prueba 5 es',
            zh: '测试 5 zh',
            ko: '테스트 5 ko',
            ja: 'テスト 5 ja',
            ru: 'Тест 5 на русском',
          },
        },
        description: {
          nodeType: 'translation',
          translation: {
            en: 'Set up your Intlayer account by following the instructions.',
            'en-GB':
              'Set up your Intlayer account by following the instructions.',
            fr: 'Suivez les instructions pour configurer votre compte Intlayer.',
            es: 'Sigue las instrucciones para configurar tu cuenta de Intlayer.',
            de: 'Richten Sie Ihr Intlayer-Konto ein, indem Sie die Anweisungen befolgen.',
            ja: '指示に従ってIntlayerアカウントを設定します。',
            ko: '지침에 따라 Intlayer 계정을 설정하십시오.',
            zh: '按照说明设置您的Intlayer帐户。',
            it: 'Configura il tuo account Intlayer seguendo le istruzioni.',
            pt: 'Configure sua conta Intlayer seguindo as instruções.',
            hi: 'निर्देशों का पालन करके अपना Intlayer खाता सेट करें।',
            ar: 'قم بإعداد حسابك في Intlayer باتباع التعليمات.',
            ru: 'Настройте свою учетную запись Intlayer, следуя инструкциям.',
          },
        },
      },
    };

    // Create a mask that excludes test6 array
    const mask = {
      key: 'onboard-page',
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
        test5: {
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
        description: {
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
    };

    const result = applyMask(fullOnboardingDictionary, mask);

    expect(result).toEqual(expectedReducedResult);
    expect(result.content.title).toHaveProperty('nodeType', 'translation');
    expect(result.content.test5).toHaveProperty('nodeType', 'translation');
    expect(result.content.description).toHaveProperty(
      'nodeType',
      'translation'
    );
    // Verify that test6 is included and preserved
    expect(result.content.test).toHaveProperty('test6');
    expect(result.content.test.test6).toEqual([
      {
        nodeType: 'translation',
        translation: { en: 'Test 6 en', fr: 'Test 6 fr' },
      },
      {
        nodeType: 'translation',
        translation: { en: 'Test 7 en', fr: 'Test 7 fr' },
      },
    ]);
  });

  it('should handle arrays with translation nodes', () => {
    const fullDictionary = {
      key: 'test-key',
      content: {
        arrayItems: [
          {
            nodeType: 'translation',
            translation: {
              en: 'Item 1 en',
              fr: 'Item 1 fr',
            },
          },
          {
            nodeType: 'translation',
            translation: {
              en: 'Item 2 en',
              fr: 'Item 2 fr',
            },
          },
        ],
      },
    };

    const mask = {
      key: 'test-key',
      content: {
        arrayItems: [
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
    };

    const result = applyMask(fullDictionary, mask);

    expect(result).toEqual(fullDictionary);
    expect(result.content.arrayItems[0]).toHaveProperty(
      'nodeType',
      'translation'
    );
    expect(result.content.arrayItems[1]).toHaveProperty(
      'nodeType',
      'translation'
    );
  });

  it('should handle nested complex structures', () => {
    const fullDictionary = {
      key: 'nested-test',
      content: {
        level1: {
          level2: {
            level3: {
              nodeType: 'translation',
              translation: {
                en: 'Deep nested value',
                fr: 'Valeur profondément imbriquée',
              },
            },
            normalValue: 'Normal value',
          },
          simpleValue: 'Simple value',
        },
      },
    };

    const mask = {
      key: 'nested-test',
      content: {
        level1: {
          level2: {
            level3: {
              en: true,
              fr: true,
            },
          },
        },
      },
    };

    const result = applyMask(fullDictionary, mask);

    expect(result).toEqual({
      key: 'nested-test',
      content: {
        level1: {
          level2: {
            level3: {
              nodeType: 'translation',
              translation: {
                en: 'Deep nested value',
                fr: 'Valeur profondément imbriquée',
              },
            },
          },
        },
      },
    });
    expect(result.content.level1.level2.level3).toHaveProperty(
      'nodeType',
      'translation'
    );
  });

  it('should return original value for unexpected cases', () => {
    const unexpectedValue = 'some string';
    const unexpectedMask = null;

    const result = applyMask(unexpectedValue as any, unexpectedMask);

    expect(result).toBe(unexpectedValue);
  });

  it('should work with buildMask integration', () => {
    const originalDictionary = {
      key: 'integration-test',
      content: {
        title: {
          nodeType: 'translation',
          translation: {
            en: 'Title',
            fr: 'Titre',
          },
        },
        description: 'Simple description',
      },
    };

    // Create mask using buildMask
    const mask = buildMask(originalDictionary);

    // Apply the mask back to the original
    const result = applyMask(originalDictionary, mask);

    // Should return the same dictionary since the mask includes everything
    expect(result).toEqual(originalDictionary);
  });
});

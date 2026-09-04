import { type Dictionary, t } from 'intlayer';

const localeSwitcherContent = {
  key: 'locale-switcher',
  content: {
    localeSwitcherLabel: t({
      en: 'Language switcher',
      'en-GB': 'Language switcher',
      fr: 'Changer de langue',
      es: 'Cambiar idioma',
      de: 'Sprachwechsler',
      ja: '言語スイッチャー',
      ko: '언어 스위치',
      zh: '语言切换器',
      it: 'Cambia lingua',
      pt: 'Mudar idioma',
      hi: 'भाषा स्विचर',
      ar: 'مبدل اللغة',
      ru: 'Переключатель языка',
    }),
  },
} satisfies Dictionary;

export default localeSwitcherContent;

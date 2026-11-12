import { type Dictionary, t } from 'intlayer';

const localeSwitcherContent = {
  key: 'locale-switcher',
  content: {
    localeSwitcherLabel: t({
      en: 'Language switcher',
      ar: 'مبدل اللغة',
      de: 'Sprachwechsler',
      'en-GB': 'Language switcher',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
      'he-IL': 'החלפת שפה',
      hi: 'भाषा स्विचर',
      it: 'Cambia lingua',
      ja: '言語スイッチャー',
      ko: '언어 스위치',
      pt: 'Mudar idioma',
      ru: 'Переключатель языка',
      zh: '语言切换器',
    }),
  },
} satisfies Dictionary;

export default localeSwitcherContent;

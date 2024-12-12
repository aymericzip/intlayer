import { t, type DeclarationContent } from 'intlayer';

const localeSwitcherContent = {
  key: 'locale-switcher',
  content: {
    switchTo: t({
      en: 'Switch to',
      fr: 'Passer à',
      es: 'Cambiar a',
      'en-GB': 'Switch to',
      de: 'Wechseln Sie zu',
      ja: 'に切り替える',
      ko: '전환',
      zh: '切换到',
      it: 'Passa a',
      pt: 'Mudar para',
      hi: 'स्विच करें',
      ar: 'التبديل إلى',
      ru: 'Переключиться на',
    }),
  },
} satisfies DeclarationContent;

export default localeSwitcherContent;

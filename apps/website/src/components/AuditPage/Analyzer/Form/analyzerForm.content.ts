import { type Dictionary, t } from 'intlayer';

const analyzerFormContent = {
  key: 'analyzer-form',
  content: {
    input: {
      placeholder: t({
        en: 'https://yourwebsite.com',
        fr: 'https://votresite.com',
        es: 'https://tusitio.com',
        de: 'https://ihrewebsite.de',
        ja: 'https://あなたのサイト.jp',
        zh: 'https://你的網站.cn',
      }),
    },
    button: {
      analyze: t({
        en: 'Analyze',
        fr: 'Analyser',
        es: 'Analizar',
        de: 'Analysieren',
        ja: '分析する',
        zh: '分析',
      }),
      analyzing: t({
        en: 'Analyzing...',
        fr: 'Analyse en cours...',
        es: 'Analizando...',
        de: 'Analysiere...',
        ja: '分析中...',
        zh: '正在分析...',
      }),
    },
  },
  title: 'Analyzer form texts',
  description: 'Localized labels and placeholders for the analyzer form',
  tags: ['form', 'analyze', 'url'],
} satisfies Dictionary;

export default analyzerFormContent;

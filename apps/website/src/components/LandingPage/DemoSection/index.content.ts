import { t, type Dictionary } from 'intlayer';

const demoSectionContent = {
  key: 'demo-section',
  content: {
    title: t({
      en: 'Try the live demo',
      'en-GB': 'Try the live demo',
      fr: 'Essayez la démo en direct',
      es: 'Prueba la demo en vivo',
      de: 'Versuchen Sie die Live-Demo',
      ja: 'ライブデモを試す',
      ko: '라이브 데모를 사용해 보세요',
      zh: '试用实时演示',
      it: 'Prova la demo dal vivo',
      pt: 'Experimente a demonstração ao vivo',
      hi: 'लाइव डेमो का प्रयास करें',
      ar: 'جرب العرض التوضيحي المباشر',
      ru: 'Попробуйте демонстрацию в реальном времени',
      tr: 'Canlı demoyu deneyin',
    }),
    demoSwitchSelector: {
      youtube: t({
        en: 'Watch YouTube demo',
        'en-GB': 'Watch YouTube demo',
        fr: 'Regardez la démo YouTube',
        es: 'Mira la demo en YouTube',
        de: 'YouTube-Demo ansehen',
        ja: 'YouTubeデモを見る',
        ko: 'YouTube 데모 보기',
        zh: '观看YouTube演示',
        it: 'Guarda la demo di YouTube',
        pt: 'Assista à demonstração do YouTube',
        hi: 'YouTube डेमो देखें',
        ar: 'شاهد العرض التوضيحي على YouTube',
        ru: 'Посмотрите демо на YouTube',
        tr: 'YouTube demosunu izleyin',
      }),
      codeSandbox: t({
        en: 'Try using CodeSandbox',
        'en-GB': 'Try using CodeSandbox',
        fr: 'Essayez avec CodeSandbox',
        es: 'Prueba con CodeSandbox',
        de: 'Versuchen Sie es mit CodeSandbox',
        ja: 'CodeSandboxを使用してみてください',
        ko: 'CodeSandbox를 사용해 보세요',
        zh: '尝试使用CodeSandbox',
        it: 'Prova a usare CodeSandbox',
        pt: 'Experimente usar o CodeSandbox',
        hi: 'CodeSandbox का उपयोग करने का प्रयास करें',
        ar: 'جرب استخدام CodeSandbox',
        ru: 'Попробуйте использовать CodeSandbox',
        tr: 'CodeSandbox kullanmayı deneyin',
      }),
    },
  },
} satisfies Dictionary;

export default demoSectionContent;

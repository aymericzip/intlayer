import { type Dictionary, t } from 'intlayer';

const demoSectionContent = {
  key: 'demo-section',
  content: {
    demoSwitchSelector: {
      astro: 'Astro',
      nextjs: 'Next.js',
      nuxt: 'Nuxt',
      svelte: 'Svelte',
      tanstack: 'Tanstack Start',
    },
    title: t({
      en: 'Try the live demo',
      ar: 'جرب العرض التوضيحي المباشر',
      de: 'Versuchen Sie die Live-Demo',
      'en-GB': 'Try the live demo',
      es: 'Prueba la demo en vivo',
      fr: 'Essayez la démo en direct',
      'he-IL': 'נסו את ההדגמה החיה',
      hi: 'लाइव डेमो का प्रयास करें',
      id: 'Coba demo langsung',
      it: 'Prova la demo dal vivo',
      ja: 'ライブデモを試す',
      ko: '라이브 데모를 사용해 보세요',
      pl: 'Wypróbuj demo na żywo',
      pt: 'Experimente a demonstração ao vivo',
      ru: 'Попробуйте демонстрацию в реальном времени',
      tr: 'Canlı demoyu deneyin',
      uk: 'Спробуйте живу демонстрацію',
      vi: 'Thử bản demo trực tiếp',
      zh: '试用实时演示',
    }),
  },
  title: 'Demo section',
  description:
    'Content related to the demo section of the landing page, including titles and options to try the demo via Next.js, Tanstack, Astro, Nuxt or Svelte templates.',
  tags: ['landing page', 'demo section'],
} satisfies Dictionary;

export default demoSectionContent;

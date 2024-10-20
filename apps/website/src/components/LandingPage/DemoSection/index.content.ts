import { t, type DeclarationContent } from 'intlayer';

const demoSectionContent = {
  key: 'demo-section',
  content: {
    title: t({
      en: 'Try the live demo',
      fr: 'Essayez la démo en direct',
      es: 'Prueba la demo en vivo',
    }),
    demoSwitchSelector: {
      youtube: t({
        en: 'Watch YouTube demo',
        fr: 'Regardez la démo YouTube',
        es: 'Mira la demo en YouTube',
      }),
      codeSandbox: t({
        en: 'Try using CodeSandbox',
        fr: 'Essayez avec CodeSandbox',
        es: 'Prueba con CodeSandbox',
      }),
    },
  },
} satisfies DeclarationContent;

export default demoSectionContent;

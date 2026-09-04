import { type Dictionary, insert, t } from 'intlayer';

const litDemoContent = {
  key: 'lit-demo',
  content: {
    greeting: t({
      en: 'Hello from Lit!',
      fr: 'Bonjour depuis Lit !',
      es: '¡Hola desde Lit!',
    }),
    description: t({
      en: 'This web component uses lit-intlayer ReactiveControllers inside an Astro page.',
      fr: 'Ce web component utilise les ReactiveControllers lit-intlayer dans une page Astro.',
      es: 'Este web component usa ReactiveControllers de lit-intlayer dentro de una página Astro.',
    }),
    counter: insert(
      t({
        en: 'Count: {{count}}',
        fr: 'Compteur : {{count}}',
        es: 'Contador: {{count}}',
      })
    ),
    increment: t({ en: 'Increment', fr: 'Incrémenter', es: 'Incrementar' }),
    switchLocale: t({
      en: 'Switch locale',
      fr: 'Changer de langue',
      es: 'Cambiar idioma',
    }),
  },
} satisfies Dictionary;

export default litDemoContent;

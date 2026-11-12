import { type Dictionary, insert, t } from 'intlayer';

const litDemoContent = {
  key: 'lit-demo',
  content: {
    counter: insert(
      t({
        en: 'Count: {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Compteur : {{count}}',
      })
    ),
    description: t({
      en: 'This web component uses lit-intlayer ReactiveControllers inside an Astro page.',
      es: 'Este web component usa ReactiveControllers de lit-intlayer dentro de una página Astro.',
      fr: 'Ce web component utilise les ReactiveControllers lit-intlayer dans une page Astro.',
    }),
    greeting: t({
      en: 'Hello from Lit!',
      es: '¡Hola desde Lit!',
      fr: 'Bonjour depuis Lit !',
    }),
    increment: t({ en: 'Increment', es: 'Incrementar', fr: 'Incrémenter' }),
    switchLocale: t({
      en: 'Switch locale',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default litDemoContent;

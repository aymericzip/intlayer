import { type Dictionary, insert, t } from 'intlayer';

const preactDemoContent = {
  key: 'preact-demo',
  content: {
    greeting: t({
      en: 'Hello from Preact!',
      fr: 'Bonjour depuis Preact !',
      es: '¡Hola desde Preact!',
    }),
    description: t({
      en: 'This island uses preact-intlayer hooks inside an Astro page.',
      fr: 'Cette île utilise les hooks preact-intlayer dans une page Astro.',
      es: 'Esta isla usa hooks de preact-intlayer dentro de una página Astro.',
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

export default preactDemoContent;

import { type Dictionary, insert, t } from 'intlayer';

const preactDemoContent = {
  key: 'preact-demo',
  content: {
    counter: insert(
      t({
        en: 'Count: {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Compteur : {{count}}',
      })
    ),
    description: t({
      en: 'This island uses preact-intlayer hooks inside an Astro page.',
      es: 'Esta isla usa hooks de preact-intlayer dentro de una página Astro.',
      fr: 'Cette île utilise les hooks preact-intlayer dans une page Astro.',
    }),
    greeting: t({
      en: 'Hello from Preact!',
      es: '¡Hola desde Preact!',
      fr: 'Bonjour depuis Preact !',
    }),
    increment: t({ en: 'Increment', es: 'Incrementar', fr: 'Incrémenter' }),
    switchLocale: t({
      en: 'Switch locale',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default preactDemoContent;

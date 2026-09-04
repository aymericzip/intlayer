import { type Dictionary, insert, t } from 'intlayer';

const solidDemoContent = {
  key: 'solid-demo',
  content: {
    greeting: t({
      en: 'Hello from Solid!',
      fr: 'Bonjour depuis Solid !',
      es: '¡Hola desde Solid!',
    }),
    description: t({
      en: 'This island uses solid-intlayer signals inside an Astro page.',
      fr: 'Cette île utilise les signaux solid-intlayer dans une page Astro.',
      es: 'Esta isla usa señales de solid-intlayer dentro de una página Astro.',
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

export default solidDemoContent;

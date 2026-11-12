import { type Dictionary, insert, t } from 'intlayer';

const solidDemoContent = {
  key: 'solid-demo',
  content: {
    counter: insert(
      t({
        en: 'Count: {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Compteur : {{count}}',
      })
    ),
    description: t({
      en: 'This island uses solid-intlayer signals inside an Astro page.',
      es: 'Esta isla usa señales de solid-intlayer dentro de una página Astro.',
      fr: 'Cette île utilise les signaux solid-intlayer dans une page Astro.',
    }),
    greeting: t({
      en: 'Hello from Solid!',
      es: '¡Hola desde Solid!',
      fr: 'Bonjour depuis Solid !',
    }),
    increment: t({ en: 'Increment', es: 'Incrementar', fr: 'Incrémenter' }),
    switchLocale: t({
      en: 'Switch locale',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default solidDemoContent;

import { type Dictionary, insert, t } from 'intlayer';

const reactDemoContent = {
  key: 'react-demo',
  content: {
    counter: insert(
      t({
        en: 'Count: {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Compteur : {{count}}',
      })
    ),
    description: t({
      en: 'This island uses react-intlayer hooks inside an Astro page.',
      es: 'Esta isla usa hooks de react-intlayer dentro de una página Astro.',
      fr: 'Cette île utilise les hooks react-intlayer dans une page Astro.',
    }),
    greeting: t({
      en: 'Hello from React!',
      es: '¡Hola desde React!',
      fr: 'Bonjour depuis React !',
    }),
    increment: t({ en: 'Increment', es: 'Incrementar', fr: 'Incrémenter' }),
    switchLocale: t({
      en: 'Switch locale',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default reactDemoContent;

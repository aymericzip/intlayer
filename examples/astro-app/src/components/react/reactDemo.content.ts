import { type Dictionary, insert, t } from 'intlayer';

const reactDemoContent = {
  key: 'react-demo',
  content: {
    greeting: t({
      en: 'Hello from React!',
      fr: 'Bonjour depuis React !',
      es: '¡Hola desde React!',
    }),
    description: t({
      en: 'This island uses react-intlayer hooks inside an Astro page.',
      fr: 'Cette île utilise les hooks react-intlayer dans une page Astro.',
      es: 'Esta isla usa hooks de react-intlayer dentro de una página Astro.',
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

export default reactDemoContent;

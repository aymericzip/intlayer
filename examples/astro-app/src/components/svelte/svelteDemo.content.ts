import { type Dictionary, insert, t } from 'intlayer';

const svelteDemoContent = {
  key: 'svelte-demo',
  content: {
    greeting: t({
      en: 'Hello from Svelte!',
      fr: 'Bonjour depuis Svelte !',
      es: '¡Hola desde Svelte!',
    }),
    description: t({
      en: 'This island uses svelte-intlayer stores inside an Astro page.',
      fr: 'Cette île utilise les stores svelte-intlayer dans une page Astro.',
      es: 'Esta isla usa stores de svelte-intlayer dentro de una página Astro.',
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

export default svelteDemoContent;

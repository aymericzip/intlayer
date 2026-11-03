import { type Dictionary, insert, t } from 'intlayer';

const svelteDemoContent = {
  key: 'svelte-demo',
  content: {
    counter: insert(
      t({
        en: 'Count: {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Compteur : {{count}}',
      })
    ),
    description: t({
      en: 'This island uses svelte-intlayer stores inside an Astro page.',
      es: 'Esta isla usa stores de svelte-intlayer dentro de una página Astro.',
      fr: 'Cette île utilise les stores svelte-intlayer dans une page Astro.',
    }),
    greeting: t({
      en: 'Hello from Svelte!',
      es: '¡Hola desde Svelte!',
      fr: 'Bonjour depuis Svelte !',
    }),
    increment: t({ en: 'Increment', es: 'Incrementar', fr: 'Incrémenter' }),
    switchLocale: t({
      en: 'Switch locale',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default svelteDemoContent;

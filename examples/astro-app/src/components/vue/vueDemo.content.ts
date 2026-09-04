import { type Dictionary, insert, t } from 'intlayer';

const vueDemoContent = {
  key: 'vue-demo',
  content: {
    greeting: t({
      en: 'Hello from Vue!',
      fr: 'Bonjour depuis Vue !',
      es: '¡Hola desde Vue!',
    }),
    description: t({
      en: 'This island uses vue-intlayer composables inside an Astro page.',
      fr: 'Cette île utilise les composables vue-intlayer dans une page Astro.',
      es: 'Esta isla usa composables de vue-intlayer dentro de una página Astro.',
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

export default vueDemoContent;

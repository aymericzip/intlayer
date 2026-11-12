import { type Dictionary, insert, t } from 'intlayer';

const vueDemoContent = {
  key: 'vue-demo',
  content: {
    counter: insert(
      t({
        en: 'Count: {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Compteur : {{count}}',
      })
    ),
    description: t({
      en: 'This island uses vue-intlayer composables inside an Astro page.',
      es: 'Esta isla usa composables de vue-intlayer dentro de una página Astro.',
      fr: 'Cette île utilise les composables vue-intlayer dans une page Astro.',
    }),
    greeting: t({
      en: 'Hello from Vue!',
      es: '¡Hola desde Vue!',
      fr: 'Bonjour depuis Vue !',
    }),
    increment: t({ en: 'Increment', es: 'Incrementar', fr: 'Incrémenter' }),
    switchLocale: t({
      en: 'Switch locale',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default vueDemoContent;

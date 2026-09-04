import { type Dictionary, insert, t } from 'intlayer';

const vanillaDemoContent = {
  key: 'vanilla-demo',
  content: {
    greeting: t({
      en: 'Hello from Vanilla JS!',
      fr: 'Bonjour depuis Vanilla JS !',
      es: '¡Hola desde Vanilla JS!',
    }),
    description: t({
      en: 'This demo uses vanilla-intlayer with plain DOM manipulation.',
      fr: 'Cette démo utilise vanilla-intlayer avec une manipulation DOM simple.',
      es: 'Esta demostración usa vanilla-intlayer con manipulación DOM simple.',
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

export default vanillaDemoContent;

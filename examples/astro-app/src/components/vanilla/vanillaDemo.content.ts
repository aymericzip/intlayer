import { type Dictionary, insert, t } from 'intlayer';

const vanillaDemoContent = {
  key: 'vanilla-demo',
  content: {
    counter: insert(
      t({
        en: 'Count: {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Compteur : {{count}}',
      })
    ),
    description: t({
      en: 'This demo uses vanilla-intlayer with plain DOM manipulation.',
      es: 'Esta demostración usa vanilla-intlayer con manipulación DOM simple.',
      fr: 'Cette démo utilise vanilla-intlayer avec une manipulation DOM simple.',
    }),
    greeting: t({
      en: 'Hello from Vanilla JS!',
      es: '¡Hola desde Vanilla JS!',
      fr: 'Bonjour depuis Vanilla JS !',
    }),
    increment: t({ en: 'Increment', es: 'Incrementar', fr: 'Incrémenter' }),
    switchLocale: t({
      en: 'Switch locale',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default vanillaDemoContent;

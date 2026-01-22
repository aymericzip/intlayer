import { type Dictionary, html, insert, md, t } from 'intlayer';

const homeContent = {
  key: 'home',
  content: {
    // Markdown demo using the new vue-intlayer/markdown adapter
    markdown: md(`## Hello from Vue Markdown!

This is **bold** and this is *italic*.

- List item 1
- List item 2
- List item 3

\`inline code\` and a [link](https://intlayer.org)
<ComponentDemo prop="Hello from MDX!" />
`),

    html: html(
      t({
        en: '<div>Hello <b>World</b><custom-component /><CustomComponent /> <CustomComponent2 myProp="my value" myprop2="my value 2" my-Prop-3:"3"> Hello </CustomComponent2></div>',
        fr: '<div>Bonjour <b>Monde</b><custom-component /><CustomComponent /> <CustomComponent2 myProp="my value" myprop2="my value 2" my-Prop-3:"3"> Hello </CustomComponent2></div>',
        es: '<div>Hola <b>Mundo</b><custom-component /><CustomComponent /> <CustomComponent2 myProp="my value" myprop2="my value 2" my-Prop-3:"3"> Hello </CustomComponent2></div>',
      })
    ),

    insertion: insert('test {{ count }}'),

    welcome: t({
      en: 'Welcome to Our App',
      fr: 'Bienvenue dans Notre Application',
      es: 'Bienvenido a Nuestra Aplicación',
    }),
    subtitle: t({
      en: 'A multilingual Vue.js application using intlayer',
      fr: 'Une application Vue.js multilingue utilisant intlayer',
      es: 'Una aplicación Vue.js multilingüe usando intlayer',
    }),
    description: t({
      en: 'This is a demonstration of how to use intlayer to create multilingual content in your Vue.js applications.',
      fr: "Ceci est une démonstration de l'utilisation d'intlayer pour créer du contenu multilingue dans vos applications Vue.js.",
      es: 'Esta es una demostración de cómo usar intlayer para crear contenido multilingüe en sus aplicaciones Vue.js.',
    }),
    features: {
      title: t({
        en: 'Features',
        fr: 'Fonctionnalités',
        es: 'Características',
      }),
      list: {
        item1: t({
          en: 'Easy language switching',
          fr: 'Changement de langue facile',
          es: 'Cambio de idioma fácil',
        }),
        item2: t({
          en: 'Type-safe translations',
          fr: 'Traductions avec sécurité de type',
          es: 'Traducciones con seguridad de tipos',
        }),
        item3: t({
          en: 'Seamless integration with Vue',
          fr: 'Intégration transparente avec Vue',
          es: 'Integración perfecta con Vue',
        }),
      },
    },
  },
} satisfies Dictionary;

export default homeContent;

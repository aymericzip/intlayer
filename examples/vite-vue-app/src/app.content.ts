import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    connectWithUs: t({
      en: 'Connect with us',
      es: 'Conéctese con nosotros',
      fr: 'Connectez-vous avec nous',
    }),

    countIs: insert(
      t({
        en: 'count is {{count}}',
        es: 'el conteo es de {{count}}',
        fr: 'le compte est de {{count}}',
      })
    ),

    documentation: t({
      en: 'Documentation',
      es: 'Documentación',
      fr: 'Documentation',
    }),

    enumeration: insert(
      enu({
        '0': t({
          en: 'No items',
          es: 'No hay artículos',
          fr: 'Aucun article',
        }),
        '1': t({
          en: 'One item',
          es: 'Un artículo',
          fr: 'Un article',
        }),
        '>1': t({
          en: '{{count}} items',
          es: '{{count}} artículos',
          fr: '{{count}} articles',
        }),
      })
    ),

    exploreVite: t({
      en: 'Explore Vite',
      es: 'Explorar Vite',
      fr: 'Explorer Vite',
    }),

    htmlContent: html(
      t({
        en: '<div>Hello <b>World</b> from Vue! <br/>This is an <i>HTML</i> example with a <a href="https://intlayer.org">link</a>. <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Vue! <br/>Este es un ejemplo <i>HTML</i> con un <a href="https://intlayer.org">enlace</a>. <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Vue! <br/>Ceci est un exemple <i>HTML</i> avec un <a href="https://intlayer.org">lien</a>. <custom-component /></div>',
      })
    ),

    joinCommunity: t({
      en: 'Join the Vue community',
      es: 'Únase a la comunidad Vue',
      fr: 'Rejoignez la communauté Vue',
    }),
    learnMore: t({
      en: 'Learn more',
      es: 'Saber más',
      fr: 'En savoir plus',
    }),

    markdownContent: md(
      t({
        en: `
# Hello from Vue Markdown! 

This is **bold** and *italic*.

<custom-component name="Markdown Demo"></custom-component>
`,
        es: `
# ¡Hola de Vue Markdown! 

Esto es **negrita** e *itálica*.

<custom-component name="Demo Markdown"></custom-component>
`,
        fr: `
# Bonjour de Vue Markdown! 

Ceci est en **gras** et en *italique*.

<custom-component name="Démo Markdown"></custom-component>
`,
      })
    ),

    readTheDocs: t({
      en: 'Click on the Vite and Vue logos to learn more',
      es: 'Haga clic en los logos de Vite y Vue para obtener más información',
      fr: 'Cliquez sur les logos Vite et Vue pour en savoir plus',
    }),

    title: 'Vite + Vue',

    viteLogoLabel: t({
      en: 'Vite Logo',
      es: 'Logo Vite',
      fr: 'Logo Vite',
    }),
    vueLogoLabel: t({
      en: 'Vue Logo',
      es: 'Logo Vue',
      fr: 'Logo Vue',
    }),

    yourQuestionsAnswered: t({
      en: 'Your questions, answered',
      es: 'Sus preguntas, respondidas',
      fr: 'Vos questions, réponddues',
    }),
  },
} satisfies Dictionary;

export default appContent;

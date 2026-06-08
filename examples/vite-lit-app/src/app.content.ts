import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: 'Vite + Lit',

    viteLogoLabel: t({
      en: 'Vite Logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    litLogoLabel: t({
      en: 'Lit Logo',
      fr: 'Logo Lit',
      es: 'Logo Lit',
    }),

    countIs: insert(
      t({
        en: 'count is {{count}}',
        fr: 'le compte est de {{count}}',
        es: 'el conteo es de {{count}}',
      })
    ),

    enumeration: insert(
      enu({
        '0': t({
          en: 'No items',
          fr: 'Aucun article',
          es: 'No hay artículos',
        }),
        '1': t({
          en: 'One item',
          fr: 'Un article',
          es: 'Un artículo',
        }),
        '>1': t({
          en: '{{count}} items',
          fr: '{{count}} articles',
          es: '{{count}} artículos',
        }),
      })
    ),

    htmlContent: html(
      t({
        en: '<div>Hello <b>World</b> from Lit! <br/>This is an <i>HTML</i> example with a <a href="https://intlayer.org">link</a>. <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Lit! <br/>Ceci est un exemple <i>HTML</i> avec un <a href="https://intlayer.org">lien</a>. <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Lit! <br/>Este es un ejemplo <i>HTML</i> con un <a href="https://intlayer.org">enlace</a>. <custom-component /></div>',
      })
    ),

    markdownContent: md(
      t({
        en: `
# Hello from Lit Markdown! 

This is **bold** and *italic*.

<custom-component name="Markdown Demo"></custom-component>
`,
        fr: `
# Bonjour de Lit Markdown! 

Ceci est en **gras** et en *italique*.

<custom-component name="Démo Markdown"></custom-component>
`,
        es: `
# ¡Hola de Lit Markdown! 

Esto es **negrita** e *itálica*.

<custom-component name="Demo Markdown"></custom-component>
`,
      })
    ),

    readTheDocs: t({
      en: 'Click on the Vite and Lit logos to learn more',
      fr: 'Cliquez sur les logos Vite et Lit pour en savoir plus',
      es: 'Haga clic en los logos de Vite y Lit para obtener más información',
    }),

    documentation: t({
      en: 'Documentation',
      fr: 'Documentation',
      es: 'Documentación',
    }),

    yourQuestionsAnswered: t({
      en: 'Your questions, answered',
      fr: 'Vos questions, répondues',
      es: 'Sus preguntas, respondidas',
    }),

    exploreVite: t({
      en: 'Explore Vite',
      fr: 'Explorer Vite',
      es: 'Explorar Vite',
    }),

    learnMore: t({
      en: 'Learn more',
      fr: 'En savoir plus',
      es: 'Saber más',
    }),

    connectWithUs: t({
      en: 'Connect with us',
      fr: 'Connectez-vous avec nous',
      es: 'Conéctese con nosotros',
    }),

    joinCommunity: t({
      en: 'Join the Lit community',
      fr: 'Rejoignez la communauté Lit',
      es: 'Únase a la comunidad Lit',
    }),
  },
} satisfies Dictionary;

export default appContent;

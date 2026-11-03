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
        en: '<div>Hello <b>World</b> from Lit! <br/>This is an <i>HTML</i> example with a <a href="https://intlayer.org">link</a>. <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Lit! <br/>Este es un ejemplo <i>HTML</i> con un <a href="https://intlayer.org">enlace</a>. <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Lit! <br/>Ceci est un exemple <i>HTML</i> avec un <a href="https://intlayer.org">lien</a>. <custom-component /></div>',
      })
    ),

    joinCommunity: t({
      en: 'Join the Lit community',
      es: 'Únase a la comunidad Lit',
      fr: 'Rejoignez la communauté Lit',
    }),
    learnMore: t({
      en: 'Learn more',
      es: 'Saber más',
      fr: 'En savoir plus',
    }),

    litLogoLabel: t({
      en: 'Lit Logo',
      es: 'Logo Lit',
      fr: 'Logo Lit',
    }),

    markdownContent: md(
      t({
        en: `
# Hello from Lit Markdown! 

This is **bold** and *italic*.

<custom-component name="Markdown Demo"></custom-component>
`,
        es: `
# ¡Hola de Lit Markdown! 

Esto es **negrita** e *itálica*.

<custom-component name="Demo Markdown"></custom-component>
`,
        fr: `
# Bonjour de Lit Markdown! 

Ceci est en **gras** et en *italique*.

<custom-component name="Démo Markdown"></custom-component>
`,
      })
    ),

    readTheDocs: t({
      en: 'Click on the Vite and Lit logos to learn more',
      es: 'Haga clic en los logos de Vite y Lit para obtener más información',
      fr: 'Cliquez sur les logos Vite et Lit pour en savoir plus',
    }),

    title: 'Vite + Lit',

    viteLogoLabel: t({
      en: 'Vite Logo',
      es: 'Logo Vite',
      fr: 'Logo Vite',
    }),
    yourQuestionsAnswered: t({
      en: 'Your questions, answered',
      es: 'Sus preguntas, respondidas',
      fr: 'Vos questions, répondues',
    }),
  },
} satisfies Dictionary;

export default appContent;

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
        en: '<div>Hello <b>World</b></div>',
        fr: '<div>Bonjour <b>Monde</b></div>',
        es: '<div>Hola <b>Mundo</b></div>',
      })
    ),

    editNote: md(
      t({
        en: 'Edit `src/my-element.ts` and save to test **HMR**',
        fr: 'Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**',
        es: 'Edite `src/my-element.ts` y guarde para probar **HMR**',
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

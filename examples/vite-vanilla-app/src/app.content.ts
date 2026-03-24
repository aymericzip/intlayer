import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: 'Vite + Vanilla',

    viteLogoLabel: t({
      en: 'Vite Logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    tsLogoLabel: t({
      en: 'TypeScript Logo',
      fr: 'Logo TypeScript',
      es: 'Logo TypeScript',
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
        en: 'Edit `src/main.ts` and save to test **HMR**',
        fr: 'Modifiez `src/main.ts` et enregistrez pour tester **HMR**',
        es: 'Edite `src/main.ts` y guarde para probar **HMR**',
      })
    ),

    readTheDocs: t({
      en: 'Click on the Vite and TypeScript logos to learn more',
      fr: 'Cliquez sur les logos Vite et TypeScript pour en savoir plus',
      es: 'Haga clic en los logos de Vite y TypeScript para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

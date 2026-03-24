import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent: Dictionary = {
  key: 'app',
  content: {
    viteAndSolid: 'Vite + Solid',
    viteLogoLabel: t({
      en: 'Vite Logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    solidLogoLabel: t({
      en: 'Solid Logo',
      fr: 'Logo Solid',
      es: 'Logo Solid',
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

    editSrcAppTsx: md(
      t({
        en: 'Edit `src/App.tsx` and save to test HMR',
        fr: 'Modifiez `src/App.tsx` and enregistrez pour tester HMR',
        es: 'Edite `src/App.tsx` y guarde para probar HMR',
      })
    ),

    readTheDocs: t({
      en: 'Click on the Vite and Solid logos to learn more',
      fr: 'Cliquez sur les logos Vite and Solid pour en savoir plus',
      es: 'Haga clic en los logos de Vite and Solid para obtener más información',
    }),
  },
};

export default appContent;

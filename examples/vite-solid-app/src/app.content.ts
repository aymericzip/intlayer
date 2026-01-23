import { type Dictionary, insert, md, t } from 'intlayer';

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

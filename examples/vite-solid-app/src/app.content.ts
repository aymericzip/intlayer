import { insert, md, t, type Dictionary } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    viteAndVue: 'Vite + Vue',
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
        en: 'count is {count}',
        fr: 'le compte est de {count}',
        es: 'el conteo es de {count}',
      })
    ),
    editSrcAppTsx: md(
      t({
        en: 'Edit `src/App.tsx` and save to test HMR',
        fr: 'Modifiez `src/App.tsx` et enregistrez pour tester HMR',
        es: 'Edite `src/App.tsx` y guarde para probar HMR',
      })
    ),
    readTheDocs: t({
      en: 'Click on the Vite and Solid logos to learn more',
      fr: 'Cliquez sur les logos Vite et Solid pour en savoir plus',
      es: 'Haga clic en los logos de Vite y Solid para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

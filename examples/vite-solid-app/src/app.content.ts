import { type Dictionary, insert, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: 'Vite + Solid',
    countIs: insert(
      t({
        en: 'Count is {{count}}',
        fr: 'Le compte est {{count}}',
        es: 'El recuento es {{count}}',
      })
    ),

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
    readTheDocs: t({
      en: 'Click on the Vite and Solid logos to learn more',
      fr: 'Cliquez sur les logos Vite and Solid pour en savoir plus',
      es: 'Haga clic en los logos de Vite and Solid para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

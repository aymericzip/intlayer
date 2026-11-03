import { type Dictionary, insert, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    countIs: insert(
      t({
        en: 'Count is {{count}}',
        es: 'El recuento es {{count}}',
        fr: 'Le compte est {{count}}',
      })
    ),

    readTheDocs: t({
      en: 'Click on the Vite and Solid logos to learn more',
      es: 'Haga clic en los logos de Vite and Solid para obtener más información',
      fr: 'Cliquez sur les logos Vite and Solid pour en savoir plus',
    }),
    solidLogoLabel: t({
      en: 'Solid Logo',
      es: 'Logo Solid',
      fr: 'Logo Solid',
    }),
    title: 'Vite + Solid',
    viteLogoLabel: t({
      en: 'Vite Logo',
      es: 'Logo Vite',
      fr: 'Logo Vite',
    }),
  },
} satisfies Dictionary;

export default appContent;

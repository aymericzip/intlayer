import { type Dictionary, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: 'Vite + React',

    viteLogoLabel: t({
      en: 'Vite logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    reactLogoLabel: t({
      en: 'React logo',
      fr: 'Logo React',
      es: 'Logo React',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and React logos to learn more',
      fr: 'Cliquez sur les logos Vite et React pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite y React para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

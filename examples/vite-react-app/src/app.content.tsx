import { type Dictionary, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    reactLogoLabel: t({
      en: 'React logo',
      es: 'Logo React',
      fr: 'Logo React',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and React logos to learn more',
      es: 'Haga clic en los logotipos de Vite y React para obtener más información',
      fr: 'Cliquez sur les logos Vite et React pour en savoir plus',
    }),
    title: 'Vite + React',

    viteLogoLabel: t({
      en: 'Vite logo',
      es: 'Logotipo de Vite',
      fr: 'Logo Vite',
    }),
  },
} satisfies Dictionary;

export default appContent;

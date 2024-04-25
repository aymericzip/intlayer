import { t, type ContentModule } from 'intlayer';

const pageContent: ContentModule = {
  id: 'app',

  viteLogo: t({
    en: 'Vite logo',
    fr: 'Logo Vite',
    es: 'Logo Vite',
  }),
  reactLogo: t({
    en: 'React logo',
    fr: 'Logo React',
    es: 'Logo React',
  }),

  title: 'Vite + React',

  count: t({
    en: 'count is ',
    fr: 'le compte est ',
    es: 'el recuento es ',
  }),

  // edit: t<ReactNode>({
  //   en: (
  //     <>
  //       Edit <code>src/App.tsx</code> and save to test HMR
  //     </>
  //   ),
  //   fr: (
  //     <>
  //       Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
  //     </>
  //   ),
  //   es: (
  //     <>
  //       Edita <code>src/App.tsx</code> y guarda para probar HMR
  //     </>
  //   ),
  // }),

  readTheDocs: t({
    en: 'Click on the Vite and React logos to learn more',
    fr: 'Cliquez sur les logos Vite et React pour en savoir plus',
    es: 'Haga clic en los logotipos de Vite y React para obtener más información',
  }),
};

export default pageContent;

import { t, type ContentModule } from 'intlayer';
import { ReactNode } from 'react';

const pageContent: ContentModule = {
  id: 'app',

  getStarted: t<ReactNode>({
    en: (
      <>
        Edit <code>src/App.tsx</code> and save to reload
      </>
    ),
    fr: (
      <>
        Éditez <code>src/App.tsx</code> et enregistrez pour recharger
      </>
    ),
    es: (
      <>
        Edita <code>src/App.tsx</code> y guarda para recargar
      </>
    ),
  }),
  reactLink: {
    href: 'https://reactjs.org',
    content: t({
      en: 'Learn React',
      fr: 'Apprendre React',
      es: 'Aprender React',
    }),
  },
};

export default pageContent;

import { t, type ContentModule } from 'intlayer';

const pageContent: ContentModule = {
  id: 'app',

  getStarted: t({
    en: (
      <>
        Edit <code>src/App.tsx</code> and save to reload
      </>
    ),
    fr: (
      <>
        Commencez par éditer <code>src/App.tsx</code>
      </>
    ),
    es: (
      <>
        Comience por editar <code>src/App.tsx</code>
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

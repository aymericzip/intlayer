import { type Dictionary, t } from 'intlayer';
import type { ReactNode } from 'react';

const appContent = {
  key: 'app',
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
    }),
    reactLink: {
      content: t({
        en: 'Learn React',
        es: 'Aprender React',
        fr: 'Apprendre React',
      }),
      href: 'https://reactjs.org',
    },
  },
} satisfies Dictionary;

export default appContent;

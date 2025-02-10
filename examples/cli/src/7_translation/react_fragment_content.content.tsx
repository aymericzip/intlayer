import { t, type Dictionary } from 'intlayer';

import type { JSX } from 'react';

const customContent: DeclarationContent = {
  key: 'react_fragment_content',
  content: {
    profileText: t<JSX.Element>({
      en: (
        <>
          <h1>Title of the page</h1>
          <code>test</code>
        </>
      ),
      fr: (
        <>
          <h1>Titre de la page</h1>
          <code>test</code>
        </>
      ),
      es: (
        <>
          <h1>Título de la página</h1>
          <code>test</code>
        </>
      ),
    }),
  },
};

export default customContent;

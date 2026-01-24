import { type Dictionary, file, gender, html, insert, md, t } from 'intlayer';
import type { ReactNode } from 'react';

const markdownWithMetadata = `---
title: My Title
---
## Hello World`;

const appContent = {
  key: 'app',
  importMode: 'live',
  content: {
    markdown: md(`---
title: Example with Front Matter
description: This demonstrates front matter, lists, formatting, and an MDX component.
---
# Title level 1

## Title level 2

**This is bold text**

*This is italic text*

Here is a list:
- Item one
- Item two
- Item three

<ComponentDemo prop="Hello from MDX!" />
`),
    markdown2: '## Hello world',
    markdown3: md(markdownWithMetadata),
    markdown4: markdownWithMetadata,

    file: md(file('./test.md')),

    test: gender({
      male: 'male',
      female: 'female',
      fallback: 'fallback',
    }),

    html: html(
      t({
        en: '<div>Hello <b>World</b><custom-component /><CustomComponent /> <CustomComponent2 myProp="my value" myprop2="my value 2" my-Prop-3:"3"> Hello </CustomComponent2></div>',
        fr: '<div>Bonjour <b>Monde</b><custom-component /><CustomComponent /> <CustomComponent2 myProp="my value" myprop2="my value 2" my-Prop-3:"3"> Hello </CustomComponent2></div>',
        es: '<div>Hola <b>Mundo</b><custom-component /><CustomComponent /> <CustomComponent2 myProp="my value" myprop2="my value 2" my-Prop-3:"3"> Hello </CustomComponent2></div>',
      })
    ),

    insertion: insert(
      t({
        en: 'test en {{ count }}',
        fr: 'test fr {{ count }}',
        es: 'test es {{ count }}',
      })
    ),
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

    edit: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: 'Click on the Vite and React logos to learn more',
      fr: 'Cliquez sur les logos Vite et React pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite y React para obtener más información',
    }),
  },
  id: '696bd486200a5ac2eabb8d26',
} satisfies Dictionary;

export default appContent;

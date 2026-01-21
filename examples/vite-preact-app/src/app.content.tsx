import { type Dictionary, html, insert, md, t } from 'intlayer';
import type { ComponentChildren } from 'preact';

const appContent = {
  key: 'app',
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
    html: html(
      '<div>Hello <b>World</b><custom-component /><CustomComponent /> <CustomComponent2> Hello </CustomComponent2></div>'
    ),
    insertion: insert('test {{ count }}'),
    viteLogo: t({
      en: 'Vite logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    preactLogo: t({
      en: 'Preact logo',
      fr: 'Logo Preact',
      es: 'Logo Preact',
    }),

    title: 'Vite + Preact',

    count: t({
      en: 'count is ',
      fr: 'le compte est ',
      es: 'el recuento es ',
    }),

    edit: t<ComponentChildren>({
      en: md('Edit `src/app.tsx` and save to test HMR'),
      fr: md('Éditez `src/app.tsx` et enregistrez pour tester HMR'),
      es: md('Edita `src/app.tsx` y guarda para probar HMR'),
    }),

    readTheDocs: t({
      en: 'Click on the Vite and Preact logos to learn more',
      fr: 'Cliquez sur les logos Vite et Preact pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite y Preact para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

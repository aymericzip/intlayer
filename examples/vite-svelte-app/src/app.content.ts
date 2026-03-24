import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

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

    enumeration: insert(
      enu({
        '0': t({
          en: 'No items',
          fr: 'Aucun article',
          es: 'No hay artículos',
        }),
        '1': t({
          en: 'One item',
          fr: 'Un article',
          es: 'Un artículo',
        }),
        '>1': t({
          en: '{{count}} items',
          fr: '{{count}} articles',
          es: '{{count}} artículos',
        }),
      })
    ),

    insertion: insert(
      t({
        en: 'test en {{ count }}',
        fr: 'test fr {{ count }}',
        es: 'test es {{ count }}',
      })
    ),

    title: 'Vite + Svelte',
    viteLogoAlt: t({
      en: 'Vite Logo',
      fr: 'Logo Vite',
      es: 'Logo de Vite',
    }),
    svelteLogoAlt: t({
      en: 'Svelte Logo',
      fr: 'Logo Svelte',
      es: 'Logo de Svelte',
    }),

    checkOut: [
      t({
        en: 'Check out ',
        fr: 'Découvrez ',
        es: 'Compruebe ',
      }),
      'SvelteKit',
      t({
        en: 'the official Svelte app framework powered by Vite!',
        fr: "le framework officiel d'applications Svelte propulsé par Vite !",
        es: 'el marco oficial de aplicaciones Svelte impulsado por Vite!',
      }),
    ],
    readTheDocs: t({
      en: 'Click on the Vite and Svelte logos to learn more',
      fr: 'Cliquez sur les logos Vite et Svelte pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite y Svelte para obtener más información',
    }),

    markdownContent: md(
      '---\ntitle: test\n\n---\n\n## My title 2 \n\nLorem Ipsum k'
    ),
  },
} satisfies Dictionary;

export default appContent;

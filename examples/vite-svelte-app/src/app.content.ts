import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    countIs: insert(
      t({
        en: 'Count is {{count}}',
        es: 'El recuento es {{count}}',
        fr: 'Le compte est {{count}}',
      })
    ),
    enumeration: insert(
      enu({
        '0': t({
          en: 'No items',
          es: 'No hay artículos',
          fr: 'Aucun article',
        }),
        '1': t({
          en: 'One item',
          es: 'Un artículo',
          fr: 'Un article',
        }),
        '>1': t({
          en: '{{count}} items',
          es: '{{count}} artículos',
          fr: '{{count}} articles',
        }),
      })
    ),
    htmlContent: html(
      t({
        en: '<div>Hello <b>World</b> from Svelte! <br/> <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Svelte! <br/> <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Svelte! <br/> <custom-component /></div>',
      })
    ),
    markdownContent: md(
      t({
        en: '# Hello from Svelte Markdown! \n\nThis is **bold** and *italic*. \n\n<ComponentDemo />',
        es: '# ¡Hola de Svelte Markdown! \n\nEsto es **negrita** e *itálica*. \n\n<ComponentDemo />',
        fr: '# Bonjour de Svelte Markdown! \n\nCeci est en **gras** et en *italique*. \n\n<ComponentDemo />',
      })
    ),
    readTheDocs: t({
      en: 'Click on the Vite and Svelte logos to learn more',
      es: 'Haga clic en los logotipos de Vite and Svelte para obtener más información',
      fr: 'Cliquez sur les logos Vite and Svelte pour en savoir plus',
    }),
    svelteLogoLabel: t({
      en: 'Svelte logo',
      es: 'Logo Svelte',
      fr: 'Logo Svelte',
    }),
    title: 'Vite + Svelte',
    viteLogoLabel: t({
      en: 'Vite logo',
      es: 'Logo Vite',
      fr: 'Logo Vite',
    }),
  },
} satisfies Dictionary;

export default appContent;

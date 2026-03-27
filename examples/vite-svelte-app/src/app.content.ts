import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: 'Vite + Svelte',
    countIs: insert(
      t({
        en: 'Count is {{count}}',
        fr: 'Le compte est {{count}}',
        es: 'El recuento es {{count}}',
      })
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
    htmlContent: html(
      t({
        en: '<div>Hello <b>World</b> from Svelte! <br/> <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Svelte! <br/> <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Svelte! <br/> <custom-component /></div>',
      })
    ),
    markdownContent: md(
      t({
        en: '# Hello from Svelte Markdown! \n\nThis is **bold** and *italic*. \n\n<ComponentDemo />',
        fr: '# Bonjour de Svelte Markdown! \n\nCeci est en **gras** et en *italique*. \n\n<ComponentDemo />',
        es: '# ¡Hola de Svelte Markdown! \n\nEsto es **negrita** e *itálica*. \n\n<ComponentDemo />',
      })
    ),
    viteLogoLabel: t({
      en: 'Vite logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    svelteLogoLabel: t({
      en: 'Svelte logo',
      fr: 'Logo Svelte',
      es: 'Logo Svelte',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and Svelte logos to learn more',
      fr: 'Cliquez sur les logos Vite and Svelte pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite and Svelte para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

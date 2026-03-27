import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: 'Vite + Preact',
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
        en: '<div>Hello <b>World</b> from Preact! <br/> <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Preact! <br/> <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Preact! <br/> <custom-component /></div>',
      })
    ),
    markdownContent: md(
      t({
        en: '# Hello from Preact Markdown! \n\nThis is **bold** and *italic*. \n\n<ComponentDemo />',
        fr: '# Bonjour de Preact Markdown! \n\nCeci est en **gras** et en *italique*. \n\n<ComponentDemo />',
        es: '# ¡Hola de Preact Markdown! \n\nEsto es **negrita** e *itálica*. \n\n<ComponentDemo />',
      })
    ),
    viteLogoLabel: t({
      en: 'Vite logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    preactLogoLabel: t({
      en: 'Preact logo',
      fr: 'Logo Preact',
      es: 'Logo Preact',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and Preact logos to learn more',
      fr: 'Cliquez sur les logos Vite et Preact pour en savoir plus',
      es: 'Haga clic en los logotipos de Vite and Preact para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

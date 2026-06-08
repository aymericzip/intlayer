import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    title: 'Vite + Vanilla',
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
        en: '<div>Hello <b>World</b> from Vanilla! <br/> <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Vanilla! <br/> <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Vanilla! <br/> <custom-component /></div>',
      })
    ),
    markdownContent: md(
      t({
        en: '# Hello from Vanilla Markdown! \n\nThis is **bold** and *italic*.',
        fr: '# Bonjour de Vanilla Markdown! \n\nCeci est en **gras** et en *italique*.',
        es: '# ¡Hola de Vanilla Markdown! \n\nEsto es **negrita** e *itálica*.',
      })
    ),
    viteLogoLabel: t({
      en: 'Vite Logo',
      fr: 'Logo Vite',
      es: 'Logo Vite',
    }),
    tsLogoLabel: t({
      en: 'TypeScript Logo',
      fr: 'Logo TypeScript',
      es: 'Logo TypeScript',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and TypeScript logos to learn more',
      fr: 'Cliquez sur les logos Vite et TypeScript pour en savoir plus',
      es: 'Haga clic en los logos de Vite y TypeScript para obtener más información',
    }),
  },
} satisfies Dictionary;

export default appContent;

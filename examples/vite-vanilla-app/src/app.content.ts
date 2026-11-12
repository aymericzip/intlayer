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
        en: '<div>Hello <b>World</b> from Vanilla! <br/> <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Vanilla! <br/> <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Vanilla! <br/> <custom-component /></div>',
      })
    ),
    markdownContent: md(
      t({
        en: '# Hello from Vanilla Markdown! \n\nThis is **bold** and *italic*.',
        es: '# ¡Hola de Vanilla Markdown! \n\nEsto es **negrita** e *itálica*.',
        fr: '# Bonjour de Vanilla Markdown! \n\nCeci est en **gras** et en *italique*.',
      })
    ),
    readTheDocs: t({
      en: 'Click on the Vite and TypeScript logos to learn more',
      es: 'Haga clic en los logos de Vite y TypeScript para obtener más información',
      fr: 'Cliquez sur les logos Vite et TypeScript pour en savoir plus',
    }),
    title: 'Vite + Vanilla',
    tsLogoLabel: t({
      en: 'TypeScript Logo',
      es: 'Logo TypeScript',
      fr: 'Logo TypeScript',
    }),
    viteLogoLabel: t({
      en: 'Vite Logo',
      es: 'Logo Vite',
      fr: 'Logo Vite',
    }),
  },
} satisfies Dictionary;

export default appContent;

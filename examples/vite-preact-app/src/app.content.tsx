import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const appContent = {
  key: 'app',

  content: {
    countIs: insert(
      t({
        en: 'Count is {{count}}',
        es: 'Contador: {{count}}',
        fr: 'Le nombre est {{count}}',
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
        en: '<div>Hello <b>World</b> from Preact! <br/> <custom-component /></div>',
        es: '<div>Hola <b>Mundo</b> desde Preact! <br/> <custom-component /></div>',
        fr: '<div>Bonjour <b>Monde</b> de Preact! <br/> <custom-component /></div>',
      })
    ),
    markdownContent: md(
      t({
        en: '# Hello from Preact Markdown! \n\nThis is **bold** and *italic*. \n\n<ComponentDemo />',
        es: '# ¡Hola de Preact Markdown! \n\nEsto es **negrita** e *itálica*. \n\n<ComponentDemo />',
        fr: '# Bonjour de Preact Markdown! \n\nCeci est en **gras** et en *italique*. \n\n<ComponentDemo />',
      })
    ),
    preactLogoLabel: t({
      en: 'Preact logo',
      es: 'Logo Preact',
      fr: 'Logo Preact',
    }),
    readTheDocs: t({
      en: 'Click on the Vite and Preact logos to learn more',
      es: 'Haga clic en los logotipos de Vite and Preact para obtener más información',
      fr: 'Cliquez sur les logos Vite et Preact pour en savoir plus',
    }),
    title: 'Vite + Preact',
    viteLogoLabel: t({
      en: 'Vite logo',
      es: 'Logo Vite',
      fr: 'Logo Vite',
    }),
  },

  title: 'App (Vite + Preact)',
  description:
    'Content for the app demo using Vite + Preact. Includes localized title, count insertions and enumeration templates, HTML and Markdown content, logo labels, and a link prompt to documentation.',
  tags: ['app', 'vite', 'preact', 'demo', 'content'],
} satisfies Dictionary;

export default appContent;

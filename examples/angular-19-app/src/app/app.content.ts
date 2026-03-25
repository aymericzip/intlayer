import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const content = {
  key: 'app',
  content: {
    title: t({
      en: 'Welcome to Angular',
      fr: 'Bienvenue sur Angular',
      es: 'Bienvenido a Angular',
    }),
    subtitle: t({
      en: 'This is a sample app',
      fr: 'Ceci est une application exemple',
      es: 'Esta es una aplicación de muestra',
    }),
    markdownContent: md(
      t({
        en: '### Markdown Test\n\nThis is **bold** and this is *italic*.',
        fr: '### Test Markdown\n\nCeci est en **gras** et cela en *italique*.',
        es: '### Prueba de Markdown\n\nEsto está en **negrita** et esto en *cursiva*.',
      })
    ),
    htmlContent: html(
      t({
        en: '<strong>HTML</strong> test with <em>style</em>',
        fr: 'Test <strong>HTML</strong> avec du <em>style</em>',
        es: 'Prueba de <strong>HTML</strong> con <em>estilo</em>',
      })
    ),
    enumeration: enu({
      '0': 'No items',
      '1': 'One item',
      '>1': 'Many items',
    }),
    insertion: insert('{{count}} items'),
  },
} satisfies Dictionary;

export default content;

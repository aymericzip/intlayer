import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const content = {
  key: 'app',
  content: {
    enumeration: enu({
      '0': 'No items',
      '1': 'One item',
      '>1': 'Many items',
    }),
    htmlContent: html(
      t({
        en: '<strong>HTML</strong> test with <em>style</em>',
        es: 'Prueba de <strong>HTML</strong> con <em>estilo</em>',
        fr: 'Test <strong>HTML</strong> avec du <em>style</em>',
      })
    ),
    insertion: insert('{{count}} items'),
    markdownContent: md(
      t({
        en: '### Markdown Test\n\nThis is **bold** and this is *italic*.',
        es: '### Prueba de Markdown\n\nEsto está en **negrita** et esto en *cursiva*.',
        fr: '### Test Markdown\n\nCeci est en **gras** et cela en *italique*.',
      })
    ),
    subtitle: t({
      en: 'This is a sample app',
      es: 'Esta es una aplicación de muestra',
      fr: 'Ceci est une application exemple',
    }),
    title: t({
      en: 'Welcome to Angular',
      es: 'Bienvenido a Angular',
      fr: 'Bienvenue sur Angular',
    }),
  },
} satisfies Dictionary;

export default content;

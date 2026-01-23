import { type Dictionary, enu, html, insert, md, t } from 'intlayer';

const testContent = {
  key: 'test',
  content: {
    title: t({
      en: 'Intlayer Node Tests',
      fr: 'Tests des nœuds Intlayer',
      es: 'Pruebas de nodos de Intlayer',
    }),
    htmlTest: html(
      t({
        en: '<strong>HTML</strong> test with <em>style</em>',
        fr: 'Test <strong>HTML</strong> avec du <em>style</em>',
        es: 'Prueba de <strong>HTML</strong> con <em>estilo</em>',
      })
    ),
    markdownTest: md(
      t({
        en: '### Markdown Test\n\nThis is **bold** and this is *italic*.',
        fr: '### Test Markdown\n\nCeci est en **gras** et cela en *italique*.',
        es: '### Prueba de Markdown\n\nEsto está en **negrita** et esto en *cursiva*.',
      })
    ),
    enumerationTest: enu({
      '0': 'No items',
      '1': 'One item',
      '>1': insert('{{count}} items'),
    }),
  },
} satisfies Dictionary;

export default testContent;

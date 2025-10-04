import { type Dictionary, t } from 'intlayer';

const markdownSectionContent = {
  key: 'markdown-section',
  title: 'Markdown',
  content: {
    markdown: t({
      en: '# My Heading\n\nThis is some sample text. Here’s **bold text** and here’s *italic text*.\n\n- First item\n- Second item\n\nYou can also include a [link to something](https://example.com).  \n',
      'en-GB':
        '# My Heading\n\nThis is some sample text. Here’s **bold text** and here’s *italic text*.\n\n- First item\n- Second item\n\nYou can also include a [link to something](https://example.com).  \n',
      fr: '# Mon titre\n\nVous pouvez inclure du texte en **gras** et du texte en *italique*.\n\n- Premier élément\n- Deuxième élément\n\nVous pouvez également inclure un [lien vers quelque chose](https://example.com).  \n',
      es: '# Mi Encabezado\n\nPuedes incluir texto en **negrita** y texto en *cursiva*.\n\n- Primer elemento\n- Segundo elemento\n\nTambién puedes incluir un [enlace a algo](https://example.com).  \n',
      de: '# Mein Überschrift\n\nDu kannst Text in **fett** und Text in *kursiv* einfügen.\n\n- Erstes Element\n- Zweites Element\n\nDu kannst auch einen [Link zu etwas](https://example.com) einfügen.  \n',
      it: '# Il Mio Titolo\n\nPuoi includere testo in **grassetto** e testo in *corsivo*.\n\n- Primo elemento\n- Secondo elemento\n\nPuoi anche includere un [link a qualcosa](https://example.com).  \n',
      pt: '# Meu Título\n\nVocê pode incluir texto em **negrito** e texto em *itálico*.\n\n- Primeiro item\n- Segundo item\n\nVocê também pode incluir um [link para algo](https://example.com).  \n',
      ru: '# Мой Заголовок\n\nВы можете включить текст в **жирный** и текст в *курсив*.\n\n- Первый элемент\n- Второй элемент\n\nВы также можете включить ссылку на что-то [ссылка](https://example.com).  \n',
      zh: '# 我的标题\n\n您可以在 **粗体** 和 *斜体* 中包含文本。\n\n- 第一项\n- 第二项\n\n您还可以包含一个 [链接到某事](https://example.com)。  \n',
      ja: '# 私のタイトル\n\n**ボールド** と *イタリック* でテキストを含めることができます。\n\n- 最初の項目\n- 2番目の項目\n\nリンクを含めることもできます [ここにリンク](https://example.com)。  \n',
      ar: '# عنواني\n\nيمكنك تضمين النص بشكل **غامق** والنص بشكل *مائل*.\n\n- العنصر الأول\n- العنصر الثاني\n\nيمكنك أيضا تضمين رابط إلى شيء [هنا](https://example.com).  \n',
      hi: '# मेरा शीर्षक\n\nआप **गाढ़े अक्षरों** और *तिरछे अक्षरों* में पाठ शामिल कर सकते हैं।\n\n- पहला आइटम\n- दूसरा आइटम\n\nआप एक [लिंक जोड़ सकते हैं](https://example.com)।  \n',
      ko: '# 내 제목\n\n텍스트를 **굵게** 및 *기울임꼴*로 포함할 수 있습니다.\n\n- 첫 번째 항목\n- 두 번째 항목\n\n또한 [링크를 포함할 수 있습니다](https://example.com)。  \n',
      tr: '# Başlığım\n\nMetni **kalın** ve *italik* olarak dahil edebilirsiniz.\n\n- İlk madde\n- İkinci madde\n\nAyrıca bir [şeye bağlantı ekleyebilirsiniz](https://example.com).  \n',
    }),
    ariaLabel: t({
      en: 'Markdown editor',
      'en-GB': 'Markdown editor',
      fr: 'Éditeur Markdown',
      es: 'Editor Markdown',
      de: 'Markdown-Editor',
      it: 'Editor Markdown',
      pt: 'Editor Markdown',
      ru: 'Редактор Markdown',
      zh: 'Markdown 编辑器',
      ja: 'Markdown エディター',
      ar: 'محرر Markdown',
      hi: 'मैस्को एडिटर',
      ko: '마크다운 편집기',
      tr: 'Markdown düzenleyici',
    }),
  },
} satisfies Dictionary;

export default markdownSectionContent;

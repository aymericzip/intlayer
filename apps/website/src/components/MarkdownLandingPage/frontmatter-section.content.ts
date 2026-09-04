import { type Dictionary, t } from 'intlayer';

const frontmatterSectionContent = {
  key: 'frontmatter-section-markdown',
  title: 'Markdown Landing Frontmatter Section',
  description:
    'Frontmatter section of the Markdown landing page: metadata is parsed and exposed as a typed object on the node, and the same engine also parses HTML content.',
  content: {
    title: t({
      en: 'Typed frontmatter, no content layer',
      'en-GB': 'Typed frontmatter, no content layer',
      fr: 'Frontmatter typé, sans couche de contenu',
      es: 'Frontmatter tipado, sin capa de contenido',
      de: 'Typisiertes Frontmatter, ohne Content-Schicht',
      ru: 'Типизированный frontmatter без слоя контента',
      ja: '型付きフロントマター、コンテンツレイヤー不要',
      ko: '타입이 지정된 프론트매터, 콘텐츠 레이어 불필요',
      zh: '带类型的 frontmatter，无需内容层',
      ar: 'frontmatter مُنمَّط بلا طبقة محتوى',
      it: 'Frontmatter tipizzato, senza content layer',
      pt: 'Frontmatter tipado, sem camada de conteúdo',
      hi: 'टाइप्ड frontmatter, कोई कंटेंट लेयर नहीं',
      tr: 'Tipli frontmatter, içerik katmanı yok',
      pl: 'Typowany frontmatter, bez warstwy treści',
      id: 'Frontmatter bertipe, tanpa content layer',
      vi: 'Frontmatter có kiểu, không cần content layer',
      uk: 'Типізований frontmatter без шару контенту',
    }),
    description: t({
      en: 'The frontmatter of a Markdown file is parsed with the document and exposed on the node as a typed metadata object. The editorial fields you used to reach for a content layer for are simply there, autocompleted.',
      'en-GB':
        'The frontmatter of a Markdown file is parsed with the document and exposed on the node as a typed metadata object. The editorial fields you used to reach for a content layer for are simply there, autocompleted.',
      fr: "Le frontmatter d'un fichier Markdown est analysé avec le document et exposé sur le nœud sous forme d'objet de métadonnées typé. Les champs éditoriaux pour lesquels vous installiez une couche de contenu sont simplement là, autocomplétés.",
      es: 'El frontmatter de un archivo Markdown se analiza junto con el documento y se expone en el nodo como un objeto de metadatos tipado. Los campos editoriales por los que instalabas una capa de contenido están ahí sin más, con autocompletado.',
      de: 'Das Frontmatter einer Markdown-Datei wird zusammen mit dem Dokument geparst und am Node als typisiertes Metadaten-Objekt bereitgestellt. Die redaktionellen Felder, für die Sie sonst eine Content-Schicht installiert haben, sind einfach da — mit Autovervollständigung.',
      ru: 'Frontmatter файла Markdown разбирается вместе с документом и доступен на узле как типизированный объект метаданных. Редакционные поля, ради которых вы ставили слой контента, просто есть — с автодополнением.',
      ja: 'Markdownファイルのフロントマターは本文とともに解析され、型付きのメタデータオブジェクトとしてノードに公開されます。コンテンツレイヤーを入れてまで欲しかった編集用フィールドが、補完付きでそのまま使えます。',
      ko: 'Markdown 파일의 프론트매터는 문서와 함께 파싱되어 노드에 타입이 지정된 메타데이터 객체로 노출됩니다. 콘텐츠 레이어까지 도입하던 편집용 필드가 자동완성과 함께 그냥 존재합니다.',
      zh: 'Markdown 文件的 frontmatter 会与正文一起被解析，并以带类型的元数据对象暴露在节点上。你以前要靠内容层才能拿到的编辑字段，现在直接就在那里，还有自动补全。',
      ar: 'يُحلَّل frontmatter لملف Markdown مع المستند ويُتاح على العقدة ككائن بيانات وصفية مُنمَّط. فالحقول التحريرية التي كنت تضيف طبقة محتوى من أجلها صارت متاحة مباشرةً مع الإكمال التلقائي.',
      it: 'Il frontmatter di un file Markdown viene analizzato insieme al documento ed esposto sul nodo come oggetto di metadati tipizzato. I campi editoriali per cui installavi un content layer sono semplicemente lì, con autocompletamento.',
      pt: 'O frontmatter de um arquivo Markdown é analisado junto com o documento e exposto no nó como um objeto de metadados tipado. Os campos editoriais pelos quais você instalava uma camada de conteúdo estão simplesmente lá, com autocompletar.',
      hi: 'Markdown फ़ाइल का frontmatter दस्तावेज़ के साथ ही पार्स होता है और नोड पर टाइप्ड मेटाडेटा ऑब्जेक्ट के रूप में उपलब्ध रहता है। जिन संपादकीय फ़ील्ड के लिए आप कंटेंट लेयर लगाते थे, वे ऑटोकम्प्लीट के साथ वहीं मौजूद हैं।',
      tr: 'Bir Markdown dosyasının frontmatter’ı belgeyle birlikte ayrıştırılır ve düğümde tipli bir meta veri nesnesi olarak sunulur. Uğruna içerik katmanı kurduğunuz editoryal alanlar, otomatik tamamlamayla birlikte orada duruyor.',
      pl: 'Frontmatter pliku Markdown jest parsowany razem z dokumentem i udostępniany na węźle jako typowany obiekt metadanych. Pola redakcyjne, dla których instalowałeś warstwę treści, są po prostu tam — z podpowiedziami.',
      id: 'Frontmatter berkas Markdown diurai bersama dokumennya dan tersedia pada node sebagai objek metadata bertipe. Bidang editorial yang dulu menuntut content layer kini ada begitu saja, lengkap dengan autocomplete.',
      vi: 'Frontmatter của tệp Markdown được phân tích cùng tài liệu và hiển thị trên node dưới dạng đối tượng siêu dữ liệu có kiểu. Những trường biên tập mà trước đây bạn phải cài content layer nay có sẵn, kèm gợi ý tự động.',
      uk: 'Frontmatter файлу Markdown розбирається разом із документом і доступний на вузлі як типізований об’єкт метаданих. Редакційні поля, заради яких ви ставили шар контенту, просто є — з автодоповненням.',
    }),
    markdownCodeBlockTitle: 'article.en.content.md',
    markdownCode: `---
key: article
locale: en
title: Shipping i18n Markdown
author: aymericzip
---

# Shipping i18n Markdown

Here an example of markdown content.`,
    usageCodeBlockTitle: 'Article.tsx',
    usageCode: `const { body } = useIntlayer('article');

body.metadata.title; // 'Shipping i18n Markdown'
body.metadata.author; // 'aymericzip'
body.value; // the raw Markdown string`,
    html: {
      title: t({
        en: 'The same engine also parses HTML',
        'en-GB': 'The same engine also parses HTML',
        fr: 'Le même moteur analyse aussi le HTML',
        es: 'El mismo motor también analiza HTML',
        de: 'Dieselbe Engine parst auch HTML',
        ru: 'Тот же движок разбирает и HTML',
        ja: '同じエンジンがHTMLも解析',
        ko: '같은 엔진이 HTML도 파싱합니다',
        zh: '同一个引擎也能解析 HTML',
        ar: 'المحرك نفسه يحلل HTML أيضاً',
        it: 'Lo stesso motore analizza anche l’HTML',
        pt: 'O mesmo motor também analisa HTML',
        hi: 'वही इंजन HTML भी पार्स करता है',
        tr: 'Aynı motor HTML’i de ayrıştırır',
        pl: 'Ten sam silnik parsuje też HTML',
        id: 'Mesin yang sama juga mengurai HTML',
        vi: 'Cùng bộ máy đó cũng phân tích HTML',
        uk: 'Той самий рушій розбирає й HTML',
      }),
      description: t({
        en: 'html() nodes go through the same pipeline: tags are mapped to your own components, with the same typing and the same override rules.',
        'en-GB':
          'html() nodes go through the same pipeline: tags are mapped to your own components, with the same typing and the same override rules.',
        fr: 'Les nœuds html() suivent le même pipeline : les balises sont associées à vos propres composants, avec le même typage et les mêmes règles de surcharge.',
        es: 'Los nodos html() pasan por el mismo pipeline: las etiquetas se asignan a tus propios componentes, con el mismo tipado y las mismas reglas de sobrescritura.',
        de: 'html()-Nodes durchlaufen dieselbe Pipeline: Tags werden auf Ihre eigenen Komponenten abgebildet, mit derselben Typisierung und denselben Override-Regeln.',
        ru: 'Узлы html() проходят тот же конвейер: теги сопоставляются с вашими компонентами, с той же типизацией и теми же правилами переопределения.',
        ja: 'html()ノードも同じパイプラインを通ります。タグは自分のコンポーネントに対応づけられ、型付けもオーバーライド規則も同じです。',
        ko: 'html() 노드도 같은 파이프라인을 지납니다. 태그는 여러분의 컴포넌트로 매핑되며, 타이핑과 오버라이드 규칙도 동일합니다.',
        zh: 'html() 节点走的是同一条流水线：标签被映射到你自己的组件，类型与覆盖规则完全一致。',
        ar: 'تمر عقد html() بالمسار نفسه: تُربَط الوسوم بمكوّناتك الخاصة، بالتنميط نفسه وقواعد التجاوز نفسها.',
        it: 'I nodi html() attraversano la stessa pipeline: i tag vengono mappati sui tuoi componenti, con la stessa tipizzazione e le stesse regole di override.',
        pt: 'Os nós html() passam pelo mesmo pipeline: as tags são mapeadas para os seus componentes, com a mesma tipagem e as mesmas regras de sobrescrita.',
        hi: 'html() नोड उसी पाइपलाइन से गुज़रते हैं: टैग आपके अपने कंपोनेंट से मैप होते हैं, वही टाइपिंग और वही ओवरराइड नियम।',
        tr: 'html() düğümleri de aynı hattan geçer: etiketler kendi bileşenlerinize eşlenir, aynı tipleme ve aynı geçersiz kılma kurallarıyla.',
        pl: 'Węzły html() przechodzą tym samym potokiem: znaczniki są mapowane na Twoje komponenty, z tym samym typowaniem i tymi samymi regułami nadpisań.',
        id: 'Node html() melewati pipeline yang sama: tag dipetakan ke komponen Anda sendiri, dengan pengetikan dan aturan override yang sama.',
        vi: 'Các node html() đi qua cùng một pipeline: thẻ được ánh xạ tới thành phần của bạn, với cùng kiểu dữ liệu và cùng quy tắc ghi đè.',
        uk: 'Вузли html() проходять той самий конвеєр: теги зіставляються з вашими компонентами, з тією ж типізацією та тими ж правилами перевизначення.',
      }),
      cta: t({
        en: 'See HTML content',
        'en-GB': 'See HTML content',
        fr: 'Voir le contenu HTML',
        es: 'Ver contenido HTML',
        de: 'HTML-Inhalt ansehen',
        ru: 'Посмотреть HTML-контент',
        ja: 'HTMLコンテンツを見る',
        ko: 'HTML 콘텐츠 보기',
        zh: '查看 HTML 内容',
        ar: 'اطّلع على محتوى HTML',
        it: 'Vedi il contenuto HTML',
        pt: 'Ver conteúdo HTML',
        hi: 'HTML कंटेंट देखें',
        tr: 'HTML içeriğine bakın',
        pl: 'Zobacz treść HTML',
        id: 'Lihat konten HTML',
        vi: 'Xem nội dung HTML',
        uk: 'Переглянути HTML-контент',
      }),
    },
  },
} satisfies Dictionary;

export default frontmatterSectionContent;

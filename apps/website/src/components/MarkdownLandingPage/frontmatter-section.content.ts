import { type Dictionary, t } from 'intlayer';

const frontmatterSectionContent = {
  key: 'frontmatter-section-markdown',
  title: 'Markdown Landing Frontmatter Section',
  description:
    'Frontmatter section of the Markdown landing page: metadata is parsed and exposed as a typed object on the node, and the same engine also parses HTML content.',
  content: {
    description: t({
      en: 'The frontmatter of a Markdown file is parsed with the document and exposed on the node as a typed metadata object. The editorial fields you used to reach for a content layer for are simply there, autocompleted.',
      ar: 'يُحلَّل frontmatter لملف Markdown مع المستند ويُتاح على العقدة ككائن بيانات وصفية مُنمَّط. فالحقول التحريرية التي كنت تضيف طبقة محتوى من أجلها صارت متاحة مباشرةً مع الإكمال التلقائي.',
      de: 'Das Frontmatter einer Markdown-Datei wird zusammen mit dem Dokument geparst und am Node als typisiertes Metadaten-Objekt bereitgestellt. Die redaktionellen Felder, für die Sie sonst eine Content-Schicht installiert haben, sind einfach da — mit Autovervollständigung.',
      'en-GB':
        'The frontmatter of a Markdown file is parsed with the document and exposed on the node as a typed metadata object. The editorial fields you used to reach for a content layer for are simply there, autocompleted.',
      es: 'El frontmatter de un archivo Markdown se analiza junto con el documento y se expone en el nodo como un objeto de metadatos tipado. Los campos editoriales por los que instalabas una capa de contenido están ahí sin más, con autocompletado.',
      fr: "Le frontmatter d'un fichier Markdown est analysé avec le document et exposé sur le nœud sous forme d'objet de métadonnées typé. Les champs éditoriaux pour lesquels vous installiez une couche de contenu sont simplement là, autocomplétés.",
      'he-IL':
        'ה-frontmatter של קובץ Markdown מנותח יחד עם המסמך ונחשף על הצומת כאובייקט מטא-נתונים עם טיפוסים. שדות העריכה שבשבילם נהגתם להשתמש בשכבת תוכן פשוט נמצאים שם, עם השלמה אוטומטית.',
      hi: 'Markdown फ़ाइल का frontmatter दस्तावेज़ के साथ ही पार्स होता है और नोड पर टाइप्ड मेटाडेटा ऑब्जेक्ट के रूप में उपलब्ध रहता है। जिन संपादकीय फ़ील्ड के लिए आप कंटेंट लेयर लगाते थे, वे ऑटोकम्प्लीट के साथ वहीं मौजूद हैं।',
      id: 'Frontmatter berkas Markdown diurai bersama dokumennya dan tersedia pada node sebagai objek metadata bertipe. Bidang editorial yang dulu menuntut content layer kini ada begitu saja, lengkap dengan autocomplete.',
      it: 'Il frontmatter di un file Markdown viene analizzato insieme al documento ed esposto sul nodo come oggetto di metadati tipizzato. I campi editoriali per cui installavi un content layer sono semplicemente lì, con autocompletamento.',
      ja: 'Markdownファイルのフロントマターは本文とともに解析され、型付きのメタデータオブジェクトとしてノードに公開されます。コンテンツレイヤーを入れてまで欲しかった編集用フィールドが、補完付きでそのまま使えます。',
      ko: 'Markdown 파일의 프론트매터는 문서와 함께 파싱되어 노드에 타입이 지정된 메타데이터 객체로 노출됩니다. 콘텐츠 레이어까지 도입하던 편집용 필드가 자동완성과 함께 그냥 존재합니다.',
      pl: 'Frontmatter pliku Markdown jest parsowany razem z dokumentem i udostępniany na węźle jako typowany obiekt metadanych. Pola redakcyjne, dla których instalowałeś warstwę treści, są po prostu tam — z podpowiedziami.',
      pt: 'O frontmatter de um arquivo Markdown é analisado junto com o documento e exposto no nó como um objeto de metadados tipado. Os campos editoriais pelos quais você instalava uma camada de conteúdo estão simplesmente lá, com autocompletar.',
      ru: 'Frontmatter файла Markdown разбирается вместе с документом и доступен на узле как типизированный объект метаданных. Редакционные поля, ради которых вы ставили слой контента, просто есть — с автодополнением.',
      tr: 'Bir Markdown dosyasının frontmatter’ı belgeyle birlikte ayrıştırılır ve düğümde tipli bir meta veri nesnesi olarak sunulur. Uğruna içerik katmanı kurduğunuz editoryal alanlar, otomatik tamamlamayla birlikte orada duruyor.',
      uk: 'Frontmatter файлу Markdown розбирається разом із документом і доступний на вузлі як типізований об’єкт метаданих. Редакційні поля, заради яких ви ставили шар контенту, просто є — з автодоповненням.',
      vi: 'Frontmatter của tệp Markdown được phân tích cùng tài liệu và hiển thị trên node dưới dạng đối tượng siêu dữ liệu có kiểu. Những trường biên tập mà trước đây bạn phải cài content layer nay có sẵn, kèm gợi ý tự động.',
      zh: 'Markdown 文件的 frontmatter 会与正文一起被解析，并以带类型的元数据对象暴露在节点上。你以前要靠内容层才能拿到的编辑字段，现在直接就在那里，还有自动补全。',
    }),
    html: {
      cta: t({
        en: 'See HTML content',
        ar: 'اطّلع على محتوى HTML',
        de: 'HTML-Inhalt ansehen',
        'en-GB': 'See HTML content',
        es: 'Ver contenido HTML',
        fr: 'Voir le contenu HTML',
        'he-IL': 'צפייה בתוכן HTML',
        hi: 'HTML कंटेंट देखें',
        id: 'Lihat konten HTML',
        it: 'Vedi il contenuto HTML',
        ja: 'HTMLコンテンツを見る',
        ko: 'HTML 콘텐츠 보기',
        pl: 'Zobacz treść HTML',
        pt: 'Ver conteúdo HTML',
        ru: 'Посмотреть HTML-контент',
        tr: 'HTML içeriğine bakın',
        uk: 'Переглянути HTML-контент',
        vi: 'Xem nội dung HTML',
        zh: '查看 HTML 内容',
      }),
      description: t({
        en: 'html() nodes go through the same pipeline: tags are mapped to your own components, with the same typing and the same override rules.',
        ar: 'تمر عقد html() بالمسار نفسه: تُربَط الوسوم بمكوّناتك الخاصة، بالتنميط نفسه وقواعد التجاوز نفسها.',
        de: 'html()-Nodes durchlaufen dieselbe Pipeline: Tags werden auf Ihre eigenen Komponenten abgebildet, mit derselben Typisierung und denselben Override-Regeln.',
        'en-GB':
          'html() nodes go through the same pipeline: tags are mapped to your own components, with the same typing and the same override rules.',
        es: 'Los nodos html() pasan por el mismo pipeline: las etiquetas se asignan a tus propios componentes, con el mismo tipado y las mismas reglas de sobrescritura.',
        fr: 'Les nœuds html() suivent le même pipeline : les balises sont associées à vos propres composants, avec le même typage et les mêmes règles de surcharge.',
        'he-IL':
          'צמתי html() עוברים באותו צינור: התגיות ממופות לקומפוננטות שלכם, עם אותם טיפוסים ואותם כללי דריסה.',
        hi: 'html() नोड उसी पाइपलाइन से गुज़रते हैं: टैग आपके अपने कंपोनेंट से मैप होते हैं, वही टाइपिंग और वही ओवरराइड नियम।',
        id: 'Node html() melewati pipeline yang sama: tag dipetakan ke komponen Anda sendiri, dengan pengetikan dan aturan override yang sama.',
        it: 'I nodi html() attraversano la stessa pipeline: i tag vengono mappati sui tuoi componenti, con la stessa tipizzazione e le stesse regole di override.',
        ja: 'html()ノードも同じパイプラインを通ります。タグは自分のコンポーネントに対応づけられ、型付けもオーバーライド規則も同じです。',
        ko: 'html() 노드도 같은 파이프라인을 지납니다. 태그는 여러분의 컴포넌트로 매핑되며, 타이핑과 오버라이드 규칙도 동일합니다.',
        pl: 'Węzły html() przechodzą tym samym potokiem: znaczniki są mapowane na Twoje komponenty, z tym samym typowaniem i tymi samymi regułami nadpisań.',
        pt: 'Os nós html() passam pelo mesmo pipeline: as tags são mapeadas para os seus componentes, com a mesma tipagem e as mesmas regras de sobrescrita.',
        ru: 'Узлы html() проходят тот же конвейер: теги сопоставляются с вашими компонентами, с той же типизацией и теми же правилами переопределения.',
        tr: 'html() düğümleri de aynı hattan geçer: etiketler kendi bileşenlerinize eşlenir, aynı tipleme ve aynı geçersiz kılma kurallarıyla.',
        uk: 'Вузли html() проходять той самий конвеєр: теги зіставляються з вашими компонентами, з тією ж типізацією та тими ж правилами перевизначення.',
        vi: 'Các node html() đi qua cùng một pipeline: thẻ được ánh xạ tới thành phần của bạn, với cùng kiểu dữ liệu và cùng quy tắc ghi đè.',
        zh: 'html() 节点走的是同一条流水线：标签被映射到你自己的组件，类型与覆盖规则完全一致。',
      }),
      title: t({
        en: 'The same engine also parses HTML',
        ar: 'المحرك نفسه يحلل HTML أيضاً',
        de: 'Dieselbe Engine parst auch HTML',
        'en-GB': 'The same engine also parses HTML',
        es: 'El mismo motor también analiza HTML',
        fr: 'Le même moteur analyse aussi le HTML',
        'he-IL': 'אותו מנוע מנתח גם HTML',
        hi: 'वही इंजन HTML भी पार्स करता है',
        id: 'Mesin yang sama juga mengurai HTML',
        it: 'Lo stesso motore analizza anche l’HTML',
        ja: '同じエンジンがHTMLも解析',
        ko: '같은 엔진이 HTML도 파싱합니다',
        pl: 'Ten sam silnik parsuje też HTML',
        pt: 'O mesmo motor também analisa HTML',
        ru: 'Тот же движок разбирает и HTML',
        tr: 'Aynı motor HTML’i de ayrıştırır',
        uk: 'Той самий рушій розбирає й HTML',
        vi: 'Cùng bộ máy đó cũng phân tích HTML',
        zh: '同一个引擎也能解析 HTML',
      }),
    },
    markdownCode: `---
key: article
locale: en
title: Shipping i18n Markdown
author: aymericzip
---

# Shipping i18n Markdown

Here an example of markdown content.`,
    markdownCodeBlockTitle: 'article.en.content.md',
    title: t({
      en: 'Typed frontmatter, no content layer',
      ar: 'frontmatter مُنمَّط بلا طبقة محتوى',
      de: 'Typisiertes Frontmatter, ohne Content-Schicht',
      'en-GB': 'Typed frontmatter, no content layer',
      es: 'Frontmatter tipado, sin capa de contenido',
      fr: 'Frontmatter typé, sans couche de contenu',
      'he-IL': 'frontmatter עם טיפוסים, ללא שכבת תוכן',
      hi: 'टाइप्ड frontmatter, कोई कंटेंट लेयर नहीं',
      id: 'Frontmatter bertipe, tanpa content layer',
      it: 'Frontmatter tipizzato, senza content layer',
      ja: '型付きフロントマター、コンテンツレイヤー不要',
      ko: '타입이 지정된 프론트매터, 콘텐츠 레이어 불필요',
      pl: 'Typowany frontmatter, bez warstwy treści',
      pt: 'Frontmatter tipado, sem camada de conteúdo',
      ru: 'Типизированный frontmatter без слоя контента',
      tr: 'Tipli frontmatter, içerik katmanı yok',
      uk: 'Типізований frontmatter без шару контенту',
      vi: 'Frontmatter có kiểu, không cần content layer',
      zh: '带类型的 frontmatter，无需内容层',
    }),
    usageCode: `const { body } = useIntlayer('article');

body.metadata.title; // 'Shipping i18n Markdown'
body.metadata.author; // 'aymericzip'
body.value; // the raw Markdown string`,
    usageCodeBlockTitle: 'Article.tsx',
  },
} satisfies Dictionary;

export default frontmatterSectionContent;

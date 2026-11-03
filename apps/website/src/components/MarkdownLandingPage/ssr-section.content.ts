import { type Dictionary, t } from 'intlayer';

const ssrSectionContent = {
  key: 'ssr-section-markdown',
  title: 'Markdown Landing SSR Section',
  description:
    'Server-side rendering section of the Markdown landing page: parsing happens on the server and produces a serialisable AST the client renders without re-parsing.',
  content: {
    client: {
      code: `import { useLoaderData } from 'react-router';
import { MarkdownRenderer } from 'react-intlayer/markdown';

export default function Page() {
  const { content } = useLoaderData();

  // No re-parsing in the browser
  return <MarkdownRenderer content={content} />;
}`,
      codeBlockTitle: 'Page.tsx',
      description: t({
        en: 'Renderers take a raw string or an AST, so the browser only paints.',
        ar: 'تقبل محركات العرض سلسلة خام أو شجرة AST، فلا يقوم المتصفح إلا بالرسم.',
        de: 'Renderer nehmen einen Rohstring oder einen AST entgegen — der Browser zeichnet nur noch.',
        'en-GB':
          'Renderers take a raw string or an AST, so the browser only paints.',
        es: 'Los renderizadores aceptan una cadena o un AST, así que el navegador solo pinta.',
        fr: 'Les moteurs acceptent une chaîne brute ou un AST : le navigateur ne fait que peindre.',
        'he-IL':
          'ה-renderers מקבלים מחרוזת גולמית או AST, כך שהדפדפן רק מצייר.',
        hi: 'रेंडरर कच्ची स्ट्रिंग या AST दोनों लेते हैं, इसलिए ब्राउज़र सिर्फ़ चित्रित करता है।',
        id: 'Renderer menerima string mentah maupun AST, jadi peramban hanya menggambar.',
        it: 'I renderer accettano una stringa grezza o un AST, quindi il browser si limita a disegnare.',
        ja: 'レンダラーは生の文字列でもASTでも受け付けるため、ブラウザは描画するだけです。',
        ko: '렌더러는 원본 문자열이든 AST든 받으므로 브라우저는 그리기만 합니다.',
        pl: 'Renderery przyjmują surowy ciąg albo AST, więc przeglądarka tylko rysuje.',
        pt: 'Os renderizadores aceitam uma string bruta ou um AST, então o navegador só pinta.',
        ru: 'Рендереры принимают и строку, и AST, поэтому браузер только отрисовывает.',
        tr: 'Rendererlar ham dizeyi de AST’yi de kabul eder; tarayıcı yalnızca çizer.',
        uk: 'Рендерери приймають і сирий рядок, і AST, тож браузер лише малює.',
        vi: 'Trình kết xuất nhận chuỗi thô hoặc AST, nên trình duyệt chỉ việc vẽ.',
        zh: '渲染器既接受原始字符串也接受 AST，浏览器只负责绘制。',
      }),
      title: t({
        en: 'On the client',
        ar: 'على العميل',
        de: 'Auf dem Client',
        'en-GB': 'On the client',
        es: 'En el cliente',
        fr: 'Côté client',
        'he-IL': 'בלקוח',
        hi: 'क्लाइंट पर',
        id: 'Di klien',
        it: 'Sul client',
        ja: 'クライアント側',
        ko: '클라이언트에서',
        pl: 'Na kliencie',
        pt: 'No cliente',
        ru: 'На клиенте',
        tr: 'İstemcide',
        uk: 'На клієнті',
        vi: 'Trên client',
        zh: '在客户端',
      }),
    },
    description: t({
      en: 'Parsing and rendering are two separate steps. parseMarkdown produces a serialisable AST on the server, the browser receives it as JSON, and every renderer accepts it as-is — so the document is never walked twice.',
      ar: 'التحليل والعرض خطوتان منفصلتان. تنتج parseMarkdown شجرة AST قابلة للتسلسل على الخادم، ويستقبلها المتصفح بصيغة JSON، ويقبلها كل محرك عرض كما هي، فلا يُمَرّ على المستند مرتين.',
      de: 'Parsen und Rendern sind zwei getrennte Schritte. parseMarkdown erzeugt auf dem Server einen serialisierbaren AST, der Browser erhält ihn als JSON, und jeder Renderer nimmt ihn unverändert an — das Dokument wird nie zweimal durchlaufen.',
      'en-GB':
        'Parsing and rendering are two separate steps. parseMarkdown produces a serialisable AST on the server, the browser receives it as JSON, and every renderer accepts it as-is — so the document is never walked twice.',
      es: 'Analizar y renderizar son dos pasos distintos. parseMarkdown produce un AST serializable en el servidor, el navegador lo recibe como JSON y cualquier renderizador lo acepta tal cual: el documento nunca se recorre dos veces.',
      fr: "L'analyse et le rendu sont deux étapes distinctes. parseMarkdown produit un AST sérialisable sur le serveur, le navigateur le reçoit en JSON et tous les moteurs de rendu l'acceptent tel quel : le document n'est jamais parcouru deux fois.",
      'he-IL':
        'ניתוח ורינדור הם שני שלבים נפרדים. parseMarkdown מייצר AST שניתן לסריאליזציה בשרת, הדפדפן מקבל אותו כ-JSON, וכל renderer מקבל אותו כמו שהוא — כך שהמסמך לעולם אינו נסרק פעמיים.',
      hi: 'पार्सिंग और रेंडरिंग दो अलग चरण हैं। parseMarkdown सर्वर पर सीरियलाइज़ेबल AST बनाता है, ब्राउज़र उसे JSON के रूप में पाता है, और हर रेंडरर उसे ज्यों का त्यों स्वीकार करता है — दस्तावेज़ कभी दो बार नहीं पढ़ा जाता।',
      id: 'Penguraian dan rendering adalah dua langkah terpisah. parseMarkdown menghasilkan AST yang dapat diserialisasi di server, peramban menerimanya sebagai JSON, dan setiap renderer menerimanya apa adanya — dokumen tidak pernah ditelusuri dua kali.',
      it: 'Parsing e rendering sono due passi distinti. parseMarkdown produce un AST serializzabile sul server, il browser lo riceve come JSON e ogni renderer lo accetta così com’è: il documento non viene mai percorso due volte.',
      ja: '解析と描画は別々の工程です。parseMarkdownがサーバーでシリアライズ可能なASTを生成し、ブラウザはそれをJSONとして受け取り、各レンダラーはそのまま受け付けます。文書を二度走査することはありません。',
      ko: '파싱과 렌더링은 별개의 단계입니다. parseMarkdown이 서버에서 직렬화 가능한 AST를 만들고, 브라우저는 이를 JSON으로 받으며, 모든 렌더러가 그대로 받아들입니다. 문서를 두 번 순회하지 않습니다.',
      pl: 'Parsowanie i renderowanie to dwa osobne kroki. parseMarkdown tworzy na serwerze serializowalny AST, przeglądarka otrzymuje go jako JSON, a każdy renderer przyjmuje go bez zmian — dokument nigdy nie jest przechodzony dwa razy.',
      pt: 'Analisar e renderizar são dois passos separados. parseMarkdown produz um AST serializável no servidor, o navegador o recebe como JSON e todo renderizador o aceita como está — o documento nunca é percorrido duas vezes.',
      ru: 'Разбор и рендеринг — два отдельных шага. parseMarkdown строит на сервере сериализуемый AST, браузер получает его как JSON, и любой рендерер принимает его как есть: документ никогда не обходится дважды.',
      tr: 'Ayrıştırma ve işleme iki ayrı adımdır. parseMarkdown sunucuda serileştirilebilir bir AST üretir, tarayıcı bunu JSON olarak alır ve her renderer onu olduğu gibi kabul eder; belge asla iki kez dolaşılmaz.',
      uk: 'Розбір і рендеринг — два окремі кроки. parseMarkdown створює на сервері серіалізовний AST, браузер отримує його як JSON, і будь-який рендерер приймає його як є: документ ніколи не обходиться двічі.',
      vi: 'Phân tích và kết xuất là hai bước riêng biệt. parseMarkdown tạo AST tuần tự hóa được trên máy chủ, trình duyệt nhận nó dưới dạng JSON và mọi trình kết xuất đều chấp nhận nguyên trạng — tài liệu không bao giờ bị duyệt hai lần.',
      zh: '解析与渲染是两个独立步骤。parseMarkdown 在服务端生成可序列化的 AST，浏览器以 JSON 形式接收，所有渲染器都直接接受它——文档永远不会被遍历两次。',
    }),
    server: {
      code: `import { parseMarkdown } from 'react-intlayer/markdown';

export const loader = async () => {
  // Walked once, on the server
  const ast = parseMarkdown('## My title\\n\\nLorem Ipsum');

  return Response.json({ content: ast });
};`,
      codeBlockTitle: 'route.server.ts',
      description: t({
        en: 'The document is parsed once, into JSON you can cache, stream or store.',
        ar: 'يُحلَّل المستند مرة واحدة إلى JSON يمكنك تخزينه مؤقتاً أو بثّه أو حفظه.',
        de: 'Das Dokument wird einmal geparst — in JSON, das Sie cachen, streamen oder speichern können.',
        'en-GB':
          'The document is parsed once, into JSON you can cache, stream or store.',
        es: 'El documento se analiza una vez, en un JSON que puedes cachear, transmitir o almacenar.',
        fr: 'Le document est analysé une fois, en JSON que vous pouvez mettre en cache, streamer ou stocker.',
        'he-IL':
          'המסמך מנותח פעם אחת, ל-JSON שאפשר לשמור במטמון, להזרים או לאחסן.',
        hi: 'दस्तावेज़ एक ही बार पार्स होकर ऐसा JSON बनता है जिसे आप कैश, स्ट्रीम या स्टोर कर सकते हैं।',
        id: 'Dokumen diurai sekali menjadi JSON yang bisa Anda cache, stream, atau simpan.',
        it: 'Il documento viene analizzato una sola volta, in JSON che puoi mettere in cache, trasmettere o salvare.',
        ja: '文書は一度だけ解析され、キャッシュ・ストリーム・保存できるJSONになります。',
        ko: '문서는 한 번만 파싱되어 캐시하거나 스트리밍하거나 저장할 수 있는 JSON이 됩니다.',
        pl: 'Dokument jest parsowany raz do JSON-a, który możesz buforować, strumieniować lub przechować.',
        pt: 'O documento é analisado uma vez, virando JSON que você pode cachear, transmitir ou armazenar.',
        ru: 'Документ разбирается один раз в JSON, который можно кэшировать, стримить или хранить.',
        tr: 'Belge bir kez ayrıştırılır ve önbelleğe alabileceğiniz, akıtabileceğiniz veya saklayabileceğiniz bir JSON olur.',
        uk: 'Документ розбирається один раз у JSON, який можна кешувати, стримити або зберігати.',
        vi: 'Tài liệu được phân tích một lần thành JSON mà bạn có thể lưu đệm, truyền hoặc lưu trữ.',
        zh: '文档只解析一次，得到可缓存、可流式传输、可存储的 JSON。',
      }),
      title: t({
        en: 'On the server',
        ar: 'على الخادم',
        de: 'Auf dem Server',
        'en-GB': 'On the server',
        es: 'En el servidor',
        fr: 'Côté serveur',
        'he-IL': 'בשרת',
        hi: 'सर्वर पर',
        id: 'Di server',
        it: 'Sul server',
        ja: 'サーバー側',
        ko: '서버에서',
        pl: 'Na serwerze',
        pt: 'No servidor',
        ru: 'На сервере',
        tr: 'Sunucuda',
        uk: 'На сервері',
        vi: 'Trên máy chủ',
        zh: '在服务端',
      }),
    },
    title: t({
      en: 'Parse on the server, render on the client',
      ar: 'حلِّل على الخادم واعرض على العميل',
      de: 'Auf dem Server parsen, auf dem Client rendern',
      'en-GB': 'Parse on the server, render on the client',
      es: 'Analiza en el servidor, renderiza en el cliente',
      fr: 'Analyser sur le serveur, rendre sur le client',
      'he-IL': 'ניתוח בשרת, רינדור בלקוח',
      hi: 'सर्वर पर पार्स करें, क्लाइंट पर रेंडर करें',
      id: 'Urai di server, render di klien',
      it: 'Analizza sul server, renderizza sul client',
      ja: 'サーバーで解析し、クライアントで描画',
      ko: '서버에서 파싱하고 클라이언트에서 렌더링',
      pl: 'Parsuj na serwerze, renderuj na kliencie',
      pt: 'Analise no servidor, renderize no cliente',
      ru: 'Разбор на сервере, рендеринг на клиенте',
      tr: 'Sunucuda ayrıştır, istemcide işle',
      uk: 'Розбір на сервері, рендеринг на клієнті',
      vi: 'Phân tích trên máy chủ, kết xuất trên client',
      zh: '在服务端解析，在客户端渲染',
    }),
  },
} satisfies Dictionary;

export default ssrSectionContent;

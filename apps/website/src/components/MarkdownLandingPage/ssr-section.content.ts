import { type Dictionary, t } from 'intlayer';

const ssrSectionContent = {
  key: 'ssr-section-markdown',
  title: 'Markdown Landing SSR Section',
  description:
    'Server-side rendering section of the Markdown landing page: parsing happens on the server and produces a serialisable AST the client renders without re-parsing.',
  content: {
    title: t({
      en: 'Parse on the server, render on the client',
      'en-GB': 'Parse on the server, render on the client',
      fr: 'Analyser sur le serveur, rendre sur le client',
      es: 'Analiza en el servidor, renderiza en el cliente',
      de: 'Auf dem Server parsen, auf dem Client rendern',
      ru: 'Разбор на сервере, рендеринг на клиенте',
      ja: 'サーバーで解析し、クライアントで描画',
      ko: '서버에서 파싱하고 클라이언트에서 렌더링',
      zh: '在服务端解析，在客户端渲染',
      ar: 'حلِّل على الخادم واعرض على العميل',
      it: 'Analizza sul server, renderizza sul client',
      pt: 'Analise no servidor, renderize no cliente',
      hi: 'सर्वर पर पार्स करें, क्लाइंट पर रेंडर करें',
      tr: 'Sunucuda ayrıştır, istemcide işle',
      pl: 'Parsuj na serwerze, renderuj na kliencie',
      id: 'Urai di server, render di klien',
      vi: 'Phân tích trên máy chủ, kết xuất trên client',
      uk: 'Розбір на сервері, рендеринг на клієнті',
    }),
    description: t({
      en: 'Parsing and rendering are two separate steps. parseMarkdown produces a serialisable AST on the server, the browser receives it as JSON, and every renderer accepts it as-is — so the document is never walked twice.',
      'en-GB':
        'Parsing and rendering are two separate steps. parseMarkdown produces a serialisable AST on the server, the browser receives it as JSON, and every renderer accepts it as-is — so the document is never walked twice.',
      fr: "L'analyse et le rendu sont deux étapes distinctes. parseMarkdown produit un AST sérialisable sur le serveur, le navigateur le reçoit en JSON et tous les moteurs de rendu l'acceptent tel quel : le document n'est jamais parcouru deux fois.",
      es: 'Analizar y renderizar son dos pasos distintos. parseMarkdown produce un AST serializable en el servidor, el navegador lo recibe como JSON y cualquier renderizador lo acepta tal cual: el documento nunca se recorre dos veces.',
      de: 'Parsen und Rendern sind zwei getrennte Schritte. parseMarkdown erzeugt auf dem Server einen serialisierbaren AST, der Browser erhält ihn als JSON, und jeder Renderer nimmt ihn unverändert an — das Dokument wird nie zweimal durchlaufen.',
      ru: 'Разбор и рендеринг — два отдельных шага. parseMarkdown строит на сервере сериализуемый AST, браузер получает его как JSON, и любой рендерер принимает его как есть: документ никогда не обходится дважды.',
      ja: '解析と描画は別々の工程です。parseMarkdownがサーバーでシリアライズ可能なASTを生成し、ブラウザはそれをJSONとして受け取り、各レンダラーはそのまま受け付けます。文書を二度走査することはありません。',
      ko: '파싱과 렌더링은 별개의 단계입니다. parseMarkdown이 서버에서 직렬화 가능한 AST를 만들고, 브라우저는 이를 JSON으로 받으며, 모든 렌더러가 그대로 받아들입니다. 문서를 두 번 순회하지 않습니다.',
      zh: '解析与渲染是两个独立步骤。parseMarkdown 在服务端生成可序列化的 AST，浏览器以 JSON 形式接收，所有渲染器都直接接受它——文档永远不会被遍历两次。',
      ar: 'التحليل والعرض خطوتان منفصلتان. تنتج parseMarkdown شجرة AST قابلة للتسلسل على الخادم، ويستقبلها المتصفح بصيغة JSON، ويقبلها كل محرك عرض كما هي، فلا يُمَرّ على المستند مرتين.',
      it: 'Parsing e rendering sono due passi distinti. parseMarkdown produce un AST serializzabile sul server, il browser lo riceve come JSON e ogni renderer lo accetta così com’è: il documento non viene mai percorso due volte.',
      pt: 'Analisar e renderizar são dois passos separados. parseMarkdown produz um AST serializável no servidor, o navegador o recebe como JSON e todo renderizador o aceita como está — o documento nunca é percorrido duas vezes.',
      hi: 'पार्सिंग और रेंडरिंग दो अलग चरण हैं। parseMarkdown सर्वर पर सीरियलाइज़ेबल AST बनाता है, ब्राउज़र उसे JSON के रूप में पाता है, और हर रेंडरर उसे ज्यों का त्यों स्वीकार करता है — दस्तावेज़ कभी दो बार नहीं पढ़ा जाता।',
      tr: 'Ayrıştırma ve işleme iki ayrı adımdır. parseMarkdown sunucuda serileştirilebilir bir AST üretir, tarayıcı bunu JSON olarak alır ve her renderer onu olduğu gibi kabul eder; belge asla iki kez dolaşılmaz.',
      pl: 'Parsowanie i renderowanie to dwa osobne kroki. parseMarkdown tworzy na serwerze serializowalny AST, przeglądarka otrzymuje go jako JSON, a każdy renderer przyjmuje go bez zmian — dokument nigdy nie jest przechodzony dwa razy.',
      id: 'Penguraian dan rendering adalah dua langkah terpisah. parseMarkdown menghasilkan AST yang dapat diserialisasi di server, peramban menerimanya sebagai JSON, dan setiap renderer menerimanya apa adanya — dokumen tidak pernah ditelusuri dua kali.',
      vi: 'Phân tích và kết xuất là hai bước riêng biệt. parseMarkdown tạo AST tuần tự hóa được trên máy chủ, trình duyệt nhận nó dưới dạng JSON và mọi trình kết xuất đều chấp nhận nguyên trạng — tài liệu không bao giờ bị duyệt hai lần.',
      uk: 'Розбір і рендеринг — два окремі кроки. parseMarkdown створює на сервері серіалізовний AST, браузер отримує його як JSON, і будь-який рендерер приймає його як є: документ ніколи не обходиться двічі.',
    }),
    server: {
      title: t({
        en: 'On the server',
        'en-GB': 'On the server',
        fr: 'Côté serveur',
        es: 'En el servidor',
        de: 'Auf dem Server',
        ru: 'На сервере',
        ja: 'サーバー側',
        ko: '서버에서',
        zh: '在服务端',
        ar: 'على الخادم',
        it: 'Sul server',
        pt: 'No servidor',
        hi: 'सर्वर पर',
        tr: 'Sunucuda',
        pl: 'Na serwerze',
        id: 'Di server',
        vi: 'Trên máy chủ',
        uk: 'На сервері',
      }),
      description: t({
        en: 'The document is parsed once, into JSON you can cache, stream or store.',
        'en-GB':
          'The document is parsed once, into JSON you can cache, stream or store.',
        fr: 'Le document est analysé une fois, en JSON que vous pouvez mettre en cache, streamer ou stocker.',
        es: 'El documento se analiza una vez, en un JSON que puedes cachear, transmitir o almacenar.',
        de: 'Das Dokument wird einmal geparst — in JSON, das Sie cachen, streamen oder speichern können.',
        ru: 'Документ разбирается один раз в JSON, который можно кэшировать, стримить или хранить.',
        ja: '文書は一度だけ解析され、キャッシュ・ストリーム・保存できるJSONになります。',
        ko: '문서는 한 번만 파싱되어 캐시하거나 스트리밍하거나 저장할 수 있는 JSON이 됩니다.',
        zh: '文档只解析一次，得到可缓存、可流式传输、可存储的 JSON。',
        ar: 'يُحلَّل المستند مرة واحدة إلى JSON يمكنك تخزينه مؤقتاً أو بثّه أو حفظه.',
        it: 'Il documento viene analizzato una sola volta, in JSON che puoi mettere in cache, trasmettere o salvare.',
        pt: 'O documento é analisado uma vez, virando JSON que você pode cachear, transmitir ou armazenar.',
        hi: 'दस्तावेज़ एक ही बार पार्स होकर ऐसा JSON बनता है जिसे आप कैश, स्ट्रीम या स्टोर कर सकते हैं।',
        tr: 'Belge bir kez ayrıştırılır ve önbelleğe alabileceğiniz, akıtabileceğiniz veya saklayabileceğiniz bir JSON olur.',
        pl: 'Dokument jest parsowany raz do JSON-a, który możesz buforować, strumieniować lub przechować.',
        id: 'Dokumen diurai sekali menjadi JSON yang bisa Anda cache, stream, atau simpan.',
        vi: 'Tài liệu được phân tích một lần thành JSON mà bạn có thể lưu đệm, truyền hoặc lưu trữ.',
        uk: 'Документ розбирається один раз у JSON, який можна кешувати, стримити або зберігати.',
      }),
      codeBlockTitle: 'route.server.ts',
      code: `import { parseMarkdown } from 'react-intlayer/markdown';

export const loader = async () => {
  // Walked once, on the server
  const ast = parseMarkdown('## My title\\n\\nLorem Ipsum');

  return Response.json({ content: ast });
};`,
    },
    client: {
      title: t({
        en: 'On the client',
        'en-GB': 'On the client',
        fr: 'Côté client',
        es: 'En el cliente',
        de: 'Auf dem Client',
        ru: 'На клиенте',
        ja: 'クライアント側',
        ko: '클라이언트에서',
        zh: '在客户端',
        ar: 'على العميل',
        it: 'Sul client',
        pt: 'No cliente',
        hi: 'क्लाइंट पर',
        tr: 'İstemcide',
        pl: 'Na kliencie',
        id: 'Di klien',
        vi: 'Trên client',
        uk: 'На клієнті',
      }),
      description: t({
        en: 'Renderers take a raw string or an AST, so the browser only paints.',
        'en-GB':
          'Renderers take a raw string or an AST, so the browser only paints.',
        fr: 'Les moteurs acceptent une chaîne brute ou un AST : le navigateur ne fait que peindre.',
        es: 'Los renderizadores aceptan una cadena o un AST, así que el navegador solo pinta.',
        de: 'Renderer nehmen einen Rohstring oder einen AST entgegen — der Browser zeichnet nur noch.',
        ru: 'Рендереры принимают и строку, и AST, поэтому браузер только отрисовывает.',
        ja: 'レンダラーは生の文字列でもASTでも受け付けるため、ブラウザは描画するだけです。',
        ko: '렌더러는 원본 문자열이든 AST든 받으므로 브라우저는 그리기만 합니다.',
        zh: '渲染器既接受原始字符串也接受 AST，浏览器只负责绘制。',
        ar: 'تقبل محركات العرض سلسلة خام أو شجرة AST، فلا يقوم المتصفح إلا بالرسم.',
        it: 'I renderer accettano una stringa grezza o un AST, quindi il browser si limita a disegnare.',
        pt: 'Os renderizadores aceitam uma string bruta ou um AST, então o navegador só pinta.',
        hi: 'रेंडरर कच्ची स्ट्रिंग या AST दोनों लेते हैं, इसलिए ब्राउज़र सिर्फ़ चित्रित करता है।',
        tr: 'Rendererlar ham dizeyi de AST’yi de kabul eder; tarayıcı yalnızca çizer.',
        pl: 'Renderery przyjmują surowy ciąg albo AST, więc przeglądarka tylko rysuje.',
        id: 'Renderer menerima string mentah maupun AST, jadi peramban hanya menggambar.',
        vi: 'Trình kết xuất nhận chuỗi thô hoặc AST, nên trình duyệt chỉ việc vẽ.',
        uk: 'Рендерери приймають і сирий рядок, і AST, тож браузер лише малює.',
      }),
      codeBlockTitle: 'Page.tsx',
      code: `import { useLoaderData } from 'react-router';
import { MarkdownRenderer } from 'react-intlayer/markdown';

export default function Page() {
  const { content } = useLoaderData();

  // No re-parsing in the browser
  return <MarkdownRenderer content={content} />;
}`,
    },
  },
} satisfies Dictionary;

export default ssrSectionContent;

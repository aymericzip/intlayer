import { type Dictionary, t } from 'intlayer';

export default {
  key: 'translate-software-structured-data',
  content: {
    description: t({
      en: 'Intlayer Translate is a free CLI tool that translates your JSON and content for Intlayer, next-intl, i18next, and more. It connects with any AI provider, filters existing translations, chunks large JSONs, optimizes token consumption, validates structure, and manages retries and parallelized requests.',
      'en-GB':
        'Intlayer Translate is a free CLI tool that translates your JSON and content for Intlayer, next-intl, i18next, and more. It connects with any AI provider, filters existing translations, chunks large JSONs, optimizes token consumption, validates structure, and manages retries and parallelized requests.',
      fr: "Intlayer Translate est un outil CLI gratuit qui traduit vos JSON et contenus pour Intlayer, next-intl, i18next, etc. Il se connecte à n'importe quel fournisseur d'IA, filtre les traductions existantes, découpe les gros JSON, optimise la consommation de jetons, valide la structure et gère les nouvelles tentatives ainsi que les requêtes parallélisées.",
      es: 'Intlayer Translate es una herramienta CLI gratuita que traduce su JSON y contenido para Intlayer, next-intl, i18next y más. Se conecta con cualquier proveedor de IA, filtra las traducciones existentes, divide los JSON grandes, optimiza el consumo de tokens, valida la estructura y gestiona los reintentos y las solicitudes paralelizadas.',
      de: 'Intlayer Translate ist ein kostenloses CLI-Tool, das Ihre JSON und Inhalte für Intlayer, next-intl, i18next und mehr übersetzt. Es verbindet sich mit jedem KI-Anbieter, filtert bestehende Übersetzungen, stückelt große JSONs, optimiert den Token-Verbrauch, validiert die Struktur und verwaltet Wiederholungsversuche sowie parallelisierte Anfragen.',
      ja: 'Intlayer Translateは、Intlayer、next-intl、i18nextなどのJSONやコンテンツを翻訳する無料のCLIツールです。任意のAIプロバイダーと接続し、既存の翻訳をフィルタリング、巨大なJSONのチャンク化、トークン消費の最適化、構造の検証を行い、リトライや並列リクエストを管理します。',
      ko: 'Intlayer Translate는 Intlayer, next-intl, i18next 등의 JSON 및 콘텐츠를 번역하는 무료 CLI 도구입니다. 모든 AI 제공업체와 연결되며 기존 번역을 필터링하고 큰 JSON을 분할하며 토큰 소비를 최적화하고 구조를 검증하며 재시도 및 병렬 요청을 관리합니다.',
      zh: 'Intlayer Translate 是一个免费的 CLI 工具，可以为 Intlayer、next-intl、i18next 等翻译您的 JSON 和内容。它连接任何 AI 提供商，过滤现有翻译，分块大型 JSON，优化代币消耗，验证结构，并管理重试和并行请求。',
      it: 'Intlayer Translate è uno strumento CLI gratuito che traduce i tuoi JSON e contenuti per Intlayer, next-intl, i18next e altri. Si connette con qualsiasi provider di IA, filtra le traduzioni esistenti, suddivide i JSON di grandi dimensioni, ottimizza il consumo di token, convalida la struttura e gestisce i tentativi e le richieste parallelizzate.',
      pt: 'Intlayer Translate é uma ferramenta CLI gratuita que traduz o seu JSON e conteúdo para Intlayer, next-intl, i18next e muito mais. Ele se conecta a qualquer provedor de IA, filtra traduções existentes, divide JSONs grandes, otimiza o consumo de tokens, valida a estrutura e gerencia novas tentativas e solicitações paralelizadas.',
      hi: 'Intlayer Translate एक मुफ़्त CLI टूल है जो Intlayer, next-intl, i18next आदि के लिए आपके JSON और सामग्री का अनुवाद करता है। यह किसी भी AI प्रदाता के साथ जुड़ता है, मौजूदा अनुवादों को फ़िल्टर करता है, बड़े JSON को खंडित करता है, टोकन की खपत को अनुकूलित करता है, संरचना को मान्य करता है, और पुनर्प्रयासों और समानांतर अनुरोधों का प्रबंधन करता है।',
      ar: 'Intlayer Translate هي أداة CLI مجانية تترجم JSON والمحتوى الخاص بك لـ Intlayer و next-intl و i18next والمزيد. تتصل بأي مزود ذكاء اصطناعي، وتصفي الترجمات الحالية، وتقسم ملفات JSON الكبيرة، وتحسن استهلاك الرموز، وتتحقق من الهيكل، وتدير المحاولات والطلبات المتوازية.',
      ru: 'Intlayer Translate — это бесплатный инструмент CLI, который переводит ваш JSON и контент для Intlayer, next-intl, i18next и других. Он подключается к любому ИИ-провайдеру, фильтрует существующие переводы, разбивает большие JSON-файлы, оптимизирует потребление токенов, проверяет структуру и управляет повторными попытками и параллельными запросами.',
      tr: "Intlayer Translate, Intlayer, next-intl, i18next ve daha fazlası için JSON ve içeriğinizi çeviren ücretsiz bir CLI aracıdır. Herhangi bir yapay zeka sağlayıcısıyla bağlantı kurar, mevcut çevirileri filtreler, büyük JSON'ları parçalar, token tüketimini optimize eder, yapıyı doğrular ve yeniden denemeleri ile paralel istekleri yönetir.",
      pl: 'Intlayer Translate to bezpłatne narzędzie CLI, które tłumaczy Twoje JSON i treści dla Intlayer, next-intl, i18next i innych. Łączy się z dowolnym dostawcą AI, filtruje istniejące tłumaczenia, dzieli duże pliki JSON na mniejsze części, optymalizuje zużycie tokenów, weryfikuje strukturę oraz zarządza ponownymi próbami i równoległymi zapytaniami.',
      id: 'Intlayer Translate adalah alat CLI gratis yang menerjemahkan JSON dan konten Anda untuk Intlayer, next-intl, i18next, dan banyak lagi. Alat ini terhubung dengan penyedia AI apa pun, memfilter terjemahan yang ada, memotong JSON besar, mengoptimalkan konsumsi token, memvalidasi struktur, serta mengelola percobaan ulang dan permintaan yang diparalelkan.',
      vi: 'Intlayer Translate là một công cụ CLI miễn phí giúp dịch JSON và nội dung của bạn cho Intlayer, next-intl, i18next, v.v. Nó kết nối với bất kỳ nhà cung cấp AI nào, lọc các bản dịch hiện có, chia nhỏ JSON lớn, tối ưu hóa mức tiêu thụ mã thông báo, xác thực cấu trúc và quản lý các lần thử lại cùng với các yêu cầu được thực hiện song song.',
      uk: 'Intlayer Translate — це безкоштовний інструмент CLI, який перекладає ваші JSON та контент для Intlayer, next-intl, i18next тощо. Він підключається до будь-якого постачальника ШІ, фільтрує наявні переклади, розбиває великі JSON, оптимізує споживання токенів, перевіряє структуру та керує повторними спробами та паралельними запитами.',
    }),
  },
  title: 'Translate Software Application structured data',
  description: 'Structured data for the Translate CLI software application.',
  tags: ['structured data', 'translate', 'SEO'],
} satisfies Dictionary;

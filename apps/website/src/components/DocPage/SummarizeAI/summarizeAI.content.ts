import { insert, t, type Dictionary } from 'intlayer';

const summarizeAIContent = {
  key: 'summarize-ai',
  content: {
    title: t({
      en: 'Reference this doc to your favorite AI assistant',
      fr: 'Référencez cette doc à votre assistant AI préféré',
      es: 'Referencia esta doc a tu asistente AI favorito',
      de: 'Referenzieren Sie diese Dokumentation mit Ihrem bevorzugten AI-Assistenten',
      it: 'Riferimento a questa documentazione al tuo assistente AI preferito',
      pt: 'Referência esta documentação ao seu assistente AI favorito',
      ja: 'このドキュメントをあなたの好きなAIアシスタントに参照してください',
      ko: '이 문서를 원하는 AI 어시스턴트에 참조하세요',
      zh: '将此文档参考到您的 AI 助手',
      ar: 'استخدم هذه الصفحة والموفر AI الذي تريده',
      'en-GB': 'Reference this doc to your favorite AI assistant',
      hi: 'इस दस्तावेज़ को अपने पसंदीदा AI एसिस्टेंट के साथ संदर्भित करें',
      ru: 'Ссылайтесь на этот документ на ваш любимый ассистент AI',
    }),
    description: t({
      en: 'Ask your question and get a summary of the document by referencing this page and the AI provider of your choice',
      fr: 'Posez votre question et obtenez un résumé du document en referencant cette page et le Provider AI de votre choix',
      es: 'Haz tu pregunta y obtén un resumen del documento referenciando esta página y el proveedor AI de tu elección',
      de: 'Stellen Sie Ihre Frage und erhalten Sie einen Resümee des Dokuments, indem Sie diese Seite und den AI-Anbieter Ihrer Wahl referenzieren',
      it: 'Pose una domanda e ottieni un riassunto del documento facendo riferimento a questa pagina e al provider AI di tua scelta',
      pt: 'Faça sua pergunta e obtenha um resumo do documento referenciando esta página e o provedor AI de sua escolha',
      ja: 'このページとあなたの好きなAIアシスタントを使ってドキュメントを要約します',
      ko: '이 페이지와 원하는 AI 어시스턴트를 사용하여 문서를 요약합니다',
      zh: '使用您最喜欢的AI助手总结文档，并引用此页面和AI提供商',
      ar: 'استخدم مساعدك المفضل للملخص واستخدم هذه الصفحة والموفر AI الذي تريده',
      'en-GB':
        'Ask your question and get a summary of the document by referencing this page and the AI provider of your choice',
      hi: 'अपने प्रश्न को पूछें और दस्तावेज़ का सारांश प्राप्त करें, इस पृष्ठ और आपके चुने हुए AI प्रदाता का उपयोग करके',
      ru: 'Спросите свой вопрос и получите сводку документа, используя эту страницу и выбранного вами поставщика AI',
    }),
    summarizeLabel: insert(
      t({
        en: 'Summarize using {{provider}}',
        fr: 'Résumer avec {{provider}}',
        es: 'Resumir con {{provider}}',
        de: 'Resumieren mit {{provider}}',
        it: 'Riepilogo con {{provider}}',
        pt: 'Resumir com {{provider}}',
        ja: '{{provider}}を使って要約',
        ko: '{{provider}}를 사용하여 요약',
        zh: '使用{{provider}}总结',
        ar: 'استخدم {{provider}} للملخص',
        'en-GB': 'Summarize using {{provider}}',
        hi: '{{provider}} का उपयोग करके सारांशित करें',
        ru: 'Суммируйте документ, используя {{provider}}',
      })
    ),
  },
} satisfies Dictionary;

export default summarizeAIContent;

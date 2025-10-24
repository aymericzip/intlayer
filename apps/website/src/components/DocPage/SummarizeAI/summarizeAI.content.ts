import { type Dictionary, insert, t } from 'intlayer';

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
      tr: 'Bu dokümanı favori AI asistanınıza referans verin',
      pl: 'Prześlij ten dokument do swojego ulubionego asystenta AI',
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
      tr: 'Sorunuzu sorun ve bu sayfaya ve seçtiğiniz AI sağlayıcısına referans vererek belgenin bir özetini alın',
      pl: 'Zadaj pytanie i otrzymaj streszczenie dokumentu, odwołując się do tej strony i wybranego dostawcy AI',
    }),
    summarizeLabel: insert(
      t({
        ar: 'استخدم {{provider}} للملخص',
        de: 'Resumieren mit {{provider}}',
        en: 'Summarize using {{provider}}',
        'en-GB': 'Summarize using {{provider}}',
        es: 'Resumir con {{provider}}',
        fr: 'Résumer avec {{provider}}',
        hi: '{{provider}} का उपयोग करके सारांशित करें',
        it: 'Riepilogo con {{provider}}',
        ja: '{{provider}}を使って要約',
        ko: '{{provider}}를 사용하여 요약',
        pl: 'Skróć za pomocą {{provider}}',
        pt: 'Resumir com {{provider}}',
        ru: 'Суммируйте документ, используя {{provider}}',
        tr: '{{provider}} kullanarak özetle',
        zh: '使用{{provider}}总结',
      })
    ),
    summarizeMessage: insert(
      t({
        ar: 'استخدم {{url}} للملخص',
        de: 'Resumieren Sie das folgende Dokument : {{url}}',
        en: 'Summarize the following doc : {{url}}',
        'en-GB': 'Summarize the following doc : {{url}}',
        es: 'Resumir el documento siguiente : {{url}}',
        fr: 'Résumer le document suivant : {{url}}',
        hi: '{{url}} का उपयोग करके सारांशित करें',
        it: 'Riepiloga il documento seguente : {{url}}',
        ja: '次のドキュメントを要約 : {{url}}',
        ko: '다음 문서를 요약 : {{url}}',
        pl: 'Streszcz poniższy dokument: {{url}}',
        pt: 'Resumir o documento seguinte : {{url}}',
        ru: 'Суммируйте документ, используя {{url}}',
        tr: 'Aşağıdaki dokümanı özetle : {{url}}',
        zh: '总结以下文档 : {{url}}',
      })
    ),
  },
  title: 'Summarize with AI',
  description:
    'Content related to the integration of AI assistants for summarizing documentation. Provides labels and messages used to trigger AI-based summarization from a given provider and document URL.',
  tags: ['AI integration', 'documentation tools', 'summarization'],
} satisfies Dictionary;

export default summarizeAIContent;

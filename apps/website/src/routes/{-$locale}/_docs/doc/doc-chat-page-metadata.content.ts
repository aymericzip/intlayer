import { type Dictionary, t } from 'intlayer';

const metadataContent = {
  key: 'doc-chat-page-metadata',
  content: {
    title: t({
      ar: 'الدردشة مع وثائق Intlayer | Intlayer',
      de: 'Chat mit der Intlayer-Dokumentation | Intlayer',
      en: 'Chat with the Intlayer Documentation | Intlayer',
      'en-GB': 'Chat with the Intlayer Documentation | Intlayer',
      es: 'Chatea con la documentación de Intlayer | Intlayer',
      fr: 'Discuter avec la documentation Intlayer | Intlayer',
      hi: 'Intlayer दस्तावेज़ से चैट करें | Intlayer',
      it: 'Chatta con la documentazione Intlayer | Intlayer',
      ja: 'Intlayer ドキュメントとチャット | Intlayer',
      ko: 'Intlayer 문서와 대화하기 | Intlayer',
      pt: 'Converse com a documentação do Intlayer | Intlayer',
      ru: 'Чат с документацией Intlayer | Intlayer',
      tr: 'Intlayer dokümantasyonuyla sohbet et | Intlayer',
      zh: '与 Intlayer 文档对话 | Intlayer',
      pl: 'Porozmawiaj z dokumentacją Intlayer | Intlayer',
      id: 'Mengobrol dengan dokumentasi Intlayer | Intlayer',
      vi: 'Trò chuyện với tài liệu Intlayer | Intlayer',
      uk: 'Чат із документацією Intlayer | Intlayer',
    }),

    description: t({
      ar: 'اطرح أسئلتك حول التدويل مع Intlayer واحصل على إجابات فورية مدعومة بالذكاء الاصطناعي ومستندة إلى الوثائق الرسمية.',
      de: 'Stellen Sie Fragen zur Internationalisierung mit Intlayer und erhalten Sie sofortige, KI-gestützte Antworten aus der offiziellen Dokumentation.',
      en: 'Ask questions about internationalization with Intlayer and get instant, AI-powered answers grounded in the official documentation.',
      'en-GB':
        'Ask questions about internationalisation with Intlayer and get instant, AI-powered answers grounded in the official documentation.',
      es: 'Haz preguntas sobre internacionalización con Intlayer y obtén respuestas instantáneas con IA basadas en la documentación oficial.',
      fr: "Posez vos questions sur l'internationalisation avec Intlayer et obtenez des réponses instantanées, générées par IA à partir de la documentation officielle.",
      hi: 'Intlayer के साथ अंतर्राष्ट्रीयकरण के बारे में प्रश्न पूछें और आधिकारिक दस्तावेज़ पर आधारित तत्काल AI उत्तर पाएं।',
      it: "Fai domande sull'internazionalizzazione con Intlayer e ottieni risposte immediate basate sull'IA e sulla documentazione ufficiale.",
      ja: 'Intlayer による国際化について質問すると、公式ドキュメントに基づいた AI の回答をすぐに得られます。',
      ko: 'Intlayer의 국제화에 대해 질문하고 공식 문서에 기반한 AI 답변을 즉시 받아보세요.',
      pt: 'Faça perguntas sobre internacionalização com o Intlayer e receba respostas instantâneas de IA baseadas na documentação oficial.',
      ru: 'Задавайте вопросы об интернационализации с Intlayer и получайте мгновенные ответы ИИ на основе официальной документации.',
      tr: 'Intlayer ile uluslararasılaştırma hakkında sorular sorun ve resmi dokümantasyona dayalı anlık yapay zekâ yanıtları alın.',
      zh: '向 Intlayer 提问国际化相关问题，立即获得基于官方文档的 AI 回答。',
      pl: 'Zadawaj pytania o internacjonalizację w Intlayer i otrzymuj natychmiastowe odpowiedzi AI oparte na oficjalnej dokumentacji.',
      id: 'Ajukan pertanyaan tentang internasionalisasi dengan Intlayer dan dapatkan jawaban AI seketika berdasarkan dokumentasi resmi.',
      vi: 'Đặt câu hỏi về quốc tế hóa với Intlayer và nhận câu trả lời AI tức thì dựa trên tài liệu chính thức.',
      uk: 'Ставте запитання про інтернаціоналізацію з Intlayer і отримуйте миттєві відповіді ШІ на основі офіційної документації.',
    }),
  },
  title: 'Documentation chat page metadata',
  description:
    'Metadata for the documentation chat page: title and description used for SEO and social sharing.',
  tags: ['page metadata', 'documentation', 'chat page'],
} satisfies Dictionary;

export default metadataContent;

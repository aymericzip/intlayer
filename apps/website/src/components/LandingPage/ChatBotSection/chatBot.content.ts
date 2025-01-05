import { type DeclarationContent, t } from 'intlayer';

const chatbotContent = {
  key: 'chatbot-section',
  content: {
    title: t({
      fr: 'Ask anything',
      en: 'Ask anything',
      es: 'Pregunta cualquier cosa',
      'en-GB': 'Ask anything',
      de: 'Frage jedenfalls',
      ja: 'どうぞお好きなものを聞いてください',
      ko: '무엇을 물어보세요',
      zh: '问任何事情',
      it: 'Chiedi qualsiasi cosa',
      pt: 'Faça uma pergunta',
      hi: 'कुछ प्रश्न करें',
      ar: 'طرح أي شيء',
      ru: 'Спросите что-нибудь',
    }),
  },
} satisfies DeclarationContent;

export default chatbotContent;

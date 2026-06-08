import { type Dictionary, t } from 'intlayer';

const chatBotContent = {
  key: 'dashboard-chat-bot',

  content: {
    firstMessage: t({
      en: 'Hey! How can I help you with your Intlayer project?',
      'en-GB': 'Hey! How can I help you with your Intlayer project?',
      fr: 'Salut ! Comment puis-je vous aider avec votre projet Intlayer ?',
      es: '¡Hola! ¿Cómo puedo ayudarte con tu proyecto Intlayer?',
      de: 'Hallo! Wie kann ich Ihnen bei Ihrem Intlayer-Projekt helfen?',
      it: 'Ehi! Come posso aiutarti con il tuo progetto Intlayer?',
      pt: 'Olá! Como posso ajudar você com o seu projeto Intlayer?',
      ja: 'こんにちは！Intlayerプロジェクトについて何かお手伝いできることはありますか？',
      ko: '안녕하세요! Intlayer 프로젝트에 대해 어떻게 도와드릴까요?',
      zh: '嘿！我能为您提供什么关于 Intlayer 项目的帮助吗？',
      hi: 'नमस्ते! मैं आपके Intlayer प्रोजेक्ट में आपकी कैसे मदद कर सकता हूँ?',
      ar: 'مرحباً! كيف يمكنني مساعدتك في مشروع Intlayer الخاص بك؟',
      ru: 'Привет! Чем я могу помочь вам с вашим проектом Intlayer?',
      tr: 'Selam! Intlayer projenizde size nasıl yardımcı olabilirim?',
      pl: 'Hej! Jak mogę Ci pomóc w Twoim projekcie Intlayer?',
      id: 'Hai! Bagaimana saya bisa membantu Anda dengan proyek Intlayer Anda?',
      vi: 'Chào! Tôi có thể giúp gì cho dự án Intlayer của bạn?',
      uk: 'Привіт! Чим я можу допомогти вам із вашим проектом Intlayer?',
    }),

    openAiAssistant: t({
      en: 'Open AI assistant',
      fr: "Ouvrir l'assistant IA",
      de: 'Öffnen Sie den KI-Assistenten',
      es: 'Abrir asistente IA',
      it: 'Apri assistente IA',
      pt: 'Abrir assistente IA',
      ja: 'AIアシスタントを開く',
      ko: 'AI 어시스턴트 열기',
      zh: '打开 AI 助手',
      hi: 'एआई सहायक खोलें',
      ar: 'فتح مساعد الذكاء الاصطناعي',
      ru: 'Открыть ИИ-ассистент',
      tr: 'Yapay zeka asistanını aç',
      pl: 'Otwórz asystenta AI',
      id: 'Buka asisten AI',
      vi: 'Mở trợ lý AI',
      uk: 'Відкрити AI-асистент',
      'en-GB': 'Open AI assistant',
    }),

    aiAssistant: t({
      en: 'AI assistant',
      fr: 'Assistant IA',
      de: 'KI-Assistent',
      es: 'Asistente IA',
      it: 'Assistente IA',
      pt: 'Assistente IA',
      ja: 'AIアシスタント',
      ko: 'AI 어시스턴트',
      zh: 'AI 助手',
      hi: 'एआई सहायक',
      ar: 'مساعد الذكاء الاصطناعي',
      ru: 'ИИ-ассистент',
      tr: 'Yapay zeka asistanı',
      pl: 'Asystent AI',
      id: 'Asisten AI',
      vi: 'Trợ lý AI',
      uk: 'AI-асистент',
      'en-GB': 'AI assistant',
    }),
  },

  title: 'Dashboard chat bot',
  description:
    'Content dictionary for the dashboard chat bot component providing the initial message and assistant labels (OpenAI/AI assistant) for the Intlayer project.',
  tags: ['component', 'dashboard', 'chatbot', 'assistant', 'content'],
} satisfies Dictionary;

export default chatBotContent;

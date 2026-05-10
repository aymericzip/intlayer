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
  },
} satisfies Dictionary;

export default chatBotContent;

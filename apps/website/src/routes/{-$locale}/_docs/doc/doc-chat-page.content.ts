import { type Dictionary, t } from 'intlayer';

const metadataContent = {
  key: 'doc-chat-page',
  content: {
    title: t({
      en: 'Ask your question to our AI-Powered Smart Documentation',
      ar: 'طرح سؤالك لدردشة الوثائق الخاصة بنا AI',
      de: 'Stellen Sie Ihre Frage zu unserer intelligenten Dokumentation',
      'en-GB': 'Ask your question to our AI-Powered Smart Documentation',
      es: 'Pregúntale a nuestra documentación inteligente',
      fr: 'Posez votre question à notre documentation intelligente',
      'he-IL': 'שאלו את התיעוד החכם שלנו המופעל על ידי AI',
      hi: 'हमारे एआई-पॉयटेड स्मार्ट दस्तावेज़ के लिए अपनी प्रश्न करें',
      id: 'Ajukan pertanyaan Anda ke Smart Documentation bertenaga AI kami',
      it: 'Fai una domanda alla nostra documentazione intelligente',
      ja: '私たちのAIドキュメントに問い合わせる',
      ko: '우리의 AI 스마트 문서に문의하세요',
      pl: 'Zadaj swoje pytanie naszej inteligentnej dokumentacji zasilanej sztuczną inteligencją',
      pt: 'Faça uma pergunta para nossa documentação inteligente',
      ru: 'Спросите нашу умную документацию',
      tr: 'Yarap Zeka Destekli Akıllı Dokümantasyonumuza Sorun',
      uk: 'Задайте своє питання нашій розумній документації з підтримкою ШІ',
      vi: 'Hãy đặt câu hỏi cho tài liệu thông minh được hỗ trợ bởi AI của chúng tôi.',
      zh: '请向我们的AI智能文档发出问题',
    }),
  },
  title: 'Documentation chat page',
  description:
    'Content declaration for the documentation chat page, where users can interact with AI-powered assistance to ask questions related to documentation.',
  tags: ['documentation', 'chat page', 'AI assistant'],
} satisfies Dictionary;

export default metadataContent;

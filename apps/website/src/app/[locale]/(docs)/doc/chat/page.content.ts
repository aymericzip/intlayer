import { type Dictionary, t } from 'intlayer';
import type { Metadata } from 'next';

const metadataContent = {
  key: 'doc-chat-page',
  content: {
    title: t({
      ar: 'طرح سؤالك لدردشة الوثائق الخاصة بنا AI',
      de: 'Stellen Sie Ihre Frage zu unserer intelligenten Dokumentation',
      en: 'Ask your question to our AI-Powered Smart Documentation',
      'en-GB': 'Ask your question to our AI-Powered Smart Documentation',
      es: 'Pregúntale a nuestra documentación inteligente',
      fr: 'Posez votre question à notre documentation intelligente',
      hi: 'हमारे एआई-पॉयटेड स्मार्ट दस्तावेज़ के लिए अपनी प्रश्न करें',
      it: 'Fai una domanda alla nostra documentazione intelligente',
      ja: '私たちのAIドキュメントに問い合わせる',
      ko: '우리의 AI 스마트 문서에 문의하세요',
      pt: 'Faça uma pergunta para nossa documentação inteligente',
      ru: 'Спросите нашу умную документацию',
      tr: 'Yapay Zeka Destekli Akıllı Dokümantasyonumuza Sorun',
      zh: '请向我们的AI智能文档发出问题',
      pl: 'Zadaj swoje pytanie naszej inteligentnej dokumentacji zasilanej sztuczną inteligencją',
      id: 'Ajukan pertanyaan Anda ke Smart Documentation bertenaga AI kami',
      vi: 'Hãy đặt câu hỏi cho tài liệu thông minh được hỗ trợ bởi AI của chúng tôi.',
      uk: 'Задайте своє питання нашій розумній документації з підтримкою ШІ',
    }),
  },
  title: 'Documentation chat page',
  description:
    'Content declaration for the documentation chat page, where users can interact with AI-powered assistance to ask questions related to documentation.',
  tags: ['documentation', 'chat page', 'AI assistant'],
} satisfies Dictionary<Metadata>;

export default metadataContent;

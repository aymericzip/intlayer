import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const metadataContent = {
  key: 'doc-chat-page',
  content: {
    title: t({
      en: 'Ask your question to our AI-Powered Smart Documentation',
      'en-GB': 'Ask your question to our AI-Powered Smart Documentation',
      fr: 'Posez votre question à notre documentation intelligente',
      es: 'Pregúntale a nuestra documentación inteligente',
      de: 'Stellen Sie Ihre Frage zu unserer intelligenten Dokumentation',
      ja: '私たちのAIドキュメントに問い合わせる',
      ko: '우리의 AI 스마트 문서에 문의하세요',
      zh: '请向我们的AI智能文档发出问题',
      it: 'Fai una domanda alla nostra documentazione intelligente',
      pt: 'Faça uma pergunta para nossa documentação inteligente',
      hi: 'हमारे एआई-पॉयटेड स्मार्ट दस्तावेज़ के लिए अपनी प्रश्न करें',
      ar: 'طرح سؤالك لدردشة الوثائق الخاصة بنا AI',
      ru: 'Спросите нашу умную документацию',
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;

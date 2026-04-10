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
    description: t({
      ar: 'تفاعل مع مساعد التوثيق الذكي المعزز بالذكاء الاصطناعي للحصول على إجابات سريعة والبحث بسهولة.',
      de: 'Interagieren Sie mit unserem KI-gestützten Dokumentationsassistenten, um schnelle Antworten zu erhalten und mühelos zu suchen.',
      en: 'Interact with our AI-powered documentation assistant to get quick answers and search effortlessly.',
      'en-GB':
        'Interact with our AI-powered documentation assistant to get quick answers and search effortlessly.',
      es: 'Interactúa con nuestro asistente de documentación impulsado por IA para obtener respuestas rápidas y buscar sin esfuerzo.',
      fr: 'Interagissez avec notre assistant de documentation propulsé par l’IA pour obtenir des réponses rapides et rechercher sans effort.',
      hi: 'त्वरित उत्तर प्राप्त करने और सहजता से खोजने के लिए हमारे एआई-संचालित दस्तावेज़ीकरण सहायक के साथ बातचीत करें।',
      it: 'Interagisci con il nostro assistente di documentazione basato sull’intelligenza artificiale per ottenere risposte rapide e cercare senza sforzo.',
      ja: '当社のAI搭載ドキュメントアシスタントと対話して、すぐに応答を得て、簡単に検索できます。',
      ko: '당사의 AI 기반 문서 도우미와 상호 작용하여 신속하게 답변을 얻고 손쉽게 검색하십시오.',
      pt: 'Interaja com nosso assistente de documentação alimentado por IA para obter respostas rápidas e pesquisar sem esforço.',
      ru: 'Взаимодействуйте с нашим интеллектуальным помощником на основе ИИ, чтобы получать быстрые ответы и вести легкий поиск.',
      tr: 'Hızlı cevaplar almak ve zahmetsizce arama yapmak için yapay zeka destekli dokümantasyon asistanımızla etkileşime geçin.',
      zh: '与我们的AI驱动文档助手互动，快速获得答案，轻松进行搜索。',
      pl: 'Wejdź w interakcję z naszym asystentem dokumentacji opartym na sztucznej inteligencji, aby uzyskać szybkie odpowiedzi i bezproblemowo przeszukiwać dane.',
      id: 'Berinteraksi dengan asisten dokumentasi kami yang didukung AI untuk mendapatkan jawaban cepat dan mencari dengan mudah.',
      vi: 'Tương tác với trợ lý tài liệu được hỗ trợ bởi AI của chúng tôi để nhận câu trả lời nhanh chóng và tìm kiếm dễ dàng.',
      uk: 'Спілкуйтеся з нашим розумним помічником на базі ШІ, щоб швидко отримувати відповіді та без зусиль вести пошук.',
    }),
  },
  title: 'Documentation chat page',
  description:
    'Content declaration for the documentation chat page, where users can interact with AI-powered assistance to ask questions related to documentation.',
  tags: ['documentation', 'chat page', 'AI assistant'],
} satisfies Dictionary;

export default metadataContent;

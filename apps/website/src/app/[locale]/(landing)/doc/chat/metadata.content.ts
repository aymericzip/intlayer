import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const metadataContent = {
  key: 'doc-chat-metadata',
  content: {
    title: t({
      en: 'Smart Documentation | AI-Powered ChatBot | Intlayer',
      'en-GB': 'Smart Documentation | AI-Powered ChatBot | Intlayer',
      fr: 'Documentation intelligente | ChatBot IA | Intlayer',
      es: 'Documentación inteligente | ChatBot IA | Intlayer',
      de: 'Intelligente Dokumentation | AI-ChatBot | Intlayer',
      ja: 'スマートドキュメント | AI チャットボット | Intlayer',
      ko: '스마트 문서 | AI 채팅 봇 | Intlayer',
      zh: '智能文档 | AI 聊天机器人 | Intlayer',
      it: 'Documentazione intelligente | ChatBot AI | Intlayer',
      pt: 'Documentação Inteligente | ChatBot IA | Intlayer',
      hi: 'स्मार्ट दस्तावेज़ | AI चैट बॉट | Intlayer',
      ar: 'الوثائق الذكية | ChatBot AI | Intlayer',
      ru: 'Умная документация | ИС чат-бот | Intlayer',
    }),
    description: t({
      en: 'Get instant answers with our AI-powered documentation chatbot. Explore interactive guides, troubleshoot issues, and find solutions effortlessly—just ask!',
      'en-GB':
        'Get instant answers with our AI-powered documentation chatbot. Explore interactive guides, troubleshoot issues, and find solutions effortlessly—just ask!',
      fr: "Obtenez des réponses instantanées avec notre chatbot d'assistance en ligne. Explorez les guides interactifs, résolvez les problèmes et trouvez des solutions sans effort—juste demandez !",
      es: 'Obtenga respuestas instantáneas con nuestro chatbot de documentación AI. Explore guías interactivas, solucione problemas y encuentre soluciones sin esfuerzo—¡solo pregúntale!',
      de: 'Erhalten Sie schnelle Antworten mit unserem AI-gesteuerten Dokumentationschatbot. Erkunden Sie interaktive Leitfäden, Probleme beheben und Lösungen finden Sie effizient—nur fragen!',
      ja: '私たちの AI ドキュメントチャットボットを使用して、インタラクティブなガイド、問題の解決、解決策を簡単に取得します。ただし、質問してください！',
      ko: '우리의 AI 개발 문서 채팅 봇을 사용하여 빠르게 직접 답변을 받으세요. 상호 작용 가이드를 탐색하고 문제를 해결하고 해결 방법을 찾으세요. 물어보세요!',
      zh: '使用我们的 AI 驱动的文档聊天机器人获取即时答案。探索交互式指南、排除问题并找到解决方案，只需要问！',
      it: 'Ottieni risposte istantanee con il nostro chatbot di documentazione AI. Esplora guide interattive, risolvi problemi e trova soluzioni in modo efficiente—chiedi solo!',
      pt: 'Obtenha respostas instantâneas com nosso chatbot de documentação AI. Explore guias interativas, resolva problemas e encontre soluções de forma eficiente—apenas pergunte!',
      hi: 'हमारे AI प्लग किए गए दस्तावेज़ चैटबॉट के साथ तुरंत उत्तर देने के लिए आपको कोई भी पूछें!',
      ar: 'احصل على إجابات فورية مع دردشة الوثائق الخاصة بنا AI. استكشف دليلات تفاعلية، حل المشاكل والعثور على حلول بسهولة— سواء تسأل!',
      ru: 'Получите мгновенные ответы с нашего AI-поддерживаемого чат-бота документации. Исследуйте интерактивные руководства, устраняйте проблемы и найдите решения без усилий—просто спросите!',
    }),

    keywords: t<string[]>({
      en: ['chatbot', 'AI', 'smart', 'documentation', 'intlayer'],
      'en-GB': ['chatbot', 'AI', 'smart', 'documentation', 'intlayer'],
      fr: ['chatbot', 'IA', 'intelligent', 'documentation', 'intlayer'],
      es: ['chatbot', 'IA', 'inteligente', 'documentación', 'intlayer'],
      de: ['Chatbot', 'AI', 'intelligent', 'Dokumentation', 'intlayer'],
      ja: ['チャットボット', 'AI', 'スマート', 'ドキュメント', 'intlayer'],
      ko: ['채팅 봇', 'AI', '스마트', '문서', 'intlayer'],
      zh: ['聊天机器人', 'AI', '智能', '文档', 'intlayer'],
      it: ['chatbot', 'IA', 'intelligente', 'documentazione', 'intlayer'],
      pt: ['chatbot', 'IA', 'inteligente', 'documentação', 'intlayer'],
      hi: ['चैटबॉट', 'AI', 'स्मार्ट', 'दस्तावेज़', 'intlayer'],
      ar: ['الدردشة', 'AI', 'ذكي', 'وثائق', 'intlayer'],
      ru: ['чат-бот', 'AI', 'умный', 'документация', 'intlayer'],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;

import { t, type Dictionary } from 'intlayer';

const chatFormSectionContent = {
  key: 'chat',
  content: {
    firstMessageContent: {
      role: 'system',
      content: t({
        en: "Hey! Ask me anything and I'll try to answer it.",
        'en-GB': "Hey! Ask me anything and I'll try to answer it.",
        fr: 'Hey! Posez-moi quelque chose et je vais répondre.',
        es: '¡Hola! Pregúntame algo y te ayudaré.',
        de: 'Hallo! Stell mir irgendwas und ich werde es beantworten.',
        ja: 'こんにちは！お好きなものを聞いてください。',
        ko: '안녕하세요! 무엇을 물어보세요.',
        zh: '你好！问我任何事情，我会尽力回答。',
        it: 'Ciao! Fai qualcosa e ti aiuterò.',
        pt: 'Olá! Faça uma pergunta e eu responderei.',
        hi: 'नमस्ते! कुछ प्रश्न करें और मुझे उत्तर देंगे।',
        ar: 'مرحبا! اسمح لي بسؤال وسأقوم بالإجابة.',
        ru: 'Привет! Спросите меня что-нибудь и я помогу тебе.',
      }),
    },
  },
} satisfies Dictionary;

export default chatFormSectionContent;

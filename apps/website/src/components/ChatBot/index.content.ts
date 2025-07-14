import { md, t, type Dictionary } from 'intlayer';

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
    rateLimitExceededMessage: t({
      en: md(
        'The number of requests is limited for unauthenticated users. Please try again later, or [sign in](https://intlayer.org/login) to increase your limit.'
      ),
      'en-GB': md(
        'The number of requests is limited for unauthenticated users. Please try again later, or [sign in](https://intlayer.org/login) to increase your limit.'
      ),
      fr: md(
        'Le nombre de requêtes est limité pour les utilisateurs non authentifiés. Veuillez réessayer plus tard, ou [connectez-vous](https://intlayer.org/login) pour augmenter votre limite.'
      ),
      es: md(
        'El número de solicitudes está limitado para usuarios no autenticados. Por favor, inténtelo de nuevo más tarde, o [inicie sesión](https://intlayer.org/login) para aumentar su límite.'
      ),
      de: md(
        'Die Anzahl der Anfragen ist für nicht authentifizierte Benutzer begrenzt. Bitte versuchen Sie es später erneut, oder [melden Sie sich](https://intlayer.org/login) an, um Ihre Begrenzung zu erhöhen.'
      ),
      ja: md(
        '非認証ユーザーのリクエスト数は制限されています。後でもう一度お試しください、または[ログイン](https://intlayer.org/login)して制限を増やしてください。'
      ),
      ko: md(
        '인증되지 않은 사용자의 요청 수는 제한되어 있습니다. 나중에 다시 시도하거나 [로그인](https://intlayer.org/login)하여 제한을 늘리세요.'
      ),
      zh: md(
        '未认证用户的请求数有限。请稍后再试，或[登录](https://intlayer.org/login)以增加您的限制。'
      ),
      it: md(
        'Il numero di richieste è limitato per gli utenti non autenticati. Per favore, riprova più tardi, o [accedi](https://intlayer.org/login) per aumentare il limite.'
      ),
      pt: md(
        'O número de solicitações é limitado para usuários não autenticados. Por favor, tente novamente mais tarde, ou [faça login](https://intlayer.org/login) para aumentar seu limite.'
      ),
      hi: md(
        'अनुमोदित उपयोगकर्ताओं के लिए अनुरोधों की संख्या सीमित है। कृपया बाद में पुनः प्रयास करें, या [लॉग इन](https://intlayer.org/login) करके सीमा बढ़ाएं।'
      ),
      ar: md(
        'عدد الطلبات محدود للمستخدمين غير المصرح لهم. يرجى المحاولة مرة أخرى لاحقًا، أو [تسجيل الدخول](https://intlayer.org/login) لزيادة الحد.'
      ),
      ru: md(
        'Количество запросов ограничено для неавторизованных пользователей. Пожалуйста, попробуйте снова позже, или [войдите](https://intlayer.org/login) для увеличения лимита.'
      ),
    }),
  },
} satisfies Dictionary;

export default chatFormSectionContent;

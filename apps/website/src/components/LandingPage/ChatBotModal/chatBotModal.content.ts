import { t, type Dictionary } from 'intlayer';

const chatbotContent = {
  key: 'chatbot-modal',
  content: {
    button: {
      label: t({
        en: 'Click to open the chatbot',
        'en-GB': 'Click to open the chatbot',
        fr: 'Cliquez pour ouvrir le chatbot',
        es: 'Haga clic para abrir el chatbot',
        de: 'Klicken Sie, um den Chatbot zu öffnen',
        ja: 'チャットボットを開くにはクリックしてください',
        ko: '챗봇을 열려면 클릭하세요',
        zh: '点击打开聊天机器人',
        it: 'Clicca per aprire il chatbot',
        pt: 'Clique para abrir o chatbot',
        hi: 'चैटबॉट को खोलने के लिए क्लिक करें',
        ar: 'انقر لفتح الدردشة',
        ru: 'Нажмите, чтобы открыть чат-бота',
        tr: 'Sohbet botunu açmak için tıklayın',
      }),
    },
    title: t({
      fr: 'Posez votre question',
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
      tr: 'Herhangi bir şey sor',
    }),
  },
} satisfies Dictionary;

export default chatbotContent;

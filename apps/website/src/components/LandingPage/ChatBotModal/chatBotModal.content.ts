import { type Dictionary, t } from 'intlayer';

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
        pl: 'Kliknij, aby otworzyć chatbota',
        id: 'Klik untuk membuka chatbot',
        vi: 'Nhấn để mở chatbot',
      }),
    },
    title: t({
      ar: 'طرح أي شيء',
      de: 'Frage jedenfalls',
      en: 'Ask anything',
      'en-GB': 'Ask anything',
      es: 'Pregunta cualquier cosa',
      fr: 'Posez votre question',
      hi: 'कुछ प्रश्न करें',
      it: 'Chiedi qualsiasi cosa',
      ja: 'どうぞお好きなものを聞いてください',
      ko: '무엇을 물어보세요',
      pt: 'Faça uma pergunta',
      ru: 'Спросите что-нибудь',
      tr: 'Herhangi bir şey sor',
      zh: '问任何事情',
      pl: 'Zapytaj o cokolwiek',
      id: 'Tanyakan apa saja',
      vi: 'Hỏi bất cứ điều gì',
    }),
  },
  title: 'Chatbot modal content',
  description:
    'Content declaration for the chatbot modal on the landing page, including the button label and title used to prompt user interaction.',
  tags: ['landing page', 'chatbot', 'modal'],
} satisfies Dictionary;

export default chatbotContent;

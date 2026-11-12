import { type Dictionary, t } from 'intlayer';

const chatbotContent = {
  key: 'chatbot-modal',
  content: {
    button: {
      label: t({
        en: 'Click to open the chatbot',
        ar: 'انقر لفتح الدردشة',
        de: 'Klicken Sie, um den Chatbot zu öffnen',
        'en-GB': 'Click to open the chatbot',
        es: 'Haga clic para abrir el chatbot',
        fr: 'Cliquez pour ouvrir le chatbot',
        'he-IL': "לחצו לפתיחת הצ'אטבוט",
        hi: 'चैटबॉट को खोलने के लिए क्लिक करें',
        id: 'Klik untuk membuka chatbot',
        it: 'Clicca per aprire il chatbot',
        ja: 'チャットボットを開くにはクリックしてください',
        ko: '챗봇을 열려면 클릭하세요',
        pl: 'Kliknij, aby otworzyć chatbota',
        pt: 'Clique para abrir o chatbot',
        ru: 'Нажмите, чтобы открыть чат-бота',
        tr: 'Sohbet botunu açmak için tıklayın',
        uk: 'Натисніть, щоб відкрити чат-бота',
        vi: 'Nhấn để mở chatbot',
        zh: '点击打开聊天机器人',
      }),
    },
    title: t({
      en: 'Ask anything',
      ar: 'طرح أي شيء',
      de: 'Frage jedenfalls',
      'en-GB': 'Ask anything',
      es: 'Pregunta cualquier cosa',
      fr: 'Posez votre question',
      'he-IL': 'שאלו כל דבר',
      hi: 'कुछ प्रश्न करें',
      id: 'Tanyakan apa saja',
      it: 'Chiedi qualsiasi cosa',
      ja: 'どうぞお好きなものを聞いてください',
      ko: '무엇을 물어보세요',
      pl: 'Zapytaj o cokolwiek',
      pt: 'Faça uma pergunta',
      ru: 'Спросите что-нибудь',
      tr: 'Herhangi bir şey sor',
      uk: 'Задавайте будь-які питання',
      vi: 'Hỏi bất cứ điều gì',
      zh: '问任何事情',
    }),
  },
  title: 'Chatbot modal content',
  description:
    'Content declaration for the chatbot modal on the landing page, including the button label and title used to prompt user interaction.',
  tags: ['landing page', 'chatbot', 'modal'],
} satisfies Dictionary;

export default chatbotContent;

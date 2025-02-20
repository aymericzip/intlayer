import { t, type Dictionary } from 'intlayer';

const markdownSectionContent = {
  key: 'autocompletion-section',
  title: 'Autocompletion',
  content: {
    input: t({
      en: 'Dear customer,\n\nI am writing to you ',
      'en-GB': 'Dear customer,\n\nI am writing to you ',
      fr: 'Cher client,\n\nJe vous écris ',
      es: 'Estimado cliente,\n\nEstoy escribiendo a usted ',
      de: 'Sehr geehrte Kundin,\n\nIch schreibe Ihnen ',
      it: 'Caro cliente,\n\nSto scrivendo a te ',
      pt: 'Caro cliente,\n\nEstou escrevendo para você ',
      ru: 'Дорогой клиент,\n\nЯ напишу вам ',
      zh: '您好，我是写给您的 ',
      ja: 'お客様さん、\n\nこんにちは。私はあなたに書きます ',
      ar: 'عزيز العملاء،\n\nأنا أريد كتابة لك ',
      hi: 'धन्यवाद, मैंने आपको ',
      ko: '사용자님,\n\n안녕하세요. 나는 당신에게 ',
    }),
    suggestion: t({
      en: 'to confirm your order',
      'en-GB': 'to confirm your order',
      fr: 'pour confirmer votre commande',
      es: 'para confirmar su pedido',
      de: 'um Bestellung zu bestätigen',
      it: 'per confermare il tuo ordine',
      pt: 'para confirmar o seu pedido',
      ru: 'для подтверждения вашего заказа',
      zh: '确认您的订单',
      ja: 'お客様の注文を確認する',
      ar: 'لتأكيد طلبك',
      hi: 'आपके आदेश की पुष्टि करने के लिए',
      ko: '당신의 주문을 확인하려면',
    }),
  },
} satisfies Dictionary;

export default markdownSectionContent;

import { type Dictionary, t } from 'intlayer';

const referralLinkContent = {
  key: 'referral-link',

  content: {
    shareThisLinkWhenSomeone: t({
      en: 'Share this link. When someone subscribes via your link, you earn a commission.',
      ar: 'شارك هذا الرابط. عندما يشترك شخص ما عبر رابطك، تكسب عمولة.',
      de: 'Teilen Sie diesen Link. Wenn jemand über Ihren Link ein Abonnement abschließt, erhalten Sie eine Provision.',
      'en-GB':
        'Share this link. When someone subscribes via your link, you earn a commission.',
      es: 'Comparte este enlace. Cuando alguien se suscribe a través de tu enlace, ganas una comisión.',
      fr: "Partagez ce lien. Lorsqu'une personne s'abonne via votre lien, vous gagnez une commission.",
      'he-IL':
        'שתפו את הקישור הזה. כשמישהו נרשם למנוי דרך הקישור שלכם, אתם מרוויחים עמלה.',
      hi: 'इस लिंक को साझा करें। जब कोई आपके लिंक के माध्यम से सदस्यता लेता है, तो आपको कमीशन मिलता है।',
      id: 'Bagikan tautan ini. Ketika seseorang berlangganan melalui tautan Anda, Anda mendapatkan komisi.',
      it: 'Condividi questo link. Quando qualcuno si iscrive tramite il tuo link, guadagni una commissione.',
      ja: 'このリンクを共有してください。誰かがあなたのリンク経由で登録すると、あなたに報酬が入ります。',
      ko: '이 링크를 공유하세요. 이 링크를 통해 누군가 구독하면 수수료를 적립합니다.',
      pl: 'Udostępnij ten link. Gdy ktoś zapisze się korzystając z Twojego linku, otrzymujesz prowizję.',
      pt: 'Compartilhe este link. Quando alguém se inscrever através do seu link, você ganha uma comissão.',
      ru: 'Поделитесь этой ссылкой. Когда кто-то подпишется по вашей ссылке, вы заработаете комиссию.',
      tr: 'Bu bağlantıyı paylaşın. Birisi bağlantınız üzerinden abone olursa komisyon kazanırsınız.',
      uk: 'Поділіться цим посиланням. Коли хтось підписується через ваше посилання, ви отримуєте комісію.',
      vi: 'Chia sẻ liên kết này. Khi ai đó đăng ký qua liên kết của bạn, bạn sẽ nhận được hoa hồng.',
      zh: '分享此链接。有人通过您的链接订阅时，您将获得佣金。',
    }),
    yourReferralLink: t({
      en: 'Your referral link',
      ar: 'رابط الإحالة الخاص بك',
      de: 'Ihr Empfehlungslink',
      'en-GB': 'Your referral link',
      es: 'Tu enlace de referido',
      fr: 'Votre lien de parrainage',
      'he-IL': 'קישור ההפניה שלכם',
      hi: 'आपका रेफ़रल लिंक',
      id: 'Tautan rujukan Anda',
      it: 'Il tuo link di affiliazione',
      ja: 'あなたの紹介リンク',
      ko: '추천 링크',
      pl: 'Twój link polecający',
      pt: 'Seu link de referência',
      ru: 'Ваша реферальная ссылка',
      tr: 'Referans bağlantınız',
      uk: 'Ваше реферальне посилання',
      vi: 'Liên kết giới thiệu của bạn',
      zh: '您的推荐链接',
    }),
  },

  title: 'Referral link',
  description:
    "Content for the referral link component on the Affiliate page; provides the user's referral link label and sharing instructions for earning commissions.",
  tags: ['affiliate', 'referral', 'component'],
} satisfies Dictionary;

export default referralLinkContent;

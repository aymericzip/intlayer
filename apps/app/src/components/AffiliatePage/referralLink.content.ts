import { type Dictionary, t } from 'intlayer';

const referralLinkContent = {
  key: 'referral-link',

  content: {
    yourReferralLink: t({
      en: 'Your referral link',
      ru: 'Ваша реферальная ссылка',
      ja: 'あなたの紹介リンク',
      fr: 'Votre lien de parrainage',
      ko: '추천 링크',
      zh: '您的推荐链接',
      es: 'Tu enlace de referido',
      de: 'Ihr Empfehlungslink',
      ar: 'رابط الإحالة الخاص بك',
      it: 'Il tuo link di affiliazione',
      'en-GB': 'Your referral link',
      pt: 'Seu link de referência',
      hi: 'आपका रेफ़रल लिंक',
      tr: 'Referans bağlantınız',
      pl: 'Twój link polecający',
      id: 'Tautan rujukan Anda',
      vi: 'Liên kết giới thiệu của bạn',
      uk: 'Ваше реферальне посилання',
    }),

    shareThisLinkWhenSomeone: t({
      en: 'Share this link. When someone subscribes via your link, you earn a commission.',
      ru: 'Поделитесь этой ссылкой. Когда кто-то подпишется по вашей ссылке, вы заработаете комиссию.',
      ja: 'このリンクを共有してください。誰かがあなたのリンク経由で登録すると、あなたに報酬が入ります。',
      fr: "Partagez ce lien. Lorsqu'une personne s'abonne via votre lien, vous gagnez une commission.",
      ko: '이 링크를 공유하세요. 이 링크를 통해 누군가 구독하면 수수료를 적립합니다.',
      zh: '分享此链接。有人通过您的链接订阅时，您将获得佣金。',
      es: 'Comparte este enlace. Cuando alguien se suscribe a través de tu enlace, ganas una comisión.',
      de: 'Teilen Sie diesen Link. Wenn jemand über Ihren Link ein Abonnement abschließt, erhalten Sie eine Provision.',
      ar: 'شارك هذا الرابط. عندما يشترك شخص ما عبر رابطك، تكسب عمولة.',
      it: 'Condividi questo link. Quando qualcuno si iscrive tramite il tuo link, guadagni una commissione.',
      'en-GB':
        'Share this link. When someone subscribes via your link, you earn a commission.',
      pt: 'Compartilhe este link. Quando alguém se inscrever através do seu link, você ganha uma comissão.',
      hi: 'इस लिंक को साझा करें। जब कोई आपके लिंक के माध्यम से सदस्यता लेता है, तो आपको कमीशन मिलता है।',
      tr: 'Bu bağlantıyı paylaşın. Birisi bağlantınız üzerinden abone olursa komisyon kazanırsınız.',
      pl: 'Udostępnij ten link. Gdy ktoś zapisze się korzystając z Twojego linku, otrzymujesz prowizję.',
      id: 'Bagikan tautan ini. Ketika seseorang berlangganan melalui tautan Anda, Anda mendapatkan komisi.',
      vi: 'Chia sẻ liên kết này. Khi ai đó đăng ký qua liên kết của bạn, bạn sẽ nhận được hoa hồng.',
      uk: 'Поділіться цим посиланням. Коли хтось підписується через ваше посилання, ви отримуєте комісію.',
    }),
  },

  title: 'Referral link',
  description:
    "Content for the referral link component on the Affiliate page; provides the user's referral link label and sharing instructions for earning commissions.",
  tags: ['affiliate', 'referral', 'component'],
} satisfies Dictionary;

export default referralLinkContent;

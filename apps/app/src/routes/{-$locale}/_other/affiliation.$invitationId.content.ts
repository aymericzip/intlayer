import { type Dictionary, t } from 'intlayer';

const affiliationInvitationContent = {
  key: 'affiliation-invitation-page',
  content: {
    metadata: {
      description: t({
        en: 'Accept your Intlayer affiliate program invitation.',
        ar: 'اقبل دعوتك لبرنامج الشركاء التابعين لـ Intlayer.',
        de: 'Nehmen Sie Ihre Einladung zum Intlayer-Partnerprogramm an.',
        'en-GB': 'Accept your Intlayer affiliate program invitation.',
        es: 'Acepte su invitación al programa de afiliados de Intlayer.',
        fr: "Acceptez votre invitation au programme d'affiliation Intlayer.",
        'he-IL': 'קבלו את ההזמנה שלכם לתוכנית השותפים של Intlayer.',
        hi: 'अपना Intlayer संबद्ध कार्यक्रम निमंत्रण स्वीकार करें।',
        id: 'Terima undangan program afiliasi Intlayer Anda.',
        it: 'Accetta il tuo invito al programma di affiliazione Intlayer.',
        ja: 'Intlayerアフィリエイトプログラムへの招待を承諾します。',
        ko: 'Intlayer 제휴 프로그램 초대를 수락하세요.',
        pl: 'Zaakceptuj zaproszenie do programu partnerskiego Intlayer.',
        pt: 'Aceite seu convite para o programa de afiliados da Intlayer.',
        ru: 'Примите приглашение в партнерскую программу Intlayer.',
        tr: 'Intlayer ortaklık programı davetinizi kabul edin.',
        uk: 'Прийміть запрошення до партнерської програми Intlayer.',
        vi: 'Chấp nhận lời mời tham gia chương trình liên kết Intlayer của bạn.',
        zh: '接受您的 Intlayer 联盟计划邀请。',
      }),
      title: t({
        en: 'Affiliate Invitation — Intlayer',
        ar: 'دعوة الشريك — Intlayer',
        de: 'Partner-Einladung — Intlayer',
        'en-GB': 'Affiliate Invitation — Intlayer',
        es: 'Invitación de afiliado — Intlayer',
        fr: "Invitation d'affiliation — Intlayer",
        'he-IL': 'הזמנת שותף — Intlayer',
        hi: 'संबद्ध निमंत्रण — Intlayer',
        id: 'Undangan Afiliasi — Intlayer',
        it: 'Invito affiliato — Intlayer',
        ja: 'アフィリエイト招待 — Intlayer',
        ko: '제휴 초대 — Intlayer',
        pl: 'Zaproszenie partnerskie — Intlayer',
        pt: 'Convite de Afiliado — Intlayer',
        ru: 'Приглашение партнёра — Intlayer',
        tr: 'Ortaklık Daveti — Intlayer',
        uk: 'Запрошення партнера — Intlayer',
        vi: 'Lời mời đại lý — Intlayer',
        zh: '联盟邀请 — Intlayer',
      }),
    },
  },
  title: 'Affiliation invitation page content',
  description:
    'Metadata for the affiliation invitation page, including title and description to support SEO and multilingual optimization.',
  tags: ['affiliation', 'invitation', 'page metadata'],
} satisfies Dictionary;

export default affiliationInvitationContent;

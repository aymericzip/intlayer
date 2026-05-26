import { type Dictionary, t } from 'intlayer';

const affiliationInvitationContent = {
  key: 'affiliation-invitation-page',
  content: {
    metadata: {
      title: t({
        en: 'Affiliate Invitation — Intlayer',
        'en-GB': 'Affiliate Invitation — Intlayer',
        fr: "Invitation d'affiliation — Intlayer",
        es: 'Invitación de afiliado — Intlayer',
        de: 'Partner-Einladung — Intlayer',
        ja: 'アフィリエイト招待 — Intlayer',
        ko: '제휴 초대 — Intlayer',
        zh: '联盟邀请 — Intlayer',
        it: 'Invito affiliato — Intlayer',
        pt: 'Convite de Afiliado — Intlayer',
        hi: 'संबद्ध निमंत्रण — Intlayer',
        ar: 'دعوة الشريك — Intlayer',
        ru: 'Приглашение партнёра — Intlayer',
        tr: 'Ortaklık Daveti — Intlayer',
        pl: 'Zaproszenie partnerskie — Intlayer',
        id: 'Undangan Afiliasi — Intlayer',
        vi: 'Lời mời đại lý — Intlayer',
        uk: 'Запрошення партнера — Intlayer',
      }),
      description: t({
        en: 'Accept your Intlayer affiliate program invitation.',
        'en-GB': 'Accept your Intlayer affiliate program invitation.',
        fr: "Acceptez votre invitation au programme d'affiliation Intlayer.",
        es: 'Acepte su invitación al programa de afiliados de Intlayer.',
        de: 'Nehmen Sie Ihre Einladung zum Intlayer-Partnerprogramm an.',
        ja: 'Intlayerアフィリエイトプログラムへの招待を承諾します。',
        ko: 'Intlayer 제휴 프로그램 초대를 수락하세요.',
        zh: '接受您的 Intlayer 联盟计划邀请。',
        it: 'Accetta il tuo invito al programma di affiliazione Intlayer.',
        pt: 'Aceite seu convite para o programa de afiliados da Intlayer.',
        hi: 'अपना Intlayer संबद्ध कार्यक्रम निमंत्रण स्वीकार करें।',
        ar: 'اقبل دعوتك لبرنامج الشركاء التابعين لـ Intlayer.',
        ru: 'Примите приглашение в партнерскую программу Intlayer.',
        tr: 'Intlayer ortaklık programı davetinizi kabul edin.',
        pl: 'Zaakceptuj zaproszenie do programu partnerskiego Intlayer.',
        id: 'Terima undangan program afiliasi Intlayer Anda.',
        vi: 'Chấp nhận lời mời tham gia chương trình liên kết Intlayer của bạn.',
        uk: 'Прийміть запрошення до партнерської програми Intlayer.',
      }),
    },
  },
  title: 'Affiliation invitation page content',
  description:
    'Metadata for the affiliation invitation page, including title and description to support SEO and multilingual optimization.',
  tags: ['affiliation', 'invitation', 'page metadata'],
} satisfies Dictionary;

export default affiliationInvitationContent;

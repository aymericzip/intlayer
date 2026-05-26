import { type Dictionary, t } from 'intlayer';

const affiliationContent = {
  key: 'affiliation-page',
  content: {
    metadata: {
      title: t({
        en: 'Affiliate Dashboard — Intlayer',
        'en-GB': 'Affiliate Dashboard — Intlayer',
        fr: "Tableau de bord d'affiliation — Intlayer",
        es: 'Panel de afiliados — Intlayer',
        de: 'Partner-Dashboard — Intlayer',
        ja: 'アフィリエイトダッシュボード — Intlayer',
        ko: '제휴 대시보드 — Intlayer',
        zh: '联盟仪表板 — Intlayer',
        it: 'Dashboard affiliato — Intlayer',
        pt: 'Painel de Afiliados — Intlayer',
        hi: 'संबद्ध डैशबोर्ड — Intlayer',
        ar: 'لوحة معلومات الشريك — Intlayer',
        ru: 'Панель партнёра — Intlayer',
        tr: 'Ortaklık Kontrol Paneli — Intlayer',
        pl: 'Panel partnerski — Intlayer',
        id: 'Dasbor Afiliasi — Intlayer',
        vi: 'Trang tổng quan đại lý — Intlayer',
        uk: 'Панель партнера — Intlayer',
      }),
      description: t({
        en: 'Manage your Intlayer affiliate account, track referrals and commissions.',
        'en-GB':
          'Manage your Intlayer affiliate account, track referrals and commissions.',
        fr: "Gerez votre compte d'affiliation Intlayer, suivez vos parrainages et vos commissions.",
        es: 'Gestione su cuenta de afiliados de Intlayer, realice un seguimiento de las recomendaciones y comisiones.',
        de: 'Verwalten Sie Ihr Intlayer-Partnerkonto, verfolgen Sie Empfehlungen und Provisionen.',
        ja: 'Intlayerアフィリエイトアカウントを管理し、紹介やコミッションを追跡します。',
        ko: 'Intlayer 제휴 계정을 관리하고 추천 및 수수료를 추적하세요.',
        zh: '管理您的 Intlayer 联盟账户，跟踪推荐和佣金。',
        it: 'Gestisci il tuo account affiliato Intlayer, traccia le segnalazioni e le commissioni.',
        pt: 'Gerencie sua conta de afiliado Intlayer, rastreie indicacoes e comissoes.',
        hi: 'अपने Intlayer संबद्ध खाते का प्रबंधन करें, रेफ़रल और कमीशन ट्रैक करें।',
        ar: 'إدارة حساب الشريك الخاص بك في Intlayer، وتتبع الإحالات والعمولات.',
        ru: 'Управляйте своим партнерским аккаунтом Intlayer, отслеживайте рефералов и комиссионные.',
        tr: 'Intlayer ortaklık hesabınızı yönetin, yönlendirmeleri ve komisyonları takip edin.',
        pl: 'Zarzadzaj swoim kontem partnerskim Intlayer, sledz polecenia i prowizje.',
        id: 'Kelola akun afiliasi Intlayer Anda, lacak rujukan dan komisi.',
        vi: 'Quản lý tài khoản liên kết Intlayer của bạn, theo dõi các giới thiệu và hoa hồng.',
        uk: 'Керуйте своїм партнерським обліковим записом Intlayer, відстежуйте рефералів та комісійні.',
      }),
    },
  },
  title: 'Affiliation page content',
  description:
    'Metadata for the affiliation page, including title and description to support SEO and multilingual optimization.',
  tags: ['affiliation', 'page metadata'],
} satisfies Dictionary;

export default affiliationContent;

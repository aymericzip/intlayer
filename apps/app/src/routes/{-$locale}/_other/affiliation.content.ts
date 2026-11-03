import { type Dictionary, t } from 'intlayer';

const affiliationContent = {
  key: 'affiliation-page',
  content: {
    metadata: {
      description: t({
        en: 'Manage your Intlayer affiliate account, track referrals and commissions.',
        ar: 'إدارة حساب الشريك الخاص بك في Intlayer، وتتبع الإحالات والعمولات.',
        de: 'Verwalten Sie Ihr Intlayer-Partnerkonto, verfolgen Sie Empfehlungen und Provisionen.',
        'en-GB':
          'Manage your Intlayer affiliate account, track referrals and commissions.',
        es: 'Gestione su cuenta de afiliados de Intlayer, realice un seguimiento de las recomendaciones y comisiones.',
        fr: "Gerez votre compte d'affiliation Intlayer, suivez vos parrainages et vos commissions.",
        'he-IL': 'נהלו את חשבון השותף שלכם ב-Intlayer, עקבו אחר הפניות ועמלות.',
        hi: 'अपने Intlayer संबद्ध खाते का प्रबंधन करें, रेफ़रल और कमीशन ट्रैक करें।',
        id: 'Kelola akun afiliasi Intlayer Anda, lacak rujukan dan komisi.',
        it: 'Gestisci il tuo account affiliato Intlayer, traccia le segnalazioni e le commissioni.',
        ja: 'Intlayerアフィリエイトアカウントを管理し、紹介やコミッションを追跡します。',
        ko: 'Intlayer 제휴 계정을 관리하고 추천 및 수수료를 추적하세요.',
        pl: 'Zarzadzaj swoim kontem partnerskim Intlayer, sledz polecenia i prowizje.',
        pt: 'Gerencie sua conta de afiliado Intlayer, rastreie indicacoes e comissoes.',
        ru: 'Управляйте своим партнерским аккаунтом Intlayer, отслеживайте рефералов и комиссионные.',
        tr: 'Intlayer ortaklık hesabınızı yönetin, yönlendirmeleri ve komisyonları takip edin.',
        uk: 'Керуйте своїм партнерським обліковим записом Intlayer, відстежуйте рефералів та комісійні.',
        vi: 'Quản lý tài khoản liên kết Intlayer của bạn, theo dõi các giới thiệu và hoa hồng.',
        zh: '管理您的 Intlayer 联盟账户，跟踪推荐和佣金。',
      }),
      title: t({
        en: 'Affiliate Dashboard — Intlayer',
        ar: 'لوحة معلومات الشريك — Intlayer',
        de: 'Partner-Dashboard — Intlayer',
        'en-GB': 'Affiliate Dashboard — Intlayer',
        es: 'Panel de afiliados — Intlayer',
        fr: "Tableau de bord d'affiliation — Intlayer",
        'he-IL': 'לוח הבקרה של השותפים — Intlayer',
        hi: 'संबद्ध डैशबोर्ड — Intlayer',
        id: 'Dasbor Afiliasi — Intlayer',
        it: 'Dashboard affiliato — Intlayer',
        ja: 'アフィリエイトダッシュボード — Intlayer',
        ko: '제휴 대시보드 — Intlayer',
        pl: 'Panel partnerski — Intlayer',
        pt: 'Painel de Afiliados — Intlayer',
        ru: 'Панель партнёра — Intlayer',
        tr: 'Ortaklık Kontrol Paneli — Intlayer',
        uk: 'Панель партнера — Intlayer',
        vi: 'Trang tổng quan đại lý — Intlayer',
        zh: '联盟仪表板 — Intlayer',
      }),
    },
  },
  title: 'Affiliation page content',
  description:
    'Metadata for the affiliation page, including title and description to support SEO and multilingual optimization.',
  tags: ['affiliation', 'page metadata'],
} satisfies Dictionary;

export default affiliationContent;

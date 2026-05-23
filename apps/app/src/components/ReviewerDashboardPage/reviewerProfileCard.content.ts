import { type Dictionary, t } from 'intlayer';

const reviewerProfileCardContent = {
  key: 'reviewer-profile-card',
  content: {
    cover: t({
      en: "Cover"
    }),

    reviewer: t({
      en: "Reviewer"
    }),

    service: t({
      en: "Service"
    }),

    active: t({
      en: "Active"
    }),

    pending: t({
      en: "Pending"
    }),

    categories: t({
      en: "Categories"
    }),

    languages: t({
      en: "Languages"
    }),

    recentReviews: t({
      en: "Recent reviews"
    }),

    socials: t({
      en: 'Social links',
      fr: 'Liens sociaux',
      es: 'Redes sociales',
      'en-GB': 'Social links',
      de: 'Soziale Links',
      ja: 'ソーシャルリンク',
      ko: '소셜 링크',
      zh: '社交链接',
      it: 'Link social',
      pt: 'Links sociais',
      hi: 'सोशल लिंक',
      ar: 'روابط التواصل',
      ru: 'Социальные сети',
      tr: 'Sosyal bağlantılar',
      pl: 'Linki społecznościowe',
      id: 'Tautan sosial',
      vi: 'Liên kết mạng xã hội',
      uk: 'Соціальні мережі',
    }),
    githubAriaLabel: t({
      en: 'GitHub profile',
      fr: 'Profil GitHub',
      es: 'Perfil de GitHub',
      'en-GB': 'GitHub profile',
      de: 'GitHub-Profil',
      ja: 'GitHubプロフィール',
      ko: 'GitHub 프로필',
      zh: 'GitHub 个人主页',
      it: 'Profilo GitHub',
      pt: 'Perfil GitHub',
      hi: 'GitHub प्रोफ़ाइल',
      ar: 'ملف GitHub',
      ru: 'Профиль GitHub',
      tr: 'GitHub profili',
      pl: 'Profil GitHub',
      id: 'Profil GitHub',
      vi: 'Hồ sơ GitHub',
      uk: 'Профіль GitHub',
    }),
    linkedinAriaLabel: t({
      en: 'LinkedIn profile',
      fr: 'Profil LinkedIn',
      es: 'Perfil de LinkedIn',
      'en-GB': 'LinkedIn profile',
      de: 'LinkedIn-Profil',
      ja: 'LinkedInプロフィール',
      ko: 'LinkedIn 프로필',
      zh: 'LinkedIn 个人主页',
      it: 'Profilo LinkedIn',
      pt: 'Perfil LinkedIn',
      hi: 'LinkedIn प्रोफ़ाइल',
      ar: 'ملف LinkedIn',
      ru: 'Профиль LinkedIn',
      tr: 'LinkedIn profili',
      pl: 'Profil LinkedIn',
      id: 'Profil LinkedIn',
      vi: 'Hồ sơ LinkedIn',
      uk: 'Профіль LinkedIn',
    }),
    portfolioAriaLabel: t({
      en: 'Portfolio',
      fr: 'Portfolio',
      es: 'Portafolio',
      'en-GB': 'Portfolio',
      de: 'Portfolio',
      ja: 'ポートフォリオ',
      ko: '포트폴리오',
      zh: '作品集',
      it: 'Portfolio',
      pt: 'Portfólio',
      hi: 'पोर्टफोलियो',
      ar: 'معرض الأعمال',
      ru: 'Портфолио',
      tr: 'Portfolyo',
      pl: 'Portfolio',
      id: 'Portofolio',
      vi: 'Danh mục',
      uk: 'Портфоліо',
    }),
  },
} satisfies Dictionary;

export default reviewerProfileCardContent;

import { GithubRoutes, PagesRoutes } from '@/Routes';
import { BlogData } from '@components/BlogPage/types';
import { t, type Dictionary } from 'intlayer';

const blogContent = {
  key: 'blog-i18n_technologies_CMS_drupal-metadata',
  content: {
    blogName: 'list_i18n_technologies__CMS__drupal',
    url: PagesRoutes['Blog_i18n-technologies__CMS__drupal'],
    githubUrl: GithubRoutes['i18n-technologies__CMS__drupal'],
    createdAt: '2025-01-16',
    updatedAt: '2025-01-16',
    title: t({
      en: 'Best Internationalization (i18n) Tools for Drupal',
      'en-GB': 'Best Internationalization (i18n) Tools for Drupal',
      fr: "Meilleures outils d'internationalisation (i18n) pour Drupal",
      es: 'Mejores herramientas de internacionalización (i18n) para Drupal',
      de: 'Beste Internationalisierung (i18n)-Tools für Drupal',
      ja: 'Drupalのための最適な国際化ツール',
      ko: 'Drupal용 최상의 국제화 도구',
      zh: 'Drupal的最佳国际化工具',
      it: 'Migliori strumenti di internazionalizzazione (i18n) per Drupal',
      pt: 'Melhores Ferramentas de Internacionalização (i18n) para Drupal',
      hi: 'Drupal के लिए सबसे अच्छा अंतर्राष्ट्रीयकरण (i18n) और उपकरण',
      ar: 'أفضل أدوات التدويل (i18n) للإنترات',
      ru: 'Лучшие инструменты интернационализации (i18n) для Drupal',
    }),
    description: t({
      en: 'Discover top Drupal i18n solutions to tackle translation challenges, boost SEO, and deliver a seamless global web experience.',
      'en-GB':
        'Discover top Drupal i18n solutions to tackle translation challenges, boost SEO, and deliver a seamless global web experience.',
      fr: "Découvrez les meilleures solutions d'internationalisation (i18n) pour résoudre les défis de traduction, accélérer la recherche sur le web et offrir une expérience web globale sans faille.",
      es: 'Descubre las mejores soluciones de internacionalización (i18n) para enfrentar desafíos de traducción, mejorar la búsqueda en la web y ofrecer una experiencia web global sin problemas.',
      de: 'Entdecken Sie die besten Drupal-i18n-Lösungen, um Übersetzungsaufgaben zu lösen, SEO zu erhöhen und eine nahtlose globale Weberfahrung zu bieten.',
      ja: '翻訳のチャレンジを解決するためのトップのDrupalのi18nソリューションを発見し、SEOを向上させ、グローバルなウェブエクスペリエンスを提供する。',
      ko: '번역 문제를 해결하기 위해 최상의 Drupal i18n 솔루션을 발견하고 SEO를 향상시키고 전세계 웹 경험을 제공합니다.',
      zh: '发现最佳的Drupal i18n解决方案来解决翻译挑战、提高SEO，并提供无比的全球网络体验。',
      it: "Scopri i migliori strumenti di internazionalizzazione (i18n) per Drupal per affrontare i sfide di traduzione, migliorare la ricerca sul web e fornire un'esperienza web globale senza problemi.",
      pt: 'Descubra os melhores soluções de internacionalização (i18n) para enfrentar desafios de tradução, melhorar a pesquisa na web e oferecer uma experiência web global sem problemas.',
      ru: 'Откройте высокие решения интернационализации (i18n) для Drupal для решения проблем с переводом, увеличения SEO и обеспечения глобального веб-опыта.',
      ar: 'تعرف على أفضل حلول التدويل (i18n) لـ Drupal لتجاوز تحديات الترجمة، وتعزيز SEO، وتقديم تجربة ويب عالمية سلسة.',
      hi: 'Drupal के i18n समाधानों के शीर्ष विकल्प खोजें, अनुवाद चुनौतियों को हल करें, SEO बढ़ाएं और एक वैश्विक वेब अनुभव प्रदान करें.',
    }),

    keywords: t({
      en: [
        'Drupal',
        'i18n',
        'multilingual',
        'SEO',
        'Internationalization',
        'Blog',
        'JavaScript',
      ],
      'en-GB': [
        'Drupal',
        'i18n',
        'multilingual',
        'SEO',
        'Internationalisation',
        'Blog',
        'JavaScript',
      ],
      fr: [
        'Drupal',
        'i18n',
        'multilangue',
        'SEO',
        'Internationalisation',
        'Blog',
        'JavaScript',
      ],
      es: [
        'Drupal',
        'i18n',
        'multilingüe',
        'SEO',
        'Internacionalización',
        'Blog',
        'JavaScript',
      ],
      de: [
        'Drupal',
        'i18n',
        'mehrsprachig',
        'SEO',
        'Internationalisierung',
        'Blog',
        'JavaScript',
      ],
      ja: [
        'Drupal',
        'i18n',
        'マルチリング',
        'SEO',
        '国際化',
        'ブログ',
        'JavaScript',
      ],
      ko: ['Drupal', 'i18n', '다국어', 'SEO', '국제화', '블로그', 'JavaScript'],
      zh: ['Drupal', 'i18n', '多语言', 'SEO', '国際化', '博客', 'JavaScript'],
      it: [
        'Drupal',
        'i18n',
        'multilingua',
        'SEO',
        'Internazionalizzazione',
        'Blog',
        'JavaScript',
      ],
      pt: [
        'Drupal',
        'i18n',
        'multilíngue',
        'SEO',
        'Internacionalização',
        'Blog',
        'JavaScript',
      ],
      hi: [
        'Drupal',
        'i18n',
        'बहुभाषी',
        'SEO',
        'अंतर्राष्ट्रीयकरण',
        'ब्लॉग',
        'JavaScript',
      ],
      ar: [
        'Drupal',
        'i18n',
        'متعدد اللغات',
        'SEO',
        'التدويل',
        'المدونة',
        'JavaScript',
      ],
      ru: [
        'Drupal',
        'i18n',
        'многоязычный',
        'SEO',
        'интернационализация',
        'блог',
        'JavaScript',
      ],
    }),
  },
} satisfies Dictionary<BlogData>;

export default blogContent;

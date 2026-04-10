import { type Dictionary, t } from 'intlayer';

const pageContent = {
  key: 'blog-search-page',
  content: {
    title: t({
      ar: 'البحث في المدونة',
      de: 'Im Blog suchen',
      en: 'Search in blog',
      'en-GB': 'Search in blog',
      es: 'Buscar en el blog',
      fr: 'Rechercher dans le blog',
      hi: 'ब्लॉग में खोजें',
      it: 'Cerca nel blog',
      ja: 'ブログで検索',
      ko: '블로그에서 검색',
      pt: 'Pesquisar no blog',
      ru: 'Поиск в блоге',
      tr: 'Blogda ara',
      zh: '在博客中搜索',
      pl: 'Szukaj na blogu',
      id: 'Cari di blog',
      vi: 'Tìm kiếm trong blog',
      uk: 'Пошук у блозі',
    }),
    description: t({
      ar: 'استكشف مقالات مدونتنا واكتشف رؤى الخبراء والدروس والنصائح حول التدويل وIntlayer.',
      de: 'Durchsuchen Sie unsere Blogartikel und entdecken Sie Experteneinblicke, Tutorials und Tipps zu Internationalisierung und Intlayer.',
      en: 'Browse our blog articles and discover expert insights, tutorials, and tips on internationalization and Intlayer.',
      'en-GB':
        'Browse our blog articles and discover expert insights, tutorials, and tips on internationalization and Intlayer.',
      es: 'Explora nuestros artículos de blog y descubre opiniones de expertos, tutoriales y consejos sobre internacionalización e Intlayer.',
      fr: 'Explorez nos articles de blog et découvrez des avis d’experts, des tutoriels et des conseils sur l’internationalisation et Intlayer.',
      hi: 'हमारे ब्लॉग लेखों को ब्राउज़ करें और अंतर्राष्ट्रीयकरण और Intlayer पर विशेषज्ञ अंतर्दृष्टि, ट्यूटोरियल और सुझाव खोजें।',
      it: 'Sfoglia i nostri articoli del blog e scopri approfondimenti di esperti, tutorial e suggerimenti su internazionalizzazione e Intlayer.',
      ja: '当社のブログ記事を閲覧して、国際化とIntlayerに関する専門的な洞察、チュートリアル、ヒントを見つけてください。',
      ko: '블로그 기사를 탐색하고 국제화 및 Intlayer에 대한 전문가 통찰력, 자습서 및 팁을 확인하십시오.',
      pt: 'Navegue em nossos artigos de blog e descubra insights de especialistas, tutoriais e dicas sobre internacionalização e Intlayer.',
      ru: 'Просматривайте наши статьи в блоге и открывайте для себя экспертные идеи, руководства и советы по интернационализации и Intlayer.',
      tr: 'Blog makalelerimize göz atın ve uluslararasılaştırma ve Intlayer hakkında uzman içgörüleri, öğreticiler ve ipuçları keşfedin.',
      zh: '浏览我们的博客文章，发现有关国际化和Intlayer的专家见解、教程和技巧。',
      pl: 'Przeglądaj nasze artykuły na blogu i odkrywaj eksperckie spostrzeżenia, tutoriale oraz wskazówki dotyczące umiędzynarodowienia i Intlayer.',
      id: 'Telusuri artikel blog kami dan temukan wawasan ahli, tutorial, dan tips tentang internasionalisasi dan Intlayer.',
      vi: 'Duyệt các bài viết trên blog của chúng tôi và khám phá thông tin chuyên sâu, hướng dẫn và mẹo của chuyên gia về quốc tế hóa và Intlayer.',
      uk: 'Переглядайте наші статті в блозі та відкривайте для себе експертні думки, посібники та поради щодо інтернаціоналізації та Intlayer.',
    }),
  },
  title: 'Blog search page content',
  description:
    'Content declaration for the blog search page, defining the page title and localized description.',
  tags: ['blog', 'search page'],
} satisfies Dictionary;

export default pageContent;

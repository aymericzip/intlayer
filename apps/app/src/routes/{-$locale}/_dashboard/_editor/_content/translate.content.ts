import { type Dictionary, t } from 'intlayer';

const translateDashboardContent = {
  key: 'translate-dashboard-page',
  content: {
    metadata: {
      title: t({
        ar: 'ترجمة | لوحة القيادة | Intlayer',
        de: 'Übersetzen | Dashboard | Intlayer',
        en: 'Translate | Dashboard | Intlayer',
        'en-GB': 'Translate | Dashboard | Intlayer',
        es: 'Traducir | Panel de control | Intlayer',
        fr: 'Traduire | Tableau de bord | Intlayer',
        hi: 'अनुवाद | डैशबोर्ड | Intlayer',
        it: 'Traduci | Cruscotto | Intlayer',
        ja: '翻訳 | ダッシュボード | Intlayer',
        ko: '번역 | 대시보드 | Intlayer',
        pt: 'Traduzir | Painel | Intlayer',
        ru: 'Перевод | Панель управления | Intlayer',
        tr: 'Çevir | Dashboard Paneli | Intlayer',
        zh: '翻译 | 仪表板 | Intlayer',
        pl: 'Tłumacz | Panel | Intlayer',
        id: 'Terjemahan | Dasbor | Intlayer',
        vi: 'Dịch | Bảng điều khiển | Intlayer',
        uk: 'Переклад | Панель керування | Intlayer',
      }),
      description: t({
        ar: 'ترجمة محتوى موقعك باستخدام Intlayer.',
        de: 'Übersetzen Sie Ihre Website-Inhalte mit Intlayer.',
        en: 'Translate your website content using Intlayer.',
        'en-GB': 'Translate your website content using Intlayer.',
        es: 'Traduzca el contenido de su sitio web utilizando Intlayer.',
        fr: 'Traduisez le contenu de votre site Web en utilisant Intlayer.',
        hi: 'Intlayer का उपयोग करके अपनी वेब साइट का सामग्री अनुवाद करें।',
        it: 'Traduci il contenuto del sito web utilizzando Intlayer.',
        ja: 'Intlayer を使用して、ウェブサイトのコンテンツを翻訳します。',
        ko: 'Intlayer를 사용하여 웹 사이트 콘텐츠를 번역하세요.',
        pt: 'Traduza o conteúdo do seu site usando o Intlayer.',
        ru: 'Переводите содержимое веб-сайта с помощью Intlayer.',
        tr: 'Intlayer kullanarak web sitesi içeriğinizi çevirin.',
        zh: '使用 Intlayer 翻译您的网站内容。',
        pl: 'Tłumacz zawartość swojej strony internetowej za pomocą Intlayera.',
        id: 'Terjemahkan konten situs web Anda menggunakan Intlayer.',
        vi: 'Dịch nội dung trang web của bạn bằng Intlayer.',
        uk: 'Перекладайте вміст свого сайту за допомогою Intlayer.',
      }),
    },
  },
  title: 'Translate dashboard page content',
  description:
    'Metadata for the translate section of the dashboard, used for SEO and page identification within the Intlayer CMS.',
  tags: ['page metadata', 'translate', 'dashboard'],
} satisfies Dictionary;

export default translateDashboardContent;

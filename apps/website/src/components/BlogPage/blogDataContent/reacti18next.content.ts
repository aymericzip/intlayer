import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const blogContent = {
  key: 'blog-intlayer-with-react-i18next-metadata',
  content: {
    title: t({
      en: 'Intlayer and react-i18next',
      'en-GB': 'Intlayer and react-i18next',
      fr: 'Intlayer et react-i18next',
      es: 'Intlayer y react-i18next',
      de: 'Intlayer und react-i18next',
      ja: 'Intlayerとreact-i18next',
      ko: 'Intlayer와 react-i18next',
      zh: 'Intlayer和react-i18next',
      it: 'Intlayer e react-i18next',
      pt: 'Intlayer e react-i18next',
      hi: 'Intlayer और react-i18next',
      ar: 'Intlayer وreact-i18next',
      ru: 'Intlayer и react-i18next',
    }),

    description: t({
      en: 'Compare Intlayer with react-i18next for a React app',
      'en-GB': 'Compare Intlayer with react-i18next for a React app',
      fr: 'Comparer Intlayer avec react-i18next pour une application React',
      es: 'Comparar Intlayer con react-i18next para una aplicación React',
      de: 'Vergleichen Sie Intlayer mit react-i18next für eine React-App',
      ja: 'Reactアプリのためにreact-i18nextとIntlayerを比較する',
      ko: 'React 앱을 위해 react-i18next와 Intlayer를 비교하다',
      zh: '比较React应用程序的react-i18next与Intlayer',
      it: "Confronta Intlayer con react-i18next per un'app React",
      pt: 'Compare o Intlayer com o react-i18next para um aplicativo React',
      hi: 'React एप्लिकेशन के लिए react-i18next के साथ Intlayer की तुलना करें',
      ar: 'قارن بين React باستخدام react-i18next و Intlayer',
      ru: 'Сравнить Intlayer с react-i18next для приложения React',
    }),

    keywords: t({
      en: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Internationalization',
        'Blog',
        'Next.js',
        'JavaScript',
        'React',
      ],
      'en-GB': [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Internationalisation',
        'Blog',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Internationalisation',
        'Blog',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Internacionalización',
        'Blogumentación',
        'Next.js',
        'JavaScript',
        'React',
      ],
      de: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Internationalisierung',
        'Dokumentation',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ja: [
        'react-i18next',
        'i18next',
        'Intlayer',
        '国際化',
        'ドキュメンテーション',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ko: [
        'react-i18next',
        'i18next',
        'Intlayer',
        '국제화',
        '문서화',
        'Next.js',
        'JavaScript',
        'React',
      ],
      zh: [
        'react-i18next',
        'i18next',
        'Intlayer',
        '国际化',
        '文档',
        'Next.js',
        'JavaScript',
        'React',
      ],
      it: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Internazionalizzazione',
        'Blogumentazione',
        'Next.js',
        'JavaScript',
        'React',
      ],
      pt: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Internacionalização',
        'Blogumentação',
        'Next.js',
        'JavaScript',
        'React',
      ],
      hi: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'अंतर्राष्ट्रीयकरण',
        'दस्तावेज़ीकरण',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ar: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'التدويل',
        'التوثيق',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ru: [
        'react-i18next',
        'i18next',
        'Intlayer',
        'Интернационализация',
        'Документация',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default blogContent;
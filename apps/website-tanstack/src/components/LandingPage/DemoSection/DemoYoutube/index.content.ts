import { type Dictionary, t } from 'intlayer';

const demoYoutubeContent = {
  key: 'demo-youtube',
  content: {
    howToInternationalize: t({
      ar: 'يوتيوب تجريبي - كيفية تعريب تطبيقك باستخدام Intlayer',
      de: 'Demo YouTube – Wie Sie Ihre Anwendung mit Intlayer internationalisieren',
      en: 'Demo YouTube - How to Internationalize your application using Intlayer',
      'en-GB':
        'Demo YouTube - How to Internationalise your application using Intlayer',
      es: 'Demo de YouTube: cómo internacionalizar tu aplicación con Intlayer',
      fr: 'Démo YouTube – Comment internationaliser votre application avec Intlayer',
      hi: 'डेमो यूट्यूब - अपनी एप्लिकेशन को Intlayer के साथ अंतर्राष्ट्रीयकरण कैसे करें',
      it: 'Demo YouTube - Come internazionalizzare la tua applicazione con Intlayer',
      ja: 'デモYouTube - Intlayerでアプリケーションを国際化する方法',
      ko: '데모 YouTube - Intlayer를 사용해 애플리케이션 국제화하기',
      pt: 'Demo YouTube - Como internacionalizar seu aplicativo usando o Intlayer',
      ru: 'Демонстрация YouTube – как интернационализировать приложение с помощью Intlayer',
      tr: 'Demo YouTube - Uygulamanızı Intlayer ile nasıl uluslararasılaştırırsınız',
      zh: 'YouTube演示 - 如何使用Intlayer国际化你的应用',
      pl: 'Demo YouTube - Jak zmiędzynarodowić aplikację za pomocą Intlayer',
      id: 'Demo YouTube - Cara Internasionalisasi aplikasi Anda menggunakan Intlayer',
      vi: 'Demo YouTube - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer',
      uk: 'Демонстрація на YouTube — як інтернаціоналізувати ваш застосунок за допомогою Intlayer',
    }),
  },
  title: 'Demo YouTube',
  description:
    'Demo showing how to internationalize your application using Intlayer.',
  tags: ['demo', 'youtube', 'internationalization', 'intlayer'],
} satisfies Dictionary;

export default demoYoutubeContent;

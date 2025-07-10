import { t, type Dictionary } from 'intlayer';

const applicationTemplateMessageContent = {
  key: 'application-template-message',
  content: {
    title: t({
      en: 'See the application template on GitHub',
      fr: "Voir le modèle d'application sur GitHub",
      ar: 'عرض قالب التطبيق على GitHub',
      de: 'Anwendungsvorlage auf GitHub ansehen',
      es: 'Ver la plantilla de aplicación en GitHub',
      hi: 'GitHub पर एप्लिकेशन टेम्पलेट देखें',
      ru: 'Посмотреть шаблон приложения на GitHub',
      'en-GB': 'See the application template on GitHub',
      it: 'Visualizza il modello di applicazione su GitHub',
      ja: 'GitHubでアプリケーションテンプレートを見る',
      ko: 'GitHub에서 애플리케이션 템플릿 보기',
      pt: 'Ver o modelo de aplicação no GitHub',
      zh: '在 GitHub 上查看应用程序模板',
    }),
    description: t({
      en: 'This page has an application template available.',
      fr: "Cette page dispose d'un modèle d'application disponible.",
      es: 'Esta página tiene una plantilla de aplicación disponible.',
      hi: 'इस पृष्ठ के लिए एक एप्लिकेशन टेम्पलेट उपलब्ध है।',
      ru: 'Для этой страницы доступен шаблон приложения.',
      de: 'Für diese Seite ist eine Anwendungsvorlage verfügbar.',
      pt: 'Esta página tem um modelo de aplicação disponível.',
      ja: 'このページにはアプリケーションテンプレートが用意されています。',
      ko: '이 페이지에는 애플리케이션 템플릿이 제공됩니다.',
      zh: '此页面有可用的应用程序模板。',
      ar: 'هذه الصفحة لديها قالب تطبيق متاح.',
      'en-GB': 'This page has an application template available.',
      it: 'Questa pagina ha un modello di applicazione disponibile.',
    }),
    label: t({
      en: 'See the application template',
      fr: "Voir le modèle d'application",
      ar: 'عرض قالب التطبيق',
      de: 'Anwendungsvorlage ansehen',
      es: 'Ver la plantilla de aplicación',
      hi: 'एप्लिकेशन टेम्पलेट देखें',
      ru: 'Посмотреть шаблон приложения',
      'en-GB': 'See the application template',
      it: 'Visualizza il modello di applicazione',
      ja: 'アプリケーションテンプレートを見る',
      ko: '애플리케이션 템플릿 보기',
      pt: 'Ver o modelo de aplicação',
      zh: '查看应用程序模板',
    }),
  },
} satisfies Dictionary;

export default applicationTemplateMessageContent;

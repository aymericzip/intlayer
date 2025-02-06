import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const docContent = {
  key: 'doc-introduction-metadata',
  content: {
    title: t({
      en: 'Introduction',
      'en-GB': 'Introduction',
      fr: 'Introduction',
      es: 'Introducción',
      de: 'Einführung',
      ja: 'イントロダクション',
      ko: '소개',
      zh: '介绍',
      it: 'Introduzione',
      pt: 'Introdução',
      hi: 'परिचय',
      ar: 'مقدمة',
      ru: 'Введение',
    }),

    description: t({
      en: 'Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.',
      'en-GB':
        'Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.',
      fr: 'Découvrez comment Intlayer fonctionne. Voir les étapes utilisées par Intlayer dans votre application. Voir ce qui fait les différents packages.',
      es: 'Descubra cómo funciona Intlayer. Vea las pasos utilizados por Intlayer en su aplicación. Vea lo que hace los diferentes paquetes.',
      de: 'Entdecken Sie, wie Intlayer funktioniert. Sehen Sie die Schritte, die von Intlayer in Ihrer Anwendung verwendet werden. Sehen Sie, was die verschiedenen Pakete tun.',
      ja: 'Intlayerの仕組みを発見してください。アプリケーションでIntlayerが使用する手順を確認してください。さまざまなパッケージの機能を確認してください。',
      ko: 'Intlayer가 작동하는 방식을 알아보세요. 귀하의 애플리케이션에서 Intlayer가 사용하는 단계를 확인하세요. 다양한 패키지가 하는 일을 확인하세요.',
      zh: '了解Intlayer的工作原理。查看Intlayer在您的应用程序中使用的步骤。查看不同包的功能。',
      it: 'Scopri come funziona Intlayer. Vedi i passaggi utilizzati da Intlayer nella tua applicazione. Vedi cosa fanno i diversi pacchetti.',
      pt: 'Descubra como o Intlayer funciona. Veja os passos usados pelo Intlayer em sua aplicação. Veja o que os diferentes pacotes fazem.',
      hi: 'जानें कि Intlayer कैसे काम करता है। अपने अनुप्रयोग में Intlayer द्वारा उपयोग किए गए चरणों को देखें। विभिन्न पैकेज क्या करते हैं, यह देखें।',
      ar: 'اكتشف كيف يعمل Intlayer. اطلع على الخطوات المستخدمة من قبل Intlayer في تطبيقك. انظر ماذا تفعل الحزم المختلفة.',
      ru: 'Узнайте, как работает Intlayer. Посмотрите шаги, которые использует Intlayer в вашем приложении. Узнайте, что делают разные пакеты.',
    }),
    keywords: t({
      en: [
        'Introduction',
        'Get started',
        'Intlayer',
        'Application',
        'Packages',
      ],
      'en-GB': [
        'Introduction',
        'Get started',
        'Intlayer',
        'Application',
        'Packages',
      ],
      fr: ['Introduction', 'Commencer', 'Intlayer', 'Application', 'Packages'],
      es: ['Introducción', 'Empezar', 'Intlayer', 'Aplicación', 'Paquetes'],
      de: ['Einführung', 'Loslegen', 'Intlayer', 'Anwendung', 'Pakete'],
      ja: [
        'イントロダクション',
        '始める',
        'Intlayer',
        'アプリケーション',
        'パッケージ',
      ],
      ko: ['소개', '시작하기', 'Intlayer', '애플리케이션', '패키지'],
      zh: ['介绍', '开始', 'Intlayer', '应用程序', '包'],
      it: ['Introduzione', 'Iniziare', 'Intlayer', 'Applicazione', 'Pacchetti'],
      pt: ['Introdução', 'Começar', 'Intlayer', 'Aplicativo', 'Pacotes'],
      hi: ['परिचय', 'शुरू करें', 'Intlayer', 'अनुप्रयोग', 'पैकेज'],
      ar: ['مقدمة', 'ابدأ', 'Intlayer', 'تطبيق', 'حزم'],
      ru: ['Введение', 'Начать', 'Intlayer', 'Приложение', 'Пакеты'],
    }),
  },
} satisfies Dictionary<Metadata>;

export default docContent;

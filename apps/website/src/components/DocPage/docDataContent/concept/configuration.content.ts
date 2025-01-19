import { t, type DeclarationContent } from 'intlayer';
import { type Metadata } from 'next';

const docContent = {
  key: 'doc-configuration-metadata',
  content: {
    title: t({
      en: 'Configuration',
      'en-GB': 'Configuration',
      fr: 'Configuration',
      es: 'Configuración',
      de: 'Konfiguration',
      ja: '構成',
      ko: '구성',
      zh: '配置',
      it: 'Configurazione',
      pt: 'Configuração',
      hi: 'कॉन्फ़िगरेशन',
      ar: 'التكوين',
      ru: 'Конфигурация',
    }),

    description: t({
      en: 'Learn how to configure Intlayer for your application. Understand the various settings and options available to customize Intlayer to your needs.',
      'en-GB':
        'Learn how to configure Intlayer for your application. Understand the various settings and options available to customize Intlayer to your needs.',
      fr: 'Apprenez à configurer Intlayer pour votre application. Comprenez les différents paramètres et options disponibles pour personnaliser Intlayer selon vos besoins.',
      es: 'Aprenda cómo configurar Intlayer para su aplicación. Comprenda los diferentes ajustes y opciones disponibles para personalizar Intlayer según sus necesidades.',
      de: 'Erfahren Sie, wie Sie Intlayer für Ihre Anwendung konfigurieren. Verstehen Sie die verschiedenen Einstellungen und Optionen, die zur Anpassung von Intlayer an Ihre Bedürfnisse zur Verfügung stehen.',
      ja: 'アプリケーションのためにIntlayerを設定する方法を学びます。Intlayerをニーズに合わせてカスタマイズするために利用可能なさまざまな設定とオプションを理解します。',
      ko: '애플리케이션을 위해 Intlayer를 구성하는 방법을 알아보세요. Intlayer를 필요에 맞게 사용자 정의하는 데 사용할 수 있는 다양한 설정과 옵션을 이해합니다.',
      zh: '学习如何为您的应用程序配置Intlayer。了解可用于根据您的需要自定义Intlayer的各种设置和选项。',
      it: 'Scopri come configurare Intlayer per la tua applicazione. Comprendi le varie impostazioni e opzioni disponibili per personalizzare Intlayer secondo le tue esigenze.',
      pt: 'Aprenda como configurar o Intlayer para sua aplicação. Entenda as várias configurações e opções disponíveis para personalizar o Intlayer de acordo com suas necessidades.',
      hi: 'अपने अनुप्रयोग के लिए Intlayer को कैसे कॉन्फ़िगर करें, यह सीखें। Intlayer को आपकी आवश्यकताओं के अनुरूप अनुकूलित करने के लिए उपलब्ध विभिन्न सेटिंग्स और विकल्पों को समझें।',
      ar: 'تعلم كيفية تكوين Intlayer لتطبيقك. فهم الإعدادات والخيارات المختلفة المتاحة لتخصيص Intlayer وفقًا لاحتياجاتك.',
      ru: 'Узнайте, как настроить Intlayer для вашего приложения. Поймите разные настройки и параметры, доступные для настройки Intlayer под ваши нужды.',
    }),
    keywords: t({
      en: ['Configuration', 'Settings', 'Customization', 'Intlayer', 'Options'],
      'en-GB': [
        'Configuration',
        'Settings',
        'Customization',
        'Intlayer',
        'Options',
      ],
      fr: [
        'Configuration',
        'Paramètres',
        'Personnalisation',
        'Intlayer',
        'Options',
      ],
      es: [
        'Configuración',
        'Ajustes',
        'Personalización',
        'Intlayer',
        'Opciones',
      ],
      de: [
        'Konfiguration',
        'Einstellungen',
        'Anpassung',
        'Intlayer',
        'Optionen',
      ],
      ja: ['構成', '設定', 'カスタマイズ', 'Intlayer', 'オプション'],
      ko: ['구성', '설정', '사용자화', 'Intlayer', '옵션'],
      zh: ['配置', '设置', '自定义', 'Intlayer', '选项'],
      it: [
        'Configurazione',
        'Impostazioni',
        'Personalizzazione',
        'Intlayer',
        'Opzioni',
      ],
      pt: ['Configuração', 'Ajustes', 'Personalização', 'Intlayer', 'Opções'],
      hi: ['कॉन्फ़िगरेशन', 'सेटिंग्स', 'अनुकूलन', 'Intlayer', 'विकल्प'],
      ar: ['التكوين', 'الإعدادات', 'التخصيص', 'Intlayer', 'الخيارات'],
      ru: ['Конфигурация', 'Настройки', 'Кастомизация', 'Intlayer', 'Опции'],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;

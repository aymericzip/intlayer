import { type Dictionary, t } from 'intlayer';

const iframeControllerContent = {
  key: 'iframe-controller',
  content: {
    intlayerApplication: t({
      en: 'Intlayer Application',
      fr: 'Application Intlayer',
      es: 'Aplicación Intlayer',
      de: 'Intlayer-Anwendung',
      it: 'Applicazione Intlayer',
      pt: 'Aplicativo Intlayer',
      ru: 'Приложение Intlayer',
      ja: 'Intlayerアプリケーション',
      ko: 'Intlayer 애플리케이션',
      zh: 'Intlayer 应用程序',
      'en-GB': 'Intlayer Application',
      ar: 'تطبيق Intlayer',
      hi: 'इंटलेयर एप्लिकेशन',
    }),
    enableEditor: t({
      en: 'Enable Editor',
      fr: "Activer l'éditeur",
      es: 'Activar el editor',
      de: 'Editor aktivieren',
      it: "Abilita l'editor",
      pt: 'Ativar editor',
      ru: 'Включить редактор',
      ja: 'エディタを有効にする',
      ko: '에디터 활성화',
      zh: '启用编辑器',
      'en-GB': 'Enable Editor',
      ar: 'تفعيل المحرر',
      hi: 'संपादक सक्षम करें',
    }),
  },
} satisfies Dictionary;

export default iframeControllerContent;

import { type Dictionary, t } from 'intlayer';

const checkingApplicationStatusViewContent = {
  key: 'checking-application-status-view',
  content: {
    checkingApplicationStatus: t({
      en: 'Checking application status',
      fr: "Vérification de l'état de l'application",
      es: 'Verificación del estado de la aplicación',
      'en-GB': 'Checking application status',
      de: 'Status der Anwendung prüfen',
      ja: 'アプリケーションの状態を確認しています',
      ko: '애플리케이션 상태를 확인하고 있습니다',
      zh: '正在检查应用程序状态',
      it: "Controllo dello stato dell'applicazione",
      pt: 'Verificando o estado da aplicação',
      hi: 'एप्लिकेशन की स्थिति की जांच हो रही है',
      ar: 'يتم التحقق من حالة التطبيق',
      ru: 'Проверка состояния приложения',
      tr: 'Uygulama durumu kontrol ediliyor',
    }),
  },
} satisfies Dictionary;

export default checkingApplicationStatusViewContent;

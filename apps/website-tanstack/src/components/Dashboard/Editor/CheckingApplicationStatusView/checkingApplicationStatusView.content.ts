import { type Dictionary, t } from 'intlayer';

const checkingApplicationStatusViewContent = {
  key: 'checking-application-status-view',
  content: {
    checkingApplicationStatus: t({
      ar: 'يتم التحقق من حالة التطبيق',
      de: 'Status der Anwendung prüfen',
      en: 'Checking application status',
      'en-GB': 'Checking application status',
      es: 'Verificación del estado de la aplicación',
      fr: "Vérification de l'état de l'application",
      hi: 'एप्लिकेशन की स्थिति की जांच हो रही है',
      it: "Controllo dello stato dell'applicazione",
      ja: 'アプリケーションの状態を確認しています',
      ko: '애플리케이션 상태를 확인하고 있습니다',
      pt: 'Verificando o estado da aplicação',
      ru: 'Проверка состояния приложения',
      tr: 'Uygulama durumu kontrol ediliyor',
      zh: '正在检查应用程序状态',
      pl: 'Sprawdzanie stanu aplikacji',
      id: 'Memeriksa status aplikasi',
      vi: 'Đang kiểm tra trạng thái ứng dụng',
      uk: 'Перевірка стану додатка',
    }),
  },
  title: 'Checking application status view',
  description:
    'Content declaration for the component displaying the application status check within the dashboard editor.',
  tags: ['dashboard', 'application status', 'editor view'],
} satisfies Dictionary;

export default checkingApplicationStatusViewContent;

import { type Dictionary, t } from 'intlayer';

const checkingApplicationStatusViewContent = {
  key: 'checking-application-status-view',
  content: {
    checkingApplicationStatus: t({
      en: 'Checking application status',
      ar: 'يتم التحقق من حالة التطبيق',
      de: 'Status der Anwendung prüfen',
      'en-GB': 'Checking application status',
      es: 'Verificación del estado de la aplicación',
      fr: "Vérification de l'état de l'application",
      'he-IL': 'בודק את מצב האפליקציה',
      hi: 'एप्लिकेशन की स्थिति की जांच हो रही है',
      id: 'Memeriksa status aplikasi',
      it: "Controllo dello stato dell'applicazione",
      ja: 'アプリケーションの状態を確認しています',
      ko: '애플리케이션 상태를 확인하고 있습니다',
      pl: 'Sprawdzanie stanu aplikacji',
      pt: 'Verificando o estado da aplicação',
      ru: 'Проверка состояния приложения',
      tr: 'Uygulama durumu kontrol ediliyor',
      uk: 'Перевірка стану додатка',
      vi: 'Đang kiểm tra trạng thái ứng dụng',
      zh: '正在检查应用程序状态',
    }),
  },
  title: 'Checking application status view',
  description:
    'Content declaration for the component displaying the application status check within the dashboard editor.',
  tags: ['dashboard', 'application status', 'editor view'],
} satisfies Dictionary;

export default checkingApplicationStatusViewContent;

import { t, type Dictionary } from 'intlayer';

const applicationNotRunningViewContent = {
  key: 'application-not-running-view',
  content: {
    title: t({
      en: 'Your application is not accessible',
      'en-GB': 'Your application is not accessible',
      fr: "Votre application n'est pas accessible",
      es: 'Tu aplicación no está accesible',
      de: 'Ihre Anwendung ist nicht zugänglich',
      ja: 'あなたのアプリケーションはアクセスできません',
      ko: '당신의 앱은 접근할 수 없습니다.',
      zh: '您的应用程序无法访问',
      pt: 'Sua aplicação não está acessível',
      ru: 'Ваше приложение не доступно',
      ar: 'التطبيق غير متاح',
      hi: 'आपका एप्लिकेशन पहुंच नहीं है',
      it: 'La tua applicazione non è accessibile',
    }),
    description: t({
      en: 'To use the CMS, you need to ensure that the application is running.',
      'en-GB':
        'To use the CMS, you need to ensure that the application is running.',
      fr: 'Pour utiliser le CMS, vous devez vous assurer que l’application est en cours d’exécution.',
      es: 'Para usar el CMS, debe asegurarse de que la aplicación esté en ejecución.',
      de: 'Um den CMS zu verwenden, müssen Sie sicherstellen, dass die Anwendung läuft.',
      ja: 'CMS を使用するには、アプリケーションが実行されていることを確認する必要があります。',
      ko: 'CMS를 사용하려면 앱이 실행되고 있는지 확인해야 합니다.',
      zh: '要使用 CMS，您需要确保应用程序正在运行。',
      pt: 'Para usar o CMS, você precisa garantir que a aplicação esteja em execução.',
      ru: 'Чтобы использовать CMS, вам необходимо убедиться, что приложение работает.',
      ar: 'لاستخدام محرك المحتوى، يجب عليك التأكد من أن التطبيق يعمل.',
      hi: 'कैम्स का उपयोग करने के लिए, आपको यह सुनिश्चित करना होगा कि एप्लिकेशन चल रहा है।',
      it: 'Per utilizzare il CMS, è necessario assicurarsi che l’applicazione sia in esecuzione.',
    }),
    tips: t({
      en: [
        'If your application is running locally (example: http://localhost:3000), start the application and ensure the `editor.cmsUrl` configuration field is set to `https://intlayer.org`.',
        'If your application is running on a remote server (example: https://my-app.com), ensure the `editor.cmsUrl` configuration field is set to `https://intlayer.org`.',
        "In all cases, ensure the CSP ('Content-Security-Policy') header does not block the editor's iframe.",
      ],
      'en-GB': [
        'If your application is running locally (example: http://localhost:3000), start the application and ensure the `editor.cmsUrl` configuration field is set to `https://intlayer.org`.',
        'If your application is running on a remote server (example: https://my-app.com), ensure the `editor.cmsUrl` configuration field is set to `https://intlayer.org`.',
        "In all cases, ensure the CSP ('Content-Security-Policy') header does not block the editor's iframe.",
      ],
      fr: [
        'Si votre application est en cours d’exécution localement (exemple: http://localhost:3000), démarrez l’application et assurez-vous que le champ de configuration `editor.cmsUrl` est défini sur `https://intlayer.org`.',
        'Si votre application est en cours d’exécution sur un serveur distant (exemple: https://my-app.com), assurez-vous que le champ de configuration `editor.cmsUrl` est défini sur `https://intlayer.org`.',
        "Dans tous les cas, assurez-vous que l'en-tête CSP ('Content-Security-Policy') ne bloque pas l'iframe de l'éditeur.",
      ],
      es: [
        'Si tu aplicación está funcionando localmente (ejemplo: http://localhost:3000), inicia la aplicación y asegúrate de que el campo de configuración `editor.cmsUrl` esté configurado en `https://intlayer.org`.',
        'Si tu aplicación está funcionando en un servidor remoto (ejemplo: https://my-app.com), asegúrate de que el campo de configuración `editor.cmsUrl` esté configurado en `https://intlayer.org`.',
        "En todos los casos, asegúrate de que el encabezado CSP ('Content-Security-Policy') no bloquee el iframe del editor.",
      ],
      de: [
        'Wenn Ihre Anwendung lokal ausgeführt wird (Beispiel: http://localhost:3000), starten Sie die Anwendung und stellen Sie sicher, dass das Konfigurationsfeld `editor.cmsUrl` auf `https://intlayer.org` gesetzt ist.',
        'Wenn Ihre Anwendung auf einem Remote-Server ausgeführt wird (Beispiel: https://my-app.com), stellen Sie sicher, dass das Konfigurationsfeld `editor.cmsUrl` auf `https://intlayer.org` gesetzt ist.',
        "In allen Fällen, stellen Sie sicher, dass der CSP ('Content-Security-Policy') Header das iframe des Editors nicht blockiert.",
      ],
      ja: [
        'アプリケーションがローカルで実行されている場合（例: http://localhost:3000）、アプリケーションを起動し、`editor.cmsUrl` 設定フィールドが `https://intlayer.org` に設定されていることを確認してください。',
        'アプリケーションがリモートサーバーで実行されている場合（例: https://my-app.com）、`editor.cmsUrl` 設定フィールドが `https://intlayer.org` に設定されていることを確認してください。',
        "すべての場合において、CSP ('Content-Security-Policy') ヘッダーがエディターの iframe をブロックしないことを確認してください。",
      ],
      ko: [
        '앱이 로컬에서 실행되고 있는 경우 (예: http://localhost:3000) 앱을 시작하고 `editor.cmsUrl` 설정 필드가 `https://intlayer.org`로 설정되어 있는지 확인하십시오.',
        '앱이 리모트 서버에서 실행되고 있는 경우 (예: https://my-app.com) `editor.cmsUrl` 설정 필드가 `https://intlayer.org`로 설정되어 있는지 확인하십시오.',
        "모든 경우에 대해 CSP ('Content-Security-Policy') 헤더가 에디터의 iframe을 차단하지 않는지 확인하십시오.",
      ],
      zh: [
        '如果您的应用程序在本地运行（例如：http://localhost:3000），请启动应用程序并确保 `editor.cmsUrl` 配置字段设置为 `https://intlayer.org`。',
        '如果您的应用程序在远程服务器上运行（例如：https://my-app.com），请确保 `editor.cmsUrl` 配置字段设置为 `https://intlayer.org`。',
        "在所有情况下，确保 CSP ('Content-Security-Policy') 头不阻止编辑器的 iframe。",
      ],
      pt: [
        'Se sua aplicação estiver em execução localmente (exemplo: http://localhost:3000), inicie a aplicação e certifique-se de que o campo de configuração `editor.cmsUrl` está definido como `https://intlayer.org`.',
        'Se sua aplicação estiver em execução em um servidor remoto (exemplo: https://my-app.com), certifique-se de que o campo de configuração `editor.cmsUrl` está definido como `https://intlayer.org`.',
        "Em todos os casos, certifique-se de que o cabeçalho CSP ('Content-Security-Policy') não bloqueie o iframe do editor.",
      ],
      ru: [
        'Если ваше приложение работает локально (например: http://localhost:3000), запустите приложение и убедитесь, что поле конфигурации `editor.cmsUrl` установлено на `https://intlayer.org`.',
        'Если ваше приложение работает на удаленном сервере (например: https://my-app.com), убедитесь, что поле конфигурации `editor.cmsUrl` установлено на `https://intlayer.org`.',
        "В любом случае, убедитесь, что заголовок CSP ('Content-Security-Policy') не блокирует iframe редактора.",
      ],
      ar: [
        'إذا كانت التطبيق يعمل بشكل محلي (مثال: http://localhost:3000)، قم بتشغيل التطبيق وتأكد من أن حقل التكوين `editor.cmsUrl` معين على `https://intlayer.org`.',
        'إذا كانت التطبيق يعمل على خادم مركزي (مثال: https://my-app.com)، تأكد من أن حقل التكوين `editor.cmsUrl` معين على `https://intlayer.org`.',
        "في كل الحالات، تأكد من أن عنوان الموقع المصدر ('Content-Security-Policy') لا يحجب iframe المحرر.",
      ],
      hi: [
        'यदि आपका एप्लिकेशन स्थानीय रूप से चल रहा है (उदाहरण: http://localhost:3000) एप्लिकेशन शुरू करें और सुनिश्चित करें कि `editor.cmsUrl` कॉन्फ़िगरेशन फ़ील्ड को `https://intlayer.org` पर सेट किया गया है।',
        'यदि आपका एप्लिकेशन रिमोट सर्वर पर चल रहा है (उदाहरण: https://my-app.com) सुनिश्चित करें कि `editor.cmsUrl` कॉन्फ़िगरेशन फ़ील्ड को `https://intlayer.org` पर सेट किया गया है।',
        "सभी मामलों में, सुनिश्चित करें कि CSP ('Content-Security-Policy') हेडर एडिटर के iframe को ब्लॉक नहीं करता है।",
      ],
      it: [
        'Se la tua applicazione è in esecuzione localmente (esempio: http://localhost:3000), avvia l’applicazione e assicurati che il campo di configurazione `editor.cmsUrl` sia impostato su `https://intlayer.org`.',
        'Se la tua applicazione è in esecuzione su un server remoto (esempio: https://my-app.com), assicurati che il campo di configurazione `editor.cmsUrl` sia impostato su `https://intlayer.org`.',
        "In tutti i casi, assicurati che l'header CSP ('Content-Security-Policy') non blocchi l'iframe dell'editor.",
      ],
    }),
    documentationLink: {
      label: t({
        en: 'Click to go to the CMS documentation',
        'en-GB': 'Click to go to the CMS documentation',
        fr: 'Cliquez ici pour accéder à la documentation du CMS',
        es: 'Haga clic aquí para acceder a la documentación del CMS',
        de: 'Klicken Sie hier, um die CMS-Dokumentation zu besuchen',
        ja: 'CMS ドキュメントに移動するには、ここをクリックしてください',
        ko: 'CMS 문서로 이동하려면 여기를 클릭하십시오.',
        zh: '点击此处访问 CMS 文档',
        pt: 'Clique aqui para acessar a documentação do CMS',
        ru: 'Нажмите, чтобы перейти к документации CMS',
        ar: 'انقر هنا للوصول إلى وثائق محرك المحتوى',
        hi: 'क्या आप कैम्स का डॉक्यूमेंट पर जाए रखना चाहते हैं?',
        it: 'Fai clic qui per accedere alla documentazione del CMS',
      }),
      text: t({
        en: 'See how to configure the CMS',
        'en-GB': 'See how to configure the CMS',
        fr: 'Voir comment configurer le CMS',
        de: 'Siehe, wie man den CMS konfiguriert',
        ar: 'انظر كيفية تكوين محرك المحتوى',
        hi: 'कैम्स को काने के बारे में देखें',
        it: 'Vedi come configurare il CMS',
        ja: 'CMSの設定方法を見る',
        ru: 'Смотрите, как настроить CMS',
        es: 'Vea cómo configurar el CMS',
        pt: 'Veja como configurar o CMS',
        ko: 'CMS 설정 방법을 보십시오',
        zh: '查看如何配置CMS',
      }),
    },
  },
} satisfies Dictionary;

export default applicationNotRunningViewContent;

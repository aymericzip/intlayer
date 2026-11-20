import type { Locale } from '@intlayer/types/allLocales';
import {
  type EmailLocale,
  fillPlaceholders,
  formatEmailDate,
  getCommonEmailCopy,
  NotificationEmailLayout,
  resolveLocaleCopy,
} from './components/NotificationEmailLayout';

/** Lifecycle event an access key notification reports. */
export type AccessKeyNotificationKind = 'expiringSoon' | 'expired' | 'deleted';

export type AccessKeyNotificationEmailProps = {
  username: string;
  accessKeyName: string;
  projectName: string;
  /** Expiration date for `expiringSoon` / `expired`, deletion date for `deleted`. */
  eventDate: Date | string;
  accessKeysUrl: string;
  supportUrl: string;
};

type KindCopy = {
  subject: string;
  heading: string;
  /** Supports `{accessKeyName}`, `{projectName}` and `{date}` placeholders. */
  body: string;
  action: string;
};

type LocaleCopy = Record<AccessKeyNotificationKind, KindCopy> & {
  button: string;
};

const englishCopy: LocaleCopy = {
  expiringSoon: {
    subject: 'Your Intlayer access key expires in 3 days',
    heading: 'Your access key expires soon',
    body: 'Your access key {accessKeyName} for the project {projectName} will expire on {date}. After this date, every application or CI pipeline using it will lose access to Intlayer.',
    action:
      'To avoid any interruption, create a new access key and update your environment variables before then.',
  },
  expired: {
    subject: 'Your Intlayer access key has expired',
    heading: 'Your access key has expired',
    body: 'Your access key {accessKeyName} for the project {projectName} expired on {date}. Requests made with it are now rejected.',
    action:
      'Create a new access key and update your environment variables to restore access.',
  },
  deleted: {
    subject: 'An Intlayer access key has been deleted',
    heading: 'Your access key has been deleted',
    body: 'Your access key {accessKeyName} for the project {projectName} was deleted on {date}. Requests made with it are now rejected.',
    action:
      'If you did not delete this key, review your project members and your account security right away.',
  },
  button: 'Manage access keys',
};

const localeCopies: Record<EmailLocale, LocaleCopy> = {
  en: englishCopy,
  'en-GB': englishCopy,
  fr: {
    expiringSoon: {
      subject: "Votre clé d'accès Intlayer expire dans 3 jours",
      heading: "Votre clé d'accès expire bientôt",
      body: "Votre clé d'accès {accessKeyName} pour le projet {projectName} expirera le {date}. Passé cette date, toute application ou pipeline CI qui l'utilise perdra l'accès à Intlayer.",
      action:
        "Pour éviter toute interruption, créez une nouvelle clé d'accès et mettez à jour vos variables d'environnement d'ici là.",
    },
    expired: {
      subject: "Votre clé d'accès Intlayer a expiré",
      heading: "Votre clé d'accès a expiré",
      body: "Votre clé d'accès {accessKeyName} pour le projet {projectName} a expiré le {date}. Les requêtes qui l'utilisent sont désormais refusées.",
      action:
        "Créez une nouvelle clé d'accès et mettez à jour vos variables d'environnement pour rétablir l'accès.",
    },
    deleted: {
      subject: "Une clé d'accès Intlayer a été supprimée",
      heading: "Votre clé d'accès a été supprimée",
      body: "Votre clé d'accès {accessKeyName} pour le projet {projectName} a été supprimée le {date}. Les requêtes qui l'utilisent sont désormais refusées.",
      action:
        "Si vous n'avez pas supprimé cette clé, vérifiez immédiatement les membres de votre projet et la sécurité de votre compte.",
    },
    button: "Gérer les clés d'accès",
  },
  es: {
    expiringSoon: {
      subject: 'Tu clave de acceso de Intlayer caduca en 3 días',
      heading: 'Tu clave de acceso caduca pronto',
      body: 'Tu clave de acceso {accessKeyName} del proyecto {projectName} caducará el {date}. A partir de esa fecha, cualquier aplicación o pipeline de CI que la utilice perderá el acceso a Intlayer.',
      action:
        'Para evitar interrupciones, crea una nueva clave de acceso y actualiza tus variables de entorno antes de esa fecha.',
    },
    expired: {
      subject: 'Tu clave de acceso de Intlayer ha caducado',
      heading: 'Tu clave de acceso ha caducado',
      body: 'Tu clave de acceso {accessKeyName} del proyecto {projectName} caducó el {date}. Las solicitudes realizadas con ella ahora se rechazan.',
      action:
        'Crea una nueva clave de acceso y actualiza tus variables de entorno para restablecer el acceso.',
    },
    deleted: {
      subject: 'Se ha eliminado una clave de acceso de Intlayer',
      heading: 'Tu clave de acceso ha sido eliminada',
      body: 'Tu clave de acceso {accessKeyName} del proyecto {projectName} fue eliminada el {date}. Las solicitudes realizadas con ella ahora se rechazan.',
      action:
        'Si no eliminaste esta clave, revisa de inmediato los miembros de tu proyecto y la seguridad de tu cuenta.',
    },
    button: 'Gestionar claves de acceso',
  },
  ru: {
    expiringSoon: {
      subject:
        'Срок действия вашего ключа доступа Intlayer истекает через 3 дня',
      heading: 'Срок действия ключа доступа скоро истечёт',
      body: 'Срок действия ключа доступа {accessKeyName} для проекта {projectName} истекает {date}. После этой даты все приложения и CI-пайплайны, использующие его, потеряют доступ к Intlayer.',
      action:
        'Чтобы избежать перебоев, создайте новый ключ доступа и обновите переменные окружения до этой даты.',
    },
    expired: {
      subject: 'Срок действия вашего ключа доступа Intlayer истёк',
      heading: 'Срок действия ключа доступа истёк',
      body: 'Срок действия ключа доступа {accessKeyName} для проекта {projectName} истёк {date}. Запросы с этим ключом теперь отклоняются.',
      action:
        'Создайте новый ключ доступа и обновите переменные окружения, чтобы восстановить доступ.',
    },
    deleted: {
      subject: 'Ключ доступа Intlayer был удалён',
      heading: 'Ваш ключ доступа был удалён',
      body: 'Ключ доступа {accessKeyName} для проекта {projectName} был удалён {date}. Запросы с этим ключом теперь отклоняются.',
      action:
        'Если вы не удаляли этот ключ, немедленно проверьте участников проекта и безопасность вашего аккаунта.',
    },
    button: 'Управление ключами доступа',
  },
  ja: {
    expiringSoon: {
      subject: 'Intlayerのアクセスキーは3日後に期限切れになります',
      heading: 'アクセスキーの有効期限が近づいています',
      body: 'プロジェクト {projectName} のアクセスキー {accessKeyName} は {date} に期限切れになります。この日以降、このキーを使用するアプリケーションやCIパイプラインはIntlayerにアクセスできなくなります。',
      action:
        '中断を避けるため、それまでに新しいアクセスキーを作成し、環境変数を更新してください。',
    },
    expired: {
      subject: 'Intlayerのアクセスキーの有効期限が切れました',
      heading: 'アクセスキーの有効期限が切れました',
      body: 'プロジェクト {projectName} のアクセスキー {accessKeyName} は {date} に期限切れになりました。このキーを使用したリクエストは拒否されます。',
      action:
        'アクセスを復旧するには、新しいアクセスキーを作成し、環境変数を更新してください。',
    },
    deleted: {
      subject: 'Intlayerのアクセスキーが削除されました',
      heading: 'アクセスキーが削除されました',
      body: 'プロジェクト {projectName} のアクセスキー {accessKeyName} は {date} に削除されました。このキーを使用したリクエストは拒否されます。',
      action:
        'このキーを削除していない場合は、すぐにプロジェクトメンバーとアカウントのセキュリティを確認してください。',
    },
    button: 'アクセスキーを管理',
  },
  ko: {
    expiringSoon: {
      subject: 'Intlayer 액세스 키가 3일 후 만료됩니다',
      heading: '액세스 키가 곧 만료됩니다',
      body: '프로젝트 {projectName}의 액세스 키 {accessKeyName}이(가) {date}에 만료됩니다. 이후 이 키를 사용하는 모든 애플리케이션과 CI 파이프라인은 Intlayer에 접근할 수 없습니다.',
      action:
        '중단을 방지하려면 그 전에 새 액세스 키를 만들고 환경 변수를 업데이트하세요.',
    },
    expired: {
      subject: 'Intlayer 액세스 키가 만료되었습니다',
      heading: '액세스 키가 만료되었습니다',
      body: '프로젝트 {projectName}의 액세스 키 {accessKeyName}이(가) {date}에 만료되었습니다. 이 키를 사용한 요청은 이제 거부됩니다.',
      action:
        '접근을 복구하려면 새 액세스 키를 만들고 환경 변수를 업데이트하세요.',
    },
    deleted: {
      subject: 'Intlayer 액세스 키가 삭제되었습니다',
      heading: '액세스 키가 삭제되었습니다',
      body: '프로젝트 {projectName}의 액세스 키 {accessKeyName}이(가) {date}에 삭제되었습니다. 이 키를 사용한 요청은 이제 거부됩니다.',
      action:
        '이 키를 삭제하지 않았다면 즉시 프로젝트 멤버와 계정 보안을 확인하세요.',
    },
    button: '액세스 키 관리',
  },
  zh: {
    expiringSoon: {
      subject: '您的 Intlayer 访问密钥将在 3 天后过期',
      heading: '您的访问密钥即将过期',
      body: '项目 {projectName} 的访问密钥 {accessKeyName} 将于 {date} 过期。届时，所有使用该密钥的应用程序或 CI 流水线都将无法访问 Intlayer。',
      action: '为避免中断，请在此之前创建新的访问密钥并更新您的环境变量。',
    },
    expired: {
      subject: '您的 Intlayer 访问密钥已过期',
      heading: '您的访问密钥已过期',
      body: '项目 {projectName} 的访问密钥 {accessKeyName} 已于 {date} 过期。使用该密钥的请求现在会被拒绝。',
      action: '请创建新的访问密钥并更新您的环境变量以恢复访问。',
    },
    deleted: {
      subject: '一个 Intlayer 访问密钥已被删除',
      heading: '您的访问密钥已被删除',
      body: '项目 {projectName} 的访问密钥 {accessKeyName} 已于 {date} 被删除。使用该密钥的请求现在会被拒绝。',
      action: '如果您没有删除此密钥，请立即检查您的项目成员和帐户安全。',
    },
    button: '管理访问密钥',
  },
  de: {
    expiringSoon: {
      subject: 'Ihr Intlayer-Zugriffsschlüssel läuft in 3 Tagen ab',
      heading: 'Ihr Zugriffsschlüssel läuft bald ab',
      body: 'Ihr Zugriffsschlüssel {accessKeyName} für das Projekt {projectName} läuft am {date} ab. Danach verlieren alle Anwendungen und CI-Pipelines, die ihn verwenden, den Zugriff auf Intlayer.',
      action:
        'Um Unterbrechungen zu vermeiden, erstellen Sie bis dahin einen neuen Zugriffsschlüssel und aktualisieren Sie Ihre Umgebungsvariablen.',
    },
    expired: {
      subject: 'Ihr Intlayer-Zugriffsschlüssel ist abgelaufen',
      heading: 'Ihr Zugriffsschlüssel ist abgelaufen',
      body: 'Ihr Zugriffsschlüssel {accessKeyName} für das Projekt {projectName} ist am {date} abgelaufen. Anfragen mit diesem Schlüssel werden jetzt abgelehnt.',
      action:
        'Erstellen Sie einen neuen Zugriffsschlüssel und aktualisieren Sie Ihre Umgebungsvariablen, um den Zugriff wiederherzustellen.',
    },
    deleted: {
      subject: 'Ein Intlayer-Zugriffsschlüssel wurde gelöscht',
      heading: 'Ihr Zugriffsschlüssel wurde gelöscht',
      body: 'Ihr Zugriffsschlüssel {accessKeyName} für das Projekt {projectName} wurde am {date} gelöscht. Anfragen mit diesem Schlüssel werden jetzt abgelehnt.',
      action:
        'Wenn Sie diesen Schlüssel nicht gelöscht haben, überprüfen Sie sofort Ihre Projektmitglieder und die Sicherheit Ihres Kontos.',
    },
    button: 'Zugriffsschlüssel verwalten',
  },
  ar: {
    expiringSoon: {
      subject: 'ينتهي مفتاح الوصول الخاص بك في Intlayer خلال 3 أيام',
      heading: 'مفتاح الوصول الخاص بك سينتهي قريبًا',
      body: 'سينتهي مفتاح الوصول {accessKeyName} الخاص بالمشروع {projectName} في {date}. بعد هذا التاريخ، ستفقد جميع التطبيقات ومسارات CI التي تستخدمه الوصول إلى Intlayer.',
      action:
        'لتجنب أي انقطاع، أنشئ مفتاح وصول جديدًا وحدّث متغيرات البيئة قبل ذلك التاريخ.',
    },
    expired: {
      subject: 'انتهت صلاحية مفتاح الوصول الخاص بك في Intlayer',
      heading: 'انتهت صلاحية مفتاح الوصول الخاص بك',
      body: 'انتهت صلاحية مفتاح الوصول {accessKeyName} الخاص بالمشروع {projectName} في {date}. يتم الآن رفض الطلبات التي تستخدمه.',
      action: 'أنشئ مفتاح وصول جديدًا وحدّث متغيرات البيئة لاستعادة الوصول.',
    },
    deleted: {
      subject: 'تم حذف مفتاح وصول في Intlayer',
      heading: 'تم حذف مفتاح الوصول الخاص بك',
      body: 'تم حذف مفتاح الوصول {accessKeyName} الخاص بالمشروع {projectName} في {date}. يتم الآن رفض الطلبات التي تستخدمه.',
      action:
        'إذا لم تقم بحذف هذا المفتاح، فراجع أعضاء مشروعك وأمان حسابك على الفور.',
    },
    button: 'إدارة مفاتيح الوصول',
  },
  it: {
    expiringSoon: {
      subject: 'La tua chiave di accesso Intlayer scade tra 3 giorni',
      heading: 'La tua chiave di accesso sta per scadere',
      body: 'La tua chiave di accesso {accessKeyName} per il progetto {projectName} scadrà il {date}. Dopo questa data, ogni applicazione o pipeline CI che la utilizza perderà l’accesso a Intlayer.',
      action:
        'Per evitare interruzioni, crea una nuova chiave di accesso e aggiorna le variabili d’ambiente entro quella data.',
    },
    expired: {
      subject: 'La tua chiave di accesso Intlayer è scaduta',
      heading: 'La tua chiave di accesso è scaduta',
      body: 'La tua chiave di accesso {accessKeyName} per il progetto {projectName} è scaduta il {date}. Le richieste effettuate con essa vengono ora rifiutate.',
      action:
        'Crea una nuova chiave di accesso e aggiorna le variabili d’ambiente per ripristinare l’accesso.',
    },
    deleted: {
      subject: 'Una chiave di accesso Intlayer è stata eliminata',
      heading: 'La tua chiave di accesso è stata eliminata',
      body: 'La tua chiave di accesso {accessKeyName} per il progetto {projectName} è stata eliminata il {date}. Le richieste effettuate con essa vengono ora rifiutate.',
      action:
        'Se non hai eliminato tu questa chiave, controlla subito i membri del progetto e la sicurezza del tuo account.',
    },
    button: 'Gestisci le chiavi di accesso',
  },
  pt: {
    expiringSoon: {
      subject: 'Sua chave de acesso do Intlayer expira em 3 dias',
      heading: 'Sua chave de acesso expira em breve',
      body: 'Sua chave de acesso {accessKeyName} do projeto {projectName} expirará em {date}. Depois dessa data, todos os aplicativos ou pipelines de CI que a utilizam perderão o acesso ao Intlayer.',
      action:
        'Para evitar interrupções, crie uma nova chave de acesso e atualize suas variáveis de ambiente antes disso.',
    },
    expired: {
      subject: 'Sua chave de acesso do Intlayer expirou',
      heading: 'Sua chave de acesso expirou',
      body: 'Sua chave de acesso {accessKeyName} do projeto {projectName} expirou em {date}. As solicitações feitas com ela agora são rejeitadas.',
      action:
        'Crie uma nova chave de acesso e atualize suas variáveis de ambiente para restaurar o acesso.',
    },
    deleted: {
      subject: 'Uma chave de acesso do Intlayer foi excluída',
      heading: 'Sua chave de acesso foi excluída',
      body: 'Sua chave de acesso {accessKeyName} do projeto {projectName} foi excluída em {date}. As solicitações feitas com ela agora são rejeitadas.',
      action:
        'Se você não excluiu esta chave, verifique imediatamente os membros do seu projeto e a segurança da sua conta.',
    },
    button: 'Gerenciar chaves de acesso',
  },
  hi: {
    expiringSoon: {
      subject: 'आपकी Intlayer एक्सेस कुंजी 3 दिनों में समाप्त हो रही है',
      heading: 'आपकी एक्सेस कुंजी जल्द ही समाप्त हो रही है',
      body: 'प्रोजेक्ट {projectName} के लिए आपकी एक्सेस कुंजी {accessKeyName} {date} को समाप्त हो जाएगी। इसके बाद, इसका उपयोग करने वाले सभी एप्लिकेशन और CI पाइपलाइन Intlayer तक पहुंच खो देंगे।',
      action:
        'किसी भी रुकावट से बचने के लिए, उससे पहले एक नई एक्सेस कुंजी बनाएं और अपने एनवायरनमेंट वेरिएबल अपडेट करें।',
    },
    expired: {
      subject: 'आपकी Intlayer एक्सेस कुंजी समाप्त हो गई है',
      heading: 'आपकी एक्सेस कुंजी समाप्त हो गई है',
      body: 'प्रोजेक्ट {projectName} के लिए आपकी एक्सेस कुंजी {accessKeyName} {date} को समाप्त हो गई। इसके साथ किए गए अनुरोध अब अस्वीकार किए जाते हैं।',
      action:
        'पहुंच बहाल करने के लिए एक नई एक्सेस कुंजी बनाएं और अपने एनवायरनमेंट वेरिएबल अपडेट करें।',
    },
    deleted: {
      subject: 'एक Intlayer एक्सेस कुंजी हटा दी गई है',
      heading: 'आपकी एक्सेस कुंजी हटा दी गई है',
      body: 'प्रोजेक्ट {projectName} के लिए आपकी एक्सेस कुंजी {accessKeyName} {date} को हटा दी गई। इसके साथ किए गए अनुरोध अब अस्वीकार किए जाते हैं।',
      action:
        'यदि आपने यह कुंजी नहीं हटाई है, तो तुरंत अपने प्रोजेक्ट सदस्यों और खाते की सुरक्षा की जांच करें।',
    },
    button: 'एक्सेस कुंजियाँ प्रबंधित करें',
  },
  tr: {
    expiringSoon: {
      subject: 'Intlayer erişim anahtarınızın süresi 3 gün içinde doluyor',
      heading: 'Erişim anahtarınızın süresi yakında doluyor',
      body: '{projectName} projesi için {accessKeyName} erişim anahtarınızın süresi {date} tarihinde dolacak. Bu tarihten sonra onu kullanan tüm uygulamalar ve CI işlem hatları Intlayer erişimini kaybedecek.',
      action:
        'Kesinti yaşamamak için bu tarihten önce yeni bir erişim anahtarı oluşturun ve ortam değişkenlerinizi güncelleyin.',
    },
    expired: {
      subject: 'Intlayer erişim anahtarınızın süresi doldu',
      heading: 'Erişim anahtarınızın süresi doldu',
      body: '{projectName} projesi için {accessKeyName} erişim anahtarınızın süresi {date} tarihinde doldu. Bu anahtarla yapılan istekler artık reddediliyor.',
      action:
        'Erişimi geri kazanmak için yeni bir erişim anahtarı oluşturun ve ortam değişkenlerinizi güncelleyin.',
    },
    deleted: {
      subject: 'Bir Intlayer erişim anahtarı silindi',
      heading: 'Erişim anahtarınız silindi',
      body: '{projectName} projesi için {accessKeyName} erişim anahtarınız {date} tarihinde silindi. Bu anahtarla yapılan istekler artık reddediliyor.',
      action:
        'Bu anahtarı siz silmediyseniz, proje üyelerinizi ve hesap güvenliğinizi hemen kontrol edin.',
    },
    button: 'Erişim anahtarlarını yönet',
  },
  pl: {
    expiringSoon: {
      subject: 'Twój klucz dostępu Intlayer wygasa za 3 dni',
      heading: 'Twój klucz dostępu wkrótce wygaśnie',
      body: 'Twój klucz dostępu {accessKeyName} do projektu {projectName} wygaśnie {date}. Po tej dacie wszystkie aplikacje i potoki CI, które go używają, utracą dostęp do Intlayer.',
      action:
        'Aby uniknąć przerw, utwórz nowy klucz dostępu i zaktualizuj zmienne środowiskowe przed tą datą.',
    },
    expired: {
      subject: 'Twój klucz dostępu Intlayer wygasł',
      heading: 'Twój klucz dostępu wygasł',
      body: 'Twój klucz dostępu {accessKeyName} do projektu {projectName} wygasł {date}. Żądania wykonane przy jego użyciu są teraz odrzucane.',
      action:
        'Utwórz nowy klucz dostępu i zaktualizuj zmienne środowiskowe, aby przywrócić dostęp.',
    },
    deleted: {
      subject: 'Klucz dostępu Intlayer został usunięty',
      heading: 'Twój klucz dostępu został usunięty',
      body: 'Twój klucz dostępu {accessKeyName} do projektu {projectName} został usunięty {date}. Żądania wykonane przy jego użyciu są teraz odrzucane.',
      action:
        'Jeśli to nie Ty usunąłeś ten klucz, natychmiast sprawdź członków projektu i bezpieczeństwo swojego konta.',
    },
    button: 'Zarządzaj kluczami dostępu',
  },
  id: {
    expiringSoon: {
      subject: 'Kunci akses Intlayer Anda kedaluwarsa dalam 3 hari',
      heading: 'Kunci akses Anda akan segera kedaluwarsa',
      body: 'Kunci akses {accessKeyName} Anda untuk proyek {projectName} akan kedaluwarsa pada {date}. Setelah tanggal tersebut, setiap aplikasi atau pipeline CI yang menggunakannya akan kehilangan akses ke Intlayer.',
      action:
        'Untuk menghindari gangguan, buat kunci akses baru dan perbarui variabel lingkungan Anda sebelum tanggal tersebut.',
    },
    expired: {
      subject: 'Kunci akses Intlayer Anda telah kedaluwarsa',
      heading: 'Kunci akses Anda telah kedaluwarsa',
      body: 'Kunci akses {accessKeyName} Anda untuk proyek {projectName} telah kedaluwarsa pada {date}. Permintaan yang menggunakannya kini ditolak.',
      action:
        'Buat kunci akses baru dan perbarui variabel lingkungan Anda untuk memulihkan akses.',
    },
    deleted: {
      subject: 'Kunci akses Intlayer telah dihapus',
      heading: 'Kunci akses Anda telah dihapus',
      body: 'Kunci akses {accessKeyName} Anda untuk proyek {projectName} telah dihapus pada {date}. Permintaan yang menggunakannya kini ditolak.',
      action:
        'Jika Anda tidak menghapus kunci ini, segera periksa anggota proyek dan keamanan akun Anda.',
    },
    button: 'Kelola kunci akses',
  },
  vi: {
    expiringSoon: {
      subject: 'Khóa truy cập Intlayer của bạn sẽ hết hạn sau 3 ngày',
      heading: 'Khóa truy cập của bạn sắp hết hạn',
      body: 'Khóa truy cập {accessKeyName} của bạn cho dự án {projectName} sẽ hết hạn vào {date}. Sau ngày này, mọi ứng dụng hoặc pipeline CI sử dụng khóa này sẽ mất quyền truy cập Intlayer.',
      action:
        'Để tránh gián đoạn, hãy tạo khóa truy cập mới và cập nhật biến môi trường trước thời điểm đó.',
    },
    expired: {
      subject: 'Khóa truy cập Intlayer của bạn đã hết hạn',
      heading: 'Khóa truy cập của bạn đã hết hạn',
      body: 'Khóa truy cập {accessKeyName} của bạn cho dự án {projectName} đã hết hạn vào {date}. Các yêu cầu sử dụng khóa này hiện bị từ chối.',
      action:
        'Hãy tạo khóa truy cập mới và cập nhật biến môi trường để khôi phục quyền truy cập.',
    },
    deleted: {
      subject: 'Một khóa truy cập Intlayer đã bị xóa',
      heading: 'Khóa truy cập của bạn đã bị xóa',
      body: 'Khóa truy cập {accessKeyName} của bạn cho dự án {projectName} đã bị xóa vào {date}. Các yêu cầu sử dụng khóa này hiện bị từ chối.',
      action:
        'Nếu bạn không xóa khóa này, hãy kiểm tra ngay các thành viên dự án và bảo mật tài khoản của bạn.',
    },
    button: 'Quản lý khóa truy cập',
  },
  uk: {
    expiringSoon: {
      subject:
        'Термін дії вашого ключа доступу Intlayer закінчується через 3 дні',
      heading: 'Термін дії ключа доступу скоро закінчиться',
      body: 'Термін дії ключа доступу {accessKeyName} для проєкту {projectName} закінчується {date}. Після цієї дати всі застосунки та CI-конвеєри, що його використовують, втратять доступ до Intlayer.',
      action:
        'Щоб уникнути перебоїв, створіть новий ключ доступу та оновіть змінні середовища до цієї дати.',
    },
    expired: {
      subject: 'Термін дії вашого ключа доступу Intlayer закінчився',
      heading: 'Термін дії ключа доступу закінчився',
      body: 'Термін дії ключа доступу {accessKeyName} для проєкту {projectName} закінчився {date}. Запити з цим ключем тепер відхиляються.',
      action:
        'Створіть новий ключ доступу та оновіть змінні середовища, щоб відновити доступ.',
    },
    deleted: {
      subject: 'Ключ доступу Intlayer було видалено',
      heading: 'Ваш ключ доступу було видалено',
      body: 'Ключ доступу {accessKeyName} для проєкту {projectName} було видалено {date}. Запити з цим ключем тепер відхиляються.',
      action:
        'Якщо ви не видаляли цей ключ, негайно перевірте учасників проєкту та безпеку свого облікового запису.',
    },
    button: 'Керувати ключами доступу',
  },
  'he-IL': {
    expiringSoon: {
      subject: 'מפתח הגישה שלכם ל-Intlayer יפוג בעוד 3 ימים',
      heading: 'מפתח הגישה שלכם יפוג בקרוב',
      body: 'מפתח הגישה {accessKeyName} של הפרויקט {projectName} יפוג ב-{date}. לאחר תאריך זה, כל אפליקציה או צינור CI שמשתמשים בו יאבדו את הגישה ל-Intlayer.',
      action:
        'כדי למנוע הפרעה, צרו מפתח גישה חדש ועדכנו את משתני הסביבה שלכם לפני מועד זה.',
    },
    expired: {
      subject: 'פג תוקפו של מפתח הגישה שלכם ל-Intlayer',
      heading: 'פג תוקפו של מפתח הגישה שלכם',
      body: 'תוקפו של מפתח הגישה {accessKeyName} של הפרויקט {projectName} פג ב-{date}. בקשות שנשלחות איתו נדחות כעת.',
      action:
        'צרו מפתח גישה חדש ועדכנו את משתני הסביבה שלכם כדי לשחזר את הגישה.',
    },
    deleted: {
      subject: 'מפתח גישה ל-Intlayer נמחק',
      heading: 'מפתח הגישה שלכם נמחק',
      body: 'מפתח הגישה {accessKeyName} של הפרויקט {projectName} נמחק ב-{date}. בקשות שנשלחות איתו נדחות כעת.',
      action:
        'אם לא מחקתם מפתח זה, בדקו מיד את חברי הפרויקט ואת אבטחת החשבון שלכם.',
    },
    button: 'ניהול מפתחות גישה',
  },
};

/** Copy for the locale, English when the locale has no translation. */
const getLocaleCopy = (locale?: Locale): LocaleCopy =>
  resolveLocaleCopy(localeCopies, locale);

/**
 * Localized subject of an access key notification.
 *
 * @param kind - The lifecycle event.
 * @param locale - The recipient locale.
 */
export const getAccessKeyNotificationSubject = (
  kind: AccessKeyNotificationKind,
  locale?: Locale
): string => getLocaleCopy(locale)[kind].subject;

/**
 * Builds the email component of one access key lifecycle event, in one locale.
 *
 * @param kind - The lifecycle event.
 * @param locale - The locale of the copy and of the date.
 */
export const createAccessKeyNotificationEmail = (
  kind: AccessKeyNotificationKind,
  locale?: Locale
) => {
  const AccessKeyNotificationEmail = ({
    username,
    accessKeyName,
    projectName,
    eventDate,
    accessKeysUrl,
    supportUrl,
  }: AccessKeyNotificationEmailProps) => {
    const copy = getLocaleCopy(locale);
    const commonCopy = getCommonEmailCopy(locale);
    const kindCopy = copy[kind];

    return (
      <NotificationEmailLayout
        locale={locale}
        previewText={kindCopy.subject}
        heading={kindCopy.heading}
        greeting={fillPlaceholders(commonCopy.greeting, { username })}
        paragraphs={[
          fillPlaceholders(kindCopy.body, {
            accessKeyName: `"${accessKeyName}"`,
            projectName: `"${projectName}"`,
            date: formatEmailDate(eventDate, locale),
          }),
          kindCopy.action,
        ]}
        button={{ label: copy.button, url: accessKeysUrl }}
        support={{
          text: commonCopy.support,
          linkLabel: commonCopy.supportLink,
          url: supportUrl,
        }}
        footer={fillPlaceholders(commonCopy.footer, { username })}
      />
    );
  };

  AccessKeyNotificationEmail.PreviewProps = {
    username: 'aymericzip',
    accessKeyName: 'Production CI',
    projectName: 'My website',
    eventDate: '2026-11-23T10:00:00.000Z',
    accessKeysUrl: 'https://app.intlayer.org/projects',
    supportUrl: 'https://app.intlayer.org/support',
  } satisfies AccessKeyNotificationEmailProps;

  return AccessKeyNotificationEmail;
};

/** Default exports for the react-email preview server. */
export const AccessKeyExpiringSoonEmailEN =
  createAccessKeyNotificationEmail('expiringSoon');
export const AccessKeyExpiredEmailEN =
  createAccessKeyNotificationEmail('expired');
export const AccessKeyDeletedEmailEN =
  createAccessKeyNotificationEmail('deleted');

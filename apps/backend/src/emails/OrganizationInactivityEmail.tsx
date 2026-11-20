import type { Locale } from '@intlayer/types/allLocales';
import {
  type EmailLocale,
  fillPlaceholders,
  formatEmailDate,
  getCommonEmailCopy,
  NotificationEmailLayout,
  resolveLocaleCopy,
} from './components/NotificationEmailLayout';

export type OrganizationInactivityEmailProps = {
  username: string;
  organizationName: string;
  /** Date the organization and its data will be deleted on. */
  deletionDate: Date | string;
  loginUrl: string;
  supportUrl: string;
};

type OrganizationInactivityCopy = {
  subject: string;
  heading: string;
  /** Supports the `{organizationName}` placeholder. */
  inactivity: string;
  /** Supports the `{date}` placeholder. */
  deletion: string;
  action: string;
  button: string;
};

const englishCopy: OrganizationInactivityCopy = {
  subject: 'Your Intlayer organization will be deleted for inactivity',
  heading: 'Your organization will be deleted',
  inactivity:
    'Nobody has signed in to the organization {organizationName} for more than 6 months.',
  deletion:
    'On {date}, the organization will be permanently deleted along with all its data: projects, dictionaries, tags, assets, discussions and access keys. This cannot be undone.',
  action:
    'To keep your organization, simply sign in to Intlayer before this date.',
  button: 'Sign in to keep it',
};

const localeCopies: Record<EmailLocale, OrganizationInactivityCopy> = {
  en: englishCopy,
  'en-GB': englishCopy,
  fr: {
    subject: 'Votre organisation Intlayer sera supprimée pour inactivité',
    heading: 'Votre organisation va être supprimée',
    inactivity:
      "Personne ne s'est connecté à l'organisation {organizationName} depuis plus de 6 mois.",
    deletion:
      "Le {date}, l'organisation sera définitivement supprimée avec toutes ses données : projets, dictionnaires, tags, ressources, discussions et clés d'accès. Cette action est irréversible.",
    action:
      'Pour conserver votre organisation, connectez-vous simplement à Intlayer avant cette date.',
    button: 'Me connecter pour la conserver',
  },
  es: {
    subject: 'Tu organización de Intlayer será eliminada por inactividad',
    heading: 'Tu organización será eliminada',
    inactivity:
      'Nadie ha iniciado sesión en la organización {organizationName} desde hace más de 6 meses.',
    deletion:
      'El {date}, la organización se eliminará de forma permanente junto con todos sus datos: proyectos, diccionarios, etiquetas, recursos, discusiones y claves de acceso. Esta acción no se puede deshacer.',
    action:
      'Para conservar tu organización, simplemente inicia sesión en Intlayer antes de esa fecha.',
    button: 'Iniciar sesión para conservarla',
  },
  ru: {
    subject: 'Ваша организация Intlayer будет удалена из-за неактивности',
    heading: 'Ваша организация будет удалена',
    inactivity:
      'Никто не входил в организацию {organizationName} более 6 месяцев.',
    deletion:
      '{date} организация будет безвозвратно удалена вместе со всеми данными: проектами, словарями, тегами, ресурсами, обсуждениями и ключами доступа. Это действие нельзя отменить.',
    action:
      'Чтобы сохранить организацию, просто войдите в Intlayer до этой даты.',
    button: 'Войти и сохранить',
  },
  ja: {
    subject: 'Intlayerの組織は非アクティブのため削除されます',
    heading: '組織が削除されます',
    inactivity:
      '組織 {organizationName} には6か月以上誰もサインインしていません。',
    deletion:
      '{date} に、組織はプロジェクト、辞書、タグ、アセット、ディスカッション、アクセスキーを含むすべてのデータとともに完全に削除されます。この操作は取り消せません。',
    action: '組織を残すには、この日までにIntlayerにサインインしてください。',
    button: 'サインインして保持する',
  },
  ko: {
    subject: 'Intlayer 조직이 비활성으로 인해 삭제됩니다',
    heading: '조직이 삭제될 예정입니다',
    inactivity:
      '6개월 넘게 아무도 {organizationName} 조직에 로그인하지 않았습니다.',
    deletion:
      '{date}에 조직과 모든 데이터(프로젝트, 사전, 태그, 에셋, 토론, 액세스 키)가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.',
    action: '조직을 유지하려면 그 전에 Intlayer에 로그인하기만 하면 됩니다.',
    button: '로그인하여 유지하기',
  },
  zh: {
    subject: '您的 Intlayer 组织将因长期未活跃而被删除',
    heading: '您的组织将被删除',
    inactivity: '超过 6 个月没有任何人登录组织 {organizationName}。',
    deletion:
      '{date}，该组织及其所有数据（项目、词典、标签、资源、讨论和访问密钥）将被永久删除，且无法恢复。',
    action: '如需保留您的组织，只需在此日期之前登录 Intlayer 即可。',
    button: '登录以保留组织',
  },
  de: {
    subject: 'Ihre Intlayer-Organisation wird wegen Inaktivität gelöscht',
    heading: 'Ihre Organisation wird gelöscht',
    inactivity:
      'Seit mehr als 6 Monaten hat sich niemand bei der Organisation {organizationName} angemeldet.',
    deletion:
      'Am {date} wird die Organisation mit all ihren Daten dauerhaft gelöscht: Projekte, Wörterbücher, Tags, Assets, Diskussionen und Zugriffsschlüssel. Dies kann nicht rückgängig gemacht werden.',
    action:
      'Um Ihre Organisation zu behalten, melden Sie sich einfach vor diesem Datum bei Intlayer an.',
    button: 'Anmelden und behalten',
  },
  ar: {
    subject: 'سيتم حذف مؤسستك في Intlayer بسبب عدم النشاط',
    heading: 'سيتم حذف مؤسستك',
    inactivity:
      'لم يسجّل أي شخص الدخول إلى المؤسسة {organizationName} منذ أكثر من 6 أشهر.',
    deletion:
      'في {date}، سيتم حذف المؤسسة نهائيًا مع جميع بياناتها: المشاريع والقواميس والوسوم والملفات والمناقشات ومفاتيح الوصول. لا يمكن التراجع عن هذا الإجراء.',
    action:
      'للاحتفاظ بمؤسستك، ما عليك سوى تسجيل الدخول إلى Intlayer قبل هذا التاريخ.',
    button: 'سجّل الدخول للاحتفاظ بها',
  },
  it: {
    subject: 'La tua organizzazione Intlayer verrà eliminata per inattività',
    heading: 'La tua organizzazione verrà eliminata',
    inactivity:
      "Nessuno ha effettuato l'accesso all'organizzazione {organizationName} da più di 6 mesi.",
    deletion:
      "Il {date}, l'organizzazione verrà eliminata definitivamente insieme a tutti i suoi dati: progetti, dizionari, tag, risorse, discussioni e chiavi di accesso. L'operazione è irreversibile.",
    action:
      'Per mantenere la tua organizzazione, accedi semplicemente a Intlayer prima di questa data.',
    button: 'Accedi per mantenerla',
  },
  pt: {
    subject: 'Sua organização no Intlayer será excluída por inatividade',
    heading: 'Sua organização será excluída',
    inactivity:
      'Ninguém fez login na organização {organizationName} há mais de 6 meses.',
    deletion:
      'Em {date}, a organização será excluída permanentemente com todos os seus dados: projetos, dicionários, tags, recursos, discussões e chaves de acesso. Esta ação não pode ser desfeita.',
    action:
      'Para manter sua organização, basta fazer login no Intlayer antes dessa data.',
    button: 'Fazer login para mantê-la',
  },
  hi: {
    subject: 'आपका Intlayer संगठन निष्क्रियता के कारण हटा दिया जाएगा',
    heading: 'आपका संगठन हटा दिया जाएगा',
    inactivity:
      '6 महीने से अधिक समय से किसी ने भी संगठन {organizationName} में साइन इन नहीं किया है।',
    deletion:
      '{date} को संगठन अपने सभी डेटा के साथ स्थायी रूप से हटा दिया जाएगा: प्रोजेक्ट, डिक्शनरी, टैग, एसेट, चर्चाएँ और एक्सेस कुंजियाँ। इसे पूर्ववत नहीं किया जा सकता।',
    action:
      'अपना संगठन बनाए रखने के लिए, बस इस तारीख से पहले Intlayer में साइन इन करें।',
    button: 'साइन इन करके बनाए रखें',
  },
  tr: {
    subject: 'Intlayer organizasyonunuz etkinlik olmadığı için silinecek',
    heading: 'Organizasyonunuz silinecek',
    inactivity:
      '6 aydan uzun süredir kimse {organizationName} organizasyonuna giriş yapmadı.',
    deletion:
      '{date} tarihinde organizasyon tüm verileriyle birlikte kalıcı olarak silinecek: projeler, sözlükler, etiketler, varlıklar, tartışmalar ve erişim anahtarları. Bu işlem geri alınamaz.',
    action:
      'Organizasyonunuzu korumak için bu tarihten önce Intlayer’a giriş yapmanız yeterli.',
    button: 'Giriş yap ve koru',
  },
  pl: {
    subject:
      'Twoja organizacja Intlayer zostanie usunięta z powodu braku aktywności',
    heading: 'Twoja organizacja zostanie usunięta',
    inactivity:
      'Nikt nie zalogował się do organizacji {organizationName} od ponad 6 miesięcy.',
    deletion:
      '{date} organizacja zostanie trwale usunięta wraz ze wszystkimi danymi: projektami, słownikami, tagami, zasobami, dyskusjami i kluczami dostępu. Tej operacji nie można cofnąć.',
    action:
      'Aby zachować organizację, wystarczy zalogować się do Intlayer przed tą datą.',
    button: 'Zaloguj się, aby ją zachować',
  },
  id: {
    subject: 'Organisasi Intlayer Anda akan dihapus karena tidak aktif',
    heading: 'Organisasi Anda akan dihapus',
    inactivity:
      'Tidak ada yang masuk ke organisasi {organizationName} selama lebih dari 6 bulan.',
    deletion:
      'Pada {date}, organisasi akan dihapus secara permanen beserta seluruh datanya: proyek, kamus, tag, aset, diskusi, dan kunci akses. Tindakan ini tidak dapat dibatalkan.',
    action:
      'Untuk mempertahankan organisasi Anda, cukup masuk ke Intlayer sebelum tanggal tersebut.',
    button: 'Masuk untuk mempertahankannya',
  },
  vi: {
    subject: 'Tổ chức Intlayer của bạn sẽ bị xóa do không hoạt động',
    heading: 'Tổ chức của bạn sẽ bị xóa',
    inactivity:
      'Không ai đăng nhập vào tổ chức {organizationName} trong hơn 6 tháng.',
    deletion:
      'Vào {date}, tổ chức sẽ bị xóa vĩnh viễn cùng toàn bộ dữ liệu: dự án, từ điển, thẻ, tài nguyên, thảo luận và khóa truy cập. Hành động này không thể hoàn tác.',
    action:
      'Để giữ lại tổ chức, bạn chỉ cần đăng nhập vào Intlayer trước ngày này.',
    button: 'Đăng nhập để giữ lại',
  },
  uk: {
    subject: 'Вашу організацію Intlayer буде видалено через неактивність',
    heading: 'Вашу організацію буде видалено',
    inactivity:
      'Ніхто не входив до організації {organizationName} понад 6 місяців.',
    deletion:
      '{date} організацію буде остаточно видалено разом з усіма даними: проєктами, словниками, тегами, ресурсами, обговореннями та ключами доступу. Цю дію неможливо скасувати.',
    action:
      'Щоб зберегти організацію, просто увійдіть до Intlayer до цієї дати.',
    button: 'Увійти й зберегти',
  },
  'he-IL': {
    subject: 'ארגון ה-Intlayer שלכם יימחק עקב חוסר פעילות',
    heading: 'הארגון שלכם יימחק',
    inactivity: 'איש לא התחבר לארגון {organizationName} במשך יותר מ-6 חודשים.',
    deletion:
      'ב-{date} הארגון יימחק לצמיתות יחד עם כל הנתונים שלו: פרויקטים, מילונים, תגיות, קבצים, דיונים ומפתחות גישה. לא ניתן לבטל פעולה זו.',
    action: 'כדי לשמור על הארגון, פשוט התחברו ל-Intlayer לפני תאריך זה.',
    button: 'התחברות ושמירה',
  },
};

/**
 * Localized subject of the inactivity warning.
 *
 * @param locale - The recipient locale.
 */
export const getOrganizationInactivitySubject = (locale?: Locale): string =>
  resolveLocaleCopy(localeCopies, locale).subject;

/**
 * Builds the inactivity warning email component in one locale.
 *
 * @param locale - The locale of the copy and of the date.
 */
export const createOrganizationInactivityEmail = (locale?: Locale) => {
  const OrganizationInactivityEmail = ({
    username,
    organizationName,
    deletionDate,
    loginUrl,
    supportUrl,
  }: OrganizationInactivityEmailProps) => {
    const copy = resolveLocaleCopy(localeCopies, locale);
    const commonCopy = getCommonEmailCopy(locale);

    return (
      <NotificationEmailLayout
        locale={locale}
        previewText={copy.subject}
        heading={copy.heading}
        greeting={fillPlaceholders(commonCopy.greeting, { username })}
        paragraphs={[
          fillPlaceholders(copy.inactivity, {
            organizationName: `"${organizationName}"`,
          }),
          fillPlaceholders(copy.deletion, {
            date: formatEmailDate(deletionDate, locale),
          }),
          copy.action,
        ]}
        button={{ label: copy.button, url: loginUrl }}
        support={{
          text: commonCopy.support,
          linkLabel: commonCopy.supportLink,
          url: supportUrl,
        }}
        footer={fillPlaceholders(commonCopy.footer, { username })}
      />
    );
  };

  OrganizationInactivityEmail.PreviewProps = {
    username: 'aymericzip',
    organizationName: 'Acme',
    deletionDate: '2026-12-20T10:00:00.000Z',
    loginUrl: 'https://app.intlayer.org/auth/login',
    supportUrl: 'https://app.intlayer.org/support',
  } satisfies OrganizationInactivityEmailProps;

  return OrganizationInactivityEmail;
};

/** Default export for the react-email preview server. */
export const OrganizationInactivityEmailEN =
  createOrganizationInactivityEmail();

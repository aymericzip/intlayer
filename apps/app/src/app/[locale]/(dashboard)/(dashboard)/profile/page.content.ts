import { type Dictionary, t } from 'intlayer';

const profileDashboardContent = {
  key: 'profile-dashboard-page',
  content: {
    title: t({
      en: 'Profile settings',
      fr: 'Paramètres de profil',
      es: 'Configuración de perfil',
      de: 'Profileinstellungen',
      ja: 'プロフィール設定',
      ko: '프로필 설정',
      zh: '个人资料设置',
      it: 'Impostazioni del profilo',
      pt: 'Configurações do perfil',
      hi: 'प्रोफ़ाइल सेटिंग्स',
      ar: 'إعدادات الملف الشخصي',
      ru: 'Настройки профиля',
      'en-GB': 'Profile settings',
      tr: 'Profil ayarları',
      pl: 'Ustawienia profilu',
      id: 'Pengaturan Profil',
      vi: 'Cài đặt hồ sơ',
      uk: 'Налаштування профілю',
    }),
  },
  title: 'Profile settings page',
  description:
    'Content declaration for the profile settings page in the dashboard. Contains localized title for managing user profile preferences.',
  tags: ['dashboard page', 'profile settings'],
} satisfies Dictionary;

export default profileDashboardContent;

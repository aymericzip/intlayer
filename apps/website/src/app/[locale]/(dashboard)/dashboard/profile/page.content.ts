import { t, type DeclarationContent } from 'intlayer';

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
    }),
  },
} satisfies DeclarationContent;

export default profileDashboardContent;

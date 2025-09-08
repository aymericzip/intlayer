import { t, type Dictionary } from 'intlayer';

const profileDashboardContent = {
  key: 'organization-dashboard-page',
  content: {
    title: t({
      en: 'Organization settings',
      'en-GB': 'Organization settings',
      fr: "Paramètres de l'organisation",
      es: 'Configuración de la organización',
      de: 'Organisationseinstellungen',
      ja: '組織の設定',
      ko: '조직 설정',
      zh: '组织设置',
      it: "Impostazioni dell'organizzazione",
      pt: 'Configurações da organização',
      hi: 'संगठन सेटिंग',
      ar: 'إعدادات المنظمة',
      ru: 'Настройки организации',
      tr: 'Organizasyon ayarları',
    }),
  },
} satisfies Dictionary;

export default profileDashboardContent;

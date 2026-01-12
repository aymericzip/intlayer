import { type Dictionary, t } from 'intlayer';

const tagDashboardContent = {
  key: 'tags-dashboard-page',
  content: {
    title: t({
      en: 'Tags settings',
      fr: 'Paramètres des tags',
      es: 'Configuración de etiquetas',
      'en-GB': 'Tags settings',
      de: 'Tags Einstellungen',
      ja: 'タグ設定',
      ko: '태그 설정',
      zh: '标签设置',
      it: 'Impostazioni tag',
      pt: 'Configurações de tags',
      hi: 'टैग सेटिंग',
      ar: 'إعدادات الوسوم',
      ru: 'Настройки тегов',
      tr: 'Etiket ayarları',
      pl: 'Ustawienia tagów',
      id: 'Pengaturan tag',
      vi: 'Cài đặt thẻ',
      uk: 'Налаштування тегів',
    }),
  },
  title: 'Tags dashboard page',
  description:
    'Content declaration for the tags settings section in the dashboard editor. It defines multilingual values for the tags management page used in the CMS dashboard.',
  tags: ['dashboard', 'tags', 'settings', 'editor page'],
} satisfies Dictionary;

export default tagDashboardContent;

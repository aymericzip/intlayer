import { t, type DeclarationContent } from 'intlayer';

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
    }),
  },
} satisfies DeclarationContent;

export default tagDashboardContent;

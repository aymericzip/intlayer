import { t, type Dictionary } from 'intlayer';

const projectDashboardContent = {
  key: 'projects-dashboard-page',
  content: {
    title: t({
      en: 'Projects settings',
      'en-GB': 'Projects settings',
      fr: 'Paramètres des projets',
      es: 'Configuración de proyectos',
      de: 'Projekteinstellungen',
      ja: 'プロジェクト設定',
      ko: '프로젝트 설정',
      zh: '项目设置',
      it: 'Impostazioni dei progetti',
      pt: 'Configurações dos projetos',
      hi: 'प्रोजेक्ट सेटिंग्स',
      ar: 'إعدادات المشاريع',
      ru: 'Настройки проектов',
    }),
  },
} satisfies Dictionary;

export default projectDashboardContent;

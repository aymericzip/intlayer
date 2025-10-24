import { type Dictionary, t } from 'intlayer';

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
      tr: 'Proje ayarları',
      pl: 'Ustawienia projektów',
    }),
  },
  title: 'Projects dashboard page',
  description:
    'Content declaration for the projects dashboard page showing the settings or configuration options for project-related operations in the CMS.',
  tags: ['dashboard', 'projects', 'page content'],
} satisfies Dictionary;

export default projectDashboardContent;

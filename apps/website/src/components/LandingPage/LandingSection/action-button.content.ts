import { type Dictionary, t } from 'intlayer';

const actionButtonContent = {
  key: 'landing-section-action-button',
  content: {
    supportButton: t({
      ar: 'دعم المشروع',
      de: 'Das Projekt unterstützen',
      en: 'Support the project',
      'en-GB': 'Support the project',
      es: 'Apoyar el proyecto',
      fr: 'Soutenir le projet',
      hi: 'परियोजना का समर्थन करें',
      it: 'Sostenere il progetto',
      ja: 'プロジェクトをサポート',
      ko: '프로젝트 지원',
      pt: 'Apoiar o projeto',
      ru: 'Поддержать проект',
      tr: 'Projeyi destekle',
      zh: '支持项目',
      pl: 'Wesprzyj projekt',
      id: 'Dukung proyek ini',
      vi: 'Ủng hộ dự án',
    }),
    getStartedButton: t({
      ar: 'البدء',
      de: 'Loslegen',
      en: 'Get started',
      'en-GB': 'Get started',
      es: 'Empezar',
      fr: 'Commencer',
      hi: 'शुरू हो जाओ',
      it: 'Iniziare',
      ja: '始める',
      ko: '시작하기',
      pt: 'Começar',
      ru: 'Начать',
      tr: 'Başlayın',
      zh: '开始',
      pl: 'Rozpocznij',
      id: 'Mulai',
      vi: 'Bắt đầu',
    }),
  },
  title: 'Landing section action buttons',
  description:
    "Text content for the action buttons in the landing section, including labels like 'Support the project' and 'Get started'. This content is used to encourage user interaction on the landing page.",
  tags: ['landing page', 'call to action'],
} satisfies Dictionary;

export default actionButtonContent;

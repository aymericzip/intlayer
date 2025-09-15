import { t, type Dictionary } from 'intlayer';

const actionButtonContent = {
  key: 'landing-section-action-button',
  content: {
    supportButton: t({
      en: 'Support the project',
      'en-GB': 'Support the project',
      fr: 'Soutenir le projet',
      es: 'Apoyar el proyecto',
      de: 'Das Projekt unterstützen',
      ja: 'プロジェクトをサポート',
      ko: '프로젝트 지원',
      zh: '支持项目',
      it: 'Sostenere il progetto',
      pt: 'Apoiar o projeto',
      hi: 'परियोजना का समर्थन करें',
      ar: 'دعم المشروع',
      ru: 'Поддержать проект',
    }),
    getStartedButton: t({
      en: 'Get started',
      'en-GB': 'Get started',
      fr: 'Commencer',
      es: 'Empezar',
      de: 'Loslegen',
      ja: '始める',
      ko: '시작하기',
      zh: '开始',
      it: 'Iniziare',
      pt: 'Começar',
      hi: 'शुरू हो जाओ',
      ar: 'البدء',
      ru: 'Начать',
    }),
  },
} satisfies Dictionary;

export default actionButtonContent;

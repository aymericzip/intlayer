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
    }),
  },
} satisfies Dictionary;

export default actionButtonContent;

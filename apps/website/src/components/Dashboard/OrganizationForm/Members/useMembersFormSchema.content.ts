import { t, type Dictionary } from 'intlayer';

const content = {
  key: 'members-form-schema',
  content: {
    requiredErrorMember: t({
      en: 'Please add at least one member to the project',
      'en-GB': 'Please add at least one member to the project',
      fr: 'Veuillez ajouter au moins un membre au projet',
      es: 'Por favor, agregue al menos un miembro al proyecto',
      de: 'Bitte fügen Sie mindestens ein Mitglied zum Projekt hinzu',
      ja: 'プロジェクトに少なくとも1人のメンバーを追加してください',
      ko: '프로젝트에 최소한 한 명의 구성원을 추가하십시오',
      zh: '请至少为项目添加一名成员',
      it: 'Si prega di aggiungere almeno un membro al progetto',
      pt: 'Por favor, adicione pelo menos um membro ao projeto',
      hi: 'कृपया परियोजना में कम से कम एक सदस्य जोड़ें',
      ar: 'يرجى إضافة عضو واحد على الأقل إلى المشروع',
      ru: 'Пожалуйста, добавьте хотя бы одного участника в проект',
      tr: 'Lütfen projeye en az bir üye ekleyin',
    }),

    requiredErrorAdmin: t({
      en: 'Please add at least one admin to the project',
      'en-GB': 'Please add at least one admin to the project',
      fr: 'Veuillez ajouter au moins un administrateur au projet',
      es: 'Por favor, agregue al menos un administrador al proyecto',
      de: 'Bitte fügen Sie mindestens einen Administrator zum Projekt hinzu',
      ja: 'プロジェクトに少なくとも1人の管理者を追加してください',
      ko: '프로젝트에 최소한 한 명의 관리자를 추가하십시오',
      zh: '请至少为项目添加一名管理员',
      it: 'Si prega di aggiungere almeno un amministratore al progetto',
      pt: 'Por favor, adicione pelo menos um administrador ao projeto',
      hi: 'कृपया परियोजना में कम से कम एक प्रशासक जोड़ें',
      ar: 'يرجى إضافة مسؤول واحد على الأقل إلى المشروع',
      ru: 'Пожалуйста, добавьте хотя бы одного администратора в проект',
      tr: 'Lütfen projeye en az bir yönetici ekleyin',
    }),
  },
} satisfies Dictionary;

export default content;

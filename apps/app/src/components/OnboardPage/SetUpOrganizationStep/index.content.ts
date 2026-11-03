import { type Dictionary, t } from 'intlayer';

export const setUpOrganizationStepContent = {
  key: 'set-up-organization-step',
  content: {
    title: t({
      en: 'Select your organization',
      ar: 'اختر منظمتك',
      de: 'Wählen Sie Ihre Organisation',
      'en-GB': 'Select your organization',
      es: 'Selecciona tu organización',
      fr: 'Sélectionnez votre organisation',
      'he-IL': 'בחרו את הארגון שלכם',
      hi: 'अपने संगठन का चयन करें',
      id: 'Pilih organisasi Anda',
      it: 'Seleziona la tua organizzazione',
      ja: '組織を選択してください',
      ko: '조직을 선택하세요',
      pl: 'Wybierz swoją organizację',
      pt: 'Selecione sua organização',
      ru: 'Выберите вашу организацию',
      tr: 'Organizasyonunuzu seçin',
      uk: 'Оберіть вашу організацію',
      vi: 'Chọn tổ chức của bạn',
      zh: '选择您的组织',
    }),
  },
  title: 'Set up organization step',
  description:
    'Content declaration for selecting an organization during the onboarding process. Guides the user through choosing or creating an organization.',
  tags: ['onboarding', 'organization setup'],
} satisfies Dictionary;

export default setUpOrganizationStepContent;

import { t, type Dictionary } from 'intlayer';

export const setUpOrganizationStepContent = {
  key: 'set-up-organization-step',
  content: {
    title: t({
      en: 'Select your organization',
      'en-GB': 'Select your organization',
      fr: 'Sélectionnez votre organisation',
      es: 'Selecciona tu organización',
      de: 'Wählen Sie Ihre Organisation',
      ja: '組織を選択してください',
      ko: '조직을 선택하세요',
      zh: '选择您的组织',
      it: 'Seleziona la tua organizzazione',
      pt: 'Selecione sua organização',
      hi: 'अपने संगठन का चयन करें',
      ar: 'اختر منظمتك',
      ru: 'Выберите вашу организацию',
      tr: 'Organizasyonunuzu seçin',
    }),
  },
} satisfies Dictionary;

export default setUpOrganizationStepContent;

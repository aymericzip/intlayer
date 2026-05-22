import { type Dictionary, insert, t } from 'intlayer';

const localePickerContent = {
  key: 'locale-picker',
  content: {
    selectLocaleDisplayname: insert(
      t({
        en: 'Select locale: {{displayName}}',
      })
    ),

    search: t({
      en: 'Search…',
    }),

    localeList: t({
      en: 'Locale list',
    }),
  },
} satisfies Dictionary;

export default localePickerContent;

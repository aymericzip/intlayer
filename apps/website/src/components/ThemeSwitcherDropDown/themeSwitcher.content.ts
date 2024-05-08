import { t, type DeclarationContent } from 'intlayer';

type ButtonContent = {
  text: string;
  label: string;
};

// type ThemeSwitcherContent = {
//   themeSwitcherLabel: string;

//   selectionButtonContent: {
//     light: ButtonContent;
//     dark: ButtonContent;
//     system: ButtonContent;
//   };
// };

const themeSwitcherContent: DeclarationContent = {
  id: 'theme-switcher',
  themeSwitcherLabel: t({
    en: 'Theme selector',
    es: 'Selector de tema',
    fr: 'Sélecteur de thème',
  }),
  selectionButtonContent: {
    light: {
      text: t({
        en: 'Light mode',
        es: 'Modo claro',
        fr: 'Mode clair',
      }),
      label: t({
        en: 'Switch to light mode',
        es: 'Cambiar a modo claro',
        fr: 'Passer en mode clair',
      }),
    },
    dark: {
      text: t({
        en: 'Dark mode',
        es: 'Modo oscuro',
        fr: 'Mode sombre',
      }),
      label: t({
        en: 'Switch to dark mode',
        es: 'Cambiar a modo oscuro',
        fr: 'Passer en mode sombre',
      }),
    },
    system: {
      text: t({
        en: 'System mode',
        es: 'Modo del sistema',
        fr: 'Mode système',
      }),
      label: t({
        en: 'Restore to system mode',
        es: 'Restaurar al modo del sistema',
        fr: 'Restaurer le mode système',
      }),
    },
  },
};

export default themeSwitcherContent;

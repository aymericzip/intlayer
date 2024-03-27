// Can be imported from a shared config
export enum Locales {
  ENGLISH = 'en',
  FRENCH = 'fr',
  SPANISH = 'es',
  // Add your Languages here
}

// Available languages in the app
export const locales: Locales[] = [
  Locales.ENGLISH,
  Locales.FRENCH,
  Locales.SPANISH,
  // Add your Languages here
  // Update the `locales` array in `apps/next-app/middleware.ts` to include your new language
];

export const defaultLocale = Locales.ENGLISH;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  /**
   * `@intlayer/nuxtjs-i18n` replaces `@nuxtjs/i18n`: same composables
   * (`useI18n`, `useLocalePath`, `useSwitchLocalePath`, `useLocaleHead`…),
   * same `$t` / `<NuxtLinkLocale>`, backed by intlayer dictionaries.
   */
  modules: ['@intlayer/nuxtjs-i18n'],
  /**
   * Kept for migration. Locales, default locale and routing strategy are read
   * from `intlayer.config.ts`.
   */
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'es', language: 'es-ES', name: 'Español' },
    ],
  },
});

# @nuxtjs/i18n → Intlayer (compat example)

A Nuxt 4 app written with the **@nuxtjs/i18n** API (`useI18n`, `$t`,
`useLocalePath`, `useSwitchLocalePath`, `useLocaleHead`, `<NuxtLinkLocale>`,
`#i18n`), running on Intlayer through
[`@intlayer/nuxtjs-i18n`](../../compat/nuxtjs-i18n).

## How it works

- `nuxt.config.ts` lists `@intlayer/nuxtjs-i18n` instead of `@nuxtjs/i18n`.
  The module installs `nuxt-intlayer` (dictionaries, locale routes, Vite
  plugin), aliases `#i18n`, and auto-imports the @nuxtjs/i18n composables.
- Locales, default locale and routing come from `intlayer.config.ts`
  (`prefix-no-default` = `prefix_except_default`). The `i18n` key of
  `nuxt.config.ts` is accepted for migration and ignored.
- The message files stay in `i18n/locales/{locale}/{namespace}.json` (vue-i18n
  syntax: `{name}` placeholders and `|` plural forms). The `syncJSON` plugin
  turns each file into a dictionary: `t('home.title')` reads the `title` field
  of the `home` dictionary.

## Scripts

```sh
bun run dev      # nuxt dev
bun run build    # production build (optimize, minify, purge)
bun run preview  # serve the build
```

---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migracja do Intlayer z i18next, next-intl, react-intl, Lingui, vue-i18n i innych"
description: "Przenieś istniejącą aplikację do Intlayer bez przepisywania wywołań tłumaczeń. Compat adaptery zachowują API i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n i ngx-translate."
keywords:
  - migration
  - compat adapter
  - i18next
  - next-intl
  - react-intl
  - lingui
  - vue-i18n
  - ngx-translate
  - intlayer
  - i18n
slugs:
  - doc
  - migration
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Migracja do Intlayer z obecnej biblioteki i18n

Przepisanie każdego wywołania tłumaczenia w dużej aplikacji rzadko wchodzi w grę. Intlayer udostępnia **compat adaptery**: packages, które wystawiają **to samo API** co Twoja obecna biblioteka i18n, ale serwują komunikaty ze słowników Intlayer.

## Jak to działa

1. **Zachowaj swój kod.** Wywołania `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` czy `| translate` zostają bez zmian.
2. **Zachowaj pliki z komunikatami.** [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) (lub [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md)) czyta Twoje istniejące pliki i zapisuje do nich tłumaczenia.
3. **Podmień plugin bundlera.** Każdy adapter zawiera plugin, który buduje Twoje słowniki i przekierowuje importy oryginalnej biblioteki na adapter. Nie trzeba zmieniać żadnych importów.

Zyskujesz typowane klucze, ładowanie słowników per strona, tłumaczenie przez AI za pomocą [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md), [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) i [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md). Potem możesz przechodzić na natywne pliki `.content.ts`, komponent po komponencie.

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj [historię i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md).

## Dostępne compat adaptery

| Biblioteka                                               | Framework  | Adapter                   | Przewodnik migracji                                                                                                                   |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migracja z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migracja z react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migracja z next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migracja z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migracja z react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migracja z Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migracja z vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migracja z @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migracja z svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migracja z ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_ngx-translate_to_intlayer.md) |

## Szybki start

Niezależnie od biblioteki pierwszy krok jest taki sam. `intlayer init` wykrywa Twoją obecną bibliotekę i18n i instaluje odpowiedni adapter:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Następnie postępuj zgodnie z przewodnikiem migracji dla swojej biblioteki powyżej.

## Zaczynasz od zera?

Jeśli Twoja aplikacja nie ma jeszcze biblioteki i18n, pomiń adaptery i zacznij od natywnego API:

- [Intlayer z Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)
- [Intlayer z Vite i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md)
- [Intlayer z Vite i Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+vue.md)
- [Intlayer z Vite i Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+svelte.md)
- [Intlayer z Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_angular_21.md)

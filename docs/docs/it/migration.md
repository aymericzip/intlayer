---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrare a Intlayer da i18next, next-intl, react-intl, Lingui, vue-i18n e altri"
description: "Migra un'app esistente a Intlayer senza riscrivere le chiamate di traduzione. I compat adapter mantengono l'API di i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n e ngx-translate."
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

# Migrare a Intlayer dalla tua libreria i18n attuale

Riscrivere ogni chiamata di traduzione di un'app di grandi dimensioni raramente è un'opzione. Intlayer fornisce dei **compat adapter**: package che espongono la **stessa API** della tua libreria i18n attuale, ma servono i messaggi dai dizionari Intlayer.

## Come funziona

1. **Mantieni il tuo codice.** Le tue chiamate `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` o `| translate` restano invariate.
2. **Mantieni i tuoi file di messaggi.** Il [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) (o il [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md)) legge i tuoi file esistenti e vi riscrive le traduzioni.
3. **Sostituisci il plugin del bundler.** Ogni adapter fornisce un plugin che esegue il build dei dizionari e reindirizza gli import della libreria originale verso l'adapter. Non serve modificare alcun import.

Ottieni chiavi tipizzate, caricamento dei dizionari per pagina, traduzione con IA tramite la [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md), l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) e il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md). Poi puoi passare ai file `.content.ts` nativi, un componente alla volta.

> Per capire da dove vengono queste librerie, leggi [la storia dell'i18n in JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/history_of_i18n.md).

## Compat adapter disponibili

| Libreria                                                 | Framework  | Adapter                   | Guida alla migrazione                                                                                                                 |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migrare da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migrare da react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migrare da next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migrare da next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migrare da react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migrare da Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migrare da vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migrare da @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migrare da svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migrare da ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_ngx-translate_to_intlayer.md) |

## Avvio rapido

Qualunque sia la tua libreria, il primo passo è lo stesso. `intlayer init` rileva la tua libreria i18n attuale e installa l'adapter corrispondente:

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

Poi segui la guida alla migrazione della tua libreria qui sopra.

## Parti da zero?

Se la tua app non ha ancora una libreria i18n, salta gli adapter e inizia con l'API nativa:

- [Intlayer con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)
- [Intlayer con Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)
- [Intlayer con Vite e Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md)
- [Intlayer con Vite e Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+svelte.md)
- [Intlayer con Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_21.md)

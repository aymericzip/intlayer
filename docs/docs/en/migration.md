---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Migrate to Intlayer from i18next, next-intl, react-intl, Lingui, vue-i18n and more"
description: "Move an existing app to Intlayer without rewriting translation calls. Compat adapters keep the API of i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n and ngx-translate."
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

# Migrate to Intlayer from your current i18n library

Rewriting every translation call of a large app is rarely an option. Intlayer provides **compat adapters**: packages that expose the **same API** as your current i18n library, but serve messages from Intlayer dictionaries.

## How it works

1. **Keep your code.** Your `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` or `| translate` calls stay as they are.
2. **Keep your message files.** The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) (or the [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md)) reads your existing files and writes translations back to them.
3. **Swap the bundler plugin.** Each adapter ships a plugin that builds your dictionaries and redirects imports of the original library to the adapter. No import changes are needed.

You get typed keys, per-page dictionary loading, AI translation through the [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md), the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) and the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md). You can then move to native `.content.ts` files one component at a time.

> To understand where these libraries come from, read [the history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/history_of_i18n.md).

## Available compat adapters

| Library                                                  | Framework  | Adapter                   | Migration guide                                                                                                                         |
| -------------------------------------------------------- | ---------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Migrate from i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Migrate from react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Migrate from next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Migrate from next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Migrate from react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Migrate from Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Migrate from vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Migrate from @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Migrate from svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Migrate from ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_ngx-translate_to_intlayer.md) |

## Quick start

Whatever your library, the first step is the same. `intlayer init` detects your current i18n library and installs the matching adapter:

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

Then follow the migration guide of your library above.

## Starting from scratch?

If your app has no i18n library yet, skip the adapters and start with the native API:

- [Intlayer with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)
- [Intlayer with Vite and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)
- [Intlayer with Vite and Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md)
- [Intlayer with Vite and Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+svelte.md)
- [Intlayer with Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_angular_21.md)

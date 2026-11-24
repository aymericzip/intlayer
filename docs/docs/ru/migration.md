---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Миграция на Intlayer с i18next, next-intl, react-intl, Lingui, vue-i18n и других"
description: "Перенесите существующее приложение на Intlayer, не переписывая вызовы перевода. Compat adapters сохраняют API i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n и ngx-translate."
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

# Миграция на Intlayer с вашей текущей i18n-библиотеки

Переписать каждый вызов перевода в большом приложении почти никогда не получается. Intlayer предоставляет **compat adapters**: packages с **тем же API**, что и у вашей текущей i18n-библиотеки, но отдающие сообщения из словарей Intlayer.

## Как это работает

1. **Сохраните свой код.** Вызовы `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` или `| translate` остаются как есть.
2. **Сохраните файлы сообщений.** [Плагин sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) (или [плагин sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md)) читает ваши существующие файлы и записывает в них переводы обратно.
3. **Замените плагин бандлера.** Каждый adapter поставляется с плагином, который собирает ваши словари и перенаправляет импорты исходной библиотеки на adapter. Менять импорты не нужно.

Вы получаете типизированные ключи, загрузку словарей по страницам, перевод с помощью ИИ через [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md), [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) и [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md). Затем можно переходить на нативные файлы `.content.ts`, по одному компоненту за раз.

> Чтобы понять, откуда появились эти библиотеки, прочитайте [историю i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md).

## Доступные compat adapters

| Библиотека                                               | Фреймворк  | Adapter                   | Руководство по миграции                                                                                                               |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Миграция с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Миграция с react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Миграция с next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Миграция с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Миграция с react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Миграция с Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Миграция с vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Миграция с @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Миграция с svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Миграция с ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_ngx-translate_to_intlayer.md) |

## Быстрый старт

Какой бы ни была ваша библиотека, первый шаг одинаков. `intlayer init` определяет вашу текущую i18n-библиотеку и устанавливает соответствующий adapter:

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

Затем следуйте руководству по миграции для вашей библиотеки выше.

## Начинаете с нуля?

Если в вашем приложении ещё нет i18n-библиотеки, пропустите adapters и начните с нативного API:

- [Intlayer с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)
- [Intlayer с Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)
- [Intlayer с Vite и Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md)
- [Intlayer с Vite и Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+svelte.md)
- [Intlayer с Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_angular_21.md)

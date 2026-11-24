---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Міграція на Intlayer з i18next, next-intl, react-intl, Lingui, vue-i18n та інших"
description: "Перенесіть наявний застосунок на Intlayer, не переписуючи виклики перекладу. Compat adapters зберігають API i18next, react-i18next, next-intl, react-intl, Lingui, vue-i18n, svelte-i18n та ngx-translate."
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

# Міграція на Intlayer з вашої поточної i18n-бібліотеки

Переписати кожен виклик перекладу у великому застосунку майже ніколи не вдається. Intlayer надає **compat adapters**: packages з **тим самим API**, що й ваша поточна i18n-бібліотека, але які віддають повідомлення зі словників Intlayer.

## Як це працює

1. **Збережіть свій код.** Виклики `useTranslation`, `useTranslations`, `useIntl`, `useLingui`, `$_` або `| translate` залишаються як є.
2. **Збережіть файли повідомлень.** [Плагін sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) (або [плагін sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md)) читає ваші наявні файли та записує в них переклади назад.
3. **Замініть плагін бандлера.** Кожен adapter постачається з плагіном, який збирає ваші словники та перенаправляє імпорти початкової бібліотеки на adapter. Змінювати імпорти не потрібно.

Ви отримуєте типізовані ключі, завантаження словників для кожної сторінки, переклад за допомогою ШІ через [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md), [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) і [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md). Потім можна переходити на нативні файли `.content.ts`, по одному компоненту за раз.

> Щоб зрозуміти, звідки з'явилися ці бібліотеки, прочитайте [історію i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md).

## Доступні compat adapters

| Бібліотека                                               | Фреймворк  | Adapter                   | Посібник з міграції                                                                                                                   |
| -------------------------------------------------------- | ---------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [Міграція з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [Міграція з react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [Міграція з next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [Міграція з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [Міграція з react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [Міграція з Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [Міграція з vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [Міграція з @nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [Міграція з svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [Міграція з ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_ngx-translate_to_intlayer.md) |

## Швидкий старт

Хоч якою б не була ваша бібліотека, перший крок однаковий. `intlayer init` визначає вашу поточну i18n-бібліотеку та встановлює відповідний adapter:

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

Потім дотримуйтеся посібника з міграції для вашої бібліотеки вище.

## Починаєте з нуля?

Якщо у вашому застосунку ще немає i18n-бібліотеки, пропустіть adapters і почніть із нативного API:

- [Intlayer з Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)
- [Intlayer з Vite та React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)
- [Intlayer з Vite та Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md)
- [Intlayer з Vite та Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+svelte.md)
- [Intlayer з Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md)

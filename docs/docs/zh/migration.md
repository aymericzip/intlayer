---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "从 i18next、next-intl、react-intl、Lingui、vue-i18n 等迁移到 Intlayer"
description: "无需重写翻译调用即可将现有应用迁移到 Intlayer。compat adapter 保留 i18next、react-i18next、next-intl、react-intl、Lingui、vue-i18n、svelte-i18n 和 ngx-translate 的 API。"
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

# 从当前的 i18n 库迁移到 Intlayer

重写大型应用中的每一个翻译调用通常不现实。Intlayer 提供 **compat adapter**：这些 package 暴露与你当前 i18n 库 **相同的 API**，但从 Intlayer 字典中提供消息。

## 工作原理

1. **保留你的代码。** `useTranslation`、`useTranslations`、`useIntl`、`useLingui`、`$_` 或 `| translate` 调用保持不变。
2. **保留你的消息文件。** [sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)（或 [sync PO 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md)）读取你现有的文件，并将翻译写回其中。
3. **替换打包工具插件。** 每个 adapter 都附带一个插件，用于构建你的字典，并将原库的 import 重定向到 adapter。无需修改任何 import。

你将获得类型化的键、按页面加载字典、通过 [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md) 进行 AI 翻译、[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 和 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。之后可以逐个组件迁移到原生的 `.content.ts` 文件。

> 想了解这些库的由来，请阅读 [JavaScript i18n 的历史](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/history_of_i18n.md)。

## 可用的 compat adapter

| 库                                                       | 框架       | Adapter                   | 迁移指南                                                                                                                           |
| -------------------------------------------------------- | ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                       | JavaScript | `@intlayer/i18next`       | [从 i18next 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md)             |
| [react-i18next](https://react.i18next.com)               | React      | `@intlayer/react-i18next` | [从 react-i18next 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_react-i18next_to_intlayer.md) |
| [next-i18next](https://github.com/i18next/next-i18next)  | Next.js    | `@intlayer/next-i18next`  | [从 next-i18next 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-i18next_to_intlayer.md)   |
| [next-intl](https://next-intl.dev)                       | Next.js    | `@intlayer/next-intl`     | [从 next-intl 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_next-intl_to_intlayer.md)         |
| [react-intl](https://formatjs.github.io/docs/react-intl) | React      | `@intlayer/react-intl`    | [从 react-intl 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_react-intl_to_intlayer.md)       |
| [Lingui](https://lingui.dev)                             | React      | `@intlayer/lingui`        | [从 Lingui 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_lingui_to_intlayer.md)               |
| [vue-i18n](https://vue-i18n.intlify.dev)                 | Vue        | `@intlayer/vue-i18n`      | [从 vue-i18n 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_vue-i18n_to_intlayer.md)           |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org)                  | Nuxt       | `@intlayer/nuxtjs-i18n`   | [从 @nuxtjs/i18n 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_nuxtjs_i18n_to_intlayer.md)    |
| [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Svelte     | `@intlayer/svelte-i18n`   | [从 svelte-i18n 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_svelte-i18n_to_intlayer.md)     |
| [ngx-translate](https://ngx-translate.org)               | Angular    | `@intlayer/ngx-translate` | [从 ngx-translate 迁移](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_ngx-translate_to_intlayer.md) |

## 快速开始

无论使用哪个库，第一步都相同。`intlayer init` 会检测你当前的 i18n 库并安装对应的 adapter：

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

然后按照上方对应库的迁移指南操作。

## 从零开始？

如果你的应用还没有 i18n 库，可以跳过 adapter，直接使用原生 API：

- [在 Next.js 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)
- [在 Vite 和 React 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+react.md)
- [在 Vite 和 Vue 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+vue.md)
- [在 Vite 和 Svelte 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_vite+svelte.md)
- [在 Angular 中使用 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_angular_21.md)

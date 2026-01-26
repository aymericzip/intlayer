---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer 包文档
description: 针对 Vue 的 Intlayer 集成，为 Vue 应用提供插件和 composables。
keywords:
  - vue-intlayer
  - vue
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出的文档
---

# vue-intlayer 包

`vue-intlayer` 包提供将 Intlayer 集成到 Vue 应用的必要工具。它包含一个 Vue 插件和用于处理多语言内容的 composables（组合式函数）。

## 安装

```bash
npm install vue-intlayer
```

## 导出

### 插件

导入：

```tsx
import "vue-intlayer";
```

| 函数              | 说明                                    |
| ----------------- | --------------------------------------- |
| `installIntlayer` | 在你的应用中安装 Intlayer 的 Vue 插件。 |

### 组合式函数 (Composables)

导入：

```tsx
import "vue-intlayer";
```

| 组合函数               | 说明                                                                             | 相关文档                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | 基于 `useDictionary`，但注入来自生成声明的经过优化的字典版本。                   | -                                                                                                                     |
| `useDictionary`        | 处理类似字典的对象（key、content）。它会处理 `t()` 翻译、枚举等。                | -                                                                                                                     |
| `useDictionaryAsync`   | 与 `useDictionary` 相同，但处理异步字典。                                        | -                                                                                                                     |
| `useDictionaryDynamic` | 与 `useDictionary` 相同，但处理动态字典。                                        | -                                                                                                                     |
| `useLocale`            | 返回当前 locale 以及用于设置它的函数。                                           | -                                                                                                                     |
| `useRewriteURL`        | 客户端 composable，用于管理 URL 重写。如果存在本地化的重写规则，会自动更新 URL。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | 返回当前 locale 的 Intl 对象。                                                   | -                                                                                                                     |
| `useLoadDynamic`       | 用于加载动态字典的 composable。                                                  | -                                                                                                                     |

### 函数

导入：

```tsx
import "vue-intlayer";
```

| 函数            | 描述                                                              |
| --------------- | ----------------------------------------------------------------- |
| `getDictionary` | 处理类似字典的对象（key，content）。它会处理 `t()` 翻译、枚举等。 |
| `getIntlayer`   | 基于 `getDictionary`，但会注入来自生成声明的字典的优化版本。      |

### Markdown

导入：

```tsx
import "vue-intlayer/markdown";
```

| 函数                      | 描述                                               |
| ------------------------- | -------------------------------------------------- |
| `installIntlayerMarkdown` | Vue 插件，用于在你的应用中安装 Intlayer Markdown。 |

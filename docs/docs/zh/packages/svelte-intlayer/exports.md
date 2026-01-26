---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: svelte-intlayer 包文档
description: 针对 Svelte 的 Intlayer 集成，为 Svelte 应用提供 setup 函数和 stores。
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出的文档
---

# svelte-intlayer 包

`svelte-intlayer` 包提供将 Intlayer 集成到 Svelte 应用所需的工具。它包含用于处理多语言内容的 setup 函数和 stores。

## 安装

```bash
npm install svelte-intlayer
```

## 导出

### 设置

导入：

```tsx
import "svelte-intlayer";
```

| 函数            | 描述                                       |
| --------------- | ------------------------------------------ |
| `setupIntlayer` | 在你的 Svelte 应用中设置 Intlayer 的函数。 |

### Store（存储）

Import:

```tsx
import "svelte-intlayer";
```

| Store           | 描述                                    |
| --------------- | --------------------------------------- |
| `intlayerStore` | 包含当前 Intlayer 状态的 Svelte store。 |

### Hooks（上下文）

Import:

```tsx
import "svelte-intlayer";
```

| Function               | Description                                                               | Related Doc                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | 基于 `useDictionary`，但注入从生成的声明中得到的优化版本的字典。          | -                                                                                                                        |
| `useDictionary`        | 处理类似字典的对象（键、内容）。它处理 `t()` 翻译、枚举等。               | -                                                                                                                        |
| `useDictionaryAsync`   | 与 `useDictionary` 相同，但处理异步字典。                                 | -                                                                                                                        |
| `useDictionaryDynamic` | 与 `useDictionary` 相同，但处理动态字典。                                 | -                                                                                                                        |
| `useLocale`            | 返回当前 locale 以及用于设置它的函数。                                    | -                                                                                                                        |
| `useRewriteURL`        | 用于客户端管理 URL 重写的函数。如果存在本地化的重写规则，会自动更新 URL。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | 返回当前 locale 的 Intl 对象。                                            | -                                                                                                                        |

### Markdown

导入：

```tsx
import "svelte-intlayer";
```

| 函数                  | 描述                                                 |
| --------------------- | ---------------------------------------------------- |
| `setIntlayerMarkdown` | 用于在你的 Svelte 应用中设置 markdown 上下文的函数。 |

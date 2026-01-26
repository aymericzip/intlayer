---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: solid-intlayer 包文档
description: Intlayer 在 Solid 上的集成，提供用于 Solid 应用的 providers 和 hooks。
keywords:
  - solid-intlayer
  - solidjs
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出的文档
---

# solid-intlayer 包

`solid-intlayer` 包提供将 Intlayer 集成到 Solid 应用所需的工具。它包含用于处理多语言内容的 providers 和 hooks。

## 安装

```bash
npm install solid-intlayer
```

## 导出

### Provider（提供者）

导入：

```tsx
import "solid-intlayer";
```

| 组件               | 描述                                                      | 相关文档                                                                                                                      |
| ------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | 主要的 provider，用于包裹你的应用并提供 Intlayer 上下文。 | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/IntlayerProvider.md) |

### 钩子 (Hooks)

导入：

```tsx
import "solid-intlayer";
```

| 钩子                   | 描述                                                                       | 相关文档                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | 基于 `useDictionary`，但注入了从生成的声明中优化后的字典版本。             | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | 处理类似字典（键，内容）的对象。它处理 `t()` 翻译、枚举等。                | -                                                                                                                       |
| `useDictionaryAsync`   | 与 `useDictionary` 相同，但处理异步字典。                                  | -                                                                                                                       |
| `useDictionaryDynamic` | 与 `useDictionary` 相同，但处理动态字典。                                  | -                                                                                                                       |
| `useLocale`            | 返回当前 locale 和一个用于设置它的函数。                                   | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | 客户端 hook，用于管理 URL 重写。如果存在本地化的重写规则，会自动更新 URL。 | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | 返回当前 locale 的 Intl 对象。                                             | -                                                                                                                       |
| `useLoadDynamic`       | 用于加载动态字典的 Hook。                                                  | -                                                                                                                       |
| `t`                    | 根据当前 locale 选择内容。                                                 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)                  |

### 组件

导入：

```tsx
import "solid-intlayer";
```

| 组件               | 描述                                  |
| ------------------ | ------------------------------------- |
| `MarkdownProvider` | 用于 Markdown 渲染上下文的 Provider。 |

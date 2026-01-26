---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer 包 文档
description: 针对 Angular 的 Intlayer 集成，为 Angular 应用提供 providers 和 services。
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一了所有导出项的文档
---

# angular-intlayer 包

`angular-intlayer` 包提供将 Intlayer 集成到 Angular 应用所需的工具。它包含用于处理多语言内容的 providers 和 services。

## 安装

```bash
npm install angular-intlayer
```

## 导出

导入:

```tsx
import "angular-intlayer";
```

### 配置

| 函数              | 描述                                      |
| ----------------- | ----------------------------------------- |
| `provideIntlayer` | 为您的 Angular 应用提供 Intlayer 的函数。 |

### 钩子

| 钩子                   | 描述                                                                | 相关文档 |
| ---------------------- | ------------------------------------------------------------------- | -------- |
| `useIntlayer`          | 基于 `useDictionary`，但从生成的声明注入了经过优化的字典版本。      | -        |
| `useDictionary`        | 处理看起来像字典的对象（key, content）。它处理 `t()` 翻译、枚举等。 | -        |
| `useDictionaryAsync`   | 与 `useDictionary` 相同，但处理异步字典。                           | -        |
| `useDictionaryDynamic` | 与 `useDictionary` 相同，但处理动态字典。                           | -        |
| `useLocale`            | 返回当前 locale 以及一个用于设置它的函数。                          | -        |
| `useIntl`              | 返回当前 locale 的 Intl 对象。                                      | -        |
| `useLoadDynamic`       | 用于加载动态字典的 Hook。                                           | -        |

### 组件

| 组件                        | 描述                                    |
| --------------------------- | --------------------------------------- |
| `IntlayerMarkdownComponent` | 用于渲染 Markdown 内容的 Angular 组件。 |

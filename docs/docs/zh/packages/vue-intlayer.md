---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer 包文档
description: 专为 Vue 设计的 Intlayer 集成，提供用于 Vue 应用的插件和 composables，以处理多语言内容。
keywords:
  - vue-intlayer
  - vue
  - 国际化
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一所有导出的文档
---

# vue-intlayer 包

`vue-intlayer` 包为将 Intlayer 集成到 Vue 应用中提供必要的工具。它包含一个 Vue 插件和用于处理多语言内容的 composables。

## 安装

```bash
npm install vue-intlayer
```

## 导出

### 插件

| Function          | Description                                 |
| ----------------- | ------------------------------------------- |
| `installIntlayer` | 用于在你的应用中安装 Intlayer 的 Vue 插件。 |

### 组合式 (Composables)

| 组合式          | 描述                                     |
| --------------- | ---------------------------------------- |
| `useIntlayer`   | 通过其键选择一个字典并返回其内容。       |
| `useDictionary` | 通过其键选择一个字典并返回其内容。       |
| `useLocale`     | 返回当前 locale 和一个用于设置它的函数。 |
| `useIntl`       | 返回当前 locale 的 Intl 对象。           |

### 函数

| 函数            | 描述               |
| --------------- | ------------------ |
| `getDictionary` | 检索字典。         |
| `getIntlayer`   | 从字典中检索内容。 |

### Markdown

| Function                  | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `installIntlayerMarkdown` | 在你的应用中安装 Intlayer Markdown 的 Vue 插件。 |

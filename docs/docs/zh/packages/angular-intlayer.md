---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer 包 文档
description: 为 Intlayer 提供的 Angular 专用集成，为 Angular 应用提供 providers 和 services。
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 统一所有导出项的文档
---

# angular-intlayer 包

`angular-intlayer` 包提供将 Intlayer 集成到 Angular 应用所需的工具。它包含用于处理多语言内容的 providers 和 services。

## 安装

```bash
npm install angular-intlayer
```

## 导出

### 设置

| 函数              | 描述                                        |
| ----------------- | ------------------------------------------- |
| `provideIntlayer` | 在你的 Angular 应用中提供 Intlayer 的函数。 |

### 服务

| 服务              | 描述                                           |
| ----------------- | ---------------------------------------------- |
| `IntlayerService` | 根据键选择一个字典并返回其内容的服务。         |
| `LocaleService`   | 返回当前 locale 并提供用于设置它的函数的服务。 |

### 组件

| 组件                        | 描述                                    |
| --------------------------- | --------------------------------------- |
| `IntlayerMarkdownComponent` | 用于渲染 Markdown 内容的 Angular 组件。 |

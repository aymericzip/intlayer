---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "从 Next Translate 迁移到 Intlayer"
description: "了解如何使用兼容适配器将您的 Next.js 应用程序从 next-translate 迁移到 Intlayer。"
keywords:
  - next-translate
  - nextjs
  - intlayer
  - 迁移
  - 兼容
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# 从 Next Translate 迁移到 Intlayer

从 `next-translate` 迁移到 Intlayer 几乎是一个直接替换，可以保留您现有的语法和标签。

## 操作步骤

在您的项目中初始化 Intlayer：

```bash
npx intlayer init
```

CLI 将生成您的配置文件。然后，您可以在 `next.config.ts` 中应用 Intlayer 插件，该插件注入构建时子路径别名，将 `next-translate/useTranslation` 映射到 `@intlayer/next-translate`。

## 底层原理

`next-translate` 提供了如 `useTranslation('ns')`、`t('ns:key.path')` 的 hook 以及 `<Trans>` 组件。

底层实现：

- **插值与复数：** 它紧密依赖 `react-i18next` 适配器的行为。动态处理 `{{var}}` 占位符以及从 `key_0`、`key_one` 和 `key_other` 等后缀映射的复数化。
- **`<Trans>` 组件：** 直接支持类 HTML 标签解析，并支持基于数组的 `components` prop。
- **命名空间：** 子路径别名确保您的 `useTranslation` 引用正确的内部字典命名空间，无需手动修改。

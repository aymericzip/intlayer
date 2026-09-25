---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Intlayer 兼容适配器"
description: "使用兼容适配器将您现有的 i18n 解决方案零摩擦迁移到 Intlayer。"
keywords:
  - 兼容
  - 迁移
  - 国际化
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Intlayer 兼容适配器

将大型应用程序迁移到新的国际化库可能令人望而生畏。为了简化这一过渡，Intlayer 为生态系统中最流行的 i18n 库提供了**兼容适配器**。

这些适配器 package 暴露与您现有 i18n 库**完全相同的公共 API**，但在运行时将所有翻译工作委托给 Intlayer。

## 工作原理

使用兼容适配器时，您无需重写应用程序的导入或更改翻译 hook 和组件的使用方式。相反，Intlayer 的 bundler 插件会自动将您现有的导入别名指向 Intlayer 兼容 package。

例如，开发者将 `import { useTranslation } from 'react-i18next'` 替换为 `import { useTranslation } from '@intlayer/react-i18next'`（通过 bundler 插件自动完成），应用程序继续工作，翻译现在由 Intlayer 字典提供。键值也会与您的 Intlayer 字典进行类型检查！

## 可用兼容适配器

在下方选择您现有的库，了解如何无缝迁移：

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/vue-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/transloco" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/svelte-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/react-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/polyglot" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/nuxtjs-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/ngx-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/next-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/next-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/lingui" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/i18n-js" />
</TechGrid>

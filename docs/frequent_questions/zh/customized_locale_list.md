---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 如何自定义语言列表？
description: 学习如何自定义语言列表。
keywords:
  - 语言
  - 列表
  - intlayer
  - 配置
  - availableLocales
  - defaultLocale
  - useLocale
  - 钩子
  - 语言环境
  - 列表
slugs:
  - doc
  - faq
  - customized-locale-list
---

# 是否可以屏蔽某种语言类型，比如英语？我在词典中添加了英语，但暂时不想让网站上显示英语

是的，你可以通过在 Intlayer 配置中使用 `availableLocales` 选项来屏蔽某种语言类型，比如英语。

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

或者

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

此配置将更改你的 `t()` 函数的类型，只包含可用的语言环境。

`availableLocales` 是可选的，如果你不提供它，所有语言环境都将可用。

请注意，所有包含在 `availableLocales` 选项中的语言环境都应包含在 `locales` 选项中。

请注意，如果你使用 `useLocale` 钩子，`availableLocales` 选项将用于设置对语言环境列表的访问权限。

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```

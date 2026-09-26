---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useDictionary 钩子文档 | remix-intlayer
description: 了解如何在 Remix 3 应用程序中使用 useDictionary 钩子为当前请求语言环境解析字典对象。
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useDictionary 钩子初始文档"
author: aymericzip
---

# useDictionary 钩子文档

`useDictionary` 钩子用于转换导入的或内联的字典对象，并在 Remix 3 应用程序中返回针对当前请求语言环境解析的内容。

与通过全局字典注册表中的字符串键查找字典的 `useIntlayer` 不同，`useDictionary` 直接接受字典对象。

## 使用方法

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

你也可以传入使用 `t()` 定义的内联字典：

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        zh: "版权所有。",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## 参数

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: 字典对象或限定字典组。
2. **`localeOrSelector`**（可选）: 特定语言环境或选择器对象（`{ item }`、`{ variant }`，可包含 `locale`）。提供时优先于请求语言环境。

## 说明

该钩子执行以下任务：

1. **语言环境检测**: 从 `intlayer()` 中间件创建的 `AsyncLocalStorage` 存储中读取活动请求语言环境。
2. **内容解析**: 根据解析出的语言环境评估翻译 (`t()`)、枚举、条件和嵌套结构。
3. **选择器处理**: 应用参数中指定的任何项或变体选择器。

## 相关文档

- [`intlayer` 中间件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/intlayerMiddleware.md)
- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/remix-intlayer/useLocale.md)

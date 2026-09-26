---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useDictionary 钩子文档 | astro-intlayer
description: 了解如何在 Astro 组件和脚本中使用 useDictionary 钩子解析字典对象。
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - 国际化
  - 文档
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "初始文档"
author: aymericzip
---

# useDictionary 钩子文档

`useDictionary` 钩子解析导入的或内联的字典对象，并在 Astro 应用程序中返回当前语言环境的内容。

与通过键从全局字典注册表检索字典的 `useIntlayer` 不同，`useDictionary` 直接操作字典对象。

## 使用方法

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

您也可以传入使用 `t()` 定义的内联字典：

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
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
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## 参数

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**：字典对象或限定字典组。
2. **`localeOrSelector`**（可选）：特定语言环境或选择器对象（`{ item }`、`{ variant }`，可包含 `locale`）。

## 说明

该钩子执行以下任务：

1. **语言环境检测**：在服务端，它从 `Astro.locals.intlayer` 获取语言环境。在浏览器中，它使用客户端 store 语言环境。
2. **内容处理**：根据解析出的语言环境评估翻译 (`t()`)、枚举、条件和嵌套结构。
3. **选择器**：应用参数中提供的任何项或变体选择器。

## 相关文档

- [`intlayer` 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/astro-intlayer/useLocale.md)

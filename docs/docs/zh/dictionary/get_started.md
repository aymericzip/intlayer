---
docName: dictionary__get_started
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 字典 | 入门指南
description: 了解如何在您的多语言网站中声明和使用字典。按照本在线文档中的步骤，在几分钟内设置您的项目。
keywords:
  - 入门指南
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 内容声明入门

<iframe title="i18n，Markdown，JSON……一站式解决方案 | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## 文件扩展名

默认情况下，Intlayer 会监视所有具有以下扩展名的文件以声明内容：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

应用程序默认会搜索匹配 `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` 通配符模式的文件。

这些默认的扩展名适用于大多数应用程序。但是，如果您有特定需求，请参阅[内容扩展自定义指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md#content-configuration)了解如何管理它们。

有关完整的配置选项列表，请访问配置文档。

## 声明您的内容

创建并管理您的字典：

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "你好，世界",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 当前环境变量
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    insertionContent: insert("你好 {{name}}！"),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套内容的路径
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown 示例"),

    /*
     * 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
     */
    jsxContent: <h1>我的标题</h1>,
  },
} 满足 Dictionary<Content>; // [可选] Dictionary 是泛型，允许您加强字典的格式化
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "你好，世界",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 环境变量内容
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    insertionContent: insert("你好 {{name}}！"),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ),
    markdownContent: md("# Markdown 示例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
    jsxContent: <h1>我的标题</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "你好，世界", // 字符串内容
        numberContent: 123, // 数字内容
        booleanContent: true, // 布尔内容
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScript 内容，环境变量
      },
      imbricatedArray: [1, 2, 3], // 嵌套数组
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "许多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    insertionContent: insert("你好 {{name}}!"),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ),
    markdownContent: md("# Markdown 示例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
    jsxContent: <h1>我的标题</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "你好，世界",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "没有汽车",
        "1": "一辆汽车",
        "<-1": "少于负一辆汽车",
        "-1": "负一辆汽车",
        ">5": "一些汽车",
        ">19": "许多汽车",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "验证已启用",
        "false": "验证已禁用",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "你好 {{name}}！",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown 示例",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["我的标题"],
      },
    },
  },
}
```

## 函数嵌套

您可以毫无问题地将函数嵌套到其他函数中。

示例：

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` 返回 `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 复合内容，嵌套条件、枚举和多语言内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` 返回 `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 复合内容，嵌套条件、枚举和多语言内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          zh: "找到多个项目",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        zh: "无有效数据可用",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` 返回 `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        zh: "你好",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 复合内容，嵌套条件、枚举和多语言内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi", // 英文问候
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe", // 姓名
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          nodeType: "enumeration",
          enumeration: {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "zh": "未找到项目",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "zh": "找到一个项目",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "zh": "找到多个项目",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

## 额外资源

有关 Intlayer 的更多详细信息，请参阅以下资源：

- [每语言内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/per_locale_file.md)
- [翻译内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/translation.md)
- [枚举内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)
- [条件内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/condition.md)
- [插入内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)
- [文件内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/file.md)
- [嵌套内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/nesting.md)
- [Markdown 内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)
- [函数获取内容文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/function_fetching.md)

## 文档历史

- 5.5.10 - 2025-06-29：初始化历史

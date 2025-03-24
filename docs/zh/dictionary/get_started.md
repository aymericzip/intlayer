# 开始声明您的内容

## 文件扩展名

默认情况下，Intlayer 会监视以下扩展名的所有文件以声明内容：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

应用程序将默认搜索与 `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` 全局模式匹配的文件。

这些默认扩展名适用于大多数应用程序。然而，如果您有特定需求，请参阅 [内容扩展自定义指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#content-configuration) 以获取如何管理它们的说明。

有关完整的配置选项列表，请访问配置文档。

## 声明您的内容

创建和管理您的字典：

```tsx fileName="src/example.content.ts" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

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
  externalContent: string;
  insertionContent: string;
  fileContent: string;
  nestedContent: any;
  markdownContent: any;
  jsxContent: any;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "你好，世界",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      zh: "中文内容",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())
    markdownContent: md("# Markdown 示例"),

    /*
     * 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
     */
    jsxContent: <h1>我的标题</h1>,
  },
} satisfies Dictionary<Content>; // [可选] Dictionary 是泛型的，允许您加强字典的格式
```

```javascript fileName="src/example.content.mjs" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "你好，世界",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      zh: "中文内容",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ),
    markdownContent: md("# Markdown 示例"),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())

    // 仅在使用 `react-intlayer` 或 `next-intlayer` 时可用
    jsxContent: <h1>我的标题</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "你好，世界",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
      zh: "中文内容",
    }),
    quantityContent: enu({
      "<-1": "少于负一辆车",
      "-1": "负一辆车",
      "0": "没有车",
      "1": "一辆车",
      ">5": "一些车",
      ">19": "很多车",
    }),
    conditionalContent: cond({
      true: "验证已启用",
      false: "验证已禁用",
    }),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套的内容路径
    ),
    markdownContent: md("# Markdown 示例"),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())

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
        "zh": "中文内容",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "没有车",
        "1": "一辆车",
        "<-1": "少于负一辆车",
        "-1": "负一辆车",
        ">5": "一些车",
        ">19": "很多车",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "验证已启用",
        "false": "验证已禁用",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown 示例",
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

```javascript fileName="src/example.content.ts" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "约翰·多伊";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','zh').hiMessage` 返回 `['你好', ' ', '约翰·多伊']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        zh: "你好",
      }),
      " ",
      getName(),
    ],
    // 复合内容嵌套条件、枚举和多语言内容
    // `getIntlayer('page','zh').advancedContent(true)(10)` 返回 '找到多个项目'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          zh: "未找到项目",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          zh: "找到一个项目",
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
        zh: "没有有效数据可用",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjs" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "约翰·多伊";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','zh').hiMessage` 返回 `['你好', ' ', '约翰·多伊']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        zh: "你好",
      }),
      " ",
      getName(),
    ],
    // 复合内容嵌套条件、枚举和多语言内容
    // `getIntlayer('page','zh').advancedContent(true)(10)` 返回 '找到多个项目'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          zh: "未找到项目",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          zh: "找到一个项目",
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
        zh: "没有有效数据可用",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjs" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "约翰·多伊";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','zh').hiMessage` 返回 `['你好', ' ', '约翰·多伊']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        zh: "你好",
      }),
      " ",
      getName(),
    ],
    // 复合内容嵌套条件、枚举和多语言内容
    // `getIntlayer('page','zh').advancedContent(true)(10)` 返回 '找到多个项目'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          zh: "未找到项目",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          zh: "找到一个项目",
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
        zh: "没有有效数据可用",
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
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
            "zh": "你好",
          },
        },
        " ",
        "约翰·多伊",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
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
            "zh": "没有有效数据可用",
          },
        },
      },
    },
  },
}
```

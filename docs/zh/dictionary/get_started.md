# 开始声明您的内容

## 文件扩展名

默认情况下，Intlayer 监视所有具有以下扩展名的文件中的内容声明：

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

应用程序将默认搜索与 `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` glob 模式匹配的文件。

这些默认扩展名适合大多数应用程序。但是，如果您有特殊需求，请参阅 [内容扩展定制指南](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md#content-configuration) 以获取管理这些扩展的说明。

有关完整的配置选项列表，请访问配置文档。

## 声明您的内容

创建并管理您的字典：

```tsx fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
    };
    multilingualContent: string;
    quantityContent: string;
    conditionalContent: string;
    nestedContent: string;
    markdownContent: string;
    externalContent: string;
  };
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScript 环境变量
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
      ">5": "几辆车",
      ">19": "许多车",
    }),
    conditionalContent: cond({
      true: "验证已开启",
      false: "验证已关闭",
    }),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套内容的路径
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# Markdown 示例"),

    /*
     * 仅适用于 `react-intlayer` 或 `next-intlayer`
     */
    jsxContent: <h1>我的标题</h1>,
  },
} satisfies Dictionary<Content>; // [可选] 字典是泛型的，可以加强字典格式的强制性
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScript 环境变量
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
      ">5": "几辆车",
      ">19": "许多车",
    }),
    conditionalContent: cond({
      true: "验证已开启",
      false: "验证已关闭",
    }),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套内容的路径
    ),
    markdownContent: md("# Markdown 示例"),
    externalContent: async () => await fetch("https://example.com"),

    // 仅适用于 `react-intlayer` 或 `next-intlayer`
    jsxContent: <h1>我的标题</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScript 环境变量
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
      ">5": "几辆车",
      ">19": "许多车",
    }),
    conditionalContent: cond({
      true: "验证已开启",
      false: "验证已关闭",
    }),
    nestedContent: nest(
      "navbar", // 要嵌套的字典键
      "login.button" // [可选] 要嵌套内容的路径
    ),
    markdownContent: md("# Markdown 示例"),
    externalContent: async () => await fetch("https://example.com"),

    // 仅适用于 `react-intlayer` 或 `next-intlayer`
    jsxContent: <h1>我的标题</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hello World",
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
        "0": "没有车",
        "1": "一辆车",
        "<-1": "少于负一辆车",
        "-1": "负一辆车",
        ">5": "几辆车",
        ">19": "许多车",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "验证已开启",
        "false": "验证已关闭",
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

您可以在其他函数中嵌套函数，而不会出现问题。

示例:

```javascript fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "约翰·多伊";

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
    // 嵌套条件、枚举和多语言内容的复合内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 '找到多个项目'
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

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "约翰·多伊";

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
    // 嵌套条件、枚举和多语言内容的复合内容
    // `getIntlayer('page','en').advancedContent(true)(10)` 返回 '找到多个项目'
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

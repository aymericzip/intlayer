# コンテンツの宣言を始める

## ファイル拡張子

デフォルトでは、Intlayerは以下の拡張子を持つファイルをコンテンツ宣言として監視します:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

アプリケーションはデフォルトで `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` のグロブパターンに一致するファイルを検索します。

これらのデフォルト拡張子はほとんどのアプリケーションに適しています。ただし、特定の要件がある場合は、[コンテンツ拡張子カスタマイズガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#content-configuration) を参照して管理方法を確認してください。

設定オプションの完全なリストについては、設定ドキュメントをご覧ください。

## コンテンツを宣言する

辞書を作成して管理します:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
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
        stringContent: "Hello World",
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
    }),
    quantityContent: enu({
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車なし",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())
    markdownContent: md("# Markdownの例"),

    /*
     * `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
     */
    jsxContent: <h1>私のタイトル</h1>,
  },
} satisfies Dictionary<Content>; // [オプション] Dictionaryはジェネリックで、辞書のフォーマットを強化できます
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
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
        javaScriptContent: `${process.env.NODE_ENV}`,
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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車なし",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    markdownContent: md("# Markdownの例"),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
    jsxContent: <h1>私のタイトル</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
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
        javaScriptContent: `${process.env.NODE_ENV}`,
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
      "<-1": "マイナス1台未満の車",
      "-1": "マイナス1台の車",
      "0": "車なし",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    markdownContent: md("# Markdownの例"),
    externalContent: async () =>
      await fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
    jsxContent: <h1>私のタイトル</h1>,
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
        "0": "車なし",
        "1": "1台の車",
        "<-1": "マイナス1台未満の車",
        "-1": "マイナス1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "検証が有効です",
        "false": "検証が無効です",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdownの例",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["私のタイトル"],
      },
    },
  },
}
```

## 関数のネスト

関数を他の関数にネストすることが問題なく可能です。

例:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` は `['Hi', ' ', 'John Doe']` を返します
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 条件、列挙、マルチリンガルコンテンツをネストした複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は `'Multiple items found'` を返します
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
    // `getIntlayer('page','en').hiMessage` は `['Hi', ' ', 'John Doe']` を返します
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 条件、列挙、マルチリンガルコンテンツをネストした複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は `'Multiple items found'` を返します
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

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` は `['Hi', ' ', 'John Doe']` を返します
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 条件、列挙、マルチリンガルコンテンツをネストした複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は `'Multiple items found'` を返します
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
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
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
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
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

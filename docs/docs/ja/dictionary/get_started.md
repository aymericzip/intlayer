---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 辞書 | はじめに
description: 多言語ウェブサイトで辞書を宣言し使用する方法を紹介します。このオンラインドキュメントの手順に従って、数分でプロジェクトを設定しましょう。
keywords:
  - はじめに
  - 国際化
  - ドキュメント
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
---

# コンテンツの宣言を始める

<iframe title="i18n、Markdown、JSON…すべてを管理するための一つのソリューション | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## ファイル拡張子

デフォルトでは、Intlayerは以下の拡張子を持つすべてのファイルをコンテンツ宣言用に監視します：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

アプリケーションはデフォルトで、`./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` のグロブパターンに一致するファイルを検索します。

これらのデフォルト拡張子はほとんどのアプリケーションに適しています。ただし、特定の要件がある場合は、管理方法については[コンテンツ拡張子カスタマイズガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md#content-configuration)を参照してください。

設定オプションの完全なリストについては、設定ドキュメントをご覧ください。

## コンテンツの宣言

辞書を作成および管理します：

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
        stringContent: "こんにちは世界",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 環境変数NODE_ENVの値
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
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    insertionContent: insert("こんにちは {{name}}!"),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# マークダウンの例"),

    /*
     * `react-intlayer` または `next-intlayer` を使用している場合のみ利用可能
     */
    jsxContent: <h1>私のタイトル</h1>,
  },
} satisfies Dictionary<Content>; // [optional] Dictionaryはジェネリックであり、辞書のフォーマットを強化することができます
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 環境変数NODE_ENVの値
      },
      imbricatedArray: [1, 2, 3], // 配列の内容
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
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    insertionContent: insert("こんにちは {{name}}!"),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    markdownContent: md("# マークダウンの例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` または `next-intlayer` を使用している場合のみ利用可能
    jsxContent: <h1>私のタイトル</h1>,
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
        stringContent: "こんにちは世界",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // 環境変数 NODE_ENV の値
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
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
    conditionalContent: cond({
      true: "検証が有効です",
      false: "検証が無効です",
    }),
    insertionContent: insert("こんにちは {{name}}!"),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツのパス
    ),
    markdownContent: md("# マークダウンの例"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` または `next-intlayer` を使用している場合のみ利用可能
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
        "stringContent": "こんにちは世界",
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
        "0": "車はありません",
        "1": "車が一台",
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
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "こんにちは {{name}}！",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# マークダウンの例",
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
        "children": ["私のタイトル"],
      },
    },
  },
}
```

## 関数の入れ子構造

問題なく関数を他の関数に入れ子にすることができます。

例：

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
    // 条件、列挙、多言語コンテンツを入れ子にした複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は 'Multiple items found' を返します
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
    // 条件、列挙、多言語コンテンツを組み合わせた複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は 'Multiple items found' を返します
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
    // 条件、列挙、多言語コンテンツを組み合わせた複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は 'Multiple items found' を返します
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
          ja: "複数のアイテムが見つかりました",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        ja: "有効なデータがありません",
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
        ja: "こんにちは",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 条件、列挙、多言語コンテンツを組み合わせた複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は 'Multiple items found' を返します
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
            en: "Hi", // 挨拶の英語表現
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
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
                "ja": "アイテムが見つかりませんでした",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "ja": "1つのアイテムが見つかりました",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "ja": "複数のアイテムが見つかりました",
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

## 追加リソース

Intlayerの詳細については、以下のリソースを参照してください：

- [ロケール別コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/per_locale_file.md)
- [翻訳コンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)
- [列挙コンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md)
- [条件コンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/condition.md)
- [挿入コンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)
- [ファイルコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file.md)
- [ネスティングコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/nesting.md)
- [マークダウンコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)
- [関数フェッチコンテンツドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化

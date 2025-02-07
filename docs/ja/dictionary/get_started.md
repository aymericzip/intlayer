# コンテンツの宣言を始める

## ファイルの拡張子

デフォルトでは、Intlayerはコンテンツの宣言のために以下の拡張子を持つすべてのファイルを監視します：

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

アプリケーションはデフォルトで `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` のグロブパターンに一致するファイルを検索します。

これらのデフォルト拡張子は、大部分のアプリケーションに適しています。しかし、特定の要件がある場合は、[コンテンツ拡張機能のカスタマイズガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#content-configuration) を参照して、それらを管理する方法を確認してください。

構成オプションの完全な一覧については、構成ドキュメントをご覧ください。

## コンテンツを宣言する

あなたの辞書を作成し、管理してください：

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
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScriptの環境変数
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "マイナス1台以下の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "たくさんの車",
    }),
    conditionalContent: cond({
      true: "バリデーションが有効です",
      false: "バリデーションが無効です",
    }),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツへのパス
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# マークダウンの例"),

    /*
     * `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
     */
    jsxContent: <h1>私のタイトル</h1>,
  },
} satisfies Dictionary<Content>; // [オプション] Dictionaryはジェネリックで、辞書のフォーマットを強化できます
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
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScriptの環境変数
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
      "<-1": "マイナス1台以下の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "たくさんの車",
    }),
    conditionalContent: cond({
      true: "バリデーションが有効です",
      false: "バリデーションが無効です",
    }),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツへのパス
    ),
    markdownContent: md("# マークダウンの例"),
    externalContent: async () => await fetch("https://example.com"),

    // `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
    jsxContent: <h1>私のタイトル</h1>,
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
        javaScriptContent: `${process.env.NODE_ENV}`, // JavaScriptの環境変数
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
      "<-1": "マイナス1台以下の車",
      "-1": "マイナス1台の車",
      "0": "車はありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "たくさんの車",
    }),
    conditionalContent: cond({
      true: "バリデーションが有効です",
      false: "バリデーションが無効です",
    }),
    nestedContent: nest(
      "navbar", // ネストする辞書のキー
      "login.button" // [オプション] ネストするコンテンツへのパス
    ),
    markdownContent: md("# マークダウンの例"),
    externalContent: async () => await fetch("https://example.com"),

    // `react-intlayer` または `next-intlayer` を使用する場合のみ利用可能
    jsxContent: <h1>私のタイトル</h1>,
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
        "0": "車はありません",
        "1": "1台の車",
        "<-1": "マイナス1台以下の車",
        "-1": "マイナス1台の車",
        ">5": "いくつかの車",
        ">19": "たくさんの車",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "バリデーションが有効です",
        "false": "バリデーションが無効です",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# マークダウンの例",
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

関数を別の関数内にネストさせることは問題ありません。

例：

```javascript fileName="src/example.content.ts" codeFormat="typescript"
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
    // 条件、列挙、マルチリンガルコンテンツをネストする複合コンテンツ
    // `getIntlayer('page','en').advancedContent(true)(10)` は `'多数のアイテムが見つかりました'` を返します
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "アイテムが見つかりません",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "1つのアイテムが見つかりました",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "多数のアイテムが見つかりました",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "有効なデータはありません",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

その他すべてのコードも同様に翻訳されています。

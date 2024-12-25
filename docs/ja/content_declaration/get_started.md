# コンテンツの宣言を始める

## ファイル拡張子

デフォルトでは、Intlayer は以下の拡張子を持つすべてのファイルをコンテンツ宣言のために監視します：

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

アプリケーションはデフォルトで `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` グロブパターンに一致するファイルを検索します。

これらのデフォルトの拡張子はほとんどのアプリケーションに適しています。ただし、特定の要件がある場合は、[コンテンツ拡張子カスタマイズガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md#content-configuration) を参照して、管理方法を確認してください。

設定オプションの完全なリストについては、設定ドキュメントを訪れてください。

## コンテンツを宣言する

コンテンツ辞書を作成し、管理します：

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
import { t, enu, type DeclarationContent } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "始めるには編集してください",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "1台未満の車",
      "-1": "1台の車",
      "0": "車はない",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
} satisfies DeclarationContent<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "始めるには編集してください",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "1台未満の車",
      "-1": "1台の車",
      0: "車はない",
      1: "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "始めるには編集してください",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "1台未満の車",
      "-1": "1台の車",
      0: "車はない",
      1: "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "始めるには編集してください",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "1台未満の車",
        "-1": "1台の車",
        "0": "車はない",
        "1": "1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車",
      },
    },
  },
}
```

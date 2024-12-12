# コンテンツの宣言を始める

## プロジェクトのためのIntlayerの設定

[NextJSでintlayerを使う方法](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)

[ReactJSでintlayerを使う方法](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)

[ViteとReactでintlayerを使う方法](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)

## パッケージのインストール

npmを使用して必要なパッケージをインストールします:

```bash
npm install intlayer
```

```bash
yarn add intlayer
```

```bash
pnpm add intlayer
```

## コンテンツの管理

コンテンツ辞書を作成して管理します:

### TypeScriptを使用する

```typescript
// src/app/[locale]/page.content.ts
import { t, enu, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "編集を開始する",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    nestedContent: {
      id: "enumeration",
      numberOfCar: enu({
        "<-1": "マイナス1台未満",
        "-1": "マイナス1台",
        "0": "車がありません",
        "1": "1台の車",
        ">5": "いくつかの車",
        ">19": "多くの車",
      }),
    },
  },
} satisfies DeclarationContent;

// コンテンツはデフォルトでエクスポートする必要があります
export default pageContent;
```

### ECMAScriptモジュールを使用する

```javascript
// src/app/[locale]/page.content.mjs

import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "編集を開始する",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "マイナス1台未満",
      "-1": "マイナス1台",
      0: "車がありません",
      1: "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};

// コンテンツはデフォルトでエクスポートする必要があります
export default pageContent;
```

### CommonJSモジュールを使用する

```javascript
// src/app/[locale]/page.content.cjs

const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const pageContent = {
  id: "page",
  getStarted: {
    main: t({
      en: "編集を開始する",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    numberOfCar: enu({
      "<-1": "マイナス1台未満",
      "-1": "マイナス1台",
      0: "車がありません",
      1: "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    }),
  },
};

// コンテンツはデフォルトでエクスポートする必要があります
module.exports = pageContent;
```

### JSONを使用する

```json5
// src/app/[locale]/page.content.json

{
  id: "page",
  getStarted: {
    main: {
      nodeType: "translation",
      en: "編集を開始する",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    },
    pageLink: "src/app/page.tsx",
  },
  nestedContent: {
    id: "enumeration",
    nodeType: "enumeration",
    numberOfCar: {
      "<-1": "マイナス1台未満",
      "-1": "マイナス1台",
      "0": "車がありません",
      "1": "1台の車",
      ">5": "いくつかの車",
      ">19": "多くの車",
    },
  },
}
```

警告: JSONのコンテンツ宣言は、[関数フェッチングの実装を不可能にします](https://github.com/aymericzip/intlayer/blob/main/docs/ja/content_declaration/function_fetching.md)

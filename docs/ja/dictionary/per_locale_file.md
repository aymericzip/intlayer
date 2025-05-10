# Intlayerは多言語コンテンツを宣言するために2つの方法をサポートしています：

- すべての翻訳を含む単一ファイル
- ロケールごとのファイル（ロケールごとの形式）

この柔軟性により以下が可能になります：

- 他のi18nツールからの簡単な移行
- 自動翻訳ワークフローのサポート
- 翻訳を別々のロケール固有のファイルに明確に整理

## 複数翻訳を含む単一ファイル

この形式は以下の場合に理想的です：

- コード内での迅速な反復。
- CMSとのシームレスな統合。

ほとんどのユースケースで推奨されるアプローチです。翻訳を一元化し、反復やCMSとの統合を容易にします。

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ja: "私のコンポーネントのタイトル",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ja: "私のコンポーネントのタイトル",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ja: "私のコンポーネントのタイトル",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "ja": "私のコンポーネントのタイトル",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> 推奨: この形式は、Intlayerのビジュアルエディタを使用する場合や、コード内で直接翻訳を管理する場合に最適です。

## ロケールごとの形式

この形式は以下の場合に便利です：

- 翻訳を独立してバージョン管理または上書きしたい場合。
- 機械翻訳または人間による翻訳ワークフローを統合する場合。

ロケールフィールドを指定することで、翻訳を個別のロケールファイルに分割することもできます：

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 重要
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 重要
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // 重要
  "content": {
    "multilingualContent": "Title of my component",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // 重要
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> 重要: ロケールフィールドが定義されていることを確認してください。このフィールドは、ファイルがどの言語を表しているかをIntlayerに伝えます。

> 注意: どちらの場合でも、コンテンツ宣言ファイルはIntlayerによって認識されるために`*.content.{ts,tsx,js,jsx,mjs,cjs,json}`という命名パターンに従う必要があります。`.[locale]`サフィックスはオプションであり、命名規則としてのみ使用されます。

## フォーマットの混在

同じコンテンツキーに対して両方のアプローチを混在させることができます。例えば：

デフォルトまたはベースコンテンツを静的に宣言する（例: `index.content.ts`）

ロケール固有のコンテンツを`index.content.json`、`index.fr.content.ts`などで追加または上書きする。

これは特に以下の場合に便利です：

- ベースコンテンツをコードベースで静的に宣言し、CMSで自動的に翻訳を埋めたい場合。

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### 例

以下は多言語コンテンツ宣言ファイルの例です：

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Title of my component",
    projectName: "My project",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "ja": "私のコンポーネントのタイトル",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayerは多言語およびロケールごとのファイルを自動的にマージします。

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // デフォルトロケールはENGLISHなので、ENGLISHのコンテンツが返されます

console.log(JSON.stringify(intlayer, null, 2));
// 結果:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// 結果:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// 結果:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### 自動翻訳生成

[インレイヤーCLI](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)を使用して、好みのサービスに基づいて不足している翻訳を自動的に埋めることができます。

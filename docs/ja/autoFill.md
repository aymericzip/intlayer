# 自動入力コンテンツ宣言ファイル

**自動入力コンテンツ宣言ファイル**は、開発ワークフローを高速化する方法です。

自動入力メカニズムは、コンテンツ宣言ファイル間の*マスター-スレーブ*関係を通じて機能します。メイン（マスター）ファイルが更新されると、Intlayerは自動的にそれらの変更を派生（自動入力）宣言ファイルに適用します。

```ts filePath="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

これは`autoFill`命令を使用した[言語ごとのコンテンツ宣言ファイル](https://github.com/aymericzip/intlayer/blob/main/docs/ja/per_locale_file.md)です。

次に、以下のコマンドを実行すると：

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayerは自動的に`src/components/example/example.content.json`に派生宣言ファイルを生成し、メインファイルでまだ宣言されていないすべての言語を入力します。

```json5 filePath="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

その後、両方の宣言ファイルは1つの辞書にマージされ、標準の`useIntlayer("example")`フック（react）/コンポーザブル（vue）を使用してアクセスできます。

## 自動入力ファイルの形式

自動入力宣言ファイルの推奨形式は**JSON**で、フォーマットの制約を避けるのに役立ちます。ただし、Intlayerは`.ts`、`.js`、`.mjs`、`.cjs`などの形式もサポートしています。

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // コンテンツ
  },
};

export default exampleContent;
```

これにより、以下のファイルが生成されます：

```
src/components/example/example.filled.content.ts
```

> `.js`、`.ts`などのファイルの生成は以下のように機能します：
>
> - ファイルが既に存在する場合、IntlayerはAST（抽象構文木）を使用して各フィールドを特定し、不足している翻訳を挿入します。
> - ファイルが存在しない場合、Intlayerはコンテンツ宣言ファイルのデフォルトテンプレートを使用して生成します。

## 絶対パス

`autoFill`フィールドは絶対パスもサポートしています。

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // コンテンツ
  },
};

export default exampleContent;
```

これにより、以下のファイルが生成されます：

```
/messages/example.content.json
```

## 言語ごとのコンテンツ宣言ファイルの自動生成

`autoFill`フィールドは**言語ごと**のコンテンツ宣言ファイルの生成もサポートしています。

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // コンテンツ
  },
};

export default exampleContent;
```

これにより、2つの別々のファイルが生成されます：

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## 特定の言語の自動入力をフィルタリング

`autoFill`フィールドにオブジェクトを使用することで、フィルターを適用し、特定の言語ファイルのみを生成できます。

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // コンテンツ
  },
};

export default exampleContent;
```

これにより、フランス語の翻訳ファイルのみが生成されます。

## パス変数

`autoFill`パス内で変数を使用して、生成されたファイルのターゲットパスを動的に解決できます。

**利用可能な変数：**

- `{{locale}}` – 言語コード（例：`fr`、`es`）
- `{{key}}` – 辞書キー（例：`example`）

```ts filePath="src/components/example/example.content.ts"
import { Locales } from "intlayer";

const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // コンテンツ
  },
};

export default exampleContent;
```

これにより、以下が生成されます：

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

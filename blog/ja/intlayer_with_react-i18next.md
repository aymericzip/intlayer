# React Internationalization (i18n) with react-i18next and Intlayer

## 概要

- **Intlayer** は、**コンポーネントレベル**のコンテンツ宣言ファイルを介して翻訳を管理するのに役立ちます。
- **react-i18next** は、コンポーネント内でローカライズされた文字列を取得するための `useTranslation` のようなフックを提供する、**i18next** のための人気のある React 統合です。

組み合わせることで、Intlayer は **i18next 互換の JSON** 形式の辞書を **エクスポート** できるため、react-i18next はそれらをランタイムで **利用** できます。

## なぜ Intlayerを react-i18next と共に使用するのか？

**Intlayer** のコンテンツ宣言ファイルは、開発者体験を向上させるための以下の特長があります。

1. **ファイル配置の柔軟性**  
   各コンテンツ宣言ファイルを必要なコンポーネントのすぐ隣に配置します。この構造により、翻訳を共に維持し、コンポーネントが移動したり削除された場合に孤立した翻訳を防ぐことができます。

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # コンテンツ宣言ファイル
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # コンテンツ宣言ファイル
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # コンテンツ宣言ファイル
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # コンテンツ宣言ファイル
               └── index.jsx
   ```

2. **集中化された翻訳**  
   単一のコンテンツ宣言ファイルが、あるコンポーネントに必要なすべての翻訳を集約し、欠落した翻訳を見つけやすくします。  
   TypeScript を使用すると、翻訳が欠落している場合はコンパイル時エラーが発生します。

## インストール

Create React App プロジェクトで、これらの依存関係をインストールします。

```bash
# npmを使用
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# yarnを使用
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# pnpmを使用
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### これらのパッケージは何ですか？

- **intlayer** – i18n 構成、コンテンツ宣言、および辞書出力を管理するための CLI およびコアライブラリ。
- **react-intlayer** – 辞書のビルドを自動化するためのスクリプトを提供する、Intlayer の React 特有の統合。
- **react-i18next** – i18next のための React 特有の統合ライブラリで、`useTranslation` フックを含む。
- **i18next** – 翻訳処理の基盤となるフレームワーク。
- **i18next-resources-to-backend** – JSON リソースを動的にインポートする i18next バックエンド。

## Intlayerを構成してi18next辞書をエクスポートする

プロジェクトのルートに `intlayer.config.ts` を作成（または更新）します。

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // 必要なロケールを追加します
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer に i18next 互換の JSON を作成するように指示します
    dictionaryOutput: ["i18next"],

    // 生成されたリソースの出力ディレクトリを選択します
    // このフォルダは存在しない場合に作成されます。
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **注意**: TypeScript を使用していない場合は、この構成ファイルを `.cjs`、`.mjs`、または `.js` として作成できます（詳細は[Intlayer ドキュメント](https://intlayer.org/ja/doc/concept/configuration)を参照してください）。

## i18nextリソースのビルド

コンテンツ宣言が配置されたら（次のセクション）、**Intlayer ビルドコマンド**を実行します。

```bash
# npmを使用
npx run intlayer build
```

```bash
# yarnを使用
yarn intlayer build
```

```bash
# pnpmを使用
pnpm intlayer build
```

> これにより、デフォルトで `./i18next/resources` ディレクトリ内に i18next リソースが生成されます。

一般的な出力は次のようになります。

```bash
.
└── i18next
    └── resources
       ├── ja
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

各 **Intlayer** 宣言キーは **i18next 名前空間** として使用されます（例: `my-content.json`）。

## react-i18next 構成に辞書をインポートする

これらのリソースをランタイムで動的に読み込むには、[`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend) を使用します。たとえば、プロジェクトに `i18n.ts`（または `.js`）ファイルを作成します。

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // react-i18next プラグイン
  .use(initReactI18next)
  // リソースを動的に読み込む
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // リソースディレクトリへのインポートパスを調整します
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // i18next を初期化
  .init({
    // フォールバックロケール
    fallbackLng: "ja",

    // 他の i18next の構成オプションをここに追加できます。詳細は：
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "ja",
  });

export default i18next;
```

次に、**ルート** または **インデックス** ファイル（例: `src/index.tsx`）で、この `i18n` セットアップを **App** レンダリング前にインポートします。

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// 何よりも前に i18n を初期化します
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## コンテンツ宣言の作成と管理

Intlayer は、`./src` 以下の任意の場所にある「コンテンツ宣言ファイル」から翻訳を抽出します（デフォルト）。  
以下は TypeScript の簡単な例です。

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type DeclarationContent } from "intlayer";

const content = {
  // "key" はあなたの i18next 名前空間（例: "my-component"）になります
  key: "my-component",
  content: {
    // 各 "t" コールは別々の翻訳ノードです
    heading: t({
      ja: "こんにちは世界",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      ja: "私の i18n 説明テキスト...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies DeclarationContent;

export default content;
```

JSON、`.cjs`、または `.mjs` を好む場合は、[Intlayer ドキュメント](https://intlayer.org/ja/doc/concept/content)を参照してください。

> デフォルトでは、有効なコンテンツ宣言は次のファイル拡張子パターンと一致します：  
> `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`

## React コンポーネントでの翻訳の使用

Intlayer リソースを **ビルド** し、react-i18next を構成した後は、**react-i18next** の `useTranslation` フックを直接使用できます。  
たとえば：

```tsx title="src/components/MyComponent/MyComponent.tsx"
import { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * i18next の "namespace" は "MyComponent.content.ts" の Intlayer `key` です
 * そのため、useTranslation() に "my-component" を渡します。
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> `t` 関数は、生成された JSON 内の **キー** を参照します。Intlayer コンテンツエントリ名 `heading` の場合、`t("heading")` を使用します。

## オプション: Create React App スクリプトとの統合 (CRACO)

**react-intlayer** は、カスタムビルドや開発サーバーの構成のための CRACO ベースのアプローチを提供します。Intlayer のビルドステップをシームレスに統合したい場合は：

1. **react-intlayerをインストール**（インストールしていない場合）:
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **package.json スクリプトを調整** して `react-intlayer` スクリプトを使用します：

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > `react-intlayer` スクリプトは [CRACO](https://craco.js.org/) に基づいています。また、intlayer craco プラグインに基づいて独自のセットアップを実装することもできます。 [こちらで例を参照](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js)してください。

これで、`npm run build`、`yarn build`、または `pnpm build` を実行すると、Intlayer と CRA のビルドが両方ともトリガーされます。

## TypeScript 構成

**Intlayer** は、コンテンツのための **自動生成された型定義** を提供します。TypeScript がそれらを認識するために、`tsconfig.json` の **`include`** 配列に **`types`**（または異なる構成をしている場合は `types`）を追加してください。

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> これにより、TypeScript が翻訳の形状を推測し、より良いオートコンプリートとエラーチェックを提供します。

## Git 構成

Intlayer によって自動生成されたファイルやフォルダを **無視** することをお勧めします。この行を `.gitignore` に追加します：

```plaintext
# Intlayer によって生成されたファイルを無視する
.intlayer
i18next
```

通常、これらのリソースや `.intlayer` 内部ビルドアーティファクトは **コミットしないこと** をお勧めします。これらは、各ビルドごとに再生成可能です。
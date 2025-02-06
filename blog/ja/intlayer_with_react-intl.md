# React Internationalization (i18n) with **react-intl** and Intlayer

このガイドでは、React アプリケーションでの翻訳管理のために **Intlayer** を **react-intl** と統合する方法を示します。あなたは Intlayer で翻訳可能なコンテンツを宣言し、その後 **react-intl** を使用してそれらのメッセージを利用します。このライブラリは [FormatJS](https://formatjs.io/docs/react-intl) エコシステムの人気のあるライブラリです。

## 概要

- **Intlayer** は、プロジェクト内の **コンポーネントレベル** のコンテンツ宣言ファイル（JSON、JS、TS など）に翻訳を格納することを可能にします。
- **react-intl** は、ローカライズされた文字列を表示するための React コンポーネントやフック（ `<FormattedMessage>` や `useIntl()` など）を提供します。

Intlayer を **export** 設定して、 **react-intl 互換**の形式で翻訳を生成できるようにすると、自動的に **生成** および **更新** されるメッセージファイルを `<IntlProvider>` ( react-intl から) に要求されます。

---

## なぜ Intlayer を react-intl と一緒に使うべきか？

1. **コンポーネントごとのコンテンツ宣言**  
   Intlayer のコンテンツ宣言ファイルは、あなたの React コンポーネントと一緒に存在できるため、コンポーネントが移動または削除された場合の「孤立した」翻訳を防ぐことができます。例えば：

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Intlayer コンテンツ宣言
               └── index.tsx          # React コンポーネント
   ```

2. **集中管理された翻訳**  
   各コンテンツ宣言ファイルは、コンポーネントが必要とするすべての翻訳を集めます。これは特に TypeScript プロジェクトに役立ちます：欠落した翻訳は **コンパイル時** に検出できます。

3. **自動ビルドと再生成**  
   翻訳を追加または更新するたびに、Intlayer はメッセージ JSON ファイルを再生成します。次に、これらを react-intl の `<IntlProvider>` に渡すことができます。

---

## インストール

通常の React プロジェクトでは、以下のパッケージをインストールします。

```bash
# npm で
npm install intlayer react-intl

# yarn で
yarn add intlayer react-intl

# pnpm で
pnpm add intlayer react-intl
```

### なぜこれらのパッケージを？

- **intlayer**: コンテンツ宣言をスキャン、マージし、辞書出力を生成するコア CLI とライブラリ。
- **react-intl**: `<IntlProvider>`、 `<FormattedMessage>`、 `useIntl()` およびその他の国際化の基本的な機能を提供する FormatJS のメインライブラリ。

> まだ React 自体をインストールしていない場合は、`react` と `react-dom` も必要です。

## Intlayer を設定して react-intl メッセージをエクスポートする

プロジェクトのルートに **`intlayer.config.ts`** (または `.js`、 `.mjs`、 `.cjs`) を次のように作成します。

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // 必要なロケールを追加
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer に react-intl 用のメッセージファイルを生成するよう伝えます
    dictionaryOutput: ["react-intl"],

    // Intlayer がメッセージ JSON ファイルを書き込むディレクトリ
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **注**: 他のファイル拡張子（ `.mjs`、 `.cjs`、 `.js`）については、[Intlayer ドキュメント](https://intlayer.org/ja/doc/concept/configuration)を参照してください。

---

## Intlayer コンテンツ宣言の作成

Intlayer は、デフォルトで `./src` 内のコードベースをスキャンし、 `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` に一致するファイルを探します。  
以下は **TypeScript** の例です：

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type DeclarationContent } from "intlayer";

const content = {
  // "key" は react-intl JSON ファイル内のトップレベルメッセージキーになります
  key: "my-component",

  content: {
    // t() への各呼び出しは翻訳可能なフィールドを宣言します
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

JSON や異なる JS フレーバー（ `.cjs`、 `.mjs`）を好む場合、構造はほぼ同じです— [Intlayer ドキュメントのコンテンツ宣言](https://intlayer.org/ja/doc/concept/content) を参照してください。

---

## react-intl メッセージのビルド

**react-intl** の実際のメッセージ JSON ファイルを生成するには、次を実行します。

```bash
# npm で
npx intlayer build

# yarn で
yarn intlayer build

# pnpm で
pnpm intlayer build
```

これにより、すべての `*.content.*` ファイルがスキャンされ、コンパイルされ、あなたの **`intlayer.config.ts`** の例では、 `./react-intl/messages` に結果が書き込まれます。  
典型的な出力は次のようになります。

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

各ファイルは、 **トップレベルキー** がそれぞれの **`content.key`** に対応する JSON オブジェクトです。 **サブキー**（ `helloWorld` のような）は、該当するコンテンツ項目内で宣言された翻訳を反映しています。

例えば、 **en.json** は次のようになるかもしれません：

```json filePath="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## React アプリにおける react-intl の初期化

### 1. 生成されたメッセージを読み込む

アプリのルートコンポーネントを設定する場所（例： `src/main.tsx` または `src/index.tsx`）では、次を行う必要があります。

1. **生成されたメッセージファイルをインポート** （静的または動的に）。
2. **それらを `<IntlProvider>` に提供する** `react-intl` から。

簡単なアプローチは、メッセージを **静的に** インポートすることです：

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// ビルド出力から JSON ファイルをインポートします。
// または、ユーザーが選んだロケールに基づいて動的にインポートすることもできます。
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// ユーザーの言語を検出するメカニズムがある場合は、ここで設定します。
// 簡単のために、英語を選びましょう。
const locale = "en";

// メッセージをオブジェクトにまとめる（または動的に選択する）
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **ヒント**: 実際のプロジェクトでは、以下のことを行うかもしれません：
>
> - ランタイムで JSON メッセージを動的に読み込む。
> - 環境ベース、ブラウザベース、またはユーザーアカウントベースのロケール検出を使用する。

### 2. `<FormattedMessage>` または `useIntl()` を使用する

メッセージが `<IntlProvider>` に読み込まれると、すべての子コンポーネントは react-intl を使用してローカライズされた文字列にアクセスできます。主なアプローチは二つです：

- **`<FormattedMessage>`** コンポーネント
- **`useIntl()`** フック

---

## React コンポーネントでの翻訳の使用

### アプローチ A: `<FormattedMessage>`

インラインでの簡単な使用：

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” は en.json、fr.json などのキーを参照します。 */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> **`id`** プロパティは、 `<FormattedMessage>` 内で **トップレベルキー**（ `my-component`）およびサブキー（ `helloWorld`）と一致する必要があります。

### アプローチ B: `useIntl()`

より動的な使用のために：

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

どちらのアプローチも有効です — アプリに合ったスタイルを選択してください。

---

## 翻訳の更新または追加

1. どの `*.content.*` ファイルにでも **コンテンツを追加または修正** します。
2. `intlayer build` を再実行して、 `./react-intl/messages` 以下の JSON ファイルを再生成します。
3. React（および react-intl）は、次回アプリケーションを再ビルドまたはリロードする際にアップデートを取得します。

---

## TypeScript 統合（オプション）

TypeScript を使用している場合、Intlayer は翻訳のための **型定義** を **生成** できます。

- `tsconfig.json` にあなたが `types` フォルダー（または Intlayer が生成する任意の出力フォルダー）を `"include"` 配列に含めてください。

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

生成された型は、コンパイル時に React コンポーネント内の欠落した翻訳や無効なキーを検出するのに役立ちます。

---

## Git 設定

Intlayer の内部ビルドの成果物をバージョン管理から **除外する** ことが一般的です。あなたの `.gitignore` に追加してください：

```plaintext
# intlayer ビルド成果物を無視する
.intlayer
react-intl
```

あなたのワークフローによっては、 `./react-intl/messages` 内の最終辞書を無視したりコミットしたりしたい場合もあります。もし CI/CD パイプラインがそれらを再生成する場合は、安全に無視できます；さもなければ、プロダクションデプロイメントのためにコミットする必要があります。

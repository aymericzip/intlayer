---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite + React i18n - 既存のアプリを多言語アプリに変換する 2026
description: Intlayer Compiler を使用して、既存の Vite および React アプリケーションを多言語化する方法をご覧ください。ドキュメントに従って、国際化 (i18n) し、AI で翻訳します。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Vite
  - React
  - コンパイラ
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: 初回リリース
---

# 既存の Vite および React アプリケーションを後から多言語化 (i18n) する方法 (i18n ガイド 2026)

<Tabs defaultTab="video">
  <Tab label="ビデオ" value="video">
  
<iframe title="Vite と React に最適な i18n ソリューションは？ Intlayer を発見する" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="コード" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer を使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub で [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-vite-react-template) を見る。

## 目次

<TOC/>

## なぜ既存のアプリケーションを国際化するのは難しいのか？

単一言語向けに構築されたアプリに複数の言語を追加しようとしたことがあるなら、その苦労がわかるでしょう。それは単に「難しい」だけでなく、「面倒」です。すべてのファイルを調べ、すべてのテキスト文字列を探し出し、それらを個別の辞書ファイルに移動する必要があります。

次にリスクの高い部分が来ます。レイアウトやロジックを壊さずに、これらすべてのテキストをコードフックに置き換えることです。これは、新しい機能の開発を数週間停止させ、終わりのないリファクタリングのように感じられる種類の作業です。

## Intlayer Compiler とは？

**Intlayer Compiler** は、その手作業をスキップするために構築されました。手動で文字列を抽出する代わりに、コンパイラが自動的に行います。コードをスキャンしてテキストを見つけ、バックグラウンドで AI を使用して辞書を生成します。
その後、ビルド中にコードを変更して、必要な i18n フックを注入します。基本的には、単一言語であるかのようにアプリを書き続け、コンパイラが多言語への変換を自動的に処理します。

> Doc Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)

### 制限事項

コンパイラは、**コンパイル時**にコード分析と変換 (フックの挿入と辞書の生成) を実行するため、アプリケーションの**ビルドプロセスが遅くなる**可能性があります。

開発中のこの影響を軽減するために、コンパイラを [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) モードで実行するように構成するか、不要なときに無効にすることができます。

---

## Vite および React アプリケーションに Intlayer を設定するためのステップバイステップガイド

### ステップ 1: 依存関係のインストール

npm を使用して必要なパッケージをインストールします。

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  設定管理、翻訳、[コンテンツ宣言](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、トランスパイル、および [CLI コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md) のための国際化ツールを提供するコアパッケージ。

- **react-intlayer**
  Intlayer を React アプリケーションと統合するパッケージ。React の国際化のためのコンテキストプロバイダーとフックを提供します。

- **vite-intlayer**
  Intlayer を [Vite バンドラー](https://vite.dev/guide/why.html#why-bundle-for-production) と統合するための Vite プラグイン、およびユーザーの優先ロケールの検出、クッキーの管理、URL リダイレクトの処理のためのミドルウェアが含まれています。

### ステップ 2: プロジェクトの構成

アプリケーションの言語を構成するための構成ファイルを作成します。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     */
    enabled: true,

    /**
     * 最適化された辞書の出力ディレクトリ。
     */
    outputDir: "compiler",

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "", // ベースプレフィックスを削除

    /**
     * 変換後にコンポーネントを保存するかどうかを指定します。
     * これにより、コンパイラを 1 回実行してアプリを変換し、その後コンパイラを削除できるようになります。
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is an map app", // 注意: このアプリの説明をカスタマイズできます
  },
};

export default config;
```

> **注意**: 環境変数に `OPEN_AI_API_KEY` が設定されていることを確認してください。

> この構成ファイルを通じて、ローカライズされた URL、ミドルウェアのリダイレクト、クッキー名、コンテンツ宣言の場所と拡張子、コンソールでの Intlayer ログの無効化などを設定できます。利用可能なパラメータの完全なリストについては、[構成ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) を参照してください。

### ステップ 3: Vite 構成に Intlayer を統合する

構成に intlayer プラグインを追加します。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> `intlayer()` Vite プラグインは、Intlayer を Vite と統合するために使用されます。コンテンツ宣言ファイルの構築を確実にし、開発モードでそれらを監視します。Vite アプリケーション内で Intlayer 環境変数を定義します。さらに、パフォーマンスを最適化するためのエイリアスを提供します。

> `intlayerCompiler()` Vite プラグインは、コンポーネントからコンテンツを抽出し、`.content` ファイルを書き出すために使用されます。

### ステップ 4: コードをコンパイルする

デフォルトのロケールでハードコードされた文字列を使用してコンポーネントを記述するだけです。残りはコンパイラが処理します。

ページの表示例:

<Tabs>
 <Tab value="コード">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="出力">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      fr: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "compte est",
        editMessage: "Modifier",
        hmrMessage: "et enregistrer pour tester HMR",
        readTheDocs: "Cliquez sur les logos Vite et React pour en savoir plus",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** は、ネストされたコンポーネントにロケールを提供するために使用されます。

### (オプション) ステップ 6: コンテンツの言語を変更する

コンテンツの言語を変更するには、`useLocale` フックによって提供される `setLocale` 関数を使用できます。この関数を使用すると、アプリケーションのロケールを設定し、それに応じてコンテンツを更新できます。

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> `useLocale` フックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/useLocale.md) を参照してください。

### (オプション) ステップ 7: 欠落した翻訳を埋める

Intlayerは、欠落した翻訳を埋めるためのCLIツールを提供しています。`intlayer`コマンドを使用して、コードから欠落した翻訳をテストおよび埋めることができます。

```bash
npx intlayer test         # 欠落した翻訳があるかテストする
```

```bash
npx intlayer fill         # 欠落した翻訳を埋める
```

> 詳細については、[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/ci.md)を参照してください。

### Git の構成

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、Git リポジトリへのコミットを避けることができます。

これを行うには、`.gitignore` ファイルに次の指示を追加します。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの**自動補完**。
- 欠落している翻訳の**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成および更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension) を参照してください。

### さらに進む

さらに進むには、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) を実装するか、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) を使用してコンテンツを外部化できます。

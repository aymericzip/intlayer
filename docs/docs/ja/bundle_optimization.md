---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: i18nバンドルサイズの最適化とパフォーマンス
description: 国際化（i18n）コンテンツを最適化することで、アプリケーションのバンドルサイズを削減します。Intlayerを使用して辞書のツリーシェイキングや遅延読み込みを活用する方法を学びましょう。
keywords:
  - バンドル最適化
  - コンテンツ自動化
  - 動的コンテンツ
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "ビルド構成に `minify` と `purge` オプションを追加"
---

# i18nバンドルサイズの最適化とパフォーマンス

JSONファイルに依存する従来のi18nソリューションで最も一般的な課題の1つは、コンテンツサイズの管理です。開発者が手動でコンテンツを名前空間に分離しない場合、ユーザーは特定のページを表示するためだけに、全ページおよび全言語の翻訳をダウンロードすることになりかねません。

例えば、10ページが10言語に翻訳されたアプリケーションでは、ユーザーが必要なのは**1ページ**（現在の言語の現在のページ）だけであるにもかかわらず、100ページ分のコンテンツをダウンロードすることになる可能性があります。これは帯域幅の無駄遣いと読み込み時間の低下につながります。

**Intlayerは、ビルド時の最適化を通じてこの問題を解決します。** コードを分析してコンポーネントごとに実際に使用されている辞書を検出し、必要なコンテンツのみをバンドルに再注入します。

## 目次

<TOC />

## バンドルのスキャン

バンドルを分析することは、「重い」JSONファイルやコード分割の機会を特定するための第一歩です。これらのツールは、アプリケーションのコンパイル済みコードの視覚的なツリーマップを生成し、どのライブラリが最もスペースを消費しているかを正確に把握できるようにします。

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Viteは内部でRollupを使用しています。`rollup-plugin-visualizer`プラグインは、グラフ内のすべてのモジュールのサイズを示すインタラクティブなHTMLファイルを生成します。

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // ブラウザでレポートを自動的に開く
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

App RouterとTurbopackを使用しているプロジェクトの場合、Next.jsは追加の依存関係を必要としない組み込みの実験的なアナライザーを提供しています。

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Next.jsでデフォルトのWebpackバンドラーを使用している場合は、公式のバンドルアナライザーを使用してください。ビルド中に環境変数を設定することでトリガーされます。

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Next.jsの設定
});
```

**使用方法:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### 標準Webpack

Create React App (ejected)、Angular、またはカスタムのWebpack設定の場合は、業界標準の `webpack-bundle-analyzer` を使用してください。

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## 仕組み

Intlayerは**コンポーネント単位のアプローチ**を採用しています。グローバルなJSONファイルとは異なり、コンテンツはコンポーネントの隣または内部で定義されます。ビルドプロセス中、Intlayerは以下を行います：

1.  コードを**分析**して `useIntlayer` の呼び出しを見つけます。
2.  対応する辞書コンテンツを**構築**します。
3.  設定に基づいて `useIntlayer` の呼び出しを最適化されたコードに**置き換え**ます。

これにより、以下が保証されます：

- コンポーネントがインポートされていない場合、そのコンテンツはバンドルに含まれません（デッドコード削除）。
- コンポーネントが遅延読み込み（lazy loading）される場合、そのコンテンツも遅延読み込みされます。

## プラットフォーム別のセットアップ

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.jsはビルドにSWCを使用するため、変換を処理するために `@intlayer/swc` プラグインが必要です。

> SWCプラグインはNext.jsにおいてまだ実験段階であるため、このプラグインはデフォルトではインストールされません。将来的に変更される可能性があります。

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

インストールされると、Intlayerは自動的にプラグインを検出して使用します。

 </Tab>
 <Tab value="vite">

### Vite

Viteは `vite-intlayer` の依存関係として含まれている `@intlayer/babel` プラグインを使用します。最適化はデフォルトで有効になっています。他に行うことはありません。

 </Tab>
 <Tab value="webpack">

### Webpack

WebpackでIntlayerを使用したバンドル最適化を有効にするには、適切なBabel (`@intlayer/babel`) または SWC (`@intlayer/swc`) プラグインをインストールして構成する必要があります。

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## 構成

`intlayer.config.ts` の `build` プロパティを介して、Intlayerがバンドルを最適化する方法を制御できます。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * バンドルサイズを削減するために辞書を縮小（minify）します。
     */
     minify: true;

    /**
     * 辞書内の未使用のキーを削除（purge）します。
     */
     purge: true;

    /**
     * ビルド時にTypeScriptの型チェックを行うかどうかを指定します。
     */
    checkTypes: false;
  },
};

export default config;
```

> ほとんどの場合、`optimize` オプションはデフォルトのままにすることをお勧めします。

> 構成の詳細はドキュメントを参照してください: [構成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

### ビルドオプション

`build` 構成オブジェクトでは、以下のオプションが利用可能です：

| プロパティ     | 型        | デフォルト  | 説明                                                                                                                                                                                                          |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`optimize`** | `boolean` | `undefined` | ビルド最適化を有効にするかどうかを制御します。`true` の場合、Intlayerは辞書の呼び出しを最適化された注入に置き換えます。`false` の場合、最適化は無効になります。本番環境では `true` に設定するのが理想的です。 |
| **`minify`**   | `boolean` | `false`     | バンドルサイズを削減するために辞書を縮小するかどうか。                                                                                                                                                        |
| **`purge`**    | `boolean` | `false`     | 辞書内の未使用のキーを削除するかどうか。                                                                                                                                                                      |

### ミニフィケーション（縮小化）

辞書をミニファイすることで、不要な空白やコメントを削除し、JSONコンテンツのサイズを削減します。これは大きな辞書の場合に特に有効です。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> 注意: `optimize` が無効な場合、またはビジュアルエディタが有効な場合（エディタが編集のために完全なコンテンツを必要とするため）、ミニフィケーションは無視されます。

### パージング（未使用キーの削除）

パージングにより、コード内で実際に使用されているキーのみが最終的な辞書バンドルに含まれるようになります。アプリケーションのすべての部分で使用されていないキーが多数含まれる大きな辞書がある場合、これによりバンドルサイズを大幅に削減できます。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> 注意: `optimize` が無効な場合、パージングは無視されます。

### インポートモード

複数のページとロケールを含む大規模なアプリケーションでは、JSONファイルがバンドルサイズの大部分を占める可能性があります。Intlayerでは、辞書の読み込み方法を制御できます。

インポートモードは、`intlayer.config.ts` ファイルでグローバルにデフォルト設定を定義できます。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

また、`.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}` ファイル内の各辞書に対しても定義できます。

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // デフォルトのインポートモードを上書き
  content: {
    // ...
  },
};

export default appContent;
```

| プロパティ       | 型                                 | デフォルト | 説明                                                                                                            |
| :--------------- | :--------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **非推奨**: 代わりに `dictionary.importMode` を使用してください。辞書の読み込み方法を決定します（詳細は後述）。 |

`importMode` 設定は、辞書コンテンツがどのようにコンポーネントに注入されるかを規定します。
`intlayer.config.ts` ファイルの `dictionary` オブジェクトの下でグローバルに定義することも、特定の辞書の `.content.ts` ファイルで上書きすることもできます。

### 1. 静的モード (`default`)

静的モードでは、Intlayerは `useIntlayer` を `useDictionary` に置き換え、辞書をJavaScriptバンドルに直接注入します。

- **メリット:** 即時レンダリング（同期）、ハイドレーション中に追加のネットワークリクエストが発生しない。
- **デメリット:** バンドルに、その特定のコンポーネントで使用可能な**すべての**言語の翻訳が含まれる。
- **最適なケース:** シングルページアプリケーション（SPA）。

**変換後のコード例:**

```tsx
// 元のコード
const content = useIntlayer("my-key");

// 最適化されたコード（静的）
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. 動的モード

動的モードでは、Intlayerは `useIntlayer` を `useDictionaryAsync` に置き換えます。これは `import()`（Suspenseのような仕組み）を使用して、現在のロケールのJSONを具体的に遅延読み込みします。

- **メリット:** **ロケールレベルのツリーシェイキング。** 英語版を表示しているユーザーは英語版の辞書のみをダウンロードし、フランス語版が読み込まれることはありません。
- **デメリット:** ハイドレーション中にコンポーネントごとにネットワークリクエスト（アセットの取得）が発生する。
- **最適なケース:** バンドルサイズが非常に重要で、多くの言語、大きなテキストブロック、記事などをサポートする場合。

**変換後のコード例:**

```tsx
// 元のコード
const content = useIntlayer("my-key");

// 最適化されたコード（動的）
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> `importMode: 'dynamic'` を使用する場合、1ページに `useIntlayer` を使用するコンポーネントが100個あると、ブラウザは100回の個別のフェッチを試みます。このリクエストの「ウォーターフォール」を避けるために、アトムコンポーネントごとに1つではなく、ページセクションごとに1つの辞書といったように、コンテンツをより少ない `.content` ファイルにグループ化してください。

### 3. フェッチモード

動的モードと同様に動作しますが、まずIntlayer Live Sync APIから辞書の取得を試みます。API呼び出しが失敗するか、コンテンツがライブアップデート対象でない場合は、動的インポートにフォールバックします。

> 詳細はCMSドキュメントを参照してください: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)

> フェッチモードでは、パージとミニフィケーションは使用できません。

## まとめ: 静的 vs 動的

| 特徴                       | 静的モード                           | 動的モード                            |
| :------------------------- | :----------------------------------- | :------------------------------------ |
| **JSバンドルサイズ**       | 最大（コンポーネントの全言語を含む） | 最小（コードのみ、コンテンツなし）    |
| **初期読み込み**           | 即時（バンドル内にコンテンツあり）   | わずかな遅延（JSONをフェッチ）        |
| **ネットワークリクエスト** | 0 回（追加リクエストなし）           | 辞書ごとに 1 回                       |
| **ツリーシェイキング**     | コンポーネントレベル                 | コンポーネントレベル + ロケールレベル |
| **最適なユースケース**     | UIコンポーネント、小規模アプリ       | テキストが多いページ、多言語対応      |

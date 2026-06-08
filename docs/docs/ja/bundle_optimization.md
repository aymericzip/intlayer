---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: i18nバンドルサイズとパフォーマンスの最適化
description: 国際化（i18n）コンテンツを最適化し、アプリケーションのバンドルサイズを削減します。Intlayerを使用して辞書のツリーシェイキングと遅延読み込みを活用する方法を学びます。
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
  - version: 8.12.0
    date: 2026-06-07
    changes: "Babel/Webpack用の `intlayerPurgeBabelPlugin` と `intlayerMinifyBabelPlugin` を追加、プラグインのパイプラインを明確化"
  - version: 8.7.0
    date: 2026-04-08
    changes: "ビルド設定に `minify` と `purge` オプションを追加"
---

# i18nバンドルサイズとパフォーマンスの最適化

JSONファイルに依存する従来のi18nソリューションで最も一般的な課題の1つは、コンテンツサイズの管理です。開発者が手動でコンテンツを名前空間に分割しない場合、ユーザーは1つのページを表示するためだけに、すべてのページ、さらにすべての言語の翻訳をダウンロードすることになることがよくあります。

たとえば、10言語に翻訳された10ページのアプリケーションの場合、ユーザーは**1つ**（現在の言語での現在のページ）しか必要としないにもかかわらず、100ページ分のコンテンツをダウンロードすることになります。これは、帯域幅の無駄遣いと読み込み時間の遅延につながります。

**Intlayerは、ビルド時の最適化によってこの問題を解決します。** コードを分析して各コンポーネントで実際に使用されている辞書を検出し、必要なコンテンツのみをバンドルに再注入します。

## 目次

<TOC />

## バンドルの分析

バンドルを分析することは、「重い」JSONファイルやコード分割の機会を特定するための第一歩です。これらのツールは、アプリケーションのコンパイル済みコードの視覚的なツリーマップを生成し、どのライブラリが最もスペースを消費しているかを正確に確認できるようにします。

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Viteは内部でRollupを使用しています。`rollup-plugin-visualizer`を使用すると、グラフ内のすべてのモジュールのサイズを示すインタラクティブなHTMLファイルが生成されます。

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

### 標準の Webpack

Create React App (ejected)、Angular、またはカスタムのWebpackセットアップの場合は、業界標準の `webpack-bundle-analyzer` を使用します。

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

```typescript fileName="webpack.config.ts"
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

Intlayerは**コンポーネントごとのアプローチ**を使用します。グローバルなJSONファイルとは異なり、コンテンツはコンポーネントの横、またはコンポーネント内に定義されます。ビルドプロセス中に、Intlayerは以下を実行します。

1. **分析**: コードを分析して、`useIntlayer` の呼び出しを見つけます。
2. **構築**: 対応する辞書コンテンツを構築します。
3. **置換**: 設定に基づいて、`useIntlayer` の呼び出しを最適化されたコードに置き換えます。

これにより、以下が保証されます。

- コンポーネントがインポートされていない場合、そのコンテンツはバンドルに含まれません（デッドコードの削除）。
- コンポーネントが遅延読み込みされる場合、そのコンテンツも遅延読み込みされます。

## プラグインリファレンス

Intlayerのビルド最適化は、それぞれ単一の責任を持つ複数の個別のプラグインに分割されています。それぞれが何を行うかを理解することで、設定時の混乱を防ぐことができます。

### Babel プラグイン (`@intlayer/babel`)

これらは、Webpackベースのセットアップ（Babelを使用したNext.js、CRA、カスタムWebpackなど）の `babel.config.js` で直接使用されます。

| プラグイン                    | 役割                                                                                                                                      |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | `.content.ts` ファイルをスキャンし、コンパイルされた辞書を `.intlayer/` に書き込みます                                                    |
| `intlayerOptimizeBabelPlugin` | `useIntlayer('key')` を `useDictionary(hash)` に書き換え、一致する辞書の `import` を注入します                                            |
| `intlayerPurgeBabelPlugin`    | すべてのソースファイルをスキャンし、コンパイルされた `.intlayer/**/*.json` から**未使用のフィールド**を削除します                         |
| `intlayerMinifyBabelPlugin`   | JSONファイルとソースコードの両方で、**コンテンツフィールドキーを短いアルファベットのエイリアス**（例：`title` → `a`）に**名前変更**します |

> **プラグインの順序は重要です。** `babel.config.js` では、purgeとminifyのプラグインは、optimizeのプラグインの**前**に記述する必要があります。最適化パスは `useIntlayer('key')` を不透明な `useDictionary(hash)` 呼び出しに置き換えるため、purgeパスとminifyパスが使用されているフィールドを識別するために必要な辞書キー情報が消去されてしまいます。

各Babelプラグインには、設定読み込み時に `intlayer.config.ts` を1回読み込み、事前解決された値を返す対応するオプションヘルパーがあります。

| オプションヘルパー           | 一緒に使用するプラグイン      |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Vite プラグイン (`vite-intlayer`)

Viteユーザーは**これらを直接設定することはありません**。これらは、`vite.config.ts` で `withIntlayer()` を呼び出したときに自動的に設定されます。`intlayer.config.ts` の `build.purge` および `build.minify` フラグは、追加のプラグイン登録なしに対応する動作を切り替えます。

| 内部の Vite プラグイン | 同等の動作                                                                              |
| :--------------------- | :-------------------------------------------------------------------------------------- |
| Usage analyzer         | `intlayerPurgeBabelPlugin` の分析パスと同じ                                             |
| Dictionary prune       | `intlayerPurgeBabelPlugin` のJSON書き込みパスと同じ                                     |
| Dictionary minify      | `intlayerMinifyBabelPlugin` のJSON書き込みパスと同じ                                    |
| Babel transform        | `intlayerMinifyBabelPlugin` のソースコード名変更 + `intlayerOptimizeBabelPlugin` と同じ |

## プラットフォーム別の設定

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.jsはビルドにSWCを使用するため、最適化（インポートの書き換え）パスには `@intlayer/swc` プラグインが必要です。

> SWCプラグインはNext.jsではまだ実験的であるため、このプラグインはデフォルトではインストールされません。将来的に変更される可能性があります。

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

インストールされると、Intlayerはプラグインを自動的に検出して使用します。

**purgeおよびminify**パス（フィールドの削除とフィールドの名前変更）については、一緒に `@intlayer/babel` をインストールし、Babelプラグインを追加します。Next.jsは変換にSWCを使用しますが、プラグイン設定のために `babel.config.js` を評価するため、BabelプラグインはSWCの前の事前パスとして実行されます。

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: .intlayer/**/*.json から未使用のコンテンツフィールドを削除します
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: JSON + ソースコード内のコンテンツフィールドキーの名前を変更します
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // 注意: @intlayer/swc が useIntlayer → useDictionary の書き換えを処理するため、
    // intlayerOptimizeBabelPluginはここでは不要です。
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Viteは `@intlayer/babel` プラグインを使用し、これは `vite-intlayer` の依存関係として含まれています。インポートの書き換え、パージ、ミニファイの完全な最適化パイプラインはデフォルトで有効になっており、追加のプラグイン登録は必要ありません。

`intlayer.config.ts` で対応するフラグを設定して、パージとミニファイを有効にします。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // バンドルされたJSONから未使用のコンテンツフィールドを削除
    minify: true, // コンテンツフィールドキーを短いエイリアスに変更
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (および Babel を使用した Next.js)

`@intlayer/babel` をインストールします。

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

正しい順序で4つすべてのプラグインを `babel.config.js` に追加します。

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: .content.ts ファイルをコンパイル → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: .intlayer/**/*.json から未使用のフィールドを削除
    //    (intlayer.config.ts の build.purge フラグを読み取ります)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: JSON + ソースコード内のフィールドキーの名前を変更
    //    (intlayer.config.ts の build.minify フラグを読み取ります)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: useIntlayer('key') → useDictionary(hash) に書き換え
    //    辞書キーを消去するため、最後に配置する必要があります。
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## 設定

`intlayer.config.ts` の `build` プロパティを介して、Intlayerがバンドルを最適化する方法を制御できます。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.JAPANESE],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // ビルド時にuseIntlayer()の呼び出しを直接の辞書インポートに置き換えます。
    // undefined = auto (本番環境で有効), true = 常に有効, false = 常に無効。
    optimize: undefined,

    // コンパイルされた辞書内のコンテンツフィールドキーを短いアルファベットのエイリアスに
    // 名前変更します（例：title → a）。JSONサイズを縮小します。optimizeが必要です。
    minify: true,

    // ソースコードでアクセスされないコンテンツフィールドを削除します。
    // optimizeが必要です。
    purge: true,
  },
};

export default config;
```

> ほとんどの場合、`optimize` にはデフォルト値（`undefined`）を保持することをお勧めします。

> すべてのオプションについては、設定リファレンスを参照してください：[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

### ビルドオプション

| プロパティ     | 型                     | デフォルト  | 説明                                                                                                                                                                                                                 |
| :------------- | :--------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | インポートの書き換えパスを有効にします。`undefined` = 本番ビルドでのみアクティブになります。`false` の場合、purgeとminifyも無効になります。                                                                          |
| **`minify`**   | `boolean`              | `false`     | コンパイルされたJSONファイル内のコンテンツフィールドキーを短いアルファベットのエイリアスに名前変更します。ソースコード内の対応するプロパティアクセスも書き換えます。`optimize` が `false` の場合は効果がありません。 |
| **`purge`**    | `boolean`              | `false`     | コンパイルされたJSONファイルから、ソースコードで静的にアクセスされないコンテンツフィールドを削除します。`optimize` が `false` の場合は効果がありません。                                                             |

### 最小化（Minification - フィールドキーの名前変更）

`build.minify` はJavaScriptバンドルを最小化**しません**。それはバンドラーが処理します。代わりに、ユーザー定義の各コンテンツフィールドキーを短いアルファベットのエイリアスに置き換えることで、コンパイルされた辞書のJSONファイルを縮小します。

```
// 最小化前
{ "title": "こんにちは", "subtitle": "世界" }

// 最小化後
{ "a": "こんにちは", "b": "世界" }
```

ソースコード内のすべてのプロパティアクセスにも同じ名前の変更が適用されるため、コンパイルされた出力では `content.title` が `content.a` になります。実行時の動作は同じです。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> `optimize` が `false` の場合、または `editor.enabled` が `true` の場合（ビジュアルエディタでは編集を可能にするために元のフィールド名が必要なため）、最小化はスキップされます。

> `importMode: 'fetch'` 経由で読み込まれた辞書の場合も最小化はスキップされます。これは、そのJSONが元のフィールド名を使用してリモートAPIから提供されるためであり、クライアント側のキーの名前を変更するとサーバー/クライアントの規約が壊れるためです。

### パージ（Purging - 未使用フィールドの削除）

`build.purge` は、ソースコード内で実際にアクセスされているコンテンツフィールドを分析し、コンパイルされたJSONファイルから他のすべてのフィールドを削除します。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**例:** 5つのフィールドがあり、そのうち2つだけが使用されている辞書：

```
// パージ前
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// パージ後（ソース内でアクセスされるのはtitleとsubtitleのみ）
{ "title": "…", "subtitle": "…" }
```

> `optimize` が `false` の場合、または `editor.enabled` が `true` の場合、パージはスキップされます。

> ソースファイルが解析できない場合、または `useIntlayer` の結果が変数に割り当てられ、静的アナライザーが追跡できない方法（例：オブジェクトへのスプレッド、分割代入せずにプロップとして渡すなど）で渡された場合も、パージは保守的にスキップされます。このような場合は、完全な辞書が保持されます。

### インポートモード

複数のページとロケールを含む大規模なアプリケーションの場合、JSONはバンドルサイズの大部分を占める可能性があります。Intlayerでは、`importMode` オプションを使用して辞書の読み込み方法を制御できます。

### グローバル定義

インポートモードは、`intlayer.config.ts` ファイルでグローバルに定義できます。

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // デフォルトは 'static'
  },
};

export default config;
```

### 辞書ごとの定義

個々の辞書のインポートモードを、その `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}` ファイルで上書きすることができます。

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
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **非推奨**: 代わりに `dictionary.importMode` を使用してください。辞書の読み込み方法を決定します（以下を参照）。 |

`importMode` 設定は、辞書のコンテンツをコンポーネントに注入する方法を決定します。これを `intlayer.config.ts` の `dictionary` オブジェクトでグローバルに定義するか、辞書ごとの `.content.ts` ファイルで上書きすることができます。

### 1. 静的モード (`default`)

静的モードでは、Intlayerは `useIntlayer` を `useDictionary` に置き換え、辞書をJavaScriptバンドルに直接注入します。

- **メリット:** 即時レンダリング（同期）、ハイドレーション時の追加のネットワークリクエストなし。
- **デメリット:** バンドルには、その特定のコンポーネントで利用可能な**すべて**の言語の翻訳が含まれます。
- **最適なケース:** シングルページアプリケーション（SPA）。

**変換されたコードの例:**

```tsx
// あなたのコード
const content = useIntlayer("my-key");

// 変換後の最適化されたコードの図解（Static）
// これは図解のみを目的としており、最適化の理由により実際のコードは異なります
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      ja: "私のタイトル",
    },
  },
});
```

### 2. 動的モード

動的モードでは、Intlayerは `useIntlayer` を `useDictionaryAsync` に置き換えます。これにより、`import()`（Suspenseのようなメカニズム）を使用して、現在のロケールのJSONを特別に遅延読み込みします。

- **メリット:** **ロケールレベルでのツリーシェイキング。** 英語バージョンを表示しているユーザーは、英語の辞書**のみ**をダウンロードします。日本語の辞書は読み込まれません。
- **デメリット:** ハイドレーション中にコンポーネントごとにネットワークリクエスト（アセットの取得）をトリガーします。
- **最適なケース:** バンドルサイズが重要な大規模なテキストブロック、記事、または多くの言語をサポートするアプリケーション。

**変換されたコードの例:**

```tsx
// あなたのコード
const content = useIntlayer("my-key");

// 変換後の最適化されたコードの図解（Dynamic）
// これは図解のみを目的としており、最適化の理由により実際のコードは異なります
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  ja: () =>
    import(".intlayer/dynamic_dictionary/my-key/ja.json").then(
      (mod) => mod.default
    ),
});
```

> `importMode: 'dynamic'` を使用する場合、1つのページに `useIntlayer` を使用するコンポーネントが100個あると、ブラウザは100回の個別のフェッチを試みます。このリクエストの「ウォーターフォール」を避けるために、アトムコンポーネントごとに1つではなく、より少ない数の `.content` ファイル（例：ページのセクションごとに1つの辞書）にコンテンツをグループ化してください。同じキーを使用する複数の `.content` ファイルを使用することもできます。Intlayerはそれらを1つの辞書に統合します。

### 3. Fetchモード

動的モードと同様に動作しますが、最初に Intlayer Live Sync API から辞書を取得しようとします。API呼び出しが失敗した場合、またはコンテンツがライブ更新の対象としてマークされていない場合は、動的インポートにフォールバックします。

**変換されたコードの例:**

```tsx
// あなたのコード
const content = useIntlayer("my-key");

// 最適化されたコードの図解（Fetch）
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  ja: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/ja").then((res) =>
      res.json()
    ),
});
```

> 詳細については、CMSのドキュメントを参照してください：[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)

> fetchモードでは、JSONが元のフィールド名を使用してリモートAPIから提供されるため、purgeとminifyは適用されません。

## 要約: 静的 vs 動的

| 機能                       | 静的モード                                     | 動的モード                            |
| :------------------------- | :--------------------------------------------- | :------------------------------------ |
| **JSバンドルサイズ**       | より大きい（コンポーネントの全言語が含まれる） | 最小（コードのみ、コンテンツなし）    |
| **初期読み込み**           | 即時（コンテンツはバンドル内）                 | わずかな遅延（JSONを取得）            |
| **ネットワークリクエスト** | 追加のリクエストなし                           | 辞書キーごとに1つのリクエスト         |
| **ツリーシェイキング**     | コンポーネントレベル                           | コンポーネントレベル + ロケールレベル |
| **最適なユースケース**     | UIコンポーネント、小規模アプリ                 | テキストが多いページ、多言語          |

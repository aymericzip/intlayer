---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Intlayer コンパイラー | i18n のための自動コンテンツ抽出
description: Intlayer コンパイラーで国際化プロセスを自動化しましょう。コンポーネントから直接コンテンツを抽出し、Vite、Next.js などでより高速かつ効率的な i18n を実現します。
keywords:
  - Intlayer
  - コンパイラー
  - 国際化
  - i18n
  - 自動化
  - 抽出
  - 速度
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-09
    changes: "コンパイラーオプションの更新、FilePathPattern のサポート追加"
  - version: 8.1.7
    date: 2026-02-25
    changes: "コンパイラーオプションの更新"
  - version: 7.3.1
    date: 2025-11-27
    changes: "コンパイラーリリース"
---

# Intlayer コンパイラー | i18n のための自動コンテンツ抽出

## Intlayer コンパイラーとは？

**Intlayer コンパイラー**は、アプリケーションの国際化（i18n）プロセスを自動化するために設計された強力なツールです。ソースコード（JSX、TSX、Vue、Svelte）内のコンテンツ宣言をスキャンし、それらを抽出して必要な辞書ファイルを自動的に生成します。これにより、コンテンツをコンポーネントと共に配置したままにでき、Intlayer が辞書の管理と同期を担当します。

## なぜ Intlayer コンパイラーを使うのか？

- **自動化**: コンテンツを辞書に手動でコピー＆ペーストする手間を排除します。
- **高速化**: 最適化されたコンテンツ抽出により、ビルドプロセスの高速化を実現します。
- **開発者体験**: コンテンツ宣言を使用箇所にそのまま保持し、保守性を向上させます。
- **ライブアップデート**: 開発中に即時フィードバックを得られるホットモジュールリプレースメント（HMR）をサポートします。

より詳しい比較については、[Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md) のブログ記事をご覧ください。

## Intlayer コンパイラーを使わない理由

コンパイラーは優れた「そのまま動作する」体験を提供しますが、いくつかのトレードオフも導入します：

- **ヒューリスティックの曖昧さ**：コンパイラーは、ユーザー向けコンテンツとアプリケーションロジック（例：`className="active"`、ステータスコード、製品ID）を推測する必要があります。複雑なコードベースでは、これにより誤検出や見逃された文字列が発生し、手動での注釈と例外処理が必要になる場合があります。
- **静的抽出のみ**：コンパイラーベースの抽出は静的解析に依存しています。実行時のみ存在する文字列（APIエラーコード、CMSフィールドなど）は、コンパイラー単独では発見または翻訳できないため、補完的なランタイムi18n戦略が必要です。

より深いアーキテクチャの比較については、ブログ記事[Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/compiler_vs_declarative_i18n.md)を参照してください。

代替として、コンテンツの完全な制御を維持しながらi18nプロセスを自動化するために、Intlayerは自動抽出コマンド `intlayer extract`（[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照）またはIntlayer VS Code拡張機能の `Intlayer: extract content to Dictionary` コマンド（[VS Code拡張機能ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)を参照）も提供しています。

## 使い方

<Tabs>
 <Tab value='vite'>

### Vite

Viteベースのアプリケーション（React, Vue, Svelteなど）では、`vite-intlayer` プラグインを使うのが最も簡単な方法です。

#### インストール

```bash
npm install vite-intlayer
```

#### 設定

`vite.config.ts` を更新して `intlayerCompiler` プラグインを含めます：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // コンパイラープラグインを追加
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### フレームワークサポート

Viteプラグインは自動的に異なるファイルタイプを検出し処理します：

- **React / JSX / TSX**: ネイティブに対応。
- **Vue**: `@intlayer/vue-compiler` が必要です。
- **Svelte**: `@intlayer/svelte-compiler` が必要です。

使用しているフレームワークに応じて、適切なコンパイラーパッケージをインストールしてください：

```bash
# Vue用
npm install @intlayer/vue-compiler

# Svelte用
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Next.jsやその他の Webpack ベースの Babel を使用するアプリケーションでは、`@intlayer/babel`プラグインを使ってコンパイラーを設定できます。

#### インストール

```bash
npm install @intlayer/babel
```

#### 設定

`babel.config.js`（または `babel.config.json`）を更新して、抽出プラグインを含めます。Intlayerの設定を自動的に読み込むためのヘルパー `getExtractPluginOptions` を提供しています。

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // コンポーネントからコンテンツを抽出して辞書に変換
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // useIntlayer を直接辞書インポートに置き換えてインポートを最適化
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

この設定により、コンポーネント内で宣言されたコンテンツが自動的に抽出され、ビルドプロセス中に辞書の生成に使用されます。

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### カスタム設定

コンパイラーの動作をカスタマイズするには、プロジェクトのルートにある `intlayer.config.ts` ファイルを更新します。

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * コンパイラーを有効にするかどうかを示します。
     * 開発中のコンパイラーをスキップして起動時間を短縮するには、'build-only'に設定します。
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。 `outputDir` を置き換えます。
     *
     * - `./` で始まるパスは、コンポーネントディレクトリを基準に解決されます。
     * - `/` で始まるパスは、プロジェクトのルート (`baseDir`) を基準に解決されます。
     *
     * - パスに `{{locale}}` 変数を含めると、言語ごとに分離された辞書の生成が有効になります。
     *
     * 例:
     * ```ts
     * {
     *   // コンポーネントの隣に多言語対応の .content.ts ファイルを作成
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // 文字列テンプレートを使用した同等の記述
     * }
     * ```
     *
     * ```ts
     * {
     *   // プロジェクトのルートに言語ごとに集約された JSON ファイルを作成
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // 文字列テンプレートを使用した同等の記述
     * }
     * ```
     *
     * 変数リスト:
     *   - `fileName`: ファイル名。
     *   - `key`: コンテンツのキー。
     *   - `locale`: コンテンツのロケール。
     *   - `extension`: ファイル拡張子。
     *   - `componentFileName`: コンポーネントファイル名。
     *   - `componentExtension`: コンポーネント拡張子。
     *   - `format`: 辞書の形式。
     *   - `componentFormat`: コンポーネント辞書の形式。
     *   - `componentDirPath`: コンポーネントのディレクトリパス。
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 変換後にコンポーネントを保存するかどうかを示します。
     * これにより、コンパイラーを1回だけ実行してアプリを変換し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 生成されたファイルにコンテンツのみを挿入します。ロケールごとの i18next または ICU MessageFormat JSON 出力に有用です。
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * 辞書キーのプレフィックス
     */
    dictionaryKeyPrefix: "", // 抽出された辞書キーにオプションのプレフィックスを追加
  },
};

export default config;
````

### コンパイラー設定リファレンス

以下のプロパティは、`intlayer.config.ts`ファイルの`compiler`ブロックで設定できます。

- **enabled**:
  - _タイプ_: `boolean | 'build-only'`
  - _デフォルト_: `true`
  - _説明_: コンパイラーを有効にするかどうかを示します。

- **dictionaryKeyPrefix**:
  - _タイプ_: `string`
  - _デフォルト_: `''`
  - _説明_: 抽出された辞書キーのプレフィックス。

- **transformPattern**:
  - _タイプ_: `string | string[]`
  - _デフォルト_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _説明_: (非推奨: 代わりに `build.traversePattern` を使用) 最適化のためにコードをトラバースするパターン。

- **excludePattern**:
  - _タイプ_: `string | string[]`
  - _デフォルト_: `['**/node_modules/**']`
  - _説明_: (非推奨: 代わりに `build.traversePattern` を使用) 最適化から除外するパターン。

- **output**:
  - _型_: `FilePathPattern`
  - _デフォルト_: `({ key }) => 'compiler/${key}.content.json'`
  - _説明_: 出力ファイルのパスを定義します。 `outputDir` を置き換えます。 `{{locale}}`、 `{{key}}`、 `{{fileName}}`、 `{{extension}}`、 `{{format}}`、 `{{dirPath}}`、 `{{componentFileName}}`、 `{{componentExtension}}`、 `{{componentFormat}}` などの動的変数を処理します。 `'my/{{var}}/path'` 形式の文字列または関数として設定できます。
  - _注_: `./**/*` パスはコンポーネントを基準に解決されます。 `/**/*` パスは Intlayer の `baseDir` を基準に解決されます。
  - _注_: パスにロケールが定義されている場合、辞書はロケールごとに生成されます。
  - _例_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _タイプ_: `boolean`
  - _デフォルト_: `false`
  - _説明_: メタデータをファイルに保存するかどうかを示します。trueの場合、コンパイラーは辞書のメタデータ（キー、コンテンツラッパー）を保存しません。
  - _注_: `loadJSON`プラグインを使用する場合に便利です。
  - _例_:
    `true`の場合:
    ```json
    {
      "key": "value"
    }
    ```
    `false`の場合:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _タイプ_: `boolean`
  - _デフォルト_: `false`
  - _説明_: 変換後にコンポーネントを保存するかどうかを示します。

### 欠落した翻訳を埋める

Intlayerは、欠落した翻訳を埋めるためのCLIツールを提供しています。`intlayer`コマンドを使用して、コード内の欠落した翻訳をテストし、埋めることができます。

```bash
npx intlayer test         # 欠落した翻訳があるかテストする
```

```bash
npx intlayer fill         # 欠落した翻訳を埋める
```

### 抽出

Intlayerは、コードからコンテンツを抽出するためのCLIツールを提供しています。`intlayer extract`コマンドを使用して、コードからコンテンツを抽出できます。

```bash
npx intlayer extract
```

> 詳細については、[CLIドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
> を参照してください。

---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: i18n バンドルサイズとパフォーマンスの最適化
description: 国際化（i18n）コンテンツを最適化してアプリケーションのバンドルサイズを削減します。Intlayerを使った辞書のツリーシェイキングと遅延読み込みの活用方法を学びましょう。
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
  - version: 6.0.0
    date: 2025-11-25
    changes: 初期履歴
---

# i18n バンドルサイズとパフォーマンスの最適化

従来のJSONファイルに依存するi18nソリューションで最も一般的な課題の一つは、コンテンツサイズの管理です。開発者が手動でコンテンツをネームスペースに分割しない場合、ユーザーは単一のページを閲覧するためだけに、すべてのページや場合によってはすべての言語の翻訳をダウンロードしてしまうことがよくあります。

例えば、10ページが10言語に翻訳されたアプリケーションでは、ユーザーは実際に必要な**1ページ**（現在の言語の現在のページ）だけでよいにもかかわらず、100ページ分のコンテンツをダウンロードすることになりかねません。これにより、帯域幅の無駄遣いと読み込み時間の遅延が発生します。

> これを検出するには、`rollup-plugin-visualizer`（vite）、`@next/bundle-analyzer`（next.js）、`webpack-bundle-analyzer`（React CRA / Angular / など）といったバンドルアナライザーを使用できます。

**Intlayerはビルド時の最適化によってこの問題を解決します。** コードを解析して、各コンポーネントで実際に使用されている辞書を検出し、必要なコンテンツのみをバンドルに再注入します。

## 目次

<TOC />

## 仕組み

Intlayerは**コンポーネント単位のアプローチ**を採用しています。グローバルなJSONファイルとは異なり、コンテンツはコンポーネントのそばまたは内部に定義されます。ビルドプロセス中にIntlayerは以下を行います：

1.  コードを**解析**して`useIntlayer`の呼び出しを見つけます。
2.  対応する辞書コンテンツを**構築**します。
3.  設定に基づいて`useIntlayer`の呼び出しを最適化されたコードに**置き換え**ます。

これにより以下が保証されます：

- コンポーネントがインポートされていなければ、そのコンテンツはバンドルに含まれません（デッドコード削除）。
- コンポーネントがレイジーロードされる場合、そのコンテンツもレイジーロードされます。

## プラットフォーム別セットアップ

### Next.js

Next.js はビルドに SWC を使用しているため、変換を処理するために `@intlayer/swc` プラグインが必要です。

> このプラグインは、Next.js における SWC プラグインがまだ実験的なため、デフォルトでインストールされています。将来的に変更される可能性があります。

### Vite

Vite は `vite-intlayer` の依存として含まれている `@intlayer/babel` プラグインを使用します。最適化はデフォルトで有効になっています。

### Webpack

Webpack で Intlayer のバンドル最適化を有効にするには、適切な Babel (`@intlayer/babel`) または SWC (`@intlayer/swc`) プラグインをインストールして設定する必要があります。

### Expo / Lynx

このプラットフォームではバンドル最適化は**まだ利用できません**。将来のリリースでサポートが追加される予定です。

## 設定

Intlayerがバンドルを最適化する方法は、`intlayer.config.ts`の`build`プロパティで制御できます。

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // または 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> `optimize`のデフォルトオプションを維持することが、ほとんどの場合で推奨されます。

> 詳細はドキュメントの設定をご覧ください: [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)

### ビルドオプション

`build`構成オブジェクトの下で利用可能なオプションは以下の通りです：

| プロパティ            | 型                              | デフォルト                      | 説明                                                                                                                                                                                                         |
| :-------------------- | :------------------------------ | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                       | `undefined`                     | ビルド最適化を有効にするかどうかを制御します。`true` の場合、Intlayer は辞書呼び出しを最適化されたインジェクトに置き換えます。`false` の場合、最適化は無効になります。通常は本番環境で `true` に設定します。 |
| **`importMode`**      | `'static' , 'dynamic' , 'live'` | `'static'`                      | 辞書の読み込み方法を決定します（詳細は以下を参照）。                                                                                                                                                         |
| **`traversePattern`** | `string[]`                      | `['**/*.{js,ts,jsx,tsx}', ...]` | Intlayerが最適化のためにスキャンするファイルを定義するグロブパターン。関連のないファイルを除外し、ビルドを高速化するために使用します。                                                                       |
| **`outputFormat`**    | `'esm', 'cjs'`                  | `'esm', 'cjs'`                  | ビルドされた辞書の出力フォーマットを制御します。                                                                                                                                                             |

## インポートモード

`importMode`設定は、辞書の内容がコンポーネントにどのように注入されるかを決定します。

### 1. スタティックモード（`default`）

静的モードでは、Intlayerは `useIntlayer` を `useDictionary` に置き換え、辞書を直接JavaScriptバンドルに注入します。

- **利点:** 即時レンダリング（同期的）、ハイドレーション時の追加ネットワークリクエストなし。
- **欠点:** バンドルにはその特定のコンポーネントに対する**すべての**利用可能な言語の翻訳が含まれます。
- **最適用途:** シングルページアプリケーション（SPA）。

**変換後のコード例:**

```tsx
// あなたのコード
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

動的モードでは、Intlayerは`useIntlayer`を`useDictionaryAsync`に置き換えます。これは`import()`（Suspenseのような仕組み）を使用して、現在のロケールのJSONを遅延ロードします。

- **利点:** **ロケール単位のツリーシェイキング。** 英語版を閲覧しているユーザーは英語の辞書のみをダウンロードし、フランス語の辞書は一切ロードされません。
- **欠点:** ハイドレーション時にコンポーネントごとにネットワークリクエスト（アセット取得）が発生します。
- **最適な用途:** 大きなテキストブロック、記事、多言語対応でバンドルサイズが重要なアプリケーション。

**変換後のコード例:**

```tsx
// あなたのコード
const content = useIntlayer("my-key");

// 最適化されたコード（動的）
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> `importMode: 'dynamic'` を使用する場合、1ページに `useIntlayer` を使ったコンポーネントが100個あると、ブラウザは100回の個別フェッチを試みます。この「リクエストの滝」を避けるために、コンテンツをより少ない `.content` ファイル（例：ページセクションごとに1つの辞書）にまとめ、アトムコンポーネントごとに分けるのは避けてください。

> 現時点で、`importMode: 'dynamic'` は Vue と Svelte で完全にはサポートされていません。これらのフレームワークでは、今後のアップデートまで `importMode: 'static'` の使用を推奨します。

### 3. ライブモード

動的モードと同様に動作しますが、最初にIntlayer Live Sync APIから辞書を取得しようとします。API呼び出しが失敗した場合やコンテンツがライブ更新用にマークされていない場合は、動的インポートにフォールバックします。

> 詳細はCMSドキュメントをご覧ください: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)

## まとめ: 静的モード vs 動的モード

| 機能                       | 静的モード                               | 動的モード                            |
| :------------------------- | :--------------------------------------- | :------------------------------------ |
| **JSバンドルサイズ**       | 大きい（コンポーネントの全言語を含む）   | 最小（コードのみ、コンテンツなし）    |
| **初期読み込み**           | 即時（コンテンツはバンドル内に含まれる） | わずかな遅延（JSONを取得）            |
| **ネットワークリクエスト** | 追加リクエストなし                       | 辞書ごとに1リクエスト                 |
| **ツリーシェイキング**     | コンポーネントレベル                     | コンポーネントレベル + ロケールレベル |
| **最適な使用例**           | UIコンポーネント、小規模アプリ           | テキスト量が多いページ、多言語対応    |

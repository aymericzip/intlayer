---
createdAt: 2024-08-13
updatedAt: 2026-04-08
title: 設定 (Configuration)
description: アプリケーションにIntlayerを設定する方法について説明します。ニーズに合わせてIntlayerをカスタマイズするためのさまざまな設定とオプションを理解してください。
keywords:
  - 設定
  - セッティング
  - カスタマイズ
  - Intlayer
  - オプション
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "ビルド設定に `prune` と `minify` オプションを追加"
  - version: 8.7.0
    date: 2026-04-03
    changes: "`currentDomain` オプションを追加"
  - version: 8.4.0
    date: 2026-03-20
    changes: "'compiler.output' と 'dictionary.fill' にロケールごとのオブジェクト記法を追加"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' を 'content' 設定から 'system' 設定に移動"
  - version: 8.2.0
    date: 2026-03-09
    changes: "コンパイラオプションを更新し、'output' と 'noMetadata' のサポートを追加"
  - version: 8.1.7
    date: 2026-02-25
    changes: "コンパイラオプションを更新"
  - version: 8.1.5
    date: 2026-02-23
    changes: "'build-only' コンパイラオプションと辞書プレフィックスを追加"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, Together.ai プロバイダーのサポートを追加"
  - version: 8.0.5
    date: 2026-02-06
    changes: "AI設定に `dataSerialization` を追加"
  - version: 8.0.0
    date: 2026-01-24
    changes: "基盤となるメカニズムをより正確に表すため、`live` インポートモードを `fetch` に名前変更。"
  - version: 8.0.0
    date: 2026-01-22
    changes: "`importMode` ビルド設定を `dictionary` 設定に移動。"
  - version: 8.0.0
    date: 2026-01-22
    changes: "ルーティング設定に `rewrite` オプションを追加"
  - version: 8.0.0
    date: 2026-01-18
    changes: "コンテンツ設定からシステム設定を分離。内部パスを `system` プロパティに移動。コンテンツファイルとコード変換を分離するため `codeDir` を追加。"
  - version: 8.0.0
    date: 2026-01-18
    changes: "`location` と `schema` 辞書オプションを追加"
  - version: 7.5.1
    date: 2026-01-10
    changes: "JSON5 および JSONC ファイル形式のサポートを追加"
  - version: 7.5.0
    date: 2025-12-17
    changes: "`buildMode` オプションを追加"
  - version: 7.0.0
    date: 2025-10-25
    changes: "`dictionary` 設定を追加"
  - version: 7.0.0
    date: 2025-10-21
    changes: "`middleware` を `routing` 設定に置き換え"
  - version: 7.0.0
    date: 2025-10-12
    changes: "`formatCommand` オプションを追加"
  - version: 6.2.0
    date: 2025-10-12
    changes: "`excludedPath` オプションを更新"
  - version: 6.0.2
    date: 2025-09-23
    changes: "`outputFormat` オプションを追加"
  - version: 6.0.0
    date: 2025-09-21
    changes: "`dictionaryOutput` フィールドと `i18nextResourcesDir` フィールドを削除"
  - version: 6.0.0
    date: 2025-09-16
    changes: "`live` インポートモードを追加"
  - version: 6.0.0
    date: 2025-09-04
    changes: "`hotReload` フィールドを `liveSync` に置き換え、`liveSyncPort` と `liveSyncURL` フィールドを追加"
  - version: 5.6.1
    date: 2025-07-25
    changes: "`activateDynamicImport` を `importMode` オプションに置き換え"
  - version: 5.6.0
    date: 2025-07-13
    changes: "デフォルトの `contentDir` を `['src']` から `['.']` に変更"
  - version: 5.5.11
    date: 2025-06-29
    changes: "`docs` コマンドを追加"
---

# Intlayer 設定ドキュメント

## 概要

Intlayer 設定ファイルを使用すると、国際化、ミドルウェア、コンテンツ管理など、プラグインのさまざまな側面をカスタマイズできます。このドキュメントでは、設定内の各プロパティの詳細な説明を提供します。

---

## 目次

<TOC/>

---

## 設定ファイルのサポート

Intlayer は、JSON、JS、MJS、および TS の設定ファイル形式をサポートしています。

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 設定ファイルの例

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * 利用可能なすべてのオプションを示す Intlayer 設定ファイルの例。
 */
const config: IntlayerConfig = {
  /**
   * 国際化設定。
   */
  internationalization: {
    /**
     * アプリケーションでサポートされるロケールのリスト。
     * デフォルト: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * 各辞書で定義する必要がある必須ロケールのリスト。
     * 空の場合、`strict` モードですべてのロケールが必須になります。
     * デフォルト: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * 国際化されたコンテンツの厳密レベル。
     * - "strict": 宣言されたロケールが欠落している、または宣言されていない場合にエラーをスローします。
     * - "inclusive": 宣言されたロケールが欠落している場合に警告をスローします。
     * - "loose": 既存のロケールをすべて受け入れます。
     * デフォルト: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * 要求されたロケールが見つからない場合にフォールバックとして使用されるデフォルトロケール。
     * デフォルト: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * 辞書操作とフォールバック動作を制御する設定。
   */
  dictionary: {
    /**
     * 辞書のインポート方法を制御します。
     * - "static": ビルド時に静的にインポートされます。
     * - "dynamic": Suspense を使用して動的にインポートされます。
     * - "fetch": Live Sync API を介して動的に取得されます。
     * デフォルト: "static"
     */
    importMode: "static",

    /**
     * AI を使用して欠落している翻訳を自動入力する戦略。
     * ブール値、または入力されたコンテンツを保存するパスパターン。
     * デフォルト: true
     */
    fill: true,

    /**
     * 辞書ファイルの物理的な場所。
     * - "local": ローカルファイルシステムに保存されます。
     * - "remote": Intlayer CMS に保存されます。
     * - "hybrid": ローカルファイルシステムと Intlayer CMS の両方に保存されます。
     * - "plugin" (または任意のカスタム文字列): プラグインやカスタムソースによって提供されます。
     * デフォルト: "local"
     */
    location: "local",

    /**
     * コンテンツを自動的に変換するかどうか (例: Markdown から HTML)。
     * デフォルト: false
     */
    contentAutoTransformation: false,
  },

  /**
   * ルーティングとミドルウェアの設定。
   */
  routing: {
    /**
     * ロケールルーティング戦略。
     * - "prefix-no-default": デフォルト以外のすべてのロケールにプレフィックスを付けます (例: /dashboard, /fr/dashboard)。
     * - "prefix-all": すべてのロケールにプレフィックスを付けます (例: /en/dashboard, /fr/dashboard)。
     * - "no-prefix": URL にロケールを含めません。
     * - "search-params": ?locale=... を使用します。
     * デフォルト: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * ユーザーが選択したロケールを保存する場所。
     * オプション: 'cookie', 'localStorage', 'sessionStorage', 'header', またはそれらの配列。
     * デフォルト: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * アプリケーション URL のベースパス。
     * デフォルト: ""
     */
    basePath: "",

    /**
     * 特定のロケールパスに対するカスタム URL リライトルール。
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * ドメインベースのルーティングのために、ロケールをドメインのホスト名にマップします。
     * これらのロケールのURLは絶対URLになります（例：https://intlayer.cn/）。
     * ドメインがロケールを暗示するため、パスにロケールプレフィックスは追加されません。
     * デフォルト: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * コンテンツファイルの検索と処理に関する設定。
   */
  content: {
    /**
     * 辞書をスキャンするファイル拡張子。
     * デフォルト: ['.content.ts', '.content.js', '.content.json', など]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content ファイルが存在するディレクトリ。
     * デフォルト: ["."]
     */
    contentDir: ["src"],

    /**
     * ソースコードが存在するディレクトリ。
     * ビルドの最適化とコード変換に使用されます。
     * デフォルト: ["."]
     */
    codeDir: ["src"],

    /**
     * スキャンから除外するパターン。
     * デフォルト: ['node_modules', '.intlayer', など]
     */
    excludedPath: ["node_modules"],

    /**
     * 開発中に変更を監視し、辞書を再生成するかどうか。
     * デフォルト: 開発環境では true
     */
    watch: true,

    /**
     * 新しく作成または更新された .content ファイルをフォーマットするためのコマンド。
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * ビジュアルエディタの設定。
   */
  editor: {
    /**
     * ビジュアルエディタを有効にするかどうか。
     * デフォルト: false
     */
    enabled: true,

    /**
     * オリジン検証のためのアプリケーション URL。
     * デフォルト: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * ローカルエディタサーバーのポート。
     * デフォルト: 8000
     */
    port: 8000,

    /**
     * エディタのパブリック URL。
     * デフォルト: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS の URL。
     * デフォルト: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * バックエンド API の URL。
     * デフォルト: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * リアルタイムコンテンツ同期を有効にするかどうか。
     * デフォルト: false
     */
    liveSync: true,
  },

  /**
   * AI による翻訳と生成の設定。
   */
  ai: {
    /**
     * 使用する AI プロバイダー。
     * オプション: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * デフォルト: 'openai'
     */
    provider: "openai",

    /**
     * 選択したプロバイダーで使用するモデル。
     */
    model: "gpt-4o",

    /**
     * プロバイダーの API キー。
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * 翻訳を生成する際に AI をガイドするグローバルコンテキスト。
     */
    applicationContext: "これは旅行予約アプリケーションです。",

    /**
     * AI API のベース URL。
     */
    baseURL: "http://localhost:3000",

    /**
     * データシリアライゼーション
     *
     * オプション:
     * - "json": デフォルト、信頼性が高いがトークン消費が多い。
     * - "toon": トークン消費が少ないが、JSON ほど一貫性がない。
     *
     * デフォルト: "json"
     */
    dataSerialization: "json",
  },

  /**
   * ビルドと最適化の設定。
   */
  build: {
    /**
     * ビルドの実行モード。
     * - "auto": アプリのビルド中に自動的にビルドされます。
     * - "manual": 明示的なビルドコマンドが必要です。
     * デフォルト: "auto"
     */
    mode: "auto",

    /**
     * 未使用の辞書を削除して、最終的なバンドルを最適化するかどうか。
     * デフォルト: 本番環境では true
     */
    optimize: true,

    /**
     * バンドルサイズを削減するために辞書を圧縮（Minify）する。
     * デフォルト: true
     *
     * 注意点:
     * - `optimize` が無効な場合、このオプションは無視されます。
     * - `editor.enabled` が true の場合、このオプションは無視されます。
     */
    minify: true,

    /**
     * 辞書内の未使用のキーを削除（Purge）する。
     * デフォルト: true
     *
     * 注意点:
     * - `optimize` が無効な場合、このオプションは無視されます。
     */
    purge: true,

    /**
     * 生成された辞書ファイルの出力形式。
     * デフォルト: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * ビルド時に TypeScript の型チェックを行うかどうか。
     * デフォルト: false
     */
    checkTypes: false,
  },

  /**
   * ロガー設定。
   */
  log: {
    /**
     * ログレベル。
     * - "default": 標準的なログ記録。
     * - "verbose": 詳細なデバッグログ。
     * - "disabled": ログを記録しません。
     * デフォルト: "default"
     */
    mode: "default",

    /**
     * すべてのログメッセージのプレフィックス。
     * デフォルト: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * システム設定 (高度なユースケース)
   */
  system: {
    /**
     * ローカライズされた辞書を保存するディレクトリ。
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * モジュール拡張 (module augmentation) 用のディレクトリ。
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * マージされていない辞書を保存するディレクトリ。
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * 辞書の型を保存するディレクトリ。
     */
    typesDir: ".intlayer/types",

    /**
     * メインアプリケーションファイルが保存されるディレクトリ。
     */
    mainDir: ".intlayer/main",

    /**
     * コンパイルされた設定ファイルが保存されるディレクトリ。
     */
    configDir: ".intlayer/config",

    /**
     * キャッシュファイルが保存されるディレクトリ。
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * コンパイラ設定 (高度なユースケース)
   */
  compiler: {
    /**
     * コンパイラを有効にするかどうか。
     *
     * - false: コンパイラを無効にする。
     * - true: コンパイラを有効にする。
     * - "build-only": 起動時間を短縮するため、開発中はコンパイラをスキップする。
     *
     * デフォルト: false
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。`outputDir` を上書きします。
     *
     * - `./` で始まるパスは、コンポーネントのディレクトリを基準に解決されます。
     * - `/` で始まるパスは、プロジェクトのルート (`baseDir`) を基準に解決されます。
     *
     * - パスに `{{locale}}` 変数を含めると、ロケールごとに個別の辞書生成が有効になります。
     *
     * 例:
     * ```ts
     * {
     *   // コンポーネントの近くに多言語対応の .content.ts ファイルを作成する
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // テンプレート文字列を使用した同等の記述
     * }
     * ```
     *
     * ```ts
     * {
     *   // プロジェクトのルートにロケールごとに集約された JSON を作成する
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // テンプレート文字列を使用した同等の記述
     * }
     * ```
     *
     * 変数リスト:
     *   - `fileName`: ファイル名。
     *   - `key`: コンテンツキー。
     *   - `locale`: コンテンツロケール。
     *   - `extension`: ファイル拡張子。
     *   - `componentFileName`: コンポーネントファイル名。
     *   - `componentExtension`: コンポーネントファイル拡張子。
     *   - `format`: 辞書フォーマット。
     *   - `componentFormat`: コンポーネント辞書フォーマット。
     *   - `componentDirPath`: コンポーネントディレクトリパス。
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * 変換後のコンポーネントを保存するかどうか。
     * これにより、コンパイラを一度だけ実行してアプリケーションを変換し、その後削除することが可能になります。
     */
    saveComponents: false,

    /**
     * 生成されたファイルにコンテンツのみを挿入します。ロケールごとの i18next または ICU MessageFormat JSON 出力に有用です。
     */
    noMetadata: false,

    /**
     * 辞書キープレフィックス
     */
    dictionaryKeyPrefix: "", // 抽出された辞書キーにオプションのプレフィックスを追加します
  },

  /**
   * 辞書のコンテンツを検証するためのカスタムスキーマ。
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * プラグイン設定。
   */
  plugins: [],
};

export default config;
````

---

## 設定リファレンス

以下のセクションでは、Intlayer で利用可能なさまざまな設定項目について詳しく説明します。

---

### 国際化設定 (Internationalization)

使用可能なロケールやアプリケーションのデフォルトロケールなど、国際化に関連する設定を定義します。

| フィールド        | 説明                                                                                     | 型         | デフォルト          | 例                   | 備考                                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | アプリケーションでサポートされるロケールのリスト。                                       | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                                                         |
| `requiredLocales` | アプリケーションで必須とされるロケールのリスト。                                         | `string[]` | `[]`                | `[]`                 | • 空の場合、`strict` モードではすべてのロケールが必須になります。<br/>• 必須ロケールが `locales` フィールドにも定義されていることを確認してください。                                                                                                                                                                                                   |
| `strictMode`      | TypeScript を使用して、国際化コンテンツの堅牢な実装を保証します。                        | `string`   | `'inclusive'`       |                      | • `"strict"` の場合: `t` 関数は、宣言されたすべてのロケールが定義されていることを要求します。不足している場合や宣言されていない場合にエラーをスローします。<br/>• `"inclusive"` の場合: ロケールが不足している場合に警告を出しますが、宣言されていない既存のロケールの使用も許可します。<br/>• `"loose"` の場合: 既存のすべてのロケールを受け入れます。 |
| `defaultLocale`   | 要求されたロケールが見つからない場合にフォールバックとして使用されるデフォルトロケール。 | `string`   | `Locales.ENGLISH`   | `'en'`               | URL、Cookie、またはヘッダーでロケールが指定されていない場合にロケールを決定するために使用されます。                                                                                                                                                                                                                                                     |

---

### エディタ設定 (Editor)

サーバーポートや有効化ステータスなど、組み込みのビジュアルエディタの設定を定義します。

| フィールド                   | 説明                                                                                                                                                                                         | 型                                | デフォルト                          | 例                                                                                              | 備考                                                                                                                                                                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | アプリケーションの URL。                                                                                                                                                                     | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • セキュリティ上の理由から、エディタのオリジンを制限するために使用されます。<br/>• `'*'` に設定すると、任意のオリジンからエディタにアクセス可能になります。                                                                                          |
| `port`                       | ビジュアルエディタサーバーが使用するポート。                                                                                                                                                 | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                      |
| `editorURL`                  | エディタサーバーの URL。                                                                                                                                                                     | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • アプリケーションと対話可能なオリジンを制限するために使用されます。<br/>• `'*'` に設定すると、任意のオリジンからアクセス可能になります。<br/>• ポートが変更された場合や、エディタが別のドメインでホストされている場合に設定する必要があります。     |
| `cmsURL`                     | Intlayer CMS の URL。                                                                                                                                                                        | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                      |
| `backendURL`                 | バックエンドサーバーの URL。                                                                                                                                                                 | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                      |
| `enabled`                    | アプリケーションがビジュアルエディタと対話するかどうか。                                                                                                                                     | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • `false` の場合、エディタはアプリケーションと対話できません。<br/>• 特定の環境で無効にすることでセキュリティが向上します。                                                                                                                          |
| `clientId`                   | intlayer パッケージが oAuth2 を介してバックエンドで認証できるようにします。アクセストークンを取得するには、[intlayer.org/project](https://app.intlayer.org/project) にアクセスしてください。 | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | 秘密にする必要があるため、環境変数に保存してください。                                                                                                                                                                                               |
| `clientSecret`               | intlayer パッケージが oAuth2 を介してバックエンドで認証できるようにします。アクセストークンを取得するには、[intlayer.org/project](https://app.intlayer.org/project) にアクセスしてください。 | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | 秘密にする必要があるため、環境変数に保存してください。                                                                                                                                                                                               |
| `dictionaryPriorityStrategy` | ローカル辞書とリモート辞書の両方が存在する場合の、辞書の優先順位戦略。                                                                                                                       | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: ローカルよりもリモートを優先します。<br/>• `'local_first'`: リモートよりもローカルを優先します。                                                                                                                                |
| `liveSync`                   | CMS、ビジュアルエディタ、バックエンドでの変更が検出されたときに、アプリサーバーがコンテンツを即座にリロードするかどうか。                                                                    | `boolean`                         | `true`                              | `true`                                                                                          | • 辞書が追加または更新されると、アプリはページコンテンツを更新します。<br/>• Live Sync はコンテンツを別のサーバーにオフロードするため、パフォーマンスにわずかな影響を与える可能性があります。<br/>• 両方を同じマシンでホストすることをお勧めします。 |
| `liveSyncPort`               | Live Sync サーバーのポート。                                                                                                                                                                 | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                      |
| `liveSyncURL`                | Live Sync サーバーの URL。                                                                                                                                                                   | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | デフォルトで localhost を指します。リモートの Live Sync サーバーを使用する場合は変更可能です。                                                                                                                                                       |

---

### ルーティング設定 (Routing)

URL 構造、ロケール保存、ミドルウェア管理など、ルーティングの動作を制御する設定。

| フィールド | 説明                                                                                                                                                                                                                       | 型                                                                                                                                                                                                           | デフォルト             | 例                                                                                                                                                                                                   | 備考                                                                                                                                                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`     | ロケール管理のための URL ルーティングモード。                                                                                                                                                                              | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) または `/fr/dashboard` (fr)。 `'prefix-all'`: `/en/dashboard`。 `'no-prefix'`: ロケールは他の手段で管理されます。 `'search-params'`: `/dashboard?locale=fr` | Cookie やロケール保存の管理には影響しません。                                                                                                                                                                                                                                                    |
| `storage`  | クライアントでのロケール保存の設定。                                                                                                                                                                                       | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                   | 下記の「保存オプション」の表を参照してください。                                                                                                                                                                                                                                                 |
| `basePath` | アプリケーション URL のベースパス。                                                                                                                                                                                        | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                          | アプリが `https://example.com/my-app` にある場合、basePath は `'/my-app'` となり、URL は `https://example.com/my-app/en` のようになります。                                                                                                                                                      |
| `rewrite`  | 特定のパスに対してデフォルトのルーティングモードを上書きするカスタム URL リライトルール。動的パラメータ `[param]` をサポートします。                                                                                       | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | 下記の例を参照してください                                                                                                                                                                           | • リライトルールは `mode` よりも優先されます。<br/>• Next.js および Vite で動作します。<br/>• `getLocalizedUrl()` は一致するルールを自動的に適用します。<br/>• [カスタム URL リライト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md)を参照してください。 |
| `domains`  | ドメインベースのルーティングのために、ロケールをドメインのホスト名にマップします。設定されている場合、そのロケールのURLはパスのベースとしてそのドメインを使用し（絶対URL）、パスにロケールプレフィックスは追加されません。 | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                                          | • ホスト名に含まれていない場合、デフォルトのプロトコルは `https://` です。<br/>• ドメイン自体がロケールを識別するため、`/zh/` プレフィックスは追加されません。<br/>• `getLocalizedUrl('/', 'zh')` は `https://intlayer.zh/` を返します。                                                         |

**`rewrite` の例**:

```typescript
routing: {
  mode: "prefix-no-default", // フォールバック戦略
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### 保存オプション (Storage Options)

| 値                 | 備考                                                                                                                                                                                                              | 説明                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `'cookie'`         | • GDPR コンプライアンスのため、適切なユーザーの同意を確保してください。<br/>• `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`) を介してカスタマイズ可能です。     | ロケールを Cookie に保存します。クライアントとサーバーの両方からアクセス可能です。 |
| `'localStorage'`   | • 明示的にクリアされない限り期限切れになりません。<br/>• Intlayer プロキシからはアクセスできません。<br/>• `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`) を介してカスタマイズ可能です。 | ブラウザにロケールを無期限に保存します。クライアントサイドのみ。                   |
| `'sessionStorage'` | • タブやウィンドウが閉じられるとクリアされます。<br/>• Intlayer プロキシからはアクセスできません。<br/>• `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`) を介してカスタマイズ可能です。 | ページセッションの間、ロケールを保存します。クライアントサイドのみ。               |
| `'header'`         | • API 呼び出しに有用です。<br/>• クライアントサイドからはアクセスできません。<br/>• `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`) を介してカスタマイズ可能です。                              | HTTP ヘッダーを介してロケールを保存または送信します。サーバーサイドのみ。          |

#### Cookie 属性 (Cookies Attributes)

Cookie 保存を使用する場合、追加のアトリビュートを設定できます。

| フィールド | 説明                                           | 型                                                    |
| ---------- | ---------------------------------------------- | ----------------------------------------------------- |
| `name`     | Cookie の名前。デフォルト: `'INTLAYER_LOCALE'` | `string`                                              |
| `domain`   | Cookie のドメイン。デフォルト: `undefined`     | `string`                                              |
| `path`     | Cookie のパス。デフォルト: `undefined`         | `string`                                              |
| `secure`   | HTTPS を必須にします。デフォルト: `undefined`  | `boolean`                                             |
| `httpOnly` | HTTP-only フラグ。デフォルト: `undefined`      | `boolean`                                             |
| `sameSite` | SameSite ポリシー。                            | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | 有効期限または日数。デフォルト: `undefined`    | `Date` &#124; <br/> `number`                          |

#### 保存属性 (Storage Attributes)

localStorage または sessionStorage を使用する場合。

| フィールド | 説明                                            | 型                                               |
| ---------- | ----------------------------------------------- | ------------------------------------------------ |
| `type`     | 保存方法のタイプ。                              | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name`     | 保存キーの名前。デフォルト: `'INTLAYER_LOCALE'` | `string`                                         |

#### 設定例

新しい v7 ルーティング構造の一般的な設定例をいくつか示します。

**基本設定 (デフォルト)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**GDPR 準拠設定**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**検索パラメータモード**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**カスタム保存を使用したプレフィックスなしモード**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**動的パスを使用したカスタム URL リライト**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // リライトされないパスのフォールバック
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### コンテンツ設定 (Content)

ディレクトリ名、ファイル拡張子、派生設定など、アプリケーション内でのコンテンツ管理方法に関連する設定。

| フィールド       | 説明                                                                                  | 型         | デフォルト                                                                                                                                                                | 例                                                                                                                                                                                    | 備考                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Intlayer がコンテンツ宣言ファイルの変更を監視して辞書を再生成するかどうか。           | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                                      |
| `fileExtensions` | 辞書をコンパイルする際にスキャンするファイル拡張子。                                  | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | カスタマイズすることで競合を回避できる場合があります。                                                                                                               |
| `contentDir`     | コンテンツ定義ファイル (`.content.*`) が保存されているディレクトリパス。              | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | コンテンツファイルの監視と辞書の再生成に使用されます。                                                                                                               |
| `codeDir`        | コードが保存されているベースディレクトリからの相対ディレクトリパス。                  | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • コード変換 (プルーニング、最適化) のためにコードファイルを監視するために使用されます。<br/>• `contentDir` と分離することでパフォーマンスが向上する場合があります。 |
| `excludedPath`   | コンテンツスキャンから除外するディレクトリ。                                          | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | 未使用。将来の実装のために計画されています。                                                                                                                         |
| `formatCommand`  | Intlayer がローカルにファイルを書き込む際のコンテンツファイルのフォーマッタコマンド。 | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` はファイルパスに置き換えられます。<br/>• 未定義の場合、Intlayer は自動的に検出を試みます (prettier、biome、eslint をテスト)。                           |

---

### 辞書設定 (Dictionary)

自動入力動作やコンテンツ生成など、辞書操作を制御するパラメータ。

| フィールド                  | 説明                                                                                                                                          | 型                                                                                                              | デフォルト  | 例                                                                                          | 備考                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | 自動入力 (AI 翻訳) の出力ファイルがどのように生成されるかを制御します。                                                                       | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`      | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: デフォルトパス (ソースと同じファイル)。<br/>• `false`: 無効化。<br/>• 文字列/関数パターンは、ロケールごとのファイルを生成します。<br/>• ロケールごとのオブジェクト: 各ロケールが独自のパターンに対応します。`false` はそのロケールを無視します。<br/>• `{{locale}}` を含めると、ロケールごとの生成がトリガーされます。<br/>• 辞書レベルの `fill` は、常にこのグローバル設定よりも優先されます。 |
| `description`               | エディタや CMS が辞書の目的を理解するのに役立ちます。AI による翻訳生成のコンテキストとしても使用されます。                                    | `string`                                                                                                        | `undefined` | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `locale`                    | 辞書をロケールごとの形式に変換します。宣言された各フィールドが翻訳ノードになります。存在しない場合、辞書は多言語対応として扱われます。        | `LocalesValues`                                                                                                 | `undefined` | `'en'`                                                                                      | 辞書が複数の言語の翻訳を含むのではなく、特定のロケール専用である場合に使用します。                                                                                                                                                                                                                                                                                                                        |
| `contentAutoTransformation` | コンテンツの文字列を型付きノード (markdown, HTML, または insertion) に自動変換します。                                                        | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`     | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`。<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`。<br/>• 挿入 (Insertion) : `Hello {{name}}` → `insert('Hello {{name}}')`。                                                                                                                                                                                                                    |
| `location`                  | 辞書ファイルの保存場所と CMS との同期方法を指定します。                                                                                       | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`   | `'hybrid'`                                                                                  | • `'local'`: ローカルでのみ管理。<br/>• `'remote'`: リモート (CMS) でのみ管理。<br/>• `'hybrid'`: ローカルとリモートの両方で管理。<br/>• `'plugin'` またはカスタム文字列: プラグインやカスタムソースによって管理。                                                                                                                                                                                        |
| `importMode`                | 辞書のインポート方法を制御します。                                                                                                            | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`  | `'dynamic'`                                                                                 | • `'static'`: 静的インポート。<br/>• `'dynamic'`: Suspense を介した動的インポート。<br/>• `'fetch'`: Live Sync API を介して取得。失敗した場合は `'dynamic'` にフォールバック。<br/>• `@intlayer/babel` および `@intlayer/swc` プラグインが必要。<br/>• キーは静的に宣言される必要があります。<br/>• `optimize` がオフの場合は無視されます。<br/>• `getIntlayer`、`getDictionary` などには影響しません。   |
| `priority`                  | 辞書の優先順位。辞書間の競合を解決する際、高い値が低い値に優先されます。                                                                      | `number`                                                                                                        | `undefined` | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `live`                      | 非推奨 — 代わりに `importMode: 'fetch'` を使用してください。辞書コンテンツを Live Sync API を介して動的に取得するかどうかを指定していました。 | `boolean`                                                                                                       | `undefined` |                                                                                             | v8.0.0 で `importMode: 'fetch'` に名前変更。                                                                                                                                                                                                                                                                                                                                                              |
| `schema`                    | JSON スキーマ検証のために Intlayer によって自動生成されます。                                                                                 | `'https://intlayer.org/schema.json'`                                                                            | 自動生成    |                                                                                             | 手動で編集しないでください。                                                                                                                                                                                                                                                                                                                                                                              |
| `title`                     | エディタや CMS で辞書を識別するのに役立ちます。                                                                                               | `string`                                                                                                        | `undefined` | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tags`                      | 辞書をカテゴリ化し、エディタや AI にコンテキストや指示を提供します。                                                                          | `string[]`                                                                                                      | `undefined` | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                           |
| `version`                   | リモート辞書のバージョン。現在使用されているバージョンを追跡するのに役立ちます。                                                              | `string`                                                                                                        | `undefined` | `'1.0.0'`                                                                                   | • CMS で管理可能。<br/>• ローカルで編集しないでください。                                                                                                                                                                                                                                                                                                                                                 |

**`fill` の例**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### ロガー設定 (Logger)

Intlayer からのログ出力をカスタマイズするためのパラメータ。

| フィールド | 説明                             | 型                                                             | デフォルト      | 例               | 備考                                                                                                     |
| ---------- | -------------------------------- | -------------------------------------------------------------- | --------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| `mode`     | ロガーのモードを指定します。     | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`      | • `'verbose'`: デバッグ用により多くの情報を出力します。<br/>• `'disabled'`: ロガーを完全に無効にします。 |
| `prefix`   | ログメッセージのプレフィックス。 | `string`                                                       | `'[intlayer] '` | `'[my prefix] '` |                                                                                                          |

---

### AI 設定 (AI)

プロバイダー、モデル、API キーなど、Intlayer の AI 機能を制御する設定。

アクセストークンを使用して [Intlayer ダッシュボード](https://app.intlayer.org/project) に登録されている場合、この設定はオプションです。Intlayer は、ニーズに合わせて最も効率的で費用対効果の高い AI ソリューションを自動的に管理します。デフォルトのオプションを使用することで、Intlayer が常に最適なモデルを使用するように更新されるため、長期的なメンテナンス性が向上します。

独自の API キーや特定のモデルを使用したい場合は、カスタム AI 設定を定義できます。
この AI 設定は、Intlayer 環境内でグローバルに使用されます。CLI コマンド (例: `fill`) はデフォルトでこれらの設定を使用します。また、SDK、ビジュアルエディタ、CMS も同様です。コマンドパラメータを介して、特定のユースケースに対してこれらのデフォルト値を上書きできます。

Intlayer は、柔軟性を最大限に高めるために複数の AI プロバイダーをサポートしています。現在サポートされているプロバイダーは次のとおりです。

- **OpenAI** (デフォルト)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| フィールド           | 説明                                                                                                                                             | 型                                                                                                                                                                                                                                                                                                                                                                                             | デフォルト  | 例                                                            | 備考                                                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Intlayer の AI 機能に使用するプロバイダー。                                                                                                      | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | プロバイダーによって、必要な API キーや価格が異なります。                                                                                                                                                            |
| `model`              | AI 機能に使用するモデル。                                                                                                                        | `string`                                                                                                                                                                                                                                                                                                                                                                                       | なし        | `'gpt-4o-2024-11-20'`                                         | 特定のモデルはプロバイダーによって異なります。                                                                                                                                                                       |
| `temperature`        | AI の応答のランダム性を制御します。                                                                                                              | `number`                                                                                                                                                                                                                                                                                                                                                                                       | なし        | `0.1`                                                         | 温度が高いほど、創造的で予測しにくくなります。                                                                                                                                                                       |
| `apiKey`             | 選択したプロバイダーの API キー。                                                                                                                | `string`                                                                                                                                                                                                                                                                                                                                                                                       | なし        | `process.env.OPENAI_API_KEY`                                  | 秘密にする必要があるため、環境変数に保存してください。                                                                                                                                                               |
| `applicationContext` | AI がより正確な翻訳を生成できるようにするための、アプリケーションに関する追加のコンテキスト (ドメイン、ターゲットオーディエンス、トーン、用語)。 | `string`                                                                                                                                                                                                                                                                                                                                                                                       | なし        | `'旅行予約アプリのコンテキスト'`                              | ルールを追加するためにも使用できます (例: `"URL を変換しないでください"`)。                                                                                                                                          |
| `baseURL`            | AI API のベース URL。                                                                                                                            | `string`                                                                                                                                                                                                                                                                                                                                                                                       | なし        | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | ローカルまたはカスタムの AI API エンドポイントを指すことができます。                                                                                                                                                 |
| `dataSerialization`  | AI 機能のデータシリアライゼーション形式。                                                                                                        | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: デフォルト、信頼性が高いがトークン消費が多い。<br/>• `'toon'`: トークン消費が少ないが、一貫性に欠ける。<br/>• 推論の努力 (reasoning effort) などの追加パラメータがコンテキストとしてモデルに渡されます。 |

---

### ビルド設定 (Build)

Intlayer がアプリケーションの国際化をどのように最適化およびコンパイルするかを制御するパラメータ。

ビルドオプションは、`@intlayer/babel` および `@intlayer/swc` プラグインに適用されます。

> 開発モードでは、Intlayer は開発体験を簡素化するために辞書の静的インポートを使用します。

> 最適化中、Intlayer はチャンキングを最適化するために辞書の呼び出しを置き換え、最終的なバンドルが実際に使用される辞書のみをインポートするようにします。

| フィールド        | 説明                                                                             | 型                               | デフォルト                                                                                                                                                                        | 例                                                                            | 備考                                                                                                                                                                                                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`            | ビルドモードを制御します。                                                       | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: アプリのビルド中にビルドが自動的にトリガーされます。<br/>• `'manual'`: ビルドコマンドが明示的に呼び出されたときにのみ実行されます。<br/>• 辞書のビルドを無効にするためにも使用できます (例: Node.js 環境での実行を停止する場合)。                                                                                              |
| `optimize`        | ビルドの最適化を行うかどうかを制御します。                                       | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • 未定義の場合、フレームワークのビルド (Vite/Next.js) 時に最適化がトリガーされます。<br/>• `true` の場合、開発モードでも強制的に最適化を行います。<br/>• `false` の場合、無効化されます。<br/>• 有効な場合、チャンキングを最適化するために辞書の呼び出しを置き換えます。<br/>• `@intlayer/babel` および `@intlayer/swc` プラグインが必要。 |
| `minify`          | バンドルサイズを削減するために辞書を圧縮（Minify）する。                         | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • 最終的なバンドルを最小化するかどうかを指定します。<br/>• デフォルト：本番環境では `true`。<br/>• `optimize` が無効な場合、このオプションは無視されます。<br/>• `editor.enabled` が真の場合、このオプションは無視されます。                                                                                                               |
| `purge`           | 辞書内の未使用のキーを削除（Purge）する。                                        | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | • 最終的なバンドルをクリーンアップするかどうかを指定します。<br/>• デフォルト：本番環境では `true`。<br/>• `optimize` が無効な場合、このオプションは無視されます。                                                                                                                                                                         |
| `checkTypes`      | ビルド時に TypeScript の型チェックを行い、エラーを記録するかどうかを指定します。 | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | ビルドプロセスが遅くなる可能性があります。                                                                                                                                                                                                                                                                                                 |
| `outputFormat`    | 辞書の出力形式を制御します。                                                     | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                            |
| `traversePattern` | 最適化中にスキャンするファイルを定義するパターン。                               | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • ビルドパフォーマンスを向上させるために、最適化対象を関連するファイルに限定します。<br/>• `optimize` がオフの場合は無視されます。<br/>• glob パターンを使用します。                                                                                                                                                                       |

---

### システム設定 (System)

これらの設定は、高度なユースケースおよび Intlayer の内部設定用です。

| フィールド                | 説明                                           | 型       | デフォルト                        | 例  | 備考 |
| ------------------------- | ---------------------------------------------- | -------- | --------------------------------- | --- | ---- |
| `dictionariesDir`         | コンパイルされた辞書用のディレクトリ。         | `string` | `'.intlayer/dictionary'`          |     |      |
| `moduleAugmentationDir`   | TypeScript のモジュール拡張用ディレクトリ。    | `string` | `'.intlayer/types'`               |     |      |
| `unmergedDictionariesDir` | マージされていない辞書用のディレクトリ。       | `string` | `'.intlayer/unmerged_dictionary'` |     |      |
| `typesDir`                | 生成された型用のディレクトリ。                 | `string` | `'.intlayer/types'`               |     |      |
| `mainDir`                 | Intlayer メインファイル用のディレクトリ。      | `string` | `'.intlayer/main'`                |     |      |
| `configDir`               | コンパイルされた設定ファイル用のディレクトリ。 | `string` | `'.intlayer/config'`              |     |      |
| `cacheDir`                | キャッシュファイル用のディレクトリ。           | `string` | `'.intlayer/cache'`               |     |      |

---

### コンパイラ設定 (Compiler)

コンポーネントから直接辞書を抽出する Intlayer コンパイラを制御する設定。

| フィールド            | 説明                                                                                                                                                                                                                                                                                                               | 型                                                                                                              | デフォルト  | 例                                                                                                                                                       | 備考                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | 辞書の抽出のためにコンパイラを有効にするかどうかを指定します。                                                                                                                                                                                                                                                     | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` は起動時間を短縮するため、開発中はコンパイラをスキップします。ビルドコマンドでのみ実行されます。                                                                         |
| `dictionaryKeyPrefix` | 抽出された辞書キーのプレフィックス。                                                                                                                                                                                                                                                                               | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | 競合を避けるために、(ファイル名に基づいた) 生成されたキーに追加されます。                                                                                                               |
| `saveComponents`      | 変換後のコンポーネントを保存するかどうか。                                                                                                                                                                                                                                                                         | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • `true` の場合、元のファイルを変換後のバージョンで上書きします。<br/>• 実行後、コンパイラを削除することが可能になります。                                                              |
| `output`              | 出力ファイルのパスを定義します。`outputDir` を上書きします。変数テンプレートをサポート: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`。 | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • `./` はコンポーネントディレクトリ基準。<br/>• `/` はルート基準。<br/>• `{{locale}}` を含めるとロケールごとの生成がトリガーされます。<br/>• ロケールごとのオブジェクト記法をサポート。 |
| `noMetadata`          | `true` の場合、出力から辞書のメタデータ (キー、コンテンツラッパー) を除外します。                                                                                                                                                                                                                                  | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • i18next や ICU MessageFormat JSON 出力に有用。<br/>• `loadJSON` プラグインと組み合わせて使用。                                                                                        |
| `dictionaryKeyPrefix` | 辞書のキープレフィックス                                                                                                                                                                                                                                                                                           | `string`                                                                                                        | `''`        |                                                                                                                                                          | 抽出された辞書キーにオプションのプレフィックスを追加します。                                                                                                                            |

---

### カスタムスキーマ (Custom Schemas)

| フィールド | 説明                                                    | 型                          |
| ---------- | ------------------------------------------------------- | --------------------------- |
| `schemas`  | 辞書の構造を検証するための Zod スキーマを定義できます。 | `Record<string, ZodSchema>` |

---

### プラグイン (Plugins)

| フィールド | 説明                                     | 型                 |
| ---------- | ---------------------------------------- | ------------------ |
| `plugins`  | 有効にする Intlayer プラグインのリスト。 | `IntlayerPlugin[]` |

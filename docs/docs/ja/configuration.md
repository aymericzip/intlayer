---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: 設定 (Configuration)
description: アプリケーションにIntlayerを設定する方法を学びます。ニーズに合わせてIntlayerをカスタマイズするためのさまざまな設定とオプションを理解してください。
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
  - version: 8.4.0
    date: 2026-03-20
    changes: 'compiler.output' と 'dictionary.fill' に対するロケールごとのオブジェクト表記を追加
  - version: 8.3.0
    date: 2026-03-11
    changes: 'baseDir' を 'content' 設定から 'system' 設定に移動
  - version: 8.2.0
    date: 2026-03-09
    changes: コンパイラオプションを更新し、'output' と 'noMetadata' のサポートを追加
  - version: 8.1.7
    date: 2026-02-25
    changes: コンパイラオプションを更新
  - version: 8.1.5
    date: 2026-02-23
    changes: コンパイラオプション 'build-only' とディクショナリプレフィックスを追加
  - version: 8.0.6
    date: 2026-02-12
    changes: Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, Together.ai プロバイダーのサポートを追加
  - version: 8.0.5
    date: 2026-02-06
    changes: AI 設定に `dataSerialization` を追加
  - version: 8.0.0
    date: 2026-01-24
    changes: 基本的なメカニズムをより適切に説明するために、インポートモード `live` を `fetch` に変更。
  - version: 8.0.0
    date: 2026-01-22
    changes: ビルド設定 `importMode` を `dictionary` 設定に移動。
  - version: 8.0.0
    date: 2026-01-22
    changes: ルーティング設定に `rewrite` オプションを追加
  - version: 8.0.0
    date: 2026-01-18
    changes: システム設定をコンテンツ設定から分離。内部パスを `system` プロパティに移動。コンテンツファイルとコード変換を分離するために `codeDir` を追加。
  - version: 8.0.0
    date: 2026-01-18
    changes: ディクショナリオプション `location` と `schema` を追加
  - version: 7.5.1
    date: 2026-01-10
    changes: JSON5 および JSONC ファイル形式のサポートを追加
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` オプションを追加
  - version: 7.0.0
    date: 2025-10-25
    changes: `dictionary` 設定を追加
  - version: 7.0.0
    date: 2025-10-21
    changes: `middleware` をルーティング設定 `routing` に置き換え
  - version: 7.0.0
    date: 2025-10-12
    changes: `formatCommand` オプションを追加
  - version: 6.2.0
    date: 2025-10-12
    changes: `excludedPath` オプションを更新
  - version: 6.0.2
    date: 2025-09-23
    changes: `outputFormat` オプションを追加
  - version: 6.0.0
    date: 2025-09-21
    changes: `dictionaryOutput` フィールドと `i18nextResourcesDir` フィールドを削除
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` インポートモードを追加
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` フィールドを `liveSync` に置き換え、`liveSyncPort` および `liveSyncURL` フィールドを追加
  - version: 5.6.1
    date: 2025-07-25
    changes: `activateDynamicImport` を `importMode` オプションに置き換え
  - version: 5.6.0
    date: 2025-07-13
    changes: デフォルトの contentDir を `['src']` から `['.']` に変更
  - version: 5.5.11
    date: 2025-06-29
    changes: `docs` コマンドを追加
---

# Intlayer 設定ドキュメント

## 概要

Intlayer 設定ファイルを使用すると、国際化 (internationalization)、ミドルウェア、コンテンツ処理など、プラグインのさまざまな側面をカスタマイズできます。このドキュメントでは、設定内の各プロパティについて詳しく説明します。

---

## 目次

<TOC/>

---

## サポートされている設定ファイル形式

Intlayer は、JSON、JS、MJS、TS などの設定ファイル形式を受け入れます。

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
 * すべての利用可能なオプションを表示する Intlayer 設定ファイルの例。
 */
const config: IntlayerConfig = {
  /**
   * 国際化設定の構成。
   */
  internationalization: {
    /**
     * アプリケーションでサポートされるロケール (locales) のリスト。
     * デフォルト: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * 各辞書で定義する必要がある必須ロケールのリスト。
     * 空の場合、`strict` モードではすべてのロケールが必須になります。
     * デフォルト: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * 国際化されたコンテンツの厳格さのレベル。
     * - "strict": 宣言されたロケールが欠落しているか、未宣言の場合はエラー。
     * - "inclusive": 宣言されたロケールが欠落している場合は警告。
     * - "loose": 既存のロケールを受け入れる。
     * デフォルト: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * リクエストされたロケールが見つからない場合にフォールバックとして使用されるデフォルトロケール。
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
     * - "static": ビルド時に静的にインポート。
     * - "dynamic": Suspense を使用して動的にインポート。
     * - "fetch": Live Sync API を介して動的に取得。
     * デフォルト: "static"
     */
    importMode: "static",

    /**
     * AI を使用して欠落している翻訳を自動的に埋める戦略。
     * ブール値または埋められたコンテンツを保存するためのパスパターンを指定できます。
     * デフォルト: true
     */
    fill: true,

    /**
     * 辞書ファイルの物理的な場所。
     * - "local": ローカルファイルシステムに保存。
     * - "remote": Intlayer CMS に保存。
     * - "hybrid": ローカルと Intlayer CMS の両方に保存。
     * - "plugin" (または任意のカスタム文字列): プラグインまたはカスタムソースによって提供。
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
     * - "prefix-no-default": デフォルトロケール以外にプレフィックスを付ける (例: /dashboard, /fr/dashboard)。
     * - "prefix-all": すべてのロケールにプレフィックスを付ける (例: /en/dashboard, /fr/dashboard)。
     * - "no-prefix": URL にロケールを含めない。
     * - "search-params": ?locale=... を使用。
     * デフォルト: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * ユーザーが選択したロケールを保存する場所。
     * オプション: 'cookie', 'localStorage', 'sessionStorage', 'header', またはこれらの配列。
     * デフォルト: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * アプリケーション URL のベースパス。
     * デフォルト: ""
     */
    basePath: "",

    /**
     * ロケールごとの特定のパスに対するカスタム URL リライトルール。
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * コンテンツファイルの検索と処理に関する設定。
   */
  content: {
    /**
     * 辞書をスキャンするためのファイル拡張子。
     * デフォルト: ['.content.ts', '.content.js', '.content.json' など]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * .content ファイルが配置されているディレクトリ。
     * デフォルト: ["."]
     */
    contentDir: ["src"],

    /**
     * ソースコードが配置されている場所。
     * ビルドの最適化とコード変換に使用されます。
     * デフォルト: ["."]
     */
    codeDir: ["src"],

    /**
     * スキャンから除外されるパターン。
     * デフォルト: ['node_modules', '.intlayer' など]
     */
    excludedPath: ["node_modules"],

    /**
     * 開発中に変更を監視し、辞書を再構築するかどうか。
     * デフォルト: 開発中は true
     */
    watch: true,

    /**
     * 新しく作成または更新された .content ファイルをフォーマットするために使用されるコマンド。
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * ビジュアルエディターの設定。
   */
  editor: {
    /**
     * ビジュアルエディターが有効かどうか。
     * デフォルト: false
     */
    enabled: true,

    /**
     * オリジン検証のためのアプリケーションの URL。
     * デフォルト: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * ローカルエディターサーバーのポート。
     * デフォルト: 8000
     */
    port: 8000,

    /**
     * エディターの公開 URL。
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
   * AI ベースの翻訳および構築設定。
   */
  ai: {
    /**
     * 使用する AI プロバイダー。
     * オプション: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * デフォルト: 'openai'
     */
    provider: "openai",

    /**
     * 使用する選択されたプロバイダーのモデル。
     */
    model: "gpt-4o",

    /**
     * プロバイダーの API キー。
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * 翻訳を生成する際に AI を導くためのグローバルコンテキスト。
     */
    applicationContext: "これは旅行予約アプリケーションです。",

    /**
     * AI API のベース URL。
     */
    baseURL: "http://localhost:3000",

    /**
     * データシリアル化 (Data Serialization)
     *
     * オプション:
     * - "json": デフォルト、堅牢、より多くのトークンを消費します。
     * - "toon": トークンの消費が少なく、JSON ほど一貫性がない場合があります。
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
     * ビルド実行モード。
     * - "auto": アプリケーションのビルド中に自動的にビルド。
     * - "manual": 明示的なビルドコマンドが必要。
     * デフォルト: "auto"
     */
    mode: "auto",

    /**
     * 未使用の辞書を削除して、最終的なバンドルを最適化するかどうか。
     * デフォルト: 本番環境では true
     */
    optimize: true,

    /**
     * 生成された辞書ファイルの出力形式。
     * デフォルト: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * ビルドが TypeScript の型をチェックするかどうかを指定します。
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
     * - "default": 標準的なロギング。
     * - "verbose": 詳細なデバッグロギング。
     * - "disabled": ロギングを無効化。
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
   * システム設定 (高度な使用向け)
   */
  system: {
    /**
     * ローカライズされた辞書を保存するためのディレクトリ。
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * TypeScript モジュール拡張用のディレクトリ。
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * マージされていない辞書を保存するためのディレクトリ。
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * 辞書の型を保存するためのディレクトリ。
     */
    typesDir: ".intlayer/types",

    /**
     * メインアプリケーションファイルが保存されるディレクトリ。
     */
    mainDir: ".intlayer/main",

    /**
     * 設定ファイルが保存されるディレクトリ。
     */
    configDir: ".intlayer/config",

    /**
     * キャッシュファイルが保存されるディレクトリ。
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * コンパイラ設定 (高度な使用向け)
   */
  compiler: {
    /**
     * コンパイラを有効にするかどうかを指定します。
     *
     * - false: コンパイラを無効にします。
     * - true: コンパイラを有効にします。
     * - "build-only": 開発中のコンパイラをスキップし、起動速度を上げます。
     *
     * デフォルト: false
     */
    enabled: true,

    /**
     * 出力ファイルのパスを定義します。`outputDir` を置き換えます。
     *
     * - `./` パスはコンポーネントディレクトリを基準に解決されます。
     * - `/` パスはプロジェクトルート (`baseDir`) を基準に解決されます。
     *
     * - パスに `{{locale}}` 変数を含めると、言語ごとに個別の辞書が作成されます。
     *
     * 例:
     * ```ts
     * {
     *   // コンポーネントの隣に多言語の .content.ts ファイルを作成
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // テンプレート文字列を使用した同等の設定
     * }
     * ```
     *
     * ```ts
     * {
     *   // プロジェクトルートに言語ごとの一元化された JSON を作成
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // テンプレート文字列を使用した同等の設定
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
     *   - `format`: 辞書形式。
     *   - `componentFormat`: コンポーネント辞書形式。
     *   - `componentDirPath`: コンポーネントディレクトリパス。
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * コンポーネントを変換した後に保存するかどうか。
     * これにより、アプリケーションを変換するためにコンパイラを一度だけ実行し、その後削除することができます。
     */
    saveComponents: false,

    /**
     * 生成されたファイルにコンテンツのみを挿入します。i18next または ICU MessageFormat 形式の言語ごとの JSON 出力に役立ちます。
     */
    noMetadata: false,

    /**
     * 辞書キープレフィックス
     */
    dictionaryKeyPrefix: "", // 抽出された辞書キーにオプションのプレフィックスを追加
  },

  /**
   * 辞書コンテンツを検証するためのカスタムスキーマ。
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

以下のセクションでは、Intlayer で利用可能なさまざまな設定項目について説明します。

---

### 国際化設定 (Internationalization Configuration)

利用可能なロケールやアプリケーションのデフォルトロケールなど、国際化に関する設定を定義します。

| フィールド        | 型         | 説明                                                                                                                        | 例                   | 備考                                                                                                                                                                                                                                                                                        |
| ----------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | アプリケーションでサポートされるロケールのリスト。デフォルト: `[Locales.ENGLISH]`                                           | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                             |
| `requiredLocales` | `string[]` | アプリケーションにおける必須ロケールのリスト。デフォルト: `[]`                                                              | `[]`                 | 空の場合、`strict` モードではすべてのロケールが必須になります。必須ロケールが `locales` フィールドでも定義されていることを確認してください。                                                                                                                                                |
| `strictMode`      | `string`   | TypeScript を使用した堅牢な国際化コンテンツの実装を保証します。デフォルト: `inclusive`                                      |                      | `"strict"` の場合: `t` 関数は宣言されたすべてのロケールが定義されていることを要求します。欠落しているか未宣言の場合はエラーをスローします。 `"inclusive"` の場合: ロケールの欠落を警告しますが、既存の未宣言ロケールを受け入れます。 `"loose"` の場合: 既存の任意のロケールを受け入れます。 |
| `defaultLocale`   | `string`   | リクエストされたロケールが見つからない場合にフォールバックとして使用されるデフォルトロケール。デフォルト: `Locales.ENGLISH` | `'en'`               | URL、クッキー、またはヘッダーでロケールが指定されていない場合にロケールを決定するために使用されます。                                                                                                                                                                                       |

---

### エディター設定 (Editor Configuration)

サーバーポートやアクティビティ状態など、統合エディターに関連する設定を定義します。

| フィールド                   | 型                        | 説明                                                                                                                                                                                            | 例                                                                                    | 備考                                                                                                                                                                                                                                       |
| ---------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `applicationURL`             | `string`                  | アプリケーションの URL。デフォルト: `''`                                                                                                                                                        | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | セキュリティ上の理由からエディターのオリジンを制限するために使用されます。 `'*'` に設定すると、任意のオリジンからエディターにアクセスできます。                                                                                            |
| `port`                       | `number`                  | ビジュアルエディターサーバーで使用されるポート。デフォルト: `8000`                                                                                                                              |                                                                                       |                                                                                                                                                                                                                                            |
| `editorURL`                  | `string`                  | エディターサーバーの URL。デフォルト: `'http://localhost:8000'`                                                                                                                                 | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | アプリケーションと対話できるオリジンを制限するために使用されます。 `'*'` に設定すると、任意のオリジンからアクセス可能です。ポートを変更する場合や、エディターが別のドメインでホストされている場合は、設定する必要があります。              |
| `cmsURL`                     | `string`                  | Intlayer CMS の URL。デフォルト: `'https://intlayer.org'`                                                                                                                                       | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                            |
| `backendURL`                 | `string`                  | バックエンドサーバーの URL。デフォルト: `https://back.intlayer.org`                                                                                                                             | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                            |
| `enabled`                    | `boolean`                 | アプリがビジュアルエディターと対話するかどうかを指定します。デフォルト: `true`                                                                                                                  | `process.env.NODE_ENV !== 'production'`                                               | `false` の場合、エディターはアプリと対話できません。特定の環境で無効にすることでセキュリティを強化できます。                                                                                                                               |
| `clientId`                   | `string &#124; undefined` | oAuth2 を使用してバックエンドで認証できるようにします。アクセストークンを取得するには、[intlayer.org/project](https://app.intlayer.org/project) にアクセスしてください。デフォルト: `undefined` |                                                                                       | 秘密に保管し、環境変数に保存してください。                                                                                                                                                                                                 |
| `clientSecret`               | `string &#124; undefined` | oAuth2 を使用してバックエンドで認証できるようにします。アクセストークンを取得するには、[intlayer.org/project](https://app.intlayer.org/project) にアクセスしてください。デフォルト: `undefined` |                                                                                       | 秘密に保管し、環境変数に保存してください。                                                                                                                                                                                                 |
| `dictionaryPriorityStrategy` | `string`                  | ローカル辞書とリモート辞書の両方が存在する場合の辞書の優先順位付け戦略。デフォルト: `'local_first'`                                                                                             | `'distant_first'`                                                                     | `'distant_first'`: ローカルよりもリモートを優先します。 `'local_first'`: リモートよりもローカルを優先します。                                                                                                                              |
| `liveSync`                   | `boolean`                 | CMS / ビジュアルエディター / バックエンドで変更が検出されたときに、アプリサーバーがコンテンツをホットリロードするかどうかを指定します。デフォルト: `true`                                       | `true`                                                                                | 辞書が追加または更新されると、アプリはページコンテンツを更新します。ライブ同期はコンテンツを別のサーバーにアウトソーシングするため、パフォーマンスにわずかな影響を与える可能性があります。両方を同じマシンでホストすることをお勧めします。 |
| `liveSyncPort`               | `number`                  | ライブ同期サーバーのポート。デフォルト: `4000`                                                                                                                                                  | `4000`                                                                                |                                                                                                                                                                                                                                            |
| `liveSyncURL`                | `string`                  | ライブ同期サーバーの URL。デフォルト: `'http://localhost:{liveSyncPort}'`                                                                                                                       | `'https://example.com'`                                                               | デフォルトでは localhost を指しますが、リモートのライブ同期サーバーに変更可能です。                                                                                                                                                        |

### ルーティング設定 (Routing Configuration)

URL 構造、ロケールストレージ、ミドルウェア処理など、ルーティングの動作を制御する設定。

| フィールド | 型                                                                                                                                                   | 説明                                                                                                                                                        | 例                                                                                                                                                                                                 | 備考                                                                                                                                                                                                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | ロケール処理のための URL ルーティングモード。デフォルト: `'prefix-no-default'`                                                                              | `'prefix-no-default'`: `/dashboard` (en) または `/fr/dashboard` (fr)。 `'prefix-all'`: `/en/dashboard`。 `'no-prefix'`: 他の方法でロケールが処理される。 `'search-params'`: `/dashboard?locale=fr` | クッキーやロケールストレージの管理には影響しません。                                                                                                                                                                                                                         |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | クライアントにロケールを保存するための構成。デフォルト: `['cookie', 'header']`                                                                              | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                      | 下記の「ストレージオプション」の表を参照してください。                                                                                                                                                                                                                       |
| `basePath` | `string`                                                                                                                                             | アプリケーション URL のベースパス。デフォルト: `''`                                                                                                         | `'/my-app'`                                                                                                                                                                                        | アプリが `https://example.com/my-app` にある場合、basePath は `'/my-app'` となり、URL は `https://example.com/my-app/en` のようになります。                                                                                                                                  |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | 特定のパスに対してデフォルトのルーティングモードを上書きするカスタム URL リライトルール。動的パラメータ `[param]` をサポートします。デフォルト: `undefined` | 下記の例を参照                                                                                                                                                                                     | リライトルールは `mode` よりも優先されます。Next.js および Vite で動作します。 `getLocalizedUrl()` は一致するルールを自動的に適用します。 [カスタム URL リライト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/custom_url_rewrites.md) を参照してください。 |

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

#### ストレージオプション (Storage Options)

| 値                 | 説明                                                                                   | 備考                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | クッキーにロケールを保存します。クライアント側とサーバー側の両方からアクセス可能です。 | GDPR 準拠のため、適切なユーザーの同意が得られていることを確認してください。 `CookiesAttributes` でカスタマイズ可能です (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`)。 |
| `'localStorage'`   | ブラウザにロケールを保存します。有効期限はありません。クライアント側のみ。             | 明示的にクリアされない限り期限切れになりません。 Intlayer プロキシはアクセスできません。 `StorageAttributes` でカスタマイズ可能です (`{ type: 'localStorage', name: 'custom-locale' }`)。             |
| `'sessionStorage'` | ページセッションの間、ロケールを保存します。クライアント側のみ。                       | タブまたはウィンドウを閉じるとクリアされます。 Intlayer プロキシはアクセスできません。 `StorageAttributes` でカスタマイズ可能です (`{ type: 'sessionStorage', name: 'custom-locale' }`)。             |
| `'header'`         | HTTP ヘッダーを介してロケールを保存または送信します。サーバー側のみ。                  | API 呼び出しに役立ちます。クライアント側からはアクセスできません。 `StorageAttributes` でカスタマイズ可能です (`{ type: 'header', name: 'custom-locale' }`)。                                         |

#### クッキー属性 (Cookie Attributes)

クッキーによるストレージを使用する場合、追加のクッキー属性を設定できます。

| フィールド | 型                                    | 説明                                          |
| ---------- | ------------------------------------- | --------------------------------------------- |
| `name`     | `string`                              | クッキー名。デフォルト: `'INTLAYER_LOCALE'`   |
| `domain`   | `string`                              | クッキーのドメイン。デフォルト: `undefined`   |
| `path`     | `string`                              | クッキーのパス。デフォルト: `undefined`       |
| `secure`   | `boolean`                             | HTTPS を必須にします。デフォルト: `undefined` |
| `httpOnly` | `boolean`                             | HTTP-only フラグ。デフォルト: `undefined`     |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | SameSite ポリシー。                           |
| `expires`  | `Date &#124; number`                  | 有効期限または日数。デフォルト: `undefined`   |

#### ロケールストレージ属性 (Locale Storage Attributes)

localStorage または sessionStorage を使用する場合:

| フィールド | 型                                       | 説明                                                  |
| ---------- | ---------------------------------------- | ----------------------------------------------------- |
| `type`     | `'localStorage' &#124; 'sessionStorage'` | ストレージの種類。                                    |
| `name`     | `string`                                 | ストレージキーの名前。デフォルト: `'INTLAYER_LOCALE'` |

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

**GDPR 準拠の設定**:

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

**検索パラメータモード (Search Parameters Mode)**:

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

**カスタムストレージを使用したプレフィックスなしモード (No Prefix Mode)**:

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

### コンテンツ設定 (Content Configuration)

アプリケーション内でのコンテンツの処理に関する設定 (ディレクトリ名、ファイル拡張子、派生設定)。

| フィールド       | 型         | 説明                                                                                                                                                                                                  | 例                                  | 備考                                                                                                       |
| ---------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Intlayer が辞書を再構築するためにコンテンツ宣言ファイルの変更を監視するかどうかを指定します。デフォルト: `process.env.NODE_ENV === 'development'`                                                     |                                     |                                                                                                            |
| `fileExtensions` | `string[]` | コンテンツ宣言ファイルをスキャンするために使用されるファイル拡張子。デフォルト: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                            |
| `contentDir`     | `string[]` | コンテンツ宣言ファイルが配置されているディレクトリへのパス。デフォルト: `['.']`                                                                                                                       | `['src/content']`                   |                                                                                                            |
| `codeDir`        | `string[]` | アプリケーションのソースコードファイルが配置されているディレクトリへのパス。デフォルト: `['.']`                                                                                                       | `['src']`                           | ビルドを最適化し、コード変換とホットリロードが必要なファイルにのみ適用されるようにするために使用されます。 |
| `excludedPath`   | `string[]` | コンテンツスキャンから除外されるパス。デフォルト: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                           | `['src/styles']`                    |                                                                                                            |
| `formatCommand`  | `string`   | 新しく作成または更新されたコンテンツファイルをフォーマットするために実行されるコマンド。デフォルト: `undefined`                                                                                       | `'npx prettier --write "{{file}}"'` | コンテンツ抽出時やビジュアルエディターを介して使用されます。                                               |

---

### 辞書設定 (Dictionary Configuration)

自動入力動作やコンテンツ生成など、辞書操作を制御する設定。

この辞書設定には、主に 2 つの目的があります：

1. **デフォルト値**: コンテンツ宣言ファイルを作成する際のデフォルト値を定義します。
2. **フォールバック動作**: 特定のフィールドが定義されていない場合にフォールバック値を提供し、辞書操作の動作をグローバルに定義できるようにします。

コンテンツ宣言ファイルと設定値の適用方法の詳細については、[コンテンツファイルのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

| フィールド                  | 型                                                                                              | 説明                                                                                       | 例             | 備考                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | 自動入力（AI 翻訳）出力ファイルの生成方法を制御します。デフォルト: `true`                  | 下記の例を参照 | `true`: デフォルトパス（ソースと同じファイル）。 `false`: 無効。文字列/関数テンプレートはロケールごとにファイルを生成します。ロケールごとのオブジェクト：各ロケールが独自のパターンにマップされます。 `false` はそのロケールをスキップします。 `{{locale}}` を含めると、ロケールごとの生成がトリガーされます。辞書レベルの `fill` は、常にこのグローバル設定よりも優先されます。 |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | 辞書のインポート方法を制御します。デフォルト: `'static'`                                   | `'dynamic'`    | `'static'`: 静的にインポートされます。 `'dynamic'`: Suspense を使用して動的にインポートされます。 `'fetch'`: Live Sync API を介して動的に取得されます。 `getIntlayer`, `getDictionary`, `useDictionary` などには影響しません。                                                                                                                                                   |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | 辞書の保存場所。デフォルト: `'local'`                                                      | `'remote'`     | `'local'`: ファイルシステム。 `'remote'`: Intlayer CMS。 `'hybrid'`: 両方。                                                                                                                                                                                                                                                                                                      |
| `contentAutoTransformation` | `boolean`                                                                                       | コンテンツファイルを自動的に変換するかどうか (例: Markdown から HTML)。デフォルト: `false` | `true`         | @intlayer/markdown を介して Markdown フィールドを処理するのに役立ちます。                                                                                                                                                                                                                                                                                                        |

**`fill` の例**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### AI 設定 (AI Configuration)

翻訳構築などの Intlayer の AI 搭載機能の設定を定義します。

| フィールド           | 型                     | 説明                                                            | 例                                          | 備考                                                                                              |
| -------------------- | ---------------------- | --------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | 使用する AI プロバイダー。                                      | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                                   |
| `model`              | `string`               | 使用する AI モデル。                                            | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                                   |
| `apiKey`             | `string`               | 選択したプロバイダーの API キー。                               | `process.env.OPENAI_API_KEY`                |                                                                                                   |
| `applicationContext` | `string`               | AI 翻訳の精度を向上させるためのアプリに関する追加コンテキスト。 | `'子供向けの学習プラットフォーム。'`        |                                                                                                   |
| `baseURL`            | `string`               | API 呼び出し用のオプションのベース URL。                        |                                             | プロキシやローカル AI デプロイメントを使用している場合に役立ちます。                              |
| `dataSerialization`  | `'json' &#124; 'toon'` | AI にデータを送信する方法を定義します。デフォルト: `'json'`     | `'json'`                                    | `'json'`: より堅牢で正確。 `'toon'`: トークンの消費は少ないですが、安定性に欠ける場合があります。 |

---

### ビルド設定 (Build Configuration)

Intlayer のビルドプロセスと最適化に関する設定。

| フィールド     | 型                       | 説明                                                                                                 | 例  | 備考 |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- | --- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | アプリのプリビルドステップ中に Intlayer を自動的に実行するかどうかを指定します。デフォルト: `'auto'` |     |      |
| `optimize`     | `boolean`                | コンパイルされた辞書を実行時用に最適化するかどうかを指定します。デフォルト: 本番環境では `true`      |     |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | 生成された辞書ファイルの出力形式。デフォルト: `['cjs', 'esm']`                                       |     |      |
| `checkTypes`   | `boolean`                | Intlayer が生成されたファイルの型をチェックするかどうかを指定します。デフォルト: `false`             |     |      |

---

### システム設定 (System Configuration)

これらは高度なユースケースおよび Intlayer の内部構成用の設定です。

| フィールド                | 型       | 説明                                         | デフォルト                        |
| ------------------------- | -------- | -------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | コンパイルされた辞書のディレクトリ。         | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | TypeScript モジュール拡張ディレクトリ。      | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | マージされていない辞書のディレクトリ。       | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | 生成された型のディレクトリ。                 | `'.intlayer/types'`               |
| `mainDir`                 | `string` | メインの Intlayer ファイルディレクトリ。     | `'.intlayer/main'`                |
| `configDir`               | `string` | コンパイルされた設定ファイルのディレクトリ。 | `'.intlayer/config'`              |
| `cacheDir`                | `string` | キャッシュファイルのディレクトリ。           | `'.intlayer/cache'`               |

---

### コンパイラ設定 (Compiler Configuration)

Intlayer コンパイラ (`intlayer compiler`) の設定。

| フィールド            | 型                       | 説明                                                                             | デフォルト |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------- | ---------- |
| `enabled`             | `boolean`                | コンパイラがアクティブかどうかを指定します。                                     | `false`    |
| `output`              | `string &#124; Function` | 抽出された辞書の出力パス。                                                       |            |
| `saveComponents`      | `boolean`                | オリジナルのソースファイルを変換後のバージョンで上書きするかどうかを指定します。 | `false`    |
| `noMetadata`          | `boolean`                | `true` の場合、コンパイラは生成されたファイルにメタデータを含めません。          | `false`    |
| `dictionaryKeyPrefix` | `string`                 | オプションの辞書キープレフィックス。                                             | `''`       |

---

### ロガー設定 (Logger Configuration)

Intlayer のログ出力をカスタマイズするための設定。

| フィールド | 型                                             | 説明                             | デフォルト     |
| ---------- | ---------------------------------------------- | -------------------------------- | -------------- |
| `mode`     | `'default' &#124; 'verbose' &#124; 'disabled'` | ロギングモード。                 | `'default'`    |
| `prefix`   | `string`                                       | ログメッセージのプレフィックス。 | `'[intlayer]'` |

---

### カスタムスキーマ (Custom Schemas)

| フィールド | 型                          | 説明                                                    |
| ---------- | --------------------------- | ------------------------------------------------------- |
| `schemas`  | `Record<string, ZodSchema>` | 辞書の構造を検証するための Zod スキーマを定義できます。 |

---

### プラグイン (Plugins)

| フィールド | 型                 | 説明                                     |
| ---------- | ------------------ | ---------------------------------------- |
| `plugins`  | `IntlayerPlugin[]` | 有効にする Intlayer プラグインのリスト。 |

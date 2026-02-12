---
createdAt: 2024-08-13
updatedAt: 2026-02-12
title: 設定
description: Intlayerをアプリケーション向けに設定する方法を学びます。Intlayerをニーズに合わせてカスタマイズするためのさまざまな設定やオプションについて理解しましょう。
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
  - version: 8.0.6
    date: 2026-02-12
    changes: Add support for Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face, and Together.ai providers
  - version: 8.0.5
    date: 2026-02-06
    changes: AI設定に `dataSerialization` を追加
  - version: 8.0.0
    date: 2026-01-22
    changes: Move `importMode` build configuration to `dictionary` configuration.
  - version: 8.0.0
    date: 2026-01-18
    changes: システム設定をコンテンツ設定から分離。内部パスを `system` プロパティに移動。コンテンツファイルとコード変換を分離するために `codeDir` を追加。
  - version: 8.0.0
    date: 2026-01-18
    changes: 辞書オプション `location` と `schema` を追加
  - version: 7.5.1
    date: 2026-01-10
    changes: JSON5 および JSONC ファイル形式のサポートを追加
  - version: 7.5.0
    date: 2025-12-17
    changes: `buildMode` オプションを追加
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` インポートモードを追加
  - version: 6.0.0
    date: 2025-09-16
    changes: `live` インポートモードを追加
  - version: 6.0.0
    date: 2025-09-04
    changes: `hotReload` フィールドを `liveSync` に置き換え、`liveSyncPort` と `liveSyncURL` フィールドを追加
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

Intlayerの設定ファイルは、国際化、ミドルウェア、コンテンツ処理など、プラグインのさまざまな側面をカスタマイズすることを可能にします。本ドキュメントでは、設定内の各プロパティについて詳細に説明します。

---

## 目次

<TOC/>

---

## 設定ファイルの対応形式

IntlayerはJSON、JS、MJS、TSの設定ファイル形式をサポートしています：

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

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

/**
 * Example Intlayer configuration file showing all available options.
 */
const config: IntlayerConfig = {
  /**
   * Configuration for internationalization settings.
   */
  internationalization: {
    /**
     * List of supported locales in the application.
     * Default: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * List of required locales that must be defined in every dictionary.
     * If empty, all locales are required in `strict` mode.
     * Default: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Strictness level for internationalized content.
     * - "strict": Errors if any declared locale is missing or undeclared.
     * - "inclusive": Warnings if a declared locale is missing.
     * - "loose": Accepts any existing locale.
     * Default: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Default locale used as a fallback if the requested locale is not found.
     * Default: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Settings that control dictionary operations and fallback behavior.
   */
  dictionary: {
    /**
     * Controls how dictionaries are imported.
     * - "static": Statically imported at build time.
     * - "dynamic": Dynamically imported using Suspense.
     * - "fetch": Fetched dynamically via the live sync API.
     * Default: "static"
     */
    importMode: "static",

    /**
     * Strategy for auto-filling missing translations using AI.
     * Can be a boolean or a path pattern to store filled content.
     * Default: true
     */
    fill: true,

    /**
     * Physical location of the dictionary files.
     * - "local": Stored in the local filesystem.
     * - "remote": Stored in the Intlayer CMS.
     * - "hybrid": Stored in the local filesystem and the Intlayer CMS.
     * - "plugin" (or any custom string): Provided by a plugin or a custom source.
     * Default: "local"
     */
    location: "local",

    /**
     * Whether to automatically transform content (e.g., Markdown to HTML).
     * Default: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Routing and middleware configuration.
   */
  routing: {
    /**
     * Locale routing strategy.
     * - "prefix-no-default": Prefix all except the default locale (e.g., /dashboard, /fr/dashboard).
     * - "prefix-all": Prefix all locales (e.g., /en/dashboard, /fr/dashboard).
     * - "no-prefix": No locale in the URL.
     * - "search-params": Use ?locale=...
     * Default: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Where to store the user's selected locale.
     * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
     * Default: ['cookie', 'header']
     */
    storage: "cookie",

    /**
     * Base path for the application URLs.
     * Default: ""
     */
    basePath: "",

    /**
     * Custom URL rewriting rules for locale-specific paths.
     */
    rewrite: {
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
    },
  },

  /**
   * Settings for finding and processing content files.
   */
  content: {
    /**
     * File extensions to scan for dictionaries.
     * Default: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directories where .content files are located.
     * Default: ["."]
     */
    contentDir: ["src"],

    /**
     * Directories where source code is located.
     * Used for build optimization and code transformation.
     * Default: ["."]
     */
    codeDir: ["src"],

    /**
     * Patterns to exclude from scanning.
     * Default: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Whether to watch for changes and rebuild dictionaries in development.
     * Default: true in development
     */
    watch: true,

    /**
     * Command to format newly created / updated .content files.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Visual Editor configuration.
   */
  editor: {
    /**
     * Whether the visual editor is enabled.
     * Default: true
     */
    enabled: true,

    /**
     * URL of your application for origin validation.
     * Default: "*"
     */
    applicationURL: "http://localhost:3000",

    /**
     * Port for the local editor server.
     * Default: 8000
     */
    port: 8000,

    /**
     * Public URL for the editor.
     * Default: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * Intlayer CMS URL.
     * Default: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * Backend API URL.
     * Default: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Whether to enable real-time content synchronization.
     * Default: false
     */
    liveSync: true,
  },

  /**
   * AI-powered translation and generation settings.
   */
  ai: {
    /**
     * AI provider to use.
     * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Default: 'openai'
     */
    provider: "openai",

    /**
     * Model to use from the selected provider.
     */
    model: "gpt-4o",

    /**
     * Provider API key.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Global context to guide the AI in generating translations.
     */
    applicationContext: "This is a travel booking application.",

    /**
     * Base URL for the AI API.
     */
    baseURL: "http://localhost:3000",
  },

  /**
   * Build and optimization settings.
   */
  build: {
    /**
     * Build execution mode.
     * - "auto": Automatic build during app build.
     * - "manual": Requires explicit build command.
     * Default: "auto"
     */
    mode: "auto",

    /**
     * Whether to optimize the final bundle by pruning unused dictionaries.
     * Default: true in production
     */
    optimize: true,

    /**
     * Output format for generated dictionary files.
     * Default: ['esm', 'cjs']
     */
    outputFormat: ["esm"],
  },

  /**
   * Logger configuration.
   */
  log: {
    /**
     * Logging level.
     * - "default": Standard logging.
     * - "verbose": Detailed debug logging.
     * - "disabled": No logging.
     * Default: "default"
     */
    mode: "default",

    /**
     * Prefix for all log messages.
     * Default: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * System configuration (Advanced use cases)
   */
  system: {
    /**
     * Directory for storing localization dictionaries.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory for module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory for storing unmerged dictionaries.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory for storing dictionary types.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory where main application files are stored.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory where the configuration files are stored.
     */
    configDir: ".intlayer/config",

    /**
     * Directory where the cache files are stored.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compiler configuration (Advanced use cases)
   */
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Pattern to traverse the code to optimize.
     */
    transformPattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],

    /**
     * Pattern to exclude from the optimization.
     */
    excludePattern: ["**/node_modules/**"],

    /**
     * Output directory for the optimized dictionaries.
     */
    outputDir: "compiler",
  },

  /**
   * Custom schemas to validate the dictionaries content.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Plugins configuration.
   */
  plugins: [],
};

export default config;
```

## 設定リファレンス

以下のセクションでは、Intlayerで利用可能なさまざまな設定項目について説明します。

---

### 国際化設定

国際化に関連する設定を定義します。利用可能なロケールやアプリケーションのデフォルトロケールを含みます。

#### プロパティ

- **locales**:
  - _型_: `string[]`
  - _デフォルト_: `['en']`
  - _説明_: アプリケーションでサポートされているロケールのリスト。
  - _例_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _型_: `string[]`
  - _デフォルト_: `[]`
  - _説明_: アプリケーションで必須とされるロケールのリスト。
  - _例_: `[]`
  - _注意_: 空の場合、`strict` モードではすべてのロケールが必須となります。
  - _注意_: 必須のロケールは `locales` フィールドにも定義されていることを確認してください。
- **strictMode**:
  - _型_: `string`
  - _デフォルト_: `inclusive`
  - _説明_: TypeScriptを使用して国際化コンテンツの強力な実装を保証します。
  - _注意_: "strict" に設定すると、翻訳関数 `t` は宣言されたすべてのロケールが定義されていることを要求します。ロケールが1つでも欠けているか、設定に宣言されていないロケールがある場合はエラーをスローします。
  - _注意_: "inclusive" に設定すると、翻訳関数 `t` は宣言されたすべてのロケールが定義されていることを要求します。ロケールが1つでも欠けている場合は警告を出します。ただし、設定に宣言されていないが存在するロケールは許容します。
  - _注意_: "loose" に設定すると、翻訳関数 `t` は存在する任意のロケールを受け入れます。

- **defaultLocale**:
  - _タイプ_: `string`
  - _デフォルト_: `'en'`
  - _説明_: 要求されたロケールが見つからない場合にフォールバックとして使用されるデフォルトのロケール。
  - _例_: `'en'`
  - _注意_: URL、クッキー、またはヘッダーでロケールが指定されていない場合に、どのロケールを使用するかを決定するために使用されます。

---

### エディター設定

統合エディターに関連する設定を定義します。サーバーポートやアクティブ状態などが含まれます。

#### プロパティ

- **applicationURL**:
  - _タイプ_: `string`
  - _デフォルト_: `http://localhost:3000`
  - _説明_: アプリケーションのURL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。
  - _例_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_: アプリケーションのURL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。`'*'`に設定すると、どのオリジンからでもエディターにアクセス可能になります。

- **port**:
  - _タイプ_: `number`
  - _デフォルト_: `8000`
  - _説明_: ビジュアルエディターサーバーが使用するポート。

- **editorURL**:
  - _タイプ_: `string`
  - _デフォルト_: `'http://localhost:8000'`
  - _説明_: エディターサーバーのURL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注_: アプリケーションからアクセスするエディターサーバーのURL。セキュリティ上の理由から、アプリケーションとやり取りできるオリジンを制限するために使用されます。`'*'`に設定すると、エディターは任意のオリジンからアクセス可能になります。ポートを変更した場合やエディターが異なるドメインでホストされている場合に設定する必要があります。

- **cmsURL**:
  - _型_: `string`
  - _デフォルト_: `'https://intlayer.org'`
  - _説明_: Intlayer CMSのURL。
  - _例_: `'https://intlayer.org'`
  - _注_: Intlayer CMSのURL。

- **backendURL**:
  - _型_: `string`
  - _デフォルト_: `https://back.intlayer.org`
  - _説明_: バックエンドサーバーのURL。
  - _例_: `http://localhost:4000`

- **enabled**:
  - _型_: `boolean`
  - _デフォルト_: `true`
  - _説明_: アプリケーションがビジュアルエディターと連携するかどうかを示します。
  - _例_: `process.env.NODE_ENV !== 'production'`
  - _注意_: true の場合、エディターはアプリケーションと連携可能です。false の場合、エディターはアプリケーションと連携できません。いずれの場合も、エディターはビジュアルエディターによってのみ有効化されます。特定の環境でエディターを無効にすることは、セキュリティを強化する方法の一つです。

- **clientId**:
  - _タイプ_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId と clientSecret は、intlayer パッケージが oAuth2 認証を使用してバックエンドと認証するために使用されます。アクセストークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセストークンを取得するには、https://app.intlayer.org/project にアクセスしてアカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientId と clientSecret は秘密にしておく必要があり、公開しないでください。環境変数などの安全な場所に保管することをお勧めします。

- **clientSecret**:
  - _タイプ_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId と clientSecret は、intlayer パッケージが oAuth2 認証を使用してバックエンドと認証するために使用されます。アクセストークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセストークンを取得するには、https://app.intlayer.org/project にアクセスしてアカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientId と clientSecret は秘密にしておく必要があり、公開しないでください。環境変数などの安全な場所に保管することを推奨します。

- **dictionaryPriorityStrategy**:
  - _タイプ_: `string`
  - _デフォルト_: `'local_first'`
  - _説明_: ローカル辞書と遠隔辞書の両方が存在する場合に、どちらを優先するかの戦略です。`'distant_first'` に設定すると、アプリケーションは遠隔辞書をローカル辞書より優先します。`'local_first'` に設定すると、アプリケーションはローカル辞書を遠隔辞書より優先します。
  - _例_: `'distant_first'`

- **liveSync**:
  - _型_: `boolean`
  - _デフォルト_: `false`
  - _説明_: CMS / ビジュアルエディター / バックエンドで変更が検出された際に、アプリケーションサーバーがコンテンツをホットリロードするかどうかを示します。
  - _例_: `true`
  - _注意_: 例えば、新しい辞書が追加または更新された場合、アプリケーションはページに表示するコンテンツを更新します。
  - _注記_: ライブ同期はアプリケーションのコンテンツを別のサーバーに外部化する必要があります。これはアプリケーションのパフォーマンスにわずかな影響を与える可能性があります。これを制限するために、アプリケーションとライブ同期サーバーを同じマシン上にホストすることを推奨します。また、ライブ同期と `optimize` の組み合わせはライブ同期サーバーへのリクエスト数を大幅に増加させる可能性があります。インフラストラクチャに応じて、両方のオプションおよびその組み合わせをテストすることを推奨します。

- **liveSyncPort**:
  - _タイプ_: `number`
  - _デフォルト_: `4000`
  - _説明_: ライブ同期サーバーのポート番号。
  - _例_: `4000`
  - _注記_: ライブ同期サーバーのポート番号。

- **liveSyncURL**:
  - _タイプ_: `string`
  - _デフォルト_: `'http://localhost:{liveSyncPort}'`
  - _説明_: ライブシンクサーバーのURL。
  - _例_: `'https://example.com'`
  - _注意_: デフォルトではlocalhostを指しますが、リモートのライブシンクサーバーの場合は任意のURLに変更可能です。

### ミドルウェア設定

ミドルウェアの動作を制御する設定で、アプリケーションがクッキー、ヘッダー、ロケール管理のためのURLプレフィックスをどのように扱うかを含みます。

#### プロパティ

- **headerName**:
  - _型_: `string`
  - _デフォルト_: `'x-intlayer-locale'`
  - _説明_: ロケールを判定するために使用されるHTTPヘッダーの名前。
  - _例_: `'x-custom-locale'`
  - _注意_: APIベースのロケール判定に便利です。

- **cookieName**:
  - _型_: `string`
  - _デフォルト_: `'intlayer-locale'`
  - _説明_: ロケールを保存するために使用されるクッキーの名前。
  - _例_: `'custom-locale'`
  - _注意_: セッション間でロケールを保持するために使用されます。

- **prefixDefault**:
  - _タイプ_: `boolean`
  - _デフォルト_: `false`
  - _説明_: デフォルトのロケールをURLに含めるかどうか。
  - _例_: `true`
  - _注意_:
    - `true` かつ `defaultLocale = 'en'` の場合: パスは `/en/dashboard` または `/fr/dashboard`
    - `false` かつ `defaultLocale = 'en'` の場合: パスは `/dashboard` または `/fr/dashboard`

- **basePath**:
  - _タイプ_: `string`
  - _デフォルト_: `''`
  - _説明_: アプリケーションのURLのベースパス。
  - _例_: `'/my-app'`
  - _注意_:
    - アプリケーションが `https://example.com/my-app` にホストされている場合
    - ベースパスは `'/my-app'`
    - URLは `https://example.com/my-app/en` となります
    - ベースパスが設定されていない場合、URLは `https://example.com/en` となります

- **rewrite**:
  - _タイプ_: `Record<string, StrictModeLocaleMap<string>>`
  - _デフォルト_: `undefined`
  - _説明_: 特定のパスのデフォルトルーティングモードを上書きするカスタムURL書き換えルール。標準のルーティング動作とは異なる言語固有のパスを定義できます。`[param]` 構文を使用した動的ルートパラメータをサポートします。
  - _例_:
    ```typescript
    routing: {
      mode: "prefix-no-default", // フォールバック戦略
      rewrite: {
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
      },
    }
    ```
  - _注意_: 書き換えルールはデフォルトの `mode` 動作よりも優先されます。パスが書き換えルールに一致する場合、標準の言語プレフィックスの代わりに書き換え設定のローカライズされたパスが使用されます。
  - _注意_: 動的ルートパラメータは角括弧表記（例：`[slug]`、`[id]`）を使用してサポートされます。パラメータ値はURLから自動的に抽出され、書き換えられたパスに補間されます。
  - _注意_: Next.js と Vite アプリケーションで動作します。ミドルウェア/プロキシは、内部ルート構造に一致するように受信リクエストを自動的に書き換えます。
  - _注意_: `getLocalizedUrl()` でURLを生成する場合、提供されたパスに一致する場合、書き換えルールが自動的に適用されます。

- **serverSetCookie**:
  - _タイプ_: `string`
  - _デフォルト_: `'always'`
  - _説明_: サーバー側でロケールクッキーを設定するルール。
  - _オプション_: `'always'`, `'never'`
  - _例_: `'never'`
  - _注意_: ロケールクッキーをすべてのリクエストで設定するか、まったく設定しないかを制御します。

- **noPrefix**:
  - _タイプ_: `boolean`
  - _デフォルト_: `false`
  - _説明_: URLからロケールのプレフィックスを省略するかどうか。
  - _例_: `true`
  - _注意_:
    - `true` の場合: URLにプレフィックスはありません
    - `false` の場合: URLにプレフィックスがあります
    - `basePath = '/my-app'` の例:
      - `noPrefix = false` の場合: URLは `https://example.com/my-app/en`
      - `noPrefix = true` の場合: URLは `https://example.com`

---

### コンテンツ設定

アプリケーション内のコンテンツ処理に関連する設定。ディレクトリ名、ファイル拡張子、および派生設定を含みます。

#### プロパティ

- **autoFill**:
  - _型_: `boolean | string | { [key in Locales]?: string }`
  - _デフォルト_: `undefined`
  - _説明_: コンテンツをAIを使って自動的にどのように埋めるかを示します。`intlayer.config.ts`ファイルでグローバルに宣言することができます。
  - _例_: true
  - _例_: `'./{{fileName}}.content.json'`
  - _例_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _注意_: 自動埋め設定は以下のいずれかです:
    - boolean: すべてのロケールで自動埋めを有効にする
    - string: 単一ファイルのパスまたは変数を含むテンプレート
    - object: ロケールごとのファイルパス

- **watch**:
  - _型_: `boolean`
  - _デフォルト_: `process.env.NODE_ENV === 'development'`
  - _説明_: Intlayerがアプリ内のコンテンツ宣言ファイルの変更を監視し、関連する辞書を再構築するかどうかを示します。

- **fileExtensions**:
  - _型_: `string[]`
  - _デフォルト_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _説明_: 辞書を構築する際に探すファイル拡張子。
  - _例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: ファイル拡張子をカスタマイズすることで競合を回避できます。

- **baseDir**:
  - _タイプ_: `string`
  - _デフォルト_: `process.cwd()`
  - _説明_: プロジェクトのベースディレクトリ。
  - _例_: `'/path/to/project'`
  - _注意_: これはすべてのIntlayer関連ディレクトリを解決するために使用されます。

- **dictionaryOutput**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['intlayer']`
  - _説明_: 使用する辞書出力のタイプ。例：`'intlayer'` または `'i18next'`。

- **contentDir**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['.']`
  - _例_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _説明_: コンテンツ定義ファイル（`.content.*`）が保存されているディレクトリパス。
  - _注意_: これは辞書を再構築するためにコンテンツファイルを監視するために使用されます。

- **codeDir**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['.']`
  - _例_: `['src', '../../ui-library']`
  - _説明_: コードが保存されているディレクトリパス（ベースディレクトリからの相対パス）。
  - _注意_: これはコードファイルを変換（プルーン、最適化）するために監視するために使用されます。これを `contentDir` から分離しておくことで、コンテンツファイルの不要なスキャンを避けることでビルドパフォーマンスを向上させることができます。

- **dictionariesDir**:
  - _タイプ_: `string`
  - _デフォルト_: `'.intlayer/dictionaries'`
  - _説明_: 中間結果または出力結果を保存するためのディレクトリパス。

- **moduleAugmentationDir**:
  - _タイプ_: `string`
  - _デフォルト_: `'.intlayer/types'`
  - _説明_: モジュール拡張用のディレクトリで、IDEの補完や型チェックを向上させるためのもの。
  - _例_: `'intlayer-types'`
  - _注意_: これを必ず `tsconfig.json` に含めてください。

- **unmergedDictionariesDir**:
  - _タイプ_: `string`
  - _デフォルト_: `'.intlayer/unmerged_dictionary'`
  - _説明_: マージされていない辞書を保存するためのディレクトリ。
  - _例_: `'translations'`

- **dictionariesDir**:
  - _タイプ_: `string`
  - _デフォルト_: `'.intlayer/dictionary'`
  - _説明_: ローカリゼーション辞書を格納するディレクトリ。
  - _例_: `'translations'`

- **i18nextResourcesDir**:
  - _タイプ_: `string`
  - _デフォルト_: `'i18next_dictionary'`
  - _説明_: i18n辞書を格納するディレクトリ。
  - _例_: `'translations'`
  - _注意_: このディレクトリがi18nextの出力タイプ用に設定されていることを確認してください。

- **typesDir**:
  - _タイプ_: `string`
  - _デフォルト_: `'types'`
  - _説明_: 辞書の型を格納するディレクトリ。
  - _例_: `'intlayer-types'`

- **mainDir**:
  - _タイプ_: `string`
  - _デフォルト_: `'main'`
  - _説明_: メインアプリケーションファイルが格納されるディレクトリ。
  - _例_: `'intlayer-main'`

- **excludedPath**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['node_modules']`
  - _説明_: コンテンツ検索から除外するディレクトリ。
  - _注意_: この設定はまだ使用されていませんが、将来的に実装予定です。

### 辞書設定

自動入力の動作やコンテンツ生成を含む、辞書操作を制御する設定。

この辞書設定には、主に2つの目的があります：

1. **デフォルト値**: コンテンツ宣言ファイルを作成する際のデフォルト値を定義
2. **フォールバック動作**: 特定のフィールドが定義されていない場合のフォールバック値を提供し、辞書操作の動作をグローバルに定義できるようにする

コンテンツ宣言ファイルと設定値の適用方法の詳細については、[コンテンツファイルのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

#### プロパティ

- **fill**
- **description**
- **locale**
- **location**
- **priority**
- **live**
- **schema**
- **title**
- **tags**
- **version**

---

### ロガー設定

ロガーを制御する設定で、使用するプレフィックスも含みます。

#### プロパティ

- **mode**:
  - _タイプ_: `string`
  - _デフォルト_: `default`
  - _説明_: ロガーのモードを示します。
  - _オプション_: `default`, `verbose`, `disabled`
  - _例_: `default`
  - _注意_: ロガーのモードです。verboseモードはより多くの情報をログに記録しますが、デバッグ目的で使用されます。disabledモードはロガーを無効にします。

- **prefix**:
  - _タイプ_: `string`
  - _デフォルト_: `'[intlayer] '`
  - _説明_: ロガーのプレフィックス。
  - _例_: `'[my custom prefix] '`
  - _Note_: ロガーのプレフィックス。

### AI構成

IntlayerのAI機能を制御する設定で、プロバイダー、モデル、APIキーを含みます。

この設定は、アクセスキーを使用して[Intlayerダッシュボード](https://app.intlayer.org/project)に登録している場合はオプションです。Intlayerは、最も効率的でコスト効果の高いAIソリューションを自動的に管理します。デフォルトのオプションを使用することで、Intlayerが継続的に最適なモデルを使用するように更新されるため、長期的な保守性が向上します。

独自のAPIキーや特定のモデルを使用したい場合は、カスタムAI構成を定義できます。
このAI構成は、Intlayer環境全体でグローバルに使用されます。CLIコマンドはこれらの設定をコマンド（例：`fill`）のデフォルトとして使用し、SDK、ビジュアルエディター、CMSでも同様です。特定のユースケースに対しては、コマンドパラメータを使ってこれらのデフォルト値を上書きすることができます。

Intlayerは、柔軟性と選択肢を高めるために複数のAIプロバイダーをサポートしています。現在サポートされているプロバイダーは以下の通りです：

- **OpenAI**（デフォルト）
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Google AI Studio**
- **Google Vertex**
- **Together.ai**
- **ollama**

#### プロパティ

- **provider**:
  - _タイプ_: `string`
  - _デフォルト_: `'openai'`
  - _説明_: IntlayerのAI機能に使用するプロバイダー。
  - _オプション_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`, `'openrouter'`, `'alibaba'`, `'fireworks'`, `'groq'`, `'huggingface'`, `'bedrock'`, `'googleaistudio'`, `'googlevertex'`, `'togetherai'`
  - _例_: `'anthropic'`
  - _注意_: プロバイダーによっては異なるAPIキーが必要であり、料金体系も異なる場合があります。

- **model**:
  - _タイプ_: `string`
  - _デフォルト_: なし
  - _説明_: IntlayerのAI機能で使用するモデル。
  - _例_: `'gpt-4o-2024-11-20'`
  - _注意_: 使用するモデルはプロバイダーによって異なります。

- **temperature**:
  - _タイプ_: `number`
  - _デフォルト_: なし
  - _説明_: AIの応答のランダム性を制御する温度パラメータ。
  - _例_: `0.1`
  - _注意_: 温度が高いほど、AIの応答はより創造的で予測不可能になります。

- **apiKey**:
  - _タイプ_: `string`
  - _デフォルト_: なし
  - _説明_: 選択したプロバイダーのAPIキー。
  - _例_: `process.env.OPENAI_API_KEY`
  - _注意_: 重要: APIキーは秘密にしておく必要があり、公開しないでください。環境変数などの安全な場所に保管することを必ず行ってください。

- **applicationContext**:
  - _タイプ_: `string`
  - _デフォルト_: なし
  - _説明_: AIモデルに対してアプリケーションの追加コンテキストを提供し、より正確で文脈に適した翻訳を生成するのに役立ちます。これには、アプリのドメイン、ターゲットユーザー、トーン、特定の用語などの情報が含まれます。

- **baseURL**:
  - _タイプ_: `string`
  - _デフォルト_: なし
  - _説明_: AI APIのベースURL。
  - _例_: `'https://api.openai.com/v1'`
  - _注意_: ローカルまたはカスタムのAI APIエンドポイントを指すために使用できます。

- **dataSerialization**:
  - _型_: `'json' | 'toon'`
  - _デフォルト_: `'json'`
  - _説明_: IntlayerのAI機能に使用するデータシリアライズ形式。
  - _例_: `'toon'`
  - _注_: `json`: 標準的で信頼性が高い。より多くのトークンを使用します。`toon`: トークン消費が少ないが、JSONほど一貫性がない。

### ビルド設定

Intlayerがアプリケーションの国際化をどのように最適化しビルドするかを制御する設定。

ビルドオプションは `@intlayer/babel` と `@intlayer/swc` プラグインに適用されます。

> 開発モードでは、Intlayer は辞書を静的にインポートして、開発体験を簡素化します。

> 最適化された場合、Intlayer は辞書の呼び出しを置き換えてチャンク分割を最適化し、最終バンドルには実際に使用されている辞書のみがインポートされるようにします。

#### プロパティ

- **mode**:
  - _型_: `'auto' | 'manual'`
  - _デフォルト_: `'auto'`
  - _説明_: ビルドのモードを制御します。
  - _例_: `'manual'`
  - _注意_: 'auto'の場合、アプリケーションがビルドされると自動的にビルドが有効になります。
  - _注意_: 'manual'の場合、ビルドコマンドが実行されたときにのみビルドが設定されます。
  - _注意_: 辞書のビルドを無効にするために使用できます。たとえば、Node.js環境での実行を避ける必要がある場合などです。

- **optimize**:
  - _型_: `boolean`
  - _デフォルト_: `process.env.NODE_ENV === 'production'`
  - _説明_: ビルドを最適化するかどうかを制御します。
  - _例_: `true`
  - _注意_: 有効にすると、Intlayer は辞書のすべての呼び出しを置き換えてチャンク分割を最適化します。これにより、最終バンドルは使用されている辞書のみをインポートします。すべてのインポートは辞書の読み込み時の非同期処理を避けるために静的インポートのまま維持されます。
  - _注意_: Intlayerは、`useIntlayer`のすべての呼び出しを`importMode`オプションで定義されたモードに置き換え、`getIntlayer`を`getDictionary`に置き換えます。
  - _注意_: このオプションは`@intlayer/babel`および`@intlayer/swc`プラグインに依存しています。
  - _注意_: `useIntlayer`の呼び出し内で、すべてのキーが静的に宣言されていることを確認してください。例: `useIntlayer('navbar')`。

- **importMode**:
  - _Note_: **Deprecated**: Use `dictionary.importMode` instead.
  - _タイプ_: `'static' | 'dynamic' | 'fetch'`
  - _デフォルト_: `'static'`
  - _説明_: 辞書のインポート方法を制御します。
  - _例_: `'dynamic'`
  - _注意_: 利用可能なモード:
    - "static": 辞書は静的にインポートされます。`useIntlayer`を`useDictionary`に置き換えます。
    - "dynamic": 辞書はSuspenseを使用して動的にインポートされます。`useIntlayer`を`useDictionaryDynamic`に置き換えます。
  - "fetch": 辞書はライブ同期APIを使用して動的に取得されます。`useIntlayer`は`useDictionaryFetch`に置き換えられます。
  - _注意_: 動的インポートはSuspenseに依存しており、レンダリングパフォーマンスにわずかな影響を与える可能性があります。
  - _注意_: 無効にすると、使用されていなくてもすべてのロケールが一度に読み込まれます。
  - _注意_: このオプションは`@intlayer/babel`および`@intlayer/swc`プラグインに依存しています。
  - _注意_: `useIntlayer`呼び出し内のすべてのキーが静的に宣言されていることを確認してください。例：`useIntlayer('navbar')`。
  - _注意_: `optimize`が無効の場合、このオプションは無視されます。
  - _注意_: "live" に設定されている場合、リモートコンテンツを含み、かつ "live" フラグが設定された辞書のみがライブモードとして変換されます。他の辞書はフェッチクエリの数と読み込みパフォーマンスを最適化するために、動的モードとして動的にインポートされます。
  - _注意_: ライブモードはライブ同期APIを使用して辞書を取得します。APIコールが失敗した場合、辞書は動的モードとして動的にインポートされます。
  - _注意_: このオプションは `getIntlayer`、`getDictionary`、`useDictionary`、`useDictionaryAsync`、および `useDictionaryDynamic` 関数には影響しません。

- **traversePattern**:
  - _型_: `string[]`
  - _デフォルト_: `['**/*.{js,ts,mjs,cjs,jsx,tsx}', '!**/node_modules/**']`
  - _説明_: 最適化中にどのファイルを走査するかを定義するパターンです。
    - _例_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _注意_: 最適化を関連するコードファイルに限定し、ビルドパフォーマンスを向上させるために使用します。
  - _注意_: `optimize` が無効の場合、このオプションは無視されます。
  - _注意_: グロブパターンを使用してください。

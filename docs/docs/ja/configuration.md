---
createdAt: 2024-08-13
updatedAt: 2025-09-16
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
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 設定ファイルの例

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH], // 対応するロケールのリスト
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // 自動入力用のコンテンツファイルパス
    contentDir: ["src", "../ui-library"], // コンテンツディレクトリの配列
  },
  middleware: {
    noPrefix: false, // プレフィックスなしの設定
  },
  editor: {
    applicationURL: "https://example.com", // エディタのアプリケーションURL
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI APIキー
    applicationContext: "This is a test application", // アプリケーションコンテキスト
  },
  build: {
    importMode: "dynamic", // インポートモードの設定
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // 対応するロケールのリスト
  },
  content: {
    contentDir: ["src", "../ui-library"], // コンテンツディレクトリの配列
  },
  middleware: {
    noPrefix: false, // プレフィックスなしの設定
  },
  editor: {
    applicationURL: "https://example.com", // エディタのアプリケーションURL
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI APIキー
    applicationContext: "This is a test application", // アプリケーションコンテキスト
  },
  build: {
    importMode: "dynamic", // インポートモードの設定
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // 対応するロケールのリスト
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // コンテンツディレクトリの配列
  },
  "middleware": {
    "noPrefix": false, // プレフィックスなしの設定
  },
  "editor": {
    "applicationURL": "https://example.com", // エディタのアプリケーションURL
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "これはテストアプリケーションです",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

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
  - _説明_: clientId と clientSecret は、intlayer パッケージが oAuth2 認証を使用してバックエンドと認証するために使用されます。アクセストークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセストークンを取得するには、https://intlayer.org/dashboard/project にアクセスしてアカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientId と clientSecret は秘密にしておく必要があり、公開しないでください。環境変数などの安全な場所に保管することをお勧めします。

- **clientSecret**:
  - _タイプ_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId と clientSecret は、intlayer パッケージが oAuth2 認証を使用してバックエンドと認証するために使用されます。アクセストークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセストークンを取得するには、https://intlayer.org/dashboard/project にアクセスしてアカウントを作成してください。
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
  - _説明_: コンテンツが保存されているディレクトリパス。

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

この設定は、アクセスキーを使用して[Intlayerダッシュボード](https://intlayer.org/dashboard/project)に登録している場合はオプションです。Intlayerは、最も効率的でコスト効果の高いAIソリューションを自動的に管理します。デフォルトのオプションを使用することで、Intlayerが継続的に最適なモデルを使用するように更新されるため、長期的な保守性が向上します。

独自のAPIキーや特定のモデルを使用したい場合は、カスタムAI構成を定義できます。
このAI構成は、Intlayer環境全体でグローバルに使用されます。CLIコマンドはこれらの設定をコマンド（例：`fill`）のデフォルトとして使用し、SDK、ビジュアルエディター、CMSでも同様です。特定のユースケースに対しては、コマンドパラメータを使ってこれらのデフォルト値を上書きすることができます。

Intlayerは、柔軟性と選択肢を高めるために複数のAIプロバイダーをサポートしています。現在サポートされているプロバイダーは以下の通りです：

- **OpenAI**（デフォルト）
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### プロパティ

- **provider**:
  - _タイプ_: `string`
  - _デフォルト_: `'openai'`
  - _説明_: IntlayerのAI機能に使用するプロバイダー。
  - _オプション_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
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

### ビルド設定

Intlayerがアプリケーションの国際化をどのように最適化しビルドするかを制御する設定。

ビルドオプションは `@intlayer/babel` と `@intlayer/swc` プラグインに適用されます。

> 開発モードでは、Intlayer は辞書を静的にインポートして、開発体験を簡素化します。

> 最適化された場合、Intlayer は辞書の呼び出しを置き換えてチャンク分割を最適化し、最終バンドルには実際に使用されている辞書のみがインポートされるようにします。

#### プロパティ

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
  - _タイプ_: `'static' | 'dynamic' | 'live'`
  - _デフォルト_: `'static'`
  - _説明_: 辞書のインポート方法を制御します。
  - _例_: `'dynamic'`
  - _注意_: 利用可能なモード:
    - "static": 辞書は静的にインポートされます。`useIntlayer`を`useDictionary`に置き換えます。
    - "dynamic": 辞書はSuspenseを使用して動的にインポートされます。`useIntlayer`を`useDictionaryDynamic`に置き換えます。
  - "live": 辞書はライブ同期APIを使用して動的に取得されます。`useIntlayer`は`useDictionaryFetch`に置き換えられます。
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
  - _デフォルト_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**/node_modules/**']`
  - _説明_: 最適化中にどのファイルを走査するかを定義するパターンです。
    - _例_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _注意_: 最適化を関連するコードファイルに限定し、ビルドパフォーマンスを向上させるために使用します。
  - _注意_: `optimize` が無効の場合、このオプションは無視されます。
  - _注意_: グロブパターンを使用してください。

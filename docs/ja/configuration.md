# Intlayer 設定ドキュメント

## 概要

Intlayer 設定ファイルは、国際化、ミドルウェア、およびコンテンツ処理など、プラグインのさまざまな側面をカスタマイズすることを可能にします。このドキュメントでは、設定内の各プロパティについて詳細に説明します。

---

## 設定ファイルサポート

Intlayer は JSON、JS、MJS、および TS 設定ファイル形式を受け付けます：

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
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## 設定リファレンス

以下のセクションでは、Intlayer に利用できるさまざまな設定を説明します。

---

### 国際化設定

アプリケーションの利用可能なロケールやデフォルトロケールなど、国際化に関連する設定を定義します。

#### プロパティ

- **locales**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['en']`
  - _説明_: アプリケーションでサポートされるロケールのリスト。
  - _例_: `['en', 'fr', 'es']`
- **strictMode**:

  - _タイプ_: `string`
  - _デフォルト_: `inclusive`
  - _説明_: TypeScript を使用して国際化されたコンテンツの強力な実装を保証します。
  - _注意_: "strict" に設定された場合、翻訳 `t` 関数は宣言された各ロケールが定義されていることを必要とします。1つのロケールが欠けている場合、または設定にロケールが宣言されていない場合は、エラーが発生します。
  - _注意_: "inclusive" に設定された場合、翻訳 `t` 関数は宣言された各ロケールが定義されていることを必要とし、1つのロケールが欠けている場合は警告が出されます。ただし、設定に宣言されていないが存在するロケールは受け入れられます。
  - _注意_: "loose" に設定された場合、翻訳 `t` 関数は存在する任意のロケールを受け入れます。

- **defaultLocale**:
  - _タイプ_: `string`
  - _デフォルト_: `'en'`
  - _説明_: 要求されたロケールが見つからない場合のフォールバックとして使用されるデフォルトロケール。
  - _例_: `'en'`
  - _注意_: URL、クッキー、またはヘッダーにロケールが指定されていない場合、これを使用してロケールを決定します。

---

### エディター設定

サーバーポートおよびアクティブステータスを含む、統合エディターに関連する設定を定義します。

#### プロパティ

- **backendURL**:

  - _タイプ_: `string`
  - _デフォルト_: `https://back.intlayer.org`
  - _説明_: バックエンドサーバーの URL。
  - _例_: `http://localhost:4000`

- **enabled**:

  - _タイプ_: `boolean`
  - _デフォルト_: `true`
  - _説明_: エディターがアクティブかどうかを示します。
  - _例_: `true`
  - _注意_: NODE_ENV または他の専用環境変数を使用して設定できます。

- **clientId**:

  - _タイプ_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId および clientSecret により、intlayer パッケージは oAuth2 認証を使用してバックエンドと認証できます。アクセス トークンはプロジェクトに関連するユーザーを認証するために使用されます。アクセス トークンを取得するには、https://intlayer.org/dashboard/project に移動してアカウントを作成します。
  - _例_: `true`
  - _注意_: 重要: clientId および clientSecret は秘密にして公開しないようにする必要があります。環境変数など、安全な場所に保管することをお勧めします。

- **clientSecret**:
  - _タイプ_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId および clientSecret により、intlayer パッケージは oAuth2 認証を使用してバックエンドと認証できます。アクセス トークンはプロジェクトに関連するユーザーを認証するために使用されます。アクセス トークンを取得するには、https://intlayer.org/dashboard/project に移動してアカウントを作成します。
  - _例_: `true`
  - _注意_: 重要: clientId および clientSecret は秘密にして公開しないようにする必要があります。環境変数など、安全な場所に保管することをお勧めします。

### ミドルウェア設定

クッキー、ヘッダー、およびロケール管理のための URL プレフィックスの処理を含む、ミドルウェアの動作を制御する設定。

#### プロパティ

- **headerName**:
  - _タイプ_: `string`
  - _デフォルト_: `'x-intlayer-locale'`
  - _説明_: ロケールを決定するために使用される HTTP ヘッダーの名前。
  - _例_: `'x-custom-locale'`
  - _注意_: API ベースのロケール決定に便利です。
- **cookieName**:
  - _タイプ_: `string`
  - _デフォルト_: `'intlayer-locale'`
  - _説明_: ロケールを保存するために使用されるクッキーの名前。
  - _例_: `'custom-locale'`
  - _注意_: セッションをまたいでロケールを持続させるために使用されます。
- **prefixDefault**:
  - _タイプ_: `boolean`
  - _デフォルト_: `true`
  - _説明_: URL にデフォルトのロケールを含めるかどうかを示します。
  - _例_: `false`
  - _注意_: `false` の場合、デフォルトロケールの URL にはロケール接頭辞がありません。
- **basePath**:
  - _タイプ_: `string`
  - _デフォルト_: `''`
  - _説明_: アプリケーション URL の基本パス。
  - _例_: `'/my-app'`
  - _注意_: アプリケーションの URL の構成方法に影響します。
- **serverSetCookie**:
  - _タイプ_: `string`
  - _デフォルト_: `'always'`
  - _説明_: サーバーでロケールクッキーを設定するためのルール。
  - _オプション_: `'always'`, `'never'`
  - _例_: `'never'`
  - _注意_: 各リクエストでロケールクッキーが設定されるかどうかを制御します。
- **noPrefix**:
  - _タイプ_: `boolean`
  - _デフォルト_: `false`
  - _説明_: URL からロケールプレフィックスを省略するかどうかを示します。
  - _例_: `true`
  - _注意_: `true` の場合、URL にロケール情報が含まれません。

---

### コンテンツ設定

ディレクトリ名、ファイル拡張子、および派生構成を含むアプリケーション内でのコンテンツ処理に関連する設定。

#### プロパティ

- **watch**:
  - _タイプ_: `boolean`
  - _デフォルト_: `process.env.NODE_ENV === 'development'`
  - _説明_: Intlayer がアプリ内のコンテンツ宣言ファイルの変更を監視し、関連する辞書を再構築すべきかどうかを示します。
- **fileExtensions**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _説明_: 辞書を構築する際に探すファイル拡張子。
  - _例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: ファイル拡張子をカスタマイズすることで、競合を回避できます。
- **baseDir**:
  - _タイプ_: `string`
  - _デフォルト_: `process.cwd()`
  - _説明_: プロジェクトの基本ディレクトリ。
  - _例_: `'/path/to/project'`
  - _注意_: これはすべての Intlayer 関連ディレクトリを解決するために使用されます。
- **dictionaryOutput**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['intlayer']`
  - _説明_: 使用する辞書出力のタイプ（例: `'intlayer'` または `'i18next'`）。
- **contentDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'src'`
  - _説明_: コンテンツが保存されるディレクトリの名前。
  - _例_: `'data'`, `'content'`, `'locales'`
  - _注意_: 基本ディレクトリレベルにない場合、`contentDir` を更新してください。
- **contentDir**:

  - _タイプ_: `string`
  - _派生元_: `'baseDir'` / `'contentDirName'`
  - _説明_: コンテンツが保存されるディレクトリパス。

- **resultDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'.intlayer'`
  - _説明_: 結果が保存されるディレクトリの名前。
  - _例_: `'outputOFIntlayer'`
  - _注意_: このディレクトリが基本レベルでない場合は、`resultDir` を更新してください。
- **resultDir**:

  - _タイプ_: `string`
  - _派生元_: `'baseDir'` / `'resultDirName'`
  - _説明_: 中間または出力結果を保存するためのディレクトリパス。

- **moduleAugmentationDirName**:

  - _タイプ_: `string`
  - _デフォルト_: `'types'`
  - _説明_: モジュールの拡張用ディレクトリで、IDE の提案や型チェックを改善します。
  - _例_: `'intlayer-types'`
  - _注意_: `tsconfig.json` にこれを含めるようにしてください。

- **moduleAugmentationDir**:

  - _タイプ_: `string`
  - _派生元_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _説明_: モジュール拡張および追加の型定義のためのパス。

- **dictionariesDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'dictionary'`
  - _説明_: 辞書を保存するためのディレクトリ。
  - _例_: `'translations'`
  - _注意_: 結果ディレクトリレベルにない場合は、`dictionariesDir` を更新してください。
- **dictionariesDir**:

  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'dictionariesDirName'`
  - _説明_: ローカライズ辞書を保存するためのディレクトリ。

- **i18nextResourcesDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'i18next_dictionary'`
  - _説明_: i18n 辞書を保存するためのディレクトリ。
  - _例_: `'translations'`
  - _注意_: 結果ディレクトリレベルにない場合は、`i18nextResourcesDir` を更新してください。
  - _注意_: i18n 辞書の出力には i18next を含める必要があります。
- **i18nextResourcesDir**:

  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _説明_: i18n 辞書を保存するためのディレクトリ。
  - _注意_: このディレクトリは i18next 出力タイプ用に構成されている必要があります。

- **typeDirName**:

  - _タイプ_: `string`
  - _デフォルト_: `'types'`
  - _説明_: 辞書型を保存するためのディレクトリ。
  - _例_: `'intlayer-types'`
  - _注意_: 結果ディレクトリレベルにない場合は、`typesDir` を更新してください。

- **typesDir**:

  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'typeDirName'`
  - _説明_: 辞書型を保存するためのディレクトリ。

- **mainDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'main'`
  - _説明_: メインファイルを保存するためのディレクトリ。
  - _例_: `'intlayer-main'`
  - _注意_: 結果ディレクトリレベルにない場合は、`mainDir` を更新してください。
- **mainDir**:
  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'mainDirName'`
  - _説明_: メインアプリケーションファイルが保存されるディレクトリ。
- **excludedPath**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['node_modules']`
  - _説明_: コンテンツ検索から除外されるディレクトリ。
  - _注意_: この設定はまだ使用されていませんが、将来の実装が予定されています。

### ロガー設定

ログのレベルや使用するプレフィックスを含む、ロガーを制御する設定。

#### プロパティ

- **enabled**:
  - _タイプ_: `boolean`
  - _デフォルト_: `true`
  - _説明_: ロガーが有効かどうかを示します。
  - _例_: `true`
  - _注意_: NODE_ENV または他の専用環境変数を使用して設定できます。
- **level**:
  - _タイプ_: `'info' | 'warn' | 'debug' | 'log'`
  - _デフォルト_: `'log'`
  - _説明_: ロガーのレベル。
  - _例_: `'info'`
  - _注意_: ロガーのレベルは 'log', 'info', 'warn', 'error', 'debug' のいずれかです。
- **prefix**:
  - _タイプ_: `string`
  - _デフォルト_: `'[intlayer] '`
  - _説明_: ロガーのプレフィックス。
  - _例_: `'[my custom prefix] '`
  - _注意_: ロガーのプレフィックス。

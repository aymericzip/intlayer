# Intlayer 設定ドキュメント

## 概要

Intlayer 設定ファイルを使用すると、国際化、ミドルウェア、およびコンテンツ処理など、プラグインのさまざまな側面をカスタマイズできます。この文書では、設定内の各プロパティの詳細な説明を提供します。

---

## 設定ファイルサポート

Intlayer は、JSON、JS、MJS、および TS 設定ファイル形式を受け入れます。

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## 設定ファイルの例

```typescript
// intlayer.config.ts

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

```javascript
// intlayer.config.cjs

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

```json5
// .intlayerrc

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

以下のセクションでは、Intlayer に利用可能なさまざまな設定オプションについて説明します。

---

### 国際化設定

アプリケーションの利用可能なロケールおよびデフォルトのロケールを含む国際化に関連する設定を定義します。

#### プロパティ

- **locales**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['en']`
  - _説明_: アプリケーションでサポートされているロケールのリスト。
  - _例_: `['en', 'fr', 'es']`
- **strictMode**:

  - _タイプ_: `string`
  - _デフォルト_: `required_only`
  - _説明_: TypeScript を使用して国際化されたコンテンツの厳格な実装を確保します。
  - _注意_: "strict" に設定すると、翻訳 `t` 関数は宣言された各ロケールが定義されることを要求します。1つのロケールが欠けている場合、または設定に宣言されていないロケールがある場合は、エラーが発生します。
  - _注意_: "required_only" に設定すると、翻訳 `t` 関数は宣言された各ロケールが定義されることを要求します。1つのロケールが欠けている場合、警告が表示されます。ただし、設定に宣言されていなくても存在するロケールは受け入れます。
  - _注意_: "loose" に設定すると、翻訳 `t` 関数は既存のロケールを受け入れます。

- **defaultLocale**:
  - _タイプ_: `string`
  - _デフォルト_: `'en'`
  - _説明_: リクエストされたロケールが見つからない場合にフォールバックとして使用されるデフォルトのロケール。
  - _例_: `'en'`
  - _注意_: URL、クッキー、またはヘッダーにロケールが指定されていない場合に、ロケールを決定するために使用されます。

---

### エディター設定

サーバーポートやアクティブ状態など、統合エディターに関連する設定を定義します。

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
  - _説明_: clientId と clientSecret は、intlayer パッケージが oAuth2 認証を使用してバックエンドと認証することを許可します。アクセス トークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセス トークンを取得するには、https://back.intlayer.org/dashboard/project に移動し、アカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientId と clientSecret は秘密に保ち、公開しないでください。環境変数など、安全な場所に保管してください。

- **clientSecret**:
  - _タイプ_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId と clientSecret は、intlayer パッケージが oAuth2 認証を使用してバックエンドと認証することを許可します。アクセス トークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセス トークンを取得するには、https://back.intlayer.org/dashboard/project に移動し、アカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientId と clientSecret は秘密に保ち、公開しないでください。環境変数など、安全な場所に保管してください。

### ミドルウェア設定

ミドルウェアの動作を制御する設定、ロケール管理のためにアプリケーションがクッキー、ヘッダー、および URL 接頭辞を処理する方法を含みます。

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
  - _注意_: セッションをまたいでロケールを持続するために使用されます。
- **prefixDefault**:
  - _タイプ_: `boolean`
  - _デフォルト_: `true`
  - _説明_: URL にデフォルトのロケールを含めるかどうか。
  - _例_: `false`
  - _注意_: `false` の場合、デフォルトロケールの URL にはロケール接頭辞が含まれません。
- **basePath**:
  - _タイプ_: `string`
  - _デフォルト_: `''`
  - _説明_: アプリケーションの URL に対する基本パス。
  - _例_: `'/my-app'`
  - _注意_: これはアプリケーションの URL 構築方法に影響します。
- **serverSetCookie**:
  - _タイプ_: `string`
  - _デフォルト_: `'always'`
  - _説明_: サーバー上でロケールクッキーを設定するためのルール。
  - _オプション_: `'always'`, `'never'`
  - _例_: `'never'`
  - _注意_: 各リクエストでロケールクッキーを設定するか、まったく設定しないかを制御します。
- **noPrefix**:
  - _タイプ_: `boolean`
  - _デフォルト_: `false`
  - _説明_: URL からロケール接頭辞を省略するかどうか。
  - _例_: `true`
  - _注意_: `true` の場合、URL にロケール情報は含まれません。

---

### コンテンツ設定

ディレクトリ名、ファイル拡張子、派生設定を含むアプリケーション内のコンテンツ処理に関連する設定。

#### プロパティ

- **watch**:
  - _タイプ_: `boolean`
  - _デフォルト_: `process.env.NODE_ENV === 'development'`
  - _説明_: Intlayer がアプリ内のコンテンツ宣言ファイルの変更を監視し、関連する辞書を再構築するかどうかを示します。
- **fileExtensions**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _説明_: 辞書を構築する際に探すファイル拡張子。
  - _例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: ファイル拡張子のカスタマイズにより、競合を回避できます。
- **baseDir**:
  - _タイプ_: `string`
  - _デフォルト_: `process.cwd()`
  - _説明_: プロジェクトのベースディレクトリ。
  - _例_: `'/path/to/project'`
  - _注意_: これはすべての Intlayer 関連ディレクトリを解決するために使用されます。
- **dictionaryOutput**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['intlayer']`
  - _説明_: 使用する辞書出力の種類、例: `'intlayer'` または `'i18next'`。
- **contentDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'src'`
  - _説明_: コンテンツが保存されるディレクトリの名前。
  - _例_: `'data'`, `'content'`, `'locales'`
  - _注意_: 基本ディレクトリレベルでない場合、`contentDir` を更新してください。
- **contentDir**:

  - _タイプ_: `string`
  - _派生元_: `'baseDir'` / `'contentDirName'`
  - _説明_: コンテンツが保存されているディレクトリパス。

- **resultDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'.intlayer'`
  - _説明_: 結果が保存されるディレクトリの名前。
  - _例_: `'outputOFIntlayer'`
  - _注意_: このディレクトリが基本レベルでない場合、`resultDir` を更新してください。
- **resultDir**:

  - _タイプ_: `string`
  - _派生元_: `'baseDir'` / `'resultDirName'`
  - _説明_: 中間または出力結果を保存するためのディレクトリパス。

- **moduleAugmentationDirName**:

  - _タイプ_: `string`
  - _デフォルト_: `'types'`
  - _説明_: より良い IDE の提案と型チェックを可能にするモジュール拡張用のディレクトリ。
  - _例_: `'intlayer-types'`
  - _注意_: これを `tsconfig.json` に含めることを忘れないでください。

- **moduleAugmentationDir**:

  - _タイプ_: `string`
  - _派生元_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _説明_: モジュール拡張と追加の型定義のためのパス。

- **dictionariesDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'dictionary'`
  - _説明_: 辞書を保存するためのディレクトリ。
  - _例_: `'translations'`
  - _注意_: 結果ディレクトリレベルでない場合、`dictionariesDir` を更新してください。
- **dictionariesDir**:

  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'dictionariesDirName'`
  - _説明_: ローカライズ辞書を保存するディレクトリ。

- **i18nDictionariesDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'i18n_dictionary'`
  - _説明_: i18n 辞書を保存するためのディレクトリ。
  - _例_: `'translations'`
  - _注意_: 結果ディレクトリレベルでない場合、`i18nDictionariesDir` を更新してください。
  - _注意_: i18n 辞書出力に i18next を含めて辞書を構築することを確認してください。
- **i18nDictionariesDir**:

  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _説明_: i18n 辞書を保存するディレクトリ。
  - _注意_: このディレクトリが i18next 出力タイプに適切に設定されていることを確認してください。

- **typeDirName**:

  - _タイプ_: `string`
  - _デフォルト_: `'types'`
  - _説明_: 辞書タイプを保存するためのディレクトリ。
  - _例_: `'intlayer-types'`
  - _注意_: 結果ディレクトリレベルでない場合、`typesDir` を更新してください。

- **typesDir**:

  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'typeDirName'`
  - _説明_: 辞書タイプを保存するためのディレクトリ。

- **mainDirName**:
  - _タイプ_: `string`
  - _デフォルト_: `'main'`
  - _説明_: メインファイルを保存するためのディレクトリ。
  - _例_: `'intlayer-main'`
  - _注意_: 結果ディレクトリレベルでない場合、`mainDir` を更新してください。
- **mainDir**:
  - _タイプ_: `string`
  - _派生元_: `'resultDir'` / `'mainDirName'`
  - _説明_: メインアプリケーションファイルが保存されるディレクトリ。
- **excludedPath**:
  - _タイプ_: `string[]`
  - _デフォルト_: `['node_modules']`
  - _説明_: コンテンツ検索から除外されるディレクトリ。
  - _注意_: この設定はまだ使用されていませんが、将来の実装が予定されています。

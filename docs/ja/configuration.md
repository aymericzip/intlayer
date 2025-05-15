# Intlayer設定ドキュメント

## 概要

Intlayer設定ファイルは、国際化、ミドルウェア、コンテンツ処理など、プラグインのさまざまな側面をカスタマイズすることを可能にします。このドキュメントでは、設定内の各プロパティについて詳しく説明します。

---

## 設定ファイルのサポート

IntlayerはJSON、JS、MJS、TS設定ファイル形式を受け入れます：

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

以下のセクションでは、Intlayerで利用可能なさまざまな設定について説明します。

---

### 国際化設定

利用可能なロケールやアプリケーションのデフォルトロケールなど、国際化に関連する設定を定義します。

#### プロパティ

- **locales**:

  - _型_: `string[]`
  - _デフォルト_: `['en']`
  - _説明_: アプリケーションでサポートされるロケールのリスト。
  - _例_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _型_: `string[]`
  - _デフォルト_: `[]`
  - _説明_: アプリケーションで必要なロケールのリスト。
  - _例_: `[]`
  - _注意_: 空の場合、`strict`モードではすべてのロケールが必要です。
  - _注意_: 必要なロケールは`locales`フィールドにも定義されている必要があります。
- **strictMode**:

  - _型_: `string`
  - _デフォルト_: `inclusive`
  - _説明_: TypeScriptを使用して国際化されたコンテンツの強力な実装を保証します。
  - _注意_: "strict"に設定すると、翻訳`t`関数は宣言された各ロケールが定義されていることを要求します。1つのロケールが欠けている場合、または設定に宣言されていないロケールがある場合、エラーがスローされます。
  - _注意_: "inclusive"に設定すると、翻訳`t`関数は宣言された各ロケールが定義されていることを要求します。1つのロケールが欠けている場合、警告が表示されます。ただし、設定に宣言されていないロケールが存在しても受け入れます。
  - _注意_: "loose"に設定すると、翻訳`t`関数は既存の任意のロケールを受け入れます。

- **defaultLocale**:
  - _型_: `string`
  - _デフォルト_: `'en'`
  - _説明_: リクエストされたロケールが見つからない場合に使用されるデフォルトロケール。
  - _例_: `'en'`
  - _注意_: URL、クッキー、またはヘッダーにロケールが指定されていない場合に使用されます。

---

### エディター設定

統合エディターに関連する設定を定義します。サーバーポートやアクティブ状態などが含まれます。

#### プロパティ

- **applicationURL**:

  - _型_: `string`
  - _デフォルト_: `'*'`
  - _説明_: アプリケーションのURL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。
  - _例_:
    - `'*'`
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_: `'*'`に設定されている場合、エディターは任意のオリジンからアクセス可能です。

- **port**:

  - _型_: `number`
  - _デフォルト_: `8000`
  - _説明_: ビジュアルエディターサーバーが使用するポート。

- **editorURL**:

  - _型_: `string`
  - _デフォルト_: `'http://localhost:8000'`
  - _説明_: エディターサーバーのURL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
    - `''*'`
  - _注意_: アプリケーションからエディターサーバーにアクセスするためのURLです。ポートが変更された場合や、エディターが別のドメインでホストされている場合に設定する必要があります。

- **cmsURL**:

  - _型_: `string`
  - _デフォルト_: `'https://intlayer.org'`
  - _説明_: Intlayer CMSのURL。
  - _例_: `'https://intlayer.org'`
  - _注意_: Intlayer CMSのURLです。

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
  - _注意_: trueの場合、エディターはアプリケーションと連携できます。falseの場合、エディターはアプリケーションと連携できません。ただし、エディターはビジュアルエディターによってのみ有効化されます。特定の環境でエディターを無効化することは、セキュリティを強化する方法です。

- **clientId**:

  - _型_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientIdとclientSecretは、oAuth2認証を使用してIntlayerパッケージがバックエンドと認証することを可能にします。アクセス トークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセス トークンを取得するには、https://intlayer.org/dashboard/project にアクセスしてアカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientIdとclientSecretは秘密にして公開しないでください。環境変数などの安全な場所に保管してください。

- **clientSecret**:

  - _型_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientIdとclientSecretは、oAuth2認証を使用してIntlayerパッケージがバックエンドと認証することを可能にします。アクセス トークンは、プロジェクトに関連するユーザーを認証するために使用されます。アクセス トークンを取得するには、https://intlayer.org/dashboard/project にアクセスしてアカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientIdとclientSecretは秘密にして公開しないでください。環境変数などの安全な場所に保管してください。

- **hotReload**:

  - _型_: `boolean`
  - _デフォルト_: `false`
  - _説明_: アプリケーションがロケール設定の変更を検出したときにホットリロードするかどうかを示します。
  - _例_: `true`
  - _注意_: 例えば、新しい辞書が追加または更新された場合、アプリケーションはページに表示するコンテンツを更新します。
  - _注意_: ホットリロードにはサーバーへの継続的な接続が必要なため、`enterprise`プランのクライアントのみ利用可能です。

- **dictionaryPriorityStrategy**:
  - _型_: `string`
  - _デフォルト_: `'local_first'`
  - _説明_: ローカル辞書とリモート辞書の両方が存在する場合の優先順位戦略。`'distant_first'`に設定すると、アプリケーションはリモート辞書をローカル辞書より優先します。`'local_first'`に設定すると、アプリケーションはローカル辞書をリモート辞書より優先します。
  - _例_: `'distant_first'`

### ミドルウェア設定

クッキー、ヘッダー、ロケール管理のためのURLプレフィックスの処理方法など、ミドルウェアの動作を制御する設定。

#### プロパティ

- **headerName**:
  - _型_: `string`
  - _デフォルト_: `'x-intlayer-locale'`
  - _説明_: ロケールを決定するために使用されるHTTPヘッダーの名前。
  - _例_: `'x-custom-locale'`
  - _注意_: APIベースのロケール決定に便利です。
- **cookieName**:
  - _型_: `string`
  - _デフォルト_: `'intlayer-locale'`
  - _説明_: ロケールを保存するために使用されるクッキーの名前。
  - _例_: `'custom-locale'`
  - _注意_: セッション間でロケールを保持するために使用されます。
- **prefixDefault**:
  - _型_: `boolean`
  - _デフォルト_: `true`
  - _説明_: URLにデフォルトロケールを含めるかどうか。
  - _例_: `false`
  - _注意_: `false`の場合、デフォルトロケールのURLにはロケールプレフィックスが含まれません。
- **basePath**:
  - _型_: `string`
  - _デフォルト_: `''`
  - _説明_: アプリケーションURLのベースパス。
  - _例_: `'/my-app'`
  - _注意_: アプリケーションのURL構築方法に影響します。
- **serverSetCookie**:
  - _型_: `string`
  - _デフォルト_: `'always'`
  - _説明_: サーバーでロケールクッキーを設定するルール。
  - _オプション_: `'always'`, `'never'`
  - _例_: `'never'`
  - _注意_: ロケールクッキーをすべてのリクエストで設定するか、設定しないかを制御します。
- **noPrefix**:
  - _型_: `boolean`
  - _デフォルト_: `false`
  - _説明_: URLからロケールプレフィックスを省略するかどうか。
  - _例_: `true`
  - _注意_: `true`の場合、URLにはロケール情報が含まれません。

---

### コンテンツ設定

アプリケーション内のコンテンツ処理に関連する設定。ディレクトリ名、ファイル拡張子、派生設定などが含まれます。

#### プロパティ

- **watch**:
  - _型_: `boolean`
  - _デフォルト_: `process.env.NODE_ENV === 'development'`
  - _説明_: Intlayerがアプリ内のコンテンツ宣言ファイルの変更を監視して関連辞書を再構築するかどうかを示します。
- **fileExtensions**:
  - _型_: `string[]`
  - _デフォルト_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _説明_: 辞書を構築する際に検索するファイル拡張子。
  - _例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: ファイル拡張子をカスタマイズすることで競合を回避できます。
- **baseDir**:
  - _型_: `string`
  - _デフォルト_: `process.cwd()`
  - _説明_: プロジェクトのベースディレクトリ。
  - _例_: `'/path/to/project'`
  - _注意_: Intlayer関連のすべてのディレクトリを解決するために使用されます。
- **dictionaryOutput**:
  - _型_: `string[]`
  - _デフォルト_: `['intlayer']`
  - _説明_: 使用する辞書出力の種類。例：`'intlayer'`または`'i18next'`。
- **contentDirName**:
  - _型_: `string`
  - _デフォルト_: `'src'`
  - _説明_: コンテンツが保存されているディレクトリの名前。
  - _例_: `'data'`, `'content'`, `'locales'`
  - _注意_: ベースディレクトリレベルにない場合、`contentDir`を更新します。
- **contentDir**:

  - _型_: `string`
  - _派生元_: `'baseDir'` / `'contentDirName'`
  - _説明_: コンテンツが保存されているディレクトリパス。

- **resultDirName**:
  - _型_: `string`
  - _デフォルト_: `'.intlayer'`
  - _説明_: 結果が保存されるディレクトリの名前。
  - _例_: `'outputOFIntlayer'`
  - _注意_: このディレクトリがベースレベルにない場合、`resultDir`を更新します。
- **resultDir**:

  - _型_: `string`
  - _派生元_: `'baseDir'` / `'resultDirName'`
  - _説明_: 中間または出力結果を保存するためのディレクトリパス。

- **moduleAugmentationDirName**:

  - _型_: `string`
  - _デフォルト_: `'types'`
  - _説明_: モジュール拡張用ディレクトリ。より良いIDEの提案と型チェックを可能にします。
  - _例_: `'intlayer-types'`
  - _注意_: `tsconfig.json`にこれを含めることを確認してください。

- **moduleAugmentationDir**:

  - _型_: `string`
  - _派生元_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _説明_: モジュール拡張および追加型定義のためのパス。

- **dictionariesDirName**:
  - _型_: `string`
  - _デフォルト_: `'dictionary'`
  - _説明_: 辞書を保存するためのディレクトリ。
  - _例_: `'translations'`
  - _注意_: 結果ディレクトリレベルにない場合、`dictionariesDir`を更新します。
- **dictionariesDir**:

  - _型_: `string`
  - _派生元_: `'resultDir'` / `'dictionariesDirName'`
  - _説明_: ローカリゼーション辞書を保存するためのディレクトリ。

- **i18nextResourcesDirName**:
  - _型_: `string`
  - _デフォルト_: `'i18next_dictionary'`
  - _説明_: i18n辞書を保存するためのディレクトリ。
  - _例_: `'translations'`
  - _注意_: 結果ディレクトリレベルにない場合、`i18nextResourcesDir`を更新します。
  - _注意_: i18next辞書出力が含まれるようにi18n辞書出力を構成してください。
- **i18nextResourcesDir**:

  - _型_: `string`
  - _派生元_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _説明_: i18n辞書を保存するためのディレクトリ。
  - _注意_: このディレクトリがi18next出力タイプ用に構成されていることを確認してください。

- **typeDirName**:

  - _型_: `string`
  - _デフォルト_: `'types'`
  - _説明_: 辞書タイプを保存するためのディレクトリ。
  - _例_: `'intlayer-types'`
  - _注意_: 結果ディレクトリレベルにない場合、`typesDir`を更新します。

- **typesDir**:

  - _型_: `string`
  - _派生元_: `'resultDir'` / `'typeDirName'`
  - _説明_: 辞書タイプを保存するためのディレクトリ。

- **mainDirName**:
  - _型_: `string`
  - _デフォルト_: `'main'`
  - _説明_: メインファイルを保存するためのディレクトリ。
  - _例_: `'intlayer-main'`
  - _注意_: 結果ディレクトリレベルにない場合、`mainDir`を更新します。
- **mainDir**:
  - _型_: `string`
  - _派生元_: `'resultDir'` / `'mainDirName'`
  - _説明_: メインアプリケーションファイルが保存されているディレクトリ。
- **excludedPath**:
  - _型_: `string[]`
  - _デフォルト_: `['node_modules']`
  - _説明_: コンテンツ検索から除外されるディレクトリ。
  - _注意_: この設定はまだ使用されていませんが、将来的に実装される予定です。

### ロガー設定

ロガーを制御する設定。使用するプレフィックスなどが含まれます。

#### プロパティ

- **mode**:
  - _型_: `string`
  - _デフォルト_: `default`
  - _説明_: ロガーのモードを示します。
  - _オプション_: `default`, `verbose`, `disabled`
  - _例_: `default`
  - _注意_: ロガーのモード。詳細モードはより多くの情報をログに記録しますが、デバッグ目的で使用できます。無効モードはロガーを無効にします。
- **prefix**:
  - _型_: `string`
  - _デフォルト_: `'[intlayer] '`
  - _説明_: ロガーのプレフィックス。
  - _例_: `'[my custom prefix] '`
  - _注意_: ロガーのプレフィックス。

### AI設定

IntlayerのAI機能を制御する設定で、プロバイダー、モデル、APIキーを含みます。

この設定は、アクセスキーを使用して[Intlayerダッシュボード](https://intlayer.org/dashboard/project)に登録している場合はオプションです。Intlayerは自動的に最も効率的でコスト効果の高いAIソリューションを管理します。デフォルトオプションを使用することで、Intlayerが継続的に更新されて最も関連性の高いモデルを使用するため、長期的な保守性が向上します。

独自のAPIキーや特定のモデルを使用したい場合は、カスタムAI設定を定義できます。
このAI設定は、Intlayer環境全体でグローバルに使用されます。CLIコマンドは、これらの設定をコマンド（例：`fill`）のデフォルト値として使用し、SDK、ビジュアルエディタ、CMSでも同様に使用されます。コマンドパラメータを使用して、特定のユースケースでこれらのデフォルト値を上書きできます。

Intlayerは、より多くの柔軟性と選択肢を提供するために複数のAIプロバイダーをサポートしています。現在サポートされているプロバイダーは：

- **OpenAI**（デフォルト）
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### プロパティ

- **provider** :

  - _型_ : `string`
  - _デフォルト_ : `'openai'`
  - _説明_ : IntlayerのAI機能に使用するプロバイダー。
  - _オプション_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _例_ : `'anthropic'`
  - _注意_ : 異なるプロバイダーは異なるAPIキーを必要とし、異なる価格モデルを持つ場合があります。

- **model** :

  - _型_ : `string`
  - _デフォルト_ : なし
  - _説明_ : IntlayerのAI機能に使用するモデル。
  - _例_ : `'gpt-4o-2024-11-20'`
  - _注意_ : 使用する特定のモデルはプロバイダーによって異なります。

- **temperature** :

  - _型_ : `number`
  - _デフォルト_ : なし
  - _説明_ : 温度はAIの応答のランダム性を制御します。
  - _例_ : `0.1`
  - _注意_ : 温度が高いほど、AIはより創造的で予測不可能になります。

- **apiKey** :
  - _型_ : `string`
  - _デフォルト_ : なし
  - _説明_ : 選択したプロバイダーのAPIキー。
  - _例_ : `process.env.OPENAI_API_KEY`
  - _注意_ : 重要：APIキーは秘密に保ち、公開してはいけません。環境変数などの安全な場所に保管してください。

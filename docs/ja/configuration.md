# Intlayer設定ドキュメント

## 概要

Intlayer の設定ファイルは、国際化、ミドルウェア、コンテンツ処理など、プラグインのさまざまな側面をカスタマイズすることを可能にします。このドキュメントでは、設定内の各プロパティについて詳細に説明します。

---

## 設定ファイルのサポート

Intlayer は JSON、JS、MJS、TS の設定ファイル形式をサポートしています：

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
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    activateDynamicImport: true,
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
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    activateDynamicImport: true,
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

以下のセクションでは、Intlayer のさまざまな設定オプションについて説明します。

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
  - _説明_: アプリケーションで必須のロケールのリスト。
  - _例_: `[]`
  - _注意_: 空の場合、`strict` モードではすべてのロケールが必須とみなされます。
  - _注意_: 必須ロケールは `locales` フィールドにも定義されている必要があります。

- **strictMode**:

  - _型_: `string`
  - _デフォルト_: `inclusive`
  - _説明_: TypeScript を使用して国際化コンテンツの強力な実装を保証します。
  - _注意_: "strict" に設定すると、翻訳関数 `t` は宣言されたすべてのロケールが定義されている必要があります。ロケールが欠けている場合や、設定に宣言されていないロケールがある場合、エラーがスローされます。
  - _注意_: "inclusive" に設定すると、翻訳関数 `t` は宣言されたすべてのロケールが定義されている必要があります。ロケールが欠けている場合、警告が表示されますが、設定に宣言されていないロケールが存在しても許容されます。
  - _注意_: "loose" に設定すると、翻訳関数 `t` は存在する任意のロケールを受け入れます。

- **defaultLocale**:

  - _型_: `string`
  - _デフォルト_: `'en'`
  - _説明_: リクエストされたロケールが見つからない場合に使用されるデフォルトのロケール。
  - _例_: `'en'`
  - _注意_: URL、クッキー、またはヘッダーにロケールが指定されていない場合に使用されます。

---

### エディター設定

統合エディターに関連する設定を定義します。サーバーポートやアクティブ状態などが含まれます。

#### プロパティ

- **applicationURL**:

  - _型_: `string`
  - _デフォルト_: `http://localhost:3000`
  - _説明_: アプリケーションの URL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。
  - _例_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_: アプリケーションの URL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。`'*'` に設定すると、エディターは任意のオリジンからアクセス可能になります。

- **port**:

  - _型_: `number`
  - _デフォルト_: `8000`
  - _説明_: ビジュアルエディターサーバーが使用するポート。

- **editorURL**:

  - _型_: `string`
  - _デフォルト_: `'http://localhost:8000'`
  - _説明_: エディターサーバーの URL。セキュリティ上の理由からエディターのオリジンを制限するために使用されます。
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _注意_: アプリケーションから到達するためのエディターサーバーの URL。セキュリティ上の理由から、アプリケーションとやり取りできるオリジンを制限するために使用されます。`'*'` に設定すると、エディターは任意のオリジンからアクセス可能になります。ポートが変更された場合や、エディターが異なるドメインでホストされている場合に設定する必要があります。

- **cmsURL**:

  - _型_: `string`
  - _デフォルト_: `'https://intlayer.org'`
  - _説明_: Intlayer CMS の URL。
  - _例_: `'https://intlayer.org'`
  - _注意_: Intlayer CMS の URL。

- **backendURL**:

  - _型_: `string`
  - _デフォルト_: `https://back.intlayer.org`
  - _説明_: バックエンドサーバーの URL。
  - _例_: `http://localhost:4000`

- **enabled**:

  - _型_: `boolean`
  - _デフォルト_: `true`
  - _説明_: アプリケーションがビジュアルエディターとやり取りするかどうかを示します。
  - _例_: `process.env.NODE_ENV !== 'production'`
  - _注意_: true の場合、エディターはアプリケーションとやり取りできます。false の場合、エディターはアプリケーションとやり取りできません。いずれの場合も、エディターはビジュアルエディターによってのみ有効化されます。特定の環境でエディターを無効化することは、セキュリティを強化する方法の一つです。

- **clientId**:

  - _型_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId と clientSecret は、oAuth2 認証を使用して Intlayer パッケージがバックエンドと認証することを可能にします。アクセストークンはプロジェクトに関連するユーザーを認証するために使用されます。アクセストークンを取得するには、https://intlayer.org/dashboard/project にアクセスしてアカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientId と clientSecret は秘密にして公開しないでください。環境変数などの安全な場所に保存してください。

- **clientSecret**:

  - _型_: `string` | `undefined`
  - _デフォルト_: `undefined`
  - _説明_: clientId と clientSecret は、oAuth2 認証を使用して Intlayer パッケージがバックエンドと認証することを可能にします。アクセストークンはプロジェクトに関連するユーザーを認証するために使用されます。アクセストークンを取得するには、https://intlayer.org/dashboard/project にアクセスしてアカウントを作成してください。
  - _例_: `true`
  - _注意_: 重要: clientId と clientSecret は秘密にして公開しないでください。環境変数などの安全な場所に保存してください。

- **hotReload**:

  - _型_: `boolean`
  - _デフォルト_: `false`
  - _説明_: アプリケーションがロケール設定の変更を検出した際にホットリロードするかどうかを示します。
  - _例_: `true`
  - _注意_: 例えば、新しい辞書が追加または更新された場合、アプリケーションはページに表示するコンテンツを更新します。
  - _注意_: ホットリロードにはサーバーへの継続的な接続が必要なため、`enterprise` プランのクライアントのみ利用可能です。

- **dictionaryPriorityStrategy**:
  - _型_: `string`
  - _デフォルト_: `'local_first'`
  - _説明_: ローカル辞書とリモート辞書の両方が存在する場合の優先順位戦略。`'distant_first'` に設定すると、アプリケーションはリモート辞書をローカル辞書より優先します。`'local_first'` に設定すると、アプリケーションはローカル辞書をリモート辞書より優先します。
  - _例_: `'distant_first'`

### ミドルウェア設定

クッキー、ヘッダー、ロケール管理のための URL プレフィックスの処理方法など、ミドルウェアの動作を制御する設定。

#### プロパティ

- **headerName**:

  - _型_: `string`
  - _デフォルト_: `'x-intlayer-locale'`
  - _説明_: ロケールを決定するために使用される HTTP ヘッダーの名前。
  - _例_: `'x-custom-locale'`
  - _注意_: API ベースのロケール決定に役立ちます。

---

- **cookieName**:

  - _タイプ_: `string`
  - _デフォルト値_: `'intlayer-locale'`
  - _説明_: ロケールを保存するために使用されるクッキーの名前。
  - _例_: `'custom-locale'`
  - _注意_: セッション間でロケールを保持するために使用されます。

- **prefixDefault**:

  - _タイプ_: `boolean`
  - _デフォルト値_: `true`
  - _説明_: デフォルトのロケールをURLに含めるかどうか。
  - _例_: `false`
  - _注意_: `false`の場合、デフォルトのロケールのURLにはロケールプレフィックスが含まれません。

- **basePath**:

  - _タイプ_: `string`
  - _デフォルト値_: `''`
  - _説明_: アプリケーションURLのベースパス。
  - _例_: `'/my-app'`
  - _注意_: これはアプリケーションのURLの構築方法に影響します。

- **serverSetCookie**:

  - _タイプ_: `string`
  - _デフォルト値_: `'always'`
  - _説明_: サーバーでロケールクッキーを設定するルール。
  - _オプション_: `'always'`, `'never'`
  - _例_: `'never'`
  - _注意_: ロケールクッキーをすべてのリクエストで設定するか、または設定しないかを制御します。

- **noPrefix**:
  - _タイプ_: `boolean`
  - _デフォルト値_: `false`
  - _説明_: URLからロケールプレフィックスを省略するかどうか。
  - _例_: `true`
  - _注意_: `true`の場合、URLにはロケール情報が含まれません。

### コンテンツ設定

アプリケーション内のコンテンツ処理に関連する設定（ディレクトリ名、ファイル拡張子、派生設定など）。

#### プロパティ

- **watch**:

  - _タイプ_: `boolean`
  - _デフォルト値_: `process.env.NODE_ENV === 'development'`
  - _説明_: Intlayerがアプリ内のコンテンツ宣言ファイルの変更を監視して関連辞書を再構築するかどうかを示します。

- **fileExtensions**:

  - _タイプ_: `string[]`
  - _デフォルト値_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _説明_: 辞書を構築する際に検索するファイル拡張子。
  - _例_: `['.data.ts', '.data.js', '.data.json']`
  - _注意_: ファイル拡張子をカスタマイズすることで競合を回避できます。

- **baseDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `process.cwd()`
  - _説明_: プロジェクトのベースディレクトリ。
  - _例_: `'/path/to/project'`
  - _注意_: これはすべてのIntlayer関連ディレクトリを解決するために使用されます。

- **dictionaryOutput**:

  - _タイプ_: `string[]`
  - _デフォルト値_: `['intlayer']`
  - _説明_: 使用する辞書出力のタイプ（例: `'intlayer'` または `'i18next'`）。

- **contentDir**:

  - _タイプ_: `string[]`
  - _デフォルト値_: `['src']`
  - _説明_: コンテンツが保存されているディレクトリパス。

- **dictionariesDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `'.intlayer/dictionaries'`
  - _説明_: 中間または出力結果を保存するディレクトリパス。

- **moduleAugmentationDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `'.intlayer/types'`
  - _説明_: モジュール拡張用ディレクトリ。これにより、IDEの提案や型チェックが向上します。
  - _例_: `'intlayer-types'`
  - _注意_: これを`tsconfig.json`に含める必要があります。

- **unmergedDictionariesDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `'.intlayer/unmerged_dictionary'`
  - _説明_: 未マージの辞書を保存するディレクトリ。
  - _例_: `'translations'`

- **dictionariesDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `'.intlayer/dictionary'`
  - _説明_: ローカリゼーション辞書を保存するディレクトリ。
  - _例_: `'translations'`

- **i18nextResourcesDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `'i18next_dictionary'`
  - _説明_: i18n辞書を保存するディレクトリ。
  - _例_: `'translations'`
  - _注意_: このディレクトリがi18next出力タイプ用に設定されていることを確認してください。

- **typesDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `'types'`
  - _説明_: 辞書タイプを保存するディレクトリ。
  - _例_: `'intlayer-types'`

- **mainDir**:

  - _タイプ_: `string`
  - _デフォルト値_: `'main'`
  - _説明_: メインアプリケーションファイルが保存されているディレクトリ。
  - _例_: `'intlayer-main'`

- **excludedPath**:
  - _タイプ_: `string[]`
  - _デフォルト値_: `['node_modules']`
  - _説明_: コンテンツ検索から除外されるディレクトリ。
  - _注意_: この設定はまだ使用されていませんが、将来的に実装される予定です。

### ロガー設定

ロガーを制御する設定（使用するプレフィックスなど）。

#### プロパティ

- **mode**:

  - _タイプ_: `string`
  - _デフォルト値_: `default`
  - _説明_: ロガーのモードを示します。
  - _オプション_: `default`, `verbose`, `disabled`
  - _例_: `default`
  - _注意_: ロガーのモード。詳細モードではより多くの情報が記録されますが、デバッグ目的で使用できます。無効モードではロガーが無効になります。

- **prefix**:

  - _タイプ_: `string`
  - _デフォルト値_: `'[intlayer] '`
  - _説明_: ロガーのプレフィックス。
  - _例_: `'[my custom prefix] '`
  - _注意_: ロガーのプレフィックス。

### AI設定

IntlayerのAI機能を制御する設定（プロバイダー、モデル、APIキーなど）。

この設定は、[Intlayer Dashboard](https://intlayer.org/dashboard/project)でアクセスキーを使用して登録されている場合はオプションです。Intlayerは、ニーズに最も効率的でコスト効果の高いAIソリューションを自動的に管理します。デフォルトオプションを使用することで、Intlayerが最も関連性の高いモデルを使用するよう継続的に更新されるため、長期的な保守性が向上します。

独自のAPIキーや特定のモデルを使用したい場合は、カスタムAI設定を定義できます。
このAI設定は、Intlayer環境全体でグローバルに使用されます。CLIコマンドは、これらの設定をコマンド（例: `fill`）のデフォルトとして使用し、SDK、ビジュアルエディター、CMSも同様です。特定のユースケースに対してこれらのデフォルト値を上書きするには、コマンドパラメータを使用できます。

Intlayerは、柔軟性と選択肢を向上させるために複数のAIプロバイダーをサポートしています。現在サポートされているプロバイダーは以下の通りです：

- **OpenAI** (デフォルト)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### プロパティ

- **provider**:

  - _タイプ_: `string`
  - _デフォルト値_: `'openai'`
  - _説明_: IntlayerのAI機能に使用するプロバイダー。
  - _オプション_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _例_: `'anthropic'`
  - _注意_: プロバイダーによって異なるAPIキーが必要であり、異なる料金モデルが適用される場合があります。

- **model**:

  - _タイプ_: `string`
  - _デフォルト値_: なし
  - _説明_: IntlayerのAI機能に使用するモデル。
  - _例_: `'gpt-4o-2024-11-20'`
  - _注意_: 使用する特定のモデルはプロバイダーによって異なります。

- **temperature**:

  - _タイプ_: `number`
  - _デフォルト値_: なし
  - _説明_: AIの応答のランダム性を制御します。
  - _例_: `0.1`
  - _注意_: 温度が高いほど、AIはより創造的で予測不可能になります。

- **apiKey**:

  - _タイプ_: `string`
  - _デフォルト値_: なし
  - _説明_: 選択したプロバイダーのAPIキー。
  - _例_: `process.env.OPENAI_API_KEY`
  - _注意_: 重要: APIキーは秘密に保ち、公開しないでください。環境変数などの安全な場所に保管してください。

- **applicationContext**:
  - _タイプ_: `string`
  - _デフォルト値_: なし
  - _説明_: AIモデルにアプリケーションに関する追加のコンテキストを提供し、より正確で文脈に適した翻訳を生成するのに役立ちます。これには、アプリケーションのドメイン、ターゲットユーザー、トーン、または特定の用語に関する情報が含まれる場合があります。

### ビルド設定

アプリケーションの国際化をIntlayerがどのように最適化およびビルドするかを制御する設定。

ビルドオプションは`@intlayer/babel`および`@intlayer/swc`プラグインに適用されます。

> 開発モードでは、Intlayerは開発体験を簡素化するために辞書の一元化された静的インポートを使用します。

> ビルドを最適化することで、Intlayerはチャンキングを最適化するためにすべての辞書の呼び出しを置き換えます。これにより、最終的なバンドルは使用される辞書のみをインポートします。

- **注意**: `@intlayer/babel`は`vite-intlayer`パッケージでデフォルトで利用可能ですが、`@intlayer/swc`は`next-intlayer`パッケージではデフォルトでインストールされていません。これは、SWCプラグインがNext.jsではまだ実験的であるためです。

#### プロパティ

- **optimize**:

  - _型_: `boolean`
  - _デフォルト_: `process.env.NODE_ENV === 'production'`
  - _説明_: ビルドを最適化するかどうかを制御します。
  - _例_: `true`
  - _注意_: 使用される辞書のみをバンドルにインポートすることを可能にします。ただし、すべてのインポートは辞書の読み込み時の非同期処理を避けるために静的インポートのままとなります。
  - _注意_: 有効にすると、Intlayerはすべての`useIntlayer`呼び出しを`useDictionary`に、`getIntlayer`を`getDictionary`に置き換えることで辞書のチャンキングを最適化します。
  - _注意_: すべてのキーが`useIntlayer`呼び出しで静的に宣言されていることを確認してください。例：`useIntlayer('navbar')`。

- **activateDynamicImport**:

  - _型_: `boolean`
  - _デフォルト_: `false`
  - _説明_: 辞書コンテンツをロケールごとに動的にインポートするかどうかを制御します。
  - _例_: `true`
  - _注意_: 現在のロケールの辞書コンテンツのみを動的にインポートすることを可能にします。
  - _注意_: 動的インポートはReact Suspenseに依存し、レンダリングパフォーマンスに若干の影響を与える可能性があります。ただし、無効にすると、使用されていない場合でもすべてのロケールが一度に読み込まれます。
  - _注意_: 有効にすると、Intlayerはすべての`useIntlayer`呼び出しを`useDynamicDictionary`に置き換えることで辞書のチャンキングを最適化します。
  - _注意_: このオプションは`optimize`が無効の場合は無視されます。
  - _注意_: すべてのキーが`useIntlayer`呼び出しで静的に宣言されていることを確認してください。例：`useIntlayer('navbar')`。

- **traversePattern**:
  - _型_: `string[]`
  - _デフォルト_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx,vue,svelte,svte}', '!**/node_modules/**']`
  - _説明_: 最適化中にトラバースするファイルを定義するパターン。
  - _例_: `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _注意_: 関連するコードファイルに最適化を制限し、ビルドパフォーマンスを向上させるために使用します。
  - _注意_: このオプションは`optimize`が無効の場合は無視されます。
  - _注意_: globパターンを使用します。

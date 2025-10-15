---
createdAt: 2024-08-14
updatedAt: 2025-08-20
title: Intlayerの利点
description: プロジェクトでIntlayerを使用する利点とメリットを発見しましょう。Intlayerが他のフレームワークと比べて際立つ理由を理解してください。
keywords:
  - 利点
  - メリット
  - Intlayer
  - フレームワーク
  - 比較
slugs:
  - doc
  - why
history:
  - version: 5.8.0
    date: 2025-08-19
    changes: 比較表の更新
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# なぜIntlayerを検討すべきか？

## Intlayerとは？

**Intlayer**はJavaScript開発者向けに特化して設計された国際化ライブラリです。コードのあらゆる場所でコンテンツの宣言を可能にします。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScriptを使用することで、**Intlayer**は開発をより強力かつ効率的にします。

## なぜIntlayerは作られたのか？

Intlayerは、`next-intl`、`react-i18next`、`react-intl`、`next-i18next`、`react-intl`、および`vue-i18n`などの一般的なi18nライブラリすべてに共通する問題を解決するために作られました。

これらのすべてのソリューションは、コンテンツを一覧化し管理するために集中管理型のアプローチを採用しています。例えば：

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

または、名前空間を使用した場合：

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

このようなアーキテクチャは、開発プロセスを遅くし、コードベースの保守を複雑にするいくつかの理由があります：

1. **新しいコンポーネントを作成するたびに、以下を行う必要があります：**
   - `locales` フォルダに新しいリソース／名前空間を作成する
   - ページ内で新しい名前空間をインポートすることを忘れない
   - コンテンツを翻訳する（多くの場合、AI提供者からのコピー＆ペーストで手動で行われる）

2. **コンポーネントに変更を加えるたびに、以下を行う必要があります：**
   - 関連するリソース／名前空間を検索する（コンポーネントから離れている）
   - コンテンツを翻訳する
   - すべてのロケールでコンテンツが最新であることを確認する
   - 名前空間に未使用のキー／値が含まれていないことを検証する
   - すべてのロケールでJSONファイルの構造が同じであることを保証する

プロフェッショナルなプロジェクトでは、これらのソリューションを使用する際に、コンテンツの翻訳管理を支援するためにローカリゼーションプラットフォームがよく利用されます。しかし、大規模なプロジェクトではこれがすぐにコスト高になることがあります。

この問題を解決するために、Intlayerはコンテンツをコンポーネント単位でスコープし、CSS（`styled-components`）、型定義、ドキュメント（`storybook`）、ユニットテスト（`jest`）と同様に、コンテンツをコンポーネントの近くに保持するアプローチを採用しています。

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

このアプローチにより、以下が可能になります：

1. **開発速度の向上**
   - `.content.{{ts|mjs|cjs|json}}` ファイルは VSCode の拡張機能を使って作成できます
   - IDE のオートコンプリート AI ツール（GitHub Copilot など）がコンテンツの宣言を支援し、コピー＆ペーストを減らせます

2. **コードベースをクリーンにする**
   - 複雑さを減らす
   - 保守性を高める

3. **コンポーネントと関連コンテンツの複製をより簡単に行う（例：ログイン/登録コンポーネントなど）**
   - 他のコンポーネントのコンテンツに影響を与えるリスクを制限することで
   - 外部依存なしにコンテンツを別のアプリケーションにコピー＆ペーストできることで

4. **未使用のコンポーネントの未使用キー/値でコードベースを汚染しない**
   - コンポーネントを使用しない場合、Intlayerはその関連コンテンツをインポートしません
   - コンポーネントを削除すると、その関連コンテンツも同じフォルダーに存在するため、より簡単に削除を思い出せます

5. **多言語コンテンツを宣言する際のAIエージェントの推論コストを削減**
   - AIエージェントはコンテンツを実装する場所を知るためにコードベース全体をスキャンする必要がありません
   - IDEのオートコンプリートAIツール（例：GitHub Copilot）で簡単に翻訳が行えます

## Intlayerの追加機能

| 機能                                                                                                                      | 説明                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **クロスフレームワーク対応**<br><br>Intlayerは、Next.js、React、Vite、Vue.js、Nuxt、Preact、Expressなど、主要なフレームワークやライブラリすべてに対応しています。                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true)       | **JavaScriptによるコンテンツ管理**<br><br>JavaScriptの柔軟性を活用して、コンテンツを効率的に定義・管理します。<br><br> - [コンテンツ宣言](https://intlayer.org/doc/concept/content)                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ロケール別コンテンツ宣言ファイル**<br><br>自動生成の前に一度だけコンテンツを宣言することで、開発をスピードアップします。<br><br> - [ロケール別コンテンツ宣言ファイル](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **型安全な環境**<br><br>TypeScriptを活用して、コンテンツ定義やコードのエラーを防ぎ、IDEのオートコンプリート機能も利用できます。<br><br> - [TypeScriptの設定](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **簡素化されたセットアップ**<br><br>最小限の設定で迅速に開始できます。国際化、ルーティング、AI、ビルド、コンテンツ処理の設定を簡単に調整可能です。<br><br> - [Next.js統合を探る](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **簡素化されたコンテンツ取得**<br><br>各コンテンツごとに `t` 関数を呼び出す必要はありません。単一のフックを使ってすべてのコンテンツを直接取得できます。<br><br> - [React 統合](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **一貫したサーバーコンポーネントの実装**<br><br>Next.jsのサーバーコンポーネントに最適で、クライアントコンポーネントとサーバーコンポーネントの両方で同じ実装を使用できます。各サーバーコンポーネントに `t` 関数を渡す必要はありません。<br><br> - [サーバーコンポーネント](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **整理されたコードベース**<br><br>コードベースをより整理された状態に保ちます：1つのコンポーネント = 同じフォルダ内の1つの辞書。翻訳をそれぞれのコンポーネントの近くに配置することで、保守性と明確さが向上します。<br><br> - [Intlayerの仕組み](https://intlayer.org/doc/concept/how-works-intlayer)                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **強化されたルーティング**<br><br>Next.js、React、Vite、Vue.jsなどの複雑なアプリケーション構造にシームレスに適応し、アプリのルーティングを完全にサポートします。<br><br> - [Next.js統合を探る](https://intlayer.org/doc/environment/nextjs)                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **マークダウンサポート**<br><br>プライバシーポリシーやドキュメントなどの多言語コンテンツのために、ロケールファイルやリモートのMarkdownをインポートして解釈します。Markdownのメタデータを解釈し、コード内でアクセス可能にします。<br><br> - [コンテンツファイル](https://intlayer.org/doc/concept/content/file)                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **無料のビジュアルエディター＆CMS**<br><br>コンテンツライター向けに無料のビジュアルエディターとCMSが利用可能で、ローカリゼーションプラットフォームは不要です。Gitを使ってコンテンツを同期させるか、CMSで完全または部分的に外部化できます。<br><br> - [Intlayerエディター](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **ツリーシェイカブルコンテンツ**<br><br>ツリーシェイカブルコンテンツにより、最終バンドルのサイズを削減します。コンポーネントごとにコンテンツを読み込み、未使用のコンテンツはバンドルから除外されます。遅延読み込みをサポートし、アプリの読み込み効率を向上させます。<br><br> - [アプリビルドの最適化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **静的レンダリング**<br><br>静的レンダリングを妨げません。<br><br> - [Next.js 統合](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI搭載翻訳**<br><br>Intlayerの高度なAI搭載翻訳ツールを使用し、ご自身のAIプロバイダー/APIキーを使って、ワンクリックでウェブサイトを231言語に変換します。<br><br> - [CI/CD統合](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自動入力](https://intlayer.org/doc/concept/auto-fill)                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCPサーバー統合**<br><br>IDEの自動化のためのMCP（モデルコンテキストプロトコル）サーバーを提供し、開発環境内でシームレスなコンテンツ管理とi18nワークフローを可能にします。 <br><br> - [MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode 拡張機能**<br><br>Intlayer は、コンテンツや翻訳の管理、辞書の構築、コンテンツの翻訳などを支援する VSCode 拡張機能を提供します。<br><br> - [VSCode 拡張機能](https://intlayer.org/doc/ja/vs-code-extension)                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **相互運用性**<br><br>react-i18next、next-i18next、next-intl、react-intlとの相互運用性を可能にします。<br><br> - [Intlayer と react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer と next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer と next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)           |

## Intlayer と他のソリューションの比較

| 機能                                                         | Intlayer                                                                                                                                            | React-i18next / i18next                                   | React-Intl (FormatJS)                                     | LinguiJS                                                  | next-intl                                                 | next-i18next                                              | vue-i18n                                                             |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| **コンポーネント近くの翻訳**                                 | はい、各コンポーネントに内容が共置されています                                                                                                      | いいえ                                                    | いいえ                                                    | いいえ                                                    | いいえ                                                    | いいえ                                                    | はい - `Single File Components`（SFCs）を使用しています              |
| **TypeScript 統合**                                          | 高度で自動生成された厳密な型                                                                                                                        | 基本的なもの；安全性のための追加設定が必要                | 良好だが厳密さはやや劣る                                  | 型定義あり、設定が必要                                    | 良好                                                      | 基本的                                                    | 良好（型は利用可能；キーの安全性には設定が必要）                     |
| **翻訳漏れ検出**                                             | ビルド時のエラー/警告                                                                                                                               | 実行時にほとんどフォールバック文字列を使用                | フォールバック文字列                                      | 追加設定が必要                                            | 実行時フォールバック                                      | 実行時フォールバック                                      | 実行時フォールバック/警告（設定可能）                                |
| **リッチコンテンツ（JSX/Markdown/コンポーネント）**          | Reactノードも含めて直接サポート                                                                                                                     | 制限あり / 補間のみ                                       | ICU構文、実際のJSXではない                                | 制限あり                                                  | リッチノード向けに設計されていない                        | 制限あり                                                  | 制限あり（コンポーネントは`<i18n-t>`経由、Markdownはプラグイン経由） |
| **AI搭載翻訳**                                               | はい、複数のAIプロバイダーをサポートしています。ご自身のAPIキーを使用して利用可能です。アプリケーションとコンテンツの範囲のコンテキストを考慮します | いいえ                                                    | いいえ                                                    | いいえ                                                    | いいえ                                                    | いいえ                                                    | いいえ                                                               |
| **ビジュアルエディター**                                     | はい、ローカルビジュアルエディター＋オプションのCMS；コードベースのコンテンツを外部化可能；埋め込み可能                                             | いいえ / 外部ローカリゼーションプラットフォームで利用可能 | いいえ / 外部ローカリゼーションプラットフォームで利用可能 | いいえ / 外部ローカリゼーションプラットフォームで利用可能 | いいえ / 外部ローカリゼーションプラットフォームで利用可能 | いいえ / 外部ローカリゼーションプラットフォームで利用可能 | いいえ / 外部ローカリゼーションプラットフォームで利用可能            |
| **ローカライズされたルーティング**                           | 組み込み、ミドルウェアサポート                                                                                                                      | プラグインまたは手動設定                                  | 組み込みではない                                          | プラグイン/手動設定                                       | 組み込み                                                  | 組み込み                                                  | Vue Router経由の手動設定（Nuxt i18nが対応）                          |
| **動的ルート生成**                                           | はい                                                                                                                                                | プラグイン/エコシステムまたは手動設定                     | 提供されていません                                        | プラグイン/手動                                           | はい                                                      | はい                                                      | 提供されていません（Nuxt i18nが提供）                                |
| **複数形処理**                                               | 列挙ベースのパターン；ドキュメント参照                                                                                                              | 設定可能（i18next-icuのようなプラグイン）                 | 高度（ICU）                                               | 高度（ICU/messageformat）                                 | 良好                                                      | 良好                                                      | 高度（組み込みの複数形ルール）                                       |
| **フォーマット（日時、数値、通貨）**                         | 最適化されたフォーマッター（内部でIntlを使用）                                                                                                      | プラグインまたはカスタムIntlの使用による                  | 高度なICUフォーマッター                                   | ICU/CLIヘルパー                                           | 良好（Intlヘルパー）                                      | 良好（Intlヘルパー）                                      | 組み込みの日付/数値フォーマッター（Intl）                            |
| **コンテンツ形式**                                           | .tsx, .ts, .js, .json, .md, .txt                                                                                                                    | .json                                                     | .json, .js                                                | .po, .json                                                | .json, .js, .ts                                           | .json                                                     | .json, .js                                                           |
| **ICUサポート**                                              | 作業中（ネイティブICU）                                                                                                                             | プラグイン経由（i18next-icu）                             | はい                                                      | はい                                                      | はい                                                      | プラグイン経由（i18next-icu）                             | カスタムフォーマッター/コンパイラー経由                              |
| **SEOヘルパー（hreflang、サイトマップ）**                    | 組み込みツール：サイトマップ、**robots.txt**、メタデータのヘルパー                                                                                  | コミュニティプラグイン/手動                               | コアではない                                              | コアではない                                              | 良好                                                      | 良好                                                      | コアではない（Nuxt i18nがヘルパーを提供）                            |
| **エコシステム / コミュニティ**                              | 小規模だが急速に成長し活発                                                                                                                          | 最大かつ最も成熟している                                  | 大規模、エンタープライズ向け                              | 成長中だが小規模                                          | 中規模、Next.jsに特化                                     | 中規模、Next.jsに特化                                     | Vueエコシステムで大規模                                              |
| **サーバーサイドレンダリングとサーバーコンポーネント**       | はい、SSR / Reactサーバーコンポーネント向けに最適化されています                                                                                     | サポートされていますが、いくつかの設定が必要です          | Next.jsでサポートされています                             | サポートされています                                      | 完全サポート                                              | 完全サポート                                              | Nuxt/Vue SSR経由のSSR（RSCはなし）                                   |
| **ツリーシェイキング（使用されるコンテンツのみを読み込む）** | はい、Babel/SWCプラグインを使用したビルド時のコンポーネント単位で対応                                                                               | 通常はすべて読み込む（名前空間やコード分割で改善可能）    | 通常はすべて読み込む                                      | デフォルトでは対応していない                              | 部分的に対応                                              | 部分的に対応                                              | 部分的に対応（コード分割や手動設定が必要）                           |
| **遅延読み込み**                                             | はい、ロケールごと／コンポーネントごとに対応                                                                                                        | はい（例：バックエンド／名前空間をオンデマンドで）        | はい（ロケールバンドルを分割）                            | はい（動的カタログインポート）                            | はい（ルートごと／ロケールごと）                          | はい（ルートごと／ロケールごと）                          | はい（非同期ロケールメッセージ）                                     |
| **大規模プロジェクトの管理**                                 | モジュール化を推奨し、デザインシステムに適している                                                                                                  | 適切なファイル管理が必要                                  | 中央カタログが大きくなる可能性がある                      | 複雑になる可能性がある                                    | セットアップによるモジュール化                            | セットアップによるモジュール化                            | Vue Router/Nuxt i18n セットアップによるモジュール化                  |

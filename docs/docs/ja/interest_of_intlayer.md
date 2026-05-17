---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Intlayerの利点
description: プロジェクトでIntlayerを使用する利点とメリットを発見してください。Intlayerが他のフレームワークの中で際立っている理由を理解しましょう。
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
  - version: 7.3.1
    date: 2025-11-27
    changes: "コンパイラのリリース"
  - version: 5.8.0
    date: 2025-08-19
    changes: "比較表の更新"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
---

# なぜIntlayerを検討すべきなのですか？

## Intlayerとは何ですか？

**Intlayer**は、JavaScript開発者向けに特別に設計された国際化ライブラリです。コードのあらゆる場所でコンテンツを宣言することができます。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScriptを使用することで、**Intlayer**は開発をより強力かつ効率的にします。

## なぜIntlayerが作られたのですか？

Intlayerは、`next-intl`、`react-i18next`、`react-intl`、`next-i18next`、`react-intl`、および`vue-i18n`などのすべての一般的なi18nライブラリに影響を与える共通の問題を解決するために作られました。

これらのソリューションはすべて、コンテンツをリスト化して管理するために集中型のアプローチを採用しています。例えば：

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

またはネームスペースを使用する場合：

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

このタイプのアーキテクチャは、いくつかの理由により開発プロセスを遅らせ、コードベースの保守を複雑にします。

1. **新しいコンポーネントを作成するたびに、次のことを行う必要があります：**
   - `locales`フォルダに新しいリソース/ネームスペースを作成する
   - ページに新しいネームスペースをインポートすることを忘れない
   - コンテンツを翻訳する（多くの場合、AIプロバイダーからのコピー/ペーストによって手動で行われます）

2. **コンポーネントに変更を加えるたびに、次のことを行う必要があります：**
   - 関連するリソース/ネームスペースを探す（コンポーネントから遠い）
   - コンテンツを翻訳する
   - コンテンツがいずれのロケールでも最新であることを確認する
   - ネームスペースに使用されていないキー/値が含まれていないか確認する
   - JSONファイルの構造がすべてのロケールで同じであることを確認する

これらのソリューションを使用するプロフェッショナルなプロジェクトでは、コンテンツの翻訳を管理するためにローカライゼーションプラットフォームがよく使用されます。しかし、これは大規模なプロジェクトではすぐにコストがかさむ可能性があります。

この問題を解決するために、Intlayerはコンポーネントごとにコンテンツをスコープし、CSS（`styled-components`）、型、ドキュメント（`storybook`）、またはユニットテスト（`jest`）で行うのと同様に、コンテンツをコンポーネントの近くに保つアプローチを採用しています。

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

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

このアプローチにより、次のことが可能になります：

1. **開発スピードの向上**
   - VSCode拡張機能を使用して`.content.{{ts|mjs|cjs|json}}`ファイルを作成できます
   - IDEの自動補完AIツール（GitHub Copilotなど）がコンテンツの宣言を支援し、コピー/ペーストを削減できます

2. **コードベースのクリーンアップ**
   - 複雑さを軽減
   - 保守性を向上

3. **コンポーネントとそれに関連するコンテンツの複製をより容易にする（例：ログイン/登録コンポーネントなど）**
   - 他のコンポーネントのコンテンツに影響を与えるリスクを制限する
   - 外部依存関係なしに、あるアプリケーションから別のアプリケーションへコンテンツをコピー/ペーストする

4. **未使用のコンポーネントのための未使用のキー/値でコードベースを汚染することを避ける**
   - コンポーネントを使用しない場合、Intlayerは関連するコンテンツをインポートしません
   - コンポーネントを削除すると、同じフォルダに存在するため、関連するコンテンツの削除を忘れにくくなります

5. **AIエージェントが多言語コンテンツを宣言するための推論コストを削減する**
   - AIエージェントは、コンテンツをどこに実装すべきかを知るためにコードベース全体をスキャンする必要がありません
   - 翻訳は、IDEの自動補完AIツール（GitHub Copilotなど）によって簡単に行えます

6. **読み込みパフォーマンスの最適化**
   - コンポーネントが遅延読み込みされる場合、関連するコンテンツも同時に読み込まれます

## Intlayerの追加機能

| 機能                                                                                                                      | 説明                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![機能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                             | **クロスフレームワークのサポート**<br><br>Intlayerは、Next.js、React、Vite、Vue.js、Nuxt、Preact、Expressなどを含むすべての主要なフレームワークおよびライブラリと互換性があります。                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScriptによるコンテンツ管理**<br><br>JavaScriptの柔軟性を活用して、コンテンツを効率的に定義および管理します。<br><br> - [コンテンツの宣言](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="機能" width="700">     | **コンパイラ**<br><br>Intlayerコンパイラはコンポーネントからコンテンツを自動的に抽出し、辞書ファイルを生成します。<br><br> - [コンパイラ](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ロケールごとのコンテンツ宣言ファイル**<br><br>自動生成の前にコンテンツを一度宣言することで、開発をスピードアップします。<br><br> - [ロケールごとのコンテンツ宣言ファイル](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **型安全な環境**<br><br>TypeScriptを活用して、コンテンツの定義とコードにエラーがないことを保証し、IDEの自動補完の恩恵も受けられます。<br><br> - [TypeScriptの設定](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **簡素化されたセットアップ**<br><br>最小限の構成ですぐに稼働できます。国際化、ルーティング、AI、ビルド、およびコンテンツ処理の設定を簡単に調整できます。<br><br> - [Next.jsの統合を探索する](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **簡素化されたコンテンツ取得**<br><br>コンテンツごとに`t`関数を呼び出す必要はありません。単一のフックを使用してすべてのコンテンツを直接取得します。<br><br> - [Reactの統合](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **一貫したサーバーコンポーネントの実装**<br><br>Next.jsサーバーコンポーネントに最適です。クライアントコンポーネントとサーバーコンポーネントの両方で同じ実装を使用でき、各サーバーコンポーネントに`t`関数を渡す必要はありません。<br><br> - [サーバーコンポーネント](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **整理されたコードベース**<br><br>コードベースをより整理された状態に保ちます：1コンポーネント = 同じフォルダ内の1辞書。それぞれのコンポーネントの近くにある翻訳は、保守性と明快さを向上させます。<br><br> - [Intlayerの仕組み](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **強化されたルーティング**<br><br>アプリルーティングをフルサポートし、Next.js、React、Vite、Vue.jsなどの複雑なアプリケーション構造にシームレスに適応します。<br><br> - [Next.jsの統合を探索する](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdownサポート**<br><br>プライバシーポリシー、ドキュメントなどの多言語コンテンツ用にロケールファイルとリモートMarkdownをインポートして解釈します。Markdownメタデータを解釈し、コード内でアクセス可能にします。<br><br> - [コンテンツファイル](https://intlayer.org/doc/concept/content/file)                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **無料のビジュアルエディタとCMS**<br><br>コンテンツライター向けに無料のビジュアルエディタとCMSが利用可能で、ローカライゼーションプラットフォームの必要性を排除します。Gitを使用してコンテンツを同期させるか、CMSを使用して完全または部分的に外部化します。<br><br> - [Intlayerエディタ](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakableなコンテンツ**<br><br>Tree-shakableなコンテンツにより、最終的なバンドルのサイズを削減します。コンポーネントごとにコンテンツを読み込み、バンドルから未使用のコンテンツを除外します。アプリの読み込み効率を高めるために遅延読み込みをサポートします。<br><br> - [アプリビルドの最適化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **静的レンダリング**<br><br>静的レンダリングをブロックしません。<br><br> - [Next.jsの統合](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AIを活用した翻訳**<br><br>独自のAIプロバイダー/APIキーを使用して、Intlayerの高度なAI搭載翻訳ツールにより、ワンクリックでWebサイトを231言語に変換します。<br><br> - [CI/CDの統合](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自動入力](https://intlayer.org/doc/concept/auto-fill)                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCPサーバーの統合**<br><br>IDE自動化のためのMCP（Model Context Protocol）サーバーを提供し、開発環境内でシームレスなコンテンツ管理とi18nワークフローを可能にします。<br><br> - [MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/ja/mcp_server.md)                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode拡張機能**<br><br>Intlayerは、コンテンツや翻訳の管理、辞書の構築、コンテンツの翻訳などを支援するVSCode拡張機能を提供します。<br><br> - [VSCode拡張機能](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                  |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **相互運用性**<br><br>react-i18next、next-i18next、next-intl、およびreact-intlとの相互運用を可能にします。<br><br> - [Intlayerとreact-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayerとnext-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayerとnext-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                        |
| 欠落している翻訳のテスト (CLI/CI)                                                                                         | ✅ CLI: npx intlayer content test (CIフレンドリーな監査)                                                                                                                                                                                                                                                                                                                                     |

## Intlayerと他のソリューションの比較

| 機能                                                            | `intlayer`                                                                                                                             | `react-i18next`                                                                                              | `react-intl` (FormatJS)                                                                                                    | `lingui`                                                             | `next-intl`                                                                                                  | `next-i18next`                                                                                               | `vue-i18n`                                                              |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| **コンポーネントの近くにある翻訳**                              | ✅ はい、コンテンツは各コンポーネントと同じ場所に配置されます                                                                          | ❌ いいえ                                                                                                    | ❌ いいえ                                                                                                                  | ❌ いいえ                                                            | ❌ いいえ                                                                                                    | ❌ いいえ                                                                                                    | ✅ はい - `Single File Components` (SFC)を使用している場合              |
| **TypeScriptの統合**                                            | ✅ 高度、自動生成された厳密な型                                                                                                        | ⚠️ 基本的。安全性のために追加の設定が必要                                                                    | ✅ 良好だが、それほど厳密ではない                                                                                          | ⚠️ タイピング、設定が必要                                            | ✅ 良好                                                                                                      | ⚠️ 基本的                                                                                                    | ✅ 良好（型は利用可能。キーの安全性には設定が必要）                     |
| **欠落している翻訳の検出**                                      | ✅ TypeScriptのエラーハイライトおよびビルド時のエラー/警告                                                                             | ⚠️ 実行時は主にフォールバック文字列                                                                          | ⚠️ フォールバック文字列                                                                                                    | ⚠️ 追加の設定が必要                                                  | ⚠️ 実行時のフォールバック                                                                                    | ⚠️ 実行時のフォールバック                                                                                    | ⚠️ 実行時のフォールバック/警告（設定可能）                              |
| **リッチコンテンツ (JSX/Markdown/コンポーネント)**              | ✅ 直接サポート                                                                                                                        | ⚠️ 制限あり / 補間のみ                                                                                       | ⚠️ ICU構文、実際のJSXではない                                                                                              | ⚠️ 制限あり                                                          | ❌ リッチノード向けに設計されていない                                                                        | ⚠️ 制限あり                                                                                                  | ⚠️ 制限あり（`<i18n-t>`経由のコンポーネント、プラグイン経由のMarkdown） |
| **AIを活用した翻訳**                                            | ✅ はい、複数のAIプロバイダーをサポート。独自のAPIキーを使用して利用可能。アプリケーションのコンテキストとコンテンツの範囲を考慮します | ❌ いいえ                                                                                                    | ❌ いいえ                                                                                                                  | ❌ いいえ                                                            | ❌ いいえ                                                                                                    | ❌ いいえ                                                                                                    | ❌ いいえ                                                               |
| **ビジュアルエディタ**                                          | ✅ はい、ローカルのビジュアルエディタ + オプションのCMS。コードベースのコンテンツを外部化可能。埋め込み可能                            | ❌ いいえ / 外部のローカライゼーションプラットフォーム経由で利用可能                                         | ❌ いいえ / 外部のローカライゼーションプラットフォーム経由で利用可能                                                       | ❌ いいえ / 外部のローカライゼーションプラットフォーム経由で利用可能 | ❌ いいえ / 外部のローカライゼーションプラットフォーム経由で利用可能                                         | ❌ いいえ / 外部のローカライゼーションプラットフォーム経由で利用可能                                         | ❌ いいえ / 外部のローカライゼーションプラットフォーム経由で利用可能    |
| **ローカライズされたルーティング**                              | ✅ はい、ローカライズされたパスを標準でサポート（Next.jsおよびViteで動作）                                                             | ⚠️ 組み込みなし。プラグイン（`next-i18next`など）またはカスタムルーター設定が必要                            | ❌ いいえ、メッセージのフォーマットのみ。ルーティングは手動で行う必要あり                                                  | ⚠️ 組み込みなし。プラグインまたは手動設定が必要                      | ✅ 組み込み、App Routerは`[locale]`セグメントをサポート                                                      | ✅ 組み込み                                                                                                  | ✅ 組み込み                                                             |
| **動的ルート生成**                                              | ✅ はい                                                                                                                                | ⚠️ プラグイン/エコシステムまたは手動セットアップ                                                             | ❌ 提供なし                                                                                                                | ⚠️ プラグイン/手動                                                   | ✅ はい                                                                                                      | ✅ はい                                                                                                      | ❌ 提供なし（Nuxt i18nが提供）                                          |
| **複数形化**                                                    | ✅ 列挙ベースのパターン                                                                                                                | ✅ 設定可能（i18next-icuなどのプラグイン）                                                                   | ✅ (ICU)                                                                                                                   | ✅ (ICU/messageformat)                                               | ✅ 良好                                                                                                      | ✅ 良好                                                                                                      | ✅ 組み込みの複数形ルール                                               |
| **フォーマット (日付、数値、通貨)**                             | ✅ 最適化されたフォーマッタ（内部でIntlを使用）                                                                                        | ⚠️ プラグインまたはカスタムIntlの使用経由                                                                    | ✅ ICUフォーマッタ                                                                                                         | ✅ ICU/CLIヘルパー                                                   | ✅ 良好（Intlヘルパー）                                                                                      | ✅ 良好（Intlヘルパー）                                                                                      | ✅ 組み込みの日付/数値フォーマッタ（Intl）                              |
| **コンテンツ形式**                                              | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 開発中)                                                                                    | ⚠️ .json                                                                                                     | ✅ .json, .js                                                                                                              | ⚠️ .po, .json                                                        | ✅ .json, .js, .ts                                                                                           | ⚠️ .json                                                                                                     | ✅ .json, .js                                                           |
| **ICUサポート**                                                 | ⚠️ 開発中                                                                                                                              | ⚠️ プラグイン（i18next-icu）経由                                                                             | ✅ はい                                                                                                                    | ✅ はい                                                              | ✅ はい                                                                                                      | ⚠️ プラグイン（`i18next-icu`）経由                                                                           | ⚠️ カスタムフォーマッタ/コンパイラ経由                                  |
| **SEOヘルパー (hreflang, sitemap)**                             | ✅ 組み込みツール：sitemap、robots.txt、メタデータのヘルパー                                                                           | ⚠️ コミュニティプラグイン/手動                                                                               | ❌ コアではない                                                                                                            | ❌ コアではない                                                      | ✅ 良好                                                                                                      | ✅ 良好                                                                                                      | ❌ コアではない（Nuxt i18nがヘルパーを提供）                            |
| **エコシステム / コミュニティ**                                 | ⚠️ 小規模だが急速に成長中であり、反応も早い                                                                                            | ✅ 最大規模かつ成熟                                                                                          | ✅ 大規模                                                                                                                  | ⚠️ 小規模                                                            | ✅ 中規模、Next.jsに特化                                                                                     | ✅ 中規模、Next.jsに特化                                                                                     | ✅ Vueエコシステムで大規模                                              |
| **サーバーサイドレンダリングとサーバーコンポーネント**          | ✅ はい、SSR / Reactサーバーコンポーネント向けに合理化されています                                                                     | ⚠️ ページレベルでサポートされていますが、子サーバーコンポーネントのコンポーネントツリーにt関数を渡す必要あり | ⚠️ 追加設定によりページレベルでサポートされていますが、子サーバーコンポーネントのコンポーネントツリーにt関数を渡す必要あり | ✅ サポート。設定が必要                                              | ⚠️ ページレベルでサポートされていますが、子サーバーコンポーネントのコンポーネントツリーにt関数を渡す必要あり | ⚠️ ページレベルでサポートされていますが、子サーバーコンポーネントのコンポーネントツリーにt関数を渡す必要あり | ✅ Nuxt/Vue SSR経由のSSR（RSCなし）                                     |
| **ツリーシェイキング (使用されているコンテンツのみを読み込む)** | ✅ はい、Babel/SWCプラグインを介してビルド時にコンポーネントごとに実施                                                                 | ⚠️ 通常はすべてを読み込みます（ネームスペース/コード分割で改善可能）                                         | ⚠️ 通常はすべてを読み込みます                                                                                              | ❌ デフォルトではない                                                | ⚠️ 部分的                                                                                                    | ⚠️ 部分的                                                                                                    | ⚠️ 部分的（コード分割/手動設定により）                                  |
| **遅延読み込み**                                                | ✅ はい、ロケールごと / 辞書ごと                                                                                                       | ✅ はい（例：オンデマンドのバックエンド/ネームスペース）                                                     | ✅ はい（ロケールバンドルの分割）                                                                                          | ✅ はい（動的なカタログインポート）                                  | ✅ はい（ルートごと/ロケールごと）。ネームスペースの管理が必要                                               | ✅ はい（ルートごと/ロケールごと）。ネームスペースの管理が必要                                               | ✅ はい（非同期ロケールメッセージ）                                     |
| **未使用のコンテンツの削除**                                    | ✅ はい、ビルド時に辞書ごとに実施                                                                                                      | ❌ いいえ。手動のネームスペース分割経由のみ                                                                  | ❌ いいえ。宣言されたすべてのメッセージがバンドルされます                                                                  | ✅ はい。ビルド時に未使用のキーが検出され、ドロップされます          | ❌ いいえ。ネームスペース管理により手動で管理可能                                                            | ❌ いいえ。ネームスペース管理により手動で管理可能                                                            | ❌ いいえ。手動の遅延読み込み経由でのみ可能                             |
| **大規模プロジェクトの管理**                                    | ✅ モジュール化を促進し、デザインシステムに適しています                                                                                | ⚠️ 良好なファイル規律が必要                                                                                  | ⚠️ 中央カタログが大きくなる可能性あり                                                                                      | ⚠️ 複雑になる可能性あり                                              | ✅ 設定によるモジュール化                                                                                    | ✅ 設定によるモジュール化                                                                                    | ✅ Vue Router/Nuxt i18nの設定によるモジュール化                         |

---

## GitHubのスター

GitHubのスターは、プロジェクトの普及度、コミュニティの信頼、および長期的な関連性を示す強力な指標です。技術的な品質を直接測定するものではありませんが、どれだけの開発者がプロジェクトを有用だと感じ、その進捗をフォローし、採用する可能性があるかを反映しています。プロジェクトの価値を見積もる際、スターは代替案との勢いの比較を助け、エコシステムの成長に関する洞察を提供します。

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## 相互運用性

`intlayer`は、`react-intl`、`react-i18next`、`next-intl`、`next-i18next`、および`vue-i18n`のネームスペースの管理も支援できます。

`intlayer`を使用すると、お気に入りのi18nライブラリの形式でコンテンツを宣言でき、intlayerが選択した場所（例：`/messages/{{locale}}/{{namespace}}.json`）にネームスペースを生成します。

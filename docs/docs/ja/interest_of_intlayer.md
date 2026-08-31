---
createdAt: 2024-08-14
updatedAt: 2026-08-30
title: Intlayerの重要性
description: プロジェクトでIntlayerを使用するメリットと利点をご紹介します。他のフレームワークの中でIntlayerが選ばれる理由を理解しましょう。
keywords:
  - メリット
  - 利点
  - Intlayer
  - フレームワーク
  - 比較
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "代替案に対するIntlayerの利点セクションを追加"
  - version: 7.3.1
    date: 2025-11-27
    changes: "コンパイラのリリース"
  - version: 5.8.0
    date: 2025-08-19
    changes: "比較表の更新"
  - version: 5.5.10
    date: 2025-06-29
    changes: "履歴の初期化"
author: aymericzip
---

# なぜIntlayerを検討すべきなのか？

## Intlayerとは？

**Intlayer**は、JavaScript開発者向けに特別に設計された国際化（i18n）ライブラリです。コード内のあらゆる場所でコンテンツを宣言することができます。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScriptを使用することで、**Intlayer**は開発をより強力かつ効率的にします。

## なぜ他の選択肢ではなくIntlayerなのか？

`next-intl`や`i18next`などの主要なソリューションと比較して、Intlayerは以下のような統合された最適化を備えたソリューションです：

<AccordionGroup>

**バンドルサイズ**

ページに巨大なJSONファイルを読み込む代わりに、必要なコンテンツのみを読み込みます。Intlayerは**バンドルサイズとページサイズを最大50%削減**するのに役立ちます。

**メンテナンス性**

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを限定することで、大規模アプリケーションの**メンテナンスが容易**になります。全体のコンテンツコードベースを見直す精神的負担なしに、単一の機能フォルダを複製または削除できます。さらに、Intlayerは**完全に型定義**されているため、コンテンツの正確性が保証されます。

**AIエージェント**

<Accordion header="AI Agent">

コンテンツを同じ場所に配置（コローケーション）することで、大規模言語モデル（LLM）に必要な**コンテキストが削減**されます。Intlayerには、翻訳漏れをテストするための**CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**などのツールスイートも付属しており、AIエージェントの開発体験（DX）をさらにスムーズにします。

</Accordion>

**機能性**

Intlayerは、他のi18nソリューションにはない、[Markdownサポート](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、[外部コンテンツの取得](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)、[ファイルコンテンツの読み込み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file.md)、[ライブコンテンツ更新](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/live.md)、[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)など、多くの追加機能を提供します。

</Accordion>

**自動化**

CI/CDパイプラインでお好みのLLMを使用し、AIプロバイダーの実費で自動翻訳を行います。Intlayerはコンテンツ抽出を自動化する**コンパイラ**や、**バックグラウンドで翻訳**をサポートする[ウェブプラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)も提供しています。

**パフォーマンス**

<Accordion header="パフォーマンス">

巨大なJSONファイルをコンポーネントに接続すると、パフォーマンスやリアクティビティの問題が発生する可能性があります。Intlayerはビルド時にコンテンツの読み込みを最適化します。

**非開発者とのスケーリング**

<Accordion header="非開発環境でのスケーリング">

単なるi18nソリューションにとどまらず、Intlayerはセルフホスト可能な**[ビジュアルエディタ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)**と**[フル機能のCMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)**を提供し、多言語コンテンツを**リアルタイム**で管理できるようにします。これにより、翻訳者、コピーライター、その他のチームメンバーとのコラボレーションがシームレスになります。コンテンツはローカルおよび/またはリモートに保存できます。

**クロスフレームワーク設計**

<Accordion header="クロスフレームワークデザイン">

異なるフレームワークをアプリケーションの異なる部分に使用する場合（例えば、React、React-native、Vue、Angular、Svelte など）、Intlayer は**すべての主要なフロントエンドフレームワーク全体で一般的な構文と実装を使用する**方法を提供します。また、design-system、apps、backend などで content declaration を共有できます。

アプリケーションの異なる部分で異なるフレームワークを使用している場合（例：React、React-Native、Vue、Angular、Svelteなど）、Intlayerは**すべての主要なフロントエンドフレームワークで共通の構文と実装を使用する方法**を提供します。また、デザインシステム、アプリ、バックエンドなどでコンテンツ宣言を共有することもできます。

## なぜIntlayerが作られたのか？

Intlayerは、`next-intl`、`react-i18next`、`react-intl`、`next-i18next`、`vue-i18n`など、すべての一般的なi18nライブラリに影響を与える共通の課題を解決するために作成されました。

これらのソリューションはすべて、コンテンツをリスト化して管理するために中央集権的なアプローチを採用しています。例えば：

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

または、名前空間（namespaces）を使用する場合：

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

このタイプのアーキテクチャは、いくつかの理由から開発プロセスを遅らせ、コードベースのメンテナンスを複雑にします：

1. **新しいコンポーネントを作成するたびに以下を行う必要があります：**
   - `locales`フォルダに新しいリソース/名前空間を作成する
   - ページに新しい名前空間をインポートすることを忘れないようにする
   - コンテンツを翻訳する（AIプロバイダーから手動でコピー＆ペーストすることが多い）

2. **コンポーネントに変更を加えるたびに以下を行う必要があります：**
   - 関連するリソース/名前空間を探す（コンポーネントから離れている）
   - コンテンツを翻訳する
   - すべてのロケールでコンテンツが最新であることを確認する
   - 名前空間に未使用のキー/値が含まれていないか検証する
   - JSONファイルの構造がすべてのロケールで同一であることを確認する

これらのソリューションを使用するプロフェッショナルなプロジェクトでは、コンテンツの翻訳管理を支援するためにローカリゼーションプラットフォームがよく使用されます。しかし、これは大規模なプロジェクトでは急速にコストがかさむ可能性があります。

この問題を解決するため、IntlayerはCSS（`styled-components`）、型定義、ドキュメント（`storybook`）、ユニットテスト（`jest`）でよく行うように、コンテンツのスコープをコンポーネントごとに限定し、コンテンツをコンポーネントの近くに維持するアプローチを採用しています。

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

このアプローチにより、以下のことが可能になります：

1. **開発スピードの向上**
   - `.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`ファイルはVSCode拡張機能を使用して作成できます
   - IDEのAI補完ツール（GitHub Copilotなど）がコンテンツの宣言を支援し、コピー＆ペーストを削減します

2. **コードベースのクリーンアップ**
   - 複雑さを軽減
   - メンテナンス性を向上

3. **コンポーネントとそれに関連するコンテンツの複製がより容易に（例：ログイン/登録コンポーネントなど）**
   - 他のコンポーネントのコンテンツに影響を与えるリスクを限定
   - 外部依存関係なしに、あるアプリケーションから別のアプリケーションへコンテンツをコピー＆ペースト可能

4. **未使用のコンポーネント用コードベースに未使用のキー/値が残るのを防止**
   - コンポーネントを使用しない場合、Intlayerは関連するコンテンツをインポートしません
   - コンポーネントを削除する場合、関連するコンテンツも同じフォルダに存在するため、削除し忘れが防げます

5. **多言語コンテンツを宣言するAIエージェントの推論コストを削減**
   - AIエージェントはコンテンツをどこに実装すべきか知るためにコードベース全体をスキャンする必要がありません
   - IDEのAI補完ツール（GitHub Copilotなど）で簡単に翻訳を行えます

6. **読み込みパフォーマンスの最適化**
   - コンポーネントが遅延読み込み（lazy-loaded）される場合、関連するコンテンツも同時に読み込まれます

## Intlayerの追加機能

| 機能                                                                                                                      | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **クロスフレームワークサポート**<br><br>Intlayerは、Next.js、React、Vite、Vue.js、Nuxt、Preact、Expressなど、すべての主要なフレームワークやライブラリと互換性があります。                                                                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScriptによるコンテンツ管理**<br><br>JavaScriptの柔軟性を活かして、コンテンツを効率的に定義および管理します。<br><br> - [コンテンツ宣言](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **コンパイラ**<br><br>Intlayerコンパイラは、コンポーネントからコンテンツを自動的に抽出し、辞書ファイルを生成します。<br><br> - [コンパイラ](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **ロケールごとのコンテンツ宣言ファイル**<br><br>自動生成の前にコンテンツを一度宣言するだけで、開発速度を向上させます。<br><br> - [ロケールごとのコンテンツ宣言ファイル](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **型安全な環境**<br><br>TypeScriptを活用して、コンテンツ定義とコードにエラーがないことを保証し、IDEの自動補完も享受できます。<br><br> - [TypeScript設定](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **シンプルなセットアップ**<br><br>最小限の設定で迅速に稼働させることができます。国際化、ルーティング、AI、ビルド、コンテンツ処理の設定を簡単に調整できます。<br><br> - [Next.js統合の探索](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **シンプルなコンテンツ取得**<br><br>コンテンツの各部分で`t`関数を呼び出す必要はありません。単一のフックを使用して、すべてのコンテンツを直接取得できます。<br><br> - [React統合](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **一貫したサーバーコンポーネントの実装**<br><br>Next.jsサーバーコンポーネントに最適で、クライアントコンポーネントとサーバーコンポーネントの両方で同じ実装を使用でき、各サーバーコンポーネントで`t`関数を渡す必要はありません。<br><br> - [サーバーコンポーネント](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **整理されたコードベース**<br><br>コードベースを整理された状態に保ちます：同じフォルダ内に1コンポーネント＝1辞書。それぞれのコンポーネントの近くに翻訳を配置することで、メンテナンス性と明瞭性が向上します。<br><br> - [Intlayerの仕組み](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **強化されたルーティング**<br><br>アプリルーティングの完全なサポート。Next.js、React、Vite、Vue.jsなどの複雑なアプリケーション構造にシームレスに適応します。<br><br> - [Next.js統合の探索](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdownサポート**<br><br>プライバシーポリシーやドキュメントなどの多言語コンテンツのために、ローカルファイルやリモートのMarkdownをインポートして解釈します。コード内でMarkdownメタデータを解釈し、アクセス可能にします。<br><br> - [コンテンツファイル](https://intlayer.org/doc/concept/content/file)                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **無料のビジュアルエディタとCMS**<br><br>コンテンツライター向けに無料のビジュアルエディタとCMSが利用可能で、ローカリゼーションプラットフォームの必要性を排除します。Gitを使用してコンテンツを同期させるか、CMSで部分的または完全に外部管理します。<br><br> - [Intlayerエディタ](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms)                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakableコンテンツ**<br><br>最終バンドルのサイズを削減するTree-shakableコンテンツ。コンポーネントごとにコンテンツを読み込み、未使用のコンテンツをバンドルから除外します。アプリの読み込み効率を高めるための遅延読み込み（lazy loading）をサポートします。<br><br> - [アプリビルドの最適化](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **静的レンダリング**<br><br>静的レンダリングをブロックしません。<br><br> - [Next.js統合](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI支援の翻訳**<br><br>独自のAIプロバイダー/APIキーを使用し、Intlayerの高度なAI翻訳ツールを使用してワンクリックでウェブサイトを231言語に翻訳します。<br><br> - [CI/CD統合](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [自動入力](https://intlayer.org/doc/concept/auto-fill)                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCPサーバー統合**<br><br>IDE自動化のためのMCP（Model Context Protocol）サーバーを提供し、開発環境内で直接シームレスなコンテンツ管理とi18nワークフローを可能にします。<br><br> - [MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/ja/mcp_server.md)                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode拡張機能**<br><br>Intlayerは、コンテンツや翻訳の管理、辞書の作成、コンテンツの翻訳などを支援するVSCode拡張機能を提供します。<br><br> - [VSCode拡張機能](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **相互運用性**<br><br>react-i18next、next-i18next、next-intl、およびreact-intlとの相互運用を可能にします。<br><br> - [Intlayerとreact-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayerとnext-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayerとnext-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Intlayer の互換アダプター](https://intlayer.org/doc/compatibility) |
| 翻訳漏れのテスト（CLI/CI）                                                                                                | ✅ CLI: npx intlayer content test（CIフレンドリーな監査）                                                                                                                                                                                                                                                                                                                                                                                        |

## Intlayerと他のソリューションの比較

| 機能                                                    | `intlayer`                                                                                                             | `react-i18next`                                                                      | `react-intl` (FormatJS)                                                                            | `lingui`                                                       | `next-intl`                                                                          | `next-i18next`                                                                       | `vue-i18n`                                                              |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| **コンポーネント近くの翻訳**                            | ✅ あり、コンテンツは各コンポーネントと同じ場所                                                                        | ❌ なし                                                                              | ❌ なし                                                                                            | ❌ なし                                                        | ❌ なし                                                                              | ❌ なし                                                                              | ✅ あり - `Single File Components` (SFC) を使用する場合                 |
| **TypeScript統合**                                      | ✅ 高度、自動生成された厳格な型定義                                                                                    | ⚠️ 基本的；安全性のために追加設定が必要                                              | ✅ 良好だが厳格さは劣る                                                                            | ⚠️ 型定義あり、設定が必要                                      | ✅ 良好                                                                              | ⚠️ 基本的                                                                            | ✅ 良好（型定義あり；キーの安全性には設定が必要）                       |
| **翻訳漏れの検出**                                      | ✅ TypeScriptエラー強調およびビルド時のエラー/警告                                                                     | ⚠️ 主に実行時のフォールバック文字列                                                  | ⚠️ フォールバック文字列                                                                            | ⚠️ 追加の設定が必要                                            | ⚠️ 実行時フォールバック                                                              | ⚠️ 実行時フォールバック                                                              | ⚠️ 実行時フォールバック/警告（設定可能）                                |
| **リッチコンテンツ（JSX/Markdown/コンポーネント）**     | ✅ 直接サポート                                                                                                        | ⚠️ 制限あり / 補間のみ                                                               | ⚠️ ICU構文、本物のJSXではない                                                                      | ⚠️ 制限あり                                                    | ❌ リッチノード向けに設計されていない                                                | ⚠️ 制限あり                                                                          | ⚠️ 制限あり（`<i18n-t>`経由のコンポーネント、プラグイン経由のMarkdown） |
| **AI支援の翻訳**                                        | ✅ あり、複数のAIプロバイダーをサポート。独自のAPIキーで使用可能。アプリケーションのコンテキストとコンテンツ範囲を考慮 | ❌ なし                                                                              | ❌ なし                                                                                            | ❌ なし                                                        | ❌ なし                                                                              | ❌ なし                                                                              | ❌ なし                                                                 |
| **ビジュアルエディタ**                                  | ✅ あり、ローカルビジュアルエディタ ＋ オプションのCMS；コードベースコンテンツの外部化が可能；埋め込み可能             | ❌ なし / 外部ローカリゼーションプラットフォーム経由で利用可能                       | ❌ なし / 外部ローカリゼーションプラットフォーム経由で利用可能                                     | ❌ なし / 外部ローカリゼーションプラットフォーム経由で利用可能 | ❌ なし / 外部ローカリゼーションプラットフォーム経由で利用可能                       | ❌ なし / 外部ローカリゼーションプラットフォーム経由で利用可能                       | ❌ なし / 外部ローカリゼーションプラットフォーム経由で利用可能          |
| **ローカライズされたルーティング**                      | ✅ あり、ロケール付きパスを標準サポート（Next.jsおよびViteで動作）                                                     | ⚠️ 標準機能なし、プラグイン（例：`next-i18next`）またはカスタムルーター設定が必要    | ❌ なし、メッセージ形式のみ、ルーティングは手動                                                    | ⚠️ 標準機能なし、プラグインまたは手動設定が必要                | ✅ 標準搭載、App Routerは`[locale]`セグメントをサポート                              | ✅ 標準搭載                                                                          | ✅ 標準搭載                                                             |
| **動的ルート生成**                                      | ✅ あり                                                                                                                | ⚠️ プラグイン/エコシステムまたは手動設定                                             | ❌ 提供なし                                                                                        | ⚠️ プラグイン/手動                                             | ✅ あり                                                                              | ✅ あり                                                                              | ❌ 提供なし（Nuxt i18nが提供）                                          |
| **複数形化**                                            | ✅ 列挙（Enum）ベースのパターン                                                                                        | ✅ 設定可能（i18next-icuなどのプラグイン）                                           | ✅ (ICU)                                                                                           | ✅ (ICU/messageformat)                                         | ✅ 良好                                                                              | ✅ 良好                                                                              | ✅ 標準の複数形ルール                                                   |
| **書式設定（日付、数値、通貨）**                        | ✅ 最適化されたフォーマッタ（内部でIntlを使用）                                                                        | ⚠️ プラグインまたはカスタムIntl使用経由                                              | ✅ ICUフォーマッタ                                                                                 | ✅ ICU/CLIヘルパー                                             | ✅ 良好（Intlヘルパー）                                                              | ✅ 良好（Intlヘルパー）                                                              | ✅ 標準の日付/数値フォーマッタ（Intl）                                  |
| **コンテンツ形式**                                      | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 開発中)                                                                    | ⚠️ .json                                                                             | ✅ .json, .js                                                                                      | ⚠️ .po, .json                                                  | ✅ .json, .js, .ts                                                                   | ⚠️ .json                                                                             | ✅ .json, .js                                                           |
| **ICUサポート**                                         | ⚠️ 開発中                                                                                                              | ⚠️ プラグイン経由（i18next-icu）                                                     | ✅ あり                                                                                            | ✅ あり                                                        | ✅ あり                                                                              | ⚠️ プラグイン経由（`i18next-icu`）                                                   | ⚠️ カスタムフォーマッタ/コンパイラ経由                                  |
| **SEOヘルパー（hreflang, sitemap）**                    | ✅ 標準ツール：サイトマップ、robots.txt、メタデータのヘルパー                                                          | ⚠️ コミュニティプラグイン/手動                                                       | ❌ コア機能にない                                                                                  | ❌ コア機能にない                                              | ✅ 良好                                                                              | ✅ 良好                                                                              | ❌ コア機能にない（Nuxt i18nがヘルパーを提供）                          |
| **エコシステム / コミュニティ**                         | ⚠️ 小規模だが急速に成長中かつ高反応                                                                                    | ✅ 最大かつ成熟                                                                      | ✅ 大規模                                                                                          | ⚠️ 小規模                                                      | ✅ 中規模、Next.js重視                                                               | ✅ 中規模、Next.js重視                                                               | ✅ Vueエコシステムで大規模                                              |
| **サーバーサイドレンダリング & サーバーコンポーネント** | ✅ あり、SSR / React Server Components向けに最適化                                                                     | ⚠️ ページレベルでサポートされているが、子サーバーコンポーネントにt関数を渡す必要あり | ⚠️ 追加設定ありのページレベルでサポートされているが、子サーバーコンポーネントにt関数を渡す必要あり | ✅ サポートあり、設定が必要                                    | ⚠️ ページレベルでサポートされているが、子サーバーコンポーネントにt関数を渡す必要あり | ⚠️ ページレベルでサポートされているが、子サーバーコンポーネントにt関数を渡す必要あり | ✅ Nuxt/Vue SSR経由のSSR（RSCなし）                                     |
| **Tree-shaking（使用コンテンツのみ読み込み）**          | ✅ あり、Babel/SWCプラグイン経由でビルド時にコンポーネントごとに実施                                                   | ⚠️ 通常はすべて読み込み（名前空間/コード分割で改善可能）                             | ⚠️ 通常はすべて読み込み                                                                            | ❌ デフォルトではない                                          | ⚠️ 部分的                                                                            | ⚠️ 部分的                                                                            | ⚠️ 部分的（コード分割/手動設定あり）                                    |
| **遅延読み込み（Lazy loading）**                        | ✅ あり、ロケールごと / 辞書ごと                                                                                       | ✅ あり（例：オンデマンドのバックエンド/名前空間）                                   | ✅ あり（ロケールバンドルの分割）                                                                  | ✅ あり（動的カタログインポート）                              | ✅ あり（ルートごと / ロケールごと）、名前空間の管理が必要                           | ✅ あり（ルートごと / ロケールごと）、名前空間の管理が必要                           | ✅ あり（非同期ロケールメッセージ）                                     |
| **未使用コンテンツの削除**                              | ✅ あり、ビルド時に辞書ごとに実施                                                                                      | ❌ なし、手動の名前空間分割経由のみ                                                  | ❌ なし、宣言されたすべてのメッセージが同梱される                                                  | ✅ あり、ビルド時に未使用のキーを検出してドロップ              | ❌ なし、名前空間管理で手動管理可能                                                  | ❌ なし、名前空間管理で手動管理可能                                                  | ❌ なし、手動の遅延読み込み経由のみ可能                                 |
| **大規模プロジェクトの管理**                            | ✅ モジュール化を促進、デザインシステムに最適                                                                          | ⚠️ 優れたファイル規律が必要                                                          | ⚠️ 中央カタログが肥大化する可能性あり                                                              | ⚠️ 複雑になる可能性あり                                        | ✅ 設定ありのモジュール式                                                            | ✅ 設定ありのモジュール式                                                            | ✅ Vue Router/Nuxt i18n設定ありのモジュール式                           |

## GitHubスター数

GitHubスター数は、プロジェクトの知名度、コミュニティからの信頼、長期的な関連性を示す強い指標です。技術的な品質を直接測定するものではありませんが、プロジェクトが有用であると感じ、その進捗を追いかけ、採用する可能性が高い開発者がどれだけいるかを反映しています。プロジェクトの価値を評価する際、スター数は選択肢間の勢いを比較し、エコシステムの成長に関する洞察を得るのに役立ちます。

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## 相互運用性

`intlayer`は、`react-intl`、`react-i18next`、`next-intl`、`next-i18next`、`vue-i18n`の名前空間の管理にも役立ちます。

`intlayer`を使用すると、お気に入りのi18nライブラリの形式でコンテンツを宣言でき、intlayerは任意の場所に名前空間を生成します（例：`/messages/{{locale}}/{{namespace}}.json`）。

現在の i18n ライブラリの API を使い続けたい場合、`intlayer` は **互換アダプター（compat adapters）** も提供しています。これは `react-i18next`、`next-intl`、`react-intl`、`vue-i18n` などとまったく同じ API を公開しつつ、内容は Intlayer の辞書から提供されるパッケージです。これにより、コードを書き直すことなく段階的に移行できます。[互換アダプターのドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md)をご覧ください。

## よくある質問

<FAQ>

<Question title="JavaScriptアプリを国際化するための異なるソリューションにはどのようなものがありますか？">

3つの世代が共存しています。

- **ランタイムカタログライブラリ**: `i18next`、`react-i18next`、`next-i18next`、`vue-i18n`、`ngx-translate`、`svelte-i18n`。ランタイムにJSON名前空間をロードします。成熟しており、フレームワークに依存せず、型付けされておらず、ページ全体に提供されます。
- **コンパイル時メッセージライブラリ**: `Lingui`、`Paraglide`、および抽出ステップを伴う`next-intl`または`react-intl`。より良いbundle動作と部分的な型付けを提供しますが、依然として集中型カタログです。
- **コンテンツレイヤーライブラリ**: `Intlayer`。コンテンツはコンポーネントごとに宣言およびコンパイルされるため、型付け、tree shaking、編集ツール、AI翻訳はすべて同じ宣言から得られます。

</Question>

<Question title="i18nはbundleサイズにどれくらい影響しますか？">

名前空間ベースのセットアップよりもはるかに少ないです。なぜなら、ページはレンダリングしないカタログをダウンロードしないからです。サーバーレンダリングされたマークアップはサーバー上でコンテンツを解決し、ビルド時コンパイラは`useIntlayer`の呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーや未使用の言語は削除されます。[動的辞書](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)は残りをロケールごとに分割します。一般的な代替手段と比較して、Intlayerはbundleサイズとページサイズを最大50%削減します。[bundle最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)を参照してください。

</Question>

<Question title="`i18next`、`next-intl`、または`react-i18next`からコンポーネントを書き直さずに移行できますか？">

はい、2つの方法があります。[i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)または[next-intl移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md)を使用して、コンテンツを段階的に移行できます。または、現在のAPIを完全に維持することもできます。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は、`i18next`、`react-i18next`、`next-intl`、`next-i18next`、`react-intl`、`use-intl`、`vue-i18n`、および`Lingui`とまったく同じAPIを公開しますが、Intlayer辞書によって提供されるため、インポートは変更されますが、コンポーネントコードは変更されません。

</Question>

<Question title="既存のJSON翻訳ファイルを保持できますか？">

はい。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は、`/messages/{locale}/{namespace}.json`ファイルを信頼できる情報源として保持し、それらからIntlayer辞書を双方向に生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)はgettextカタログに対しても同様の機能を提供し、[ロケールごとのファイル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)を使用すると、ロケールを1つのファイルにまとめるのではなく、言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract`を実行すると、Intlayerはソースファイルを読み取り、ユーザー向けの文字列を抽出し、それぞれの隣に`.content`ファイルを書き込みます。これにより、文字列をカタログに1つずつコピーする代わりに、差分を確認できます。[extractコマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照してください。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)は、JSX、TSX、Vue、Svelteのソースに対してビルド時に同じ処理を行い、変更があるたびに辞書を生成するため、手動でキーを管理する必要がありません。これは静的解析によって機能するため、ランタイムにのみ存在する文字列は対象外となり、ユーザー向けのテキストとアプリケーションロジックを区別するためにいくつかの注釈が必要です。

</Question>

<Question title="利用可能なエディターおよびAIエージェントツールにはどのようなものがありますか？">

5つのツールがあり、すべてオプションです。

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer`キーからそれを宣言するコンテンツファイルにジャンプしたり、コンポーネントからコンテンツを抽出したり、コマンドパレットまたは専用のIntlayerタブからビルド、フィル、テスト、プッシュ、プルを実行したりできます。
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSPをサポートする任意のエディターで同様の認識機能を提供します。定義へのジャンプ、すべての参照の検索、翻訳された値のホバープレビュー、キーとフィールドのオートコンプリート、およびキーがどこにも宣言されていない場合の警告が含まれます。また、`i18next`、`react-i18next`、`next-intl`、`use-intl`の呼び出しも解決するため、移行中に役立ちます。
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: IntlayerのドキュメントとCLIをCursor、VS Code、Claude Desktop、Claude Code、ChatGPTに公開します。これにより、アシスタントは推測ではなく現在のドキュメントから回答し、`intlayer fill`などのコマンドを自分で実行できます。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content`などの特化されたスキルと、フレームワークごとのスキルがあり、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text`はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツに対する追加のルールを提供します。

</Question>

<Question title="Intlayerはnext-intlとどう違いますか？">

`next-intl`はNext.js用のメッセージレイヤーです。ロケールごとにJSONメッセージファイルを保持し、`useTranslations`を通じてそれらを読み取ります。Intlayerはコンテンツレイヤーです。宣言はコンポーネントの隣に配置され、宣言自体から型付けされ、コンポーネントごとにコンパイルされるため、ページはレンダリングするものだけを提供します。Intlayerは、`next-intl`がユーザーに任せるAI翻訳、ビジュアルエディター、CMS、CIでの翻訳漏れチェックもカバーします。`next-intl` APIを維持したい場合は、[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)がIntlayer辞書からそれを提供します。

</Question>

<Question title="Intlayerはi18nextおよびreact-i18nextとどう違いますか？">

`i18next`はランタイムに名前空間に対して文字列キーを解決します。これは、キーの名前変更やスペルミスがサイレントに失敗し、ページが触れるすべての名前空間が完全にダウンロードされることを意味します。Intlayerはビルド時に生成された型に対してコンテンツを解決するため、不正なキーはコンパイルエラーとなり、コンポーネントがレンダリングするエントリのみがbundleに含まれます。`i18next`はより大きなプラグインエコシステムと長い実績を持っています。Intlayerは型付け、bundleサイズ、および編集・自動化ツールを提供します。[i18next移行ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)または[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)を参照してください。

</Question>

<Question title="Intlayerは他の代替手段よりも高速または軽量ですか？">

bundleサイズとページサイズに関しては、はい。ページがレンダリングしないカタログをロードしないことで、名前空間ベースのセットアップと比較してbundleサイズとページサイズを最大50%削減します。[ベンチマーク](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)では、[Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/nextjs.md)、[TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/tanstack.md)、[Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/vue.md)、[Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/svelte.md)を含むフレームワークごとの方法と数値が公開されているため、主張を鵜呑みにするのではなく、ご自身で再現できます。

</Question>

<Question title="既存のアプリを移行する価値はありますか？">

それは現在の課題によります。もしbundleサイズ、サイレントな翻訳漏れ、または開発者なしでは作業できない翻訳者が課題であれば、移行する価値は十分にあります。カタログが小さく安定している場合は、得られるメリットは小さくなります。いずれにしても、移行は書き直しである必要はありません。[互換アダプター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は現在のAPIを維持し、[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は両方のレイヤーが共存する間、既存のJSONファイルを信頼できる情報源として保持します。

</Question>

<Question title="Intlayerが他のi18nライブラリにはない機能は何ですか？">

[Markdown content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)、[外部ソースからフェッチされたコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)、ファイルコンテンツのロード、[ライブコンテンツ更新](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/live.md)、[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)、既存のコンポーネントからコンテンツを抽出する[コンパイラ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)、A/Bテスト用の[コンテンツバリアント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/variants.md)、コンテンツ露出に関する[アナリティクス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/analytics.md)、[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)、[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)および[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)。

</Question>

<Question title="Intlayerを翻訳マネージャーとしてのみ使用し、現在のライブラリを保持できますか？">

はい。Intlayerは、現在のライブラリが期待する形式と場所（例：`/messages/{locale}/{namespace}.json`）で名前空間を生成できます。これにより、アプリケーションコードが既存のi18nライブラリを使い続ける間も、AI翻訳、エディター、CIチェックを利用できます。

</Question>

<Question title="Intlayerは無料でオープンソースですか？">

はい、Apache 2.0 licenseの下で、商用利用も含まれます。ホスト型CMSはオプションの有料サービスですが、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することも可能です。

</Question>

</FAQ>

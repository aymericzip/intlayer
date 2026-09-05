---
createdAt: 2025-08-23
updatedAt: 2026-09-05
title: はじめに
description: Intlayerの仕組みを発見しましょう。アプリケーションでIntlayerが使用するステップを確認します。異なるパッケージが何を行うかを発見します。
keywords:
  - はじめに
  - 始め方
  - Intlayer
  - アプリケーション
  - パッケージ
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer ドキュメント

公式のIntlayerドキュメントへようこそ！ここでは、Next.js、React、Vite、Express、またはその他のJavaScript環境を使用しているかどうかにかかわらず、国際化（i18n）のすべてのニーズに合わせてIntlayerを統合、構成、およびマスターするために必要なすべてを見つけることができます。

## はじめに

### Intlayerとは何ですか？

**Intlayer**は、JavaScript開発者向けに特別に設計された国際化ライブラリです。コード内のどこにでもコンテンツの宣言を行うことができます。多言語コンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScriptを使用することで、**Intlayer**は開発をより堅牢かつ効率的にします。

Intlayerには、コンテンツを簡単に編集および管理できるオプションのビジュアルエディタも用意されています。このエディタは、コンテンツ管理のためにビジュアルインターフェイスを好む開発者や、コードを気にせずにコンテンツを生成するチームに特に役立ちます。

### 使用例

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      ja: "こんにちは世界",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ja": "こんにちは世界"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### なぜ他の選択肢よりもIntlayerなのか？

`next-intl`や`i18next`のような主流のソリューションと比較して、Intlayerは以下のような統合された最適化機能を提供するソリューションです：

<AccordionGroup>
<Accordion header="バンドルサイズ">

巨大なJSONファイルをページに読み込む代わりに、必要なコンテンツのみを読み込みます。Intlayerは**バンドルとページのサイズを最大50%削減**するのに役立ちます。

</Accordion>

<Accordion header="保守性">

アプリケーションのコンテンツのスコープを限定することは、大規模なアプリケーションの**保守を容易にします**。コンテンツのコードベース全体を確認するという精神的負担なしに、単一の機能フォルダを複製または削除できます。さらに、Intlayerはコンテンツの正確性を確保するために**完全に型付け（fully typed）**されています。

</Accordion>

<Accordion header="AIエージェント">

コンテンツを同一の場所に配置することは、大規模言語モデル（LLM）によって**必要なコンテキストを減らします**。Intlayerには、不足している翻訳をテストするための**CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、および**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**などの一連のツールも付属しており、AIエージェント向けのデベロッパーエクスペリエンス（DX）をさらにスムーズにします。

</Accordion>

<Accordion header="自動化">

CI/CDパイプラインでの翻訳に、AIプロバイダーのコストでお好みのLLMを使用して自動化を利用できます。Intlayerはまた、コンテンツ抽出を自動化するための**コンパイラー**や、**バックグラウンドでの翻訳**を支援する[ウェブプラットフォーム](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を提供します。

</Accordion>

<Accordion header="パフォーマンス">

巨大なJSONファイルをコンポーネントに接続すると、パフォーマンスやリアクティビティの問題が発生する可能性があります。Intlayerはビルド時にコンテンツの読み込みを最適化します。

</Accordion>

<Accordion header="開発者以外とのスケール">

Intlayerは単なるi18nソリューションではありません。**セルフホスト可能な[ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)**や**[完全なCMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)**を提供し、多言語コンテンツを**リアルタイム**で管理するのに役立ち、翻訳者、コピーライター、その他のチームメンバーとのコラボレーションをシームレスにします。コンテンツはローカルおよび/またはリモートに保存できます。

</Accordion>
</AccordionGroup>

## 主な機能

Intlayerは、最新のWeb開発のニーズに合わせたさまざまな機能を提供しています。以下は主な機能であり、それぞれに詳細なドキュメントへのリンクがあります：

- **国際化サポート**: 国際化の組み込みサポートにより、アプリケーションのグローバルな展開を強化します。
- **ビジュアルエディタ**: Intlayer用に設計されたエディタプラグインを使用して、開発ワークフローを改善します。[ビジュアルエディタガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)を確認してください。
- **構成の柔軟性**: [構成ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)で詳しく説明されている広範な構成オプションを使用して、セットアップをカスタマイズします。
- **高度なCLIツール**: Intlayerのコマンドラインインターフェースを使用して、プロジェクトを効率的に管理します。[CLIツールドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)で機能を調べます。

## コアコンセプト

### 辞書

コードの近くに多言語コンテンツを整理し、すべてを一貫性があり保守可能に保ちます。

- **[始め方](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)**  
  Intlayerでコンテンツを宣言するための基本を学びます。

- **[翻訳](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/translation.md)**  
  翻訳がアプリケーションでどのように生成、保存、利用されるかを理解します。

- **[列挙](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md)**  
  さまざまな言語で繰り返しまたは固定されたデータセットを簡単に管理します。

- **[条件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/condition.md)**  
  Intlayerで条件論理を使用してダイナミックコンテンツを作成する方法を学びます。

- **[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)**
  挿入プレースホルダーを使用して文字列に値を挿入する方法を発見します。

- **[関数フェッチ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/function_fetching.md)**  
  プロジェクトのワークフローに合わせて、カスタムロジックで動的にコンテンツをフェッチする方法を確認します。

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/markdown.md)**  
  IntlayerでMarkdownを使用してリッチコンテンツを作成する方法を学びます。

- **[ファイル埋め込み](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/file.md)**  
  コンテンツエディターで使用するために、Intlayerに外部ファイルを埋め込む方法を発見します。

- **[ネスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/nesting.md)**  
  Intlayerでコンテンツをネストして複雑な構造を作成する方法を理解します。

### 環境と統合

柔軟性を念頭に置いてIntlayerを構築し、人気のフレームワークやビルドツールでのシームレスな統合を提供しています：

- **[Next.js 16 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)**
- **[Next.js 15 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (App Router) と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_14.md)**
- **[Next.js Page Router と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_page_router.md)**
- **[Next.js（URL にロケールなし） と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_no_locale_path.md)**
- **[Next.js (Intlayer Compiler) と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_compiler.md)**
- **[Tanstack Start と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)**
- **[Tanstack Start + Solid と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack+solid.md)**
- **[Vite + React と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)**
- **[Vite + React (Intlayer Compiler) と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react_compiler.md)**
- **[React Router v7 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_router_v7.md)**
- **[React Router v7 (fs-routes) と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_router_v7_fs_routes.md)**
- **[React CRA と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)**
- **[React Native + Expo と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_native+expo.md)**
- **[Lynx + React と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_lynx+react.md)**
- **[Astro と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro.md)**
- **[Astro + React と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_react.md)**
- **[Astro + Vue と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_vue.md)**
- **[Astro + Svelte と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_svelte.md)**
- **[Astro + Solid と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_solid.md)**
- **[Astro + Preact と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_preact.md)**
- **[Astro + Lit と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_lit.md)**
- **[Astro + Vanilla JS と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_astro_vanilla.md)**
- **[Vite + Vue と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md)**
- **[Nuxt と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md)**
- **[Vite + Svelte と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md)**
- **[SvelteKit と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_svelte_kit.md)**
- **[Vite + Solid と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+solid.md)**
- **[SolidStart と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_solid_start.md)**
- **[Vite + Preact と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+preact.md)**
- **[Angular 22 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md)**
- **[Angular 19 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_19.md)**
- **[Analog と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_analog.md)**
- **[Vite + Lit と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+lit.md)**
- **[Vite + Vanilla JS と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vanilla.md)**
- **[Vanilla JS と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vanilla.md)**
- **[htmx と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_htmx.md)**
- **[Express と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md)**
- **[NestJS と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nestjs.md)**
- **[Fastify と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_fastify.md)**
- **[Hono と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_hono.md)**
- **[AdonisJS と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_adonisjs.md)**
- **[Elysia と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_elysia.md)**
- **[Storybook と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_storybook.md)**
- **[next-intl と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_next-intl.md)**
- **[next-i18next と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_next-i18next.md)**

各統合ガイドには、**サーバーサイドレンダリング**、**ダイナミックルーティング**、または**クライアントサイドレンダリング**など、Intlayerの機能を使用するためのベストプラクティスが含まれており、高速でSEOフレンドリーかつスケーラビリティの高いアプリケーションを維持できます。

## 貢献とフィードバック

私たちはオープンソースとコミュニティ主導の開発の力を大切にしています。改善を提案したり、新しいガイドを追加したり、ドキュメントの問題を修正したりする場合は、[GitHubリポジトリ](https://github.com/aymericzip/intlayer/blob/main/docs/docs)でPull Requestを送信するか、Issueを開いてください。

**アプリケーションをより速く、より効率的に翻訳する準備はできましたか？** 今すぐドキュメントにアクセスして、Intlayerの使用を開始してください。コンテンツを整理し、チームの生産性を向上させる堅牢で合理化された国際化アプローチを体験してください。

## よくある質問

<FAQ>

<Question title="Intlayerは何に使われますか？">

Intlayerは、JavaScriptおよびTypeScriptアプリケーション向けの国際化（i18n）ライブラリです。コンポーネントのコンテンツを`.content.ts`ファイルでそのコンポーネントの隣に宣言すると、Intlayerはビルド時にそれらの宣言を型付き辞書にコンパイルし、コンポーネントは`useIntlayer`などのhookを通じてそれらを読み込みます。翻訳、複数形ルール、性別、Markdown、ロケール対応ルーティング、SEOメタデータ、AI支援翻訳、および非開発者向けのビジュアルエディタをカバーしています。

</Question>

<Question title="i18nはバンドルサイズにどの程度追加されますか？">

名前空間ベースのセットアップよりもはるかに少なくなります。ページはレンダリングしないカタログをダウンロードしないためです。サーバーレンダリングされたマークアップはサーバー上でコンテンツを解決し、ビルド時コンパイラは`useIntlayer`呼び出しをコンポーネントが使用する正確な辞書エントリに置き換えるため、未使用のキーと未使用の言語は削除されます。[Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dynamic_dictionaries/index.md)は残りをロケールごとに分割します。通常の代替案と比較すると、Intlayerはバンドルとページサイズを最大50%削減します。[bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)と[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)を参照してください。

</Question>

<Question title="`i18next`、`next-intl`、または`react-i18next`からコンポーネントを書き直さずに移行できますか？">

はい、2つのパスがあります。[i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_i18next_to_intlayer.md)または[next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/migration_from_next-intl_to_intlayer.md)を使用してコンテンツを段階的に移行できます。または、現在のAPIを完全に保つことができます。[compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compat/index.md)は`i18next`、`react-i18next`、`next-intl`、`next-i18next`、`react-intl`、`use-intl`、`vue-i18n`、`Lingui`と同じAPIを公開していますが、Intlayer辞書によって提供されるため、importは変わりますがコンポーネントコードは変わりません。

</Question>

<Question title="既存のJSON翻訳ファイルを保持できますか？">

はい。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は`/messages/{locale}/{namespace}.json`ファイルを信頼できるソースとして保持し、双方向でIntlayer辞書を生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)はgettextカタログに対して同じことを行い、[per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)ではロケールを1つのファイルにグループ化する代わりに言語ごとにコンテンツを分割できます。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか？">

いいえ。`npx intlayer extract`を実行すると、Intlayerはソースファイルを読み込み、ユーザーに見える文字列を抽出し、各ファイルの隣に`.content`ファイルを書き込むため、文字列をカタログに1つずつコピーする代わりにdiffを確認できます。[extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照してください。

完全に自動化されたパイプラインの場合、[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/compiler.md)はビルド時にJSX、TSX、Vue、Svelteソースに対して同じことを行い、変更のたびに辞書を生成するため、手動で保守するキーはありません。静的分析によって動作するため、実行時にのみ存在する文字列は到達不可能なままであり、ユーザーに見える文字列をアプリケーションロジックから区別するためにいくつかのアノテーションが必要です。

</Question>

<Question title="どのようなエディタとAIエージェントツールが利用可能ですか？">

5つあり、すべてオプションです：

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: `useIntlayer`キーからそれを宣言するコンテンツファイルにジャンプし、コンポーネントからコンテンツを抽出し、コマンドパレットまたは専用のIntlayerタブからビルド、fill、test、push、pullを実行します。
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSPを話す任意のエディタで同じ認識を提供し、定義へのジャンプ、すべての参照を検索、翻訳値のホバープレビュー、キーとフィールドのオートコンプリート、キーがどこにも宣言されていない場合の警告があります。また、`i18next`、`react-i18next`、`next-intl`、`use-intl`呼び出しも解決し、移行中に役立ちます。
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: IntlayerドキュメントとCLIをCursor、VS Code、Claude Desktop、Claude Code、ChatGPTに公開するため、アシスタントは推測する代わりに現在のドキュメントから回答でき、`intlayer fill`などのコマンドを自分で実行できます。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content`などの焦点を絞ったスキル、およびフレームワークごとに1つのスキルがあり、エージェントにルーティング設定とコンテンツノードタイプを教えます。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text`はハードコードされた文字列にフラグを立て、静的辞書キーと未使用コンテンツのさらなるルールがあります。

</Question>

<Question title="JavaScriptアプリを国際化するために利用可能なさまざまなソリューションは何ですか？">

このフィールドは3つの世代に分かれています：

- **Runtime catalog libraries**: `i18next`、`react-i18next`、`next-i18next`、`vue-i18n`、`ngx-translate`。メッセージはランタイムで読み込まれるJSON名前空間に存在します。成熟しており、フレームワークに依存しませんが、型付けされておらず、全体が配布されます。
- **Compile time message libraries**: `Lingui`、`Paraglide`、`react-intl`、`next-intl`（抽出ステップ付き）。より良いバンドル動作といくつかの型付け、依然として集中化されたカタログ。
- **Content layer libraries**: `Intlayer`。コンテンツはコンポーネントごとに宣言され、コンポーネントごとにコンパイルされるため、型付け、tree shaking、ツール、編集は同じソースから来ます。

詳細な比較については[why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/interest_of_intlayer.md)を参照し、測定されたバンドルとパフォーマンス数については[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/benchmark/index.md)を参照してください。

</Question>

<Question title="Intlayerはどのフレームワークをサポートしていますか？">

React、Next.js、Vite、TanStack Start、React Router、Vue、Nuxt、Svelte、SvelteKit、Angular、Solid、Preact、Lit、Astro（すべてのislandフレームワーク付き）、React Native（Expo付き）、Lynx、およびサーバー上ではExpress、Fastify、NestJS、Hono、Elysia、AdonisJS。各フレームワークは[environments](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/introduction.md)の下に独自のガイドがあります。

</Question>

<Question title="コンテンツを中央のJSONファイルではなくコンポーネントの隣に宣言するのはなぜですか？">

3つの理由があります。ページは名前空間全体ではなく、レンダリングするエントリのみを配布するため、バンドルサイズが削減されます。機能フォルダは共有カタログで孤立したキーを探すことなく、1つのピースでコピーまたは削除できます。そして、LLMまたはエージェントがコンポーネントを編集するとき、同じフォルダにそのコンテンツが表示されるため、co-locationはAI支援作業を信頼できるものにします。[how Intlayer works](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/how_works_intlayer.md)を参照してください。

</Question>

<Question title="AIでアプリを自動的に翻訳するにはどうすればよいですか？">

`npx intlayer fill`を実行してください。CLIは欠落している翻訳を検出し、選択したLLMを使用して、独自のプロバイダーとAPIキーを使用して埋めるため、AI プロバイダーに直接支払います。`--git-diff`は実行をブランチで変更されたコンテンツに制限し、CIで低コストに保ちます。[fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md)と[CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md)を参照してください。

</Question>

<Question title="欠落している翻訳を見つけるにはどうすればよいですか？">

`npx intlayer test`を実行してください。宣言されたロケールがコンテンツを欠いている場合は失敗するため、翻訳されていない文字列は本番環境に到達しません。[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)は同じエラーをインラインで表示し、[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)は`no-raw-text`ルールでハードコードされた文字列にフラグを立てます。[testing your content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/testing.md)を参照してください。

</Question>

<Question title="ロケールをURLに入れる必要がありますか？">

いいえ。`routing.mode`は`"prefix-no-default"`（デフォルト、`/about`と`/fr/about`）、`"prefix-all"`、`"no-prefix"`、`"search-params"`を受け入れ、`routing.domains`は各ロケールを独自のドメインにマップします。どのスキームであれ、`getMultilingualUrls`はメタデータとサイトマップの`hreflang`代替案を構築します。[configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Question>

<Question title="翻訳者とコンテンツエディタはコードに触れずに作業できますか？">

[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md)は独自のインフラストラクチャで実行され、誰でも実行中のアプリのテキストをクリックして編集でき、変更をコードベースに書き戻すことができます。[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)はコンテンツを外部化するため、デプロイメントなしで変更でき、[live sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/live.md)はランタイムで更新を適用します。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下でオープンソースであり、ライブラリ全体、CLI、ビジュアルエディター、コンパイラを商用利用を含めて無料で使用できます。ホスト型 CMS はオプションの有料サービスですが、[セルフホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md)することも可能です。

</Question>

</FAQ>

---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
author:
  name: Aymeric PINEAU
  github: aymericzip
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

コンテンツを同一の場所に配置することは、大規模言語モデル（LLM）によって**必要なコンテキストを減らします**。Intlayerには、不足している翻訳をテストするための**CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**、および**[エージェントスキル](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**などの一連のツールも付属しており、AIエージェント向けのデベロッパーエクスペリエンス（DX）をさらにスムーズにします。

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
- **[React CRA と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_create_react_app.md)**
- **[Vite + React と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+react.md)**
- **[React Router v7 と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_router_v7.md)**
- **[Tanstack Start と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)**
- **[React Native + Expo と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_react_native+expo.md)**
- **[Lynx + React と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_lynx+react.md)**
- **[Vite + Preact と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+preact.md)**
- **[Vite + Vue と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+vue.md)**
- **[Nuxt と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md)**
- **[Vite + Svelte と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_vite+svelte.md)**
- **[SvelteKit と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_svelte_kit.md)**
- **[Express と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md)**
- **[NestJS と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nestjs.md)**
- **[Hono と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_hono.md)**
- **[Angular と Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_angular_21.md)**

各統合ガイドには、**サーバーサイドレンダリング**、**ダイナミックルーティング**、または**クライアントサイドレンダリング**など、Intlayerの機能を使用するためのベストプラクティスが含まれており、高速でSEOフレンドリーかつスケーラビリティの高いアプリケーションを維持できます。

## 貢献とフィードバック

私たちはオープンソースとコミュニティ主導の開発の力を大切にしています。改善を提案したり、新しいガイドを追加したり、ドキュメントの問題を修正したりする場合は、[GitHubリポジトリ](https://github.com/aymericzip/intlayer/blob/main/docs/docs)でPull Requestを送信するか、Issueを開いてください。

**アプリケーションをより速く、より効率的に翻訳する準備はできましたか？** 今すぐドキュメントにアクセスして、Intlayerの使用を開始してください。コンテンツを整理し、チームの生産性を向上させる堅牢で合理化された国際化アプローチを体験してください。

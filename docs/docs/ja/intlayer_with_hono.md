---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - Hono アプリの翻訳方法 – 2026 ガイド
description: Hono バックエンドを多言語化する方法をご紹介します。ドキュメントに従って国際化 (i18n) と翻訳を行ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Hono
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init コマンドの追加
  - version: 5.5.10
    date: 2025-06-29
    changes: 履歴の初期化
---

# Intlayer を使用して Hono バックエンド Web サイトを翻訳する | 国際化 (i18n)

`hono-intlayer` は、Hono アプリケーション向けの強力な国際化 (i18n) ミドルウェアです。クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンド サービスをグローバルにアクセス可能にするように設計されています。

### 実用的なユースケース

- **バックエンド エラーをユーザーの言語で表示する**: エラーが発生した際、ユーザーの母国語でメッセージを表示することで、理解が深まり、ストレスが軽減されます。これは、トーストやモーダルなどのフロントエンド コンポーネントに表示される可能性のある動的なエラー メッセージに特に役立ちます。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、国際化によってこのコンテンツを複数の言語で提供できます。これは、製品の説明、記事、その他のコンテンツをユーザーが好む言語で表示する必要がある e コマース サイトやコンテンツ管理システムなどのプラットフォームにとって不可欠です。

- **多言語メールの送信**: トランザクション メール、マーケティング キャンペーン、通知のいずれであっても、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に高めることができます。

- **多言語プッシュ通知**: モバイル アプリケーションの場合、ユーザーの優先言語でプッシュ通知を送信することで、インタラクションと継続率を向上させることができます。この個人的なタッチにより、通知がより関連性が高く、行動を促すものに感じられます。

- **その他のコミュニケーション**: SMS メッセージ、システム アラート、ユーザー インターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語であることでメリットが得られ、明確さが確保され、全体的なユーザー エクスペリエンスが向上します。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバルな市場のニーズにもより適合するようになり、サービスを世界規模で拡大するための重要なステップとなります。

## はじめに

### インストール

`hono-intlayer` の使用を開始するには、npm を使用してパッケージをインストールします。

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### 設定

プロジェクトのルートに `intlayer.config.ts` を作成して、国際化設定を構成します。

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.JAPANESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します。

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ja: "日本語で返されるコンテンツの例",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ (デフォルトは `./src`) に含まれている限り、アプリケーションのどこでも定義できます。また、コンテンツ宣言ファイルの拡張子 (デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) に一致させる必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### Hono アプリケーションの設定

`hono-intlayer` を使用するように Hono アプリケーションを設定します。

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// 国際化リクエスト ハンドラをロード
app.use("*", intlayer());

// ルート
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ja: "日本語で返されるコンテンツの例",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### 互換性

`hono-intlayer` は以下と完全に互換性があります。

- React アプリケーション向けの [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.js アプリケーション向けの [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Vite アプリケーション向けの [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)

また、ブラウザや API リクエストを含むさまざまな環境のあらゆる国際化ソリューションとシームレスに連携します。ヘッダーやクッキーを介してロケールを検出するようにミドルウェアをカスタマイズできます。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の構成オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

デフォルトでは、`hono-intlayer` は `Accept-Language` ヘッダーを解釈して、クライアントの優先言語を決定します。

> 構成や高度なトピックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

### TypeScript の設定

`hono-intlayer` は TypeScript の堅牢な機能を活用して、国際化プロセスを強化します。TypeScript の静的型付けにより、すべての翻訳キーが考慮され、翻訳漏れのリスクが軽減され、保守性が向上します。

![オートコンプリート](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成された型 (デフォルトは `./types/intlayer.d.ts`) が `tsconfig.json` ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 構成
  "include": [
    // ... 既存の TypeScript 構成
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### VS Code 拡張機能

Intlayer の開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します。

- 翻訳キーの**オートコンプリート**。
- 翻訳漏れの**リアルタイム エラー検出**。
- 翻訳されたコンテンツの**インライン プレビュー**。
- 翻訳を簡単に作成および更新するための**クイック アクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Git の設定

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに次の手順を追加します。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

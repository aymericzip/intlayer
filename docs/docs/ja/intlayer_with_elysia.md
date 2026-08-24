---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - アプリを翻訳するための完全ガイド"
description: "もう i18next は不要です。多言語 (i18n) Elysia アプリを構築するための 2026 年のガイド。AI エージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Elysia プラグインの初期化"
author: aymericzip
---

# Intlayerを使用してElysiaバックエンドWebサイトを多言語化する | 国際化 (i18n)

`elysia-intlayer`は、Elysiaアプリケーション向けの強力な国際化（i18n）プラグインで、クライアントの設定に基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルにアクセス可能にするように設計されています。

> GitHubでパッケージの実装を確認してください: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### 実践的なユースケース

- **ユーザーの言語でバックエンドエラーを表示**: エラーが発生した場合、ユーザーの母語でメッセージを表示することで、理解が向上し、フラストレーションが軽減されます。これは、トーストやモーダルのようなフロントエンドコンポーネントに表示される可能性がある動的なエラーメッセージに特に有用です。
- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、internationalizationにより、複数の言語でこのコンテンツを提供できることが保証されます。これは、ユーザーが好む言語で商品説明、記事、その他のコンテンツを表示する必要があるeコマースサイトやコンテンツ管理システムのようなプラットフォームにとって非常に重要です。
- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、または通知のいずれであっても、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。
- **多言語プッシュ通知**: モバイルアプリケーションの場合、ユーザーが好む言語でプッシュ通知を送信することで、インタラクションと保持を向上させることができます。このパーソナルなタッチにより、通知がより関連性が高く、実行可能なものに感じられます。
- **その他のコミュニケーション**: SMS メッセージ、システムアラート、ユーザーインターフェイスの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語で行われることで、明確性を確保し、全体的なユーザーエクスペリエンスを向上させることができます。

バックエンドをinternationalizationすることで、アプリケーションは文化的な違いを尊重するだけでなく、グローバルな市場ニーズにより適切に対応でき、サービスを世界規模で拡張するための重要なステップとなります。

## はじめに

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

[Application Template](https://github.com/aymericzip/intlayer-elysia-template) を GitHub で参照してください。

### インストール

`elysia-intlayer` の使用を開始するには、npm を使用してパッケージをインストールします:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` フラグはオプションです。AI エージェントの場合は `intlayer-cli init` を使用してください。

> このコマンドはあなたの環境を検出し、必要なパッケージをインストールします。例えば:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### セットアップ

プロジェクトルートに `intlayer.config.ts` を作成して、国際化設定を構成します:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します：

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ja: "英語で返されたコンテンツの例",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "ja": "英語で返されたコンテンツの例",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir`ディレクトリ（デフォルトでは`./src`）に含まれている限り、アプリケーション内のどこでも定義できます。そして、コンテンツ宣言ファイルの拡張子（デフォルトでは`.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### Elysia アプリケーションのセットアップ

`elysia-intlayer` を使用するように Elysia アプリケーションをセットアップします:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // 国際化プラグインを読み込む
  .use(intlayer())
  // ルート
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

プラグインはルートコンテキストに `intlayer` オブジェクトも注入します。スタンドアロンヘルパーの代わりに明示的な依存性が必要な場合は、これを使用してください:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // このリクエストに使用されるロケール。`Accept-Language` がネゴシエーションされるか、ストレージから読み取られます
  locale: intlayer.locale,
  greeting: intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> ルートコンテキストは `locale`、`defaultLocale`、`locale_storage` (クライアントによって明示的に設定されたロケール)、`locale_detected` (ヘッダーからネゴシエーションされたロケール)、`t`、`getIntlayer`、`getDictionary` を公開します。

### 互換性

`elysia-intlayer` は以下と完全に互換性があります:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)>) - React アプリケーション向け
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)>) - Next.js アプリケーション向け
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)>) - Vite アプリケーション向け

また、ブラウザや API リクエストを含むさまざまな環境で、あらゆる国際化ソリューションとシームレスに連携します。ヘッダーまたはクッキーを通じてロケールを検出するようにミドルウェアをカスタマイズできます:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... その他の設定オプション
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

デフォルトでは、`elysia-intlayer` は `Accept-Language` ヘッダーを解析してクライアントの優先言語を判定します。

> 設定と高度なトピックについて詳しく知るには、当社の[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

### TypeScript を設定する

`elysia-intlayer` は、国際化プロセスを強化するための TypeScript の堅牢な機能を活用しています。TypeScript の静的型付けにより、すべての翻訳キーが考慮され、欠落した翻訳のリスクが軽減され、保守性が向上します。

自動生成されたタイプ（デフォルトでは ./types/intlayer.d.ts）が tsconfig.json ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成されたタイプを含める
  ],
}
```

### VS Code Extension

Intlayer の開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します:

- **翻訳キーの自動補完**。
- **欠落している翻訳のリアルタイム エラー検出**。
- **翻訳されたコンテンツのインライン プレビュー**。
- **翻訳を簡単に作成および更新するためのクイック アクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code Extension ドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Git Configuration

Intlayerが生成するファイルを無視することをお勧めします。これにより、それらをGitリポジトリにコミットすることを回避できます。

これを行うには、`.gitignore`ファイルに以下の指示を追加できます：

```plaintext fileName=".gitignore"
# Intlayerが生成するファイルを無視
.intlayer
```

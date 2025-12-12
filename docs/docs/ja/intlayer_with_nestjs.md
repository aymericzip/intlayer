---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Nest backendアプリを翻訳する方法 – i18nガイド 2025
description: NestJSバックエンドを多言語対応にする方法を紹介します。国際化（i18n）と翻訳のためのドキュメントに従ってください。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - NestJS
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: 初版ドキュメント
---

# IntlayerでNest backendを翻訳する | 国際化（i18n）

`express-intlayer` は、Expressアプリケーション向けの強力な国際化（i18n）ミドルウェアであり、クライアントの好みに基づいたローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルに利用可能にすることを目的としています。NestJSはExpressの上に構築されているため、`express-intlayer` をNestJSアプリケーションにシームレスに統合し、多言語コンテンツを効果的に扱うことができます。

## なぜバックエンドを国際化するのか？

バックエンドを国際化することは、グローバルなユーザーに効果的にサービスを提供するために不可欠です。これにより、アプリケーションは各ユーザーの好みの言語でコンテンツやメッセージを配信できるようになります。この機能はユーザー体験を向上させ、異なる言語背景を持つ人々にとってよりアクセスしやすく、関連性の高いものにすることで、アプリケーションのリーチを広げます。

### 実用的なユースケース

- **ユーザーの言語でバックエンドエラーを表示する**: エラーが発生した際に、ユーザーの母国語でメッセージを表示することで理解が深まり、フラストレーションが軽減されます。これは特に、トーストやモーダルのようなフロントエンドコンポーネントで表示される動的なエラーメッセージに有効です。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションでは、国際化により複数の言語でコンテンツを提供できるようになります。これは、ユーザーが好む言語で商品説明や記事、その他のコンテンツを表示する必要があるeコマースサイトやコンテンツ管理システムのようなプラットフォームにとって非常に重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に向上させることができます。

- **多言語プッシュ通知**: モバイルアプリケーションでは、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションとリテンションを強化できます。このパーソナルな対応により、通知がより関連性が高く、行動を促すものに感じられます。

- **その他のコミュニケーション**: SMSメッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形態のコミュニケーションは、ユーザーの言語で行うことで明確さが増し、全体的なユーザー体験を向上させます。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合し、サービスを世界規模で拡大するための重要なステップとなります。

## はじめに

### 新しい NestJS プロジェクトの作成

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### インストール

`express-intlayer` を使い始めるには、npm を使ってパッケージをインストールします。

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### tsconfig.json の設定

TypeScriptでIntlayerを使用するには、`tsconfig.json`がESモジュールをサポートするように設定されていることを確認してください。これは、`module`と`moduleResolution`のオプションを`nodenext`に設定することで実現できます。

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... その他のオプション
  },
}
```

### セットアップ

プロジェクトのルートに`intlayer.config.ts`を作成して、国際化設定を構成します。

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### コンテンツの宣言

翻訳を格納するためのコンテンツ宣言を作成および管理します:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトは `./src`）に含まれている限り、アプリケーションのどこにでも定義できます。また、コンテンツ宣言ファイルの拡張子（デフォルトは `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）に一致している必要があります。

> 詳細については、[コンテンツ宣言のドキュメント](/doc/concept/content)を参照してください。

### Express ミドルウェアのセットアップ

`express-intlayer` ミドルウェアを NestJS アプリケーションに統合して、国際化を処理します：

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // 全てのルートに適用
  }
}
```

### サービスまたはコントローラーで翻訳を使用する

これで、`getIntlayer` 関数を使用してサービスやコントローラー内で翻訳にアクセスできます：

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // 翻訳された挨拶を取得
  }
}
```

### 互換性

`express-intlayer` は以下と完全に互換性があります：

- Reactアプリケーション向けの [`react-intlayer`](/doc/packages/react-intlayer)
- Next.jsアプリケーション向けの [`next-intlayer`](/doc/packages/next-intlayer)
- Viteアプリケーション向けの [`vite-intlayer`](/doc/packages/vite-intlayer)

また、ブラウザやAPIリクエストを含む様々な環境での国際化ソリューションともシームレスに連携します。ミドルウェアをカスタマイズして、ヘッダーやクッキーを通じてロケールを検出することも可能です：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

デフォルトでは、`express-intlayer` は `Accept-Language` ヘッダーを解釈してクライアントの優先言語を判別します。

> 設定や高度なトピックの詳細については、[ドキュメント](/doc/concept/configuration)をご覧ください。

### TypeScriptの設定

`express-intlayer` は、国際化プロセスを強化するために TypeScript の強力な機能を活用しています。TypeScript の静的型付けにより、すべての翻訳キーが確実に管理され、翻訳漏れのリスクを減らし、保守性を向上させます。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成される型定義ファイル（デフォルトでは ./types/intlayer.d.ts）が tsconfig.json ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  include: [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型定義を含める
  ],
}
```

### VS Code 拡張機能

Intlayerでの開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能** をインストールできます。

[VS Code Marketplaceからインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します：

- 翻訳キーの **オートコンプリート**。
- 欠落している翻訳の **リアルタイムエラー検出**。
- 翻訳された内容の **インラインプレビュー**。
- 翻訳の作成や更新を簡単に行うための **クイックアクション**。

拡張機能の使い方の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

### Git 設定

Intlayerによって生成されたファイルは無視することを推奨します。これにより、Gitリポジトリへのコミットを避けることができます。

これを行うには、以下の指示を `.gitignore` ファイルに追加してください。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

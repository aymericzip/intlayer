---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - AdonisJS アプリを翻訳する方法 – ガイド 2026
description: AdonisJS バックエンドを多言語化する方法をご紹介します。ドキュメントに従って国際化 (i18n) と翻訳を行いましょう。
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - AdonisJS
  - JavaScript
  - バックエンド
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: 履歴の初期化
---

# Intlayer を使用して AdonisJS バックエンドウェブサイトを翻訳する | 国際化 (i18n)

`adonis-intlayer` は、AdonisJS アプリケーション向けの強力な国際化 (i18n) パッケージであり、クライアントの好みに基づいてローカライズされたレスポンスを提供することで、バックエンドサービスをグローバルにアクセス可能にするように設計されています。

### 実用的なユースケース

- **ユーザーの言語でのバックエンドエラーの表示**: エラーが発生した際、ユーザーの母国語でメッセージを表示することで、理解が深まり、フラストレーションを軽減できます。これは、トーストやモーダルなどのフロントエンドコンポーネントに表示される可能性のある動的なエラーメッセージに特に役立ちます。

- **多言語コンテンツの取得**: データベースからコンテンツを取得するアプリケーションの場合、国際化によって、このコンテンツを複数の言語で提供できるようになります。これは、製品説明や記事、その他のコンテンツをユーザーが好む言語で表示する必要がある e コマースサイトやコンテンツ管理システムなどのプラットフォームにとって非常に重要です。

- **多言語メールの送信**: トランザクションメール、マーケティングキャンペーン、通知など、受信者の言語でメールを送信することで、エンゲージメントと効果を大幅に高めることができます。

- **多言語プッシュ通知**: モバイルアプリケーションの場合、ユーザーの好みの言語でプッシュ通知を送信することで、インタラクションと継続率を高めることができます。このパーソナライズされたアプローチにより、通知がより関連性が高く、実行しやすいものに感じられます。

- **その他のコミュニケーション**: SMS メッセージ、システムアラート、ユーザーインターフェースの更新など、バックエンドからのあらゆる形式のコミュニケーションは、ユーザーの言語であることでメリットを得られ、明快さを確保し、全体的なユーザーエクスペリエンスを向上させます。

バックエンドを国際化することで、アプリケーションは文化的な違いを尊重するだけでなく、グローバル市場のニーズにより適合し、サービスを世界規模で拡大するための重要なステップとなります。

## はじめる

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### インストール

`adonis-intlayer` の使用を開始するには、npm を使用してパッケージをインストールします。

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### コンテンツの宣言

翻訳を保存するためのコンテンツ宣言を作成および管理します。

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ja: "日本語で返されるコンテンツの例",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ja: "日本語で返されるコンテンツの例",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ja: "日本語で返されるコンテンツの例",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "ja": "日本語で返されるコンテンツの例",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> コンテンツ宣言は、`contentDir` ディレクトリ（デフォルトでは `./src` または `./app`）に含まれており、コンテンツ宣言のファイル拡張子（デフォルトでは `.content.{json,ts,tsx,js,jsx,mjs,cjs}`）に一致する限り、アプリケーションのどこにでも定義できます。

> 詳細については、[コンテンツ宣言のドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

### AdonisJS アプリケーションの設定

`adonis-intlayer` を使用するように AdonisJS アプリケーションをセットアップします。

#### ミドルウェアの登録

まず、アプリケーションに `intlayer` ミドルウェアを登録する必要があります。

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### ルートの定義

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    ja: "日本語で返されるコンテンツの例",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### 関数

`adonis-intlayer` は、アプリケーションでの国際化を処理するためにいくつかの関数をエクスポートします。

- `t(content, locale?)`: 基本的な翻訳関数。
- `getIntlayer(key, locale?)`: 辞書からキーによってコンテンツを取得します。
- `getDictionary(dictionary, locale?)`: 特定の辞書オブジェクトからコンテンツを取得します。
- `getLocale()`: リクエストコンテキストから現在のロケールを取得します。

#### コントローラーでの使用

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        ja: "コントローラーからのこんにちは",
      })
    );
  }
}
```

### 互換性

`adonis-intlayer` は、以下と完全に互換性があります。

- React アプリケーション向けの [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/react-intlayer/index.md)
- Next.js アプリケーション向けの [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/next-intlayer/index.md)
- Vite アプリケーション向けの [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/vite-intlayer/index.md)

また、ブラウザや API リクエストを含む、さまざまな環境にわたるあらゆる国際化ソリューションとシームレスに連携します。ヘッダーやクッキーを介してロケールを検出するようにミドルウェアをカスタマイズできます。

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

デフォルトでは、`adonis-intlayer` は `Accept-Language` ヘッダーを解釈して、クライアントの優先言語を決定します。

> 設定や高度なトピックの詳細については、[ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)をご覧ください。

### TypeScript の設定

`adonis-intlayer` は、TypeScript の強力な機能を活用して国際化プロセスを強化します。TypeScript の静的型付けにより、すべての翻訳キーが考慮され、翻訳の漏れのリスクが軽減され、保守性が向上します。

![補完](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻訳エラー](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

自動生成された型（デフォルトでは ./types/intlayer.d.ts）が tsconfig.json ファイルに含まれていることを確認してください。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### VS Code 拡張機能

Intlayer での開発体験を向上させるために、公式の **Intlayer VS Code 拡張機能**をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

この拡張機能は以下を提供します。

- 翻訳キーの**自動補完**。
- 翻訳漏れの**リアルタイムエラー検出**。
- 翻訳されたコンテンツの**インラインプレビュー**。
- 翻訳を簡単に作成・更新するための**クイックアクション**。

拡張機能の使用方法の詳細については、[Intlayer VS Code 拡張機能のドキュメント](https://intlayer.org/ja/doc/vs-code-extension)を参照してください。

### Git の設定

Intlayer によって生成されたファイルを無視することをお勧めします。これにより、それらを Git リポジトリにコミットすることを避けることができます。

これを行うには、`.gitignore` ファイルに以下の指示を追加します。

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視する
.intlayer
```

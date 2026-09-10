---
createdAt: 2026-09-09
updatedAt: 2026-09-09
title: "Remix 3 i18n - アプリを多言語化するための完全ガイド"
description: "もう i18next は不要です。2026 年版、多言語 (i18n) Remix 3 アプリ構築ガイド。AI エージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - 国際化
  - ドキュメント
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - Web 標準
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "Remix 3 用の初期ドキュメント"
author: aymericzip
---

# Intlayer を使用して Remix 3 Web サイトを翻訳する | 国際化 (i18n)

このガイドでは、**Remix 3** アプリケーションにおいて **Intlayer** を統合し、ロケール対応ルーティング、型安全なコンテンツ宣言、安全な HTML テンプレート、ならびに Node.js、Bun、Deno、Cloudflare Workers にわたるクロスランタイムサポートを備えたシームレスな国際化を実現する方法を解説します。

## Remix 3 とは？

**Remix 3** は、**完全に Web 標準に基づいて構築された、コンポーザブルでランタイムに依存しない Web フレームワーク**への根本的なアーキテクチャ刷新を表しています。特定のバンドラーや独自のサーバー API に依存することなく、単一目的のコンポーザブルなパッケージとして提供されます。

- **`remix/fetch-router`** (または `remix/router`): Fetch API (`Request` および `Response`) に基づく軽量で標準準拠のルーティング。
- **`remix/html-template`**: 自動 XSS 保護とフラグメント構成を備えた安全な HTML テンプレートリテラル。
- **`remix/response/html`**: 標準的な HTTP セマンティクスで HTML を配信するレスポンスヘルパー。
- **`remix/node-fetch-server`**: Bun、Deno、およびエッジランタイムをネイティブサポートする Node.js 用サーバーアダプター。
- **`remix/cookie`**: 暗号学的に安全な Cookie の解析とシリアル化。

**Intlayer** と組み合わせることで、コンパイル時安全性、自動 AI 翻訳、オーバーヘッドのないサーバーレンダリング、および滑らかなロケールルーティングを提供する完全な国際化システムが手に入ります。

## 目次

<TOC/>

## 他の選択肢ではなく Intlayer を選ぶ理由

`i18next` や独自の翻訳ローダーなどの従来手法と比較して、Intlayer は現代の Web アーキテクチャに最適化された統合的な開発体験を提供します。

<AccordionGroup>
<Accordion header="Remix 3 と Web 標準の完全なサポート">

Intlayer は Web 標準 (`Request`、`Response`、`Headers`、`URL`) とシームレスに連携するように設計されています。軽量なミドルウェアを介して Remix 3 の Fetch ルーターに簡単に統合され、特定のランタイムに縛られることなく URL パス、Cookie、または `Accept-Language` ヘッダーからロケールを抽出します。

</Accordion>
<Accordion header="型安全なコンテンツ宣言">

曖昧な JSON キーや実行時のキー不足によるクラッシュとはお別れです。Intlayer は宣言されたすべての言語で TypeScript チェックを適用し、翻訳が欠落または無効な場合はビルド時に警告を発します。

</Accordion>
<Accordion header="サーバー上でのバンドルオーバーヘッドゼロ">

Remix 3 のサーバーレンダリング HTML テンプレート (`remix/html-template`) を使用する場合、リクエストされたロケールに対して解決されたテキストのみが出力ストリームに書き込まれます。明示的に要求されない限り、クライアントハイドレーションバンドルや重い翻訳カタログは一切不要です。

</Accordion>
<Accordion header="AI エージェントと自動化に対応">

Intlayer はコンテンツ宣言 (`.content.ts`) をルートロジックと同じ場所に配置し、大規模言語モデル (LLM) に必要なトークンコンテキストを削減します。`intlayer fill` や `intlayer test` などの組み込み CLI コマンドにより、選択した AI プロバイダーの実費のみで CI/CD パイプラインでの翻訳自動化が可能です。

</Accordion>
<Accordion header="ビジュアルエディターと CMS 統合">

コードファーストのワークフローだけでなく、Intlayer はセルフホスト可能な [ビジュアルエディター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_visual_editor.md) と [リモート CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) を提供し、開発者以外の編集者や翻訳者がコードを再デプロイすることなく文言を更新できるようにします。

</Accordion>
</AccordionGroup>

## ステップバイステップガイド

<Tabs defaultTab="code">
  <Tab label="コード" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer を使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="デモ" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo Intlayer Remix 3 テンプレート"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub の [アプリケーションテンプレート](https://github.com/aymericzip/intlayer-remix-3-template) をご覧ください。

<Steps>
<Step number={1} title="依存関係のインストール">

お好みのパッケージマネージャーを使用して `intlayer` と `remix` (バージョン 3) をインストールします。

```bash packageManager="npm"
npm install intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix@next
```

- **`intlayer`**: 設定管理、辞書宣言 (`t()`, `Dictionary`)、CLI ツール、およびランタイムインタープリターを提供するコア国際化エンジン。
- **`remix`**: `remix/router`、`remix/routes`、`remix/html-template`、および `remix/node-fetch-server` をエクスポートする統合 Remix 3 フレームワークパッケージ。

</Step>
<Step number={2} title="Intlayer の設定">

プロジェクトのルートに `intlayer.config.ts` を作成し、サポートする言語と国際化設定を宣言します。

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.JAPANESE,
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
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.JAPANESE,
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
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.JAPANESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> その他の設定オプションについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md) を参照してください。

</Step>
<Step number={3} title="多言語コンテンツの宣言">

`.content.ts` ファイルでローカライズされたコンテンツを宣言します。

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      ja: "Remix 3 へようこそ",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      ja: "ネイティブ i18n 機能を備えた Web 標準準拠のコンポーザブルアプリケーション。",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      ja: "言語を切り替える:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> Intlayer は JSON、YAML、および CommonJS 形式もサポートしています。[コンテンツ宣言ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md) をご覧ください。

</Step>
<Step number={4} title="Intlayer 辞書のビルド">

辞書定義をコンパイルして TypeScript の型とランタイムレジストリを生成します。

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="pnpm"
pnpm dlx intlayer build
```

```bash packageManager="yarn"
yarn dlx intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

これにより、コンテンツが `.intlayer` アーティファクトディレクトリにコンパイルされ、TypeScript による完全な自動補完と高速な辞書参照が可能になります。

</Step>
<Step number={5} title="Intlayer ミドルウェアの実装">

Remix 3 は `createRouter({ middleware: [...] })` を通じてコンポーザブルなミドルウェアパイプラインを提供します。

以下の優先順位に従って受信リクエストのロケールを解決する Intlayer ミドルウェアを作成します。

1. Intlayer の `getLocaleFromPath` による URL パスプレフィックス (例: `/ja` または `/fr`)。
2. ストレージ Cookie (`INTLAYER_LOCALE`)、カスタムヘッダー (`x-intlayer-locale`)、標準の `Accept-Language` ヘッダー、および `defaultLocale` を自動ネゴシエーションする Intlayer の `getLocale` ヘルパー。

```typescript fileName="src/middleware/intlayer.ts" codeFormat={["typescript", "esm"]}
import {
  defaultLocale,
  getCookie,
  getLocale,
  getLocaleFromPath,
  type Locale,
} from "intlayer";
import { createContextKey, type Middleware } from "remix/router";

/**
 * Remix 3 RequestContext から解決されたロケールを取得するための型安全なコンテキストキー。
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * Remix 3 用 Intlayer ミドルウェア。
 *
 * 次の優先順位でリクエストロケールを解決します:
 * 1. `getLocaleFromPath` を使用した URL パスプレフィックス (例: `/ja/...`)
 * 2. `getLocale` を使用したヘッダーおよびストレージのネゴシエーション (Cookie、カスタムヘッダー、Accept-Language、フォールバック defaultLocale)
 *
 * 解決されたロケールを Remix 3 RequestContext に付加します。
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // パス検出 (/ja/about -> "ja", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // 解決されたロケールを Remix 3 リクエストコンテキストに設定
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // 解決されたロケールを Remix 3 リクエストコンテキストに設定
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="型安全なルートの定義">

`remix/routes` の `route()` を使用してアプリケーションルートを定義します。

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // デフォルトロケールルート
  home: "/",

  // 動的な :locale セグメントを持つローカライズルート
  localizedHome: "/:locale",
});
```

`route()` を使用することで、アプリケーション全体で型安全な URL 生成が可能になります。

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "ja" }); // "/ja"
```

</Step>
<Step number={7} title="ローカライズされた HTML テンプレートのレンダリング">

Remix 3 は安全で自動エスケープされた HTML 生成のために `remix/html-template` を使用します。`getIntlayer` でローカライズされた辞書を取得し、`<html lang="..." dir="...">` 属性を設定し、言語スイッチャーを表示するビュー関数を作成します。

```typescript fileName="src/views/home.ts" codeFormat={["typescript", "esm"]}
import { html, type SafeHtml } from "remix/html-template";
import {
  getIntlayer,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import { routes } from "../routes";

export const renderHomePage = (locale: Locale): SafeHtml => {
  const home = getIntlayer("home", locale);

  return html`
    <!doctype html>
    <html lang="${locale}" dir="${getHTMLTextDir(locale)}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${home.title}</title>
      </head>
      <body>
        <header>
          <nav aria-label="Languages">
            <span>${home.switchLanguage}</span>
            ${locales.map((loc) => {
              const href = getLocalizedPath(routes.home.href(), loc);
              const isActive = loc === locale;
              return html`
                <a
                  href="${href}"
                  class="${isActive ? "active" : ""}"
                  aria-current="${isActive ? "true" : "false"}"
                >
                  ${getLocaleName(loc, locale)}
                </a>
              `;
            })}
          </nav>
        </header>
        <main>
          <h1>${home.title}</h1>
          <p>${home.description}</p>
        </main>
      </body>
    </html>
  `;
};
```

</Step>
<Step number={8} title="サーバーアプリケーションの接続">

`src/server.ts` でルーター、ミドルウェア、およびルートアクションを結び付けます。

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. Intlayer ミドルウェアを使用してルーターを初期化
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. ルートハンドラーをマッピング
router.map(routes, {
  actions: {
    // デフォルトロケールルート
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // ローカライズルート
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. サーバーの起動
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);
});

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="翻訳の監査と自動補完">

Intlayer は不足している翻訳を監査し、AI を使用して自動補完するための CLI を提供します。

```bash packageManager="npm"
# 不足している翻訳を監査
npx intlayer test

# AI を使用して不足している翻訳を自動補完
npx intlayer fill
```

```bash packageManager="pnpm"
# 不足している翻訳を監査
pnpm dlx intlayer test

# AI を使用して不足している翻訳を自動補完
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# 不足している翻訳を監査
yarn dlx intlayer test

# AI を使用して不足している翻訳を自動補完
yarn dlx intlayer fill
```

```bash packageManager="bun"
# 不足している翻訳を監査
bun x intlayer test

# AI を使用して不足している翻訳を自動補完
bun x intlayer fill
```

</Step>
</Steps>

## TypeScript 設定

`tsconfig.json` に生成された `.intlayer` の型が含まれていることを確認してください。

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

## 結論

Remix 3 と Intlayer を組み合わせることで、オープンな Web 標準に準拠した、スリムで完全に型付けされたポータブルな技術スタックを構築できます。シンプルなローカライズマーケティングページから、エッジでレンダリングされるグローバル分散サービスまで、柔軟にスケールさせることができます。

---
createdAt: 2026-09-09
updatedAt: 2026-09-11
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

このガイドでは、**Remix 3** アプリケーションにおいて **Intlayer** を統合し、ロケール対応ルーティング、型安全なコンテンツ宣言、サーバーレンダリング対応の JSX コンポーネント、ならびに Node.js、Bun、Deno、Cloudflare Workers にわたるクロスランタイムサポートを備えたシームレスな国際化を実現する方法を解説します。

## Remix 3 とは？

**Remix 3** は、**完全に Web 標準に基づいて構築された、コンポーザブルでランタイムに依存しない Web フレームワーク**への根本的なアーキテクチャ刷新を表しています。特定のバンドラーや独自のサーバー API に依存することなく、単一目的のコンポーザブルなパッケージとして提供されます。

- **`remix/fetch-router`** (または `remix/router`): Fetch API (`Request` および `Response`) に基づく軽量で標準準拠のルーティング。
- **`remix/ui`**: JSX コンポーネントモデル (`jsxImportSource: "remix/ui"`)。コンポーネントは Handle を受け取りレンダー関数を返すセットアップ関数であり、React に似ていますが状態はプレーンな JavaScript クロージャ内に保持されます。
- **`remix/middleware/render`**: 各リクエストに `context.render(<Page />)` を登録し、JSX ツリーを HTML `Response` としてストリーミングします。
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

Remix 3 はサーバー上で JSX コンポーネントをレンダリングし、HTML をクライアントへストリーミングします。リクエストされたロケールに対して解決されたテキストのみが出力ストリームに書き込まれます。コンポーネントが明示的に `clientEntry` としてマークされていない限り、クライアントハイドレーションバンドルや重い翻訳カタログは一切不要です。

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
- **`remix`**: `remix/router`、`remix/routes`、`remix/ui`、`remix/middleware/render`、および `remix/node-fetch-server` をエクスポートする統合 Remix 3 フレームワークパッケージ。

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
<Step number={7} title="JSX を使用したローカライズページのレンダリング">

Remix 3 は `remix/ui` の JSX コンポーネントを使用して UI をレンダリングします。コンポーネントは `Handle` を受け取り**レンダー関数**を返す**セットアップ関数**です。セットアップはインスタンスごとに 1 回だけ実行され、レンダリングは更新ごとに実行され、props は `handle.props` を介して読み取られます。

まず、解決されたロケールから `<html lang="..." dir="...">` 属性を設定する共有 `Document` シェルを作成します。

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, type Locale } from "intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  locale: Locale;
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { locale, title, children } = handle.props;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
```

次にホームページを作成します。`getIntlayer` でローカライズされた辞書を取得し、言語スイッチャーを表示します。

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import {
  getIntlayer,
  getLocaleName,
  getLocalizedPath,
  type Locale,
  locales,
} from "intlayer";
import type { Handle } from "remix/ui";
import { routes } from "../routes";
import { Document } from "./document";

type HomePageProps = {
  locale: Locale;
};

export const HomePage = (handle: Handle<HomePageProps>) => () => {
  const { locale } = handle.props;
  const home = getIntlayer("home", locale);

  return (
    <Document locale={locale} title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          {locales.map((targetLocale) => {
            const isActive = targetLocale === locale;

            return (
              <a
                key={targetLocale}
                href={getLocalizedPath(routes.home.href(), targetLocale)}
                class={isActive ? "active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {getLocaleName(targetLocale, locale)}
              </a>
            );
          })}
        </nav>
      </header>
      <main>
        <h1>{home.title}</h1>
        <p>{home.description}</p>
      </main>
    </Document>
  );
};
```

> Remix JSX は React ではありません。フックはなく、`class` はそのまま記述し (`className` も利用可能)、再レンダリングは `handle.update()` で明示的にトリガーします。展開された値は自動的にエスケープされます。

</Step>
<Step number={8} title="ルーターとサーバーの接続">

Intlayer ミドルウェアの横に `remix/middleware/render` の `render()` ミドルウェアを追加します。各リクエストに `context.render(node, init)` が組み込まれ、JSX ツリーを HTML `Response` にストリーミングします (先頭に `<!DOCTYPE html>` を付加し、`Content-Type` ヘッダーを設定します)。

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Intlayer + render ミドルウェアでルーターを初期化
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. ルートハンドラーをマッピング
router.map(routes, {
  actions: {
    // デフォルトロケールルート
    home(context) {
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },

    // ローカライズルート
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return context.render(<HomePage locale={locale} />);
    },
  },
});
```

> `context.render` は第 2 引数としてオプションの `ResponseInit` を受け取ります (例: `context.render(<NotFoundPage locale={locale} />, { status: 404 })`)。

最後に、標準の `fetch` ハンドラーを介してルーターを公開します。同じルーターが Node.js、Bun、Deno、および Cloudflare Workers 上で動作します。

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";
import { router } from "./router";

const PORT = Number(process.env.PORT || 3000);

// Node.js
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);
});

// Bun / Deno / Cloudflare Workers
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

JSX を `remix/ui` ランタイムに向け、`tsconfig.json` に生成された `.intlayer` の型が含まれていることを確認してください。

```json fileName="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ESNext",
    "jsx": "react-jsx",
    "jsxImportSource": "remix/ui",
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["src/**/*", ".intlayer/**/*.ts"]
}
```

> `jsxImportSource: "remix/ui"` により、`<HomePage />` は React ではなく Remix の `createElement` に解決されます。

## 結論

Remix 3 と Intlayer を組み合わせることで、オープンな Web 標準に準拠した、スリムで完全に型付けされたポータブルな技術スタックを構築できます。シンプルなローカライズマーケティングページから、エッジでレンダリングされるグローバル分散サービスまで、柔軟にスケールさせることができます。

---
createdAt: 2026-09-09
updatedAt: 2026-09-21
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
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer ミドルウェアとフックの使用"
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

**Intlayer** と **`remix-intlayer`** パッケージ（ロケールミドルウェアおよび Remix リクエストコンテキストにバインドされた `react-intlayer` と同じ `useIntlayer` / `useDictionary` / `useLocale` フック）を組み合わせることで、コンパイル時の安全性、AI による自動翻訳、オーバーヘッドのないサーバーレンダリング、シームレスなロケールルーティングを提供する完全な国際化システムが実現します。

## 目次

<TOC/>

## 他の選択肢ではなく Intlayer を選ぶ理由

`i18next` や独自の翻訳ローダーなどの従来手法と比較して、Intlayer は現代の Web アーキテクチャに最適化された統合的な開発体験を提供します。

<AccordionGroup>
<Accordion header="Remix 3 と Web 標準の完全なサポート">

Intlayer はウェブ標準（`Request`、`Response`、`Headers`、`URL`）とシームレスに連携するように構築されています。`remix-intlayer` は軽量なミドルウェアとして Remix 3 の Fetch ルーターに組み込まれ、URL パス、Cookie、または `Accept-Language` ヘッダーからロケールを抽出し、引数として引き回すことなく、ハンドラー、ビュー、`remix/ui` コンポーネントなどのリクエスト全体に公開します。

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

お好みのパッケージマネージャーを使用して、`intlayer`、`remix-intlayer`、および `remix`（バージョン 3）をインストールします:

```bash packageManager="npm"
npm install intlayer remix-intlayer remix@next
```

```bash packageManager="pnpm"
pnpm add intlayer remix-intlayer remix@next
```

```bash packageManager="yarn"
yarn add intlayer remix-intlayer remix@next
```

```bash packageManager="bun"
bun add intlayer remix-intlayer remix@next
```

- **`intlayer`**: 設定管理、辞書宣言 (`t()`, `Dictionary`)、CLI ツール、およびランタイムインタープリターを提供するコア国際化エンジン。
- **`remix-intlayer`**: Remix 3 統合: 各リクエストのロケールを解決する `intlayer()` ルーターミドルウェア、およびそれ以降の任意の場所で読み取る `useIntlayer`、`useDictionary`、`useLocale` フック。
- **`remix`**: `remix/router`、`remix/routes`、`remix/ui`、`remix/middleware/render`、および `remix/node-fetch-server` をエクスポートする統合 Remix 3 フレームワークパッケージ。

</Step>
<Step number={2} title="Intlayer の設定">

### アーキテクチャ

このアーキテクチャでは、`remix-intlayer` の `intlayer()` ミドルウェアが `render()` ミドルウェアの前に `createRouter()` に登録されます。ルーターがマッチングする前にロケールプレフィックスを削除するため、ルートは `:locale` セグメントなしで `src/routes.ts` に一度だけ宣言され、リクエストの残りの部分を `AsyncLocalStorage` スコープ内で実行します。これにより、ルートハンドラーや `remix/ui` ビューで引数なしで `useIntlayer` / `useLocale` がロケールを読み取れるようになります。コンテンツ宣言は `src/` 内のビューと一緒に配置されます：

```bash
.
├── src
│   ├── home.content.ts               # Home page content declaration
│   ├── router.tsx                    # createRouter() with the intlayer() and render() middleware
│   ├── routes.ts                     # Type-safe routes, declared once without locale segment
│   ├── server.ts                     # fetch handler (Node.js, Bun, Deno, Cloudflare Workers)
│   └── views
│       ├── document.tsx              # HTML shell setting <html lang dir> from the locale
│       └── home.tsx                  # Localized page using useIntlayer / useLocale
├── intlayer.config.ts
├── package.json
└── tsconfig.json
```

### 設定

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
<Step number={5} title="Intlayer ミドルウェアの追加">

Remix 3 は、`createRouter({ middleware: [...] })` を介して構成可能なミドルウェアパイプラインを提供します。

`remix-intlayer` は `intlayer()` ミドルウェアを提供します。受信するリクエストごとに、以下を使用してロケールを解決します:

1. `no-prefix` 以外のすべてのルーティングモードにおける URL: パスプレフィックス（例: `/ja` または `/en`）または `?locale=` 検索パラメータ。
2. クライアントによって永続化されたロケール: ストレージ Cookie（`INTLAYER_LOCALE`）またはカスタムヘッダー（`x-intlayer-locale`）。
3. 標準の `Accept-Language` ネゴシエーション（設定された `defaultLocale` へのフォールバック）。

結果は `locale`、`defaultLocale`、`availableLocales` とともに Remix リクエストコンテキストに `context.intlayer`（または `context.get(Intlayer)`）として保存されます。ミドルウェアはその後、そのコンテキストにバインドされた `AsyncLocalStorage` スコープ内でリクエストの残りを実行します。これにより、パッケージのフックはルートハンドラー、ビュー、`remix/ui` コンポーネントのいずれでも引数なしでロケールを読み取ることができます:

```typescript
import { useIntlayer, useLocale } from "remix-intlayer";

// ミドルウェア以降の任意の場所
const { locale, availableLocales } = useLocale();
const { title } = useIntlayer("home");
```

`useIntlayer("home", "fr")` または `useIntlayer("faq", { item: 2 })` は1回の呼び出しでリクエストロケールを上書きし、`useDictionary(homeContent)` はキーの代わりにインポートされた辞書を読み取ります。リクエスト外ではフックはデフォルトロケールにフォールバックします。

> ミドルウェアはサーバー起動時に Intlayer 辞書も準備するため、`intlayer build` が実行されていなくてもレジストリが空になることはありません。

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

ミドルウェアによって解決されたロケールから `<html lang="..." dir="...">` 属性を設定する共有 `Document` シェルから始めます:

```tsx fileName="src/views/document.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "remix-intlayer";
import type { Handle, RemixNode } from "remix/ui";

type DocumentProps = {
  title: string;
  children?: RemixNode;
};

export const Document = (handle: Handle<DocumentProps>) => () => {
  const { title, children } = handle.props;
  const { locale } = useLocale();

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

次にホームページを作成します。`useIntlayer` でローカライズされた辞書を読み取り、言語スイッチャーをレンダリングします:

```tsx fileName="src/views/home.tsx" codeFormat={["typescript", "esm"]}
import { getLocaleName, getLocalizedUrl, getPathWithoutLocale } from "intlayer";
import { useIntlayer, useLocale } from "remix-intlayer";
import { Document } from "./document";

export const HomePage = () => () => {
  const { locale, availableLocales } = useLocale();
  const home = useIntlayer("home");
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <Document title={home.title}>
      <header>
        <nav aria-label="Languages">
          <span>{home.switchLanguage}</span>
          <ul>
            {availableLocales.map((localeItem) => {
              const isActive = localeItem === locale;

              return (
                <li key={localeItem} class="p-1">
                  <a
                    href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                    class={isActive ? "active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {getLocaleName(localeItem, locale)}
                  </a>
                </li>
              );
            })}
          </ul>
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

> Remix JSX は React ではありません: `class` はそのまま記述され（`className` も使用可能）、再レンダリングは `handle.update()` で明示的にトリガーされます。補間された値は自動的にエスケープされます。Intlayer フックはリクエストスコープを読み取るプレーンな関数であるため、セットアップ関数またはレンダリング関数のどちらからでも呼び出すことができます。

</Step>
<Step number={8} title="ルーターとサーバーの接続">

Intlayer ミドルウェアの横に `remix/middleware/render` の `render()` ミドルウェアを追加します。各リクエストに `context.render(node, init)` が組み込まれ、JSX ツリーを HTML `Response` にストリーミングします (先頭に `<!DOCTYPE html>` を付加し、`Content-Type` ヘッダーを設定します)。

```tsx fileName="src/router.tsx" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";
import { intlayer } from "remix-intlayer";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { routes } from "./routes";
import { HomePage } from "./views/home";

// 1. Initialize router with Intlayer + render middleware
export const router = createRouter({
  middleware: [intlayer(), render()],
});

// 2. Map route handlers
router.map(routes, {
  actions: {
    // Default locale route
    home(context) {
      return context.render(<HomePage />);
    },

    // Localized route
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      return context.render(<HomePage />);
    },
  },
});
```

> `context.render` は第2引数としてオプションの `ResponseInit` を受け入れます（例: `context.render(<NotFoundPage />, { status: 404 })`）。解決されたロケールは、`Response.json` ペイロードを作成する場合などに、ハンドラーから `context.intlayer.locale` としてアクセスできます。

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

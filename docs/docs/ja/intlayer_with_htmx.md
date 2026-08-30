---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - アプリを翻訳するための完全ガイド"
description: "i18nextはもう不要。2026年の多言語（i18n）htmxアプリ構築ガイド。AIエージェントで翻訳し、バンドルサイズ、SEO、パフォーマンスを最適化します。"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - htmx
  - Hypermedia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - htmx
history:
  - version: 9.4.1
    date: 2026-08-29
    changes: "Initial history"
author: aymericzip
---

# Intlayerを使用してhtmxアプリケーションを翻訳する | 国際化（i18n）

htmxはそれ自体のコンテンツをレンダリングしません。訪問者が読むすべてのラベルはサーバーが生成したHTMLであり、すべてのスワップは別のHTTPリクエストです。したがって、htmxアプリの国際化はサーバーの関心事です。ロケールは各リクエストで解決される必要があり、各フラグメントはそのロケールでレンダリングされる必要があります。

Intlayerはバックエンド統合を通じてこれをカバーし、リクエストごとにロケールを検出し、HTMLを構築するハンドラーに対して宣言されたコンテンツを公開します。

## 目次

<TOC/>

## htmxアプリでのi18nの3つのルール

<AccordionGroup>

<Accordion header="ロケールは最初のリクエストだけではなく、すべてのリクエストで解決される必要があります">

A single page can trigger dozens of swaps. Each one is a fresh request with no memory of the page that issued it. If the locale lives in a variable set during the initial render, every fragment after it falls back to the default language.

The Intlayer middleware resolves the locale from the request itself, so a fragment served at minute ten answers in the same language as the page served at minute zero.

</Accordion>

<Accordion header="ロケールはリクエストと共に移動する必要があります">

Two carriers work with htmx. A cookie (`INTLAYER_LOCALE`) is sent by the browser automatically on every request, including htmx ones. A header (`x-intlayer-locale`) can be attached to htmx requests with the `hx-headers` attribute. Both are read by default.

</Accordion>

<Accordion header="交換されたHTMLはまだHTMLです">

フラグメントに挿入された翻訳値はマークアップです。他の動的な値と同じように、それをエスケープしてください。そうすれば、`<` を含む翻訳が、それが交換されるドキュメントを破壊することはありません。

</Accordion>

</AccordionGroup>

---

## ステップバイステップガイド

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="デモ CodeSandbox - Intlayerを使用してアプリケーションを国際化する方法"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

[Application Template](https://github.com/aymericzip/intlayer-htmx-template) を GitHub で参照してください。

<Steps>

<Step number={1} title="依存関係をインストール">

`intlayer` とサーバーの統合をインストールします。

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```bash packageManager="npm"
npm install intlayer express-intlayer cookie-parser
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer cookie-parser
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer cookie-parser
```

```bash packageManager="bun"
bun add intlayer express-intlayer cookie-parser
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```bash packageManager="npm"
npm install intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

  </Tab>
  <Tab label="Hono" value="hono">

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash
bun add intlayer elysia-intlayer
```

  </Tab>
</Tabs>

> ExpressとFastifyはそれぞれのcookieパーサーを通じてlocale cookieを読み取るため、これらと一緒にインストールする必要があります。HonoとElysiaはネイティブにcookieを解析します。

htmx自体は単一のscriptタグであり、ステップ4で追加されます。

</Step>

<Step number={2} title="プロジェクトの設定">

プロジェクトのルートに`intlayer.config.ts`を作成します：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 全オプションのリストについては、[設定ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)を参照してください。

</Step>

<Step number={3} title="コンテンツを宣言する">

サーバーがレンダリングするすべてのラベルを宣言します。フラグメント内にのみ表示されるものも含めて:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      ja: "言語",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        ja: "カート内のアイテム: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      ja: "アイテムを追加",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> コンテンツ宣言は `contentDir` 以下（デフォルトは `./src`）のどこにでも配置でき、`.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}` にマッチします。[コンテンツ宣言ドキュメンテーション](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_file.md)を参照してください。

</Step>

<Step number={4} title="Intlayer ミドルウェアを登録する">

各リクエストのlocaleを解決し、ハンドラーに公開するミドルウェア。

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Cookie parserが最初に実行される必要があります: `express-intlayer`は
// `req.cookies`を通じてlocale cookieを読み込みます。
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

解決されたlocaleは`res.locals.locale`にあります。

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

await fastify.register(cookie);
await fastify.register(formbody);
await fastify.register(intlayer);
```

解決されたロケールは `req.intlayer.locale` にあります。

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

解決されたロケールは `c.get("locale")` です。

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

解決済みロケールは、ルートコンテキストの `intlayer!.locale` です。

  </Tab>
</Tabs>

デフォルトでは、ロケールは `INTLAYER_LOCALE` クッキーから取得され、次に `x-intlayer-locale` ヘッダー、その後 `Accept-Language` ネゴシエーションから取得されます。

</Step>

<Step number={5} title="リクエストロケールでフラグメントをレンダリングする">

フラグメントレンダラーをロケールの純粋な関数として記述し、ミドルウェアが解決したロケールを渡します。明示的に渡すことで、フラグメントがどのサーバー上にあるかに関わらず、それを要求したリクエストに関連付けられます。

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** 翻訳された値がマークアップから抜け出さないようにエスケープします。 */
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) => HTML_ENTITIES[character] ?? character
  );

export const renderCart = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<section id="cart">
  <p>${escapeHtml(String(content.cartSummary({ count: itemCount })))}</p>
  <p>${escapeHtml(currency(itemCount * 12.5, { locale, currency: "EUR" }))}</p>
  <button
    hx-post="/cart/items"
    hx-vals='{"itemCount": ${itemCount}}'
    hx-target="#cart"
    hx-swap="outerHTML"
  >${escapeHtml(String(content.addItem))}</button>
</section>`;
};
```

ルートから提供する:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // リクエストボディからitemCountを取得し、デフォルト値は0
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // renderCart関数を使用してHTMLを生成し、レスポンスを返す
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // リクエストボディからitemCountを取得し、デフォルト値は0
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // renderCart関数を使用してHTMLを生成し、レスポンスを返す
  return reply
    .type("text/html")
    .send(renderCart(req.intlayer.locale, itemCount));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", async (c) => {
  const body = await c.req.parseBody();
  const itemCount = Number(body["itemCount"] ?? 0) + 1;

  return c.html(renderCart(c.get("locale"), itemCount));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", ({ body, intlayer }) => {
  const itemCount =
    Number((body as { itemCount?: string })?.itemCount ?? 0) + 1;

  return new Response(renderCart(intlayer!.locale, itemCount), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

同じフラグメントは、クッキーが `fr` であるビジターに対してはフランス語で、クッキーが `ar` であるビジターに対してはアラビア語で応答するようになりました。呼び出すマークアップに変更はありません。

</Step>

<Step number={6} title="最初のページを配信する">

`<body>` を単独でレンダリングして、ステップ 7 のロケール切り替え機能でそれ全体をスワップできるようにしてから、htmx を読み込むドキュメントでラップします：

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<body lang="${locale}" dir="${getHTMLTextDir(locale)}">
  <main>
    <h1>${escapeHtml(String(content.pageTitle))}</h1>
    ${renderLocaleSwitcher(locale)}
    ${renderCart(locale, itemCount)}
  </main>
</body>`;
};

export const renderPage = (locale: Locale, itemCount: number): string =>
  `<!doctype html>
<html lang="${locale}" dir="${getHTMLTextDir(locale)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(String(getIntlayer("app", locale).pageTitle))}</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
${renderBody(locale, itemCount)}
</html>`;
```

`getHTMLTextDir` は、ロケールに対して `ltr`、`rtl`、または `auto` を返します。これにより、アラビア語とヘブライ語が正しくレイアウトされるようになります。

</Step>

<Step number={7} title="言語を切り替える">

言語の切り替えは、他のリクエストと同様です。サーバーはこの選択をミドルウェアが読み込むクッキーに保存し、その後、ページを新しいロケールで再レンダリングして返します。

`<select>`を使用してスイッチャーをレンダリングし、自身をpostして全体の`<body>`を置き換えるため、フラグメント周囲の静的ラベルも変更されます:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  const content = getIntlayer("app", locale);

  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? " selected" : ""}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join("");

  return `<form>
  <label for="locale">${escapeHtml(String(content.localeLabel))}</label>
  <select
    id="locale"
    name="locale"
    hx-post="/locale"
    hx-trigger="change"
    hx-target="body"
    hx-swap="outerHTML"
  >${options}</select>
</form>`;
};
```

> `getLocaleName(availableLocale, locale)` は、現在表示されている言語で各言語を記述します。2番目の引数を渡さない場合は、代わりに各言語をそれ自身の言語で記述します。

POSTを処理するには、値を検証し、cookieを設定し、新しいbodyを返します:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", (req, res) => {
  // リクエストボディからロケールを取得
  const requestedLocale = String(req.body?.locale);

  // 宣言されたロケールかどうかを確認
  if (!isDeclaredLocale(requestedLocale)) {
    res.status(400).send("Unknown locale");
    return;
  }

  res.cookie("INTLAYER_LOCALE", requestedLocale, {
    sameSite: "lax",
    path: "/",
  });
  res.type("html").send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

fastify.post("/locale", async (req, reply) => {
  const requestedLocale = String((req.body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return reply.status(400).send("Unknown locale");
  }

  return reply
    .setCookie("INTLAYER_LOCALE", requestedLocale, {
      sameSite: "lax",
      path: "/",
    })
    .type("text/html")
    .send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { setCookie } from "hono/cookie";
import { isDeclaredLocale } from "intlayer";

app.post("/locale", async (c) => {
  // ボディをパースしてrequestLocaleを取得
  const body = await c.req.parseBody();
  const requestedLocale = String(body["locale"]);

  // 宣言されたロケールかどうかをチェック
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // クッキーを設定
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  // HTMLレスポンスを返す
  return c.html(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", ({ body, cookie, status }) => {
  const requestedLocale = String((body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return status(400, "Unknown locale");
  }

  cookie["INTLAYER_LOCALE"]!.set({
    value: requestedLocale,
    sameSite: "lax",
    path: "/",
  });

  return new Response(renderBody(requestedLocale, 0), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

> `isDeclaredLocale` は任意の文字列をあなたが設定したロケールの1つに絞り込むため、予期しない値がレンダラーに到達することはありません。

</Step>

<Step number={8} title="スワップ後に lang と dir を同期させた状態に保つ" isOptional={true}>

swapは`<body>`を置き換えることができますが、その周りの`<html>`は置き換えられません。swappedされたbodyに`lang`と`dir`をレンダリングし、headからroot要素に一度コピーして戻します:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

これがない場合、アラビア語への切り替えはbody内で右から左へレンダリングされますが、ドキュメントは前の言語を支援技術とクローラーに引き続き広告します。

</Step>

<Step number={9} title="localeをクッキーの代わりにヘッダーとして送信する" isOptional={true}>

Cookieが適切でない場合は、祖先要素の`hx-headers`を使用して、すべてのhtmxリクエストにlocaleを付与します。子孫はそれを継承します：

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

ミドルウェアはデフォルトで`x-intlayer-locale`を読み取ります。設定でキャリアの名前を変更できます：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// Intlayerの設定
const config: IntlayerConfig = {
  // ... その他の設定オプション
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

</Step>

</Steps>

### TypeScriptの設定

自動生成された型を含めることで、実行時に空の文字列になるのではなく、宣言されていないキーがコンパイルエラーになります。

```json5 fileName="tsconfig.json"
{
  // ... 既存の TypeScript 設定
  "include": [
    // ... 既存の TypeScript 設定
    ".intlayer/**/*.ts", // 自動生成された型を含める
  ],
}
```

### Git 設定

Intlayer によって生成されたファイルを無視することをお勧めします:

```plaintext fileName=".gitignore"
# Intlayer によって生成されたファイルを無視
.intlayer
```

### VS Code Extension

Intlayer を使用した開発体験を向上させるために、公式の **Intlayer VS Code Extension** をインストールできます。

[VS Code Marketplace からインストール](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

このエクステンションは以下を提供します:

- **翻訳キーの自動補完**。
- **欠落している翻訳のリアルタイムエラー検出**。
- **翻訳済みコンテンツのインラインプレビュー**。
- **翻訳を簡単に作成・更新するクイックアクション**。

エクステンションの使用方法の詳細については、[Intlayer VS Code エクステンションのドキュメント](https://intlayer.org/doc/vs-code-extension)を参照してください。

---

### さらに進める

さらに進めるには、[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を使用してコンテンツを外部化できます。これにより、翻訳者はデプロイメントなしでコピーを変更できます。

## よくある質問

<FAQ>

<Question title="なぜスワップされたフラグメントが間違った言語で戻ってくるのですか?">

フラグメントリクエストにロケールが含まれていなかったため。htmxリクエストはそれを発行したページから独立しているため、`INTLAYER_LOCALE` cookieまたは`hx-headers`で設定された`x-intlayer-locale`ヘッダーを通じて、各リクエストにロケールを含める必要があります。ExpressおよびFastifyでcookie parserがIntlayer middlewareの前に実行されていることを確認してください。そうでない場合、cookieは読み込まれず、すべてのリクエストが`Accept-Language`にフォールバックします。

</Question>

<Question title="ロケールを`getIntlayer`に渡すべきか、それともリクエストコンテキストに依存すべきか?">

それを渡してください。インテグレーションは解決されたロケール（`res.locals.locale`、`req.intlayer.locale`、`c.get("locale")`、`intlayer!.locale`）を公開しており、`getIntlayer`に渡すことで各レンダラーをロケールの純粋な関数にします。これはテストしやすく、サーバーを変更した場合でもフラグメントレンダラーをポータブルに保つことができます。

</Question>

<Question title="htmxと一緒にクライアント側のi18nライブラリが必要ですか?">

いいえ。訪問者が見るものはすべてサーバーによって生成されるため、ブラウザで翻訳するものはありません。これはまた、htmxアプリのi18nのページ重量コストがほぼゼロである理由です。カタログがクライアントに送信されることはありません。

</Question>

<Question title="SEO用にURLもローカライズするにはどうすればよいですか?">

ロケールプレフィックス（`/fr/cart`）の下でページを提供し、Cookie ではなくルートハンドラーのパスからロケールを読み取ります。これはフルページレンダリングの場合です。フラグメントは引き続き Cookie またはヘッダーを使用できます。[configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)でルーティングオプションを、[custom URL rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/custom_url_rewrites.md)を参照してください。

</Question>

<Question title="右から左への言語にはどのように対応しますか?">

`getHTMLTextDir(locale)` は `ltr`、`rtl`、または `auto` を返します。初期レンダリングではドキュメントに設定し、ステップ 8 に示すようにスワップ後に再度適用します。CSS 論理プロパティ（`margin-left` ではなく `margin-inline-start`）を使用して、レイアウトが従うようにします。

</Question>

<Question title="翻訳された値をエスケープする必要がありますか?">

はい、テンプレート文字列に挿入するすべてのものに対して、他の動的値とまったく同じようにエスケープする必要があります。CMSまたは翻訳者から来るコンテンツは、あなたが制御するマークアップではありません。ステップ5は最小限のエスケーパーを示しています。

</Question>

<Question title="同じコンテンツをAPI応答にも使用できますか?">

はい。バックエンド統合は `t()` と `getIntlayer()` をあらゆるハンドラーに公開するため、トーストに表示されるエラーメッセージとフラグメントにレンダリングされるラベルは、同じ宣言されたコンテンツから取得されます。[Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_express.md)、[Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_fastify.md)、[Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_hono.md)、[Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_elysia.md)ガイドを参照してください。

</Question>

<Question title="コンテンツをキーごとに移動する必要がありますか?">

いいえ。`npx intlayer extract` を実行すると、Intlayer がソースファイルを読み込み、ユーザー向けの文字列を抽出して、各ファイルの隣に `.content` ファイルを書き込みます。これにより、カタログに文字列を 1 つずつコピーするのではなく、diff を確認できます。[extract コマンド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/extract.md)を参照してください。

</Question>

<Question title="既存の JSON 翻訳ファイルを保持できますか?">

はい。[sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-json.md)は、`/messages/{locale}/{namespace}.json`ファイルを真実のソースとして保つ一方で、Intlayerディクショナリを両方向で生成します。[sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/plugins/sync-po.md)はgetextカタログに対して同じことを行い、[per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/per_locale_file.md)では、ロケールを1つのファイルにグループ化する代わりに、言語別にコンテンツを分割できます。

</Question>

<Question title="AIで自動的にアプリを翻訳するにはどうしたらいいですか?">

`npx intlayer fill` を実行します。これにより、選択した LLM を使用して、独自のプロバイダーと API キーで不足している翻訳が入力されます。`--git-diff` を追加して、ブランチで変更されたコンテンツのみを翻訳します。[fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md) と [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/CI_CD.md) を参照してください。

</Question>

<Question title="Intlayer は gender、条件分岐、補間値に対応していますか？">

はい：[性別ベースのコンテンツ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/gender.md)、条件、[列挙](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/enumeration.md)、補間値用の[挿入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/insertion.md)、および数値、日付、通貨用の[フォーマッター](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/formatters.md)。

</Question>

<Question title="どのようなエディターとAIエージェントツールが利用可能ですか？">

5つ、すべてオプションです：

- **[VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)**: キーからそれを宣言するコンテンツファイルにジャンプし、ファイルからコンテンツを抽出し、コマンドパレットからbuild、fill、test、push、pullを実行します。
- **[LSPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)**: LSPに対応した任意のエディターで同じ認識を提供し、定義へのジャンプ、翻訳された値のホバープレビュー、キーのオートコンプリート、キーが宣言されていない場合の警告を含みます。
- **[MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)**: IntlayerのドキュメントとCLIをCursor、VS Code、Claude Desktop、Claude Code、ChatGPTに公開します。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/agent_skills.md)**: `intlayer-config`、`intlayer-cli`、`intlayer-content` などの焦点を絞ったスキル。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/eslint.md)**: `no-raw-text` ハードコードされた文字列にフラグを立てます。

</Question>

<Question title="Intlayer は無料でオープンソースですか？">

はい、Apache 2.0 ライセンスの下で、商用利用を含みます。ホストされている [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) はオプションの有料サービスであり、[自己ホスト](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md) することもできます。

</Question>

</FAQ>

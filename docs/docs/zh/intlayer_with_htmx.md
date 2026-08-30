---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - 完整的应用翻译指南"
description: "不再使用 i18next。2026 年构建多语言 (i18n) htmx 应用的指南。使用 AI 代理进行翻译，优化 bundle 大小、SEO 和性能。"
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

# 使用 Intlayer 翻译您的 htmx 应用 | 国际化 (i18n)

htmx 不渲染任何自己的内容。访问者读到的每个标签都是您的服务器生成的 HTML，每次交换都是一个单独的 HTTP 请求。因此，国际化 htmx 应用是一个服务器问题：需要在每个请求上解析 locale，并且每个片段都必须以该 locale 呈现。

Intlayer 通过其后端集成涵盖了这一点，这些集成按请求检测 locale 并向构建 HTML 的处理程序暴露您声明的内容。

## 目录

<TOC/>

## htmx 应用中 i18n 的三个规则

<AccordionGroup>

<Accordion header="必须在每个请求上解析 locale，而不仅仅是第一个请求">

一个单页面可以触发数十个交换。每一个都是一个新的请求，对发起它的页面没有任何记忆。如果locale存储在初始渲染期间设置的变量中，之后的每个片段都会回退到默认语言。

Intlayer middleware 从请求本身解析locale，因此在第十分钟提供的片段用的是与第零分钟提供的页面相同的语言。

</Accordion>

<Accordion header="locale必须随请求传递">

两种方式可与htmx配合使用。浏览器会自动在每个请求（包括htmx请求）上发送cookie（`INTLAYER_LOCALE`）。可以使用`hx-headers`属性将header（`x-intlayer-locale`）附加到htmx请求。默认情况下两者都会被读取。

</Accordion>

<Accordion header="交换的 HTML 仍然是 HTML">

插入到片段中的翻译值是标记。对其进行转义，就像对待任何其他动态值一样，这样包含 `<` 的翻译就无法破坏它被交换到的文档。

</Accordion>

</AccordionGroup>

---

## 逐步指南

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 国际化您的应用程序"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

查看 GitHub 上的[应用程序模板](https://github.com/aymericzip/intlayer-htmx-template)。

<Steps>

<Step number={1} title="安装依赖项">

安装 `intlayer` 加上适用于你的服务器的集成。

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

> Express 和 Fastify 通过各自的 cookie 解析器读取 locale cookie，因此必须与其一起安装。Hono 和 Elysia 原生解析 cookies。

htmx 本身是一个单独的脚本标签，在第 4 步中添加。

</Step>

<Step number={2} title="配置您的项目">

在项目根目录创建 `intlayer.config.ts`：

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

> 有关完整的选项列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="声明您的内容">

声明服务器将呈现的每个标签，包括仅出现在片段内的标签：

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      zh: "语言",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        zh: "购物车中的商品: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      zh: "添加商品",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> 内容声明可以存在于 `contentDir` 下的任何位置（默认为 `./src`）并匹配 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`。见 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={4} title="注册 Intlayer middleware">

中间件解决每个请求的 locale，并将其暴露给你的处理程序。

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// cookie 解析器必须首先运行：`express-intlayer` 通过 `req.cookies` 读取 locale cookie。
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

解决的 locale 在 `res.locals.locale` 上。

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

await fastify.register(cookie);
await fastify.register(formbody);
await fastify.register(intlayer);
```

解析后的 locale 在 `req.intlayer.locale` 上。

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

解析后的 locale 是 `c.get("locale")`。

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

已解析的 locale 在路由上下文中的 `intlayer!.locale` 上。

  </Tab>
</Tabs>

默认情况下，locale 是从 `INTLAYER_LOCALE` cookie 获取的，然后是 `x-intlayer-locale` header，然后是 `Accept-Language` 协商。

</Step>

<Step number={5} title="使用请求 locale 渲染片段">

将你的片段渲染器编写为 locale 的纯函数，并传递中间件解析的 locale。显式传递它可以保持片段与请求它的服务器相关联。

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** 转义已翻译的值，防止其突破标记。 */
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

从路由提供服务：

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // 从请求体获取项目数量，如果不存在则默认为0，然后加1
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // 设置响应类型为HTML并发送渲染后的购物车
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // 从请求体获取项目数量，如果不存在则默认为0，然后加1
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // 设置响应类型为HTML并发送渲染后的购物车
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

同一个片段现在为 cookie 设置为 `fr` 的访问者用法语回答，为 cookie 设置为 `ar` 的访问者用阿拉伯语回答，无需对调用标记进行任何更改。

</Step>

<Step number={6} title="提供第一个页面">

单独渲染 `<body>`，以便第 7 步中的语言切换器可以整体交换它，然后将其包装在加载 htmx 的文档中：

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  // 获取应用内容配置
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

`getHTMLTextDir` 为该语言返回 `ltr`、`rtl` 或 `auto`，这使得阿拉伯语和希伯来语能够正确显示。

</Step>

<Step number={7} title="切换语言">

切换语言就像任何其他请求一样。服务器将选择存储在中间件读取的 cookie 中，然后返回以新语言环境重新渲染的页面。

将切换器渲染为一个 `select`，它自己发送请求并交换整个 `<body>`，这样你的片段周围的静态标签也会改变：

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

> `getLocaleName(availableLocale, locale)` 用当前显示的语言写出每种语言。如果不传第二个参数，则用各自的语言写出。

通过验证值、设置 cookie 并返回新的 body 来处理 post 请求：

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", (req, res) => {
  const requestedLocale = String(req.body?.locale);

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
  // 解析请求体
  const body = await c.req.parseBody();
  // 获取请求的语言环境
  const requestedLocale = String(body["locale"]);

  // 检查语言环境是否已声明
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // 设置语言环境 cookie
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  // 返回渲染后的HTML
  return c.html(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", ({ body, cookie, status }) => {
  const requestedLocale = String((body as { locale?: string })?.locale);

  // 检查请求的locale是否在声明的locale中
  if (!isDeclaredLocale(requestedLocale)) {
    return status(400, "Unknown locale");
  }

  // 设置INTLAYER_LOCALE cookie
  cookie["INTLAYER_LOCALE"]!.set({
    value: requestedLocale,
    sameSite: "lax",
    path: "/",
  });

  // 返回渲染后的body内容，设置content-type为text/html
  return new Response(renderBody(requestedLocale, 0), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

> `isDeclaredLocale` 将任意字符串缩小到你配置的locale之一，因此意外的值永远不会到达你的渲染器。

</Step>

<Step number={8} title="在swap后保持lang和dir同步" isOptional={true}>

交换可以替换 `<body>`，但不会替换它周围的 `<html>`。在交换的 body 上渲染 `lang` 和 `dir`，然后从 head 中将它们复制回根元素一次：

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

没有这个脚本，切换到阿拉伯语时会在 body 内渲染从右到左的文本，而文档仍然向辅助技术和爬虫宣传前一种语言。

</Step>

<Step number={9} title="发送区域设置作为标头而不是 cookie" isOptional={true}>

如果 cookie 不适合你，可以使用 `hx-headers` 在祖先元素上将区域设置附加到每个 htmx 请求。后代元素会继承它：

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

中间件默认读取 `x-intlayer-locale`。你可以在配置中重新命名这两个载体：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其他配置选项
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

### 配置 TypeScript

包含自动生成的类型，使得未声明的键在编译时报错，而不是在运行时返回空字符串。

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略由 Intlayer 生成的文件：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改进你在 Intlayer 中的开发体验，你可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- **翻译键的自动完成**。
- **实时错误检测**，用于检测缺失的翻译。
- **内联预览**已翻译内容。
- **快速操作**，轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 进一步探索

要进一步探索，您可以使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外部化您的内容，这样翻译人员可以在不需要部署的情况下更改文案。

## 常见问题

<FAQ>

<Question title="为什么我交换的片段返回的语言不对？">

因为片段请求没有携带 locale。htmx 请求独立于发送它们的页面，所以 locale 必须通过 `INTLAYER_LOCALE` cookie 或通过 `hx-headers` 设置的 `x-intlayer-locale` header 在每个请求上传输。检查 cookie 解析器在 Express 和 Fastify 上的 Intlayer middleware 之前运行，否则 cookie 永远不会被读取，每个请求都会回退到 `Accept-Language`。

</Question>

<Question title="我应该将 locale 传递给 `getIntlayer` 还是依赖请求上下文？">

将它传递过去。这些集成公开了解析后的 locale（`res.locals.locale`、`req.intlayer.locale`、`c.get("locale")`、`intlayer!.locale`），将其传递给 `getIntlayer` 使每个渲染器成为 locale 的纯函数。这样更容易测试，如果你更换服务器，也能让你的 fragment 渲染器更具可移植性。

</Question>

<Question title="我需要在 htmx 旁边使用客户端 i18n 库吗？">

不需要。访问者看到的所有内容都是由服务器生成的，所以浏览器中没有任何东西需要翻译。这也是为什么 htmx 应用中 i18n 的页面权重成本接近于零：没有 catalog 会被传送到客户端。

</Question>

<Question title="我如何本地化 URL，用于 SEO？">

在区域设置前缀下提供您的页面（`/fr/cart`），并在您的路由处理程序中从路径而不是从 cookie 读取区域设置，以进行完整页面渲染。片段可以继续使用 cookie 或标头。请参阅[配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)以了解路由选项和[自定义 URL 重写](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/custom_url_rewrites.md)。

</Question>

<Question title="我如何处理从右到左的语言？">

`getHTMLTextDir(locale)` 返回 `ltr`、`rtl` 或 `auto`。在初始渲染时将其设置在文档上，并在交换后重新应用，如第 8 步所示。使用 CSS 逻辑属性（例如 `margin-inline-start` 而不是 `margin-left`），以便您的布局遵循。

</Question>

<Question title="我是否需要转义翻译后的值?">

是的，对于您插入到模板字符串中的任何内容，与任何其他动态值完全相同。来自 CMS 或翻译人员的内容不是您控制的标记。第 5 步显示了一个最小的转义器。

</Question>

<Question title="相同的内容能否也用于我的 API 响应?">

是的。后端集成将 `t()` 和 `getIntlayer()` 暴露给任何处理程序，因此在 toast 中显示的错误消息和在片段中呈现的标签来自相同的已声明内容。请参阅 [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_express.md)、[Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_fastify.md)、[Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_hono.md) 和 [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_elysia.md) 指南。

</Question>

<Question title="我需要逐个移动我的内容键吗？">

不是。运行 `npx intlayer extract`，Intlayer 会读取你的源文件，提取面向用户的字符串，并在每个文件旁边写入一个 `.content` 文件，这样你可以审查差异，而不是一次一个地将字符串复制到目录中。参见 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

</Question>

<Question title="我可以保留我现有的 JSON 翻译文件吗？">

是的。[sync JSON 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md)将您的 `/messages/{locale}/{namespace}.json` 文件作为真实源，并在两个方向上从它们生成 Intlayer 字典。[sync PO 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md)对 gettext 目录执行相同操作，[按语言区域的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md)允许您按语言拆分内容，而不是在一个文件中分组 locales。

</Question>

<Question title="我如何使用 AI 自动翻译应用？">

运行 `npx intlayer fill`，它使用您选择的 LLM 通过您自己的提供商和 API 密钥填充缺失的翻译。添加 `--git-diff` 以仅翻译分支上更改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持性别、条件和插值值？">

是的：[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件、[枚举](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/enumeration.md)、[插入](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)用于插值，以及[格式化器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)用于数字、日期和货币。

</Question>

<Question title="有哪些编辑器和 AI 代理工具可用？">

五个部分，均为可选：

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**: 从一个key跳转到声明它的内容文件，从文件中提取内容，以及从命令面板运行build、fill、test、push和pull。
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**: 在任何支持LSP的编辑器中提供相同的感知能力，具有定义跳转、翻译值的悬停预览、key的自动完成，以及在key未在任何地方声明时显示警告。
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**: 将Intlayer文档和CLI暴露给Cursor、VS Code、Claude Desktop、Claude Code和ChatGPT。
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**: 专注的技能，如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`。
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**: `no-raw-text` 标记硬编码字符串。

</Question>

<Question title="Intlayer 是免费和开源的吗？">

是的，根据 Apache 2.0 许可证，包括商业用途。托管的 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 是一项可选的付费服务，也可以 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>

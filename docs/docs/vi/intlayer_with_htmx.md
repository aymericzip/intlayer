---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Hướng dẫn hoàn chỉnh dịch ứng dụng của bạn"
description: "Không còn i18next. Hướng dẫn 2026 để xây dựng ứng dụng htmx đa ngôn ngữ (i18n). Dịch với AI agents và tối ưu hóa kích thước bundle, SEO và hiệu suất."
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

# Dịch ứng dụng htmx của bạn bằng Intlayer | Quốc tế hóa (i18n)

htmx không render bất kỳ nội dung nào của riêng nó. Mọi nhãn mà khách truy cập đọc được đều là HTML mà máy chủ của bạn tạo ra, và mọi swap là một yêu cầu HTTP riêng biệt. Quốc tế hóa một ứng dụng htmx do đó là một mối quan tâm của máy chủ: locale phải được giải quyết trên mỗi yêu cầu, và mỗi fragment phải được render ở locale đó.

Intlayer giải quyết điều này thông qua các backend integrations của nó, chúng phát hiện locale cho mỗi yêu cầu và expose nội dung khai báo của bạn cho handler xây dựng HTML.

## Mục lục

<TOC/>

## Ba quy tắc của i18n trong một ứng dụng htmx

<AccordionGroup>

<Accordion header="Locale phải được giải quyết trên mỗi yêu cầu, không chỉ yêu cầu đầu tiên">

Một trang có thể kích hoạt hàng chục swaps. Mỗi cái là một yêu cầu mới không có bộ nhớ về trang đã phát hành nó. Nếu locale nằm trong một biến được đặt trong quá trình render ban đầu, mọi fragment sau đó sẽ quay lại ngôn ngữ mặc định.

Middleware Intlayer giải quyết locale từ chính yêu cầu đó, vì vậy một fragment được phục vụ tại phút mười trả lời cùng ngôn ngữ với trang được phục vụ tại phút không.

</Accordion>

<Accordion header="Locale phải di chuyển cùng với yêu cầu">

Hai trình vận chuyển hoạt động với htmx. Một cookie (`INTLAYER_LOCALE`) được gửi bởi trình duyệt tự động trên mỗi yêu cầu, bao gồm các yêu cầu htmx. Một header (`x-intlayer-locale`) có thể được đính kèm vào các yêu cầu htmx với thuộc tính `hx-headers`. Cả hai đều được đọc theo mặc định.

</Accordion>

<Accordion header="HTML được hoán đổi vẫn là HTML">

Một giá trị được dịch nội suy vào một fragment là markup. Escape nó, giống như bạn sẽ làm với bất kỳ giá trị động nào khác, vì vậy một bản dịch chứa `<` không thể phá vỡ tài liệu mà nó được hoán đổi vào.

</Accordion>

</AccordionGroup>

---

## Hướng Dẫn Từng Bước

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách Quốc Tế Hóa Ứng Dụng Của Bạn Bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Xem [Application Template](https://github.com/aymericzip/intlayer-htmx-template) trên GitHub.

<Steps>

<Step number={1} title="Cài đặt Dependencies">

Cài đặt `intlayer` cùng với integration cho server của bạn.

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

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

  </Tab>
</Tabs>

> Express và Fastify đọc cookie locale thông qua các cookie parser của riêng họ, vì vậy chúng phải được cài đặt cùng với. Hono và Elysia parse cookies một cách native.

htmx chính nó là một single script tag, được thêm vào bước 4.

</Step>

<Step number={2} title="Cấu hình dự án của bạn">

Tạo một `intlayer.config.ts` ở root của dự án:

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

> Để xem danh sách đầy đủ các tùy chọn, hãy xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

</Step>

<Step number={3} title="Khai báo Nội dung của bạn">

Khai báo mọi nhãn mà máy chủ sẽ hiển thị, bao gồm cả những nhãn chỉ xuất hiện bên trong một fragment:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      vi: "Ngôn ngữ",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        vi: "Mục trong giỏ hàng của bạn: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      vi: "Thêm một mục",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Các khai báo nội dung có thể nằm ở bất kỳ đâu trong `contentDir` (theo mặc định là `./src`) và khớp với `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Xem [tài liệu khai báo nội dung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/content_file.md).

</Step>

<Step number={4} title="Đăng ký middleware Intlayer">

Middleware giải quyết locale của mỗi request và hiển thị nó cho các handler của bạn.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Cookie parser phải chạy trước: `express-intlayer` đọc locale
// cookie thông qua `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

Locale đã được giải quyết là trên `res.locals.locale`.

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

Locale được phân giải nằm trên `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

Locale được phân giải là `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

Locale đã được phân giải là `intlayer!.locale` trên bối cảnh route.

  </Tab>
</Tabs>

Theo mặc định, locale được lấy từ cookie `INTLAYER_LOCALE`, sau đó là header `x-intlayer-locale`, sau đó là thương lượng `Accept-Language`.

</Step>

<Step number={5} title="Render các fragment với locale của request">

Viết các renderer fragment của bạn dưới dạng pure function của một locale, và truyền locale mà middleware đã phân giải. Truyền nó một cách rõ ràng giúp giữ một fragment được liên kết với request đã yêu cầu nó, bất kể bạn đang ở server nào.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Thoát một giá trị đã dịch để nó không thể thoát ra khỏi markup. */
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

Phục vụ nó từ một route:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

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

Đoạn code tương tự hiện đã trả lời bằng tiếng Pháp cho một khách thăm có cookie `fr`, và bằng tiếng Ả Rập cho một khách có cookie `ar`, mà không có thay đổi nào trong markup gọi.

</Step>

<Step number={6} title="Phục vụ trang đầu tiên">

Render `<body>` riêng biệt, để công tắc locale trong bước 7 có thể hoán đổi toàn bộ, sau đó bọc nó trong tài liệu mà tải htmx:

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

`getHTMLTextDir` trả về `ltr`, `rtl` hoặc `auto` cho locale, đó là những gì làm cho tiếng Ả Rập và tiếng Do Thái hiển thị bố cục một cách chính xác.

</Step>

<Step number={7} title="Chuyển đổi ngôn ngữ">

Chuyển đổi ngôn ngữ là một yêu cầu như bất kỳ yêu cầu nào khác. Server lưu trữ lựa chọn trong cookie mà middleware đọc, sau đó trả về trang được hiển thị lại trong locale mới.

Hiển thị bộ chọn ngôn ngữ dưới dạng `select` tự gửi và thay thế toàn bộ `<body>`, để các nhãn tĩnh xung quanh các fragment của bạn cũng thay đổi:

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

> `getLocaleName(availableLocale, locale)` ghi mỗi ngôn ngữ bằng ngôn ngữ hiện được hiển thị. Không truyền đối số thứ hai để ghi mỗi ngôn ngữ bằng chính ngôn ngữ của nó.

Xử lý post bằng cách xác thực giá trị, đặt cookie và trả về body mới:

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
  // Phân tích body từ request
  const body = await c.req.parseBody();
  const requestedLocale = String(body["locale"]);

  // Kiểm tra xem locale có được khai báo không
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // Đặt cookie cho locale
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
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
    return status(400, "Ngôn ngữ không xác định");
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

> `isDeclaredLocale` thu hẹp một chuỗi tùy ý thành một trong các ngôn ngữ được cấu hình của bạn, do đó một giá trị không mong muốn không bao giờ đạt đến các renderer của bạn.

</Step>

<Step number={8} title="Giữ lang và dir đồng bộ sau khi hoán đổi" isOptional={true}>

Một swap có thể thay thế `<body>`, nhưng không bao giờ thay thế `<html>` xung quanh nó. Render `lang` và `dir` trên body được swap và sao chép chúng trở lại phần tử gốc một lần, từ head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Không có điều này, một sự chuyển đổi sang tiếng Ả Rập sẽ render từ phải sang trái bên trong body trong khi tài liệu vẫn quảng cáo ngôn ngữ trước đó cho công nghệ hỗ trợ và cho các crawler.

</Step>

<Step number={9} title="Gửi locale như một header thay vì một cookie" isOptional={true}>

Nếu cookie không phù hợp với bạn, hãy đính kèm locale vào mọi yêu cầu htmx bằng `hx-headers` trên một phần tử tổ tiên. Các phần tử con sẽ kế thừa nó:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Middleware đọc `x-intlayer-locale` theo mặc định. Bạn có thể đổi tên cả hai carrier trong cấu hình của bạn:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Các tùy chọn cấu hình khác
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

### Cấu hình TypeScript

Bao gồm các loại được tự động tạo để một khóa không khai báo là lỗi biên dịch thay vì một chuỗi trống tại thời gian chạy.

```json5 fileName="tsconfig.json"
{
  // ... Các cấu hình TypeScript hiện có của bạn
  "include": [
    // ... Các cấu hình TypeScript hiện có của bạn
    ".intlayer/**/*.ts", // Bao gồm các loại được tự động tạo
  ],
}
```

### Cấu hình Git

Nên bỏ qua các tệp được tạo bởi Intlayer:

```plaintext fileName=".gitignore"
# Bỏ qua các tệp được tạo bởi Intlayer
.intlayer
```

### VS Code Extension

Để cải thiện trải nghiệm phát triển với Intlayer, bạn có thể cài đặt **Intlayer VS Code Extension** chính thức.

[Cài đặt từ VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Tiện ích mở rộng này cung cấp:

- **Tự động hoàn thành** cho các khóa dịch.
- **Phát hiện lỗi thời gian thực** cho các dịch bị thiếu.
- **Xem trước nội tuyến** của nội dung đã dịch.
- **Hành động nhanh** để dễ dàng tạo và cập nhật các bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Đi xa hơn

Để đi xa hơn, bạn có thể ngoại hóa nội dung của mình bằng cách sử dụng [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md), vì vậy các nhà dịch có thể thay đổi nội dung mà không cần triển khai.

## Các Câu Hỏi Thường Gặp

<FAQ>

<Question title="Tại sao fragment hoán đổi của tôi quay lại bằng ngôn ngữ sai?">

Vì yêu cầu fragment không mang theo locale. htmx requests là độc lập với trang phát hành chúng, vì vậy locale phải được truyền trên mỗi yêu cầu, thông qua cookie `INTLAYER_LOCALE` hoặc header `x-intlayer-locale` được đặt với `hx-headers`. Kiểm tra rằng cookie parser chạy trước Intlayer middleware trên Express và Fastify, nếu không cookie sẽ không bao giờ được đọc và mọi yêu cầu sẽ quay lại `Accept-Language`.

</Question>

<Question title="Tôi nên truyền locale cho `getIntlayer` hay dựa vào request context?">

Hãy truyền nó. Các integrations expose locale được resolved (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), và việc truyền nó tới `getIntlayer` làm cho mỗi renderer trở thành một pure function của một locale. Điều đó dễ dàng hơn để test, và nó giữ cho fragment renderers của bạn portable nếu bạn thay đổi server.

</Question>

<Question title="Tôi có cần một thư viện i18n phía client cùng với htmx không?">

Không. Mọi thứ mà một visitor nhìn thấy được produced bởi server, vì vậy không có gì để translate trong browser. Đó cũng là lý do tại sao page weight cost của i18n trong một htmx app gần như bằng không: không có catalog nào được shipped tới client.

</Question>

<Question title="Làm cách nào để localize URL cũng vậy, cho SEO?">

Phục vụ các trang của bạn dưới một tiền tố locale (`/fr/cart`) và đọc locale từ đường dẫn trong trình xử lý route của bạn, thay vì từ cookie, để render toàn bộ trang. Các fragment có thể tiếp tục sử dụng cookie hoặc header. Xem [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md) để biết các tùy chọn định tuyến và [custom URL rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/custom_url_rewrites.md).

</Question>

<Question title="Làm cách nào để xử lý các ngôn ngữ từ phải sang trái?">

`getHTMLTextDir(locale)` trả về `ltr`, `rtl` hoặc `auto`. Đặt nó trên document cho lần render ban đầu, và áp dụng lại sau khi swap như bước 8 chỉ ra. Sử dụng các thuộc tính CSS logic (`margin-inline-start` thay vì `margin-left`) để bố cục của bạn tuân theo.

</Question>

<Question title="Có phải tôi phải escape các giá trị được dịch không?">

Có, đối với bất kỳ thứ gì bạn nội suy vào một template string, giống như đối với bất kỳ giá trị động nào khác. Nội dung đến từ CMS hoặc từ một người dịch không phải là markup mà bạn kiểm soát. Bước 5 cho thấy một hàm escape tối thiểu.

</Question>

<Question title="Nội dung tương tự có thể phục vụ cho các phản hồi API của tôi không?">

Có. Các backend integrations expose `t()` và `getIntlayer()` cho bất kỳ handler nào, vì vậy một error message hiển thị trong toast và một label được render thành fragment đều đến từ cùng một declared content. Xem các hướng dẫn [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_hono.md) và [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_with_elysia.md).

</Question>

<Question title="Tôi có phải di chuyển nội dung từng khóa một không?">

Không. Chạy `npx intlayer extract` và Intlayer sẽ đọc các tệp nguồn của bạn, trích xuất các chuỗi dành cho người dùng và tạo một tệp `.content` bên cạnh mỗi tệp, vì vậy bạn xem xét một diff thay vì sao chép các chuỗi vào catalog từng cái một. Xem [lệnh extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/extract.md).

</Question>

<Question title="Tôi có thể giữ các tệp dịch JSON hiện có của mình không?">

Có. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-json.md) giữ cho các file `/messages/{locale}/{namespace}.json` của bạn là nguồn sự thật duy nhất và tạo các từ điển Intlayer từ chúng, theo cả hai hướng. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/plugins/sync-po.md) làm tương tự cho các catalog gettext, và [các file theo locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/per_locale_file.md) cho phép bạn chia nội dung theo ngôn ngữ thay vì nhóm các locale trong một file.

</Question>

<Question title="Làm cách nào tôi có thể dịch ứng dụng tự động bằng AI?">

Chạy `npx intlayer fill`, lệnh này điền các bản dịch còn thiếu bằng LLM mà bạn chọn sử dụng nhà cung cấp và API key của riêng bạn. Thêm `--git-diff` để chỉ dịch nội dung đã thay đổi trên branch. Xem [lệnh fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/cli/fill.md) và [tích hợp CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/CI_CD.md).

</Question>

<Question title="Intlayer có hỗ trợ gender, điều kiện và các giá trị được nội suy không?">

Có: [nội dung dựa trên giới tính](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/gender.md), điều kiện, [liệt kê](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/enumeration.md), [chèn](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/dictionary/insertion.md) cho các giá trị nội suy, và [định dạng](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/formatters.md) cho số, ngày tháng và tiền tệ.

</Question>

<Question title="Có những công cụ editor và AI agent nào có sẵn?">

Năm phần, tất cả đều là tùy chọn:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/vs_code_extension.md)**: nhảy từ một khóa đến tệp nội dung khai báo nó, trích xuất nội dung từ một tệp, và chạy build, fill, test, push và pull từ command palette.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/lsp.md)**: nhận thức tương tự trong bất kỳ trình soạn thảo nào nói LSP, với go to definition, hover previews của một giá trị đã dịch, autocompletion của các khóa, và một cảnh báo khi một khóa không được khai báo ở bất kỳ đâu.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/mcp_server.md)**: tiếp xúc với tài liệu Intlayer và CLI cho Cursor, VS Code, Claude Desktop, Claude Code và ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/agent_skills.md)**: các kỹ năng tập trung như `intlayer-config`, `intlayer-cli` và `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/eslint.md)**: `no-raw-text` đánh dấu các chuỗi được hardcoded.

</Question>

<Question title="Intlayer có phải là phần mềm tự do và mã nguồn mở không?">

Có, theo giấy phép Apache 2.0, bao gồm cả sử dụng thương mại. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/intlayer_CMS.md) được lưu trữ là một dịch vụ trả phí tùy chọn cũng có thể được [tự lưu trữ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/self_hosting.md).

</Question>

</FAQ>

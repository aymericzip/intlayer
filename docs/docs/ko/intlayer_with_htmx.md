---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - 앱을 번역하는 완벽한 가이드"
description: "더 이상 i18next가 아닙니다. 다국어(i18n) htmx 앱을 구축하는 2026년 가이드입니다. AI 에이전트로 번역하고 번들 크기, SEO 및 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
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

# Intlayer를 사용하여 htmx 애플리케이션 번역 | 국제화(i18n)

htmx는 자체 콘텐츠를 렌더링하지 않습니다. 방문자가 읽는 모든 레이블은 서버가 생성한 HTML이며, 모든 swap은 별도의 HTTP 요청입니다. 따라서 htmx 앱을 국제화하는 것은 서버의 관심사입니다. 각 요청에서 locale을 결정해야 하고, 각 fragment를 해당 locale으로 렌더링해야 합니다.

Intlayer는 백엔드 통합을 통해 이를 커버합니다. 백엔드 통합은 요청별로 locale을 감지하고 HTML을 빌드하는 handler에 선언된 콘텐츠를 노출합니다.

## 목차

<TOC/>

## htmx 앱에서 i18n의 세 가지 규칙

<AccordionGroup>

<Accordion header="Locale은 첫 번째 요청뿐만 아니라 모든 요청에서 결정되어야 합니다">

단일 페이지는 수십 개의 swap을 트리거할 수 있습니다. 각각은 그것을 발행한 페이지의 메모리가 없는 새로운 요청입니다. locale이 초기 렌더링 중에 설정된 변수에 존재한다면, 그 이후의 모든 fragment는 기본 언어로 폴백됩니다.

Intlayer middleware는 요청 자체에서 locale을 해결하므로, 10분에 서빙되는 fragment는 0분에 서빙되는 페이지와 동일한 언어로 응답합니다.

</Accordion>

<Accordion header="locale은 요청과 함께 이동해야 합니다">

htmx와 함께 작동하는 두 가지 carrier가 있습니다. cookie (`INTLAYER_LOCALE`)는 htmx 요청을 포함한 모든 요청에서 브라우저에 의해 자동으로 전송됩니다. header (`x-intlayer-locale`)는 `hx-headers` attribute를 사용하여 htmx 요청에 첨부할 수 있습니다. 둘 다 기본적으로 읽혀집니다.

</Accordion>

<Accordion header="교환된 HTML은 여전히 HTML입니다">

fragment로 보간된 번역 값은 마크업입니다. 다른 동적 값처럼 정확히 이스케이프하세요. 그래야 `<`를 포함하는 번역이 교환되는 문서를 손상시킬 수 없습니다.

</Accordion>

</AccordionGroup>

---

## 단계별 가이드

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

GitHub의 [Application Template](https://github.com/aymericzip/intlayer-htmx-template)을 참조하세요.

<Steps>

<Step number={1} title="의존성 설치">

`intlayer`와 server에 대한 통합을 설치합니다.

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

> Express와 Fastify는 자신의 cookie parser를 통해 locale cookie를 읽으므로, 이들과 함께 설치해야 합니다. Hono와 Elysia는 기본적으로 cookies를 파싱합니다.

htmx 자체는 step 4에서 추가되는 단일 script tag입니다.

</Step>

<Step number={2} title="프로젝트 구성">

프로젝트 root에 `intlayer.config.ts`를 생성하세요:

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

> 전체 옵션 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="콘텐츠 선언">

서버가 렌더링할 모든 레이블(fragment 내부에만 나타나는 레이블 포함)을 선언하세요:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      ko: "언어",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        ko: "장바구니의 항목: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      ko: "항목 추가",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Content declarations는 `contentDir` (기본값 `./src`) 아래의 어디든 위치할 수 있으며 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`과 일치합니다. [content declaration 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={4} title="Intlayer middleware 등록">

미들웨어는 각 요청의 locale을 해석하고 핸들러에 노출합니다.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// cookie parser가 먼저 실행되어야 합니다: `express-intlayer`는 `req.cookies`를 통해
// locale cookie를 읽습니다.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

해석된 locale은 `res.locals.locale`에 있습니다.

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

해석된 locale은 `req.intlayer.locale`에 있습니다.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

해석된 locale은 `c.get("locale")`입니다.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

해석된 locale은 라우트 context의 `intlayer!.locale`입니다.

  </Tab>
</Tabs>

기본적으로 locale은 `INTLAYER_LOCALE` 쿠키에서 가져오고, 그 다음 `x-intlayer-locale` 헤더, 그 다음 `Accept-Language` negotiation에서 가져옵니다.

</Step>

<Step number={5} title="요청 locale으로 fragments 렌더링">

fragment 렌더러를 locale의 순수 함수로 작성하고, 미들웨어가 해석한 locale을 전달합니다. 명시적으로 전달하면 fragment가 요청한 요청에 묶여 있으므로, 어느 server에 있든 상관없습니다.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** 번역된 값을 이스케이프하여 마크업을 벗어날 수 없도록 합니다. */
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

라우트에서 서빙하기:

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

같은 fragment는 이제 `fr` 쿠키를 가진 방문자를 위해 프랑스어로, `ar` 쿠키를 가진 방문자를 위해 아랍어로 응답하며, 호출하는 markup에는 변화가 없습니다.

</Step>

<Step number={6} title="첫 페이지 제공">

locale switcher가 step 7에서 전체를 바꿀 수 있도록 `<body>`를 단독으로 렌더링한 다음, htmx를 로드하는 document로 감싸세요:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  // locale에 해당하는 컨텐츠를 가져옵니다
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

`getHTMLTextDir`은 locale에 대해 `ltr`, `rtl` 또는 `auto`를 반환하며, 이것이 아랍어와 히브리어가 올바르게 배치되도록 하는 것입니다.

</Step>

<Step number={7} title="언어 전환">

언어 전환은 다른 요청과 같습니다. 서버는 선택을 미들웨어가 읽는 cookie에 저장한 다음 새로운 locale에서 다시 렌더링된 페이지를 반환합니다.

`<select>` 태그를 사용하여 전체 `<body>`를 교체하도록 자신을 게시하는 스위처를 렌더링하면, 프래그먼트 주변의 정적 레이블도 변경됩니다:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  // 현재 로케일에 대한 콘텐츠 가져오기
  const content = getIntlayer("app", locale);

  // 모든 사용 가능한 로케일에 대해 옵션 생성
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

> `getLocaleName(availableLocale, locale)`는 현재 표시되는 언어로 각 언어를 작성합니다. 각 언어를 자신의 언어로 대신 작성하려면 두 번째 인수를 전달하지 마세요.

값을 검증하고, 쿠키를 설정하고, 새로운 본문을 반환하여 POST를 처리하세요:

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
  const body = await c.req.parseBody();
  // 요청된 로케일을 문자열로 변환
  const requestedLocale = String(body["locale"]);

  // 선언된 로케일인지 확인
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // 쿠키에 로케일 설정
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

> `isDeclaredLocale`는 임의의 문자열을 구성된 로케일 중 하나로 좁혀주므로, 예기치 않은 값이 렌더러에 도달하지 않습니다.

</Step>

<Step number={8} title="swap 후 lang과 dir을 동기화 유지" isOptional={true}>

swap는 `<body>`를 바꿀 수 있지만, 그 주변의 `<html>`는 바꿀 수 없습니다. 바뀐 body에 `lang`과 `dir`을 렌더링하고, head에서 이들을 root 요소에 다시 복사합니다:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

이렇게 하지 않으면, 아랍어로 전환할 때 body 내부는 오른쪽에서 왼쪽으로 렌더링되지만 문서는 여전히 보조 기술과 크롤러에 이전 언어를 알립니다.

</Step>

<Step number={9} title="쿠키 대신 헤더로 locale 전송" isOptional={true}>

cookie가 적합하지 않다면, 조상 요소의 `hx-headers`를 사용하여 모든 htmx 요청에 locale을 첨부하세요. 자식 요소들이 이를 상속합니다:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

middleware는 기본적으로 `x-intlayer-locale`을 읽습니다. 설정에서 두 캐리어(carrier)의 이름을 변경할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 설정 옵션
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

### TypeScript 구성

자동 생성된 타입을 포함하여 선언되지 않은 키가 런타임에 빈 문자열이 아닌 컴파일 오류가 되도록 합니다.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 구성

Intlayer에서 생성된 파일을 무시하는 것이 권장됩니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장

Intlayer를 사용한 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장은 다음을 제공합니다:

- **번역 키에 대한 자동 완성**.
- **누락된 번역에 대한 실시간 오류 감지**.
- **번역된 콘텐츠의 인라인 미리보기**.
- **번역을 쉽게 생성하고 업데이트하기 위한 빠른 작업**.

확장을 사용하는 방법에 대한 자세한 내용은 [Intlayer VS Code Extension 문서](https://intlayer.org/doc/vs-code-extension)를 참고하세요.

---

### 더 나아가기

더 나아가기 위해 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있으므로 번역가가 배포 없이 복사본을 변경할 수 있습니다.

## 자주 묻는 질문

<FAQ>

<Question title="내 스왑된 프래그먼트가 잘못된 언어로 돌아오는 이유는 무엇인가요?">

조각 요청에 로케일이 포함되지 않았기 때문입니다. htmx 요청은 요청을 발행한 페이지와 독립적이므로, `INTLAYER_LOCALE` 쿠키 또는 `hx-headers`로 설정된 `x-intlayer-locale` 헤더를 통해 각 요청에서 로케일이 전달되어야 합니다. Express 및 Fastify에서 쿠키 파서가 Intlayer 미들웨어보다 먼저 실행되는지 확인하세요. 그렇지 않으면 쿠키를 읽지 못하고 모든 요청이 `Accept-Language`로 폴백됩니다.

</Question>

<Question title="로케일을 `getIntlayer`에 전달해야 할까요, 아니면 요청 컨텍스트에 의존해야 할까요?">

이를 전달하세요. integrations는 resolved locale (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`)을 노출하며, `getIntlayer`에 이를 전달하면 각 renderer가 locale의 순수 함수가 됩니다. 이는 테스트하기가 더 쉽고, 서버를 변경하는 경우 fragment renderer를 이식 가능하게 유지합니다.

</Question>

<Question title="htmx와 함께 클라이언트 측 i18n 라이브러리가 필요한가요?">

아니요. 방문자가 보는 모든 것은 서버에서 생성되므로 브라우저에서 번역할 항목이 없습니다. 이것이 또한 htmx 앱에서 i18n의 페이지 무게 비용이 거의 0에 가까운 이유입니다. catalog는 클라이언트에 전송되지 않습니다.

</Question>

<Question title="SEO를 위해 URL도 localize하려면 어떻게 해야 하나요?">

로케일 접두사(`/fr/cart`)로 페이지를 제공하고, 전체 페이지 렌더링을 위해 쿠키가 아닌 경로에서 로케일을 읽으십시오. 라우트 핸들러에서는 경로를 사용합니다. 프래그먼트는 쿠키나 헤더를 계속 사용할 수 있습니다. 라우팅 옵션은 [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)을 참조하고 [사용자 정의 URL 재작성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/custom_url_rewrites.md)을 참조하세요.

</Question>

<Question title="오른쪽에서 왼쪽으로 읽는 언어를 어떻게 처리합니까?">

`getHTMLTextDir(locale)`은 `ltr`, `rtl` 또는 `auto`를 반환합니다. 초기 렌더링 시 문서에 설정하고, 8단계에서 보여주듯이 교체 후 다시 적용하세요. CSS 논리적 속성(`margin-left` 대신 `margin-inline-start`)을 사용하여 레이아웃이 따라가도록 하세요.

</Question>

<Question title="번역된 값을 escape해야 하나요?">

네, 템플릿 문자열에 보간하는 모든 것에 대해, 다른 동적 값과 정확히 동일하게 escape해야 합니다. CMS 또는 번역가로부터 오는 콘텐츠는 제어하는 마크업이 아닙니다. 5단계에서 최소한의 escaper를 보여줍니다.

</Question>

<Question title="동일한 콘텐츠를 API 응답에도 사용할 수 있나요?">

예. 백엔드 통합은 모든 핸들러에 `t()`와 `getIntlayer()`를 노출하므로, 토스트에 표시되는 에러 메시지와 fragment로 렌더링되는 레이블이 동일한 선언된 콘텐츠에서 나옵니다. [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_hono.md) 및 [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_elysia.md) 가이드를 참조하세요.

</Question>

<Question title="콘텐츠를 key별로 이동해야 하나요?">

아니요. `npx intlayer extract`를 실행하면 Intlayer가 소스 파일을 읽고, 사용자 대면 문자열을 추출한 후 각 파일 옆에 `.content` 파일을 작성하므로, 카탈로그에 문자열을 하나씩 복사하는 대신 diff를 검토할 수 있습니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 참조하세요.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 소스로 유지하고 양방향으로 Intlayer 사전을 생성합니다. [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)를 통해 로케일을 한 파일에 그룹화하는 대신 언어별로 콘텐츠를 분할할 수 있습니다.

</Question>

<Question title="AI로 앱을 자동으로 번역하려면 어떻게 해야 하나요?">

`npx intlayer fill`을 실행하면 선택한 LLM을 사용하여 자신의 provider와 API 키로 누락된 번역을 채웁니다. `--git-diff`를 추가하면 branch에서 변경된 내용만 번역합니다. [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md)와 [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 성별, 조건 및 보간된 값을 지원하나요?">

예: [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건, [열거형](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md), 보간 값을 위한 [삽입](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md), 그리고 숫자, 날짜 및 통화를 위한 [포매터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md).

</Question>

<Question title="어떤 에디터와 AI 에이전트 도구가 사용 가능한가요?">

5가지 옵션이 모두 선택사항입니다:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: 키에서 이를 선언하는 콘텐츠 파일로 이동, 파일에서 콘텐츠 추출, 명령 팔레트에서 build, fill, test, push 및 pull 실행.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 편집기에서 동일한 인식, 정의로 이동, 번역된 값의 hover 미리보기, 키의 자동완성, 및 키가 어디에도 선언되지 않았을 때의 경고.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Intlayer 문서 및 CLI를 Cursor, VS Code, Claude Desktop, Claude Code 및 ChatGPT에 노출.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli` 및 `intlayer-content`와 같은 집중된 기술입니다.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text`는 하드코딩된 문자열을 표시합니다.

</Question>

<Question title="Intlayer는 무료이고 오픈 소스입니까?">

네, Apache 2.0 라이선스 하에서 상용 사용이 포함됩니다. 호스팅된 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)할 수도 있습니다.

</Question>

</FAQ>

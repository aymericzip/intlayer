---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Повний посібник для перекладу вашої програми"
description: "Більше no more i18next. Посібник 2026 року з створення багатомовної (i18n) htmx програми. Перекладайте за допомогою AI агентів та оптимізуйте розмір пакета, SEO та продуктивність."
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
    changes: "Початкова історія"
author: aymericzip
---

# Перекладіть вашу htmx програму за допомогою Intlayer | Internationalization (i18n)

htmx не отримує власного контенту. Кожен напис, який читає відвідувач, - це HTML, який виробив ваш сервер, і кожна заміна є окремим HTTP-запитом. Інтернаціоналізація htmx додатка - це тому серверна справа: локаль повинна бути визначена на кожному запиті, і кожен фрагмент повинен бути відрендерений цією мовою.

Intlayer охоплює це через свої backend інтеграції, які виявляють локаль для кожного запиту і показують ваш оголошений контент обробнику, який формує HTML.

## Зміст

<TOC/>

## Три правила i18n у htmx додатку

<AccordionGroup>
<Accordion header="Локаль повинна бути визначена на кожному запиті, не лише на першому">

Одна сторінка може ініціювати десятки swap'ів. Кожен з них - це свіжий запит без пам'яті про сторінку, яка його видала. Якщо локаль живе у змінній, встановленій під час початкового рендерингу, кожен фрагмент після нього повертається до мови за замовчуванням.

Middleware Intlayer розв'язує локаль із самого запиту, тому фрагмент, поданий на десятій хвилині, відповідає тією ж мовою, що й сторінка, подана на нульовій хвилині.

</Accordion>

<Accordion header="Локаль має подорожувати з запитом">

Два переносники працюють з htmx. Cookie (`INTLAYER_LOCALE`) автоматично відправляється браузером при кожному запиті, включаючи запити htmx. Заголовок (`x-intlayer-locale`) може бути прикріплений до запитів htmx за допомогою атрибута `hx-headers`. Обидва читаються за замовчуванням.

</Accordion>

<Accordion header="Замінений HTML залишається HTML">

Перекладене значення, інтерпольоване у фрагмент, є розміткою. Екранізуйте його точно так само, як ви робили б з будь-яким іншим динамічним значенням, тому переклад, що містить `<`, не може розірвати документ, у який він вставляється.

</Accordion>
</AccordionGroup>

---

## Покрокове керівництво

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати вашу програму за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Див. [Application Template](https://github.com/aymericzip/intlayer-htmx-template) на GitHub.

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть `intlayer` плюс інтеграцію для вашого сервера.

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

> Express та Fastify читають куки локалі через власні парсери cookies, тому їх потрібно встановити разом. Hono та Elysia розбирають cookies нативно.

htmx сам по собі - це один тег скрипту, який додається на кроці 4.

</Step>

<Step number={2} title="Конфігурація вашого проекту">

Створіть `intlayer.config.ts` у кореневі вашого проекту:

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

> Для повного списку параметрів див. [документацію конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Оголосити ваш вміст">

Оголосіть кожен label, який сервер буде відображати, включаючи ті, що з'являються тільки всередині фрагмента:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      uk: "Мова",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        uk: "Товари у вашому кошику: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      uk: "Додати товар",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Оголошення контенту можуть знаходитися будь-де під `contentDir` (за замовчуванням `./src`) та відповідати `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. Див. [документацію оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={4} title="Зареєструвати middleware Intlayer">

Middleware розпізнає локаль кожного запиту та надає її доступ до ваших обробників.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// The cookie parser has to run first: `express-intlayer` reads the locale
// cookie through `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

Розпізнана локаль знаходиться на `res.locals.locale`.

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

Розпізнана локаль знаходиться на `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

Розпізнана локаль - це `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

Розраховане locale доступне як `intlayer!.locale` на контексті маршруту.

  </Tab>
</Tabs>

За замовчуванням locale беруть з cookies `INTLAYER_LOCALE`, потім із заголовка `x-intlayer-locale`, потім із переговорів `Accept-Language`.

</Step>

<Step number={5} title="Рендеризуйте фрагменти з locale запиту">

Напишіть ваші рендери фрагментів як чисті функції locale та передайте locale, яке middleware розрахував. Передання його явно утримує фрагмент прив'язаним до запиту, який його запросив, незалежно від того, на якому сервері ви перебуваєте.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Екранує перекладене значення, щоб воно не могло вийти за межі розмітки. */
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

Подайте його з маршруту:

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

Той же фрагмент тепер відповідає французькою мовою для відвідувача, чий cookie говорить `fr`, і арабською для того, чий cookie говорить `ar`, без змін у викликаному розмітці.

</Step>

<Step number={6} title="Служба першої сторінки">

Рендеріть `<body>` окремо, щоб перемикач мови на кроці 7 міг замінити його цілком, потім обгорніть його в документ, який завантажує htmx:

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

`getHTMLTextDir` повертає `ltr`, `rtl` або `auto` для locale, що забезпечує правильне відображення арабської та іврит мов.

</Step>

<Step number={7} title="Змінити мову">

Зміна мови - це запит як і будь-який інший. Сервер зберігає вибір у cookie, що його читає middleware, потім повертає сторінку, перевідрендерену на новій локалі.

Відобразіть перемикач як `select`, який відправляє себе та замінює весь `<body>`, щоб статичні мітки навколо ваших фрагментів також змінилися:

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

> `getLocaleName(availableLocale, locale)` записує кожну мову мовою, яка зараз відображається. Передайте другий аргумент, щоб замість цього написати кожну мовою її власної мови.

Обробляйте post, перевіряючи значення, встановлюючи cookie та повертаючи нове тіло:

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
  // Отримати запитану локаль з тіла запиту
  const requestedLocale = String(body["locale"]);

  // Перевірити, чи є запитана локаль задекларована
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // Встановити cookie для локалі
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

> `isDeclaredLocale` звужує довільний рядок до одного з ваших налаштованих локалей, тому неочікуване значення ніколи не потрапляє до ваших рендерерів.

</Step>

<Step number={8} title="Синхронізуйте lang і dir після заміни" isOptional={true}>

Обмін може замінити `<body>`, але ніколи не замінює `<html>` навколо нього. Рендеріть `lang` та `dir` на обміненому body та скопіюйте їх назад на кореневий елемент один раз з head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Без цього перемикання на арабську мову рендеритиме справа наліво всередину body, а документ все ще повідомляє попередню мову допоміжним технологіям та краулерам.

</Step>

<Step number={9} title="Надіслати локаль як заголовок замість cookie" isOptional={true}>

Якщо cookie вас не влаштовує, додайте локаль до кожного htmx запиту за допомогою `hx-headers` на елементі-предку. Нащадки успадковують її:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Middleware за замовчуванням читає `x-intlayer-locale`. Ви можете перейменувати обидва носії в конфігурації:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші параметри конфігурації
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

### Налаштування TypeScript

Включіть автоматично згенеровані типи, щоб невизначений ключ був помилкою компіляції, а не порожнім рядком під час виконання.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включіть автоматично згенеровані типи
  ],
}
```

### Git Configuration

Рекомендується ігнорувати файли, згенеровані Intlayer:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### VS Code Extension

Щоб покращити розробку за допомогою Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок в реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання більше деталей про використання розширення звертайтесь до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Йти далі

Щоб йти далі, ви можете екстерналізувати свій вміст за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), щоб перекладачі змінювали копію без розгортання.

## Часто задавані запитання

<FAQ>

<Question title="Чому мій обміняний фрагмент повертається неправильною мовою?">

Тому що запит фрагмента не мав локалі. htmx запити незалежні від сторінки, яка їх видала, тому локаль повинна передаватися на кожному з них через cookie `INTLAYER_LOCALE` або заголовок `x-intlayer-locale`, встановлений за допомогою `hx-headers`. Переконайтеся, що парсер cookie запускається перед middleware Intlayer на Express та Fastify, інакше cookie ніколи не читається і кожен запит повертається до `Accept-Language`.

</Question>

<Question title="Чи повинен я передавати локаль до `getIntlayer` або покладатися на контекст запиту?">

Передавайте його. Інтеграції надають розпізнану локаль (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), а передача її до `getIntlayer` робить кожен renderer чистою функцією локалі. Це простіше тестувати, і це робить ваші fragment renderers портативними, якщо ви зміните server.

</Question>

<Question title="Чи мені потрібна клієнтська бібліотека i18n поряд з htmx?">

Ні. Все, що бачить відвідувач, створюється сервером, тому в браузері нічого не потрібно перекладати. Саме тому вартість ваги сторінки для i18n в htmx додатку близька до нуля: жоден каталог ніколи не відправляється клієнту.

</Question>

<Question title="Як мені локалізувати URL також для SEO?">

Подавайте свої сторінки з префіксом локалі (`/fr/cart`) і читайте локаль зі шляху у вашому обробнику маршруту, а не з cookie, для повного рендерингу сторінки. Фрагменти можуть продовжити використовувати cookie або заголовок. Див. [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для параметрів маршрутизації та [custom URL rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/custom_url_rewrites.md).

</Question>

<Question title="Як я обробляю мови, які читаються справа наліво?">

`getHTMLTextDir(locale)` повертає `ltr`, `rtl` або `auto`. Установіть його на документ для першого рендерингу та переналаштуйте його після заміни, як показано на кроці 8. Використовуйте логічні властивості CSS (`margin-inline-start` замість `margin-left`), щоб ваш макет слідував за ними.

</Question>

<Question title="Чи потрібно мені екранувати перекладені значення?">

Так, для будь-чого, що ви інтерполюєте в рядок шаблону, точно як і для будь-якого іншого динамічного значення. Вміст, який надходить від CMS або від перекладача, - це не розмітка, яку ви контролюєте. Крок 5 показує мінімальний екранувач.

</Question>

<Question title="Чи може той же вміст обслуговувати мої відповіді API?">

Так. Backend інтеграції виставляють `t()` та `getIntlayer()` для будь-якого handler, тому повідомлення об помилці, показане в toast, і label, відрендерений у fragment, походять від того самого оголошеного content. Див. керівництва [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_hono.md) та [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_elysia.md).

</Question>

<Question title="Чи потрібно мені переміщувати мій content ключ за ключем?">

Ні. Запустіть `npx intlayer extract` і Intlayer прочитає ваші вихідні файли, витягне рядки, орієнтовані на користувача, і напише файл `.content` поруч з кожним з них, тому ви переглядаєте diff замість копіювання рядків в каталог один за одним. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них, в обох напрямках. [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють вам розділити вміст за мовою замість групування локалей в один файл.

</Question>

<Question title="Як я автоматично перекладаю додаток за допомогою штучного інтелекту?">

Запустіть `npx intlayer fill`, який заповнює відсутні переклади за допомогою LLM на ваш вибір, використовуючи вашого власного провайдера та API ключ. Додайте `--git-diff`, щоб перекладати лише вміст, змінений у гілці. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи Intlayer підтримує гендер, умови та інтерпольовані значення?">

Так: [контент на основі статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [перелічення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration.md), [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md) для інтерпольованих значень та [форматори](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) для чисел, дат та валют.

</Question>

<Question title="Які редактори та інструменти AI агентів доступні?">

П'ять компонентів, всі необов'язкові:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа до файлу контенту, який його оголошує, видалення контенту з файлу та запуск build, fill, test, push та pull з палітри команд.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: те саме розуміння в будь-якому редакторі, який підтримує LSP, з переходом до визначення, попередніми переглядами перекладеного значення, автодоповненням ключів та попередженням, коли ключ не оголошений ніде.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: фокусовані навички, такі як `intlayer-config`, `intlayer-cli` і `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: `no-raw-text` позначає жорстко закодовані рядки.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим джерелом?">

Так, під ліцензією Apache 2.0, включаючи комерційне використання. Розміщена [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) - це опційна платна послуга, яка також може бути [самостійно розміщена](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>

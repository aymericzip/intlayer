---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Полное руководство по переводу вашего приложения"
description: "Больше не нужен i18next. Руководство 2026 года по созданию многоязычного (i18n) htmx приложения. Переводите с помощью AI агентов и оптимизируйте размер bundle, SEO и производительность."
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

# Переведите ваше htmx приложение с помощью Intlayer | Internationalization (i18n)

htmx не отображает никаких собственных элементов контента. Каждый текст, который видит пользователь, — это HTML, созданный вашим сервером, и каждый swap — это отдельный HTTP-запрос. Интернационализация htmx-приложения — это поэтому ответственность сервера: локаль должна разрешаться при каждом запросе, и каждый фрагмент должен быть отрендерен на этой локали.

Intlayer решает эту проблему через свои backend-интеграции, которые определяют локаль для каждого запроса и предоставляют ваше объявленное содержимое обработчику, который создает HTML.

## Содержание

<TOC/>

## Три правила i18n в htmx-приложении

<AccordionGroup>

<Accordion header="Локаль должна разрешаться при каждом запросе, а не только при первом">

Одна страница может вызвать десятки свопов. Каждый из них — это отдельный запрос без памяти о странице, которая его инициировала. Если locale находится в переменной, установленной во время начального рендеринга, каждый фрагмент после неё попадает на язык по умолчанию.

Middleware Intlayer разрешает locale из самого запроса, поэтому фрагмент, поданный на десятой минуте, отвечает на том же языке, что и страница, поданная в нулевую минуту.

</Accordion>

<Accordion header="Locale должен путешествовать с запросом">

С htmx работают два носителя. Cookie (`INTLAYER_LOCALE`) автоматически отправляется браузером на каждый запрос, включая htmx запросы. Заголовок (`x-intlayer-locale`) может быть прикреплен к htmx запросам с помощью атрибута `hx-headers`. По умолчанию читаются оба.

</Accordion>

<Accordion header="Заменённый HTML остаётся HTML">

Переведённое значение, интерполированное в фрагмент, это разметка. Экранируйте его, точно так же, как вы делали бы с любым другим динамическим значением, чтобы перевод, содержащий `<`, не мог нарушить документ, в который он вставляется.

</Accordion>

</AccordionGroup>

---

## Пошаговое руководство

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Как интернационализировать приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-htmx-template) на GitHub.

<Steps>

<Step number={1} title="Установка зависимостей">

Установите `intlayer` плюс интеграцию для вашего сервера.

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

> Express и Fastify читают куки локали через собственные парсеры куков, поэтому они должны быть установлены вместе. Hono и Elysia анализируют куки изначально.

htmx сам по себе - это единый тег скрипта, добавляемый на шаге 4.

</Step>

<Step number={2} title="Конфигурация вашего проекта">

Создайте `intlayer.config.ts` в корне вашего проекта:

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

> Для полного списка опций см. [документацию конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Объявите Ваш Контент">

Объявите каждый label, который сервер будет рендерить, включая те, которые появляются только внутри фрагмента:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      ru: "Язык",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        ru: "Товары в вашей корзине: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      ru: "Добавить товар",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Объявления контента могут находиться в любом месте внутри `contentDir` (по умолчанию `./src`) и совпадать с `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. См. [документацию по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={4} title="Зарегистрировать middleware Intlayer">

Middleware разрешает locale каждого запроса и предоставляет его вашим обработчикам.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Cookie parser должен работать первым: `express-intlayer` читает locale
// cookie через `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

Разрешённый locale находится на `res.locals.locale`.

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

Разрешённая локаль находится на `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

Разрешённая локаль — это `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

Разрешённая локаль — это `intlayer!.locale` на контексте маршрута.

  </Tab>
</Tabs>

По умолчанию локаль берётся из cookie `INTLAYER_LOCALE`, затем из заголовка `x-intlayer-locale`, затем из согласования `Accept-Language`.

</Step>

<Step number={5} title="Отрендеривать фрагменты с локалью запроса">

Напишите ваши рендереры фрагментов как чистые функции локали и передайте разрешённую middleware локаль. Передача её явно связывает фрагмент с запросом, который его запросил, независимо от того, на каком сервере вы находитесь.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Экранирует переведенное значение, чтобы оно не могло вырваться из разметки. */
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

Обслуживайте его из маршрута:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // Получаем количество товаров из тела запроса
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // Отправляем HTML-ответ с отрендеренной корзиной
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // Получаем количество товаров из тела запроса и увеличиваем на 1
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // Отправляем HTML-ответ с отрендеренной корзиной
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

Тот же фрагмент теперь отвечает на французском для посетителя, чье cookie говорит `fr`, и на арабском для того, чье cookie говорит `ar`, без изменений в вызываемой разметке.

</Step>

<Step number={6} title="Serve the first page">

Render the `<body>` на его собственном, так что переключатель локали на шаге 7 может заменить его целиком, затем оберните его в документ, который загружает htmx:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  // Получить контент приложения для заданной локали
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

`getHTMLTextDir` возвращает `ltr`, `rtl` или `auto` для локали, что обеспечивает корректное отображение арабского и иврита.

</Step>

<Step number={7} title="Переключение языка">

Переключение языка — это обычный запрос. Сервер сохраняет выбор в cookie, который читает middleware, затем возвращает страницу, отрендеренную в новой локали.

Отобразите переключатель в виде `select`, который отправляет сам себя и заменяет весь `<body>`, чтобы статические метки вокруг ваших фрагментов тоже изменились:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  // Получить содержимое приложения для текущей локали
  const content = getIntlayer("app", locale);

  // Создать опции select для каждой доступной локали
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

> `getLocaleName(availableLocale, locale)` записывает каждый язык на текущий отображаемый язык. Передайте второй аргумент без значения, чтобы записать каждый на его собственный язык.

Обработайте post, проверив значение, установив cookie и вернув новое тело:

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
  // Получение запрошенной локали из тела запроса
  const requestedLocale = String(body["locale"]);

  // Проверка, что локаль объявлена в конфигурации
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // Установка cookie с выбранной локалью
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

> `isDeclaredLocale` сужает произвольную строку до одной из ваших настроенных локалей, поэтому неожиданное значение никогда не достигает ваших renderers.

</Step>

<Step number={8} title="Синхронизировать lang и dir после замены" isOptional={true}>

Swap может заменить `<body>`, но никогда `<html>` вокруг него. Отрендерьте `lang` и `dir` на заменяемом body и скопируйте их обратно на корневой элемент один раз из head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Без этого переключение на арабский язык будет отображаться справа налево внутри body, но документ по-прежнему сообщает вспомогательным технологиям и краулерам о предыдущем языке.

</Step>

<Step number={9} title="Отправлять локаль как заголовок вместо cookie" isOptional={true}>

Если cookie вам не подходит, прикрепляйте локаль к каждому htmx запросу с помощью `hx-headers` на элементе-предке. Потомки наследуют её:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Middleware по умолчанию читает `x-intlayer-locale`. Вы можете переименовать оба носителя в вашей конфигурации:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Other configuration options
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

### Настройка TypeScript

Включите автоматически сгенерированные типы, чтобы необъявленный ключ вызывал ошибку компиляции, а не пустую строку во время выполнения.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включите автоматически сгенерированные типы
  ],
}
```

### Git Configuration

Рекомендуется игнорировать файлы, сгенерированные Intlayer:

```plaintext fileName=".gitignore"
# Игнорируйте файлы, сгенерированные Intlayer
.intlayer
```

### VS Code Extension

Чтобы улучшить опыт разработки с Intlayer, вы можете установить официальное расширение **Intlayer VS Code Extension**.

[Установите из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенные предпросмотры** переведённого контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения дополнительной информации об использовании расширения см. [документацию расширения Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Идите дальше

Чтобы пойти дальше, вы можете экстернализировать свой контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), чтобы переводчики могли изменять копию без развёртывания.

## Часто задаваемые вопросы

<FAQ>

<Question title="Почему мой заменённый фрагмент возвращается на неправильном языке?">

Потому что запрос фрагмента не содержал locale. htmx запросы независимы от страницы, которая их выдала, поэтому locale должен передаваться на каждом запросе через cookie `INTLAYER_LOCALE` или заголовок `x-intlayer-locale`, установленный с помощью `hx-headers`. Убедитесь, что cookie parser запускается перед middleware Intlayer на Express и Fastify, иначе cookie никогда не будет прочитан и каждый запрос вернётся к `Accept-Language`.

</Question>

<Question title="Должен ли я передавать locale в `getIntlayer` или полагаться на контекст запроса?">

Передавайте его. Интеграции предоставляют разрешённую локаль (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), и передача её в `getIntlayer` делает каждый renderer чистой функцией локали. Это легче тестировать, и это сохраняет портативность ваших fragment renderers, если вы смените сервер.

</Question>

<Question title="Нужна ли мне клиентская библиотека i18n рядом с htmx?">

Нет. Всё, что видит посетитель, создаётся сервером, поэтому в браузере нечего переводить. Это также причина, по которой стоимость веса страницы i18n в приложении htmx близка к нулю: каталог никогда не отправляется клиенту.

</Question>

<Question title="Как мне также локализовать URL для SEO?">

Обслуживайте ваши страницы с префиксом локали (`/fr/cart`) и читайте локаль из пути в вашем обработчике маршрута, а не из cookie, для полного рендеринга страницы. Фрагменты могут продолжать использовать cookie или заголовок. См. [конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) для опций маршрутизации и [пользовательские переписи URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/custom_url_rewrites.md).

</Question>

<Question title="Как обрабатывать языки справа налево?">

`getHTMLTextDir(locale)` возвращает `ltr`, `rtl` или `auto`. Установите это на документе для начального рендеринга и переприменяйте после замены, как показано на шаге 8. Используйте логические свойства CSS (`margin-inline-start` вместо `margin-left`), чтобы ваша разметка соответствовала этому.

</Question>

<Question title="Нужно ли мне экранировать переведённые значения?">

Да, для всего, что вы интерполируете в строку шаблона, точно так же как для любого другого динамического значения. Контент из CMS или от переводчика – это не разметка, которую вы контролируете. Шаг 5 показывает минимальный экранировщик.

</Question>

<Question title="Может ли один и тот же контент обслуживать и мои API-ответы?">

Да. Backend интеграции предоставляют `t()` и `getIntlayer()` любому обработчику, поэтому сообщение об ошибке, отображаемое в toast, и метка, отображаемая во фрагменте, берутся из одного объявленного контента. See the [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_hono.md) и [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_elysia.md) гайды.

</Question>

<Question title="Нужно ли мне перемещать контент ключ за ключом?">

Нет. Запустите `npx intlayer extract` и Intlayer прочитает исходные файлы, извлечет пользовательские строки и напишет файл `.content` рядом с каждым, чтобы вы просмотрели diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

</Question>

<Question title="Can I keep my existing JSON translation files?">

Да. [Плагин sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует словари Intlayer из них в обоих направлениях. [Плагин sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локалям](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют вам разделить контент по языкам вместо группировки локалей в один файл.

</Question>

<Question title="How do I translate the app automatically with AI?">

Выполните `npx intlayer fill`, который заполняет отсутствующие переводы с использованием выбранной вами LLM с помощью вашего собственного провайдера и API ключа. Добавьте `--git-diff` для перевода только контента, измененного в ветке. Смотрите [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer gender, условия и интерполированные значения?">

Да: [контент на основе пола](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [перечисления](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md), [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md) для интерполированных значений и [форматеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Какой редактор и инструменты AI-агентов доступны?">

Пять компонентов, все опциональны:

- **[Расширение VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа к файлу контента, который его объявляет, извлечение контента из файла и запуск build, fill, test, push и pull из палитры команд.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: такая же поддержка в любом редакторе, поддерживающем LSP, с переходом к определению, предпросмотром переведённого значения при наведении, автодополнением ключей и предупреждением, когда ключ не объявлен нигде.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию Intlayer и CLI для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сосредоточенные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` отмечает жестко закодированные строки.

</Question>

<Question title="Является ли Intlayer бесплатным и открытым исходным кодом?">

Да, под лицензией Apache 2.0, коммерческое использование включено. Размещенная [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) — это дополнительный платный сервис, который также может быть [самостоятельно размещен](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>

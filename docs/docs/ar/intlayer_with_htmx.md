---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "ترجمة تطبيق htmx باستخدام Intlayer - دليل كامل"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق htmx متعدد اللغات (i18n). ترجمة مع وكلاء الذكاء الاصطناعي وتحسين حجم الحزمة و SEO والأداء."
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

# ترجمة تطبيق htmx باستخدام Intlayer | الدولية (i18n)

htmx لا يعرض أي محتوى خاص به. كل تسمية يقرأها الزائر هي HTML أنتجها الخادم، وكل تبديل هو طلب HTTP منفصل. لذا فإن دولي (i18n) لتطبيق htmx يعتبر مسؤولية الخادم: يجب حل locale على كل طلب، وكل جزء يجب أن يتم تصييره في هذا locale.

يغطي Intlayer هذا من خلال تكاملاته الخلفية، التي تكتشف locale لكل طلب وتعرض محتوى معلن عليه للمعالج الذي ينشئ HTML.

## جدول المحتويات

<TOC/>

## القواعد الثلاث للدولي (i18n) في تطبيق htmx

<AccordionGroup>

<Accordion header="يجب حل locale على كل طلب، وليس فقط على الأول">

صفحة واحدة يمكن أن تؤدي إلى عشرات عمليات الاستبدال. كل واحدة منها طلب جديد بدون ذاكرة عن الصفحة التي أصدرتها. إذا كانت اللغة موجودة في متغير تم تعيينه أثناء العرض الأولي، فإن كل جزء بعده سيعود إلى اللغة الافتراضية.

يقوم middleware Intlayer بحل اللغة من الطلب نفسه، لذلك يجيب الجزء المقدم في الدقيقة العاشرة باللغة ذاتها التي تم تقديم الصفحة بها في الدقيقة الصفر.

</Accordion>

<Accordion header="يجب أن تسافر اللغة مع الطلب">

يعمل حاملان مع htmx. يتم إرسال ملف تعريف الارتباط (`INTLAYER_LOCALE`) من قبل المتصفح تلقائياً في كل طلب، بما في ذلك طلبات htmx. يمكن إرفاق رأس (`x-intlayer-locale`) بطلبات htmx باستخدام السمة `hx-headers`. يتم قراءة كليهما بشكل افتراضي.

</Accordion>

<Accordion header="HTML المبدل لا يزال HTML">

القيمة المترجمة المدرجة في مقطع هي markup. قم بـ escape لها، تماماً كما تفعل مع أي قيمة ديناميكية أخرى، لذلك لا يمكن لترجمة تحتوي على `<` أن تكسر المستند الذي يتم تبديله فيه.

</Accordion>

</AccordionGroup>

---

## دليل خطوة بخطوة

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية جعل تطبيقك متعدد اللغات باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

انظر إلى [نموذج التطبيق](https://github.com/aymericzip/intlayer-htmx-template) على GitHub.

<Steps>

<Step number={1} title="تثبيت المتطلبات">

قم بتثبيت `intlayer` بالإضافة إلى التكامل الخاص بخادمك.

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

> يقرأ Express و Fastify ملف تعريف الارتباط للمنطقة الزمنية من خلال معالجات الملفات الخاصة بهم، لذا يجب تثبيتها جنبًا إلى جنب. يحلل Hono و Elysia ملفات تعريف الارتباط بشكل أصلي.

htmx نفسه عبارة عن وسم نصي واحد، مضاف في الخطوة 4.

</Step>

<Step number={2} title="تكوين مشروعك">

أنشئ `intlayer.config.ts` في جذر مشروعك:

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

> للحصول على القائمة الكاملة للخيارات، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="أعلن عن محتواك">

أعلن عن كل التسميات التي سيعيدها الخادم، بما في ذلك تلك التي تظهر فقط داخل جزء:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      ar: "اللغة",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
    }),

    cartSummary: insert(
      t({
        ar: "المنتجات في سلتك: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
      })
    ),

    addItem: t({
      ar: "أضف منتجًا",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> يمكن أن توجد إعلانات المحتوى في أي مكان تحت `contentDir` (بشكل افتراضي `./src`) وتطابق `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. انظر إلى [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

</Step>

<Step number={4} title="تسجيل middleware Intlayer">

يحل الـ middleware لغة كل طلب ويعرّضها لمعالجاتك.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// يجب تشغيل محلل الكوكيز أولاً: `express-intlayer` يقرأ كوكي اللغة
// من خلال `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

اللغة المحللة موجودة في `res.locals.locale`.

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

اللغة المحلولة موجودة على `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

اللغة المحلولة هي `c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

يتم حل locale على `intlayer!.locale` في سياق المسار.

  </Tab>
</Tabs>

افتراضياً، يتم أخذ locale من ملف تعريف `INTLAYER_LOCALE`، ثم رأس `x-intlayer-locale`، ثم تفاوض `Accept-Language`.

</Step>

<Step number={5} title="عرض الأجزاء مع locale الطلب">

اكتب أداة عرض الأجزاء كدوال نقية لـ locale، وأرسل locale الذي حله الـ middleware. يحافظ تمريره بشكل صريح على ارتباط الجزء بالطلب الذي طلبه، أياً كان الخادم الذي تستخدمه.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** تهريب قيمة مترجمة حتى لا تتمكن من الخروج من الترميز. */
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

قدّمها من مسار:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // الحصول على عدد العناصر من جسم الطلب وإضافة 1
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // إرسال استجابة HTML مع بيانات السلة المحدثة
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // الحصول على عدد العناصر من جسم الطلب وإضافة 1
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // إرسال استجابة HTML مع بيانات السلة المحدثة
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

الآن يجيب نفس المقطع باللغة الفرنسية للزائر الذي تقول ملفات تعريفه `fr`، وباللغة العربية لمن تقول ملفات تعريفه `ar`، بدون أي تغيير في الترميز الذي يستدعيه.

</Step>

<Step number={6} title="خدمة الصفحة الأولى">

قم بتصيير `<body>` بمفردها، بحيث يمكن لمحول اللغة في الخطوة 7 استبدالها بالكامل، ثم قم بلفها في المستند الذي يحمل htmx:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  // الحصول على محتوى التطبيق للغة المحددة
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

تُرجع `getHTMLTextDir` قيمة `ltr` أو `rtl` أو `auto` للـ locale، وهذا ما يجعل العربية والعبرية تتصرف بشكل صحيح.

</Step>

<Step number={7} title="تبديل اللغة">

تبديل اللغة هو طلب مثل أي طلب آخر. يقوم الخادم بتخزين الاختيار في ملف تعريف الارتباط الذي يقرأه middleware، ثم يُرجع الصفحة معاد تصييرها باللغة الجديدة.

قم بتصيير محول اللغة كـ `select` الذي ينشر نفسه ويستبدل كل `<body>`، بحيث تتغير العلامات الثابتة حول أجزائك أيضاً:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  // الحصول على محتوى التطبيق للغة الحالية
  const content = getIntlayer("app", locale);

  // إنشاء خيارات قائمة الاختيار لكل لغة متاحة
  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? " selected" : ""}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join("");

  // إرجاع نموذج HTML يحتوي على محول اللغة
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

> `getLocaleName(availableLocale, locale)` تكتب كل لغة باللغة المعروضة حالياً. لا تمرر أي وسيط ثاني لكتابة كل واحدة بلغتها الخاصة بدلاً من ذلك.

تعامل مع المنشور من خلال التحقق من القيمة وتعيين ملف تعريف الارتباط وإرجاع النص الجديد:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", (req, res) => {
  // الحصول على اللغة المطلوبة من جسم الطلب
  const requestedLocale = String(req.body?.locale);

  // التحقق من أن اللغة المطلوبة معلنة
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
  // استخراج الـ body من الطلب
  const body = await c.req.parseBody();
  // الحصول على اللغة المطلوبة من الـ body
  const requestedLocale = String(body["locale"]);

  // التحقق من أن اللغة المطلوبة معلنة في الإعدادات
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // تعيين ملف تعريف الارتباط للغة المطلوبة
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  // إرجاع صفحة HTML بالـ render للغة المطلوبة
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

> يقوم `isDeclaredLocale` بتضييق نطاق سلسلة نصية عشوائية إلى أحد لغاتك المُعدّة، لذلك لن تصل أي قيمة غير متوقعة إلى معالجاتك.

</Step>

<Step number={8} title="الحفاظ على lang و dir متزامنة بعد استبدال" isOptional={true}>

يمكن للـ swap أن يستبدل `<body>`، لكن ليس العنصر `<html>` حوله. قم بتصيير `lang` و `dir` على الـ body المستبدل وانسخهما مرة أخرى إلى العنصر الجذر مرة واحدة، من الـ head:

```html fileName="src/views.ts"
<script>
  // استمع إلى حدث afterSwap من htmx
  document.addEventListener("htmx:afterSwap", () => {
    // انسخ خصائص lang و dir من body إلى العنصر الجذر html
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

بدون هذا، عند التبديل إلى اللغة العربية، سيتم العرض من اليمين إلى اليسار داخل الـ body بينما لا يزال المستند يعلن اللغة السابقة لتكنولوجيا المساعدة وللزحافات.

</Step>

<Step number={9} title="إرسال المنطقة الإقليمية كرأس بدلاً من ملف تعريف ارتباط" isOptional={true}>

إذا لم تناسبك ملف تعريف الارتباط (cookie)، أرفق الإعدادات المحلية لكل طلب htmx باستخدام `hx-headers` على عنصر أب. ترث العناصر الفرعية هذا:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

يقرأ middleware `x-intlayer-locale` بشكل افتراضي. يمكنك إعادة تسمية كلا الناقلين في إعدادك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات الإعدادات الأخرى
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

### تكوين TypeScript

قم بتضمين الأنواع المولدة تلقائياً حتى يكون المفتاح غير المُعلَّن خطأ في وقت الترجمة بدلاً من سلسلة فارغة في وقت التشغيل.

```json5 fileName="tsconfig.json"
{
  // ... إعدادات TypeScript الموجودة لديك
  "include": [
    // ... إعدادات TypeScript الموجودة لديك
    ".intlayer/**/*.ts", // قم بتضمين الأنواع المولدة تلقائياً
  ],
}
```

### تكوين Git

يُنصح بتجاهل الملفات المولدة بواسطة Intlayer:

```plaintext fileName=".gitignore"
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

### VS Code Extension

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **Intlayer VS Code Extension** الرسمية.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذا الامتداد:

- **إكمال تلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

للحصول على مزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [وثائق امتداد Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

### المزيد

للمتابعة، يمكنك إضفاء طابع خارجي على محتواك باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، حتى يتمكن المترجمون من تغيير النسخ دون نشر.

## الأسئلة الشائعة

<FAQ>

<Question title="لماذا يعود الجزء المتبادل الخاص بي بالغة الخاطئة؟">

لأن طلب الجزء لم يحمل أي locale. طلبات htmx مستقلة عن الصفحة التي أصدرتها، لذا يجب أن ينتقل locale عليها، من خلال ملف تعريف الارتباط `INTLAYER_LOCALE` أو رأس `x-intlayer-locale` معين مع `hx-headers`. تحقق من أن محلل ملفات تعريف الارتباط يعمل قبل middleware الـ Intlayer على Express و Fastify، وإلا فلن يتم قراءة ملف تعريف الارتباط أبداً وسيعود كل طلب إلى `Accept-Language`.

</Question>

<Question title="هل يجب أن أمرر locale إلى `getIntlayer` أم الاعتماد على سياق الطلب؟">

مررها. التكاملات تكشف عن locale المحلول (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`)، وتمريره إلى `getIntlayer` يجعل كل renderer دالة نقية من locale. هذا أسهل للاختبار، ويحافظ على portability لـ fragment renderers الخاصة بك إذا قمت بتغيير الخادم.

</Question>

<Question title="هل أحتاج إلى مكتبة i18n على جانب العميل بجانب htmx؟">

لا. كل شيء يراه الزائر يتم إنتاجه بواسطة الخادم، لذا لا يوجد شيء للترجمة في المتصفح. هذا أيضاً هو السبب في أن تكلفة وزن الصفحة للـ i18n في تطبيق htmx قريبة جداً من الصفر: لا يتم إرسال أي كتالوج إلى العميل أبداً.

</Question>

<Question title="كيف أقوم بتحديد موقع جغرافي للـ URL أيضاً، لأغراض SEO؟">

قدم صفحاتك تحت بادئة لغة (`/fr/cart`) واقرأ اللغة من المسار في معالج المسار الخاص بك، بدلاً من ملف تعريف الارتباط، لعرض الصفحة الكاملة. يمكن للأجزاء أن تستمر في استخدام ملف تعريف الارتباط أو رأس الطلب. انظر إلى [المكونات الإضافية للإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لخيارات التوجيه و[إعادات كتابة عناوين URL المخصصة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/custom_url_rewrites.md).

</Question>

<Question title="كيف أتعامل مع اللغات من اليمين إلى اليسار؟">

`getHTMLTextDir(locale)` يُرجع `ltr` أو `rtl` أو `auto`. قم بتعيينه على المستند للعرض الأولي، وأعد تطبيقه بعد التبديل كما توضح الخطوة 8. استخدم خصائص CSS المنطقية (`margin-inline-start` بدلاً من `margin-left`) حتى يتبع تخطيطك.

</Question>

<Question title="هل يجب أن أهرب من القيم المترجمة؟">

نعم، لأي شيء تقحمه في سلسلة نص template، تماماً كما هو الحال مع أي قيمة ديناميكية أخرى. المحتوى القادم من CMS أو من مترجم ليس markup تتحكم فيه. الخطوة 5 توضح escaper بسيط.

</Question>

<Question title="هل يمكن للمحتوى نفسه أن يخدم استجابات API الخاصة بي أيضاً؟">

نعم. تعرض تكاملات الـ backend `t()` و `getIntlayer()` لأي معالج، لذلك رسالة خطأ معروضة في toast ونص معروض في fragment يأتيان من نفس المحتوى المُعلَّن. انظر إلى أدلة [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_express.md) و [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_fastify.md) و [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_hono.md) و [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_elysia.md).

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج واحد تلو الآخر. انظر إلى [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. تقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس العمل بالنسبة لكتالوجات gettext، و[الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) تتيح لك تقسيم المحتوى حسب اللغة بدلاً من تجميع اللغات في ملف واحد.

</Question>

<Question title="كيف أترجم التطبيق تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`، والذي يملأ الترجمات المفقودة باستخدام نموذج اللغة (LLM) من اختيارك باستخدام مزودك ومفتاح API الخاص بك. أضف `--git-diff` لترجمة المحتوى المتغير فقط على الفرع. اطلع على [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

</Question>

<Question title="هل يدعم Intlayer النوع الاجتماعي والشروط والقيم المُدرجة؟">

نعم: [محتوى قائم على النوع الاجتماعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [التعديلات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md)، [الإدراجات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md) للقيم المقحمة، و[المنسقات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md) للأرقام والتواريخ والعملات.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس قطع، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح إلى ملف المحتوى الذي يصرح به، استخراج المحتوى من ملف، وتشغيل البناء والملء والاختبار والدفع والسحب من لوحة الأوامر.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس الوعي في أي محرر يتحدث LSP، مع الانتقال إلى التعريف وعروض المحوم للقيمة المترجمة واكتمال المفاتيح التلقائي وتحذير عند عدم الإعلان عن مفتاح في أي مكان.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف عن وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات موجهة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: `no-raw-text` يوضح النصوص المشفرة بشكل ثابت.

</Question>

<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) المستضاف هو خدمة مدفوعة اختيارية يمكن أيضاً [استضافتها ذاتياً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>

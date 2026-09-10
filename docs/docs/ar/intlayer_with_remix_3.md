---
createdAt: 2026-09-09
updatedAt: 2026-09-09
title: "Remix 3 i18n - الدليل الكامل لترجمة تطبيقك"
description: "وداعًا لـ i18next. دليل 2026 لإنشاء تطبيق Remix 3 متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة و SEO والأداء."
keywords:
  - تدويل
  - توثيق
  - Intlayer
  - Remix 3
  - Remix
  - JavaScript
  - TypeScript
  - معايير الويب
slugs:
  - doc
  - environment
  - remix-3
applicationTemplate: https://github.com/aymericzip/intlayer-remix-3-template
applicationShowcase: https://intlayer-remix-3-template.vercel.app
history:
  - version: 9.5.0
    date: 2026-09-09
    changes: "التوثيق الأولي لـ Remix 3"
author: aymericzip
---

# ترجم موقع Remix 3 الخاص بك باستخدام Intlayer | التدويل (i18n)

يوضح هذا الدليل كيفية دمج **Intlayer** للتدويل السلس في تطبيقات **Remix 3** مع التوجيه المدرك للغة، وتصريحات المحتوى الآمنة من حيث النوع، وقوالب HTML الآمنة، ودعم بيئات التشغيل المتعددة عبر Node.js و Bun و Deno و Cloudflare Workers.

## ما هو Remix 3؟

يمثل **Remix 3** تحولاً معماريًا جوهريًا نحو **إطار عمل ويب معياري ومستقل عن بيئة التشغيل ومبني بالكامل على معايير الويب**. بدلاً من الارتباط بحزم برمجية معينة أو واجهات برمجة تطبيقات خادم خاصة، يتم توزيع Remix 3 كحزم تركيبية أحادية الغرض:

- **`remix/fetch-router`** (أو `remix/router`): توجيه خفيف ومتوافق مع المعايير مبني على Fetch API (`Request` و `Response`).
- **`remix/html-template`**: قوالب HTML نصية آمنة مع حماية تلقائية من ثغرات XSS وتكوين الأجزاء.
- **`remix/response/html`**: أدوات مساعدة للاستجابة لتقديم HTML وفق دلالات HTTP القياسية.
- **`remix/node-fetch-server`**: محولات خادم لـ Node.js، مع دعم أصلي لـ Bun و Deno وبيئات الحافة (edge).
- **`remix/cookie`**: تحليل وتسلسل ملفات تعريف الارتباط بطريقة مشفرة وآمنة.

بالاقتران مع **Intlayer**، ستحصل على نظام تدويل متكامل يوفر أمانًا في وقت الترجمة، وترجمات آلية بالذكاء الاصطناعي، وعرضًا على الخادم بدون أعباء إضافية، وتوجيهًا سلسًا للغات.

## جدول المحتويات

<TOC/>

## لماذا تختار Intlayer على البدائل؟

مقارنة بالحلول التقليدية مثل `i18next` أو أدوات تحميل الترجمة المخصصة، يقدم Intlayer تجربة مطور متكاملة ومحسنة لمعمارية الويب الحديثة:

<AccordionGroup>
<Accordion header="تغطية كاملة لـ Remix 3 ومعايير الويب">

تم تصميم Intlayer للعمل بسلاسة مع معايير الويب (`Request` و `Response` و `Headers` و `URL`). يتكامل بسهولة مع موجه Fetch في Remix 3 من خلال برمجيات وسيطة خفيفة، حيث يستخرج اللغات من مسارات URL أو ملفات تعريف الارتباط أو ترويسات `Accept-Language` دون تقييدك ببيئة تشغيل معينة.

</Accordion>
<Accordion header="تصريحات محتوى آمنة من حيث النوع">

وداعًا لمفاتيح JSON الفضفاضة وأعطال وقت التشغيل الناتجة عن فقدان المفاتيح. يفرض Intlayer عمليات فحص TypeScript عبر جميع اللغات المصرح بها، مما يحذرك في وقت البناء إذا كانت الترجمة مفقودة أو غير صالحة.

</Accordion>
<Accordion header="لا توجد أعباء حزمة إضافية على الخادم">

عند استخدام قوالب HTML المقدمة من جانب الخادم في Remix 3 (`remix/html-template`)، تتم كتابة النص المحلل للغة المطلوبة فقط في دفق الإخراج. لا حاجة لحزم ترطيب العميل أو كتالوجات الترجمة الضخمة إلا إذا طُلب ذلك صراحة.

</Accordion>
<Accordion header="جاهز لوكلاء الذكاء الاصطناعي والأتمتة">

يضع Intlayer تصريحات المحتوى (`.content.ts`) بجانب منطق المسار، مما يقلل سياق الرموز (Tokens) المطلوب للنماذج اللغوية الكبيرة (LLMs). تتيح لك أوامر CLI المضمنة مثل `intlayer fill` و `intlayer test` أتمتة الترجمات في خطوط أنابيب CI/CD بالتكلفة المباشرة لمزود الذكاء الاصطناعي الخاص بك.

</Accordion>
<Accordion header="محرر مرئي وتكامل مع أنظمة إدارة المحتوى">

بالإضافة إلى سير العمل المعتمد على الكود، يوفر Intlayer [محررًا مرئيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) مستضافًا ذاتيًا و [نظام إدارة محتوى عن بُعد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) يسمح للمحررين والمترجمين بتحديث المحتوى دون إعادة نشر الكود.

</Accordion>
</AccordionGroup>

## دليل خطوة بخطوة

<Tabs defaultTab="code">
  <Tab label="الكود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-remix-3-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عرض توضيحي CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="عرض تجريبي" value="demo">

<iframe
  src="https://intlayer-remix-3-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عرض تجريبي لقالب Intlayer Remix 3"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

شاهد [قالب التطبيق](https://github.com/aymericzip/intlayer-remix-3-template) على GitHub.

<Steps>
<Step number={1} title="تثبيت التبعيات">

قم بتثبيت `intlayer` و `remix` (الإصدار 3) باستخدام مدير الحزم المفضل لديك:

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

- **`intlayer`**: محرك التدويل الأساسي الذي يوفر إدارة التكوين، والتصريح عن القواميس (`t()`, `Dictionary`)، وأدوات CLI، ومفسر وقت التشغيل.
- **`remix`**: حزمة إطار عمل Remix 3 الموحدة التي تصدر `remix/router` و `remix/routes` و `remix/html-template` و `remix/node-fetch-server`.

</Step>
<Step number={2} title="تكوين Intlayer">

أنشئ ملف `intlayer.config.ts` في جذر مشروعك لتحديد اللغات المدعومة وإعدادات التدويل:

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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> لمزيد من خيارات التكوين، يرجى مراجعة [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>
<Step number={3} title="التصريح عن محتواك متعدد اللغات">

صرح عن محتواك المترجم في ملف `.content.ts`:

```typescript fileName="src/home.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      ar: "مرحبًا بك في Remix 3",
      en: "Welcome to Remix 3",
      fr: "Bienvenue sur Remix 3",
      es: "Bienvenido a Remix 3",
    }),
    description: t({
      ar: "تطبيق تركيبي مبني على معايير الويب مع دعم تدويل أصلي.",
      en: "A composable, web-standard application with native i18n.",
      fr: "Une application composable basée sur les standards web avec i18n native.",
      es: "Una aplicación componible basada en estándares web con i18n nativa.",
    }),
    switchLanguage: t({
      ar: "تغيير اللغة:",
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

> يدعم Intlayer أيضًا تنسيقات JSON و YAML و CommonJS. راجع [وثائق التصريح عن المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

</Step>
<Step number={4} title="بناء قواميس Intlayer">

قم بتجميع تعريفات القواميس لإنشاء أنواع TypeScript وسجلات وقت التشغيل:

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

يقوم هذا الأمر بتجميع المحتوى في دليل `.intlayer`، مما يتيح الإكمال التلقائي لـ TypeScript والبحث السريع في القواميس.

</Step>
<Step number={5} title="تنفيذ برمجية Intlayer الوسيطة">

يوفر Remix 3 بنية برمجيات وسيطة تركيبية عبر `createRouter({ middleware: [...] })`.

أنشئ برمجية Intlayer وسيطة تحلل لغة كل طلب وارد وفق الأولويات التالية:

1. بادئة مسار URL عبر `getLocaleFromPath` (مثال `/ar` أو `/fr`).
2. الأداة المساعدة `getLocale` من Intlayer، والتي تفاوض تلقائيًا عبر ملفات تعريف الارتباط (`INTLAYER_LOCALE`) والترويسات المخصصة (`x-intlayer-locale`) وترويسة `Accept-Language` القياسية واللغة الافتراضية `defaultLocale`.

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
 * مفتاح سياق آمن من حيث النوع لاسترداد اللغة المحددة من RequestContext في Remix 3.
 */
export const localeKey = createContextKey<Locale>(defaultLocale);

/**
 * برمجية Intlayer الوسيطة لـ Remix 3.
 *
 * تحلل لغة الطلب وفق الأولوية التالية:
 * 1. بادئة مسار URL (مثل `/ar/...`) عبر `getLocaleFromPath`
 * 2. مفاوضة الترويسات والتخزين عبر `getLocale` (ملفات تعريف الارتباط، ترويسة مخصصة، Accept-Language، التراجع إلى defaultLocale)
 *
 * ترفق اللغة المحددة بـ RequestContext في Remix 3.
 */
export const intlayer = (): Middleware => {
  return async (context, next) => {
    // الكشف عن المسار (/ar/about -> "ar", /about -> undefined)
    const pathLocale = getLocaleFromPath(context.url.pathname);

    if (pathLocale) {
      // إرفاق اللغة المحددة بسياق طلب Remix 3
      context.set(localeKey, pathLocale);

      return next();
    }

    const storedLocale = await getLocale({
      getHeader: (name) => context.headers.get(name),
      getCookie: (name) =>
        getCookie(name, context.headers.get("cookie") ?? undefined),
    });

    // إرفاق اللغة المحددة بسياق طلب Remix 3
    context.set(localeKey, storedLocale ?? defaultLocale);

    return next();
  };
};
```

</Step>
<Step number={6} title="تعريف مسارات آمنة من حيث النوع">

حدد مسارات تطبيقك باستخدام `route()` من `remix/routes`:

```typescript fileName="src/routes.ts" codeFormat={["typescript", "esm"]}
import { route } from "remix/routes";

export const routes = route({
  // مسار اللغة الافتراضية
  home: "/",

  // مسار مترجم مع مقطع ديناميكي :locale
  localizedHome: "/:locale",
});
```

يوفر استخدام `route()` إنشاء عناوين URL آمنة من حيث النوع في جميع أنحاء تطبيقك:

```typescript
routes.home.href(); // "/"
routes.localizedHome.href({ locale: "ar" }); // "/ar"
```

</Step>
<Step number={7} title="عرض قوالب HTML المترجمة">

يستخدم Remix 3 حزمة `remix/html-template` لإنشاء HTML آمن ومُعالج تلقائيًا. قم بإنشاء دالة عرض تستخرج القاموس المترجم باستخدام `getIntlayer`، وتحدد سمات `<html lang="..." dir="...">`، وتعرض مبدل اللغة:

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
<Step number={8} title="ربط تطبيق الخادم">

اربط جهاز التوجيه والبرمجيات الوسيطة وإجراءات المسار معًا في `src/server.ts`:

```typescript fileName="src/server.ts" codeFormat={["typescript", "esm"]}
import * as http from "node:http";
import { createRouter } from "remix/router";
import { createRequestListener } from "remix/node-fetch-server";
import { createHtmlResponse } from "remix/response/html";
import { isDeclaredLocale } from "intlayer";
import { intlayer, localeKey } from "./middleware/intlayer";
import { routes } from "./routes";
import { renderHomePage } from "./views/home";

// 1. تهيئة جهاز التوجيه باستخدام برمجية Intlayer الوسيطة
export const router = createRouter({
  middleware: [intlayer()],
});

// 2. تعيين معالجات المسار
router.map(routes, {
  actions: {
    // مسار اللغة الافتراضية
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },

    // مسار مترجم
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response("Not Found", { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
  },
});

// 3. بدء تشغيل الخادم
const PORT = Number(process.env.PORT || 3000);
const server = http.createServer(
  createRequestListener((request) => router.fetch(request))
);

server.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
```

</Step>
<Step number={9} title="تدقيق وملء الترجمات تلقائيًا">

يوفر Intlayer أداة سطر أوامر (CLI) لتدقيق الترجمات المفقودة وملئها تلقائيًا باستخدام الذكاء الاصطناعي:

```bash packageManager="npm"
# تدقيق الترجمات المفقودة
npx intlayer test

# ملء الترجمات المفقودة بالذكاء الاصطناعي
npx intlayer fill
```

```bash packageManager="pnpm"
# تدقيق الترجمات المفقودة
pnpm dlx intlayer test

# ملء الترجمات المفقودة بالذكاء الاصطناعي
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
# تدقيق الترجمات المفقودة
yarn dlx intlayer test

# ملء الترجمات المفقودة بالذكاء الاصطناعي
yarn dlx intlayer fill
```

```bash packageManager="bun"
# تدقيق الترجمات المفقودة
bun x intlayer test

# ملء الترجمات المفقودة بالذكاء الاصطناعي
bun x intlayer fill
```

</Step>
</Steps>

## تكوين TypeScript

تأكد من أن ملف `tsconfig.json` الخاص بك يتضمن أنواع `.intlayer` التي تم إنشاؤها:

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

## الخاتمة

مع Remix 3 و Intlayer، لديك بنية برمجية خفيفة الوزن ومكتوبة بالكامل من حيث الأنواع وقابلة للنقل عبر بيئات التشغيل المختلفة وتلتزم بمعايير الويب المفتوحة. يمكن لتطبيقك التوسع بسهولة من صفحات تسويقية محلية بسيطة إلى خدمات موزعة عالميًا ومعروضة على الحافة.

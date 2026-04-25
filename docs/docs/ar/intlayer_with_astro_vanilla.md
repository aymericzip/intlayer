---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: ترجمة Astro + Vanilla JS i18n - كيفية ترجمة تطبيق Astro + Vanilla JS في عام 2026
description: تعرف على كيفية إضافة التدويل (i18n) إلى موقع Astro + Vanilla JS الخاص بك باستخدام Intlayer. اتبع هذا الدليل لجعل موقعك متعدد اللغات.
keywords:
  - التدويل
  - توثيق
  - Intlayer
  - Astro
  - Vanilla JS
  - JavaScript
  - TypeScript
slugs:
  - doc
  - environment
  - astro
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "التوثيق الأولي لـ Astro + Vanilla JS"
---

# ترجمة موقع Astro + Vanilla JS الخاص بك باستخدام Intlayer | التدويل (i18n)

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

باستخدام Intlayer، يمكنك:

- **إدارة الترجمات بسهولة**: باستخدام قواميس تعريفية على مستوى المكون.
- **توطين الميتا داتا والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript**: من خلال أنواع مولدة تلقائيًا لتعزيز الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**: مثل الكشف الديناميكي عن اللغة وتبديل اللغة.

---

## دليل خطوة بخطوة لتهيئة Intlayer في Astro + Vanilla JS

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

تحقق من [نموذج التطبيق](https://github.com/aymericzip/intlayer-astro-template) على GitHub.

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer astro-intlayer vanilla-intlayer

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vanilla-intlayer

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vanilla-intlayer

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vanilla-intlayer

bun x intlayer init
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات i18n لإدارة التكوين، الترجمات، [تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **astro-intlayer**
  تتضمن إضافة تكامل Astro لربط Intlayer بـ [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف لغة المستخدم المفضلة، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه الروابط.

- **vanilla-intlayer**
  حزمة لدمج Intlayer في تطبيقات Vanilla JavaScript / TypeScript. توفر كائن Pub/Sub أحادي (`IntlayerClient`) ومساعدين يعتمدون على الاستدعاءات (`useIntlayer`, `useLocale`, إلخ)، مما يسمح لأي جزء من وسوم `<script>` في Astro بالاستجابة لتغييرات اللغة دون الحاجة إلى إطار عمل واجهة مستخدم.

### الخطوة 2: تهيئة مشروعك

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ARABIC,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> من خلال ملف التكوين هذا، يمكنك تهيئة الروابط المترجمة، وإعادة توجيه الوسيط، وأسماء الكوكيز، وموقع وامتدادات تعريفات المحتوى، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Astro الخاص بك

أضف إضافة `intlayer` إلى تكوين Astro الخاص بك. بالنسبة لـ Vanilla JS، لا يلزم وجود تكامل إضافي لإطار عمل واجهة مستخدم.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> تُستخدم إضافة `intlayer()` لدمج Intlayer مع Astro. وهي تضمن إنشاء ملفات تعريف المحتوى ومراقبتها في وضع التطوير. وتعرّف متغيرات بيئة Intlayer داخل تطبيق Astro وتوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: تعريف المحتوى الخاص بك

أنشئ وأدِر تعريفات المحتوى لتخزين الترجمات:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ar: "مرحبا بالعالم",
    }),
    description: t({
      en: "Welcome to my multilingual Astro site.",
      fr: "Bienvenue sur mon site Astro multilingue.",
      es: "Bienvenido a mi sitio Astro multilingüe.",
      ar: "مرحبا بكم في موقع Astro متعدد اللغات الخاص بي.",
    }),
    switchLocale: t({
      en: "Switch language:",
      fr: "Changer de langue :",
      es: "Cambiar idioma:",
      ar: "تغيير اللغة:",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> يمكن تعريف تعريفات المحتوى في أي مكان في تطبيقك، طالما أنها مدرجة في `contentDir` (افتراضيًا `./src`) وتطابق امتداد ملف تعريف المحتوى (افتراضيًا `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> لمزيد من المعلومات، راجع [توثيق تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 5: استخدام المحتوى في Astro

مع Vanilla JS، يتم إجراء جميع عمليات الرندر في جانب الخادم مباشرة داخل ملفات `.astro` باستخدام `getIntlayer`. بعد ذلك، تقوم كتلة `<script>` بتهيئة `vanilla-intlayer` على العميل لتمكين تبديل اللغة.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  getLocaleName,
  localeMap,
  locales,
  defaultLocale,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
const { greeting, description, switchLocale } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{greeting}</title>

    <!-- رابط canonical -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- روابط Hreflang -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <main>
      <h1 id="greeting">{greeting}</h1>
      <p id="description">{description}</p>

      <div class="locale-switcher">
        <span class="switcher-label">{switchLocale}</span>
        <div class="locale-buttons">
          {
            locales.map((localeItem) => (
              <a
                href={localeItem === locale ? undefined : getLocalizedUrl(pathWithoutLocale, localeItem)}
                class={`locale-btn ${localeItem === locale ? "active" : ""}`}
                data-locale={localeItem}
                aria-disabled={localeItem === locale}
              >
                {getLocaleName(localeItem)}
              </a>
            ))
          }
        </div>
      </div>
    </main>
  </body>
</html>
```

> **ملاحظة حول إعداد التوجيه:**
> تعتمد بنية الدليل التي تستخدمها على إعداد `middleware.routing` في `intlayer.config.ts`:
>
> - **`prefix-no-default` (افتراضي):** يحافظ على اللغة الافتراضية في الجذر (بدون بادئة) ويضيف بادئات للغات الأخرى. استخدم `[...locale]` لتغطية جميع الحالات.
> - **`prefix-all`:** تحصل جميع الروابط على بادئة لغة. يمكنك استخدام `[locale]` القياسي إذا كنت لا تحتاج إلى معالجة الجذر بشكل منفصل.
> - **`search-param` أو `no-prefix`:** لا يلزم وجود أدلة لغة. يتم التعامل مع اللغة عبر معلمات الاستعلام أو ملفات تعريف الارتباط.

### الخطوة 6: إضافة تبديل اللغة

في Astro مع Vanilla JS، يتم رندر مبدل اللغة على الخادم كروابط عادية ويتم تفعيله (hydrated) على العميل عبر كتلة `<script>`. عندما ينقر المستخدم على رابط لغة، يقوم `vanilla-intlayer` بتعيين كوكيز اللغة عبر `setLocale` قبل الانتقال إلى الرابط المترجم.

```astro fileName="src/pages/[...locale]/index.astro"
<!-- تضمين كود الخادم من الخطوة 5 أعلاه -->

<script>
  import { installIntlayer, useLocale } from "vanilla-intlayer";
  import { getLocaleFromPath, getLocalizedUrl, type LocalesValues } from "intlayer";

  // تهيئة Intlayer على العميل باللغة المأخوذة من المسار الحالي
  const locale = getLocaleFromPath(window.location.pathname);
  installIntlayer({ locale: locale as LocalesValues });

  const { setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  // ربط أحداث النقر بروابط تبديل اللغة
  const localeLinks = document.querySelectorAll("[data-locale]");
  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const localeValue = link.getAttribute("data-locale") as LocalesValues;
      if (localeValue && localeValue !== locale) {
        e.preventDefault();
        setLocale(localeValue);
      }
    });
  });
</script>
```

> **ملاحظة حول الاستمرارية:**
> تقوم `installIntlayer` بتهيئة كائن Intlayer الأحادي باللغة المحددة من الخادم. وتضمن `useLocale` مع `onLocaleChange` تعيين كوكيز اللغة قبل الانتقال عبر الوسيط، بحيث يتم تذكر تفضيلات لغة المستخدم في الزيارات المستقبلية.

> **ملاحظة حول التحسين التدريجي (Progressive Enhancement):**
> ستعمل الروابط في مبدل اللغة كعناصر `<a>` عادية حتى بدون جافا سكريبت. عند توفر جافا سكريبت، ستقوم استدعاءات `setLocale` بتحديث الكوكيز قبل الانتقال، مما يضمن قيام الوسيط بالتوجيه الصحيح.

### الخطوة 7: خريطة الموقع وRobots.txt

توفر Intlayer أدوات لإنشاء خريطة موقع (sitemap) مترجمة وملفات robots.txt ديناميكيًا.

#### خريطة الموقع (Sitemap)

أنشئ `src/pages/sitemap.xml.ts` لإنشاء خريطة موقع تتضمن جميع مساراتك المترجمة.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

أنشئ `src/pages/robots.txt.ts` للتحكم في زحف محركات البحث.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### تكوين TypeScript

تستخدم Intlayer تقنية توسيع الوحدات (module augmentation) للاستفادة من TypeScript، مما يجعل برمجتك أكثر قوة.

![الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ في الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوين TypeScript الحالي الخاص بك
  "include": [
    // ... تكوين TypeScript الحالي الخاص بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تنشئها Intlayer. هذا يتجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، أضف التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```bash
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **إكمال تلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينة مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من المعلومات حول استخدام الإضافة، راجع [توثيق إضافة VS Code](https://intlayer.org/doc/vs-code-extension).

---

### تعمق أكثر

إذا كنت تريد معرفة المزيد، يمكنك أيضًا تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو استخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) لإخراج محتواك خارجيًا.

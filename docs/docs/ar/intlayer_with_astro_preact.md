---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: ترجمة Astro + Preact i18n - كيفية ترجمة تطبيق Astro + Preact في عام 2026
description: تعرف على كيفية إضافة التدويل (i18n) إلى موقع Astro + Preact الخاص بك باستخدام Intlayer. اتبع هذا الدليل لجعل موقعك متعدد اللغات.
keywords:
  - التدويل
  - توثيق
  - Intlayer
  - Astro
  - Preact
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - preact
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "التوثيق الأولي لـ Astro + Preact"
---

# ترجمة موقع Astro + Preact الخاص بك باستخدام Intlayer | التدويل (i18n)

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

باستخدام Intlayer، يمكنك:

- **إدارة الترجمات بسهولة**: باستخدام قواميس تعريفية على مستوى المكون.
- **توطين الميتا داتا والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript**: من خلال أنواع مولدة تلقائيًا لتعزيز الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**: مثل الكشف الديناميكي عن اللغة وتبديل اللغة.

---

## دليل خطوة بخطوة لتهيئة Intlayer في Astro + Preact

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
npm install intlayer astro-intlayer preact preact-intlayer @astrojs/preact

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer preact preact-intlayer @astrojs/preact

bun x intlayer init
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات i18n لإدارة التكوين، الترجمات، [تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **astro-intlayer**
  تتضمن إضافة تكامل Astro لربط Intlayer بـ [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف لغة المستخدم المفضلة، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه الروابط.

- **preact**
  حزمة Preact الأساسية — بديل سريع وخفيف لـ React.

- **preact-intlayer**
  حزمة لدمج Intlayer في تطبيقات Preact. توفر `IntlayerProvider` بالإضافة إلى الخطافات (hooks) `useIntlayer` و `useLocale` للتدويل في Preact.

- **@astrojs/preact**
  إضافة Astro الرسمية التي تتيح استخدام جزر (islands) مكونات Preact.

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

أضف إضافة `intlayer` وتكامل Preact إلى تكوين Astro الخاص بك.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), preact()],
});
```

> تُستخدم إضافة `intlayer()` لدمج Intlayer مع Astro. وهي تضمن إنشاء ملفات تعريف المحتوى ومراقبتها في وضع التطوير. وتعرّف متغيرات بيئة Intlayer داخل تطبيق Astro وتوفر أسماء مستعارة لتحسين الأداء.

> يتيح تكامل `preact()` استخدام جزر مكونات Preact عبر `client:only="preact"`.

### الخطوة 4: تعريف المحتوى الخاص بك

أنشئ وأدِر تعريفات المحتوى لتخزين الترجمات:

```tsx fileName="src/app.content.tsx"
import { h } from "preact";
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ar: "مرحبا بالعالم",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> يمكن تعريف تعريفات المحتوى في أي مكان في تطبيقك، طالما أنها مدرجة في `contentDir` (افتراضيًا `./src`) وتطابق امتداد ملف تعريف المحتوى (افتراضيًا `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> لمزيد من المعلومات، راجع [توثيق تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

> إذا كانت ملفات المحتوى الخاصة بك تتضمن كود TSX، فقد تحتاج إلى استيراد `import { h } from "preact";` أو التأكد من تهيئة pragma JSX الخاص بك بشكل صحيح لـ Preact.

### الخطوة 5: استخدام المحتوى في Astro

يمكنك استهلاك القواميس مباشرة في ملفات `.astro` الخاصة بك باستخدام المساعدين الأساسيين المصدرين من `intlayer`. يجب عليك أيضًا إضافة ميتا داتا SEO (مثل hreflang وروابط canonical) لكل صفحة وتقديم جزيرة Preact للمحتوى التفاعلي في جانب العميل.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { PreactIsland } from "../../components/preact/PreactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- رابط Canonical: يخبر محركات البحث عن النسخة الرئيسية لهذه الصفحة -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: يخبر جوجل عن جميع النسخ المترجمة -->
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

    <!-- x-default: خيار احتياطي عندما لا تتطابق اللغة مع لغة المستخدم -->
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
    <!-- جزيرة Preact تقوم برندر جميع المحتويات التفاعلية بما في ذلك مبدل اللغة -->
    <PreactIsland locale={locale} client:only="preact" />
  </body>
</html>
```

> **ملاحظة حول إعداد التوجيه:**
> تعتمد بنية الدليل التي تستخدمها على إعداد `middleware.routing` في `intlayer.config.ts`:
>
> - **`prefix-no-default` (افتراضي):** يحافظ على اللغة الافتراضية في الجذر (بدون بادئة) ويضيف بادئات للغات الأخرى. استخدم `[...locale]` لتغطية جميع الحالات.
> - **`prefix-all`:** تحصل جميع الروابط على بادئة لغة. يمكنك استخدام `[locale]` القياسي إذا كنت لا تحتاج إلى معالجة الجذر بشكل منفصل.
> - **`search-param` أو `no-prefix`:** لا يلزم وجود أدلة لغة. يتم التعامل مع اللغة عبر معلمات الاستعلام أو ملفات تعريف الارتباط.

### الخطوة 6: إنشاء مكون جزيرة Preact

أنشئ مكون جزيرة يلف تطبيق Preact الخاص بك ويستلم اللغة المكتشفة من الخادم:

```tsx fileName="src/components/preact/PreactIsland.tsx"
/** @jsxImportSource preact */
import { IntlayerProvider, useIntlayer } from "preact-intlayer";
import { type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";
import { LocaleSwitcher } from "./LocaleSwitcher";

const App: FunctionalComponent = () => {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
};

export const PreactIsland: FunctionalComponent<{ locale: LocalesValues }> = ({
  locale,
}) => (
  <IntlayerProvider locale={locale}>
    <App />
  </IntlayerProvider>
);
```

> يتم تمرير خاصية `locale` من صفحة Astro (اكتشاف الخادم) إلى `IntlayerProvider` ، مما يجعلها اللغة الأولية لجميع خطافات Preact داخل الشجرة.

> ملاحظة: في Preact، يتم استخدام خاصية HTML `class` بدلاً من `className`.

### الخطوة 7: إضافة مبدل اللغة

أنشئ مكون Preact `LocaleSwitcher` يقرأ اللغات المتاحة وينتقل إلى الرابط المترجم عندما يختار المستخدم لغة جديدة:

```tsx fileName="src/components/preact/LocaleSwitcher.tsx"
/** @jsxImportSource preact */
import { useLocale } from "preact-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";

export const LocaleSwitcher: FunctionalComponent = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // الانتقال إلى الرابط المترجم عند تغيير اللغة
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">تغيير اللغة:</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> **ملاحظة حول الاستمرارية:**
> يضمن استخدام `onLocaleChange` لإعادة التوجيه عبر `window.location.href` زيارة الرابط الجديد للغة، مما يسمح لوسيط Intlayer بتعيين كوكيز اللغة وتذكر تفضيلات المستخدم في الزيارات المستقبلية.

> يجب رندر `LocaleSwitcher` داخل `IntlayerProvider` — استخدمه داخل مكون الجزيرة الخاص بك (كما هو موضح في الخطوة 6).

### الخطوة 8: خريطة الموقع وRobots.txt

توفر Intlayer أدوات لإنشاء خريطة موقع مترجمة وملفات robots.txt ديناميكيًا.

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

تستخدم Intlayer تقنية توسيع الوحدات (module augmentation) للاستفادة من TypeScript، مما يجعل برمجتك أكثر قوة. تأكد من أن تكوين TypeScript يتضمن الأنواع المولدة تلقائيًا ومهيأ لـ Preact:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    jsx: "react-jsx",
    jsxImportSource: "preact", // موصى به لـ Preact 10+
  },
  include: [
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

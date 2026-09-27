---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "تدويل TanStack Start مع Paraglide JS: دليل الإعداد لعام 2026"
description: "قم بترجمة تطبيق TanStack Start الخاص بك باستخدام Paraglide JS: استراتيجية URL، إعادة كتابة الموجه (router rewrite)، برمجيات SSR الوسيطة، hreflang، ملف sitemap و robots.txt، بالإضافة إلى بيانات مقارنة الأداء الحقيقية."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - التدويل
  - i18n
  - SEO
  - React
  - مدونة
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "النسخة الأولية"
author: aymericzip
---

# كيفية تدويل تطبيق TanStack Start الخاص بك باستخدام Paraglide JS في عام 2026

## جدول المحتويات

<TOC/>

## ما هو Paraglide JS؟

**Paraglide JS** (من inlang) هي مكتبة تدويل (i18n) **معتمدة على المترجم (compiler-based)**. بدلاً من شحن بيئة تشغيل runtime تبحث عن المفاتيح في كائن JSON، تقوم بترجمة كل رسالة إلى دالة JavaScript ذات أنواع محددة (`m.about_title()`). يمكن لجامع الحزم (bundler) حذف الرسائل غير المستخدمة، وأي خطأ إملائي في المفتاح يصبح خطأ في مرحلة الترجمة (compile error).

تعتبر Paraglide نهج التدويل المستخدم في أمثلة TanStack Router الرسمية، وتتكامل مع TanStack Start من خلال ثلاثة أجزاء:

- **إضافة Vite** تقوم بتجميع الرسائل وبيئة التشغيل في `src/paraglide`؛
- **برمجية وسيطة للخادم (server middleware)** تحدد لغة (locale) كل طلب؛
- **إعادة كتابة الموجه (router rewrite)** التي تطابق عناوين URL المترجمة (`/fr/about`) مع شجرة المسارات الخاصة بك (`/about`)، بحيث لا تحتاج إلى مقطع `$locale`.

يقوم هذا الدليل بإعداد هذه الأجزاء الثلاثة، ثم يغطي كل ما تتركه Paraglide لك: `lang` و `dir`، ومبدل اللغة، والبيانات الوصفية المترجمة، و `canonical`، و `hreflang` مع `x-default`، و Open Graph، و JSON-LD، وخريطة الموقع sitemap، و `robots.txt`، والعرض المسبق (pre-rendering) وصفحات 404 المترجمة.

> هل تبحث عن حزمة تقنية أخرى؟

- [دليل TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_use-intl.md)
- [دليل TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_lingui.md)
- [دليل TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)

> هل تقارن بين النهجين المعتمدين على المترجم؟ اقرأ [هل Intlayer أخف من Paraglide؟](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/is_intlayer_lighter_than_paraglide.md).

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)

## ماذا تقول المقارنة المعيارية (Benchmark) عن Paraglide على TanStack Start

يقوم [اختبار الأداء للتدويل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) بتشغيل نفس تطبيق TanStack Start المكون من 10 صفحات و 10 لغات مع كل مكتبة رئيسية ويقيس ما يقوم المتصفح بتنزيله بالفعل.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

الأرقام الرئيسية لـ `@inlang/paraglide-js@2.15.1`، تم قياسها في 2026-09-26 (gzip):

| الإعداد                      | حجم المكتبة | JS لكل صفحة | تسرب اللغات الأخرى | تسرب الصفحات الأخرى | تحميل الصفحة |
| :--------------------------- | ----------: | ----------: | -----------------: | ------------------: | -----------: |
| بدون تدويل (التطبيق الأساسي) |           - |    111.0 KB |                 0% |                  0% |      15.7 ms |
| Paraglide JS                 |      1.8 KB |    125.1 KB |              49.7% |                  0% |      22.1 ms |
| `react-intlayer`             |      4.5 KB |    126.8 KB |                 0% |                  0% |      14.8 ms |
| `use-intl`                   |     75.9 KB |    128.7 KB |                 0% |                  0% |      17.4 ms |
| Lingui                       |     56.7 KB |    120.2 KB |               8.6% |                  0% |      21.9 ms |

النقاط المستفادة:

- **بيئة التشغيل صغيرة للغاية، والصفحات لا تسرب بيانات.** يتم إنشاء بيئة التشغيل وفقا لإعداداتك، ويتم استيراد الرسائل فقط عند استخدامها.
- **تسرب اللغات الأخرى.** تحتوي كل دالة رسالة على جميع اللغات، وبالتالي فإن حوالي نصف النصوص المترجمة المشحونة إلى الصفحة تكون بلغات لا يستخدمها الزائر. كلما أضفت المزيد من اللغات، زادت هذه النسبة.
- **تحميل الصفحة هو الأبطأ في المجموعة**، ويرجع ذلك جزئيا إلى أن تحديد اللغة يتم من خلال استراتيجيات عند كل استدعاء بدلا من قراءتها من سياق React context.

> اطلع على البيانات الكاملة: [تقرير مقارنة أداء TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)، و[مستودع المقارنة المعيارية](https://github.com/intlayer-org/benchmark-i18n).

## مقارنة الميزات على TanStack Start

كيف تقارن Paraglide JS مع المكتبات الأخرى الشائعة الاستخدام في TanStack Start:

| الميزة                                | `react-intlayer` (Intlayer)          | `use-intl`            | Paraglide JS                          | Lingui                       |
| ------------------------------------- | ------------------------------------ | --------------------- | ------------------------------------- | ---------------------------- |
| **الترجمات بجانب المكونات**           | ✅ في نفس المكان (Co-located)        | ❌ ملف JSON مركزي     | ❌ ملف JSON واحد لكل لغة              | ⚠️ النص المصدر داخل المكونات |
| **تكامل TypeScript**                  | ✅ أنواع منشأة تلقائيا               | ✅ عبر `AppConfig`    | ✅ دوال رسائل ذات أنواع محددة         | ⚠️ ماكرو فقط                 |
| **اكتشاف الترجمات المفقودة**          | ✅ أخطاء في الأنواع وتحذيرات بناء    | ⚠️ بديل أثناء التشغيل | ⚠️ الرجوع للغة الأساسية               | ⚠️ الرجوع للنص المصدر        |
| **المحتوى الغني (JSX، Markdown)**     | ✅ دعم مباشر                         | ⚠️ وسوم عبر `t.rich`  | ⚠️ نصوص فقط                           | ✅ JSX داخل `<Trans>`        |
| **توجيه مترجم (Localized routing)**   | ✅ مدمج                              | ❌ يدوي `{-$locale}`  | ✅ `urlPatterns` + إعادة كتابة الموجه | ❌ يدوي `{-$locale}`         |
| **تبديل اللغة بدون إعادة تحميل**      | ✅ نعم                               | ✅ نعم                | ❌ إعادة تحميل كاملة للصفحة           | ✅ نعم                       |
| **صيغ الجمع (Pluralization)**         | ✅ معتمد على التعداد                 | ✅ ICU                | ✅ متغيرات (Variants)                 | ✅ ICU                       |
| **ICU MessageFormat**                 | ✅ عبر `format: "icu"`               | ✅ أصلي               | ⚠️ عبر إضافة inlang                   | ✅ أصلي                      |
| **صيغ المحتوى**                       | ✅ `.ts`، `.json`، `.md`، `.yaml`... | ⚠️ `.json`            | ⚠️ inlang JSON                        | ✅ PO، JSON، CSV             |
| **الترجمة بالذكاء الاصطناعي**         | ✅ المزود والمفتاح الخاص بك          | ❌ لا                 | ❌ لا                                 | ❌ لا                        |
| **محرر مرئي / CMS**                   | ✅ محرر محلي + CMS اختياري           | ❌ منصات خارجية       | ⚠️ تطبيقات منظومة inlang              | ❌ منصات خارجية              |
| **مساعدات SEO (hreflang، sitemap)**   | ✅ مدمجة                             | ❌ يدوي               | ⚠️ عناوين URL مترجمة، والباقي يدوي    | ❌ يدوي                      |
| **حجم وقت التشغيل (gzip، benchmark)** | 4.5 KB                               | 75.9 KB               | 1.8 KB                                | 56.7 KB                      |
| **التسرب، أفضل إعداد (لغة / صفحة)**   | 0% / 0%                              | 0% / 0%               | 49.7% / 0%                            | 8.6% / 0%                    |
| **الترجمات المفقودة في CI**           | ✅ `npx intlayer test`               | ⚠️ غير مدمج           | ⚠️ غير مدمج                           | ✅ `lingui compile --strict` |

> أرقام حجم وقت التشغيل والتسرب مأخوذة من [مقارنة أداء TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md). يتم قياس التسرب في أفضل إعداد لكل مكتبة.

> أدلة TanStack Start الأخرى:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)

## الممارسات التي يجب اتباعها

- **تعيين `lang` و `dir` على `<html>`** من اللغة المحددة على الخادم.
- **الحفاظ على عنوان URL واحد لكل لغة** باستخدام استراتيجية البادئة (`/fr/about`)، حتى تكون كل نسخة لغوية قابلة للفهرسة.
- **وضع `url` أولا في استراتيجية اللغة الخاصة بك**، ليكون عنوان URL هو مصدر الحقيقة، وتحصل محركات البحث على الصفحة المطلوبة بدقة.
- **استخدام مفاتيح رسائل مسطحة وواضحة** (`about_title`) تطابق بوضوح أسماء الدوال.
- **تضمين ملفات `messages/*.json` في Git، وليس مجلد `src/paraglide` المنشأ**، لتجنب تعارضات الدمج (merge conflicts) في الملفات المنشأة تلقائيا.
- **ترجمة البيانات الوصفية الخاصة بك**، والإعلان عن `canonical` و `hreflang` و `x-default` في كل صفحة.
- **إنشاء خريطة موقع sitemap وملف robots.txt متعددي اللغات**، والعرض المسبق (pre-rendering) لكل اللغات.
- **استخدام روابط حقيقية لمبدل اللغة**، حتى تكتشف محركات البحث جميع اللغات.

- [التدويل وتحسين محركات البحث (SEO)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md)
- [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md)

## دليل خطوة بخطوة لإعداد Paraglide JS في تطبيق TanStack Start

إليك هيكل المشروع الذي سنقوم بإنشائه:

```bash
.
├── project.inlang
│   └── settings.json          # Locales and message format
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generated, git-ignored
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # URL rewrite
    ├── i18n
    │   ├── config.ts          # Site URL, helpers
    │   └── seo.ts             # head() builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / and /fr
        ├── about.tsx          # /about and /fr/about
        ├── $.tsx              # Localized 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

لاحظ أنه لا يوجد مجلد `$locale`: فعملية إعادة كتابة الموجه تزيل البادئة قبل مطابقة المسار.

<Steps>
<Step number={1} title="تثبيت الاعتماديات">

ابدأ من مشروع TanStack Start، ثم قم بتهيئة Paraglide. ينشئ أمر التهيئة ملف `project.inlang/settings.json`، وأول ملف `messages/en.json`، ويقوم بتثبيت الحزمة.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: المترجم وإضافة Vite الخاصة به. لا توجد حزمة بيئة تشغيل لتثبيتها: يتم إنشاء بيئة التشغيل مباشرة داخل مشروعك.

</Step>
<Step number={2} title="تكوين اللغات الخاصة بك">

ملف `project.inlang/settings.json` هو المصدر الوحيد للحقيقة بالنسبة للغات. تقرأ إضافة تنسيق الرسائل ملف JSON واحد لكل لغة.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="تكوين إضافة Vite واستراتيجية عناوين URL">

تقوم الإضافة بتجميع الرسائل عند كل تغيير. هناك ثلاثة خيارات مهمة لـ TanStack Start:

- **`strategy`**: القائمة المرتبة للأماكن التي تتم قراءة اللغة منها. وضع `url` أولا يجعل عنوان URL هو مصدر الحقيقة. تُستخدم `cookie` و `preferredLanguage` بواسطة البرمجية الوسيطة عندما لا يحدد عنوان URL اللغة.
- **`urlPatterns`**: كيفية تعيين اللغة إلى عنوان URL. يتم إدراج اللغات غير الافتراضية أولا، لأن أول نمط مطابق يفوز. هنا تظل اللغة الافتراضية بدون بادئة (`/about`)، وتأتي اللغات الأخرى مسبوقة ببادئة (`/fr/about`).
- **`outputStructure: "message-modules"`**: وحدة واحدة لكل رسالة، مما يتيح لجامع الحزم تجاهل الرسائل التي لا تستوردها الصفحة.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

أضف المجلد المنشأ إلى `.gitignore`. حيث يُعاد بناؤه عند `dev` و `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="إنشاء ملفات الترجمة الخاصة بك">

يصبح كل مفتاح دالة يتم تصديرها من `src/paraglide/messages`. المفاتيح المسطحة بنمط snake_case تعطي أنظف أسماء للدوال. تستخدم المتغيرات عناصر نائبة مثل `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

تستخدم صيغ الجمع بناء جملة المتغيرات (variants) لتنسيق رسائل inlang:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="إضافة البرمجية الوسيطة للخادم (Server Middleware)">

تقوم البرمجية الوسيطة بتحديد لغة كل طلب وفقا لاستراتيجيتك، وتجعلها متاحة لـ `getLocale()` طوال عملية العرض على الخادم، من خلال نطاق `AsyncLocalStorage`. هذا ما يجعل الطلبات المتزامنة بلغات مختلفة آمنة.

في TanStack Start، قم بلف مدخل الخادم الافتراضي:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="إعادة كتابة عناوين URL المترجمة في الموجه (Router)">

يقوم خيار `rewrite` في TanStack Router بترجمة عناوين URL عند حدود الموجه:

- **المدخل (input)**: يتم تجريد `/fr/about` من بادئة اللغة ليصبح `/about` قبل المطابقة، وبالتالي فإن مسار `about.tsx` واحد يخدم كل اللغات؛
- **المخرج (output)**: كل رابط `href` يتم إنشاؤه (الروابط، عمليات إعادة التوجيه، التنقل) تتم ترجمته للغة النشطة، بحيث يقوم `<Link to="/about">` بعرض `/fr/about` في صفحة فرنسية.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> نظرا لأن الروابط تتم ترجمتها تلقائيا بواسطة إعادة الكتابة، فلن تحتاج إلى مكون `LocalizedLink` مخصص: استخدم مكون `Link` الخاص بـ TanStack Router كالمعتاد.

</Step>
<Step number={7} title="إنشاء المستند الجذري (Root Document)">

ترجع `getLocale()` اللغة المحددة بواسطة البرمجية الوسيطة على الخادم، واللغة من عنوان URL في المتصفح، بحيث تكون `lang` و `dir` متطابقتين في HTML الخادم وبعد التفعيل في المتصفح (hydration).

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="استخدام الترجمات في صفحاتك">

الرسائل هي دوال عادية: استورد `m`، واستدعِ الدالة، ومرر المتغيرات ككائن. كل شيء محدد الأنواع، بما في ذلك المتغيرات.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> تقبل دالة الرسالة أيضا لغة صريحة: `m.about_title({}, { locale: "fr" })`. هذا مفيد في شيفرة الخادم التي تعرض لغة مختلفة عن لغة الطلب، مثل رسائل البريد الإلكتروني.

</Step>
<Step number={9} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

قم بعرض المبدل كـ **روابط** باستخدام `localizeHref`، حتى تكتشف محركات البحث كل اللغات. تقوم `setLocale` بتخزين الاختيار في ملف تعريف الارتباط (cookie) وإعادة تحميل الصفحة باللغة الجديدة: إعادة التحميل الكاملة هي السلوك المتوقع لـ Paraglide، لأن دوال الرسائل تقرأ اللغة عند كل استدعاء بدلا من الاشتراك في حالة React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="تدويل البيانات الوصفية (Metadata)" isOptional={true}>

يمكن لكل نسخة لغوية أن تتصدر نتائج البحث بشكل مستقل، بشرط أن توفر كل صفحة:

- `<title>` و `description` **مترجمين**؛
- رابط **canonical** يشير إلى الصفحة نفسها؛
- رابط **`hreflang` بديل لكل لغة**، بالإضافة إلى **`x-default`**؛
- وسوم **Open Graph**: `og:locale` و `og:locale:alternate` و `og:url`؛
- **JSON-LD** مع تعيين `inLanguage`.

تقوم دالة `localizeUrl` الخاصة بـ Paraglide ببناء عناوين URL البديلة من `urlPatterns` الخاصة بك، بحيث لا تنحرف أبدا عن التوجيه الفعلي:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="تدويل خريطة الموقع (Sitemap)" isOptional={true}>

تسرد خريطة الموقع متعددة اللغات كل عنوان URL لكل لغة، ويعلن كل إدخال عن جميع بدائله باستخدام `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="تدويل ملف robots.txt" isOptional={true}>

توجد المسارات الخاصة في كل لغة، لذلك يجب أن تغطي قواعد `Disallow` كل مسار مترجم. احذف `public/robots.txt` إذا كان المشروع المبدئي قد أنشأ واحدا، ثم قم بتقديمه من مسار:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="العرض المسبق (Pre-render) لكل لغة" isOptional={true}>

قم بإدراج المسار المترجم لكل صفحة حتى يقوم TanStack Start بالعرض المسبق لجميع إصدارات اللغات. الدالة `localizeHref` هي شيفرة منشأة دون أي اعتماد على المتصفح، لذا يمكن تشغيلها في `vite.config.ts`، ولكن الملف لا يوجد إلا بعد عملية التجميع الأولى. إدراج المسارات يدويا، كما هو موضح أدناه، يتجنب مشكلة ترتيب البناء هذه:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

نظرا لأن مبدل اللغة يعرض روابط حقيقية، فإن `crawlLinks: true` سيكتشف أيضا الصفحات التي نسيت إدراجها.

</Step>
<Step number={14} title="معالجة صفحات 404 المترجمة" isOptional={true}>

مع إعادة الكتابة، تتم مطابقة `/fr/does-not-exist` كـ `/does-not-exist`، وتظل `getLocale()` ترجع `fr`، وبالتالي فإن `notFoundComponent` الجذري من الخطوة 7 يتم عرضه بالفرنسية. يضمن المسار الشامل (catch-all route) وصول المسارات العميقة أيضا إليه. قم بتمييز الصفحة بـ `noindex`: يرفع React 19 الوسم `<meta>` إلى `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="الوصول إلى اللغة في دوال الخادم (Server Functions)" isOptional={true}>

تعمل دوال الخادم داخل نطاق برمجية Paraglide الوسيطة، لذا تعمل `getLocale()` هناك أيضا:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="المقارنة مع Intlayer" isOptional={true}>

لا يوجد محول مباشر من Paraglide إلى Intlayer، لأن كلاهما يتبع نفس الفكرة: تجميع المحتوى في وقت البناء وشحن أقل قدر ممكن من بيئة التشغيل. تكمن الاختلافات في ما يصل إلى المتصفح وكيفية تنظيم المحتوى:

- **اللغات**: يقوم Intlayer بتحميل [قواميس ديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) لكل لغة (0% تسرب لغات في المقارنة المعيارية)، بينما تحمل كل دالة رسالة في Paraglide جميع اللغات (49.7%).
- **تنظيم المحتوى**: يمكن للمحتوى أن يتواجد في ملفات `.content.ts` بجانب كل مكون، أو في ملفات مركزية. راجع [التدويل لكل مكون مقابل التدويل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md).
- **تبديل اللغة**: تتم قراءة المحتوى من سياق React context، لذا فإن تبديل اللغة يعيد العرض دون إعادة تحميل الصفحة.
- **الشيفرة المنشأة**: لا يتم إنشاء أي شيء داخل `src`، لذا لا يوجد شيء لإعادة إنشائه قبل إجراء commit.

إذا كنت قادما من مكتبة أخرى بدلا من Paraglide، فإن [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) تحافظ على واجهة برمجة تطبيقات `use-intl` أو `next-intl` أو `react-i18next` أو `react-intl` أو Lingui وتستبدل بيئة التشغيل.

راجع [هل Intlayer أخف من Paraglide؟](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/is_intlayer_lighter_than_paraglide.md) و [دليل Intlayer مع TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="أتمتة ترجماتك باستخدام Intlayer" isOptional={true}>

تعرض Paraglide الترجمات، لكنها لا تساعدك في **إنشائها**. Intlayer **مجاني** و **مفتوح المصدر**، وتساعد أدواته حتى في مشروع يستخدم Paraglide:

- **الترجمة بالذكاء الاصطناعي** باستخدام مفتاح API والمزود الخاصين بك. راجع [الملء التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md) و [واجهة سطر الأوامر (CLI)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).
- **الحفاظ على ملفات JSON الخاصة بك** كمصدر للحقيقة باستخدام [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md).
- **اختبار الترجمات المفقودة** في CI. راجع [اختبار ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).
- **فحص موقعك المنشور** للبحث عن وسوم `hreflang` المفقودة والروابط الأساسية الخاطئة وتسرب اللغات باستخدام [أمر scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/scan.md).

</Step>
</Steps>

## الأسئلة الشائعة

<FAQ>

<Question title="هل يعد Paraglide JS خيارا جيدا لـ TanStack Start؟">

إنه خيار قوي: فهو مستخدم في أمثلة TanStack Router الرسمية، ويحتوي على أصغر بيئة تشغيل في [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) (~1.8 KB gzip)، والرسائل محددة الأنواع بالكامل. التنازلات تكمن في أن كل دالة رسالة تحتوي على جميع اللغات، مما يسرب ما يقرب من نصف النصوص المترجمة لزوار اللغات الأخرى، وأن تبديل اللغة يعيد تحميل الصفحة.

</Question>
<Question title="هل أحتاج إلى مقطع مسار $locale مع Paraglide؟">

لا. تقوم عملية `rewrite` في الموجه بإزالة بادئة اللغة قبل مطابقة المسار وإضافتها مرة أخرى إلى الروابط المنشأة، بحيث يخدم ملف `about.tsx` واحد كلا من `/about` و `/fr/about` و `/es/about`.

</Question>
<Question title="لماذا يؤدي تغيير اللغة إلى إعادة تحميل الصفحة؟">

تقرأ دوال الرسائل اللغة عند استدعائها، وهي غير مشتركة في حالة React state. لذلك، تقوم `setLocale` بإعادة تحميل الصفحة افتراضيا، بحيث تتم إعادة عرض كل رسالة باللغة الجديدة. يمكنك تمرير `{ reload: false }`، ولكن سيتعين عليك إعادة عرض شجرة المكونات بنفسك.

</Question>
<Question title="هل يجب علي تضمين مجلد src/paraglide المنشأ في Git؟">

من الأفضل ألا تفعل ذلك. يُعاد إنشاء المجلد عند كل `dev` و `build`، وتضمينه يسبب تعارضات دمج (merge conflicts) في الملفات المنشأة تلقائيا. قم بتضمين `messages/*.json` و `project.inlang/settings.json` بدلا من ذلك.

</Question>
<Question title="كيف أضيف وسوم hreflang باستخدام Paraglide؟">

استخدم `localizeUrl` لإنشاء عنوان URL مطلق واحد لكل لغة في `head()` الخاص بالمسار، وأضف `x-default` يشير إلى اللغة الأساسية. توفر الخطوة 10 دالة مساعدة قابلة لإعادة الاستخدام، وتضيف الخطوة 11 نفس البدائل إلى خريطة الموقع sitemap.

</Question>
<Question title="هل يقوم Paraglide بالتخلص من الترجمات غير المستخدمة (tree-shaking)؟">

يتم التخلص من **الرسائل** غير المستخدمة عند استخدام `outputStructure: "message-modules"`، بحيث لا يتسرب محتوى الصفحات الأخرى. لكن لا يتم التخلص من **اللغات** غير المستخدمة: فكل دالة رسالة تحتوي على جميع الترجمات، وهذا هو سبب تسجيل المقارنة المعيارية لتسرب لغات بنسبة 49.7%.

</Question>
<Question title="هل يمكنني الانتقال من Paraglide إلى Intlayer؟">

نعم. كلاهما يعتمد على المترجم، لذا فإن النموذج الذهني متقارب جدا. احتفظ بملفات JSON الخاصة بك باستخدام [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)، ثم استبدل استدعاءات `m.key()` بـ `useIntlayer`، صفحة تلو الأخرى. راجع [دليل Intlayer مع TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

</Question>

</FAQ>

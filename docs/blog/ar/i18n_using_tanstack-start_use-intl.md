---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "تدويل TanStack Start مع use-intl: دليل الإعداد الشامل لعام 2026"
description: "ترجم تطبيق TanStack Start الخاص بك باستخدام use-intl: التوجيه بحسب اللغة، الرسائل المكتوبة بأنواع TypeScript، العرض على الخادم SSR، و hreflang وخريطة الموقع sitemap و robots.txt، مع بيانات مقارنة حجم الحزمة الحقيقية."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - التدويل
  - i18n
  - SEO
  - خريطة الموقع
  - React
  - مدونة
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "النسخة الأولية"
author: aymericzip
---

# كيفية تدويل تطبيق TanStack Start الخاص بك باستخدام use-intl في عام 2026

## جدول المحتويات

<TOC/>

## ما هو use-intl؟

**use-intl** هو النواة المستقلة عن أطر العمل لمكتبة `next-intl`. توفر واجهات البرمجة نفسها مثل `useTranslations` و `useFormatter` و `IntlProvider`، ودعم ICU MessageFormat، وتكاملاً قوياً مع TypeScript، دون أي اعتماد على Next.js. يجعل ذلك منها أحد أكثر الخيارات شيوعاً لترجمة تطبيقات **TanStack Start**، وهي المكتبة التي تقترحها أدوات المساعدة بالذكاء الاصطناعي غالباً لهذه الحزمة التقنية.

لا يتضمن TanStack Start طبقة تدويل افتراضية مدمجة. التوجيه واكتشاف لغة المستخدم والبيانات الوصفية لتحسين محركات البحث (SEO) وإنشاء خريطة الموقع (sitemap) كلها أمور تترك لمسؤوليتك. يغطي هذا الدليل كل ذلك بالتفصيل من البداية إلى النهاية:

- **التوجيه المراعي للغة** باستخدام مقطع مسار اختياري `{-$locale}` (مثل `/about` و `/fr/about`).
- **تحميل الرسائل لكل مسار على حدة** بحيث تقوم الصفحة بتنزيل نطاقات الأسماء (namespaces) واللغة التي تعرضها فقط.
- **العرض على الخادم (SSR) والترطيب (Hydration)** دون أي تباين في النصوص.
- **تحسين شامل لمحركات البحث متعدد اللغات**: وسوم `<title>` ووصف مترجمة، والرابط الأساسي (canonical URL)، وبدائل `hreflang` مع `x-default`، ولغات Open Graph، وبيانات JSON-LD المنظمة، وخريطة موقع مع بدائل `xhtml:link`، وملف `robots.txt`، والعرض المسبق لكل لغة.

> هل تبحث عن حزمة تقنية أخرى؟

- [دليل TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_paraglide.md)
- [دليل TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_lingui.md)
- [دليل TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)

> هل تستخدم Next.js بدلاً من ذلك؟ راجع [دليل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-intl.md).

- [دليل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-intl.md)

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)

## ماذا تقول المقارنة المعيارية (Benchmark) عن use-intl على TanStack Start

يقوم [الاختبار المعياري للتدويل (i18n benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) بتشغيل التطبيق نفسه المكون من 10 صفحات و 10 لغات على TanStack Start باستخدام جميع المكتبات الرئيسية، ويقيس ما يقوم المتصفح بتنزيله بالفعل.

- [الاختبار المعياري للتدويل (i18n benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

الأرقام الرئيسية للإصدار `use-intl@4.14.2`، تم قياسها في 2026-09-26 (مضغوطة بصيغة gzip):

| الإعداد                             | حجم المكتبة | كود JS لكل صفحة | تسريب اللغات الأخرى | تسريب الصفحات الأخرى |
| :---------------------------------- | ----------: | --------------: | ------------------: | -------------------: |
| بدون تدويل (التطبيق الأساسي)        |           - |        111.0 KB |                  0% |                   0% |
| `use-intl` (إعداد هذا الدليل)       |     75.9 KB |        128.7 KB |                  0% |                   0% |
| `@intlayer/use-intl` (طبقة التوافق) |      6.7 KB |        129.4 KB |                  0% |                   0% |
| `react-intlayer` (Intlayer الأصلي)  |      4.5 KB |        126.8 KB |                  0% |                   0% |

النقاط الأساسية المستفادة:

- **تقسيم الرسائل حسب الصفحة وتحميلها لكل لغة.** هذا يزيل كلا نوعي التسريب، وهو ما تطبقه الخطوات الموضحة أدناه.
- **بيئة التشغيل (runtime) نفسها تظل ثقيلة** (~76 KB بصيغة gzip)، لأن محلل ICU يتم شحنه إلى العميل. توفر طبقة التوافق `@intlayer/use-intl` (الخطوة 17) واجهة البرمجة نفسها تماماً مع بيئة تشغيل بحجم ~7 KB فقط.

> للاطلاع على البيانات الكاملة: راجع [تقرير الاختبار المعياري لـ TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)، و[مستودع الاختبار المعياري](https://github.com/intlayer-org/benchmark-i18n).

- [تقرير الاختبار المعياري لـ TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)

## مقارنة الميزات على TanStack Start

مقارنة بين `use-intl` والمكتبات الأخرى الشائعة الاستخدام في TanStack Start:

| الميزة                                                  | `react-intlayer` (Intlayer)            | `use-intl`                       | Paraglide JS                          | Lingui                       |
| ------------------------------------------------------- | -------------------------------------- | -------------------------------- | ------------------------------------- | ---------------------------- |
| **الترجمات بالقرب من المكونات**                         | ✅ في نفس الموضع (Co-located)          | ❌ ملفات JSON مركزية             | ❌ ملف JSON واحد لكل لغة              | ⚠️ النص المصدر داخل المكونات |
| **التكامل مع TypeScript**                               | ✅ أنواع يتم إنشاؤها تلقائياً          | ✅ عبر `AppConfig`               | ✅ دوال رسائل محددة الأنواع           | ⚠️ وحدات ماكرو فقط           |
| **اكتشاف الترجمات المفقودة**                            | ✅ أخطاء أثناء الكتابة والتحزيم        | ⚠️ قيمة احتياطية في بيئة التشغيل | ⚠️ الرجوع إلى اللغة الأساسية          | ⚠️ الرجوع إلى النص المصدر    |
| **المحتوى الغني (JSX، Markdown)**                       | ✅ دعم مباشر                           | ⚠️ وسوم عبر `t.rich`             | ⚠️ سلاسل نصية                         | ✅ JSX داخل `<Trans>`        |
| **التوجيه المترجم (Localized routing)**                 | ✅ مدمج                                | ❌ يدوي عبر `{-$locale}`         | ✅ `urlPatterns` + إعادة كتابة الموجه | ❌ يدوي عبر `{-$locale}`     |
| **تغيير اللغة بدون إعادة تحميل الصفحة**                 | ✅ نعم                                 | ✅ نعم                           | ❌ إعادة تحميل الصفحة بالكامل         | ✅ نعم                       |
| **صيغ الجمع (Pluralization)**                           | ✅ معتمد على التعداد (Enumeration)     | ✅ ICU                           | ✅ متغيرات (Variants)                 | ✅ ICU                       |
| **ICU MessageFormat**                                   | ✅ عبر `format: "icu"`                 | ✅ أصلي                          | ⚠️ عبر إضافة inlang                   | ✅ أصلي                      |
| **صيغ المحتوى**                                         | ✅ `.ts`, `.json`, `.md`, `.yaml`...   | ⚠️ `.json`                       | ⚠️ inlang JSON                        | ✅ PO, JSON, CSV             |
| **الترجمة بالذكاء الاصطناعي**                           | ✅ باستخدام المزود والمفتاح الخاصين بك | ❌ لا                            | ❌ لا                                 | ❌ لا                        |
| **المحرر المرئي / نظام إدارة المحتوى (CMS)**            | ✅ محرر محلي + CMS اختياري             | ❌ منصات خارجية                  | ⚠️ تطبيقات بيئة inlang                | ❌ منصات خارجية              |
| **مساعدات تحسين محركات البحث (hreflang، خريطة الموقع)** | ✅ مدمجة                               | ❌ يدوية                         | ⚠️ عناوين URL مترجمة، والباقي يدوي    | ❌ يدوية                     |
| **حجم بيئة التشغيل (gzip، الاختبار المعياري)**          | 4.5 KB                                 | 75.9 KB                          | 1.8 KB                                | 56.7 KB                      |
| **التسريب، أفضل إعداد (اللغة / الصفحة)**                | 0% / 0%                                | 0% / 0%                          | 49.7% / 0%                            | 8.6% / 0%                    |
| **الترجمات المفقودة في التكامل المستمر (CI)**           | ✅ `npx intlayer test`                 | ⚠️ غير مدمج                      | ⚠️ غير مدمج                           | ✅ `lingui compile --strict` |

> أرقام حجم بيئة التشغيل ونسبة التسريب مأخوذة من [الاختبار المعياري لـ TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md). تم قياس التسريب بناءً على أفضل إعداد لكل مكتبة.

- [الاختبار المعياري لـ TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)

> أدلة TanStack Start الأخرى:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)

## أفضل الممارسات التي ينبغي اتباعها

- **تعيين `lang` و `dir` على وسم `<html>`** لضمان إمكانية الوصول وقارئات الشاشة ومحركات البحث.
- **الحفاظ على عنوان URL مخصص لكل لغة.** استخدم بادئة اللغة في المسار (`/fr/about`) بدلاً من التبديل المعتمد على ملفات تعريف الارتباط فقط، بحيث تكون كل صفحة مترجمة قابلة للفهرسة والمشاركة.
- **تقسيم الرسائل بحسب نطاقات الأسماء** (`common`، `home`، `about`) وتحميلها لكل مسار.
- **تحميل اللغة النشطة فقط.** تجنب استيراد ملفات كل اللغات في وحدة نمطية يتم شحنها إلى المتصفح.
- **تثبيت المنطقة الزمنية** في `IntlProvider`. وإلا سيتم تنسيق التواريخ في المنطقة الزمنية للخادم أثناء العرض على الخادم (SSR) وفي المنطقة الزمنية للزائر أثناء الترطيب، مما يؤدي إلى حدوث أخطاء عدم تطابق الترطيب (hydration mismatches).
- **ترجمة البيانات الوصفية الخاصة بك**، والتصريح عن `canonical` و `hreflang` و `x-default` في كل صفحة.
- **إنشاء خريطة موقع sitemap وملف robots.txt متعددي اللغات**، مع تقديم عرض مسبق (pre-rendering) لكل لغة.
- **استخدام روابط حقيقية لمبدل اللغة**، وليس عنصر `<select>`، حتى تتمكن برامج الزحف من اكتشاف جميع اللغات.
- **تحديد أنواع رسائلك بواسطة TypeScript** بحيث يفشل أي مفتاح مفقود في وقت الترجمة البرمجية (compile time).

- [التدويل وتحسين محركات البحث (SEO)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md)
- [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md)

## دليل خطوة بخطوة لإعداد use-intl في تطبيق TanStack Start

إليك هيكل المشروع الذي سنقوم بإنشائه:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="تثبيت التبعيات">

ابدأ من مشروع TanStack Start، ثم قم بإضافة `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: توفر `IntlProvider` و `useTranslations` و `useFormatter` و `createTranslator` (قابلة للاستخدام خارج React، على سبيل المثال في دالة `head()`).

</Step>
<Step number={2} title="مركزة إعدادات اللغات">

قم بإنشاء مصدر وحيد وموحد لجميع إعدادات اللغات والدوال المساعدة لعناوين URL. تستورد جميع الملفات الأخرى (المسارات، SEO، خريطة الموقع، العرض المسبق) من هنا، مما يجعل إضافة لغة جديدة تعديلاً في سطر واحد فقط.

تبقى اللغة الافتراضية بدون بادئة في المسار (`/about`)، بينما تضاف البادئة إلى اللغات الأخرى (`/fr/about`). هذه هي استراتيجية "عند الحاجة": عنوان URL واحد لكل صفحة لكل لغة، وعناوين URL قصيرة لجمهورك الرئيسي.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="إنشاء ملفات الترجمة الخاصة بك">

قم بتنظيم الرسائل بحسب اللغة ونطاق الأسماء (namespace). يحتوي `common` على ما تحتاجه كل صفحة (شريط التنقل، التذييل)، وتخصص لكل صفحة ملفها الخاص، بما في ذلك بياناتها الوصفية.

تعتمد use-intl على **ICU MessageFormat**، لذا يتم تضمين صيغ الجمع والشروط والوسائط المنسقة داخل الرسالة نفسها.

<Tabs group="locale">
 <Tab value='en' label='الإنجليزية'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='الفرنسية'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

قم بإنشاء `home.json` بالطريقة نفسها، مع كائن `metadata` ومحتوى الصفحة.

</Step>
<Step number={4} title="تحميل الرسائل لكل نطاق أسماء ولكل لغة">

تعد دالة التحميل هذه الملف الأكثر أهمية للأداء. تطلب `import.meta.glob` من Vite توليد **كتلة برمجية منفصلة (chunk) لكل ملف JSON**. المسار الذي يطلب `["about"]` باللغة الفرنسية يقوم بتنزيل `messages/fr/about.json` فقط دون أي شيء آخر، وهو ما يتيح للاختبار المعياري الوصول إلى 0% تسريب للغات و 0% تسريب للصفحات.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="تحديد أنواع الرسائل في TypeScript">

يوفر توسيع الوحدات النمطية (Module augmentation) ميزة الإكمال التلقائي عند استدعاء `useTranslations("about")` و `t("counter.label")`، بالإضافة إلى إظهار خطأ أثناء التجميع عند حدوث أي خطأ إملائي أو حذف مفتاح.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

تأكد من تفعيل خيار `resolveJsonModule` في ملف `tsconfig.json` الخاص بك.

</Step>
<Step number={6} title="إنشاء المستند الجذري (Root Document)">

يعرض المسار الجذري وسم `<html>`. يقرأ معلمة اللغة الاختيارية لتعيين `lang` و `dir`، لتكون هذه الخصائص صحيحة في كود HTML المُنشأ على الخادم قبل تشغيل أي كود JavaScript.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

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
```

</Step>
<Step number={7} title="إنشاء مسار قالب اللغة (Locale Layout Route)">

يقوم المجلد `{-$locale}` بإنشاء مقطع مسار **اختياري**: يتطابق كل من `/about` و `/fr/about` مع `/{-$locale}/about`. يقوم هذا القالب بما يلي:

1. رفض البادئات غير المدعومة (`/xx/about` ينتج عنه خطأ 404).
2. تحميل نطاق الأسماء `common` للغة الحالية فقط.
3. توفير الرسائل عبر `IntlProvider`.

يتم تسلسل نتيجة المحمل داخل كود HTML وإعادة استخدامها أثناء الترطيب (hydration)، بحيث لا يقوم العميل بتنزيل `common.json` مرة ثانية. كما أن خيار `staleTime: Infinity` يبقيها مخزنة مؤقتاً عبر عمليات التنقل من جانب العميل.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> لا يقوم `IntlProvider` بدمج الرسائل من مزود أب تلقائياً. تضيف الخطوة التالية مكوناً بسيطاً يتولى هذه المهمة، بحيث يمكن لكل صفحة إضافة نطاق الأسماء الخاص بها فوق نطاق `common`.

</Step>
<Step number={8} title="تحديد نطاق رسائل الصفحة">

تقوم كل صفحة بتحميل نطاق الأسماء الخاص بها في المحمل التابع لها، ثم تغلف محتواها بالمكون `ScopedMessages`، الذي يدمج نطاق أسماء الصفحة مع رسائل المكون الأب.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="استخدام الترجمات داخل صفحاتك">

يجلب محمل الصفحة نطاق الأسماء `about` للغة الحالية، وتقوم دالة `head()` بإنشاء بيانات وصفية مترجمة ومتكاملة لمحركات البحث (انظر الخطوة 13)، ثم يعرض المكون المحتوى المطلوب.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="استخدام الترجمات ودوال التنسيق في المكونات">

يمكن لأي مكون يقع تحت المزودات استدعاء `useTranslations` و `useFormatter`. يتم التعامل مع صيغ الجمع عبر ICU، وتنسيق الأرقام وفقاً للغة النشطة.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="بناء مكون رابط مترجم (Localized Link)" isOptional={true}>

نظراً لأن جميع المسارات تتواجد تحت `{-$locale}`، يجب أن يحمل الرابط معلمة اللغة الحالية. يحافظ هذا الغلاف على خاصية `to` المحددة الأنواع في TanStack Router ويقوم بحقن اللغة نيابة عنك.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

اعرض مبدل اللغة في صورة **روابط** بدلاً من عنصر `<select>`. الروابط قابلة للزحف والفهرسة، مما يتيح لمحركات البحث العثور على جميع إصدارات اللغات، كما أنها تعمل بدون JavaScript. تحافظ الخاصية `to="."` على الصفحة الحالية وتستبدل معلمة اللغة فقط. يقوم ملف تعريف الارتباط بحفظ الاختيار الصريح للمستخدم للاستفادة منه في البرمجية الوسيطة لإعادة التوجيه في الخطوة 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={13} title="تدويل البيانات الوصفية (Metadata)" isOptional={true}>

هنا تتجلى الفائدة الكبرى للتدويل: يمكن لكل إصدار لغوي أن يتصدر نتائج البحث بشكل مستقل. يجب أن توفر كل صفحة:

- وسوم `<title>` ووصف **مترجمة**؛
- عنوان URL **أساسي (canonical)** يشير إلى الصفحة نفسها (وليس إلى اللغة الافتراضية)؛
- رابط **`hreflang` بديل لكل لغة**، بالإضافة إلى **`x-default`** للغات غير المتطابقة؛
- وسوم **Open Graph** مثل `og:locale` و `og:locale:alternate` و `og:url`، والمستخدمة في معاينات الشبكات الاجتماعية؛
- بيانات **JSON-LD** مع السمة `inLanguage`، والتي تساعد محركات البحث ومساعدي الذكاء الاصطناعي على نسبة لغة الصفحة بدقة.

تقوم دالة مساعدة واحدة ببناء كل هذا، مما يحافظ على بساطة وإيجاز كود الصفحات:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
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

استخدم هذه الدالة في `head()` بكل صفحة، كما هو موضح في الخطوة 9. بالنسبة للصفحة الرئيسية، مرر `path: "/"`.

</Step>
<Step number={14} title="تدويل خريطة الموقع (Sitemap)" isOptional={true}>

تسرد خريطة الموقع متعددة اللغات **كل عنوان URL لكل لغة**، ويعلن كل مدخل عن جميع بدائله باستخدام `xhtml:link`. تستخدم Google هذه التعليقات التوضيحية تماماً مثل وسوم `hreflang` في الصفحة، مما يجعلها خياراً احتياطياً موثوقاً به عندما نادراً ما يتم الزحف إلى صفحة معينة.

تتيح لك مسارات خادم TanStack Start تقديمها مباشرة من مسار ملف:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
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
<Step number={15} title="تدويل ملف robots.txt" isOptional={true}>

توجد المسارات الخاصة في جميع اللغات، لذا يجب أن تغطي قواعد `Disallow` جميع البادئات اللغوية. قم بإزالة `public/robots.txt` إذا تم إنشاؤه بواسطة قالب البداية، ثم قم بتقديمه عبر مسار:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="إعادة توجيه الزوار لأول مرة إلى لغتهم المفضلة" isOptional={true}>

تقوم برمجية وسيطة للطلب بتوجيه الزائر الذي يصل إلى `/` إلى لغته المفضلة، بالاعتماد على ملف تعريف الارتباط للغة أولاً، ثم ترويسة `Accept-Language`. تتم إعادة التوجيه للمسار `/` فقط: لا يتم تعديل الروابط المباشرة والعميقة مطلقاً، حتى تحصل الروابط المشتركة وبرامج الزحف على الصفحة المطلوبة بدقة دائماً.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> الزائر الذي يختار الإنجليزية صراحة في مبدل اللغة يحصل على `locale=en` في ملف تعريف الارتباط، وبالتالي لن تتم إعادة توجيهه مرة أخرى. في عمليات النشر الثابتة بالكامل (الخطوة 18)، يتم تقديم `/` كملف ولا تعمل هذه البرمجية الوسيطة، وهو أمر ممتاز وطبيعي: تظل الصفحة متاحة ويتولى مبدل اللغة بقية العمل.

</Step>
<Step number={17} title="الحفاظ على واجهة برمجة use-intl مع تقليص بيئة التشغيل عبر Intlayer" isOptional={true}>

توضح المقارنة المعيارية أن الجزء الأكثر ثقلاً في إعداد use-intl هو بيئة التشغيل نفسها (~76 KB بصيغة gzip). توفر أداة التوافق [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) **الواجهة البرمجية نفسها** (`useTranslations`، `useFormatter`، `IntlProvider`، `createTranslator`، صيغ جمع ICU، و `t.rich`)، لكنها تقدمها من قواميس Intlayer المجمعة: **~6.7 KB بدلاً من ~75.9 KB**، مع 0% تسريب للغات و 0% تسريب للصفحات، ودون أي تعديل على مكوناتك.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

تقوم إضافة Vite بإنشاء اسم مستعار (alias) يحول `use-intl` إلى المحول، حتى تستمر عمليات الاستيراد الحالية في العمل بسلاسة:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

تظل ملفات JSON الخاصة بك المصدر الوحيد للحقيقة بفضل [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

- [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)

> يوفر هذا المحول أيضاً مسار انتقال سلساً وتدريجياً: بمجرد تشغيله، يمكنك نقل المكونات واحداً تلو الآخر إلى واجهة `useIntlayer` الأصلية. راجع [دليل Intlayer مع TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

- [دليل Intlayer مع TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="العرض المسبق (Pre-render) لكل لغة" isOptional={true}>

تعد ملفات HTML الثابتة أسرع الصفحات التي يمكنك تقديمها وأسهلها في الفهرسة. قم بإدراج كل مسار مترجم حتى يقوم TanStack Start بالعرض المسبق لجميع إصدارات اللغات في وقت البناء، بالإضافة إلى ملفات خريطة الموقع وملف robots:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

نظراً لأن مبدل اللغة يعرض روابط حقيقية، فإن الخيار `crawlLinks: true` يكتشف أيضاً الصفحات التي نسيت إدراجها.

</Step>
<Step number={19} title="التعامل مع صفحات 404 المترجمة" isOptional={true}>

يقوم قالب الخطوة 7 بالفعل بإطلاق `notFound()` لأي بادئات لغوية غير معروفة. أضف مساراً شاملاً (catch-all) بحيث تعرض المسارات غير المعروفة داخل لغة معينة صفحة 404 المترجمة، مع وسمها بـ `noindex`: حيث يقوم React 19 برفع وسم `<meta>` تلقائياً إلى `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="الوصول إلى اللغة في دوال الخادم (Server Functions)" isOptional={true}>

لا تستقبل دوال الخادم معلمات المسار مباشرة. اقرأ ملف تعريف الارتباط للغة، مع الرجوع إلى ترويسة `Accept-Language` كخيار احتياطي، لإرسال بريد إلكتروني مترجم أو حفظ تفضيل اللغة:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

للترجمة داخل دالة الخادم، اجمع بينها وبين `loadMessages` و `createTranslator` من `use-intl`.

</Step>
<Step number={21} title="أتمتة ترجماتك باستخدام Intlayer" isOptional={true}>

تقوم use-intl بعرض الترجمات، لكنها لا تساعدك في **إنشائها وإدارتها**. Intlayer مكتبة **مجانية** و**مفتوحة المصدر**، وتسد هذه الفجوة حتى لو واصلت استخدام use-intl:

- **اختبار الترجمات المفقودة** في CI أو في اختبارات الوحدة. راجع [اختبار ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).
- **الترجمة بالذكاء الاصطناعي** باستخدام مفتاح API ومزود الخدمة الخاص بك: يقوم الأمر `npx intlayer fill` بترجمة المفاتيح المفقودة مع فهم سياق تطبيقك. راجع [الملء التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md) و[واجهة سطر الأوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).
- **الحفاظ على ملفات JSON** كمصدر وحيد للحقيقة باستخدام [إضافة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md).
- **تحرير المحتوى بصرياً** باستخدام [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) و[نظام إدارة المحتوى CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، مما يتيح لغير المطورين تحديث الترجمات بسهولة.
- **تزويد وكيل الذكاء الاصطناعي الخاص بك بالسياق** عبر [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md) و[مهارات الوكيل (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md).
- **فحص موقعك المنشور** للتأكد من عدم وجود وسوم `hreflang` مفقودة أو روابط أساسية خاطئة أو تسريبات لغوية عبر [أمر الفحص scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/scan.md).

لاستكشاف جميع الميزات، راجع [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

- [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md)

</Step>
</Steps>

## الأسئلة الشائعة

<FAQ>

<Question title="هل يعد use-intl خياراً جيداً لـ TanStack Start؟">

نعم، إذا كنت ترغب في استخدام واجهة برمجة `next-intl` خارج Next.js. يمنحك ذلك رسائل ICU ودوال التنسيق ودعماً ممتازاً لـ TypeScript، ويتجنب القيود الخاصة بـ Next.js مثل `setRequestLocale`. المأخذ الوحيد هو الحجم: يقيس [الاختبار المعياري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) حوالي ~76 KB بصيغة gzip لبيئة التشغيل، وفي الإعداد البسيط يتم إرسال جميع اللغات والصفحات إلى المتصفح. احرص على تحميل نطاقات الأسماء لكل مسار ولكل لغة، كما هو موضح في هذا الدليل، لتجنب التسريبات.

- [الاختبار المعياري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)

</Question>
<Question title="ما هو الفرق بين use-intl و next-intl؟">

`use-intl` هي النواة الأساسية لـ `next-intl`. تضيف `next-intl` تكاملات Next.js فوقها: برمجية وسيطة، ومساعدات تنقل، ودالة `getTranslations` لمكونات الخادم Server Components، وإعدادات الطلبات. في TanStack Start، تستخدم `use-intl` مباشرة وتنفذ التوجيه باستخدام TanStack Router، كما هو موضح أعلاه.

</Question>
<Question title="هل يجب استخدام بادئة في المسار أم ملف تعريف ارتباط لتخزين اللغة؟">

استخدم بادئة في عنوان URL. يمنح ذلك كل إصدار لغوي عنوان URL خاصاً به يمكن لمحركات البحث فهرسته وللمستخدمين مشاركته. لا يزال ملف تعريف الارتباط مفيداً لحفظ الاختيار الصريح للمستخدم، وهو ما تقوم به برمجية إعادة التوجيه الوسيطة في الخطوة 16.

</Question>
<Question title="لماذا تحدث أخطاء عدم تطابق الترطيب (hydration mismatches) عند تنسيق التواريخ؟">

يقوم الخادم والمتصفح بتنسيق التواريخ في مناطق زمنية مختلفة. مرر قيمة صريحة لـ `timeZone` إلى `IntlProvider` (أو المنطقة الزمنية للزائر المحفوظة في ملف تعريف ارتباط)، بحيث ينتج كلا الجانبين النص نفسه تماماً.

</Question>
<Question title="كيف يمكنني تقليل حجم حزمة use-intl؟">

أولاً، قسّم الرسائل بحسب نطاقات الأسماء وقم بتحميلها لكل مسار ولكل لغة باستخدام `import.meta.glob`، مما يزيل تسريبات اللغات والصفحات. بعد ذلك، إذا كان حجم بيئة التشغيل مهماً بالنسبة لك، انتقل إلى محول [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md): نفس واجهة البرمجة بحجم ~6.7 KB بدلاً من ~75.9 KB في الاختبار المعياري.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)

</Question>
<Question title="كيف يمكنني ترجمة العنوان والوصف التعريفي باستخدام use-intl؟">

استدعِ دالة `createTranslator` داخل دالة `head()` للمسار مع الرسائل التي يرجعها محمل المسار، ثم أرجع `title` و `description` وروابط canonical و `hreflang`. توفر الخطوة 13 دالة مساعدة قابلة لإعادة الاستخدام.

</Question>
<Question title="هل يمكنني الانتقال من use-intl إلى Intlayer بشكل تدريجي؟">

نعم. ثبّت محول التوافق أولاً (الخطوة 17): ستستمر مكوناتك في استدعاء `useTranslations`، والتي ستعمل الآن بواسطة Intlayer. بعد ذلك، انقل المكونات واحداً تلو الآخر إلى `useIntlayer`، وأعلن عن المحتوى بجوارها مباشرة. راجع [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) و[دليل Intlayer مع TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

- [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)
- [دليل Intlayer مع TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)

</Question>

</FAQ>

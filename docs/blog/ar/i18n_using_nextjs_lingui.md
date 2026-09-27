---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n في Next.js 16 باستخدام Lingui: دليل إعداد App Router"
description: "إعداد Lingui في Next.js 16 App Router: مكونات الخادم، ماكرو SWC، توجيه الوكيل، generateMetadata، hreflang، sitemap و robots.txt، مع بيانات القياس المعياري."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - تدويل
  - i18n
  - تعريب
  - تحسين محركات البحث
  - SEO
  - مدونة
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "النسخة الأولية"
author: aymericzip
---

# كيفية تعريب تطبيق Next.js الخاص بك باستخدام Lingui في عام 2026

## جدول المحتويات

<TOC/>

## ما هو Lingui؟

**Lingui** هي مكتبة تعريب وتدويل (i18n) مبنية حول **وحدات الماكرو (macros)** و**استخراج الرسائل (message extraction)**. تقوم بكتابة النص المصدري داخل مكوناتك (`` t`Hello` ``، `<Trans>Hello</Trans>`)، ثم يقوم أمر `lingui extract` بجمع كل رسالة في كتالوجات (ملفات PO افتراضيًا)، ويقوم المترجم بتجميعها إلى كود JavaScript مدمج. تستخدم الرسائل تنسيق ICU MessageFormat، ويدعم Lingui **مكونات خادم React (React Server Components)** في App Router.

يقوم هذا الدليل بإعداد Lingui في مشروع **Next.js 16 App Router**، مع:

- **ماكرو مجمعة بواسطة SWC**، للحفاظ على سرعة Turbopack الفائقة.
- **مكونات الخادم والعميل** تشترك في نفس واجهة برمجة التطبيقات `Trans` و `useLingui`.
- **توجيه اللغات** عبر `proxy.ts`: المسار `/about` للغة الافتراضية، و `/fr/about` للغات الأخرى، مع اكتشاف لغة الزائر في أول زيارة.
- **التقديم الثابت (Static rendering)** لكل لغة باستخدام `generateStaticParams`.
- **تحسين محركات البحث (SEO) الكامل متعدد اللغات**: دالة `generateMetadata` المترجمة، والرابط الأساسي (canonical)، و `hreflang` مع `x-default`، ولغات Open Graph، و JSON-LD، و `sitemap.ts`، و `robots.ts`، وصفحات 404 المترجمة.

> هل تبحث عن مكتبة أخرى؟

- [دليل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-intl.md)
- [دليل next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-i18next.md)
- [دليل Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)

> هل تستخدم TanStack Start؟

- [دليل TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_tanstack-start_lingui.md)

> هل تقارن بين المكتبات؟

- [Lingui مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer.md)
- [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md)

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)

## ماذا يقول اختبار الأداء والقياس المعياري عن Lingui في Next.js؟

يقوم [اختبار قياس i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md) بتشغيل نفس تطبيق Next.js المكون من 10 صفحات و10 لغات مع كل مكتبة رئيسية ويقيس ما يقوم المتصفح بتنزيله بالفعل.

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

الأرقام الرئيسية لحزمة `@lingui/core@6.6.0` على Next.js 16، مقاسة في 2026-09-26 (gzip):

| الإعداد                           | حجم المكتبة | حجم JS لكل صفحة | تسريب اللغات الأخرى | تسريب الصفحات الأخرى |
| :-------------------------------- | ----------: | --------------: | ------------------: | -------------------: |
| بدون i18n (التطبيق الأساسي)       |           - |        141.0 KB |                  0% |                   0% |
| Lingui، كتالوج واحد لكل لغة       |     72.1 KB |        145.4 KB |                2.8% |                89.9% |
| `@intlayer/lingui` (محول التوافق) |     10.7 KB |        221.6 KB |                 50% |                  90% |
| `next-intlayer` (Intlayer الأصلي) |      4.9 KB |        141.5 KB |                  0% |                   0% |

أهم الاستنتاجات:

- **الكتالوج الفردي لكل لغة لا يزال يسرب رسائل الصفحات الأخرى** إلى موفر العميل (Client Provider). احتفظ بأكبر قدر ممكن من النصوص داخل مكونات الخادم، التي ترسل كود HTML المعروض فقط دون الكتالوجات.
- **يبلغ وزن بيئة تشغيل Lingui حوالي 72 كيلوبايت (gzip).** يقلل محول التوافق `@intlayer/lingui` بيئة التشغيل إلى حوالي 11 كيلوبايت، ولكن في هذا الاختبار المعياري، لا يزال إعداد التوافق مع Next.js يرسل كتالوجات كاملة إلى الصفحة. واجهة برمجة تطبيقات `next-intlayer` الأصلية هي الإعداد الوحيد الذي يحافظ على حجم التطبيق الأساسي.

> راجع البيانات الكاملة: [تقرير القياس المعياري لـ Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md)، و[مستودع القياس المعياري](https://github.com/intlayer-org/benchmark-i18n).

## مقارنة الميزات في Next.js

مقارنة بين Lingui و `next-intl` و Intlayer في الميزات التي يحتاجها مشروع Next.js App Router عادة:

| الميزة                                 | `next-intlayer` (Intlayer)                           | Lingui                                                | `next-intl`                                   |
| -------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------- |
| **الترجمات بجوار المكونات**            | ✅ المحتوى متجاور مع كل مكون                         | ⚠️ النص المصدري في المكونات، والكتالوجات مركزية       | ❌ ملفات JSON مركزية                          |
| **التكامل مع TypeScript**              | ✅ أنواع صارمة يتم إنشاؤها تلقائيًا                  | ⚠️ الماكرو محددة الأنواع، وكتالوجات الرسائل ليست كذلك | ✅ جيد، عبر توسيع `AppConfig`                 |
| **اكتشاف الترجمات المفقودة**           | ✅ أخطاء TypeScript وتحذيرات وقت البناء              | ⚠️ الرجوع وقت التشغيل إلى النص المصدري                | ⚠️ الرجوع وقت التشغيل                         |
| **المحتوى الغني (JSX، Markdown)**      | ✅ دعم مباشر                                         | ✅ JSX داخل `<Trans>`، بدون Markdown                  | ⚠️ وسوم عبر `t.rich`، بدون Markdown           |
| **الترجمة بالذكاء الاصطناعي**          | ✅ مزودك ومفتاح API الخاص بك، مع سياق التطبيق        | ❌ لا يوجد                                            | ❌ لا يوجد                                    |
| **المحرر المرئي / نظام إدارة المحتوى** | ✅ محرر مرئي محلي + CMS اختياري                      | ❌ عبر منصات خارجية                                   | ❌ عبر منصات خارجية                           |
| **التوجيه المترجم**                    | ✅ مدمج                                              | ❌ يتطلب كتابة `proxy.ts` الخاص بك                    | ✅ مقطع `[locale]` مدمج                       |
| **صيغ الجمع (Pluralization)**          | ✅ قائم على التعداد                                  | ✅ ICU، ماكرو `<Plural>`                              | ✅ ICU                                        |
| **تنسيقات المحتوى**                    | ✅ `.ts`، `.tsx`، `.js`، `.json`، `.md`، `.yaml`     | ✅ PO، JSON، CSV                                      | ✅ `.json`، `.js`، `.ts`                      |
| **تنسيق ICU MessageFormat**            | ✅ عبر `format: "icu"`                               | ✅ أصلي                                               | ✅ أصلي                                       |
| **مساعدات SEO (hreflang، sitemap)**    | ✅ مساعدات لبيانات التعريف، خريطة الموقع وrobots.txt | ❌ يدوي                                               | ✅ جيد                                        |
| **مكونات الخادم**                      | ✅ وصول مباشر في أي مكون خادم                        | ⚠️ استدعاء `setI18n` في كل تخطيط وصفحة                | ⚠️ استدعاء `await getTranslations()` لكل مكون |
| **تقليم الشجرة لكل مكون**              | ✅ في وقت البناء (Babel / SWC)                       | ⚠️ كتالوج واحد لكل لغة، ومستخرج كل صفحة تجريبي        | ⚠️ يدوي، باستخدام `pick()` لكل مسار           |
| **حجم وقت التشغيل (gzip، المعياري)**   | 4.9 KB                                               | 72.1 KB                                               | 14.7 KB                                       |
| **الترجمات المفقودة في CI**            | ✅ `npx intlayer test`                               | ✅ `lingui compile --strict`                          | ⚠️ غير مدمج                                   |
| **النظام البيئي / المجتمع**            | ⚠️ أصغر، ينمو بسرعة                                  | ✅ ناضج                                               | ✅ كبير                                       |

> تأتي أحجام وقت التشغيل من [اختبار قياس Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md). للمزيد من التفاصيل، اقرأ [Lingui مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer.md).

> أدلة Next.js أخرى:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)

## الممارسات التي يجب عليك اتباعها

- **تعيين `lang` و `dir` في وسم `<html>`** داخل تخطيط `[locale]`.
- **تفضيل مكونات الخادم** للنصوص: حيث تقوم بتقديم HTML على الخادم ولا تحتاج إلى إرسال الكتالوج إلى العميل.
- **استدعاء `initLingui(locale)` في كل تخطيط وصفحة.** التخطيطات لا تعيد التقديم عند التنقل، لذا لا يمكن للصفحة الاعتماد على أن التخطيط الخاص بها قد قام بضبط اللغة.
- **الاحتفاظ بعنوان URL واحد لكل لغة** والتقديم المسبق لكل لغة باستخدام `generateStaticParams`.
- **ترجمة بياناتك الوصفية** في `generateMetadata`، مع الروابط الأساسية `canonical`، و `hreflang` و `x-default`.
- **إنشاء خريطة موقع وملف robots.txt متعددي اللغات** باستخدام اصطلاحات `sitemap.ts` و `robots.ts`.
- **استخدام روابط حقيقية لمبدل اللغة**، حتى تتمكن برامج الزحف من اكتشاف كل لغة.
- **تشغيل `lingui extract` في التكامل المستمر (CI)** حتى لا يتم نشر أي رسالة جديدة غير مترجمة.

- [التدويل وتحسين محركات البحث](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md)
- [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md)
- [مقارنة SEO متعدد اللغات في Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/nextjs-multilingual-seo-comparison.md)

## دليل خطوة بخطوة لإعداد Lingui في تطبيق Next.js

إليك هيكل المشروع الذي سنقوم بإنشائه:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # توجيه اللغات واكتشافها
    ├── locales
    │   ├── en
    │   │   └── messages.po         # يتم إنشاؤه بواسطة `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # اللغات ومساعدات الروابط
    │   ├── appRouterI18n.ts        # كتالوجات ونسخ خاصة بالخادم فقط
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # منشئ generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # صفحة 404 مترجمة للمسارات غير المعروفة
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="تثبيت الاعتماديات">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: بيئة التشغيل، `I18nProvider`، و `setI18n` لمكونات الخادم، ووحدات الماكرو (`@lingui/core/macro`، `@lingui/react/macro`).
- **@lingui/swc-plugin**: تجميع وحدات الماكرو داخل خط معالجة SWC الخاص بـ Next.js.
- **@lingui/loader**: تجميع كتالوجات `.po` عند الاستيراد، وبالتالي لا يلزم تشغيل `lingui compile`.
- **@lingui/cli**: أمر `lingui extract` لجمع الرسائل في الكتالوجات.

> إضافة `@lingui/swc-plugin` هي إضافة WebAssembly مرتبطة بإصدار SWC الخاص بـ Next.js. إذا فشل البناء بعد ترقية Next.js، قم بتحديث الإضافة إلى الإصدار المتوافق المذكور في ملف README الخاص بها.

</Step>
<Step number={2} title="مركزية إعدادات اللغات">

يقوم ملف واحد بتحديد اللغات ومساعدات الروابط (URLs). وتقرأ منه كل من التوجيه، والبيانات الوصفية، وخريطة الموقع، وLingui.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="تكوين Lingui و Next.js">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

تقوم إضافة SWC بتجميع الماكرو، ويقوم الـ loader بتجميع ملفات `.po`، لكل من Turbopack (الافتراضي في Next.js 16) و webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

أضف نصوص الاستخراج البرمجية (scripts):

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="تحميل الكتالوجات وإنشاء نُسخ الخادم">

لا تمتلك مكونات الخادم سياق React Context، لذلك يوفر Lingui دالة `setI18n` لتسجيل النسخة لعملية التقديم الحالية. يقوم هذا الملف بتحميل كل كتالوج **مرة واحدة لكل عملية خادم** وينشئ نسخة `I18n` واحدة لكل لغة. وهو مخصص للخادم فقط (`server-only`): فلا تصل كتالوجات اللغات الأخرى إلى حزمة العميل أبدًا.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

لكي يقبل TypeScript استيراد ملفات `.po`، قم بتعريف الوحدة مرة واحدة:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="إنشاء موفر العميل (Client Provider)">

تقرأ مكونات العميل الترجمات من سياق React context. يتلقى الموفر كتالوج اللغة النشطة من تخطيط الخادم، وينشئ نسخته الخاصة مرة واحدة.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="تعريف مسارات اللغات الديناميكية">

يحتوي مقطع `[locale]` على التخطيط الجذري. يقوم `generateStaticParams` بتقديم كل لغة مسبقًا في وقت البناء، ويعيد `dynamicParams = false` خطأ 404 لأي بادئة أخرى.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> يتلقى موفر العميل الكتالوج الكامل للغة النشطة. وهذا ما يقيسه الاختبار المعياري باسم "تسريب الصفحات الأخرى". إن الاحتفاظ بالنصوص في مكونات الخادم يقلل مما يحتاجه العميل فعليًا. بالنسبة للتطبيقات الكبيرة، يقوم مستخرج Lingui التجريبي لكل صفحة (`experimental.extractor` في `lingui.config.ts`) بتقسيم الكتالوجات حسب نقطة الدخول.

</Step>
<Step number={7} title="استخدام الترجمات في مكونات الخادم">

تستخدم مكونات الخادم نفس وحدات الماكرو مثل مكونات العميل. ويجب تشغيل `initLingui` في الصفحة أيضًا، لأن التخطيط لا يعيد التقديم عند التنقل بين صفحاته.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="استخدام الترجمات في مكونات العميل">

تستخدم مكونات العميل نفس عمليات الاستيراد. وتقرأ وحدات الماكرو النسخة من `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="استخراج وترجمة رسائلك">

قم بتشغيل أمر الاستخراج. يكتب Lingui كل رسالة يتم العثور عليها في `src` داخل كتالوج كل لغة:

```bash
npm run i18n:extract
```

ثم قم بترجمة حقل `msgstr` لكل مدخل:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> تحافظ العناصر النائبة `<0>` على عناصر JSX الخاصة بـ `<Trans>` في مكانها، حتى يتمكن المترجمون من نقلها دون تعديل كود العرض.

</Step>
<Step number={10} title="إعداد الوكيل لتوجيه اللغات" isOptional={true}>

قام Next.js 16 بتغيير اسم `middleware.ts` إلى `proxy.ts`. ينفذ الوكيل استراتيجية البادئة "عند الحاجة":

- يتم تقديم `/fr/about` كما هو؛
- يعيد `/en/about` التوجيه إلى `/about`، بحيث يكون للغة الافتراضية عنوان URL موحد؛
- تتم إعادة كتابة `/about` داخليًا إلى `/en/about`، دون تغيير عنوان URL؛
- تعيد الزيارة الأولى للمسار `/` توجيه الزائر إلى لغته المفضلة (ملف تعريف الارتباط أولاً، ثم `Accept-Language`).

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

ترجع `usePathname` عنوان URL الذي يراه المتصفح (`/about` أو `/fr/about`). قم بإزالة مقطع اللغة، ثم قم ببناء رابط كل لغة. يقوم المبدل بتقديم روابط فعلية حتى تتمكن برامج الزحف من الوصول إلى إصدار كل لغة، ويتذكر ملف تعريف الارتباط الاختيار الصريح للمستخدم.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
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
<Step number={12} title="بناء مكون رابط مترجم" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

يعمل هذا المكون من مكونات الخادم أيضًا، لأنه يتم تقديمه داخل `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="تعريب بياناتك الوصفية (Metadata)" isOptional={true}>

يمكن لكل إصدار لغوي أن يتصدر نتائج البحث بمفرده، بشرط أن توفر كل صفحة:

- `title` و `description` **مترجمين**؛
- عنوان URL **أساسي (canonical)** يشير إلى الصفحة نفسها؛
- رابط **`hreflang` بديل لكل لغة**، بالإضافة إلى **`x-default`**؛
- خصائص **Open Graph** مثل `locale` و `alternateLocale` و `url`؛
- بيانات **JSON-LD** مع تحديد `inLanguage`.

تعمل دالة `generateMetadata` خارج شجرة React، لذا فهي تستخدم نسخة الخادم مباشرة مع ماكرو `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... page component from step 7
```

يتم تقديم JSON-LD بواسطة الصفحة نفسها. ولا يجوز لملفات الصفحات تصدير سوى حقول Next.js، لذا احتفظ بالمكون في ملفه الخاص:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="تعريب خريطة الموقع (Sitemap)" isOptional={true}>

يدعم اصطلاح `sitemap.ts` خاصية `alternates.languages`، والتي يقدمها Next.js كروابط بديلة `xhtml:link`. اذكر كل عنوان URL لكل لغة:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="تعريب ملف robots.txt" isOptional={true}>

توجد المسارات الخاصة في كل لغة، لذا يجب أن يغطي `disallow` كل مسار مترجم:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="التعامل مع صفحات 404 المترجمة" isOptional={true}>

يتم تقديم `not-found.tsx` داخل تخطيط `[locale]`، بحيث يمكنه الوصول إلى موفر العميل. يوجه المسار الشامل (catch-all) المسارات غير المعروفة داخل اللغة إليه. ويضيف Next.js تلقائيًا وسم `noindex` لاستجابات 404.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="الوصول إلى اللغة في إجراءات الخادم (Server Actions)" isOptional={true}>

لا تتلقى إجراءات الخادم معلمات المسار (route params). الطريقة الأكثر موثوقية هي إرسال اللغة مع النموذج، من الصفحة التي تعرفها:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="حافظ على وحدات الماكرو وقلل حجم وقت التشغيل مع Intlayer" isOptional={true}>

يحافظ محول التوافق [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md) على الكود المصدري دون أي تعديل: يتم تجميع وحدات الماكرو كما كانت، ويتم توفير استدعاءات `i18n._()` و `useLingui()` و `<Trans>` الناتجة عبر قواميس Intlayer. في اختبار قياس Next.js، ينخفض حجم بيئة التشغيل من **~72.1 كيلوبايت إلى ~10.7 كيلوبايت** (gzip).

في Next.js، يتم ربط المحول عن طريق إنشاء اسم مستعار (alias) لـ `@lingui/core` و `@lingui/react` إلى `@intlayer/lingui` في `next.config.ts` (لكل من webpack و Turbopack)، وتغليف الإعدادات باستخدام `withIntlayer` من `next-intlayer/server`. احتفظ بـ `@lingui/swc-plugin` حتى يتم تجميع وحدات الماكرو أولاً. الإعداد الكامل موجود في [دليل توافق Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md).

كما يوضح جدول القياس المعياري، يقلل المحول من حجم وقت التشغيل ولكنه لا يقلل بعد من الكتالوج المرسل إلى كل صفحة على Next.js. من الأفضل استخدامه كجسر للهجرة الانتقالية: بمجرد تشغيله، انقل المكونات واحدًا تلو الآخر إلى واجهة برمجة تطبيقات `useIntlayer` الأصلية، والتي ترسل فقط المحتوى الذي يعرضه كل مكون. راجع [دليل Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)، و [Lingui مقابل @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer-lingui.md) وجميع [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md).

</Step>
<Step number={19} title="أتمتة ترجماتك باستخدام Intlayer" isOptional={true}>

يقوم Lingui باستخراج الرسائل، ولكن ملء العشرات من الكتالوجات يدويًا هو المكان الذي يضيع فيه معظم الوقت. يُعد Intlayer **مجانيًا** و**مفتوح المصدر**، وتعمل أدواته جنبًا إلى جنب مع Lingui:

- **الترجمة باستخدام الذكاء الاصطناعي** باستخدام مفتاح API ومزودك الخاص. راجع [الملء التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md) و[واجهة سطر الأوامر (CLI)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).
- **الاحتفاظ بملفات PO** كمصدر وحيد للحقيقة مع [إضافة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md).
- **اختبار الترجمات المفقودة** في التكامل المستمر (CI). راجع [اختبار ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).
- **تدقيق موقعك المنشور** للتحقق من وسوم `hreflang` المفقودة، وعناوين canonical الخاطئة، وتسريبات اللغات باستخدام [أمر scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/scan.md).

</Step>
</Steps>

## الأسئلة الشائعة

<FAQ>

<Question title="هل يدعم Lingui نظام Next.js App Router ومكونات الخادم؟">

نعم. تدعم حزمة `@lingui/react` مكونات خادم React (RSC). تقوم مكونات الخادم بتسجيل النسخة باستخدام `setI18n` من `@lingui/react/server`، وتقرأ مكونات العميل النسخة من `I18nProvider`، ويستخدم كلاهما نفس وحدات الماكرو `Trans` و `useLingui`.

</Question>
<Question title="لماذا يجب علي استدعاء initLingui في كل صفحة وتخطيط؟">

لا تمتلك مكونات الخادم سياق React Context، لذا يتم تسجيل النسخة لكل عملية تقديم. كما يتم الحفاظ على التخطيطات عبر عمليات التنقل ولا تعيد التقديم، وبالتالي لا يمكن للصفحة الاعتماد على تخطيطها لتعيين اللغة. يضمن استدعاء `initLingui(locale)` في أعلى كل تخطيط وصفحة استقلاليتها التامة.

</Question>
<Question title="هل يجب استخدام إضافة SWC أم Babel مع Next.js؟">

استخدم `@lingui/swc-plugin`. فهو يحافظ على خط معالجة SWC وTurbopack. تؤدي إضافة تكوين Babel إلى تعطيل SWC في Next.js وإبطاء عمليات البناء. القيد الوحيد هو الحفاظ على توافق إصدار الإضافة مع إصدار SWC الخاص بإصدار Next.js لديك.

</Question>
<Question title="كيف أقوم بترجمة generateMetadata باستخدام Lingui؟">

احصل على نسخة الخادم باستخدام `getI18nInstance(locale)` وقم بترجمة الواصفات المصرح عنها باستخدام ماكرو `msg`: ``i18n._(msg`About us`)``. وأرجع `alternates.canonical`، و `alternates.languages` مع `x-default`، و `openGraph.locale`. توفر الخطوة 13 دالة مساعدة قابلة لإعادة الاستخدام.

</Question>
<Question title="ما هو حجم Lingui في حزمة Next.js؟">

يقيس [القياس المعياري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md) حوالي 72 كيلوبايت (gzip) لبيئة التشغيل. ومع كتالوج واحد لكل لغة، تزن الصفحات حوالي 145 كيلوبايت مقابل 141 كيلوبايت بدون i18n، ولكن كل صفحة لا تزال تتلقى رسائل الصفحات الأخرى عبر موفر العميل.

</Question>
<Question title="Lingui أم next-intl أم next-i18next: أيهم أختار لـ Next.js؟">

يناسب Lingui الفرق التي تفضل كتابة النص المصدري داخل المكونات والتعامل مع ملفات PO والمترجمين. يناسب next-intl الفرق التي تفضل كتالوجات JSON وواجهة برمجة تطبيقات `t("key")` المدمجة بإحكام مع Next.js. يوفر next-i18next النظام البيئي لإضافات i18next. راجع [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md) و [اختبار قياس Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md).

</Question>
<Question title="هل يمكنني الانتقال من Lingui إلى Intlayer دون إعادة كتابة مكوناتي؟">

نعم. يحافظ محول [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md) على وحدات الماكرو ويستبدل بيئة التشغيل، ثم يمكنك بعد ذلك نقل المكونات إلى `useIntlayer` تدريجيًا. راجع [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md).

</Question>

</FAQ>

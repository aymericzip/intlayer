---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: تحسين محركات البحث والتدويل في Next.js
description: تعلّم كيفية إعداد تحسين محركات البحث متعدد اللغات في تطبيق Next.js الخاص بك باستخدام next-intl و next-i18next و Intlayer.
keywords:
  - Intlayer
  - تحسين محركات البحث
  - التدويل
  - Next.js
  - i18n
  - جافا سكريبت
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - seo
  - i18n
  - nextjs
---

# تحسين محركات البحث والتدويل في Next.js: الترجمة ليست كافية

عندما يفكر المطورون في التدويل (i18n)، يكون رد الفعل الأول غالبًا: _ترجمة المحتوى_. لكن الناس عادةً ما ينسون أن الهدف الرئيسي من التدويل هو جعل موقعك الإلكتروني أكثر ظهورًا للعالم.
إذا لم يخبر تطبيق Next.js متعدد اللغات محركات البحث بكيفية الزحف وفهم إصدارات لغتك المختلفة، فقد يذهب معظم جهدك دون أن يلاحظه أحد.

في هذه المدونة، سنستكشف **لماذا التدويل (i18n) هو قوة خارقة في تحسين محركات البحث (SEO)** وكيفية تنفيذه بشكل صحيح في Next.js باستخدام `next-intl` و `next-i18next` و `Intlayer`.

---

## لماذا تحسين محركات البحث والتدويل

إضافة لغات ليست مجرد تحسين تجربة المستخدم (UX). إنها أيضًا رافعة قوية لـ **الرؤية العضوية**. وإليك السبب:

1. **اكتشاف أفضل:** تقوم محركات البحث بفهرسة الإصدارات المحلية وترتيبها للمستخدمين الذين يبحثون بلغتهم الأم.
2. **تجنب المحتوى المكرر:** تخبر العلامات الصحيحة الخاصة بالكانونيكال والبدائل زواحف البحث بأي صفحة تنتمي إلى أي لغة.
3. **تجربة مستخدم أفضل:** يصل الزوار إلى النسخة الصحيحة من موقعك على الفور.
4. **ميزة تنافسية:** عدد قليل من المواقع تنفذ تحسين محركات البحث متعدد اللغات بشكل جيد، مما يعني أنه يمكنك التميز.

---

## أفضل الممارسات لتحسين محركات البحث متعدد اللغات في Next.js

إليك قائمة تحقق يجب على كل تطبيق متعدد اللغات تنفيذها:

- **تعيين علامات `hreflang` في `<head>`**  
  يساعد جوجل على فهم الإصدارات المتوفرة لكل لغة.

- **إدراج جميع الصفحات المترجمة في `sitemap.xml`**  
  استخدم مخطط `xhtml` حتى يتمكن الزواحف من العثور على البدائل بسهولة.

- **استبعاد المسارات الخاصة/المحلية في `robots.txt`**  
  على سبيل المثال، لا تسمح بفهرسة `/dashboard`، `/fr/dashboard`، `/es/dashboard`.

- **استخدام روابط محلية**  
  مثال: `<a href="/fr/about">À propos</a>` بدلاً من الربط إلى `/about` الافتراضي.

هذه خطوات بسيطة — لكن تجاهلها قد يكلفك الرؤية.

---

## أمثلة على التنفيذ

غالبًا ما ينسى المطورون الإشارة بشكل صحيح إلى صفحاتهم عبر اللغات، لذا دعونا نرى كيف يعمل هذا عمليًا مع مكتبات مختلفة.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// دالة لإرجاع المسار المحلي بناءً على اللغة
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  // الحصول على الترجمات الخاصة بالصفحة للغة المحددة
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... بقية كود الصفحة
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

// دالة لتنسيق المسار المحلي مع الأصل
const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "شهري",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** بادئة المسار مع اللغة ما لم تكن اللغة الافتراضية */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** مساعد URL مطلق */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // استيراد ملف JSON الصحيح ديناميكيًا
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>حول</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **إنتلاير**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * ينشئ كائن يحتوي على جميع الروابط لكل لغة.
   *
   * مثال:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // يعيد
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... بقية كود الصفحة
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// دالة لإنشاء قواعد ملف robots.txt مع السماح والوصول للروابط متعددة اللغات
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // السماح لجميع عناكب البحث
    allow: ["/"], // السماح بالوصول إلى الصفحة الرئيسية
    disallow: getAllMultilingualUrls(["/dashboard"]), // منع الوصول إلى صفحات لوحة التحكم بكل اللغات
  },
  host: "https://example.com", // المضيف الأساسي للموقع
  sitemap: `https://example.com/sitemap.xml`, // رابط خريطة الموقع
});

export default robots;
```

> توفر Intlayer دالة `getMultilingualUrls` لإنشاء روابط متعددة اللغات لخريطة الموقع الخاصة بك.

  </TabItem>
</Tabs>

---

## الخاتمة

تحقيق التدويل (i18n) بشكل صحيح في Next.js لا يقتصر فقط على ترجمة النصوص، بل يتعلق بضمان أن محركات البحث والمستخدمين يعرفون بالضبط أي نسخة من المحتوى يجب عرضها.
إعداد hreflang، خرائط الموقع، وقواعد robots هو ما يحول الترجمات إلى قيمة حقيقية لتحسين محركات البحث (SEO).

بينما توفر مكتبات مثل next-intl و next-i18next طرقًا قوية لربط هذه الأمور، إلا أنها عادة ما تتطلب الكثير من الإعداد اليدوي للحفاظ على التناسق عبر اللغات.

وهنا يبرز دور Intlayer حقًا:

فهو يأتي مع مساعدين مدمجين مثل getMultilingualUrls، مما يجعل دمج hreflang، خرائط الموقع، وملفات robots أمرًا سهلاً للغاية.

تظل البيانات الوصفية مركزية بدلاً من التشتت عبر ملفات JSON أو الأدوات المخصصة.

تم تصميمه خصيصًا لـ Next.js من الأساس، بحيث تقضي وقتًا أقل في تصحيح إعدادات التكوين ووقتًا أكثر في إطلاق المشاريع.

إذا كان هدفك ليس فقط الترجمة ولكن توسيع تحسين محركات البحث متعدد اللغات بدون تعقيدات، فإن Intlayer يمنحك الإعداد الأنظف والأكثر استدامة للمستقبل.

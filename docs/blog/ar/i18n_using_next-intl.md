---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: كيفية تعريب تطبيق Next.js الخاص بك باستخدام next-intl
description: إعداد i18n باستخدام next-intl - أفضل الممارسات ونصائح تحسين محركات البحث لتطبيقات Next.js متعددة اللغات، مع تغطية التعريب، تنظيم المحتوى، والإعداد الفني.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: النسخة الأولية
---

# كيفية تعريب تطبيق Next.js الخاص بك باستخدام next-intl في عام 2025

## جدول المحتويات

<TOC/>

## ما هو next-intl؟

**next-intl** هي مكتبة تعريب (i18n) شهيرة مصممة خصيصًا لـ Next.js App Router. توفر طريقة سلسة لبناء تطبيقات Next.js متعددة اللغات مع دعم ممتاز لـ TypeScript وتحسينات مدمجة.

> إذا كنت تفضل، يمكنك أيضًا الرجوع إلى [دليل next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-i18next.md)، أو استخدام [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_next-intl.md) مباشرة.

> راجع المقارنة في [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md).

## الممارسات التي يجب اتباعها

قبل أن نبدأ في التنفيذ، إليك بعض الممارسات التي يجب اتباعها:

- **تعيين سمات HTML `lang` و `dir`**  
  في التخطيط الخاص بك، احسب `dir` باستخدام `getLocaleDirection(locale)` وقم بتعيين `<html lang={locale} dir={dir}>` لضمان الوصول الصحيح وتحسين SEO.
- **تقسيم الرسائل حسب النطاق**  
  نظم ملفات JSON حسب اللغة والنطاق (مثل `common.json`، `about.json`) لتحميل ما تحتاجه فقط.
- **تقليل حمولة العميل**  
  في الصفحات، أرسل فقط النطاقات المطلوبة إلى `NextIntlClientProvider` (مثل `pick(messages, ['common', 'about'])`).
- **تفضيل الصفحات الثابتة**  
  استخدم الصفحات الثابتة قدر الإمكان لتحسين الأداء وSEO.
- **الدولية في مكونات الخادم**

مكونات الخادم، مثل الصفحات أو جميع المكونات التي لم يتم تمييزها بـ `client` هي مكونات ثابتة ويمكن تقديمها مسبقًا أثناء وقت البناء. لذلك، سيتعين علينا تمرير دوال الترجمة إليها كخصائص (props).

- **إعداد أنواع TypeScript**  
  للغاتك لضمان سلامة الأنواع في جميع أنحاء تطبيقك.
- **وكيل لإعادة التوجيه**  
  استخدم وكيلًا للتعامل مع اكتشاف اللغة والتوجيه وإعادة توجيه المستخدم إلى عنوان URL المناسب مع بادئة اللغة.
- **تعريب بيانات التعريف، خريطة الموقع، robots.txt**  
  قم بتعريب بيانات التعريف، خريطة الموقع، وملف robots.txt باستخدام دالة `generateMetadata` المقدمة من Next.js لضمان اكتشاف أفضل من محركات البحث في جميع اللغات.
- **تعريب الروابط**
- **تعريب الروابط**  
  استخدم مكون `Link` لإعادة توجيه المستخدم إلى عنوان URL المناسب مع بادئة اللغة. من المهم ضمان اكتشاف صفحاتك في جميع اللغات.
- **أتمتة الاختبارات والترجمات**  
  تساعد أتمتة الاختبارات والترجمات في توفير الوقت لصيانة تطبيقك متعدد اللغات.

> راجع وثيقتنا التي تسرد كل ما تحتاج لمعرفته حول التعريب وتحسين محركات البحث: [التعريب (i18n) مع next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/internationalization_and_SEO.md).

---

## دليل خطوة بخطوة لإعداد next-intl في تطبيق Next.js

<iframe  
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"  
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عرض توضيحي CodeSandbox - كيفية تعريب تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> راجع [نموذج التطبيق](https://github.com/aymericzip/next-intl-template) على GitHub.

إليك هيكل المشروع الذي سنقوم بإنشائه:

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # Src اختياري
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (مجموعة مسارات لتجنب تلوث جميع الصفحات بموارد الصفحة الرئيسية)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: مكتبة التدويل الأساسية لـ Next.js App Router التي توفر الخطافات، وظائف الخادم، ومزودي العميل لإدارة الترجمات.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين يحدد اللغات المدعومة لديك ويضبط إعدادات طلب next-intl. يعمل هذا الملف كمصدر وحيد للحقيقة لإعداد i18n الخاص بك ويضمن سلامة الأنواع عبر تطبيقك.

تركيز إعدادات اللغة في مكان واحد يمنع التناقضات ويسهل إضافة أو إزالة اللغات في المستقبل. تعمل دالة `getRequestConfig` على كل طلب وتقوم بتحميل الترجمات اللازمة فقط لكل صفحة، مما يتيح تقسيم الكود وتقليل حجم الحزمة.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// تعريف اللغات المدعومة مع ضمان سلامة الأنواع
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // تحقق مما إذا كانت اللغة تكتب من اليمين إلى اليسار
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// تحميل الرسائل ديناميكيًا لكل لغة لتمكين تقسيم الكود
// Promise.all يقوم بتحميل المساحات الاسمية بالتوازي لأداء أفضل
async function loadMessages(locale: Locale) {
  // تحميل فقط المساحات الاسمية التي يحتاجها التخطيط/الصفحات الخاصة بك
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... يجب إضافة ملفات JSON المستقبلية هنا
  ]);

  return { common, home, about } as const;
}

// مساعد لإنشاء روابط محلية (مثلاً /about مقابل /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig يتم تشغيله في كل طلب ويوفر الرسائل لمكونات الخادم
// هنا حيث يتصل next-intl بعملية التقديم على جانب الخادم في Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // سنة واحدة
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // تغيير مسار /en/... إلى /...
  // اختياري: أسماء مسارات محلية
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // منع إعادة التوجيه من "/" إلى "/en" بناءً على الكوكيز
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### الخطوة 3: تعريف مسارات اللغات الديناميكية

قم بإعداد التوجيه الديناميكي للغات من خلال إنشاء مجلد `[locale]` داخل مجلد التطبيق الخاص بك. يتيح هذا لـ Next.js التعامل مع التوجيه بناءً على اللغة حيث يصبح كل لغة جزءًا من عنوان URL (مثل `/en/about`، `/fr/about`).

يُمكّن استخدام التوجيهات الديناميكية Next.js من إنشاء صفحات ثابتة لجميع اللغات أثناء وقت البناء، مما يحسن الأداء وتحسين محركات البحث (SEO). يقوم مكون التخطيط بتعيين سمات HTML `lang` و `dir` بناءً على اللغة، وهو أمر حيوي من أجل سهولة الوصول وفهم محركات البحث.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// إنشاء صفحات ثابتة مسبقًا لجميع اللغات أثناء وقت البناء (SSG)
// هذا يحسن الأداء وتحسين محركات البحث
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // في Next.js App Router، params هو Promise (يمكن استخدام await عليه)
  // هذا يسمح بحل مقاطع المسار الديناميكية بشكل غير متزامن
  const { locale } = await params;

  // أمر حاسم: setRequestLocale يخبر next-intl أي لغة يجب استخدامها لهذا الطلب
  // بدون هذا، لن تعرف getTranslations() أي لغة تستخدم في مكونات الخادم
  setRequestLocale(locale);

  // الحصول على اتجاه النص (من اليسار إلى اليمين / من اليمين إلى اليسار) لعرض HTML بشكل صحيح
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // يتم تحميل الرسائل على جانب الخادم. أرسل فقط ما هو مطلوب إلى العميل.
  // هذا يقلل من حجم حزمة جافا سكريبت المرسلة إلى المتصفح
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // الترجمات / التنسيقات التي تتم على جانب الخادم فقط
  // هذه تعمل على الخادم ويمكن تمريرها كخصائص إلى المكونات
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // يقوم NextIntlClientProvider بجعل الترجمات متاحة لمكونات العميل
    // مرر فقط مساحات الأسماء التي تستخدمها مكونات العميل فعليًا
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### الخطوة 4: إنشاء ملفات الترجمة الخاصة بك

قم بإنشاء ملفات JSON لكل لغة ومساحة أسماء. تتيح لك هذه البنية تنظيم الترجمات بشكل منطقي وتحميل ما تحتاجه فقط لكل صفحة.

تنظيم الترجمات حسب مساحة الأسماء (مثل `common.json`، `about.json`) يمكّن من تقسيم الكود وتقليل حجم الحزمة. تقوم بتحميل الترجمات اللازمة فقط لكل صفحة، مما يحسن الأداء.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "عداد",
    "increment": "زيادة"
  }
}
```

### الخطوة 5: استخدام الترجمات في صفحاتك

قم بإنشاء مكون صفحة يقوم بتحميل الترجمات على الخادم ويمررها إلى مكونات الخادم والعميل على حد سواء. هذا يضمن تحميل الترجمات قبل العرض ويمنع وميض المحتوى.

تحميل الترجمات على جانب الخادم يحسن تحسين محركات البحث (SEO) ويمنع وميض المحتوى غير المترجم (FOUC). باستخدام `pick` لإرسال الأسماء الفرعية المطلوبة فقط إلى مزود العميل، نقلل من حجم حزمة جافا سكريبت المرسلة إلى المتصفح.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // يتم تحميل الرسائل على الخادم. أرسل فقط ما هو مطلوب للعميل.
  // هذا يقلل من حجم حزمة جافا سكريبت المرسلة إلى المتصفح
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // الترجمات/التنسيقات التي تعمل فقط على الخادم
  // هذه تعمل على الخادم ويمكن تمريرها كخصائص للمكونات
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // يقوم NextIntlClientProvider بجعل الترجمات متاحة لمكونات العميل
    // قم بتمرير مساحات الأسماء التي تستخدمها مكونات العميل فقط
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### الخطوة 6: استخدام الترجمات في مكونات العميل

يمكن لمكونات العميل استخدام الخطافات `useTranslations` و `useFormatter` للوصول إلى الترجمات ووظائف التنسيق. هذه الخطافات تقرأ من سياق `NextIntlClientProvider`.

تحتاج مكونات العميل إلى خطافات React للوصول إلى الترجمات. تتكامل الخطافات `useTranslations` و `useFormatter` بسلاسة مع next-intl وتوفر تحديثات تفاعلية عند تغيير اللغة.

> لا تنسَ إضافة المساحات الاسمية المطلوبة إلى رسائل العميل في الصفحة (قم بتضمين المساحات الاسمية التي تحتاجها مكونات العميل فقط).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // نطاق مباشر إلى الكائن المتداخل
  // useTranslations/useFormatter هي hooks تقرأ من سياق NextIntlClientProvider
  // تعمل فقط إذا كان المكون ملفوفًا داخل NextIntlClientProvider
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### الخطوة 7: استخدام الترجمات في مكونات الخادم

لا يمكن لمكونات الخادم استخدام React hooks، لذا فإنها تستقبل الترجمات وأدوات التنسيق عبر props من مكونات الوالد الخاصة بها. هذه الطريقة تحافظ على تزامن مكونات الخادم وتسمح بتضمينها داخل مكونات العميل.

تحتاج مكونات الخادم التي قد تكون متداخلة تحت حدود العميل إلى أن تكون متزامنة. من خلال تمرير السلاسل المترجمة والقيم المنسقة كخصائص (props)، نتجنب العمليات غير المتزامنة ونضمن العرض الصحيح. قم بحساب الترجمات والتنسيقات مسبقًا في مكون الصفحة الأصل.

```tsx fileName="src/components/ServerComponent.tsx"
// يجب أن تكون مكونات الخادم المتداخلة داخل مكونات العميل متزامنة
// لا يمكن لـ React تسلسل الدوال غير المتزامنة عبر حدود الخادم/العميل
// الحل: حساب الترجمات/التنسيقات مسبقًا في الأصل وتمريرها كخصائص
type ServerComponentProps = {
  formattedCount: string; // العدد المنسق
  label: string; // التسمية
  increment: string; // النص الخاص بالزيادة
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> في صفحتك/التخطيط، استخدم `getTranslations` و `getFormatter` من `next-intl/server` لحساب الترجمات والتنسيقات مسبقًا، ثم مررها كخصائص إلى مكونات الخادم.

---

### (اختياري) الخطوة 8: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك باستخدام next-intl، قم بعرض روابط تدرك اللغة تشير إلى نفس مسار الصفحة مع تبديل اللغة. يقوم المزود بإعادة كتابة عناوين URL تلقائيًا، لذلك عليك فقط استهداف المسار الحالي.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // إزالة بادئة اللغة من مسار الصفحة للحصول على المسار الأساسي
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="محدد اللغة">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // بناء رابط href بناءً على ما إذا كانت اللغة الافتراضية
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (اختياري) الخطوة 9: استخدام مكون الرابط المحلي

يوفر `next-intl` حزمة فرعية `next-intl/navigation` تحتوي على مكون رابط محلي يقوم تلقائيًا بتطبيق اللغة النشطة. لقد قمنا باستخراجه لك بالفعل في ملف `@/i18n`، لذا يمكنك استخدامه كما يلي:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (اختياري) الخطوة 10: الوصول إلى اللغة النشطة داخل Server Actions

يمكن لـ Server Actions قراءة اللغة الحالية باستخدام `next-intl/server`. هذا مفيد لإرسال رسائل بريد إلكتروني محلية أو تخزين تفضيلات اللغة جنبًا إلى جنب مع البيانات المقدمة.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // استخدم اللغة لاختيار القوالب، تسميات التحليلات، إلخ.
  console.log(`تم استلام نموذج الاتصال من اللغة ${locale}`);
}
```

> `getLocale` يقرأ اللغة التي تم تعيينها بواسطة وكيل `next-intl`، لذا فهو يعمل في أي مكان على الخادم: معالجات المسارات، إجراءات الخادم، ودوال الحافة.

### (اختياري) الخطوة 11: تعريب بيانات التعريف الخاصة بك

ترجمة المحتوى أمر مهم، لكن الهدف الرئيسي من التدويل هو جعل موقعك الإلكتروني أكثر ظهورًا للعالم. التدويل (I18n) هو أداة قوية لتحسين ظهور موقعك الإلكتروني من خلال تحسين محركات البحث (SEO) بشكل صحيح.

تساعد البيانات الوصفية الدولية بشكل صحيح محركات البحث على فهم اللغات المتاحة في صفحاتك. يشمل ذلك تعيين علامات hreflang الوصفية، وترجمة العناوين والوصفات، وضمان تعيين عناوين URL الأساسية (canonical URLs) بشكل صحيح لكل لغة.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata runs for each locale, generating SEO-friendly metadata
// هذا يساعد محركات البحث على فهم نسخ اللغات البديلة
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
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

### (اختياري) الخطوة 12: تعريب خريطة الموقع الخاصة بك

قم بإنشاء خريطة موقع تتضمن جميع إصدارات اللغات المختلفة لصفحاتك. يساعد هذا محركات البحث على اكتشاف وفهرسة جميع إصدارات اللغات لمحتواك.

تضمن خريطة الموقع الدولية بشكل صحيح أن محركات البحث يمكنها العثور على جميع إصدارات اللغات لصفحاتك وفهرستها. هذا يحسن من ظهور موقعك في نتائج البحث الدولية.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * الحصول على خريطة لجميع اللغات ومساراتها المحلية
 *
 * مثال على الناتج:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// إنشاء خريطة موقع تحتوي على جميع الإصدارات المحلية لتحسين SEO
// حقل alternates يخبر محركات البحث عن نسخ اللغة المختلفة
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (اختياري) الخطوة 13: تعريب ملف robots.txt الخاص بك

قم بإنشاء ملف robots.txt يتعامل بشكل صحيح مع جميع إصدارات اللغات لمساراتك المحمية. هذا يضمن أن محركات البحث لا تقوم بفهرسة صفحات الإدارة أو لوحة التحكم بأي لغة.

تكوين ملف robots.txt بشكل صحيح لجميع اللغات يمنع محركات البحث من فهرسة الصفحات الحساسة عندما تكون مساراتك مختلفة لكل لغة.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// إنشاء المسارات لجميع اللغات (مثلاً، /admin، /fr/admin، /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### (اختياري) الخطوة 14: إعداد Proxy لتوجيه اللغة

قم بإنشاء Proxy لاكتشاف اللغة المفضلة للمستخدم تلقائيًا وإعادة توجيهه إلى عنوان URL المناسب مع بادئة اللغة. توفر مكتبة next-intl دالة Proxy مريحة تتولى هذا الأمر تلقائيًا.

يضمن البروكسي إعادة توجيه المستخدمين تلقائيًا إلى لغتهم المفضلة عند زيارة موقعك. كما أنه يحفظ تفضيل المستخدم للزيارات المستقبلية، مما يحسن تجربة المستخدم.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// يعمل الوسيط قبل المسارات، ويتولى اكتشاف اللغة وتوجيهها
// localeDetection: true يستخدم رأس Accept-Language لاكتشاف اللغة تلقائيًا
export default proxy;

export const config = {
  // تخطي API، وملفات Next الداخلية، والأصول الثابتة
  // تعبير عادي: يطابق جميع المسارات باستثناء التي تبدأ بـ api، _next، أو التي تحتوي على نقطة (ملفات)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (اختياري) الخطوة 15: إعداد أنواع TypeScript للغة

سيساعدك إعداد TypeScript في الحصول على الإكمال التلقائي وضمان سلامة الأنواع لمفاتيحك.

لهذا الغرض، يمكنك إنشاء ملف global.ts في جذر مشروعك وإضافة الكود التالي:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... يجب إضافة ملفات JSON المستقبلية هنا أيضًا
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

سيستخدم هذا الكود Module Augmentation لإضافة اللغات والرسائل إلى نوع AppConfig الخاص بـ next-intl.

### (اختياري) الخطوة 15: أتمتة ترجماتك باستخدام Intlayer

Intlayer هي مكتبة **مجانية** و**مفتوحة المصدر** مصممة لمساعدتك في عملية التوطين في تطبيقك. بينما يتولى next-intl تحميل الترجمات وإدارتها، يساعد Intlayer في أتمتة سير عمل الترجمة.

إدارة الترجمات يدويًا يمكن أن تكون مستهلكة للوقت وعرضة للأخطاء. يقوم Intlayer بأتمتة اختبار الترجمة، وتوليدها، وإدارتها، مما يوفر عليك الوقت ويضمن الاتساق عبر تطبيقك.

سيسمح لك Intlayer بـ:

- **إعلان المحتوى الخاص بك في أي مكان تريده في قاعدة الكود الخاصة بك**
  يسمح Intlayer بإعلان المحتوى الخاص بك في أي مكان تريده في قاعدة الكود باستخدام ملفات `.content.{ts|js|json}`. سيسمح ذلك بتنظيم أفضل لمحتواك، مما يضمن قابلية قراءة وصيانة أفضل لقاعدة الكود الخاصة بك.

- **اختبار الترجمات المفقودة**
  توفر Intlayer وظائف اختبار يمكن دمجها في خط أنابيب CI/CD الخاص بك، أو في اختبارات الوحدة الخاصة بك. تعرّف على المزيد حول [اختبار ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).

- **أتمتة ترجماتك**  
  توفر Intlayer واجهة سطر أوامر وامتداد VSCode لأتمتة ترجماتك. يمكن دمجها في خط أنابيب CI/CD الخاص بك. تعرّف على المزيد حول [أتمتة ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).  
  يمكنك استخدام **مفتاح API الخاص بك، ومزود الذكاء الاصطناعي الذي تختاره**. كما توفر ترجمات واعية للسياق، راجع [ملء المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md).

- **ربط المحتوى الخارجي**  
  توفر Intlayer وظائف اختبار يمكن دمجها في خط أنابيب CI/CD الخاص بك، أو في اختبارات الوحدة الخاصة بك. تعرّف على المزيد حول [اختبار ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).

- **أتمتة ترجماتك**،  
  توفر Intlayer أداة CLI وامتداد VSCode لأتمتة ترجماتك. يمكن دمجها في خط أنابيب CI/CD الخاص بك. تعرّف على المزيد حول [أتمتة ترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).  
  يمكنك استخدام **مفتاح API الخاص بك، ومزود الذكاء الاصطناعي الذي تختاره**. كما توفر ترجمات واعية للسياق، راجع [ملء المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md).

- **ربط المحتوى الخارجي**  
  تسمح Intlayer لك بربط المحتوى الخاص بك بنظام إدارة محتوى خارجي (CMS). لجلبه بطريقة محسّنة وإدراجه في موارد JSON الخاصة بك. تعرّف على المزيد حول [جلب المحتوى الخارجي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/function_fetching.md).

- **المحرر المرئي**  
  تقدم Intlayer محررًا مرئيًا مجانيًا لتحرير المحتوى الخاص بك باستخدام محرر مرئي. تعرّف على المزيد حول [التحرير المرئي لترجماتك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

والمزيد. لاكتشاف جميع الميزات التي تقدمها Intlayer، يرجى الرجوع إلى [أهمية وثائق Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: كيفية ترجمة تطبيق Next.js 15 باستخدام next-i18next – دليل i18n 2025
description: دليل عملي وجاهز للإنتاج لتعريب تطبيق Next.js 15 App Router باستخدام i18next/next-i18next وتعزيزه بـ Intlayer.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - جافا سكريبت
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# ترجمة موقع Next.js 15 الخاص بك باستخدام next-i18next باستخدام Intlayer | التدويل (i18n)

### لمن هذا الدليل

- **مبتدئ**: اتبع الخطوات الدقيقة ونسخ كتل الكود. ستحصل على تطبيق متعدد اللغات يعمل.
- **متوسط المستوى**: استخدم قوائم التحقق والتنبيهات لأفضل الممارسات لتجنب الأخطاء الشائعة.
- **متقدم**: تصفح الهيكل العام، وأقسام تحسين محركات البحث (SEO)، والأتمتة؛ ستجد الإعدادات الافتراضية المعقولة ونقاط التمديد.

### ما ستبنيه

- مشروع App Router مع مسارات محلية (مثل `/`، `/fr/...`)
- إعداد i18n مع اللغات، اللغة الافتراضية، ودعم الاتجاه من اليمين إلى اليسار (RTL)
- تهيئة i18n على جانب الخادم ومزود للعميل
- ترجمات ذات مساحات أسماء تُحمّل عند الطلب
- تحسين محركات البحث مع `hreflang`، و`خريطة الموقع` المحلية، و`robots`
- وسيط (Middleware) لتوجيه اللغة
- تكامل Intlayer لأتمتة سير عمل الترجمة (الاختبارات، التعبئة بالذكاء الاصطناعي، مزامنة JSON)

> ملاحظة: تم بناء next-i18next على أساس i18next. يستخدم هذا الدليل بدائيات i18next المتوافقة مع next-i18next في App Router، مع الحفاظ على بنية بسيطة وجاهزة للإنتاج.
> للمقارنة الأوسع، راجع [next-i18next مقابل next-i18next مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) هيكل المشروع

قم بتثبيت تبعيات next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

ابدأ بهيكل واضح. احتفظ بالرسائل مقسمة حسب اللغة والمساحة الاسمية.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

قائمة التحقق (متوسط/متقدم):

- احتفظ بملف JSON واحد لكل مساحة اسم لكل لغة
- لا تفرط في مركزية الرسائل؛ استخدم مساحات أسماء صغيرة مخصصة للصفحة أو الميزة
- تجنب استيراد كل اللغات دفعة واحدة؛ قم بتحميل ما تحتاجه فقط

---

## 2) تثبيت التبعيات

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

إذا كنت تخطط لاستخدام واجهات برمجة التطبيقات next-i18next أو تكامل الإعدادات، فقم أيضًا بتثبيت:

```bash
pnpm add next-i18next
```

---

## 3) إعداد i18n الأساسي

حدد اللغات، اللغة الافتراضية، اللغات التي تُكتب من اليمين إلى اليسار، والمساعدين للمسارات/عناوين URL المحلية.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

ملاحظة هامة: إذا كنت تستخدم `next-i18next.config.js`، فاحرص على توافقه مع `i18n.config.ts` لتجنب الاختلافات.

---

## 4) تهيئة i18n على جانب الخادم

قم بتهيئة i18next على الخادم باستخدام backend ديناميكي يستورد فقط ملفات JSON الخاصة باللغة/المجال المطلوبة.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// تحميل موارد JSON من src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

ملاحظة وسطى: حافظ على قائمة المجالات قصيرة لكل صفحة لتقليل حجم التحميل. تجنب حزم "شاملة للجميع" العامة.

---

## 5) مزود العميل لمكونات React

قم بتغليف مكونات العميل بمزود يعكس إعدادات الخادم ويحمّل فقط المجالات المطلوبة.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle } // { ns: الحزمة }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

نصيحة للمبتدئين: لا تحتاج إلى تمرير جميع الرسائل إلى العميل. ابدأ فقط بمساحات الأسماء الخاصة بالصفحة.

---

## 6) التخطيط والمسارات المحلية

قم بتعيين اللغة والاتجاه، وقم بإنشاء المسارات مسبقًا لكل لغة لتفضيل العرض الثابت.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

// دالة لإنشاء معلمات ثابتة لكل لغة
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // تحديد اللغة بناءً على المعلمات أو استخدام اللغة الافتراضية
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // تحديد اتجاه النص بناءً على اللغة (يمين إلى يسار أو يسار إلى يمين)
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) صفحة مثال مع استخدام الخادم والعميل

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// فرض العرض الثابت للصفحة
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

الترجمات (ملف JSON واحد لكل مساحة أسماء تحت `src/locales/...`):

```json fileName="src/locales/ar/about.json"
{
  "title": "حول",
  "description": "وصف صفحة حول",
  "counter": {
    "label": "عداد",
    "increment": "زيادة"
  }
}
```

مكون العميل (يحمّل فقط مساحة الأسماء المطلوبة):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> تأكد من أن الصفحة/المزود يتضمن فقط مساحات الأسماء التي تحتاجها (مثل `about`).
> إذا كنت تستخدم React أقل من الإصدار 19، قم بتخزين محولات التنسيق الثقيلة مثل `Intl.NumberFormat` في الذاكرة المؤقتة.

مكون خادم متزامن مدمج تحت حد عميل:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) تحسين محركات البحث: البيانات الوصفية، Hreflang، خريطة الموقع، الروبوتات

ترجمة المحتوى وسيلة لتحسين الوصول. قم بتوصيل تحسين محركات البحث متعدد اللغات بشكل شامل.

أفضل الممارسات:

- تعيين `lang` و `dir` في الجذر
- إضافة `alternates.languages` لكل لغة (+ `x-default`)
- سرد عناوين URL المترجمة في `sitemap.xml` واستخدام `hreflang`
- استبعاد المناطق الخاصة المحلية (مثل `/fr/admin`) في `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // استيراد الحزمة الصحيحة من JSON من src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
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
    locales.map((locale) => [locale, abs(locale, "/about")])
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
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) الوسيط (Middleware) لتوجيه اللغة

كشف اللغة وإعادة التوجيه إلى مسار محلي إذا كان مفقودًا.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // استبعاد الملفات التي تحتوي على امتدادات

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // مطابقة جميع المسارات باستثناء تلك التي تبدأ بهذه الكلمات والملفات التي تحتوي على امتداد
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) أفضل ممارسات الأداء وتجربة المطور (DX)

- **تعيين خصائص html `lang` و `dir`**: تم ذلك في `src/app/[locale]/layout.tsx`.
- **تقسيم الرسائل حسب النطاق**: حافظ على حزم صغيرة (`common.json`، `about.json`، إلخ).
- **تقليل حمولة العميل**: في الصفحات، مرر فقط النطاقات المطلوبة إلى المزود.
- **تفضيل الصفحات الثابتة**: استخدم `export const dynamic = 'force-static'` و `generateStaticParams` لكل لغة.
- **مزامنة مكونات الخادم**: مرر السلاسل/التنسيقات المحسوبة مسبقًا بدلاً من الاستدعاءات غير المتزامنة أثناء وقت العرض.
- **تخزين العمليات الثقيلة في الذاكرة المؤقتة (Memoize)**: خاصة في كود العميل لإصدارات React الأقدم.
- **التخزين المؤقت والرؤوس**: فضل الصفحات الثابتة أو `revalidate` بدلاً من العرض الديناميكي عندما يكون ذلك ممكنًا.

---

## 11) الاختبار والتكامل المستمر (CI)

- أضف اختبارات وحدة للمكونات التي تستخدم `t` لضمان وجود المفاتيح.
- تحقق من أن كل مساحة أسماء تحتوي على نفس المفاتيح عبر اللغات.
- عرض المفاتيح المفقودة أثناء التكامل المستمر (CI) قبل النشر.

سوف يقوم Intlayer بأتمتة الكثير من هذا (انظر القسم التالي).

---

## 12) إضافة Intlayer في الأعلى (الأتمتة)

يساعدك Intlayer في الحفاظ على تزامن ترجمات JSON، واختبار المفاتيح المفقودة، وملئها باستخدام الذكاء الاصطناعي عند الرغبة.

قم بتثبيت تبعيات intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

أضف سكريبتات الحزمة:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

التدفقات الشائعة:

- `pnpm i18n:test` في CI لفشل البناء عند وجود مفاتيح مفقودة
- `pnpm i18n:fill` محليًا لاقتراح ترجمات الذكاء الاصطناعي للمفاتيح المضافة حديثًا

> يمكنك تقديم وسائط CLI؛ راجع [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

---

## 13) استكشاف الأخطاء وإصلاحها

- **المفاتيح غير موجودة**: تأكد من أن الصفحة/المزود يسرد المساحات الاسمية الصحيحة وأن ملف JSON موجود تحت `src/locales/<locale>/<namespace>.json`.
- **اللغة خاطئة/وميض اللغة الإنجليزية**: تحقق مرتين من اكتشاف اللغة في `middleware.ts` ومن مزود `lng`.
- **مشاكل تخطيط RTL**: تحقق من أن `dir` مشتق من `isRtl(locale)` وأن CSS الخاص بك يحترم `[dir="rtl"]`.
- **غياب بدائل SEO**: تأكد من أن `alternates.languages` تشمل جميع اللغات و `x-default`.
- **حجم الحزم كبير جدًا**: قسم المساحات الاسمية أكثر وتجنب استيراد شجرة `locales` كاملة على العميل.

---

## 14) ما التالي

- أضف المزيد من اللغات والمساحات الاسمية مع نمو الميزات
- قم بتعريب صفحات الخطأ، ورسائل البريد الإلكتروني، والمحتوى المدفوع بواسطة API
- قم بتوسيع سير عمل Intlayer لفتح طلبات سحب تلقائيًا لتحديثات الترجمة

إذا كنت تفضل نموذجًا للبدء، جرب القالب: `https://github.com/aymericzip/intlayer-next-i18next-template`.

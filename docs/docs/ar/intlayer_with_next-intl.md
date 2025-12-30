---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: كيفية ترجمة تطبيق Next.js 15 باستخدام next-intl – دليل i18n 2025
description: اكتشف كيفية جعل موقع Next.js 15 App Router متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - Next.js 15
  - next-intl
  - جافا سكريبت
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# ترجمة موقع Next.js 15 باستخدام next-intl مع Intlayer | التدويل (i18n)

يرشدك هذا الدليل خلال أفضل الممارسات لاستخدام next-intl في تطبيق Next.js 15 (App Router)، ويُظهر كيفية إضافة Intlayer فوقه لإدارة الترجمة بشكل قوي وأتمتة العمليات.

اطلع على المقارنة في [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md).

- للمبتدئين: اتبع الأقسام خطوة بخطوة للحصول على تطبيق متعدد اللغات يعمل.
- للمطورين المتوسطين: انتبه إلى تحسين الحمولة وفصل الخادم/العميل.
- للمطورين المتقدمين: لاحظ التوليد الثابت، والوسيط (middleware)، وتكامل SEO، وخطافات الأتمتة.

ما سنغطيه:

- الإعداد وهيكل الملفات
- تحسين كيفية تحميل الرسائل
- استخدام مكونات العميل والخادم
- البيانات الوصفية، خريطة الموقع، والروبوتات لتحسين محركات البحث (SEO)
- الوسيط لتوجيه اللغة
- إضافة Intlayer فوق ذلك (CLI والأتمتة)

## إعداد تطبيقك باستخدام next-intl

قم بتثبيت تبعيات next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash packageManager="bun"
bun add next-intl
```

```bash
.
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
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### الإعداد وتحميل المحتوى

قم بتحميل فقط مساحات الأسماء التي تحتاجها مساراتك وتحقق من صحة اللغات مبكرًا. اجعل مكونات الخادم متزامنة عندما يكون ذلك ممكنًا وادفع فقط الرسائل المطلوبة إلى العميل.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // تحميل فقط مساحات الأسماء التي يحتاجها التخطيط/الصفحات الخاصة بك
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // تعيين لغة الطلب النشطة لهذا العرض على الخادم (RSC)
  unstable_setRequestLocale(locale);

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
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // يتم تحميل الرسائل على جانب الخادم. أرسل فقط ما هو مطلوب إلى العميل.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // الترجمات/التنسيق الخاصة بجانب الخادم فقط
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
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

### الاستخدام في مكون العميل

لنأخذ مثالاً على مكون عميل يعرض عدادًا.

**الترجمات (الشكل معاد استخدامه؛ قم بتحميلها في رسائل next-intl كما تفضل)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**مكون العميل**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // نطاق مباشر إلى الكائن المتداخل
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

> لا تنسَ إضافة رسالة "about" في رسالة عميل الصفحة
> (قم بتضمين مساحات الأسماء التي يحتاجها عميلك فقط).

### الاستخدام في مكون الخادم

هذا المكون الخاص بواجهة المستخدم هو مكون خادم ويمكن عرضه تحت مكون عميل (صفحة → عميل → خادم). حافظ عليه متزامنًا عن طريق تمرير سلاسل محسوبة مسبقًا.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
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

ملاحظات:

- قم بحساب `formattedCount` على جانب الخادم (مثلاً، `const initialFormattedCount = format.number(0)`).
- تجنب تمرير الدوال أو الكائنات غير القابلة للتسلسل إلى مكونات الخادم.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

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

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "شهريًا",
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

### وسيط التوجيه للغة (Middleware for locale routing)

أضف وسيطًا للتعامل مع اكتشاف اللغة والتوجيه:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // تخطي API، مكونات Next الداخلية والموارد الثابتة
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### أفضل الممارسات

- **تعيين html `lang` و `dir`**: في `src/app/[locale]/layout.tsx`، احسب `dir` عبر `getLocaleDirection(locale)` وقم بتعيين `<html lang={locale} dir={dir}>`.
- **تقسيم الرسائل حسب النطاق**: نظم ملفات JSON لكل لغة ونطاق (مثل `common.json`، `about.json`).
- **تقليل حمولة العميل**: في الصفحات، أرسل فقط النطاقات المطلوبة إلى `NextIntlClientProvider` (مثلًا، `pick(messages, ['common', 'about'])`).
- **تفضيل الصفحات الثابتة**: صدّر `export const dynamic = 'force-static'` وقم بإنشاء معلمات ثابتة لجميع `locales`.
- **مكونات الخادم المتزامنة**: مرّر سلاسل محسوبة مسبقًا (تسميات مترجمة، أرقام منسقة) بدلاً من استدعاءات غير متزامنة أو دوال غير قابلة للتسلسل.

## تنفيذ Intlayer فوق next-intl

قم بتثبيت تبعيات intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

أنشئ ملف تكوين intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // حافظ على هيكل المجلد لكل مساحة أسماء متزامنًا مع Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

أضف سكريبتات `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

ملاحظات:

- `intlayer fill`: يستخدم مزود الذكاء الاصطناعي الخاص بك لملء الترجمات المفقودة بناءً على اللغات التي قمت بتكوينها.
- `intlayer test`: يتحقق من الترجمات المفقودة أو غير الصالحة (استخدمه في بيئة التكامل المستمر CI).

يمكنك تكوين الوسائط والمزودين؛ راجع [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

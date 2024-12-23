# البدء في التدويل (i18n) باستخدام Intlayer و Next.js 14 مع App Router

## ما هو Intlayer؟

**Intlayer** هي مكتبة مبتكرة ومفتوحة المصدر للتدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. يتكامل Intlayer بسلاسة مع إطار العمل الأحدث **Next.js 14**، بما في ذلك **App Router** القوي. تم تحسينه للعمل مع **Server Components** لعرض فعال وهو متوافق تمامًا مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (من Next.js >= 15).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **تحديد التعليقات المحلية** والبيانات الوصفية والمسارات والمحتوى بشكل ديناميكي.
- **الوصول إلى الترجمات في كل من المكونات على جانب العميل والخادم**.
- **ضمان دعم TypeScript** مع أنواع تم إنشاؤها تلقائيًا، مما يحسن من الاكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة والتبديل بين اللغات.

> ملاحظة: Intlayer متوافق مع Next.js 12 و 13 و 14 و 15. إذا كنت تستخدم Next.js Page Router، يمكنك الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md). للحصول على Next.js 15 مع أو بدون turbopack، ارجع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### الخطوة 2: تكوين مشروعك

إنشاء ملف تكوين لتكوين اللغات في تطبيقك:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

لرؤية جميع المعلمات المتاحة، ارجع إلى [توثيق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Next.js الخاص بك

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### الخطوة 4: تكوين Middleware للكشف عن اللغة

قم بإعداد middleware للكشف عن اللغة المفضلة للمستخدم:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### الخطوة 5: تعريف مسارات اللغة الديناميكية

تنفيذ التوجيه الديناميكي للمحتوى المحدد:

قم بتغيير `src/app/page.ts` إلى `src/app/[locale]/page.ts`

ثم، قم بتنفيذ دالة generateStaticParams في تخطيط تطبيقك.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // السطر للإدراج

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

ثم أضف تخطيطًا جديدًا في دليل `[locale]` الخاص بك:

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

### الخطوة 6: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة قواميس المحتوى الخاصة بك:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[انظر كيف تعلن عن ملفات الإعلانات في Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### الخطوة 7: استخدام المحتوى في الشفرة الخاصة بك

قم بالوصول إلى قواميس المحتوى الخاصة بك طوال التطبيق الخاص بك:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider تُستخدم لتوفير اللغة للأطفال في الخادم
       *   لا تعمل إذا تم تعيينها في التخطيط
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider تُستخدم لتوفير اللغة للأطفال في العميل
       *   يمكن تعيينها في أي مكون أبوي، بما في ذلك التخطيط
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // قم بإنشاء إعلان المحتوى ذي الصلة

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // قم بإنشاء إعلان المحتوى ذي الصلة

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> ملاحظة: إذا كنت ترغب في استخدام المحتوى الخاص بك في خاصية `string`، مثل `alt` أو `title` أو `href` أو `aria-label`، يجب عليك استدعاء قيمة الدالة، مثل:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

للحصول على استخدام أكثر تفصيلًا لـ Intlayer في مكونات العميل أو الخادم، انظر [مثال Next.js هنا](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (اختياري) الخطوة 8: تدويل بيانات التعريف الخاصة بك

في حالة رغبتك في تدويل بيانات التعريف الخاصة بك، مثل عنوان صفحتك، يمكنك استخدام دالة `generateMetadata` المقدمة من Next.js. داخل الدالة استخدم دالة `getTranslationContent` لترجمة بيانات التعريف الخاصة بك.

````typescript
// src/app/[locale]/layout.tsx أو src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * يولد كائن يحتوي على جميع الروابط لكل لغة.
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
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... بقية الشفرة
````

> تعرف على المزيد حول تحسين بيانات التعريف [في توثيق Next.js الرسمي](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (اختياري) الخطوة 9: تدويل ملف sitemap.xml و robots.txt الخاص بك

لتدويل `sitemap.xml` و `robots.txt` الخاص بك، يمكنك استخدام دالة `getMultilingualUrls` المقدمة من Intlayer. تتيح لك هذه الدالة إنشاء روابط متعددة اللغات لخريطة الموقع الخاصة بك.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> تعرف على المزيد حول تحسين خريطة الموقع [في توثيق Next.js الرسمي](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). تعرف على المزيد حول تحسين robots.txt [في توثيق Next.js الرسمي](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (اختياري) الخطوة 10: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` المقدمة من نقطة `useLocale` . تتيح لك هذه الدالة تعيين اللغة في التطبيق وتحديث المحتوى وفقًا لذلك.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>تغيير اللغة</button>
  );
};
```

### تكوين TypeScript

يستخدم Intlayer التوسيع الو mod للتوظيف للحصول على مزايا TypeScript وزيادة قوة قاعدة الشفرة لديك.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5
// tsconfig.json

{
  // التكوين المخصص الخاص بك
  include: [
    "src",
    "types", // <- تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات المولدة بواسطة Intlayer. يسمح لك ذلك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

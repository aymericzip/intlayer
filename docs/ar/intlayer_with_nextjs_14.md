# البدء في دعم التدويل (i18n) مع Intlayer وNext.js 14 مع App Router

## ما هو Intlayer؟

**Intlayer** هو مكتبة مفتوحة المصدر مبتكرة لدعم التدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. يتكامل Intlayer بسلاسة مع إطار عمل **Next.js 14** الأحدث، بما في ذلك **App Router** القوي. تم تحسينه للعمل مع **Server Components** من أجل تقديم فعال وهو متوافق تمامًا مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (من Next.js >= 15).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس دلالية على مستوى المكون.
- **محلية البيانات الوصفية والمحتوى** بشكل ديناميكي.
- **الوصول إلى الترجمات في كل من المكونات على جانب العميل والخادم**.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن من الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من ميزات متقدمة**، مثل الكشف والتبديل الديناميكي للغة.

> ملاحظة: Intlayer متوافق مع Next.js 12 و13 و14 و15. إذا كنت تستخدم Next.js Page Router، يمكنك الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md). بالنسبة لـ Next.js 15 مع أو بدون turbopack، انظر إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

### الخطوة 1: تثبيت الاعتمادات

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

### الخطوة 2: إعداد مشروعك

أنشئ ملف إعداد لتكوين لغات تطبيقك:

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

لرؤية جميع المعلمات المتاحة، راجع [وثائق الإعداد هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في إعداد Next.js الخاص بك

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### الخطوة 4: تكوين Middleware لكشف اللغة

قم بإعداد middleware لكشف اللغة المفضلة للمستخدم:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### الخطوة 5: تحديد مسارات اللغة الديناميكية

قم بتنفيذ توجيه ديناميكي لمحتوى محلي:

قم بتغيير `src/app/page.ts` إلى `src/app/[locale]/page.ts`

ثم، قم بتنفيذ دالة generateStaticParams في تخطيط التطبيق الخاص بك.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // السطر المراد إدراجه

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

### الخطوة 6: إعلان محتواك

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

[انظر كيف تعلن ملفات اعلان Intlayer هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### الخطوة 7: استخدام المحتوى في كودك

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

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
       *   IntlayerServerProvider تُستخدم لتوفير اللغة للأطفال على الخادم
       *   لا تعمل إذا تم تعيينها في التخطيط
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider تُستخدم لتوفير اللغة للأطفال على العميل
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
  const content = useIntlayer("client-component-example"); // أنشئ اعلان محتوى مرتبط

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
  const content = useIntlayer("server-component-example"); // أنشئ اعلان محتوى مرتبط

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> ملاحظة: إذا كنت ترغب في استخدام المحتوى الخاص بك في خاصية `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب أن تتصل بقيمة الوظيفة، مثل:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

لمزيد من الاستخدامات التفصيلية لـ intlayer في مكونات العميل أو الخادم، انظر [مثال nextJS هنا](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (اختياري) الخطوة 8: تدويل بياناتك الوصفية

في حالة رغبتك في تدويل بياناتك الوصفية، مثل عنوان صفحتك، يمكنك استخدام دالة `generateMetadata` المقدمة من NextJS. داخل الدالة استخدم دالة `getTranslationContent` لترجمة بياناتك الوصفية.

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

  const url = `/`;

  /**
   * يولد كائن يحتوي على جميع الروابط لكل لغة.
   *
   * مثال:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // يرجع
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * الحصول على رابط محلي للغة الحالية
   *
   * مثال:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * يرجع:
   * '/fr/about' للغة الفرنسية
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

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
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... بقية الكود
````

> تعرف على المزيد حول تحسين البيانات الوصفية [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (اختياري) الخطوة 9: تدويل خريطة الموقع الخاصة بك

لتدويل خريطة الموقع الخاصة بك، يمكنك استخدام دالة `getMultilingualUrls` المقدمة من Intlayer. تتيح لك هذه الدالة توليد روابط متعددة اللغات لخريطة الموقع الخاصة بك.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> تعرف على المزيد حول تحسين خريطة الموقع [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (اختياري) الخطوة 10: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` المقدمة من hook `useLocale`. تتيح لك هذه الدالة تعيين اللغة الخاصة بالتطبيق وتحديث المحتوى وفقًا لذلك.

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

يستخدم Intlayer تعزيز الوحدة للاستفادة من TypeScript وجعل قاعدة التعليمات البرمجية أكثر قوة.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5
// tsconfig.json

{
  // تكوينك المخصص
  include: [
    "src",
    "types", // <- تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. سيسمح لك ذلك بتفادي الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```gitignore
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

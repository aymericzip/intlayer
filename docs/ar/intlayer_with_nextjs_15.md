# بدء استخدام التدويل (i18n) مع Intlayer و Next.js 15 App Router

## ما هو Intlayer؟

**Intlayer** هو مكتبة للتدويل (i18n) مفتوحة المصدر مصممة لتبسيط دعم متعدد اللغات في تطبيقات الويب الحديثة. يقوم Intlayer بالتكامل بسلاسة مع أحدث إطار عمل **Next.js 15**، بما في ذلك **App Router** القوي. يتم تحسينه للعمل مع **Server Components** من أجل تحسين الأداء وهو متوافق تمامًا مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **تLocalization بيانات التعريف** والطرق والمحتوى ديناميكيًا.
- **الوصول إلى الترجمات في كل من المكونات جانب العميل وجانب الخادم**.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن من استكمال التعليمات البرمجية واكتشاف الأخطاء.
- **الاستفادة من ميزات متقدمة**، مثل الكشف والتبديل الديناميكي للغات.

> ملاحظة: Intlayer متوافق مع Next.js 12، 13، 14، و 15. إذا كنت تستخدم Next.js Page Router، يمكنك الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md). بالنسبة لـ Next.js 12، 13، 14 مع App Router، الرجاء الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

### الخطوة 1: تثبيت التبعات

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

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

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

لرؤية جميع المعلمات المتاحة، راجع [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Next.js الخاص بك

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### الخطوة 4: تكوين الوسيط لتحديد اللغة

قم بإعداد وسيط للكشف عن اللغة المفضلة للمستخدم:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### الخطوة 5: تحديد مسارات ديناميكية للغة

نفذ التوجيه الديناميكي للمحتوى المخصص:

قم بتغيير `src/app/page.ts` إلى `src/app/[locale]/page.ts`

ثم، قم بتنفيذ دالة generateStaticParams في تخطيط التطبيق الخاص بك.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // خط لإدراجه

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

ثم أضف تخطيطًا جديدًا في دليل `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

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

[شاهد كيفية إعلان ملفات Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### الخطوة 7: استخدام المحتوى في التعليمات البرمجية الخاصة بك

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider يستخدم لتوفير اللغة للأبناء على الخادم
       *   لا يعمل إذا تم تعيينه في التخطيط
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider يستخدم لتوفير اللغة للأبناء على العميل
       *   يمكن تعيينه في أي مكون أب، بما في ذلك التخطيط
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
  const content = useIntlayer("client-component-example"); // إنشاء إعلان محتوى مرتبط

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
  const content = useIntlayer("server-component-example"); // إنشاء إعلان محتوى مرتبط

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> ملاحظة: إذا كنت ترغب في استخدام المحتوى الخاص بك في سمة `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

لمزيد من الاستخدامات التفصيلية لـ intlayer في مكون العميل، أو مكون الخادم، انظر [مثال nextJS هنا](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (اختياري) الخطوة 8: تدويل بيانات التعريف الخاصة بك

في حالة رغبتك في تدويل بيانات التعريف الخاصة بك، مثل عنوان الصفحة، يمكنك استخدام دالة `generateMetadata` التي توفرها NextJS. داخل الدالة استخدم دالة `getTranslationContent` لترجمة بيانات التعريف الخاصة بك.

````typescript
// src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx

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
   *  // يعود
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * الحصول على الرابط المحلّي الحالي للغة الحالية
   *
   * مثال:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * يعود:
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

// ... باقي الكود
````

> تعرف على المزيد حول تحسين بيانات التعريف [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (اختياري) الخطوة 9: تدويل خريطة موقعك

لتدويل خريطة موقعك، يمكنك استخدام دالة `getMultilingualUrls` التي يوفرها Intlayer. تتيح لك هذه الدالة إنشاء روابط متعددة اللغات لخريطة الموقع.

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

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` التي يوفرها hook `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

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

يستخدم Intlayer تحسين الوحدة للاستفادة من TypeScript وجعل قاعدة كودك أكثر قوة.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5
// tsconfig.json

{
  // تكوينك المخصص
  include: [
    "src",
    "types", // <- قم بتضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

من المستحسن تجاهل الملفات المولدة بواسطة Intlayer. يتيح لك ذلك تجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```gitignore
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer** هي مكتبة مبتكرة ومفتوحة المصدر لترجمة المحتوى (i18n) مصممة لتبسيط دعم تعدد اللغات في تطبيقات الويب الحديثة. يتكامل Intlayer بسلاسة مع إطار العمل **Next.js 15** الأحدث، بما في ذلك **App Router** القوي. تم تحسينه للعمل مع **Server Components** لتحقيق أداء فعال وهو متوافق تمامًا مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

باستخدام Intlayer، يمكنك:

- **إدارة الترجمة بسهولة** باستخدام قواميس تصريحية على مستوى المكونات.
- **ت localization ديناميكي للبيانات الوصفية، والمسارات، والمحتوى**.
- **الوصول إلى الترجمة في كل من المكونات من جانب العميل ومن جانب الخادم**.
- **ضمان دعم TypeScript** مع أنواع تم إنشاؤها تلقائيًا، مما يحسن الإكمال التلقائي والكشف عن الأخطاء.
- **الاستفادة من ميزات متقدمة**، مثل الكشف عن اللغة الديناميكية والتبديل.

> ملاحظة: Intlayer متوافق مع Next.js 12 و13 و14 و15. إذا كنت تستخدم Next.js Page Router، يمكنك الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md). بالنسبة لـ Next.js 12 و13 و14 مع App Router، الرجاء الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md).

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

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

### Step 2: Configure Your Project

أنشئ ملف تكوين لضبط اللغات في تطبيقك:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // اللغات الأخرى الخاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

لرؤية جميع المعلمات المتاحة، ارجع إلى [وثائق إعداد التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### Step 3: Integrate Intlayer in Your Next.js Configuration

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

قم بإعداد Middleware لاكتشاف اللغة المفضلة للمستخدم:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

قم بتنفيذ توجيه ديناميكي للمحتوى المحلي:

قم بتغيير `src/app/page.ts` إلى `src/app/[locale]/page.ts`

ثم، قم بتنفيذ دالة generateStaticParams في تخطيط تطبيقك.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // سطر للإدراج

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

### Step 6: Declare Your Content

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

[شاهد كيفية إعلان ملفات إعلان Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### Step 7: Utilize Content in Your Code

الوصول إلى قواميس المحتوى في جميع أنحاء تطبيقك:

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
       *   IntlayerServerProvider يُستخدم لتوفير اللغة للأطفال على الخادم
       *   لا يعمل إذا تم تعيينه في التخطيط
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider يُستخدم لتوفير اللغة للأطفال على العميل
       *   يمكن تعيينه في أي مكون رئيسي، بما في ذلك التخطيط
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
  const content = useIntlayer("client-component-example"); // إنشاء إعلان محتوى ذات صلة

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
  const content = useIntlayer("server-component-example"); // إنشاء إعلان محتوى ذات صلة

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

لمزيد من الاستخدامات التفصيلية لـ intlayer في مكون العميل أو الخادم، انظر [مثال Next.js هنا](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app).

### (Optional) Step 8: Internationalization of your metadata

في حالة رغبتك في ترجمة بيانات التعريف الخاصة بك، مثل عنوان الصفحة، يمكنك استخدام دالة `generateMetadata` المقدمة من Next.js. داخل الدالة استخدم دالة `getTranslationContent` لترجمة بيانات التعريف الخاصة بك.

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
   * ينشئ كائنًا يحتوي على جميع الروابط لكل لغة.
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

// ... بقية الكود
````

> تعرف على المزيد حول تحسين بيانات التعريف [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Step 9: Internationalization of your sitemap.xml and robots.txt

لترجمة `sitemap.xml` و `robots.txt` الخاصة بك، يمكنك استخدام دالة `getMultilingualUrls` المقدمة من Intlayer. تتيح لك هذه الدالة إنشاء روابط متعددة اللغات لخريطة موقعك.

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

> تعرف على المزيد حول تحسين خريطة الموقع [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). تعرف على المزيد حول تحسين robots.txt [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Step 10: Change the language of your content

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` المقدمة من هوك `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

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

### Configure TypeScript

يستخدم Intlayer تحسين وحدات الموديل للاستفادة من TypeScript وجعل كودك أكثر قوة.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5
// tsconfig.json

{
  // تكوينك المخصص
  include: [
    "src",
    "types", // <- تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### Git Configuration

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. يسمح لك ذلك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

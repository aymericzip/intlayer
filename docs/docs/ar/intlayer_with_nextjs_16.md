---
createdAt: 2025-10-25
updatedAt: 2025-10-26
title: كيفية ترجمة تطبيق Next.js 16 الخاص بك – دليل i18n لعام 2025
description: اكتشف كيفية جعل موقع Next.js 16 الخاص بك متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - Next.js 16
  - جافا سكريبت
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.0.0
    date: 2025-06-29
    changes: بداية السجل
---

# ترجمة موقع Next.js 16 الخاص بك باستخدام Intlayer | التدويل (i18n)

<iframe title="أفضل حل i18n لـ Next.js؟ اكتشف Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

شاهد [قالب التطبيق](https://github.com/aymericzip/intlayer-next-16-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة دولية (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. يتكامل Intlayer بسلاسة مع أحدث إطار عمل **Next.js 16**، بما في ذلك **App Router** القوي الخاص به. تم تحسينه للعمل مع **مكونات الخادم (Server Components)** لتحقيق عرض فعال وهو متوافق تمامًا مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكون.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **الوصول إلى الترجمات في كل من مكونات جانب العميل وجانب الخادم**.
- **ضمان دعم TypeScript** مع أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة وتبديلها.

> يتوافق Intlayer مع Next.js 12 و 13 و 14 و 16. إذا كنت تستخدم Next.js Page Router، يمكنك الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_page_router.md). بالنسبة لـ Next.js 12 و 13 و 14 مع App Router، راجع هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_14.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **next-intlayer**

الحزمة التي تدمج Intlayer مع Next.js. توفر موفري السياق وخطافات (hooks) للتدويل في Next.js. بالإضافة إلى ذلك، تتضمن إضافة Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى وكيل لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه عناوين URL.

### الخطوة 2: تكوين مشروعك

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغات أخرى خاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغات أخرى خاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغات أخرى خاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> من خلال ملف التهيئة هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه البروكسي، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تهيئة Next.js الخاصة بك

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* خيارات التهيئة هنا */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* خيارات التهيئة هنا */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* خيارات التهيئة هنا */
};

module.exports = withIntlayer(nextConfig);
```

> يتم استخدام مكون Next.js الإضافي `withIntlayer()` لدمج Intlayer مع Next.js. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer ضمن بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء ويضمن التوافق مع مكونات الخادم.

> دالة `withIntlayer()` هي دالة وعد (Promise). تسمح بتحضير قواميس intlayer قبل بدء البناء. إذا كنت ترغب في استخدامها مع مكونات إضافية أخرى، يمكنك انتظارها باستخدام await. مثال:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> إذا كنت ترغب في استخدامه بشكل متزامن، يمكنك استخدام دالة `withIntlayerSync()`. مثال:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> ### الخطوة 4: تعريف مسارات اللغة الديناميكية
>
> قم بإزالة كل شيء من `RootLayout` واستبداله بالكود التالي:
>
> ```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
> import type { PropsWithChildren, FC } from "react";
> import "./globals.css";
>
> const RootLayout: FC<PropsWithChildren> = ({ children }) => (
>   // لا يزال بإمكانك تغليف العناصر الفرعية بمزودين آخرين، مثل `next-themes`، `react-query`، `framer-motion`، إلخ.
>   <>{children}</>
> );
> ```

export default RootLayout;

````

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // لا يزال بإمكانك تغليف العناصر الفرعية بمزودين آخرين، مثل `next-themes`، `react-query`، `framer-motion`، إلخ.
  <>{children}</>
);

export default RootLayout;
````

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // لا يزال بإمكانك تغليف العناصر الفرعية بمزودين آخرين، مثل `next-themes`، `react-query`، `framer-motion`، إلخ.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> يتيح ترك مكون `RootLayout` فارغًا تعيين سمات [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) و [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) إلى وسم `<html>`.

لتنفيذ التوجيه الديناميكي، قم بتوفير المسار للغة بإضافة تخطيط جديد في دليل `[locale]` الخاص بك:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
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

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> يتم استخدام جزء المسار `[locale]` لتحديد اللغة المحلية. مثال: `/en-US/about` سيشير إلى `en-US` و `/fr/about` إلى `fr`.

> في هذه المرحلة، ستواجه الخطأ: `Error: Missing <html> and <body> tags in the root layout.`. هذا متوقع لأن ملف `/app/page.tsx` لم يعد قيد الاستخدام ويمكن حذفه. بدلاً من ذلك، سيقوم جزء المسار `[locale]` بتنشيط صفحة `/app/[locale]/page.tsx`. ونتيجة لذلك، ستكون الصفحات متاحة عبر مسارات مثل `/en`، `/fr`، `/es` في متصفحك. لتعيين اللغة الافتراضية كصفحة الجذر، راجع إعداد `proxy` في الخطوة 7.

ثم، قم بتنفيذ دالة `generateStaticParams` في تخطيط التطبيق الخاص بك.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // السطر الذي يجب إدراجه

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... بقية الكود */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // السطر الذي يجب إدراجه

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... بقية الكود */
};

// ... بقية الكود
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // السطر الذي يجب إدراجه

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... بقية الكود */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> يضمن `generateStaticParams` أن يقوم تطبيقك ببناء الصفحات اللازمة مسبقًا لجميع اللغات، مما يقلل من حسابات وقت التشغيل ويحسن تجربة المستخدم. لمزيد من التفاصيل، راجع [توثيق Next.js حول generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> يعمل Intlayer مع `export const dynamic = 'force-static';` لضمان بناء الصفحات مسبقًا لجميع اللغات.

### الخطوة 5: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "ابدأ بالتعديل",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
        ar: "ابدأ بالتعديل",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar",
        "ar": "ابدأ بالتعديل"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 6: استخدام المحتوى في كودك

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p> {/* المحتوى الرئيسي لبدء الاستخدام */}
      <code>{content.getStarted.pageLink}</code>{" "}
      {/* رابط الصفحة لبدء الاستخدام */}
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p> {/* // المحتوى الرئيسي للبدء */}
      <code>{content.getStarted.pageLink}</code> {/* // رابط الصفحة للبدء */}
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** يُستخدم لتوفير اللغة للمكونات على جانب العميل. يمكن وضعه في أي مكون أبوي، بما في ذلك التخطيط (layout). ومع ذلك، يُنصح بوضعه في التخطيط لأن Next.js يشارك كود التخطيط عبر الصفحات، مما يجعله أكثر كفاءة. باستخدام `IntlayerClientProvider` في التخطيط، تتجنب إعادة تهيئته لكل صفحة، مما يحسن الأداء ويحافظ على سياق تعريب متسق في جميع أنحاء تطبيقك.
- **`IntlayerServerProvider`** يُستخدم لتوفير اللغة لأطفال الخادم (server children). لا يمكن تعيينه في التخطيط.

  > لا يمكن للتخطيط والصفحة مشاركة سياق خادم مشترك لأن نظام سياق الخادم يعتمد على مخزن بيانات لكل طلب (عبر آلية [React's cache](https://react.dev/reference/react/cache))، مما يؤدي إلى إعادة إنشاء كل "سياق" لأجزاء مختلفة من التطبيق. وضع المزود في تخطيط مشترك سيكسر هذا العزل، مما يمنع الانتشار الصحيح لقيم سياق الخادم إلى مكونات الخادم الخاصة بك.

> لا يمكن للتخطيط والصفحة مشاركة سياق خادم مشترك لأن نظام سياق الخادم يعتمد على مخزن بيانات لكل طلب (عبر آلية [ذاكرة التخزين المؤقت لـ React](https://react.dev/reference/react/cache))، مما يؤدي إلى إعادة إنشاء كل "سياق" لأجزاء مختلفة من التطبيق. وضع المزود في تخطيط مشترك سيكسر هذا العزل، مما يمنع الانتشار الصحيح لقيم سياق الخادم إلى مكونات الخادم الخاصة بك.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> إذا كنت تريد استخدام المحتوى الخاص بك في خاصية من نوع `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useIntlayer.md).

### (اختياري) الخطوة 7: تكوين الوكيل لاكتشاف اللغة

قم بإعداد وكيل لاكتشاف اللغة المفضلة للمستخدم:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> يُستخدم `intlayerProxy` لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيهه إلى عنوان URL المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md). بالإضافة إلى ذلك، يتيح حفظ اللغة المفضلة للمستخدم في ملف تعريف الارتباط (كوكي).

> إذا كنت بحاجة إلى ربط عدة بروكسيات معًا (على سبيل المثال، `intlayerProxy` مع المصادقة أو بروكسيات مخصصة)، يوفر Intlayer الآن أداة مساعدة تسمى `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (اختياري) الخطوة 8: تدويل بيانات التعريف الخاصة بك

في حال رغبتك في تدويل بيانات التعريف الخاصة بك، مثل عنوان الصفحة، يمكنك استخدام دالة `generateMetadata` المقدمة من Next.js. بداخلها، يمكنك استرجاع المحتوى من دالة `getIntlayer` لترجمة بيانات التعريف الخاصة بك.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
      fr: "تم إنشاؤه بواسطة create next app",
      es: "تم إنشاؤه بواسطة create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "تم إنشاؤه بواسطة create next app",
      es: "تم إنشاؤه بواسطة create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "ar": "شعار Preact",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "ar": "تم إنشاؤه بواسطة create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
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
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... بقية الكود
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * ينشئ كائن يحتوي على جميع عناوين URL لكل لغة.
   *
   * مثال:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // يعيد
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... بقية الكود
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
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
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... بقية الكود
````

> لاحظ أن الدالة `getIntlayer` المستوردة من `next-intlayer` تُعيد المحتوى الخاص بك مغلفًا في `IntlayerNode`، مما يسمح بالتكامل مع المحرر البصري. بالمقابل، الدالة `getIntlayer` المستوردة من `intlayer` تُعيد المحتوى الخاص بك مباشرةً بدون خصائص إضافية.

بدلاً من ذلك، يمكنك استخدام دالة `getTranslation` لإعلان بيانات التعريف الخاصة بك. ومع ذلك، يُنصح باستخدام ملفات إعلان المحتوى لأتمتة ترجمة بيانات التعريف الخاصة بك وفصل المحتوى في مرحلة ما.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
بدلاً من ذلك، يمكنك استخدام دالة `getTranslation` لإعلان بيانات التعريف الخاصة بك. ومع ذلك، يُوصى باستخدام ملفات إعلان المحتوى لأتمتة ترجمة بيانات التعريف الخاصة بك وفصل المحتوى في مرحلة ما.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

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
  };
};

// ... بقية الكود
````

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... بقية الكود
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... بقية الكود
```

> تعرّف على المزيد حول تحسين بيانات التعريف [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (اختياري) الخطوة 9: تعريب ملف sitemap.xml و robots.txt الخاص بك

لتعريب ملفي `sitemap.xml` و `robots.txt`، يمكنك استخدام دالة `getMultilingualUrls` المقدمة من Intlayer. تتيح لك هذه الدالة إنشاء روابط متعددة اللغات لخريطة الموقع الخاصة بك.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

// خريطة الموقع مع روابط متعددة اللغات لكل صفحة
const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com") },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/login") },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/register") },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// دالة للحصول على جميع عناوين URL متعددة اللغات
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // السماح لجميع وكلاء المستخدم
    allow: ["/"], // السماح بالوصول إلى الصفحة الرئيسية
    disallow: getAllMultilingualUrls(["/login", "/register"]), // منع الوصول إلى صفحات تسجيل الدخول والتسجيل
  },
  host: "https://example.com", // المضيف الأساسي للموقع
  sitemap: `https://example.com/sitemap.xml`, // رابط خريطة الموقع
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

// دالة للحصول على جميع عناوين URL متعددة اللغات
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*", // السماح لجميع وكلاء المستخدم
    allow: ["/"], // السماح بالوصول إلى الصفحة الرئيسية
    disallow: getAllMultilingualUrls(["/login", "/register"]), // منع الوصول إلى صفحات تسجيل الدخول والتسجيل
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

// دالة للحصول على جميع الروابط متعددة اللغات
const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*", // السماح لجميع عناكب البحث
    allow: ["/"], // السماح بالوصول إلى الصفحة الرئيسية
    disallow: getAllMultilingualUrls(["/login", "/register"]), // منع الوصول إلى صفحات تسجيل الدخول والتسجيل بجميع اللغات
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> تعرّف على المزيد حول تحسين خريطة الموقع [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). تعرّف على المزيد حول تحسين ملف robots.txt [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (اختياري) الخطوة 10: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك في Next.js، الطريقة الموصى بها هي استخدام مكون `Link` لإعادة توجيه المستخدمين إلى الصفحة المحلية المناسبة. يتيح مكون `Link` التحميل المسبق للصفحة، مما يساعد على تجنب إعادة تحميل الصفحة بالكامل.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // سيضمن أن زر "العودة" في المتصفح يعيد التوجيه إلى الصفحة السابقة
          >
            <span>
              {/* اللغة المحلية - على سبيل المثال FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها المحلية - على سبيل المثال Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة المحلية الحالية - على سبيل المثال Francés مع تعيين اللغة المحلية الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // سيضمن أن زر "العودة" في المتصفح يعيد التوجيه إلى الصفحة السابقة
          >
            <span>
              {/* اللغة - على سبيل المثال FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها الخاصة - على سبيل المثال Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة في اللغة الحالية - على سبيل المثال Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // سيضمن أن زر "العودة" في المتصفح يعيد التوجيه إلى الصفحة السابقة
          >
            <span>
              {/* اللغة - على سبيل المثال FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة في لغتها الأصلية - على سبيل المثال Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة في اللغة الحالية - على سبيل المثال Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> طريقة بديلة هي استخدام دالة `setLocale` المقدمة من الخطاف `useLocale`. هذه الدالة لن تسمح بتحميل الصفحة مسبقًا. راجع [توثيق الخطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md) لمزيد من التفاصيل.

> يمكنك أيضًا تعيين دالة في خيار `onLocaleChange` لتشغيل دالة مخصصة عند تغيير اللغة.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... بقية الكود

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    التغيير إلى الفرنسية
  </button>
);
```

> مراجع التوثيق:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/ar/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (اختياري) الخطوة 11: إنشاء مكون رابط محلي

لضمان أن تنقل تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية إلى عناوين URL الداخلية، بحيث عندما ينقر المستخدم الناطق بالفرنسية على رابط إلى صفحة "حول"، يتم توجيهه إلى `/fr/about` بدلاً من `/about`.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL المترجمة محركات البحث على فهرسة الصفحات الخاصة بكل لغة بشكل صحيح وتوفر للمستخدمين محتوى بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط مترجم في جميع أنحاء تطبيقك، تضمن أن التنقل يبقى ضمن اللغة الحالية، مما يمنع التبديلات غير المتوقعة في اللغة.
- **قابلية الصيانة**: تركيز منطق الترجمة في مكون واحد يبسط إدارة عناوين URL، مما يجعل قاعدة الشيفرة الخاصة بك أسهل في الصيانة والتوسيع مع نمو تطبيقك.

فيما يلي تنفيذ لمكون `Link` محلي في TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * دالة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا كان عنوان URL يبدأ بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يقوم بتعديل خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى الرابط (مثلاً: /fr/about).
 * هذا يضمن أن التنقل يبقى ضمن نفس سياق اللغة.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على الرابط المحلي.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * دالة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يقوم بتكييف خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى عنوان URL (مثلاً /fr/about).
 * هذا يضمن بقاء التنقل ضمن نفس سياق اللغة.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على الرابط المحلي.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * دالة مساعدة للتحقق مما إذا كان الرابط المعطى خارجيًا.
 * إذا بدأ الرابط بـ http:// أو https://، يُعتبر خارجيًا.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * مكون Link مخصص يقوم بتكييف خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى عنوان URL (مثلاً: /fr/about).
 * هذا يضمن أن التنقل يبقى ضمن نفس سياق اللغة.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // إذا كانت الرابط داخلي وتم توفير href صالح، احصل على عنوان URL المحلي.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### كيف يعمل

- **كشف الروابط الخارجية**:
- **تحديد الروابط الخارجية**:  
  تقوم الدالة المساعدة `checkIsExternalLink` بتحديد ما إذا كان الرابط URL خارجيًا. تُترك الروابط الخارجية دون تغيير لأنها لا تحتاج إلى تعريب.

- **استرجاع اللغة الحالية**:  
  يوفر الخطاف `useLocale` اللغة الحالية (مثلًا `fr` للفرنسية).

- **تعريب الرابط**:  
  بالنسبة للروابط الداخلية (أي غير الخارجية)، يتم استخدام `getLocalizedUrl` لإضافة بادئة اللغة الحالية تلقائيًا إلى الرابط. هذا يعني أنه إذا كان المستخدم يستخدم اللغة الفرنسية، فإن تمرير `/about` كـ `href` سيُحوَّل إلى `/fr/about`.

- **إرجاع الرابط**:  
  يُرجع المكون عنصر `<a>` بالرابط المعرب، مما يضمن أن التنقل يتوافق مع اللغة الحالية.

من خلال دمج مكون `Link` هذا في تطبيقك، تحافظ على تجربة مستخدم متماسكة وواعية للغة، مع الاستفادة أيضًا من تحسين محركات البحث وسهولة الاستخدام.

### (اختياري) الخطوة 12: الحصول على اللغة الحالية في إجراءات الخادم

إذا كنت بحاجة إلى اللغة النشطة داخل إجراء خادم (مثلًا، لتوطين رسائل البريد الإلكتروني أو تنفيذ منطق يعتمد على اللغة)، استدعِ `getLocale` من `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // قم بشيء ما باستخدام اللغة
};
```

> تتبع دالة `getLocale` استراتيجية متدرجة لتحديد لغة المستخدم:
>
> 1. أولاً، يتحقق من رؤوس الطلب عن قيمة لغة قد تم تعيينها بواسطة البروكسي
> 2. إذا لم يتم العثور على لغة في الرؤوس، يبحث عن لغة مخزنة في الكوكيز
> 3. إذا لم يتم العثور على كوكيز، يحاول اكتشاف اللغة المفضلة للمستخدم من إعدادات المتصفح
> 4. كخيار أخير، يعود إلى اللغة الافتراضية المكونة في التطبيق
>
> هذا يضمن اختيار اللغة الأنسب بناءً على السياق المتاح.

### (اختياري) الخطوة 13: تحسين حجم الحزمة الخاصة بك

عند استخدام `next-intlayer`، يتم تضمين القواميس في الحزمة لكل صفحة بشكل افتراضي. لتحسين حجم الحزمة، يوفر Intlayer إضافة SWC اختيارية تستبدل بشكل ذكي استدعاءات `useIntlayer` باستخدام الماكروز. هذا يضمن تضمين القواميس فقط في الحزم الخاصة بالصفحات التي تستخدمها فعليًا.

لتمكين هذا التحسين، قم بتثبيت حزمة `@intlayer/swc`. بمجرد التثبيت، سيقوم `next-intlayer` بالكشف تلقائيًا عن الإضافة واستخدامها:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> ملاحظة: هذا التحسين متاح فقط لـ Next.js 13 وما فوق.

> ملاحظة: هذه الحزمة غير مثبتة بشكل افتراضي لأن ملحقات SWC لا تزال تجريبية في Next.js. قد يتغير هذا في المستقبل.

### مراقبة تغييرات القواميس على Turbopack

عند استخدام Turbopack كخادم تطوير مع أمر `next dev`، لن يتم اكتشاف تغييرات القواميس تلقائيًا بشكل افتراضي.

يحدث هذا القيد لأن Turbopack لا يمكنه تشغيل ملحقات webpack بالتوازي لمراقبة التغييرات في ملفات المحتوى الخاصة بك. للتغلب على هذا، ستحتاج إلى استخدام أمر `intlayer watch` لتشغيل كل من خادم التطوير ومراقب بناء Intlayer في نفس الوقت.

```json5 fileName="package.json"
{
  // ... تكوينات package.json الحالية الخاصة بك
  "scripts": {
    // ... تكوينات السكربتات الحالية الخاصة بك
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> إذا كنت تستخدم next-intlayer@<=6.x.x، تحتاج إلى الاحتفاظ بعلم `--turbopack` لجعل تطبيق Next.js 16 يعمل بشكل صحيح مع Turbopack. نوصي باستخدام next-intlayer@>=7.x.x لتجنب هذا القيد.

### تكوين TypeScript

يستخدم Intlayer تعزيز الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الكود الخاصة بك أقوى.

![الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ في الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

### التقدم أكثر

للتقدم أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

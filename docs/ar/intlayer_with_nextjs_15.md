# البدء في التدويل (i18n) باستخدام Intlayer و Next.js 15 App Router

## ما هو Intlayer؟

**Intlayer** هي مكتبة مبتكرة ومتاحة للمصدر المفتوح للتدويل (i18n) تهدف إلى تبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. يندمج Intlayer بسلاسة مع أحدث إطار عمل **Next.js 15**، بما في ذلك **App Router** القوي. إنه مُحسّن للعمل مع **Server Components** لأداء جيد ويعمل بشكل كامل مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تعبيرية على مستوى المكون.
- **تدويل البيانات الوصفية** والطرق والمحتوى بشكل ديناميكي.
- **الوصول إلى الترجمات في كل من المكونات ذات الجانب العميل والمكونات ذات الجانب الخادم**.
- **ضمان دعم TypeScript** مع الأنواع التي تُنشأ تلقائيًا، مما يحسن من الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف اللغة الديناميكي والتبديل.

> Intlayer متوافق مع Next.js 12 و 13 و 14 و 15. إذا كنت تستخدم Next.js Page Router، يمكنك الرجوع إلى هذه [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_page_router.md). لمستخدمي Next.js 12 و 13 و 14 مع App Router، يرجى الرجوع إلى هذه [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

### الخطوة 1: تثبيت التبعيات

تثبيت الحزم اللازمة باستخدام npm:

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين والترجمة و [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md) وعمليات التحويل و [أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **next-intlayer**

  الحزمة التي تدمج Intlayer مع Next.js. توفر موفري السياق والهوكات لتدويل Next.js. بالإضافة إلى ذلك، تتضمن مكون Next.js الإضافي لتكامل Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى الواجهة الوسيطة لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

إنشاء ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // اللغات الأخرى لديك
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
      // اللغات الأخرى لديك
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
      // اللغات الأخرى لديك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، وإعادة توجيه واجهة الوسيط، وأسماء ملفات تعريف الارتباط، ومكان وإمتداد إعلانات المحتوى، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، يُرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في إعداد Next.js الخاص بك

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> يتم استخدام مكون إضافي `withIntlayer()` من Next.js لدمج Intlayer مع Next.js. وهو يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يقوم بتعريف متغيرات بيئة Intlayer داخل [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) بيئات. بالإضافة إلى ذلك، فإنه يوفر مرادفات لتحسين الأداء وضمان التوافق مع مكونات الخادم.

### الخطوة 4: تكوين الواجهة الوسيطة لاكتشاف اللغة

إعداد الواجهة الوسيطة لاكتشاف اللغة المفضلة للمستخدم:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> يتم استخدام `intlayerMiddleware` لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيههم إلى عنوان URL المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md). بالإضافة إلى ذلك، فإنه يتيح حفظ اللغة المفضلة للمستخدم في ملف تعريف الارتباط.

### الخطوة 5: تعريف طرق اللغات الديناميكية

قم بإزالة كل شيء من `RootLayout` واستبداله بالكود التالي:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => children;

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => children;

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> الاحتفاظ بمكون `RootLayout` فارغًا يتيح لك تعيين صفات [`lang`](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/lang) و [`dir`](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/dir) لعلامة `<html>`.

لتنفيذ التوجيه الديناميكي، قدم المسار للغة بإضافة تخطيط جديد في دليل `[locale]` الخاص بك:

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

> يتم استخدام جزء مسار `[locale]` لتعريف اللغة. مثال: `/en-US/about` ستشير إلى `en-US` و `/fr/about` إلى `fr`.

ثم، نفّذ دالة `generateStaticParams` في تخطيط تطبيقك.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // خط لإدراجه

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... بقية الكود*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // خط لإدراجه

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... بقية الكود*/
};

// ... بقية الكود
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // خط لإدراجه

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... بقية الكود*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> يضمن `generateStaticParams` أن تطبيقك يبني مسبقًا الصفحات اللازمة لجميع اللغات، مما يقلل من حساب وقت التشغيل ويحسن تجربة المستخدم. للحصول على مزيد من التفاصيل، يرجى الرجوع إلى [وثائق Next.js حول generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### الخطوة 6: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات محتواك لتخزين الترجمات:

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
        en: "Get started by editing",
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
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما أنها مضمنة في دليل `contentDir` (بشكل افتراضي، `./src`). و تتوافق مع امتداد ملف إعلان المحتوى (بشكل افتراضي، `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> للحصول على مزيد من التفاصيل، يرجى الرجوع إلى [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

### الخطوة 7: استخدام المحتوى في الكود الخاص بك

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
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
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />

        <IntlayerClientProvider locale={locale}>
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ locale }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** تُستخدم لتوفير اللغة إلى مكونات جانب العميل. يمكن وضعها في أي مكون أبوي، بما في ذلك التخطيط. ومع ذلك، يُوصى بوضعها في التخطيط لأن Next.js يشارك شفرة التخطيط عبر الصفحات، مما يجعلها أكثر كفاءة. باستخدام `IntlayerClientProvider` في التخطيط، يمكنك تجنب إعادة تهيئتها لكل صفحة، مما يحسن الأداء ويحافظ على سياق محلي متسق في تطبيقك.
- **`IntlayerServerProvider`** تُستخدم لتوفير اللغة للأطفال في الخادم. لا يمكن تعيينها في التخطيط.

> لا يمكن للتخطيط والصفحة مشاركة سياق خادم مشترك لأن نظام سياق الخادم يعتمد على متجر بيانات لكل طلب (عبر [ذاكرة التخزين المؤقت لـ React](https://react.dev/reference/react/cache) آلية)، مما يتسبب في إعادة إنشاء كل "سياق" لقطاعات مختلفة من التطبيق. سيؤدي وضع الموفر في تخطيط مشترك إلى كسر هذه العزلة، مما يمنع النشر الصحيح لقيم سياق الخادم إلى مكونات الخادم الخاصة بك.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // إنشاء إعلان محتوى خاص

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // إنشاء إعلان محتوى خاص

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // إنشاء إعلان محتوى خاص

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان محتوى خاص

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان محتوى خاص

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان محتوى خاص

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> إذا كنت ترغب في استخدام المحتوى الخاص بك في خاصية `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد حول هوك `useIntlayer`، يرجى الرجوع إلى [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayer.md).

### (اختياري) الخطوة 8: تدويل البيانات الوصفية الخاصة بك

في حالة رغبتك في تدويل بياناتك الوصفية، مثل عنوان صفحتك، يمكنك استخدام دالة `generateMetadata` التي توفرها Next.js. داخل الدالة، استخدم دالة `getTranslation` لترجمة بياناتك الوصفية.

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params: { locale },
}: LocalPromiseParams): Metadata => {
  const { locale } = await params;

  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... بقية الكود
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... بقية الكود
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

module.exports.generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
    alternates: {
      canonical: "/",
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... بقية الكود
````

> لمعرفة المزيد حول تحسين البيانات الوصفية [على الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (اختياري) الخطوة 9: تدويل sitemap.xml و robots.txt

لتدويل ملفاتك `sitemap.xml` و `robots.txt`، يمكنك استخدام دالة `getMultilingualUrls` التي توفرها Intlayer. هذه الدالة تتيح لك إنشاء URLs متعددة اللغات لخرائط موقعك.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
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

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
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

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
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

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> لمعرفة المزيد حول تحسين خريطة الموقع، يمكنك الاطلاع على [الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). لمعرفة المزيد عن تحسين robots.txt، يمكنك الاطلاع على [الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (اختياري) الخطوة 10: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` التي يوفرها هوك `useLocale`. هذه الدالة تتيح لك تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة بلهجتها الخاصة - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللهجة الحالية - مثال: Francés مع تعيين اللهجة الحالية على Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثال: الفرنسية */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة بلهجتها الخاصة - مثال: FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة بلهجتها الخاصة - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللهجة الحالية - مثال: Francés مع تعيين اللهجة الحالية على Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثال: الفرنسية */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة بلهجتها الخاصة - مثال: FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
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
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة بلهجتها الخاصة - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللهجة الحالية - مثال: Francés مع تعيين اللهجة الحالية على Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثال: الفرنسية */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة بلهجتها الخاصة - مثال: FR */}
              {localeItem}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> مراجع الوثائق:
>
> - [`هوك useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useLocale.md)
> - [`هوك getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)
> - [`هوك getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [`هوك getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`خاصية hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`خاصية lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`خاصية dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`خاصية aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### تكوين TypeScript

يستخدم Intlayer زيادة في الوحدة للاستفادة من TypeScript وتعزيز قاعدة الكود الخاصة بك.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المُنشأة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الموجودة لديك
  "include": [
    // ... تكوينات TypeScript الموجودة لديك
    "types", // تضمين الأنواع التلقائية الإنشاء
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات المُنتجة بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات المُنتجة بواسطة Intlayer
.intlayer
```

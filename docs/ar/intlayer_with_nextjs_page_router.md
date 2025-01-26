# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## What is Intlayer?

**Intlayer** هي مكتبة مفتوحة المصدر مبتكرة لدعم التدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. يندمج Intlayer بسلاسة مع إطار **Next.js** الأحدث، بما في ذلك **Page Router** التقليدي.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تعبيرية على مستوى المكونات.
- **محليّة البيانات الوصفية، والمسارات، والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن من الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل كشف وإجراء التبديل الديناميكي للغات.

> Intlayer متوافق مع Next.js 12 و13 و14 و15. إذا كنت تستخدم Next.js App Router، يُرجى الرجوع إلى [دليل App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md). بالنسبة لـ Next.js 15، اتبع هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application Using Page Router

### Step 1: Install Dependencies

قم بتثبيت الحزم اللازمة باستخدام إدارة الحزم المفضلة لديك:

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلانات المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md)، والتحويل، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **next-intlayer**

  الحزمة التي تدمج Intlayer مع Next.js. توفر موفري السياق والهوك للتدويل في Next.js. بالإضافة إلى ذلك، تشمل مكون Next.js الإضافي لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى الميدل وير للكشف عن لغة المستخدم المفضلة، وإدارة الكوكيز، ومعالجة إعادة توجيه URL.

### Step 2: Configure Your Project

قم بإنشاء ملف تكوين لتعريف اللغات المدعومة من قبل التطبيق الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // أضف لغاتك الأخرى هنا
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
      // أضف لغاتك الأخرى هنا
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
      // أضف لغاتك الأخرى هنا
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد URLs محلية، وتحويلات في الميدل وير، وأسماء الكوكيز، ومكان وتوسيع إعلانات المحتوى الخاص بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، يُرجى الرجوع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### Step 3: Integrate Intlayer with Next.js Configuration

قم بتعديل تكوين Next.js الخاص بك لدمج Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // تكوين Next.js الحالي الخاص بك
};

export default withIntlayer(nextConfig);
```

> يتم استخدام مكون الإضافات `withIntlayer()` لدمج Intlayer مع Next.js. يضمن بناء ملفات إعلانات المحتوى ومراقبتها في وضع التطوير. يقوم بتعريف متغيرات بيئة Intlayer ضمن بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء وضمان التوافق مع مكونات الخادم.

### Step 4: Configure Middleware for Locale Detection

قم بإعداد الميدل وير للكشف تلقائيًا عن لغة المستخدم المفضلة ومعالجتها:

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

> قم بتكييف معلمة `matcher` لمطابقة طرق تطبيقك. لمزيد من التفاصيل، يُرجى الرجوع إلى [وثائق Next.js حول تكوين matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Step 5: Define Dynamic Locale Routes

قم بتنفيذ توجيه ديناميكي لخدمة المحتوى المحلي بناءً على لغة المستخدم.

1.  **إنشاء صفحات محددة للغة:**

    أعد تسمية ملف الصفحة الرئيسية الخاص بك لتضمين جزء ديناميكي `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **تحديث `_app.tsx` لمعالجة التوطين:**

    قم بتعديل `_app.tsx` لتضمين مزودي Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **إعداد `getStaticPaths` و `getStaticProps`:**

    في `[locale]/index.tsx`، عرّف المسارات والخصائص للتعامل مع لغات مختلفة.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* محتواك هنا */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* محتواك هنا */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* محتواك هنا */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> تضمن `getStaticPaths` و `getStaticProps` أن يسبق تطبيقك بناء الصفحات الضرورية لجميع اللغات في توجيه Page Router في Next.js. تقلل هذه الطريقة من حسابات وقت التشغيل وتؤدي إلى تحسين تجربة المستخدم. لمزيد من التفاصيل، يُرجى الرجوع إلى وثائق Next.js حول [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) و [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Step 6: Declare Your Content

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
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

للمزيد من المعلومات حول إعلان المحتوى، يُرجى الرجوع إلى [دليل إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### Step 7: Utilize Content in Your Code

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء التطبيق لعرض المحتوى المترجم.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* مكونات إضافية */}
    </div>
  );
};

// ... بقية الكود، بما في ذلك getStaticPaths و getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* مكونات إضافية */}
    </div>
  );
};

// ... بقية الكود، بما في ذلك getStaticPaths و getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* مكونات إضافية */}
    </div>
  );
};

// ... بقية الكود، بما في ذلك getStaticPaths و getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // تأكد من وجود إعلان محتوى مطابق

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // تأكد من وجود إعلان محتوى مطابق

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // تأكد من وجود إعلان محتوى مطابق

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> عند استخدام الترجمات في سمات `string` (مثل `alt` و `title` و `href` و `aria-label`)، استدعِ
> قيمة الدالة كما يلي:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد عن هوك `useIntlayer`، يُرجى الرجوع إلى [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayer.md).

### (Optional) Step 8: Internationalize Your Metadata

لتدويل البيانات الوصفية مثل عناوين الصفحات والأوصاف، استخدم دالة `getStaticProps` بالتعاون مع دالة `getTranslationContent` الخاصة بـ Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // يمكن استخدام البيانات الوصفية في الرأس أو مكونات أخرى حسب الحاجة
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* محتوى إضافي */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... بقية الكود بما في ذلك getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // يمكن استخدام البيانات الوصفية في الرأس أو مكونات أخرى حسب الحاجة
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* محتوى إضافي */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... بقية الكود بما في ذلك getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslationContent, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // يمكن استخدام البيانات الوصفية في الرأس أو مكونات أخرى حسب الحاجة
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* محتوى إضافي */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... بقية الكود بما في ذلك getStaticPaths
```

### (Optional) Step 9: Change the Language of Your Content

للسماح للمستخدمين بتغيير اللغات ديناميكيًا، استخدم دالة `setLocale` التي توفرها هوك `useLocale`.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة بنفس اللغة - مثل Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل Francés عندما تكون اللغة الحالية هي Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة بنفس اللغة - مثل FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة بنفس اللغة - مثل Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل Francés عندما تكون اللغة الحالية هي Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة بنفس اللغة - مثل FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة بنفس اللغة - مثل Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل Francés عندما تكون اللغة الحالية هي Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة بنفس اللغة - مثل FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> واجهة برمجة التطبيقات `useLocalePageRouter` هي نفسها مثل `useLocale`. لمعرفة المزيد حول هوك `useLocale`، يُرجى الرجوع إلى [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useLocale.md).

> مراجع الوثائق:
>
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **مثال على فوائد TypeScript:**

   ![مثال على الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![مثال على خطأ في الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git Configuration

للحفاظ على نظافة مستودعك وتجنب الالتزام بالملفات التي تم إنشاؤها بواسطة Intlayer، يُوصى بتجاهل الملفات التي أنشأها Intlayer.

أضف الأسطر التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

## Additional Resources

- **وثائق Intlayer:** [مستودع GitHub](https://github.com/aymericzip/intlayer)
- **دليل إعلان المحتوى:** [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md)
- **وثائق التكوين:** [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md)

من خلال اتباع هذا الدليل، يمكنك دمج Intlayer بشكل فعال في تطبيق Next.js الخاص بك باستخدام Page Router، مما يتيح دعم ممتاز ومرن للتدويل لمشاريع الويب الخاصة بك.

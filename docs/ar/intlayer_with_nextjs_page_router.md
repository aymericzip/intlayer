# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## ما هو Intlayer؟

**Intlayer** هو مكتبة مفتوحة المصدر مبتكرة لتدويل التطبيقات (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. يتكامل Intlayer بسلاسة مع أحدث إطار عمل **Next.js**، بما في ذلك **Page Router** التقليدي.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **توطين البيانات الوصفية، والمسارات، والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف اللغة الديناميكي والتبديل.

> Intlayer متوافق مع Next.js 12، 13، 14، و15. إذا كنت تستخدم Next.js App Router، راجع [دليل App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_14.md). بالنسبة لـ Next.js 15، اتبع هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js باستخدام Page Router

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **next-intlayer**

  الحزمة التي تدمج Intlayer مع Next.js. توفر مزودي السياق وخطافات لتدويل Next.js. بالإضافة إلى ذلك، تتضمن مكونًا إضافيًا لـ Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى الوسيطات لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتحديد اللغات المدعومة من قبل تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // أضف اللغات الأخرى هنا
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
      // أضف اللغات الأخرى هنا
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
      // أضف اللغات الأخرى هنا
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، وإعادة توجيه الوسيطات، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer مع تكوين Next.js

قم بتعديل تكوين Next.js الخاص بك لدمج Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // تكوين Next.js الحالي الخاص بك
};

export default withIntlayer(nextConfig);
```

> يتم استخدام المكون الإضافي `withIntlayer()` لـ Next.js لدمج Intlayer مع Next.js. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء ويضمن التوافق مع مكونات الخادم.

### الخطوة 4: تكوين الوسيطات لاكتشاف اللغة

قم بإعداد الوسيطات لاكتشاف اللغة المفضلة للمستخدم والتعامل معها تلقائيًا:

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

> قم بتكييف معلمة `matcher` لتطابق مسارات تطبيقك. لمزيد من التفاصيل، راجع [وثائق Next.js حول تكوين matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### الخطوة 5: تعريف مسارات اللغة الديناميكية

قم بتنفيذ التوجيه الديناميكي لتقديم المحتوى المحلي بناءً على لغة المستخدم.

1.  **إنشاء صفحات خاصة باللغة:**

    أعد تسمية ملف الصفحة الرئيسي الخاص بك ليشمل الجزء الديناميكي `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **تحديث `_app.tsx` للتعامل مع التوطين:**

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

    في `[locale]/index.tsx`، قم بتعريف المسارات والخصائص للتعامل مع اللغات المختلفة.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* المحتوى الخاص بك هنا */}</div>;

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

    const HomePage = () => <div>{/* المحتوى الخاص بك هنا */}</div>;

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

    const HomePage = () => <div>{/* المحتوى الخاص بك هنا */}</div>;

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

> `getStaticPaths` و `getStaticProps` يضمنان أن تطبيقك يقوم ببناء الصفحات الضرورية مسبقًا لجميع اللغات في Next.js Page Router. هذا النهج يقلل من الحساب أثناء وقت التشغيل ويؤدي إلى تحسين تجربة المستخدم. لمزيد من التفاصيل، راجع وثائق Next.js حول [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) و [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### الخطوة 6: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
      ar: "مرحبًا بك في موقعي الإلكتروني",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
      ar: "ابدأ بتحرير هذه الصفحة.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
        ar: "ابدأ بتحرير هذه الصفحة.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
        ar: "ابدأ بتحرير هذه الصفحة.",
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
        "es": "Comience por editar esta página.",
        "ar": "ابدأ بتحرير هذه الصفحة."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "ar": "src/app/page.tsx"
      }
    }
  }
}
```

لمزيد من المعلومات حول إعلان المحتوى، راجع [دليل إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

### الخطوة 7: استخدام المحتوى في الكود الخاص بك

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء التطبيق الخاص بك لعرض المحتوى المترجم.

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

> عند استخدام الترجمات في سمات `string` (مثل `alt`، `title`، `href`، `aria-label`)، قم باستدعاء

> قيمة الوظيفة كما يلي:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد حول الخطاف `useIntlayer`، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useIntlayer.md).

### (اختياري) الخطوة 8: تدويل البيانات الوصفية الخاصة بك

لتدويل البيانات الوصفية مثل عناوين الصفحات والأوصاف، استخدم وظيفة `getStaticProps` بالاقتران مع وظيفة `getTranslation` الخاصة بـ Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // يمكن استخدام البيانات الوصفية في الرأس أو المكونات الأخرى حسب الحاجة
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

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
      ar: "موقعي الإلكتروني",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
      ar: "مرحبًا بك في موقعي الإلكتروني.",
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
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";



const HomePage = ({ metadata }) => {
  // يمكن استخدام البيانات الوصفية في الرأس أو المكونات الأخرى حسب الحاجة
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
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
      ar: "موقعي الإلكتروني",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
      ar: "مرحبًا بك في موقعي الإلكتروني.",
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
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");


const HomePage = ({ metadata }) => {
  // يمكن استخدام البيانات الوصفية في الرأس أو المكونات الأخرى حسب الحاجة
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
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
      ar: "موقعي الإلكتروني",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
      ar: "مرحبًا بك في موقعي الإلكتروني.",
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

### (اختياري) الخطوة 9: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك في Next.js، الطريقة الموصى بها هي استخدام مكون `Link` لإعادة توجيه المستخدمين إلى الصفحة المحلية المناسبة. يتيح مكون `Link` جلب الصفحة مسبقًا، مما يساعد على تجنب إعادة تحميل الصفحة بالكامل.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
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
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
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
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
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
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        </option>
      ))}
    </select>
  );
};
```

> واجهة برمجة التطبيقات `useLocalePageRouter` هي نفسها `useLocale`. لمعرفة المزيد حول الخطاف `useLocale`، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/next-intlayer/useLocale.md).

> مراجع الوثائق:
>
> - [خطاف `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)
> - [خطاف `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [خطاف `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [سمة `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ar)
> - [سمة `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [سمة `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [سمة `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (اختياري) الخطوة 10: إنشاء مكون رابط محلي

لضمان أن التنقل في تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة لعناوين URL الداخلية باللغة الحالية، بحيث يتم توجيه المستخدم الفرنسي، على سبيل المثال، إلى `/fr/about` بدلاً من `/about`.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL المحلية محركات البحث على فهرسة الصفحات الخاصة باللغة بشكل صحيح وتوفير محتوى للمستخدمين بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط محلي في جميع أنحاء تطبيقك، تضمن أن التنقل يظل ضمن اللغة الحالية، مما يمنع التبديل غير المتوقع للغة.
- **قابلية الصيانة**: يؤدي مركزية منطق التوطين في مكون واحد إلى تبسيط إدارة عناوين URL، مما يجعل قاعدة التعليمات البرمجية الخاصة بك أسهل في الصيانة والتوسيع مع نمو تطبيقك.

فيما يلي تنفيذ مكون `Link` محلي في TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * وظيفة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا كان عنوان URL يبدأ بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يتكيف مع السمة href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة لعناوين URL باللغة (على سبيل المثال، /fr/about).
 * يضمن ذلك أن التنقل يظل ضمن سياق اللغة نفسه.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على عنوان URL المحلي.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * وظيفة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا كان عنوان URL يبدأ بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * مكون رابط مخصص يتكيف مع السمة href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة لعناوين URL باللغة (على سبيل المثال، /fr/about).
 * يضمن ذلك أن التنقل يظل ضمن سياق اللغة نفسه.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على عنوان URL المحلي.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * وظيفة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا كان عنوان URL يبدأ بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على عنوان URL المحلي.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### كيف يعمل

- **اكتشاف الروابط الخارجية**:  
  تحدد وظيفة المساعدة `checkIsExternalLink` ما إذا كان عنوان URL خارجيًا. تُترك الروابط الخارجية دون تغيير لأنها لا تحتاج إلى توطين.

- **استرداد اللغة الحالية**:  
  يوفر الخطاف `useLocale` اللغة الحالية (على سبيل المثال، `fr` للفرنسية).

- **توطين عنوان URL**:  
  بالنسبة للروابط الداخلية (أي غير الخارجية)، يتم استخدام `getLocalizedUrl` لإضافة بادئة تلقائيًا لعنوان URL باللغة الحالية. هذا يعني أنه إذا كان المستخدم باللغة الفرنسية، فإن تمرير `/about` كـ `href` سيحولها إلى `/fr/about`.

- **إرجاع الرابط**:  
  يقوم المكون بإرجاع عنصر `<a>` مع عنوان URL المحلي، مما يضمن أن التنقل يتماشى مع اللغة.

من خلال دمج هذا المكون `Link` في جميع أنحاء تطبيقك، تحافظ على تجربة مستخدم متماسكة وواعية باللغة مع الاستفادة أيضًا من تحسين محركات البحث وقابلية الاستخدام المحسنة.

### (اختياري) الخطوة 11: تحسين حجم الحزمة

`next-intlayer` का उपयोग करते समय, डिफ़ॉल्ट रूप से प्रत्येक पृष्ठ के लिए शब्दकोश बंडल में शामिल होते हैं। बंडल आकार को अनुकूलित करने के लिए, Intlayer एक वैकल्पिक SWC प्लगइन प्रदान करता है जो मैक्रोज़ का उपयोग करके `useIntlayer` कॉल को बुद्धिमानी से बदलता है। यह सुनिश्चित करता है कि शब्दकोश केवल उन पृष्ठों के बंडल में शामिल हों जो वास्तव में उनका उपयोग करते हैं।

इस अनुकूलन को सक्षम करने के लिए, `@intlayer/swc` पैकेज इंस्टॉल करें। एक बार इंस्टॉल हो जाने पर, `next-intlayer` स्वचालित रूप से प्लगइन का पता लगाएगा और उसका उपयोग करेगा:

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

> ملاحظة: لم يتم تثبيت هذه الحزمة افتراضيًا لأن مكونات SWC لا تزال تجريبية على Next.js. قد يتغير ذلك في المستقبل.

### تكوين TypeScript

يستخدم Intlayer توسيع الوحدات للحصول على فوائد TypeScript وجعل قاعدة التعليمات البرمجية الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

للحفاظ على نظافة مستودعك وتجنب الالتزام بالملفات المولدة، يُوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer.

أضف الأسطر التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

## موارد إضافية

- **وثائق Intlayer:** [مستودع GitHub](https://github.com/aymericzip/intlayer)
- **دليل القاموس:** [القاموس](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)
- **وثائق التكوين:** [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md)

باتباع هذا الدليل، يمكنك دمج Intlayer بشكل فعال في تطبيق Next.js الخاص بك باستخدام Page Router، مما يتيح دعم التدويل القوي والقابل للتطوير لمشاريع الويب الخاصة بك.

### الذهاب أبعد

للمضي قدمًا، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) أو نقل المحتوى الخاص بك باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md).

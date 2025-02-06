# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## What is Intlayer?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다. Intlayer는 최신 **Next.js** 프레임워크와 원활하게 통합되며 그 전통적인 **Page Router**를 포함합니다.

Intlayer를 사용하면:

- **구성 요소 수준에서 선언적 사전을 사용하여** 번역을 쉽게 관리할 수 있습니다.
- **메타데이터, 경로 및 콘텐츠를 동적으로 지역화할** 수 있습니다.
- **자동 생성된 타입을 통해 TypeScript 지원을 보장하여** 자동 완성과 오류 검출을 개선합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능의 이점을 누릴 수 있습니다.

> Intlayer는 Next.js 12, 13, 14 및 15와 호환됩니다. Next.js App Router를 사용하는 경우 [App Router 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)를 확인하세요. Next.js 15의 경우 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 따라 주세요.

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application Using Page Router

### Step 1: Install Dependencies

필요한 패키지를 선호하는 패키지 관리자를 사용하여 설치합니다:

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

  구성 관리, 번역, [내용 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md), 변환 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)와 같은 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

  Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화를 위한 컨텍스트 프로바이더와 후크를 제공합니다. 또한, Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)와 통합하기 위한 Next.js 플러그인 외에도 사용자의 선호 로케일을 감지하고, 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어를 포함합니다.

### Step 2: Configure Your Project

어플리케이션이 지원하는 언어를 정의하는 구성 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 여기에 다른 로케일을 추가하세요
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
      // 여기에 다른 로케일을 추가하세요
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
      // 여기에 다른 로케일을 추가하세요
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장, Intlayer 로그를 콘솔에서 비활성화하는 등의 설정을 할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### Step 3: Integrate Intlayer with Next.js Configuration

Intlayer를 통합하기 위해 Next.js 구성을 수정합니다:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존의 Next.js 구성
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Intlayer를 Next.js와 통합하는 데 사용됩니다. 내용 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 또한, 성능을 최적화하고 서버 구성 요소와의 호환성을 보장하기 위한 별칭을 제공합니다.

### Step 4: Configure Middleware for Locale Detection

사용자의 선호 로케일을 자동으로 감지하고 처리하는 미들웨어를 설정합니다:

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

> `matcher` 매개변수를 조정하여 어플리케이션의 경로에 맞춰 조정하세요. 더 많은 정보는 [Next.js 문서에서 matcher 구성하기](https://nextjs.org/docs/app/building-your-application/routing/middleware)를 참조하세요.

### Step 5: Define Dynamic Locale Routes

사용자의 로케일에 따라 지역화된 콘텐츠를 제공하기 위해 동적 라우팅을 구현합니다.

1. **로케일별 페이지 생성:**

   기본 페이지 파일의 이름을 `[locale]` 동적 세그먼트를 포함하도록 변경합니다.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **로케일 처리를 위한 `_app.tsx` 업데이트:**

   Intlayer 프로바이더를 포함하도록 `_app.tsx`를 수정합니다.

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

3. **`getStaticPaths` 및 `getStaticProps` 설정:**

   `[locale]/index.tsx`에서 다양한 로케일을 처리하기 위해 경로와 속성을 정의합니다.

   ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
   import type { FC } from "react";
   import type { GetStaticPaths, GetStaticProps } from "next";
   import { type Locales, getConfiguration } from "intlayer";

   const HomePage: FC = () => <div>{/* 여기에 콘텐츠 */}</div>;

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

   const HomePage = () => <div>{/* 여기에 콘텐츠 */}</div>;

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

   const HomePage = () => <div>{/* 여기에 콘텐츠 */}</div>;

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

> `getStaticPaths`와 `getStaticProps`는 Next.js Page Router에서 모든 로케일에 대한 필요한 페이지를 미리 빌드할 수 있도록 보장합니다. 이 방법은 런타임 계산을 줄이고 사용자 경험을 개선합니다. 자세한 내용은 [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) 및 [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) 관련 Next.js 문서를 참조하세요.

### Step 6: Declare Your Content

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다.

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
} satisfies Dictionary;

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

자세한 내용은 [내용 선언 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)를 참조하세요.

### Step 7: Utilize Content in Your Code

어플리케이션 전반에 걸쳐 콘텐츠 사전을 액세스하여 번역된 콘텐츠를 표시합니다.

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
      {/* 추가 구성 요소 */}
    </div>
  );
};

// ... 나머지 코드, getStaticPaths와 getStaticProps 포함
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
      {/* 추가 구성 요소 */}
    </div>
  );
};

// ... 나머지 코드, getStaticPaths와 getStaticProps 포함
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
      {/* 추가 구성 요소 */}
    </div>
  );
};

// ... 나머지 코드, getStaticPaths와 getStaticProps 포함
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // 해당 콘텐츠 선언이 있는지 확인하세요

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
  const content = useIntlayer("component-example"); // 해당 콘텐츠 선언이 있는지 확인하세요

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
  const content = useIntlayer("component-example"); // 해당 콘텐츠 선언이 있는지 확인하세요

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `string` 속성(예: `alt`, `title`, `href`, `aria-label`)에서 번역을 사용할 때, 다음과 같이 함수의 값을 호출하세요:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` 후크에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useIntlayer.md)를 참고하세요.

### (Optional) Step 8: Internationalize Your Metadata

페이지 제목 및 설명과 같은 메타데이터를 국제화하기 위해 Intlayer의 `getTranslationContent` 함수와 함께 `getStaticProps` 기능을 사용하세요.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // 메타데이터는 필요에 따라 head 또는 다른 구성 요소에서 사용될 수 있습니다
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* 추가 콘텐츠 */}
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

// ... 나머지 코드 including getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // 메타데이터는 필요에 따라 head 또는 다른 구성 요소에서 사용될 수 있습니다
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* 추가 콘텐츠 */}
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

// ... 나머지 코드 including getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslationContent, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // 메타데이터는 필요에 따라 head 또는 다른 구성 요소에서 사용될 수 있습니다
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* 추가 콘텐츠 */}
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

// ... 나머지 코드 including getStaticPaths
```

### (Optional) Step 9: Change the Language of Your Content

사용자가 언어를 동적으로 전환할 수 있도록 `useLocale` 후크가 제공하는 `setLocale` 함수를 사용하세요.

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
              {/* 자신의 로케일로 언어 표시 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 언어 표시 - 예: Francés, 현재 로케일이 Locales.SPANISH로 설정됨 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 언어 표시 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 자신의 로케일로 언어 표시 - 예: FR */}
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
              {/* 자신의 로케일로 언어 표시 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 언어 표시 - 예: Francés, 현재 로케일이 Locales.SPANISH로 설정됨 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 언어 표시 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 자신의 로케일로 언어 표시 - 예: FR */}
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
              {/* 자신의 로케일로 언어 표시 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 언어 표시 - 예: Francés, 현재 로케일이 Locales.SPANISH로 설정됨 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 언어 표시 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 자신의 로케일로 언어 표시 - 예: FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> `useLocalePageRouter` API는 `useLocale`와 동일합니다. `useLocale` 후크에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useLocale.md)를 참조하세요.

> 문서 참조:
>
> - [`getLocaleName` 후크](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 후크](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 후크](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **TypeScript의 이점 예시:**

   ![자동 완성 예시](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![번역 오류 예시](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git Configuration

리포지토리를 깨끗하게 유지하고 Intlayer에 의해 생성된 파일을 커밋하지 않도록 하려면, 이러한 파일을 무시하는 것이 좋습니다.

`.gitignore` 파일에 다음 줄을 추가합니다:

```plaintext fileName=".gitignore"
# Intlayer에 의해 생성된 파일 무시
.intlayer
```

## Additional Resources

- **Intlayer Documentation:** [GitHub Repository](https://github.com/aymericzip/intlayer)
- **Dictionary Guide:** [Dictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)
- **Configuration Documentation:** [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)

이 가이드를 따라서 Next.js 애플리케이션에 Intlayer를 효과적으로 통합하고, 웹 프로젝트에 강력하고 확장 가능한 국제화 지원을 가능하게 할 수 있습니다.

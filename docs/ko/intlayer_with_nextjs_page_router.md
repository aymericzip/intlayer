# Intlayer 및 Next.js를 사용하여 페이지 라우터로 국제화(i18n) 시작하기

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다. Intlayer는 최신 **Next.js** 프레임워크와 원활하게 통합되며, 전통적인 **페이지 라우터**도 지원합니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**합니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 지역화**합니다.
- **자동 생성된 타입을 통해 TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선합니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능**을 활용합니다.

> Intlayer는 Next.js 12, 13, 14, 15와 호환됩니다. Next.js 앱 라우터를 사용하는 경우 [앱 라우터 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)를 참조하세요. Next.js 15의 경우 [이 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 따르세요.

---

## 페이지 라우터를 사용하는 Next.js 애플리케이션에 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

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

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **next-intlayer**

  Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화를 위한 컨텍스트 제공자 및 훅을 제공합니다. 또한 Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션에서 지원하는 언어를 정의하는 구성 파일을 생성하세요:

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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### 3단계: Next.js 구성에 Intlayer 통합

Next.js 구성을 수정하여 Intlayer를 통합하세요:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 Next.js 구성
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Intlayer를 Next.js와 통합하는 데 사용됩니다. 이는 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 성능 최적화를 위한 별칭을 제공하고 서버 컴포넌트와의 호환성을 보장합니다.

### 4단계: 로케일 감지를 위한 미들웨어 구성

사용자의 선호 로케일을 자동으로 감지하고 처리하기 위해 미들웨어를 설정하세요:

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

> `matcher` 매개변수를 애플리케이션의 라우트에 맞게 조정하세요. 자세한 내용은 [Next.js 문서의 matcher 구성](https://nextjs.org/docs/app/building-your-application/routing/middleware)을 참조하세요.

### 5단계: 동적 로케일 라우트 정의

사용자의 로케일에 따라 로컬라이즈된 콘텐츠를 제공하기 위해 동적 라우팅을 구현하세요.

1.  **로케일별 페이지 생성:**

    메인 페이지 파일 이름을 `[locale]` 동적 세그먼트를 포함하도록 변경하세요.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **로컬라이제이션 처리를 위해 `_app.tsx` 업데이트:**

    `_app.tsx`를 수정하여 Intlayer 제공자를 포함하세요.

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

3.  **`getStaticPaths` 및 `getStaticProps` 설정:**

    `[locale]/index.tsx`에서 다양한 로케일을 처리하기 위한 경로 및 속성을 정의하세요.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* 여기에 콘텐츠를 추가하세요 */}</div>;

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

    const HomePage = () => <div>{/* 여기에 콘텐츠를 추가하세요 */}</div>;

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

    const HomePage = () => <div>{/* 여기에 콘텐츠를 추가하세요 */}</div>;

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

> `getStaticPaths` 및 `getStaticProps`는 Next.js 페이지 라우터에서 모든 로케일에 필요한 페이지를 사전 빌드하도록 보장합니다. 이 접근 방식은 런타임 계산을 줄이고 사용자 경험을 향상시킵니다. 자세한 내용은 Next.js 문서의 [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) 및 [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)를 참조하세요.

### 6단계: 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
      ko: "내 웹사이트에 오신 것을 환영합니다",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
      ko: "이 페이지를 편집하여 시작하세요.",
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
        ko: "이 페이지를 편집하여 시작하세요.",
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
        ko: "이 페이지를 편집하여 시작하세요.",
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
        "ko": "이 페이지를 편집하여 시작하세요."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx",
        "ko": "src/app/page.tsx"
      }
    }
  }
}
```

콘텐츠 선언에 대한 자세한 내용은 [콘텐츠 선언 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)를 참조하세요.

### 7단계: 코드에서 콘텐츠 활용

애플리케이션 전반에서 콘텐츠 사전을 액세스하여 번역된 콘텐츠를 표시하세요.

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
      {/* 추가 컴포넌트 */}
    </div>
  );
};

// ... 나머지 코드, getStaticPaths 및 getStaticProps 포함

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
      {/* 추가 컴포넌트 */}
    </div>
  );
};

// ... 나머지 코드, getStaticPaths 및 getStaticProps 포함

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
      {/* 추가 컴포넌트 */}
    </div>
  );
};

// ... 나머지 코드, getStaticPaths 및 getStaticProps 포함
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

> `string` 속성(예: `alt`, `title`, `href`, `aria-label`)에서 번역을 사용할 때는 다음과 같이 함수 값을 호출하세요:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useIntlayer.md)를 참조하세요.

### (선택 사항) 8단계: 메타데이터 국제화

페이지 제목 및 설명과 같은 메타데이터를 국제화하려면 Intlayer의 `getTranslation` 함수를 `getStaticProps` 함수와 함께 사용하세요.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // 메타데이터는 필요에 따라 head 또는 다른 컴포넌트에서 사용할 수 있습니다
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

  const t = <T,>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
      ko: "내 웹사이트",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
      ko: "내 웹사이트에 오신 것을 환영합니다.",
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

// ... getStaticPaths 포함 나머지 코드
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslation, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";



const HomePage = ({ metadata }) => {
  // 메타데이터는 필요에 따라 head 또는 다른 컴포넌트에서 사용할 수 있습니다
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
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
      ko: "내 웹사이트",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
      ko: "내 웹사이트에 오신 것을 환영합니다.",
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

// ... getStaticPaths 포함 나머지 코드
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslation, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");


const HomePage = ({ metadata }) => {
  // 메타데이터는 필요에 따라 head 또는 다른 컴포넌트에서 사용할 수 있습니다
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
    getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
      ko: "내 웹사이트",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
      ko: "내 웹사이트에 오신 것을 환영합니다.",
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

// ... getStaticPaths 포함 나머지 코드
```

### (선택 사항) 9단계: 콘텐츠 언어 변경

Next.js에서 콘텐츠의 언어를 변경하려면, 사용자를 적절한 로컬 페이지로 리디렉션하기 위해 `Link` 컴포넌트를 사용하는 것이 권장됩니다. `Link` 컴포넌트는 페이지의 사전 로드를 가능하게 하여 전체 페이지 새로 고침을 피하는 데 도움이 됩니다.

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
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일의 언어 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 - 예: French */}
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
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일의 언어 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 - 예: French */}
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
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일의 언어 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        </option>
      ))}
    </select>
  );
};
```

> `useLocalePageRouter` API는 `useLocale`과 동일합니다. `useLocale` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/next-intlayer/useLocale.md)를 참조하세요.

> 문서 참조:

> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleName.md)

> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocalizedUrl.md)

> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getHTMLTextDir.md)

> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)

> - [`lang` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [`dir` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [`aria-current` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (선택 사항) 10단계: 로컬라이즈된 링크 컴포넌트 생성

애플리케이션의 탐색이 현재 로케일을 준수하도록 보장하려면 사용자 정의 `Link` 컴포넌트를 생성할 수 있습니다. 이 컴포넌트는 내부 URL에 자동으로 현재 언어를 접두사로 추가합니다. 예를 들어, 프랑스어 사용자가 "About" 페이지로 이동하는 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로컬라이즈된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하도록 돕고 사용자가 선호하는 언어로 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에서 로컬라이즈된 링크를 사용하면 탐색이 현재 로케일 내에서 유지되며 예상치 못한 언어 전환을 방지합니다.
- **유지 관리 용이성**: 로컬라이제이션 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화하고 애플리케이션이 성장함에 따라 코드베이스를 더 쉽게 유지 관리하고 확장할 수 있습니다.

아래는 TypeScript로 구현된 로컬라이즈된 `Link` 컴포넌트입니다:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주됩니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일을 기반으로 href 속성을 조정하는 사용자 정의 Link 컴포넌트입니다.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL에 로케일을 접두사로 추가합니다(예: /fr/about).
 * 이를 통해 탐색이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 링크가 내부 링크이고 유효한 href가 제공된 경우 로컬라이즈된 URL을 가져옵니다.
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
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주됩니다.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * 현재 로케일을 기반으로 href 속성을 조정하는 사용자 정의 Link 컴포넌트입니다.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL에 로케일을 접두사로 추가합니다(예: /fr/about).
 * 이를 통해 탐색이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 링크가 내부 링크이고 유효한 href가 제공된 경우 로컬라이즈된 URL을 가져옵니다.
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
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주됩니다.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // 링크가 내부 링크이고 유효한 href가 제공된 경우 로컬라이즈된 URL을 가져옵니다.
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

#### 작동 방식

- **외부 링크 감지**:  
  헬퍼 함수 `checkIsExternalLink`는 URL이 외부 링크인지 여부를 결정합니다. 외부 링크는 로컬라이제이션이 필요하지 않으므로 변경되지 않습니다.

- **현재 로케일 검색**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.

- **URL 로컬라이제이션**:  
  내부 링크(즉, 외부가 아닌 경우)에 대해 `getLocalizedUrl`을 사용하여 URL에 현재 로케일을 자동으로 접두사로 추가합니다. 이는 사용자가 프랑스어를 사용하는 경우 `/about`을 `href`로 전달하면 `/fr/about`으로 변환됩니다.

- **링크 반환**:  
  컴포넌트는 로컬라이즈된 URL을 가진 `<a>` 요소를 반환하여 탐색이 로케일과 일치하도록 보장합니다.

이 `Link` 컴포넌트를 애플리케이션 전반에 통합하면 일관되고 언어를 인식하는 사용자 경험을 유지하면서 SEO 및 사용성을 개선할 수 있습니다.

### (선택 사항) 단계 11: 번들 크기 최적화

`next-intlayer`를 사용할 때, 사전은 기본적으로 모든 페이지의 번들에 포함됩니다. 번들 크기를 최적화하기 위해, Intlayer는 매크로를 사용하여 `useIntlayer` 호출을 지능적으로 대체하는 선택적 SWC 플러그인을 제공합니다. 이를 통해 사전은 실제로 사용하는 페이지의 번들에만 포함됩니다.

이 최적화를 활성화하려면 `@intlayer/swc` 패키지를 설치하세요. 설치가 완료되면, `next-intlayer`는 자동으로 플러그인을 감지하고 사용합니다:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> 참고: 이 최적화는 Next.js 13 이상에서만 사용할 수 있습니다.

> 참고: 이 패키지는 기본적으로 설치되지 않습니다. 이유는 SWC 플러그인이 Next.js에서 아직 실험적이기 때문입니다. 이는 향후 변경될 수 있습니다.

### TypeScript 구성

Intlayer는 TypeScript의 모듈 확장을 사용하여 코드베이스를 더 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입을 포함하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 구성

저장소를 깨끗하게 유지하고 생성된 파일을 커밋하지 않으려면 Intlayer에서 생성된 파일을 무시하는 것이 좋습니다.

`.gitignore` 파일에 다음 줄을 추가하세요:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

## 추가 리소스

- **Intlayer 문서:** [GitHub Repository](https://github.com/aymericzip/intlayer)
- **사전 가이드:** [Dictionary](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)
- **구성 문서:** [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)

이 가이드를 따르면 Intlayer를 Next.js 애플리케이션에 페이지 라우터를 사용하여 효과적으로 통합하고 웹 프로젝트에 강력하고 확장 가능한 국제화 지원을 구현할 수 있습니다.

### 더 나아가기

더 나아가려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

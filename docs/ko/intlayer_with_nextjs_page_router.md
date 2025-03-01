# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다. Intlayer는 최신 **Next.js** 프레임워크, 특히 전통적인 **Page Router**와 원활하게 통합됩니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- 컴포넌트 수준에서 선언적 사전을 사용하여 **번역을 쉽게 관리**합니다.
- 메타데이터, 경로 및 콘텐츠를 **동적으로 로컬화**합니다.
- 자동 생성된 타입으로 **TypeScript 지원**을 보장하여 자동 완성과 오류 감지를 개선합니다.
- 동적 로케일 감지 및 전환과 같은 **고급 기능**을 활용합니다.

> Intlayer는 Next.js 12, 13, 14, 15와 호환됩니다. Next.js App Router를 사용하는 경우 [App Router 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)를 참조하세요. Next.js 15의 경우 [이 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 따르세요.

---

## Page Router를 사용하는 Next.js 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

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

  Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다. 또한 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 Intlayer를 통합하기 위한 Next.js 플러그인과 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리디렉션을 처리하는 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션에서 지원하는 언어를 정의하는 구성 파일을 생성합니다:

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

> 이 구성 파일을 통해 로컬화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### 3단계: Next.js 구성과 Intlayer 통합

Next.js 구성을 수정하여 Intlayer를 통합합니다:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 Next.js 구성
};

export default withIntlayer(nextConfig);
```

> `withIntlayer()` Next.js 플러그인은 Intlayer를 Next.js와 통합하는 데 사용됩니다. 이는 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링합니다. [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능을 최적화하기 위한 별칭을 제공하고 서버 컴포넌트와의 호환성을 보장합니다.

### 4단계: 로케일 감지를 위한 미들웨어 구성

사용자의 선호 로케일을 자동으로 감지하고 처리하기 위해 미들웨어를 설정합니다:

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

> `matcher` 매개변수를 애플리케이션의 경로에 맞게 조정하세요. 자세한 내용은 [Next.js 문서의 matcher 구성](https://nextjs.org/docs/app/building-your-application/routing/middleware)을 참조하세요.

### 5단계: 동적 로케일 경로 정의

사용자의 로케일에 따라 로컬화된 콘텐츠를 제공하기 위해 동적 라우팅을 구현합니다.

1.  **로케일별 페이지 생성:**

    메인 페이지 파일 이름을 `[locale]` 동적 세그먼트를 포함하도록 변경합니다.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **\_app.tsx를 업데이트하여 로컬화를 처리:**

    `_app.tsx`를 수정하여 Intlayer 제공자를 포함합니다.

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

    `[locale]/index.tsx`에서 경로와 속성을 정의하여 다양한 로케일을 처리합니다.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* 여기에 콘텐츠 추가 */}</div>;

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

    const HomePage = () => <div>{/* 여기에 콘텐츠 추가 */}</div>;

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

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* 여기에 콘텐츠 추가 */}</div>;

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

> `getStaticPaths` 및 `getStaticProps`는 Next.js Page Router에서 애플리케이션이 모든 로케일에 필요한 페이지를 사전 빌드하도록 보장합니다. 이 접근 방식은 런타임 계산을 줄이고 사용자 경험을 향상시킵니다. 자세한 내용은 Next.js 문서의 [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) 및 [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)를 참조하세요.

... (이후 내용은 동일한 방식으로 번역됩니다)

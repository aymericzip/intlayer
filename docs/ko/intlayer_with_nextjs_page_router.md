# Getting Started Internationalizing (i18n) with Intlayer and Next.js using Page Router

## What is Intlayer?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스의 국제화(i18n) 라이브러리입니다. Intlayer는 최신 **Next.js** 프레임워크와 원활하게 통합되며, 전통적인 **Page Router**를 포함합니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **구성 요소 수준의 선언적 사전을 사용하여 번역을 쉽게 관리**하세요.
- **메타데이터, 경로 및 내용을 동적으로 지역화**하세요.
- **자동 생성된 유형으로 TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선하세요.
- **동적 지역 감지 및 전환**과 같은 고급 기능을 활용하세요.

> 참고: Intlayer는 Next.js 12, 13, 14 및 15와 호환됩니다. Next.js App Router를 사용하고 있다면, [App Router 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_14.md)를 참조하세요. Next.js 15의 경우, 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 따르세요.

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application Using Page Router

### Step 1: Install Dependencies

필요한 패키지를 선호하는 패키지 관리자를 사용하여 설치하세요:

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

애플리케이션에서 지원하는 언어를 정의하기 위해 구성 파일을 생성하세요:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일 추가
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

사용 가능한 구성 옵션의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### Step 3: Integrate Intlayer with Next.js Configuration

Intlayer를 통합하기 위해 Next.js 구성을 수정하세요:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존의 Next.js 구성
};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

사용자의 선호 로케일을 자동으로 감지하고 처리하기 위해 미들웨어를 설정하세요:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

사용자의 로케일에 따라 지역화된 콘텐츠를 제공하기 위해 동적 경로를 구현하세요.

1. **로케일 전용 페이지 생성:**

   기본 페이지 파일의 이름을 `[locale]` 동적 세그먼트를 포함하도록 변경하세요.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **로컬라이제이션을 처리하기 위해 `_app.tsx` 업데이트:**

   Intlayer 제공자를 포함하도록 `_app.tsx`를 수정하세요.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **`getStaticPaths` 및 `getStaticProps` 설정:**

   `[locale]/index.tsx`에서 서로 다른 로케일을 처리하도록 경로와 props를 정의하세요.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* 여기에 콘텐츠를 입력하세요 */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // 여기에 로케일 추가

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### Step 6: Declare Your Content

번역을 저장하기 위해 콘텐츠 사전을 만들고 관리하세요.

```tsx
// src/pages/[locale]/home.content.ts
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

콘텐츠 선언에 대한 자세한 내용은 [콘텐츠 선언 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)를 참조하세요.

### Step 7: Utilize Content in Your Code

애플리케이션 전반에 걸쳐 콘텐츠 사전에 접근하여 번역된 콘텐츠를 표시하세요.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@component/ComponentExample";

const HomePage = () => {
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

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 해당 콘텐츠 선언이 있어야 합니다

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **참고:** `string` 속성(예: `alt`, `title`, `href`, `aria-label`)에서 번역을 사용할 때는 다음과 같이 함수 값을 호출하세요:

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (Optional) Step 8: Internationalize Your Metadata

페이지 제목 및 설명과 같은 메타데이터를 국제화하려면 `getStaticProps` 함수와 Intlayer의 `getTranslationContent` 함수를 사용하세요.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // 메타데이터는 필요에 따라 head 또는 다른 구성 요소에서 사용 가능합니다
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

// ... 나머지 코드, getStaticPaths 포함
```

### (Optional) Step 9: Change the Language of Your Content

사용자가 언어를 동적으로 전환할 수 있도록 하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용하세요.

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* 추가 로케일에 대한 버튼 추가 */}
    </div>
  );
};

export default LanguageSwitcher;
```

### Configure TypeScript

Intlayer는 모듈 확장을 사용하여 TypeScript의 기능을 향상시켜, 더 나은 유형 안전성과 자동 완성을 제공합니다.

1. **TypeScript가 자동 생성된 유형을 포함하도록 하세요:**

   `tsconfig.json`을 업데이트하여 자동 생성된 유형을 포함하세요.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // 기존의 TypeScript 구성
     },
     "include": [
       "src",
       "types" // 자동 생성된 유형 포함
     ]
   }
   ```

2. **TypeScript 혜택의 예:**

   ![자동 완성 예시](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![번역 오류 예시](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Git Configuration

레포지토리를 깔끔하게 유지하고 Intlayer가 생성한 파일을 커밋하지 않도록 하려면 다음과 같이 합니다.

1. **`.gitignore` 업데이트:**

   `.gitignore` 파일에 다음 행을 추가하세요:

   ```gitignore
   # Intlayer가 생성한 파일 무시
   .intlayer
   ```

## Additional Resources

- **Intlayer 문서:** [GitHub 리포지토리](https://github.com/aymericzip/intlayer)
- **콘텐츠 선언 가이드:** [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)
- **구성 문서:** [구성 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)

이 가이드를 따르면 Page Router를 사용하여 Next.js 애플리케이션에 Intlayer를 효과적으로 통합하여 웹 프로젝트에 대한 강력하고 확장 가능한 국제화 지원을 활성화할 수 있습니다.

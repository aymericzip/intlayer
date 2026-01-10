---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: 페이지 경로에 [locale] 없이 Next.js 16 앱을 번역하는 방법 – i18n 가이드 2026
description: 페이지 경로에 [locale] 없이 Next.js 16 웹사이트를 다국어로 만드는 방법을 알아보세요. 문서를 따라 국제화(i18n)하고 번역하는 방법을 확인하세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 1.0.0
    date: 2026-01-10
    changes: 초기 릴리스
---

# Intlayer를 사용하여 Next.js 16 웹사이트 번역(페이지 경로에 [locale] 없이) | 국제화 (i18n)

<Tab defaultTab="video">
  <TabItem label="영상" value="video">
  
<iframe title="Next.js를 위한 최고의 i18n 솔루션? Intlayer를 확인하세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="코드" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

GitHub에서 [Application Template](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)을(를) 확인하세요.

## 목차

<TOC/>

## Intlayer란?

**Intlayer**는 최신 웹 애플리케이션에서 다국어 지원을 간소화하도록 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다. Intlayer는 강력한 **App Router**를 포함한 최신 **Next.js 16** 프레임워크와 원활하게 통합됩니다. 효율적인 렌더링을 위해 **Server Components**와 함께 작동하도록 최적화되어 있으며 [**Turbopack**](https://nextjs.org/docs/architecture/turbopack)과 완전히 호환됩니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **번역을 쉽게 관리**하기 위해 컴포넌트 수준의 선언적 딕셔너리를 사용합니다.
- **메타데이터를 동적으로 로컬라이즈**하고 라우트 및 콘텐츠에도 적용할 수 있습니다.
- **클라이언트 및 서버 사이드 컴포넌트에서 번역에 접근**할 수 있습니다.
- **TypeScript 지원을 보장**하며 자동 생성된 타입으로 자동완성 및 오류 감지를 개선합니다.
- **고급 기능 활용**, 예: 동적 로케일 감지 및 전환과 같은 기능을 활용하세요.

> Intlayer는 Next.js 12, 13, 14 및 16과 호환됩니다. Next.js Page Router를 사용 중인 경우 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_page_router.md)를 참조하세요. App Router를 사용하는 Next.js 12, 13, 14의 경우 이 [가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_14.md)를 참조하세요.

---

## Next.js 애플리케이션에 Intlayer를 설정하는 단계별 가이드

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  국제화 도구를 제공하는 핵심 패키지로, 구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링, 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 제공합니다.

- **next-intlayer**

Intlayer를 Next.js와 통합하는 패키지입니다. Next.js 국제화(i18n)를 위한 context provider와 hook을 제공합니다. 또한 Intlayer를 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)과 통합하기 위한 Next.js 플러그인과, 사용자의 선호 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 프록시도 포함합니다.

### 2단계: 프로젝트 구성

다음은 최종적으로 만들 구조입니다:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> 로케일 라우팅을 원하지 않는 경우, intlayer를 단순한 provider/hook으로 사용할 수 있습니다. 자세한 내용은 [이 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_no_locale_path.md)를 참조하세요.

애플리케이션의 언어를 구성하려면 config 파일을 생성하세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // 또는 `no-prefix` - 미들웨어 감지에 유용함
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
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // 또는 `no-prefix` - 미들웨어 감지에 유용함
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
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // 또는 `no-prefix` - 미들웨어 감지에 유용합니다
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 로케일별 URL, 프록시 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Intlayer를 Next.js 구성에 통합하기

다음과 같이 Next.js 설정을 Intlayer와 함께 구성하세요:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 여기에 구성 옵션을 추가하세요 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 여기에 구성 옵션 */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 여기에 구성 옵션 */
};

module.exports = withIntlayer(nextConfig);
```

> The `withIntlayer()` Next.js 플러그인은 Intlayer를 Next.js와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일(content declaration files)의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 [Webpack](https://webpack.js.org/) 또는 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 환경 내에서 Intlayer 환경 변수를 정의합니다. 추가로 성능 최적화를 위한 alias를 제공하고 서버 컴포넌트와의 호환성을 보장합니다.

> `withIntlayer()` 함수는 프로미스 함수입니다. 빌드가 시작되기 전에 intlayer 사전(intlayer dictionaries)을 준비할 수 있게 해줍니다. 다른 플러그인과 함께 사용하려면 이를 await할 수 있습니다. 예:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> 동기적으로 사용하려면 `withIntlayerSync()` 함수를 사용할 수 있습니다. 예:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer는 명령줄 플래그 `--webpack`, `--turbo`, `--turbopack` 및 현재 **Next.js 버전**을 기반으로 프로젝트가 **webpack** 또는 **Turbopack**을 사용 중인지 자동으로 감지합니다.
>
> `next>=16`의 경우, **Rspack**을 사용하고 있다면 Turbopack을 비활성화하여 Intlayer가 webpack 구성을 사용하도록 명시적으로 강제해야 합니다:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### 4단계: 동적 로케일 라우트 정의

RootLayout에서 모든 내용을 제거하고 다음 코드로 교체하세요:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // Next.js 15+에서 headers와 cookies를 대기합니다
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 먼저 intlayer 쿠키를 확인합니다 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // 그 다음 intlayer 헤더를 확인합니다 (기본값: 'x-intlayer-locale')
>>><<<
    // 마지막으로 accept-language 헤더('accept-language')를 확인합니다
    getHeader: (name) => headerList.get(name),
  });

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

````jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { headers, cookies } = require("next/headers");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // Next.js 15+에서 headers와 cookies를 기다립니다
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 먼저 intlayer 쿠키를 확인합니다 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // 그 다음 intlayer 헤더를 확인합니다 (기본값: 'x-intlayer-locale')
    // 마지막으로 accept-language 헤더('accept-language')를 확인합니다
    getHeader: (name) => headerList.get(name),
  });

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};

### 5단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ko: "내 프로젝트 제목",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ko: "워크플로우를 간소화하고 생산성을 향상시키도록 설계된 당사의 혁신적인 플랫폼을 만나보세요.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      ko: "워크플로우를 간소화하고 생산성을 향상시키도록 설계된 당사의 혁신적인 플랫폼을 확인해보세요.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ko: ["혁신", "생산성", "워크플로우", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
````

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ko: "내 프로젝트 제목",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ko: "워크플로우를 간소화하고 생산성을 향상시키도록 설계된 혁신적인 플랫폼을 만나보세요.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ko: ["혁신", "생산성", "워크플로우", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ko: "내 프로젝트 제목",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ko: "워크플로를 간소화하고 생산성을 향상시키도록 설계된 우리의 혁신적인 플랫폼을 만나보세요.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ko: ["혁신", "생산성", "워크플로", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "ko": "내 프로젝트 제목",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ko": "워크플로를 간소화하고 생산성을 높이도록 설계된 혁신적인 플랫폼을 만나보세요.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "ko": "워크플로우를 단순화하고 생산성을 향상시키도록 설계된 우리의 혁신적인 플랫폼을 확인해 보세요.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "ko": ["혁신", "생산성", "워크플로우", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ko: "편집하여 시작하세요",
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

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ko: "편집하여 시작하세요",
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

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ko: "편집하여 시작하세요",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "ko": "편집하여 시작하세요",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> 콘텐츠 선언은 애플리케이션 내 어느 곳에든 정의할 수 있으며, `contentDir` 디렉터리(기본값: `./src`)에 포함되기만 하면 됩니다. 또한 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 단계 6: 코드에서 콘텐츠 활용

애플리케이션 전체에서 콘텐츠 딕셔너리에 접근하세요:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Next.js 15+에서 headers와 cookies를 await 합니다
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 먼저 intlayer 쿠키를 확인합니다 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // 그 다음 intlayer 헤더를 확인합니다 (기본값: 'x-intlayer-locale')
    // 그리고 마지막으로 accept-language 헤더('accept-language')를 확인합니다
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

  // Next.js 15+에서 headers와 cookies를 await합니다
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 먼저 intlayer 쿠키를 확인합니다 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // 그 다음 intlayer 헤더를 확인합니다 (기본값: 'x-intlayer-locale')
    // 마지막으로 accept-language 헤더를 확인합니다 ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Next.js 15+에서 headers와 cookies를 await합니다
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // 먼저 intlayer 쿠키를 확인합니다 (기본값: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // 그다음 intlayer 헤더를 확인합니다 (기본값: 'x-intlayer-locale')
    // 마지막으로 accept-language 헤더 ('accept-language')를 확인합니다
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`**는 클라이언트 측 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃을 포함한 모든 상위 컴포넌트에 배치할 수 있습니다. 다만 Next.js가 레이아웃 코드를 페이지 간에 공유하므로 레이아웃에 배치하는 것이 권장됩니다. 레이아웃에서 `IntlayerClientProvider`를 사용하면 페이지마다 이를 다시 초기화하는 일을 피할 수 있어 성능이 향상되고 애플리케이션 전반에 걸쳐 일관된 로컬라이제이션 컨텍스트를 유지할 수 있습니다.
- **`IntlayerServerProvider`**는 서버 자식 컴포넌트에 로케일을 제공하는 데 사용됩니다. 레이아웃에 설정할 수 없습니다.

  > Layout과 page는 공통의 서버 컨텍스트를 공유할 수 없습니다. 서버 컨텍스트 시스템은 [React의 cache](https://react.dev/reference/react/cache) 메커니즘을 통해 요청별 데이터 저장소에 기반하므로 애플리케이션의 서로 다른 세그먼트마다 각 "context"가 재생성됩니다. 프로바이더를 공유 레이아웃에 배치하면 이러한 격리가 깨져 서버 컴포넌트에 서버 컨텍스트 값을 올바르게 전파하지 못하게 됩니다.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // 관련 콘텐츠 선언 생성

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> 콘텐츠를 `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에 사용하려면, 함수의 값을 호출해야 합니다. 예:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```
>
> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useIntlayer.md)를 참조하세요.

### (선택) 7단계: 로케일 감지를 위한 프록시 구성

사용자의 선호 로케일을 감지하도록 프록시를 설정하세요:

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

> `intlayerProxy`는 사용자의 선호 로케일을 감지하고 [구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 지정된 대로 적절한 URL로 리디렉션하는 데 사용됩니다. 또한 사용자의 선호 로케일을 쿠키에 저장할 수 있게 해줍니다.

> 여러 프록시를 함께 체인으로 연결해야 하는 경우(예: 인증이나 커스텀 프록시와 함께 `intlayerProxy`를 사용하는 경우), Intlayer는 이제 `multipleProxies`라는 헬퍼를 제공합니다.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (선택) 8단계: 콘텐츠 언어 변경

Next.js에서 콘텐츠의 언어를 변경하려면 권장되는 방법은 `Link` 컴포넌트를 사용하여 사용자를 적절한 로컬라이즈된 페이지로 리디렉션하는 것입니다. `Link` 컴포넌트는 페이지를 프리페치(prefetch)할 수 있게 하여 전체 페이지 리로드를 피하는 데 도움이 됩니다.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어명 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일의 언어명 - 예: 현재 로케일이 Locales.SPANISH로 설정된 경우 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 이름 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 표시된 언어 이름 - 예: Francés (현재 로케일이 Locales.SPANISH인 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 이름 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일로 된 언어 이름 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 된 언어 이름 - 예: 현재 로케일이 Locales.SPANISH이면 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 이름 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 대안으로 `useLocale` 훅이 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 페이지를 prefetch(사전 페치)하지 않습니다. 자세한 내용은 [`useLocale` 훅 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)를 참조하세요.

> 문서 참조:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (선택 사항) 9단계: 서버 액션에서 현재 로케일 가져오기

Server Action 내부에서 활성 로케일이 필요하다면(예: 이메일 현지화 또는 로케일에 민감한 로직 실행), `next-intlayer/server`에서 `getLocale`을 호출하세요:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // locale를 사용하여 작업을 수행합니다
};
```

> `getLocale` 함수는 사용자의 로케일을 결정하기 위해 계단식 전략을 따릅니다:
>
> 1. 먼저, 프록시가 설정했을 수 있는 `locale` 값을 요청 헤더에서 확인합니다
> 2. 헤더에서 `locale`을 찾지 못하면 쿠키에 저장된 `locale`을 확인합니다
> 3. 쿠키도 없으면 브라우저 설정에서 사용자의 선호 언어를 감지하려고 시도합니다
> 4. 마지막 수단으로 애플리케이션에 구성된 기본 `locale`로 대체됩니다
>
> 이를 통해 사용 가능한 컨텍스트에 따라 가장 적절한 로케일이 선택됩니다.

### (선택 사항) 10단계: 번들 크기 최적화

`next-intlayer`를 사용할 때 사전(dictionaries)은 기본적으로 모든 페이지의 번들에 포함됩니다. 번들 크기를 최적화하기 위해 Intlayer는 매크로를 사용해 `useIntlayer` 호출을 지능적으로 대체하는 선택적 SWC 플러그인을 제공합니다. 이를 통해 사전은 실제로 해당 사전을 사용하는 페이지의 번들에만 포함됩니다.

이 최적화를 활성화하려면 `@intlayer/swc` 패키지를 설치하세요. 설치하면 `next-intlayer`가 플러그인을 자동으로 감지하여 사용합니다:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> 참고: 이 최적화는 Next.js 13 이상에서만 사용할 수 있습니다.

> 참고: 이 패키지는 SWC 플러그인이 Next.js에서 아직 실험적이기 때문에 기본적으로 설치되어 있지 않습니다. 향후 변경될 수 있습니다.

> 참고: 옵션을 `importMode: 'dynamic'` 또는 `importMode: 'live'`로 설정하면 Suspense에 의존하게 되므로 `useIntlayer` 호출을 `Suspense` 경계로 감싸야 합니다. 즉, Page / Layout 컴포넌트의 최상위 수준에서 `useIntlayer`를 직접 사용할 수 없습니다.

### Turbopack에서 딕셔너리 변경 사항 감시

Turbopack을 개발 서버로 사용하여 `next dev` 명령을 실행하는 경우, 사전(dictionary) 변경 사항은 기본적으로 자동으로 감지되지 않습니다.

이 제한은 Turbopack이 콘텐츠 파일의 변경을 모니터링하기 위해 webpack 플러그인을 병렬로 실행할 수 없기 때문에 발생합니다. 이를 해결하려면 개발 서버와 Intlayer 빌드 워처를 동시에 실행하기 위해 `intlayer watch` 명령을 사용해야 합니다.

```json5 fileName="package.json"
{
  // ... 기존 package.json 구성
  "scripts": {
    // ... 기존 scripts 구성
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> 만약 next-intlayer@<=6.x.x를 사용 중이라면, Next.js 16 애플리케이션이 Turbopack과 올바르게 작동하도록 `--turbopack` 플래그를 유지해야 합니다. 이 제한을 피하려면 next-intlayer@>=7.x.x 사용을 권장합니다.

### TypeScript 구성

Intlayer는 TypeScript의 이점을 얻고 코드베이스를 더욱 견고하게 만들기 위해 module augmentation을 사용합니다.

![자동완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 구성에 자동 생성된 타입들이 포함되어 있는지 확인하세요.

````json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동으로 생성된 타입 포함
  ],
}

### Git 구성

Intlayer에 의해 생성된 파일을 무시하는 것을 권장합니다. 이렇게 하면 Git 저장소에 해당 파일들이 커밋되는 것을 방지할 수 있습니다.

이를 위해 다음 지침을 `.gitignore` 파일에 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에 의해 생성된 파일 무시
.intlayer
````

### VS Code 확장

Intlayer로 개발 환경을 개선하려면 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 기능은 다음을 제공합니다:

- **번역 키에 대한 자동 완성**.
- **누락된 번역에 대한 실시간 오류 감지**.
- **번역된 콘텐츠의 인라인 미리보기.**
- **빠른 작업(Quick actions)**을 통해 번역을 손쉽게 생성하고 업데이트할 수 있습니다.

자세한 사용 방법은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### 더 나아가기

더 나아가, [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용해 콘텐츠를 외부화할 수 있습니다.

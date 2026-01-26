---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: 맞춤형 URL 재작성
description: Intlayer에서 로케일별 경로를 정의하기 위해 맞춤형 URL 재작성(custom URL rewrites)을 구성하고 사용하는 방법을 알아봅니다.
keywords:
  - 맞춤형 URL 재작성
  - 라우팅
  - 국제화
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: 프레임워크별 포매터와 useRewriteURL 훅을 사용하여 중앙 집중식 URL 재작성을 구현합니다.
---

# 맞춤형 URL 재작성 구현

Intlayer는 표준 `/locale/path` 구조와 다른 로케일별 경로를 정의할 수 있도록 맞춤형 URL 재작성을 지원합니다. 이를 통해 내부 애플리케이션 로직은 일관되게 유지하면서 영어의 경우 `/about`, 프랑스어의 경우 `/a-propos` 같은 URL을 사용할 수 있습니다.

## 구성

커스텀 리라이트는 프레임워크별 포매터를 사용하여 `intlayer.config.ts` 파일의 `routing` 섹션에서 구성합니다. 이 포매터들은 선호하는 라우터에 맞는 올바른 문법을 제공합니다.

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 기타 설정
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="React 라우터" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ... (생략됨)
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="TanStack 라우터" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 기타 설정
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Vue 라우터" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 기타 설정
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Solid Router" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 기타 설정
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### 사용 가능한 포맷터

Intlayer는 모든 인기 프레임워크에 대한 포맷터를 제공합니다:

- `nextjsRewrite`: Next.js App Router용. `[slug]`, `[...slug]` (1+), `[[...slug]]` (0+)를 지원합니다.
- `svelteKitRewrite`: SvelteKit용. `[slug]`, `[...path]` (0+), `[[optional]]` (0-1)를 지원합니다.
- `reactRouterRewrite`: React Router용. `:slug` 및 `*` (0+)를 지원합니다.
- `vueRouterRewrite`: Vue Router 4용. `:slug`, `:slug?` (0-1), `:slug*` (0+), `:slug+` (1+)를 지원합니다.
- `solidRouterRewrite`: Solid Router용. `:slug` 및 `*slug` (0+)를 지원합니다.
- `tanstackRouterRewrite`: TanStack Router 용 포매터. `$slug` 및 `*` (0+) 를 지원합니다.
- `nuxtRewrite`: Nuxt 3 용 포매터. `[slug]` 및 `[...slug]` (0+) 를 지원합니다.
- `viteRewrite`: Vite 기반 프로젝트용 일반 포매터. Vite 프록시를 위한 문법을 정규화합니다.

### 고급 패턴

Intlayer는 내부적으로 이러한 패턴을 통합된 문법으로 정규화하여 정교한 경로 매칭 및 생성을 가능하게 합니다:

- **선택적 세그먼트**: `[[optional]]` (SvelteKit) 또는 `:slug?` (Vue/React)를 지원합니다.
- **캐치올(0개 이상)**: `[[...slug]]` (Next.js), `[...path]` (SvelteKit/Nuxt), 또는 `*` (React/TanStack)은 여러 세그먼트를 매칭할 수 있습니다.
- **필수 캐치올(1개 이상)**: `[...slug]` (Next.js) 또는 `:slug+` (Vue)는 적어도 하나의 세그먼트가 존재해야 함을 보장합니다.

## 클라이언트 측 URL 수정: `useRewriteURL`

브라우저의 주소 표시줄이 언제나 "보기 좋은" 로컬라이즈된 URL을 반영하도록 하기 위해, Intlayer는 `useRewriteURL` 훅을 제공합니다. 이 훅은 사용자가 정규 경로(canonical path)에 도착했을 때 `window.history.replaceState`를 사용하여 URL을 조용히 업데이트합니다.

### 프레임워크에서의 사용법

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // /fr/about 를 /fr/a-propos 로 자동으로 수정합니다
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // 자동으로 /fr/about을 /fr/a-propos로 바로잡습니다

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">
  
    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
  <Tab label="Solid" value="solid">
  
    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
</Tabs>

## 라우터 통합 및 프록시

Intlayer의 서버 사이드 프록시(Vite & Next.js)는 SEO 일관성을 보장하기 위해 커스텀 리라이트를 자동으로 처리합니다.

1. **내부 리라이트**: 사용자가 `/fr/a-propos`를 방문하면 프록시는 내부적으로 이를 `/fr/about`로 매핑하여 프레임워크가 올바른 라우트와 매치되도록 합니다.
2. **권위 있는 리다이렉트**: 사용자가 수동으로 `/fr/about`를 입력하면 프록시는 `/fr/a-propos`로 301/302 리다이렉트를 발행하여 검색 엔진이 한 버전의 페이지만 색인하도록 보장합니다.

### Next.js 통합

Next.js 통합은 `intlayerProxy` 미들웨어를 통해 완전히 처리됩니다.

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Vite 통합

SolidJS, Vue, Svelte의 경우, 개발 중 리라이트를 `intlayerProxy` Vite 플러그인이 관리합니다.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## 주요 기능

### 1. 다중 컨텍스트 리라이트

각 포매터는 다양한 대상(consumer)을 위한 특화 규칙을 포함하는 `RewriteObject`를 생성합니다:

- `url`: 클라이언트 측 URL 생성에 최적화됨 (locale 세그먼트 제거).
- `nextjs`: Next.js 미들웨어를 위해 `[locale]`을 보존합니다.
- `vite`: Vite 프록시를 위해 `:locale`을 보존합니다.

### 2. 자동 패턴 정규화

Intlayer는 내부적으로 모든 패턴 문법을 정규화합니다(예: `[param]`을 `:param`으로 변환). 이를 통해 소스 프레임워크에 상관없이 매칭이 일관되게 유지됩니다.

### 3. SEO 권위 있는 URL

canonical paths에서 pretty aliases로 리디렉션을 강제함으로써, Intlayer는 중복 콘텐츠 문제를 방지하고 사이트 검색 가능성을 향상시킵니다.

## 핵심 유틸리티

- `getLocalizedUrl(url, locale)`: 리라이트 규칙을 준수하여 로컬라이즈된 URL을 생성합니다.
- `getCanonicalPath(path, locale)`: 로컬라이즈된 URL을 내부 canonical path로 되돌립니다.
- `getRewritePath(pathname, locale)`: pathname이 더 보기 좋은 로컬라이즈된 alias로 수정되어야 하는지 감지합니다.

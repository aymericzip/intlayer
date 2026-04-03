---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: 사용자 정의 도메인
description: 전용 호스트 이름에서 서로 다른 로케일을 제공하기 위해 Intlayer에서 도메인 기반 로케ール 라우팅을 구성하는 방법을 알아봅니다.
keywords:
  - 사용자 정의 도메인
  - 도메인 라우팅
  - 라우팅
  - 국제화
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "routing.domains 구성을 통해 도메인 기반 로케일 라우팅을 추가했습니다."
---

# 사용자 정의 도메인

Intlayer는 도메인 기반 로케일 라우팅을 지원하므로 전용 호스트 이름에서 특정 로케일을 제공할 수 있습니다. 예를 들어, 중국 방문자를 `intlayer.org/zh` 대신 `intlayer.zh`로 안내할 수 있습니다.

## 작동 방식

`routing`의 `domains` 맵은 각 로케일을 호스트 이름과 연결합니다. Intlayer는 이 맵을 다음 두 곳에서 사용합니다.

1. **URL 생성** (`getLocalizedUrl`): 대상 로케일이 현재 페이지와 _다른_ 도메인에 있는 경우 절대 URL이 반환됩니다(예: `https://intlayer.zh/about`). 두 도메인이 일치하면 상대 URL이 반환됩니다(예: `/fr/about`).
2. **서버 프록시** (Next.js & Vite): 들어오는 요청은 도달한 도메인에 따라 리디렉션되거나 다시 작성됩니다.

### 독점 도메인 vs 공유 도메인

주요 차이점은 **독점성**입니다.

- **독점 도메인** — 하나의 로케일만 해당 호스트 이름에 매핑됩니다(예: `zh → intlayer.zh`). 도메인 자체가 로케일을 식별하므로 경로에 로케일 접두사가 추가되지 않습니다. `https://intlayer.zh/about`은 중국어 콘텐츠를 제공합니다.
- **공유 도메인** — 여러 로케일이 동일한 호스트 이름에 매핑됩니다(예: `en`과 `fr` 모두 `intlayer.org`에 매핑됨). 일반적인 접두사 기반 라우팅이 적용됩니다. `intlayer.org/fr/about`은 프랑스어 콘텐츠를 제공합니다.

## 구성

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // 공유 도메인 — en 및 fr은 intlayer.org에서 접두사 라우팅을 사용합니다.
      en: "intlayer.org",
      // 독점 도메인 — zh는 자체 호스트 이름을 가지며 /zh/ 접두사가 필요하지 않습니다.
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

`domains`에 나열되지 않은 로케일은 도메인 재정의 없이 표준 접두사 라우팅을 계속 사용합니다.

## URL 생성

`getLocalizedUrl`은 호출 컨텍스트에 따라 올바른 URL 유형을 자동으로 생성합니다.

### 동일 도메인 로케일 (상대 URL)

```ts
// 현재 페이지: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about" (기본 로케일, 접두사 없음)
```

### 도메인 간 로케일 (절대 URL)

```ts
// 현재 페이지: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about" (독점 도메인, /zh/ 접두사 없음)
```

### 로케일 자체 도메인에서 제공

```ts
// 현재 페이지: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about" (이미 올바른 도메인에 있음 — 상대 URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about" (intlayer.org로 다시 연결되는 도메인 간 링크)
```

### 현재 도메인 자동 감지

`currentDomain`은 선택 사항입니다. 생략하면 `getLocalizedUrl`은 다음 순서로 이를 해결합니다.

1. 절대 입력 URL의 호스트 이름(예: `https://intlayer.org/about` → `intlayer.org`).
2. 브라우저 환경의 `window.location.hostname`.
3. 둘 다 사용할 수 없는 경우(명시적 옵션이 없는 SSR), 동일 도메인 로케일에 대해 상대 URL이 반환되고 절대 URL은 생성되지 않습니다. 이것이 안전한 폴백입니다.

```ts
// 브라우저 — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about" (window에서 자동 감지)

// 절대 URL에서 — 도메인이 자동으로 감지됨
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### 도메인이 있는 `getMultilingualUrls`

`getMultilingualUrls`는 모든 로케일에 대해 `getLocalizedUrl`을 호출하므로 호출자의 도메인에 따라 상대 URL과 절대 URL이 혼합되어 생성됩니다.

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

이러한 절대 URL은 SEO를 위한 `<link rel="alternate" hreflang="...">` 태그에서 바로 사용할 수 있습니다.

## 프록시 동작

### Next.js

`intlayerProxy` 미들웨어는 도메인 라우팅을 자동으로 처리합니다. `middleware.ts`에 추가하세요.

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**리디렉션** — 요청이 특정 로케일 접두사에 대해 잘못된 도메인에 도달한 경우:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**다시 쓰기 (Rewrite)** — 요청이 접두사 없이 로케일의 독점 도메인에 도달한 경우:

```
GET intlayer.zh/about
→ /zh/about으로 다시 쓰기 (Next.js 내부 라우팅 전용, URL은 깔끔하게 유지됨)
```

### Vite

`intlayerProxy` Vite 플러그인은 개발 중에 동일한 로직을 적용합니다.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **참고**: 로컬 개발에서는 일반적으로 `localhost`에 있으므로 도메인 간 리디렉션은 다른 로컬 포트가 아닌 실제 도메인을 가리킵니다. 로컬에서 다중 도메인 라우팅을 테스트해야 하는 경우 호스트 파일 재정의(예: `127.0.0.1 intlayer.zh`) 또는 역방향 프록시를 사용하세요.

## 로케일 전환기 (Locale Switcher)

`next-intlayer`의 `useLocale` 후크는 도메인 인식 탐색을 자동으로 처리합니다. 사용자가 다른 도메인의 로케일로 전환하면 차세대 라우터가 원본(origins)을 가로질러갈 수 없기 때문에 후크는 클라이언트 측 라우터 푸시 대신 전체 페이지 탐색(`window.location.href`)을 수행합니다.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

추가 구성이 필요하지 않습니다. `useLocale`은 내부적으로 `window.location.hostname`을 감지하고 `router.replace`(동일 도메인)와 `window.location.href`(도메인 간) 중에서 결정합니다.

## SEO: `hreflang` 대체 링크

도메인 기반 라우팅은 일반적으로 검색 엔진에 각 언어에 대해 인덱싱할 URL을 알리기 위해 `hreflang`과 함께 사용됩니다. `getMultilingualUrls`를 사용하여 대체 URL의 전체 세트를 생성합니다.

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // 예: "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

이것은 다음을 생성합니다.

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## 핵심 유틸리티

| 유틸리티                                          | 설명                                                                                 |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `getLocalizedUrl(url, locale, { currentDomain })` | 대상 로케일이 현재 도메인인지 여부에 따라 상대 또는 절대 URL을 반환합니다.           |
| `getMultilingualUrls(url, { currentDomain })`     | 필요한 경우 상대 및 절대 URL을 혼합하여 로케일 키 로컬라이즈된 URL 맵을 반환합니다.  |
| `getPrefix(locale, { domains })`                  | 독점 도메인 로케일에는 빈 접두사를 반환하고, 그렇지 않으면 일반 접두사를 반환합니다. |

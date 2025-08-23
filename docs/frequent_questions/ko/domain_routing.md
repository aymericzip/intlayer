---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 도메인 기반 라우팅 구성 방법
description: 도메인 기반 라우팅 구성 방법을 알아보세요.
keywords:
  - 도메인
  - 라우팅
  - intlayer
  - 구성
  - 미들웨어
  - react-router
  - vue-router
  - next.js
  - vite
  - 프레임워크
slugs:
  - doc
  - faq
  - domain-routing
---

# Intlayer에서 `/[locale]/` 경로 대신 **도메인 기반 라우팅**을 어떻게 구성하나요?

## 간단한 답변

도메인 기반 라우팅은 경로 기반 라우팅(`example.com/[locale]/`)보다 더 간단합니다. 모든 미들웨어와 라우팅 구성을 건너뛸 수 있기 때문입니다. 각 언어 도메인에 앱을 배포하고 도메인별로 환경 변수를 하나씩 설정하기만 하면 됩니다.

## 단계별 안내

1. **도메인별로 한 번씩 배포** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. 각 배포마다 `LOCALE` (및 일반적인 Intlayer 환경 변수들)을 해당 도메인이 제공할 로케일로 설정합니다.
3. `intlayer.config.[ts|js]`에서 해당 변수를 `defaultLocale`로 참조합니다.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 도메인이 로케일을 결정합니다
  },
  // ... 나머지 구성
};

export default config;
```

이게 전부입니다-**Next.js**, **Vite + React**, **Vite + Vue** 등에서도 동일하게 작동합니다.

## 모든 도메인이 **같은** 배포본을 가리킨다면 어떻게 하나요?

모든 도메인이 동일한 애플리케이션 번들을 가리키는 경우, 런타임에 호스트를 감지하고 프로바이더를 통해 로케일을 수동으로 전달해야 합니다.

### Next.js용

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 호스트명에서 로케일을 가져오는 함수 사용
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### Vue용

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // 호스트명에서 로케일을 가져오는 함수로 대체하세요.
app.mount("#app");
```

`getLocaleFromHostname()`를 자신의 조회 로직으로 교체하세요.

## 로케일 스위처 업데이트

도메인 기반 라우팅을 사용할 때, 언어를 변경하면 다른 도메인으로 이동하게 됩니다:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target]; // 대상 로케일에 맞는 도메인으로 이동
}
```

## 도메인 기반 라우팅의 장점

1. **더 간단한 구성**: `intlayerMiddleware`, `generateStaticParams`, `react-router` 또는 `vue-router`를 구성할 필요가 없습니다.
2. **더 나은 SEO**: 각 언어마다 고유한 도메인을 가집니다
3. **더 깔끔한 URL**: 경로에 로케일 접두사가 없습니다
4. **더 쉬운 유지보수**: 각 언어별 배포가 독립적입니다

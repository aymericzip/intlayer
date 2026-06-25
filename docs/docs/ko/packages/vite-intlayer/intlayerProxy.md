---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerProxy Vite 플러그인 문서 | vite-intlayer
description: Vite dev/preview 서버 및 프로덕션 SSR용 언어 라우팅 미들웨어입니다. 언어 감지, URL 리다이렉트 및 내부 재작성을 처리합니다.
keywords:
  - intlayerProxy
  - vite
  - 플러그인
  - 미들웨어
  - 언어
  - 라우팅
  - 국제화
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "configOptions가 단일 options 객체로 병합됨; proxy가 intlayer()에 번들로 포함됨"
author: aymericzip
---

# intlayerProxy

`intlayerProxy`는 개발 서버, 미리보기 서버 및 프로덕션 SSR (Nitro / TanStack Start) 등 **모든 환경**에 대한 언어 라우팅 미들웨어를 등록하는 Vite 플러그인입니다.

> **Intlayer v9부터** `intlayerProxy`는 기본 [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md) 플러그인 내에 자동으로 포함되며 `routing.enableProxy: true`를 통해 기본적으로 활성화됩니다. 더 정밀한 제어가 필요하거나 표준 `intlayer()` 구성 이외의 영역에서 사용하는 경우에만 이를 별도로 등록해야 합니다.

## 사용법

### `intlayer()`의 일부로 사용 (권장, v9+)

`intlayerProxy`를 별도로 등록하는 대신 기본 플러그인에 `proxy` 옵션을 전달합니다:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### 독립 실행형(Standalone)으로 사용 (필요 시)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## 옵션

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

모든 옵션은 선택 사항이며 단일 객체로 전달됩니다:

| 옵션            | 타입                                | 설명                                                                                                                                |
| --------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | 특정 요청을 언어 라우팅에서 제외하는 서술 함수(predicate)입니다. 요청을 무시하려면 `true`를 반환합니다 (예: API 라우트, 헬스 체크). |
| `configOptions` | `GetConfigurationOptions`           | `getConfiguration()`으로 전달되는 Intlayer 설정 재정의 옵션. 프록시가 특정 설정 파일을 읽거나 값을 덮어써야 할 때 사용합니다.       |

### 예시

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler`는 모든 언어 라우팅 로직을 포함하는 특정 프레임워크에 종속되지 않는 Node.js `(req, res, next)` 미들웨어를 생성합니다. Vite 플러그인 API를 사용할 수 없는 환경(예: 순수 Node.js 서버 또는 사용자 정의 Nitro 모듈)에서 유용합니다.

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### 프로덕션 SSR (TanStack Start / h3를 통한 Nitro)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## 라우팅 동작

미들웨어는 `next-intlayer` 미들웨어의 라우팅 로직을 모방하며 모든 Intlayer 라우팅 모드를 지원합니다.

### 라우팅 모드

| 모드            | 브라우저 표시 URL        | 동작                                                                                                                             |
| --------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/ko/about`              | 기본값. URL의 언어 접두사. `prefix-all`이 활성화되어 있지 않으면 기본 언어는 접두사가 없는 URL로 리다이렉트됩니다.               |
| `prefix-all`    | `/en/about`, `/ko/about` | 기본 언어를 포함한 모든 언어가 항상 접두사를 갖습니다.                                                                           |
| `no-prefix`     | `/about`                 | URL에 언어가 포함되지 않습니다. 언어는 쿠키에만 저장되며 URL 재작성은 내부적으로 발생합니다.                                     |
| `search-params` | `/about?locale=ko`       | 쿼리 파라미터로 언어를 전달합니다. 파라미터가 누락되었거나 오래된 경우 `locale` 파라미터를 추가/업데이트하도록 리다이렉트합니다. |

### 감지 우선순위

1. URL 경로 접두사 (예: `/ko/about` → `ko`).
2. 쿠키 / localStorage 값 (`intlayer-locale`).
3. `Accept-Language` 헤더.
4. 설정 파일의 `defaultLocale`.

### 자동 무시 (Bypass)

미들웨어는 언어 처리 없이 다음 요청들을 항상 통과시킵니다:

- `ignore` 조건과 일치하는 요청.
- `/node_modules/**`
- `/@**` – Vite 내부 리소스 (`@vite/`, `@fs/`, `@id/` 등).
- `/_**` – 서버 내부 리소스 (`__vite_ping`, `__manifest` 등).
- 파일 확장자로 끝나는 경로의 요청 (정적 에셋). 정적 에셋 경로에 언어 접두사(예: `/ko/logo.png`)가 있는 경우, 파일이 제대로 서빙될 수 있도록 접두사를 제거합니다.

### 도메인 라우팅

Intlayer 설정에 `routing.domains`가 구성된 경우, 미들웨어는 도메인 간의 언어 라우팅을 처리합니다:

- `domains.zh = "intlayer.zh"`일 때, `intlayer.org`상의 `/zh/about` 요청은 `https://intlayer.zh/about`으로 리다이렉트됩니다.
- `intlayer.zh/about` 요청은 `[locale]` 라우트 파라미터가 채워지도록 내부적으로 `/zh/about`으로 재작성됩니다.

### 리다이렉트 루프 보호

미들웨어는 2초 이동 창(sliding window) 내에서 `originalUrl → newUrl` 쌍당 리다이렉트 횟수를 추적합니다. 해당 창 내에서 10회를 초과하는 리다이렉트가 감지되면 무한 루프를 방지하기 위해 에러 설명과 함께 `500` 응답을 반환합니다.

## Nitro / 프로덕션 SSR (자동 주입, v9+)

`intlayerProxy`가 Vite 플러그인으로 사용될 때 `.nitro` 속성을 갖습니다. `nitro/vite` 빌드 플러그인은 이 속성을 읽어 `nitroConfig.modules`로 푸시하므로 `intlayerNitroHandler`가 Nitro 서버 미들웨어로 자동 등록됩니다. 프로덕션 SSR을 위해 수동으로 구성을 설정할 필요가 없습니다.

Nitro 핸들러는 h3 v2의 Web Fetch API 이벤트 모델( `fromNodeMiddleware`이 아님)을 사용하므로 Node, Bun, Deno, edge 런타임 등 모든 Nitro 프리셋과 호환됩니다.

## 사용되지 않는 별칭 (Deprecated)

| 사용되지 않는 내보내기     | 대체품          |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |

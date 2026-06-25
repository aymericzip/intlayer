---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerCompiler Vite 플러그인 문서 | vite-intlayer
description: 빌드/변환 시점에 컴포넌트 파일에서 인라인 Intlayer 콘텐츠 선언을 추출하여 사전 JSON 파일에 기록하는 Vite 플러그인입니다.
keywords:
  - intlayerCompiler
  - vite
  - 플러그인
  - 컴파일러
  - 콘텐츠
  - 사전
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "intlayer()에 포함됨; 문서 초기화"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler`는 컴포넌트 소스 파일에서 별도의 `.content.ts` 파일 대신 컴포넌트 내부에 직접 정의된 **인라인 Intlayer 콘텐츠 선언**을 스캔하여 변환(transform) 단계에서 사전 JSON 파일에 기록하는 Vite 플러그인입니다.

> **Intlayer v9부터** `intlayerCompiler`는 Intlayer 설정에서 `compiler.enabled`가 `true`이고 `compiler.output`이 설정된 경우 기본 [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md) 플러그인 내에 자동으로 포함됩니다. 컴파일러 전용 설정을 완벽히 제어하고 싶을 때만 이 플러그인을 별도로 등록해야 합니다.

## 사용법

### `intlayer()`의 일부로 사용 (권장, v9+)

Intlayer 설정을 통해 컴파일러를 활성화합니다:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // 추출된 사전이 작성될 경로
  },
});
```

그런 다음 추가 등록 없이 표준 플러그인을 사용합니다:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### 독립 실행형(Standalone)으로 사용 (필요 시)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## 옵션

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| 옵션             | 타입                      | 설명                                                                              |
| ---------------- | ------------------------- | --------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | `getConfiguration()`으로 전달되는 Intlayer 설정 재정의 옵션.                      |
| `compilerConfig` | `Partial<CompilerConfig>` | 컴파일러 전용 설정 섹션(예: `enabled`, `output`, `filesList`)에 대한 재정의 옵션. |

### 예시

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## 동작 원리

### 변환(Transform) 단계

`compiler.filesList`와 일치하는 모든 소스 파일에 대해 컴파일러 플러그인은 다음을 수행합니다:

1. 파일 콘텐츠를 `@intlayer/babel`의 `extractContent`에 전달합니다.
2. 발견된 각 선언에 대해 `onExtract`를 호출하여 결과 사전 JSON을 `compiler.output`에 작성합니다.
3. 인라인 선언이 표준 `useIntlayer('key')` / `getIntlayer('key')` 호출로 대체된 변환된 소스 코드를 반환합니다.

지원되는 파일 형식: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`.

### HMR (Hot Module Replacement)

개발 모드에서 컴포넌트 파일이 저장되면 컴파일러는 다음을 수행합니다:

1. Vite의 `handleHotUpdate` 훅을 통해 파일 변경을 감지합니다.
2. 업데이트된 파일에서 콘텐츠를 다시 추출합니다.
3. 업데이트된 사전 JSON을 작성합니다.
4. 페이지 전체 새로고침을 트리거합니다 (`server.ws.send({ type: 'full-reload' })`).

500ms 디바운스(debounce)는 사전 작성 자체(파일 변경 이벤트를 트리거함)가 무한 추출 루프를 유발하는 것을 방지합니다.

### 중복 제거 (Deduplication)

`intlayerCompiler`는 다른 번들 플러그인과 동일한 `createPrimaryInstanceGuard` 중복 제거 메커니즘을 사용합니다. 컴파일러를 내포한 `intlayer()`와 수동 `intlayerCompiler()` 호출이 모두 존재하는 경우, 처음 등록된 인스턴스만 실행되어 사전이 중복으로 생성되지 않습니다.

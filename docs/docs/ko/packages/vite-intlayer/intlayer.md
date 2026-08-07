---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite 플러그인 문서 | vite-intlayer
description: vite-intlayer 패키지에서 intlayer 플러그인을 사용하는 방법을 확인하세요
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "문서 초기화"
author: aymericzip
---

# intlayer Vite 플러그인 문서

`intlayer` Vite 플러그인은 Intlayer 설정을 빌드 프로세스에 통합합니다. 이 플러그인은 사전 별칭을 처리하고, 개발 모드에서 사전 감시자를 시작하며, 빌드를 위해 사전 파일을 준비합니다.

## 사용법

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
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions`는 `GetConfigurationOptions` (참고: `@intlayer/config`)를 확장하며 다음의 추가 필드를 포함합니다:

| 옵션            | 타입                            | 기본값      | 설명                                                                                                                        |
| --------------- | ------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | compat-adapter 패키지(예: `@intlayer/react-i18next`)에 대한 추가 caller 패턴. 빌드 시간에 field-usage 분석기에 전달됩니다.  |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | bundled locale-routing proxy로 전달되는 옵션. `ignore`를 사용하여 특정 경로(예: API 라우트)를 locale 라우팅에서 제외합니다. |

다른 모든 옵션(`override`, `configFile`, …)은 `getConfiguration()`으로 직접 전달됩니다.

### 예시

#### 로케일 라우팅에서 API 경로 무시하기

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

#### 커스텀 설정 파일 경로 포함

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### compat-adapter callers와 함께

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## 플러그인의 역할

### 1. Dictionary preparation

빌드가 시작되기 전에(그리고 dev에서는 한 시간에 한 번), `intlayer`는 `prepareIntlayer`를 호출하여 모든 `.content.ts` 파일을 `.intlayer/`에 저장된 최적화된 JSON 딕셔너리로 컴파일합니다.

### 2. Module aliases

플러그인은 Vite resolve aliases를 추가하여 `import { myDict } from 'intlayer/dictionaries/my-dict'`가 디스크의 컴파일된 JSON 파일로 해석되도록 합니다. SSR 빌드는 `ssr.noExternal`을 사용하여 모든 `@intlayer/*` 패키지가 aliases와 함께 번들링되도록 합니다.

### 3. Dev-server watcher

개발 모드에서 `chokidar` watcher가 시작됩니다. `.content.ts` 파일이 변경되면 dictionaries가 다시 컴파일되고 Vite의 HMR이 브라우저에 업데이트를 전파합니다.

### 4. 번들된 locale-routing proxy (v9+)

Intlayer v9 이후로 `intlayerProxy` 미들웨어는 `intlayer()` 내부에 자동으로 등록됩니다. 다음을 처리합니다:

- URL 접두사, 쿠키 및 `Accept-Language` 헤더에서 locale 감지.
- 감지된 locale이 현재 URL과 일치하지 않을 때 301 리다이렉트.
- 프레임워크가 올바른 `[locale]` 경로 매개변수를 인식하도록 하는 내부 URL 재작성.

프록시는 Intlayer 구성의 `routing.enableProxy`(기본값 `true`)로 제어됩니다. 완전히 비활성화하려면:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

별도의 `intlayerProxy()` 호출 없이 프록시 동작을 사용자 정의하려면 메인 플러그인에 `proxy` 옵션을 전달하세요:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

전체 라우팅 동작 참조는 [intlayerProxy documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerProxy.md)를 참조하세요.

### 5. Bundled compiler (v9+)

`compiler.enabled`가 `true`이고 **그리고** Intlayer 설정에서 `compiler.output`이 설정되어 있으면, `intlayer()`는 `intlayerCompiler`을 자동으로 등록합니다. 컴파일러는 component 파일 내에 직접 작성된 인라인 content 선언을 추출하고 변환 시간에 dictionaries에 작성합니다. [intlayerCompiler documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerCompiler.md)을 참조하세요.

### 6. Build optimisations

프로덕션 빌드 중에 플러그인은 다음을 추가합니다:

- **intlayerOptimize** – `useIntlayer('key')` → `useDictionary(hash)`를 다시 작성하고 직접 JSON 임포트를 주입하는 Babel transform입니다.
- **intlayerPrune** – dictionary JSON에서 사용하지 않는 content 필드를 제거합니다.
- **intlayerMinify** – dictionary JSON을 압축하고 선택적으로 필드 이름을 난독화합니다.

이들은 development 모드에서는 비활성화됩니다.

## 더 이상 사용되지 않는 별칭

| 더 이상 사용되지 않는 export | 대체 항목  |
| ---------------------------- | ---------- |
| `intlayerPlugin`             | `intlayer` |
| `intLayerPlugin`             | `intlayer` |

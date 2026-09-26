---
createdAt: 2026-01-21
updatedAt: 2026-01-21
priority: 5
title: vite-intlayer 패키지 문서
description: Intlayer용 Vite 플러그인으로 사전 별칭과 워처를 제공합니다.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "내보내기 색인 업데이트 – 프록시 및 컴파일러가 이제 intlayer()에 번들됨; intlayerProxy, intlayerCompiler, intlayerMinify 문서 추가"
  - version: 8.0.0
    date: 2026-01-21
    changes: "모든 exports에 대한 문서 통합"
author: aymericzip
---

# vite-intlayer 패키지

`vite-intlayer` 패키지는 Vite 기반 애플리케이션에 Intlayer를 통합하기 위한 Vite 플러그인을 제공합니다.

## 설치

```bash
npm install vite-intlayer
```

## 내보내기

### 플러그인

가져오기:

```tsx
import "vite-intlayer";
```

| 함수                       | 설명                                                                                                                                     | 관련 문서                                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | 메인 Vite 플러그인. 사전을 준비하고, 별칭을 구성하고, 개발 서버 감시자를 시작하며, (v9부터) 프록시와 컴파일러를 번들합니다.              | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**더 이상 사용되지 않음**) `intlayer`의 별칭입니다.                                                                                     | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**더 이상 사용되지 않음**) `intlayer`의 별칭입니다.                                                                                     | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | 로케일 라우팅 미들웨어 플러그인(감지, 리디렉션, 재작성). v9부터 `intlayer()` 내에 번들되어 있습니다 – 필요한 경우에만 별도로 등록하세요. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**더 이상 사용되지 않음**) `intlayerProxy`의 별칭입니다.                                                                                | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**더 이상 사용되지 않음**) `intlayerProxy`의 별칭입니다.                                                                                | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | 컴포넌트에서 인라인 콘텐츠 선언을 추출하여 사전에 기록합니다. v9부터 `intlayer()` 내에 번들되어 있습니다.                                | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | 프로덕션 번들에서 사용되지 않는 사전 필드를 트리 쉐이킹합니다.                                                                           | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | 컴파일된 사전 JSON 파일을 축소하고 선택적으로 필드 이름을 변경합니다.                                                                    | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerMinify.md)     |

### 유틸리티

| Export                       | Description                                                                                             | Related Doc                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | 프레임워크에 독립적인 Node.js `(req, res, next)` 미들웨어를 반환하며, locale-routing 로직을 포함합니다. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerProxy.md) |

### 타입

| Export                       | Description                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | `intlayer()`에서 허용하는 옵션입니다. `GetConfigurationOptions`를 `compatCallers` 및 `proxy`로 확장합니다.             |
| `IntlayerProxyPluginOptions` | `intlayerProxy()` 및 `createIntlayerProxyHandler()`에서 허용하는 옵션입니다. `ignore` 및 `configOptions`를 포함합니다. |
| `IntlayerCompilerOptions`    | `intlayerCompiler()`에서 허용하는 옵션입니다. `configOptions` 및 `compilerConfig`를 포함합니다.                        |
| `CompatCallerConfig`         | `@intlayer/babel`에서 재내보내기됩니다. 필드 사용 분석을 위한 compat-adapter 호출자 패턴을 설명합니다.                 |

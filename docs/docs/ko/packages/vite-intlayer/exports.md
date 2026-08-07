---
createdAt: 2026-01-21
updatedAt: 2026-01-21
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

| 함수                 | 설명                                                                      | 관련 문서                                                                                                              |
| -------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | 빌드 프로세스에 Intlayer를 통합하는 메인 Vite 플러그인.                   | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**사용 중단**) `intlayer`의 별칭.                                        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | 로케일 감지와 라우팅을 처리하는 개발용 미들웨어 플러그인.                 | -                                                                                                                      |
| `intlayerMiddleware` | (**사용 중단**) `intlayerProxy`의 별칭.                                   | -                                                                                                                      |
| `intlayerPrune`      | 빌드 시 사용되지 않는 사전(딕셔너리)을 트리 쉐이킹하여 제거하는 플러그인. | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vite-intlayer/intlayerPrune.md) |

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

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
    changes: 모든 exports에 대한 문서 통합
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

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider 컴포넌트 문서 | solid-intlayer
description: solid-intlayer 패키지의 IntlayerProvider 컴포넌트 사용 방법
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 문서 통합
---

# IntlayerProvider 컴포넌트 문서

`IntlayerProvider`는 Solid 애플리케이션에 국제화 컨텍스트를 제공하는 루트 컴포넌트입니다. 현재 locale 상태를 관리하며 모든 하위 컴포넌트가 번역을 사용할 수 있도록 보장합니다.

## 사용법

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## 설명

`IntlayerProvider`는 다음과 같은 역할을 수행합니다:

1. **상태 관리**: 반응성을 위해 signals를 사용하여 현재 locale을 초기화하고 저장합니다.
2. **로케일 결정**: 쿠키, 브라우저 설정 또는 기본 구성에 따라 초기 locale을 결정합니다.
3. **컨텍스트 주입**: `useIntlayer` 또는 `useLocale` 같은 훅을 통해 모든 컴포넌트에서 locale과 `setLocale` 함수를 사용할 수 있게 합니다.
4. **지속성**: 세션 간 사용자의 선호를 유지하기 위해 locale 변경을 쿠키나 로컬 스토리지와 자동으로 동기화합니다.

## Props

- **locale** (선택 사항): 현재 locale을 수동으로 설정합니다.
- **defaultLocale** (optional): 구성의 기본 로케일을 재정의합니다.
- **setLocale** (optional): 커스텀 로케일 설정 함수를 제공합니다.
- **disableEditor** (optional): 시각적 에디터 통합을 비활성화합니다.
- **isCookieEnabled** (optional): 쿠키 지속성을 활성화하거나 비활성화합니다.

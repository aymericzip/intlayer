---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider 컴포넌트 문서 | react-intlayer
description: react-intlayer 패키지의 IntlayerProvider 컴포넌트를 사용하는 방법을 확인하세요
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Init doc
---

# IntlayerProvider 컴포넌트 문서

`IntlayerProvider` 컴포넌트는 React 애플리케이션에서 Intlayer의 메인 provider입니다. 이 컴포넌트는 모든 자식 요소에게 Intlayer 컨텍스트를 제공합니다.

## 사용법

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Props (속성)

| Prop              | Type                              | 설명                                                      |
| ----------------- | --------------------------------- | --------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | 사용할 초기 로케일입니다.                                 |
| `defaultLocale`   | `LocalesValues`                   | 폴백으로 사용할 기본 로케일입니다.                        |
| `setLocale`       | `(locale: LocalesValues) => void` | 로케일을 설정하는 사용자 정의 함수입니다.                 |
| `disableEditor`   | `boolean`                         | 에디터를 비활성화할지 여부입니다.                         |
| `isCookieEnabled` | `boolean`                         | 로케일을 저장하기 위해 쿠키 사용을 활성화할지 여부입니다. |

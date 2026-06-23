---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 문서 | react-intlayer
description: react-intlayer 패키지의 usePathname hook을 사용하여 로케일 세그먼트가 없는 현재 URL 경로 이름(pathname)을 가져오는 방법을 알아보세요.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - 국제화
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname 유틸리티 추가"
  - version: 8.2.0
    date: 2026-06-22
    changes: "기록 초기화"
author: aymericzip
---

# React 통합: `usePathname` Hook 문서

`react-intlayer`의 `usePathname` hook은 로케일(locale) 세그먼트가 제거된 현재 브라우저 경로 이름(pathname)을 반환합니다. 이는 네이티브 `window.location.pathname` 속성에 의존하며 `popstate`를 통해 브라우저 탐색 이벤트에 반응합니다.

## `usePathname` 가져오기

```typescript
import { usePathname } from "react-intlayer";
```

## 개요

프레임워크별 라우팅 hook(`next-intlayer` 또는 `react-router`의 hook 등)과 달리, 이 hook은 순수 React 애플리케이션을 위한 가볍고 프레임워크에 구애받지 않는 솔루션입니다. 현재 URL을 추출하고 일치하는 로케일 접두사를 제거합니다(예: `/ko/about`는 `/about`이 됨).

## 사용법

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        홈
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        소개
      </a>
    </nav>
  );
};

export default Navigation;
```

## 반환 값

| 타입     | 설명                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `string` | 로케일 접두사가 제거된 브라우저의 현재 경로 이름 (예: `/ko/dashboard` → `/dashboard`). |

## 동작

- **로케일 제거**: 내부적으로 `getPathWithoutLocale` 유틸리티를 사용하여 애플리케이션의 Intlayer 구성에 따라 pathname에서 로케일을 자동으로 감지하고 제거합니다.
- **반응성**: `popstate` 이벤트를 수신합니다. 사용자가 브라우저의 뒤로/앞으로 가기 버튼을 사용하여 탐색하거나 `pushState`/`replaceState`가 호출될 때 hook은 반환된 경로 이름을 업데이트합니다.
- **SSR 폴백**: 서버(즉, `window`가 정의되지 않은 환경)에서는 기본적으로 `/`를 반환합니다. 순수 React 컨텍스트에서는 기본적으로 요청 URL에 접근할 수 없기 때문입니다.

## 관련 문서

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md)

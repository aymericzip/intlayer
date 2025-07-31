---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Next.js에서 i18n과 함께하는 정적 렌더링과 동적 렌더링
description: Next.js에서 i18n과 함께 정적 렌더링과 동적 렌더링을 사용하는 방법을 알아보세요.
keywords:
  - 정적
  - 동적
  - 렌더링
  - i18n
  - next.js
  - next-intl
  - intlayer
  - 프레임워크
  - 미들웨어
  - 구성
slugs:
  - doc
  - faq
  - static-rendering
---

# Next.js에서 i18n과 함께하는 정적 렌더링과 동적 렌더링

## **next-intl**의 문제점

- **무슨 일이 발생하나요?**
  i18n 라우팅된 앱(`/en/…`, `/fr/…`)에서 `useTranslations`, `getTranslations` 또는 다른 next-intl 헬퍼를 *서버 컴포넌트 내부*에서 사용할 때, Next.js는 전체 경로를 **동적**으로 표시합니다. ([Next Intl][1])

- **왜 그런가요?**
  next-intl은 요청 전용 헤더(`x-next-intl-locale`)에서 현재 로케일을 `headers()`를 통해 조회합니다. `headers()`는 **동적 API**이기 때문에, 이를 사용하는 모든 컴포넌트는 정적 최적화를 잃게 됩니다. ([Next Intl][1], [Next.js][2])

- **공식 해결책 (보일러플레이트)**

  1. 지원하는 모든 로케일에 대해 `generateStaticParams`를 내보냅니다.
  2. `useTranslations`를 호출하기 _전에_ **모든** 레이아웃/페이지에서 `setRequestLocale(locale)`을 호출합니다. ([Next Intl][1])
     이렇게 하면 헤더 의존성은 제거되지만, 유지해야 할 추가 코드가 생기고 프로덕션에서 불안정한 API를 사용하게 됩니다.

## **intlayer**가 문제를 회피하는 방법

**설계 선택**

1. **경로 매개변수만 사용** – 로케일은 Next.js가 이미 모든 페이지에 전달하는 `[locale]` URL 세그먼트에서 가져옵니다.
2. **컴파일 타임 번들** – 번역은 일반 ES 모듈로 가져와서 트리 쉐이킹되고 빌드 시점에 포함됩니다.
3. **동적 API 없음** – `useT()`는 `headers()`나 `cookies()`가 아닌 React 컨텍스트에서 읽습니다.
4. **추가 설정 불필요** – 페이지가 `app/[locale]/` 아래에 있으면 Next.js가 로케일별로 하나의 HTML 파일을 자동으로 사전 렌더링합니다.

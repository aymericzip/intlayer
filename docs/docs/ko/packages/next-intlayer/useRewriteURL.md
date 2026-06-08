---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL 훅 문서
description: Intlayer에서 지역화된 URL 재작성(localized URL rewrites)을 관리하기 위한 Next.js 전용 훅.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL 훅

`useRewriteURL` 훅은 Next.js용 클라이언트 사이드 훅으로, 지역화된 URL 재작성을 자동으로 관리합니다. 사용자가 로케일 접두사가 붙은 정규 경로(canonical path)를 직접 입력하더라도 브라우저 주소창이 항상 `intlayer.config.ts`에 정의된 "보기 좋은" 지역화된 경로를 반영하도록 보장합니다.

이 훅은 `window.history.replaceState`를 사용하여 조용히 동작하므로 불필요한 Next.js 라우터 이동이나 페이지 새로고침을 피합니다.

## 사용법

레이아웃의 일부인 클라이언트 컴포넌트에서 이 훅을 호출하기만 하면 됩니다.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // 주소 표시줄에서 /fr/privacy-notice 를 /fr/politique-de-confidentialite 로 자동으로 수정합니다
  useRewriteURL();

  return null;
};
```

## 작동 방식

1. **경로 모니터링**: 훅은 사용자의 `locale` 변경을 감지합니다.
2. **재작성 감지**: 현재 `window.location.pathname`을 구성에 있는 재작성 규칙과 비교합니다.
3. **URL 수정**: 현재 경로에 대해 더 보기 좋은 로컬라이즈된 별칭이 발견되면, 훅은 `window.history.replaceState`를 호출하여 주소 표시줄을 업데이트하면서 사용자를 동일한 내부 페이지에 유지합니다.

## 왜 Next.js에서 사용해야 하나요?

`intlayerMiddleware`가 서버 측 리라이트와 초기 리디렉션을 처리하는 반면, `useRewriteURL` 훅은 클라이언트 사이드 전환 이후에도 브라우저의 URL이 선호하는 SEO 구조와 일치하도록 보장합니다.

- **깔끔한 URL**: `/fr/tests` 대신 `/fr/essais` 같은 지역화된 세그먼트 사용을 강제합니다.
- **성능**: 전체 라우터 사이클이나 데이터 재요청을 유발하지 않고 주소 표시줄만 업데이트합니다.
- **SEO 정합성**: 사용자와 검색 엔진 봇에 하나의 URL 버전만 보이도록 하여 중복 콘텐츠 문제를 방지합니다.

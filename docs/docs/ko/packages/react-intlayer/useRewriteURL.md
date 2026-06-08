---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL 훅 문서
description: Intlayer에서 지역화된 URL 재작성(localized URL rewrites)을 관리하기 위한 React 전용 훅.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# useRewriteURL 훅

`useRewriteURL` 훅은 클라이언트 측에서 지역화된 URL 재작성을 관리하도록 설계되었습니다. 이 훅은 사용자의 locale과 `intlayer.config.ts`에 정의된 재작성 규칙을 기반으로 현재 URL이 보기 좋은(pretty) 지역화된 버전으로 보정되어야 하는지 자동으로 감지합니다.

일반적인 네비게이션과 달리, 이 훅은 전체 페이지 리로드나 라우터 네비게이션 사이클을 트리거하지 않고 주소 표시줄의 URL을 업데이트하기 위해 `window.history.replaceState`를 사용합니다.

## 사용법

클라이언트 측 컴포넌트에서 훅을 호출하기만 하면 됩니다.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // 리라이트 규칙이 존재하면 주소 표시줄의 /fr/tests를 /fr/essais로 자동으로 교정합니다
  useRewriteURL();

  return <div>My Component</div>;
};
```

## 작동 방식

1. **감지**: 훅은 현재 `window.location.pathname`과 사용자의 `locale`을 모니터링합니다.
2. **매칭**: 내부 Intlayer 엔진을 사용하여 현재 `pathname`이 현재 `locale`에 대해 더 보기 좋은 로컬라이즈된 별칭을 갖는 canonical 경로와 일치하는지 확인합니다.
3. **URL 수정**: 더 나은 별칭이 발견되었고(현재 경로와 다를 경우), 훅은 동일한 canonical 콘텐츠와 상태를 유지하면서 브라우저 URL을 업데이트하기 위해 `window.history.replaceState`를 호출합니다.

## 왜 사용하나요?

- **SEO**: 사용자가 특정 언어에 대해 항상 단일하고 권위 있는 pretty URL로 도달하도록 보장합니다.
- **일관성**: 사용자가 정식 경로(예: `/fr/privacy-notice`)를 수동으로 입력하여 지역화된 버전(`/fr/politique-de-confidentialite`) 대신 접속하는 불일치를 방지합니다.
- **성능**: 주소 표시줄을 업데이트하되 원치 않는 라우터 부작용(router side-effects)이나 컴포넌트 재마운트(re-mounts)를 유발하지 않습니다.

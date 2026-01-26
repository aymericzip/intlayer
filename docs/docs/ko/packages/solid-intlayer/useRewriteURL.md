---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL 훅 문서
description: Intlayer에서 지역화된 URL 리라이트를 관리하기 위한 Solid 전용 훅.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL 훅

SolidJS용 `useRewriteURL` 훅은 클라이언트 측에서 지역화된 URL 리라이트를 관리하도록 설계되었습니다. 현재 로케일과 `intlayer.config.ts`의 설정에 따라 브라우저의 URL을 자동으로 "보기 좋은" 지역화된 버전으로 수정합니다.

`window.history.replaceState`를 사용함으로써 불필요한 Solid Router 네비게이션을 피합니다.

## 사용법

애플리케이션의 일부인 컴포넌트 내에서 훅을 호출하세요.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // 재작성(rewrite) 규칙이 존재하면 주소 표시줄에서 /fr/tests 를 /fr/essais 로 자동으로 수정합니다
  useRewriteURL();

  return <>{props.children}</>;
};
```

## 작동 방식

1. **감지**: 이 훅은 `createEffect`를 사용하여 반응형 `locale()`의 변경을 모니터링합니다.
2. **매칭**: 현재 `window.location.pathname`이 현재 언어에 대해 더 보기 좋은 로컬라이즈된 별칭(prettier localized alias)을 가진 canonical route(정식 경로)에 해당하는지 확인합니다.
3. **URL 수정**: 더 보기 좋은 별칭이 발견되면 훅은 `window.history.replaceState`를 호출하여 주소 표시줄을 내부 내비게이션 상태에 영향을 주거나 컴포넌트 재렌더링을 유발하지 않고 업데이트합니다.

## 왜 사용하나요?

- **권위 있는 URL**: 각 로컬라이즈된 콘텐츠 버전에 대해 단일 URL을 강제하여 SEO에 중요합니다.
- **개발자 편의**: 내부 라우트 정의는 canonical로 유지하면서 외부에는 사용자 친화적이고 로컬라이즈된 경로를 노출할 수 있습니다.
- **일관성**: 사용자가 선호하는 로컬라이제이션 규칙을 따르지 않는 경로를 수동으로 입력할 경우 URL을 수정합니다.

---

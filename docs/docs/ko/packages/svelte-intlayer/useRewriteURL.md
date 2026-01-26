---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL 훅 문서
description: Svelte 전용 훅으로 Intlayer에서 로컬라이즈된 URL 재작성 관리를 돕습니다.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL 훅

Svelte용 `useRewriteURL` 훅은 클라이언트 측에서 로컬라이즈된 URL 재작성을 관리하도록 설계되었습니다. 현재 로케일과 `intlayer.config.ts`의 구성에 따라 브라우저의 URL을 보다 보기 좋은 로컬화된 버전으로 자동으로 수정합니다.

전체 SvelteKit 네비게이션을 발생시키지 않고 `window.history.replaceState`를 사용해 주소 표시줄의 URL을 조용히 업데이트합니다.

## 사용법

Svelte 컴포넌트 안에서 훅을 호출하세요.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // 리라이트 규칙이 있으면 주소 표시줄의 /fr/tests를 /fr/essais로 자동으로 수정합니다
  useRewriteURL();
</script>

<slot />
```

## 작동 원리

1. **반응형 업데이트**: 훅은 Intlayer의 `locale` 스토어를 구독합니다.
2. **감지**: 로케일이 변경될 때마다(또는 마운트 시) 현재 `window.location.pathname`이 리라이트 규칙에 정의된 더 보기 좋은 현지화된 별칭을 갖고 있는지 계산합니다.
3. **URL 수정**: 더 보기 좋은 경로가 발견되면, 훅은 전체 페이지 리로드나 SvelteKit 내비게이션 로직을 트리거하지 않고 주소 표시줄을 업데이트하기 위해 `window.history.replaceState`를 호출합니다.

## 왜 사용해야 하나요?

- **SEO 모범 사례**: 검색 엔진이 URL의 보기 좋은 현지화된 버전만 색인하도록 보장합니다.
  /// **향상된 UX**: 수동으로 입력한 URL을 선호하는 명명 규칙에 맞게 수정합니다.
  /// **눈에 띄지 않는 업데이트**: 컴포넌트 트리나 내비게이션 기록에 영향을 주지 않고 주소 표시줄만 수정합니다.

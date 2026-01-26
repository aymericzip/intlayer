---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Composable 문서
description: Intlayer에서 지역화된 URL 리라이트를 관리하기 위한 Vue 전용 composable.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL Composable

Vue 3용 `useRewriteURL` composable는 클라이언트 측에서 지역화된 URL 리라이트를 처리하도록 설계되었습니다. 사용자의 현재 로케일과 `intlayer.config.ts` 설정을 기반으로 브라우저의 URL을 더 "보기 좋은" 지역화된 버전으로 자동으로 수정합니다.

이 기능은 `window.history.replaceState`를 사용하여 동작하며, 이를 통해 원치 않는 Vue Router 내비게이션을 유발하지 않습니다.

## 사용법

`setup()` 함수나 `<script setup>` 내부에서 이 composable을 호출하세요.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// 재작성 규칙이 있으면 주소 표시줄에서 /fr/tests 를 /fr/essais 로 자동으로 수정합니다
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## 작동 방식

1. **리액티브 모니터링**: 이 컴포저블은 사용자 `locale`에 대해 `watch`를 설정합니다.
2. **리라이트 매칭**: 로케일이 변경될 때(또는 마운트 시) 현재 `window.location.pathname`이 더 보기 좋은 로컬라이즈된 별칭을 갖는 정식(canonical) 라우트와 일치하는지 확인합니다.
3. **URL 수정**: 더 보기 좋은 별칭이 발견되면, 컴포저블은 `window.history.replaceState`를 호출하여 페이지를 리로드하거나 라우터 상태를 잃지 않고 주소 표시줄을 업데이트합니다.

## 왜 사용해야 하나?

- **SEO 최적화**: 검색 엔진이 URL의 권위 있는 로컬라이즈된 버전을 색인하도록 보장합니다.
- **향상된 UX**: 수동으로 입력한 URL을 선호하는 명명 규칙으로 수정합니다(예: `/fr/about` 대신 `/fr/a-propos`).
- **낮은 오버헤드**: 컴포넌트 라이프사이클이나 네비게이션 가드를 다시 트리거하지 않고 URL을 조용히 업데이트합니다.

---

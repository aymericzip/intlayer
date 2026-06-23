---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 함수 문서 | vue-intlayer
description: vue-intlayer 패키지의 usePathname 함수 사용 방법 알아보기
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 국제화 (Internationalization)
  - 문서
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname 유틸리티 추가"
  - version: 8.2.0
    date: 2026-06-22
    changes: "초기 기록 작성"
author: aymericzip
---

# Vue 통합: `usePathname` 문서

`usePathname` 함수는 로케일 세그먼트가 제거된 현재 브라우저의 경로명(pathname)을 Vue의 `ComputedRef<string>` 형태로 반환합니다. 이는 로케일 접두사를 수동으로 제거할 필요 없이, 로케일을 인식하는 내비게이션(예: 현재 활성화된 내비게이션 항목 결정)을 구축할 때 유용합니다.

## Vue에서 `usePathname` 가져오기

```typescript
import { usePathname } from "vue-intlayer";
```

## 개요

`usePathname`은 `window.location.pathname`을 읽고, `getPathWithoutLocale`을 통해 로케일 접두사를 제거하며, 브라우저에서 `popstate` 이벤트(뒤로/앞으로 가기 내비게이션)가 발생할 때마다 해당 값을 업데이트하는 Vue 계산된 참조(computed ref)를 생성합니다. 이 값은 Vue 템플릿이나 `setup` 함수에서 직접 사용할 수 있습니다.

## 사용법

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## 반환 값

| 타입                  | 설명                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | 로케일 접두사가 없는 현재 브라우저의 경로명(pathname)이 포함된 Vue Computed Ref입니다. |

## 동작 방식

- **로케일 제거(Locale stripping)**: 앞의 로케일 세그먼트를 제거합니다(예: `/ko/dashboard` → `/dashboard`).
- **반응성(Reactive)**: 모든 `popstate` 이벤트(브라우저 뒤로 가기 / 앞으로 가기) 발생 시 값을 업데이트합니다.
- **SSR 안전성(SSR-safe)**: `window` 객체를 사용할 수 없는 경우 `""`를 반환합니다.
- **정리(Cleanup)**: `popstate` 리스너는 초기화 시 전역적으로 추가되며, Vue가 컴포넌트 생명주기를 관리하는 방식 덕분에 일반적으로 각 컴포넌트별로 수동 정리를 할 필요가 없습니다.

## 예시

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/settings", label: "설정" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## 관련 문서

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vue-intlayer/useLocale.md) — 현재 로케일 + 로케일 전환기(switcher)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md) — 이 훅에서 사용되는 기본 유틸리티

---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 함수 문서 | svelte-intlayer
description: svelte-intlayer 패키지의 usePathname 함수 사용 방법 알아보기
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 국제화
  - 문서
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname 유틸리티 추가"
  - version: 8.2.0
    date: 2026-06-22
    changes: "히스토리 초기화"
author: aymericzip
---

# Svelte 통합: `usePathname` 문서

`usePathname` 함수는 로케일 세그먼트가 제거된 현재 브라우저의 pathname을 Svelte의 `Readable<string>` 스토어로 반환합니다. 이 함수는 로케일 접두사를 수동으로 제거할 필요 없이 로케일을 인식하는 내비게이션(예: 어느 내비게이션 항목이 활성화되었는지 판단)을 구축할 때 유용합니다.

## Svelte에서 `usePathname` 가져오기

```typescript
import { usePathname } from "svelte-intlayer";
```

## 개요

`usePathname`은 `window.location.pathname`을 읽어 Svelte의 읽기 전용 스토어(readable store)를 생성하고, `getPathWithoutLocale`을 통해 로케일 접두사를 제거하며, 브라우저에서 `popstate` 이벤트(뒤로가기/앞으로 가기 탐색)가 발생할 때마다 새로운 값을 방출(emit)합니다. 컴포넌트에서는 `$` 스토어 구문을 사용하여 구독(subscribe)할 수 있습니다.

## 사용법

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## 반환값

| 타입               | 설명                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------- |
| `Readable<string>` | 로케일 접두사가 없는 현재 pathname을 포함하는 Svelte 읽기 전용 스토어(readable store). |

## 동작 방식

- **로케일 제거(Locale stripping)**: 앞쪽 로케일 세그먼트를 제거합니다 (예: `/ko/dashboard` → `/dashboard`).
- **반응성(Reactive)**: 매 `popstate` 이벤트(브라우저의 뒤로 가기 / 앞으로 가기 탐색)마다 새로운 값을 방출합니다.
- **SSR-안전(SSR-safe)**: `window` 객체를 사용할 수 없는 경우 `""`를 반환합니다.
- **정리(Cleanup)**: 마지막 구독자가 구독을 취소할 때 `popstate` 리스너는 자동으로 제거됩니다.

## 예제

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "대시보드" },
    { href: "/settings", label: "설정" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## 관련 문서

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/svelte-intlayer/useLocale.md) — 현재 로케일 + 로케일 전환기
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md) — 이 훅에서 사용되는 기본 유틸리티

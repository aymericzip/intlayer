---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 문서 | solid-intlayer
description: solid-intlayer 패키지에서 usePathname hook을 사용하는 방법 알아보기
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 국제화
  - 문서
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname 유틸리티 추가"
  - version: 8.2.0
    date: 2026-06-22
    changes: "초기 역사 생성"
author: aymericzip
---

# Solid 통합: `usePathname` Hook 문서

`usePathname` 훅은 로케일 세그먼트가 제거된 현재 브라우저 경로명(pathname)을 Solid의 `Accessor<string>` 형태로 반환합니다. 이 훅은 로케일을 고려한 내비게이션(예: 어떤 내비게이션 항목이 활성화되었는지 판별)을 구축할 때, 로케일 접두사를 수동으로 제거할 필요 없이 유용하게 사용할 수 있습니다.

## Solid에서 `usePathname` 가져오기

```typescript
import { usePathname } from "solid-intlayer";
```

## 개요

`usePathname`은 `window.location.pathname`으로부터 초기화된 반응형(reactive) 시그널을 생성하고, `getPathWithoutLocale`을 통해 로케일 접두사를 제거합니다. 브라우저가 `popstate` 이벤트(뒤로 가기/앞으로 가기 내비게이션)를 발생시킬 때마다 시그널을 업데이트합니다. 이벤트 리스너는 `onCleanup`을 통해 자동으로 정리(clean up)됩니다.

## 사용법

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## 반환 값

| 타입               | 설명                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ |
| `Accessor<string>` | 로케일 접두사가 없는 현재 경로명(pathname)을 반환하는 Solid의 접근자(반응형 getter). |

## 동작 방식

- **로케일 제거**: 선행하는 로케일 세그먼트를 제거합니다(예: `/ko/dashboard` → `/dashboard`).
- **반응성**: `popstate` 이벤트(브라우저 뒤로/앞으로 가기) 발생 시 자동으로 업데이트됩니다.
- **SSR 안전성**: `window` 객체를 사용할 수 없을 때는 `""`를 반환합니다.
- **정리(Cleanup)**: `popstate` 리스너는 Solid의 `onCleanup`을 통해 자동으로 제거됩니다.

## 예제

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/settings", label: "설정" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## 관련 항목

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useLocale.md) — 현재 로케일 + 로케일 스위처
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md) — 이 훅에서 사용되는 기본 유틸리티

---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 훅 문서 | next-intlayer
description: next-intlayer 패키지의 usePathname 훅 사용 방법
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
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

# Next.js 통합: `usePathname` 훅 문서

`usePathname` 훅은 로케일 세그먼트가 제거된 현재 Next.js 경로 이름을 반환합니다. 수동으로 로케일 접두사를 제거하지 않고도 로케일을 인식하는 탐색(예: 어떤 탐색 항목이 활성화되었는지 판단)을 구축할 때 유용합니다.

## Next.js에서 `usePathname` 가져오기

```typescript
import { usePathname } from "next-intlayer";
```

## 개요

`usePathname`은 `next/navigation`의 내장 `usePathname()`을 래핑하여 검색 매개변수를 추가하고 `getPathWithoutLocale`을 통해 로케일 접두사를 제거합니다. 클라이언트 측 탐색이 발생할 때마다 다시 렌더링됩니다. 이 훅은 클라이언트 컴포넌트에서만 사용 가능합니다(`"use client"` 필요).

## 사용법

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## 반환 값

| 유형     | 설명                                                                                  |
| -------- | ------------------------------------------------------------------------------------- |
| `string` | 로케일 접두사와 로케일 매개변수가 제거된 쿼리 매개변수를 제외한 현재 경로 이름입니다. |

## 동작 방식

- **로케일 제거**: 선행 로케일 세그먼트를 제거합니다(예: `/ko/dashboard` → `/dashboard`).
- **검색 매개변 제거**: 검색 매개변수 기반 라우팅 모드를 사용할 때 `?locale=...` 쿼리 매개변수도 제거합니다.
- **반응형**: Next.js App Router를 통한 모든 클라이언트 측 탐색 시 자동으로 업데이트됩니다.
- **SSR-안전**: 첫 렌더링 시에는 서버 측 경로 이름을 반환한 후 클라이언트에서 검색 매개변수를 동기화합니다.

## `useLocale`과의 비교

`next-intlayer`의 `useLocale`은 이미 반환 값의 일부로 `pathWithoutLocale`을 노출합니다. 경로만 필요하고 로케일 전환 기능이 필요하지 않은 경우 `usePathname`을 사용하세요.

```tsx codeFormat={["typescript", "esm"]}
// 로케일 상태와 경로가 모두 필요할 때:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// 경로만 필요할 때:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## 예시

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/settings", label: "설정" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## 관련

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useLocale.md) — 현재 로케일 + 로케일 스위처 (`pathWithoutLocale`도 노출)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md) — 이 훅에서 사용하는 기본 유틸리티

```

```

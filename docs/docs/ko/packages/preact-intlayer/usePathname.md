---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname 훅 문서 | preact-intlayer
description: preact-intlayer 패키지에서 usePathname 훅을 사용하는 방법을 알아보세요
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - 국제화
  - 문서
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
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

# Preact 통합: `usePathname` 훅 문서

`usePathname` 훅은 로케일 세그먼트가 제거된 현재 브라우저의 경로명(pathname)을 반환합니다. 이 훅은 로케일 접두사를 수동으로 제거할 필요 없이 어떤 내비게이션 항목이 활성화되어 있는지 확인하는 등 로케일 인식 내비게이션을 구축할 때 유용합니다.

## Preact에서 `usePathname` 가져오기

```typescript
import { usePathname } from "preact-intlayer";
```

## 개요

`usePathname`은 `window.location.pathname`을 읽고 `getPathWithoutLocale`을 통해 로케일 접두사를 제거합니다. 브라우저가 `popstate` 이벤트(뒤로/앞으로 가기 내비게이션)를 발생시킬 때마다 컴포넌트를 다시 렌더링합니다. 서버 사이드 렌더링(SSR) 중에는 빈 문자열을 반환합니다.

## 사용법

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

| 타입     | 설명                                                                              |
| -------- | --------------------------------------------------------------------------------- |
| `string` | 로케일 접두사가 없는 현재 경로명. 서버 사이드 렌더링(SSR) 중에는 빈 문자열입니다. |

## 동작 방식

- **로케일 제거 (Locale stripping)**: URL 앞의 로케일 세그먼트를 제거합니다(예: `/ko/dashboard` → `/dashboard`).
- **반응형**: `popstate` 이벤트(브라우저 뒤로 / 앞으로 가기 내비게이션) 시 자동으로 업데이트됩니다.
- **SSR 안전성**: `window`를 사용할 수 없을 때 `""`를 반환합니다.
- **정리 (Cleanup)**: 컴포넌트 마운트 해제 시 `popstate` 리스너가 자동으로 제거됩니다.

## 예제

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/settings", label: "설정" },
];

const Sidebar: FunctionComponent = () => {
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

## 관련 항목

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/preact-intlayer/exports.md) — 현재 로케일 + 로케일 스위처
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md) — 이 훅에서 사용되는 기본 유틸리티

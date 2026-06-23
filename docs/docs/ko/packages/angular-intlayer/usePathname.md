---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 문서 | angular-intlayer
description: angular-intlayer 패키지에서 usePathname 훅을 사용하는 방법을 확인하세요
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Angular 통합: `usePathname` Hook 문서

`usePathname` 훅은 로케일 세그먼트가 제거된 현재 브라우저 경로를 Angular `Signal<string>`로 반환합니다. 이는 로케일 접두사를 수동으로 제거할 필요 없이, 예를 들어 어떤 내비게이션 항목이 활성화되었는지 파악하는 등 로케일을 고려한 내비게이션을 구축할 때 유용합니다.

## Angular에서 `usePathname` 가져오기

```typescript
import { usePathname } from "angular-intlayer";
```

## 개요

`usePathname`은 `window.location.pathname`을 읽고, `getPathWithoutLocale`을 통해 로케일 접두사를 제거하며, 브라우저가 `popstate` 이벤트(뒤로/앞으로 가기)를 발생시킬 때마다 시그널을 업데이트합니다. 컴포넌트가 파괴될 때 이벤트 리스너를 자동으로 정리하기 위해 Angular의 `DestroyRef`를 사용합니다.

## 사용법

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## 반환 값

| 타입             | 설명                                                      |
| ---------------- | --------------------------------------------------------- |
| `Signal<string>` | 로케일 접두사가 없는 현재 경로를 포함하는 Angular 시그널. |

## 동작

- **로케일 제거**: 선행 로케일 세그먼트를 제거합니다 (예: `/ko/dashboard` → `/dashboard`).
- **반응형**: `popstate` 이벤트(브라우저 뒤로 / 앞으로 탐색)에 자동으로 업데이트됩니다.
- **SSR 안전성**: `window`를 사용할 수 없을 때는 `""`를 반환합니다.
- **정리(Cleanup)**: 호스트 컴포넌트가 파괴될 때 `DestroyRef.onDestroy`를 통해 `popstate` 리스너가 제거됩니다.

## 예제

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "대시보드" },
    { href: "/settings", label: "설정" },
  ];

  readonly pathname = usePathname();
}
```

## 관련

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/angular-intlayer/exports.md) — 현재 로케일 + 로케일 전환기
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md) — 이 훅에서 사용하는 기본 유틸리티

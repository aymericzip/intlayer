---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook 文档 | angular-intlayer
description: 了解如何在 angular-intlayer 包中使用 usePathname hook
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
    changes: "添加 usePathname 实用程序"
  - version: 8.2.0
    date: 2026-06-22
    changes: "初始化历史记录"
author: aymericzip
---

# Angular 集成：`usePathname` Hook 文档

`usePathname` hook 返回当前浏览器的路径名（已移除区域设置部分），类型为 Angular 的 `Signal<string>`。它对于构建感知区域设置的导航非常有用——例如，确定哪个导航项处于活动状态——而无需手动移除区域设置前缀。

## 在 Angular 中导入 `usePathname`

```typescript
import { usePathname } from "angular-intlayer";
```

## 概览

`usePathname` 读取 `window.location.pathname`，通过 `getPathWithoutLocale` 移除区域设置前缀，并在浏览器触发 `popstate` 事件（后退/前进导航）时更新信号。它使用 Angular 的 `DestroyRef` 在组件销毁时自动清理事件监听器。

## 使用

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

## 返回值

| 类型             | 描述                                              |
| ---------------- | ------------------------------------------------- |
| `Signal<string>` | 包含移除区域设置前缀的当前路径名的 Angular 信号。 |

## 行为

- **移除区域设置**：移除开头的区域设置部分（如 `/zh/dashboard` → `/dashboard`）。
- **响应式**：在 `popstate` 事件（浏览器的后退 / 前进导航）时自动更新。
- **SSR 安全**：当 `window` 不可用时返回 `""`。
- **清理**：当宿主组件销毁时，通过 `DestroyRef.onDestroy` 移除 `popstate` 监听器。

## 示例

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
    { href: "/dashboard", label: "仪表板" },
    { href: "/settings", label: "设置" },
  ];

  readonly pathname = usePathname();
}
```

## 相关

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/angular-intlayer/exports.md) — 当前的区域设置 + 区域设置切换器
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/intlayer/getPathWithoutLocale.md) — 此 hook 使用的底层实用程序

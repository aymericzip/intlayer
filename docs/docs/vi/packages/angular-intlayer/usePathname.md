---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu Hook usePathname | angular-intlayer
description: Xem cách sử dụng hook usePathname cho gói angular-intlayer
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
    changes: "Đã thêm tiện ích usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tích hợp Angular: Tài liệu Hook `usePathname`

Hook `usePathname` trả về đường dẫn trình duyệt hiện tại với phần ngôn ngữ (locale) đã bị loại bỏ, dưới dạng một Angular `Signal<string>`. Điều này hữu ích để xây dựng điều hướng nhận biết ngôn ngữ — ví dụ, xác định mục điều hướng nào đang hoạt động — mà không cần phải loại bỏ thủ công tiền tố ngôn ngữ.

## Nhập `usePathname` trong Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Tổng quan

`usePathname` đọc `window.location.pathname`, loại bỏ tiền tố ngôn ngữ thông qua `getPathWithoutLocale`, và cập nhật signal mỗi khi trình duyệt kích hoạt sự kiện `popstate` (điều hướng quay lại/tiến tới). Nó sử dụng `DestroyRef` của Angular để tự động dọn dẹp trình lắng nghe sự kiện khi thành phần bị hủy.

## Sử dụng

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

## Giá trị Trả về

| Loại             | Mô tả                                                             |
| ---------------- | ----------------------------------------------------------------- |
| `Signal<string>` | Signal Angular chứa đường dẫn hiện tại không có tiền tố ngôn ngữ. |

## Hành vi

- **Loại bỏ ngôn ngữ**: Loại bỏ phần ngôn ngữ ở đầu (ví dụ: `/vi/dashboard` → `/dashboard`).
- **Phản ứng**: Tự động cập nhật vào các sự kiện `popstate` (điều hướng quay lại / tiến tới của trình duyệt).
- **An toàn cho SSR**: Trả về `""` khi `window` không khả dụng.
- **Dọn dẹp**: Trình lắng nghe `popstate` bị xóa thông qua `DestroyRef.onDestroy` khi thành phần máy chủ bị hủy.

## Ví dụ

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
    { href: "/dashboard", label: "Bảng điều khiển" },
    { href: "/settings", label: "Cài đặt" },
  ];

  readonly pathname = usePathname();
}
```

## Liên quan

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/angular-intlayer/exports.md) — ngôn ngữ hiện tại + trình chuyển đổi ngôn ngữ
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) — tiện ích cơ bản được sử dụng bởi hook này

---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu Hook usePathname | solid-intlayer
description: Tìm hiểu cách sử dụng hook usePathname từ gói solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
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
    changes: "Thêm tiện ích usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tích hợp Solid: Tài liệu Hook `usePathname`

Hook `usePathname` trả về pathname của trình duyệt hiện tại với phần locale đã bị loại bỏ, dưới dạng một `Accessor<string>` của Solid. Nó hữu ích cho việc xây dựng điều hướng nhận biết locale — ví dụ, xác định mục điều hướng nào đang hoạt động — mà không cần phải loại bỏ tiền tố locale theo cách thủ công.

## Import `usePathname` trong Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Tổng quan

`usePathname` tạo ra một reactive signal được khởi tạo từ `window.location.pathname`, loại bỏ tiền tố locale thông qua `getPathWithoutLocale`, và cập nhật signal mỗi khi trình duyệt kích hoạt sự kiện `popstate` (điều hướng quay lại/tiến lên). Event listener sẽ tự động được dọn dẹp thông qua `onCleanup`.

## Sử dụng

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

## Giá trị trả về

| Kiểu dữ liệu       | Mô tả                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor của Solid (reactive getter) trả về pathname hiện tại không bao gồm tiền tố locale. |

## Hành vi

- **Loại bỏ locale**: Xóa bỏ phần locale ở đầu pathname (ví dụ: `/vi/dashboard` → `/dashboard`).
- **Reactive (Phản ứng)**: Tự động cập nhật dựa trên các sự kiện `popstate` (điều hướng quay lại / tiến lên của trình duyệt).
- **An toàn cho SSR**: Trả về `""` khi `window` không có sẵn.
- **Dọn dẹp**: `popstate` listener được loại bỏ tự động thông qua hàm `onCleanup` của Solid.

## Ví dụ

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Bảng điều khiển" },
  { href: "/settings", label: "Cài đặt" },
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

## Các tài liệu liên quan

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/solid-intlayer/useLocale.md) — locale hiện tại + bộ chuyển đổi locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) — tiện ích nền tảng được sử dụng bởi hook này

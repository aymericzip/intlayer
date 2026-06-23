---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu về Hook usePathname | next-intlayer
description: Tìm hiểu cách sử dụng hook usePathname cho gói next-intlayer
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
    changes: "Thêm tiện ích usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tích hợp Next.js: Tài liệu Hook `usePathname`

Hook `usePathname` trả về đường dẫn (pathname) Next.js hiện tại đã loại bỏ phân đoạn vùng miền (locale segment). Điều này rất hữu ích để xây dựng tính năng điều hướng nhận thức vùng miền (locale-aware) — ví dụ: để xác định xem mục điều hướng nào đang hoạt động — mà không cần phải loại bỏ tiền tố locale theo cách thủ công.

## Nhập `usePathname` trong Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Tổng quan

`usePathname` bọc hàm `usePathname()` tích hợp của Next.js từ `next/navigation`, bổ sung thêm bất kỳ tham số tìm kiếm (search params) nào và loại bỏ tiền tố vùng miền thông qua `getPathWithoutLocale`. Nó kích hoạt một quá trình render lại mỗi khi có điều hướng ở phía máy khách. Hook này chỉ có sẵn bên trong Client Components (yêu cầu `"use client"`).

## Cách sử dụng

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

## Giá trị trả về

| Kiểu     | Mô tả                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| `string` | Tên đường dẫn hiện tại đã loại bỏ tiền tố locale và loại bỏ các tham số truy vấn (query params) liên quan đến locale. |

## Hành vi

- **Xóa Locale**: Xóa phân đoạn locale ban đầu (ví dụ: `/vi/dashboard` → `/dashboard`).
- **Xóa Search Param**: Đồng thời loại bỏ tham số truy vấn `?locale=...` khi sử dụng chế độ định tuyến dựa trên tham số tìm kiếm.
- **Tính phản ứng (Reactive)**: Cập nhật tự động trên mọi lần điều hướng phía máy khách thông qua Next.js App Router.
- **An toàn với SSR**: Trả về đường dẫn từ máy chủ trong lần render đầu tiên, sau đó đồng bộ hóa tham số tìm kiếm trên máy khách.

## So sánh với `useLocale`

Hàm `useLocale` của `next-intlayer` đã tiết lộ `pathWithoutLocale` dưới dạng một phần của giá trị trả về của nó. Bạn có thể sử dụng `usePathname` khi bạn chỉ cần lấy đường dẫn và không cần chức năng chuyển đổi locale.

```tsx codeFormat={["typescript", "esm"]}
// Khi bạn cần cả trạng thái locale và đường dẫn:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Khi bạn chỉ cần lấy đường dẫn:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Ví dụ

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Bảng điều khiển" },
  { href: "/settings", label: "Cài đặt" },
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

## Liên kết liên quan

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/next-intlayer/useLocale.md) — locale hiện tại + bộ chuyển đổi locale (cũng phơi bày `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) — tiện ích cơ bản được sử dụng bởi hook này

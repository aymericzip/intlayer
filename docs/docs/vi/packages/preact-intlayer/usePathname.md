---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu về usePathname Hook | preact-intlayer
description: Xem cách sử dụng usePathname hook cho gói preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
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
    changes: "Thêm tiện ích usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tích hợp Preact: Tài liệu về `usePathname` Hook

`usePathname` hook trả về pathname (đường dẫn) trình duyệt hiện tại với phân đoạn locale đã được loại bỏ. Điều này rất hữu ích để xây dựng các điều hướng nhận biết locale — ví dụ: xác định mục điều hướng nào đang hoạt động — mà không cần phải loại bỏ thủ công tiền tố locale.

## Nhập `usePathname` trong Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Tổng quan

`usePathname` đọc `window.location.pathname`, loại bỏ tiền tố locale thông qua `getPathWithoutLocale`, và kết xuất lại (re-renders) component bất cứ khi nào trình duyệt kích hoạt sự kiện `popstate` (điều hướng quay lại/tiến tới). Trong quá trình Server-Side Rendering (SSR), nó sẽ trả về một chuỗi rỗng.

## Cách sử dụng

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

## Giá trị trả về

| Kiểu dữ liệu | Mô tả                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------- |
| `string`     | Pathname hiện tại không có tiền tố locale. Trả về chuỗi rỗng trong quá trình Server-Side Rendering (SSR). |

## Hành vi

- **Loại bỏ locale (Locale stripping)**: Xóa phân đoạn locale ở đầu URL (ví dụ: `/vi/dashboard` → `/dashboard`).
- **Phản ứng tự động (Reactive)**: Cập nhật tự động dựa trên các sự kiện `popstate` (khi điều hướng tiến / lùi trên trình duyệt).
- **An toàn với SSR (SSR-safe)**: Trả về `""` khi `window` không có sẵn.
- **Dọn dẹp (Cleanup)**: Trình lắng nghe `popstate` được loại bỏ tự động khi component bị ngắt kết nối (unmount).

## Ví dụ

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Bảng điều khiển" },
  { href: "/settings", label: "Cài đặt" },
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

## Các mục liên quan

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/preact-intlayer/exports.md) — locale hiện tại + bộ chuyển đổi locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) — tiện ích nền tảng được sử dụng bởi hook này

---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu hàm usePathname | svelte-intlayer
description: Tìm hiểu cách sử dụng hàm usePathname từ gói svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
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
    changes: "Thêm tiện ích usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tích hợp Svelte: Tài liệu `usePathname`

Hàm `usePathname` trả về pathname của trình duyệt hiện tại với phần locale đã bị loại bỏ, dưới dạng một Svelte `Readable<string>` store. Nó hữu ích cho việc xây dựng điều hướng nhận biết locale — ví dụ, xác định mục điều hướng nào đang hoạt động — mà không cần phải loại bỏ tiền tố locale theo cách thủ công.

## Import `usePathname` trong Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Tổng quan

`usePathname` tạo ra một Svelte readable store được khởi tạo từ `window.location.pathname`, loại bỏ tiền tố locale thông qua `getPathWithoutLocale`, và phát ra một giá trị mới mỗi khi trình duyệt kích hoạt sự kiện `popstate` (điều hướng quay lại/tiến lên). Đăng ký theo dõi (subscribe) bằng cú pháp `$` trong các component.

## Sử dụng

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

## Giá trị trả về

| Kiểu dữ liệu       | Mô tả                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| `Readable<string>` | Svelte readable store chứa pathname hiện tại không bao gồm tiền tố locale. |

## Hành vi

- **Loại bỏ locale**: Xóa bỏ phần locale ở đầu pathname (ví dụ: `/vi/dashboard` → `/dashboard`).
- **Phản ứng (Reactive)**: Phát ra giá trị mới trên mỗi sự kiện `popstate` (điều hướng quay lại / tiến lên của trình duyệt).
- **An toàn cho SSR**: Trả về `""` khi `window` không có sẵn.
- **Dọn dẹp**: `popstate` listener được loại bỏ tự động khi subscriber cuối cùng hủy đăng ký.

## Ví dụ

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Bảng điều khiển" },
    { href: "/settings", label: "Cài đặt" },
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

## Các tài liệu liên quan

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/svelte-intlayer/useLocale.md) — locale hiện tại + bộ chuyển đổi locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) — tiện ích nền tảng được sử dụng bởi hook này

---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu usePathname Hook | react-intlayer
description: Tìm hiểu cách sử dụng hook usePathname từ gói react-intlayer để lấy đường dẫn (pathname) của URL hiện tại mà không có phân đoạn locale.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - quốc tế hóa
slugs:
  - doc
  - packages
  - react-intlayer
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

# Tích hợp React: Tài liệu Hook `usePathname`

Hook `usePathname` từ `react-intlayer` trả về đường dẫn hiện tại của trình duyệt (pathname) với phân đoạn ngôn ngữ (locale) đã được loại bỏ. Nó dựa trên thuộc tính `window.location.pathname` gốc và phản hồi các sự kiện điều hướng của trình duyệt qua `popstate`.

## Nhập `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Tổng quan

Không giống như các hook định tuyến dành riêng cho framework (như trong `next-intlayer` hoặc `react-router`), hook này là một giải pháp gọn nhẹ, độc lập với framework dành cho các ứng dụng React thuần túy. Nó trích xuất URL hiện tại và loại bỏ bất kỳ tiền tố locale nào phù hợp (ví dụ: `/vi/about` trở thành `/about`).

## Sử dụng

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Trang chủ
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Giới thiệu
      </a>
    </nav>
  );
};

export default Navigation;
```

## Giá trị Trả về

| Kiểu     | Mô tả                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| `string` | Đường dẫn hiện tại của trình duyệt với tiền tố locale đã bị loại bỏ (ví dụ: `/vi/dashboard` → `/dashboard`). |

## Hành vi

- **Loại bỏ Locale**: Bên dưới, nó sử dụng tiện ích `getPathWithoutLocale` để tự động phát hiện và loại bỏ locale khỏi pathname dựa trên cấu hình Intlayer của ứng dụng.
- **Khả năng Phản hồi (Reactivity)**: Lắng nghe sự kiện `popstate`. Khi người dùng điều hướng bằng các nút tiến/lùi của trình duyệt hoặc khi gọi `pushState`/`replaceState`, hook sẽ cập nhật pathname được trả về.
- **SSR Fallback**: Trên server (nơi `window` là undefined), mặc định nó trả về `/` vì trong ngữ cảnh React thuần túy, mặc định nó không thể truy cập vào request URL.

## Tài liệu Liên quan

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md)

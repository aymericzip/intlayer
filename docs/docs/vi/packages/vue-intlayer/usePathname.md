---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Tài liệu hàm usePathname | vue-intlayer
description: Tìm hiểu cách sử dụng hàm usePathname từ gói vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Đa ngôn ngữ (Internationalization)
  - Tài liệu
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# Tích hợp Vue: Tài liệu `usePathname`

Hàm `usePathname` trả về pathname của trình duyệt hiện tại đã được loại bỏ phân đoạn locale, dưới dạng một `ComputedRef<string>` của Vue. Điều này rất hữu ích khi xây dựng điều hướng nhận biết locale — ví dụ: để xác định mục điều hướng nào đang hoạt động — mà không cần phải cắt bỏ tiền tố locale một cách thủ công.

## Nhập (Import) `usePathname` trong Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Tổng quan

`usePathname` tạo một computed ref trong Vue. Nó đọc `window.location.pathname`, loại bỏ tiền tố locale thông qua `getPathWithoutLocale` và cập nhật giá trị của nó mỗi khi trình duyệt kích hoạt sự kiện `popstate` (điều hướng quay lại/tiến tới). Giá trị này có thể được sử dụng trực tiếp trong các template Vue hoặc các hàm setup của bạn.

## Cách sử dụng

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Giá trị trả về

| Kiểu                  | Mô tả                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Vue Computed Ref chứa pathname hiện tại của trình duyệt nhưng không có tiền tố locale. |

## Hành vi

- **Loại bỏ Locale**: Cắt bỏ phân đoạn locale ở đầu URL (ví dụ: `/vi/dashboard` → `/dashboard`).
- **Phản ứng (Reactive)**: Cập nhật giá trị vào mỗi sự kiện `popstate` (trình duyệt điều hướng quay lại / tiến lên).
- **An toàn cho SSR**: Trả về `""` khi không có `window`.
- **Dọn dẹp (Cleanup)**: Trình lắng nghe `popstate` được thêm vào ở phạm vi toàn cục (globally) khi khởi tạo và thường không yêu cầu dọn dẹp thủ công trên mỗi component, nhờ vào cách Vue quản lý vòng đời component.

## Ví dụ

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Bảng điều khiển" },
  { href: "/settings", label: "Cài đặt" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Liên quan

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/vue-intlayer/useLocale.md) — locale hiện tại + bộ chuyển đổi locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getPathWithoutLocale.md) — tiện ích cốt lõi mà hook này đang sử dụng

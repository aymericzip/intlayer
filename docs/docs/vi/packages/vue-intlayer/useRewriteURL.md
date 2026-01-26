---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Tài liệu Composable useRewriteURL
description: Composable dành cho Vue để quản lý việc viết lại URL theo ngôn ngữ trong Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# Composable useRewriteURL

Composable `useRewriteURL` cho Vue 3 được thiết kế để xử lý việc viết lại URL theo ngôn ngữ phía client. Nó tự động chỉnh sửa URL trong trình duyệt về phiên bản địa phương "đẹp" dựa trên locale hiện tại của người dùng và cấu hình trong `intlayer.config.ts`.

Nó hoạt động bằng cách sử dụng `window.history.replaceState`, tránh kích hoạt các điều hướng Vue Router không mong muốn.

## Sử dụng

Gọi composable này bên trong hàm `setup()` của bạn hoặc trong `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Tự động sửa /fr/tests thành /fr/essais trên thanh địa chỉ nếu tồn tại quy tắc rewrite
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Cách hoạt động

1. **Giám sát phản ứng**: Composable thiết lập một `watch` trên `locale` của người dùng.
2. **Khớp Rewrite**: Mỗi khi `locale` thay đổi (hoặc khi mount), nó kiểm tra xem `window.location.pathname` hiện tại có khớp với một route chuẩn (canonical) mà có một alias địa phương đẹp hơn hay không.
3. **Sửa URL**: Nếu tìm thấy một alias đẹp hơn, composable gọi `window.history.replaceState` để cập nhật thanh địa chỉ mà không tải lại trang hoặc mất trạng thái của router.

## Tại sao nên sử dụng?

- **Tối ưu hóa SEO**: Đảm bảo các công cụ tìm kiếm lập chỉ mục phiên bản địa phương chính thức của các URL của bạn.
- **Cải thiện UX**: Sửa các URL nhập tay để phản ánh tên bạn ưa thích (ví dụ, `/fr/a-propos` thay vì `/fr/about`).
- **Ít tốn tài nguyên**: Cập nhật URL một cách im lặng mà không kích hoạt lại vòng đời component hay navigation guards.

---

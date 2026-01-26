---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Tài liệu Hook useRewriteURL
description: Hook dành cho Svelte để quản lý việc viết lại URL theo ngôn ngữ trong Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` cho Svelte được thiết kế để quản lý việc viết lại URL theo ngôn ngữ ở phía client. Nó tự động sửa URL trên trình duyệt thành phiên bản "đẹp" đã được địa phương hóa dựa trên locale hiện tại và cấu hình trong `intlayer.config.ts`.

Nó cập nhật URL một cách im lặng sử dụng `window.history.replaceState`, tránh việc điều hướng toàn bộ của SvelteKit.

## Sử dụng

Gọi hook bên trong một component Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Tự động sửa /fr/tests thành /fr/essais trên thanh địa chỉ nếu tồn tại quy tắc rewrite
  useRewriteURL();
</script>

<slot />
```

## Cách hoạt động

1. **Cập nhật phản ứng**: Hook đăng ký vào store `locale` của Intlayer.
2. **Phát hiện**: Mỗi khi locale thay đổi (hoặc khi mount), hook sẽ tính toán xem `window.location.pathname` hiện tại có một alias địa phương hóa "đẹp hơn" được định nghĩa trong các quy tắc rewrite của bạn hay không.
3. **Sửa URL**: Nếu tìm thấy đường dẫn "đẹp hơn", hook gọi `window.history.replaceState` để cập nhật thanh địa chỉ mà không reload toàn bộ trang hoặc kích hoạt logic điều hướng của SvelteKit.

## Tại sao dùng nó?

- **Thực hành tốt cho SEO**: Đảm bảo các công cụ tìm kiếm chỉ lập chỉ mục phiên bản địa phương hóa "đẹp" của URL của bạn.
- **Cải thiện UX**: Sửa các URL nhập thủ công để phản ánh cấu trúc đặt tên ưu tiên của bạn.
- **Cập nhật âm thầm**: Thay đổi thanh địa chỉ mà không ảnh hưởng đến component tree hoặc navigation history.

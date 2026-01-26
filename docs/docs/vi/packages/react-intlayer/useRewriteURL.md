---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Hook useRewriteURL
description: Hook dành cho React để quản lý việc viết lại URL có bản địa hóa trong Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` được thiết kế để quản lý việc viết lại URL có bản địa hóa ở phía client. Nó tự động phát hiện xem URL hiện tại có nên được sửa thành một phiên bản "pretty" đã bản địa hóa dựa trên locale của người dùng và các quy tắc rewrite được định nghĩa trong `intlayer.config.ts`.

Khác với điều hướng tiêu chuẩn, hook này sử dụng `window.history.replaceState` để cập nhật URL trên thanh địa chỉ mà không kích hoạt việc reload toàn bộ trang hoặc một chu trình điều hướng của router.

## Sử dụng

Chỉ cần gọi hook trong một component phía client.

```tsx
import { useRewriteURL } from "react.intlayer";

const MyComponent = () => {
  // Tự động sửa /fr/tests thành /fr/essais trên thanh địa chỉ nếu tồn tại quy tắc rewrite
  useRewriteURL();

  return <div>Thành phần của tôi</div>;
};
```

## Cách hoạt động

1. **Phát hiện**: Hook giám sát `window.location.pathname` hiện tại và `locale` của người dùng.
2. **So khớp**: Nó sử dụng engine nội bộ của Intlayer để kiểm tra xem pathname hiện tại có khớp với một canonical route mà có alias được địa phương hóa "đẹp hơn" cho locale hiện tại hay không.
3. **Sửa URL**: Nếu tìm thấy một alias tốt hơn (và nó khác với đường dẫn hiện tại), hook sẽ gọi `window.history.replaceState` để cập nhật URL trên trình duyệt trong khi vẫn giữ nguyên cùng nội dung canonical và trạng thái.

## Tại sao nên dùng?

- **SEO**: Đảm bảo người dùng luôn truy cập vào một URL chính thức và thân thiện (pretty URL) cho từng ngôn ngữ.
- **Consistency**: Ngăn ngừa các bất nhất khi người dùng nhập thủ công một đường dẫn canonical (ví dụ `/fr/privacy-notice`) thay vì phiên bản đã được địa phương hóa (`/fr/politique-de-confidentialite`).
- **Performance**: Cập nhật thanh địa chỉ mà không gây ra các side-effects không mong muốn từ router hoặc việc mount lại component.

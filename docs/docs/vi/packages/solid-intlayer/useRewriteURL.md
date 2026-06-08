---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Tài liệu Hook useRewriteURL
description: Hook dành cho Solid để quản lý việc viết lại URL theo ngôn ngữ trong Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` cho SolidJS được thiết kế để quản lý việc viết lại URL theo ngôn ngữ ở phía client. Nó tự động chỉnh sửa URL trên trình duyệt thành phiên bản "đẹp" được địa phương hóa dựa trên locale hiện tại và cấu hình trong `intlayer.config.ts`.

Bằng cách sử dụng `window.history.replaceState`, nó tránh được các điều hướng thừa của Solid Router.

## Cách sử dụng

Gọi hook này bên trong một component thuộc ứng dụng của bạn.

```tsx
import { useRewriteURL } from "solid-intlayer";

tsx;
const Layout = (props) => {
  // Tự động sửa /fr/tests thành /fr/essais trên thanh địa chỉ nếu tồn tại quy tắc rewrite
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Cách nó hoạt động

1. **Phát hiện**: Hook sử dụng `createEffect` để theo dõi thay đổi trong reactive `locale()`.
2. **So khớp**: Nó xác định xem `window.location.pathname` hiện tại có tương ứng với một canonical route mà có một bí danh được bản địa hóa "đẹp hơn" cho ngôn ngữ hiện tại hay không.
3. **Sửa URL**: Nếu tìm thấy một bí danh đẹp hơn, hook gọi `window.history.replaceState` để cập nhật thanh địa chỉ mà không ảnh hưởng đến trạng thái điều hướng nội bộ hoặc gây render lại các component.

## Tại sao nên sử dụng nó?

- **Authoritative URLs**: Thiết lập một URL duy nhất cho mỗi phiên bản nội dung được bản địa hóa, điều này rất quan trọng cho SEO.
- **Developer Convenience**: Cho phép bạn giữ các định nghĩa route nội bộ ở dạng canonical trong khi hiển thị các đường dẫn đã được bản địa hóa, thân thiện với người dùng ra bên ngoài.
- **Consistency**: Sửa URL khi người dùng nhập thủ công một đường dẫn không tuân theo các quy tắc bản địa hóa ưu tiên của bạn.

---

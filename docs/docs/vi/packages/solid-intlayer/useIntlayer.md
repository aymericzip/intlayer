---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Hook useIntlayer | solid-intlayer
description: Xem cách sử dụng hook useIntlayer cho package solid-intlayer
keywords:
  - useIntlayer
  - từ điển
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả exports
---

# Tài liệu Hook useIntlayer

Hook `useIntlayer` cho phép bạn lấy nội dung được nội địa hóa từ một từ điển bằng cách sử dụng khóa (key) tương ứng. Trong Solid, hook này trả về một hàm **accessor** phản ứng (reactive) sẽ tự động cập nhật khi trạng thái locale toàn cục thay đổi.

## Sử dụng

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Mô tả

Hook thực hiện các tác vụ sau:

1. **Phát hiện locale**: Nó sử dụng locale hiện tại từ context `IntlayerProvider`.
2. **Chèn dictionary**: Nó tự động chèn nội dung của dictionary tương ứng với key được cung cấp, sử dụng các khai báo tối ưu do Intlayer compiler sinh ra.
3. **Tính phản ứng**: Trả về một Solid accessor (`Accessor<T>`) tự động đánh giá lại khi trạng thái locale toàn cục thay đổi.
4. **Xử lý bản dịch**: nó phân giải nội dung dựa trên locale được phát hiện, xử lý bất kỳ định nghĩa `t()`, `enu()`, v.v., được tìm thấy trong từ điển.

## Tham số

- **key**: Khóa duy nhất của từ điển (như được định nghĩa trong các tệp khai báo nội dung của bạn).
- **locale** (tùy chọn): Ghi đè locale hiện tại.

## Trả về

Một hàm accessor (`() => Content`) trả về nội dung đã được địa phương hóa.

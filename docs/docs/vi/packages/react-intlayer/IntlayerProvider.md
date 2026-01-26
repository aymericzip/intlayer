---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu thành phần IntlayerProvider | react-intlayer
description: Xem cách sử dụng thành phần IntlayerProvider cho package react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu thành phần IntlayerProvider

Thành phần `IntlayerProvider` là provider chính cho Intlayer trong các ứng dụng React. Nó cung cấp context của Intlayer cho tất cả các phần tử con của nó.

## Sử dụng

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Thuộc tính (Props)

| Thuộc tính        | Kiểu                              | Mô tả                                              |
| ----------------- | --------------------------------- | -------------------------------------------------- |
| `locale`          | `LocalesValues`                   | Locale khởi tạo để sử dụng.                        |
| `defaultLocale`   | `LocalesValues`                   | Locale mặc định để sử dụng làm dự phòng.           |
| `setLocale`       | `(locale: LocalesValues) => void` | Hàm tuỳ chỉnh để thiết lập locale.                 |
| `disableEditor`   | `boolean`                         | Chỉ định có vô hiệu hóa trình chỉnh sửa hay không. |
| `isCookieEnabled` | `boolean`                         | Chỉ định có bật cookie để lưu locale hay không.    |

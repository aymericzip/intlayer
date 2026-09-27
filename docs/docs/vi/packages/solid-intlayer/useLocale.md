---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Tài liệu Hook useLocale | solid-intlayer
description: "Dùng useLocale trong Solid để đọc locale hiện tại, mặc định và khả dụng, và chuyển locale từ bất kỳ component nào."
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Hợp nhất tài liệu cho tất cả các exports"
author: aymericzip
---

# Tài liệu Hook useLocale

Hook `useLocale` cho phép bạn quản lý locale hiện tại trong ứng dụng Solid của bạn. Nó cung cấp truy cập tới locale hiện tại (dưới dạng một accessor), locale mặc định, các locale có sẵn, và một hàm để cập nhật locale.

## Sử dụng

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Mô tả

Hook trả về một object với các thuộc tính sau:

1. **locale**: Một Solid accessor (`() => string`) trả về locale hiện tại.
2. **defaultLocale**: Locale mặc định được định nghĩa trong `intlayer.config.ts`.
3. **availableLocales**: Một mảng chứa tất cả các locale được ứng dụng của bạn hỗ trợ.
4. **setLocale**: Hàm để cập nhật locale của ứng dụng. Hàm này cũng xử lý việc lưu trữ (cookies/local storage) nếu được bật.

## Tham số

- **props** (tùy chọn):
  - **onLocaleChange**: Một hàm callback được gọi mỗi khi locale thay đổi.
  - **isCookieEnabled**: Cho biết có lưu locale trong cookie hay không.

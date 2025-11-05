---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getHTMLTextDir | intlayer
description: Xem cách sử dụng hàm getHTMLTextDir cho gói intlayer
keywords:
  - getHTMLTextDir
  - dịch thuật
  - Intlayer
  - intlayer
  - Quốc tế hóa
  - Tài liệu
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getHTMLTextDir
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getHTMLTextDir` trong `intlayer`

## Mô tả

Hàm `getHTMLTextDir` xác định hướng văn bản (`ltr`, `rtl`, hoặc `auto`) dựa trên locale được cung cấp. Hàm này được thiết kế để giúp các nhà phát triển thiết lập thuộc tính `dir` trong HTML nhằm hiển thị văn bản đúng cách.

## Tham số

- `locale?: Locales`
  - **Mô tả**: Chuỗi locale (ví dụ: `Locales.ENGLISH`, `Locales.ARABIC`) được sử dụng để xác định hướng văn bản.
  - **Kiểu**: `Locales` (tùy chọn)

## Giá trị trả về

- **Kiểu**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Mô tả**: Hướng văn bản tương ứng với locale:
  - `'ltr'` cho các ngôn ngữ viết từ trái sang phải.
  - `'rtl'` cho các ngôn ngữ viết từ phải sang trái.
  - `'auto'` nếu locale không được nhận diện.

## Ví dụ sử dụng

### Xác định hướng văn bản

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Kết quả: "ltr"
getHTMLTextDir(Locales.FRENCH); // Kết quả: "ltr"
getHTMLTextDir(Locales.ARABIC); // Kết quả: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Kết quả: "ltr"
getHTMLTextDir(Locales.FRENCH); // Kết quả: "ltr"
getHTMLTextDir(Locales.ARABIC); // Kết quả: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Kết quả: "ltr"
getHTMLTextDir(Locales.FRENCH); // Kết quả: "ltr"
getHTMLTextDir(Locales.ARABIC); // Kết quả: "rtl"
```

## Các trường hợp đặc biệt

- **Không cung cấp Locale:**
  - Hàm trả về `'auto'` khi `locale` là `undefined`.

- **Locale không được nhận diện:**
  - Với các locale không được nhận diện, hàm mặc định trả về `'auto'`.

## Sử dụng trong Components:

Hàm `getHTMLTextDir` có thể được sử dụng để thiết lập thuộc tính `dir` trong tài liệu HTML một cách động nhằm hiển thị văn bản đúng hướng dựa trên locale.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Trong ví dụ trên, thuộc tính `dir` được thiết lập động dựa trên locale.

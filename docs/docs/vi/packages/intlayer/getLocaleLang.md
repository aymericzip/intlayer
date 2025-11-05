---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getLocaleLang | intlayer
description: Xem cách sử dụng hàm getLocaleLang cho gói intlayer
keywords:
  - getLocaleLang
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
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getLocaleLang` trong `intlayer`

## Mô tả

Hàm `getLocaleLang` trích xuất mã ngôn ngữ từ chuỗi locale. Nó hỗ trợ các locale có hoặc không có mã quốc gia. Nếu không cung cấp locale, hàm sẽ trả về chuỗi rỗng.

## Tham số

- `locale?: Locales`
  - **Mô tả**: Chuỗi locale (ví dụ: `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) từ đó mã ngôn ngữ được trích xuất.
  - **Kiểu**: `Locales` (tùy chọn)

## Giá trị trả về

- **Kiểu**: `string`
- **Mô tả**: Mã ngôn ngữ được trích xuất từ locale. Nếu không cung cấp locale, hàm trả về chuỗi rỗng (`''`).

## Ví dụ sử dụng

### Trích xuất mã ngôn ngữ:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Kết quả: "en"
getLocaleLang(Locales.ENGLISH); // Kết quả: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Kết quả: "fr"
getLocaleLang(Locales.FRENCH); // Kết quả: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Kết quả: "en"
getLocaleLang(Locales.ENGLISH); // Kết quả: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Kết quả: "fr"
getLocaleLang(Locales.FRENCH); // Kết quả: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Kết quả: "en"
getLocaleLang(Locales.ENGLISH); // Kết quả: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Kết quả: "fr"
getLocaleLang(Locales.FRENCH); // Kết quả: "fr"
```

## Các trường hợp đặc biệt

- **Không cung cấp Locale:**
  - Hàm trả về chuỗi rỗng khi `locale` là `undefined`.

- **Chuỗi Locale không đúng định dạng:**
  - Nếu `locale` không theo định dạng `language-country` (ví dụ: `Locales.ENGLISH-US`), hàm sẽ trả về an toàn phần trước dấu `'-'` hoặc toàn bộ chuỗi nếu không có dấu `'-'`.

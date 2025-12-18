---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getLocaleName | intlayer
description: Xem cách sử dụng hàm getLocaleName cho gói intlayer
keywords:
  - getLocaleName
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
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: Thêm polyfills cho React Native và các môi trường cũ hơn
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getLocaleName` trong `intlayer`

## Mô tả

Hàm `getLocaleName` trả về tên địa phương hóa của một locale nhất định (`targetLocale`) trong locale hiển thị (`displayLocale`). Nếu không cung cấp `targetLocale`, hàm sẽ trả về tên của `displayLocale` bằng chính ngôn ngữ của nó.

## Tham số

- `displayLocale: Locales`
  - **Mô tả**: Locale mà trong đó tên của locale đích sẽ được hiển thị.
  - **Kiểu**: Enum hoặc chuỗi đại diện cho các locale hợp lệ.

- `targetLocale?: Locales`
  - **Mô tả**: Locale mà tên của nó sẽ được địa phương hóa.
  - **Kiểu**: Tùy chọn. Enum hoặc chuỗi đại diện cho các locale hợp lệ.

## Giá trị trả về

- **Kiểu**: `string`
- **Mô tả**: Tên đã được địa phương hóa của `targetLocale` trong `displayLocale`, hoặc tên của chính `displayLocale` nếu không cung cấp `targetLocale`. Nếu không tìm thấy bản dịch, nó trả về `"Unknown locale"`.

## Ví dụ sử dụng

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Kết quả: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Kết quả: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Kết quả: "English"

getLocaleName(Locales.FRENCH); // Kết quả: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Kết quả: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Kết quả: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Kết quả: "French"

getLocaleName(Locales.CHINESE); // Kết quả: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Kết quả: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Kết quả: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Kết quả: "Chinese"

getLocaleName("unknown-locale"); // Kết quả: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

// Lấy tên ngôn ngữ theo locale mặc định (English)
getLocaleName(Locales.ENGLISH); // Kết quả: "English"
// Lấy tên ngôn ngữ English theo locale French
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Kết quả: "Anglais"
// Lấy tên ngôn ngữ English theo locale Espanol
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Kết quả: "Inglés"
// Lấy tên ngôn ngữ English theo locale English
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Kết quả: "English"

// Lấy tên ngôn ngữ French theo locale mặc định (French)
getLocaleName(Locales.FRENCH); // Kết quả: "Français"
// Lấy tên ngôn ngữ French theo locale French
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Kết quả: "Français"
// Lấy tên ngôn ngữ French theo locale Espanol
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Kết quả: "Francés"
// Lấy tên ngôn ngữ French theo locale English
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Kết quả: "French"

// Lấy tên ngôn ngữ Chinese theo locale mặc định (Chinese)
getLocaleName(Locales.CHINESE); // Kết quả: "中文"
// Lấy tên ngôn ngữ Chinese theo locale French
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Kết quả: "Chinois"
// Lấy tên ngôn ngữ Chinese theo locale Espanol
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Kết quả: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Kết quả: "Chinese"

getLocaleName("unknown-locale"); // Kết quả: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Kết quả: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Kết quả: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Kết quả: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Kết quả: "English"

getLocaleName(Locales.FRENCH); // Kết quả: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Kết quả: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Kết quả: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Kết quả: "French"

getLocaleName(Locales.CHINESE); // Kết quả: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Kết quả: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Kết quả: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Kết quả: "Chinese"

getLocaleName("unknown-locale"); // Kết quả: "Unknown locale"
```

## Các trường hợp đặc biệt

- **Không cung cấp `targetLocale`:**
  - Hàm mặc định trả về tên của chính `displayLocale`.
- **Thiếu bản dịch:**
  - Nếu `localeNameTranslations` không chứa mục cho `targetLocale` hoặc `displayLocale` cụ thể, hàm sẽ sử dụng lại `ownLocalesName` hoặc trả về `"Unknown locale"`.

## Polyfills cho React Native và các môi trường cũ hơn

Hàm `getLocaleName` phụ thuộc vào API `Intl.DisplayNames`, không có sẵn trong React Native hoặc các môi trường JavaScript cũ hơn. Nếu bạn đang sử dụng `getLocaleName` trong các môi trường này, bạn cần thêm polyfills.

Nhập polyfills sớm trong ứng dụng của bạn, lý tưởng là trong tệp điểm vào của bạn (ví dụ: `index.js`, `App.tsx` hoặc `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

Để biết thêm chi tiết, xem [tài liệu polyfills FormatJS](https://formatjs.io/docs/polyfills/intl-displaynames/).

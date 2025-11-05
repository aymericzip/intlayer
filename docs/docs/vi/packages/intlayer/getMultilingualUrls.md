---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getMultilingualUrls | intlayer
description: Xem cách sử dụng hàm getMultilingualUrls cho gói intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getMultilingualUrls` trong `intlayer`

## Mô tả

Hàm `getMultilingualUrls` tạo ra một ánh xạ các URL đa ngôn ngữ bằng cách thêm tiền tố URL đã cho với mỗi ngôn ngữ được hỗ trợ. Hàm có thể xử lý cả URL tuyệt đối và tương đối, áp dụng tiền tố ngôn ngữ phù hợp dựa trên cấu hình được cung cấp hoặc mặc định.

---

## Tham số

- `url: string`
  - **Mô tả**: Chuỗi URL gốc sẽ được thêm tiền tố ngôn ngữ.
  - **Kiểu**: `string`

- `locales: Locales[]`
  - **Mô tả**: Mảng tùy chọn các ngôn ngữ được hỗ trợ. Mặc định là các ngôn ngữ đã cấu hình trong dự án.
  - **Kiểu**: `Locales[]`
  - **Mặc định**: `localesDefault`

- `defaultLocale: Locales`
  - **Mô tả**: Ngôn ngữ mặc định cho ứng dụng. Mặc định là ngôn ngữ mặc định đã cấu hình trong dự án.
  - **Kiểu**: `Locales`
  - **Mặc định**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Mô tả**: Có thêm tiền tố cho ngôn ngữ mặc định hay không. Mặc định theo giá trị đã cấu hình trong dự án.
  - **Kiểu**: `boolean`
  - **Mặc định**: `prefixDefaultDefault`

### Trả về

- **Kiểu**: `IConfigLocales<string>`
- **Mô tả**: Một đối tượng ánh xạ mỗi ngôn ngữ với URL đa ngôn ngữ tương ứng.

---

## Ví dụ sử dụng

### URL tương đối

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Kết quả: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Kết quả: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Kết quả: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL tuyệt đối

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Kết quả: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Các trường hợp đặc biệt

- **Không có đoạn ngôn ngữ:**
  - Hàm sẽ loại bỏ bất kỳ đoạn ngôn ngữ nào đã tồn tại trong URL trước khi tạo các ánh xạ đa ngôn ngữ.

- **Ngôn ngữ mặc định:**
  - Khi `prefixDefault` là `false`, hàm sẽ không thêm tiền tố vào URL cho ngôn ngữ mặc định.

- **Ngôn ngữ không được hỗ trợ:**
  - Chỉ những ngôn ngữ được cung cấp trong mảng `locales` mới được xem xét để tạo URL.

---

## Sử dụng trong các ứng dụng

Trong một ứng dụng đa ngôn ngữ, việc cấu hình các thiết lập quốc tế hóa với `locales` và `defaultLocale` là rất quan trọng để đảm bảo ngôn ngữ hiển thị chính xác. Dưới đây là ví dụ về cách sử dụng `getMultilingualUrls` trong cấu hình ứng dụng:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Cấu hình cho các ngôn ngữ được hỗ trợ và ngôn ngữ mặc định
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Cấu hình quốc tế hóa với các ngôn ngữ được hỗ trợ và ngôn ngữ mặc định
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Cấu hình quốc tế hóa với các ngôn ngữ được hỗ trợ và ngôn ngữ mặc định
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Cấu hình trên đảm bảo rằng ứng dụng nhận diện `ENGLISH`, `FRENCH` và `SPANISH` là các ngôn ngữ được hỗ trợ và sử dụng `ENGLISH` làm ngôn ngữ dự phòng.

Sử dụng cấu hình này, hàm `getMultilingualUrls` có thể tạo động các ánh xạ URL đa ngôn ngữ dựa trên các locale được ứng dụng hỗ trợ:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Kết quả:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Kết quả:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Bằng cách tích hợp `getMultilingualUrls`, các nhà phát triển có thể duy trì cấu trúc URL nhất quán trên nhiều ngôn ngữ, nâng cao cả trải nghiệm người dùng và SEO.

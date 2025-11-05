---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getLocalizedUrl | intlayer
description: Xem cách sử dụng hàm getLocalizedUrl cho gói intlayer
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getLocalizedUrl` trong `intlayer`

## Mô tả

Hàm `getLocalizedUrl` tạo ra một URL có địa phương hóa bằng cách thêm tiền tố locale được chỉ định vào URL đã cho. Hàm xử lý cả URL tuyệt đối và tương đối, đảm bảo rằng tiền tố locale đúng được áp dụng dựa trên cấu hình.

**Tính năng chính:**

- Chỉ cần 2 tham số bắt buộc: `url` và `currentLocale`
- 3 tham số tùy chọn: `locales`, `defaultLocale`, và `prefixDefault`
- Sử dụng cấu hình quốc tế hóa của dự án bạn làm mặc định
- Có thể dùng với tham số tối thiểu cho các trường hợp đơn giản hoặc tùy chỉnh đầy đủ cho các trường hợp phức tạp

---

## Chữ ký hàm

```typescript
getLocalizedUrl(
  url: string,                   // Bắt buộc
  currentLocale: Locales,        // Bắt buộc
  locales?: Locales[],           // Tùy chọn
  defaultLocale?: Locales,       // Tùy chọn
  prefixDefault?: boolean        // Tùy chọn
): string
```

---

## Tham số

### Tham số bắt buộc

- `url: string`
  - **Mô tả**: Chuỗi URL gốc sẽ được thêm tiền tố locale.
  - **Kiểu**: `string`
  - **Bắt buộc**: Có

- `currentLocale: Locales`
  - **Mô tả**: Locale hiện tại mà URL đang được địa phương hóa.
  - **Kiểu**: `Locales`
  - **Bắt buộc**: Có

### Tham số tùy chọn

- `locales?: Locales[]`
  - **Mô tả**: Mảng các locale được hỗ trợ. Nếu không cung cấp, sẽ sử dụng các locale đã cấu hình trong cấu hình dự án của bạn.
  - **Kiểu**: `Locales[]`
  - **Bắt buộc**: Không (Tùy chọn)
  - **Mặc định**: [`Cấu hình dự án`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)

- `defaultLocale?: Locales`
  - **Mô tả**: Locale mặc định cho ứng dụng. Nếu không cung cấp, sẽ sử dụng locale mặc định đã cấu hình trong cấu hình dự án của bạn.
  - **Kiểu**: `Locales`
  - **Bắt buộc**: Không (Tùy chọn)
  - **Mặc định**: [`Cấu hình dự án`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)

- `prefixDefault?: boolean`
  - **Mô tả**: Có tiền tố URL cho locale mặc định hay không. Nếu không cung cấp, sẽ sử dụng giá trị đã cấu hình trong cấu hình dự án của bạn.
  - **Kiểu**: `boolean`
  - **Bắt buộc**: Không (Tùy chọn)
  - **Mặc định**: [`Cấu hình dự án`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)

### Trả về

- **Kiểu**: `string`
- **Mô tả**: URL đã được địa phương hóa cho locale được chỉ định.

---

## Ví dụ sử dụng

### Sử dụng cơ bản (Chỉ các tham số bắt buộc)

Khi bạn đã cấu hình dự án với các thiết lập quốc tế hóa, bạn có thể sử dụng hàm chỉ với các tham số bắt buộc:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Sử dụng cấu hình dự án của bạn cho locales, defaultLocale và prefixDefault
getLocalizedUrl("/about", Locales.FRENCH);
// Kết quả: "/fr/about" (giả sử tiếng Pháp được hỗ trợ trong cấu hình của bạn)

getLocalizedUrl("/about", Locales.ENGLISH);
// Kết quả: "/about" hoặc "/en/about" (tùy thuộc vào thiết lập prefixDefault của bạn)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Sử dụng cấu hình dự án của bạn
getLocalizedUrl("/about", Locales.FRENCH);
// Kết quả: "/fr/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Sử dụng cấu hình dự án của bạn
getLocalizedUrl("/about", Locales.FRENCH);
typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Cung cấp rõ ràng tất cả các tham số tùy chọn
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Kết quả: "/fr/about" cho locale tiếng Pháp
// Kết quả: "/about" cho locale mặc định (tiếng Anh)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Cung cấp rõ ràng tất cả các tham số tùy chọn
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Kết quả: "/fr/about" cho locale tiếng Pháp
// Kết quả: "/about" cho locale mặc định (tiếng Anh)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Cung cấp rõ ràng tất cả các tham số tùy chọn
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Kết quả: "/fr/about" cho locale tiếng Pháp
// Kết quả: "/about" cho locale mặc định (tiếng Anh)
```

### Ghi đè cấu hình một phần

Bạn cũng có thể chỉ cung cấp một số tham số tùy chọn. Hàm sẽ sử dụng cấu hình dự án của bạn cho bất kỳ tham số nào bạn không chỉ định:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Chỉ ghi đè locales, sử dụng cấu hình dự án cho defaultLocale và prefixDefault
getLocalizedUrl(
  "/about",
  Locales.SPANISH,
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH] // Chỉ định locales
);

// Chỉ ghi đè prefixDefault, sử dụng cấu hình dự án cho locales và defaultLocale
getLocalizedUrl(
  "/about",
  Locales.ENGLISH,
  undefined, // Sử dụng cấu hình dự án cho locales
  undefined, // Sử dụng cấu hình dự án cho defaultLocale
  true // Bắt buộc tiền tố cho locale mặc định
);
```

### URL tuyệt đối

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale hiện tại
  [Locales.ENGLISH, Locales.FRENCH], // Các locale được hỗ trợ
  Locales.ENGLISH, // Locale mặc định
  false // Tiền tố cho locale mặc định
); // Kết quả: "https://example.com/fr/about" cho tiếng Pháp

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale hiện tại
  [Locales.ENGLISH, Locales.FRENCH], // Các locale được hỗ trợ
  Locales.ENGLISH, // Locale mặc định
  false // Tiền tố cho locale mặc định
); // Kết quả: "https://example.com/about" cho tiếng Anh

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale hiện tại
  [Locales.ENGLISH, Locales.FRENCH], // Các locale được hỗ trợ
  Locales.ENGLISH, // Locale mặc định
  true // Tiền tố cho locale mặc định
); // Kết quả: "https://example.com/en/about" cho tiếng Anh
```

### Locale Không Hỗ Trợ

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale hiện tại
  [Locales.ENGLISH, Locales.FRENCH], // Các locale được hỗ trợ
  Locales.ENGLISH // Locale mặc định
); // Kết quả: "/about" (không áp dụng tiền tố cho locale không hỗ trợ)
```

---

## Các Trường Hợp Biên

- **Không Có Phân Đoạn Locale:**
  - Nếu URL không chứa phân đoạn locale nào, hàm sẽ an toàn thêm tiền tố locale phù hợp.

- **Locale Mặc Định:**
  - Khi `prefixDefault` là `false`, hàm sẽ không thêm tiền tố cho URL của locale mặc định.

- **Locale Không Hỗ Trợ:**
  - Đối với các locale không nằm trong danh sách `locales`, hàm sẽ không áp dụng tiền tố nào.

---

## Sử Dụng Trong Ứng Dụng

Trong một ứng dụng đa ngôn ngữ, việc cấu hình các thiết lập quốc tế hóa với `locales` và `defaultLocale` là rất quan trọng để đảm bảo ngôn ngữ hiển thị chính xác. Dưới đây là một ví dụ về cách `getLocalizedUrl` có thể được sử dụng trong cấu hình ứng dụng:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Cấu hình cho các locale được hỗ trợ và locale mặc định
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
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Cấu hình trên đảm bảo rằng ứng dụng nhận diện `ENGLISH`, `FRENCH`, và `SPANISH` là các ngôn ngữ được hỗ trợ và sử dụng `ENGLISH` làm ngôn ngữ dự phòng.

Sử dụng cấu hình này, hàm `getLocalizedUrl` có thể tạo động các URL được địa phương hóa dựa trên sở thích ngôn ngữ của người dùng:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Kết quả: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Kết quả: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Kết quả: "/about"
```

Bằng cách tích hợp `getLocalizedUrl`, các nhà phát triển có thể duy trì cấu trúc URL nhất quán trên nhiều ngôn ngữ, nâng cao trải nghiệm người dùng cũng như tối ưu hóa SEO.

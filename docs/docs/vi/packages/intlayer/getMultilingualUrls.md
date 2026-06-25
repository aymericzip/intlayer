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
    changes: "Khởi tạo lịch sử"
author: aymericzip
---

# Tài liệu: Hàm `getMultilingualUrls` trong `intlayer`

## Mô tả

Hàm `getMultilingualUrls` tạo ra một ánh xạ các URL đa ngôn ngữ bằng cách thêm tiền tố URL đã cho với mỗi ngôn ngữ được hỗ trợ. Hàm có thể xử lý cả URL tuyệt đối và tương đối, áp dụng tiền tố ngôn ngữ phù hợp dựa trên cấu hình được cung cấp hoặc mặc định.

---

## Chữ Ký Hàm

```typescript
getMultilingualUrls(
  url: string,                   // Bắt buộc
  options?: {                    // Tùy chọn
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## Tham số

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

### Tham số tùy chọn

- `options?: object`
  - **Description**: Đối tượng cấu hình cho hành vi địa phương hóa URL.
  - **Type**: `object`
  - **Required**: No (Tùy chọn)

  - `options.locales?: Locales[]`
    - **Description**: Mảng các locale được hỗ trợ. Nếu không được cung cấp, sẽ sử dụng các locale được cấu hình từ cấu hình dự án của bạn.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Locale mặc định cho ứng dụng. Nếu không được cung cấp, sẽ sử dụng locale mặc định được cấu hình từ cấu hình dự án của bạn.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Chế độ định tuyến URL cho xử lý locale. Nếu không được cung cấp, sẽ sử dụng chế độ được cấu hình từ cấu hình dự án của bạn.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Không có tiền tố cho locale mặc định, có tiền tố cho tất cả các locale khác
      - `prefix-all`: Tiền tố cho tất cả các locale bao gồm cả locale mặc định
      - `no-prefix`: Không có tiền tố locale trong URL
      - `search-params`: Sử dụng query parameters cho locale (ví dụ: `?locale=fr`)

### Trả về

- **Kiểu**: `IConfigLocales<string>`
- **Mô tả**: Một đối tượng ánh xạ mỗi ngôn ngữ với URL đa ngôn ngữ tương ứng.

---

## Ví dụ sử dụng

### Cách sử dụng cơ bản (Sử dụng cấu hình dự án)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Sử dụng cấu hình dự án của bạn cho locales, defaultLocale và mode
getMultilingualUrls("/dashboard");
// Output (giả sử cấu hình dự án có en, fr với mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL tương đối

```typescript codeFormat={["typescript", "esm", "commonjs"]}
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

### Các Chế Độ Định Tuyến Khác Nhau

```typescript
// prefix-no-default: Không có tiền tố cho ngôn ngữ mặc định
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Tiền tố cho tất cả các ngôn ngữ
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Không có tiền tố ngôn ngữ trong URL
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Ngôn ngữ làm tham số truy vấn
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
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

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

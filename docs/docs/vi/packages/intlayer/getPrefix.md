---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Tài liệu hàm getPrefix | intlayer
description: Xem cách sử dụng hàm getPrefix cho gói intlayer
keywords:
  - getPrefix
  - prefix
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Tài liệu ban đầu
---

# Tài liệu: Hàm `getPrefix` trong `intlayer`

## Mô tả

Hàm `getPrefix` xác định tiền tố URL cho một locale nhất định dựa trên cấu hình chế độ định tuyến. Nó so sánh locale với locale mặc định và trả về một đối tượng chứa ba định dạng tiền tố khác nhau để xây dựng URL linh hoạt.

**Tính năng chính:**

- Nhận một locale làm tham số đầu tiên (bắt buộc)
- Đối tượng `options` tùy chọn với `defaultLocale` và `mode`
- Trả về một đối tượng với các thuộc tính `prefix` và `localePrefix`
- Hỗ trợ tất cả các chế độ định tuyến: `prefix-no-default`, `prefix-all`, `no-prefix`, và `search-params`
- Công cụ nhẹ để xác định khi nào cần thêm tiền tố locale

---

## Chữ ký hàm

```typescript
getPrefix(
  locale: Locales,               // Bắt buộc
  options?: {                    // Tùy chọn
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // ví dụ: 'fr/' hoặc ''
  localePrefix?: Locale; // ví dụ: 'fr' hoặc undefined
}
```

---

## Tham số

- `locale: Locales`
  - **Mô tả**: Locale để tạo tiền tố. Nếu giá trị là falsy (undefined, null, chuỗi rỗng), hàm sẽ trả về chuỗi rỗng.
  - **Kiểu**: `Locales`
  - **Bắt buộc**: Có

- `options?: object`
  - **Mô tả**: Đối tượng cấu hình để xác định tiền tố.
  - **Kiểu**: `object`
  - **Bắt buộc**: Không (Tùy chọn)

  - `options.defaultLocale?: Locales`
    - **Mô tả**: Locale mặc định cho ứng dụng. Nếu không cung cấp, sẽ sử dụng locale mặc định được cấu hình trong cấu hình dự án của bạn.
    - **Kiểu**: `Locales`
    - **Mặc định**: [`Cấu hình dự án`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Mô tả**: Chế độ định tuyến URL cho việc xử lý locale. Nếu không được cung cấp, sẽ sử dụng chế độ đã cấu hình trong cấu hình dự án của bạn.
    - **Kiểu**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Mặc định**: [`Cấu hình dự án`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md#middleware)
    - **Chế độ**:
      - `prefix-no-default`: Trả về chuỗi rỗng khi locale trùng với locale mặc định
      - `prefix-all`: Trả về tiền tố cho tất cả các locale bao gồm cả mặc định
      - `no-prefix`: Trả về chuỗi rỗng (không có tiền tố trong URL)
      - `search-params`: Trả về chuỗi rỗng (locale trong tham số truy vấn)

### Trả về

- **Kiểu**: `GetPrefixResult`
- **Mô tả**: Một đối tượng chứa ba định dạng tiền tố khác nhau:
  - `prefix`: Tiền tố đường dẫn có dấu gạch chéo ở cuối (ví dụ: `'fr/'`, `''`)
  - `localePrefix`: Định danh locale không có dấu gạch chéo (ví dụ: `'fr'`, `undefined`)

---

## Ví dụ sử dụng

### Sử dụng cơ bản

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Kiểm tra tiền tố cho locale tiếng Anh
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Trả về: { prefix: 'en/', localePrefix: 'en' }

// Kiểm tra tiền tố cho locale tiếng Pháp
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Trả về: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Trả về: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Trả về: { prefix: '', localePrefix: undefined }
```

### Các chế độ định tuyến khác nhau

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Luôn trả về tiền tố
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Trả về: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Không có tiền tố khi locale trùng với mặc định
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Trả về: { prefix: '', localePrefix: undefined }

// prefix-no-default: Trả về tiền tố khi locale khác với mặc định
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Trả về: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Không bao giờ trả về tiền tố
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Trả về: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Trả về: { prefix: '', localePrefix: undefined }
```

### Ví dụ Thực tế

```typescript
import { getPrefix, Locales } from "intlayer";

// Xây dựng URL với tiền tố phù hợp cho một locale cụ thể
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Sử dụng prefix để xây dựng đường dẫn
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Kết quả: "/fr/about"

// Sử dụng localePrefix để nhận diện locale
console.log(`Current locale: ${localePrefix}`);
// Kết quả: "Current locale: fr"
```

---

## Các Hàm Liên Quan

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getLocalizedUrl.md): Tạo URL có địa phương hóa cho một locale cụ thể
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/intlayer/getMultilingualUrls.md): Tạo các URL cho tất cả các locale đã cấu hình

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Tiền tố đường dẫn có dấu gạch chéo ở cuối (ví dụ: 'fr/' hoặc '')
  localePrefix?: Locale; // Định danh locale không có dấu gạch chéo (ví dụ: 'fr' hoặc undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```

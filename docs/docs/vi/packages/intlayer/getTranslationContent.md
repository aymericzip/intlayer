---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hàm getTranslation - Tài liệu JavaScript của Intlayer
description: Tài liệu cho hàm getTranslation trong Intlayer, hàm này lấy nội dung đã được bản địa hóa cho các locale cụ thể với phương án dự phòng là locale mặc định.
keywords:
  - getTranslation
  - intlayer
  - function
  - localization
  - i18n
  - JavaScript
  - translation
  - locale
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getTranslation` trong `intlayer`

## Mô tả

Hàm `getTranslation` lấy nội dung tương ứng với một locale cụ thể từ một tập hợp nội dung ngôn ngữ có thể tùy chỉnh. Nếu locale được chỉ định không được tìm thấy, hàm sẽ mặc định trả về nội dung của locale mặc định được cấu hình trong dự án.

## Tham số

- `languageContent: CustomizableLanguageContent<Content>`
  - **Mô tả**: Một đối tượng chứa các bản dịch cho nhiều locale khác nhau. Mỗi khóa đại diện cho một locale, và giá trị của nó là nội dung tương ứng.
  - **Kiểu**: `CustomizableLanguageContent<Content>`
    - `Content` có thể là bất kỳ kiểu nào, mặc định là `string`.

- `locale: Locales`
  - **Mô tả**: Locale mà nội dung cần được lấy.
  - **Kiểu**: `Locales`

## Trả về

- **Kiểu**: `Content`
- **Mô tả**: Nội dung tương ứng với locale được chỉ định. Nếu locale không được tìm thấy, nội dung của locale mặc định sẽ được trả về.

## Ví dụ sử dụng

### Sử dụng cơ bản

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Kết quả: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Kết quả: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
  },
  Locales.ENGLISH
);

console.log(content); // Kết quả: "Bonjour"
```

### Thiếu Locale:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Kết quả: "Hello" (nội dung locale mặc định)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Kết quả: "Hello" (nội dung locale mặc định)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Kết quả: "Hello" (nội dung locale mặc định)
```

### Sử dụng các loại nội dung tùy chỉnh:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Kết quả: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Kết quả: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Kết quả: "Bonjour"
```

## Các Trường Hợp Ngoại Lệ

- **Không Tìm Thấy Locale:**
  - Khi `locale` không được tìm thấy trong `languageContent`, hàm sẽ trả về nội dung của locale mặc định.
- **Nội Dung Ngôn Ngữ Không Đầy Đủ:**
  - Nếu một locale được định nghĩa một phần, hàm sẽ không gộp nội dung. Nó chỉ lấy giá trị của locale được chỉ định hoặc quay về locale mặc định.
- **Kiểm Soát Bắt Buộc của TypeScript:**
  - Nếu các locales trong `languageContent` không khớp với cấu hình dự án, TypeScript sẽ bắt buộc tất cả các locales cần thiết phải được định nghĩa, đảm bảo nội dung đầy đủ và an toàn về kiểu dữ liệu.

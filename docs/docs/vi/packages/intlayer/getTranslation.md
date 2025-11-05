---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Tài liệu hàm getTranslation | intlayer
description: Xem cách sử dụng hàm getTranslation cho gói intlayer
keywords:
  - getTranslation
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
  - getTranslation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `getTranslationContent` trong `intlayer`

## Mô tả

Hàm `getTranslationContent` lấy nội dung tương ứng với một locale cụ thể từ một tập hợp nội dung ngôn ngữ có thể tùy chỉnh. Nếu locale được chỉ định không được tìm thấy, hàm sẽ mặc định trả về nội dung của locale mặc định được cấu hình trong dự án.

## Tham số

- `languageContent: CustomizableLanguageContent<Content>`
  - **Mô tả**: Một đối tượng chứa các bản dịch cho nhiều locale khác nhau. Mỗi khóa đại diện cho một locale, và giá trị của nó là nội dung tương ứng.
  - **Kiểu**: `CustomizableLanguageContent<Content>`
    - `Content` có thể là bất kỳ kiểu nào, mặc định là `string`.

- `locale: Locales`
  - **Mô tả**: Locale mà nội dung cần được lấy.
  - **Kiểu**: `Locales`

## Giá trị trả về

- **Kiểu**: `Content`
- **Mô tả**: Nội dung tương ứng với locale được chỉ định. Nếu locale không được tìm thấy, nội dung của locale mặc định sẽ được trả về.

## Ví dụ sử dụng

### Sử dụng cơ bản

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Kết quả: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Kết quả: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Kết quả: "Bonjour"
```

### Thiếu Locale:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Kết quả: "Hello" (nội dung locale mặc định)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Kết quả: "Hello" (nội dung locale mặc định)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Kết quả: "Hello" (nội dung locale mặc định)
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
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
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Kết quả: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Kết quả: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Kết quả: "Bonjour"
```

## Các trường hợp đặc biệt

- **Không tìm thấy Locale:**
  - Khi `locale` không được tìm thấy trong `languageContent`, hàm sẽ trả về nội dung của locale mặc định.
- **Nội dung ngôn ngữ không đầy đủ:**
  - Nếu một locale được định nghĩa một phần, hàm sẽ không gộp nội dung. Nó chỉ lấy giá trị của locale được chỉ định hoặc quay về mặc định.
- **Kiểm tra TypeScript:**
  - Nếu các locale trong `languageContent` không khớp với cấu hình dự án, TypeScript sẽ bắt buộc tất cả các locale cần thiết phải được định nghĩa, đảm bảo nội dung đầy đủ và an toàn kiểu dữ liệu.

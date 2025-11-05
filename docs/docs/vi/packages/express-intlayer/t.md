---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Tài liệu hàm t | express-intlayer
description: Xem cách sử dụng hàm t cho gói express-intlayer
keywords:
  - t
  - dịch thuật
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `t` trong `express-intlayer`

Hàm `t` trong gói `express-intlayer` là tiện ích cốt lõi để cung cấp các phản hồi được địa phương hóa trong ứng dụng Express của bạn. Nó đơn giản hóa việc quốc tế hóa (i18n) bằng cách chọn nội dung một cách động dựa trên ngôn ngữ ưu tiên của người dùng.

---

## Tổng quan

Hàm `t` được sử dụng để định nghĩa và truy xuất các bản dịch cho một tập hợp ngôn ngữ nhất định. Nó tự động xác định ngôn ngữ phù hợp để trả về dựa trên cài đặt yêu cầu của client, chẳng hạn như header `Accept-Language`. Nếu ngôn ngữ ưu tiên không có sẵn, nó sẽ tự động chuyển về locale mặc định được chỉ định trong cấu hình của bạn một cách mượt mà.

---

## Các tính năng chính

- **Địa phương hóa động**: Tự động chọn bản dịch phù hợp nhất cho client.
- **Chuyển về locale mặc định**: Chuyển về locale mặc định nếu ngôn ngữ ưu tiên của client không có sẵn, đảm bảo trải nghiệm người dùng liên tục.
- **Nhẹ và nhanh**: Thiết kế cho các ứng dụng hiệu năng cao, đảm bảo chi phí tài nguyên tối thiểu.
- **Hỗ trợ Chế độ Nghiêm ngặt**: Thực thi tuân thủ nghiêm ngặt các locale đã khai báo để đảm bảo hành vi đáng tin cậy.

---

## Chữ ký Hàm

```typescript
t(translations: Record<string, string>): string;
```

### Tham số

- `translations`: Một đối tượng trong đó các khóa là mã locale (ví dụ: `en`, `fr`, `es-MX`) và các giá trị là các chuỗi đã được dịch tương ứng.

### Trả về

- Một chuỗi đại diện cho nội dung theo ngôn ngữ ưu tiên của client.

---

## Tải Bộ Xử lý Yêu cầu Quốc tế hóa

Để đảm bảo chức năng quốc tế hóa do `express-intlayer` cung cấp hoạt động chính xác, bạn **phải** tải middleware quốc tế hóa ở đầu ứng dụng Express của bạn. Điều này kích hoạt hàm `t` và đảm bảo xử lý đúng việc phát hiện locale và dịch thuật.

Đặt middleware `app.use(intlayer())` **trước bất kỳ route nào** trong ứng dụng của bạn để đảm bảo tất cả các route đều được hưởng lợi từ tính năng quốc tế hóa:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Tải bộ xử lý yêu cầu quốc tế hóa
app.use(intlayer());

// Định nghĩa các route sau khi đã tải middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Tải bộ xử lý yêu cầu quốc tế hóa
app.use(intlayer());

// Định nghĩa các route sau khi đã tải middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Tải bộ xử lý yêu cầu quốc tế hóa
app.use(intlayer());

// Định nghĩa các route sau khi đã tải middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Tại sao điều này là cần thiết

- **Phát hiện ngôn ngữ**: Middleware `intlayer` xử lý các yêu cầu đến để phát hiện ngôn ngữ ưu tiên của người dùng dựa trên headers, cookies hoặc các phương pháp cấu hình khác.
- **Ngữ cảnh dịch thuật**: Thiết lập ngữ cảnh cần thiết để hàm `t` hoạt động chính xác, đảm bảo các bản dịch được trả về đúng ngôn ngữ.
- **Ngăn ngừa lỗi**: Nếu không có middleware này, việc sử dụng hàm `t` sẽ gây ra lỗi thời gian chạy vì thông tin ngôn ngữ cần thiết sẽ không có sẵn.

---

## Ví dụ sử dụng

### Ví dụ cơ bản

Phục vụ nội dung được địa phương hóa bằng các ngôn ngữ khác nhau:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Yêu cầu từ phía client:**

- Một client với `Accept-Language: fr` sẽ nhận được `Bienvenue!`.
- Một client với `Accept-Language: es` sẽ nhận được `¡Bienvenido!`.
- Một client với `Accept-Language: de` sẽ nhận được `Welcome!` (ngôn ngữ mặc định).

### Xử lý lỗi

Cung cấp thông báo lỗi bằng nhiều ngôn ngữ:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Sử dụng các biến thể ngôn ngữ

Chỉ định các bản dịch cho các biến thể ngôn ngữ cụ thể:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Các Chủ Đề Nâng Cao

### Cơ Chế Dự Phòng (Fallback Mechanism)

Nếu một locale ưu tiên không có sẵn, hàm `t` sẽ tự động chuyển sang locale mặc định được định nghĩa trong cấu hình:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
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

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
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

Ví dụ:

- Nếu `defaultLocale` là `Locales.CHINESE` và một client yêu cầu `Locales.DUTCH`, bản dịch trả về sẽ mặc định là giá trị của `Locales.CHINESE`.
- Nếu `defaultLocale` không được định nghĩa, hàm `t` sẽ tự động chuyển sang giá trị của `Locales.ENGLISH`.

---

### Bắt Buộc Chế Độ Strict

Cấu hình hàm `t` để bắt buộc tuân thủ nghiêm ngặt các locale đã khai báo:

| Chế độ      | Hành vi                                                                                |
| ----------- | -------------------------------------------------------------------------------------- |
| `strict`    | Tất cả các locale đã khai báo phải có bản dịch. Thiếu locale sẽ gây lỗi.               |
| `inclusive` | Các locale đã khai báo phải có bản dịch. Thiếu locale sẽ cảnh báo nhưng vẫn chấp nhận. |
| `loose`     | Bất kỳ locale nào tồn tại đều được chấp nhận, kể cả khi không được khai báo.           |

Ví dụ cấu hình:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Cấu hình hiện có của bạn
  internationalization: {
    // ... Cấu hình quốc tế hóa hiện có của bạn
    strictMode: "strict", // Bắt buộc chế độ nghiêm ngặt
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Cấu hình hiện có của bạn
  internationalization: {
    // ... Cấu hình quốc tế hóa hiện có của bạn
    strictMode: "strict", // Bắt buộc chế độ nghiêm ngặt
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Cấu hình hiện có của bạn
  internationalization: {
    // ... Cấu hình quốc tế hóa hiện có của bạn
    strictMode: "strict", // Bắt buộc chế độ nghiêm ngặt
  },
};

module.exports = config;
```

---

### Tích hợp TypeScript

Hàm `t` an toàn về kiểu khi sử dụng với TypeScript. Định nghĩa một đối tượng bản dịch an toàn về kiểu:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Các lỗi phổ biến và cách khắc phục

| Vấn đề                  | Nguyên nhân                                         | Giải pháp                                                |
| ----------------------- | --------------------------------------------------- | -------------------------------------------------------- |
| Hàm `t` không hoạt động | Middleware chưa được tải                            | Đảm bảo `app.use(intlayer())` được thêm trước các route. |
| Lỗi thiếu bản dịch      | Chế độ Strict được bật nhưng không có đủ các locale | Cung cấp đầy đủ các bản dịch cần thiết.                  |

---

## Mẹo sử dụng hiệu quả

1. **Tập trung quản lý bản dịch**: Sử dụng một module tập trung hoặc các file JSON để quản lý bản dịch nhằm cải thiện khả năng bảo trì.
2. **Xác thực bản dịch**: Đảm bảo mỗi biến thể ngôn ngữ đều có bản dịch tương ứng để tránh việc fallback không cần thiết.
3. **Kết hợp với i18n phía frontend**: Đồng bộ hóa với hệ thống quốc tế hóa phía frontend để mang lại trải nghiệm người dùng liền mạch trên toàn ứng dụng.
4. **Đánh giá hiệu năng**: Kiểm tra thời gian phản hồi của ứng dụng khi thêm bản dịch để đảm bảo ảnh hưởng tối thiểu.

---

## Kết luận

Hàm `t` là một công cụ mạnh mẽ cho việc quốc tế hóa backend. Bằng cách sử dụng hiệu quả, bạn có thể tạo ra một ứng dụng thân thiện với người dùng và bao quát hơn cho đối tượng toàn cầu. Để biết cách sử dụng nâng cao và các tùy chọn cấu hình chi tiết, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

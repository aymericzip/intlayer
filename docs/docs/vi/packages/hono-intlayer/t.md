---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Tài liệu hàm t | hono-intlayer
description: Xem cách sử dụng hàm t cho gói hono-intlayer
keywords:
  - t
  - dịch
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Khởi tạo lịch sử
---

# Tài liệu: Hàm `t` trong `hono-intlayer`

Hàm `t` trong gói `hono-intlayer` là công cụ cốt lõi để cung cấp các phản hồi được bản địa hóa trong ứng dụng Hono của bạn. Nó đơn giản hóa việc quốc tế hóa (i18n) bằng cách tự động chọn nội dung dựa trên ngôn ngữ ưu tiên của người dùng.

---

## Tổng quan

Hàm `t` được sử dụng để định nghĩa và lấy bản dịch cho một tập hợp các ngôn ngữ nhất định. Nó tự động xác định ngôn ngữ phù hợp để trả về dựa trên cài đặt yêu cầu của ứng dụng khách, chẳng hạn như tiêu đề `Accept-Language`. Nếu ngôn ngữ ưu tiên không có sẵn, nó sẽ chuyển sang ngôn ngữ mặc định được chỉ định trong cấu hình của bạn.

---

## Các tính năng chính

- **Bản địa hóa động**: Tự động chọn bản dịch phù hợp nhất cho ứng dụng khách.
- **Chuyển sang ngôn ngữ mặc định**: Chuyển sang ngôn ngữ mặc định nếu ngôn ngữ ưu tiên của ứng dụng khách không có sẵn, đảm bảo tính liên tục trong trải nghiệm người dùng.
- **Nhẹ và nhanh**: Được thiết kế cho các ứng dụng hiệu suất cao, đảm bảo chi phí tối thiểu.
- **Hỗ trợ chế độ nghiêm ngặt**: Thực thi việc tuân thủ nghiêm ngặt các ngôn ngữ đã khai báo để có hành vi đáng tin cậy.

---

## Chữ ký hàm

```typescript
t(translations: Record<string, string>): string;
```

### Tham số

- `translations`: Một đối tượng trong đó các khóa là mã ngôn ngữ (ví dụ: `en`, `fr`, `vi`) và các giá trị là các chuỗi dịch tương ứng.

### Trả về

- Một chuỗi đại diện cho nội dung bằng ngôn ngữ ưu tiên của ứng dụng khách.

---

## Tải Trình xử lý yêu cầu quốc tế hóa

Để đảm bảo chức năng quốc tế hóa do `hono-intlayer` cung cấp hoạt động chính xác, bạn **phải** tải middleware quốc tế hóa vào đầu ứng dụng Hono của mình. Điều này kích hoạt hàm `t` và đảm bảo xử lý đúng việc phát hiện ngôn ngữ và dịch thuật.

Đặt middleware `app.use("*", intlayer())` **trước bất kỳ tuyến đường nào** trong ứng dụng của bạn để đảm bảo tất cả các tuyến đường đều được hưởng lợi từ việc quốc tế hóa:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Tải trình xử lý yêu cầu quốc tế hóa
app.use("*", intlayer());

// Định nghĩa các tuyến đường sau khi tải middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      vi: "Xin chào thế giới!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Tải trình xử lý yêu cầu quốc tế hóa
app.use("*", intlayer());

// Định nghĩa các tuyến đường sau khi tải middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      vi: "Xin chào thế giới!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Tải trình xử lý yêu cầu quốc tế hóa
app.use("*", intlayer());

// Định nghĩa các tuyến đường sau khi tải middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      vi: "Xin chào thế giới!",
    })
  );
});
```

### Tại sao điều này là bắt buộc

- **Phát hiện ngôn ngữ**: Middleware `intlayer` xử lý các yêu cầu đến để phát hiện ngôn ngữ ưu tiên của người dùng dựa trên tiêu đề, cookie hoặc các phương pháp cấu hình khác.
- **Ngữ cảnh dịch thuật**: Thiết lập ngữ cảnh cần thiết để hàm `t` hoạt động chính xác, đảm bảo rằng các bản dịch được trả về đúng ngôn ngữ.
- **Ngăn ngừa lỗi**: Nếu không có middleware này, việc sử dụng hàm `t` sẽ dẫn đến lỗi thời gian chạy vì thông tin ngôn ngữ cần thiết sẽ không có sẵn.

---

## Ví dụ sử dụng

### Ví dụ cơ bản

Cung cấp nội dung được bản địa hóa bằng các ngôn ngữ khác nhau:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      vi: "Chào mừng!",
    })
  );
});
```

**Yêu cầu của ứng dụng khách:**

- Ứng dụng khách có `Accept-Language: fr` sẽ nhận được `Bienvenue!`.
- Ứng dụng khách có `Accept-Language: vi` sẽ nhận được `Chào mừng!`.
- Ứng dụng khách có `Accept-Language: de` sẽ nhận được `Welcome!` (ngôn ngữ mặc định).

### Xử lý lỗi

Cung cấp thông báo lỗi bằng nhiều ngôn ngữ:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      vi: "Đã xảy ra lỗi không mong muốn.",
    }),
    500
  );
});
```

---

### Sử dụng các biến thể ngôn ngữ

Chỉ định bản dịch cho các biến thể ngôn ngữ cụ thể:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      vi: "Xin chào!",
    })
  );
});
```

---

## Các chủ đề nâng cao

### Cơ chế chuyển đổi dự phòng (Fallback)

Nếu ngôn ngữ ưu tiên không có sẵn, hàm `t` sẽ chuyển sang ngôn ngữ mặc định được định nghĩa trong cấu hình:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.VIETNAMESE],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Thực thi chế độ nghiêm ngặt

Cấu hình hàm `t` để thực thi việc tuân thủ nghiêm ngặt các ngôn ngữ đã khai báo:

| Chế độ      | Hành vi                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| `strict`    | Tất cả các ngôn ngữ đã khai báo phải có bản dịch được cung cấp. Ngôn ngữ thiếu sẽ gây lỗi.                |
| `inclusive` | Các ngôn ngữ đã khai báo phải có bản dịch. Ngôn ngữ thiếu sẽ kích hoạt cảnh báo nhưng vẫn được chấp nhận. |
| `loose`     | Bất kỳ ngôn ngữ hiện có nào cũng được chấp nhận, ngay cả khi không được khai báo.                         |

---

### Tích hợp TypeScript

Hàm `t` an toàn về kiểu khi được sử dụng với TypeScript. Định nghĩa một đối tượng bản dịch an toàn về kiểu:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  vi: "Chào buổi sáng!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Các lỗi thường gặp và cách khắc phục

| Vấn đề                  | Nguyên nhân                                         | Giải pháp                                                           |
| ----------------------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| Hàm `t` không hoạt động | Middleware chưa được tải                            | Đảm bảo `app.use("*", intlayer())` được thêm trước các tuyến đường. |
| Lỗi thiếu bản dịch      | Chế độ nghiêm ngặt được bật mà không có đủ ngôn ngữ | Cung cấp tất cả các bản dịch được yêu cầu.                          |

---

## Kết luận

Hàm `t` là một công cụ mạnh mẽ để quốc tế hóa backend. Bằng cách sử dụng nó một cách hiệu quả, bạn có thể tạo ra một ứng dụng toàn diện và thân thiện với người dùng hơn cho khán giả toàn cầu. Để biết thêm cách sử dụng nâng cao và các tùy chọn cấu hình chi tiết, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

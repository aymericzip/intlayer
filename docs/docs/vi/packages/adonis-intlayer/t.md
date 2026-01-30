---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Tài liệu hàm t | adonis-intlayer
description: Xem cách sử dụng hàm t cho gói adonis-intlayer
keywords:
  - t
  - dịch
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Tài liệu ban đầu
---

# Tài liệu: Hàm `t` trong `adonis-intlayer`

Hàm `t` trong gói `adonis-intlayer` là tiện ích cốt lõi để cung cấp các phản hồi được bản địa hóa trong ứng dụng AdonisJS của bạn. Nó đơn giản hóa việc quốc tế hóa (i18n) bằng cách tự động chọn nội dung dựa trên ngôn ngữ ưa thích của người dùng.

---

## Tổng quan

Hàm `t` được sử dụng để định nghĩa và truy xuất bản dịch cho một tập hợp ngôn ngữ nhất định. Nó tự động xác định ngôn ngữ thích hợp để trả về dựa trên cài đặt yêu cầu của khách hàng, chẳng hạn như tiêu đề `Accept-Language`. Nếu ngôn ngữ ưa thích không có sẵn, nó sẽ tự động chuyển về ngôn ngữ mặc định được chỉ định trong cấu hình của bạn.

---

## Các tính năng chính

- **Bản địa hóa động**: Tự động chọn bản dịch phù hợp nhất cho khách hàng.
- **Chuyển về ngôn ngữ mặc định (Fallback)**: Chuyển về ngôn ngữ mặc định nếu ngôn ngữ ưa thích của khách hàng không có sẵn, đảm bảo tính liên tục trong trải nghiệm người dùng.
- **Ngữ cảnh bất đồng bộ**: Hoạt động liền mạch trong vòng đời yêu cầu AdonisJS bằng cách sử dụng Async Local Storage.
- **Hỗ trợ TypeScript**: Áp dụng an toàn kiểu cho các bản dịch của bạn.

---

## Chữ ký hàm

```typescript
t(translations: Record<string, any>): any;
```

### Tham số

- `translations`: Một đối tượng trong đó các khóa là mã ngôn ngữ (ví dụ: `en`, `fr`, `es`) và các giá trị là nội dung dịch tương ứng.

### Trả về

- Nội dung đại diện cho ngôn ngữ ưa thích của khách hàng.

---

## Tải Middleware

Để đảm bảo rằng hàm `t` hoạt động chính xác, bạn **phải** đăng ký middleware `intlayer` trong ứng dụng AdonisJS của mình.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Ví dụ sử dụng

### Ví dụ cơ bản

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Sử dụng trong Controller

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour từ controller",
      })
    );
  }
}
```

---

## Chủ đề nâng cao

### Cơ chế Fallback

Nếu ngôn ngữ ưa thích không có sẵn, hàm `t` sẽ chuyển về ngôn ngữ mặc định được xác định trong `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Tích hợp TypeScript

Hàm `t` an toàn về kiểu khi được sử dụng với các từ điển đã định nghĩa. Để biết thêm chi tiết, hãy tham khảo [tài liệu TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

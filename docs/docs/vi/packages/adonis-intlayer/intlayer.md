---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Tài liệu Middleware intlayer cho AdonisJS | adonis-intlayer
description: Xem cách sử dụng middleware intlayer cho gói adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Tài liệu ban đầu
---

# Tài liệu Middleware intlayer cho AdonisJS

Middleware `intlayer` cho AdonisJS phát hiện ngôn ngữ của người dùng và cung cấp các hàm dịch thông qua ngữ cảnh yêu cầu. Nó cũng cho phép sử dụng các hàm dịch toàn cục trong luồng yêu cầu.

## Cách sử dụng

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Mô tả

Middleware thực hiện các nhiệm vụ sau:

1. **Phát hiện ngôn ngữ**: Nó phân tích yêu cầu (tiêu đề, cookie, v.v.) để xác định ngôn ngữ ưa thích của người dùng.
2. **Thiết lập ngữ cảnh**: Nó điền thông tin ngôn ngữ vào ngữ cảnh yêu cầu.
3. **Async Local Storage**: Nó sử dụng `cls-hooked` để quản lý ngữ cảnh bất đồng bộ, cho phép các hàm Intlayer toàn cục như `t`, `getIntlayer` và `getDictionary` truy cập ngôn ngữ cụ thể của yêu cầu mà không cần truyền thủ công.

> Lưu ý: Để sử dụng cookie để phát hiện ngôn ngữ, hãy đảm bảo `@adonisjs/cookie` được cấu hình và sử dụng trong ứng dụng của bạn.

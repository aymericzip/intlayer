---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Tài liệu Middleware intlayer cho Hono | hono-intlayer
description: Xem cách sử dụng middleware intlayer cho gói hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Khởi tạo tài liệu
---

# Tài liệu Middleware intlayer cho Hono

Middleware `intlayer` cho Hono phát hiện ngôn ngữ của người dùng và điền vào đối tượng ngữ cảnh các hàm Intlayer. Nó cũng cho phép sử dụng các hàm dịch toàn cục trong ngữ cảnh yêu cầu.

## Sử dụng

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    vi: "Xin chào",
  });

  return c.text(content);
});
```

## Mô tả

Middleware thực hiện các nhiệm vụ sau:

1. **Phát hiện ngôn ngữ**: Phân tích yêu cầu (tiêu đề, cookie, v.v.) để xác định ngôn ngữ ưu tiên của người dùng.
2. **Điền thông tin ngữ cảnh**: Thêm dữ liệu Intlayer vào ngữ cảnh Hono, có thể truy cập qua `c.get()`. Điều này bao gồm:
   - `locale`: Ngôn ngữ được phát hiện.
   - `t`: Một hàm dịch.
   - `getIntlayer`: Một hàm để lấy từ điển.
   - `getDictionary`: Một hàm để xử lý các đối tượng từ điển.
3. **Quản lý ngữ cảnh**: Sử dụng `cls-hooked` để quản lý một ngữ cảnh không đồng bộ, cho phép các hàm Intlayer toàn cục (`t`, `getIntlayer`, `getDictionary`) truy cập vào ngôn ngữ cụ thể của yêu cầu mà không cần truyền đối tượng ngữ cảnh.

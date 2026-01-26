---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Middleware intlayer cho Express | express-intlayer
description: Xem cách sử dụng middleware intlayer cho package express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Tài liệu
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu Middleware intlayer cho Express

Middleware `intlayer` cho Express xác định locale của người dùng và cung cấp các hàm dịch thông qua đối tượng `res.locals`. Nó cũng cho phép sử dụng các hàm `t` và `getIntlayer` trong suốt các request handler của bạn.

## Cách sử dụng

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    vi: "Xin chào",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Mô tả

Middleware thực hiện các nhiệm vụ sau:

1. **Phát hiện locale**: Nó kiểm tra cookies, headers (như `Accept-Language`), và tham số URL để xác định locale của người dùng.
2. **Thiết lập context**: nó gán `res.locals` với:
   - `locale`: Locale được phát hiện.
   - `t`: Một hàm dịch được ràng buộc với locale đã phát hiện.
   - `getIntlayer`: Một hàm để truy xuất các từ điển được ràng buộc với locale đã phát hiện.
3. **Async Local Storage**: nó thiết lập một ngữ cảnh cho phép sử dụng các hàm toàn cục `t` và `getIntlayer` được import từ `express-intlayer` trong luồng xử lý request.

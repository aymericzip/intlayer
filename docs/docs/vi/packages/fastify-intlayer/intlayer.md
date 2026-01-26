---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu Plugin intlayer cho Fastify | fastify-intlayer
description: Xem cách sử dụng plugin intlayer cho gói fastify-intlayer
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Tài liệu
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Khởi tạo tài liệu
---

# Tài liệu Plugin intlayer cho Fastify

Plugin `intlayer` cho Fastify phát hiện locale của người dùng và trang trí (decorate) đối tượng request bằng các hàm của Intlayer. Nó cũng cho phép sử dụng các hàm dịch toàn cục trong ngữ cảnh của request.

## Sử dụng

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    vi: "Xin chào",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Mô tả

Plugin thực hiện các nhiệm vụ sau:

1. **Phát hiện locale**: Nó phân tích request (headers, cookies, v.v.) để xác định locale ưu tiên của người dùng.
2. **Mở rộng Request**: Nó thêm thuộc tính `intlayer` vào đối tượng `FastifyRequest`, bao gồm:
   - `locale`: Locale được phát hiện.
   - `t`: Một hàm dịch.
   - `getIntlayer`: Một hàm để lấy các từ điển.
3. **Quản lý ngữ cảnh**: Nó sử dụng `cls-hooked` để quản lý ngữ cảnh bất đồng bộ, cho phép các hàm Intlayer toàn cục truy cập locale cụ thể của request.

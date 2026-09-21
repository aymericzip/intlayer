---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Tài liệu Context Intlayer | remix-intlayer
description: Tài liệu về khóa lưu trữ context yêu cầu Intlayer trong các ứng dụng Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - context yêu cầu
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu khóa context Intlayer"
author: aymericzip
---

# Khóa Context yêu cầu Intlayer

Export `Intlayer` đóng vai trò là mã định danh lưu trữ context yêu cầu trong Remix 3. Nó cho phép truy xuất trạng thái Intlayer trực tiếp từ đối tượng context của Remix bên trong các route handler hoặc middleware tùy chỉnh.

## Cách sử dụng

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## Mô tả

`Intlayer` được middleware `intlayer()` sử dụng để liên kết trạng thái phiên hiện tại với context yêu cầu của Remix (`RequestContext`). Thông thường, việc sử dụng các hook như `useLocale()` hoặc `useIntlayer()` được ưu tiên hơn. Truy cập trực tiếp qua `context.get(Intlayer)` hữu ích trong các trình xử lý middleware cấp thấp hoặc các tuyến API nơi cá thể context được truyền tường minh.

## Tài liệu liên quan

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)

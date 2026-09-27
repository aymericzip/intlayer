---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
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

Khi middleware `intlayer()` chạy, nó lưu một đối tượng `IntlayerState` vào context yêu cầu dưới khóa `Intlayer`. Bạn có thể truy xuất nó bên trong bất kỳ route handler nào:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Truy cập qua context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Bạn cũng có thể truy cập nó bằng cách viết tắt qua thuộc tính trực tiếp `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Cấu trúc `IntlayerState`

Đối tượng `IntlayerState` chứa:

| Thuộc tính         | Kiểu                | Mô tả                                                          |
| ------------------ | ------------------- | -------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Locale được xác định cho yêu cầu hiện tại.                     |
| `defaultLocale`    | `DeclaredLocales`   | Locale dự phòng được định nghĩa trong `intlayer.config.ts`.    |
| `availableLocales` | `DeclaredLocales[]` | Danh sách tất cả các locale được hỗ trợ đã cấu hình cho dự án. |

## Tài liệu liên quan

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useIntlayer.md)

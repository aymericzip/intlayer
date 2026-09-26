---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Tài liệu Hook useIntlayer | remix-intlayer
description: Xem cách sử dụng hook useIntlayer trong các ứng dụng Remix 3 để truy cập nội dung được bản địa hóa theo khóa.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - quốc tế hóa
  - tài liệu
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu hook useIntlayer"
author: aymericzip
---

# Tài liệu Hook useIntlayer

Hook `useIntlayer` cho phép bạn truy xuất nội dung được bản địa hóa từ từ điển Intlayer theo khóa trong các ứng dụng Remix 3.

Nó tự động đọc locale đang hoạt động từ context yêu cầu hiện tại (thông qua `AsyncLocalStorage`), do đó bạn không cần phải truyền locale qua các route handler, template view hoặc component.

## Cách sử dụng

### Trong Route Handler

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### Trong Template View và Component

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Tham số

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Khóa duy nhất của từ điển (như được định nghĩa trong các tệp khai báo `.content.ts` của bạn).
2. **`localeOrSelector`** (tùy chọn): Một locale hoặc đối tượng bộ chọn cụ thể (`{ item }`, `{ variant }`, có thể kèm `locale`). Khi được cung cấp, nó sẽ ghi đè locale được phát hiện từ context yêu cầu.

## Mô tả

Hook thực hiện các nhiệm vụ sau:

1. **Truy xuất Locale từ Context**: Phát hiện locale hiện tại từ phạm vi `AsyncLocalStorage` gắn liền với yêu cầu do middleware `intlayer()` thiết lập.
2. **Truy xuất Từ điển**: Lấy từ điển được biên dịch trước tương ứng với khóa được cung cấp.
3. **Xử lý Dịch thuật**: Giải quyết các bản dịch, liệt kê, markdown và nội dung có điều kiện cho locale đã được phân giải.
4. **Xử lý Fallback**: Nếu được gọi bên ngoài context yêu cầu HTTP đang hoạt động (ví dụ: các tác vụ nền hoặc kiểm thử đơn vị không có middleware), nó sẽ quay về `defaultLocale` đã được định cấu hình một cách an toàn.

## Tài liệu liên quan

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)

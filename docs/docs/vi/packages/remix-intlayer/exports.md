---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Tài liệu gói remix-intlayer
description: Tài liệu về các exports của gói remix-intlayer, cung cấp quốc tế hóa (i18n) cho các ứng dụng Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - quốc tế hóa
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Khởi tạo tài liệu exports cho remix-intlayer"
author: aymericzip
---

# Gói remix-intlayer

Gói `remix-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Remix 3. Gói bao gồm middleware để phát hiện locale của yêu cầu, quyền truy cập vào context của yêu cầu, và các hook để lấy từ điển và quản lý locale.

## Cài đặt

```bash
npm install remix-intlayer
```

## Các Exports của gói

### Middleware

| Export     | Loại           | Mô tả                                                                                                       | Tài liệu liên quan                                                                                                                 |
| ---------- | -------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Hàm Middleware | Middleware cho Remix 3 giúp phát hiện locale của yêu cầu, quản lý chuyển hướng và điền vào context yêu cầu. | [Middleware intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/intlayerMiddleware.md) |

### Lưu trữ Context

| Export     | Loại                          | Mô tả                                                                                                              | Tài liệu liên quan                                                                                                    |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | Khóa RequestContext / Lưu trữ | Khóa context yêu cầu được sử dụng để lấy trạng thái Intlayer từ context yêu cầu Remix 3 (`context.get(Intlayer)`). | [Context Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/Intlayer.md) |

### Hooks

| Export          | Loại | Mô tả                                                                                            | Tài liệu liên quan                                                                                                           |
| --------------- | ---- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Hook | Lấy và xử lý nội dung từ điển theo khóa cho locale hiện tại của yêu cầu.                         | [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Hook | Trả về nội dung của đối tượng từ điển đã import tương ứng với locale hiện tại của yêu cầu.       | [Hook useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Hook | Cung cấp quyền truy cập vào locale yêu cầu hiện tại, locale mặc định và danh sách locale có sẵn. | [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/remix-intlayer/useLocale.md)         |

## Bắt đầu nhanh

### Cấu hình Router với Middleware

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### Sử dụng nội dung trong View và Component

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```

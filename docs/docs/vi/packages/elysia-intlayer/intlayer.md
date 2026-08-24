---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Tài liệu Plugin intlayer cho Elysia | elysia-intlayer
description: Xem cách sử dụng plugin intlayer của gói elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Tài liệu Plugin intlayer cho Elysia

Plugin `intlayer` cho Elysia phát hiện locale của người dùng và tiêm một đối tượng `intlayer` vào route context. Nó cũng cho phép sử dụng các hàm dịch toàn cục trong ngữ cảnh của request.

## Sử dụng

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    vi: "Xin chào",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Các helper tương tự cũng có sẵn dưới dạng các export độc lập, nên bạn có thể gọi chúng mà không cần destructure route context:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    vi: "Xin chào",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Mô tả

Plugin thực hiện các nhiệm vụ sau:

1. **Phát hiện locale**: Nó đọc locale được client thiết lập một cách tường minh từ storage (cookie, header), sau đó quay về locale được thương lượng từ header `Accept-Language`.
2. **Tiêm vào ngữ cảnh**: Nó thêm thuộc tính `intlayer` vào route context của Elysia, bao gồm:
   - `locale`: Locale dùng cho request này, `locale_storage` được ưu tiên hơn `locale_detected`.
   - `locale_storage`: Locale được client yêu cầu tường minh qua cookie hoặc header.
   - `locale_detected`: Locale được thương lượng từ các header của request.
   - `defaultLocale`: Locale được cấu hình làm fallback trong `intlayer.config.ts`.
   - `t`: Một hàm dịch.
   - `getIntlayer`: Hàm để lấy dictionary theo key.
   - `getDictionary`: Hàm để xử lý các đối tượng dictionary.
3. **Quản lý ngữ cảnh**: Nó sử dụng `AsyncLocalStorage` để quản lý ngữ cảnh bất đồng bộ, cho phép các hàm Intlayer toàn cục (`t`, `getIntlayer`, `getDictionary`) truy cập locale cụ thể của request mà không cần truyền đối tượng ngữ cảnh.

> Không giống các plugin Intlayer dựa trên Node, `elysia-intlayer` dựa vào `AsyncLocalStorage` thay vì `cls-hooked`, bởi vì `cls-hooked` phụ thuộc vào `async_hooks.createHook`, thứ mà Bun không triển khai.

Ngữ cảnh của request được giải phóng ngay khi response được map, nên các helper độc lập không bao giờ phân giải dựa trên một request đã kết thúc. Khi được gọi bên ngoài một request do plugin xử lý, chúng quay về locale mặc định đã được cấu hình.

## Cấu hình

Plugin đọc tệp `intlayer.config.ts` của bạn. Bạn có thể tùy chỉnh cookie và header dùng cho việc phát hiện locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Để biết thêm thông tin về cấu hình, hãy truy cập [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/configuration.md).

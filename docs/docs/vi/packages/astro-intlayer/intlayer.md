---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Tài liệu Tích hợp intlayer | astro-intlayer
description: Xem cách cấu hình và sử dụng tích hợp Astro intlayer trong tệp astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - tích hợp
  - i18n
  - Quốc tế hóa
  - Tài liệu
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Cập nhật tài liệu tích hợp với thông tin chi tiết về middleware và hooks"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Khởi tạo tài liệu"
author: aymericzip
---

# Tài liệu Tích hợp Astro intlayer

Tích hợp `intlayer` cho Astro cấu hình dự án của bạn cho việc quốc tế hóa đa ngôn ngữ (i18n). Nó xử lý việc chuẩn bị từ điển tại thời điểm build, đưa vào các plugin Vite, tự động đăng ký middleware yêu cầu và xuất các trang prerender được bản địa hóa.

## Cách sử dụng

Thêm `intlayer()` vào tệp `astro.config.mjs` của bạn:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Lệnh codemod của Astro CLI (`astro add astro-intlayer`) cũng tạo ra import mặc định được hỗ trợ:

```ts
import intlayer from "astro-intlayer";
```

## Mô tả chi tiết

Tích hợp móc nối vào vòng đời build và runtime của Astro:

1. **Thiết lập cấu hình (`astro:config:setup`)**:
   - **Chuẩn bị từ điển**: Chuẩn bị các từ điển Intlayer và các kiểu được tạo trước khi quá trình build chạy.
   - **Các plugin Vite**: Đưa vào các plugin cho alias của Vite (cho phép import từ điển liền mạch), proxy định tuyến ngôn ngữ và cắt tỉa mã nguồn khi build.
   - **Đăng ký Middleware**: Tự động đưa `astro-intlayer/middleware` vào chuỗi middleware của dự án, điền thông tin vào `Astro.locals.intlayer` trên mỗi yêu cầu đến.
2. **Hoàn tất Build (`astro:build:done`)**:
   - **Viết lại trang**: Kiểm tra các quy tắc viết lại URL theo ngôn ngữ và tạo ra các trang HTML được prerender tại các đường dẫn ngôn ngữ tương ứng.

## Những gì được cung cấp sẵn

Sau khi cấu hình, ứng dụng Astro của bạn có thể sử dụng ngay:

- Các hook `useIntlayer`, `useDictionary` và `useLocale` bên trong frontmatter của thành phần `.astro`.
- Đối tượng `Astro.locals.intlayer` trong các endpoint và trang Astro.
- Các bản import phía client trong các khối `<script>` phản ánh cùng một API với các cập nhật phản ứng.
- Các bộ định dạng tích hợp sẵn trong `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, v.v.).

## Tài liệu liên quan

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/vi/packages/astro-intlayer/onRequest.md)

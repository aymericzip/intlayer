---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói astro-intlayer
description: Tích hợp Astro cho Intlayer, cung cấp cấu hình cho định tuyến theo locale và quản lý từ điển.
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói astro-intlayer

Gói `astro-intlayer` cung cấp các công cụ cần thiết để tích hợp Intlayer vào các ứng dụng Astro. Nó cấu hình định tuyến theo locale và quản lý từ điển.

## Cài đặt

```bash
npm install astro-intlayer
```

## Các export

### Tích hợp

Gói `astro-intlayer` cung cấp integration cho Astro để thiết lập Intlayer trong dự án của bạn.

Nhập:

```tsx
import "astro-intlayer";
```

hoặc thêm vào `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Hàm        | Mô tả                                                            |
| ---------- | ---------------------------------------------------------------- |
| `intlayer` | Integration cho Astro để thiết lập Intlayer trong dự án của bạn. |

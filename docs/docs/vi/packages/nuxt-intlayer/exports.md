---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Tài liệu gói nuxt-intlayer
description: Tích hợp Intlayer cho Nuxt, cung cấp một module cho ứng dụng Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Hợp nhất tài liệu cho tất cả các exports
---

# Gói nuxt-intlayer

Gói `nuxt-intlayer` cung cấp một module Nuxt để tích hợp Intlayer vào dự án Nuxt của bạn.

## Cài đặt

```bash
npm install nuxt-intlayer
```

## Các exports

### Mô-đun

Gói `nuxt-intlayer` cung cấp một module Nuxt để tích hợp Intlayer vào dự án Nuxt của bạn.

Nhập:

```tsx
import "nuxt-intlayer";
```

hoặc thêm vào `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Xuất      | Loại         | Mô tả                                                     |
| --------- | ------------ | --------------------------------------------------------- |
| `default` | `NuxtModule` | Export mặc định là module Nuxt dùng để cấu hình Intlayer. |

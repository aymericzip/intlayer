---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: Tôi nhận được lỗi module not found khi sử dụng bun
description: 'Sửa lỗi "Cannot find package" khi dùng Intlayer với Bun, do cách Bun giới hạn phạm vi require(), với cấu hình khắc phục.'
keywords:
  - bun
  - module not found
  - intlayer
  - cấu hình
  - trình quản lý gói
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
---

# Tôi nhận được lỗi module not found khi sử dụng bun

## Mô tả vấn đề

Khi sử dụng bun, bạn có thể gặp lỗi như sau:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Nguyên nhân

Intlayer sử dụng `require` bên trong. Và bun giới hạn hàm require chỉ để giải quyết các gói của package `@intlayer/config`, thay vì toàn bộ dự án.

## Giải pháp

### Cung cấp hàm `require` trong cấu hình

```ts
const config: IntlayerConfig = {
  build: {
    require, // cung cấp hàm require trong cấu hình build
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // sử dụng hàm require khi cấu hình với Intlayer trong Next.js
});

export default configuration;
```

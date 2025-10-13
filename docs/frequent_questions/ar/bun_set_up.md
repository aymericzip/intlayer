---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: أحصل على خطأ "الوحدة غير موجودة" عند استخدام bun
description: إصلاح الخطأ عند استخدام bun.
keywords:
  - bun
  - الوحدة غير موجودة
  - intlayer
  - التهيئة
  - مدير الحزم
slugs:
  - doc
  - faq
  - bun-set-up
---

# أحصل على خطأ "الوحدة غير موجودة" عند استخدام bun

## وصف المشكلة

عند استخدام bun، قد تواجه خطأ مثل هذا:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## السبب

يستخدم Intlayer الدالة `require` داخليًا. و bun يحدد نطاق دالة require لتقوم بحل حزم `@intlayer/config` فقط، بدلاً من المشروع بأكمله.

## الحل

### توفير دالة `require` في التهيئة

```ts
const config: IntlayerConfig = {
  build: {
    require, // توفير دالة require في التهيئة
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // توفير دالة require في التهيئة
});

export default configuration;
```

---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: أحصل على خطأ "الوحدة غير موجودة" عند استخدام bun
description: 'أصلح خطأ "Cannot find package" عند استخدام Intlayer مع Bun، الناتج عن تقييد Bun لنطاق require()، مع الإعداد الذي يحلّه.'
keywords:
  - bun
  - الوحدة غير موجودة
  - intlayer
  - التهيئة
  - مدير الحزم
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
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

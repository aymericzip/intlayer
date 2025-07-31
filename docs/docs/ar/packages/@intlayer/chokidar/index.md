---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - مراقبة الملفات لترجمة Intlayer
description: حزمة NPM توفر قدرات مراقبة الملفات لـ Intlayer، مما يتيح التحديثات التلقائية وإعادة التحميل السريع لمحتوى الترجمة.
keywords:
  - intlayer
  - chokidar
  - مراقبة الملفات
  - إعادة تحميل سريع
  - i18n
  - جافاسكريبت
  - NPM
  - تطوير
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar: حزمة NPM لمسح وبناء ملفات تعريف Intlayer إلى قواميس

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافاسكريبت. وهي متوافقة مع أُطُر العمل مثل React وReact وExpress.js.

تُستخدم حزمة **`@intlayer/chokidar`** لمسح وبناء ملفات تعريف Intlayer إلى قواميس باستخدام [chokidar](https://github.com/paulmillr/chokidar) ووفقًا لـ [تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## الاستخدام

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // بناء قواميس Intlayer

watch({ persistent: true }); // مراقبة التغييرات في ملفات التكوين
```

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل

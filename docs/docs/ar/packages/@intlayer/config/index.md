---
docName: package__@intlayer_config
url: https://intlayer.org/doc/package/@intlayer_config
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/@intlayer/config/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - إدارة التهيئة لـ Intlayer
description: حزمة NPM لاسترجاع تهيئة Intlayer وتعريف متغيرات البيئة لإعدادات التدويل عبر بيئات مختلفة.
keywords:
  - intlayer
  - التهيئة
  - البيئة
  - الإعدادات
  - i18n
  - جافا سكريبت
  - NPM
  - المتغيرات
---

# @intlayer/config: حزمة NPM لاسترجاع تهيئة Intlayer

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. وهي متوافقة مع أُطُر العمل مثل React وReact وExpress.js.

حزمة **`@intlayer/config`** هي حزمة NPM تتيح لك استرجاع تهيئة Intlayer وتعريف متغيرات البيئة المتعلقة بالبيئة الحالية.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## الاستخدام

### قراءة تهيئة Intlayer باستخدام نظام الملفات

مثال:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// المخرجات:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> تستخدم هذه الدالة حزم `fs` وستعمل فقط على جانب الخادم.

### قراءة تهيئة Intlayer باستخدام متغيرات البيئة

مثال:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// المخرجات:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> لن تُعيد هذه الدالة أي شيء إذا لم تُعرف متغيرات البيئة.

### تعريف متغيرات البيئة

1. إنشاء ملف التهيئة.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> راجع [توثيق تهيئة Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من التفاصيل.

2. تعريف متغيرات البيئة.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// تنسيق جميع قيم التهيئة كمتغيرات بيئة
const env = formatEnvVariable();

// تعيين كل متغير بيئة منسق في process.env
Object.assign(process.env, env);
```

3. استيراد ملف التهيئة.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ

---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: أحصل على خطأ متعلق بالحزم الفرعية @intlayer/*
description: إصلاح الخطأ المتعلق بالحزم الفرعية @intlayer/*.
keywords:
  - @intlayer/*
  - الحزم الفرعية
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# أحصل على خطأ متعلق بالحزم الفرعية `@intlayer/*`

عادةً ما تحدث هذه المشكلة بعد تحديث حزم Intlayer.

مثال على رسالة الخطأ:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ خطأ  لا يوجد تصدير مطابق في "node_modules/@intlayer/config/dist/esm/client.mjs" للاستيراد "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## السبب

الحزم الأساسية مثل `intlayer`، `react-intlayer`، `react-native-intlayer`، `vue-intlayer` تعيد استخدام نفس الحزم الفرعية مثل `@intlayer/config`، `@intlayer/core`، `@intlayer/types` لتجنب تكرار الكود.

بين إصدارين، لا يتم ضمان أن تكون التصديرات في الحزم الفرعية هي نفسها. للحد من هذه المشكلة، يقوم intlayer بتثبيت إصدار الحزم الفرعية ليتطابق مع إصدار الحزمة الرئيسية.

> مثال: `intlayer@1.0.0` يستخدم `@intlayer/config@1.0.0`، `@intlayer/core@1.0.0`، `@intlayer/types@1.0.0`

> (باستثناء `@intlayer/swc`)، الحزم الفرعية `@intlayer/*` ليست مخصصة للاستخدام المباشر. لذلك نوصي بعدم تثبيتها مباشرة.

## الحل

1. تأكد من أن إصدارات الحزمة الرئيسية والحزم الفرعية هي نفسها.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // إصدار خاطئ، يجب أن يكون 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. حاول إزالة ملف القفل ومجلد node_modules وأعد تثبيت التبعيات.

أحيانًا، يحتفظ مدير الحزم بإصدار قديم من الحزم الفرعية في ملف القفل ضمن الكاش. لإصلاح ذلك، يمكنك محاولة إزالة ملف القفل ومجلد node_modules وأعد تثبيت التبعيات.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. تحقق من التثبيت العالمي

نوصي بتثبيت `intlayer` أو `intlayer-cli` بشكل عالمي للوصول إلى أوامر CLI. إذا لم يكن الإصدار العالمي هو نفسه الإصدار المحلي، قد يعتبر مدير الحزم الإصدار خاطئًا.

**تحقق مما إذا كانت الحزمة مثبتة عالميًا**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**إصلاح تعارضات التبعيات العالمية المحتملة**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. حاول تنظيف الكاش

في بعض البيئات مثل docker، أو github actions، أو منصات استضافة الويب مثل Vercel، قد يكون هناك كاش موجود. يمكنك محاولة تنظيف الكاش وإعادة محاولة التثبيت.

يمكنك أيضًا محاولة تنظيف كاش مدير الحزم الخاص بك باستخدام الأمر التالي:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```

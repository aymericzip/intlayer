---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: توثيق الحزمة | lynx-intlayer
description: تعرف على كيفية استخدام حزمة lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
---

# lynx-intlayer: تدويل (i18n) تطبيق Lynx

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. وهي متوافقة مع أُطُر العمل مثل React وExpress.js.

**حزمة `lynx-intlayer`** تتيح لك تدويل تطبيق Vite الخاص بك. تتضمن إضافة Metro لضبط التكوين عبر متغيرات البيئة في [مجمّع Lynx](https://lynxjs.org/index.html).

## لماذا تقوم بتدويل تطبيق Lynx الخاص بك؟

تدويل تطبيق Lynx الخاص بك ضروري لخدمة جمهور عالمي بشكل فعال. يسمح لتطبيقك بتقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك بجعله أكثر وصولاً وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## التكوين

يعمل حزمة `lynx-intlayer` بسلاسة مع حزمة [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md)، وحزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/index.md). ألقِ نظرة على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## مثال على الاستخدام

انظر مثالاً على كيفية تضمين الإضافات في تكوين vite الخاص بك.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... إضافات أخرى
    pluginIntlayerLynx(),
  ],
});
```

## إتقان التدويل لتطبيق Vite الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق Vite الخاص بك.

**لتعلم المزيد عن هذه الميزات، راجع دليل [التدويل في React (i18n) مع Intlayer و Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_lynx+react.md) لتطبيق Lynx.**

## اقرأ عن Intlayer

- [موقع Intlayer](https://intlayer.org)
- [توثيق Intlayer](https://intlayer.org/doc)
- [مستودع Intlayer على GitHub](https://github.com/aymericzip/intlayer)

- [اطرح أسئلتك على توثيقنا الذكي](https://intlayer.org/doc/chat)

## تاريخ التوثيق

- 5.5.10 - 2025-06-29: بداية التاريخ

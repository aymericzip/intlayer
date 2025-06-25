---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: وثائق حزمة | lynx-intlayer
description: انظر كيف تستخدم حزمة lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React وReact وExpress.js.

**حزمة `lynx-intlayer`** تتيح لك تعريب تطبيق Vite الخاص بك. تتضمن مكون Metro الإضافي لتعيين التكوين من خلال متغيرات البيئة في [مُجمّع Lynx](https://lynxjs.org/index.html).

## لماذا تعريب تطبيق Lynx الخاص بك؟

تعريب تطبيق Lynx الخاص بك ضروري لخدمة جمهور عالمي بفعالية. يتيح لتطبيقك تقديم المحتوى والرسائل بلغة المستخدم المفضلة. هذه القدرة تعزز تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر سهولة وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## التكوين

تعمل حزمة `lynx-intlayer` بسلاسة مع [حزمة `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md)، وحزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). اطلع على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة المطلوبة باستخدام مدير الحزم المفضل لديك:

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

اطلع على مثال حول كيفية تضمين المكونات الإضافية في تكوين vite الخاص بك.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... مكونات إضافية أخرى
    pluginIntlayerLynx(),
  ],
});
```

## إتقان تعريب تطبيق Vite الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تعريب تطبيق Vite الخاص بك.

**لمعرفة المزيد عن هذه الميزات، راجع دليل [تعريب React (i18n) باستخدام Intlayer وLynx](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_lynx+react.md) لتطبيق Lynx.**

## اقرأ عن Intlayer

- [موقع Intlayer](https://intlayer.org)
- [وثائق Intlayer](https://intlayer.org/doc)
- [GitHub الخاص بـ Intlayer](https://github.com/aymericzip/intlayer)

- [اطرح أسئلتك على وثائقنا الذكية](https://intlayer.org/docchat)

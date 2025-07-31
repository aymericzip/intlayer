---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق الحزمة | vite-intlayer
description: تعرف على كيفية استخدام حزمة vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: حزمة NPM لتدويل تطبيق Vite (i18n)

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. وهي متوافقة مع أُطُر العمل مثل React وReact وExpress.js.

**حزمة `vite-intlayer`** تتيح لك تدويل تطبيق Vite الخاص بك. تتضمن مكون Vite الإضافي (plugin) لضبط الإعدادات من خلال متغيرات البيئة في [أداة تجميع Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). كما توفر وسيطًا (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإعادة توجيه المستخدم إلى عنوان URL المناسب كما هو محدد في [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## لماذا تقوم بتدويل تطبيق Vite الخاص بك؟

تدويل تطبيق Vite الخاص بك أمر ضروري لخدمة جمهور عالمي بفعالية. فهو يتيح لتطبيقك تقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق وصول تطبيقك من خلال جعله أكثر سهولة وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## الإعداد

تعمل حزمة `vite-intlayer` بسلاسة مع حزمة [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md)، وحزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/index.md). ألق نظرة على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## مثال على الاستخدام

راجع مثالًا لكيفية تضمين الإضافات في تكوين vite الخاص بك.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> يستخدم مكون Vite الإضافي `intlayerPlugin()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

> يضيف مكون `intLayerMiddlewarePlugin()` التوجيه على جانب الخادم إلى تطبيقك. سيقوم هذا المكون تلقائيًا بالكشف عن اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط المناسب للغة. إذا لم يتم تحديد لغة، سيحدد المكون اللغة الأنسب بناءً على تفضيلات لغة متصفح المستخدم. وإذا لم يتم الكشف عن أي لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

## إتقان التدويل في تطبيق Vite الخاص بك

توفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق Vite الخاص بك.

**لمعرفة المزيد عن هذه الميزات، راجع دليل [التدويل في React (i18n) مع Intlayer و Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md) لتطبيقات Vite و React.**

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل

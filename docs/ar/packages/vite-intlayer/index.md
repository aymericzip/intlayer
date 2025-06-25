---
docName: package__vite-intlayer
url: https://intlayer.org/doc/packages/vite-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/vite-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق حزمة | vite-intlayer
description: انظر كيف تستخدم حزمة vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# vite-intlayer: حزمة NPM لتدويل (i18n) تطبيق Vite

**Intlayer** هي مجموعة من الحزم المصممة خصيصًا لمطوري JavaScript. وهي متوافقة مع أطر العمل مثل React، React، و Express.js.

**حزمة `vite-intlayer`** تتيح لك تدويل تطبيق Vite الخاص بك. تتضمن مكون Vite لإعداد التكوين من خلال متغيرات البيئة في [Vite bundler](https://vitejs.dev/guide/why.html#why-bundle-for-production). كما توفر وسيطًا لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيهه إلى عنوان URL المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

## لماذا تدويل تطبيق Vite الخاص بك؟

تدويل تطبيق Vite الخاص بك أمر ضروري لخدمة جمهور عالمي بفعالية. يتيح لتطبيقك تقديم المحتوى والرسائل بلغة المستخدم المفضلة. هذه القدرة تعزز تجربة المستخدم وتوسع نطاق وصول تطبيقك من خلال جعله أكثر سهولة وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## التكوين

تعمل حزمة `vite-intlayer` بسلاسة مع [حزمة `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/index.md)، و [حزمة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/index.md). ألقِ نظرة على الوثائق ذات الصلة لمزيد من المعلومات.

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

شاهد مثالًا على كيفية تضمين المكونات الإضافية في تكوين Vite الخاص بك.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> يتم استخدام مكون Vite الإضافي `intlayerPlugin()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يحدد متغيرات البيئة الخاصة بـ Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

> يضيف المكون الإضافي `intLayerMiddlewarePlugin()` التوجيه على جانب الخادم إلى تطبيقك. سيكتشف هذا المكون الإضافي تلقائيًا اللغة الحالية بناءً على عنوان URL ويضبط ملف تعريف الارتباط الخاص باللغة المناسبة. إذا لم يتم تحديد لغة، سيحدد المكون الإضافي اللغة الأنسب بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم اكتشاف لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

## إتقان تدويل تطبيق Vite الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق Vite الخاص بك.

**لتعلم المزيد عن هذه الميزات، راجع دليل [التدويل (i18n) مع Intlayer و Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md) لتطبيقات Vite و React.**

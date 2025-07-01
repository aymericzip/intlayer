---
docName: package__@intlayer_webpack
url: https://intlayer.org/doc/package/@intlayer_webpack
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/@intlayer/webpack/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - إضافة Webpack لـ Intlayer i18n
description: حزمة NPM توفر تكوين Webpack وإضافة لدمج سلس لتدويل Intlayer مع التطبيقات المعتمدة على Webpack.
keywords:
  - intlayer
  - webpack
  - إضافة
  - تكوين
  - i18n
  - جافاسكريبت
  - NPM
  - مجمع
---

# @intlayer/webpack: حزمة NPM لاستخدام إضافة Intlayer Webpack في تطبيقك

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافاسكريبت. وهي متوافقة مع أُطُر العمل مثل React وReact وExpress.js.

حزمة **`@intlayer/webpack`** تُستخدم لتوفير تكوين Webpack لجعل العمل على تطبيق يعتمد على Webpack مع Intlayer سهلاً. كما توفر الحزمة إضافة (plugin) يمكن إضافتها إلى تطبيق Webpack موجود.

## الاستخدام

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // الخيارات
    }),
  ],
};
```

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل

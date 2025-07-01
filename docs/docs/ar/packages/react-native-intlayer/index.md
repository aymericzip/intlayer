---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: توثيق الحزمة | react-native-intlayer
description: تعرف على كيفية استخدام حزمة react-native-intlayer
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - packages
  - react-native-intlayer
---

# react-native-intlayer: تدويل (i18n) تطبيق React Native

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. وهي متوافقة مع أُطُر العمل مثل React وReact وExpress.js.

**حزمة `react-native-intlayer`** تتيح لك تدويل تطبيق Vite الخاص بك. تشمل هذه الحزمة إضافة Metro التي تسمح بضبط الإعدادات من خلال متغيرات البيئة في [مجمع Metro](https://docs.expo.dev/guides/customizing-metro/).

## لماذا تقوم بتدويل تطبيق React Native الخاص بك؟

تدويل تطبيق React Native الخاص بك أمر ضروري لخدمة جمهور عالمي بشكل فعال. فهو يسمح لتطبيقك بتقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك بجعله أكثر وصولًا وملاءمة للأشخاص من خلفيات لغوية مختلفة.

## الإعداد

تعمل حزمة `react-native-intlayer` بسلاسة مع حزمة [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md)، وحزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/index.md). ألقِ نظرة على الوثائق ذات الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## مثال على الاستخدام

انظر مثالًا على كيفية تضمين الإضافات في تكوين vite الخاص بك.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## إتقان التدويل لتطبيق Vite الخاص بك

يوفر Intlayer العديد من الميزات لمساعدتك في تدويل تطبيق Vite الخاص بك.

**لتعلم المزيد عن هذه الميزات، راجع دليل [التدويل في React (i18n) مع Intlayer و React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react_native+expo.md) لتطبيق React Native.**

## اقرأ عن Intlayer

- [موقع Intlayer الإلكتروني](https://intlayer.org)
- [توثيق Intlayer](https://intlayer.org/doc)
- [مستودع Intlayer على GitHub](https://github.com/aymericzip/intlayer)

- [اطرح أسئلتك على توثيقنا الذكي](https://intlayer.org/docchat)

## تاريخ التوثيق

- 5.5.10 - 2025-06-29: بداية التاريخ

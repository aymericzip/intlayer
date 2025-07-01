---
docName: package__react-scripts-intlayer
url: https://intlayer.org/doc/packages/react-scripts-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-scripts-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق الحزمة | react-scripts-intlayer
description: تعرف على كيفية استخدام حزمة react-scripts-intlayer
keywords:
  - Intlayer
  - react-scripts-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
---

# react-scripts-intlayer: حزمة NPM لاستخدام Intlayer في تطبيق React Create App

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافا سكريبت. وهي متوافقة مع أُطُر العمل مثل React وExpress.js.

**حزمة `react-scripts-intlayer`** تتضمن أوامر وإضافات `react-scripts-intlayer` لدمج Intlayer مع التطبيق المبني على Create React App. تعتمد هذه الإضافات على [craco](https://craco.js.org/) وتتضمن تكوينًا إضافيًا لأداة التجميع [Webpack](https://webpack.js.org/).

## التكوين

تعمل حزمة `react-scripts-intlayer` بسلاسة مع حزمة [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md)، وحزمة [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/index.md). اطلع على التوثيق ذي الصلة لمزيد من المعلومات.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## الاستخدام

### أوامر CLI

توفر حزمة `react-scripts-intlayer` أوامر CLI التالية:

- `npx react-scripts-intlayer build`: يبني تطبيق React باستخدام تكوين Intlayer.
- `npx react-scripts-intlayer start`: يبدأ خادم التطوير باستخدام تكوين Intlayer.

### استبدال سكريبتات package.json

لاستخدام حزمة `react-scripts-intlayer`، تحتاج إلى استبدال سكريبتات `package.json` بالأوامر التالية:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## استخدام تكوين Webpack مخصص

تعتمد حزمة `react-scripts-intlayer` على [craco](https://craco.js.org/)، والذي يتيح لك تخصيص تكوين Webpack.
إذا كنت بحاجة إلى تخصيص تكوين Webpack، يمكنك أيضًا تنفيذ إعدادك الخاص بناءً على مكون intlayer craco الإضافي. [انظر المثال هنا](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## قراءة الدليل الكامل لـ Intlayer مع React Create App

يوفر Intlayer العديد من الميزات لمساعدتك في تعريب تطبيق React الخاص بك.
[انظر كيفية استخدام intlayer مع React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md).

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ

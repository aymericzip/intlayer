---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - أداة سطر الأوامر للتدويل
description: حزمة واجهة سطر الأوامر لـ Intlayer توفر أدوات لإدارة الترجمات، بناء القواميس، وأتمتة سير العمل في التدويل.
keywords:
  - intlayer
  - CLI
  - سطر الأوامر
  - التدويل
  - i18n
  - أدوات
  - NPM
  - الأتمتة
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: حزمة NPM لاستخدام أداة سطر أوامر Intlayer

**Intlayer** هي مجموعة من الحزم مصممة خصيصًا لمطوري جافاسكريبت. وهي متوافقة مع أُطُر العمل مثل React وExpress.js.

حزمة **`intlayer-cli`** هي حزمة NPM تستهلك حزمة `@intlayer/cli` وتجعلها متاحة لواجهات سطر أوامر `intlayer`.

> لاحظ أن هذه الحزمة غير ضرورية إذا كانت حزمة [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer/index.md) مثبتة. بالمقارنة مع حزمة `intlayer`، فإن حزمة `intlayer-cli` هي حزمة أخف تحتوي فقط على أداة سطر الأوامر، بدون تبعيات `@intlayer/core`.

## التثبيت

قم بتثبيت الحزمة اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## الاستخدام

هنا مثال على كيفية استخدام حزمة `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## أوامر سطر الأوامر

يوفر Intlayer أداة سطر أوامر لـ:

- تدقيق إعلانات المحتوى الخاصة بك وإكمال الترجمات المفقودة
- بناء قواميس من إعلانات المحتوى الخاصة بك
- دفع وسحب القواميس البعيدة من نظام إدارة المحتوى الخاص بك إلى مشروع اللغة الخاص بك

راجع [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md) لمزيد من المعلومات.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ

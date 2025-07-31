---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: تم استرجاع لغة غير صحيحة من عنوان URL
description: تعلم كيفية إصلاح استرجاع لغة غير صحيحة من عنوان URL.
keywords:
  - اللغة
  - عنوان URL
  - intlayer
  - next.js
  - vite
  - الإطار
  - الوسيط
  - التهيئة
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# تم استرجاع لغة غير صحيحة من عنوان URL

## وصف المشكلة

عند محاولة الوصول إلى معامل اللغة من عنوان URL، قد تواجه مشكلة حيث تكون قيمة اللغة غير صحيحة:

```js
const { locale } = await params;
console.log(locale); // يعيد "about" بدلاً من اللغة المتوقعة
```

## الحل

### 1. تحقق من هيكل الملفات

تأكد من أن مسار موجه تطبيق Next.js الخاص بك يتبع هذا الهيكل:

```bash
src/app/[locale]/about/page.tsx
```

### 2. تحقق من إعدادات الوسيط (Middleware)

تحدث المشكلة غالبًا عندما لا يكون ملف الوسيط موجودًا أو لم يتم تفعيله. يجب أن يكون ملف الوسيط موجودًا في:

```bash
src/middleware.ts
```

هذا الوسيط مسؤول عن إعادة كتابة المسارات عندما تكون قيمة `prefixDefault` مضبوطة على `false`. على سبيل المثال، يعيد كتابة `/en/about` إلى `/about`.

### 3. أنماط عناوين URL بناءً على التهيئة

#### التهيئة الافتراضية (`prefixDefault: false`، `noPrefix: false`)

- الإنجليزية: `/about`
- الفرنسية: `/fr/about`
- الإسبانية: `/es/about`

#### مع `prefixDefault: true`

- الإنجليزية: `/en/about`
- الفرنسية: `/fr/about`
- الإسبانية: `/es/about`

#### مع `noPrefix: true`

- الإنجليزية: `/about`
- الفرنسية: `/about`
- الإسبانية: `/about`

لمزيد من التفاصيل حول خيارات التهيئة هذه، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

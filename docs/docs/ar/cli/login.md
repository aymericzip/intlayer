---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - تسجيل الدخول
description: تعلم كيفية استخدام أمر login في Intlayer CLI للمصادقة مع نظام إدارة المحتوى Intlayer والحصول على بيانات الاعتماد.
keywords:
  - CLI
  - تسجيل الدخول
  - المصادقة
  - CMS
  - Intlayer
  - بيانات الاعتماد
slugs:
  - doc
  - concept
  - cli
  - login
---

# أمر تسجيل الدخول في Intlayer CLI

---

## الوصف

يتيح أمر `login` في Intlayer CLI المصادقة مع نظام إدارة المحتوى Intlayer. يقوم هذا الأمر تلقائيًا بفتح متصفحك الافتراضي لإكمال عملية المصادقة واستلام بيانات الاعتماد اللازمة (Client ID و Client Secret) لاستخدام خدمات Intlayer.

## الاستخدام

```bash
npx intlayer login [options]
```

أو

```bash
intlayer login [options]
```

## الخيارات

### `--cms-url <url>`

حدد عنوان URL الخاص بـ Intlayer CMS للاتصال به لإجراء المصادقة.

- **النوع**: `string`
- **الافتراضي**: القيمة المكوّنة في `intlayer.config.*` أو `https://intlayer.org`
- **مثال**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### خيارات التكوين

يمكنك أيضًا استخدام خيارات التكوين الشائعة:

- `--env-file <path>`: مسار ملف البيئة
- `-e, --env <env>`: بيئة التنفيذ
- `--base-dir <dir>`: الدليل الأساسي للمشروع
- `--verbose`: تفعيل الإخراج التفصيلي (الافتراضي: true)
- `--prefix <prefix>`: بادئة للسجلات

## كيف يعمل

1. **بدء خادم محلي**: يقوم الأمر بتشغيل خادم HTTP محلي على منفذ عشوائي لاستقبال بيانات الاعتماد من الـ CMS
2. **فتح المتصفح**: يقوم الأمر تلقائيًا بفتح متصفحك الافتراضي إلى عنوان تسجيل الدخول الخاص بالـ CMS
3. **المصادقة**: أكمل عملية المصادقة في المتصفح باستخدام حساب Intlayer الخاص بك
4. **استلام بيانات الاعتماد**: يستقبل الخادم المحلي معرف العميل (Client ID) وسر العميل (Client Secret) من الـ CMS
5. **التعليمات**: يعرض الأمر تعليمات لتكوين بيانات الاعتماد في مشروعك

## المخرجات

بعد تسجيل دخول ناجح، سيعرض الأمر:

1. **بيانات الاعتماد المستلمة** (Client ID و Client Secret)
2. **تعليمات لملف `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **تعليمات لملف تكوين Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## التكوين اليدوي

إذا لم يفتح المتصفح تلقائيًا، يمكنك زيارة عنوان URL المعروض في الطرفية يدويًا.

## أمثلة

### تسجيل الدخول باستخدام عنوان CMS مخصص

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### تسجيل الدخول باستخدام ملف بيئة محدد

```bash
npx intlayer login --env-file .env.production
```

### تسجيل الدخول بوضع الإخراج التفصيلي

```bash
npx intlayer login --verbose
```

## استكشاف الأخطاء وإصلاحها

### المتصفح لا يفتح

إذا لم يفتح المتصفح تلقائيًا، انسخ عنوان URL المعروض في الطرفية وافتحه يدويًا في متصفحك.

### مشاكل الاتصال

إذا واجهت مشاكل في الاتصال، فتأكد من:

1. أن عنوان URL الخاص بالـ CMS صحيح
2. أن اتصال الإنترنت لديك يعمل بشكل صحيح
3. أنه لا توجد جدران حماية تمنع الاتصال

### لم يتم استلام بيانات الاعتماد

إذا لم يتم استلام بيانات الاعتماد:

1. تأكد من أنك أتممت عملية المصادقة في المتصفح
2. تحقق من أن المنفذ المحلي غير محظور
3. حاول الأمر مرة أخرى

## الخطوات التالية

بعد إتمام تسجيل الدخول:

1. أضف بيانات الاعتماد إلى ملف `.env` الخاص بك
2. قم بتكوين ملف `intlayer.config.*` باستخدام بيانات الاعتماد
3. استخدم أوامر CLI لإدارة القواميس الخاصة بك:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/push.md) - ادفع القواميس إلى الـ CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/pull.md) - اسحب القواميس من الـ CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) - املأ الترجمات المفقودة

## راجع أيضًا

- [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)
- [تكوين Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

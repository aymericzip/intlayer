---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: تصحيح أمر Intlayer
description: تعلّم كيفية تصحيح واستكشاف مشكلات CLI الخاصة بـ Intlayer.
keywords:
  - تصحيح
  - استكشاف الأخطاء
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# تصحيح أمر intlayer

## 1. **تأكد من استخدامك لأحدث إصدار**

شغّل:

```bash
npx intlayer --version                  # إصدار intlayer الحالي للغة المحلية
npx intlayer@latest --version           # أحدث إصدار متوفر من intlayer
```

## 2. **تحقق مما إذا كان الأمر مسجلاً**

يمكنك التحقق باستخدام:

```bash
npx intlayer --help                     # يعرض قائمة الأوامر المتاحة ومعلومات الاستخدام
npx intlayer dictionary build --help    # يعرض قائمة الخيارات المتاحة لأمر معين
```

## 3. **أعد تشغيل الطرفية الخاصة بك**

في بعض الأحيان، يكون من الضروري إعادة تشغيل الطرفية للتعرف على الأوامر الجديدة.

## 4. **مسح ذاكرة التخزين المؤقت لـ npx (إذا كنت عالقًا بإصدار قديم)**

```bash
npx clear-npx-cache
```

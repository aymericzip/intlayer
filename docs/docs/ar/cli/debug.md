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
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# تصحيح أمر intlayer

## 1. **تأكد من استخدامك لأحدث إصدار**

شغّل:

```bash packageManager="npm"
npx intlayer --version                  # إصدار intlayer الحالي للغة المحلية
npx intlayer@latest --version           # أحدث إصدار متوفر من intlayer
```

```bash packageManager="yarn"
yarn intlayer --version                  # إصدار intlayer الحالي للغة المحلية
yarn intlayer@latest --version           # أحدث إصدار متوفر من intlayer
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # إصدار intlayer الحالي للغة المحلية
pnpm intlayer@latest --version           # أحدث إصدار متوفر من intlayer
```

```bash packageManager="bun"
bun x intlayer --version                  # إصدار intlayer الحالي للغة المحلية
bun x intlayer@latest --version           # أحدث إصدار متوفر من intlayer
```

## 2. **تحقق مما إذا كان الأمر مسجلاً**

يمكنك التحقق باستخدام:

```bash packageManager="npm"
npx intlayer --help                     # يعرض قائمة الأوامر المتاحة ومعلومات الاستخدام
npx intlayer dictionary build --help    # يعرض قائمة الخيارات المتاحة لأمر معين
```

```bash packageManager="yarn"
yarn intlayer --help                     # يعرض قائمة الأوامر المتاحة ومعلومات الاستخدام
yarn intlayer dictionary build --help    # يعرض قائمة الخيارات المتاحة لأمر معين
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # يعرض قائمة الأوامر المتاحة ومعلومات الاستخدام
pnpm intlayer dictionary build --help    # يعرض قائمة الخيارات المتاحة لأمر معين
```

```bash packageManager="bun"
bun x intlayer --help                     # يعرض قائمة الأوامر المتاحة ومعلومات الاستخدام
bun x intlayer dictionary build --help    # يعرض قائمة الخيارات المتاحة لأمر معين
```

## 3. **أعد تشغيل الطرفية الخاصة بك**

في بعض الأحيان، يكون من الضروري إعادة تشغيل الطرفية للتعرف على الأوامر الجديدة.

## 4. **مسح ذاكرة التخزين المؤقت لـ npx (إذا كنت عالقًا بإصدار قديم)**

```bash
npx clear-npx-cache
```

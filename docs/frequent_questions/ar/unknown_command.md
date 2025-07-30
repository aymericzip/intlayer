---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: أمر غير معروف
description: تعلّم كيفية إصلاح خطأ الأمر غير المعروف.
keywords:
  - غير معروف
  - أمر
  - خطأ
  - intlayer
  - fill
  - build
  - verbose
  - الطرفية
  - إعادة تشغيل
  - محلي
slugs:
  - doc
  - faq
  - unknown-command
---

# خطأ: أمر غير معروف fill / build / إلخ

إذا أعطى الأمر `npx intlayer fill --verbose`:

```
error: unknown command 'fill'
```

ولكنك متأكد أن الأمر `fill` _يجب أن_ يكون موجودًا، فإليك الخطوات لحل المشكلة:

## 1. **تأكد من أنك تستخدم أحدث إصدار**

شغّل:

```bash
npx intlayer --version                  # إصدار intlayer الحالي للبيئة المحلية
npx intlayer@latest --version           # أحدث إصدار متوفر من intlayer
```

هذا يجبر `npx` على جلب أحدث إصدار. ثم حاول مرة أخرى:

```bash
npx intlayer@latest build --verbose
```

## 2. **تحقق مما إذا كان الأمر مسجلاً**

يمكنك التحقق باستخدام:

```bash
npx intlayer --help                     # عرض المعلومات المتعلقة بالأوامر
```

تحقق مما إذا كان الأمر يظهر في قائمة الأوامر.

اذهب إلى المستودع، وتأكد من أن الأمر الخاص بك مُصدر ومسجل في نقطة دخول CLI. يستخدم Intlayer إطار العمل `commander`.

الكود المتعلق بـ CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **أعد تشغيل الطرفية**

في بعض الأحيان، يحتاج الطرفية إلى إعادة تشغيل للتعرف على الأوامر الجديدة.

## 5. **إذا كنت تطور `intlayer`، أعد بناءه واربطه**

إذا كنت تطور `intlayer` محليًا:

```bash
# في مجلد intlayer
npm install
npm run build
npm link
```

ثم في طرفية أخرى:

```bash
intlayer fill --verbose
```

هذا يستخدم النسخة المحلية التي تعمل عليها.

## 6. **مسح ذاكرة التخزين المؤقت لـ npx (إذا كنت عالقًا مع نسخة قديمة)**

```bash
npx clear-npx-cache
```

أو احذف حزم intlayer المخزنة مؤقتًا يدويًا:

```bash
rm -rf ~/.npm/_npx
```

تحقق من المكافئ إذا كنت تستخدم pnpm أو yarn أو bun أو مدير حزم آخر

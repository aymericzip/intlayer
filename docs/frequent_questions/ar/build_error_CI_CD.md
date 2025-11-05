---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: خطأ في البناء في CI/CD
description: تعلّم كيفية إصلاح أخطاء البناء التي تحدث في بيئات CI/CD.
keywords:
  - بناء
  - خطأ
  - ci
  - cd
  - خط الأنابيب
  - intlayer
  - القواميس
  - next.js
  - ما قبل البناء
  - الأتمتة
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# خطأ في البناء في CI/CD

إذا حصلت على خطأ مثل هذا في Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

إليك بعض الحلول:

## 1. القواميس المفقودة

تأكد من أن القواميس تم بناؤها في مرحلة البناء.

من الشائع أن يعمل البناء محليًا ولكن لا يعمل على CI/CD. السبب هو أنه محليًا، يكون مجلد `.intlayer` موجودًا، ولكن على CI/CD، لا يكون موجودًا لأنه مستبعد من البناء.

يمكنك إصلاح ذلك عن طريق إضافة سكربت ما قبل البناء في ملف `package.json` الخاص بمشروعك.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // سيتم تشغيله قبل البناء
    "build": "next build",
  },
}
```

> لاحظ أنه إذا كنت تستخدم دالة `withIntlayer`، أو الإضافة المكافئة للباندلر في إطار عملك، فسيتم تشغيل سكربت ما قبل البناء قبل البناء.

## 2. المتغيرات البيئية المفقودة أثناء وقت البناء / التشغيل

في الحاويات، أو المنصات التي تعتمد النشر التلقائي، يُنصح باستبعاد ملف `.env` من البناء.

```text fileName=".gitignore or .dockerignore"
# المتغيرات البيئية
.env
**/.env
.env.*
**/.env.*
```

إذا لم تكن المتغيرات البيئية متاحة أثناء وقت البناء، فسيتم إصدار خطأ.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

من المحتمل أن هذا لا يتعلق بـ Intlayer. لذا تحقق من المتغيرات البيئية الخاصة بك أثناء وقت البناء على منصة CI/CD الخاصة بك.

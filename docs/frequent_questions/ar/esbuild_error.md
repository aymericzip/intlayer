---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: خطأ ESBuild
description: تعلم كيفية إصلاح أخطاء ESBuild.
keywords:
  - esbuild
  - خطأ
  - intlayer
  - إضافة
  - إطار عمل
  - next.js
  - vite
  - react-native
  - lynx
slugs:
  - doc
  - faq
  - esbuild-error
---

# خطأ ESBuild

إذا واجهت خطأ ESBuild أثناء عملية البناء، فمن المحتمل أن إضافة Intlayer لم تُضبط بشكل صحيح.

تتحمل ESBuild مسؤولية قراءة ملفات إعلان المحتوى (`.content.{ts,js,mjs,cjs,json}`) وإنشاء القواميس المقابلة في مجلد `.intlayer/dictionary`. بالإضافة إلى قراءة ملف التكوين (`intlayer.config.ts`).

توفر Intlayer إضافات للتكامل مع أدوات التجميع الخاصة بك. تم تصميمها لإنشاء أسماء مستعارة للمكونات التي من المفترض أن تعمل على جانب الخادم فقط.

إذا كنت تستخدم إطار عمل مثل Next.js (Webpack / Turbopack)، Vite، أو React Native، Lynx، إلخ. توفر Intlayer إضافة يمكنك استخدامها لدمج Intlayer في تطبيقك. لذا ارجع إلى الوثائق الخاصة بإطار العمل الذي تستخدمه لتتعلم كيفية دمج الإضافة.

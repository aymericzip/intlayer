---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق intlayerMiddleware | next-intlayer
description: اطّلع على كيفية استخدام دالة intlayerMiddleware لحزمة next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: إنشاء المستند
---

# توثيق intlayerMiddleware

دالة `intlayerMiddleware` هي middleware لـ Next.js تتعامل مع التوجيه (routing) وإعادة التوجيه استنادًا إلى locale. تقوم باكتشاف الـ locale المفضّل لدى المستخدم تلقائيًا وتعيد توجيهه إلى المسار المحلي المناسب عند الحاجة.

## الاستخدام

```ts
// middleware.ts - ملف الوسيط
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## الوصف

يؤدي الـ middleware المهام التالية:

1. **كشف اللغة**: يتحقق من مسار الـ URL وملفات الكوكيز ورأس `Accept-Language` لتحديد لغة المستخدم.
2. **إعادة التوجيه**: إذا لم يتضمن الـ URL بادئة للّغة وكانت الإعدادات تتطلب ذلك (أو اعتمادًا على تفضيلات المستخدم)، فإنه يعيد التوجيه إلى عنوان URL المحلي.
3. **إدارة الكوكيز**: يمكنه تخزين اللغة المكتشفة في كوكي لاستخدامها في الطلبات المستقبلية.

## المعلمات

تأخذ الدالة المعلمة القياسية من Next.js `NextRequest` عند استخدامها مباشرة، أو يمكن تصديرها كما هو موضح أعلاه.

---
createdAt: 2026-01-21
updatedAt: 2026-02-25
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
  - version: 8.1.7
    date: 2026-02-25
    changes: إعادة تسمية intlayerMiddleware إلى intlayerProxy
  - version: 8.0.0
    date: 2026-01-21
    changes: إنشاء المستند
---

# توثيق intlayerProxy (intlayerMiddleware)

دالة `intlayerProxy` (`intlayerMiddleware` لـ nextjs < 16) هي middleware لـ Next.js تتعامل مع التوجيه (routing) وإعادة التوجيه استنادًا إلى locale. تقوم باكتشاف الـ locale المفضّل لدى المستخدم تلقائيًا وتعيد توجيهه إلى المسار المحلي المناسب عند الحاجة.

## الاستخدام

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## الوصف

يؤدي الـ middleware المهام التالية:

1. **كشف اللغة**: يتحقق من مسار الـ URL وملفات الكوكيز ورأس `Accept-Language` لتحديد لغة المستخدم.
2. **إعادة التوجيه**: إذا لم يتضمن الـ URL بادئة للّغة وكانت الإعدادات تتطلب ذلك (أو اعتمادًا على تفضيلات المستخدم)، فإنه يعيد التوجيه إلى عنوان URL المحلي.
3. **إدارة الكوكيز**: يمكنه تخزين اللغة المكتشفة في كوكي لاستخدامها في الطلبات المستقبلية.

## المعلمات

تأخذ الدالة المعلمة القياسية من Next.js `NextRequest` عند استخدامها مباشرة، أو يمكن تصديرها كما هو موضح أعلاه.

## الإعدادات

لتكوين الـ middleware، يمكنك إعداد خيار `routing` في ملف `intlayer.config.ts`. انظر [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من التفاصيل.

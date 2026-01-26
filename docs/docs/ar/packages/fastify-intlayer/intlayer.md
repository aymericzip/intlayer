---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق مكوّن intlayer لـ Fastify | fastify-intlayer
description: اطلع على كيفية استخدام مكوّن intlayer لحزمة fastify-intlayer
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: بدء التوثيق
---

# توثيق مكوّن intlayer لـ Fastify

يقوم المكوّن `intlayer` لـ Fastify باكتشاف لغة المستخدم (locale) ويزيّن كائن الطلب بدوال Intlayer. كما يتيح استخدام دوال الترجمة العامة ضمن سياق الطلب.

## الاستخدام

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    ar: "مرحبًا",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## الوصف

يقوم المكوّن الإضافي بالمهام التالية:

1. **كشف اللغة**: يقوم بتحليل الطلب (الرؤوس، الكوكيز، إلخ) لتحديد اللغة المفضلة لدى المستخدم.
2. **تزيين الطلب**: يضيف خاصية `intlayer` إلى كائن `FastifyRequest`، تحتوي على:
   - `locale`: اللغة المكتشفة.
   - `t`: دالة ترجمة.
   - `getIntlayer`: دالة لاسترجاع القواميس.
3. **إدارة السياق**: يستخدم `cls-hooked` لإدارة سياق غير متزامن، مما يسمح لدوال Intlayer العامة بالوصول إلى اللغة الخاصة بكل طلب.

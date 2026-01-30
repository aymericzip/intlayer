---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: توثيق وسيط intlayer لـ AdonisJS | adonis-intlayer
description: تعرف على كيفية استخدام وسيط intlayer لحزمة adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - تدويل
  - توثيق
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: التوثيق الأولي
---

# توثيق وسيط intlayer لـ AdonisJS

يقوم وسيط `intlayer` لـ AdonisJS باكتشاف لغة المستخدم وتوفير وظائف الترجمة من خلال سياق الطلب. كما يتيح استخدام وظائف الترجمة العالمية ضمن تدفق الطلب.

## الاستخدام

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## الوصف

يقوم الوسيط بالمهام التالية:

1. **اكتشاف اللغة**: يقوم بتحليل الطلب (العناوين، ملفات تعريف الارتباط، إلخ) لتحديد اللغة المفضلة للمستخدم.
2. **إعداد السياق**: يقوم بملء سياق الطلب بمعلومات اللغة.
3. **Async Local Storage**: يستخدم `cls-hooked` لإدارة سياق غير متزامن، مما يسمح لوظائف Intlayer العالمية مثل `t` و `getIntlayer` و `getDictionary` بالوصول إلى اللغة الخاصة بالطلب دون تمريرها يدويًا.

> ملاحظة: لاستخدام ملفات تعريف الارتباط لاكتشاف اللغة، تأكد من تكوين واستخدام `@adonisjs/cookie` في تطبيقك.

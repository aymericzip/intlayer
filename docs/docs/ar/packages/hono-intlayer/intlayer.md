---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: توثيق وسيط intlayer لـ Hono | hono-intlayer
description: تعرف على كيفية استخدام وسيط intlayer لحزمة hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - تدويل
  - توثيق
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: تهيئة التوثيق
---

# توثيق وسيط intlayer لـ Hono

يقوم وسيط `intlayer` لـ Hono باكتشاف لغة المستخدم ويملأ كائن السياق بدوال Intlayer. كما يتيح استخدام دوال الترجمة العالمية داخل سياق الطلب.

## الاستخدام

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحباً",
  });

  return c.text(content);
});
```

## الوصف

يقوم الوسيط بالمهام التالية:

1. **اكتشاف اللغة**: يقوم بتحليل الطلب (العناوين، ملفات تعريف الارتباط، إلخ) لتحديد اللغة المفضلة للمستخدم.
2. **ملء السياق**: يضيف بيانات Intlayer إلى سياق Hono، والتي يمكن الوصول إليها عبر `c.get()`. يتضمن ذلك:
   - `locale`: اللغة المكتشفة.
   - `t`: دالة ترجمة.
   - `getIntlayer`: دالة لاسترجاع القواميس.
   - `getDictionary`: دالة لمعالجة كائنات القاموس.
3. **إدارة السياق**: يستخدم `cls-hooked` لإدارة سياق غير متزامن، مما يسمح لدوال Intlayer العالمية (`t` و `getIntlayer` و `getDictionary`) بالوصول إلى اللغة الخاصة بالطلب دون تمرير كائن السياق.

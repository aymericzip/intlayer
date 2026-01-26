---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق Middleware الخاص بـ intlayer في Express | express-intlayer
description: تعرف على كيفية استخدام Middleware الخاص بـ intlayer لحزمة express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: إنشاء الوثيقة
---

# توثيق Middleware الخاص بـ intlayer في Express

يقوم الـ middleware الخاص بـ `intlayer` في Express باكتشاف locale الخاص بالمستخدم ويزوّد دوال الترجمة عبر كائن `res.locals`. كما يتيح استخدام الدالتين `t` و `getIntlayer` في جميع معالجات الطلبات (request handlers) الخاصة بك.

## الاستخدام

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    ar: "مرحبا",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## الوصف

يقوم الـ middleware بالمهام التالية:

1. **كشف اللغة (Locale Detection)**: يفحص ملفات تعريف الارتباط (cookies)، والرؤوس (مثل `Accept-Language`)، ومعلمات URL لتحديد لغة المستخدم.
2. **إعداد السياق (Context Setup)**: يقوم بتعبئة `res.locals` بـ:
   - `locale`: اللغة المكتشفة.
   - `t`: دالة ترجمة مرتبطة باللغة المكتشفة.
   - `getIntlayer`: دالة لاسترجاع القواميس المرتبطة باللغة المكتشفة.
3. **التخزين المحلي غير المتزامن**: يقوم بإعداد سياق يتيح استخدام الدالتين العالميتين `t` و `getIntlayer` المستوردتين من `express-intlayer` داخل تدفق الطلب.

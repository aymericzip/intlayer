---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة intlayer-cli
description: أداة سطر أوامر لـ Intlayer توفر أوامر لبناء وتدقيق القواميس.
keywords:
  - cli
  - أدوات
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# حزمة intlayer-cli

توفّر حزمة `intlayer-cli` مجموعة من الأوامر لإدارة قواميس Intlayer والتكوين.

## التثبيت

```bash
npm install intlayer-cli
```

## الصادرات

### أوامر CLI (دوال)

تصدّر الحزمة دوال تُشغّل أوامر CLI، مما يتيح لك تشغيل عمليات Intlayer برمجياً.

استيراد:

```tsx
import "intlayer-cli";
```

| الدالة         | الوصف                                                       |
| -------------- | ----------------------------------------------------------- |
| `build`        | يبني قواميس Intlayer.                                       |
| `audit`        | يفحص القواميس بحثًا عن الترجمات المفقودة.                   |
| `liveSync`     | يُزامن القواميس في الوقت الحقيقي.                           |
| `pull`         | يسحب القواميس من مصدر بعيد.                                 |
| `push`         | يدفع القواميس إلى مصدر بعيد.                                |
| `test`         | يُجري اختبارات على القواميس.                                |
| `transform`    | يحوّل القواميس بين الصيغ.                                   |
| `fill`         | يملأ القواميس بالترجمات المفقودة باستخدام الذكاء الاصطناعي. |
| `reviewDoc`    | يراجِع التوثيق للتدويل.                                     |
| `translateDoc` | يُترجِم التوثيق باستخدام الذكاء الاصطناعي.                  |

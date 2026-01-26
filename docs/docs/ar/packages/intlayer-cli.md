---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة intlayer-cli
description: أداة سطر أوامر لـ Intlayer، توفر أوامر لبناء ومراجعة القواميس.
keywords:
  - intlayer-cli
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# حزمة intlayer-cli

توفّر حزمة `intlayer-cli` مجموعة من الأوامر لإدارة قواميس Intlayer والإعدادات.

## التثبيت

```bash
npm install intlayer-cli
```

## التصدير

### أوامر CLI (دوال)

تصدّر الحزمة دوال تُشغّل أوامر CLI.

| الدالة      | الوصف                                      |
| ----------- | ------------------------------------------ |
| `build`     | يبني قواميس Intlayer.                      |
| `audit`     | يدقق القواميس للتحقق من الترجمات المفقودة. |
| `liveSync`  | يزامن القواميس في الوقت الفعلي.            |
| `pull`      | يسحب القواميس من مصدر عن بُعد.             |
| `push`      | يدفع القواميس إلى مصدر عن بُعد.            |
| `test`      | يجري اختبارات على القواميس.                |
| `transform` | يحوّل القواميس بين الصيغ.                  |

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: وثائق حزمة react-native-intlayer
description: دعم React Native لـ Intlayer، يوفر موفّرين وpolyfills.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توثيق موحد لجميع الصادرات
---

# حزمة react-native-intlayer

توفر حزمة `react-native-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات React Native. تتضمن موفّرًا وpolyfills لدعم locales.

## التثبيت

```bash
npm install react-native-intlayer
```

## الصادرات

### الموفر

| المكوّن            | الوصف                                          |
| ------------------ | ---------------------------------------------- |
| `IntlayerProvider` | مكوّن Provider يلف تطبيقك ويوفر سياق Intlayer. |

استيراد:

```tsx
import "react-native-intlayer";
```

### ملحق التوافق (Polyfill)

| الدالة             | الوصف                                                        |
| ------------------ | ------------------------------------------------------------ |
| `intlayerPolyfill` | دالة تطبّق polyfills الضرورية لـ React Native لدعم Intlayer. |

استيراد:

```tsx
import "react-native-intlayer";
```

### تكوين Metro

توفّر حزمة `react-native-intlayer` أدوات تكوين Metro لضمان عمل Intlayer بشكل صحيح مع React Native.

| الدالة                    | الوصف                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | دالة غير متزامنة تقوم بتحضير Intlayer وتدمج تكوين Metro.                            |
| `configMetroIntlayerSync` | دالة متزامنة تدمج تكوين Metro دون تحضير موارد Intlayer.                             |
| `exclusionList`           | تنشئ نمط RegExp لقائمة الحظر (blockList) في Metro لاستبعاد ملفات المحتوى من الحزمة. |

الاستيراد:

```tsx
import "react-native-intlayer/metro";
```

---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: وثائق حزمة react-native-intlayer
description: دعم React Native لـ Intlayer، يوفر موفّرين وخطافات وpolyfills وتكوين Metro.
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "إعادة تصدير واجهة برمجة تطبيقات react-intlayer الكاملة (الخطافات والأدوات ومسارات format/html/markdown الفرعية) حتى يعتمد تطبيق React Native على react-native-intlayer فقط"
  - version: 8.0.0
    date: 2026-01-21
    changes: "توثيق موحد لجميع الصادرات"
author: aymericzip
---

# حزمة react-native-intlayer

توفر حزمة `react-native-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات React Native. تُعيد تصدير واجهة برمجة تطبيقات `react-intlayer` الكاملة (الخطافات والأدوات) مع `IntlayerProvider` جاهز لـ React Native، بالإضافة إلى polyfills وتكوين Metro المطلوبين بواسطة React Native.

> في تطبيق React Native، قم باستيراد **كل شيء** من `react-native-intlayer`. لا تحتاج إلى تثبيت `react-intlayer` أو استيراده مباشرة.

## التثبيت

```bash
npm install react-native-intlayer
```

## الصادرات

### الموفّر

| المكوّن            | الوصف                                                                             |
| ------------------ | --------------------------------------------------------------------------------- |
| `IntlayerProvider` | مكوّن Provider يلف تطبيقك ويوفر سياق Intlayer. يطبّق تلقائيًا polyfills المطلوبة. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### الخطافات والأدوات

يتم إعادة تصدير هذه العناصر من `react-intlayer`، لذلك يمكنك استيرادها مباشرةً من `react-native-intlayer`:

| الصادر                                                                                                            | الوصف                                          |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `useIntlayer`                                                                                                     | الوصول إلى المحتوى المحلّي لمفتاح قاموس معيّن. |
| `useLocale`                                                                                                       | قراءة اللغة الحالية وتغييرها.                  |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | تحميل محتوى القاموس بطرق مختلفة.               |
| `useI18n`                                                                                                         | خطاف متوافق مع i18next.                        |
| `t`                                                                                                               | مساعد الترجمة المضمّن.                         |
| `getIntlayer`, `getDictionary`                                                                                    | أدوات استرجاع المحتوى الأمرية.                 |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | مساعدات استمرارية اللغة.                       |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### ملحق التوافق (Polyfill)

| الدالة             | الوصف                                                        |
| ------------------ | ------------------------------------------------------------ |
| `intlayerPolyfill` | دالة تطبّق polyfills الضرورية لـ React Native لدعم Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> يتم تطبيق polyfill تلقائيًا عند استيراد `IntlayerProvider`. استدعِ `intlayerPolyfill` يدويًا فقط إذا كنت بحاجة إلى polyfills قبل تحميل الموفّر.

### المنسّقات

خطافات التنسيق المعتمدة على Intl للأرقام والتواريخ وغيرها متاحة من المسار الفرعي `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### عرض Markdown و HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### تكوين Metro

توفّر حزمة `react-native-intlayer` أدوات تكوين Metro لضمان عمل Intlayer بشكل صحيح مع React Native.

| الدالة                    | الوصف                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | دالة غير متزامنة تقوم بتحضير Intlayer وتدمج تكوين Metro.                            |
| `configMetroIntlayerSync` | دالة متزامنة تدمج تكوين Metro دون تحضير موارد Intlayer.                             |
| `exclusionList`           | تنشئ نمط RegExp لقائمة الحظر (blockList) في Metro لاستبعاد ملفات المحتوى من الحزمة. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```

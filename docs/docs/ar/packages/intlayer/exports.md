---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة intlayer
description: الحزمة الأساسية لـ Intlayer، التي توفر الدوال والأنواع الأساسية للتدويل.
keywords:
  - intlayer
  - core
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# حزمة intlayer

حزمة `intlayer` هي المكتبة الأساسية في منظومة Intlayer. توفر الدوال والأنواع والأدوات الأساسية لإدارة المحتوى متعدد اللغات في تطبيقات JavaScript وTypeScript.

## التثبيت

```bash
npm install intlayer
```

## الصادرات

### التكوين

استيراد:

```tsx
import "intlayer";
```

| المتغير            | النوع                  | الوصف                                                                       | الوثيقة ذات الصلة                                                                                                       |
| ------------------ | ---------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | كائن تكوين Intlayer.                                                        | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | يعيد كائن تكوين Intlayer. (غير مستحسن: استخدم `configuration` بدلاً من ذلك) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | قائمة جميع اللغات المدعومة.                                                 | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | قائمة جميع اللغات المطلوبة.                                                 | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | المحلية الافتراضية.                                                         | -                                                                                                                       |

### الأنواع

استيراد:

```tsx
import "intlayer";
```

| النوع                 | الوصف                                           |
| --------------------- | ----------------------------------------------- |
| `Dictionary`          | نوع `Dictionary` المستخدم لتعريف بنية القاموس.  |
| `DeclarationContent`  | (**مهمل**) استخدم `Dictionary<T>` بدلاً من ذلك. |
| `IntlayerConfig`      | النوع الذي يعرّف تكوين Intlayer.                |
| `ContentNode`         | عنصر في محتوى القاموس.                          |
| `Locale`              | النوع الذي يمثل الـ locale.                     |
| `LocalesValues`       | القيم الممكنة للـ locale.                       |
| `StrictModeLocaleMap` | خريطة للـ locales مع تحقق صارم من الأنواع.      |

### دوال المحتوى

Import:

```tsx
import "intlayer";
```

| الدالة                   | النوع      | الوصف                                                                                                             | الوثيقة ذات الصلة                                                                                  |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `t` / `getTranslation`   | `Function` | يختار المحتوى بناءً على الـ locale الحالي.                                                                        | [ترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)   |
| `enu` / `getEnumeration` | `Function` | يختار المحتوى بناءً على الكمية.                                                                                   | [التعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | يختار المحتوى بناءً على شرط منطقي.                                                                                | [الشرط](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/condition.md)     |
| `gender`                 | `Function` | يختار المحتوى بناءً على الجنس.                                                                                    | [الجنس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)        |
| `insert`                 | `Function` | يُدرج القيم داخل سلسلة المحتوى.                                                                                   | [الإدراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)   |
| `nest` / `getNesting`    | `Function` | يُضمِّن قاموسًا آخر.                                                                                              | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/nesting.md)     |
| `md`                     | `Function` | يعالج محتوى Markdown.                                                                                             | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)   |
| `html`                   | `Function` | يعالج محتوى HTML.                                                                                                 | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/html.md)           |
| `file`                   | `Function` | يتعامل مع محتوى الملفات.                                                                                          | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/file.md)           |
| `getDictionary`          | `Function` | يعالج الكائنات التي تشبه القواميس (المفتاح، المحتوى). يعالج ترجمات `t()`، والتعدادات (enumerations)، وما إلى ذلك. | -                                                                                                  |
| `getIntlayer`            | `Function` | مبني على `getDictionary`، لكنه يحقن نسخة محسنة من القاموس مأخوذة من التصريح المولد.                               | -                                                                                                  |

### أدوات التوطين

استيراد:

```tsx
import "intlayer";
```

| الدالة                 | النوع      | الوصف                                      | الوثيقة ذات الصلة                                                                                                               |
| ---------------------- | ---------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | يكتشف الـ locale من سلسلة نصية أو من مسار. | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | يحصل على جزء اللغة من الـ locale.          | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | يحصل على اسم العرض للـ locale.             | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | يحوّل مسارًا قياسيًا إلى مسار محلي.        | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | يحوّل مسارًا محليًا إلى المسار الكانوني.   | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | ينشئ URL محلي.                             | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | ينشئ URLs لجميع اللغات المدعومة.           | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | يزيل بادئة اللغة من المسار.                | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | يحصل على بادئة اللغة من المسار.            | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | يحصل على اتجاه النص (LTR/RTL).             | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | يتحقق من صحة بادئة اللغة.                  | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/validatePrefix.md)             |

### أدوات المتصفح

استيراد:

```tsx
import "intlayer";
```

| الدالة                 | النوع      | الوصف                           |
| ---------------------- | ---------- | ------------------------------- |
| `getBrowserLocale`     | `Function` | يكتشف اللغة المفضلة للمتصفح.    |
| `getCookie`            | `Function` | يسترجع قيمة ملف تعريف الارتباط. |
| `getLocaleFromStorage` | `Function` | يسترجع اللغة من التخزين.        |
| `setLocaleInStorage`   | `Function` | يحفظ اللغة في التخزين.          |

### أدوات التنسيق

استيراد:

```tsx
import "intlayer";
```

| الدالة         | الوصف                     |
| -------------- | ------------------------- |
| `number`       | يُنسق رقمًا.              |
| `currency`     | يُنسق قيمة عملة.          |
| `percentage`   | يُنسق نسبة مئوية.         |
| `compact`      | يُنسق رقمًا بصيغة مضغوطة. |
| `date`         | يُنسق تاريخًا.            |
| `relativeTime` | يُنسق الوقت النسبي.       |
| `units`        | يُنسق قيمة مع وحدات.      |
| `Intl`         | كائن Intl القياسي.        |

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: وثائق حزمة vue-intlayer
description: تكامل مخصص لـ Vue مع Intlayer، يوفر مكوّنات إضافية (plugins) وcomposables لتطبيقات Vue.
keywords:
  - vue-intlayer
  - vue
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# حزمة vue-intlayer

توفّر حزمة `vue-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Vue. تتضمّن مكوّناً إضافياً (plugin) لـ Vue وcomposables لمعالجة المحتوى متعدد اللغات.

## التثبيت

```bash
npm install vue-intlayer
```

## الصادرات

### المكوّن الإضافي (Plugin)

استيراد:

```tsx
import "vue-intlayer";
```

| الدالة            | الوصف                                |
| ----------------- | ------------------------------------ |
| `installIntlayer` | مكوّن Vue لتثبيت Intlayer في تطبيقك. |

### قابلات التركيب (Composables)

الاستيراد:

```tsx
import "vue-intlayer";
```

| قابل التركيب           | الوصف                                                                                                          | الوثيقة ذات الصلة                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | مبني على `useDictionary`، لكنه يَحقن نسخة محسنة من القاموس المستخرجة من التصريح المولد.                        | -                                                                                                                     |
| `useDictionary`        | يعالج الكائنات التي تبدو كقواميس (المفتاح، المحتوى). يعالج ترجمات `t()`، والتعدادات (enumerations)، إلخ.       | -                                                                                                                     |
| `useDictionaryAsync`   | نفس وظيفة `useDictionary`، ولكن يتعامل مع القواميس غير المتزامنة.                                              | -                                                                                                                     |
| `useDictionaryDynamic` | نفس وظيفة `useDictionary`، ولكن يتعامل مع القواميس الديناميكية.                                                | -                                                                                                                     |
| `useLocale`            | يعيد الـ locale الحالي ودالة لتعيينه.                                                                          | -                                                                                                                     |
| `useRewriteURL`        | Composable على جانب العميل لإدارة إعادة كتابة URL. يقوم بتحديث URL تلقائيًا إذا وُجدت قاعدة إعادة كتابة محلية. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | يعيد كائن Intl للـ locale الحالي.                                                                              | -                                                                                                                     |
| `useLoadDynamic`       | Composable لتحميل قواميس ديناميكية.                                                                            | -                                                                                                                     |

### الدوال

Import:

```tsx
import "vue-intlayer";
```

| الدالة          | الوصف                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------- |
| `getDictionary` | يعالج الكائنات التي تبدو كقواميس (المفتاح، المحتوى). يعالج ترجمات `t()`، والتعدادات، إلخ. |
| `getIntlayer`   | مبني على `getDictionary`، لكنه يحقن نسخة محسّنة من القاموس مأخوذة من التعريف المولد.      |

### Markdown

Import:

```tsx
import "vue-intlayer/markdown";
```

| الدالة                    | الوصف                                                  |
| ------------------------- | ------------------------------------------------------ |
| `installIntlayerMarkdown` | مكوّن إضافي لـ Vue لتثبيت Intlayer Markdown في تطبيقك. |

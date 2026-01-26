---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة svelte-intlayer
description: تكامل خاص بـ Svelte مع Intlayer، يوفر دوال إعداد وstores لتطبيقات Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# حزمة svelte-intlayer

توفر حزمة `svelte-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Svelte. تتضمن دوال إعداد وstores للتعامل مع المحتوى متعدد اللغات.

## التثبيت

```bash
npm install svelte-intlayer
```

## الصادرات

### الإعداد

استيراد:

```tsx
import "svelte-intlayer";
```

| الدالة          | الوصف                                          |
| --------------- | ---------------------------------------------- |
| `setupIntlayer` | دالة لإعداد Intlayer في تطبيق Svelte الخاص بك. |

### المتجر

استيراد:

```tsx
import "svelte-intlayer";
```

| المتجر          | الوصف                                             |
| --------------- | ------------------------------------------------- |
| `intlayerStore` | مخزن Svelte الذي يحتوي على حالة Intlayer الحالية. |

### Hooks (السياق)

استيراد:

```tsx
import "svelte-intlayer";
```

| الدالة                 | الوصف                                                                                                                                | المستند ذو الصلة                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | مبني على `useDictionary`، لكنه يحقن نسخة محسّنة من القاموس مأخوذة من ملف التصريحات المُولَّد.                                        | -                                                                                                                        |
| `useDictionary`        | يعالج الكائنات التي تبدو كقواميس (مفتاح، محتوى). يعالج ترجمات `t()` والتعدادات، وما إلى ذلك.                                         | -                                                                                                                        |
| `useDictionaryAsync`   | نفس عمل `useDictionary`، لكنه يتعامل مع القواميس غير المتزامنة.                                                                      | -                                                                                                                        |
| `useDictionaryDynamic` | نفس عمل `useDictionary`، لكنه يتعامل مع القواميس الديناميكية.                                                                        | -                                                                                                                        |
| `useLocale`            | تعيد الـ locale الحالي ودالة لتعيينها.                                                                                               | -                                                                                                                        |
| `useRewriteURL`        | دالة على جانب العميل لإدارة إعادة كتابة عناوين URL. تقوم بتحديث عنوان URL تلقائيًا إذا كانت هناك قاعدة إعادة كتابة مخصصة للـ locale. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | تعيد كائن Intl للـ locale الحالي.                                                                                                    | -                                                                                                                        |

### ماركداون

استيراد:

```tsx
import "svelte-intlayer";
```

| الدالة                | الوصف                                                 |
| --------------------- | ----------------------------------------------------- |
| `setIntlayerMarkdown` | دالة لتعيين سياق الماركداون في تطبيق Svelte الخاص بك. |

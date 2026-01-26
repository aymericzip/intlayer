---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة solid-intlayer
description: تكامل مخصص لـ Solid مع Intlayer، يوفر providers و hooks لتطبيقات Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# حزمة solid-intlayer

توفر حزمة `solid-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Solid. تتضمن providers و hooks للتعامل مع المحتوى متعدد اللغات.

## التثبيت

```bash
npm install solid-intlayer
```

## الصادرات

### المزود

الاستيراد:

```tsx
import "solid-intlayer";
```

| المكوّن            | الوصف                                                | المستند المرتبط                                                                                                               |
| ------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | المزوّد الرئيسي الذي يلف تطبيقك ويوفر سياق Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/IntlayerProvider.md) |

### الخطافات

استيراد:

```tsx
import "solid-intlayer";
```

| هوك                    | الوصف                                                                                                                  | المستند المرتبط                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | مبني على `useDictionary`، لكنه يدرج نسخة محسّنة من القاموس من التصريح المولد.                                          | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | يعالج الكائنات الشبيهة بالقواميس (مفتاح، محتوى). يعالج ترجمات `t()`، التعدادات، إلخ.                                   | -                                                                                                                       |
| `useDictionaryAsync`   | مثل `useDictionary`، ولكن يتعامل مع القواميس غير المتزامنة.                                                            | -                                                                                                                       |
| `useDictionaryDynamic` | مثل `useDictionary`، ولكن يتعامل مع القواميس الديناميكية.                                                              | -                                                                                                                       |
| `useLocale`            | يعيد الـ locale الحالية ودالة لتعيينها.                                                                                | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | هو hook على جانب العميل لإدارة إعادة كتابة عناوين URL. يقوم بتحديث الـ URL تلقائيًا إذا وُجدت قاعدة إعادة كتابة محلية. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | يعيد كائن Intl للـ locale الحالية.                                                                                     | -                                                                                                                       |
| `useLoadDynamic`       | هوك لتحميل القواميس الديناميكية.                                                                                       | -                                                                                                                       |
| `t`                    | يختار المحتوى بناءً على اللغة الحالية.                                                                                 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)                  |

### المكونات

استيراد:

```tsx
import "solid-intlayer";
```

| المكون             | الوصف                    |
| ------------------ | ------------------------ |
| `MarkdownProvider` | مزود لسياق عرض Markdown. |

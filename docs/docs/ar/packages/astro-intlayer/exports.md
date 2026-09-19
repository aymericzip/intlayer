---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: توثيق حزمة astro-intlayer
description: تكامل Astro لـ Intlayer، يوفّر إعداد التوجيه المستند إلى اللغة، البرمجيات الوسيطة، الخطافات، متجر العميل، وإدارة القواميس.
keywords:
  - astro-intlayer
  - astro
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "إضافة توثيق خطافات useIntlayer و useDictionary و useLocale والبرمجية الوسيطة وأدوات التنسيق"
  - version: 8.0.0
    date: 2026-01-21
    changes: "توثيق موحد لجميع الصادرات"
author: aymericzip
---

# حزمة astro-intlayer

توفر حزمة `astro-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Astro. حيث تقوم بتهيئة التوجيه المستند إلى اللغة، وإدارة القواميس، وإعادة كتابة الصفحات أثناء البناء، وبرمجيات الطلب الوسيطة، والخطافات للوصول إلى المحتوى متعدد اللغات عبر مكونات `.astro` المعروضة على الخادم وسكربتات العميل.

## التثبيت

```bash
npm install astro-intlayer
```

## الصادرات

### التكامل

توفر حزمة `astro-intlayer` تكامل Astro يقوم بإعداد Intlayer في مشروعك.

استيراد:

```tsx
import { intlayer } from "astro-intlayer";
```

أو استيراد افتراضي في `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| الدالة     | الوصف                                                                                                                                                                                     | المستند ذو الصلة                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | تكامل Astro يجهز القواميس، ويهيئ إضافات Vite (الأسماء المستعارة، وكيل التوجيه، التقليم)، ويسجل تلقائيًا برمجية الطلب الوسيطة، ويُخرج الصفحات المعروضة مسبقًا عبر عناوين URL معاد كتابتها. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/intlayer.md) |

### الخطافات (الخادم والعميل)

استيراد:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| الخطاف          | الوصف                                                                                                                                                   | المستند ذو الصلة                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | يختار قاموسًا واحدًا بواسطة مفتاحه ويُرجع محتواه المترجم. في واجهة `.astro`، يقرأ لغة الطلب من `Astro.locals`. وفي كود `<script>`، يقرأ من متجر العميل. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | يحول كائن قاموس ويُرجع المحتوى للغة المحددة. يعمل في واجهة المكونات وسكربتات العميل.                                                                    | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | يُرجع اللغة الحالية، واللغة الافتراضية، واللغات المتاحة، ودالة لتحديث اللغة.                                                                            | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useLocale.md)         |

### البرمجية الوسيطة (astro-intlayer/middleware)

استيراد:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| التصدير     | النوع               | الوصف                                                                                                                                      | المستند ذو الصلة                                                                                                |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | برمجية وسيطة لـ Astro تكتشف لغة الطلب وتربط `Astro.locals.intlayer`. يتم تسجيلها تلقائيًا بواسطة `intlayer()`، أو استيرادها يدويًا لدمجها. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/onRequest.md) |

### الأدوات المساعدة

استيراد:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| الدالة              | الوصف                                                                                      | المستند ذو الصلة |
| ------------------- | ------------------------------------------------------------------------------------------ | ---------------- |
| `getIntlayerLocals` | دالة مساعدة لاسترداد كائن `IntlayerLocals` الحالي من نطاق تخزين الطلب خارج `Astro.locals`. | -                |

### أدوات العميل (astro-intlayer/client)

استيراد:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

عند استيرادها في المتصفح أو داخل وسوم `<script>` للعميل، يتم تعيين `astro-intlayer` تلقائيًا إلى `astro-intlayer/client` (المدعوم بواسطة `vanilla-intlayer`)، مما يوفر أدوات استرداد القواميس والاشتراك في المتجر وحفظ اللغة على جانب العميل.

### أدوات التنسيق (astro-intlayer/format)

استيراد:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| الخطاف            | الوصف                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `useIntl`         | يُرجع مثيل Intl مرتبطًا بلغة الطلب أو العميل مع إمكانيات التخزين المؤقت والاشتراك.       |
| `useDate`         | يُرجع دالة لتنسيق التاريخ مرتبطة مسبقًا باللغة الحالية (`Intl.DateTimeFormat`).          |
| `useNumber`       | يُرجع دالة لتنسيق الأرقام مرتبطة مسبقًا باللغة الحالية (`Intl.NumberFormat`).            |
| `useCurrency`     | يُرجع دالة لتنسيق العملة مرتبطة مسبقًا باللغة الحالية.                                   |
| `usePercentage`   | يُرجع دالة لتنسيق النسبة المئوية مرتبطة مسبقًا باللغة الحالية.                           |
| `useRelativeTime` | يُرجع دالة لتنسيق الوقت النسبي مرتبطة مسبقًا باللغة الحالية (`Intl.RelativeTimeFormat`). |
| `useList`         | يُرجع دالة لتنسيق القوائم مرتبطة مسبقًا باللغة الحالية (`Intl.ListFormat`).              |
| `useUnit`         | يُرجع دالة لتنسيق الوحدات مرتبطة مسبقًا باللغة الحالية.                                  |
| `useCompact`      | يُرجع دالة لتنسيق الأرقام المدمجة مرتبطة مسبقًا باللغة الحالية (مثل `1.5K`).             |

### أدوات HTML (astro-intlayer/html)

استيراد:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| التصدير           | النوع      | الوصف                                       |
| ----------------- | ---------- | ------------------------------------------- |
| `renderHTML`      | `Function` | دالة مساعدة مستقلة لعرض عُقد HTML.          |
| `useHTML`         | `Hook`     | خطاف للحصول على سياق وإعدادات مزود HTML.    |
| `useHTMLRenderer` | `Hook`     | خطاف للحصول على دالة عرض HTML مهيأة مسبقًا. |

### أدوات Markdown (astro-intlayer/markdown)

استيراد:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| التصدير               | النوع      | الوصف                                                         |
| --------------------- | ---------- | ------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | يترجم سلاسل markdown إلى تمثيل منظم.                          |
| `renderMarkdown`      | `Function` | يعرض محتوى markdown في عُقد إخراج.                            |
| `parseMarkdown`       | `Function` | يحلل محتوى markdown الخام إلى شجرة بناء الجملة المجردة (AST). |
| `useMarkdown`         | `Hook`     | خطاف للحصول على سياق مزود markdown.                           |
| `useMarkdownRenderer` | `Hook`     | خطاف للحصول على دالة عرض Markdown مهيأة مسبقًا.               |

### الأنواع

استيراد:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| النوع             | الوصف                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | الكائن المرفق بـ `Astro.locals.intlayer` والذي يحتوي على `locale` و `defaultLocale` و `availableLocales`. |
| `UseLocaleProps`  | خصائص التهيئة الاختيارية المقبولة بواسطة `useLocale()`.                                                   |
| `UseLocaleResult` | نوع القيمة المرجعة لـ `useLocale()`، والذي يوفر خصائص اللغة وطرق التحديث.                                 |

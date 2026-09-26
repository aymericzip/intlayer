---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: توثيق حزمة remix-intlayer
description: تكامل Remix 3 لـ Intlayer، يوفّر برمجية وسيطة، وسياق، وخطافات، ومنسقات للتوجيه المستند إلى اللغة وإدارة المحتوى.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق موحد لجميع الصادرات"
author: aymericzip
---

# حزمة remix-intlayer

توفر حزمة `remix-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Remix 3. وهي مبنية بالكامل على معايير الويب (`Request` و `Response` و `Headers` و `URL`)، وتقدم برمجية وسيطة للموجّه للتوجيه المستند إلى اللغة وعمليات إعادة الكتابة الداخلية، وتخزين السياق، والخطافات، وأدوات التنسيق لإدارة سلسة للمحتوى متعدد اللغات.

## التثبيت

```bash
npm install remix-intlayer
```

## الصادرات

### البرمجيات الوسيطة (Middleware)

استيراد:

```tsx
import { intlayer } from "remix-intlayer";
```

| الدالة     | الوصف                                                                                                                                                                                 | المستند المرتبط                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | برمجية وسيطة لموجّه Remix 3 تتعامل مع التوجيه المستند إلى اللغة (عمليات إعادة التوجيه وإعادة الكتابة الداخلية)، وتحدد لغة الطلب، وتثبتها في الكوكيز/الترويسات، وتنشئ نطاق سياق الطلب. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/intlayerMiddleware.md) |

### السياق (Context)

استيراد:

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| التصدير                     | النوع        | الوصف                                                                                                                            | المستند المرتبط                                                                                               |
| --------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | مفتاح RequestContext الذي يحتفظ بـ `IntlayerState` (`locale` و `defaultLocale` و `availableLocales`) للطلب الحالي.               | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | اسم الخاصية (`'intlayer'`) المثبتة مباشرة على سياق الطلب، مما يسمح بالوصول عبر `context.intlayer` وكذلك `context.get(Intlayer)`. | -                                                                                                             |

### الخطافات (Hooks)

استيراد:

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| الخطاف          | الوصف                                                                                                                  | المستند المرتبط                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | يختار قاموسًا واحدًا بواسطة مفتاحه ويُرجع محتواه للغة الطلب الجاري التعامل معه. يقرأ تلقائيًا من سياق الطلب / التخزين. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | يُحوّل كائن قاموس مستورد ويُرجع محتواه للغة الطلب الحالية. يدعم تجاوزات المحدّد (selector overrides).                  | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | يُرجع اللغة المحددة للطلب الحالي، بالإضافة إلى `defaultLocale` و `availableLocales` التي تم تكوينها.                   | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)         |

### الأدوات المساعدة (Utilities)

استيراد:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| الدالة                | الوصف                                                                                                                             | المستند المرتبط |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `createLocaleRouting` | دالة نقية تحسب قرارات توجيه اللغة (`redirect` أو `rewrite` أو `pass`) بالنظر إلى الطلب والتكوين والخيارات.                        | -               |
| `getIntlayerState`    | تقرأ `IntlayerState` الحالية (`locale` و `defaultLocale` و `availableLocales`) من نطاق طلب `AsyncLocalStorage` خارج مكونات React. | -               |

### أدوات التنسيق (remix-intlayer/format)

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
} from "remix-intlayer/format";
```

| الخطاف            | الوصف                                                                               |
| ----------------- | ----------------------------------------------------------------------------------- |
| `useIntl`         | يُرجع مثيل Intl مرتبطًا بلغة الطلب مع إمكانيات التخزين المؤقت والاشتراك.            |
| `useDate`         | يُرجع دالة تنسيق التاريخ مرتبطة مسبقًا بلغة الطلب (`Intl.DateTimeFormat`).          |
| `useNumber`       | يُرجع دالة تنسيق الأرقام مرتبطة مسبقًا بلغة الطلب (`Intl.NumberFormat`).            |
| `useCurrency`     | يُرجع دالة تنسيق العملة مرتبطة مسبقًا بلغة الطلب.                                   |
| `usePercentage`   | يُرجع دالة تنسيق النسبة المئوية مرتبطة مسبقًا بلغة الطلب.                           |
| `useRelativeTime` | يُرجع دالة تنسيق الوقت النسبي مرتبطة مسبقًا بلغة الطلب (`Intl.RelativeTimeFormat`). |
| `useList`         | يُرجع دالة تنسيق القوائم مرتبطة مسبقًا بلغة الطلب (`Intl.ListFormat`).              |
| `useUnit`         | يُرجع دالة تنسيق الوحدات مرتبطة مسبقًا بلغة الطلب.                                  |
| `useCompact`      | يُرجع دالة تنسيق الأرقام المضغوطة مرتبطة مسبقًا بلغة الطلب (مثل `1.5K`).            |

### أدوات HTML (remix-intlayer/html)

استيراد:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| التصدير           | النوع      | الوصف                                                 |
| ----------------- | ---------- | ----------------------------------------------------- |
| `renderHTML`      | `Function` | دالة مساعدة مستقلة لعرض عقد HTML خارج واجهة المستخدم. |
| `useHTML`         | `Hook`     | خطاف للحصول على سياق وتكوين موفر HTML.                |
| `useHTMLRenderer` | `Hook`     | خطاف للحصول على دالة عارض HTML مهيأة مسبقًا.          |

### أدوات Markdown (remix-intlayer/markdown)

استيراد:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| التصدير               | النوع      | الوصف                                                          |
| --------------------- | ---------- | -------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | تُصرّف سلاسل Markdown إلى تمثيل مهيكل.                         |
| `renderMarkdown`      | `Function` | تعرض محتوى Markdown في عقد إخراج.                              |
| `parseMarkdown`       | `Function` | تُحلل محتوى Markdown الخام إلى شجرة بناء الجملة المجردة (AST). |
| `useMarkdown`         | `Hook`     | خطاف للحصول على سياق موفر Markdown.                            |
| `useMarkdownRenderer` | `Hook`     | خطاف للحصول على دالة عارض Markdown مهيأة مسبقًا.               |

### الأنواع (Types)

استيراد:

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| النوع                       | الوصف                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | كائن الحالة الذي يحتفظ بـ `locale` و `defaultLocale` و `availableLocales` والمخزن في سياق طلب Remix. |
| `IntlayerMiddlewareOptions` | خيارات التكوين الممررة إلى البرمجية الوسيطة `intlayer()`.                                            |
| `LocaleRoutingOptions`      | خيارات لتخصيص بادئة اللغة والاكتشاف وإعادة التوجيه.                                                  |
| `LocaleRoutingAction`       | اتحاد مميز يمثل قرار التوجيه: `redirect` أو `rewrite` أو `pass`.                                     |
| `LocaleRoutingRequest`      | تمثيل أدنى للطلب مطلوب بواسطة `createLocaleRouting`.                                                 |
| `UseLocaleResult`           | نوع الإرجاع لـ `useLocale()`، يحتوي على `locale` و `defaultLocale` و `availableLocales`.             |

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة react-intlayer
description: تنفيذ خاص بـ React لـ Intlayer، يوفّر hooks و providers لتطبيقات React.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: توثيق موحّد لجميع الصادرات
---

# حزمة react-intlayer

توفر حزمة `react-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات React. تتضمن مزوِّدات السياق (context providers)، وhooks، ومكونات للتعامل مع المحتوى متعدد اللغات.

## التثبيت

```bash
npm install react-intlayer
```

## الصادرات

### الموفرون

استيراد:

```tsx
import "react-intlayer";
```

| المكوّن                   | الوصف                                                                                     | المستند ذي الصلة                                                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | المزود الرئيسي الذي يلف تطبيقك ويوفر سياق Intlayer. يتضمن دعم المحرر بشكل افتراضي.        | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | مكوّن مزود يركّز على المحتوى بدون ميزات المحرر. استخدمه عندما لا تحتاج إلى المحرر البصري. | -                                                                                                                             |
| `HTMLProvider`            | مزود لإعدادات التدويل المتعلقة بـ HTML. يسمح بتجاوز المكونات الخاصة بعناصر HTML.          | -                                                                                                                             |

### هوكس

استيراد:

```tsx
import "react-intlayer";
```

| Hook                   | الوصف                                                                                                                           | المستند المرتبط                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook على جانب العميل يختار قاموسًا واحدًا بواسطة مفتاحه ويُعيد محتواه. يستخدم قيمة locale من السياق إذا لم تُزوَّد.             | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | هو Hook يقوم بتحويل كائن القاموس ويعيد المحتوى للـlocale الحالي. يعالج ترجمات `t()`، والـenumerations، وما إلى ذلك.             | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | هو Hook يتعامل مع القواميس غير المتزامنة. يقبل خريطة قواميس معتمدة على Promise ويحلّها للـlocale الحالي.                        | -                                                                                                                       |
| `useDictionaryDynamic` | هوك يتعامل مع القواميس الديناميكية التي تُحمّل بواسطة المفتاح. يستخدم React Suspense داخليًا لحالات التحميل.                    | -                                                                                                                       |
| `useLocale`            | هوك على جهة العميل للحصول على الـlocale الحالية، الـlocale الافتراضية، الـlocales المتاحة، ودالة لتحديث الـlocale.              | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook للحصول على اللغة الحالية وجميع الحقول المتعلقة بها (locale, defaultLocale, availableLocales, setLocale) من السياق.         | -                                                                                                                       |
| `useRewriteURL`        | Hook على جانب العميل لإدارة إعادة كتابة عناوين URL. إذا وُجدت قاعدة إعادة كتابة للمسار الحالي والlocale، فسيتم تحديث عنوان URL. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | هوك يوفر دالة ترجمة `t()` للوصول إلى محتوى متداخل عبر المفتاح. يحاكي نمط i18next/next-intl.                                     | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | هوك يوفر كائن `Intl` مربوط بالـ locale. يقوم بحقن الـ locale الحالي تلقائيًا ويستخدم تخزينًا مؤقتًا محسّنًا.                    | -                                                                                                                       |
| `useLocaleStorage`     | هوك يوفر ثبات اللغة في التخزين المحلي أو في الكوكيز. يعيد دوال getter و setter.                                                 | -                                                                                                                       |
| `useLocaleCookie`      | Deprecated. استخدم `useLocaleStorage` بدلاً منه. هوك يدير ثبات اللغة في الكوكيز.                                                | -                                                                                                                       |
| `useLoadDynamic`       | خطاف لتحميل القواميس الديناميكية باستخدام React Suspense. يقبل مفتاحًا ووعدًا، ويخزن النتائج في ذاكرة التخزين المؤقت.           | -                                                                                                                       |
| `useIntlayerContext`   | خطاف يوفر قيم سياق عميل Intlayer الحالية (locale, setLocale، إلخ).                                                              | -                                                                                                                       |
| `useHTMLContext`       | Hook للوصول إلى تجاوزات مكونات HTML من سياق `HTMLProvider`.                                                                     | -                                                                                                                       |

### الدوال

استيراد:

```tsx
import "react-intlayer";
```

| الدالة               | الوصف                                                                                                                 | الوثيقة ذات الصلة                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `t`                  | دالة ترجمة على جانب العميل تُرجع الترجمة للمحتوى متعدد اللغات المزوَّد. تستخدم لغة السياق إذا لم تُحدد.               | [الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md) |
| `getDictionary`      | يقوم بمعالجة كائنات القاموس ويُعيد المحتوى للـ locale المحددة. يعالج ترجمات `t()`، enumerations، Markdown، HTML، إلخ. | -                                                                                                  |
| `getIntlayer`        | يسترجع قاموسًا بواسطة مفتاحه من التصريح المُولد ويُعيد محتواه للـ locale المحددة. إصدار مُحسّن من `getDictionary`.    | -                                                                                                  |
| `setLocaleInStorage` | يضبط locale في التخزين (local storage أو cookie بناءً على التكوين).                                                   | -                                                                                                  |
| `setLocaleCookie`    | مُهمل. استخدم `setLocaleInStorage` بدلاً من ذلك. يضبط locale في cookie.                                               | -                                                                                                  |
| `localeInStorage`    | يسترجع الـ locale من التخزين (local storage أو cookie).                                                               | -                                                                                                  |
| `localeCookie`       | مهمل. استخدم `localeInStorage` بدلاً منه. يسترجع الـ locale من cookie.                                                | -                                                                                                  |

### المكونات

استيراد:

```tsx
import "react-intlayer";
```

أو

```tsx
import "react-intlayer/markdown";
```

| المكوّن            | الوصف                                                                                                    | المستند المرتبط                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | مزود لسياق عرض Markdown. يتيح تجاوز المكونات المخصصة لعناصر Markdown.                                    | -                                                                                                                             |
| `MarkdownRenderer` | يعرض محتوى Markdown باستخدام مكونات مخصصة. يدعم جميع ميزات Markdown القياسية والتركيب الخاص بـ Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/MarkdownRenderer.md) |

### الأنواع

Import:

```tsx
import "react-intlayer";
```

| النوع          | الوصف                                                                                  |
| -------------- | -------------------------------------------------------------------------------------- |
| `IntlayerNode` | نوع يمثل عقدة في شجرة محتوى Intlayer. يستخدم للتعامل مع المحتوى مع ضمان سلامة الأنواع. |

### جانب الخادم (react-intlayer/server)

استيراد:

```tsx
import "react-intlayer/server";
```

| التصدير                  | النوع       | الوصف                                                      |
| ------------------------ | ----------- | ---------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | مزود لعملية العرض على جانب الخادم (server-side rendering). |
| `IntlayerServer`         | `Component` | غلاف على جانب الخادم لمحتوى Intlayer.                      |
| `t`                      | `Function`  | نسخة على جانب الخادم من دالة الترجمة.                      |
| `useLocale`              | `Hook`      | هوك للوصول إلى اللغة (locale) على جانب الخادم.             |
| `useIntlayer`            | `Hook`      | نسخة على جانب الخادم من `useIntlayer`.                     |
| `useDictionary`          | `Hook`      | نسخة على جانب الخادم من `useDictionary`.                   |
| `useI18n`                | `Hook`      | نسخة على جانب الخادم من `useI18n`.                         |
| `locale`                 | `Function`  | دالة للحصول على الـ locale أو تعيينه على جانب الخادم.      |

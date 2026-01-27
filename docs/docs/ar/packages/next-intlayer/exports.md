---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: حزمة next-intlayer
description: تكامل مخصص لـ Next.js مع Intlayer، يوفر ميدلوير ومزودين لكل من App Router و Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توثيق موحد لجميع الصادرات
---

# حزمة next-intlayer

توفّر حزمة `next-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Next.js. تدعم كلًا من App Router و Page Router، وتشمل ميدلوير للتوجيه بناءً على اللغة (locale-based routing).

## التثبيت

```bash
npm install next-intlayer
```

## التصدير

### الوسيط (Middleware)

استيراد:

```tsx
import "next-intlayer/middleware";
```

| الدالة               | الوصف                                                                                                                             | المستند المرتبط                                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | ميدلوير Next.js للتعامل مع التوجيه والإعادات بناءً على اللغة. يكتشف اللغة من الرؤوس/الكوكيز ويعيد التوجيه إلى مسار اللغة المناسب. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/intlayerMiddleware.md) |

### أدوات التهيئة

استيراد:

```tsx
import "next-intlayer/server";
```

| الدالة             | الوصف                                                                                                                                             | المستند المرتبط |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `withIntlayer`     | مساعد غير متزامن لتغليف تكوين Next.js، يضمن تجهيز قواميس Intlayer قبل البناء. يقوم بتحضير ملفات المحتوى وإعداد ملحقات webpack/SWC.                | -               |
| `withIntlayerSync` | مساعد متزامن لتغليف تكوين Next.js، مثالي للتكوينات التي لا يكون فيها الأسلوب غير المتزامن ممكنًا/مطلوبًا. لا يقوم بتحضير القواميس عند بدء الخادم. | -               |

### الموفرون

استيراد:

```tsx
import "next-intlayer";
```

أو

```tsx
import "next-intlayer/server";
```

| المكوّن                  | الوصف                                                                                                      | الوثيقة ذات الصلة |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- | ----------------- |
| `IntlayerClientProvider` | مزود للمكونات على جهة العميل في App Router الخاص بـ Next.js. يغلّف `IntlayerProvider` من `react-intlayer`. | -                 |
| `IntlayerServerProvider` | مزود للمكونات على جهة الخادم في Next.js (App Router). يوفر سياق اللغة (locale) على الخادم.                 | -                 |
| `IntlayerServer`         | غلاف على جهة الخادم لمحتوى Intlayer في App Router. يضمن التعامل الصحيح مع الـ locale في مكونات الخادم.     | -                 |
| `HTMLProvider`           | مزود لإعدادات التدويل المتعلقة بـ HTML. يسمح بتجاوز المكونات لعلامات HTML.                                 | -                 |
| `HTMLRenderer`           | يعرض محتوى HTML مع مكونات مخصصة.                                                                           | -                 |
| `MarkdownProvider`       | مزود لسياق عرض Markdown. يسمح بتجاوز المكونات المخصصة لعناصر Markdown.                                     | -                 |
| `MarkdownRenderer`       | يعرض محتوى Markdown مع مكونات مخصصة.                                                                       | -                 |

### Hooks (جهة العميل)

استيراد:

```tsx
import "next-intlayer";
```

يعيد تصدير معظم الـ hooks من `react-intlayer`.

| Hook                   | الوصف                                                                                                                            | المستند ذو الصلة                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook على جانب العميل يختار قاموسًا واحدًا حسب مفتاحه ويُعيد محتواه. يستخدم الـ locale من السياق إذا لم يتم توفيره.               | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook يحوّل كائن القاموس ويُرجع المحتوى للـ locale الحالي. يعالج ترجمات `t()`، والتعدادات (enumerations)، وما إلى ذلك.            | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook يتعامل مع القواميس غير المتزامنة. يقبل خريطة قواميس مبنية على Promise ويقوم بحلّها وفقًا للـ locale الحالي.                 | -                                                                                                                       |
| `useDictionaryDynamic` | Hook يتعامل مع القواميس الديناميكية المحمّلة حسب المفتاح. يستخدم React Suspense داخليًا لحالات التحميل.                          | -                                                                                                                       |
| `useLocale`            | هوك على جانب العميل للحصول على اللغة الحالية ودالة لتعيينها. محسّن لـ Next.js App Router مع دعم التنقل.                          | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | هوك على جانب العميل لإدارة إعادة كتابة عناوين URL. يقوم تلقائيًا بتحديث عنوان URL إذا وُجدت قاعدة إعادة كتابة محلية أكثر ملاءمة. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook مخصص لـ Next.js Page Router لإدارة الـ locale. يتعامل مع إعادة التوجيه وإعادة تحميل الصفحة عند تغيّر الـ locale.            | -                                                                                                                       |
| `useI18n`              | Hook يوفّر دالة ترجمة `t()` للوصول إلى محتوى متداخل بواسطة مفتاح. يُحاكي نمط i18next/next-intl.                                  | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | هوك يوفر كائن `Intl` مرتبطًا بالـ locale. يقوم بحقن الـ locale الحالية تلقائيًا ويستخدم تخزينًا مؤقتًا محسنًا.                   | -                                                                                                                       |
| `useLoadDynamic`       | هوك لتحميل قواميس ديناميكية باستخدام React Suspense. يقبل مفتاحًا ووعدًا (promise)، ويخزن النتائج في ذاكرة مؤقتة.                | -                                                                                                                       |
| `useHTMLRenderer`      | هوك للحصول على دالة عرض HTML مُكوّنة مسبقًا.                                                                                     | -                                                                                                                       |
| `useMarkdownRenderer`  | هوك للحصول على دالة عرض Markdown مُكوّنة مسبقًا.                                                                                 | -                                                                                                                       |

### الدوال (على الخادم)

استيراد:

```tsx
import "next-intlayer/server";
```

| `Function`             | الوصف                                                                                                                                                                          | الوثيقة ذات الصلة                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`                    | نسخة تعمل على جهة الخادم من دالة الترجمة لـ Next.js App Router. تُعيد ترجمة المحتوى متعدد اللغات بحسب الـ locale الخاص بالخادم.                                                | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md) |
| `getLocale`            | دالة مساعدة لاستخراج الـ locale الحالي من رؤوس (headers) وملفات تعريف الارتباط (cookies) في Next.js. مصممة لاستخدامها في Server Components، Server Actions، أو Route Handlers. | -                                                                                                      |
| `generateStaticParams` | تولد معلمات ثابتة لطرق Next.js الديناميكية بناءً على الـ locales المكوّنة. تُعيد مصفوفة من كائنات locale للـ pre-rendering.                                                    | -                                                                                                      |
| `locale`               | دالة للحصول على أو تعيين الـ locale في سياق الخادم (App Router). توفر إدارة الـ locale في Server Components.                                                                   | -                                                                                                      |

### الأنواع

استيراد:

```tsx
import "next-intlayer";
```

| النوع                  | الوصف                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `NextPageIntlayer`     | نوع لصفحات Next.js مع دعم Intlayer. نوع عام يتضمن معامل locale.                                                    |
| `Next14PageIntlayer`   | نوع لصفحات Next.js 14 مع دعم Intlayer.                                                                             |
| `Next15PageIntlayer`   | نوع لصفحات Next.js 15 مع دعم Intlayer.                                                                             |
| `NextLayoutIntlayer`   | نوع للتخطيطات (layouts) في Next.js مع دعم Intlayer. نوع عام يتضمن معامل locale.                                    |
| `Next14LayoutIntlayer` | نوع لتخطيطات Next.js 14 مع دعم Intlayer.                                                                           |
| `Next15LayoutIntlayer` | نوع لتخطيطات Next.js 15 مع دعم Intlayer.                                                                           |
| `LocalParams`          | نوع لمعلمات المسار في Next.js مع locale. كائن يحتوي على الخاصية `locale`.                                          |
| `LocalPromiseParams`   | نوع لمعلمات المسار في Next.js مع locale (الإصدار غير المتزامن). Promise تتحلل إلى كائن يحتوي على الخاصية `locale`. |

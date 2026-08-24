---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: توثيق دالة getDictionaryAsync | intlayer
description: اطلع على كيفية استخدام دالة getDictionaryAsync لحزمة intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# التوثيق: دالة `getDictionaryAsync` في `intlayer`

## الوصف

تحمل دالة `getDictionaryAsync` جزء **منطقة لغوية واحدة** من قاموس وتعيد محتواه المفسّر.

إنها نظير [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getDictionary.md) لخرائط محملات لكل منطقة لغوية المُصدرة في `.intlayer/dynamic_dictionaries/`: بدلاً من استقبال قاموس يحتوي على كل منطقة لغوية، فإنها تستقبل خريطة المحمل وتنتظر فقط الجزء الذي تحتاجه المنطقة اللغوية المطلوبة.

> في كود التطبيق، عادة تستدعي [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayerAsync.md)، وليس هذه الدالة. تُعيد [مكونات البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) كتابة كل استدعاء `getIntlayerAsync('key', locale)` إلى `getDictionaryAsync(loaderMap, 'key', locale)`. يتم تصدير `getDictionaryAsync` للمحملات المخصصة وللأدوات التي تبني خرائط محملاتها الخاصة.

**الميزات الرئيسية:**

- تحمل فقط جزء المنطقة اللغوية المطلوب
- تدعم خرائط المحملات البسيطة (`locale → loader`) والمؤهلة (`locale → qualifierId → loader`)
- تلغي التكرار للأحمال المتزامنة للجزء ذاته، وتخزن مؤقتاً المحتوى المحل
- الأحمال الفاشلة يتم حذفها من الذاكرة المؤقتة حتى تحاول استدعاء لاحقة تحميل الجزء مجدداً

---

## توقيع الدالة

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // مطلوب
  key: string,                                           // مطلوب
  localeOrSelector?: LocalesValues | DictionarySelector, // اختياري
  plugins?: Plugins[]                                    // اختياري
): Promise<DeepTransformContent<...>>
```

---

## المعاملات

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **الوصف**: خريطة محمل لكل لغة. تربط الخرائط البسيطة لغة مع محمل؛ تربط الخرائط المؤهلة (المستخدمة في المجموعات والمتغيرات) لغة مع معرّف مؤهل، ثم مع محمل. بالنسبة للخريطة المؤهلة، يتم تحميل فقط الجزء (الأجزاء) التي يستهدفها المحدد.
  - **النوع**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **مطلوب**: نعم

- `key: string`
  - **الوصف**: مفتاح القاموس، المستخدم في تقسيم ذاكرة التخزين المؤقت للأجزاء.
  - **النوع**: `string`
  - **مطلوب**: نعم

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **الوصف**: اللغة لتفسير المحتوى بها، أو كائن محدد (`{ item }`، `{ variant }`، مع `locale` اختياري). راجع [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md).
  - **النوع**: `LocalesValues | DictionarySelector`
  - **مطلوب**: لا (اختياري) — القيمة الافتراضية هي `defaultLocale` المُعينة.

- `plugins: Plugins[]`
  - **الوصف**: محولات عقدة. القيمة الافتراضية هي مجموعة المترجم الأساسي.
  - **النوع**: `Plugins[]`
  - **مطلوب**: لا (اختياري)

### العودة

- **النوع**: `Promise<Content>` — وعد يحل إلى المحتوى المفسَّر للـ chunk المُحمَّل.
- **الوصف**: يحل إلى `null` عندما لا ينبعث الـ map أي chunk للـ locale المطلوب أو لأي من fallbacks الخاصة به، مما يعكس كيفية حل الإحداثيات المؤهلة المفقودة.

---

## مثال الاستخدام

### مع خريطة محمل تم إنشاؤها

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### مع خريطة محمل مخصصة

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### مع محدد على خريطة مؤهلة

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## ملاحظات السلوك

### التخزين المؤقت وإزالة التكرار

يخزن التخزين المؤقت **الوعد** (promise) لكل ثلاثي `key + locale + selector`، بحيث تنتظر الاستدعاءات المتزامنة للمقطع نفسه تحميلًا واحدًا. يتم إزالة التحميل المرفوض من التخزين المؤقت، لذا يتم إعادة محاولة المقطع الفاشل في الاستدعاء التالي بدلاً من إعادة تشغيل الفشل نفسه إلى الأبد.

### الرجوع إلى اللغة الافتراضية

يتم المرور عبر خريطة محمل عادية بنفس سلسلة الرجوع كما هو الحال في الوضع المتزامن: اللغة المطلوبة أولاً، ثم بدائلها، ثم `null` إذا لم ينشئ أي منها chunk.

---

## الدوال ذات الصلة

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayerAsync.md): الدالة التي تستدعيها التطبيقات؛ تعيد كتابتها بواسطة مكونات البناء إلى `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getDictionary.md): نظير متزامن يأخذ قاموس كامل.
- [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md): المجموعات والمتغيرات، وخرائط المحملات التي تولدها.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```

---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: وثائق دالة getDictionary | intlayer
description: اطلع على كيفية استخدام دالة getDictionary لحزمة intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# التوثيق: دالة `getDictionary` في `intlayer`

## الوصف

تقوم دالة `getDictionary` بتفسير كائن القاموس **الذي تمرره بنفسك** وتُرجع محتواه المحلّل لمنطقة معينة. تمشي عبر المحتوى في تمريرة واحدة وتطبق كل مكون إضافي للمفسّر حسب الحاجة، محلّلة ترجمات `t()`، والتعديلات، والشروط، والإدراجات، والتداخل، والـ markdown، و HTML وعُقد الملفات.

على عكس [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayer.md)، التي تبحث عن قاموس حسب المفتاح في السجل المُنتج، تأخذ `getDictionary` القاموس نفسه. هذا يجعلها الأداة المناسبة للمحتوى المُنشأ في وقت التشغيل، أو الذي تم جلبه من API أو CMS، أو المُعلن عنه بشكل مباشر في اختبار.

**المميزات الرئيسية:**

- تعمل مع أي كائن يتبع بنية القاموس (`{ key, content }`)
- تقبل أيضًا مجموعة قاموس مؤهلة (المجموعات، المتغيرات) بالتزامن مع محدِّد
- مكتوبة بالكامل: الكائن المُرجع يعكس `content` الذي مررته
- تقبل مكونات إضافية مفسّرة مخصصة

---

## توقيع الدالة

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // مطلوب
  localeOrSelector?: LocalesValues | DictionarySelector, // اختياري
  plugins?: Plugins[]                                // اختياري
): DeepTransformContent<...>
```

---

## المعاملات

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **الوصف**: القاموس (أو مجموعة القاموس المؤهلة) الذي سيتم تفسيره.
  - **النوع**: `Dictionary | QualifiedDictionaryGroup`
  - **مطلوب**: نعم

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **الوصف**: اللغة لتفسير المحتوى بها، أو كائن محدد (`{ item }`, `{ variant }`, اختياري مع `locale`). انظر [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md).
  - **النوع**: `LocalesValues | DictionarySelector`
  - **مطلوب**: لا (اختياري) — يُفترض القيمة الافتراضية `defaultLocale`.

- `plugins: Plugins[]`
  - **الوصف**: مصفوفة من محولات العقد التي تحدد كيفية تفسير العقد المعروفة. إذا تم حذفها، يتم استخدام مجموعة مفسر البرامج الإضافية الافتراضية.
  - **النوع**: `Plugins[]`
  - **مطلوب**: لا (اختياري)

### العودة

- **Type**: المحتوى المترجم للقاموس.
- **Description**: `content` التي مررتها، مع حل كل عقدة Intlayer للغة المطلوبة. بالنسبة لمجموعة collection بدون محدد `item`، يتم إرجاع مصفوفة مرتبة من الإدخالات المترجمة؛ يتم إرجاع `null` عندما يستهدف المحدد شيئًا لا يوجد.

---

## مثال على الاستخدام

### الاستخدام الأساسي

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        ar: "مرحبا",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "ar"
);

console.log(content.greeting); // "مرحبا"
```

### تفسير المحتوى المجلوب في وقت التشغيل

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### مع محدد

```typescript
import { getDictionary } from "intlayer";

// يتم حل مجموعة قاموس مؤهلة إلى إدخال واحد…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …أو إلى مصفوفة مرتبة عندما لا يتم إعطاء `item`
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## الدوال ذات الصلة

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayer.md): نفس التفسير، لكن يتم البحث عن القاموس حسب المفتاح في السجل المُنشأ.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getDictionaryAsync.md): نظير خرائط المحمّل لكل لغة.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useDictionary.md): معادل React hook، يقرأ اللغة من الموفر.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```

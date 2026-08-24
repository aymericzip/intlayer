---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: توثيق دالة getIntlayer | intlayer
description: انظر كيفية استخدام دالة getIntlayer لحزمة intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: دالة `getIntlayer` في `intlayer`

## الوصف

تقوم دالة `getIntlayer` باختيار قاموس واحد من خلال مفتاحه وتعيد محتواه المُفسَّر للغة محددة. وهي النظير المستقل عن الإطار (framework-agnostic) للربط `useIntlayer`: نفس المحتوى، نفس المحددات، لكنها قابلة للاستخدام في أي مكان لا يتوفر فيه سياق React — نصوص Node، دوال الخادم، محملات المسارات، منشئو البيانات الوصفية، معالجات Express/Fastify، الاختبارات.

تقرأ القواميس التي تم إنشاؤها بواسطة Intlayer في `.intlayer/`، لذا فإن وسيط `key` له نوع ويتم إكمال سيارته تلقائياً من إعلانات المحتوى الخاصة بك، والكائن المُعاد له نوع كامل حتى كل ورقة.

**الميزات الرئيسية:**

- مفاتيح قاموس مكتوبة ومحتوى مُعاد مكتوب
- تفسير كل عقدة محتوى (`t()`، `enu()`، `cond()`، `insert()`، `nest()`، `md()`، `html()`، `file()`، `gender()`)
- قبول لغة أو كائن محدد (مجموعات، متغيرات)
- يتم حفظ النتائج في الذاكرة لكل `key + locale + selector`
- الرجوع إلى وكيل آمن في وضع التطوير عندما يكون القاموس مفقوداً، بدلاً من توقف البرنامج

---

## توقيع الدالة

```typescript
getIntlayer(
  key: DictionaryKeys,                        // مطلوب
  localeOrSelector?: LocalesValues | DictionarySelector, // اختياري
  plugins?: Plugins[]                         // اختياري
): DeepTransformContent<...>
```

---

## المعاملات

- `key: DictionaryKeys`
  - **الوصف**: مفتاح القاموس المراد قراءته، كما هو معلّن في ملفات المحتوى الخاصة بك.
  - **النوع**: `DictionaryKeys` — اتحاد كل مفاتيح القاموس المعلنة.
  - **مطلوب**: نعم

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **الوصف**: اللغة المراد تفسير المحتوى بها، أو كائن محدد لـ [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md).
    - `'fr'` — لغة
    - `{ item: 2 }` — عنصر [مجموعة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/collections.md) (حذف `item` للحصول على كل عنصر كمصفوفة)
    - `{ variant: 'black-friday' }` — [متغير](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/variants.md) مسمى (حذف للحصول على المتغير `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — متغير منظم
    - أي محدد يمكنه أن يحمل لغة: `{ item: 2, locale: 'fr' }`
  - **النوع**: `LocalesValues | DictionarySelector`
  - **مطلوب**: لا (اختياري) — القيمة الافتراضية هي `defaultLocale` المكونة.

- `plugins: Plugins[]`
  - **الوصف**: محولات عقدة مخصصة تحل محل مكونات المُفسّر الأساسية. للاستخدام المتقدم فقط؛ حذفها للحفاظ على السلوك الافتراضي.
  - **النوع**: `Plugins[]`
  - **مطلوب**: لا (اختياري)

### العودة

- **النوع**: محتوى القاموس المُفسَّر، مُكتَّب من تصريحك.
- **الوصف**: كائن عادي يعكس حقل `content` من قاموسك، حيث تم حل كل عقدة Intlayer إلى قيمتها النهائية للغة المطلوبة.

---

## مثال على الاستخدام

### الاستخدام الأساسي

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      ar: "مرحبا",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### بدون locale

حذف locale يفسر المحتوى باستخدام `defaultLocale` المعلنة في [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // يتم تفسيره باستخدام locale الافتراضية
```

### داخل معالج الخادم

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### مع محدد (المجموعات والمتغيرات)

```typescript
import { getIntlayer } from "intlayer";

// عنصر مجموعة واحد
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// كل عنصر من المجموعة، كمصفوفة مرتبة
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// متغير مسمى
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## ملاحظات السلوك

### التخزين المؤقت

تُحفظ النتائج في ذاكرة تخزين مؤقت على مستوى الوحدة مفهرسة بـ `key + locale + selector`. استدعاء `getIntlayer("app", "fr")` بشكل متكرر يفسر القاموس مرة واحدة فقط ويعيد نفس الكائن بعد ذلك.

### القواميیس المفقودة

أثناء التطوير، طلب مفتاح لا توجد له قاموس مُنشأ يسجل تحذيراً مرة واحدة ويعيد بروكسي آمن للعودة: قراءة `content.title` تعطي السلسلة `"app.title"` بدلاً من رفع خطأ. هذا يحافظ على الصفحة قابلة للاستخدام بينما يتم إصلاح الإعلان المفقود. قم بتشغيل بناء Intlayer (أو خادم التطوير) حتى يتم إنشاء القاموس.

### حجم الحزمة

يقرأ `getIntlayer` القاموس المدمج الذي يحتوي على **كل** لغة. في حزم العميل، تعيد [ملحقات البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) كتابة الاستدعاء بحيث يتم شحن المحتوى المطلوب فقط. عندما تقرأ المحتوى خارج التصيير (البيانات الوصفية، المحملات، وظائف الخادم) وتريد تحميل لغة واحدة حسب الطلب، استخدم [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayerAsync.md) بدلاً من ذلك.

---

## الدوال ذات الصلة

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayerAsync.md): نظير غير متزامن يحمل مجموعة منطقة واحدة.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getDictionary.md): يفسر كائن القاموس الذي تمرره بنفسك، بدلاً من البحث عنه حسب المفتاح.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md): معادل React hook، يقرأ المنطقة من موفر الخدمة.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```

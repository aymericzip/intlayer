---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: توثيق دالة getIntlayerAsync | intlayer
description: انظر كيفية استخدام دالة getIntlayerAsync لحزمة intlayer
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
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
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# التوثيق: دالة `getIntlayerAsync` في `intlayer`

## الوصف

تقوم دالة `getIntlayerAsync` باختيار قاموس واحد حسب مفتاحه وحل محتواه للغة معينة، **محملة تلك اللغة وحدها**.

إنها النظير غير المتزامن لـ [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayer.md)، مخصصة للأماكن التي يتم فيها قراءة القاموس خارج العرض — منشئات `head` / metadata للمسار، loaders، server functions.

حيث يسحب `getIntlayer` القاموس المدمج الذي يحتوي على كل لغة، فإن [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) تعيد كتابة هذا الاستدعاء إلى `getDictionaryAsync(loaderMap, key, locale)`، مشيرة إلى أجزاء كل لغة في `.intlayer/dynamic_dictionaries/`. وبالتالي، يحمل bundle فقط اللغة المطلوبة فعلياً.

بدون هذه البرامج المساعدة — بناء غير محسّن — يتم حل الاستدعاء من خلال سجل القاموس المتزامن بدلاً من ذلك: نفس المحتوى، بدون تقسيم اللغة.

**الميزات الرئيسية:**

- نفس المفاتيح المكتوبة والمحددات والمحتوى المُرجع مثل `getIntlayer`
- يحمل فقط جزء اللغة المطلوب في الإنشاءات المحسّنة
- الاستدعاءات المتزامنة لنفس الجزء تشارك تحميلاً واحداً
- آمن للاستخدام في منشئات `async` metadata و loaders و server functions

---

## Function Signature

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // مطلوب
  localeOrSelector?: LocalesValues | DictionarySelector, // اختياري
  plugins?: Plugins[]                         // اختياري
): Promise<DeepTransformContent<...>>
```

---

## المعاملات

- `key: DictionaryKeys`
  - **الوصف**: مفتاح القاموس المراد قراءته، كما هو معرّف في ملفات المحتوى الخاصة بك.
  - **النوع**: `DictionaryKeys` — اتحاد لكل مفتاح قاموس معلن.
  - **مطلوب**: نعم

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **الوصف**: الإعدادات المحلية لتفسير المحتوى بها، أو كائن محدد لـ [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md).
    - `'fr'` — إعدادات محلية
    - `{ item: 2 }` — عنصر [مجموعة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/collections.md) (تجاهل `item` للحصول على كل عنصر كمصفوفة)
    - `{ variant: 'black-friday' }` — [متغير](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/variants.md) مسمى (تجاهل للحصول على الإعدادات `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — متغير منظم
    - أي محدد يمكن أن يحمل إعدادات محلية: `{ item: 2, locale: 'fr' }`
  - **النوع**: `LocalesValues | DictionarySelector`
  - **مطلوب**: لا (اختياري) — الافتراضي هو `defaultLocale` المُكوّن.

- `plugins: Plugins[]`
  - **الوصف**: محولات عقدة مخصصة تحل محل مكونات المُفسّر الأساسية. للاستخدام المتقدم فقط.
  - **النوع**: `Plugins[]`
  - **مطلوب**: لا (اختياري)

### المخرجات

- **Type**: `Promise<Content>` — وعد يتم حله إلى المحتوى المفسر للقاموس، مكتوب من إعلانك.

---

## مثال الاستخدام

### الاستخدام الأساسي

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### في مسار TanStack Start `head`

نظراً لأن مقطع اللغة يتم تحميله عند الطلب، يصبح `head` من نوع `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### في Next.js `generateMetadata`

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### في دالة خادم

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` مقابل `getIntlayerAsync`

|                  | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| الإرجاع          | المحتوى                                                                                                         | وعد بالمحتوى                            |
| القاموس المحمّل  | القاموس المدمج (جميع اللغات)                                                                                    | جزء اللغة المطلوبة فقط                  |
| الأنسب للـ       | العرض، مسارات الكود المتزامنة                                                                                   | البيانات الوصفية، المحملات، دوال الخادم |
| هل يتطلب plugin؟ | لا                                                                                                              | لا — تقسيم كل لغة يتطلب build plugins   |

كلاهما يقبل نفس المعاملات ويعيد نفس المحتوى: التبديل من أحدهما إلى الآخر يغير فقط **متى** و**كم** يتم تحميله.

---

## الوظائف ذات الصلة

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayer.md): المكافئ المتزامن الذي يقرأ القاموس المدمج.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getDictionaryAsync.md): الدالة منخفضة المستوى التي تعيد كتابتها إضافات البناء إلى هذا الاستدعاء.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocale.md): يكتشف لغة الطلب الوارد.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```

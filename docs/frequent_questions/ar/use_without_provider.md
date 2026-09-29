---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "هل يمكنني استخدام Intlayer بدون provider عام؟"
description: "قراءة محتوى Intlayer دون إضافة provider، وكيف تُحل الـ locale على الخادم وفي المتصفح، وفرق الأداء مقارنة بالـ provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - الأداء
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# هل يمكنني استخدام Intlayer بدون provider عام؟

نعم. `getIntlayer` و`getDictionary` دوال بسيطة لا تحتاج إلى أي provider، و`useIntlayer` تعمل أيضًا خارج provider.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // لم تُمرَّر أي locale
```

## أي locale تُستخدم؟

الـ locale الممررة صراحةً لها الأولوية دائمًا. وإلا، تُحل الـ locale بهذا الترتيب:

1. **locale الطلب الحالي**، على الخادم، عندما يعالجه تكامل من Intlayer: الـ middlewares الخاصة بـ `express-intlayer` و`fastify-intlayer` و`hono-intlayer` و`adonis-intlayer` و`elysia-intlayer` و`remix-intlayer` و`astro-intlayer`، أو `IntlayerProvider` في React Server Components.
2. **locale المخزنة في المتصفح** (cookie، `localStorage`، `sessionStorage`)، وهي التي يحفظها مبدّل اللغة لديك.
3. **`defaultLocale`** من إعداداتك.

يُحل كل طلب من ملفات cookies والـ headers الخاصة به، ويُحفظ في نطاق خاص بهذا الطلب. لا يتشارك المستخدمون المتزامنون ذوو الـ locales المختلفة الـ locale أبدًا.

ينطبق الحل نفسه على `getDictionary`، وعلى الاستدعاءات التي يعيد كتابتها [تحسين البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)، وعلى `useIntlayer` و`useDictionaryDynamic` عند عرضها خارج provider.

- [تحسين البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)

### Server Components في Next.js

في Next.js، لا يمكن قراءة locale الطلب إلا بشكل غير متزامن، عبر `headers()` و`cookies()`. استخدم [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayerAsync.md)، التي تنتظرها بنفس طريقة `getLocale()` من `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // locale الطلب

  return { title };
};
```

تنقل قراءة الـ headers المسار إلى العرض الديناميكي. عندما يوفر `IntlayerProvider` الـ locale مسبقًا، لا تُقرأ الـ headers ويبقى المسار ثابتًا.

## الأداء: مع provider أو بدونه

المحتوى نفسه. الفرق يتعلق بالتفاعلية وتكلفة العرض.

|                  | مع provider                                  | بدون provider                                                                                         |
| ---------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| تغيير الـ locale | يُعاد عرض المكونات في مكانها دون إعادة تحميل | لا يُعاد عرض أي شيء؛ تظهر الـ locale الجديدة في الاستدعاء التالي (تنقل، إعادة تحميل)                  |
| تكلفة القراءة    | قراءة السياق والاشتراك في الـ locale         | استدعاء دالة memoized، الكائن نفسه لنفس `key + locale`                                                |
| تكلفة التغيير    | إعادة عرض كل مستهلك                          | لا شيء                                                                                                |
| العرض على الخادم | يعرض الخادم والمتصفح الـ locale نفسها        | خارج تكامل الطلبات، يعرض الخادم `defaultLocale` والمتصفح الـ locale المخزنة: hydration mismatch محتمل |
| الـ Bundle       | كود الـ provider                             | نحو 100 بايت (gzip) لقراءة الـ locale المخزنة، مخزنة مؤقتًا حتى التغيير التالي                        |

احتفظ بالـ provider للتطبيقات التفاعلية التي تغيّر الـ locale في مكانها أو تُعرض على الخادم. واستغنِ عنه في الـ backends والسكربتات والصفحات الثابتة التي تأتي الـ locale فيها من الـ URL (مرّرها صراحةً)، أو الكود الذي يقرأ المحتوى مرة واحدة.

راجع [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayer.md) لمزيد من التفاصيل.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getIntlayer.md)

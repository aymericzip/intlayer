---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: كيفية تخصيص قائمة اللغات؟
description: تعلّم كيفية تخصيص قائمة اللغات.
keywords:
  - اللغات
  - القائمة
  - intlayer
  - التهيئة
  - availableLocales
  - defaultLocale
  - useLocale
  - hook
  - اللغة
  - القائمة
slugs:
  - doc
  - faq
  - customized-locale-list
---

# هل من الممكن حظر نوع لغة، مثل الإنجليزية؟ أنا أضيف الإنجليزية في قواميسي لكن لا أريد أن تكون الإنجليزية متاحة على الموقع بعد

نعم، يمكنك حظر نوع لغة، مثل الإنجليزية، باستخدام خيار `availableLocales` في تهيئة Intlayer.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

أو

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

سيؤدي هذا التهيئة إلى تغيير أنواع دالة `t()` الخاصة بك لتشمل فقط اللغات المتاحة.

اللغات المتاحة خيار اختياري، إذا لم تقم بتوفيرها، فستكون جميع اللغات متاحة.

كن حذرًا، يجب أن تكون جميع اللغات المدرجة في خيار `availableLocales` مدرجة أيضًا في خيار `locales`.

لاحظ أنه إذا كنت تستخدم الخطاف `useLocale`، فسيتم استخدام خيار `availableLocales` لتحديد الوصول إلى قائمة اللغات.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```

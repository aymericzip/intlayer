---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: توثيق خطاف useDictionary | astro-intlayer
description: تعرّف على كيفية استخدام خطاف useDictionary في مكونات وسكربتات Astro لتحليل كائنات القاموس.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي"
author: aymericzip
---

# توثيق خطاف useDictionary

يقوم خطاف `useDictionary` بتحليل كائن قاموس مستورد أو مضمن ويُرجع محتواه للغة الحالية في تطبيقات Astro.

على عكس `useIntlayer`، الذي يسترد القواميس بالمفتاح من سجل القواميس العام، يعمل `useDictionary` مباشرة مع كائن القاموس.

## الاستخدام

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

يمكنك أيضًا تمرير قواميس مضمنة محددة باستخدام `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      ar: "جميع الحقوق محفوظة.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## المعاملات

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: كائن قاموس أو مجموعة قواميس مؤهلة.
2. **`localeOrSelector`** (اختياري): لغة محددة أو كائن محدد (`{ item }`، `{ variant }`، مع `locale` اختياريًا).

## الوصف

يقوم الخطاف بالمهام التالية:

1. **اكتشاف اللغة**: على الخادم، يحصل على اللغة من `Astro.locals.intlayer`. في المتصفح، يستخدم لغة متجر جانب العميل.
2. **معالجة المحتوى**: يحلل الترجمات (`t()`) والتعدادات والشروط والهياكل المتداخلة وفقًا للغة المحددة.
3. **المحددات**: يطبق أي محددات عناصر أو متغيرات متوفرة في المعاملات.

## المستندات ذات الصلة

- [تكامل `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/intlayer.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useIntlayer.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/astro-intlayer/useLocale.md)

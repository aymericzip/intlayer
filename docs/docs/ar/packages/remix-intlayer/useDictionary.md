---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: توثيق خطاف useDictionary | remix-intlayer
description: تعرّف على كيفية استخدام خطاف useDictionary في تطبيقات Remix 3 لتحليل كائنات القاموس وفقًا للغة الطلب الحالية.
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - التدويل
  - توثيق
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "توثيق أولي لخطاف useDictionary"
author: aymericzip
---

# توثيق خطاف useDictionary

يقوم خطاف `useDictionary` بتحويل كائن قاموس مستورد أو مضمن وإرجاع محتواه المحلل وفقًا للغة الطلب الحالية في تطبيقات Remix 3.

على عكس `useIntlayer` الذي يبحث عن القواميس بواسطة مفتاحها النصي من سجل القواميس العام، يقبل `useDictionary` كائن القاموس مباشرة.

## الاستخدام

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

يمكنك أيضًا تمرير قواميس مضمنة محددة باستخدام `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
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

  return `<footer>${content.copyright}</footer>`;
};
```

## المعاملات

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: كائن قاموس أو مجموعة قواميس مؤهلة.
2. **`localeOrSelector`** (اختياري): لغة محددة أو كائن محدد (`{ item }`، `{ variant }`، مع `locale` اختياريًا). له الأولوية على لغة الطلب عند توفيره.

## الوصف

يقوم الخطاف بالمهام التالية:

1. **اكتشاف اللغة**: يقرأ لغة الطلب النشطة من مخزن `AsyncLocalStorage` الذي تم إنشاؤه بواسطة البرمجية الوسيطة `intlayer()`.
2. **تحليل المحتوى**: يقيّم الترجمات (`t()`)، والتعدادات، والشروط، والهياكل المتداخلة وفقًا للغة المحددة.
3. **معالجة المحددات**: يطبق أي محددات عناصر أو متغيرات محددة في المعاملات.

## المستندات ذات الصلة

- [البرمجية الوسيطة `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/intlayerMiddleware.md)
- [خطاف `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useIntlayer.md)
- [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/remix-intlayer/useLocale.md)

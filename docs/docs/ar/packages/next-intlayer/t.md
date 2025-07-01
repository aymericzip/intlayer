---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة t | next-intlayer
description: تعرف على كيفية استخدام دالة t لحزمة next-intlayer
keywords:
  - t
  - الترجمة
  - Intlayer
  - next-intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - t
---

# التوثيق: دالة `t` في `next-intlayer`

تُعد دالة `t` في حزمة `next-intlayer` أداة أساسية للتدويل المضمن داخل تطبيق Next.js الخاص بك. تتيح لك تعريف الترجمات مباشرة داخل مكوناتك، مما يجعل من السهل عرض المحتوى المحلي بناءً على اللغة الحالية.

---

## نظرة عامة

تُستخدم دالة `t` لتوفير الترجمات لمختلف اللغات مباشرة في مكوناتك. من خلال تمرير كائن يحتوي على الترجمات لكل لغة مدعومة، تُرجع دالة `t` الترجمة المناسبة بناءً على سياق اللغة الحالي في تطبيق Next.js الخاص بك.

---

## الميزات الرئيسية

- **الترجمات المضمنة**: مثالية للنصوص السريعة والمضمنة التي لا تتطلب إعلان محتوى منفصل.
- **الاختيار التلقائي للغة**: تُرجع الترجمة المطابقة للغة الحالية تلقائيًا.
- **دعم TypeScript**: يوفر أمان النوع والإكمال التلقائي عند استخدامه مع TypeScript.
- **تكامل سهل**: يعمل بسلاسة داخل مكونات العميل والخادم في Next.js.

---

## توقيع الدالة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعاملات

- `translations`: كائن تكون مفاتيحه رموز اللغات (مثل `en`، `fr`، `es`) وقيمه هي النصوص المترجمة المقابلة.

### القيمة المرجعة

- نص يمثل المحتوى المترجم للغة الحالية.

---

## أمثلة الاستخدام

### استخدام `t` في مكون عميل

تأكد من تضمين التوجيه `'use client';` في أعلى ملف المكون الخاص بك عند استخدام `t` في مكون جانب العميل.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "هذا هو محتوى مثال لمكون عميل",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### استخدام `t` في مكون الخادم

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "هذا هو محتوى مثال لمكون خادم",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "هذا هو محتوى مثال لمكون خادم",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "هذا هو محتوى مثال لمكون خادم",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### الترجمات المضمنة في السمات

تُعتبر دالة `t` مفيدة بشكل خاص للترجمات المضمنة داخل سمات JSX.
عند تعريب السمات مثل `alt`، `title`، `href`، أو `aria-label`، يمكنك استخدام `t` مباشرة داخل السمة.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## مواضيع متقدمة

### التكامل مع TypeScript

دالة `t` آمنة من حيث النوع عند استخدامها مع TypeScript، مما يضمن توفير جميع اللغات المطلوبة.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### اكتشاف اللغة والسياق

في `next-intlayer`، يتم إدارة اللغة الحالية من خلال مزودي السياق: `IntlayerClientProvider` و `IntlayerServerProvider`. تأكد من أن هؤلاء المزودين يحيطون بمكوناتك وأن خاصية `locale` تمرر بشكل صحيح.

#### مثال:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* مكوناتك هنا */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* مكوناتك هنا */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* مكوناتك هنا */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## الأخطاء الشائعة واستكشاف المشكلات

### `t` تُعيد قيمة غير معرفة أو ترجمة غير صحيحة

- **السبب**: لم يتم تعيين اللغة الحالية بشكل صحيح، أو الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerClientProvider` أو `IntlayerServerProvider` تم إعدادهما بشكل صحيح مع اللغة المناسبة `locale`.
  - تأكد من أن كائن الترجمات الخاص بك يشمل جميع اللغات اللازمة.

### الترجمات المفقودة في TypeScript

- **السبب**: كائن الترجمات لا يلبي اللغات المطلوبة، مما يؤدي إلى أخطاء في TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لضمان اكتمال الترجمات الخاصة بك.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // عدم وجود 'es' سيسبب خطأ في TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // عدم وجود 'es' سيسبب خطأ في TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // عدم وجود 'es' سيسبب خطأ في TypeScript [!code error]
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعال

1. **استخدم `t` للترجمات البسيطة داخل السطر**: مثالي لترجمة قطع صغيرة من النص مباشرة داخل مكوناتك.
2. **فضل استخدام `useIntlayer` للمحتوى المنظم**: لترجمات أكثر تعقيدًا وإعادة استخدام المحتوى، قم بتعريف المحتوى في ملفات التصريحات واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من توفير اللغة الخاصة بك بشكل متسق عبر تطبيقك من خلال المزودين المناسبين.
4. **الاستفادة من TypeScript**: استخدم أنواع TypeScript لاكتشاف الترجمات المفقودة وضمان سلامة النوع.

---

## الخاتمة

دالة `t` في `next-intlayer` هي أداة قوية ومريحة لإدارة الترجمات داخل السطر في تطبيقات Next.js الخاصة بك. من خلال دمجها بشكل فعال، تعزز قدرات التدويل في تطبيقك، مما يوفر تجربة أفضل للمستخدمين حول العالم.

لمزيد من الاستخدام التفصيلي والميزات المتقدمة، يرجى الرجوع إلى [توثيق next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerClientProvider` و `IntlayerServerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح إلى مكوناتك. هذا أمر بالغ الأهمية لكي تقوم دالة `t` بإرجاع الترجمات الصحيحة.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ

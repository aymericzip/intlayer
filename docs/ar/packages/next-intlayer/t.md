---
docName: package__next-intlayer__t
url: /doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة t | next-intlayer
description: انظر كيف تستخدم دالة t لحزمة next-intlayer
keywords:
  - t
  - ترجمة
  - Intlayer
  - next-intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# التوثيق: وظيفة `t` في `next-intlayer`

وظيفة `t` في حزمة `next-intlayer` هي أداة أساسية للتدويل المضمّن داخل تطبيق Next.js الخاص بك. تتيح لك تعريف الترجمات مباشرة داخل مكوناتك، مما يجعل من السهل عرض المحتوى المحلي بناءً على اللغة الحالية.

---

## نظرة عامة

تُستخدم وظيفة `t` لتوفير الترجمات للغات المختلفة مباشرة في مكوناتك. من خلال تمرير كائن يحتوي على الترجمات لكل لغة مدعومة، تُرجع `t` الترجمة المناسبة بناءً على سياق اللغة الحالي في تطبيق Next.js الخاص بك.

---

## الميزات الرئيسية

- **ترجمات مضمّنة**: مثالية للنصوص السريعة والمضمّنة التي لا تتطلب إعلان محتوى منفصل.
- **اختيار اللغة تلقائيًا**: تُرجع الترجمة المطابقة للغة الحالية تلقائيًا.
- **دعم TypeScript**: يوفر أمان الأنواع والإكمال التلقائي عند استخدامه مع TypeScript.
- **تكامل سهل**: يعمل بسلاسة داخل المكونات العميلة والخادم في Next.js.

---

## توقيع الوظيفة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعلمات

- `translations`: كائن حيث تكون المفاتيح هي رموز اللغات (مثل `en`, `fr`, `es`) والقيم هي النصوص المترجمة المقابلة.

### الإرجاع

- سلسلة تمثل المحتوى المترجم للغة الحالية.

---

## أمثلة الاستخدام

### استخدام `t` في مكون عميل

تأكد من تضمين التوجيه `'use client';` في أعلى ملف المكون الخاص بك عند استخدام `t` في مكون على جانب العميل.

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
      ar: "هذا هو محتوى مثال لمكون عميل",
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
      ar: "هذا هو محتوى مثال لمكون عميل",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
      ar: "هذا هو محتوى مثال لمكون عميل",
    })}
  </p>
);
```

### استخدام `t` في مكون خادم

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      ar: "هذا هو محتوى مثال لمكون خادم",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      ar: "هذا هو محتوى مثال لمكون خادم",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      ar: "هذا هو محتوى مثال لمكون خادم",
    })}
  </p>
);
```

### الترجمات المضمّنة في السمات

تعتبر وظيفة `t` مفيدة بشكل خاص للترجمات المضمّنة في سمات JSX.
عند توطين السمات مثل `alt`, `title`, `href`, أو `aria-label`، يمكنك استخدام `t` مباشرة داخل السمة.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ar: "إرسال",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ar: "إرسال",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
      ar: "منظر جميل",
    })}
  />
</button>
```

---

## مواضيع متقدمة

### تكامل TypeScript

وظيفة `t` آمنة من حيث الأنواع عند استخدامها مع TypeScript، مما يضمن توفير جميع اللغات المطلوبة.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ar: "مرحبًا",
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
  ar: "مرحبًا",
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
  ar: "مرحبًا",
};

const greeting = t(translations);
```

### اكتشاف اللغة والسياق

في `next-intlayer`، تتم إدارة اللغة الحالية من خلال موفري السياق: `IntlayerClientProvider` و `IntlayerServerProvider`. تأكد من أن هؤلاء الموفّرين يلفون مكوناتك وأن الخاصية `locale` يتم تمريرها بشكل صحيح.

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

## الأخطاء الشائعة واستكشاف الأخطاء وإصلاحها

### `t` تُرجع undefined أو ترجمة غير صحيحة

- **السبب**: لم يتم تعيين اللغة الحالية بشكل صحيح، أو الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerClientProvider` أو `IntlayerServerProvider` تم إعدادهما بشكل صحيح مع اللغة المناسبة.
  - تأكد من أن كائن الترجمات الخاص بك يتضمن جميع اللغات الضرورية.

### الترجمات المفقودة في TypeScript

- **السبب**: كائن الترجمات لا يفي باللغات المطلوبة، مما يؤدي إلى أخطاء في TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لفرض اكتمال الترجمات.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // فقدان 'es' سيتسبب في خطأ TypeScript [!code error]
  ar: "نص",
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // فقدان 'es' سيتسبب في خطأ TypeScript [!code error]
  ar: "نص",
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // فقدان 'es' سيتسبب في خطأ TypeScript [!code error]
  ar: "نص",
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعّال

1. **استخدم `t` للترجمات المضمّنة البسيطة**: مثالية لترجمة النصوص الصغيرة مباشرة داخل مكوناتك.
2. **فضل `useIntlayer` للمحتوى المنظم**: للحصول على ترجمات أكثر تعقيدًا وإعادة استخدام المحتوى، قم بتعريف المحتوى في ملفات الإعلان واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من أن اللغة يتم توفيرها بشكل متسق عبر تطبيقك من خلال الموفّرين المناسبين.
4. **استفد من TypeScript**: استخدم أنواع TypeScript لاكتشاف الترجمات المفقودة وضمان أمان الأنواع.

---

## الخاتمة

وظيفة `t` في `next-intlayer` هي أداة قوية ومريحة لإدارة الترجمات المضمّنة في تطبيقات Next.js الخاصة بك. من خلال دمجها بشكل فعّال، تعزز قدرات التدويل لتطبيقك، مما يوفر تجربة أفضل للمستخدمين في جميع أنحاء العالم.

للحصول على استخدام أكثر تفصيلاً وميزات متقدمة، راجع [توثيق next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerClientProvider` و `IntlayerServerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح إلى مكوناتك. هذا أمر بالغ الأهمية لكي تُرجع وظيفة `t` الترجمات الصحيحة.

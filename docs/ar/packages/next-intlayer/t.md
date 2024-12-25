# الوثائق: دالة `t` في `next-intlayer`

تعتبر دالة `t` في حزمة `next-intlayer` أداة أساسية للتدويل داخل تطبيقات Next.js. تتيح لك تعريف الترجمات مباشرة داخل المكونات الخاصة بك، مما يجعل من السهل عرض المحتوى المحلي بناءً على اللغة الحالية.

---

## نظرة عامة

تستخدم دالة `t` لتوفير الترجمات لمناطق محلية مختلفة مباشرة في المكونات الخاصة بك. من خلال تمرير كائن يحتوي على ترجمات لكل لغة مدعومة، تقوم دالة `t` بإرجاع الترجمة المناسبة بناءً على سياق اللغة الحالي في تطبيق Next.js الخاص بك.

---

## الميزات الرئيسية

- **ترجمات ضمنية**: مثالية للنصوص السريعة التي لا تتطلب إعلان محتوى منفصل.
- **اختيار اللغة التلقائي**: تقوم بإرجاع الترجمة المقابلة للغة الحالية تلقائيًا.
- **دعم TypeScript**: توفر أمان النوع والتكمل التلقائي عند استخدامها مع TypeScript.
- **تكامل سهل**: تعمل بسلاسة داخل كل من مكوناته العميلة والخادمة في Next.js.

---

## توقيع الدالة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعلمات

- `translations`: كائن حيث تعتبر المفاتيح رموز لغات (مثل `en`, `fr`, `es`) والقيم هي السلاسل المترجمة المقابلة.

### الإرجاع

- سلسلة تمثل المحتوى المترجم للغة الحالية.

---

## أمثلة على الاستخدام

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
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
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
    })}
  </p>
);
```

### الترجمات المدمجة في السمات

تعتبر دالة `t` مفيدة بشكل خاص للترجمات المدمجة في سمات JSX. عند تحديد السمات مثل `alt` و `title` و `href` أو `aria-label`، يمكنك استخدام `t` مباشرة داخل السمة.

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

## الموضوعات المتقدمة

### تكامل TypeScript

تعتبر دالة `t` آمنة من حيث النوع عند استخدامها مع TypeScript، مما يضمن توفير جميع اللغات المطلوبة.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### الكشف عن اللغة والسياق

في `next-intlayer`، تتم إدارة اللغة الحالية من خلال مزودي السياق: `IntlayerClientProvider` و `IntlayerServerProvider`. تأكد من أن هذه المزودات تغلف مكوناتك وأن خاصية `locale` تمر بشكل صحيح.

#### مثال:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

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

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* مكوناتك هنا */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## أخطاء شائعة واستكشاف الأخطاء وإصلاحها

### دالة `t` تعيد قيمة غير معرفة أو ترجمة غير صحيحة

- **السبب**: قد لا تكون اللغة الحالية مضبوطة بشكل صحيح، أو قد تكون الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerClientProvider` أو `IntlayerServerProvider` مُعد بشكل صحيح مع `locale` المناسب.
  - تأكد من أن كائن الترجمات الخاص بك يتضمن جميع اللغات الضرورية.

### الترجمات المفقودة في TypeScript

- **السبب**: قد لا يحقق كائن الترجمات اللغات المطلوبة، مما يؤدي إلى أخطاء في TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لفرض اكتمال الترجمات الخاصة بك.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // عدم توفر 'es' سيسبب خطأ في TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // عدم توفر 'es' سيسبب خطأ في TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // عدم توفر 'es' سيسبب خطأ في TypeScript [!code error]
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعال

1. **استخدم `t` لترجمات بسيطة ضمنية**: مثالية لترجمة قطع صغيرة من النص مباشرة داخل المكونات الخاصة بك.
2. **يفضل `useIntlayer` للمحتوى المنظم**: بالنسبة للترجمات الأكثر تعقيداً وإعادة استخدام المحتوى، حدد المحتوى في ملفات إعلان واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من أن لغتك يتم توفيرها بشكل متسق عبر تطبيقك من خلال المزودات المناسبة.
4. **استفد من TypeScript**: استخدم أنواع TypeScript للقبض على الترجمات المفقودة وضمان أمان النوع.

---

## الخاتمة

تعتبر دالة `t` في `next-intlayer` أداة قوية ومريحة لإدارة الترجمات الداخلية في تطبيقات Next.js الخاصة بك. من خلال دمجها بشكل فعال، يمكنك تعزيز قدرات التدويل في تطبيقك، مما يوفر تجربة أفضل للمستخدمين في جميع أنحاء العالم.

لمزيد من الاستخدام التفصيلي والميزات المتقدمة، راجع [وثائق next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerClientProvider` و `IntlayerServerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح إلى مكوناتك. هذا أمر حيوي لكي تقوم دالة `t` بإرجاع الترجمات الصحيحة.

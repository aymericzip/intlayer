---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: توثيق دالة t | react-intlayer
description: اطلع على كيفية استخدام دالة t لحزمة react-intlayer
keywords:
  - t
  - ترجمة
  - Intlayer
  - العولمة
  - التوثيق
  - Next.js
  - JavaScript
  - React
---

# التوثيق: وظيفة `t` في `react-intlayer`

وظيفة `t` في حزمة `react-intlayer` هي أداة أساسية للتدويل المضمن داخل تطبيق React الخاص بك. تتيح لك تعريف الترجمات مباشرة داخل مكوناتك، مما يجعل من السهل عرض المحتوى المحلي بناءً على اللغة الحالية.

---

## نظرة عامة

تُستخدم وظيفة `t` لتوفير الترجمات للغات المختلفة مباشرة في مكوناتك. من خلال تمرير كائن يحتوي على الترجمات لكل لغة مدعومة، تُعيد `t` الترجمة المناسبة بناءً على سياق اللغة الحالي في تطبيق React الخاص بك.

---

## الميزات الرئيسية

- **ترجمات مضمنة**: مثالية للنصوص السريعة المضمنة التي لا تتطلب إعلان محتوى منفصل.
- **اختيار اللغة تلقائيًا**: تُعيد الترجمة المطابقة للغة الحالية تلقائيًا.
- **دعم TypeScript**: يوفر أمان الأنواع والإكمال التلقائي عند استخدامه مع TypeScript.
- **تكامل سهل**: يعمل بسلاسة داخل مكونات React.

---

## توقيع الوظيفة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعاملات

- `translations`: كائن حيث تكون المفاتيح رموز اللغات (مثل `en`, `fr`, `es`) والقيم هي النصوص المترجمة المقابلة.

### الإرجاع

- سلسلة نصية تمثل المحتوى المترجم للغة الحالية.

---

## أمثلة الاستخدام

### الاستخدام الأساسي لـ `t` في مكون

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
          ar: "هذا مثال على مكون",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
          ar: "هذا مثال على مكون",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
          ar: "هذا مثال على مكون",
        })}
      </p>
    </div>
  );
};
```

### الترجمات المضمنة في السمات

تعد وظيفة `t` مفيدة بشكل خاص للترجمات المضمنة في سمات JSX. عند توطين سمات مثل `alt`, `title`, `href`, أو `aria-label`، يمكنك استخدام `t` مباشرة داخل السمة.

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

## المواضيع المتقدمة

### تكامل TypeScript

تكون وظيفة `t` آمنة من حيث النوع عند استخدامها مع TypeScript، مما يضمن توفير جميع اللغات المطلوبة.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ar: "مرحبًا",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ar: "مرحبًا",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ar: "مرحبًا",
};

const greeting = t(translations);
```

### اكتشاف اللغة والسياق

في `react-intlayer`، يتم إدارة اللغة الحالية من خلال `IntlayerProvider`. تأكد من أن هذا المزود يلتف حول مكوناتك وأن الخاصية `locale` يتم تمريرها بشكل صحيح.

#### مثال:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* مكوناتك هنا */}</IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* مكوناتك هنا */}</IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* مكوناتك هنا */}</IntlayerProvider>
);
```

---

## الأخطاء الشائعة واستكشاف الأخطاء وإصلاحها

### `t` تُعيد قيمة غير معرّفة أو ترجمة غير صحيحة

- **السبب**: لم يتم تعيين اللغة الحالية بشكل صحيح، أو الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerProvider` تم إعداده بشكل صحيح مع اللغة المناسبة.
  - تأكد من أن كائن الترجمات الخاص بك يتضمن جميع اللغات الضرورية.

### الترجمات المفقودة في TypeScript

- **السبب**: كائن الترجمات لا يفي باللغات المطلوبة، مما يؤدي إلى أخطاء TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لفرض اكتمال الترجمات.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // فقدان 'es' سيتسبب في خطأ TypeScript
  ar: "نص",
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // فقدان 'es' سيتسبب في خطأ TypeScript
  ar: "نص",
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // فقدان 'es' سيتسبب في خطأ TypeScript
  ar: "نص",
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعّال

1. **استخدم `t` للترجمات المضمنة البسيطة**: مثالي لترجمة النصوص الصغيرة مباشرة داخل مكوناتك.
2. **يفضل استخدام `useIntlayer` للمحتوى المنظم**: للترجمات الأكثر تعقيدًا وإعادة استخدام المحتوى، قم بتعريف المحتوى في ملفات التصريح واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من أن اللغة يتم توفيرها بشكل متسق عبر تطبيقك من خلال `IntlayerProvider`.
4. **الاستفادة من TypeScript**: استخدم أنواع TypeScript لاكتشاف الترجمات المفقودة وضمان أمان الأنواع.

---

## الخاتمة

وظيفة `t` في `react-intlayer` هي أداة قوية ومريحة لإدارة الترجمات المضمنة في تطبيقات React الخاصة بك. من خلال دمجها بشكل فعّال، تعزز قدرات التدويل في تطبيقك، مما يوفر تجربة أفضل للمستخدمين في جميع أنحاء العالم.

لمزيد من الاستخدامات التفصيلية والميزات المتقدمة، راجع [توثيق react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح إلى مكوناتك. هذا ضروري لكي تُعيد وظيفة `t` الترجمات الصحيحة.

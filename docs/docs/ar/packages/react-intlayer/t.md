---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة t | react-intlayer
description: تعرف على كيفية استخدام دالة t لحزمة react-intlayer
keywords:
  - t
  - الترجمة
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية التاريخ
---

# التوثيق: دالة `t` في `react-intlayer`

تُعد دالة `t` في حزمة `react-intlayer` أداة أساسية للتدويل المضمن داخل تطبيق React الخاص بك. تتيح لك تعريف الترجمات مباشرة داخل مكوناتك، مما يجعل من السهل عرض المحتوى المحلي بناءً على اللغة الحالية.

---

## نظرة عامة

تُستخدم دالة `t` لتوفير الترجمات للغات المختلفة مباشرة في مكوناتك. من خلال تمرير كائن يحتوي على الترجمات لكل لغة مدعومة، تقوم دالة `t` بإرجاع الترجمة المناسبة بناءً على سياق اللغة الحالي في تطبيق React الخاص بك.

---

## الميزات الرئيسية

- **الترجمات المضمنة**: مثالية للنصوص السريعة والمضمنة التي لا تتطلب إعلان محتوى منفصل.
- **الاختيار التلقائي للغة**: يعيد الترجمة المطابقة للغة الحالية تلقائيًا.
- **دعم TypeScript**: يوفر أمان النوع والإكمال التلقائي عند استخدامه مع TypeScript.
- **تكامل سهل**: يعمل بسلاسة داخل مكونات React.

---

## توقيع الدالة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعاملات

- `translations`: كائن حيث تكون المفاتيح رموز اللغات (مثل `en`، `fr`، `es`) والقيم هي النصوص المترجمة المقابلة.

### القيم المرجعة

- نص يمثل المحتوى المترجم للغة الحالية.

---

## أمثلة الاستخدام

### الاستخدام الأساسي لدالة `t` في مكون

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
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
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

// مثال على مكون يستخدم الترجمة
const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### الترجمات المضمنة في السمات

دالة `t` مفيدة بشكل خاص للترجمات المضمنة داخل سمات JSX. عند تعريب سمات مثل `alt`، `title`، `href`، أو `aria-label`، يمكنك استخدام `t` مباشرة داخل السمة.

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
      en: "منظر طبيعي جميل",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## مواضيع متقدمة

### تكامل TypeScript

دالة `t` آمنة من حيث النوع عند استخدامها مع TypeScript، مما يضمن توفير جميع اللغات المطلوبة.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
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
};

const greeting = t(translations);
```

### اكتشاف اللغة والسياق

في `react-intlayer`، يتم إدارة اللغة الحالية من خلال `IntlayerProvider`. تأكد من أن هذا المزود يغلف مكوناتك وأن خاصية `locale` تم تمريرها بشكل صحيح.

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

### `t` تُعيد undefined أو ترجمة غير صحيحة

- **السبب**: لم يتم تعيين اللغة الحالية بشكل صحيح، أو الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerProvider` تم إعداده بشكل صحيح مع اللغة المناسبة `locale`.
  - تأكد من أن كائن الترجمات الخاص بك يشمل جميع اللغات اللازمة.

### الترجمات المفقودة في TypeScript

- **السبب**: كائن الترجمات لا يلبي اللغات المطلوبة، مما يؤدي إلى أخطاء في TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لفرض اكتمال الترجمات الخاصة بك.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // نقص 'es' سيسبب خطأ في TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // نقص 'es' سيسبب خطأ في TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // نقص 'es' سيسبب خطأ في TypeScript
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعال

1. **استخدم `t` للترجمات البسيطة داخل السطر**: مثالي لترجمة قطع صغيرة من النص مباشرة داخل مكوناتك.
2. **فضل استخدام `useIntlayer` للمحتوى المنظم**: للمترجمات الأكثر تعقيدًا وإعادة استخدام المحتوى، قم بتعريف المحتوى في ملفات التصريحات واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من توفير اللغة الخاصة بك بشكل متسق عبر تطبيقك من خلال `IntlayerProvider`.
4. **الاستفادة من TypeScript**: استخدم أنواع TypeScript لاكتشاف الترجمات المفقودة وضمان سلامة الأنواع.

---

## الخاتمة

تُعد دالة `t` في مكتبة `react-intlayer` أداة قوية ومريحة لإدارة الترجمات المضمنة داخل تطبيقات React الخاصة بك. من خلال دمجها بشكل فعال، تقوم بتحسين قدرات التدويل في تطبيقك، مما يوفر تجربة أفضل للمستخدمين حول العالم.

لمزيد من الاستخدامات التفصيلية والميزات المتقدمة، راجع [توثيق react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

---

3. **توفير اللغة بشكل متسق**: تأكد من توفير اللغة الخاصة بك بشكل متسق عبر تطبيقك من خلال `IntlayerProvider`.
4. **الاستفادة من TypeScript**: استخدم أنواع TypeScript لاكتشاف الترجمات المفقودة وضمان سلامة الأنواع.

---

## الخاتمة

تُعد دالة `t` في `react-intlayer` أداة قوية ومريحة لإدارة الترجمات المضمنة في تطبيقات React الخاصة بك. من خلال دمجها بشكل فعال، تقوم بتحسين قدرات التدويل في تطبيقك، مما يوفر تجربة أفضل للمستخدمين حول العالم.

للحصول على استخدام أكثر تفصيلاً وميزات متقدمة، راجع [توثيق react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح إلى مكوناتك. هذا أمر حيوي لكي تعيد دالة `t` الترجمات الصحيحة.

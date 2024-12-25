# التوثيق: دالة `t` في `react-intlayer`

تعد دالة `t` في حزمة `react-intlayer` أداة أساسية للترجمة الفورية ضمن تطبيقات React الخاصة بك. تتيح لك تعريف الترجمات مباشرة ضمن مكوناتك، مما يسهل عرض المحتوى المترجم بناءً على اللغة الحالية.

---

## نظرة عامة

تُستخدم دالة `t` لتوفير ترجمات لعدة لغات مباشرة في مكوناتك. من خلال تمرير كائن يحتوي على الترجمات لكل لغة مدعومة، تُرجع `t` الترجمة المناسبة بناءً على سياق اللغة الحالي في تطبيق React الخاص بك.

---

## الميزات الرئيسية

- **ترجمات فورية**: مثالية للنصوص السريعة والمباشرة التي لا تتطلب إعلان محتوى منفصل.
- **تحديد اللغة التلقائي**: تُرجع الترجمة المناسبة للغة الحالية تلقائيًا.
- **دعم TypeScript**: يوفر أمان النوع والتكمل التلقائي عند استخدامه مع TypeScript.
- **تكامل سهل**: يعمل بسلاسة ضمن مكونات React.

---

## توقيع الدالة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعلمات

- `translations`: كائن حيث تمثل المفاتيح رموز اللغات (مثل، `en`, `fr`, `es`) والقيم هي السلاسل المترجمة المقابلة.

### العائدات

- سلسلة تمثل المحتوى المترجم للغة الحالية.

---

## أمثلة الاستخدام

### الاستخدام الأساسي لدالة `t` في مكون

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

### الترجمات الفورية في السمات

تعتبر دالة `t` مفيدة بشكل خاص للترجمات الفورية في سمات JSX. عند ترجمة السمات مثل `alt`, `title`, `href`, أو `aria-label`، يمكنك استخدام `t` مباشرة ضمن السمة.

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

### اكتشاف اللغة وسياقها

في `react-intlayer`، تتم إدارة اللغة الحالية من خلال `IntlayerProvider`. تأكد من أن هذا الموفر يحيط بمكوناتك وأن خاصية `locale` تم تمريرها بشكل صحيح.

#### المثال:

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

### دالة `t` تُعيد قيمة غير معرف أو ترجمة غير صحيحة

- **السبب**: اللغة الحالية ليست مضبوطة بشكل صحيح، أو الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerProvider` تم إعداده بشكل صحيح مع `locale` المناسبة.
  - تأكد من أن كائن الترجمات الخاص بك يتضمن جميع اللغات الضرورية.

### الترجمات المفقودة في TypeScript

- **السبب**: كائن الترجمات لا يفي باللغات المطلوبة، مما يؤدي إلى أخطاء في TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لفرض اكتمال الترجمات.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // نقص 'es' سيتسبب في خطأ TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // نقص 'es' سيتسبب في خطأ TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // نقص 'es' سيتسبب في خطأ TypeScript
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعال

1. **استخدم `t` للترجمات الفورية البسيطة**: مثالية لترجمة أجزاء صغيرة من النص مباشرةً داخل مكوناتك.
2. **فضل `useIntlayer` للمحتوى المنظم**: للترجمات الأكثر تعقيدًا وإعادة استخدام المحتوى، قم بتعريف المحتوى في ملفات الإعلان واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من توفير لغتك بشكل متسق في جميع أنحاء التطبيق الخاص بك من خلال `IntlayerProvider`.
4. **استفد من TypeScript**: استخدم أنواع TypeScript للقبض على الترجمات المفقودة وضمان أمان النوع.

---

## الخاتمة

تعد دالة `t` في `react-intlayer` أداة قوية ومريحة لإدارة الترجمات الفورية في تطبيقات React الخاصة بك. من خلال تكاملها بشكل فعال، يمكنك تعزيز قدرات التدويل لتطبيقك، مما يوفر تجربة أفضل للمستخدمين في جميع أنحاء العالم.

لمزيد من الاستخدام التفصيلي والميزات المتقدمة، الرجاء الرجوع إلى [توثيق react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح لمكوناتك. هذا أمر حاسم لجعل دالة `t` تعيد الترجمات الصحيحة.

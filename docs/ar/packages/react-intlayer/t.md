# Documentation: `t` Function in `react-intlayer`

تعد وظيفة `t` في حزمة `react-intlayer` أداة أساسية للتدويل المباشر داخل تطبيق React الخاص بك. تتيح لك تعريف الترجمات مباشرة داخل مكوناتك، مما يجعل من السهل عرض المحتوى المحلي بناءً على اللغة الحالية.

---

## نظرة عامة

تُستخدم وظيفة `t` لتوفير الترجمات للغات المختلفة مباشرةً في مكوناتك. من خلال تمرير كائن يحتوي على الترجمات لكل لغة مدعومة، تُرجع `t` الترجمة المناسبة بناءً على سياق اللغة الحالية في تطبيق React الخاص بك.

---

## الميزات الرئيسية

- **ترجمات مباشرة**: مثالية للنصوص السريعة والمباشرة التي لا تتطلب إعلان محتوى منفصل.
- **اختيار تلقائي للغة**: تُرجع الترجمة المقابلة للغة الحالية تلقائيًا.
- **دعم TypeScript**: توفر أمان النوع وإكمال تلقائي عند استخدامها مع TypeScript.
- **تكامل سهل**: تعمل بسلاسة داخل مكونات React.

---

## توقيع الوظيفة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعلمات

- `translations`: كائن حيث تكون المفاتيح هي رموز اللغات (مثل `en`، `fr`، `es`) والقيم هي السلاسل المترجمة المقابلة.

### النتيجة

- سلسلة تمثل المحتوى المترجم للغة الحالية.

---

## أمثلة على الاستخدام

### الاستخدام الأساسي لـ `t` في مكون

```tsx
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

### الترجمات المباشرة في السمات

تعد وظيفة `t` مفيدة بشكل خاص لترجمات السامي للسمات JSX. عند تحديد سمات مثل `alt`، `title`، `href`، أو `aria-label`، يمكنك استخدام `t` مباشرة داخل السمة.

```tsx
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

## المواضيع المتقدمة

### تكامل TypeScript

تكون وظيفة `t` آمنة من حيث النوع عند استخدامها مع TypeScript، مما يضمن توفير جميع اللغات المطلوبة.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### اكتشاف اللغة والسياق

في `react-intlayer`، تتم إدارة اللغة الحالية من خلال `IntlayerProvider`. تأكد من لف هذه المورّد مكوناتك وأن الخاصية `locale` تمرر بشكل صحيح.

#### مثال:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>{/* مكوناتك هنا */}</IntlayerProvider>
);
```

---

## الأخطاء الشائعة واستكشاف الأخطاء وإصلاحها

### `t` يُرجع قيمة غير معرّفة أو ترجمة غير صحيحة

- **السبب**: اللغة الحالية غير محددة بشكل صحيح، أو الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerProvider` تم إعدادها بشكل صحيح مع `locale` المناسبة.
  - تأكد من أن كائن الترجمات الخاص بك يتضمن جميع اللغات اللازمة.

### الترجمات المفقودة في TypeScript

- **السبب**: لا يتوافق كائن الترجمات مع اللغات المطلوبة، مما يؤدي إلى أخطاء في TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لفرض اكتمال الترجمات الخاصة بك.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // وجود 'es' مفقود سيسبب خطأ TypeScript
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعّال

1. **استخدم `t` لترجمات بسيطة مباشرة**: مثالية لترجمة قطع صغيرة من النص مباشرةً داخل مكوناتك.
2. **تفضيل `useIntlayer` للمحتوى المنظم**: لترجمات أكثر تعقيدًا وإعادة استخدام المحتوى، قم بتعريف المحتوى في ملفات التصريح واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من أن لغتك يتم تقديمها بشكل متسق عبر تطبيقك من خلال `IntlayerProvider`.
4. **استفد من TypeScript**: استخدم أنواع TypeScript لكشف الترجمات المفقودة وضمان أمان النوع.

---

## الخاتمة

تعتبر وظيفة `t` في `react-intlayer` أداة قوية ومريحة لإدارة الترجمات المباشرة في تطبيقات React الخاصة بك. من خلال دمجها بشكل فعال، تعزز قدرات التدويل لتطبيقك، مما يوفر تجربة أفضل للمستخدمين في جميع أنحاء العالم.

لمزيد من الاستخدام المفصل والميزات المتقدمة، راجع [وثائق react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح لمكوناتك. هذا أمر حاسم لكي تُرجع وظيفة `t` الترجمات الصحيحة.

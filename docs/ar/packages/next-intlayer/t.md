# Documentation: `t` Function in `next-intlayer`

تعتبر الدالة `t` في حزمة `next-intlayer` أداة أساسية للتدويل المباشر داخل تطبيق Next.js الخاص بك. إنها تتيح لك تعريف الترجمات مباشرة ضمن مكوناتك، مما يجعل من السهل عرض المحتوى المحلي بناءً على اللغة الحالية.

---

## نظرة عامة

تستخدم الدالة `t` لتوفير الترجمات لمواقع مختلفة مباشرة في مكوناتك. من خلال تمرير كائن يحتوي على الترجمات لكل لغة مدعومة، ترجع `t` الترجمة المناسبة بناءً على سياق اللغة الحالي في تطبيق Next.js الخاص بك.

---

## الميزات الرئيسية

- **ترجمات مباشرة**: مثالية للنصوص السريعة والدقيقة التي لا تتطلب إعلان محتوى منفصل.
- **اختيار اللغة التلقائي**: ترجع الترجمة المقابلة للغة الحالية تلقائيًا.
- **دعم TypeScript**: توفر أمان النوع والإكمال التلقائي عند استخدامها مع TypeScript.
- **تكامل سهل**: تعمل بسلاسة داخل كل من مكونات العميل والخادم في Next.js.

---

## توقيع الدالة

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### المعاملات

- `translations`: كائن حيث تكون المفاتيح هي رموز اللغات (مثل `en`, `fr`, `es`) والقيم هي السلاسل المترجمة المقابلة.

### العائدات

- سلسلة تمثل المحتوى المترجم للغة الحالية.

---

## أمثلة الاستخدام

### باستخدام `t` في مكون عميل

تأكد من تضمين التوجيه `'use client';` في أعلى ملف مكونك عند استخدام `t` في مكون على الجانب العميل.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### باستخدام `t` في مكون خادم

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### الترجمات المباشرة في الخصائص

تعتبر الدالة `t` مفيدة بشكل خاص للترجمات المباشرة في صفات JSX.
عند تحديد الخصائص مثل `alt` و `title` و `href` أو `aria-label`، يمكنك استخدام `t` مباشرة ضمن الخاصية.

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

## مواضيع متقدمة

### تكامل TypeScript

تكون الدالة `t` آمنة من حيث النوع عند استخدامها مع TypeScript، مما يضمن أنه يتم تقديم جميع اللغات المطلوبة.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### اكتشاف اللغة والسياق

في `next-intlayer`، يتم إدارة اللغة الحالية من خلال مزودي السياق: `IntlayerClientProvider` و `IntlayerServerProvider`. تأكد من أن هذه المزودات تحيط بمكوناتك وأن خاصية `locale` قد تم تمريرها بشكل صحيح.

#### مثال:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* قم بوضع مكوناتك هنا */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## الأخطاء الشائعة واستكشاف الأخطاء وإصلاحها

### `t` ترجع قيمة غير معرّفة أو ترجمة غير صحيحة

- **السبب**: اللغة الحالية غير مضبوطة بشكل صحيح، أو الترجمة للغة الحالية مفقودة.
- **الحل**:
  - تحقق من أن `IntlayerClientProvider` أو `IntlayerServerProvider` تم إعدادها بشكل صحيح مع `locale` المناسبة.
  - تأكد من أن كائن الترجمات الخاص بك يتضمن جميع اللغات الضرورية.

### الترجمات المفقودة في TypeScript

- **السبب**: كائن الترجمات لا يلبي اللغات المطلوبة، مما يؤدي إلى أخطاء في TypeScript.
- **الحل**: استخدم نوع `IConfigLocales` لضمان اكتمال الترجمات الخاصة بك.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // فقدان 'es' سيتسبب في خطأ TypeScript
};

const text = t(translations);
```

---

## نصائح للاستخدام الفعال

1. **استخدم `t` للترجمات المباشرة البسيطة**: مثالية لترجمة قطع صغيرة من النص مباشرة داخل مكوناتك.
2. **يفضل استخدام `useIntlayer` للمحتوى المنظم**: من أجل الترجمات المعقدة وإعادة استخدام المحتوى، عرّف المحتوى في ملفات الإعلان واستخدم `useIntlayer`.
3. **توفير اللغة بشكل متسق**: تأكد من تقديم لغتك بشكل متسق عبر تطبيقك من خلال المزودات المناسبة.
4. **استفد من TypeScript**: استخدم أنواع TypeScript لالتقاط الترجمات المفقودة وضمان أمان النوع.

---

## الخاتمة

تعتبر الدالة `t` في `next-intlayer` أداة قوية ومريحة لإدارة الترجمات المباشرة في تطبيقات Next.js الخاصة بك. من خلال دمجها بشكل فعال، يمكنك تعزيز قدرات التدعيم اللغوي في تطبيقك، مما يوفر تجربة أفضل للمستخدمين في جميع أنحاء العالم.

لمزيد من الاستخدام التفصيلي والميزات المتقدمة، يرجى الرجوع إلى [توثيق next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

---

**ملاحظة**: تذكر إعداد `IntlayerClientProvider` و `IntlayerServerProvider` بشكل صحيح لضمان تمرير اللغة الحالية بشكل صحيح إلى مكوناتك. هذا أمر حاسم لترجع الدالة `t` الترجمات الصحيحة.

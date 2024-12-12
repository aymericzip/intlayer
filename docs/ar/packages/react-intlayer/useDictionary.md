# React Integration: وثائق Hook `useDictionary`

تقدم هذه القسم إرشادات مفصلة حول استخدام Hook `useDictionary` ضمن تطبيقات React، مما يمكّن من التعامل بكفاءة مع المحتوى المحلي دون الحاجة إلى محرر بصري.

## استيراد `useDictionary` في React

يمكن دمج Hook `useDictionary` في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```javascript
  import { useDictionary } from "react-intlayer"; // مستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```javascript
  import { useDictionary } from "react-intlayer/server"; // مستخدم في مكونات React على جانب الخادم
  ```

## المعاملات

يقوم هذا Hook بقبول معاملتين:

1. **`dictionary`**: كائن قاموس مُعلن يحتوي على محتوى محلي لمفاتيح معينة.
2. **`locale`** (اختياري): اللغة المطلوبة. بشكل افتراضي، تكون اللغة المستخدمة هي لغة السياق الحالي إذا لم يتم تحديدها.

## إعلان المحتوى

يجب الإعلان عن جميع كائنات القاموس في ملفات محتوى منظمة لضمان أمان النوع وتجنب الأخطاء في وقت التشغيل. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md). إليك مثال على إعلان المحتوى:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## مثال على الاستخدام في React

فيما يلي مثال عن كيفية استخدام Hook `useDictionary` في مكون React:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "react-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## تكامل الخادم

إذا كنت تستخدم Hook `useDictionary` خارج `IntlayerProvider`، يجب توفير اللغة بشكل صريح كمعامل عند عرض المكون:

```tsx
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## ملاحظات حول السمات

على عكس التكاملات التي تستخدم محررات بصرية، السمات مثل `buttonTitle.value` لا تنطبق هنا. بدلاً من ذلك، يمكن الوصول إلى السلاسل المحلية مباشرة كما هو مُعلن في المحتوى الخاص بك.

```tsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **أمان النوع**: استخدم دائمًا `DeclarationContent` لتعريف القواميس الخاصة بك لضمان أمان النوع.
- **تحديثات الترجمة**: عند تحديث المحتوى، تأكد من تطابق جميع اللغات لتجنب عدم وجود ترجمات.

تركز هذه الوثيقة على تكامل Hook `useDictionary`، مما يوفر نهجًا مبسطًا لإدارة المحتوى المحلي دون الاعتماد على وظائف محرر بصري.

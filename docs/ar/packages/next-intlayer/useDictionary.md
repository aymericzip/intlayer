# React Integration: وثائق Hook `useDictionary`

هذا القسم يقدم توجيهات تفصيلية حول استخدام Hook `useDictionary` داخل تطبيقات React، مما يتيح التعامل الفعال مع المحتوى المحلي بدون محرر مرئي.

## استيراد `useDictionary` في React

يمكن دمج Hook `useDictionary` في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // يُستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // يُستخدم في مكونات React على جانب الخادم
  ```

## المعلمات

يقبل Hook من المعلمات:

1. **`dictionary`**: كائن قاموس مُعلن يحتوي على محتوى محلي لمفاتيح معينة.
2. **`locale`** (اختياري): اللغة المرغوبة. يتم تعيينها افتراضيًا إلى اللغة الحالية للسياق إذا لم يتم تحديدها.

## إعلان المحتوى

يجب أن يتم إعلان جميع كائنات القاموس في ملفات محتوى منظمة لضمان سلامة النوع ومنع الأخطاء في وقت التشغيل. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md). إليك مثال على إعلان المحتوى:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "عميل مكون مثال",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "هذا هو محتوى مثال مكون العميل",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## مثال على الاستخدام في React

فيما يلي مثال على كيفية استخدام Hook `useDictionary` في مكون React:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "next-intlayer";
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

إذا كنت تستخدم Hook `useDictionary` خارج `IntlayerServerProvider`، يجب توفير اللغة بشكل صريح كمعامل عند عرض المكون:

```tsx
import { useDictionary } from "next-intlayer/server";
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

## ملاحظات حول الخصائص

على عكس التكاملات التي تستخدم المحررين المرئيين، الخصائص مثل `buttonTitle.value` لا تنطبق هنا. بدلاً من ذلك، الوصول مباشرة إلى السلاسل المحلية كما تم إعلانها في المحتوى الخاص بك.

```tsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **سلامة النوع**: استخدم دائمًا `DeclarationContent` لتعريف قواميسك لضمان سلامة النوع.
- **تحديثات الترجمة**: عند تحديث المحتوى، تأكد من أن جميع اللغات متسقة لتجنب فقدان الترجمات.

تركز هذه الوثائق على تكامل Hook `useDictionary`، مما يوفر نهجاً سلساً لإدارة المحتوى المحلي دون الاعتماد على وظائف محرر مرئي.

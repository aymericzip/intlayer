# React Integration: `useIntlayer` Hook Documentation

هذا القسم يقدم إرشادات تفصيلية حول استخدام hook `useIntlayer` داخل تطبيقات React، مما يسمح بتعزيز توطين المحتوى بشكل فعال.

## استيراد `useIntlayer` في React

يمكن دمج hook `useIntlayer` في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // مستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // مستخدم في مكونات React على جانب الخادم
  ```

## المعلمات

الـ hook يقبل معلمين:

1. **`key`**: مفتاح القاموس لاسترجاع المحتوى المترجم.
2. **`locale`** (اختياري): اللغة المطلوبة. الافتراضي هو لغة السياق إذا لم يتم تحديدها.

## إعلان المحتوى

يجب أن تُعلن جميع مفاتيح القاموس ضمن ملفات إعلان المحتوى لتعزيز أمان النوع وتجنب الأخطاء. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

## مثال على الاستخدام في React

إظهار hook `useIntlayer` داخل مكون React:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## التعامل مع الخصائص

عند توطين الخصائص، يجب الوصول إلى قيم المحتوى بشكل مناسب:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## موارد إضافية

- **محرر Intlayer المرئي**: للحصول على تجربة إدارة محتوى أكثر سهولة، يمكنك الرجوع إلى وثائق محرر المرئي [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

هذا القسم يستهدف بشكل خاص دمج hook `useIntlayer` في تطبيقات React، مما يبسط عملية التوطين ويضمن اتساق المحتوى عبر لغات مختلفة.

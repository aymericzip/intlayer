---
docName: package__react-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق هوك useIntlayer | react-intlayer
description: تعرف على كيفية استخدام هوك useIntlayer لحزمة react-intlayer
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
---

# تكامل React: توثيق هوك `useIntlayer`

يوفر هذا القسم إرشادات مفصلة حول استخدام هوك `useIntlayer` داخل تطبيقات React، مما يتيح تعريب المحتوى بكفاءة.

## استيراد `useIntlayer` في React

يمكن دمج هوك `useIntlayer` في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // يُستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // يُستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // يُستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // يُستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // يُستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // يُستخدم في مكونات React على جانب الخادم
  ```

## المعاملات

يقبل الـ hook معاملين:

1. **`key`**: مفتاح القاموس لاسترجاع المحتوى المحلي.
2. **`locale`** (اختياري): اللغة المطلوبة. القيمة الافتراضية هي لغة السياق إذا لم يتم تحديدها.

## القاموس

يجب إعلان جميع مفاتيح القاموس داخل ملفات إعلان المحتوى لتعزيز أمان النوع وتجنب الأخطاء. يمكنك العثور على [تعليمات الإعداد هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

## مثال على الاستخدام في React

عرض استخدام الـ `useIntlayer` hook داخل مكون React:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
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

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
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

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
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

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

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

## التعامل مع السمات

عند تعريب السمات، قم بالوصول إلى قيم المحتوى بشكل مناسب:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## موارد إضافية

- **محرر Intlayer المرئي**: لتجربة إدارة محتوى أكثر سهولة وبديهية، راجع توثيق المحرر المرئي [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

تستهدف هذه القسم بشكل خاص دمج الخطاف `useIntlayer` في تطبيقات React، مما يبسط عملية التعريب ويضمن تناسق المحتوى عبر اللغات المختلفة.

## تاريخ التوثيق

- 5.5.10 - 2025-06-29: بداية السجل

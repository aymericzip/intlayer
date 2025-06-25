---
docName: package__react-intlayer__useIntlayer
url: https://intlayer.org/doc/packages/react-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق خطاف useIntlayer | react-intlayer
description: انظر كيف تستخدم خطاف useIntlayer لحزمة react-intlayer
keywords:
  - useIntlayer
  - قاموس
  - مفتاح
  - Intlayer
  - الدولية
  - التوثيق
  - Next.js
  - JavaScript
  - React
---

# React Integration: `useIntlayer` Hook Documentation

هذا القسم يوفر إرشادات مفصلة حول استخدام `useIntlayer` في تطبيقات React، مما يتيح توطين المحتوى بكفاءة.

## استيراد `useIntlayer` في React

يمكن دمج `useIntlayer` في تطبيقات React عن طريق استيراده بناءً على السياق:

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

## المعلمات

يقبل الخطاف معلمتين:

1. **`key`**: مفتاح القاموس لاسترجاع المحتوى الموطّن.
2. **`locale`** (اختياري): اللغة المطلوبة. يتم استخدام لغة السياق الافتراضية إذا لم يتم تحديدها.

## القاموس

يجب أن يتم إعلان جميع مفاتيح القاموس داخل ملفات تعريف المحتوى لتعزيز أمان النوع وتجنب الأخطاء. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

## مثال على الاستخدام في React

عرض استخدام الخطاف `useIntlayer` داخل مكون React:

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

عند توطين السمات، قم بالوصول إلى قيم المحتوى بشكل مناسب:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## موارد إضافية

- **محرر Intlayer البصري**: للحصول على تجربة إدارة محتوى أكثر سهولة، راجع وثائق المحرر البصري [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md).

هذا القسم يستهدف تحديدًا دمج الخطاف `useIntlayer` في تطبيقات React، مما يبسط عملية التوطين ويضمن تناسق المحتوى عبر اللغات المختلفة.

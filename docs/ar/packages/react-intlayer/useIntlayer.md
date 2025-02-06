# دمج React: توثيق Hook `useIntlayer`

هذا القسم يوفر إرشادات مفصلة حول استخدام Hook `useIntlayer` داخل تطبيقات React، مما يسمح بفعالية بتوطين المحتوى.

## استيراد `useIntlayer` في React

يمكن دمج Hook `useIntlayer` في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // المستخدم في مكونات React من جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // المستخدم في مكونات React من جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // المستخدم في مكونات React من جانب العميل
  ```

- **مكون الخادم:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // المستخدم في مكونات React من جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // المستخدم في مكونات React من جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // المستخدم في مكونات React من جانب الخادم
  ```

## المعلمات

يقبل hook معلمين:

1. **`key`**: المفتاح القاموسي لاسترجاع المحتوى المترجم.
2. **`locale`** (اختياري): اللغة المطلوبة. الافتراضي هو لغة السياق إذا لم يتم تحديدها.

## إعلان المحتوى

يجب أن يتم الإعلان عن جميع مفاتيح القواميس ضمن ملفات إعلان المحتوى لتعزيز سلامة الأنواع وتجنب الأخطاء. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

## مثال على الاستخدام في React

توضيح Hook `useIntlayer` داخل مكون React:

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

عند توطين السمات، الوصول إلى قيم المحتوى بشكل مناسب:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## موارد إضافية

- ** محرر Intlayer المرئي**: للحصول على تجربة إدارة محتوى أكثر بديهية، راجع توثيق المحرر المرئي [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

هذا القسم يركز بشكل خاص على دمج Hook `useIntlayer` في تطبيقات React، مما يبسط عملية التوطين ويضمن تناسق المحتوى عبر لغات مختلفة.

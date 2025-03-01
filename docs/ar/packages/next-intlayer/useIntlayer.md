# دمج Next.js: توثيق `useIntlayer` Hook

تم تصميم `useIntlayer` خصيصًا لتطبيقات Next.js لجلب وإدارة المحتوى المحلي بكفاءة. يركز هذا التوثيق على كيفية استخدام الـ hook داخل مشاريع Next.js، مع ضمان اتباع ممارسات التوطين الصحيحة.

## استيراد `useIntlayer` في Next.js

اعتمادًا على ما إذا كنت تعمل على مكونات العميل أو الخادم في تطبيق Next.js، يمكنك استيراد الـ hook `useIntlayer` كما يلي:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // يُستخدم في مكونات العميل
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // يُستخدم في مكونات العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // يُستخدم في مكونات العميل
  ```

- **مكون الخادم:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // يُستخدم في مكونات الخادم
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // يُستخدم في مكونات الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // يُستخدم في مكونات الخادم
  ```

## المعاملات

1. **`key`**: معرف نصي لمفتاح القاموس الذي تريد استرداد المحتوى منه.
2. **`locale`** (اختياري): لغة معينة للاستخدام. إذا لم يتم تحديدها، فإن الـ hook يستخدم اللغة الافتراضية المحددة في سياق العميل أو الخادم.

## ملفات القاموس

من المهم أن يتم تعريف جميع مفاتيح المحتوى داخل ملفات تعريف المحتوى لتجنب أخطاء وقت التشغيل وضمان سلامة النوع. يتيح هذا النهج أيضًا تكامل TypeScript للتحقق أثناء وقت الترجمة.

تعليمات إعداد ملفات تعريف المحتوى متوفرة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

## مثال على الاستخدام في Next.js

إليك كيفية تنفيذ الـ hook `useIntlayer` داخل صفحة Next.js لتحميل المحتوى المحلي ديناميكيًا بناءً على اللغة الحالية للتطبيق:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## التعامل مع توطين السمات

لتوطين السمات مثل `alt`، `title`، `href`، `aria-label`، إلخ، تأكد من الرجوع إلى المحتوى بشكل صحيح:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## معلومات إضافية

- **محرر Intlayer البصري**: تعرف على كيفية استخدام المحرر البصري لإدارة المحتوى بسهولة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md).

يوضح هذا التوثيق استخدام الـ hook `useIntlayer` بشكل خاص في بيئات Next.js، مما يوفر حلاً قويًا لإدارة التوطين عبر تطبيقات Next.js الخاصة بك.

# تكامل Next.js: توثيق `useIntlayer` هك

يتم تصميم هك `useIntlayer` لتطبيقات Next.js لجلب وإدارة المحتوى المحلي بكفاءة. ستركز هذه الوثيقة على كيفية استخدام الهك ضمن مشاريع Next.js، مع ضمان اتباع ممارسات الترجمة الصحيحة.

## استيراد `useIntlayer` في Next.js

اعتمادًا على ما إذا كنت تعمل على مكونات من جانب العميل أو من جانب الخادم في تطبيق Next.js، يمكنك استيراد هك `useIntlayer` على النحو التالي:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // يُستخدم في مكونات جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // يُستخدم في مكونات جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // يُستخدم في مكونات جانب العميل
  ```

- **مكون الخادم:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // يُستخدم في مكونات جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // يُستخدم في مكونات جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // يُستخدم في مكونات جانب الخادم
  ```

## المعايير

1. **`key`**: مُعرف سلسلة لمفتاح القاموس الذي تريد استرداد المحتوى منه.
2. **`locale`** (اختياري): منطقة محددة للاستخدام. إذا تم تخطيه، يتعذر على الهك الخيار الافتراضي للمنطقة المحددة في سياق العميل أو الخادم.

## ملفات إعلان المحتوى

من الضروري أن يتم تعريف جميع مفاتيح المحتوى داخل ملفات إعلان المحتوى لتجنب الأخطاء أثناء التشغيل وضمان أمان النوع. يسهل هذا النهج أيضًا دمج TypeScript للتحقق من صحة وقت الترجمة.

تعليمات إعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

## مثال على الاستخدام في Next.js

إليك كيفية تنفيذ هك `useIntlayer` ضمن صفحة Next.js لتحميل المحتوى المحلي ديناميكيًا استنادًا إلى منطقة التطبيق الحالية:

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

## التعامل مع ترجمة السمات

لترجمة السمات مثل `alt`، `title`، `href`، `aria-label`، إلخ، تأكد من الإشارة إلى المحتوى بشكل صحيح:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## مزيد من المعلومات

- **محرر إنتلاير المرئي**: تعرف على كيفية استخدام المحرر المرئي لإدارة المحتوى بشكل أسهل [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor.md).

توضح هذه الوثيقة استخدام هك `useIntlayer` بشكل محدد ضمن بيئات Next.js، مما يوفر حلاً قويًا لإدارة الترجمة عبر تطبيقات Next.js الخاصة بك.

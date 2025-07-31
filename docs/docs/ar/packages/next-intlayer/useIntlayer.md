---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق هوك useIntlayer | next-intlayer
description: تعرف على كيفية استخدام هوك useIntlayer لحزمة next-intlayer
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayer
---

# تكامل Next.js: توثيق هوك `useIntlayer`

تم تصميم هوك `useIntlayer` خصيصًا لتطبيقات Next.js لجلب وإدارة المحتوى المحلي بكفاءة. سيركز هذا التوثيق على كيفية استخدام هذا الهوك داخل مشاريع Next.js، مع ضمان اتباع ممارسات التدويل الصحيحة.

## استيراد `useIntlayer` في Next.js

اعتمادًا على ما إذا كنت تعمل على مكونات جانب العميل أو جانب الخادم في تطبيق Next.js، يمكنك استيراد هوك `useIntlayer` كما يلي:

- **مكون جانب العميل:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // يستخدم في مكونات جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // يستخدم في مكونات جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // يستخدم في مكونات جانب العميل
  ```

- **مكون جانب الخادم:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // يستخدم في مكونات جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // يستخدم في مكونات جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // يستخدم في مكونات جانب الخادم
  ```

## المعاملات

1. **`key`**: معرف نصي لمفتاح القاموس الذي تريد استرجاع المحتوى منه.
2. **`locale`** (اختياري): لغة محددة للاستخدام. إذا تم حذفها، يستخدم الهوك اللغة المعينة في سياق العميل أو الخادم.

## ملفات القاموس

من الضروري أن يتم تعريف جميع مفاتيح المحتوى داخل ملفات إعلان المحتوى لمنع أخطاء وقت التشغيل وضمان سلامة الأنواع. كما أن هذا النهج يسهل دمج TypeScript للتحقق من الصحة أثناء وقت الترجمة.

تعليمات إعداد ملفات إعلان المحتوى متاحة [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

## مثال على الاستخدام في Next.js

إليك كيفية تنفيذ هوك `useIntlayer` داخل صفحة Next.js لتحميل المحتوى المحلي ديناميكيًا بناءً على اللغة الحالية للتطبيق:

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

## التعامل مع تعريب السمات

لتعريب السمات مثل `alt`، `title`، `href`، `aria-label`، وغيرها، تأكد من الإشارة إلى المحتوى بشكل صحيح:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## مزيد من المعلومات

- **محرر Intlayer المرئي**: تعلّم كيفية استخدام المحرر المرئي لإدارة المحتوى بسهولة أكبر [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

توضح هذه الوثائق استخدام الخطاف `useIntlayer` بشكل خاص داخل بيئات Next.js، مما يوفر حلاً قويًا لإدارة التعريب عبر تطبيقات Next.js الخاصة بك.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ

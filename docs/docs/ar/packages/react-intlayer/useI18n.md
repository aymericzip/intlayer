---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق خطاف useI18n | react-intlayer
description: تعلّم كيفية استخدام خطاف useI18n في حزمة react-intlayer
keywords:
  - useI18n
  - i18n
  - الترجمة
  - القاموس
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
---

# تكامل React: توثيق خطاف `useI18n`

يوفر هذا القسم إرشادات مفصلة حول كيفية استخدام خطاف `useI18n` داخل تطبيقات React، مما يتيح تعريب المحتوى بكفاءة.

## استيراد `useI18n` في React

يمكن استيراد خطاف `useI18n` ودمجه في تطبيقات React حسب السياق كما يلي:

- **مكونات العميل:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // استخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // استخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // استخدم في مكونات React على جانب العميل
  ```

- **مكونات الخادم:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // استخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // استخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // استخدم في مكونات React على جانب الخادم
  ```

## المعاملات

يقبل هذا الخطاف معاملين:

1. **`namespace`**: مساحة أسماء القاموس لتحديد نطاق مفاتيح الترجمة.
2. **`locale`** (اختياري): اللغة المطلوبة. إذا لم يتم تحديدها، سيتم استخدام لغة السياق كافتراضي.

## القاموس

يجب إعلان جميع مفاتيح القاموس داخل ملفات إعلان المحتوى لتعزيز سلامة النوع ومنع الأخطاء. [يمكن العثور على تعليمات التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

## أمثلة الاستخدام في React

أمثلة على استخدام الخطاف `useI18n` داخل مكونات React:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("homepage", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* عرض العنوان */}
      <p>{t("description")}</p> {/* عرض الوصف */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* عرض العنوان */}
      <p>{t("description")}</p> {/* عرض الوصف */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* عرض العنوان */}
      <p>{t("description")}</p> {/* عرض الوصف */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* عرض العنوان */}
      <p>{t("description")}</p> {/* عرض الوصف */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* عرض العنوان */}
      <p>{t("description")}</p> {/* عرض الوصف */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## التعامل مع السمات

عند تعريب السمات، قم بالوصول إلى قيم الترجمة بشكل مناسب:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>

<!-- بالنسبة لسمات الوصول (مثل aria-label)، استخدم .value لأن السلاسل النصية البحتة مطلوبة -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## موارد إضافية

- **محرر Intlayer المرئي**: للحصول على تجربة إدارة محتوى أكثر سهولة وبديهية، راجع توثيق المحرر المرئي [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

يغطي هذا القسم بشكل خاص دمج الخطاف `useI18n` في تطبيقات React، مما يبسط عملية التعريب ويضمن اتساق المحتوى عبر اللغات المختلفة.

## تاريخ التوثيق

- 6.0.0 - 2025-06-29: الكتابة الأولية لتوثيق الخطاف `useI18n`

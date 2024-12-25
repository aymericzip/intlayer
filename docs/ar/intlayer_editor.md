# Intlayer Editor Documentation

محرر Intlayer هو أداة تحول تطبيقك إلى محرر بصري. مع محرر Intlayer، يمكن لفرقك إدارة محتوى موقعك بجميع اللغات المكونة.

![واجهة محرر Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor_ui.png)

حزمة `intlayer-editor` قائمة على Intlayer ومتاحة لتطبيقات JavaScript، مثل React (إنشاء تطبيق React)، Vite + React، وNext.js.

## التكامل

للحصول على مزيد من التفاصيل حول كيفية تثبيت الحزمة، راجع القسم ذي الصلة أدناه:

### التكامل مع Next.js

للتكامل مع Next.js، اتبع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_nextjs_15.md).

### التكامل مع إنشاء تطبيق React

للتكامل مع إنشاء تطبيق React، اتبع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_create_react_app.md).

### التكامل مع Vite + React

للتكامل مع Vite + React، اتبع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_with_vite+react.md).

## كيفية عمل محرر Intlayer

في كل مرة تجري فيها تغييرا باستخدام محرر Intlayer، يقوم الخادم تلقائيا بإدراج تغييراتك في [ملفات إعلان Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md)، أينما كانت هذه الملفات معلنة في مشروعك.

بهذه الطريقة، لن تضطر إلى القلق بشأن مكان إعلان الملف أو عن العثور على مفتاحك في مجموعة القاموس الخاصة بك.

## التثبيت

بمجرد تكوين Intlayer في مشروعك، ما عليك سوى تثبيت `intlayer-editor` كاعتماد تطوير:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## التكوين

### 1. تفعيل المحرر في ملف intlayer.config.ts الخاص بك

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات تكوين أخرى
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // إذا كان خطأ، سيكون المحرر غير نشط ولا يمكن الوصول إليه.
    // معرف العميل وسر العميل مطلوبان لتفعيل المحرر.
    // يتيحان تحديد المستخدم الذي يقوم بتحرير المحتوى.
    // يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات تكوين أخرى
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // إذا كان خطأ، سيكون المحرر غير نشط ولا يمكن الوصول إليه.
    // معرف العميل وسر العميل مطلوبان لتفعيل المحرر.
    // يتيحان تحديد المستخدم الذي يقوم بتحرير المحتوى.
    // يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... إعدادات تكوين أخرى
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // إذا كان خطأ، سيكون المحرر غير نشط ولا يمكن الوصول إليه.
    // معرف العميل وسر العميل مطلوبان لتفعيل المحرر.
    // يتيحان تحديد المستخدم الذي يقوم بتحرير المحتوى.
    // يمكن الحصول عليهما عن طريق إنشاء عميل جديد في لوحة تحكم Intlayer - المشاريع (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> إذا لم يكن لديك معرف العميل وسر العميل، يمكنك الحصول عليهما عن طريق إنشاء عميل جديد في [لوحة تحكم Intlayer - المشاريع](https://intlayer.org/dashboard/projects).

> للاطلاع على جميع المعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### 2. إدراج مزود محرر Intlayer في تطبيقك

لتفعيل المحرر، تحتاج إلى إدراج مزود محرر Intlayer في تطبيقك.

مثال لتطبيقات React JS أو Vite + React:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

مثال لتطبيقات Next.js:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* تطبيقك */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. إضافة أوراق الأنماط إلى تطبيقك

لعرض أنماط المحرر، تحتاج إلى إضافة أوراق الأنماط إلى تطبيقك.

إذا تم استخدام Tailwind، يمكنك إضافة أوراق الأنماط إلى ملف `tailwind.config.js` الخاص بك:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... بقية المحتوى الخاص بك
  ],
  // ...
};
```

بخلاف ذلك، يمكنك إضافة استيراد أوراق الأنماط في تطبيقك:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

أو

```css fileName="app.css"
@import "intlayer-editor/css";
```

## استخدام المحرر

عند تثبيت المحرر، وتفعيله، وبدء تشغيله، يمكنك عرض كل حقل تم فهرسته بواسطة Intlayer عن طريق التمرير فوق محتواك بمؤشر الفأرة.

![التمرير فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_editor_hover_content.png)

إذا كان محتواك محددا، يمكنك الضغط طويلا عليه لعرض درج التحرير.

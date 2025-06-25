---
blogName: intlayer_with_react-i18next
url: https://intlayer.org/blog/intlayer-with-react-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/intlayer_with_react-i18next.md
createdAt: 2025-01-02
updatedAt: 2025-01-02
title: Intlayer وreact-i18next
description: قارن بين React باستخدام react-i18next و Intlayer
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - JavaScript
  - React
---

# React Internationalization (i18n) with react-i18next and Intlayer

## Overview

- **Intlayer** يساعدك في إدارة الترجمة عبر **ملفات إعلان المحتوى على مستوى المكون**.
- **react-i18next** هو دمج شائع لـ React مع **i18next** يقدم وظائف مثل `useTranslation` لجلب السلاسل المحلية في مكوناتك.

عندما يتم دمجها، يمكن لـ Intlayer **تصدير** القواميس بتنسيق **i18next-compatible JSON** بحيث يمكن لـ react-i18next **استهلاكها** في وقت التشغيل.

## Why Use Intlayer with react-i18next?

ملفات إعلان المحتوى الخاصة بـ **Intlayer** تقدم تجربة مطور أفضل لأنها:

1. **مرنة في مكان الملف**  
   ضع كل ملف إعلان محتوى بجانب المكون الذي يحتاجه. تسمح لك هذه البنية بالحفاظ على الترجمات متواجدة بجوار بعضها البعض، مما يمنع الترجمات اليتيمة عند نقل المكونات أو حذفها.

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # ملف إعلان المحتوى
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # ملف إعلان المحتوى
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # ملف إعلان المحتوى
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # ملف إعلان المحتوى
               └── index.jsx
   ```

2. **ترجمات مركزة**  
   يجمع ملف إعلان محتوى واحد جميع الترجمات اللازمة لمكون، مما يجعل من السهل اكتشاف الترجمات الناقصة.  
   مع TypeScript، ستحصل حتى على أخطاء في وقت الترجمة إذا كانت الترجمات مفقودة.

## Installation

في مشروع Create React App، قم بتثبيت هذه الاعتمادات:

```bash
# مع npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# مع yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# مع pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### What Are These Packages?

- **intlayer** – واجهة سطر الأوامر والمكتبة الأساسية لإدارة تكوينات i18n، وإعلانات المحتوى، وبناء مخارج القواميس.
- **react-intlayer** – دمج خاص بـ React مع Intlayer، يوفر بشكل ملحوظ بعض النصوص لأتمتة بناء القواميس.
- **react-i18next** – مكتبة دمج خاصة بـ React لـ i18next، تشمل وظيفة `useTranslation`.
- **i18next** – الإطار الأساسي لمعالجة الترجمة.
- **i18next-resources-to-backend** – واجهة خلفية لـ i18next تستورد الموارد JSON ديناميكيًا.

## Configuring Intlayer to Export i18next Dictionaries

قم بإنشاء (أو تحديث) `intlayer.config.ts` في جذر مشروعك:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // أضف كما تريد من اللغات
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // أخبر Intlayer لإنشاء JSON متوافق مع i18next
    dictionaryOutput: ["i18next"],

    // اختر دليلًا لمخرجات الموارد المولدة
    // سيتم إنشاء هذا المجلد إذا لم يكن موجودًا بعد.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **ملاحظة**: إذا كنت لا تستخدم TypeScript، يمكنك إنشاء هذا الملف كـ `.cjs`، `.mjs`، أو `.js` (انظر [مستندات Intlayer](https://intlayer.org/ar/doc/concept/configuration) للحصول على التفاصيل).

## Building the i18next Resources

بمجرد أن تكون إعلانات المحتوى موجودة (في القسم التالي)، قم بتشغيل **أمر بناء Intlayer**:

```bash
# مع npm
npx run intlayer build
```

```bash
# مع yarn
yarn intlayer build
```

```bash
# مع pnpm
pnpm intlayer build
```

> سيولد هذا موارد i18next الخاصة بك داخل دليل `./i18next/resources` بشكل افتراضي.

قد يبدو الناتج النموذجي كما يلي:

```bash
.
└── i18next
    └── resources
       ├── en
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

حيث يتم استخدام كل مفتاح إعلان **Intlayer** كـ **مساحة اسم i18next** (على سبيل المثال، `my-content.json`).

## Importing Dictionaries into Your react-i18next Configuration

لتحميل هذه الموارد ديناميكيًا في وقت التشغيل، استخدم [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend). على سبيل المثال، قم بإنشاء ملف `i18n.ts` (أو `.js`) في مشروعك:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // مكون إضافي react-i18next
  .use(initReactI18next)
  // تحميل الموارد ديناميكيًا
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // قم بضبط مسار الاستيراد إلى دليل الموارد الخاص بك
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // تهيئة i18next
  .init({
    // اللغة الاحتياطية
    fallbackLng: "en",

    // يمكنك إضافة خيارات إعداد i18next الأخرى هنا، انظر:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

ثم، في ملف **الجذر** أو **الفهرس** الخاص بك (مثل `src/index.tsx`)، قم باستيراد إعداد `i18n` هذا **قبل** عرض `App`:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// تهيئة i18n قبل أي شيء آخر
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Creating and Managing Your Dictionarys

يستخرج Intlayer الترجمات من "ملفات إعلان المحتوى" الموجودة في أي مكان ضمن `./src` (بشكل افتراضي).  
إليك مثال بسيط في TypeScript:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // سيكون "المفتاح" مساحة اسم i18next الخاصة بك (مثل "my-component")
  key: "my-component",
  content: {
    // كل مكالمة "t" هي عقدة ترجمة منفصلة
    heading: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "My i18n description text...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

إذا كنت تفضل JSON أو `.cjs` أو `.mjs`، راجع [مستندات Intlayer](https://intlayer.org/ar/doc/concept/content).

> بشكل افتراضي، تتطابق إعلانات المحتوى الصحيحة مع نمط امتداد الملف:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Using the Translations in React Components

بعد **بناء** موارد Intlayer الخاصة بك وتكوين react-i18next، يمكنك استخدام وظيفة `useTranslation` من **react-i18next** مباشرة.  
على سبيل المثال:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * "namespace" i18next هو المفتاح من Intlayer في "MyComponent.content.ts"
 * لذلك سنمرر "my-component" إلى useTranslation().
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> لاحظ أن دالة `t` تشير إلى **المفاتيح** داخل JSON الذي تم إنشاؤه. بالنسبة لإدخال محتوى Intlayer المسمى `heading`، ستستخدم `t("heading")`.

## Optional: Integrate with Create React App Scripts (CRACO)

يوفر **react-intlayer** نهجًا يعتمد على CRACO للتكوينات المخصصة وبناء خادم التطوير. إذا كنت ترغب في دمج خطوة بناء Intlayer بسلاسة، يمكنك:

1. **تثبيت react-intlayer** (إذا لم تقم بذلك):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **تعديل نصوص `package.json` الخاصة بك** لاستخدام نصوص `react-intlayer`:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > تعتمد نصوص `react-intlayer` على [CRACO](https://craco.js.org/). يمكنك أيضًا تنفيذ إعداد خاص بك استنادًا إلى مكون Intlayer craco. [انظر المثال هنا](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

الآن، عند تشغيل `npm run build` أو `yarn build` أو `pnpm build`، يتم تفعيل كل من بناء Intlayer وCRA.

## TypeScript Configuration

يوفر **Intlayer** **تعريفات نوعية تلقائية** لمحتوياتك. لضمان أن TypeScript يأخذها بعين الاعتبار، أضف **`types`** (أو `types` إذا قمت بتكوينها بشكل مختلف) إلى مصفوفة **include** في `tsconfig.json` الخاصة بك:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> سيتيح ذلك لـ TypeScript استنتاج شكل الترجمات لديك للحصول على إكمال أفضل للأكواد واكتشاف الأخطاء.

## Git Configuration

يوصى بـ **تجاهل** الملفات والمجلدات المولدة تلقائيًا من Intlayer. أضف هذا السطر إلى `.gitignore`:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
i18next
```

لا تقم عادةً بتعهد هذه الموارد أو نواتج البناء الداخلية لـ `.intlayer`، لأنها يمكن أن تتولد في كل عملية بناء.

# Next.js Internationalization (i18n) with next-intl و Intlayer

كلا من next-intl و Intlayer هما إطاران مفتوحا المصدر للتعريب (i18n) مصممان لتطبيقات Next.js. يتم استخدامهما بشكل واسع لإدارة الترجمات، والمحلية، وتبديل اللغات في مشاريع البرمجيات.

يتشاركان ثلاث مفاهيم رئيسية:

1. **إعلان المحتوى**: الطريقة لتحديد المحتوى القابل للترجمة في تطبيقك.

   - يُسمى `ملف إعلان المحتوى` في Intlayer، والذي يمكن أن يكون ملف JSON أو JS أو TS يقوم بتصدير البيانات المنظمة. راجع [وثائق Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/concept/content.md) لمزيد من المعلومات.
   - يُسمى `الرسائل` أو `رسائل اللغة` في next-intl، عادةً في ملفات JSON. راجع [وثائق next-intl](https://github.com/amannn/next-intl) لمزيد من المعلومات.

2. **الأدوات**: أدوات لبناء وتفسير إعلانات المحتوى في التطبيق، مثل `useIntlayer()` أو `useLocale()` لـ Intlayer، و `useTranslations()` لـ next-intl.

3. **الإضافات والبرمجيات الوسيطة**: ميزات لإدارة إعادة توجيه عنوان URL، وتحسين التجميع، وأكثر—على سبيل المثال، `intlayerMiddleware` لـ Intlayer أو [`createMiddleware`](https://github.com/amannn/next-intl) لـ next-intl.

## Intlayer مقابل next-intl: الاختلافات الرئيسية

لتحليل أعمق حول كيفية مقارنة Intlayer بمكتبات i18n الأخرى لـ Next.js (مثل next-intl)، تحقق من [منشور المدونة next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/ar/i18next_vs_next-intl_vs_intlayer.md).

## كيفية إنشاء رسائل next-intl مع Intlayer

### لماذا تستخدم Intlayer مع next-intl؟

تقدم ملفات إعلان المحتوى في Intlayer بشكل عام تجربة أفضل للمطورين. إنها أكثر مرونة وقابلة للصيانة بسبب ميزتين رئيسيتين:

1. **مكان مرن**: يمكنك وضع ملف إعلان المحتوى في Intlayer في أي مكان في شجرة ملفات تطبيقك. يجعل ذلك من السهل إعادة تسمية أو حذف المكونات دون ترك ملفات رسائل غير مستعملة أو معلقة.

   هياكل الملفات النموذجية:

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

2. **ترجمات مركزة**: تُخزن Intlayer جميع الترجمات في إعلان محتوى واحد، مما يضمن عدم فقدان أي ترجمة. في مشاريع TypeScript، تُعلم الترجمات المفقودة تلقائياً كأخطاء نوع، مما يوفر تغذية راجعة فورية للمطورين.

### التثبيت

لاستخدام Intlayer و next-intl معًا، قم بتثبيت المكتبتين:

```bash packageManager="npm"
npm install intlayer next-intl
```

```bash packageManager="yarn"
yarn add intlayer next-intl
```

```bash packageManager="pnpm"
pnpm add intlayer next-intl
```

### تكوين Intlayer لتصدير رسائل next-intl

> **ملاحظة:** يمكن أن يؤدي تصدير الرسائل من Intlayer لـ next-intl إلى إدخال اختلافات طفيفة في الهيكل. إذا كان ذلك ممكنًا، احتفظ بتدفق يعمل بIntlayer فقط أو next-intl فقط لتبسيط التكامل. إذا كنت بحاجة إلى إنشاء رسائل next-intl من Intlayer، اتبع الخطوات أدناه.

قم بإنشاء أو تحديث ملف `intlayer.config.ts` (أو `.mjs` / `.cjs`) في جذر مشروعك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"], // استخدم ناتج next-intl
    nextIntlMessagesDir: "./intl/messages", // حيث يتم حفظ رسائل next-intl
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["react-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["next-intl"],
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

### إعلان المحتوى

فيما يلي أمثلة على ملفات إعلان المحتوى بعدة تنسيقات. ستقوم Intlayer بتجميع هذه الملفات في ملفات رسائل يمكن أن تستهلكها next-intl.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const content = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default content;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-component",
  content: {
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "my-component",
  "content": {
    "helloWorld": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### بناء رسائل next-intl

لبناء ملفات الرسائل لـ next-intl، قم بتشغيل:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

سيقوم هذا بإنشاء الموارد في دليل `./intl/messages` (كما هو مُكون في `intlayer.config.*`). الناتج المتوقع:

```bash
.
└── intl
    └── messages
       └── ar
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

تتضمن كل ملف رسائل مجمعة من جميع إعلانات محتوى Intlayer. عادةً ما تتطابق المفاتيح في المستوى الأعلى مع حقول `content.key` الخاصة بك.

### استخدام next-intl في تطبيق Next.js الخاص بك

> لمزيد من التفاصيل، راجع [وثائق استخدام next-intl الرسمية](https://github.com/amannn/next-intl#readme).

1. **إنشاء برمجية وسيطة (اختياري):**  
   إذا كنت ترغب في إدارة الكشف التلقائي عن اللغة أو إعادة التوجيه، استخدم [createMiddleware](https://github.com/amannn/next-intl#createMiddleware) لـ next-intl.

   ```typescript fileName="middleware.ts"
   import createMiddleware from "next-intl/middleware";
   import { NextResponse } from "next/server";

   export default createMiddleware({
     locales: ["en", "fr", "es"],
     defaultLocale: "en",
   });

   export const config = {
     matcher: ["/((?!api|_next|.*\\..*).*)"],
   };
   ```

2. **إنشاء `layout.tsx` أو `_app.tsx` لتحميل الرسائل:**  
   إذا كنت تستخدم App Router (Next.js 13+)، أنشئ تخطيطًا:

   ```typescript fileName="app/[locale]/layout.tsx"
   import { NextIntlClientProvider } from 'next-intl';
   import { notFound } from 'next/navigation';
   import React, { ReactNode } from 'react';

   export const dynamic = 'force-dynamic';

   export default async function RootLayout({
     children,
     params
   }: {
     children: ReactNode;
     params: { locale: string };
   }) {
     let messages;
     try {
       messages = (await import(`../../intl/messages/${params.locale}.json`)).default;
     } catch (error) {
       notFound();
     }

     return (
       <html lang={params.locale}>
         <body>
           <NextIntlClientProvider locale={params.locale} messages={messages}>
             {children}
           </NextIntlClientProvider>
         </body>
       </html>
     );
   }
   ```

   إذا كنت تستخدم Pages Router (Next.js 12 أو أقل)، قم بتحميل الرسائل في `_app.tsx`:

   ```typescript fileName="pages/_app.tsx"
   import type { AppProps } from 'next/app';
   import { NextIntlProvider } from 'next-intl';

   function MyApp({ Component, pageProps }: AppProps) {
     return (
       <NextIntlProvider locale={pageProps.locale} messages={pageProps.messages}>
         <Component {...pageProps} />
       </NextIntlProvider>
     );
   }

   export default MyApp;
   ```

3. **جلب الرسائل من جانب الخادم (مثال Pages Router):**

   ```typescript fileName="pages/index.tsx"
   import { GetServerSideProps } from "next";
   import HomePage from "../components/HomePage";

   export default HomePage;

   export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
     const messages = (await import(`../intl/messages/${locale}.json`)).default;

     return {
       props: {
         locale,
         messages,
       },
     };
   };
   ```

### استخدام المحتوى في مكونات Next.js

بمجرد تحميل الرسائل في next-intl، يمكنك استخدامها في مكوناتك عبر `useTranslations()`:

```typescript fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslations } from 'next-intl';

const MyComponent: FC = () => {
  const t = useTranslations('my-component');
  // 'my-component' تتوافق مع مفتاح المحتوى في Intlayer

  return (
    <div>
      <h1>{t('helloWorld')}</h1>
    </div>
  );
};

export default MyComponent;
```

```jsx fileName="src/components/MyComponent/index.jsx" codeFormat="esm"
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("my-component");

  return (
    <div>
      <h1>{t("helloWorld")}</h1>
    </div>
  );
}
```

**هذا كل شيء!** كلما قمت بتحديث أو إضافة ملفات إعلان محتوى جديدة من Intlayer، أعد تشغيل أمر `intlayer build` لإعادة توليد رسائل JSON الخاصة بك لـ next-intl. ستقوم next-intl بالتقاط المحتوى المحدث تلقائياً.
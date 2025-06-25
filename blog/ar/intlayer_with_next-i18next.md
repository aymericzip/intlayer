---
blogName: intlayer_with_next-i18next
url: /blog/intlayer-with-next-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_next-i18next.md
createdAt: 2024-08-11
updatedAt: 2025-01-02
title: Intlayer وnext-i18next
description: قم بدمج Intlayer مع next-i18next لتطبيق Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - JavaScript
  - React
---

# Next.js Internationalization (i18n) مع next-i18next و Intlayer

كل من next-i18next و Intlayer هما إطاران مفتوحا المصدر للتدويل (i18n) مصممان لتطبيقات Next.js. يتم استخدامهما على نطاق واسع لإدارة الترجمات، والتعريب، وتبديل اللغة في مشاريع البرمجيات.

تتضمن كلا الحلقتين ثلاث مفاهيم رئيسية:

1. **إعلان المحتوى**: الطريقة لتعريف المحتوى القابل للترجمة في تطبيقك.

   - يسمى `resource` في حالة `i18next`، إعلان المحتوى هو كائن JSON منظم يحتوي على أزواج مفتاح-قيمة للترجمات في لغة واحدة أو أكثر. راجع [وثائق i18next](https://www.i18next.com/translation-function/essentials) لمزيد من المعلومات.
   - يسمى `content declaration file` في حالة `Intlayer`، يمكن أن يكون إعلان المحتوى ملف JSON أو JS أو TS يقوم بتصدير البيانات المنسقة. راجع [وثائق Intlayer](https://intlayer.org/fr/doc/concept/content) لمزيد من المعلومات.

2. **الأدوات المساعدة**: أدوات لبناء وتفسير إعلانات المحتوى في التطبيق، مثل `getI18n()`، `useCurrentLocale()`، أو `useChangeLocale()` لـ next-i18next، و `useIntlayer()` أو `useLocale()` لـ Intlayer.

3. **الإضافات والبرامج الوسيطة**: ميزات لإدارة إعادة توجيه URL، وتحسين التجميع، والمزيد، مثل `next-i18next/middleware` لـ next-i18next أو `intlayerMiddleware` لـ Intlayer.

## Intlayer مقابل i18next: الفرق الرئيسي

لاستكشاف الفروقات بين i18next و Intlayer، تحقق من منشور المدونة الخاص بنا [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/blog/ar/i18next_vs_next-intl_vs_intlayer.md).

## كيفية توليد قواميس next-i18next مع Intlayer

### لماذا تستخدم Intlayer مع next-i18next؟

تقدم ملفات إعلان محتوى Intlayer عمومًا تجربة مطور أفضل. إنها أكثر مرونة وقابلية للصيانة بفضل ميزتين رئيسيتين:

1. **المكان المرن**: يمكن وضع ملف إعلان المحتوى Intlayer في أي مكان في شجرة ملفات التطبيق، مما يبسط إدارة المكونات المكررة أو المحذوفة دون ترك إعلانات محتوى غير مستخدمة.

   أمثلة لهيكل الملفات:

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

2. **الترجمات المركزية**: تحفظ Intlayer جميع الترجمات في ملف واحد، مما يضمن عدم وجود ترجمة مفقودة. عند استخدام TypeScript، يتم اكتشاف الترجمات المفقودة تلقائيًا والإبلاغ عنها كأخطاء.

### التثبيت

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### تكوين Intlayer لتصدير قواميس i18next

> لا يضمن تصدير موارد i18next توافق 1:1 مع الإطارات الأخرى. يُوصى بالالتزام بتكوين قائم على Intlayer لتقليل المشكلات.

لتصدير موارد i18next، قم بتكوين Intlayer في ملف `intlayer.config.ts`. أمثلة على التكوينات:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
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
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

هنا استمرارية وتصحيح الأجزاء المتبقية من المستند الخاص بك:

---

### استيراد القواميس إلى تكوين i18next الخاص بك

لاستيراد الموارد المولدة إلى تكوين i18next الخاص بك، استخدم `i18next-resources-to-backend`. فيما يلي أمثلة:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### إعلان المحتوى

أمثلة على ملفات إعلان المحتوى بصيغ مختلفة:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
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

### بناء موارد next-i18next

لبناء موارد next-i18next، قم بتشغيل الأمر التالي:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

سيؤدي ذلك إلى توليد الموارد في دليل `./i18next/resources`. الإخراج المتوقع:

```bash
.
└── i18next
    └── resources
       └── ar
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

ملحوظة: يتوافق مساحة أسماء i18next مع مفتاح إعلان Intlayer.

### تنفيذ مكون Next.js

بمجرد تكوينها، نفذ مكون Next.js لإعادة بناء موارد i18next الخاصة بك كلما تم تحديث ملفات إعلان محتوى Intlayer.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### استخدام المحتوى في مكونات Next.js

بعد تنفيذ مكون Next.js، يمكنك استخدام المحتوى في مكوناتك:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

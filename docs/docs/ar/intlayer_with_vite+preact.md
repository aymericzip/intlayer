---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite + Preact i18n - كيفية ترجمة تطبيق Preact في 2026
description: اكتشف كيفية جعل موقعك باستخدام Vite و Preact متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Vite
  - Preact
  - جافا سكريبت
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: إضافة أمر init
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية التاريخ
---

# ترجم موقعك الإلكتروني المبني بـ Vite و Preact باستخدام Intlayer | التدويل (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

باستخدام Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكون.
- **توطين البيانات الوصفية والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** بأنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الاكتشاف الديناميكي للغة وتبديلها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و Preact

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-vite-preact-template) على GitHub.

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين والترجمة و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md) والترجمة البرمجية و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **preact-intlayer**

  الحزمة التي تدمج Intlayer مع تطبيق Preact. توفر مزودي السياق والخطافات لتدويل Preact.

- **vite-intlayer**

  تتضمن إضافة Vite لدمج Intlayer مع [أداة تجميع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط لاكتشاف اللغة المفضلة للمستخدم وإدارة ملفات تعريف الارتباط والتعامل مع إعادة توجيه عناوين URL.

### الخطوة 2: تكوين مشروعك

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // افتراضي: بادئة لجميع اللغات ما عدا اللغة الافتراضية
    storage: ["cookie", "header"], // افتراضي: حفظ اللغة في ملف تعريف الارتباط والكشف من الرأس
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // افتراضي: بادئة لجميع اللغات ما عدا اللغة الافتراضية
    storage: ["cookie", "header"], // افتراضي: حفظ اللغة في ملف تعريف الارتباط والكشف من الرأس
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // افتراضي: بادئة لجميع اللغات ما عدا اللغة الافتراضية
    storage: ["cookie", "header"], // افتراضي: حفظ اللغة في ملف تعريف الارتباط والكشف من الرأس
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL الموطنة، وأوضاع التوجيه، وخيارات التخزين، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف المكون الإضافي intlayer إلى تكوينك.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> يُستخدم المكون الإضافي Vite `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، فإنه يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: إعلان المحتوى الخاص بك

أنشئ وأدر إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // مطلوب إذا كنت تستخدم JSX مباشرة في .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // مطلوب إذا كنت تستخدم JSX مباشرة في .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما كانت مدرجة في دليل `contentDir` (افتراضيًا، `./src`). وتتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> لمزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

> إذا كان ملف المحتوى الخاص بك يتضمن كود TSX، فقد تحتاج إلى استيراد `import { h } from "preact";` أو التأكد من ضبط براغما JSX بشكل صحيح لـ Preact.

### الخطوة 5: استخدام Intlayer في كودك

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // بفرض أن لديك preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // بفرض أن ملف CSS الخاص بك يسمى app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      {/* محتوى Markdown */}
      <div>{content.myMarkdownContent}</div>

      {/* محتوى HTML */}
      <div>{content.myHtmlContent}</div>

      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> إذا كنت تريد استخدام المحتوى الخاص بك في خاصية `string` ، مثل `alt` ، `title` ، `href` ، `aria-label` ، وما إلى ذلك ، فيجب عليك استدعاء قيمة الدالة ، مثل:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> ملاحظة: في Preact، عادةً ما يتم كتابة `className` كـ `class`.

> لمعرفة المزيد حول الخطاف `useIntlayer` ، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md) (واجهة برمجة التطبيقات مماثلة لـ `preact-intlayer`).

> إذا كان تطبيقك موجودًا بالفعل، يمكنك استخدام [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)، بالإضافة إلى [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)، لتحويل آلاف المكونات في ثانية واحدة.

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك ، يمكنك استخدام وظيفة `setLocale` التي يوفرها خطاف `useLocale`. تتيح لك هذه الوظيفة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> لمعرفة المزيد حول الخطاف `useLocale` ، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) (واجهة برمجة التطبيقات مماثلة لـ `preact-intlayer`).

### (اختياري) الخطوة 7: إضافة توجيه محلي إلى تطبيقك

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. هذا مفيد لتحسين محركات البحث (SEO) وعناوين URL الصديقة لمحركات البحث.
مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> افتراضيًا، لا يتم إضافة بادئة للمسارات للغة الافتراضية. إذا كنت ترغب في إضافة بادئة للغة الافتراضية، يمكنك تعيين خيار `routing.mode` إلى `"prefix-all"` في التكوين الخاص بك. راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة توجيه محلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` يلف مسارات تطبيقك ويتعامل مع التوجيه المستند إلى اللغة. إليك مثال باستخدام [preact-iso](https://github.com/preactjs/preact-iso):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة باللغة.
 * يستخدم preact-iso لإدارة التنقل وعرض المكونات المحلية.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة باللغة.
 * يستخدم preact-iso لإدارة التنقل وعرض المكونات المحلية.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة باللغة.
 * يستخدم preact-iso لإدارة التنقل وعرض المكونات المحلية.
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

بعد ذلك، يمكنك استخدام مكون `LocaleRouter` في تطبيقك:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... مكون AppContent الخاص بك

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... مكون AppContent الخاص بك

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... مكون AppContent الخاص بك

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

لتغيير عنوان URL عند تغيير اللغة، يمكنك استخدام خاصية `onLocaleChange` التي يوفرها خطاف `useLocale`. بالتوازي، يمكنك استخدام طريقة `route` من `useLocation` في `preact-iso` لتحديث مسار URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // بناء عنوان URL باللغة المحدثة
      // مثال: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // تحديث مسار URL
      route(pathWithLocale, true); // true للاستبدال (replace)
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // سيتم التعامل مع التنقل البرمجي بعد تعيين اللغة بواسطة onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* اللغة - مثلاً FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها الأصلية - مثلاً Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثلاً Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثلاً French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> مراجع التوثيق:
>
> > - [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) (واجهة برمجة التطبيقات مماثلة لـ `preact-intlayer`)> - [خطاف `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)> - [خطاف `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)> - [خطاف `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)> - [خاصية `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ar)> - [خاصية `lang`](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/lang)> - [خاصية `dir`](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/dir)> - [خاصية `aria-current`](https://developer.mozilla.org/ar/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [واجهة برمجة تطبيقات Popover](https://developer.mozilla.org/ar/docs/Web/API/Popover_API)

### (اختياري) الخطوة 9: تبديل سمات اللغة والاتجاه لـ HTML

عندما يدعم تطبيقك لغات متعددة، من الضروري تحديث سمتي `lang` و `dir` في وسم `<html>` لتتوافق مع اللغة الحالية. القيام بذلك يضمن:

- **إمكانية الوصول**: تعتمد أجهزة قراءة الشاشة والتقنيات المساعدة على سمة `lang` الصحيحة لنطق وتفسير المحتوى بدقة.
- **عرض النص**: تضمن سمة `dir` (الاتجاه) عرض النص بالترتيب الصحيح (على سبيل المثال، من اليسار إلى اليمين للغة الإنجليزية، ومن اليمين إلى اليسار للغة العربية أو العبرية)، وهو أمر أساسي لسهولة القراءة.
- **تحسين محركات البحث (SEO)**: تستخدم محركات البحث سمة `lang` لتحديد لغة صفحتك، مما يساعد في تقديم المحتوى المحلي المناسب في نتائج البحث.

من خلال تحديث هذه السمات ديناميكيًا عند تغيير اللغة، تضمن تجربة متسقة وسهلة الوصول للمستخدمين عبر جميع اللغات المدعومة.

#### تنفيذ الخطاف (Hook)

أنشئ خطافًا مخصصًا لإدارة سمات HTML. يستمع الخطاف لتغييرات اللغة ويحدث السمات وفقًا لذلك:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * يقوم بتحديث سمتي `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
 * - `lang`: يخبر المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثلاً، 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النص بشكل صحيح، وإمكانية الوصول، وتحسين محركات البحث (SEO).
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // تحديث سمة اللغة إلى اللغة الحالية.
    document.documentElement.lang = locale;

    // تعيين اتجاه النص بناءً على اللغة الحالية.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * يقوم بتحديث سمتي `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * يقوم بتحديث سمتي `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### استخدام الخطاف في تطبيقك

قم بدمج الخطاف في مكونك الرئيسي بحيث يتم تحديث سمات HTML كلما تغيرت اللغة:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // تم استيراد useIntlayer مسبقًا إذا كان AppContent يحتاجه
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// تعريف AppContent من الخطوة 5

const AppWithHooks: FunctionalComponent = () => {
  // تطبيق الخطاف لتحديث سمتي lang و dir في وسم <html> بناءً على اللغة.
  useI18nHTMLAttributes();

  // بفرض أن AppContent هو مكون عرض المحتوى الرئيسي الخاص بك من الخطوة 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// تعريف AppContent من الخطوة 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// تعريف AppContent من الخطوة 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

### (اختياري) الخطوة 10: إنشاء مكون رابط محلي

لضمان أن تنقل تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية إلى عناوين URL الداخلية.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL الموطنة محركات البحث على فهرسة الصفحات الخاصة بلغات معينة بشكل صحيح وتوفر للمستخدمين محتوى بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط محلي في جميع أنحاء تطبيقك، فإنك تضمن بقاء التنقل ضمن اللغة الحالية، مما يمنع تبديلات اللغة غير المتوقعة.
- **قابلية الصيانة**: تبسيط إدارة عناوين URL من خلال مركزية منطق التوطين في مكون واحد.

إليك تنفيذ مكون `Link` محلي في Preact:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * دالة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون Link مخصص يقوم بتكييف سمة href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، فإنه يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى عنوان URL (مثل /fr/about).
 * يضمن هذا بقاء التنقل داخل نفس سياق اللغة.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // إذا كان الرابط داخليًا وتم توفير href صالح، فاحصل على عنوان URL المحلي.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * دالة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * مكون Link مخصص يقوم بتكييف سمة href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، فإنه يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى عنوان URL (مثل /fr/about).
 * يضمن هذا بقاء التنقل داخل نفس سياق اللغة.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // إذا كان الرابط داخليًا وتم توفير href صالح، فاحصل على عنوان URL المحلي.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * دالة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * مكون Link مخصص يقوم بتكييف سمة href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، فإنه يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى عنوان URL (مثل /fr/about).
 * يضمن هذا بقاء التنقل داخل نفس سياق اللغة.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // إذا كان الرابط داخليًا وتم توفير href صالح، فاحصل على عنوان URL المحلي.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### كيف يعمل

- **كشف الروابط الخارجية**:  
  تحدد الدالة المساعدة `checkIsExternalLink` ما إذا كان عنوان URL خارجيًا. تُترك الروابط الخارجية دون تغيير لأنها لا تحتاج إلى توطين.
- **استرداد اللغة الحالية**:  
  يوفر خطاف `useLocale` اللغة الحالية (مثلاً `fr` للفرنسية).
- **توطين عنوان URL**:  
  بالنسبة للروابط الداخلية (أي غير الخارجية)، يتم استخدام `getLocalizedUrl` لإضافة بادئة اللغة الحالية تلقائيًا إلى عنوان URL. هذا يعني أنه إذا كان مستخدمك باللغة الفرنسية، فإن تمرير `/about` كـ `href` سيحوله إلى `/fr/about`.
- **إرجاع الرابط**:  
  يعيد المكون عنصر `<a>` مع عنوان URL المحلي، مما يضمن أن التنقل متسق مع اللغة.

### (اختياري) الخطوة 11: عرض Markdown و HTML

يدعم Intlayer عرض محتوى Markdown و HTML في Preact.

يمكنك تخصيص عرض محتوى Markdown و HTML باستخدام طريقة `.use()`. تسمح لك هذه الطريقة بتجاوز العرض الافتراضي لعلامات محددة.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* العرض الأساسي */}
    {myMarkdownContent}

    {/* العرض المخصص لـ Markdown */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* العرض الأساسي لـ HTML */}
    {myHtmlContent}

    {/* العرض المخصص لـ HTML */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### تكوين TypeScript

يستخدم Intlayer توسيع الوحدات (module augmentation) للحصول على فوائد TypeScript وجعل قاعدة الكود الخاصة بك أقوى.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // موصى به لـ Preact 10+
    // ...
  },
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

> تأكد من إعداد `tsconfig.json` الخاص بك لـ Preact، خاصةً `jsx` و `jsxImportSource` أو `jsxFactory`/`jsxFragmentFactory` لإصدارات Preact الأقدم إذا لم تستخدم إعدادات `preset-vite` الافتراضية.

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من متجر VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### اذهب أبعد من ذلك

للذهاب أبعد من ذلك، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو توفير المحتوى الخاص بك خارجيًا باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

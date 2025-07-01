---
docName: intlayer_with_vite_preact
url: https://intlayer.org/doc/environment/vite-and-preact
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+preact.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: ترجمة موقعك باستخدام Vite و Preact (i18n)
description: اكتشف كيفية جعل موقعك باستخدام Vite و Preact متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Vite
  - Preact
  - جافا سكريبت
---

# البدء بالتدويل (i18n) باستخدام Intlayer و Vite و Preact

> هذه الحزمة قيد التطوير. راجع [المشكلة](https://github.com/aymericzip/intlayer/issues/118) لمزيد من المعلومات. أظهر اهتمامك بـ Intlayer لـ Preact من خلال الإعجاب بالمشكلة

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-vite-preact-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكون.
- **توطين البيانات الوصفية والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** بأنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة وتبديلها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و Preact

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **preact-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Preact. توفر مزودي السياق (context providers) وخطافات (hooks) لتدويل Preact.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [أداة تجميع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط (الكوكيز)، والتعامل مع إعادة توجيه عناوين URL.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتحديد لغات تطبيقك:

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
};

module.exports = config;
```

من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف مكون intlayer الإضافي إلى تكوينك.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> يتم استخدام مكون Vite الإضافي `intlayerPlugin()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر ألقابًا لتحسين الأداء.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

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
      es: "شعار Preact",
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
          حرر <code>src/app.tsx</code> واحفظ لاختبار HMR
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
      en: "انقر على شعارات Vite و Preact لمعرفة المزيد",
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
      ar: "شعار Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
      ar: "شعار Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ar: "العدد هو ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      ar: "حرر src/app.jsx واحفظ لاختبار HMR",
    }),
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      ar: "انقر على شعارات Vite و Preact لمعرفة المزيد",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Needed if you use JSX directly in .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      ar: "شعار Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "شعار Preact",
      es: "شعار Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ar: "العدد هو ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      ar: "حرر src/app.tsx واحفظ لاختبار HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      ar: "انقر على شعاري Vite و Preact لمعرفة المزيد",
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
        "ar": "شعار Vite",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "ar": "شعار Preact",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "ar": "Vite + Preact",
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "ar": "العدد هو ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ar": "حرر src/app.tsx واحفظ لاختبار HMR",
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ar": "انقر على شعارات Vite و Preact لمعرفة المزيد",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

> إذا كان ملف المحتوى الخاص بك يتضمن كود TSX، فقد تحتاج إلى استيراد `import { h } from "preact";` أو التأكد من تعيين براغما JSX بشكل صحيح لـ Preact.

### الخطوة 5: استخدام Intlayer في كودك

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // بافتراض أن لديك ملف preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // بافتراض أن ملف CSS الخاص بك اسمه app.css
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

> إذا كنت تريد استخدام المحتوى الخاص بك في خاصية من نوع `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> ملاحظة: في Preact، عادةً ما يُكتب `className` كـ `class`.

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md) (واجهة برمجة التطبيقات مشابهة لـ `preact-intlayer`).

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام الدالة `setLocale` المقدمة من الخطاف `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      تغيير اللغة إلى الإنجليزية
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
      تغيير اللغة إلى الإنجليزية
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
      تغيير اللغة إلى الإنجليزية
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> لمعرفة المزيد عن الخطاف `useLocale`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) (واجهة برمجة التطبيقات مشابهة لـ `preact-intlayer`).

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

الغرض من هذه الخطوة هو جعل المسارات فريدة لكل لغة. هذا مفيد لتحسين محركات البحث (SEO) ولعناوين URL الصديقة لمحركات البحث.
مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> بشكل افتراضي، لا يتم إضافة بادئة للمسارات للغة الافتراضية. إذا كنت ترغب في إضافة بادئة للغة الافتراضية، يمكنك تعيين الخيار `middleware.prefixDefault` إلى `true` في إعداداتك. راجع [توثيق الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة التوجيه المحلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` الذي يلف مسارات تطبيقك ويتعامل مع التوجيه بناءً على اللغة. إليك مثالًا باستخدام [preact-iso](https://github.com/preactjs/preact-iso):

أولاً، قم بتثبيت `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * مكون يتعامل مع التوطين ويغلف الأطفال بسياق اللغة المناسب.
 * يدير اكتشاف اللغة بناءً على عنوان URL والتحقق من صحتها.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // تحديد اللغة الحالية، مع الرجوع إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // مسار URL الحالي
  );

  /**
   * إذا كانت الخاصية middleware.prefixDefault صحيحة، يجب دائمًا إضافة بادئة للغة الافتراضية.
   */
  if (middleware.prefixDefault) {
    // التحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // استبدال الإدخال الحالي في السجل بالإدخال الجديد
        />
      );
    }

    // تغليف العناصر الفرعية بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون الخاصية middleware.prefixDefault خاطئة، لا تتم إضافة بادئة للغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // تحقق مما إذا كانت اللغة الحالية ضمن قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // لف العناصر الفرعية بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة بكل لغة.
 * يستخدم preact-iso لإدارة التنقل وعرض المكونات المترجمة.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// استيراد التبعيات والوظائف اللازمة
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // مطلوب لـ JSX

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * مكون يتعامل مع التوطين ويغلف الأطفال بسياق اللغة المناسب.
 * يدير اكتشاف اللغة بناءً على عنوان URL والتحقق من صحتها.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // تحديد اللغة الحالية، والرجوع إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب دائمًا إضافة بادئة اللغة الافتراضية.
   */
  if (middleware.prefixDefault) {
    // التحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // استبدال الإدخال الحالي في السجل بالإدخال الجديد
        />
      );
    }

    // تغليف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما يكون middleware.prefixDefault خاطئًا، لا يتم إضافة بادئة للغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية ضمن قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // تغليف العناصر الفرعية بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة بكل لغة.
 * يستخدم preact-iso لإدارة التنقل وعرض المكونات المترجمة.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// استيراد التبعيات والوظائف اللازمة
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // مطلوب لـ JSX

// تفكيك التهيئة من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * مكون يتعامل مع التوطين ويغلف الأطفال بسياق اللغة المناسب.
 * يدير اكتشاف اللغة بناءً على عنوان URL والتحقق من صحتها.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // تحديد اللغة الحالية، والرجوع إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب دائمًا إضافة بادئة اللغة الافتراضية.
   */
  if (middleware.prefixDefault) {
    // التحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // استبدال الإدخال الحالي في السجل بالإدخال الجديد
        />
      );
    }

    // تغليف العناصر الفرعية بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا يتم إضافة بادئة اللغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // تحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // لف العناصر الفرعية بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة بكل لغة.
 * يستخدم preact-iso لإدارة التنقل وعرض المكونات المترجمة.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

ثم يمكنك استخدام مكون `LocaleRouter` في تطبيقك:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
tsx fileName="src/app.tsx" codeFormat="typescript"
// ... مكون AppContent الخاص بك (المعرف في الخطوة 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... مكون AppContent الخاص بك (المعرف في الخطوة 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... مكون AppContent الخاص بك (المعرف في الخطوة 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

بالتوازي، يمكنك أيضًا استخدام `intLayerMiddlewarePlugin` لإضافة التوجيه من جانب الخادم إلى تطبيقك. سيقوم هذا المكون الإضافي تلقائيًا بالكشف عن اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط المناسب للغة. إذا لم يتم تحديد لغة، سيحدد المكون الإضافي اللغة الأنسب بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم الكشف عن أي لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

لتغيير عنوان URL عند تغيير اللغة، يمكنك استخدام الخاصية `onLocaleChange` التي يوفرها الخطاف `useLocale`. بالتوازي، يمكنك استخدام `useLocation` و `route` من مكتبة `preact-iso` لتحديث مسار URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // توفر preact-iso عنوان URL الكامل
      // بناء عنوان URL مع اللغة المحدّثة
      // مثال: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // تحديث مسار URL
      route(pathWithLocale, true); // true للاستبدال
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
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
              {/* اللغة - مثل FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها الأصلية - مثل Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثل French */}
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
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // للـ JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
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
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // للـ JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
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

module.exports = LocaleSwitcher;
```

> مراجع التوثيق:
>
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) (واجهة برمجة التطبيقات مشابهة لـ `preact-intlayer`)
>
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hreflang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/ar/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [واجهة برمجة تطبيقات Popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) > > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md) (واجهة برمجة التطبيقات مشابهة لـ `preact-intlayer`) > - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md) > - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md) > - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md) > - [خاصية `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ar) > - [خاصية `lang`](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/lang) > - [خاصية `dir`](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/dir) > - [خاصية `aria-current`](https://developer.mozilla.org/ar/docs/Web/Accessibility/ARIA/Attributes/aria-current) > - [واجهة برمجة التطبيقات Popover](https://developer.mozilla.org/ar/docs/Web/API/Popover_API)

فيما يلي الخطوة التاسعة المحدثة مع شرح إضافي وأمثلة كود محسنة:

---

### (اختياري) الخطوة 9: تبديل خصائص اللغة والاتجاه في وسم HTML

عندما يدعم تطبيقك عدة لغات، من الضروري تحديث خصائص `lang` و `dir` في وسم `<html>` لتتوافق مع اللغة الحالية. يضمن ذلك:

- **إمكانية الوصول**: تعتمد برامج قراءة الشاشة وتقنيات المساعدة على خاصية `lang` الصحيحة لنطق وتفسير المحتوى بدقة.
- **عرض النص**: تضمن خاصية `dir` (الاتجاه) عرض النص بالترتيب الصحيح (مثلًا من اليسار إلى اليمين للإنجليزية، ومن اليمين إلى اليسار للعربية أو العبرية)، وهو أمر أساسي لسهولة القراءة.
- **تحسين محركات البحث (SEO)**: تستخدم محركات البحث الخاصية `lang` لتحديد لغة صفحتك، مما يساعد في تقديم المحتوى المحلي المناسب في نتائج البحث.

من خلال تحديث هذه الخصائص ديناميكيًا عند تغيير اللغة، تضمن تجربة متسقة وسهلة الوصول للمستخدمين عبر جميع اللغات المدعومة.

#### تنفيذ الـ Hook

قم بإنشاء hook مخصص لإدارة خصائص HTML. يستمع الـ hook لتغييرات اللغة ويحدث الخصائص وفقًا لذلك:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * يقوم بتحديث خصائص `lang` و `dir` لعنصر <html> بناءً على اللغة الحالية.
 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النص بشكل صحيح، وللوصولية، وتحسين محركات البحث (SEO).
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // تحديث خاصية اللغة إلى اللغة الحالية.
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
 * يقوم بتحديث خصائص `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
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
 * يقوم بتحديث خصائص `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
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

#### استخدام الـ Hook في تطبيقك

ادمج الـ hook في المكون الرئيسي الخاص بك بحيث يتم تحديث خصائص HTML في كل مرة يتغير فيها locale:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // تم استيراد useIntlayer مسبقًا إذا كان AppContent يحتاجه
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// تعريف AppContent من الخطوة 5

const AppWithHooks: FunctionalComponent = () => {
  // تطبيق الـ hook لتحديث خصائص lang و dir في وسم <html> بناءً على اللغة المختارة.
  useI18nHTMLAttributes();

  // بافتراض أن AppContent هو مكون عرض المحتوى الرئيسي الخاص بك من الخطوة 5
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

بتطبيق هذه التغييرات، سيقوم تطبيقك بـ:

- التأكد من أن خاصية **اللغة** (`lang`) تعكس اللغة الحالية بشكل صحيح، وهو أمر مهم لتحسين محركات البحث وسلوك المتصفح.
- ضبط **اتجاه النص** (`dir`) وفقًا للغة المختارة، مما يعزز من قابلية القراءة وسهولة الاستخدام للغات ذات اتجاهات قراءة مختلفة.
- توفير تجربة أكثر **سهولة في الوصول**، حيث تعتمد تقنيات المساعدة على هذه السمات لتعمل بشكل مثالي.

### (اختياري) الخطوة 10: إنشاء مكون رابط محلي

لضمان أن تتوافق تنقلات تطبيقك مع اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية إلى عناوين URL الداخلية.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL المحلية محركات البحث على فهرسة الصفحات الخاصة بكل لغة بشكل صحيح وتوفر للمستخدمين محتوى بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط محلي في جميع أنحاء تطبيقك، تضمن بقاء التنقل ضمن اللغة الحالية، مما يمنع التبديلات غير المتوقعة في اللغة.
- **قابلية الصيانة**: تركيز منطق التوطين في مكون واحد يبسط إدارة عناوين URL.

بالنسبة لـ Preact مع `preact-iso`، عادةً ما تُستخدم علامات `<a>` القياسية للملاحة، ويتولى `preact-iso` التعامل مع التوجيه. إذا كنت بحاجة إلى التنقل برمجيًا عند النقر (مثل تنفيذ إجراءات قبل التنقل)، يمكنك استخدام دالة `route` من `useLocation`. إليك كيفية إنشاء مكون رابط مخصص يقوم بتوطين عناوين URL:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // بافتراض أن useLocation و route يمكن أن يكونا من preact-iso عبر preact-intlayer إذا تم إعادة التصدير، أو استيرادهما مباشرة
// إذا لم يتم إعادة التصدير، استورد مباشرة: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // للسمات HTMLAttributes
import { forwardRef } from "preact/compat"; // لإعادة توجيه المراجع

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // اختياري: لاستبدال حالة التاريخ
}

/**
 * دالة مساعدة للتحقق مما إذا كان الرابط المعطى خارجيًا.
 * إذا بدأ الرابط بـ http:// أو https://، يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يقوم بتكييف خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى عنوان URL (مثلاً /fr/about).
 * هذا يضمن أن التنقل يبقى ضمن نفس سياق اللغة.
 * يستخدم وسم <a> عادي ولكنه يمكن أن يفعّل التنقل من جهة العميل باستخدام `route` من preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // من preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // التأكد من تعريف href
        event.button === 0 && // نقرة زر الفأرة الأيسر
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // التحقق من عدم وجود مفاتيح تعديل قياسية
        !props.target // عدم استهداف نافذة/تبويب جديد
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // التنقل فقط إذا كان الرابط مختلفًا
          route(hrefI18n, replace); // استخدام route من preact-iso
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // استيراد من preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // من أجل JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // استيراد من preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // من أجل JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? ""); // تحقق مما إذا كان الرابط خارجيًا

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // الحصول على اللغة الحالية
    const location = useLocation(); // الحصول على الموقع الحالي
    const isExternalLink = checkIsExternalLink(href); // التحقق مما إذا كان الرابط خارجيًا

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href; // تعريب الرابط إذا لم يكن خارجيًا

    const handleClick = (event) => {
      if (onClick) {
        onClick(event); // استدعاء دالة النقر إذا كانت موجودة
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault(); // منع السلوك الافتراضي للنقر
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### كيف يعمل

- **كشف الروابط الخارجية**:  
  تقوم دالة المساعدة `checkIsExternalLink` بتحديد ما إذا كان الرابط URL خارجيًا. تُترك الروابط الخارجية دون تغيير.
- **استرجاع اللغة الحالية**:  
  يوفر الخطاف `useLocale` اللغة الحالية.
- **توطين الرابط**:  
  بالنسبة للروابط الداخلية، تضيف دالة `getLocalizedUrl` بادئة اللغة الحالية إلى الرابط.
- **التنقل من جانب العميل**:
  تتحقق دالة `handleClick` مما إذا كان الرابط داخليًا وإذا كان يجب منع التنقل القياسي. إذا كان الأمر كذلك، فإنها تستخدم دالة `route` من مكتبة `preact-iso` (التي يتم الحصول عليها عبر `useLocation` أو استيرادها مباشرة) لتنفيذ التنقل على جانب العميل. هذا يوفر سلوكًا يشبه تطبيق الصفحة الواحدة (SPA) بدون إعادة تحميل الصفحة بالكامل.
- **إرجاع الرابط**:  
  تُرجع المكون عنصر `<a>` مع عنوان URL المحلي ومعالج النقر المخصص.

### تكوين TypeScript

يستخدم Intlayer توسيع الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

لعمل ذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمة وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### التقدم أكثر

للتقدم أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ

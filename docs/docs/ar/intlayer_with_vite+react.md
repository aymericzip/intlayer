---
createdAt: 2024-03-07
updatedAt: 2024-03-07
title: كيفية ترجمة تطبيق Vite and React – دليل i18n 2025
description: تعلّم كيفية إضافة التدويل (i18n) إلى تطبيق Vite و React الخاص بك باستخدام Intlayer. اتبع هذا الدليل لجعل تطبيقك متعدد اللغات.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Vite
  - React
  - i18n
  - جافا سكريبت
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4---
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية السجل
---

# البدء في التدويل (i18n) باستخدام Intlayer و Vite و React

<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

راجع [نموذج التطبيق](https://github.com/aymericzip/intlayer-vite-react-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **توطين البيانات الوصفية والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع الأنواع التي يتم إنشاؤها تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة وتبديلها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و React

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر مزودي السياق (context providers) وخطافات (hooks) لتدويل React.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة الكوكيز، والتعامل مع إعادة توجيه URL.

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

> من خلال ملف التهيئة هذا، يمكنك إعداد عناوين URL محلية، وإعادة توجيه الوسيط، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تهيئة Vite الخاصة بك

أضف مكون intlayer الإضافي إلى تهيئتك.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> يتم استخدام مكون Vite الإضافي `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يعرّف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          حرر <code>src/App.tsx</code> واحفظ لاختبار HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "انقر على شعارات Vite و React لمعرفة المزيد",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // لا تنس استيراد React إذا كنت تستخدم عقدة React في المحتوى الخاص بك
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "انقر على شعارات Vite و React لمعرفة المزيد",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // لا تنس استيراد React إذا كنت تستخدم عقدة React في المحتوى الخاص بك
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> و احفظ لتجربة HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "انقر على شعارات Vite و React لمعرفة المزيد",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
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
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "ar": "شعار React",
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "ar": "Vite + React",
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
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
        "ar": "حرر src/App.tsx واحفظ لاختبار HMR",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ar": "انقر على شعارات Vite و React لمعرفة المزيد",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تطابق امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

> إذا كان ملف المحتوى الخاص بك يتضمن كود TSX، يجب أن تفكر في استيراد `import React from "react";` في ملف المحتوى الخاص بك.

### الخطوة 5: استخدام Intlayer في الكود الخاص بك

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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

> إذا كنت ترغب في استخدام المحتوى الخاص بك في خاصية من نوع `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام الدالة `setLocale` المقدمة من الخطاف `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      تغيير اللغة إلى الإنجليزية
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      تغيير اللغة إلى الإنجليزية
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      تغيير اللغة إلى الإنجليزية
    </button>
  );
};
```

> لمعرفة المزيد عن الخطاف `useLocale`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. هذا مفيد لتحسين محركات البحث (SEO) ولعناوين URL الصديقة لمحركات البحث.
مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> بشكل افتراضي، لا يتم إضافة بادئة للمسارات للغة الافتراضية. إذا كنت ترغب في إضافة بادئة للغة الافتراضية، يمكنك تعيين الخيار `middleware.prefixDefault` إلى `true` في إعداداتك. راجع [توثيق الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة التوجيه المحلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` الذي يلف مسارات تطبيقك ويتعامل مع التوجيه بناءً على اللغة. إليك مثالًا باستخدام [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// استيراد التبعيات والوظائف اللازمة
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // دوال مساعدة وأنواع من 'intlayer'
import type { FC, PropsWithChildren } from "react"; // أنواع React للمكونات الوظيفية والخصائص
import { IntlayerProvider } from "react-intlayer"; // مزود سياق التدويل
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات الموجه لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * مكون يتعامل مع التدويل ويغلف الأطفال بسياق اللغة المناسب.
 * يدير اكتشاف اللغة بناءً على عنوان URL والتحقق منها.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي

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
     * عندما تكون middleware.prefixDefault خاطئة، لا يتم إضافة بادئة للغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // تغليف العناصر الفرعية بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة بكل لغة.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المترجمة.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // نمط المسار لالتقاط اللغة (مثل /en/، /fr/) ومطابقة جميع المسارات التالية
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // يلف الأطفال بإدارة اللغة
          />
        ))}

      {
        // إذا كان تعطيل بادئة اللغة الافتراضية، يتم عرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // يلف الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// استيراد التبعيات والوظائف اللازمة
import { configuration, getPathWithoutLocale } from "intlayer"; // وظائف وأصناف مساعدة من 'intlayer'
// وظائف وأصناف مساعدة من 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // مزود لسياق التدويل
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات الموجه لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * مكون يتعامل مع التدويل ويغلف الأطفال بسياق اللغة المناسب.
 * يدير اكتشاف اللغة بناءً على عنوان URL والتحقق من صحتها.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي

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
          replace // استبدال إدخال السجل الحالي بالإدخال الجديد
        />
      );
    }

    // تغليف العناصر الفرعية بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا يتم إضافة بادئة للغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
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

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة بكل لغة.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المحلية.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // نمط المسار لالتقاط اللغة (مثل /en/، /fr/) ومطابقة جميع المسارات التالية
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // يلف الأطفال بإدارة اللغة
          />
        ))}

      {
        // إذا كان تعطيل بادئة اللغة الافتراضية، يتم عرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // يلف الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// استيراد التبعيات والوظائف اللازمة
const { configuration, getPathWithoutLocale } = require("intlayer"); // وظائف مساعدة وأنواع من 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // موفر لسياق التدويل
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // مكونات الموجه لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * مكون يتعامل مع التدويل ويغلف الأطفال بسياق اللغة المناسب.
 * يدير اكتشاف اللغة بناءً على عنوان URL والتحقق منها.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي

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

    // تغليف العناصر الفرعية بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا يتم إضافة بادئة للغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
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

/**
 * مكون راوتر يقوم بإعداد مسارات خاصة بكل لغة.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المترجمة.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // نمط المسار لالتقاط اللغة (مثل /en/، /fr/) ومطابقة جميع المسارات التالية
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // يلف الأطفال مع إدارة اللغة
          />
        ))}

      {
        // إذا تم تعطيل إضافة بادئة اللغة الافتراضية، يتم عرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // يلف الأطفال مع إدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

ثم يمكنك استخدام مكون `LocaleRouter` في تطبيقك:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... مكون AppContent الخاص بك

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... مكون AppContent الخاص بك

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... مكون AppContent الخاص بك

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

بالتوازي، يمكنك أيضًا استخدام `intlayerMiddleware` لإضافة التوجيه من جانب الخادم إلى تطبيقك. سيقوم هذا المكون الإضافي بالكشف تلقائيًا عن اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط المناسب للغة. إذا لم يتم تحديد لغة، فسيحدد المكون الإضافي اللغة الأنسب بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم الكشف عن أي لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

لتغيير عنوان URL عند تغيير اللغة، يمكنك استخدام الخاصية `onLocaleChange` المقدمة من الخطاف `useLocale`. وبالتوازي، يمكنك استخدام الخطافين `useLocation` و `useNavigate` من مكتبة `react-router-dom` لتحديث مسار عنوان URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // الحصول على مسار عنوان URL الحالي. مثال: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // بناء عنوان URL مع اللغة المحدّثة
      // مثال: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // تحديث مسار URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* اللغة - مثلاً FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها الأصلية - مثلاً Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثلاً Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
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
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // بناء URL مع اللغة المحدّثة
      // مثال: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // تحديث مسار URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* اللغة - مثال: FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها الأصلية - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة في اللغة الحالية - على سبيل المثال Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // بناء URL مع اللغة المحدّثة
      // مثال: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // تحديث مسار URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* اللغة المحلية - مثل FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها المحلية - مثل Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة المحلية الحالية - مثل Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - على سبيل المثال الفرنسية */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> مراجع التوثيق:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/ar/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/ar/docs/Web/Accessibility/ARIA/Attributes/aria-current)

فيما يلي الخطوة التاسعة المحدثة مع توضيحات إضافية وأمثلة كود محسنة:

---

### (اختياري) الخطوة 9: تبديل سمات اللغة والاتجاه في وسم HTML

عندما يدعم تطبيقك لغات متعددة، من الضروري تحديث سمات `lang` و `dir` في وسم `<html>` لتتوافق مع اللغة الحالية. يضمن ذلك:

- **سهولة الوصول**: تعتمد برامج قراءة الشاشة وتقنيات المساعدة على سمة `lang` الصحيحة لنطق المحتوى وتفسيره بدقة.
- **عرض النص**: تضمن سمة `dir` (الاتجاه) عرض النص بالترتيب الصحيح (مثلًا من اليسار إلى اليمين للإنجليزية، ومن اليمين إلى اليسار للعربية أو العبرية)، وهو أمر أساسي لسهولة القراءة.
- **تحسين محركات البحث (SEO)**: تستخدم محركات البحث سمة `lang` لتحديد لغة الصفحة، مما يساعد في تقديم المحتوى المحلي المناسب في نتائج البحث.

من خلال تحديث هذه السمات ديناميكيًا عند تغيير اللغة، تضمن تجربة متسقة وسهلة الوصول للمستخدمين عبر جميع اللغات المدعومة.

#### تنفيذ الـ Hook

قم بإنشاء hook مخصص لإدارة سمات HTML. يستمع الـ hook لتغييرات اللغة ويحدث السمات وفقًا لذلك:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * يقوم بتحديث سمات `lang` و `dir` لعنصر <html> بناءً على اللغة الحالية.
 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النص بشكل صحيح، وللوصولية، وتحسين محركات البحث.
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

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * يقوم بتحديث خصائص `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، و 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النص بشكل صحيح، وللوصولية، وتحسين محركات البحث.
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

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * يقوم بتحديث خصائص `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النص بشكل صحيح، وتحسين إمكانية الوصول، وتحسين محركات البحث.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // تحديث خاصية اللغة إلى اللغة الحالية.
    document.documentElement.lang = locale;

    // تعيين اتجاه النص بناءً على اللغة الحالية.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### استخدام الـ Hook في تطبيقك

قم بدمج الـ hook في المكون الرئيسي الخاص بك بحيث يتم تحديث خصائص HTML في كل مرة يتغير فيها اللغة:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // تطبيق الـ hook لتحديث خصائص lang و dir في وسم <html> بناءً على اللغة الحالية.
  useI18nHTMLAttributes();

  // ... بقية مكونك
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // تطبيق الـ hook لتحديث خصائص lang و dir لعلامة <html> بناءً على اللغة الحالية.
  useI18nHTMLAttributes();

  // ... بقية مكوناتك
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // تطبيق الخطاف لتحديث خصائص lang و dir في وسم <html> بناءً على اللغة المحلية.
  useI18nHTMLAttributes();

  // ... بقية مكوناتك
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

بتطبيق هذه التغييرات، سيقوم تطبيقك بـ:

- ضمان أن خاصية **اللغة** (`lang`) تعكس اللغة المحلية الحالية بشكل صحيح، وهو أمر مهم لتحسين محركات البحث وسلوك المتصفح.
- ضبط **اتجاه النص** (`dir`) وفقًا للغة المحلية، مما يعزز من قابلية القراءة وسهولة الاستخدام للغات ذات اتجاهات قراءة مختلفة.
- توفير تجربة أكثر **سهولة في الوصول**، حيث تعتمد تقنيات المساعدة على هذه الخصائص لتعمل بشكل مثالي.

### (اختياري) الخطوة 10: إنشاء مكون رابط محلي

لضمان أن تحترم تنقلات تطبيقك اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية إلى عناوين URL الداخلية، بحيث عند نقر مستخدم يتحدث الفرنسية على رابط لصفحة "حول"، يتم توجيهه إلى `/fr/about` بدلاً من `/about`.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL المترجمة محركات البحث على فهرسة الصفحات الخاصة بكل لغة بشكل صحيح وتوفر للمستخدمين محتوى بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط مترجم في جميع أنحاء تطبيقك، تضمن أن التنقل يبقى ضمن اللغة الحالية، مما يمنع التبديلات غير المتوقعة في اللغة.
- **قابلية الصيانة**: توحيد منطق التوطين في مكون واحد يبسط إدارة عناوين URL، مما يجعل قاعدة الكود الخاصة بك أسهل في الصيانة والتطوير مع نمو تطبيقك.

فيما يلي تنفيذ لمكون `Link` مخصص يدعم التوطين باستخدام TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * دالة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يقوم بتعديل خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى الرابط (مثل /fr/about).
 * هذا يضمن أن التنقل يبقى ضمن نفس سياق اللغة.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على الرابط المحلي.
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

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * دالة مساعدة للتحقق مما إذا كان الرابط المعطى خارجيًا.
 * إذا بدأ الرابط بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يقوم بتكييف خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى الرابط (مثلاً /fr/about).
 * هذا يضمن أن التنقل يبقى ضمن نفس سياق اللغة.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على الرابط المحلي.
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

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * دالة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، يُعتبر خارجيًا.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يقوم بتكييف خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة اللغة إلى الرابط (مثلاً /fr/about).
 * هذا يضمن أن التنقل يبقى ضمن نفس سياق اللغة.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على الرابط المترجم.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### كيف يعمل

- **كشف الروابط الخارجية**:  
  تقوم الدالة المساعدة `checkIsExternalLink` بتحديد ما إذا كان الرابط URL خارجيًا. يتم ترك الروابط الخارجية كما هي لأنها لا تحتاج إلى تعريب.

- **استرجاع اللغة الحالية**:  
  يوفر الخطاف `useLocale` اللغة الحالية (مثلًا `fr` للفرنسية).

- **تعريب الرابط**:  
  بالنسبة للروابط الداخلية (أي غير الخارجية)، يتم استخدام `getLocalizedUrl` لإضافة بادئة اللغة الحالية تلقائيًا إلى الرابط. هذا يعني أنه إذا كان المستخدم يتصفح باللغة الفرنسية، فإن تمرير `/about` كـ `href` سيُحوَّل إلى `/fr/about`.

- **إرجاع الرابط**:  
  يعيد المكون عنصر `<a>` مع عنوان URL المحلي، مما يضمن أن التنقل متسق مع اللغة المختارة.

من خلال دمج هذا المكون `Link` عبر تطبيقك، تحافظ على تجربة مستخدم متماسكة وواعية باللغة، مع الاستفادة أيضًا من تحسين محركات البحث وسهولة الاستخدام.

### تكوين TypeScript

يستخدم Intlayer توسيع الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

![نص بديل](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![نص بديل](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# ترجم Vite and React باستخدام Intlayer | التدويل (i18n)
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف عن الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### التقدم أكثر

للتقدم أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

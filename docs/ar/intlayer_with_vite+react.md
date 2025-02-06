# Getting Started Internationalizing (i18n) مع Intlayer و Vite و React

## ما هو Intlayer؟

**Intlayer** هو مكتبة مبتكرة ومفتوحة المصدر للتدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في التطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تعبيرية على مستوى المكون.
- **توطين البيانات التعريفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** مع أنواع مولدة تلقائيًا، مما يحسن من الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف وتبديل اللغة الديناميكي.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و React

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)، الترجمة، و [أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر موفري السياق والركائز لنقل التدويل في React. بالإضافة إلى ذلك، تتضمن الملحق Vite لدمج Intlayer مع [حزمة Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى الوسيط لاكتشاف تفضيلات اللغة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

أنشئ ملف إعداد لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // اللغات الأخرى الخاصة بك
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
      // اللغات الأخرى الخاصة بك
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
      // اللغات الأخرى الخاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> من خلال ملف تكوين هذا، يمكنك إعداد URLs محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، الموقع والامتداد لإعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في إعداد Vite الخاص بك

أضف ملحق intlayer إلى إعدادك.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> ملحق `intlayerPlugin()` هو ملحق Vite يستخدم لدمج Intlayer مع Vite. ويتأكد من بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. ويعرف متغيرات بيئة Intlayer في تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: إعلان محتواك

أنشئ وأدر إعلانات المحتوى الخاصة بك لتخزين الترجمات:

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
      // تذكر استيراد React إذا كنت تستخدم عقدة React في المحتوى الخاص بك
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
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
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
        // تذكر استيراد React إذا كنت تستخدم عقدة React في المحتوى الخاص بك
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
      en: "Click on the Vite and React logos to learn more",
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
        // تذكر استيراد React إذا كنت تستخدم عقدة React في المحتوى الخاص بك
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
      en: "Click on the Vite and React logos to learn more",
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
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
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
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما أنها مدرجة في دليل `contentDir` (بشكل افتراضي، `./src`). وتطابق امتداد ملف إعلان المحتوى (بشكل افتراضي، `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> لمزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).
> إذا كان ملف المحتوى الخاص بك يتضمن شفرة TSX، يجب أن تفكر في استيراد `import React from "react";` في ملف المحتوى الخاص بك.

### الخطوة 5: استخدم Intlayer في شفرتك

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

> إذا كنت ترغب في استخدام المحتوى الخاص بك في خاصية `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد عن دالة `useIntlayer`، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayer.md).

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` التي يوفرها هوك `useLocale`. هذه الدالة تسمح لك بتعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
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
      Change Language to English
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
      Change Language to English
    </button>
  );
};
```

> لمعرفة المزيد عن هوك `useLocale`، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md).

### (اختياري) الخطوة 7: إضافة توجيه محلي إلى تطبيقك

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. وهذا مفيد لتحسين محركات البحث وعناوين URLs الصديقة لمحركات البحث.
مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> بشكل افتراضي، لا يتم إضافة بادئة للمسارات الخاصة باللغة الافتراضية. إذا كنت ترغب في إضافة بادئة للغة الافتراضية، يمكنك تعيين خيار `middleware.prefixDefault` إلى `true` في إعدادك. راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة توجيه محلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` الذي يحيط بمسارات تطبيقك ويتعامل مع التوجيه القائم على اللغة. إليك مثال باستخدام [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// استيراد التبعيات والدوال الضرورية
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // دوال وأنواع المرافق من 'intlayer'
import type { FC, PropsWithChildren } from "react"; // أنواع React للمكونات الوظيفية
import { IntlayerProvider } from "react-intlayer"; // موفر للسياق الدولي
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات маршрутов لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * مكون يدير التوطين ويحيط الأطفال بسياق اللغة المناسب.
 * يدير الكشف عن اللغة المستند إلى URL والتحقق.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams<{ locale: Locales }>(); // استخراج معلمة اللغة من URL

  // تحديد اللغة الحالية، مع العودة إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب أن تكون اللغة الافتراضية دائمًا مضافة.
   */
  if (middleware.prefixDefault) {
    // تحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال إدخال التاريخ الحالي بالإدخال الجديد
        />
      );
    }

    // إحاطة الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا يتم إضافة اللغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست هي اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // تحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // إحاطة الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون توجيه يقوم بإعداد مسارات خاصة باللغة.
 * يستخدم React Router لإدارة التنقل وعرض مكونات محلية.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (على سبيل المثال، /en/، /fr/) ومطابقة جميع المسارات اللاحقة
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يحيط الأطفال بإدارة اللغة
      />

      {
        // إذا كانت إضافة بادئة للغة الافتراضية غير ممكنة، قم بعرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يحيط الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// استيراد التبعيات والدوال الضرورية
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // دوال وأنواع المرافق من 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // موفر للسياق الدولي
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات маршрутов لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * مكون يدير التوطين ويحيط الأطفال بسياق اللغة المناسب.
 * يدير الكشف عن اللغة المستند إلى URL والتحقق.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams(); // استخراج معلمة اللغة من URL

  // تحديد اللغة الحالية، مع العودة إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب أن تكون اللغة الافتراضية دائمًا مضافة.
   */
  if (middleware.prefixDefault) {
    // تحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال إدخال التاريخ الحالي بالإدخال الجديد
        />
      );
    }

    // إحاطة الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا يتم إضافة اللغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست هي اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // تحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // إحاطة الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون توجيه يقوم بإعداد مسارات خاصة باللغة.
 * يستخدم React Router لإدارة التنقل وعرض مكونات محلية.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (على سبيل المثال، /en/، /fr/) ومطابقة جميع المسارات اللاحقة
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يحيط الأطفال بإدارة اللغة
      />

      {
        // إذا كانت إضافة بادئة للغة الافتراضية غير ممكنة، قم بعرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يحيط الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// استيراد التبعيات والدوال الضرورية
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // دوال وأنواع المرافق من 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // موفر للسياق الدولي
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // مكونات маршрутов لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * مكون يدير التوطين ويحيط الأطفال بسياق اللغة المناسب.
 * يدير الكشف عن اللغة المستند إلى URL والتحقق.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams(); // استخراج معلمة اللغة من URL

  // تحديد اللغة الحالية، مع العودة إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب أن تكون اللغة الافتراضية دائمًا مضافة.
   */
  if (middleware.prefixDefault) {
    // تحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال إدخال التاريخ الحالي بالإدخال الجديد
        />
      );
    }

    // إحاطة الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا يتم إضافة اللغة الافتراضية.
     * تأكد من أن اللغة الحالية صالحة وليست هي اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // تحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // إحاطة الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون توجيه يقوم بإعداد مسارات خاصة باللغة.
 * يستخدم React Router لإدارة التنقل وعرض مكونات محلية.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (على سبيل المثال، /en/، /fr/) ومطابقة جميع المسارات اللاحقة
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يحيط الأطفال بإدارة اللغة
      />

      {
        // إذا كانت إضافة بادئة للغة الافتراضية غير ممكنة، قم بعرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يحيط الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

في الوقت نفسه، يمكنك أيضًا استخدام `intLayerMiddlewarePlugin` لإضافة توجيه من جانب الخادم إلى تطبيقك. هذا المكون الإضافي سيكتشف تلقائيًا اللغة الحالية بناءً على URL ويعين ملف تعريف الارتباط المناسب. إذا لم يتم تحديد أي لغة، فإن المكون الإضافي سيتعارف على أكثر لغة ملائمة بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم اكتشاف أي لغة، سيعيد التوجيه إلى اللغة الافتراضية.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (اختياري) الخطوة 8: تغيير URL عند تغيير اللغة

لتغيير URL عند تغيير اللغة، يمكنك استخدام الخاصية `onLocaleChange` التي يوفرها هوك `useLocale`. في الوقت نفسه، يمكنك استخدام هوكي `useLocation` و `useNavigate` من `react-router-dom` لتحديث مسار URL.

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
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // بناء URL مع اللغة المحينة
    // مثال: /es/about مع تعيين اللغة إلى الإسبانية
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // تحديث مسار URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة في لغتها الخاصة - على سبيل المثال، Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - على سبيل المثال، Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال، French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة في لغتها الخاصة - على سبيل المثال، FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // بناء URL مع اللغة المحينة
    // مثال: /es/about مع تعيين اللغة إلى الإسبانية
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // تحديث مسار URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة في لغتها الخاصة - على سبيل المثال، Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - على سبيل المثال، Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال، French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة في لغتها الخاصة - على سبيل المثال، FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // بناء URL مع اللغة المحينة
    // مثال: /es/about مع تعيين اللغة إلى الإسبانية
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // تحديث مسار URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* اللغة في لغتها الخاصة - على سبيل المثال، Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - على سبيل المثال، Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال، French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة في لغتها الخاصة - على سبيل المثال، FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> مراجع الوثائق:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### تكوين TypeScript

تستخدم Intlayer زيادة الوحدة للاستفادة من TypeScript وجعل قاعدة الشفرة الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // تكوينك المخصص
  "include": [
    "src",
    "types", // <- تضمين الأنواع التي تم إنشاؤها تلقائياً
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. وهذا يسمح لك بتجنب ارتكابها في مستودع Git الخاص بك.

لعمل ذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore`:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

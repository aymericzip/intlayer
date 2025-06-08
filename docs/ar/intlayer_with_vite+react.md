# البدء في التدويل (i18n) باستخدام Intlayer و Vite و React

<iframe title="Vite + React: Build a Multilingual App from Scratch using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

انظر [Template Application](https://github.com/aymericzip/intlayer-react-native-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة مفتوحة المصدر مبتكرة للتدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام القواميس التصريحية على مستوى المكونات.
- **توطين البيانات الوصفية ديناميكيًا**، والمسارات، والمحتوى.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة وتبديلها.

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

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md)، الترجمة، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر موفري السياق وخطافات لتدويل React.

- **vite-intlayer**
  تتضمن الإضافة الخاصة بـ Vite لدمج Intlayer مع [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى البرامج الوسيطة لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة التوجيه لعناوين URL.

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

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، إعادة التوجيه عبر البرامج الوسيطة، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف إضافة intlayer إلى تكوينك.

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

> يتم استخدام إضافة `intlayerPlugin()` الخاصة بـ Vite لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ar: "شعار Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ar: "شعار React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ar: "العدد هو ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      ar: (
        <>
          قم بتحرير <code>src/App.tsx</code> واحفظ لاختبار HMR
        </>
      ),
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
      ar: "انقر على شعارات Vite و React لمعرفة المزيد",
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
      ar: "شعار Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ar: "شعار React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ar: "العدد هو ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // لا تنسَ استيراد React إذا كنت تستخدم عقدة React في المحتوى الخاص بك
        ar: (
          <>
            قم بتحرير <code>src/App.tsx</code> واحفظ لاختبار HMR
          </>
        ),
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
      ar: "انقر على شعارات Vite و React لمعرفة المزيد",
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
      ar: "شعار Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ar: "شعار React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ar: "العدد هو ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
---

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "ar": "شعار Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "ar": "شعار React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "ar": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "ar": "العدد هو "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "ar": "قم بتحرير src/App.tsx واحفظ لاختبار HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "ar": "انقر على شعارات Vite و React لمعرفة المزيد"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا، `./src`). وتطابق امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md).

> إذا كان ملف المحتوى الخاص بك يتضمن كود TSX، يجب أن تفكر في استيراد `import React from "react";` في ملف المحتوى الخاص بك.

### الخطوة 5: استخدام Intlayer في الكود الخاص بك

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء التطبيق الخاص بك:

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

> إذا كنت تريد استخدام المحتوى الخاص بك في سمة `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الوظيفة، مثل:

> ```jsx
>
> ```

> <img src={content.image.src.value} alt={content.image.value} />

> ```
>
> ```

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayer.md).

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام وظيفة `setLocale` المقدمة من الخطاف `useLocale`. تتيح لك هذه الوظيفة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Arabic)}>
      تغيير اللغة إلى العربية
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
    <button onClick={() => setLocale(Locales.Arabic)}>
      تغيير اللغة إلى العربية
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

> لمعرفة المزيد عن الخطاف `useLocale`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md).

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. هذا مفيد لتحسين محركات البحث (SEO) وعناوين URL الصديقة لمحركات البحث.
مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> بشكل افتراضي، لا يتم إضافة بادئة للمسارات للغة الافتراضية. إذا كنت ترغب في إضافة بادئة للغة الافتراضية، يمكنك ضبط الخيار `middleware.prefixDefault` إلى `true` في التكوين الخاص بك. راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة التوجيه المحلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` يلتف حول مسارات تطبيقك ويتعامل مع التوجيه بناءً على اللغة. إليك مثال باستخدام [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// استيراد التبعيات والوظائف اللازمة
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // وظائف وأصناف مساعدة من 'intlayer'
import type { FC, PropsWithChildren } from "react"; // أنواع React للمكونات الوظيفية والخصائص
import { IntlayerProvider } from "react-intlayer"; // مزود لسياق التدويل
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات التوجيه لإدارة التنقل

// استخراج التكوين من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * مكون يتعامل مع التوطين ويلتف حول الأطفال بسياق اللغة المناسب.
 * يدير الكشف عن اللغة والتحقق منها بناءً على عنوان URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي

  // تحديد اللغة الحالية، مع العودة إلى الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لإنشاء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // مسار URL الحالي
  );

  /**
   * إذا كان middleware.prefixDefault صحيحًا، يجب دائمًا إضافة بادئة للغة الافتراضية.
   */
  if (middleware.prefixDefault) {
    // التحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع تحديث المسار
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // استبدال الإدخال الحالي في السجل بالإدخال الجديد
        />
      );
    }

    // التفاف الأطفال مع IntlayerProvider وتعيين اللغة الحالية
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
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // التفاف الأطفال مع IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون التوجيه الذي يقوم بإعداد مسارات خاصة باللغة.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المحلية.
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
            // نمط المسار لالتقاط اللغة (مثل /en/, /fr/) ومطابقة جميع المسارات اللاحقة
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // يلتف حول الأطفال مع إدارة اللغة
          />
        ))}

      {
        // إذا تم تعطيل إضافة بادئة للغة الافتراضية، قم بعرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // يلتف حول الأطفال مع إدارة اللغة
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
import { IntlayerProvider } from "react-intlayer"; // مزود لسياق التدويل
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات التوجيه لإدارة التنقل

// استخراج التكوين من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * مكون يتعامل مع التوطين ويلتف حول الأطفال بسياق اللغة المناسب.
 * يدير الكشف عن اللغة والتحقق منها بناءً على عنوان URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي

  // تحديد اللغة الحالية، مع العودة إلى الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لإنشاء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // مسار URL الحالي
  );

  /**
   * إذا كان middleware.prefixDefault صحيحًا، يجب دائمًا إضافة بادئة للغة الافتراضية.
   */
  if (middleware.prefixDefault) {
    // التحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع تحديث المسار
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // استبدال الإدخال الحالي في السجل بالإدخال الجديد
        />
      );
    }

    // التفاف الأطفال مع IntlayerProvider وتعيين اللغة الحالية
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
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية موجودة في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // التفاف الأطفال مع IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون موجه يقوم بإعداد مسارات خاصة باللغات.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المترجمة.
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
            // نمط المسار لالتقاط اللغة (مثل /en/, /fr/) ومطابقة جميع المسارات اللاحقة
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // يلف الأطفال بإدارة اللغة
          />
        ))}

      {
        // إذا تم تعطيل إضافة بادئة للغة الافتراضية، يتم عرض الأطفال مباشرة في المسار الجذر
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
const { configuration, getPathWithoutLocale } = require("intlayer"); // وظائف وأدوات مساعدة من 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // مزود لسياق التدويل
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // مكونات الموجه لإدارة التنقل

// استخراج التكوين من Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * مكون يتعامل مع الترجمة ويلف الأطفال بسياق اللغة المناسب.
 * يدير الكشف عن اللغة والتحقق منها بناءً على عنوان URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي

  // تحديد اللغة الحالية، مع الرجوع إلى الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لإنشاء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب دائمًا إضافة بادئة للغة الافتراضية.
   */
  if (middleware.prefixDefault) {
    // التحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع تحديث المسار
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // استبدال الإدخال الحالي في السجل بالإدخال الجديد
        />
      );
    }

    // لف الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
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

    // لف الأطفال بـ IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون موجه يقوم بإعداد مسارات خاصة باللغات.
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
            // نمط المسار لالتقاط اللغة (مثل /en/, /fr/) ومطابقة جميع المسارات اللاحقة
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // يلف الأطفال بإدارة اللغة
          />
        ))}

      {
        // إذا تم تعطيل إضافة بادئة للغة الافتراضية، يتم عرض الأطفال مباشرة في المسار الجذر
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

بالتوازي، يمكنك أيضًا استخدام `intLayerMiddlewarePlugin` لإضافة توجيه من جانب الخادم إلى تطبيقك. سيكتشف هذا المكون الإضافي اللغة الحالية تلقائيًا بناءً على عنوان URL ويضبط ملف تعريف الارتباط الخاص باللغة المناسبة. إذا لم يتم تحديد لغة، سيحدد المكون الإضافي اللغة الأنسب بناءً على تفضيلات لغة المتصفح للمستخدم. إذا لم يتم اكتشاف لغة، فسيعيد التوجيه إلى اللغة الافتراضية.

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

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

لتغيير عنوان URL عند تغيير اللغة، يمكنك استخدام الخاصية `onLocaleChange` المقدمة من الخطاف `useLocale`. بالتوازي، يمكنك استخدام الخطافين `useLocation` و `useNavigate` من `react-router-dom` لتحديث مسار URL.

```jsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // إنشاء الرابط مع اللغة المحدثة
      // مثال: /ar/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // تحديث مسار الرابط
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
              {/* اللغة في لغتها الأصلية - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة في اللغة الحالية - مثال: Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثال: French */}
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
  const { pathname, search } = useLocation(); // الحصول على مسار الرابط الحالي. مثال: /ar/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // إنشاء الرابط مع اللغة المحدثة
      // مثال: /ar/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // تحديث مسار الرابط
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
              {/* اللغة في لغتها الأصلية - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة في اللغة الحالية - مثال: Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثال: French */}
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
  const { pathname, search } = useLocation(); // الحصول على مسار الرابط الحالي. مثال: /ar/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // إنشاء الرابط مع اللغة المحدثة
      // مثال: /ar/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // تحديث مسار الرابط
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
              {/* اللغة في لغتها الأصلية - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة في اللغة الحالية - مثال: Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثال: French */}
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

> - [دالة `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md)

> - [دالة `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocaleName.md)

> - [دالة `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getLocalizedUrl.md)

> - [دالة `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/intlayer/getHTMLTextDir.md)

> - [خاصية `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ar)

> - [خاصية `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

> - [خاصية `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

> - [خاصية `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (اختياري) الخطوة 9: تغيير خصائص اللغة والاتجاه في HTML

عند دعم تطبيقك لعدة لغات، من المهم تحديث خصائص `lang` و `dir` في وسم `<html>` لتتوافق مع اللغة الحالية. القيام بذلك يضمن:

- **إمكانية الوصول**: تعتمد تقنيات المساعدة مثل قارئات الشاشة على خاصية `lang` لنطق المحتوى بشكل صحيح.
- **عرض النصوص**: خاصية `dir` (الاتجاه) تضمن عرض النصوص بالترتيب الصحيح (مثلًا، من اليسار إلى اليمين للإنجليزية، ومن اليمين إلى اليسار للعربية أو العبرية)، مما يعزز قابلية القراءة.
- **تحسين محركات البحث (SEO)**: تستخدم محركات البحث خاصية `lang` لتحديد لغة الصفحة، مما يساعد في تقديم المحتوى المحلي المناسب في نتائج البحث.

بتحديث هذه الخصائص ديناميكيًا عند تغيير اللغة، تضمن تجربة متسقة وسهلة الوصول للمستخدمين عبر جميع اللغات المدعومة.

#### تنفيذ الدالة

قم بإنشاء دالة مخصصة لإدارة خصائص HTML. تستمع الدالة لتغييرات اللغة وتحدث الخصائص وفقًا لذلك:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النصوص بشكل صحيح، وتحسين الوصول، وتحسين محركات البحث.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // تحديث سمة اللغة إلى الإعداد المحلي الحالي.
    document.documentElement.lang = locale;

    // تعيين اتجاه النص بناءً على الإعداد المحلي الحالي.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * يقوم بتحديث سمات `lang` و `dir` لعنصر HTML <html> بناءً على الإعدادات المحلية الحالية.
 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النصوص بشكل صحيح، وتحسين الوصول، وتحسين محركات البحث.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // تحديث سمة اللغة إلى الإعداد المحلي الحالي.
    document.documentElement.lang = locale;

    // تعيين اتجاه النص بناءً على الإعداد المحلي الحالي.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * يقوم بتحديث سمات `lang` و `dir` لعنصر HTML <html> بناءً على الإعدادات المحلية الحالية.
 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النصوص بشكل صحيح، وتحسين الوصول، وتحسين محركات البحث.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // تحديث سمة اللغة إلى الإعداد المحلي الحالي.
    document.documentElement.lang = locale;

    // تعيين اتجاه النص بناءً على الإعداد المحلي الحالي.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### استخدام الخطاف في تطبيقك

قم بدمج الخطاف في المكون الرئيسي الخاص بك بحيث يتم تحديث سمات HTML كلما تغير الإعداد المحلي:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // تطبيق الخطاف لتحديث سمات lang و dir لعلامة <html> بناءً على الإعداد المحلي.
  useI18nHTMLAttributes();

  // ... باقي المكون الخاص بك
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
  // تطبيق الخطاف لتحديث سمات lang و dir لعلامة <html> بناءً على الإعداد المحلي.
  useI18nHTMLAttributes();

  // ... باقي المكون الخاص بك
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
  // تطبيق الخطاف لتحديث سمات lang و dir لعلامة <html> بناءً على الإعداد المحلي.
  useI18nHTMLAttributes();

  // ... باقي المكون الخاص بك
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

بتطبيق هذه التغييرات، سيقوم تطبيقك بـ:

- ضمان أن تعكس سمة **اللغة** (`lang`) الإعداد المحلي الحالي بشكل صحيح، وهو أمر مهم لتحسين محركات البحث وسلوك المتصفح.
- تعديل **اتجاه النص** (`dir`) وفقًا للإعداد المحلي، مما يعزز قابلية القراءة وسهولة الاستخدام للغات ذات أوامر قراءة مختلفة.
- توفير تجربة أكثر **وصولاً**، حيث تعتمد تقنيات المساعدة على هذه السمات لتعمل بشكل مثالي.

### (اختياري) الخطوة 10: إنشاء مكون رابط محلي

لضمان أن التنقل في تطبيقك يحترم الإعداد المحلي الحالي، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا بإضافة بادئة لعناوين URL الداخلية باللغة الحالية، بحيث يتم توجيه المستخدم الناطق بالفرنسية، على سبيل المثال، إلى `/ar/about` بدلاً من `/about`.

هذا السلوك مفيد لعدة أسباب:

- **تحسين محركات البحث وتجربة المستخدم**: تساعد عناوين URL المحلية محركات البحث على فهرسة الصفحات الخاصة باللغة بشكل صحيح وتقديم محتوى للمستخدمين بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط محلي في جميع أنحاء تطبيقك، تضمن أن التنقل يبقى ضمن السياق المحلي الحالي، مما يمنع التبديل غير المتوقع للغة.
- **سهولة الصيانة**: تبسيط إدارة عناوين URL من خلال مركزية منطق التوطين في مكون واحد يجعل قاعدة التعليمات البرمجية الخاصة بك أسهل في الصيانة والتوسيع مع نمو تطبيقك.

فيما يلي تنفيذ مكون `Link` المحلي في TypeScript:

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
 * وظيفة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يتكيف مع سمة href بناءً على الإعداد المحلي الحالي.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة للعنوان المحلي (مثل /ar/about).
 * يضمن ذلك أن يبقى التنقل ضمن نفس سياق الإعداد المحلي.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على عنوان URL المحلي.
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
 * وظيفة مساعدة للتحقق مما إذا كان عنوان URL معين خارجيًا.
 * إذا بدأ عنوان URL بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يتكيف مع سمة href بناءً على الإعداد المحلي الحالي.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة بادئة للعنوان المحلي (مثل /ar/about).
 * يضمن ذلك أن يبقى التنقل ضمن نفس سياق الإعداد المحلي.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

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
 * وظيفة مساعدة للتحقق مما إذا كان الرابط خارجيًا.
 * إذا بدأ الرابط بـ http:// أو https://، فإنه يعتبر خارجيًا.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * مكون رابط مخصص يقوم بتكييف خاصية href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، يستخدم `getLocalizedUrl` لإضافة اللغة كبادئة للرابط (مثل /ar/about).
 * يضمن ذلك أن تظل التنقلات ضمن نفس سياق اللغة.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // إذا كان الرابط داخليًا وتم توفير href صالح، احصل على الرابط المحلي.
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
  تقوم وظيفة المساعدة `checkIsExternalLink` بتحديد ما إذا كان الرابط خارجيًا. يتم ترك الروابط الخارجية دون تغيير لأنها لا تحتاج إلى الترجمة.

- **استرجاع اللغة الحالية**:  
  يقوم الخطاف `useLocale` بتوفير اللغة الحالية (مثل `ar` للعربية).

- **توطين الرابط**:  
  بالنسبة للروابط الداخلية (أي غير الخارجية)، يتم استخدام `getLocalizedUrl` لإضافة اللغة كبادئة للرابط تلقائيًا. هذا يعني أنه إذا كان المستخدم يستخدم اللغة العربية وتم تمرير `/about` كـ `href`، فسيتم تحويله إلى `/ar/about`.

- **إرجاع الرابط**:  
  يقوم المكون بإرجاع عنصر `<a>` مع الرابط المحلي، مما يضمن أن التنقل يتماشى مع اللغة.

من خلال دمج هذا المكون `Link` عبر تطبيقك، يمكنك الحفاظ على تجربة مستخدم متسقة ومدركة للغة، مع الاستفادة أيضًا من تحسين محركات البحث (SEO) وسهولة الاستخدام.

### إعداد TypeScript

يستخدم Intlayer توسيع الوحدات للاستفادة من TypeScript وجعل قاعدة الكود الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن إعدادات TypeScript الخاصة بك تتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... إعدادات TypeScript الحالية الخاصة بك
  "include": [
    // ... إعدادات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### إعداد Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

### المزيد من التقدم

للمزيد من التقدم، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_visual_editor.md) أو فصل المحتوى الخاص بك باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_CMS.md).

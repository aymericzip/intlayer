# البدء في التوطين (i18n) مع Intlayer و React Create App

## ما هو Intlayer؟

**Intlayer** هو مكتبة توطين مفتوحة المصدر ومبتكرة (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس وصفية على مستوى المكون.
- **تخصيص البيانات الوصفية ديناميكيًا**، والمسارات، والمحتوى.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف عن اللغة تلقائيًا والتحويل بين اللغات.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق React

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم الضرورية باستخدام npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التوطين لإدارة التكوين، والترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md)، التحويل، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md).

- **react-intlayer**

  الحزمة التي تدمج Intlayer مع تطبيق React. يوفر موفري السياق وhooks لتوطين React. بالإضافة إلى ذلك، يتضمن البرنامج المساعد لتكامل Intlayer مع تطبيق تم إنشاؤه باستخدام Create React App.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ARABIC,
      Locales.FRENCH,
      Locales.SPANISH,
      // اللغات الأخرى الخاصة بك
    ],
    defaultLocale: Locales.ARABIC,
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
      Locales.ARABIC,
      Locales.FRENCH,
      Locales.SPANISH,
      // اللغات الأخرى الخاصة بك
    ],
    defaultLocale: Locales.ARABIC,
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
      Locales.ARABIC,
      Locales.FRENCH,
      Locales.SPANISH,
      // اللغات الأخرى الخاصة بك
    ],
    defaultLocale: Locales.ARABIC,
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، وتحويلات الوسيطة، وأسماء الكوكيز، وموقع المحتوى وإمتدادها، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعايير المتاحة، ارجع إلى [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في إعداد CRA الخاص بك

قم بتغيير نصوصك لاستخدام react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> تستند نصوص `react-intlayer` إلى [craco](https://craco.js.org/). يمكنك أيضًا تنفيذ إعدادك الخاص بناءً على ملحق intlayer craco. [شاهد المثال هنا](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### الخطوة 4: إعلان محتواك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      ar: (
        <>
          قم بتحرير <code>src/App.tsx</code> واحفظ لإعادة التحميل
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ar: "تعلم React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ar: "ابدأ بتحرير",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ar: "تعلم React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ar: "ابدأ بتحرير",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ar: "تعلم React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> يمكنك تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (بشكل افتراضي، `./src`). وتطابق امتداد ملف إعلان المحتوى (بشكل افتراضي، `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> لمزيد من التفاصيل، ارجع إلى [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).
> إذا كان ملف المحتوى الخاص بك يتضمن رمز TSX، يجب أن تفكر في استيراد `import React from "react";` في ملف المحتوى الخاص بك.

### الخطوة 5: استخدم Intlayer في كودك

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> ملاحظة: إذا كنت ترغب في استخدام المحتوى الخاص بك في خاصية `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الوظيفة، مثل:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد عن hook `useIntlayer`، ارجع إلى [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useIntlayer.md).

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام دالة `setLocale` المقدمة من hook `useLocale`. تتيح لك هذه الدالة تعيين اللغة الخاصة بالتطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ARABIC)}>
      تغيير اللغة إلى العربية
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ARABIC)}>
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
    <button onClick={() => setLocale(Locales.ARABIC)}>
      تغيير اللغة إلى العربية
    </button>
  );
};
```

> لمعرفة المزيد عن hook `useLocale`، ارجع إلى [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/ar/packages/react-intlayer/useLocale.md).

### (اختياري) الخطوة 7: إضافة التوجيه المحلي إلى تطبيقك

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. وهذا مفيد لتحسين محركات البحث وعناوين URL المتوافقة مع تحسين محركات البحث. مثال:

```plaintext
- https://example.com/about
- https://example.com/ar/about
- https://example.com/fr/about
```

> بشكل افتراضي، لا تُضاف البادئات للمسارات باللغة الافتراضية. إذا كنت تريد إضافة بادئة للغة الافتراضية، يمكنك تعيين خيار `middleware.prefixDefault` إلى `true` في تكوينك. راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة توجيه محلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` الذي يلف مسارات تطبيقك ويعالج التوجيه القائم على اللغة. إليك مثال باستخدام [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// استيراد التبعيات والدوال اللازمة
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // دوال وأنواع مساعد من 'intlayer'
import type { FC, PropsWithChildren } from "react"; // أنواع React للمكونات الوظيفية والخصائص
import { IntlayerProvider } from "react-intlayer"; // مزود لسياق التوطين
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات التوجيه لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * مكون يدير التوطين ويغلف الأطفال بسياق اللغة المناسب.
 * يدير الكشف والتحقق من اللغة المعتمدة على عنوان URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams<{ locale: Locales }>(); // استخراج معلمة اللغة من عنوان URL

  // تحديد اللغة الحالية، مع الرجوع إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب أن تكون اللغة الافتراضية دائمًا مضافة
   */
  if (middleware.prefixDefault) {
    // التحقق من اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع تحديث المسار
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال مدخل السجل الحالي بالمدخل الجديد
        />
      );
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا تُضاف اللغة الافتراضية كبادئة.
     * التأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون توجيه يقيم مسارات محددة حسب اللغة.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المخصصة للغة.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (مثل، /ar/، /fr/) ومطابقة جميع المسارات اللاحقة
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يغلف الأطفال بإدارة اللغة
      />

      {
        // إذا كانت إضافة بادئة للغة الافتراضية غير مفعلة، قم بعرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يغلف الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// استيراد التبعيات والدوال اللازمة
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // دوال وأنواع مساعد من 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // مزود لسياق التوطين
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات التوجيه لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * مكون يدير التوطين ويغلف الأطفال بسياق اللغة المناسب.
 * يدير الكشف والتحقق من اللغة المعتمدة على عنوان URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams(); // استخراج معلمة اللغة من عنوان URL

  // تحديد اللغة الحالية، مع الرجوع إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب أن تكون اللغة الافتراضية دائمًا مضافة
   */
  if (middleware.prefixDefault) {
    // التحقق من اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع تحديث المسار
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال مدخل السجل الحالي بالمدخل الجديد
        />
      );
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا تُضاف اللغة الافتراضية كبادئة.
     * التأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون توجيه يقيم مسارات محددة حسب اللغة.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المخصصة للغة.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (مثل، /ar/، /fr/) ومطابقة جميع المسارات اللاحقة
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يغلف الأطفال بإدارة اللغة
      />

      {
        // إذا كانت إضافة بادئة للغة الافتراضية غير مفعلة، قم بعرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يغلف الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// استيراد التبعيات والدوال اللازمة
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // دوال وأنواع مساعد من 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // مزود لسياق التوطين
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // مكونات التوجيه لإدارة التنقل

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * مكون يدير التوطين ويغلف الأطفال بسياق اللغة المناسب.
 * يدير الكشف والتحقق من اللغة المعتمدة على عنوان URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams(); // استخراج معلمة اللغة من عنوان URL

  // تحديد اللغة الحالية، مع الرجوع إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب أن تكون اللغة الافتراضية دائمًا مضافة
   */
  if (middleware.prefixDefault) {
    // التحقق من اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع تحديث المسار
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال مدخل السجل الحالي بالمدخل الجديد
        />
      );
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault خاطئة، لا تُضاف اللغة الافتراضية كبادئة.
     * التأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // التحقق مما إذا كانت اللغة الحالية في قائمة اللغات الصالحة
    ) {
      // إعادة التوجيه إلى المسار بدون بادئة اللغة
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * مكون توجيه يقيم مسارات محددة حسب اللغة.
 * يستخدم React Router لإدارة التنقل وعرض المكونات المخصصة للغة.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (مثل، /ar/، /fr/) ومطابقة جميع المسارات اللاحقة
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يغلف الأطفال بإدارة اللغة
      />

      {
        // إذا كانت إضافة بادئة للغة الافتراضية غير مفعلة، قم بعرض الأطفال مباشرة في المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يغلف الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (اختياري) الخطوة 8: تغيير عنوان URL عندما تتغير اللغة

لتغيير عنوان URL عندما تتغير اللغة، يمكنك استخدام خاصية `onLocaleChange` المقدمة من hook `useLocale`. بالتوازي، يمكنك استخدام hooks `useLocation` و `useNavigate` من `react-router-dom` لتحديث مسار URL.

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
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /ar/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // بناء عنوان URL مع اللغة المحدثة
    // مثال: /fr/about مع تعيين اللغة إلى الفرنسية
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // تحديث مسار عنوان URL
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
              {/* اللغة في لغتها الخاصة - مثل. العربية */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل. العربية مع تعيين اللغة الحالية إلى Locales.ARABIC */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - مثل. العربية */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة في لغتها الخاصة - مثل. AR */}
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
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /ar/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // بناء عنوان URL مع اللغة المحدثة
    // مثال: /fr/about مع تعيين اللغة إلى الفرنسية
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // تحديث مسار عنوان URL
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
              {/* اللغة في لغتها الخاصة - مثل. العربية */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل. العربية مع تعيين اللغة الحالية إلى Locales.ARABIC */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - مثل. العربية */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة في لغتها الخاصة - مثل. AR */}
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
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /ar/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // بناء عنوان URL مع اللغة المحدثة
    // مثال: /fr/about مع تعيين اللغة إلى الفرنسية
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // تحديث مسار عنوان URL
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
              {/* اللغة في لغتها الخاصة - مثل. العربية */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل. العربية مع تعيين اللغة الحالية إلى Locales.ARABIC */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - مثل. العربية */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* اللغة في لغتها الخاصة - مثل. AR */}
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

يستخدم Intlayer تعزيز الوحدات للاستفادة من TypeScript وجعل قاعدة الشيفرة لديك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript لديك يتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... إعدادات TypeScript الحالية لديك
  "include": [
    // ... إعدادات TypeScript الحالية لديك
    "types", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

من المستحسن تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب دفعها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## What is Intlayer?

**Intlayer** هو مكتبة مبتكرة ومفتوحة المصدر للتدويل (i18n) مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكون.
- **محلية بيانات التعريف والمحتوى ديناميكيًا**، والطرق.
- **ضمان دعم TypeScript** مع الأنواع الذاتية التوليد، مما يحسن من الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من ميزات متقدمة**، مثل الكشف الديناميكي عن اللغة والتبديل بينها.

---

## Step-by-Step Guide to Set Up Intlayer in a Vite and React Application

### Step 1: Install Dependencies

قم بتثبيت الحزم الضرورية باستخدام npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Step 2: Configuration of your project

أنشئ ملف تكوين لتكوين لغات تطبيقك:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ARABIC,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ARABIC,
  },
};

export default config;
```

لرؤية جميع المعلمات المتاحة، يرجى الرجوع إلى [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### Step 3: Integrate Intlayer in Your Vite Configuration

أضف المكون الإضافي Intlayer إلى تكوينك.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Step 4: Declare Your Content

أنشئ وإدارة قواميس المحتوى الخاصة بك:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ar: "شعار Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ar: "شعار React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ar: "عدد هو ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // تذكر أن تستورد React إذا كنت تستخدم عقدة React في محتواك
      ar: (
        <>
          قم بتحرير <code>src/App.tsx</code> واحفظ لاختبار HMR
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
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

> ملاحظة: إذا كان ملف المحتوى الخاص بك يتضمن كود TSX، يجب أن تأخذ في الاعتبار استيراد `import React from "react";` في ملف المحتوى الخاص بك.

[رؤية كيفية إعلان ملفات إعلان Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### Step 5: Utilize Intlayer in Your Code

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
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
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> ملاحظة: إذا كنت تريد استخدام المحتوى الخاص بك في خاصية `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام الدالة `setLocale` التي توفرها الخطاف `useLocale`. تتيح لك هذه الدالة تعيين اللغة الخاصة بالتطبيق وتحديث المحتوى وفقًا لذلك.

```tsx
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

### (Optional) Step 7: Add localized Routing to your application

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. هذا مفيد لتحسين محركات البحث وعناوين URL المناسبة لتحسين محركات البحث.
مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> بشكل افتراضي، لا تكون المسارات مسبوقة للغة الافتراضية. إذا كنت ترغب في وضع بادئة للغة الافتراضية، يمكنك تعيين خيار `middleware.prefixDefault` إلى `true` في تكوينك. راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة التوجيه المحلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` الذي يغلف مسارات تطبيقك ويدير التوجيه القائم على اللغة. إليك مثال باستخدام [React Router](https://reactrouter.com/home):

```tsx
// استيراد الاعتماديات والوظائف الضرورية
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // وظائف وأصناف مساعدة من 'intlayer'
import { FC, PropsWithChildren } from "react"; // أنواع React للمكونات الوظيفية والخصائص
import { IntlayerProvider } from "react-intlayer"; // مزود لسياق التدويل
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
 * مكون يدير التدويل ويغلف الأطفال بسياق اللغة المناسب.
 * يدير الكشف عن اللغة بناءً على URL والتحقق.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams<{ locale: Locales }>(); // استخراج معلمة اللغة من URL

  // تحديد اللغة الحالية، مع التراجع إلى الافتراضي إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لبناء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب أن تكون اللغة الافتراضية دائمًا مسبوقة.
   */
  if (middleware.prefixDefault) {
    // تحقق من اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال الإدخال الحالي في التاريخ بالإدخال الجديد
        />
      );
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما middleware.prefixDefault تكون خاطئة، لا تكون اللغة الافتراضية مسبوقة.
     * تأكد من أن اللغة الحالية صالحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // تحقق مما إذا كانت اللغة الحالية في قائمة اللغات الصالحة
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
 * مكون توجيه يضبط المسارات الخاصة باللغة.
 * يستخدم React Router لإدارة التنقل ورسم المكونات المحلية.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (مثل /ar/, /fr/) ومطابقة جميع المسارات اللاحقة
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يحاط الأطفال بإدارة اللغة
      />

      {
        // إذا كانت عملية وضع بادئة على اللغة الافتراضية معطلة، ارسم الأطفال مباشرة على المسار الجذري
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يحاط الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

بالتوازي، يمكنك أيضًا استخدام `intLayerMiddlewarePlugin` لإضافة توجيه من جانب الخادم إلى تطبيقك. ستكتشف هذه الإضافة اللغة الحالية تلقائيًا بناءً على URL وتعيين ملف تعريف الارتباط للغة المناسب. إذا لم يتم تحديد لغة، ستحدد الإضافة اللغة الأكثر ملاءمة بناءً على تفضيلات لغة متصفح المستخدم. وإذا لم يتم اكتشاف أي لغة، ستُعاد التوجيه إلى اللغة الافتراضية.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Step 8: Change the URL when the locale changes

لتغيير عنوان URL عندما تتغير اللغة، يمكنك استخدام خاصية `onLocaleChange` التي يوفرها الخطاف `useLocale`. بالتوازي، يمكنك استخدام الخطافات `useLocation` و `useNavigate` من `react-router-dom` لتحديث مسار URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // بناء عنوان URL مع اللغة المحدثة
    // مثال: /es/about مع تعيين اللغة إلى الإسبانية
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // تحديث مسار URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.Arabic)}>
      تغيير اللغة إلى العربية
    </button>
  );
};
```

### Configure TypeScript

تستخدم Intlayer تحسين الوحدة للاستفادة من TypeScript وجعل قاعدة التعليمات البرمجية الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع الذاتية التوليد.

```json5
// tsconfig.json

{
  // إعداداتك المخصصة
  "include": [
    "src",
    "types", // <- تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### Git Configuration

من المستحسن تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك هذا تجنب إدخالها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

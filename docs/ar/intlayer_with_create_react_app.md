# البدء في الدولنة (i18n) باستخدام Intlayer و React Create App

## ما هو Intlayer؟

**Intlayer** هي مكتبة مبتكرة ومفتوحة المصدر للدولنة (i18n) مصممة لتبسيط دعم تعدد اللغات في تطبيقات الويب الحديثة.

باستخدام Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **تخصيص بيانات التعريف**، والمسارات، والمحتوى ديناميكيًا.
- **ضمان دعم TypeScript** مع أنواع مولدة تلقائيًا، مما يحسن من إكمال التعليمات البرمجية واكتشاف الأخطاء.
- **الاستفادة من ميزات متقدمة**، مثل الكشف عن اللغة الديناميكي والتبديل بينها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق React

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتحديد لغات تطبيقك:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ARABIC,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغات أخرى
    ],
    defaultLocale: Locales.ARABIC,
  },
};

export default config;
```

لرؤية جميع المعلمات المتاحة، راجع [وثائق التكوين هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين CRA الخاص بك

قم بتغيير النصوص البرمجية الخاصة بك لاستخدام react-intlayer

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

ملاحظة: تعتمد نصوص react-intlayer على craco. يمكنك أيضًا تنفيذ إعدادك الخاص بناءً على مكون intlayer craco. [انظر المثال هنا](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### الخطوة 4: إعلان محتواك

قم بإنشاء وإدارة قواميس المحتوى الخاصة بك:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
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
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

[انظر كيفية إعلان ملفات إعلان Intlayer الخاصة بك](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md).

### الخطوة 5: استخدام Intlayer في الكود الخاص بك

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* لاستخدام hook useIntlayer بشكل صحيح، يجب عليك الوصول إلى بياناتك في مكون فرعي */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> ملاحظة: إذا كنت ترغب في استخدام المحتوى الخاص بك في سمة `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام الدالة `setLocale` المقدمة بواسطة hook `useLocale`. تتيح لك هذه الدالة تعيين لغة التطبيق وتحديث المحتوى وفقًا لذلك.

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

### (اختياري) الخطوة 7: إضافة توجيه محلي إلى تطبيقك

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. هذا مفيد من الناحية SEO وURLs الصديقة لـSEO.
مثال:

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> بشكل افتراضي، لا يتم إضافة بادئة إلى المسارات للغة الافتراضية. إذا كنت ترغب في إضافة بادئة للغة الافتراضية، يمكنك تعيين خيار `middleware.prefixDefault` إلى `true` في تكوينك. انظر [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة توجيه محلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` يلتف حول مسارات تطبيقك ويتعامل مع التوجيه القائم على اللغة. إليك مثال باستخدام [React Router](https://reactrouter.com/home):

```tsx
// استيراد التبعيات والدوال اللازمة
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // دوال ومكونات من 'intlayer'
import { FC, PropsWithChildren } from "react"; // أنواع React لمكونات الوظائف والخصائص
import { IntlayerProvider } from "react-intlayer"; // مزود لسياق الدولنة
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // مكونات التوجيه لإدارة الملاحة

// تفكيك التكوين من Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * مكون يتعامل مع الدولنة ويلف الأطفال في سياق اللغة المناسب.
 * يدير الكشف عن اللغة المستند إلى URL والتحقق منها.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // الحصول على مسار URL الحالي
  const { locale } = useParams<{ locale: Locales }>(); // استخراج معلمة اللغة من URL

  // تحديد اللغة الحالية، مع التراجع إلى الافتراضية إذا لم يتم تقديمها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لإنشاء مسار أساسي
  const pathWithoutLocale = removeLocaleFromUrl(
    path // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault صحيحة، يجب دائمًا إضافة بادئة للغة الافتراضية.
   */
  if (middleware.prefixDefault) {
    // التحقق من صحة اللغة
    if (!locale || !locales.includes(locale)) {
      // إعادة التوجيه إلى اللغة الافتراضية مع المسار المحدث
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // استبدال الإدخال الحالي في السجل بإدخال جديد
        />
      );
    }

    // لف الأطفال بمزود Intlayer وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault غير صحيحة، لا تتم إضافة بادئة للغة الافتراضية.
     * تأكد من أن اللغة الحالية صحيحة وليست اللغة الافتراضية.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // استبعاد اللغة الافتراضية
        )
        .includes(currentLocale) // تحقق مما إذا كانت اللغة الحالية ضمن قائمة اللغات الصحيحة
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
 * مكون توجيه يقوم بإعداد مسارات محددة بلغات معينة.
 * يستخدم React Router لإدارة الملاحة وعرض المكونات المترجمة.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // نمط المسار لالتقاط اللغة (على سبيل المثال، /ar/، /fr/) ومطابقة جميع المسارات التالية
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // يلف الأطفال بإدارة اللغة
      />

      {
        // إذا كانت إضافة بادئة للغة الافتراضية معطلة، قم بعرض الأطفال مباشرة على المسار الجذر
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // يلف الأطفال بإدارة اللغة
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (اختياري) الخطوة 8: تغيير URL عند تغيير اللغة

لتغيير URL عند تغيير اللغة، يمكنك استخدام خاصية `onLocaleChange` المقدمة من hook `useLocale`. بالتوازي، يمكنك استخدام `useLocation` و `useNavigate` hooks من `react-router-dom` لتحديث مسار URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // الحصول على مسار URL الحالي. مثال: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // بناء URL مع اللغة المحدثة
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

### تكوين TypeScript

تستخدم Intlayer تحسين وحدات لتوفير مزايا TypeScript وجعل قاعدة التعليمات البرمجية الخاصة بك أقوى.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5
// tsconfig.json

{
  // تكوين مخصص خاص بك
  include: [
    "src",
    "types", // <- تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات المولدة بواسطة Intlayer. يتيح لك ذلك تجنب الالتزام بها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```gitignore
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

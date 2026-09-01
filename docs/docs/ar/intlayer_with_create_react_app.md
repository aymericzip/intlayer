---
createdAt: 2024-08-11
updatedAt: 2026-05-31
title: "تدويل Create React App - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Create React App متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - توثيق
  - Intlayer
  - Create React App
  - CRA
  - جافا سكريبت
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بدء التاريخ"
author: aymericzip
---

# ترجم Create React App باستخدام Intlayer | التدويل (i18n)

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-cra-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عرض توضيحي CodeSandbox - كيفية دولية تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

انظر [Application Template](https://github.com/aymericzip/intlayer-react-cra-template) على GitHub.

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

<AccordionGroup>
<Accordion header="تغطية React كاملة">

Intlayer مُحسَّن للعمل بشكل مثالي مع React من خلال توفير **نطاق محتوى على مستوى المكون**، و**الترجمات المحملة بطريقة كسولة**، وجميع الميزات المطلوبة لتوسيع التدويل (i18n).

</Accordion>

<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة في صفحاتك، حمّل فقط المحتوى الضروري. يساعدك Intlayer على **تقليل حجم الحزم وأحجام الصفحات بنسبة تصل إلى 50%**.

</Accordion>

<Accordion header="الصيانة">

- **إدارة الترجمات بسهولة** باستخدام قواميس تصريحية على مستوى المكونات.
- **توطين البيانات الوصفية والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع الأنواع المولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل اكتشاف اللغة الديناميكي والتبديل.

</Accordion>

<Accordion header="وكيل الذكاء الاصطناعي">

يقلل تجميع المحتوى **السياق المطلوب** من نماذج اللغة الكبيرة (LLMs). يأتي Intlayer أيضًا مع مجموعة من الأدوات، مثل **CLI** للتحقق من الترجمات المفقودة، **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**، و**[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة حتى للوكلاء الذين يعتمدون على الذكاء الاصطناعي.

</Accordion>

<Accordion header="الأتمتة">

استخدم الأتمتة لترجمة في خط أنابيب CI/CD الخاص بك باستخدام نموذج اللغة من اختيارك بتكلفة من موفر AI الخاص بك. يوفر Intlayer أيضًا **مُترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) لمساعدتك في **الترجمة في الخلفية**.

</Accordion>

<Accordion header="الأداء">

قد يؤدي ربط ملفات JSON الضخمة بالمكونات إلى مشاكل في الأداء والاستجابة. يحسّن Intlayer تحميل المحتوى الخاص بك في وقت البناء.

</Accordion>

<Accordion header="التوسع مع non-dev">

أكثر من مجرد حل i18n، يوفر Intlayer **[محرر بصري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) مستضاف ذاتيًا** و**[نظام CMS كامل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)** لمساعدتك في إدارة محتواك متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين والمحررين وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

</Accordion>
</AccordionGroup>

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق React

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت الحزم الضرورية باستخدام npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> علامة `--interactive` اختيارية. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

> سيقوم هذا الأمر باكتشاف بيئتك وتثبيت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، الترجمة، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **react-intlayer**

  الحزمة التي تدمج Intlayer مع تطبيق React. توفر موفري السياق وخطافات لتدويل React.

- **react-scripts-intlayer**

تتضمن أوامر ومكونات `react-scripts-intlayer` لتكامل Intlayer مع تطبيق يعتمد على Create React App. تعتمد هذه المكونات على [craco](https://craco.js.org/) وتتضمن تكوينًا إضافيًا لمجمع [Webpack](https://webpack.js.org/).

</Step>

<Step number={2} title="تكوين مشروعك">

قم بإنشاء ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المحلية، إعادة التوجيه عبر الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="دمج Intlayer في تكوين CRA الخاص بك">

قم بتغيير السكربتات لاستخدام react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> تعتمد سكربتات `react-scripts-intlayer` على [CRACO](https://craco.js.org/). يمكنك أيضًا تنفيذ إعدادك الخاص بناءً على مكون intlayer craco. [انظر المثال هنا](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

</Step>

<Step number={4} title="إعلان المحتوى الخاص بك">

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

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
        ar: "تعلم React",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تطابق امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

> إذا كان ملف المحتوى الخاص بك يتضمن كود TSX، يجب أن تفكر في استيراد `import React from "react";` في ملف المحتوى الخاص بك.

</Step>

<Step number={5} title="استخدام Intlayer في الكود الخاص بك">

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

> ملاحظة: إذا كنت ترغب في استخدام المحتوى الخاص بك في سمة `string`، مثل `alt`، `title`، `href`، `aria-label`، وما إلى ذلك، يجب عليك استدعاء قيمة الوظيفة، مثل:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```
>
> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

> لمعرفة المزيد حول hook `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={6} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

لتغيير لغة المحتوى الخاص بك، يمكنك استخدام وظيفة `setLocale` المقدمة من الخطاف `useLocale`. تتيح لك هذه الوظيفة تعيين اللغة للتطبيق وتحديث المحتوى وفقًا لذلك.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> لمعرفة المزيد عن الخطاف `useLocale`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="إضافة التوجيه المحلي إلى تطبيقك" isOptional={true}>

الغرض من هذه الخطوة هو إنشاء مسارات فريدة لكل لغة. هذا مفيد لتحسين محركات البحث (SEO) وعناوين URL الصديقة لمحركات البحث.
مثال:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> بشكل افتراضي، لا يتم تفضيل المسارات للغة الافتراضية. إذا كنت ترغب في تفضيل اللغة الافتراضية، يمكنك تعيين الخيار `middleware.prefixDefault` إلى `true` في التكوين الخاص بك. راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) لمزيد من المعلومات.

لإضافة التوجيه المحلي إلى تطبيقك، يمكنك إنشاء مكون `LocaleRouter` الذي يلتف حول مسارات التطبيق الخاصة بك ويتعامل مع التوجيه المستند إلى اللغة. فيما يلي مثال باستخدام [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// استيراد التبعيات والوظائف اللازمة
tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// استيراد التبعيات والوظائف اللازمة
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // وظائف وأدوات من 'intlayer'
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
 * يدير الكشف عن اللغة المستندة إلى عنوان URL والتحقق من صحتها.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // الحصول على مسار URL الحالي

  // تحديد اللغة الحالية، مع الرجوع إلى اللغة الافتراضية إذا لم يتم توفيرها
  const currentLocale = locale ?? defaultLocale;

  // إزالة بادئة اللغة من المسار لإنشاء مسار أساسي
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // مسار URL الحالي
  );

  /**
   * إذا كانت middleware.prefixDefault تساوي true، يجب دائمًا تفضيل اللغة الافتراضية.
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

    // التفاف الأطفال مع IntlayerProvider وتعيين اللغة الحالية
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * عندما تكون middleware.prefixDefault تساوي false، لا يتم تفضيل اللغة الافتراضية.
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
 * مكون التوجيه الذي يقوم بإعداد المسارات الخاصة باللغة.
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
            // نمط المسار لالتقاط اللغة (مثل /en/، /fr/) ومطابقة جميع المسارات اللاحقة
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // يلتف حول الأطفال مع إدارة اللغة
          />
        ))}

      {
        // إذا تم تعطيل تفضيل اللغة الافتراضية، قم بعرض الأطفال مباشرة في المسار الجذر
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

ثم يمكنك استخدام مكون `LocaleRouter` في تطبيقك:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... مكون AppContent الخاص بك

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

</Step>

<Step number={8} title="تغيير عنوان URL عند تغيير اللغة" isOptional={true}>

لتغيير عنوان URL عند تغيير اللغة، يمكنك استخدام الخاصية `onLocaleChange` التي يوفرها الخطاف `useLocale`. وبالتوازي، يمكنك استخدام الخطافين `useLocation` و `useNavigate` من مكتبة `react-router-dom` لتحديث مسار URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
      // إنشاء عنوان URL مع اللغة المحلية المحدثة
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
              {/* اللغة المحلية - مثال: FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة في لغتها المحلية - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة في اللغة الحالية - مثال: Francés مع اللغة الحالية المحددة إلى Locales.SPANISH */}
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
>
> - [خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
> - [خطاف `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)
> - [خطاف `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [خطاف `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="تغيير سمات اللغة والاتجاه في HTML" isOptional={true}>

عندما يدعم تطبيقك لغات متعددة، من الضروري تحديث سمات `lang` و`dir` في علامة `<html>` لتتوافق مع اللغة المحلية الحالية. يضمن ذلك:

- **إمكانية الوصول**: تعتمد قارئات الشاشة والتقنيات المساعدة على السمة الصحيحة `lang` لنطق وتفسير المحتوى بدقة.
- **عرض النص**: تضمن خاصية `dir` (الاتجاه) عرض النص بالترتيب الصحيح (مثلًا من اليسار إلى اليمين للإنجليزية، ومن اليمين إلى اليسار للعربية أو العبرية)، وهو أمر ضروري لسهولة القراءة.
- **تحسين محركات البحث (SEO)**: تستخدم محركات البحث خاصية `lang` لتحديد لغة الصفحة، مما يساعد في تقديم المحتوى المحلي المناسب في نتائج البحث.

من خلال تحديث هذه السمات ديناميكيًا عند تغيير اللغة المحلية، تضمن تجربة متسقة وسهلة الوصول للمستخدمين عبر جميع اللغات المدعومة.

#### تنفيذ الخطاف

قم بإنشاء خطاف مخصص لإدارة سمات HTML. يستمع الخطاف لتغييرات اللغة ويقوم بتحديث السمات وفقًا لذلك:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react.intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * يقوم بتحديث سمات `lang` و `dir` لعنصر HTML <html> بناءً على اللغة الحالية.
 * - `lang`: يُعلم المتصفحات ومحركات البحث بلغة الصفحة.
 * - `dir`: يضمن ترتيب القراءة الصحيح (مثل 'ltr' للإنجليزية، 'rtl' للعربية).
 *
 * هذا التحديث الديناميكي ضروري لعرض النصوص بشكل صحيح، وسهولة الوصول، وتحسين محركات البحث.
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

#### استخدام الخطاف في تطبيقك

قم بدمج الخطاف في المكون الرئيسي الخاص بك بحيث يتم تحديث سمات HTML كلما تغيرت اللغة:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // تطبيق الخطاف لتحديث سمات lang و dir لعلامة <html> بناءً على اللغة.
  useI18nHTMLAttributes();

  // ... بقية المكون الخاص بك
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

من خلال تطبيق هذه التغييرات، سيقوم تطبيقك بـ:

- ضمان أن تعكس سمة **اللغة** (`lang`) اللغة الحالية بشكل صحيح، وهو أمر مهم لتحسين محركات البحث وسلوك المتصفح.
- ضبط **اتجاه النص** (`dir`) وفقًا للغة، مما يعزز قابلية القراءة وسهولة الاستخدام للغات ذات اتجاهات قراءة مختلفة.
- توفير تجربة أكثر **وصولًا**، حيث تعتمد تقنيات المساعدة على هذه السمات لتعمل بشكل مثالي.
  </Step>

</Steps>

### إعداد TypeScript

يستخدم Intlayer توسيع الوحدة للاستفادة من TypeScript وجعل قاعدة الكود الخاصة بك أقوى.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن إعدادات TypeScript الخاصة بك تتضمن الأنواع التي يتم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... إعدادات TypeScript الحالية الخاصة بك
  "include": [
    // ... إعدادات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي يتم إنشاؤها تلقائيًا
  ],
}
```

### إعداد Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **Intlayer VS Code Extension** الرسمي.

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.
[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** في الترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

### التوسع أكثر

للتوسع أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل مشروع Create React App؟">

- **`react-i18next` / `i18next`**: فضاءات أسماء JSON في وقت التشغيل.
- **`react-intl`** و **`Lingui`**: حلول معتمدة على ICU.
- **`Intlayer`**: ترجمة وقت البناء عبر `react-scripts-intlayer`، أنواع TypeScript صارمة، ترجمة بالذكاء الاصطناعي، ومحرر مرئي.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة React لدي؟">

أقل بكثير من الحلول القائمة على فضاءات الأسماء، لأن الصفحة لا تُحمل أبدًا كتالوجًا لا تعرضه. يستبدل مترجم وقت البناء استدعاءات `useIntlayer` بإدخالات القاموس الدقيقة التي يستخدمها المكون، وتفصل [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) الباقي حسب اللغة، مما يقلل الحزمة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يمكنني الترحيل من react-i18next أو react-intl دون إعادة كتابة المكونات؟">

نعم، اتبع أدلة الترحيل أو استخدم محولات التوافق.

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفاتك، ويسحب السلاسل النصية الموجهة للمستخدم، ويكتب ملف `.content` بجانب كل منها، حتى تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا.

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء: يمسح الكود عند كل تغيير، وينشئ القواميس ويزامنها مع HMR.

هناك حدان يجدر معرفتهما قبل تشغيل المترجم. إنه يعمل عن طريق التحليل الثابت، وبالتالي فإن السلاسل التي تظهر فقط في وقت التشغيل، مثل رموز أخطاء API أو حقول نظام إدارة المحتوى، تظل بعيدة عن متناوله. كما يتعين عليه التمييز بين النصوص الموجهة للمستخدم ومنطق التطبيق مثل `className="active"` أو رمز الحالة، الأمر الذي يتطلب بعض الملاحظات التوضيحية في قاعدة التعليمات البرمجية الكبيرة. يتجنب [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) كلا الأمرين من خلال إبقائك متحكمًا في العملية.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="لم يعد Create React App مدعومًا. هل يجب أن أنتقل إلى Vite أولاً؟">

إذا كان الترحيل مخططًا له بالفعل، فافعل ذلك أولاً واتبع [دليل Vite و React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md). إذا لم يكن الأمر كذلك، فإن هذا الدليل يعمل بثبات وإعلانات المحتوى لا تتغير بين الإعدادات.

</Question>

<Question title="كيف أقوم بإعداد التوجيه المترجم في Create React App؟">

بالنسبة إلى React Router، راجع [دليل React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react_router_v7.md). بالنسبة للتطبيقات التي لا تحتوي على موجه، اضبط `routing.mode` على `"no-prefix"` أو `"search-params"`.

</Question>

<Question title="كيف أدير البيانات الوصفية لـ SEO في تطبيق React من جانب العميل؟">

اضبط سمتي `lang` و `dir` على عنصر `html` وانشر روابط `hreflang` باستخدام `getMultilingualUrls`.

</Question>

<Question title="كيف أدعم اللغات التي تكتب من اليمين إلى اليسار مثل العربية أو العبرية؟">

تُرجع الدالة `getHTMLTextDir` القيمة `ltr` أو `rtl` أو `auto` لأي لغة معينة، مما يتيح لك ربط `lang` و `dir` على العنصر الجذري من اللغة النشطة وترك خصائص CSS المنطقية تتعامل مع الباقي.

</Question>

<Question title="كيف أترجم التطبيق تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. يملأ هذا الأمر الترجمات المفقودة باستخدام نموذج اللغة الذي تختاره مع مزودك ومفتاح API الخاص بك، ويحد `--git-diff` العملية على الملفات المعدلة. انظر [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

</Question>

<Question title="هل يدعم Intlayer صيغ الجمع والجنس والنصوص المنسقة؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، [المحتوى القائم على النوع الاجتماعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)، [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)، والمنسقات للأرقام والتواريخ والعملات.

</Question>

<Question title="كيف يمكن للمترجمين تحرير المحتوى دون لمس الكود؟">

من خلال [المحرر المرئي (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، الذي يسمح لأي شخص بتحرير النصوص مباشرة على التطبيق قيد التشغيل، أو عبر [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، الذي يفصل المحتوى ليتم تحديثه دون الحاجة لإعادة نشر الكود.

</Question>

<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي المستضاف هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>

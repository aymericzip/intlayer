---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: البدء مع Intlayer في React Router v7
description: تعلّم كيفية إضافة التدويل (i18n) إلى تطبيق React Router v7 الخاص بك باستخدام Intlayer. اتبع هذا الدليل الشامل لجعل تطبيقك متعدد اللغات مع توجيه واعٍ للغة.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - توجيه اللغة
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# البدء في التدويل (i18n) مع Intlayer و React Router v7

يوضح هذا الدليل كيفية دمج **Intlayer** لتوفير تدويل سلس في مشاريع React Router v7 مع توجيه واعٍ للغة، ودعم TypeScript، وممارسات تطوير حديثة.

## ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم تعدد اللغات في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** من خلال أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة والتبديل بينها.
- **تمكين التوجيه الواعي للغة** باستخدام نظام التوجيه المعتمد على التكوين في React Router v7.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق React Router v7

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر موفري السياق (context providers) وخطافات (hooks) للتدويل في React.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه عناوين URL.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // دائمًا أضف بادئة اللغة الافتراضية في عناوين URL
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: تكوين مسارات React Router v7

قم بإعداد تكوين التوجيه الخاص بك مع مسارات مدركة للغة:

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // الصفحة الجذرية - يعيد التوجيه إلى اللغة
    route("/:lang", "routes/[lang]/page.tsx"), // الصفحة الرئيسية المحلية
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // صفحة حول المحلية
  ]),
] satisfies RouteConfig;
```

### الخطوة 4: دمج Intlayer في تكوين Vite الخاص بك

أضف مكون intlayer الإضافي إلى تكوينك:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddleware, intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerMiddleware()],
});
```

> يتم استخدام مكون Vite الإضافي `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يعرّف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر ألقابًا لتحسين الأداء.

### الخطوة 5: إنشاء مكونات التخطيط

قم بإعداد تخطيط الجذر والتخطيطات الخاصة باللغات:

#### تخطيط الجذر

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### الخطوة 6: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "React Router v7 ve Intlayer kullanarak kolayca çok dilli uygulamalar geliştirin.",
    }),
    aboutLink: t({
      en: "تعرف علينا",
      tr: "Hakkımızda Öğrenin",
    }),
    homeLink: t({
      en: "الرئيسية",
      tr: "Ana Sayfa",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./app`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

### الخطوة 7: إنشاء مكونات مدركة للغة

قم بإنشاء مكون `LocalizedLink` للتنقل المدرك للغة:

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  // دالة للتحقق مما إذا كان الرابط خارجيًا
  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### الخطوة 8: استخدام Intlayer في صفحاتك

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

#### صفحة إعادة التوجيه الجذرية

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### الصفحة الرئيسية المترجمة

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

### الخطوة 9: إنشاء مكون لتبديل اللغة

قم بإنشاء مكون يسمح للمستخدمين بتغيير اللغة:

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">اختر اللغة: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> لمعرفة المزيد عن الخطاف `useLocale`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

### الخطوة 10: إضافة إدارة خصائص HTML (اختياري)

أنشئ خطافًا لإدارة خصائص lang و dir في HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

tsx;
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

ثم استخدمها في مكون الجذر الخاص بك:

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // استيراد الـ hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // استدعاء الـ hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### الخطوة 11: بناء وتشغيل تطبيقك

قم ببناء قواميس المحتوى وتشغيل تطبيقك:

```bash packageManager="npm"
# بناء قواميس Intlayer
npm run intlayer:build

# بدء خادم التطوير
npm run dev
```

```bash packageManager="pnpm"
# بناء قواميس Intlayer
pnpm intlayer:build

# بدء خادم التطوير
pnpm dev
```

```bash packageManager="yarn"
# بناء قواميس Intlayer
yarn intlayer:build

# بدء خادم التطوير
yarn dev
```

### الخطوة 12: تكوين TypeScript (اختياري)

يستخدم Intlayer تعزيز الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

تأكد من أن تكوين TypeScript الخاص بك يشمل الأنواع التي تم إنشاؤها تلقائيًا:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... تكوينات TypeScript الحالية الخاصة بك
  },
  include: [
    // ... تكوينات الإدراج الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

---

## النشر في بيئة الإنتاج

عند نشر تطبيقك:

1. **قم ببناء تطبيقك:**

   ```bash
   npm run build
   ```

2. **قم ببناء قواميس Intlayer:**

   ```bash
   npm run intlayer:build
   ```

3. **نقل `vite-intlayer` إلى التبعيات** إذا كنت تستخدم الوسيط (middleware) في الإنتاج:
   ```bash
   npm install vite-intlayer --save
   ```

سيدعم تطبيقك الآن:

- **هيكلية عناوين URL**: `/en`، `/en/about`، `/tr`، `/tr/about`
- **الكشف التلقائي عن اللغة** بناءً على تفضيلات المتصفح
- **التوجيه المدرك للغة** باستخدام React Router v7
- **دعم TypeScript** مع أنواع مولدة تلقائيًا
- **التصيير على جانب الخادم** مع التعامل الصحيح مع اللغة

## إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمة وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

## التقدم أكثر

للتقدم أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق React Router v7](https://reactrouter.com/)
- [هوك useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)
- [خطاف useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)
- [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

يوفر هذا الدليل الشامل كل ما تحتاجه لدمج Intlayer مع React Router v7 لتطبيق دولي بالكامل مع توجيه مدرك للغة ودعم TypeScript.

## تاريخ الوثيقة

| الإصدار | التاريخ   | التغييرات               |
| ------- | --------- | ----------------------- |
| 5.8.2   | 2025-09-4 | أضيف لـ React Router v7 |

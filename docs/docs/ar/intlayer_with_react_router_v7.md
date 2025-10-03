---
createdAt: 2025-09-04
updatedAt: 2025-10-03
title: البدء مع Intlayer في React Router v7
description: تعلّم كيفية إضافة التدويل (i18n) إلى تطبيق React Router v7 الخاص بك باستخدام Intlayer. اتبع هذا الدليل الشامل لجعل تطبيقك متعدد اللغات مع توجيه يدعم اللغة المحلية.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - توجيه اللغة المحلية
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
---

# البدء بالتدويل (i18n) مع Intlayer و React Router v7

يوضح هذا الدليل كيفية دمج **Intlayer** لتحقيق التدويل السلس في مشاريع React Router v7 مع توجيه يدعم اللغة المحلية، ودعم TypeScript، وممارسات تطوير حديثة.

## ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم تعدد اللغات في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تعبيرية على مستوى المكونات.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** مع أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة المحلية والتبديل بينها.
- **تمكين التوجيه المدرك للغة المحلية** باستخدام نظام التوجيه القائم على التكوين في React Router v7.

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
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر موفري السياق وخطافات للتدويل في React.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط للكشف عن اللغة المفضلة للمستخدم، وإدارة الكوكيز، والتعامل مع إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // اللغة الافتراضية
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // اللغات المدعومة
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // اللغة الافتراضية
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // اللغات المدعومة
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // اللغة الافتراضية
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // اللغات المدعومة
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف مكون intlayer الإضافي إلى تكوينك:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> يتم استخدام مكون Vite الإضافي `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

### الخطوة 4: تكوين مسارات React Router v7

قم بإعداد تكوين التوجيه الخاص بك مع مسارات مدركة للغة:

```typescript fileName="app/routes.ts"
typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:lang?", "routes/page.tsx"), // الصفحة الرئيسية المحلية
    route("/:lang?/about", "routes/about/page.tsx"), // صفحة حول المحلية
  ]),
] satisfies RouteConfig;
```

### الخطوة 5: إنشاء مكونات التخطيط

قم بإعداد التخطيط الجذري والتخطيطات الخاصة باللغة:

#### التخطيط الجذري

```tsx fileName="app/routes/layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### الخطوة 6: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "تعرف علينا",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "الرئيسية",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./app`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

### الخطوة 7: إنشاء مكونات تدرك اللغة

قم بإنشاء مكون `LocalizedLink` للتنقل المدرك للغة:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// دالة لتحويل الرابط إلى رابط محلي بناءً على اللغة
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// مكون رابط محلي يدعم التنقل حسب اللغة
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

في حال رغبت في التنقل إلى المسارات المحلية، يمكنك استخدام الخطاف `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### الخطوة 8: استخدام Intlayer في صفحاتك

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

#### الصفحة الرئيسية المترجمة

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

### الخطوة 9: إنشاء مكون لتبديل اللغة

قم بإنشاء مكون يسمح للمستخدمين بتغيير اللغات:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { setLocaleCookie, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocaleCookie(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* اللغة - على سبيل المثال FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها الخاصة - على سبيل المثال Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - على سبيل المثال Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> لمعرفة المزيد عن الخطاف `useLocale`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

### الخطوة 10: إضافة إدارة سمات HTML (اختياري)

أنشئ خطافًا لإدارة سمات lang و dir في HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

ثم استخدمه في مكون الجذر الخاص بك:

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // استيراد الخطاف

export default function RootLayout() {
  useI18nHTMLAttributes(); // استدعاء الخطاف

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### الخطوة 11: إضافة الوسيط (اختياري)

يمكنك أيضًا استخدام `intlayerMiddleware` لإضافة التوجيه من جانب الخادم إلى تطبيقك. سيقوم هذا المكون الإضافي بالكشف تلقائيًا عن اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط المناسب للغة. إذا لم يتم تحديد لغة، فسيحدد المكون الإضافي اللغة الأنسب بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم الكشف عن أي لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

> لاحظ أنه لاستخدام `intlayerMiddleware` في بيئة الإنتاج، تحتاج إلى نقل حزمة `vite-intlayer` من `devDependencies` إلى `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

---

## تكوين TypeScript

يستخدم Intlayer توسيع الوحدات (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا:

```json5 fileName="tsconfig.json"
{
  // ... التكوينات الحالية الخاصة بك
  include: [
    // ... الملفات المضمنة الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

---

## تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

---

## إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

## التقدم أكثر

للمضي قدمًا، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق React Router v7](https://reactrouter.com/)
- [هوك useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)
- [هوك useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)
- [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

يوفر هذا الدليل الشامل كل ما تحتاجه لدمج Intlayer مع React Router v7 لتطبيق دولي بالكامل مع توجيه مدرك للغة ودعم TypeScript.

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات                |
| ------- | ---------- | ------------------------ |
| 6.1.5   | 2025-10-03 | تحديث الوثيقة            |
| 5.8.2   | 2025-09-04 | أضيف دعم React Router v7 |

---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: البدء مع Intlayer في Tanstack Start
description: تعلّم كيفية إضافة التدويل (i18n) إلى تطبيق Tanstack Start الخاص بك باستخدام Intlayer. اتبع هذا الدليل الشامل لجعل تطبيقك متعدد اللغات مع توجيه واعٍ للغة.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - توجيه اللغة
slugs:
  - doc
  - environment
  - vite-and-react
  - tanstack-start
applicationTemplate: https://github.com/AydinTheFirst/tanstack-start-intlayer
author: AydinTheFirst
---

# البدء في التدويل (i18n) باستخدام Intlayer و Tanstack Start

يوضح هذا الدليل كيفية دمج **Intlayer** لتحقيق تدويل سلس في مشاريع Tanstack Start مع توجيه واعٍ للغة، ودعم TypeScript، وممارسات تطوير حديثة.

## ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** من خلال أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة والتبديل بينها.
- **تمكين التوجيه الواعي للغة** باستخدام نظام التوجيه المعتمد على الملفات في Tanstack Start.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Tanstack Start

### الخطوة 1: إنشاء المشروع

ابدأ بإنشاء مشروع TanStack Start جديد باتباع دليل [بدء مشروع جديد](https://tanstack.com/start/latest/docs/framework/react/quick-start) على موقع TanStack Start.

### الخطوة 2: تثبيت حزم Intlayer

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

الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)، والتحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر موفري السياق (context providers) وخطافات (hooks) لتدويل React.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه URL.

### الخطوة 3: تكوين مشروعك

قم بإنشاء ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
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
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 4: دمج Intlayer في تكوين Vite الخاص بك

أضف مكون intlayer الإضافي إلى تكوينك:

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddlewarePlugin, intlayerPlugin } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    intlayerPlugin(),
    intlayerMiddlewarePlugin(),
  ],
});
```

> يتم استخدام مكون Vite الإضافي `intlayerPlugin()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يعرّف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر ألقابًا لتحسين الأداء.

### الخطوة 5: إنشاء مكونات التخطيط

قم بإعداد تخطيط الجذر والتخطيطات الخاصة بكل لغة:

#### تخطيط الجذر

```tsx fileName="src/routes/{-$locale}/route.tsx" codeFormat="typescript"
// src/routes/{-$locale}/route.tsx
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### الخطوة 6: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/contents/page.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "الرئيسية",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        en: "هذا مثال على استخدام Intlayer مع TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "مرحبًا بك في Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./app`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

### الخطوة 7: إنشاء مكونات وخطافات تدرك اللغة

قم بإنشاء مكون `LocalizedLink` للملاحة المدركة للغة:

```tsx fileName="src/components/localized-link.tsx" codeFormat="typescript"
// src/components/localized-link.tsx
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, "to">;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  // دالة للتحقق مما إذا كان الرابط خارجيًا
  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  // تحديد الرابط بناءً على ما إذا كان خارجيًا أو داخليًا مع تعريب الرابط
  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps["to"]} />;
}
```

إنشاء هوك `useLocalizedNavigate` للملاحة البرمجية:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx" codeFormat="typescript"
// src/hooks/useLocalizedNavigate.tsx
// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, "to">;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions["to"] });
  };

  return localizedNavigate;
};
```

### الخطوة 8: استخدام Intlayer في صفحاتك

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

#### صفحة إعادة التوجيه الجذرية

```tsx fileName="src/routes/page.tsx" codeFormat="typescript"
// src/routes/page.tsx
import { useLocale } from "intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### الصفحة الرئيسية المحلية

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4 items-center text-center">
        {content.title}
        <LocaleSwitcher />
        <div className="flex gap-4">
          <a href="/">الفهرس</a>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

### الخطوة 9: إنشاء مكون لتبديل اللغة

أنشئ مكونًا يسمح للمستخدمين بتغيير اللغة:

```tsx fileName="src/components/locale-switcher.tsx" codeFormat="typescript"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer("locale-switcher");

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {/* مثال: Français (الفرنسية) */}
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
```

> لمعرفة المزيد عن الخطاف `useLocale`، يرجى الرجوع إلى [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

### الخطوة 10: إضافة إدارة خصائص HTML (اختياري)

إنشاء خطاف لإدارة خصائص lang و dir في HTML:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// src/hooks/useI18nHTMLAttributes.tsx
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

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // استيراد الخطاف

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // أضف هذا السطر

  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
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

يستخدم Intlayer تعزيز الوحدات للاستفادة من ميزات TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... تكوينات TypeScript الحالية الخاصة بك
  },
  include: [
    // ... الملفات التي تشملها حاليًا
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

---

### الخطوة 13: إنشاء إعادة توجيه (اختياري)

```typescript fileName="src/routes/{-$locale}/rotue.tsx" codeFormat="typescript"
function LayoutComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();
  const { locale: selectedLocale } = useLocale();
  const { defaultLocale } = configuration.internationalization;
  const { prefixDefault } = configuration.middleware;

  // إعادة التوجيه إلى اللغة الافتراضية إذا لم تكن هناك لغة في عنوان URL عندما تكون prefixDefault صحيحة
  if (selectedLocale === defaultLocale && !locale && prefixDefault) {
    return <Navigate replace to={defaultLocale} />;
  }

  // إعادة التوجيه إلى اللغة المختارة إذا كانت اللغة في عنوان URL لا تطابق اللغة المختارة
  if (selectedLocale !== defaultLocale && !locale) {
    return <Navigate replace to={selectedLocale} />;
  }

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

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

3. **انقل `vite-intlayer` إلى التبعيات** إذا كنت تستخدم الوسيط (middleware) في الإنتاج:
   ```bash
   npm install vite-intlayer --save
   ```

سيصبح تطبيقك الآن يدعم:

- **هيكلية URL**: `/en`، `/en/about`، `/tr`، `/tr/about`
- **الكشف التلقائي عن اللغة** بناءً على تفضيلات المتصفح
- **التوجيه المدرك للغة** باستخدام Tanstack Start
- **دعم TypeScript** مع أنواع مولدة تلقائيًا
- **التصيير على جانب الخادم** مع التعامل الصحيح مع اللغة

## امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

## التقدم أكثر

للمضي قدمًا، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق Tanstack Start](https://reactrouter.com/)
- [هوك useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)
- [هوك useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md)
- [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

يوفر هذا الدليل الشامل كل ما تحتاجه لدمج Intlayer مع Tanstack Start لتطبيق معرب بالكامل مع توجيه واعٍ للغة ودعم TypeScript.

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات              |
| ------- | ---------- | ---------------------- |
| 5.8.1   | 2025-09-09 | أضيف لـ Tanstack Start |

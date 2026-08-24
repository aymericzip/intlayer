---
createdAt: 2025-09-04
updatedAt: 2026-06-23
title: "تدويل React Router v7 - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق React Router v7 متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
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
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 6.1.5
    date: 2025-10-03
    changes: "تحديث الوثيقة"
  - version: 5.8.2
    date: 2025-09-04
    changes: "أضيف دعم React Router v7"
author: aymericzip
---

# ترجم React Router v7 باستخدام Intlayer | التدويل (i18n)

يوضح هذا الدليل كيفية دمج **Intlayer** لتحقيق التدويل السلس في مشاريع React Router v7 مع توجيه يدعم اللغة المحلية، ودعم TypeScript، وممارسات تطوير حديثة.

للحصول على التوجيه من جانب العميل، راجع دليل [Intlayer مع React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react_router_v7.md).

## Table of Contents

<TOC/>

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `react-i18next` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

<AccordionGroup>

** تغطية كاملة لجهاز التوجيه React **

تم تحسين Intlayer للعمل بشكل مثالي مع React Router من خلال تقديم **توجيه مدرك للإعدادات المحلية**، **برامج وسيطة للكشف عن الإعدادات المحلية**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

**حجم البندل**

<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

** الصيانة **

<Accordion header="قابلية الصيانة">

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

</Accordion>

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

**الأتمتة**

<Accordion header="أتمتة">

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

</Accordion>

**أداء**

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

</Accordion>

**التحجيم مع عدم وجود مطور**

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

</Accordion>
</AccordionGroup>

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق React Router v7

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

قم بتثبيت الحزم الضرورية باستخدام مدير الحزم المفضل لديك:

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر موفري السياق وخطافات للتدويل في React.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط للكشف عن اللغة المفضلة للمستخدم، وإدارة الكوكيز، والتعامل مع إعادة توجيه URL.

- **@react-router/fs-routes**
  الحزمة التي تفعّل التوجيه القائم على نظام الملفات لـ React Router v7.

</Step>

<Step number={2} title="تكوين مشروعك">

أنشئ ملف config لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> من خلال ملف الإعدادات هذا، يمكنك إعداد عناوين URL المترجمة، إعادة توجيه Middleware، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعاملات المتاحة، راجع [وثائق الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="دمج Intlayer في تكوين Vite الخاص بك">

أضف مكون intlayer إلى إعدادك:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> إضافة `intlayer()` Vite تُستخدم لدمج Intlayer مع Vite. وهي تضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما تعرّف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، توفر بدائل لتحسين الأداء.

</Step>

<Step number={4} title="تكوين مسارات نظام الملفات في React Router v7">

قم بإعداد تكوين التوجيه الخاص بك لاستخدام المسارات المستندة إلى نظام الملفات مع `flatRoutes`:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // تجاهل ملفات إعلان المحتوى من التعامل معها كمسارات
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> تمكّن دالة `flatRoutes` من `@react-router/fs-routes` التوجيه القائم على نظام الملفات، حيث يحدد هيكل الملفات في مجلد `routes/` مسارات التطبيق الخاص بك. يضمن خيار `ignoredRouteFiles` عدم معاملة ملفات إعلان محتوى Intlayer (`.content.ts`، إلخ) كملفات توجيه.

</Step>

<Step number={5} title="إنشاء مكونات التخطيط">

مع توجيه نظام الملفات، تستخدم اتفاقية تسمية مسطحة حيث تمثل النقاط (`.`) مقاطع المسار والأقواس `()` تدل على المقاطع الاختيارية.

قم بإنشاء الملفات التالية في دليل `app/routes/` الخاص بك:

#### بنية الملفات

```bash
app/
├── root.tsx                         # Layout wrapper for locale routes
└──routes/
    ├── ($locale)._index.tsx         # Home page (/, /es, etc.)
    ├── ($locale)._index.content.ts  # Home page content
    ├── ($locale).about.tsx          # About page (/about, /es/about, etc.)
    └── ($locale).about.content.ts   # About page content
```

اتفاقيات التسمية:

- `($locale)` - مقطع ديناميكي اختياري لمعامل اللغة
- `_layout` - مسار التخطيط الذي يغلف المسارات الفرعية
- `_index` - مسار الفهرس (يتم عرضه في مسار العنصر الأب)
- `.` (نقطة) - فاصل مقاطع المسار (مثال: `($locale).about` → `/:locale?/about`)

#### مكون التخطيط

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// ... كود App و links و ErrorBoundary دون تغيير

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### التخطيط الجذري

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

</Step>

<Step number={6} title="أعلن عن المحتوى الخاص بك">

قم بإنشاء وإدارة تصريحات المحتوى الخاصة بك لتخزين الترجمات. ضع ملفات المحتوى بجانب ملفات المسارات الخاصة بك:

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      ar: "مرحبا بك في React Router v7 + Intlayer",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      ar: "بناء تطبيقات متعددة اللغات بسهولة باستخدام React Router v7 و Intlayer.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      ar: "تعرف علينا",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      ar: "حول",
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      ar: "هذا هو محتوى صفحة حول.",
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      ar: "الرئيسية",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في التطبيق الخاص بك طالما تم تضمينها في دليل `contentDir` (افتراضياً، `./app`). وتطابق امتداد ملف إعلان المحتوى (افتراضياً، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

> إذا كان تطبيقك موجودًا بالفعل، يمكنك استخدام [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)، بالإضافة إلى [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)، لتحويل آلاف المكونات في ثانية واحدة.

</Step>

<Step number={7} title="إنشاء مكونات تدرك اللغة">

أنشئ مكون `LocalizedLink` للملاحة الموجهة حسب اللغة:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

// تحقق مما إذا كان الرابط خارجياً
const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// تحويل المسار إلى مسار محلي
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

// مكون رابط محلي
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

في حالة رغبتك في التنقل إلى المسارات المحلية، يمكنك استخدام hook `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  // الحصول على دالة التنقل
  const navigate = useNavigate();
  // الحصول على اللغة الحالية
  const { locale } = useLocale();

  // إنشء دالة تنقل محلية مع دعم اللغات المتعددة
  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    // تحويل المسار إلى المسار المحلي
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="إنشاء مكون لتبديل اللغة">

قم بإنشاء مكون يسمح للمستخدمين بتغيير اللغات:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
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
            onClick={() => setLocale(localeItem)}
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

</Step>

<Step number={10} title="إضافة إدارة سمات HTML">

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

هذا الـ hook يتم استخدامه بالفعل في مكون التخطيط (`($locale)._layout.tsx`) الموضح في الخطوة 5.

</Step>

ثم استخدمه في مكون الجذر الخاص بك:

يمكنك أيضًا استخدام `intlayerProxy` لإضافة التوجيه من جانب الخادم إلى تطبيقك. سيكتشف هذا البرنامج الإضافي تلقائيًا اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط اللغة المناسب. إذا لم تُحدد لغة، فسيحدد البرنامج الإضافي اللغة الأنسب بناءً على تفضيلات اللغة في متصفح المستخدم. إذا لم يتم اكتشاف أي لغة، فسيعيد التوجيه إلى اللغة الافتراضية.

> لاحظ أنه لاستخدام `intlayerProxy` في الإنتاج، يجب عليك نقل حزمة `vite-intlayer` من `devDependencies` إلى `dependencies`.

> منذ Intlayer v9، يتم دمج `intlayerProxy()` مباشرة في plugin `intlayer()` ويتم تفعيله بشكل افتراضي من خلال خيار `routing.enableProxy` (`true` بشكل افتراضي). تسجيله بشكل منفصل كما هو موضح أدناه أصبح اختياريًا الآن — يتم الاحتفاظ به لأسباب التوافقية العكسية والإعدادات التي تحتاج للتحكم في ترتيب plugins. قم بتعيين `routing.enableProxy: false` للانسحاب. اطلع على [ملاحظات الإصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md).

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

</Step>

<Step number={1} title="استخراج محتوى مكوناتك" isOptional={true}>

إذا كان لديك قاعدة بيانات كود موجودة، فقد يكون تحويل آلاف الملفات مستهلكًا للوقت.

لتسهيل هذه العملية، يقترح Intlayer [مترجمًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) / [مستخرجًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) لتحويل مكوناتك واستخراج المحتوى.

لإعداده، يمكنك إضافة قسم `compiler` في ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... بقية التكوين الخاص بك
  compiler: {
    /**
     * يشير إلى ما إذا كان يجب تمكين المترجم.
     */
    enabled: true,

    /**
     * يحدد مسار ملفات المخرجات
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * يشير إلى ما إذا كان يجب حفظ المكونات بعد تحويلها. بهذه الطريقة، يمكن تشغيل المترجم مرة واحدة فقط لتحويل التطبيق، ثم يمكن إزالته.
     */
    saveComponents: false,

    /**
     * بادئة مفتاح القاموس
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='أمر الاستخراج'>

قم بتشغيل المستخرج لتحويل مكوناتك واستخراج المحتوى

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='مترجم Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

قم بتحديث `vite.config.ts` لتضمين مكون `intlayerCompiler` الإضافي:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # أو npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق React Router v7](https://reactrouter.com/)
- [هوك useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)
- [هوك useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)
- [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

يوفر هذا الدليل الشامل كل ما تحتاجه لدمج Intlayer مع React Router v7 لتطبيق دولي بالكامل مع توجيه مدرك للغة ودعم TypeScript.

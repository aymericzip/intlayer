---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: كيف تترجم تطبيق TanStack Start الخاص بك - دليل i18n لعام 2026
description: تعرف على كيفية إضافة التدويل (i18n) إلى تطبيق TanStack Start الخاص بك باستخدام Intlayer. اتبع هذا الدليل الشامل لجعل تطبيقك متعدد اللغات مع توجيه مدرك للغة.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - توجيه اللغة
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: إضافة أمر init
  - version: 7.4.0
    date: 2025-12-11
    changes: تقديم validatePrefix وإضافة الخطوة 14: معالجة صفحات 404 مع المسارات المترجمة.
  - version: 7.3.9
    date: 2025-12-05
    changes: إضافة الخطوة 13: جلب اللغة في إجراءات الخادم (اختياري)
  - version: 7.2.3
    date: 2025-11-18
    changes: إضافة الخطوة 13: تكييف Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: إصلاح الافتراضي للبادئة عن طريق إضافة وظيفة getPrefix واستخدام useLocalizedNavigate و LocaleSwitcher و LocalizedLink.
  - version: 6.5.2
    date: 2025-10-03
    changes: تحديث التوثيق
  - version: 5.8.1
    date: 2025-09-09
    changes: تمت الإضافة لـ TanStack Start
---

# ترجم موقع TanStack Start الخاص بك باستخدام Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

يوضح هذا الدليل كيفية دمج **Intlayer** لتحقيق تدويل سلس في مشاريع TanStack Start مع توجيه مدرك للغة، ودعم TypeScript، وممارسات التطوير الحديثة.

## ما هو Intlayer؟

**Intlayer** هو مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكونات.
- **توطين البيانات الوصفية والمسارات والمحتوى ديناميكيًا**.
- **ضمان دعم TypeScript** مع أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من الميزات المتقدمة**، مثل الكشف الديناميكي عن اللغة والتبديل بينها.
- **تمكين التوجيه المدرك للغة** باستخدام نظام التوجيه القائم على الملفات في TanStack Start.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق TanStack Start

<Tabs defaultTab="video">
  <Tab label="فيديو" value="video">
  
<iframe title="أفضل حل i18n لـ TanStack Start؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="كود" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="كود تجريبي - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

انظر [قالب التطبيق](https://github.com/aymericzip/intlayer-tanstack-start-template) على GitHub.

### الخطوة 1: إنشاء المشروع

ابدأ بإنشاء مشروع TanStack Start جديد باتباع دليل [بدء مشروع جديد](https://tanstack.com/start/latest/docs/framework/react/quick-start) على موقع TanStack Start.

### الخطوة 2: تثبيت حزم Intlayer

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والتحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **react-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق React. توفر مزودي السياق والخطافات لتدويل React.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه URL.

### الخطوة 3: تكوين مشروعك

أنشئ ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المترجمة، وإعادة توجيه الوسيط، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 4: دمج Intlayer في تكوين Vite الخاص بك

أضف إضافة intlayer إلى تكوينك:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> تُستخدم إضافة `intlayer()` لـ Vite لدمج Intlayer مع Vite. تضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما تُعرف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، توفر أسماء مستعارة لتحسين الأداء.

### الخطوة 5: إنشاء التخطيط الجذري

قم بتكوين التخطيط الجذري الخاص بك لدعم التدويل باستخدام `useMatches` للكشف عن اللغة الحالية وتعيين سمات `lang` و `dir` على علامة `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // حاول العثور على اللغة في معلمات أي مطابقة نشطة
  // يفترض هذا أنك تستخدم الجزء الديناميكي "/{-$locale}" في شجرة المسارات الخاصة بك
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### الخطوة 6: إنشاء تخطيط اللغة

أنشئ تخطيطًا يتعامل مع بادئة اللغة ويقوم بالتحقق من الصحة.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // التحقق من صحة بادئة اللغة
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> هنا، `{-$locale}` هي معلمة مسار ديناميكية يتم استبدالها باللغة الحالية. هذا الترميز يجعل الجزء اختياريًا، مما يسمح له بالعمل مع أوضاع التوجيه مثل `'prefix-no-default'` وما إلى ذلك.

> كن على علم بأن هذا الجزء قد يسبب مشاكل إذا كنت تستخدم أجزاء ديناميكية متعددة في نفس المسار (على سبيل المثال، `/{-$locale}/other-path/$anotherDynamicPath/...`).
> بالنسبة لوضع `'prefix-all'`، قد تفضل تبديل الجزء إلى `$locale` بدلاً من ذلك.
> بالنسبة لوضع `'no-prefix'` أو `'search-params'`، يمكنك إزالة الجزء تمامًا.

### الخطوة 7: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/contents/page.content.ts"
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
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./app`). وتطابق امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 8: إنشاء مكونات وخطافات مدركة للغة

أنشئ مكون `LocalizedLink` للتنقل المدرك للغة:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// الأداة المساعدة الرئيسية
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// المساعدات
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

هذا المكون له هدفان:

- إزالة بادئة `{-$locale}` غير الضرورية من عنوان URL.
- حقن معلمة اللغة في عنوان URL لضمان إعادة توجيه المستخدم مباشرة إلى المسار المترجم.

ثم يمكننا إنشاء خطاف `useLocalizedNavigate` للتنقل البرمجي:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### الخطوة 9: استخدام Intlayer في صفحاتك

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

#### صفحة رئيسية مترجمة

```tsx fileName="src/routes/{-$locale}/index.tsx"
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
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
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

> لمعرفة المزيد حول خطاف `useIntlayer` ، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

### الخطوة 10: إنشاء مكون لتبديل اللغة

أنشئ مكونًا للسماح للمستخدمين بتغيير اللغات:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* اللغة - على سبيل المثال FR */}
              {localeEl}
            </span>
            <span>
              {/* اللغة في لغتها الخاصة - على سبيل المثال Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* اللغة في اللغة الحالية - على سبيل المثال Francés مع تعيين اللغة الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> لمعرفة المزيد حول خطاف `useLocale` ، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

### الخطوة 11: إدارة سمات HTML

كما رأينا في الخطوة 5، يمكنك إدارة سمات `lang` و `dir` لعلامة `html` باستخدام `useMatches` في مكونك الجذري. يضمن هذا تعيين السمات الصحيحة على الخادم والعميل.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // حاول العثور على اللغة في معلمات أي مطابقة نشطة
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### الخطوة 12: إضافة وسيط (اختياري)

يمكنك أيضًا استخدام `intlayerProxy` لإضافة توجيه من جانب الخادم إلى تطبيقك. ستقوم هذه الإضافة تلقائيًا باكتشاف اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف ارتباط اللغة المناسب. إذا لم يتم تحديد لغة، فستحدد الإضافة اللغة الأكثر ملاءمة بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم اكتشاف لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

> لاحظ أنه لاستخدام `intlayerProxy` في الإنتاج، تحتاج إلى نقل حزمة `vite-intlayer` من `devDependencies` إلى `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // يجب وضع البروكسي قبل الخادم إذا كنت تستخدم Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### الخطوة 13: تدويل البيانات الوصفية الخاصة بك (اختياري)

يمكنك أيضًا استخدام خطاف `getIntlayer` للوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### الخطوة 14: جلب اللغة في إجراءات الخادم الخاصة بك (اختياري)

قد ترغب في الوصول إلى اللغة الحالية من داخل إجراءات الخادم أو نقاط نهاية API الخاصة بك.
يمكنك القيام بذلك باستخدام مساعد `getLocale` من `intlayer`.

إليك مثال باستخدام وظائف خادم TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // الحصول على ملف تعريف الارتباط من الطلب (الافتراضي: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // الحصول على الترويسة من الطلب (الافتراضي: 'x-intlayer-locale')
    // تراجع باستخدام مفاوضة Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // جلب بعض المحتوى باستخدام getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### الخطوة 15: إدارة الصفحات غير الموجودة (اختياري)

عندما يزور المستخدم صفحة غير موجودة، يمكنك عرض صفحة مخصصة "غير موجودة" وقد تؤثر بادئة اللغة على الطريقة التي يتم بها تشغيل صفحة "غير موجودة".

#### فهم معالجة 404 في TanStack Router مع بادئات اللغة

في TanStack Router، تتطلب معالجة صفحات 404 مع المسارات المترجمة نهجًا متعدد الطبقات:

1. **مسار 404 مخصص**: مسار محدد لعرض واجهة مستخدم 404
2. **التحقق من الصحة على مستوى المسار**: يتحقق من صحة بادئات اللغة ويعيد توجيه البادئات غير الصالحة إلى 404
3. **مسار catch-all**: يلتقط أي مسارات غير متطابقة داخل جزء اللغة

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// هذا ينشئ مسار /[locale]/404 مخصص
// يتم استخدامه كمسار مباشر ويتم استيراده كمكون في ملفات أخرى
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// يتم تصديره بشكل منفصل بحيث يمكن إعادة استخدامه في notFoundComponent ومسارات catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // يتم تشغيل beforeLoad قبل رندر المسار (على كل من الخادم والعميل)
  // إنه المكان المثالي للتحقق من صحة بادئة اللغة
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix يتحقق مما إذا كانت اللغة صالحة وفقًا لتكوين intlayer الخاص بك
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // بادئة لغة غير صالحة - إعادة التوجيه إلى صفحة 404 ببادئة لغة صالحة
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // يتم استدعاء notFoundComponent عندما لا يوجد مسار طفل
  // على سبيل المثال، /en/non-existent-page يطلق هذا داخل تخطيط /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// المسار $ (splat/catch-all) يطابق أي مسار لا يطابق المسارات الأخرى
// على سبيل المثال، /en/some/deeply/nested/invalid/path
// هذا يضمن أن جميع المسارات غير المتطابقة داخل اللغة تعرض صفحة 404
// بدون هذا، قد تعرض المسارات العميقة غير المتطابقة صفحة فارغة أو خطأ
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### الخطوة 16: تكوين TypeScript (اختياري)

يستخدم Intlayer توسيع الوحدات (module augmentation) للحصول على فوائد TypeScript وجعل قاعدة الكود الخاصة بك أقوى.

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا:

```json5 fileName="tsconfig.json"
{
  // ... تكويناتك الحالية
  include: [
    // ... التضمينات الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

---

### تكوين Git

يوصى بتجاهل الملفات الناتجة عن Intlayer. يتيح لك هذا تجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات الناتجة عن Intlayer
.intlayer
```

---

## إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer VS Code الرسمية**.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

## اذهب أبعد من ذلك

للذهاب أبعد من ذلك، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق TanStack Start](https://reactrouter.com/)
- [خطاف useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)
- [خطاف useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)
- [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

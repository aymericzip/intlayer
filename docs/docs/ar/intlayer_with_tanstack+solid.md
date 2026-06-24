---
createdAt: 2025-03-25
updatedAt: 2026-06-23
title: "تدويل TanStack Start + Solid - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق TanStack Start + Solid متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - توثيق
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - توجيه اللغة
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 8.5.1
    date: 2026-03-25
    changes: "تمت الإضافة لـ Tanstack Start Solid.js"
author: aymericzip
---

# ترجم موقعك على Tanstack Start مع Solid.js باستخدام Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

يوضح هذا الدليل كيفية دمج **Intlayer** من أجل تدويل سلس في مشاريع Tanstack Start مع Solid.js، وتوجيه مدرك للغة، ودعم TypeScript، وممارسات التطوير الحديثة.

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `react-i18next` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

** تغطية كاملة لـ TanStack Start **

تم تحسين Intlayer للعمل بشكل مثالي مع TanStack Start وSolid من خلال تقديم **توجيه متعدد اللغات**، و**sitemap**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

**حجم البندل**

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

** الصيانة **

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

**الأتمتة**

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

**أداء**

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

**التحجيم مع عدم وجود مطور**

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Tanstack Start

<Tabs defaultTab="video">
  <Tab label="فيديو" value="video">
  
<iframe title="أفضل حل i18n لـ Tanstack Start؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="كود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

شاهد [قالب التطبيق](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) على GitHub.

<Steps>

<Step number={1} title="إنشاء المشروع">

ابدأ بإنشاء مشروع TanStack Start جديد باتباع دليل [بدء مشروع جديد](https://tanstack.com/start/latest/docs/framework/solid/quick-start) على موقع TanStack Start.

</Step>

<Step number={2} title="تثبيت حزم Intlayer">

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> علامة `--interactive` اختيارية. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

> سيقوم هذا الأمر باكتشاف بيئتك وتثبيت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة الإعدادات، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والتحويل البرمجي وأوامر [واجهة الأوامر (CLI)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **solid-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيقات Solid. توفر مجمعات السياق (context providers) والخطافات (hooks) للتدويل في Solid.

- **vite-intlayer**
  تتضمن إضافة Vite لدمج Intlayer مع [أداة بناء Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، كذالك البرمجيات الوسيطة (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه الروابط.

</Step>

<Step number={3} title="إعداد مشروعك">

قم بإنشاء ملف إعدادات لتكوين اللغات في تطبيقك:

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

> من خلال ملف الإعدادات هذا، يمكنك تكوين الروابط المترجمة، إعادة توجيه البرمجيات الوسيطة، أسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={4} title="دمج Intlayer في إعدادات Vite الخاصة بك">

أضف إضافة intlayer إلى إعداداتك:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> تُستخدم إضافة `intlayer()` لـ Vite لدمج Intlayer مع Vite. تضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. وتعرّف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، توفر أسماء بديلة (aliases) لتحسين الأداء.

</Step>

<Step number={5} title="إنشاء التخطيط الجذري">

قم بتكوين التخطيط الجذري الخاص بك لدعم التدويل باستخدام `useParams` لاكتشاف اللغة الحالية وتعيين سمات `lang` و `dir` على وسم `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="إنشاء تخطيط اللغة">

أنشئ تخطيطًا يتعامل مع بادئة اللغة ويقوم بالتحقق من صحتها. سيضمن هذا التخطيط معالجة اللغات الصالحة فقط.

> هذه الخطوة اختيارية إذا لم تكن بحاجة إلى التحقق من بادئة اللغة على مستوى المسار.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // التحقق من بادئة اللغة
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> هنا، `{-$locale}` هو معلمة مسار ديناميكية يتم استبدالها باللغة الحالية. هذا التنسيق يجعل الجزء اختياريًا، مما يسمح له بالعمل مع أوضاع التوجيه مثل `'prefix-no-default'` وغيرها.

> كن على علم بأن هذا الجزء قد يسبب مشكلات إذا كنت تستخدم أجزاء ديناميكية متعددة في نفس المسار (مثل: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> لوضع `'prefix-all'`، قد تفضل تبديل الجزء إلى `$locale`.
> لوضع `'no-prefix'` أو `'search-params'`، يمكنك إزالة الجزء تمامًا.

</Step>

<Step number={7} title="إعلان المحتوى الخاص بك">

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

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك، طالما أنها مضمنة في مجلد `contentDir` (افتراضيًا `./app`). وتطابق امتداد ملفات إعلان المحتوى (افتراضيًا `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

</Step>

<Step number={8} title="استخدام المكونات والخطافات المدركة للغة">

قم بإنشاء مكون `LocalizedLink` للتنقل المدرك للغة:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

يخدم هذا المكون غرضين:

- إزالة بادئة `{-$locale}` غير الضرورية من الروابط.
- حقن معلمة اللغة في الروابط لضمان إعادة توجيه المستخدم مباشرة إلى المسار المترجم.

بعد ذلك، يمكننا إنشاء خطاف `useLocalizedNavigate` للتنقل البرمجي:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="استخدام Intlayer في صفحاتك">

قم بالوصول إلى قواميس المحتوى الخاصة بك عبر تطبيقك:

#### صفحة رئيسية مترجمة

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> إذا كنت ترغب في استخدام المحتوى الخاص بك في خاصية من نوع `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> في Solid، يعيد `useIntlayer` محتوى تفاعلياً (على سبيل المثال، `content`). يمكنك الوصول إلى خصائصه مباشرة.
>
> لمعرفة المزيد حول خطاف `useIntlayer` ، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="إنشاء مكون لتبديل اللغة">

أنشئ مكونًا للسماح للمستخدمين بتغيير اللغات:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> في ملفات Solid ، يكون `locale` من `useLocale` عبارة عن **signal accessor**. استخدم `locale()` (مع القوسين) لقراءة قيمته الحالية بشكل تفاعلي.
>
> لمعرفة المزيد حول خطاف `useLocale` ، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="إدارة سمات HTML">

كما رأيت في الخطوة 5، يمكنك إدارة سمات `lang` و `dir` لوسم `html` باستخدام `useParams` في المكون الجذري الخاص بك. يضمن ذلك تعيين السمات الصحيحة على كل من الخادم والعميل.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

</Step>

<Step number={12} title="إضافة برمجية وسيطة">

يمكنك أيضًا استخدام `intlayerProxy` لإضافة توجيه من جانب الخادم إلى تطبيقك. ستكتشف هذه الإضافة تلقائيًا اللغة الحالية بناءً على الرابط وتعيين ملف تعريف الارتباط المناسب للغة. إذا لم يتم تحديد لغة، فستحدد الإضافة اللغة الأكثر ملاءمة بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم اكتشاف لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

> لاحظ أنه لاستخدام `intlayerProxy` في الإنتاج، تحتاج إلى نقل حزمة `vite-intlayer` من `devDependencies` إلى `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // يجب وضع الوكيل قبل الخادم إذا كنت تستخدم Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

</Step>

<Step number={13} title="تدويل العناوين (metadata) الخاصة بك">

يمكنك أيضًا استخدام وظيفة `getIntlayer` للوصول إلى قواميس المحتوى الخاصة بك داخل محمل `head` للعناوين المدركة للغة:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

---

</Step>

<Step number={14} title="الحصول على اللغة في إجراءات الخادم الخاص بك">

قد ترغب في الوصول إلى اللغة الحالية من داخل إجراءات الخادم (server actions) أو نقاط نهاية API.
يمكنك القيام بذلك باستخدام مساعد `getLocale` من `intlayer`.

إليك مثال باستخدام وظائف الخادم في TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // الحصول على ملف تعريف الارتباط من الطلب (افتراضيًا: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // الحصول على الترويسة من الطلب (افتراضيًا: 'x-intlayer-locale')
    // تراجع باستخدام التفاضل Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // استرجاع بعض المحتوى باستخدام getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={15} title="إدارة الصفحات غير الموجودة (404)" isOptional={true}>

عندما يزور المستخدم صفحة غير موجودة ، يمكنك عرض صفحة 404 مخصصة ويمكن أن تؤثر بادئة اللغة على كيفية تشغيل الصفحة غير الموجودة.

#### فهم معالجة 404 في TanStack Router مع بادئات اللغة

في TanStack Router ، تتطلب معالجة صفحات 404 مع المسارات المترجمة نهجًا متعدد المستويات:

1. **مسار 404 مخصص**: مسار محدد لعرض واجهة مستخدم 404
2. **التحقق على مستوى المسار**: يتحقق من بادئات اللغة ويعيد توجيه البادئات غير الصالحة إلى 404
3. **مسار التقاط الكل (Catch-all)**: يلتقط أي مسارات غير متطابقة داخل جزء اللغة

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// ينشئ هذا مسار /[locale]/404 مخصصًا
// يتم استخدامه كمسار مباشر ويتم استيراده كمكون في ملفات أخرى
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// يتم تصديره بشكل منفصل بحيث يمكن إعادة استخدامه في notFoundComponent ومسارات التقاط الكل
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // يتم تشغيل beforeLoad قبل عرض المسار (كل من الخادم والعميل)
  // إنه المكان المثالي للتحقق من بادئة اللغة
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // يتحقق validatePrefix مما إذا كانت اللغة صالحة وفقًا لإعدادات intlayer الخاصة بك
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // بادئة لغة غير صالحة - إعادة توجيه إلى صفحة 404 مع بادئة لغة صالحة
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // يتم استدعاء notFoundComponent عندما لا يكون المسار الفرعي موجودًا
  // مثال: /en/صفحة-غير-موجودة يشغل هذا داخل تخطيط /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// يطابق مسار $ (الكل) أي مسار لا يطابق المسارات الأخرى
// مثال: /en/بعض/المسارات/العميقة/غير/الصالحة
// يضمن هذا أن تعرض جميع المسارات غير المتطابقة داخل اللغة صفحة 404
// بدون هذا ، قد تعرض المسارات العميقة غير المتطابقة صفحة فارغة أو خطأ
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={16} title="استخراج المحتوى من مكوناتك" isOptional={true}>

إذا كان لديك قاعدة أكواد حالية ، فقد يستغرق تحويل آلاف الملفات وقتًا طويلاً.

لتسهيل هذه العملية ، يقترح Intlayer [مترجمًا (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) / [مستخرجًا (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) لتحويل مكوناتك واستخراج المحتوى.

لإعداده ، يمكنك إضافة قسم `compiler` في ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... بقية إعداداتك
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
     * يشير إلى ما إذا كان يجب حفظ المكونات بعد تحويلها.
     *
     * - إذا كان `true` ، فسيقوم المترجم بإعادة كتابة ملف المكون على القرص. وبالتالي ، سيكون التحويل دائمًا ، وسيقوم المترجم بتجاوز التحويل للعملية التالية. بهذه الطريقة ، يمكن للمترجم تحويل التطبيق ومن ثم يمكن إزالته.
     *
     * - إذا كان `false` ، فسيقوم المترجم بحقن استدعاء وظيفة `useIntlayer()` في الكود فقط في مخرجات البناء ، مع الحفاظ على قاعدة الأكواد الأساسية كما هي. سيتم إجراء التحويل في الذاكرة فقط.
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
 <Tab value='أمر extract'>

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

قم بتحديث `vite.config.ts` الخاص بك لتشمل إضافة `intlayerCompiler`:

> بدءًا من الإصدار Intlayer v9، تم دمج المترجم (compiler) مباشرة في إضافة `intlayer()` ويتم تنشيطه تلقائيًا بمجرد تعيين `compiler.enabled` وتهيئة مسار `compiler.output`. أصبح تسجيل `intlayerCompiler()` بشكل منفصل كما هو موضح أدناه اختياريًا الآن — فهو يلغي النسخ المكررة من نفسه إذا تمت إضافته أيضًا. راجع [ملاحظات إصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md).

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
```

```bash packageManager="npm"
npm run build # أو npm run dev
```

```bash packageManager="pnpm"
pnpm run build # أو pnpm run dev
```

```bash packageManager="yarn"
yarn build # أو yarn dev
```

```bash packageManager="bun"
bun run build # أو bun run dev
```

 </Tab>
</Tabs>

---

</Step>

<Step number={17} title="إعداد TypeScript">

يستخدم Intlayer تقوية الوحدات (module augmentation) للاستفادة من ميزات TypeScript وجعل قاعدة الأكواد الخاصة بك أكثر قوة.

تأكد من أن إعدادات TypeScript الخاصة بك تتضمن الأنواع المنشأة تلقائيًا:

```json5 fileName="tsconfig.json"
{
  // ... إعداداتك الحالية
  include: [
    // ... التضمينات الحالية
    ".intlayer/**/*.ts", // تضمين الأنواع المنشأة تلقائيًا
  ],
}
```

---

</Step>

</Steps>

### إعدادات Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إرسالها إلى مستودع Git الخاص بك.

للقيام بذلك ، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

---

## إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer ، يمكنك تثبيت **إضافة Intlayer VS Code الرسمية**.

[تثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينة مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة ، راجع [توثيق إضافة Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## المضي قدمًا

للمضي قدمًا ، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

---

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق Tanstack Start](https://tanstack.com/start/latest)
- [خطاف useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useIntlayer.md)
- [خطاف useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)
- [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

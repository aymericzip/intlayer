---
createdAt: 2025-09-04
updatedAt: 2026-10-08
priority: 10
title: "تدويل React Router v7 - الدليل الكامل لترجمة تطبيقك"
description: "إعداد Intlayer في React Router v7: أجزاء مسارات مترجمة، وloaders ومكوّنات مترجمة، وhreflang، وخريطة موقع متعددة اللغات."
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
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 7.5.6
    date: 2025-12-27
    changes: "تحديث التخطيط ومعالجة 404"
  - version: 6.1.5
    date: 2025-10-03
    changes: "تحديث الوثيقة"
  - version: 5.8.2
    date: 2025-09-04
    changes: "أضيف دعم React Router v7"
author: aymericzip
---

# ترجم React Router v7 باستخدام Intlayer

يوضح هذا الدليل كيفية دمج **Intlayer** لتحقيق التدويل السلس في مشاريع React Router v7 مع توجيه يدعم اللغة المحلية، ودعم TypeScript، وممارسات تطوير حديثة.

يغطي هذا الدليل كلاً من **التوجيه المعتمد على الإعدادات** (`routes.ts`) و**التوجيه المعتمد على نظام الملفات** (`@react-router/fs-routes`).

## جدول المحتويات

<TOC/>

## لماذا تختار Intlayer مقارنة بالبدائل الأخرى؟

بالمقارنة مع الحلول الرئيسية مثل `react-i18next` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

<AccordionGroup>
<Accordion header="تغطية كاملة لجهاز التوجيه React">

تم تحسين Intlayer للعمل بشكل مثالي مع React Router من خلال تقديم **توجيه مدرك للإعدادات المحلية**، **برامج وسيطة للكشف عن الإعدادات المحلية**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

</Accordion>
<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer في **تقليل حجم حزمة JavaScript (bundle size) وصفحاتك بنسبة تصل إلى 50%**.

</Accordion>
<Accordion header="قابلية الصيانة">

تحديد نطاق المحتوى لكل مكوّن على حدة **يُسهّل صيانة التطبيقات الكبيرة**. يمكنك نسخ مجلد ميزة بالكامل أو حذفه دون القلق بشأن مراجعة قاعدة بيانات المحتوى بأكملها. بالإضافة إلى ذلك، فإن Intlayer **مكتوب بنظام أنواع قوي (Fully Typed)** لضمان الدقة الكاملة لمحتواك.

</Accordion>
<Accordion header="وكلاء الذكاء الاصطناعي (AI Agents)">

يؤدي وضع المحتوى إلى جانب المكونات (Co-location) إلى **تقليل السياق المطلوب** بواسطة نماذج اللغات الكبيرة (LLMs). كما يوفر Intlayer مجموعة أدوات متكاملة مثل **واجهة سطر الأوامر (CLI)** لفحص الترجمات المفقودة، و**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، و**[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**، و**[مهارات الوكلاء (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لتوفير أفضل تجربة تطوير لوكلاء الذكاء الاصطناعي.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)
- [مهارات الوكلاء (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)

</Accordion>
<Accordion header="التشغيل الآلي">

استخدم الأتمتة لترجمة المحتوى مباشرةً في مسار CI/CD الخاص بك باستخدام نموذج اللغة الكبير (LLM) الذي تختاره ووفق تكلفة مزود الذكاء الاصطناعي لديك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

- [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

</Accordion>
<Accordion header="الأداء الفائق">

قد يؤدي تحميل ملفات JSON ضخمة في المكونات إلى مشكلات في الأداء وسرعة الاستجابة. يعمل Intlayer على تحسين تحميل المحتوى بدقة عند وقت البناء (Build Time).

</Accordion>
<Accordion header="تمكين الفرق غير التقنية (Non-Developers)">

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)** و**[نظام إدارة محتوى كامل (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)** لإدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين وكتاب المحتوى وأعضاء الفريق الآخرين سلسًا للغاية. يمكن تخزين المحتوى محليًا و/أو عن بعد.

- [المحرّر المرئي في Intlayer: عدّل المحتوى في سياقه](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق React Router v7

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="How to translate an React Router v7 app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="كود (قائم على التكوين)" value="code-config">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer (Config-based)"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="كود (مسارات نظام الملفات)" value="code-fs">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-fs-routes-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer (File-System Routes)"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة (قائم على التكوين)" value="demo">

<iframe
  src="https://intlayer-react-router-v7.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة Intlayer React Router v7 Template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See the [Config-Based Routing Template](https://github.com/aymericzip/intlayer-react-router-v7-template) or [File-System Routes Template](https://github.com/aymericzip/intlayer-react-router-v7-fs-routes-template) on GitHub.

<Steps>
<Step number={1} title="تثبيت التبعيات">

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> علامة `--interactive` اختيارية. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

> سيقوم هذا الأمر باكتشاف بيئتك وتثبيت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

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

</Step>
<Step number={2} title="تكوين مشروعك">

<Tabs group="routing-type">
<Tab label="Config-based routing" value="config-based">

### البنية

في هذه البنية، يتم تحديد المسارات برمجياً في `app/routes.ts` مع مقاطع ديناميكية اختيارية `/:locale?`. يتم تنظيم الصفحات المترجمة والتخطيطات وإعلانات المحتوى داخل دليل `app/`:

```bash
.
├── app
│   ├── components
│   │   ├── locale-switcher.content.ts
│   │   ├── locale-switcher.tsx
│   │   ├── localized-link.tsx
│   │   ├── navbar.content.ts
│   │   └── navbar.tsx
│   ├── hooks
│   │   ├── useI18nHTMLAttributes.tsx
│   │   └── useLocalizedNavigate.tsx
│   ├── routes
│   │   ├── about
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── root.tsx                      # Root layout for IntlayerProvider
│   └── routes.ts                     # Route definition file
├── intlayer.config.ts
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

### التكوين

قم بإنشاء ملف تكوين `intlayer.config.ts` للإعلان عن اللغات المدعومة في تطبيقك:

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

</Tab>
<Tab label="File-system routes" value="fs-routes">

### البنية

في هذه البنية، تتبع المسارات اصطلاحات نظام الملفات في React Router v7 باستخدام `flatRoutes`، حيث تمثل النقاط (`.`) مقاطع عنوان URL وتشير `($locale)` إلى مقطع اللغة الاختياري:

```bash
.
├── app
│   ├── components
│   │   ├── locale-switcher.content.ts
│   │   ├── locale-switcher.tsx
│   │   ├── localized-link.tsx
│   │   ├── navbar.content.ts
│   │   └── navbar.tsx
│   ├── hooks
│   │   ├── useI18nHTMLAttributes.tsx
│   │   └── useLocalizedNavigate.tsx
│   ├── routes
│   │   ├── ($locale)._index.content.ts
│   │   ├── ($locale)._index.tsx
│   │   ├── ($locale).about.content.ts
│   │   └── ($locale).about.tsx
│   ├── root.tsx                      # Root layout for IntlayerProvider
│   └── routes.ts                     # ملف تعريف المسارات باستخدام flatRoutes
├── intlayer.config.ts
├── package.json
├── react-router.config.ts
├── tsconfig.json
└── vite.config.ts
```

### التكوين

قم بإنشاء ملف تكوين `intlayer.config.ts` للإعلان عن اللغات المدعومة في تطبيقك:

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

</Tab>
</Tabs>

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه الوسيط، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

- [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

</Step>
<Step number={3} title="دمج Intlayer في تكوين Vite الخاص بك">

أضف مكون intlayer الإضافي إلى تكوينك:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> يتم استخدام مكون Vite الإضافي `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء.

</Step>
<Step number={4} title="تكوين مسارات React Router v7">

<Tabs group="routing-type">
<Tab label="Config-based routing" value="config-based">

قم بإعداد تكوين التوجيه الخاص بك مع مسارات مدركة للغة:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:locale?", "routes/page.tsx"), // الصفحة الرئيسية المحلية
  route("/:locale?/about", "routes/about/page.tsx"), // صفحة حول المحلية
] satisfies RouteConfig;
```

</Tab>
<Tab label="مسارات نظام الملفات" value="fs-routes">

قم بإعداد تكوين التوجيه الخاص بك لاستخدام المسارات القائمة على نظام الملفات باستخدام `flatRoutes`:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // Ignore content declaration files from being treated as routes
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> تتيح دالة `flatRoutes` من `@react-router/fs-routes` التوجيه القائم على نظام الملفات، حيث تحدد بنية الملفات في دليل `routes/` مسارات تطبيقك. ويضمن خيار `ignoredRouteFiles` عدم التعامل مع ملفات إعلان محتوى Intlayer (`.content.ts` وما إلى ذلك) كملفات مسارات.

</Tab>
</Tabs>

</Step>
<Step number={5} title="إنشاء مكونات التخطيط">

قم بإعداد التخطيط الجذري والتخطيطات الخاصة باللغة:

#### التخطيط الجذري

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  data,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";

// ... Unchanged App, links and ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  if (!locale) {
    throw data("Language not supported", { status: 404 });
  }

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

</Step>
<Step number={6} title="إعلان المحتوى الخاص بك">

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

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./app`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Could be placed in `app/routes/($locale)._index.content.ts` in case of using file-system based routing.

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

- [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)

</Step>
<Step number={7} title="إنشاء مكونات تدرك اللغة">

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
import { useLocale } from "react-intlayer";
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

</Step>
<Step number={8} title="استخدام Intlayer في صفحاتك">

قم بالوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

#### الصفحة الرئيسية المترجمة

<Tabs group="routing-type">
<Tab label="Config-based routing" value="config-based">

```tsx fileName="app/routes/page.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/page";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

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

</Tab>
<Tab label="File-system routes" value="fs-routes">

```tsx fileName="app/routes/($locale)._index.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/($locale)._index";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

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

</Tab>
</Tabs>

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md).

- [توثيق هوك useIntlayer | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)

> إذا كان تطبيقك موجودًا بالفعل، يمكنك استخدام [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)، بالإضافة إلى [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)، لتحويل آلاف المكونات في ثانية واحدة.

- [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)
- [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)

</Step>
<Step number={9} title="إنشاء مكون لتبديل اللغة">

قم بإنشاء مكون يسمح للمستخدمين بتغيير اللغات:

<Tabs group="routing-type">
<Tab label="Config-based routing" value="config-based">

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  defaultLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            reloadDocument // Reload the page to apply the new locale
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
            <span dir="ltr" lang={defaultLocale}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, defaultLocale)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

</Tab>
<Tab label="File-system routes" value="fs-routes">

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  defaultLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            reloadDocument // Reload the page to apply the new locale
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={defaultLocale}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, defaultLocale)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

</Tab>
</Tabs>

> لمعرفة المزيد عن الخطاف `useLocale`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md).

- [توثيق هوك useLocale | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)

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

</Step>
<Step number={11} title="إضافة middleware">

يمكنك أيضاً استخدام `intlayerProxy` لإضافة توجيه من جانب الخادم إلى تطبيقك. سيقوم هذا الإضافة تلقائياً بالكشف عن المحلية الحالية بناءً على عنوان URL وتعيين ملف تعريف المحلية المناسب. إذا لم يتم تحديد محلية، سيحدد الإضافة المحلية الأكثر ملاءمة بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم الكشف عن أي محلية، فسيتم إعادة التوجيه إلى المحلية الافتراضية.

> لاحظ أنه لاستخدام `intlayerProxy` في الإنتاج، تحتاج إلى نقل حزمة `vite-intlayer` من `devDependencies` إلى `dependencies`.

> منذ Intlayer v9، يتم تجميع `intlayerProxy()` مباشرة في plugin `intlayer()` وتفعيله بشكل افتراضي من خلال خيار `routing.enableProxy` (`true` بشكل افتراضي). تسجيل هذه الدالة بشكل منفصل كما هو موضح أدناه أصبح اختيارياً الآن، يتم الاحتفاظ به للتوافقية العكسية والإعدادات التي تحتاج إلى التحكم في ترتيب plugin. عيّن `routing.enableProxy: false` للإلغاء. راجع [ملاحظات الإصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md).

- [ملاحظات الإصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={12} title="استخراج محتوى مكوناتك" isOptional={true}>

إذا كان لديك قاعدة بيانات كود موجودة، فقد يكون تحويل آلاف الملفات مستهلكًا للوقت.

لتسهيل هذه العملية، يقترح Intlayer [مترجمًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) / [مستخرجًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) لتحويل مكوناتك واستخراج المحتوى.

- [مترجمًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)
- [مستخرجًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)

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

 <Tabs>
 <Tab value='intlayer >= 9'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

 </Tab>
 <Tab value='intlayer < 9'>

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

 </Tab>
 </Tabs>

قم ببناء تطبيقك لتحويل مكوناتك واستخراج المحتوى

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

</Step>

</Steps>

## تكوين TypeScript

يستخدم Intlayer ميزة زيادة الوحدات (module augmentation) للاستفادة من مزايا TypeScript وجعل قاعدة الكود الخاصة بك أكثر قوة وموثوقية.

تأكد من أن تكوين TypeScript يتضمن الأنواع التي يتم إنشاؤها تلقائيًا:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // تضمين الأنواع المُنشأة تلقائيًا
  ],
}
```

## تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer، لتجنب حفظها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات المُنشأة بواسطة Intlayer
.intlayer
```

## إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

- [التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة ما يلي:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينة مضمنة (inline preview)** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md).

- [توثيق إضافة Intlayer لـ VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)

## المضي قدمًا

للمضي قدمًا، يمكنك تفعيل [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إدارة المحتوى الخاص بك خارجيًا باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

- [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق React Router v7](https://reactrouter.com/)
- [هوك useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useIntlayer.md)
- [هوك useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)
- [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

يوفر هذا الدليل الشامل كل ما تحتاجه لدمج Intlayer مع React Router v7 لتطبيق دولي بالكامل مع توجيه مدرك للغة ودعم TypeScript.

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات React Router v7؟">

لا يوفر React Router v7 أي طبقة رسائل، لذا يمكنك إقرانه بمكتبة تدويل (i18n):

- **`react-i18next`**: مكتبة شائعة تُحمل فضاءات أسماء JSON في وقت التشغيل.
- **`react-intl`**: حل يعتمد على تنسيق ICU.
- **`Intlayer`**: إعلان المحتوى بجانب المكون، ترجمة وقت البناء، دعم كامل لـ SSR ومحملات البيانات (loaders)، فحص كامل للأنواع، ترجمة بالذكاء الاصطناعي، ومحرر مرئي.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

- [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md)
- [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md)

</Question>
<Question title="كم يضيف i18n إلى حجم حزمة React Router لدي؟">

أقل بكثير من أنظمة الكتالوجات التقليدية. يتجاهل المترجم المفاتيح غير المستخدمة وتفصل القواميس الديناميكية اللغات، مما يقلل الحزمة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

- [القواميس الديناميكية: المجموعات والمتغيرات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md)
- [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)
- [اختبار أداء مكتبات i18n: الحزمة والأداء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md)

</Question>
<Question title="هل يمكنني الترحيل من react-i18next أو react-intl دون إعادة كتابة مكوناتي؟">

نعم. اتبع [دليل ترحيل react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md) أو استخدم محولات التوافق للحفاظ على واجهات برمجة التطبيقات الحالية.

- [دليل ترحيل react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md)
- [الانتقال من i18next إلى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)
- [محوّلات التوافق من Intlayer لمكتبات i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)

</Question>
<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

- [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)
- [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md)
- [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md)

</Question>
<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer مكوناتك، ويسحب السلاسل النصية الموجهة للمستخدم، ويكتب ملف `.content` بجانب كل منها، حتى تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. تشرح الخطوة 12 من هذا الدليل ذلك بالتفصيل.

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء: يمسح كود JSX و TSX و Vue و Svelte عند كل تغيير، وينشئ القواميس ويزامنها عبر استبدال الوحدات الساخن (HMR)، بحيث لا توجد مفاتيح للحفاظ عليها يدويًا على الإطلاق.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)

هناك حدان يجدر معرفتهما قبل تشغيل المترجم. إنه يعمل عن طريق التحليل الثابت، وبالتالي فإن السلاسل التي تظهر فقط في وقت التشغيل، مثل رموز أخطاء API أو حقول نظام إدارة المحتوى، تظل بعيدة عن متناوله. كما يتعين عليه التمييز بين النصوص الموجهة للمستخدم ومنطق التطبيق مثل `className="active"` أو رمز الحالة، الأمر الذي يتطلب بعض الملاحظات التوضيحية في قاعدة التعليمات البرمجية الكبيرة. يتجنب [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) كلا الأمرين من خلال إبقائك متحكمًا في العملية.

- [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)

</Question>
<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>
<Question title="كيف أضيف مقطع اللغة إلى المسارات؟">

من خلال تحديد مقطع `:locale` في شجرة المسارات الخاصة بك. يرجع `validatePrefix` خطأ 404 للغات غير الصالحة، ويحدث `getLocalizedUrl` الروابط.

</Question>
<Question title="هل يجب تضمين اللغة في عنوان URL؟">

لا. يقبل `routing.mode` القيمة `"prefix-no-default"` (الافتراضية)، و `"prefix-all"`، و `"no-prefix"`، و `"search-params"`. يتم حفظ التفضيل في ملف تعريف الارتباط. انظر [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

- [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

</Question>
<Question title="هل يعمل هذا في وضع إطار عمل React Router مع SSR ومحملات البيانات؟">

نعم. في وضع إطار العمل، يحل Intlayer اللغة من معلمات الطلب، بحيث يحتوي كود HTML واللوادر على النص الصحيح منذ البايت الأول.

</Question>
<Question title="كيف أضيف وسوم hreflang لتحسين محركات البحث؟">

في دالة `meta` في React Router باستخدام `getMultilingualUrls` لتعريف إدخالات `alternates.languages` و `x-default`.

</Question>
<Question title="كيف أنشئ مبدل لغة يحافظ على الصفحة الحالية؟">

استخدم `useLocale` للغة النشطة و `getLocalizedUrl` لترجمة المسار الحالي إلى اللغة المستهدفة دون إعادة توجيه المستخدم إلى الصفحة الرئيسية.

</Question>
<Question title="كيف أترجم التطبيق تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. تكتشف واجهة CLI الترجمات المفقودة وتملؤها باستخدام نموذج اللغة (LLM) الذي تختاره مع مزودك ومفتاح API الخاص بك. يحد الخيار `--git-diff` العملية على المحتوى المعدل في الفرع الحالي فقط. راجع [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

- [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md)
- [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md)

</Question>
<Question title="هل يدعم Intlayer صيغ الجمع والجنس والنصوص المنسقة؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، [المحتوى القائم على النوع الاجتماعي (gender)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)، [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)، و [المنسقات (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md) للأرقام والتواريخ والعملات.

- [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)
- [المحتوى القائم على النوع الاجتماعي (gender)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)
- [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)
- [المنسقات (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md)

</Question>
<Question title="كيف يمكن للمترجمين تحرير المحتوى دون لمس الكود؟">

من خلال [المحرر المرئي (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، الذي يسمح لأي شخص بتحرير النصوص مباشرة على التطبيق قيد التشغيل، أو عبر [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، الذي يفصل المحتوى ليتم تحديثه دون الحاجة لإعادة نشر الكود.

- [المحرر المرئي (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

</Question>
<Question title="ما هي تكلفة المحرر المرئي؟ هل هو مبالغ فيه إذا لم أكن بحاجة إليه؟">

[المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) ذو **تكلفة معدومة** على تطبيقك إذا لم يتم إعداده. لا يتم تحميل المنطق الإضافي إلا إذا تم تمكينه صراحة وعند الحاجة فقط.

- [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)

حتى في حال تمكينه، فإن التأثير خفيف للغاية (+5 كيلوبايت، يتم تحميلها ديناميكيًا فقط عند التنشيط) لأن الجزء الأكبر من المنطق تتم معالجته بواسطة محرر الخادم على [app.intlayer.org](https://app.intlayer.org) أو عبر حزمة `intlayer-editor`. إذا كنت بحاجة فقط إلى حل ترجمة بسيط دون تحرير مرئي، فإن Intlayer لا يضيف أي عبء على تطبيقك.

</Question>
<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي المستضاف هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

- [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)

</Question>

</FAQ>

---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: كيفية ترجمة تطبيق Next.js 16 الخاص بك (بدون [locale] في مسار الصفحة) – دليل i18n 2026
description: اكتشف كيفية جعل موقع Next.js 16 متعدد اللغات بدون [locale] في مسار الصفحة. اتبع الوثائق لعمل تدويل (i18n) وترجمته.
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 1.0.0
    date: 2026-01-10
    changes: الإصدار الأولي
---

# ترجمة موقعك Next.js 16 (بدون [locale] في مسار الصفحة) باستخدام Intlayer | التدويل (i18n)

<Tab defaultTab="video">
  <TabItem label="فيديو" value="video">
  
<iframe title="أفضل حل للتدويل (i18n) لـ Next.js؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="كود" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عرض تجريبي على CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

اطّلع على [قالب التطبيق](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) على GitHub.

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة مبتكرة ومفتوحة المصدر للتدويل (i18n) مصممة لتبسيط دعم متعدد اللغات في تطبيقات الويب الحديثة. يتكامل **Intlayer** بسلاسة مع إطار **Next.js 16** الأحدث، بما في ذلك **App Router** القوي. وهي مُحسّنة للعمل مع **Server Components** من أجل عرض فعال ومتوافقة تمامًا مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس تصريحية على مستوى المكوّن.
- **توطين البيانات الوصفية بشكل ديناميكي**، والمسارات، والمحتوى.
- **الوصول إلى الترجمات في مكوّنات جانب العميل وجانب الخادم على حد سواء**.
- **ضمان دعم TypeScript** بأنواع مُولّدة تلقائيًا، مما يحسّن الإكمال التلقائي واكتشاف الأخطاء.
  /// **الاستفادة من ميزات متقدمة** مثل الكشف الديناميكي عن اللغة وتبديلها.

> يتوافق Intlayer مع Next.js 12 و13 و14 و16. إذا كنت تستخدم Next.js Page Router، يمكنك الاطلاع على هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_page_router.md). بالنسبة لـ Next.js 12 و13 و14 مع App Router، اطلع على هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_14.md).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  الحزمة الأساسية التي توفّر أدوات التعريب لإدارة التهيئة، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والـتحويل البرمجي (transpilation)، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **next-intlayer**

الحزمة التي تدمج Intlayer مع Next.js. توفر مزودات السياق (context providers) والـ hooks لدعم التدويل في Next.js. بالإضافة إلى ذلك، تتضمن مكون Next.js الإضافي (plugin) لربط Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، وكذلك بروكسي لاكتشاف لغة المستخدم المفضلة، وإدارة الكوكيز، ومعالجة إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

فيما يلي البنية النهائية التي سننشئها:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> إذا كنت لا تريد توجيه المسارات حسب اللغة، يمكن استخدام intlayer كمزود (provider) أو hook بسيط. راجع [هذا الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_no_locale_path.md) لمزيد من التفاصيل.

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // بقية اللغات الخاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // أو `no-prefix` - مفيد لاكتشاف الوسيط (middleware)
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // بقية اللغات الخاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // أو `no-prefix` - مفيد لاكتشاف الوسيط (middleware)
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // أو `no-prefix` - مفيد لاكتشاف middleware
  },
};

module.exports = config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، وإعادة توجيه البروكسي، وأسماء ملفات تعريف الارتباط، وموقع وامتداد تعريفات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. لقائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Next.js الخاص بك

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* خيارات التكوين هنا */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
// نوع التكوين: NextConfig
const nextConfig = {
  /* خيارات التهيئة هنا */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
// نوع التكوين: NextConfig
const nextConfig = {
  /* خيارات التهيئة هنا */
};

module.exports = withIntlayer(nextConfig);
```

> يُستخدم مكوّن Next.js الإضافي `withIntlayer()` لدمج Intlayer مع Next.js. يضمن بناء ملفات إعلان المحتوى ويقوم بمراقبتها في وضع التطوير. يعرّف متغيرات بيئة Intlayer داخل بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر aliases لتحسين الأداء ويضمن التوافق مع مكونات الخادم.

> دالة `withIntlayer()` هي دالة تُعيد Promise. تتيح تحضير قواميس intlayer قبل بدء عملية البناء. إذا أردت استخدامها مع إضافات (plugins) أخرى، يمكنك انتظارها باستخدام await. مثال:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> إذا رغبت في استخدامه بشكل متزامن، يمكنك استخدام الدالة `withIntlayerSync()`. مثال:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> يكتشف Intlayer تلقائياً ما إذا كان مشروعك يستخدم **webpack** أو **Turbopack** بناءً على وسائط سطر الأوامر `--webpack`، `--turbo`، أو `--turbopack`، وكذلك اعتماداً على إصدار **Next.js** الحالي لديك.
>
> بما أن `next>=16`، إذا كنت تستخدم **Rspack**، يجب عليك إجبار Intlayer صراحةً على استخدام إعداد webpack عن طريق تعطيل Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### الخطوة 4: تعريف مسارات اللغة الديناميكية

أزل كل شيء من `RootLayout` واستبدله بالشيفرة التالية:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### الخطوة 5: أعلن محتواك

قم بإنشاء وإدارة تصريحات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ar: "عنوان المشروع الخاص بي",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ar: "اكتشف منصتنا المبتكرة المصممة لتبسيط سير عملك وزيادة إنتاجيتك.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ar: ["الابتكار", "الإنتاجية", "سير العمل", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      ar: ["الابتكار", "الإنتاجية", "سير العمل", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      ar: "اكتشف منصتنا المبتكرة المصممة لتبسيط سير عملك وزيادة إنتاجيتك.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ar: ["ابتكار", "إنتاجية", "سير العمل", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ar: "عنوان مشروعي",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ar: "اكتشف منصتنا المبتكرة المصممة لتبسيط سير عملك وزيادة الإنتاجية.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ar: ["الابتكار", "الإنتاجية", "سير العمل", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "ar": "عنوان مشروعي",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ar": "اكتشف منصتنا المبتكرة المصممة لتبسيط سير عملك وزيادة الإنتاجية.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
```

    "keywords": {
      "nodeType": "translation",
      "translation": {
        "ar": ["الابتكار", "الإنتاجية", "سير العمل", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }

}
}

````

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ar: "ابدأ بالتعديل",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
````

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// نوع: Dictionary من intlayer
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ar: "ابدأ بالتعديل",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// نوع: Dictionary من intlayer
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ar: "ابدأ بالتعديل",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        ar: "ابدأ بالتحرير",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "ar": "ابدأ بالتحرير",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> يمكن تعريف إعلانات المحتوى (content declarations) في أي مكان داخل تطبيقك طالما أنها موجودة داخل دليل `contentDir` (افتراضيًا `./src`). ويجب أن يتطابق امتداد ملف إعلان المحتوى (افتراضيًا `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 6: استخدام المحتوى في الشيفرة الخاصة بك

الوصول إلى قواميس المحتوى في جميع أنحاء تطبيقك:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
```

      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>

);
};

export default Page;

````

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

- **`IntlayerClientProvider`** يُستخدم لتوفير الـ locale للمكونات على جانب العميل. يمكن وضعه في أي مكوّن أصل (parent component)، بما في ذلك الـ layout. ومع ذلك، يُنصح بوضعه في الـ layout لأن Next.js يشارك كود الـ layout عبر الصفحات، مما يجعله أكثر كفاءة. باستخدام `IntlayerClientProvider` داخل الـ layout، تتجنّب إعادة تهيئته لكل صفحة، مما يحسّن الأداء ويحافظ على سياق التعريب المتسق في تطبيقك.
- **`IntlayerServerProvider`** تُستخدم لتزويد العناصر الفرعية التي تعمل على الخادم بالـ locale. لا يمكن تعيينها في الـ layout.

  > لا يمكن أن يتشارك الـ layout والصفحة نفس سياق الخادم لأن نظام سياق الخادم يعتمد على مخزن بيانات لكل طلب (عبر آلية [React's cache](https://react.dev/reference/react/cache))، مما يجعل كل "context" يُعاد إنشاؤه لأجزاء مختلفة من التطبيق. وضع الـ provider في layout مشترك سيكسر هذا العزل، وسيمنع الانتشار الصحيح لقيم سياق الخادم إلى مكوناتك على الخادم.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // إنشاء تعريف المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
````

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // إنشاء تعريف المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // إنشاء تعريف المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // إنشاء تعريف المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // إنشاء تعريف المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

````jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // إنشاء تعريف المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};

> إذا أردت استخدام المحتوى في سمة من نوع سلسلة مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، على سبيل المثال:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> لمعرفة المزيد عن الـ `useIntlayer` hook، راجع الـ [الوثائق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useIntlayer.md).

### (اختياري) الخطوة 7: تكوين البروكسي لاكتشاف لغة المستخدم المفضلة

قم بإعداد البروكسي لاكتشاف اللغة المفضلة للمستخدم:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
````

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> يُستخدم `intlayerProxy` لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيهه إلى عنوان URL المناسب كما هو موضح في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md). بالإضافة إلى ذلك، يتيح حفظ اللغة المفضلة للمستخدم في ملف تعريف الارتباط (cookie).

> إذا احتجت إلى ربط عدة proxies معًا (على سبيل المثال، `intlayerProxy` مع المصادقة أو proxies مخصصة)، فإن Intlayer يوفر الآن مساعدًا يسمى `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (اختياري) الخطوة 8: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى في Next.js، الطريقة الموصى بها هي استخدام مكوّن Link لإعادة توجيه المستخدمين إلى الصفحة المحلية المناسبة. يتيح مكوّن Link إمكانية التحميل المسبق للصفحة (prefetching)، مما يساعد على تجنّب إعادة تحميل الصفحة بالكامل.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* اللغة - مثال: FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغة نفسها - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة بالترجمة الحالية - مثال: Francés مع تعيين locale الحالي إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - على سبيل المثال: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* اللغة المحلية - مثال: FR */}
              {localeItem}
            </span>
            <span>
              {/* اسم اللغة بلفظها المحلي - مثال: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اسم اللغة باللغة الحالية - مثال: Francés عندما تكون اللغة الحالية Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اسم اللغة بالإنجليزية - مثال: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* اللغة المختصرة - مثال: FR */}
              {localeItem}
            </span>
            <span>
              {/* اسم اللغة في لغتها الأصلية - مثلا Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اسم اللغة بلغة الواجهة الحالية - مثلا Francés عندما تكون الواجهة على Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اسم اللغة بالإنجليزية - مثلا French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> طريقة بديلة هي استخدام الدالة `setLocale` المقدمة من الـ `useLocale` هوك. هذه الدالة لن تسمح بالتحميل المسبق للصفحة. راجع توثيق [`useLocale` هوك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md) لمزيد من التفاصيل.

> مراجع التوثيق:
>
> - [`useLocale` هوك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` هوك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` هوك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` هوك](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` الخاصية](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` الخاصية](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` الخاصية](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` الخاصية](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (اختياري) الخطوة 9: الحصول على اللغة الحالية في Server Actions

إذا احتجت إلى الـ locale النشط داخل Server Action (مثلًا، لتوطين رسائل البريد الإلكتروني أو لتنفيذ منطق يتعامل مع اللغة)، استدعِ `getLocale` من `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // قم بعمل شيء باستخدام المتغير locale
};
```

> تتبع الدالة `getLocale` استراتيجية متدرجة لتحديد لغة المستخدم:
>
> 1. أولاً، تتحقق من request headers عن قيمة locale قد تكون قد تم تعيينها بواسطة proxy
> 2. إذا لم يتم العثور على locale في الرؤوس، فإنها تبحث عن locale مخزنة في cookies
> 3. إذا لم يتم العثور على cookie، تحاول اكتشاف اللغة المفضلة للمستخدم من إعدادات الـ browser
> 4. كملاذ أخير، تعود إلى الـ default locale المكوّن للتطبيق
>
> هذا يضمن اختيار الـlocale الأنسب بناءً على السياق المتاح.

### (اختياري) الخطوة 10: تحسين حجم الحزمة

عند استخدام `next-intlayer`، يتم تضمين القواميس في كل bundle لكل صفحة بشكل افتراضي. لتقليل حجم الـbundle، يوفر Intlayer ملحق SWC اختياري يستبدل استدعاءات `useIntlayer` بذكاء باستخدام الماكروز. هذا يضمن تضمين القواميس فقط في الحزم الخاصة بالصفحات التي تستخدمها فعليًا.

لتمكين هذا التحسين، ثبّت الحزمة `@intlayer/swc`. بمجرد التثبيت، سيكتشف `next-intlayer` الملحق ويستخدمه تلقائيًا:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> ملاحظة: هذا التحسين متاح فقط لـ Next.js 13 والإصدارات الأحدث.

> ملاحظة: هذه الحزمة غير مثبتة افتراضيًا لأن إضافات SWC لا تزال تجريبية في Next.js. قد يتغير ذلك في المستقبل.

> ملاحظة: إذا قمت بتعيين الخيار إلى `importMode: 'dynamic'` أو `importMode: 'live'`، فسيعتمد ذلك على Suspense، لذا سيتوجب عليك تغليف استدعاءات `useIntlayer` ضمن حدّ `Suspense`. هذا يعني أنك لن تتمكن من استخدام `useIntlayer` مباشرةً على المستوى العلوي لمكوّن الصفحة / التخطيط الخاص بك.

### مراقبة تغيّرات القواميس على Turbopack

عند استخدام Turbopack كسيرفر التطوير مع الأمر `next dev`، فلن يتم اكتشاف تغييرات القواميس تلقائيًا افتراضيًا.

يحدث هذا القيد لأن Turbopack لا يستطيع تشغيل ملحقات webpack بالتوازي لمراقبة التغييرات في ملفات المحتوى الخاصة بك. كحل بديل، ستحتاج إلى استخدام الأمر `intlayer watch` لتشغيل كلٍ من سيرفر التطوير ومراقب بناء Intlayer في آنٍ واحد.

```json5 fileName="package.json"
{
  // ... Your existing package.json configurations
  "scripts": {
    // ... Your existing scripts configurations
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> إذا كنت تستخدم next-intlayer@<=6.x.x، تحتاج إلى الاحتفاظ بالعلم `--turbopack` لجعل تطبيق Next.js 16 يعمل بشكل صحيح مع Turbopack. نوصي باستخدام next-intlayer@>=7.x.x لتجنب هذا القيد.

### تكوين TypeScript

يستخدم Intlayer module augmentation للاستفادة من TypeScript وتقوية الـ codebase الخاصة بك.

![الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ في الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن إعدادات TypeScript تتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تهيئة Git

يوصى بتجاهل الملفات المولدة بواسطة Intlayer. يسمح لك هذا بتجنّب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

### امتداد VS Code

لتحسين تجربة التطوير مع Intlayer، يمكنك تثبيت الامتداد الرسمي **Intlayer VS Code Extension**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **Autocompletion** لمفاتيح الترجمة.
- **Real-time error detection** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء التراجمات وتحديثها بسهولة.

للمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع توثيق امتداد Intlayer لـ VS Code: [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

### التوسع

للتوسع، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

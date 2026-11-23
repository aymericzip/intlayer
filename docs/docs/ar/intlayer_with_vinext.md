---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - دليل كامل لترجمة تطبيق Next.js الخاص بك على Vite"
description: "قم بإعداد Intlayer مع vinext، وهو واجهة Next.js البرمجية على Vite: توجيه اللغات عبر proxy.ts، ومكونات الخادم والعميل، وبيانات وصفية مترجمة، وخريطة الموقع، والنشر على Cloudflare Workers."
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "السجل الأولي"
author: aymericzip
---

# ترجم موقع vinext الخاص بك باستخدام Intlayer

يعيد [vinext](https://github.com/cloudflare/vinext) تنفيذ واجهة Next.js البرمجية فوق Vite. يستمر عمل مجلد `app/` واستيرادات `next/*` وملف `proxy.ts` كما هي، لكن عملية البناء تتم عبر Vite بدلاً من Turbopack أو webpack.

يندمج Intlayer في هذا الإعداد عبر حزمتين: `next-intlayer` للـ hooks والـ providers والـ proxy التي تستخدمها مكوناتك بالفعل على Next.js، و`vite-intlayer` لجانب البناء (تجميع القواميس والمراقبة وتحسين الحزمة).

> هل تشغّل Next.js بسلسلة أدواته الخاصة؟ اتبع بدلاً من ذلك [دليل Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md).

- [دليل Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)

## جدول المحتويات

<TOC/>

## لماذا Intlayer بدلاً من البدائل الأخرى؟

مقارنةً بحلول مثل `next-intl` أو `i18next`، يأتي Intlayer بتحسينات مدمجة:

<AccordionGroup>
<Accordion header="مصمم لواجهة Next.js البرمجية على Vite">

يعمل كود `next-intlayer` نفسه على Next.js وعلى vinext. تحلّ مكونات الخادم (Server Components) المحتوى على الخادم، وتقرؤه مكونات العميل (Client Components) عبر الـ provider، ويعمل توجيه اللغات من `proxy.ts` الخاص بك. الانتقال بين سلسلتي الأدوات لا يمس مكوناتك.

</Accordion>
<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة في صفحاتك، حمّل المحتوى الضروري فقط. يستبدل إضافة Vite كل استدعاء لـ `useIntlayer` بالمدخلات التي يستخدمها المكوّن فعلاً، مما **يقلل حجم الحزمة والصفحات حتى 50%**.

</Accordion>
<Accordion header="سهولة الصيانة">

تقسيم المحتوى حسب المكوّن **يبسّط الصيانة** في التطبيقات الكبيرة. يمكنك نسخ أو حذف مجلد ميزة دون مراجعة قاعدة كود المحتوى بالكامل، وIntlayer **مكتوب بالكامل بالأنواع** للحفاظ على دقة المحتوى.

</Accordion>
<Accordion header="وكيل الذكاء الاصطناعي">

وضع المحتوى بجوار المكوّن **يقلل السياق المطلوب** لنماذج LLM. يوفر Intlayer **واجهة سطر أوامر (CLI)** لاختبار الترجمات المفقودة، و**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، و**[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**، و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)
- [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)

</Accordion>
<Accordion header="الأتمتة">

ترجم داخل مسار CI/CD الخاص بك باستخدام نموذج LLM الذي تختاره، على نفقة مزوّد الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضاً **مترجماً برمجياً (compiler)** لأتمتة استخراج المحتوى، و[منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) **للترجمة في الخلفية**.

- [منصة الويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

</Accordion>
<Accordion header="التوسع مع غير المطورين">

يوفر Intlayer **[محرراً مرئياً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) يمكن استضافته ذاتياً** و**[نظام إدارة محتوى كاملاً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)** لإدارة المحتوى متعدد اللغات **في الوقت الفعلي** مع المترجمين وكتّاب المحتوى. يمكن تخزين المحتوى محلياً و/أو عن بُعد.

- [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [نظام إدارة المحتوى الكامل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق vinext

<Steps>
<Step number={1} title="تثبيت الاعتماديات">

ابدأ من مشروع vinext يعمل. لإنشاء مشروع، شغّل `npm create vinext-app@latest`. لترحيل تطبيق Next.js موجود، شغّل `npx vinext init`.

ثم ثبّت Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل: إدارة الإعدادات، والترجمة، و[تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والتحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **next-intlayer**

  يوفر الـ providers والـ hooks والـ proxy لواجهة Next.js البرمجية. يحلّ vinext وحدات `next/navigation` و`next/headers` و`next/server` إلى تنفيذاته الخاصة، لذا يعمل `next-intlayer` دون تعديل.

- **vite-intlayer**

  إضافة Vite التي تبني تعريفات المحتوى الخاصة بك، وتراقبها أثناء التطوير، وتحسّن القواميس في حزمة الإنتاج. تحل محل إضافة Next.js المسماة `withIntlayer()` التي لا يشغّلها vinext.

</Step>
<Step number={2} title="إعداد مشروعك">

اختر ما إذا كان تطبيقك سيستخدم مسارات URL مترجمة (مثل `/en/about` و`/fr/about`) أو سيقدّم المحتوى دون جزء للغة في المسار (مثل `/about`، مع اكتشاف اللغة عبر ملفات تعريف الارتباط أو الترويسات أو معاملات الاستعلام).

<Tabs group="routing-mode">
<Tab label="مع مسار اللغة" value="with-locale-path">

### البنية

تُوضع جميع الصفحات المترجمة داخل الجزء الديناميكي `[locale]`. يُوصى بذلك لتحسين محركات البحث والعرض الثابت، لأن لكل لغة عنوان URL خاصاً بها:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### الإعدادات

أنشئ ملف `intlayer.config.ts` لتعريف اللغات المدعومة:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="بدون مسار اللغة" value="without-locale-path">

### البنية

لا تتضمن المسارات جزء `[locale]`. تقع جميع الصفحات مباشرة تحت `src/app/`، وتأتي اللغة من ملفات تعريف الارتباط أو الترويسات أو معاملات الاستعلام. يناسب هذا لوحات التحكم والتطبيقات المحمية بتسجيل الدخول:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### الإعدادات

اضبط `routing.mode` على `"search-params"` (مثل `/about?locale=fr`) أو `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> يحدد هذا الملف أيضاً إعادة التوجيه في الـ proxy، وأسماء ملفات تعريف الارتباط، وموقع وامتداد تعريفات المحتوى، والسجلات، وغير ذلك. راجع [توثيق الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) للقائمة الكاملة.

- [توثيق الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

</Step>
<Step number={3} title="دمج Intlayer في إعدادات Vite">

أضف إضافة `intlayer()` بجانب `vinext()` في `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> تبني إضافة `intlayer()` قواميسك قبل بدء البناء، وتراقب ملفات المحتوى أثناء التطوير، وتُعدّ الأسماء المستعارة والتحسينات التي يستخدمها `next-intlayer` في بيئات RSC وSSR والعميل.

> يأتي `intlayer()` أيضاً بوسيط (middleware) لتوجيه اللغات لخادم التطوير في Vite. في vinext، يؤدي `src/proxy.ts` هذه المهمة بالفعل، أثناء التطوير وفي بيئة الإنتاج، لذا يعطّل الخيار `ignore` وسيط Vite لتجنب توجيه كل طلب مرتين.

> لا تستخدم `withIntlayer()` في `next.config.ts`. يقرأ vinext الملف `next.config.ts` لخيارات مثل `redirects` و`rewrites` و`headers`، لكنه لا يشغّل إضافات webpack أو Turbopack.

إذا كنت تنشر على Cloudflare Workers، فاحتفظ بإضافة `cloudflare()` التي ينشئها `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => true } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="تعريف مسارات اللغة الديناميكية">

<Tabs group="routing-mode">
<Tab label="مع مسار اللغة" value="with-locale-path">

احذف كل شيء من `RootLayout` واستبدله بالكود التالي:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> يسمح ترك `RootLayout` فارغاً لتخطيط اللغة بتعيين السمتين [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) و[`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) على وسم `<html>`.

أضف تخطيطاً (layout) في مجلد `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> يغطي `IntlayerProvider` واحد نصفي الشجرة: فهو يوفر اللغة لمكونات الخادم ويركّب الـ provider الخاص بالعميل لتحصل مكونات العميل على اللغة نفسها.

> يحمل الجزء `[locale]` اللغة: يتحول `/en-US/about` إلى `en-US`، و`/fr/about` إلى `fr`. لم يعد `src/app/page.tsx` السابق مستخدماً ويمكن حذفه. يقدّم الـ proxy (الخطوة 7) اللغة الافتراضية في الجذر.

> يجعل `generateStaticParams` النظام vinext يعرض مسبقاً كل صفحة لكل لغة. كما يفرض vinext الخيار `dynamicParams`، لذا تُرجع اللغة غير المعروفة خطأ 404 عند تعيين `export const dynamicParams = false`.

</Tab>
<Tab label="بدون مسار اللغة" value="without-locale-path">

لا يوجد مجلد `[locale]`. اضبط `src/app/layout.tsx` ليقرأ اللغة من الطلب ويغلّف تطبيقك بـ `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
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
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="تعريف المحتوى">

أنشئ تعريفات للمحتوى لتخزين ترجماتك:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "ar": "ابدأ بالتعديل",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> يمكن أن توجد تعريفات المحتوى في أي مكان داخل مجلد `contentDir` (افتراضياً `./src`)، طالما تطابق امتداد تعريفات المحتوى (افتراضياً `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [توثيق تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

- [توثيق تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)

</Step>
<Step number={6} title="استخدام المحتوى في الكود">

ادخل إلى قواميسك من أي مكوّن:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` متماثل (isomorphic): شرط التصدير `react-server` الذي يطبقه vinext على بيئة RSC الخاصة به يمنح مكونات الخادم التنفيذ الخاص بالخادم، بينما تحصل مكونات العميل على التنفيذ المعتمد على السياق. يعمل الاستدعاء نفسه في الجانبين.

> لاستخدام المحتوى في خاصية من نوع `string` مثل `alt` أو `title` أو `href` أو `aria-label`، اقرأ قيمته:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> اعرف المزيد في [توثيق `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useIntlayer.md).

- [توثيق `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useIntlayer.md)

> إذا كان تطبيقك موجوداً بالفعل، فإن [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) و[أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) يحوّلان آلاف المكونات في ثانية.

- [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)
- [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)

</Step>
<Step number={7} title="إعداد الـ proxy لاكتشاف اللغة">

يشغّل vinext الملف `proxy.ts` (و`middleware.ts`) مثل Next.js 16، أثناء التطوير وفي الإنتاج، بما في ذلك على Cloudflare Workers. صدّر الـ proxy الخاص بـ Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> يكتشف `intlayerProxy` اللغة المفضلة للمستخدم، ويعيد التوجيه إلى عنوان URL المطابق وفق [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)، ويخزّن اللغة في ملف تعريف ارتباط. كما يمرّر اللغة إلى `getLocale()` والـ hooks الخاصة بالخادم، لذا احتفظ به حتى مع البنية بدون مسار اللغة.

- [الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

> لسلسلة عدة وسطاء proxy (مثلاً `intlayerProxy` مع المصادقة)، استخدم `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="تدويل البيانات الوصفية" isOptional={true}>

يدعم vinext واجهة Metadata. استخدم `generateMetadata` مع `getIntlayer` لترجمة البيانات الوصفية لصفحاتك:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      ar: "تطبيق vinext الخاص بي",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      ar: "تطبيق Next.js يعمل على Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> تُرجع الدالة `getIntlayer` المستوردة من `intlayer` قيماً خاماً جاهزة لكائن البيانات الوصفية. أما الدالة من `next-intlayer` فتغلّفها للمحرر المرئي.

</Step>
<Step number={9} title="تدويل sitemap.xml و robots.txt" isOptional={true}>

يعمل `sitemap.ts` و`robots.ts` كما في Next.js. استخدم `getMultilingualUrls` لسرد كل عنوان URL مترجم:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="تغيير لغة المحتوى" isOptional={true}>

استخدم `next/link` للانتقال إلى الصفحة المترجمة. يحافظ vinext على التنقل من جانب العميل والجلب المسبق (prefetching)، فيتم التبديل دون إعادة تحميل كاملة:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
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
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> مراجع التوثيق:
>
> - [الـ hook ‏`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md)
> - [الدالة `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)
> - [الدالة `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [الدالة `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="إنشاء مكوّن رابط مترجم" isOptional={true}>

يضيف مكوّن `Link` مخصص اللغة الحالية كبادئة إلى عناوين URL الداخلية، فيصل مستخدم فرنسي ينقر على `/about` إلى `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="الحصول على اللغة الحالية في Server Actions" isOptional={true}>

استدعِ `getLocale` من `next-intlayer/server` داخل Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> تقرأ `getLocale` اللغة التي ضبطها الـ proxy في ترويسات الطلب، ثم ملف تعريف ارتباط اللغة، ثم ترويسة `Accept-Language` في المتصفح، وتعود إلى اللغة الافتراضية.

</Step>
<Step number={13} title="النشر على Cloudflare Workers" isOptional={true}>

يجمّع Intlayer القواميس داخل الحزمة وقت البناء، لذا لا يقرأ شيء نظام الملفات أثناء التشغيل ويعمل التطبيق كما هو في workerd. ابنِ وانشر باستخدام CLI الخاص بـ vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> للنشر في مكان آخر (Vercel أو Netlify أو AWS أو Node.js)، أضف إضافة Vite المسماة [Nitro](https://v3.nitro.build/) بجانب `vinext()`، أو عيّن `output: "standalone"` في `next.config.ts`. لا يتغير إعداد Intlayer.

</Step>
<Step number={14} title="استخراج محتوى مكوناتك" isOptional={true}>

في قاعدة كود موجودة، يوفر Intlayer [مترجماً برمجياً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) و[مستخرجاً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) لنقل النصوص المكتوبة مباشرة في الكود إلى تعريفات المحتوى.

- [المترجم البرمجي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)
- [المستخرج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)

فعّل المترجم البرمجي في `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

شغّل المستخرج لتحويل مكوناتك واستخراج المحتوى:

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
 <Tab value='Vite compiler'>

تتضمن إضافة Vite ‏`intlayer()` المترجم البرمجي. بمجرد تعيين `compiler.enabled`، شغّل خادم التطوير أو البناء كالمعتاد:

```bash packageManager="npm"
npm run build # Or npm run dev
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

### إعداد TypeScript

يستخدم Intlayer توسيع الوحدات (module augmentation) لتحديد أنواع مفاتيح المحتوى وقيمه.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

أضف الأنواع المولّدة إلى إعدادات TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### إعدادات Git

تجاهل الملفات التي يولّدها Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### امتداد VS Code

ثبّت **[امتداد Intlayer لـ VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** الرسمي للإكمال التلقائي للمفاتيح، وأخطاء الترجمات المفقودة، والمعاينات المضمنة، والإجراءات السريعة. راجع [توثيق الامتداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md).

- [توثيق الامتداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)

### للمزيد

أضف [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو اجعل محتواك خارجياً عبر [نظام إدارة المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

- [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [نظام إدارة المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)

## الأسئلة الشائعة

<FAQ>

<Question title="ما هو vinext؟">

vinext إضافة Vite مفتوحة المصدر تديرها Cloudflare، وتعيد تنفيذ واجهة Next.js البرمجية العامة: App Router وPages Router، وReact Server Components، وServer Actions، و`proxy.ts`، ومعالجات المسارات (route handlers)، ووحدات `next/*`. يعمل كود Next.js الخاص بك على Vite، ويُنشر أصلياً على Cloudflare Workers أو على منصات أخرى عبر Nitro.

</Question>
<Question title="ما الذي يتغير مقارنةً بإعداد Next.js؟">

فقط تكامل البناء. على Next.js، يغلّف `withIntlayer()` الملف `next.config.ts`. على vinext، تُوضع إضافة `intlayer()` من `vite-intlayer` في `vite.config.ts` بدلاً من ذلك. تبقى الـ providers والـ hooks و`proxy.ts` والبيانات الوصفية وكود خريطة الموقع كما هي، لذا يمكنك اتباع [دليل Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md) لكل ما لا تغطيه هذه الصفحة.

- [دليل Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)

</Question>
<Question title="هل أحتاج إلى إعداد i18n الخاص بـ Next.js أو إضافة SWC؟">

لا. الحقل `i18n` في `next.config.ts` يغطي فقط بادئات اللغة في Pages Router على vinext، ويتولى Intlayer التوجيه بنفسه عبر `proxy.ts`. كما أن إضافة `@intlayer/swc` غير مطلوبة: فإضافة Vite تستبدل استدعاءات `useIntlayer` بالفعل، فلا تشحن كل صفحة سوى القواميس التي تستخدمها. راجع [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

- [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)

</Question>
<Question title="هل أحتاج إلى `intlayer watch` أثناء التطوير؟">

لا. تشغّل إضافة Vite ‏`intlayer()` مراقب المحتوى مع `vite dev`، وتحدّث عملية تعديل المحتوى فورياً المكونات التي تقرأ القاموس المتغير فقط.

</Question>
<Question title="هل يمكنني الانتقال من `next-intl` أو `i18next` دون إعادة كتابة مكوناتي؟">

نعم. اتبع [دليل الانتقال من next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md) أو [دليل الانتقال من i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)، أو احتفظ بواجهتك الحالية عبر [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) التي توفر واجهات `next-intl` و`react-i18next` و`react-intl` مدعومة بقواميس Intlayer.

- [دليل الانتقال من next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md)
- [دليل الانتقال من i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)
- [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)

</Question>
<Question title="هل يجب أن أضع اللغة في عنوان URL مثل /fr/about؟">

لا. يقبل `routing.mode` ما يلي:

- `"prefix-no-default"` (الافتراضي): `/about` للغة الافتراضية، و`/fr/about` للغات الأخرى.
- `"prefix-all"`: كل لغة لها بادئة، `/en/about` و`/fr/about`.
- `"no-prefix"`: لا توجد لغة في المسار، وتُحدد من ملف تعريف الارتباط أو الترويسة.
- `"search-params"`: `/about?locale=fr`.

راجع [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) والبنية بدون مسار اللغة في الخطوة 2.

- [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

</Question>
<Question title="كيف أترجم تطبيقي تلقائياً بالذكاء الاصطناعي؟">

شغّل `npx intlayer fill`. تكتشف واجهة CLI الترجمات المفقودة وتملؤها باستخدام نموذج LLM الذي تختاره، عبر مزوّدك ومفتاح API الخاص بك. راجع [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و[تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

- [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md)
- [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md)

</Question>
<Question title="كيف أكتشف الترجمات المفقودة قبل الإطلاق؟">

شغّل `npx intlayer test` في CI. يفشل البناء عندما ينقص المحتوى لغةً مُعرَّفة. يعرض [امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md) الأخطاء نفسها أثناء الكتابة، وتشير [إضافة ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md) إلى النصوص المكتوبة مباشرة في الكود.

- [امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)
- [إضافة ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)

</Question>
<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم. Intlayer مفتوح المصدر بترخيص Apache 2.0، والمكتبة وCLI والمحرر المرئي والمترجم البرمجي مجانية للاستخدام، بما في ذلك الاستخدام التجاري. نظام إدارة المحتوى المستضاف خدمة مدفوعة اختيارية، ويمكن أيضاً [استضافته ذاتياً](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

- [الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)

</Question>

</FAQ>

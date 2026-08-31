---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "تدويل Next.js - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Next.js متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - المترجم
  - الذكاء الاصطناعي
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "الإصدار الأولي"
author: aymericzip
---

# كيفية جعل تطبيق Next.js الحالي متعدد اللغات (i18n) (دليل i18n 2026)

<Tabs defaultTab="video">
  <Tab label="الفيديو" value="video">

<iframe title="أفضل حل i18n لـ Next.js؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="الشفرة" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox التجريبي - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) على GitHub.

## جدول المحتويات

<TOC/>

## لماذا يصعب تدويل تطبيق موجود بالفعل؟

إذا حاولت يومًا إضافة لغات متعددة إلى تطبيق صُمم للغة واحدة فقط، فأنت تعرف المعاناة. الأمر ليس مجرد "صعب" - إنه ممل. عليك أن تستعرض كل ملف، وتستخرج كل سلسلة نصية، وتنقلها إلى ملفات قواميس منفصلة.

ثم يأتي الجزء المحفوف بالمخاطر: استبدال كل هذا النص بخطافات (hooks) التعليمات البرمجية دون كسر التخطيط أو المنطق. إنه نوع العمل الذي يوقف تطوير الميزات الجديدة لأسابيع ويبدو وكأنه إعادة هيكلة لا تنتهي.

## ما هو مترجم Intlayer؟

تم إنشاء **مترجم Intlayer** لتخطي هذا العمل اليدوي. بدلًا من استخراج السلاسل النصية يدويًا، يقوم المترجم بذلك نيابة عنك. يقوم بفحص الكود الخاص بك، والبحث عن النص، واستخدام الذكاء الاصطناعي لإنشاء القواميس في الخلفية.
بعد ذلك، يقوم بتعديل شفرتك المصدرية أثناء مرحلة البناء (build) لحقن خطافات i18n الضرورية. أساسًا، تستمر في كتابة تطبيقك وكأنه بلغة واحدة، وسيتولى المترجم التحويل متعدد اللغات بصورة تلقائية تماماً.

> وثائق المترجم: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)

### القيود

نظرًا لأن المترجم يقوم بتحليل التعليمات البرمجية وتحويلها (إدراج الخطافات وإنشاء القواميس) في **وقت التجميع** (compile time)، فقد **يؤدي إلى إبطاء عملية البناء** لتطبيقك.

للتخفيف من هذا التأثير أثناء التطوير، يمكنك ضبط المترجم للعمل في وضع [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) أو تعطيله عند عدم الحاجة إليه.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت الحزم اللازمة باستخدام npm:

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
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التهيئة، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والترجمة البرمجية (transpilation)، بالإضافة إلى [أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **next-intlayer**

  الحزمة التي تدمج Intlayer مع Next.js. وتوفر موفري السياق (context providers) والخطافات للتدويل في Next.js. بالإضافة إلى ذلك، تتضمن الملحق لـ Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، ومعالجة إعادة توجيه عناوين URL.

</Step>

<Step number={2} title="تهيئة مشروعك">

قم بإنشاء ملف تهيئة لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.ARABIC],
    defaultLocale: Locales.ARABIC,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * يشير إلى ما إذا كان يجب تمكين المجمّع.
     */
    enabled: true,

    /**
     * دليل الإخراج للقواميس المحسنة.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * أدخل المحتوى فقط في الملف الذي تم إنشاؤه، بدون مفتاح.
     */
    noMetadata: false,

    /**
     * بادئة مفتاح القاموس
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * يشير إلى ما إذا كان يجب حفظ المكونات بعد تحويلها.
     * بهذه الطريقة، يمكن تشغيل المجمّع مرة واحدة فقط لتحويل التطبيق، ثم يمكن إزالته.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "هذا التطبيق هو مثال بسيط لتطبيق خرائط",
  },
};

export default config;
```

> **ملاحظة**: تأكد من إعداد `OPEN_AI_API_KEY` في متغيرات البيئة الخاصة بك.

> من خلال ملف التهيئة هذا، يمكنك إعداد عناوين URL المحلية، وعمليات إعادة توجيه الوكيل، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="دمج Intlayer في تهيئة Next.js الخاصة بك">

قم بتهيئة إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* خيارات تهيئة Next.js اختيارية هنا */};

export default withIntlayer(nextConfig);
```

> يُستخدم ملحق Next.js `withIntlayer()` لدمج Intlayer مع Next.js. وهو يضمن بناء ملفات إعلام المحتوى ومراقبتها في وضع التطوير. يحدد متغيرات بيئة Intlayer داخل بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء ويضمن التوافق التام مع مكونات الخادم.

</Step>

<Step number={4} title="تكوين Babel">

يتطلب مترجم Intlayer استخدام Babel لاستخراج المحتوى الخاص بك وتحسينه. قم بتحديث `babel.config.js` (أو `babel.config.json`) لتضمين إضافات Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

</Step>

<Step number={5} title="اكتشاف اللغة في صفحاتك">

قم بإخلاء محتوى `RootLayout` الخاص بك واستبدله بالمثال التالي:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="ترجمة مكوناتك برمجياً">

مع تمكين المترجم، **لم تعد بحاجة** للإعلان عن قواميس المحتوى يدويًا (مثل ملفات `.content.ts`).

بدلاً من ذلك، يمكنك كتابة المحتوى الخاص بك مباشرةً في شفرتك كتسلسلات نصية (strings) مكتوبة يدوياً. سيقوم Intlayer بتحليل شفرتك المصدرية، وإنشاء الترجمات باستخدام موفر الذكاء الاصطناعي المهيأ، واستبدال السلاسل النصية بمحتوى محلي أثناء خطوة البناء. كل هذا يتم تلقائياً بالكامل.

ما عليك سوى كتابة مكوناتك باستخدام سلاسل نصية ثابتة بلغتك الافتراضية. يتولى المترجم الباقي.

مثال على ما قد تبدو عليه صفحتك:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>ابدأ بالتعديل</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      ar: {
        getStartedByEditing: "ابدأ بالتعديل",
      },
    }
  }
}
```

<Tabs>
  <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerProvider`** يتم تثبيته مرة واحدة، في تخطيط الجذر. يوفر اللغة لكل من مكونات الخادم والعميل، لذا لا تحتاج الصفحات إلى تغليف نفسها.
- بدون قطاع مسار `[locale]`، تأتي اللغة دائمًا من الطلب — رأس `x-intlayer-locale` الذي يعينه وكيل Intlayer، ثم ملف تعريف الارتباط للغة — وهو ما يقرأه خوادم الخادم بمفردها عندما لم يتم تشغيل موفر الخدمة.

</Tabs>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- يُستخدم **`IntlayerClientProvider`** لتوفير اللغة للأبناء في جانب العميل.
- بينما يُستخدم **`IntlayerServerProvider`** لتوفير اللغة للأبناء في جانب الخادم.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

  </Tab>

</Tabs>

</Step>

<Step number={7} title="ملء الترجمات المفقودة" isOptional={true}>

يوفر Intlayer أداة CLI لمساعدتك في ملء الترجمات المفقودة. يمكنك استخدام الأمر `intlayer` لاختبار وملء الترجمات المفقودة من التعليمات البرمجية الخاصة بك.

```bash packageManager="npm"
npx intlayer test         # اختبر ما إذا كانت هناك ترجمات مفقودة
```

```bash packageManager="yarn"
yarn intlayer test         # اختبر ما إذا كانت هناك ترجمات مفقودة
```

```bash packageManager="pnpm"
pnpm intlayer test         # اختبر ما إذا كانت هناك ترجمات مفقودة
```

```bash packageManager="bun"
bun x intlayer test         # اختبر ما إذا كانت هناك ترجمات مفقودة
```

```bash packageManager="npm"
npx intlayer fill         # ملء الترجمات المفقودة
```

```bash packageManager="yarn"
yarn intlayer fill         # ملء الترجمات المفقودة
```

```bash packageManager="pnpm"
pnpm intlayer fill         # ملء الترجمات المفقودة
```

```bash packageManager="bun"
bun x intlayer fill         # ملء الترجمات المفقودة
```

> لمزيد من التفاصيل، راجع [وثائق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/ci.md)

</Step>

<Step number={8} title="تهيئة وكيل التوجيه لاكتشاف اللغة" isOptional={true}>

قم بتهيئة وسيط (middleware) للوكيل لاكتشاف لغة المستخدم المفضلة تلقائياً:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> يستخدم `intlayerProxy` لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيهه إلى عنوان URL المناسب كما هو محدد في [إعدادات ملف التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md). بالإضافة إلى ذلك، فإنه يتيح حفظ لغة المستخدم المفضلة في ملف تعريف ارتباط (cookie).

> منذ Intlayer v9، يحترم هذا الـ middleware خيار `routing.enableProxy` (`true` بشكل افتراضي). اضبط `routing.enableProxy: false` في إعدادك لتحويله إلى pass-through دون إزالة هذا الملف. راجع [ملاحظات إصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md).

</Step>

<Step number={8} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

لتغيير لغة المحتوى في Next.js، الطريقة الموصى بها هي استخدام مكون `Link` لإعادة توجيه المستخدمين إلى الصفحة المحلية المقابلة. يسمح مكون `Link` بالتحميل المسبق (prefetching) للصفحة، مما يساعد على تجنب تحديث الصفحة بالكامل.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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
              {/* اللغة - مثل: AR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها الخاصة - مثل: العربية */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة الحالية - مثل: Francés عندما تكون اللغة الحالية هي Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة بالإنجليزية - مثل: Arabic */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> الطريقة البديلة هي استخدام وظيفة `setLocale` التي يوفرها خطاف `useLocale`. لن تسمح هذه الوظيفة بالتحميل المسبق للصفحة. راجع [وثائق خطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md) لمزيد من التفاصيل.

</Step>

<Step number={10} title="تحسين حجم البندل الخاصة بك" isOptional={true}>

عند استخدام `next-intlayer` ، يتم تضمين القواميس في الحزمة لكل صفحة بشكل افتراضي. لتحسين حجم البندل ، يوفر Intlayer ملحق SWC اختيارياً يستبدل بذكاء استدعاءات `useIntlayer` باستخدام الماكرو. يضمن ذلك تضمين القواميس فقط في حزم الصفحات التي تستخدمها بالفعل.

يقوم المكون الإضافي `@intlayer/babel` بدمج تحسين التجميع بالفعل (انظر `babel.config.js`). لكن المكون الإضافي `@intlayer/swc` أكثر أداءً. إذا قمت بإزالة المكون الإضافي `@intlayer/babel`، يمكنك استخدام المكون الإضافي `@intlayer/swc`.

لتمكين هذا التحسين ، قم بتثبيت حزمة `@intlayer/swc`. بمجرد التثبيت ، سيكتشف `next-intlayer` الملحق ويستخدمه تلقائياً:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> ملاحظة: يتوفر هذا التحسين فقط لـ Next.js 13 وما فوق.

> ملاحظة: لا يتم تثبيت هذه الحزمة بشكل افتراضي لأن ملحقات SWC لا تزال تجريبية في Next.js. قد يتغير هذا في المستقبل.

> ملاحظة: إذا قمت بتعيين الخيار كـ `importMode: 'dynamic'` أو `importMode: 'fetch'` (في تهيئة `dictionary`) ، فسوف يعتمد على Suspense ، لذا سيتعين عليك لف استدعاءات `useIntlayer` بحدود `Suspense`. هذا يعني أنك لن تكون قادرًا على استخدام `useIntlayer` مباشرة في المستوى العلوي لمكون الصفحة / التخطيط الخاص بك.
> </Step>

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

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // استخراج المحتوى من المكونات إلى القواميس
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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
</Step>

</Steps>

### إعداد TypeScript

يستخدم Intlayer ميزة "توسيع الوحدات" (module augmentation) للاستفادة من مزايا TypeScript وجعل قاعدة الكود الخاصة بك أكثر قوة.

![منشئ التعليمات البرمجية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![توضيحات إبراز الخطأ في الكود](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تهيئة TypeScript الخاصة بك تتضمن الأنواع التي تم إنشاؤها تلقائياً.

```json5 fileName="tsconfig.json"
{
  // ... تهيئات TypeScript الحالية
  "include": [
    // ... تهيئات TypeScript الحالية
    ".intlayer/**/*.ts", // تضمين الأنواع المنشأة تلقائياً
  ],
}
```

### تهيئة Git

من المستحسن تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك ، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات المنشأة بواسطة Intlayer
.intlayer
```

### ملحق VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer ، يمكنك تثبيت **ملحق Intlayer الرسمي لـ VS Code**.

[تثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الملحق:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول استخدام الملحق ، راجع [وثائق ملحق Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

### اذهب أبعد من ذلك

للذهاب إلى أبعد من ذلك، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إضفاء الطابع الخارجي على المحتوى الخاص بك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

## الأسئلة الشائعة

<FAQ>

<Question title="ما الذي يفعله مترجم Intlayer؟">

يحلل المترجم كود JSX و TSX الخاص بك في وقت البناء، مستخرجًا تلقائيًا النصوص الموجهة للمستخدم إلى قواميس دون الحاجة لكتابة ملفات محتوى منفصلة يدويًا.

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة (bundle) تطبيق Next.js؟">

أقل بكثير من الحلول القائمة على فضاءات الأسماء (namespaces)، لأن الصفحة لا تُحمّل أبدًا كتالوجًا لا تعرضه. تحل مكونات الخادم المحتوى مباشرة على الخادم، ويستبدل مترجم وقت البناء استدعاءات `useIntlayer` بإدخالات القاموس الدقيقة التي يستخدمها المكون. تقسم [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) الباقي حسب اللغة، مما يقلل الحزمة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يمكنني الانتقال من next-intl أو next-i18next أو i18next دون إعادة كتابة مكوناتي؟">

نعم، هناك مساران. يمكنك ترحيل المحتوى تدريجيًا باستخدام [دليل ترحيل i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md) أو [دليل ترحيل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md). أو يمكنك الاحتفاظ بواجهة برمجة التطبيقات الحالية بالكامل: تكشف [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) نفس واجهات `next-intl` و `i18next` تمامًا ولكنها مدعومة بقواميس Intlayer.

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء على كود JSX و TSX و Vue و Svelte، منشئًا القواميس عند كل تغيير دون الحاجة إلى إدارة المفاتيح يدويًا.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="كيف يقرر المترجم ما هو نص المستخدم؟">

يستخدم المترجم قواعد التحليل الثابت: تُعتبر النصوص الموجودة في عناصر JSX والسمات الشائعة (`aria-label`, `title`, `placeholder`) نصوصًا مترجمة، بينما يتم تجاهل فئات CSS ومعرفات الكود.

</Question>

<Question title="ماذا يحدث للنصوص التي لا يمكن للمترجم رؤيتها؟">

لا يتم التقاط النصوص الديناميكية التي تم إنشاؤها في وقت التشغيل أو استجابات API بواسطة المترجم. بالنسبة لهذه النصوص، يمكنك استخدام `t()` صراحة أو ملفات `.content` القياسية.

</Question>

<Question title="هل يجب أن أستخدم المترجم أم أصرح بالمحتوى بنفسي؟">

لإنشاء النماذج الأولية السريعة، يعد المترجم ملائمًا جدًا. بالنسبة للواجهات المعقدة ذات قواعد الجمع أو التنسيقات الخاصة، توفر ملفات المحتوى الصريحة تحكمًا أدق.

</Question>

<Question title="هل يعمل Intlayer مع مكونات خادم React (RSC)؟">

نعم. يتم حل المحتوى في Server Components مباشرة على الخادم، لذلك لا يتم إرسال أي قواميس إلى العميل للنصوص المعروضة على الخادم. تقرأ مكونات العميل القواميس عبر الموفر (provider).

</Question>

<Question title="كيف أترجم التطبيق تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. تكتشف واجهة CLI الترجمات المفقودة وتملؤها باستخدام نموذج اللغة (LLM) الذي تختاره مع مزودك ومفتاح API الخاص بك. يحد الخيار `--git-diff` العملية على المحتوى المعدل في الفرع الحالي فقط. راجع [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

</Question>

<Question title="هل يدعم Intlayer صيغ الجمع والجنس والنصوص المنسقة؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، [المحتوى القائم على النوع الاجتماعي (gender)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)، [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)، و [المنسقات (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md) للأرقام والتواريخ والعملات.

</Question>

<Question title="كيف يمكن للمترجمين تحرير المحتوى دون لمس الكود؟">

من خلال [المحرر المرئي (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، الذي يسمح لأي شخص بتحرير النصوص مباشرة على التطبيق قيد التشغيل، أو عبر [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، الذي يفصل المحتوى ليتم تحديثه دون الحاجة لإعادة نشر الكود.

</Question>

<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي المستضاف هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>

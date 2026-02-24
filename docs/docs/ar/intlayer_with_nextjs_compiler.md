---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - تحويل تطبيق Next.js الحالي إلى تطبيق متعدد اللغات (دليل i18n 2026)
description: اكتشف كيف تجعل تطبيق Next.js الحالي الخاص بك متعدد اللغات باستخدام مترجم Intlayer. اتبع التوثيق لتدويل (i18n) وترجمة تطبيقك باستخدام الذكاء الاصطناعي.
keywords:
  - التدويل
  - الترجمة
  - التوثيق
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - المترجم
  - الذكاء الاصطناعي
slugs:
  - doc
  - بيئة
  - nextjs
  - مترجم
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: الإصدار الأولي
---

# كيفية جعل تطبيق Next.js الحالي متعدد اللغات (i18n) (دليل i18n 2026)

<Tabs defaultTab="video">
  <Tab label="الفيديو" value="video">
  
<iframe title="أفضل حل i18n لـ Next.js؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="الشفرة" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
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

تم إنشاء **مترجم Intlayer** لتخطي هذا العمل اليدوي الشاق. بدلًا من استخراج السلاسل النصية يدويًا، يقوم المترجم بذلك نيابة عنك. يقوم بفحص الكود الخاص بك، والبحث عن النص، واستخدام الذكاء الاصطناعي لإنشاء القواميس في الخلفية.
بعد ذلك، يقوم بتعديل شفرتك المصدرية أثناء مرحلة البناء (build) لحقن خطافات i18n الضرورية. أساسًا، تستمر في كتابة تطبيقك وكأنه بلغة واحدة، وسيتولى المترجم التحويل متعدد اللغات بصورة تلقائية.

> وثائق المترجم: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md

### القيود

نظرًا لأن المترجم يقوم بتحليل التعليمات البرمجية وتحويلها (إدراج الخطافات وإنشاء القواميس) في **وقت التجميع** (compile time)، فقد **يؤدي إلى إبطاء عملية البناء** لتطبيقك.

للتخفيف من هذا التأثير أثناء التطوير، يمكنك ضبط المترجم للعمل في وضع [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) أو تعطيله عند عدم الحاجة إليه.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Next.js

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التهيئة، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والترجمة البرمجية (transpilation)، بالإضافة إلى [أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **next-intlayer**

  الحزمة التي تدمج Intlayer مع Next.js. وتوفر موفري السياق (context providers) والخطافات للتدويل في Next.js. بالإضافة إلى ذلك، يتضمن البرنامج المساعد لـ Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى وكيل (proxy) لاكتشاف اللهجة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، وتوجيه عناوين URL.

### الخطوة 2: تهيئة مشروعك

قم بإنشاء ملف تهيئة لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // يمكن تعيينه إلى 'build-only' للحد من التأثير في وضع التطوير
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // لا يوجد مبادئة comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "هذا التطبيق هو تطبيق خرائط",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // يمكن تعيينه إلى 'build-only' للحد من التأثير في وضع التطوير
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // لا يوجد مبادئة comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "هذا التطبيق هو تطبيق خرائط",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // يمكن تعيينه إلى 'build-only' للحد من التأثير في وضع التطوير
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // لا يوجد مبادئة comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "هذا التطبيق هو تطبيق خرائط",
  },
};

module.exports = config;
```

> **ملاحظة**: تأكد من إعداد `OPEN_AI_API_KEY` في متغيرات البيئة الخاصة بك.

> من خلال ملف التهيئة هذا، يمكنك إعداد عناوين URL المحلية، وعمليات إعادة توجيه الوكيل، وأسماء ملفات تعريف الارتباط، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة شاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تهيئة Next.js الخاصة بك

قم بتهيئة إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* خيارات التهيئة الخاصة بك هنا */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* خيارات التهيئة الخاصة بك هنا */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* خيارات التهيئة الخاصة بك هنا */
};

module.exports = withIntlayer(nextConfig);
```

> يُستخدم ملحق Next.js `withIntlayer()` لدمج Intlayer مع Next.js. وهو يضمن بناء ملفات إعلام المحتوى ومراقبتها في وضع التطوير. يحدد متغيرات بيئة Intlayer داخل بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء ويضمن التوافق مع مكونات الخادم.

### تكوين Babel

يتطلب مترجم Intlayer استخدام Babel لاستخراج المحتوى الخاص بك وتحسينه. قم بتحديث `babel.config.js` (أو `babel.config.json`) لتضمين إضافات Intlayer:

```js fileName="babel.config.js" codeFormat="commonjs"
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

### الخطوة 4: تحديد توجيهات اللغة الديناميكية

احذف كل شيء من التخطيط الجذري `RootLayout` واستبدله بالكود التالي:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
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
  const locale = await getLocale();
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
  const locale = await getLocale();
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

### الخطوة 5: الإعلان عن المحتوى الخاص بك (تلقائي)

مع تمكين المترجم، **لم تعد بحاجة** للإعلان عن قواميس المحتوى يدويًا (مثل ملفات `.content.ts`).

بدلاً من ذلك، يمكنك كتابة المحتوى الخاص بك مباشرةً في شفرتك كتسلسلات نصية (Strings). سيقوم Intlayer بتحليل شفرتك المصدرية، وإنشاء الترجمات باستخدام موفر الذكاء الاصطناعي المكون الخاص بك، واستبدال السلاسل النصية بالمحتوى المحلي في وقت التجميع.

### الخطوة 6: الاستفادة من المحتوى في كودك

ما عليك سوى كتابة مكوناتك باستخدام سلاسل نصية ثابتة بلغتك الافتراضية. يتولى المترجم الباقي.

مثال على ما قد تبدو عليه صفحتك:

<Tabs>
  <Tab value="Code" label="الكود">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>ابدأ بتعديل</p>
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
  <Tab value="Output" label="المخرجات">

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
        getStartedByEditing: "ابدأ بتعديل",
      },
    }
  }
}
```

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

  </Tab>
</Tabs>

- يتم استخدام **`IntlayerClientProvider`** لتوفير الإعدادات اللغوية למكونات جانب العميل.
- يتم استخدام **`IntlayerServerProvider`** لتوفير الإعدادات اللغوية للعقد الفرعية للخادم.

### (اختياري) الخطوة 7: ملء الترجمات المفقودة

توفر Intlayer أداة CLI لمساعدتك في ملء الترجمات المفقودة. يمكنك استخدام الأمر `intlayer` لاختبار وملء الترجمات المفقودة من التعليمات البرمجية الخاصة بك.

```bash
npx intlayer test         # اختبر ما إذا كانت هناك ترجمات مفقودة
```

```bash
npx intlayer fill         # ملء الترجمات المفقودة
```

### (اختياري) الخطوة 8: تهيئة الوكيل المخصص لاكتشاف اللغة

قم بتشغيل الوكيل المخصص لاكتشاف اللغة المفضلة للمستخدمين:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

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

> يستخدم الوكيل المخصص `intlayerProxy` كوسيلة لاكتشاف اللغة المفضلة للمستخدمين والقيام بـ redirect/إعادة التوجيه إلى عنوان URL المناط بحالتهم ولغتهم مع مراعاة ما حدده المطور في ملف الإعدادات [التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md). كما يُمكّن من الحفاظ على حفظ لغة التفضيل الخاص بهم داخل ملف ارتباط (Cookie).

### (اختياري) الخطوة 9: التبديل بين لغات الموقع

لتغيير اللغة وتكييفها مع بنية Next.js، يُفضل تطبيق ذلك بالاستعانة بمكون الربط لشركة React / Next الذي يحمل اسم `Link` لتحويل العميل بصورة سلسة لتلك الصفحة وتجنب التعطيل الذي يقوم بإعادة طلب الملفات الكاملة للموقع عنوة.

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
              {/* اللغة - مثل: AR */}
              {localeItem}
            </span>
            <span>
              {/* اختيار اللغة  - مثل: العربية */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغات في حالات خاصة / أو حال اللغات الإقليمية - مثل: Arabic  */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* عند وضع واجهة ككل كـ English */}
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
              {/* اللغة - مثل: AR */}
              {localeItem}
            </span>
            <span>
              {/* اختيار اللغة  - مثل: العربية */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغات في حالات خاصة / أو حال اللغات الإقليمية - مثل: Arabic  */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* عند وضع واجهة ككل كـ English */}
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
              {/* اللغة - مثل: AR */}
              {localeItem}
            </span>
            <span>
              {/* اختيار اللغة  - مثل: العربية */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغات في حالات خاصة / أو حال اللغات الإقليمية - مثل: Arabic  */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* عند وضع واجهة ككل كـ English */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> كبديل إن لم تود تفعيل وظائف مكوّن `Link` فتتوفر الخاصية البديلة لك في الخطاف / hook لـ `useLocale` والمُسماه `setLocale`. لمزيدٍ من الوثائق المعمقة تفصيليًا لها بزيارة التوثيق الخاص بالخطاف التالي [دليل المرجع `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md).

### (اختياري) الخطوة 10: فحص واستخدام اللغة المطبقة داخل مهام الخادم

بحال الاستفادة وبناء ميزات تتطلب وظائف Next.js / Server Actions سواء في حالة تفعيل عمليات البريد الإلكتروني وخلافة من عمليات الـ Back-End، ستستخدم بكل بساطة `getLocale` من حزمة `next-intlayer/server` التي ستسهل الأمر.

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // وتضع هُنا عمليتك المطلوبة بناءً على تلك الخاصية.
};
```

> خاصية `getLocale` تُوظّف آلية محددة بناءً على أولويات لكشف أفضل سياق، ألا وهي كالتالي:
>
> 1. يتم كشف معلومات رأس الطلب Http / Headers المرسل.
> 2. يتم فحص محتوى الكوكيز Cookie.
> 3. التخمين الاستباقي للغة بالنظر لتكوينات الموقع والتطبيق.
> 4. حال إخفاق جميع ما ذكر فستأخذ الخيار الأخير من تطبيق اللغة الافتراضية.

### (اختياري) الخطوة 11: ضبط أمثلية أحجام حزمك عبر أداة المحسّن المُسبق

في المعتاد لبيئة Next سيقوم بجلب محتوى بيانات التطبيق بالكامل بحزمة واحده وحشو كل شيء فيها وذلك غير فعّال للتطبيقات المدمجة مع `next-intlayer` في حالة زيادة الترجمات فتُصبح ثقيلة، لهذا ننصح باستخدام نظام الإضافة المدعوم SWC من Next و تحميل أداة التخفيف `@intlayer/swc`. سيجعل ذلك الأمر خفيفًا بتجزئة المعلومات ونزع الأحمال على الخطاف `useIntlayer`:

يتم إضافة حزمة البرنامج المساعد كالتالي للإعداد:

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

> ملاحظات: أداة SWC غير مدمجة بالأساس وتتطلب معمارية Next +13.

> ملاحظات: قد تبقى الأداة SWC المساعدة الخاصة بنا ضمن قيد التجربة والتعديل نظرًا لأن تحديثات أنظمة Next غير مستقرة دائمًا.

> ملاحظات: قد ينبأ Next.js عن أخطاء إن وُضِع مسار البيانات بهيئة ديناميكية "dynamic" أو جلب محتوى "fetch" وذلك في واجهة المكونات الأساسية نظرًا لعدم حيازة المُعالِج لتقنيات الـ `Suspense` التي توفر تأخير طلب واستجلب البيانات، في هذه الحالات حاول تجنب مناداة بيانات متعددة في عناصر المكون الرئيسي (Layoute).

### استخدام بيئة التطوير Turbopack مع المراقبة للمحتوى المتغير للمترجم

يعد نظام التحزيم الأخير الذي وفرته Vercel - باسم Turbopack مقيد بأسباب متعددة تقنية داخل واجهات Webpack مما يجبر على حدوث أعطال في جلب التعديلات الجديدة وتحديث الموقع بصريا أثناء تطوير البرمجيات، يوصى دائمًا بإضافة الأداة / أداة الأمر `intlayer watch`:

```json5 fileName="package.json"
{
  // ... سایر الملف
  "scripts": {
    // ... النصوص الأخرى
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

### تجهيز دعم Typescript بفاعلية

لن يمنح دعم Intlayer وتفاعله في محيط التطوير أقصى أداء إلا مع أداة مساعدة TS (Type module augmentation). حيث يساعد إبراز واكتشاف الأخطاء بوقت التعديل واقتراحاته للترميز:

![معاينة للتعلم الآلي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![توضيحات إبراز الخطأ في الكود](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

لوضع بيئة جاهزة كل ما يُراد إضافته في الإعداد `tsconfig.json` كالتالي:

```json5 fileName="tsconfig.json"
{
  // ... المتغيرات
  "include": [
    // ... متطلبات النظام
    ".intlayer/**/*.ts", // هنا إضافة إعداد النوع الخاص بالنظام Intlayer
  ],
}
```

### تخصيص ملف Git واحترازاته

لا تنسى إضافة المسارات في نظام تتبع النسخ `.gitignore` حتى لا يحمل ويخلق تضارب بين الأجهزة عند الرفع للمسارات المجمّعة في الخلفية من أداة عمل Intlayer.

```plaintext fileName=".gitignore"
# ملف التجاهل الخاص بعمل المستودع
.intlayer
```

### مكون VSCode لإحداث فارق ببرمجياتك

هل اعتدت العمل بالـ IDE؟ يمنحك التوافق والدعم الفائق بتنصيبك الملحقة للمستخدمين: **Intlayer VS Code Extension**.

[بادر وانقر لتحميل ملحق VS Code من هنا.](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

سيعينك على ما يلي:

- **قدرة الاسترجاع والاستكمال** للوصول أسرع لقاموس المحتوى.
- **عرض حي وإشارات تنبيه** لتوجيهك في حال وجد عيب بالترجمات.
- **التلميحات العائمة (Hover previews)**: للتحقق السريع وبلا توقف من الشاشات لمعاينة ما تكتبه من محاور المحتوى.
- **بنية تحرير سهاب** مباشرة بالاعتماد على أدوات إشعار داخلية!

اقرأ بتمعن عن امكانياته الجبارة عبر الوثيقة التالية [طريقة تشغيل الملحق VS Code لبيئة أوفى](https://intlayer.org/doc/vs-code-extension).

### خطوتك الجبارة التالية: الدعم المتطور بلوحات التحكم وغيرها

أنت جاهز لتُقدم ميزات التعديل التبادلي بالموقع! بادر واستشعر الجودة البصرية التي يُمكنك الحصول عليها مع [محرر الويب التفاعلي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) لإنشاء تأثير إداري للمحتوى بلا أخطاء. ولمزيد من القدرات المستقلة عن قاعدة الكود، اطلع واستفد بالتنصيب المتقدم لمستند [Intlayer لوسم الـ CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) الذي سيرسم أفضل طريقة لعرض اللغات بلا استعجال بالتعديل بمركز كود التطبيق المباشر.

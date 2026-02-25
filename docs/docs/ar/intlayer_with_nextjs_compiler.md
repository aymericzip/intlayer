---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - تحويل تطبيق Next.js الحالي إلى تطبيق متعدد اللغات (دليل i18n 2026)
description: اكتشف كيف تجعل تطبيق Next.js الحالي الخاص بك متعدد اللغات باستخدام مترجم Intlayer. اتبع التوثيق لتدويل (i18n) وترجمة تطبيقك باستخدام الذكاء الاصطناعي.
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

تم إنشاء **مترجم Intlayer** لتخطي هذا العمل اليدوي. بدلًا من استخراج السلاسل النصية يدويًا، يقوم المترجم بذلك نيابة عنك. يقوم بفحص الكود الخاص بك، والبحث عن النص، واستخدام الذكاء الاصطناعي لإنشاء القواميس في الخلفية.
بعد ذلك، يقوم بتعديل شفرتك المصدرية أثناء مرحلة البناء (build) لحقن خطافات i18n الضرورية. أساسًا، تستمر في كتابة تطبيقك وكأنه بلغة واحدة، وسيتولى المترجم التحويل متعدد اللغات بصورة تلقائية تماماً.

> وثائق المترجم: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)

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

  الحزمة التي تدمج Intlayer مع Next.js. وتوفر موفري السياق (context providers) والخطافات للتدويل في Next.js. بالإضافة إلى ذلك، تتضمن الملحق لـ Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى وسيط (middleware) لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، ومعالجة إعادة توجيه عناوين URL.

### الخطوة 2: تهيئة مشروعك

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
    enabled: true, // يمكن تعيينه إلى 'build-only' للحد من التأثير في وضع التطوير
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // لا توجد بادئة، الافتراضي هو "comp-"
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

### الخطوة 3: دمج Intlayer في تهيئة Next.js الخاصة بك

قم بتهيئة إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* خيارات تهيئة Next.js اختيارية هنا */
};

export default withIntlayer(nextConfig);
```

> يُستخدم ملحق Next.js `withIntlayer()` لدمج Intlayer مع Next.js. وهو يضمن بناء ملفات إعلام المحتوى ومراقبتها في وضع التطوير. يحدد متغيرات بيئة Intlayer داخل بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء ويضمن التوافق التام مع مكونات الخادم.

### الخطوة 4: تكوين Babel

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

### الخطوة 5: اكتشاف اللغة في صفحاتك

قم بإخلاء محتوى `RootLayout` الخاص بك واستبدله بالمثال التالي:

```tsx fileName="src/app/layout.tsx"
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

### الخطوة 6: ترجمة مكوناتك برمجياً

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

- يُستخدم **`IntlayerClientProvider`** لتوفير اللغة للأبناء في جانب العميل.
- بينما يُستخدم **`IntlayerServerProvider`** لتوفير اللغة للأبناء في جانب الخادم.

### (اختياري) الخطوة 7: ملء الترجمات المفقودة

يوفر Intlayer أداة CLI لمساعدتك في ملء الترجمات المفقودة. يمكنك استخدام الأمر `intlayer` لاختبار وملء الترجمات المفقودة من التعليمات البرمجية الخاصة بك.

```bash
npx intlayer test         # اختبر ما إذا كانت هناك ترجمات مفقودة
```

```bash
npx intlayer fill         # ملء الترجمات المفقودة
```

> لمزيد من التفاصيل، راجع [وثائق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/ci.md)

### (اختياري) الخطوة 8: تهيئة وكيل التوجيه لاكتشاف اللغة

قم بتهيئة وسيط (middleware) للوكيل لاكتشاف لغة المستخدم المفضلة تلقائياً:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> يستخدم `intlayerProxy` لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيهه إلى عنوان URL المناسب كما هو محدد في [إعدادات ملف التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md). بالإضافة إلى ذلك، فإنه يتيح حفظ لغة المستخدم المفضلة في ملف تعريف ارتباط (cookie).

### (اختياري) الخطوة 8: تغيير لغة المحتوى الخاص بك

لتغيير لغة المحتوى في Next.js، الطريقة الموصى بها هي استخدام مكون `Link` لإعادة توجيه المستخدمين إلى الصفحة المحلية المقابلة. يسمح مكون `Link` بالتحميل المسبق (prefetching) للصفحة، مما يساعد على تجنب تحديث الصفحة بالكامل.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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

### (اختياري) الخطوة 10: تحسين حجم الحزمة الخاصة بك

عند استخدام `next-intlayer` ، يتم تضمين القواميس في الحزمة لكل صفحة بشكل افتراضي. لتحسين حجم الحزمة ، يوفر Intlayer ملحق SWC اختيارياً يستبدل بذكاء استدعاءات `useIntlayer` باستخدام الماكرو. يضمن ذلك تضمين القواميس فقط في حزم الصفحات التي تستخدمها بالفعل.

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

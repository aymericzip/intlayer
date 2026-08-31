---
createdAt: 2024-12-06
updatedAt: 2026-06-23
title: "تدويل Next.js 16 - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Next.js 16 متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
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
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "إضافة ذكر لـ `x-default` في كائن `alternates`"
  - version: 7.0.0
    date: 2025-06-29
    changes: "بداية السجل"
author: aymericzip
---

# ترجمة موقع Next.js 16 الخاص بك باستخدام Intlayer | التدويل (i18n)

<Tabs defaultTab="video">
  <Tab label="فيديو" value="video">

<iframe title="أفضل حل i18n لـ Next.js؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="كود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

شاهد [قالب التطبيق](https://github.com/aymericzip/intlayer-next-16-template) على GitHub.

## جدول المحتويات

<TOC/>

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `next-intl` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

<AccordionGroup>

**تغطية Next.js الكاملة**

تم تحسين Intlayer للعمل مع **مكونات الخادم** من أجل العرض الفعال وهو متوافق تمامًا مع [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). إنه لا يمنع العرض الثابت ويوفر برامج وسيطة بالإضافة إلى جميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

> يتوافق Intlayer مع Next.js 12 و13 و14 و15 و16. إذا كنت تستخدم جهاز توجيه الصفحات Next.js، فيمكنك الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> يعد التوجيه المحلي مفيدًا لتحسين محركات البحث وحجم البندل والأداء. إذا لم تكن بحاجة إليه، يمكنك الرجوع إلى هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> بالنسبة إلى Next.js 12 و13 و14 و15 مع جهاز توجيه التطبيقات، راجع هذا [الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

**حجم البندل**

<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

** الصيانة **

<Accordion header="الصيانة">

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

</Accordion>

** وكيل الذكاء الاصطناعي **

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

**الأتمتة**

<Accordion header="الأتمتة">

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
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، والترجمة البرمجية، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **next-intlayer**

  الحزمة التي تدمج Intlayer مع Next.js. توفر موفري السياق وخطافات (hooks) للتدويل في Next.js. بالإضافة إلى ذلك، تتضمن إضافة Next.js لدمج Intlayer مع [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)، بالإضافة إلى وكيل لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه عناوين URL.

</Step>

<Step number={2} title="تكوين مشروعك">

إليك الهيكل النهائي الذي سنقوم بإنشائه:

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
├── package.json
└── tsconfig.json
```

> إذا كنت لا ترغب في توجيه اللغة، يمكن استخدام intlayer كمزود / خطاف بسيط. راجع [هذا الدليل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_no_locale_path.md) لمزيد من التفاصيل.

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // لغات أخرى خاصة بك
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> من خلال ملف التهيئة هذا، يمكنك إعداد عناوين URL محلية، إعادة توجيه البروكسي، أسماء ملفات تعريف الارتباط، موقع وامتداد إعلانات المحتوى الخاصة بك، تعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="دمج Intlayer في تهيئة Next.js الخاصة بك">

قم بتكوين إعداد Next.js الخاص بك لاستخدام Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* خيارات التهيئة هنا */};

export default withIntlayer(nextConfig);
```

> يتم استخدام مكون Next.js الإضافي `withIntlayer()` لدمج Intlayer مع Next.js. يضمن بناء ملفات إعلان المحتوى ومراقبتها في وضع التطوير. كما يحدد متغيرات بيئة Intlayer ضمن بيئات [Webpack](https://webpack.js.org/) أو [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). بالإضافة إلى ذلك، يوفر أسماء مستعارة لتحسين الأداء ويضمن التوافق مع مكونات الخادم.

> دالة `withIntlayer()` هي دالة وعد (Promise). تسمح بتحضير قواميس intlayer قبل بدء البناء. إذا كنت ترغب في استخدامها مع مكونات إضافية أخرى، يمكنك انتظارها باستخدام await. مثال:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> إذا كنت ترغب في استخدامه بشكل متزامن، يمكنك استخدام دالة `withIntlayerSync()`. مثال:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> يكتشف Intlayer تلقائيًا ما إذا كان مشروعك يستخدم **webpack** أو **Turbopack** بناءً على أعلام سطر الأوامر `--webpack` أو `--turbo` أو `--turbopack` ، بالإضافة إلى **إصدار Next.js** الحالي.
>
> منذ `next>=16` ، إذا كنت تستخدم **Rspack** ، فيجب عليك إجبار Intlayer صراحةً على استخدام تكوين webpack عن طريق تعطيل Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="تعريف مسارات اللغة الديناميكية">

قم بإزالة كل شيء من `RootLayout` واستبداله بالكود التالي:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // لا يزال بإمكانك تغليف العناصر الفرعية بمزودين آخرين، مثل `next-themes`، `react-query`، `framer-motion`، إلخ.
  <>{children}</>
);

export default RootLayout;
```

> يتيح ترك مكون `RootLayout` فارغًا تعيين سمات [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) و [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) إلى وسم `<html>`.

لتنفيذ التوجيه الديناميكي، قم بتوفير المسار للغة بإضافة تخطيط جديد في دليل `[locale]` الخاص بك:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> يغطي `IntlayerProvider` الواحد كلا نصفي الشجرة: فهو يزود السياق الخادم المحدد بالطلب والذي تقرأه خطاطيف الخادم، ويثبت موفر العميل حتى تتلقى مكونات العميل نفس اللغة.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> يتم استخدام جزء المسار `[locale]` لتحديد اللغة المحلية. مثال: `/en-US/about` سيشير إلى `en-US` و `/fr/about` إلى `fr`.

> في هذه المرحلة، ستواجه الخطأ: `Error: Missing <html> and <body> tags in the root layout.`. هذا متوقع لأن ملف `/app/page.tsx` لم يعد قيد الاستخدام ويمكن حذفه. بدلاً من ذلك، سيقوم جزء المسار `[locale]` بتنشيط صفحة `/app/[locale]/page.tsx`. ونتيجة لذلك، ستكون الصفحات متاحة عبر مسارات مثل `/en`، `/fr`، `/es` في متصفحك. لتعيين اللغة الافتراضية كصفحة الجذر، راجع إعداد `proxy` في الخطوة 7.

ثم، قم بتنفيذ دالة `generateStaticParams` في تخطيط التطبيق الخاص بك.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // السطر الذي يجب إدراجه

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... بقية الكود */
};

export default LocaleLayout;
```

> يضمن `generateStaticParams` أن يقوم تطبيقك ببناء الصفحات اللازمة مسبقًا لجميع اللغات، مما يقلل من حسابات وقت التشغيل ويحسن تجربة المستخدم. لمزيد من التفاصيل، راجع [توثيق Next.js حول generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> يعمل Intlayer مع `export const dynamic = 'force-static';` لضمان بناء الصفحات مسبقًا لجميع اللغات.

</Step>

<Step number={5} title="إعلان المحتوى الخاص بك">

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
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
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

</Step>

<Step number={6} title="استخدام المحتوى في كودك">

يمكنك الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** يتم تثبيته مرة واحدة، في تخطيط المنطقة الجغرافية. يوفر المنطقة الجغرافية لمكونات الخادم والعميل، لذلك لا تحتاج الصفحات إلى تغليف نفسها.
- تحل hooks الخادم المنطقة الجغرافية بالترتيب التالي: المنطقة الجغرافية المُمررة في موقع الاستدعاء، ثم سياق الخادم المزروع بواسطة المزود، ثم المنطقة الجغرافية المحمولة بواسطة الطلب (رأس `x-intlayer-locale` الذي يعيّنه وكيل Intlayer، ثم ملف تعريف الارتباط للمنطقة الجغرافية). تلك الخطوة الأخيرة هي ما يحافظ على صحة المحتوى أثناء التنقل من جانب العميل الذي يعيد تصيير مقطع الصفحة فقط، حيث لا يعاد تشغيل التخطيط — وبالتالي المزود —.

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

- **`IntlayerClientProvider`** يُستخدم لتوفير اللغة للمكونات على جانب العميل. يمكن وضعه في أي مكون أبوي، بما في ذلك التخطيط (layout). ومع ذلك، يُنصح بوضعه في التخطيط لأن Next.js يشارك كود التخطيط عبر الصفحات، مما يجعله أكثر كفاءة. باستخدام `IntlayerClientProvider` في التخطيط، تتجنب إعادة تهيئته لكل صفحة، مما يحسن الأداء ويحافظ على سياق تعريب متسق في جميع أنحاء تطبيقك.
- **`IntlayerServerProvider`** يُستخدم لتوفير اللغة لأطفال الخادم (server children). لا يمكن تعيينه في التخطيط.

  > لا يمكن للتخطيط والصفحة مشاركة سياق خادم مشترك لأن نظام سياق الخادم يعتمد على مخزن بيانات لكل طلب (عبر آلية [React's cache](https://react.dev/reference/react/cache))، مما يؤدي إلى إعادة إنشاء كل "سياق" لأجزاء مختلفة من التطبيق. وضع المزود في تخطيط مشترك سيكسر هذا العزل، مما يمنع الانتشار الصحيح لقيم سياق الخادم إلى مكونات الخادم الخاصة بك.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان محتوى ذي صلة

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` هو مسار الاستيراد الـ isomorphic: شرط التصدير `react-server` يعطي مكونات الخادم تطبيق الـ ambient-locale، بينما تحصل مكونات العميل على التطبيق المدعوم بالـ context. نفس الاستدعاء يعمل على الجانبين.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // إنشاء إعلان المحتوى المرتبط

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> إذا كنت تريد استخدام المحتوى الخاص بك في خاصية من نوع `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يجب عليك استدعاء قيمة الدالة، مثل:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> لمعرفة المزيد عن الخطاف `useIntlayer`، راجع [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useIntlayer.md).

> إذا كان تطبيقك موجودًا بالفعل، يمكنك استخدام [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)، بالإضافة إلى [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)، لتحويل آلاف المكونات في ثانية واحدة.

</Step>

<Step number={7} title="تكوين الوكيل لاكتشاف اللغة" isOptional={true}>

قم بإعداد وكيل لاكتشاف اللغة المفضلة للمستخدم:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> يُستخدم `intlayerProxy` لاكتشاف اللغة المفضلة للمستخدم وإعادة توجيهه إلى عنوان URL المناسب كما هو محدد في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md). بالإضافة إلى ذلك، يتيح حفظ اللغة المفضلة للمستخدم في ملف تعريف الارتباط (كوكي).

> منذ Intlayer v9، يحترم هذا الـ middleware خيار `routing.enableProxy` (`true` بشكل افتراضي). اضبط `routing.enableProxy: false` في إعداداتك لتحويله إلى pass-through دون حذف هذا الملف. انظر إلى [ملاحظات إصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md).

> إذا كنت بحاجة إلى ربط عدة بروكسيات معًا (على سبيل المثال، `intlayerProxy` مع المصادقة أو بروكسيات مخصصة)، يوفر Intlayer الآن أداة مساعدة تسمى `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="تدويل بيانات التعريف الخاصة بك" isOptional={true}>

في حال رغبتك في تدويل بيانات التعريف الخاصة بك، مثل عنوان الصفحة، يمكنك استخدام دالة `generateMetadata` المقدمة من Next.js. بداخلها، يمكنك استرجاع المحتوى من دالة `getIntlayer` لترجمة بيانات التعريف الخاصة بك.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una تطبيق Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
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
   * ينشئ كائن يحتوي على جميع الروابط لكل لغة.
   *
   * مثال:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // يعيد
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

// ... بقية الكود
````

> لاحظ أن الدالة `getIntlayer` المستوردة من `next-intlayer` تُعيد المحتوى الخاص بك مغلفًا في `IntlayerNode`، مما يسمح بالتكامل مع المحرر البصري. بالمقابل، الدالة `getIntlayer` المستوردة من `intlayer` تُعيد المحتوى الخاص بك مباشرةً بدون خصائص إضافية.

> تعرّف على المزيد حول تحسين بيانات التعريف [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="تعريب ملف sitemap.xml و robots.txt الخاص بك" isOptional={true}>

لتعريب ملفي `sitemap.xml` و `robots.txt`، يمكنك استخدام دالة `getMultilingualUrls` المقدمة من Intlayer. تتيح لك هذه الدالة إنشاء روابط متعددة اللغات لخريطة الموقع الخاصة بك.

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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
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

> تعرّف على المزيد حول تحسين خريطة الموقع [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). تعرّف على المزيد حول تحسين ملف robots.txt [في الوثائق الرسمية لـ Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="تغيير لغة المحتوى الخاص بك" isOptional={true}>

لتغيير لغة المحتوى الخاص بك في Next.js، الطريقة الموصى بها هي استخدام مكون `Link` لإعادة توجيه المستخدمين إلى الصفحة المحلية المناسبة. يتيح مكون `Link` التحميل المسبق للصفحة، مما يساعد على تجنب إعادة تحميل الصفحة بالكامل.

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
            replace // سيضمن أن زر "العودة" في المتصفح يعيد التوجيه إلى الصفحة السابقة
          >
            <span>
              {/* اللغة المحلية - على سبيل المثال FR */}
              {localeItem}
            </span>
            <span>
              {/* اللغة بلغتها المحلية - على سبيل المثال Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* اللغة باللغة المحلية الحالية - على سبيل المثال Francés مع تعيين اللغة المحلية الحالية إلى Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* اللغة باللغة الإنجليزية - على سبيل المثال French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> طريقة بديلة هي استخدام دالة `setLocale` المقدمة من الخطاف `useLocale`. هذه الدالة لن تسمح بتحميل الصفحة مسبقًا. راجع [توثيق الخطاف `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md) لمزيد من التفاصيل.

> يمكنك أيضًا تعيين دالة في خيار `onLocaleChange` لتشغيل دالة مخصصة عند تغيير اللغة.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... بقية الكود

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    التغيير إلى الفرنسية
  </button>
);
```

> مراجع التوثيق:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="إنشاء مكون رابط محلي" isOptional={true}>

للتأكد من أن التنقل في تطبيقك يحترم اللغة الحالية، يمكنك إنشاء مكون `Link` مخصص. يقوم هذا المكون تلقائيًا ببادئة عناوين URL الداخلية باللغة الحالية. على سبيل المثال، عندما ينقر مستخدم يتحدث الفرنسية على رابط لصفحة "حول"، يتم توجيهه إلى `/fr/about` بدلاً من `/about`.

هذا السلوك مفيد لعدة أسباب:

- **SEO وتجربة المستخدم**: تساعد عناوين URL المحلية محركات البحث على فهرسة الصفحات الخاصة باللغة بشكل صحيح وتوفر للمستخدمين محتوى بلغتهم المفضلة.
- **الاتساق**: باستخدام رابط محلي في جميع أنحاء تطبيقك، تضمن بقاء التنقل ضمن اللغة الحالية، مما يمنع تغييرات اللغة غير المتوقعة.
- **قابلية الصيانة**: يؤدي مركزية منطق التعريب في مكون واحد إلى تبسيط إدارة عناوين URL، مما يجعل قاعدة الكود الخاصة بك أسهل في الصيانة والتوسع مع نمو تطبيقك.

أدناه هو تنفيذ مكون `Link` محلي في TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * وظيفة مساعدة للتحقق مما إذا كان عنوان URL المعطى خارجيًا.
 * إذا كان عنوان URL يبدأ بـ http:// أو https:// ، فإنه يعتبر خارجيًا.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * مكون Link مخصص يقوم بتكييف سمة href بناءً على اللغة الحالية.
 * بالنسبة للروابط الداخلية، فإنه يستخدم `getLocalizedUrl` لإلحاق اللغة ببادئة عنوان URL (مثل /fr/about).
 * هذا يضمن بقاء التنقل ضمن نفس سياق اللغة.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // إذا كان الرابط داخليًا وتم توفير href صالح، فاحصل على عنوان URL المحلي.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### كيف يعمل

- **اكتشاف الروابط الخارجية**:  
  تحدد الوظيفة المساعدة `checkIsExternalLink` ما إذا كان عنوان URL خارجيًا. تُترك الروابط الخارجية دون تغيير لأنها لا تحتاج إلى تعريب.

- **استرداد اللغة الحالية**:  
  يوفر الخطاف `useLocale` اللغة الحالية (على سبيل المثال، `fr` للفرنسية).

- **تعريب عنوان URL**:  
  بالنسبة للروابط الداخلية (أي غير الخارجية)، يتم استخدام `getLocalizedUrl` لإلحاق اللغة الحالية ببادئة عنوان URL تلقائيًا. هذا يعني أنه إذا كان مستخدمك يتحدث الفرنسية، فإن تمرير `/about` كـ `href` سيحوله إلى `/fr/about`.

- **إرجاع الرابط**:  
  يعيد المكون عنصر `<a>` مع عنوان URL المحلي، مما يضمن أن التنقل يتوافق مع اللغة.

من خلال دمج مكون `Link` هذا عبر تطبيقك، فإنك تحافظ على تجربة مستخدم متماسكة وواعية باللغة مع الاستفادة أيضًا من تحسين محركات البحث وسهولة الاستخدام.

</Step>

<Step number={12} title="الحصول على اللغة الحالية في Server Actions" isOptional={true}>

إذا كنت بحاجة إلى الإعدادات المحلية النشطة داخل Server Action (على سبيل المثال، لتمكين البريد الإلكتروني أو تشغيل منطق يراعي الإعدادات المحلية)، استدعِ `getLocale` من `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // قم بفعل شيء ما مع اللغة
};
```

> تتبع دالة `getLocale` استراتيجية متسلسلة لتحديد locale المستخدم:
>
> 1. أولاً، تتحقق من رؤوس الطلب (request headers) عن قيمة locale قد تكون قد عينها الوكيل (proxy)
> 2. إذا لم يتم العثور على locale في الرؤوس، تبحث عن locale مخزنة في ملفات تعريف الارتباط (cookies)
> 3. إذا لم يتم العثور على ملف تعريف ارتباط، تحاول الكشف عن اللغة المفضلة للمستخدم من إعدادات المتصفح
> 4. كملاذ أخير، تعود إلى locale الافتراضي المكون في التطبيق
>
> هذا يضمن اختيار locale الأنسب بناءً على السياق المتاح.

</Step>

<Step number={13} title="تحسين حجم الحزمة" isOptional={true}>

عند استخدام `next-intlayer`، يتم تضمين القواميس في الحزمة لكل صفحة بشكل افتراضي. لتحسين حجم الحزمة، يوفر Intlayer مكونًا SWC اختياريًا يستبدل استدعاءات `useIntlayer` بذكاء باستخدام macros. وهذا يضمن أن القواميس يتم تضمينها فقط في الحزم للصفحات التي تستخدمها فعليًا.

لتفعيل هذا التحسين، قم بتثبيت حزمة `@intlayer/swc`. بمجرد التثبيت، سيكتشف `next-intlayer` المكون الإضافي تلقائياً واستخدامه:

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

> ملاحظة: هذا التحسين متاح فقط لـ Next.js 13 والإصدارات الأحدث.

> ملاحظة: لم يتم تثبيت هذه الحزمة بشكل افتراضي لأن مكونات SWC لا تزال تجريبية في Next.js. قد يتغير هذا في المستقبل.

> ملاحظة: إذا قمت بتعيين الخيار على `importMode: 'dynamic'` أو `importMode: 'fetch'` (في تكوين `dictionary`)، فسيعتمد على Suspense، لذا سيتعين عليك التفاف استدعاءات `useIntlayer` الخاصة بك في حد `Suspense` boundary. هذا يعني أنك لن تتمكن من استخدام `useIntlayer` مباشرةً في المستوى الأعلى من مكون Page / Layout الخاص بك.

</Step>

<Step number={14} title="استخراج محتوى مكوناتك" isOptional={true}>

إذا كان لديك codebase موجود، فإن تحويل آلاف الملفات يمكن أن يستغرق وقتاً طويلاً.

لتسهيل هذه العملية، تقترح Intlayer [مُترجم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) / [مُستخرِج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) لتحويل مكوناتك واستخراج المحتوى.

لإعداده، يمكنك إضافة قسم `compiler` في ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... بقية الإعدادات الخاصة بك
  compiler: {
    /**
     * يشير إلى ما إذا كان يجب تفعيل المترجم.
     */
    enabled: true,

    /**
     * يحدد مسار ملفات الإخراج
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * يشير إلى ما إذا كان يجب حفظ المكونات بعد تحويلها.
     *
     * - إذا كانت `true`، سيقوم المترجم بإعادة كتابة ملف المكون على القرص. بحيث يكون التحويل دائمًا، وسيتخطى المترجم التحويل للعملية التالية. بهذه الطريقة، يمكن للمترجم تحويل التطبيق، ثم يمكن إزالته.
     *
     * - إذا كانت `false`، سيقوم المترجم بحقن استدعاء دالة `useIntlayer()` في الكود في مخرجات البناء فقط، والحفاظ على قاعدة الكود الأساسية سليمة. سيتم التحويل فقط في الذاكرة.
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
 <Tab value='Extract command'>

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
 <Tab value='Babel compiler'>

> منذ الإصدار v9، يتم تضمين `intlayerCompiler` في plugin `intlayer`. لذا لا تحتاج إلى إضافته يدويًا.

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
</Step>

</Steps>

### مراقبة تغييرات القواميس في Turbopack

عند استخدام Turbopack كخادم تطوير مع الأمر `next dev --turbopack` ، لن يتم اكتشاف تغييرات القاموس تلقائيًا بشكل افتراضي.

يحدث هذا القيد لأن Turbopack لا يمكنه تشغيل إضافات webpack بالتوازي لمراقبة التغييرات في ملفات المحتوى الخاصة بك. للتغلب على ذلك ، ستحتاج إلى استخدام الأمر `intlayer watch` لتشغيل كل من خادم التطوير ومراقب بناء Intlayer في وقت واحد.

```json5 fileName="package.json"
{
  // ... إعدادات package.json الحالية الخاصة بك
  "scripts": {
    // ... إعدادات البرامج النصية الحالية الخاصة بك
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> إذا كنت تستخدم next-intlayer@<=6.x.x، فيجب عليك الاحتفاظ بعلامة `--turbopack` لكي يعمل تطبيق Next.js 16 بشكل صحيح مع Turbopack. نوصي باستخدام next-intlayer@>=7.x.x لتجنب هذا القيد.

### تكوين TypeScript

يستخدم Intlayer تعزيز الوحدة (module augmentation) للاستفادة من TypeScript وجعل قاعدة الشيفرة الخاصة بك أقوى.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التي تم إنشاؤها تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف عن الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة، راجع [توثيق إضافة Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

### التقدم أكثر

للتقدم أكثر، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات Next.js 16؟">

- **`next-intl`**: مكتبة رسائل شائعة لـ App Router، تُحمل ملفات JSON في وقت التشغيل.
- **`next-i18next`**: الحل التقليدي لـ Pages Router.
- **`Intlayer`**: الحل الأكثر تقدمًا. يُعلن عن المحتوى بجانب المكون، ويُترجم وقت البناء، مع فحص صارم لأنواع TypeScript، وترجمة بالذكاء الاصطناعي، ومحرر مرئي، ونظام CMS.

يضمن الإعلان لكل مكون أن الصفحة تُحمل السلاسل التي تعرضها فقط بدلاً من الكتالوج بأكمله. انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

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

<Question title="ما هي إصدارات Next.js التي يدعمها Intlayer؟">

Next.js 12 و 13 و 14 و 15 و 16. يتم دعم كل من App Router و Pages Router بالكامل.

</Question>

<Question title="هل يعمل Intlayer مع مكونات خادم React (RSC)؟">

نعم. يتم حل المحتوى في Server Components مباشرة على الخادم، لذلك لا يتم إرسال أي قواميس إلى العميل للنصوص المعروضة على الخادم. تقرأ مكونات العميل القواميس عبر الموفر (provider).

</Question>

<Question title="هل يجب تضمين اللغة في مسار URL مثل /ar/about؟">

لا. يقبل `routing.mode` القيمة `"prefix-no-default"` (الافتراضية: `/about` للغة الافتراضية و `/ar/about` للغات الأخرى)، و `"prefix-all"`، و `"no-prefix"`، و `"search-params"`. يعين خيار `routing.domains` كل لغة لنطاقها الخاص. انظر [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Question>

<Question title="كيف أضيف وسوم hreflang والبيانات الوصفية المترجمة لتحسين محركات البحث (SEO)؟">

تغطي خطوات `generateMetadata` و `sitemap.xml` ذلك. تنشئ الدالة `getMultilingualUrls` تعيينات `alternates.languages` لكل لغة معلنة، بما في ذلك `x-default`، مما يساعد محركات البحث على الفهرسة الدقيقة.

</Question>

<Question title="هل أحتاج إلى برمجية وسيطة (middleware)؟">

يكتشف الميدلوير لغة الزائر ويعيد التوجيه إلى البادئة المناسبة، لذلك يوصى به إذا كنت لا تدير التوجيه يدويًا. يتم استبعاد مسارات API والأصول الثابتة تلقائيًا.

</Question>

<Question title="كيف أنشئ مكون رابط مترجم؟">

يلف المكون وسم `Link` القياسي في Next.js ويمرر الرابط عبر `getLocalizedUrl`، لذلك يحصل الرابط `/about` تلقائيًا على بادئة اللغة النشطة مثل `/ar/about`.

</Question>

<Question title="كيف أترجم التطبيق تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. تكتشف واجهة CLI الترجمات المفقودة وتملؤها باستخدام نموذج اللغة (LLM) الذي تختاره مع مزودك ومفتاح API الخاص بك. يحد الخيار `--git-diff` العملية على المحتوى المعدل في الفرع الحالي فقط. راجع [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

</Question>

<Question title="هل يدعم Intlayer صيغ الجمع والجنس والنصوص المنسقة؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، [المحتوى القائم على النوع الاجتماعي (gender)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)، [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)، و [المنسقات (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md) للأرقام والتواريخ والعملات.

</Question>

<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي المستضاف هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>

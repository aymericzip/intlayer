---
createdAt: 2026-04-24
updatedAt: 2026-05-31
title: "تدويل Astro + Vue - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Astro + Vue متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - توثيق
  - Intlayer
  - Astro
  - Vue
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - vue
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 8.7.7
    date: 2026-04-24
    changes: "التوثيق الأولي لـ Astro + Vue"
---

# ترجمة موقع Astro + Vue الخاص بك باستخدام Intlayer | التدويل (i18n)

<Tabs defaultTab="code">
  <Tab label="كود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## جدول المحتويات

<TOC/>

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `astro-i18n` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

** تغطية استرو كاملة **

تم تحسين Intlayer للعمل بشكل مثالي مع Astro من خلال تقديم **توجيه متعدد اللغات** و**خريطة الموقع** وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

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

## دليل خطوة بخطوة لتهيئة Intlayer في Astro + Vue

تحقق من [نموذج التطبيق](https://github.com/aymericzip/intlayer-astro-template) على GitHub.

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت الحزم اللازمة باستخدام مدير الحزم المفضل لديك:

```bash packageManager="npm"
npm install intlayer astro-intlayer vue vue-intlayer @astrojs/vue

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

bun x intlayer init
```

- **intlayer**
  الحزمة الأساسية التي توفر أدوات i18n لإدارة التكوين، الترجمات، [تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

- **astro-intlayer**
  تتضمن إضافة تكامل Astro لربط Intlayer بـ [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط (middleware) لاكتشاف لغة المستخدم المفضلة، وإدارة ملفات تعريف الارتباط (cookies)، والتعامل مع إعادة توجيه الروابط.

- **vue**
  حزمة Vue الأساسية.

- **vue-intlayer**
  حزمة لدمج Intlayer في تطبيقات Vue. توفر `installIntlayer` بالإضافة إلى الـ composables `useIntlayer` و `useLocale` للتدويل في Vue.

- **@astrojs/vue**
  إضافة Astro الرسمية التي تتيح استخدام جزر (islands) مكونات Vue.

</Step>

<Step number={2} title="تهيئة مشروعك">

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ARABIC,
      // لغاتك الأخرى
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> من خلال ملف التكوين هذا، يمكنك تهيئة الروابط المترجمة، وإعادة توجيه الوسيط، وأسماء الكوكيز، وموقع وامتدادات تعريفات المحتوى، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Step>

<Step number={3} title="دمج Intlayer في تكوين Astro الخاص بك">

أضف إضافة `intlayer` وتكامل Vue إلى تكوين Astro الخاص بك.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), vue()],
});
```

> تُستخدم إضافة `intlayer()` لدمج Intlayer مع Astro. وهي تضمن إنشاء ملفات تعريف المحتوى ومراقبتها في وضع التطوير. وتعرّف متغيرات بيئة Intlayer داخل تطبيق Astro وتوفر أسماء مستعارة لتحسين الأداء.

> يتيح تكامل `vue()` استخدام جزر مكونات Vue عبر `client:only="vue"`.

</Step>

<Step number={4} title="تعريف المحتوى الخاص بك">

أنشئ وأدِر تعريفات المحتوى لتخزين الترجمات:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      ar: "مرحبا بالعالم",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> يمكن تعريف تعريفات المحتوى في أي مكان في تطبيقك، طالما أنها مدرجة في `contentDir` (افتراضيًا `./src`) وتطابق امتداد ملف تعريف المحتوى (افتراضيًا `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من المعلومات، راجع [توثيق تعريف المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

</Step>

<Step number={5} title="استخدام المحتوى في Astro">

يمكنك استهلاك القواميس مباشرة في ملفات `.astro` الخاصة بك باستخدام المساعدين الأساسيين المصدرين من `intlayer`. يجب عليك أيضًا إضافة ميتا داتا SEO (مثل hreflang وروابط canonical) لكل صفحة وتقديم جزيرة Vue للمحتوى التفاعلي في جانب العميل.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import VueIsland from "../../components/vue/VueIsland.vue";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- رابط Canonical: يخبر محركات البحث عن النسخة الرئيسية لهذه الصفحة -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: يخبر جوجل عن جميع النسخ المترجمة -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: خيار احتياطي عندما لا تتطابق اللغة مع لغة المستخدم -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- جزيرة Vue تقوم برندر جميع المحتويات التفاعلية بما في ذلك مبدل اللغة -->
    <VueIsland locale={locale} client:only="vue" />
  </body>
</html>
```

> **ملاحظة حول إعداد التوجيه:**
> تعتمد بنية الدليل التي تستخدمها على إعداد `middleware.routing` في `intlayer.config.ts`:
>
> - **`prefix-no-default` (افتراضي):** يحافظ على اللغة الافتراضية في الجذر (بدون بادئة) ويضيف بادئات للغات الأخرى. استخدم `[...locale]` لتغطية جميع الحالات.
> - **`prefix-all`:** تحصل جميع الروابط على بادئة لغة. يمكنك استخدام `[locale]` القياسي إذا كنت لا تحتاج إلى معالجة الجذر بشكل منفصل.
> - **`search-param` أو `no-prefix`:** لا يلزم وجود أدلة لغة. يتم التعامل مع اللغة عبر معلمات الاستعلام أو ملفات تعريف الارتباط.

</Step>

<Step number={6} title="إنشاء مكون جزيرة Vue">

أنشئ مكون جزيرة يلف تطبيق Vue الخاص بك ويستلم اللغة المكتشفة من الخادم. يجب عليك تسجيل إضافة Intlayer في نسخة Vue عن طريق استدعاء `installIntlayer` قبل استخدام أي composables.

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useIntlayer, useLocale, installIntlayer } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

const props = defineProps<{ locale: LocalesValues }>();

const app = getCurrentInstance()?.appContext.app;
if (app) {
  installIntlayer(app, { locale: props.locale });
}

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

const count = ref(0);
const { title } = useIntlayer("app");
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- يتم رندر مبدل اللغة مباشرة داخل قالب الجزيرة -->
    <div class="locale-switcher">
      <span class="switcher-label">تغيير اللغة:</span>
      <div class="locale-buttons">
        <button
          v-for="localeItem in availableLocales"
          :key="localeItem"
          :class="['locale-btn', { active: localeItem === currentLocale }]"
          :disabled="localeItem === currentLocale"
          @click="setLocale(localeItem)"
        >
          <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
          <span class="ls-current-name">{{
            getLocaleName(localeItem, currentLocale)
          }}</span>
          <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
```

> يتم تمرير خاصية `locale` من صفحة Astro (اكتشاف الخادم) وتستخدم لتهيئة `installIntlayer` ، مما يحدد اللغة الأولية لجميع الـ composables داخل الشجرة.

</Step>

<Step number={7} title="إضافة مبدل اللغة">

تتوفر وظيفة تبديل اللغة مباشرة داخل قالب جزيرة Vue (انظر الخطوة 6 أعلاه). وهي تستخدم الـ `useLocale` composable من `vue-intlayer` وتنتقل إلى الرابط المترجم عندما يختار المستخدم لغة جديدة:

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { useLocale } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

// إعادة استخدام نفس واجهة الخاصية (props) / إعداد التطبيق (setup app) كما هو موضح في الخطوة 6...

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    // الانتقال إلى الرابط المترجم عند تغيير اللغة
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});
</script>

<template>
  <div class="locale-switcher">
    <span class="switcher-label">تغيير اللغة:</span>
    <div class="locale-buttons">
      <button
        v-for="localeItem in availableLocales"
        :key="localeItem"
        :class="['locale-btn', { active: localeItem === currentLocale }]"
        :disabled="localeItem === currentLocale"
        @click="setLocale(localeItem)"
      >
        <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
        <span class="ls-current-name">{{
          getLocaleName(localeItem, currentLocale)
        }}</span>
        <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>
```

> **ملاحظة حول الاستمرارية:**
> يضمن استخدام `onLocaleChange` لإعادة التوجيه عبر `window.location.href` زيارة الرابط الجديد للغة، مما يسمح لوسيط Intlayer بتعيين كوكيز اللغة وتذكر تفضيلات المستخدم في الزيارات المستقبلية.

</Step>

<Step number={8} title="خريطة الموقع وRobots.txt">

توفر Intlayer أدوات لإنشاء خريطة موقع مترجمة وملفات robots.txt ديناميكيًا.

#### خريطة الموقع (Sitemap)

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

أنشئ `src/pages/sitemap.xml.ts` لإنشاء خريطة موقع تتضمن جميع مساراتك المترجمة.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

أنشئ `src/pages/robots.txt.ts` للتحكم في زحف محركات البحث.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>

<Step number={15} title="Extract the content of your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer propose a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) to transform your components and extract the content.

To set it up, you can add a `compiler` section in your `intlayer.config.ts` file:

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
     * Indicates if the components should be saved after being transformed.
     *
     * - If `true`, the compiler will rewrite the component file in the disk. So the transformation will be permanent, and the compiler will skip the transformation for the next process. That way, the compiler can transform the app, and then it can be removed.
     *
     * - If `false`, the compiler will inject the `useIntlayer()` function call into the code in the build output only, and keep the base codebase intact. The transformation will be done only in memory.
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

Run the extractor to transform your components and extract the content

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

Update your `vite.config.ts` to include the `intlayerCompiler` plugin:

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

---

</Step>

</Steps>

### تكوين TypeScript

تستخدم Intlayer تقنية توسيع الوحدات (module augmentation) للاستفادة من TypeScript، مما يجعل برمجتك أكثر قوة.

![الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ في الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع المولدة تلقائيًا.

```json5 fileName="tsconfig.json"
{
  // ... تكوين TypeScript الحالي الخاص بك
  "include": [
    // ... تكوين TypeScript الحالي الخاص بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### تكوين Git

يوصى بتجاهل الملفات التي تنشئها Intlayer. هذا يتجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، أضف التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```bash
# تجاهل الملفات المولدة بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **إكمال تلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينة مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من المعلومات حول استخدام الإضافة، راجع [توثيق إضافة VS Code](https://intlayer.org/doc/vs-code-extension).

---

### تعمق أكثر

إذا كنت تريد معرفة المزيد، يمكنك أيضًا تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو استخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) لإخراج محتواك خارجيًا.

---
createdAt: 2025-08-06
updatedAt: 2026-08-06
title: "تدويل Solid Start - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق SolidStart متعدد اللغات (i18n). توجيه اللغة المقدم من الخادم، وhreflang، وخريطة الموقع (sitemap)، والترجمة بمساعدة الذكاء الاصطناعي."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - SolidStart
  - Solid
  - i18n
  - TypeScript
  - Locale Routing
  - Sitemap
slugs:
  - doc
  - environment
  - solid-start
applicationTemplate: https://github.com/aymericzip/intlayer-solid-start-template
history:
  - version: 9.1.3
    date: 2025-08-06
    changes: "السجل الأولي"
author: aymericzip
---

# ترجم موقع SolidStart الخاص بك باستخدام Intlayer | التدويل (i18n)

<Tabs defaultTab="video">
  <Tab label="فيديو" value="video">

<iframe title="أفضل حل تدويل لـ Vite و Solid؟ اكتشف Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="الكود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-solid-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="عَرض CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## جدول المحتويات

<TOC/>

يغطي هذا الدليل تطبيق SolidStart **المقدم عبر الخادم (server-rendered)**: يتم اكتشاف اللغة عند الطلب، وتتم ترجمة الصفحات وعرضها على الخادم باللغة الصحيحة، وتصريحات `<html lang>` و `hreflang` وإشارات sitemap التي تحتاجها محركات البحث يتم إصدارها من جانب الخادم.

## لماذا Intlayer بدلاً من الحلول الأخرى؟

بالمقارنة مع الحلول الرئيسية مثل `@solid-primitives/i18n` أو `i18next`، فإن Intlayer هو حل يأتي مجهّزًا بتحسينات مدمجة مثل:

<AccordionGroup>

<Accordion header="تغطية كاملة لـ Solid">

تم تحسين Intlayer ليعمل بشكل مثالي مع Solid من خلال تقديم **تقسيم محتوى على مستوى المكونات**، و**ترجمات تفاعلية**، وجميع الميزات المطلوبة لتوسيع التدويل (i18n).

</Accordion>

<Accordion header="حجم الحزمة (Bundle size)">

بدلاً من تحميل ملفات JSON ضخمة في صفحاتك، قم بتشغيل المحتوى الضروري فقط. يساعد Intlayer على **تقليل حجم الحزمة والصفحة بنسبة تصل إلى 50%**.

</Accordion>

<Accordion header="إمكانية الصيانة">

يساعد تقسيم محتوى تطبيقك في نطاقات محددة على **تسهيل الصيانة** للتطبيقات واسعة النطاق. يمكنك نسخ أو حذف مجلد ميزة واحدة دون العبء الذهني لمراجعة قاعدة كود المحتوى بالكامل. بالإضافة إلى ذلك، يتميز Intlayer بـ **أنواع كاملة (fully typed)** لضمان دقة محتواك.

</Accordion>

<Accordion header="وكيل الذكاء الاصطناعي">

يؤدي تجميع المحتوى في نفس المكان إلى **تقليل السياق المطلوب** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مع مجموعة من الأدوات، مثل **CLI** للاختبار عن الترجمات المفقودة، و **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، و **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**، و **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة لوكلاء الذكاء الاصطناعي.

</Accordion>

<Accordion header="الأتمتة">

استخدم الأتمتة للترجمة في خط أنابيب CI/CD الخاص بك باستخدام نموذج اللغة الكبير الذي تختاره بتكلفة مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا (compiler)** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

</Accordion>

<Accordion header="الأداء">

قد يؤدي ربط ملفات JSON الضخمة بالمكونات إلى مشاكل في الأداء والتفاعلية. يقدم Intlayer تحسينًا لتحميل المحتوى في وقت البناء (build time).

</Accordion>

<Accordion header="التوسع مع غير المطورين">

أكثر من مجرد حل تدويل (i18n)، يوفر Intlayer **[محررًا مرئيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) مُستضافًا ذاتيًا** و **[نظام إدارة محتوى كامل (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة محتواك متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين وكتّاب المحتوى وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بُعد.

</Accordion>
</AccordionGroup>

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق SolidStart

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

> خيار `--interactive` اختياري. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

> سيقوم هذا الأمر باكتشاف بيئتك وتثبيت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer solid-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer solid-intlayer vite-intlayer
```

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل إدارة التكوين، والترجمة، و[إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)، والتحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **solid-intlayer**

  الحزمة التي تدمج Intlayer مع تطبيق Solid. توفر مزودي السياق (context providers) والخطاطيف (hooks) لتدويل Solid.

- **vite-intlayer**

  تتضمن ملحق Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى معالج توجيه اللغة الذي يكتشف اللغة المفضلة للمستخدم ويدير ملفات الكوكيز ويتعامل مع إعادة توجيه عناوين URL.

> هنا يُعتبر `vite-intlayer` اهتمامًا من جانب الخادم وليس فقط في وقت البناء: فهو يقدم معالج الطلبات الذي يشغله خادم Nitro الخاص بـ SolidStart. إن إبقائه في `dependencies` هو الخيار الآمن والافتراضي — يمكنك نقله إلى `devDependencies` فقط إذا كنت تقوم بنشر مجلد `.output` المجمّع الذي يقحم فيه Nitro المعالج.

</Step>

<Step number={2} title="تكوين مشروعك">

أنشئ ملف تكوين لتكوين لغات تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
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
    mode: "prefix-no-default",
  },
};

export default config;
```

باستخدام `prefix-no-default`، يتم تقديم اللغة الافتراضية من عناوين URL بدون بادئة:

```plaintext
/            /about          → الإنجليزية  (اللغة الافتراضية)
/fr          /fr/about       → الفرنسية
/es          /es/about       → الإسبانية
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL المترجمة، وإعادة توجيه الوسائط (middleware)، وأسماء ملفات تعريف الارتباط (cookies)، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، يرجى الرجوع إلى [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="دمج Intlayer في تكوين Vite الخاص بك">

أضف ملحق Intlayer إلى التكوين الخاص بك:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [solidStart(), nitro(), intlayer()],
});
```

> يقوم ملحق Vite `intlayer()` ببناء ملفات إعلان المحتوى الخاصة بك، ومراقبتها في وضع التطوير، وتحديد متغيرة بيئة Intlayer داخل التطبيق. كما يوفر أسماء مستعارة (aliases) تعمل على تحسين الأداء.

### توجيه اللغة يأتي مع الملحق

يعمل SolidStart على [Nitro](https://nitro.build)، ويسجل `intlayer()` معالج توجيه اللغة الخاص به مباشرةً في خط أنبوب خادم Nitro (عبر خيار `routing.enableProxy`، وهو `true` افتراضيًا). لا داعي لتوصيل أي شيء آخر: في الخادم المجمّع، يتم فحص كل طلب قبل وصوله إلى الموجّه (router)، و

- تُقرأ اللغة من بادئة URL، ثم من ملف تعريف الارتباط `INTLAYER_LOCALE`، ثم تترويسة `Accept-Language`؛
- يتم إعادة توجيه URL غير المزود ببادئة إلى نظيره المترجم عندما لا تكون اللغة المحللة هي اللغة الافتراضية (`/` → `/fr`)؛
- يتم إعادة توجيه URL ذي البادئة المكررة إلى شكله المعياري (`/en/about` → `/about`)؛
- يتم إعادة كتابة ملف تعريف الارتباط الخاص باللغة في الاستجابة.

</Step>

<Step number={4} title="إعلان المحتوى الخاص بك">

أنشئ وادِر إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/contents/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const homeContent = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world!",
      fr: "Bonjour le monde !",
      es: "¡Hola mundo!",
    }),
    metaTitle: "SolidStart + Intlayer",
    metaDescription: t({
      en: "A SolidStart application internationalized with Intlayer.",
      fr: "Une application SolidStart internationalisée avec Intlayer.",
      es: "Una aplicación SolidStart internacionalizada con Intlayer.",
    }),
    documentation: t({
      en: "Visit start.solidjs.com to learn how to build SolidStart apps.",
      fr: "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
      es: "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/contents/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home-page",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello world!",
        "fr": "Bonjour le monde !",
        "es": "¡Hola mundo!"
      }
    },
    "metaTitle": "SolidStart + Intlayer",
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "A SolidStart application internationalized with Intlayer.",
        "fr": "Une application SolidStart internationalisée avec Intlayer.",
        "es": "Una aplicación SolidStart internacionalizada con Intlayer."
      }
    },
    "documentation": {
      "nodeType": "translation",
      "translation": {
        "en": "Visit start.solidjs.com to learn how to build SolidStart apps.",
        "fr": "Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.",
        "es": "Visita start.solidjs.com para aprender a crear aplicaciones SolidStart."
      }
    }
  }
}
```

> ⚠️ **تنبيه خاص بـ SolidStart**: كل ملف `.ts` / `.tsx` تحت `src/routes` يصبح مسارًا، وملف `.content.ts` يحتوي على تصدير افتراضي، لذا سيتم اعتباره صفحة. احتفظ بإعلانات المحتوى لـ **الصفحات** خارج مجلد المسارات (`src/contents/` يعمل بشكل جيد). يمكن أن يظل محتوى **المكونات** في نفس المكان، حيث لا يتم فحص `src/components` بواسطة موجّه نظام الملفات.

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما أنها مضمنة في دليل `contentDir` (افتراضيًا، `./src`)، وتطابق امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> لمزيد من التفاصيل، يُرجى الرجوع إلى [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="إضافة التوجيه المترجم">

الهدف من هذه الخطوة هو إعطاء كل لغة عنوان URL الخاص بها، وهو ما تقوم محركات البحث بفهرسته.

قم بنقل صفحاتك تحت **شريحة ديناميكية اختيارية**. في موجّه نظام الملفات لـ SolidStart، يترجم `[[locale]]` إلى نمط المسار `:locale?`:

```plaintext
src/routes/
  [[locale]].tsx          ← تخطيط للتحقق من الشريحة
  [[locale]]/
    index.tsx             → /        و /fr        و /es
    about.tsx             → /about   و /fr/about  و /es/about
  [...404].tsx            → التقاط شامل لأي شيء آخر
```

المهمة الوحيدة لملف التخطيط هي تقييد الشريحة باللغة المكونة:

```tsx fileName="src/routes/[[locale]].tsx" codeFormat="typescript"
import type { RouteSectionProps } from "@solidjs/router";
import { locales } from "intlayer";

export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
```

يقوم `@solidjs/router` بتوسيع `:locale?` إلى نمطين — أحدهما بالشريحة والآخر بدونها — ويجربها بالترتيب التنازلي للخصائص. `matchFilters` هو ما يصنع الفرق بين الإعداد الناجح والإعداد المربك:

| URL         | بدون `matchFilters`                             | مع `matchFilters`                    |
| ----------- | ----------------------------------------------- | ------------------------------------ |
| `/fr/about` | صفحة حول بالفرنسية                              | صفحة حول بالفرنسية                   |
| `/about`    | صفحة حول (تغلب الشريحة الثابتة)                 | صفحة حول                             |
| `/unknown`  | **الصفحة الرئيسية**، بهدوء، مع `locale=unknown` | لا يوجد تطابق → ينتقل إلى 404 الشامل |

> يفضل استخدام `[locale]` (مطلوب) بدلاً من `[[locale]]` إذا كنت تستخدم وضع التوجيه `'prefix-all'`، واستغنِ عن الشريحة تمامًا بالنسبة لـ `'no-prefix'` أو `'search-params'`.

</Step>

<Step number={6} title="توفير اللغة لتطبيقك">

عنوان URL هو المصدر الوحيد للحقيقة بالنسبة للغة: لقد قام الوسيط بالفعل بإعادة توجيه الطلب إلى مساره المترجم، لذا فإن قراءة المسار في التخطيط الرئيسي تحافظ على توافق العرض من الخادم والتنشيط في العميل (hydration)، وتجعل كل تنقل من جانب العميل يحدّث اللغة تلقائيًا.

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { MetaProvider } from "@solidjs/meta";
import { Router, useLocation } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import { createEffect, type ParentProps, Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { Nav } from "~/components/Nav";
import "./app.css";

const RootLayout = (props: ParentProps) => {
  const location = useLocation();
  const locale = () => getLocaleFromPath(location.pathname) ?? defaultLocale;

  // يعرض الخادم <html> في entry-server.tsx؛
  // يجب على التنقلات بين اللغات من جانب العميل تحديث السمتين بنفسها.
  createEffect(() => {
    if (isServer) return;

    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    <MetaProvider>
      <IntlayerProvider locale={locale()}>
        <Nav />
        <Suspense>{props.children}</Suspense>
      </IntlayerProvider>
    </MetaProvider>
  );
};

export default function App() {
  return (
    <Router root={RootLayout}>
      <FileRoutes />
    </Router>
  );
}
```

> يتفاعل `IntlayerProvider` مع خاصية `locale` الخاصة به، لذا فإن إمرار استدعاء الوصول `locale()` داخل JSX كافٍ — يقوم Solid بتجميعها إلى دالة الحصول (getter)، ويعاد عرض الشجرة بأكملها باللغة الجديدة عند تغيير URL.

</Step>

<Step number={7} title="تعيين تعبيرات lang و dir لـ HTML على الخادم">

يتم عرض العنصر `<html>` بواسطة `entry-server.tsx`، خارج `Router`. اقرأ اللغة من URL الطلب بدلاً من ذلك:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      const url = getRequestEvent()?.request.url ?? "/";
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
```

تتلقى الزواحف (crawlers) الآن اللغة الصحيحة في البايت الأول:

```html
<html dir="ltr" lang="fr"></html>
```

</Step>

<Step number={8} title="استخدام Intlayer في صفحاتك">

الوصول إلى قواميس المحتوى الخاصة بك في جميع أنحاء تطبيقك:

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { Meta, Title } from "@solidjs/meta";
import { useIntlayer } from "solid-intlayer";
import Counter from "~/components/Counter";

export default function Home() {
  const content = useIntlayer("home-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <Meta content={content.metaDescription.value} name="description" />
      <h1>{content.title}</h1>
      <Counter />
      <p>{content.documentation}</p>
    </main>
  );
}
```

> في Solid، يعيد `useIntlayer` محتوى تفاعليًا (مثل `content`). يمكنك الوصول إلى خصائصه مباشرةً.

> إذا كنت تريد استخدام محتواك في خاصية من نوع `string`، مثل `alt`، `title`، `href`، `aria-label`، إلخ، يمكنك استخدام قيمة الدالة، مثل:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> لمعرفة المزيد حول خطاف `useIntlayer`، يُرجى الرجوع إلى [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md).

عقد المحتوى ليست مقتصرة على الترجمات العادية. على سبيل المثال عداد بصيغة الجمع:

```typescript fileName="src/components/Counter.content.ts" codeFormat="typescript"
import { type Dictionary, plural, t } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    clicks: plural({
      one: t({
        en: "{{count}} click",
        fr: "{{count}} clic",
        es: "{{count}} clic",
      }),
      other: t({
        en: "{{count}} clicks",
        fr: "{{count}} clics",
        es: "{{count}} clics",
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("counter");

  return (
    <button onClick={() => setCount(count() + 1)} type="button">
      {content.clicks(count())}
    </button>
  );
}
```

يختار `plural()` الفئة من خلال `Intl.PluralRules` للغة النشطة، لذا فإن اللغات التي تحتوي على أكثر من صيغتي جمع تعمل دون الحاجة إلى أي كود إضافي.

</Step>

<Step number={9} title="إنشاء مكون رابط مترجم">

أنشئ مكون `Link` مخصصًا يضيف تلقائيًا بادئة اللغة الحالية إلى عناوين URL الداخلية:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { ParentComponent } from "solid-js";

export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

```tsx fileName="src/components/Nav.tsx" codeFormat="typescript"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Nav: Component = () => {
  const content = useIntlayer("nav");

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
```

كتابة `href="/about"` مرة واحدة ينتج الآن `/about` أو `/fr/about` أو `/es/about` اعتمادًا على اللغة النشطة — دون الحاجة لإضافة بادئة يدويًا في أي مكان في صفحاتك.

</Step>

<Step number={10} title="إنشاء مكون مبدل اللغة">

عرض المبدل كـ **روابط حقيقية (anchors)** بدلاً من `<select>`: تصبح كل لغة في الصفحة الحالية رابطًا قابلاً للزحف يمكن فتحه في تبويب جديد، وهو ما لا يستطيع التحكم المقتصر على JavaScript تقديمه.

يقوم `getPathWithoutLocale` بإزالة شريحة اللغة من المسار الحالي، ويقوم `getLocalizedUrl` بإعادة بنائها للغة المستهدفة، بحيث تتبع الروابط وضع التوجيه الخاص بك دون إدخال كود ثابت. التنقل هو ما يغير اللغة المعروضة — يشتق مسار `[[locale]]` اللغة من عنوان URL — بينما يحفظ `setLocale` الخيار في ملف تعريف الارتباط `INTLAYER_LOCALE` بحيث تؤدي الزيارة اللاحقة لعنوان URL الخالي من اللغة إلى نفس اللغة.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { A, useLocation } from "@solidjs/router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { useIntlayer, useLocale } from "solid-intlayer";
import { type Component, For } from "solid-js";

export const LocaleSwitcher: Component = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  // المسار المعياري (الخالي من اللغة) للصفحة المعروضة حاليًا
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // التطابق الدقيق فقط، حتى لا يتم تمييز رابط اللغة الافتراضية
              // كنشط في كل صفحة
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // يضمن أن زر "الرجوع" في المتصفح يعود إلى الصفحة السابقة
              replace
            >
              {/* اللغة بلغتها الخاصة - على سبيل المثال Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
```

> في Solid، يعتبر `locale` من `useLocale` هو **وصول إشارة (signal accessor)**. استخدم `locale()` (مع الأقواس) لقراءة قيمته الحالية بشكل تفاعلي.
>
> يعرض `getLocaleName(localeItem)` كل لغة بلغتها الخاصة — `English / Français / Español`. مرر وسيطة ثانية لترجمة الأسماء إلى اللغة المعروضة حاليًا بدلاً من ذلك: `getLocaleName(localeItem, locale())` يعطي `English / French / Spanish` بالإنجليزية، و `anglais / français / espagnol` بالفرنسية.
>
> يقوم `<A>` بالفعل بتعيين `aria-current="page"` على الرابط المطبق على URL الحالي، لذا لا يوجد شيء لإضافته في هذا الشأن. تٌقرأ `replace` من التعبير المعروض بواسطة الموجّه: فهي تستبدل مدخل التارخ بدلاً من إضافته، بحيث يعود زر "الرجوع" في المتصفح إلى الصفحة التي زرتها قبل التبديل بدلاً من الذهاب إلى نفس الصفحة باللغة السابقة.
>
> تضمن `dir` و `hreflang` في كل رابط التوجيه الصحيح لأسماء اللغات من اليمين إلى اليسار وتخبر التقنيات المساعدة والزواحف باللغة التي يشير إليها كل رابط.
>
> لمعرفة المزيد حول خطاف `useLocale`، يُرجى الرجوع إلى [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="إصدار روابط canonical و hreflang" isOptional={true}>

تخبر التوضيحات `hreflang` محركات البحث أن `/about` و `/fr/about` و `/es/about` هي نفس الصفحة بلغات مختلفة. يقوم `getMultilingualUrls` بإنشائها من المسار المعياري (الخالي من اللغة) متبعًا وضع التوجيه الخاص بك، بحيث لا يلزم إدخال أي كود ثابت:

```tsx fileName="src/components/AlternateLinks.tsx" codeFormat="typescript"
import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from "intlayer";
import { type Component, For } from "solid-js";

export type AlternateLinksProps = {
  /** عنوان URL المطلق للصفحة التي يتم عرضها. */
  url: string;
};

export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
```

قم بعرضه في رأس المستند (head)، حيث يكون عنوان URL للطلب متاحًا:

```tsx fileName="src/entry-server.tsx" codeFormat="typescript"
import { AlternateLinks } from "~/components/AlternateLinks";

// … داخل <head>، بجوار وسوم meta الأخرى:
<AlternateLinks url={url} />;
```

يقوم `GET /fr/about` بعد ذلك بتقديم:

```html
<link href="https://example.com/fr/about" rel="canonical" />
<link href="https://example.com/about" hreflang="en" rel="alternate" />
<link href="https://example.com/fr/about" hreflang="fr" rel="alternate" />
<link href="https://example.com/es/about" hreflang="es" rel="alternate" />
<link href="https://example.com/about" hreflang="x-default" rel="alternate" />
```

> **ملاحظة حول `@solidjs/meta`**: في وقت كتابة هذا الدليل، يتم تطبيق `<Title>` و `<Meta>` من `@solidjs/meta` على العميل بعد التنشيط ولكن **لا يتم** إرسالها إلى `<head>` المعروض من الخادم في SolidStart v2. حتى يتم إصلاح ذلك في المستقبل، قم بعرض الوسوم التي يجب أن تراها الزواحف بدون JavaScript — `canonical` و `hreflang` وإذا لزم الأمر `title` / `description` — مباشرة في `entry-server.tsx`، كما هو موضح أعلاه.

</Step>

<Step number={12} title="إدارة صفحات غير الموجودة (404)" isOptional={true}>

يلتقط مسار splat في جذر `src/routes` كل مسار لم تطابقه شريحة اللغة — بما في ذلك بادئات اللغة غير الصالحة التي يرفضها `matchFilters`. نظرًا لأن اللغة ما زالت تأتي من URL عبر التخطيط الرئيسي، يتم عرض صفحة 404 بلغة الزائر:

```tsx fileName="src/routes/[...404].tsx" codeFormat="typescript"
import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "~/components/LocalizedLink";

export default function NotFound() {
  const content = useIntlayer("not-found-page");

  return (
    <main>
      <Title>{content.metaTitle.value}</Title>
      <HttpStatusCode code={404} />
      <h1>{content.title}</h1>
      <LocalizedLink href="/">{content.backHome}</LocalizedLink>
    </main>
  );
}
```

| الطلب             | النتيجة                              |
| ----------------- | ------------------------------------ |
| `/xx`             | `404` — `xx` ليست لغة مكونة          |
| `/nonexistent`    | `404` باللغة الافتراضية              |
| `/fr/nonexistent` | `404` بالفرنسية (`Page introuvable`) |

</Step>

<Step number={13} title="إنشاء خريطة موقع (sitemap) متعددة اللغات" isOptional={true}>

منشئ sitemap الخاص بـ Intlayer يوسع كل مسار إلى إدخال واحد لكل لغة ويربط بدائل `xhtml:link` بينها، لذلك يتعين على المسار فقط إدراج المسارات المعيارية الخالية من اللغة.

> على عكس المنشئات الأساسية التي تصدر فقط عناوين URL مسطحة، يربط Intlayer روابط ثنائية الاتجاه بين كل متغير مترجم لكل صفحة، مما يساعد محركات البحث على ربط عناوين URL المترجمة وتقديم العنوان الصحيح للجمهور المناسب.

يحول SolidStart الملف الذي يصدر طريقة HTTP إلى مسار API، ويزيل امتداد `.ts` من المسار — لذلك يتم تقديم `src/routes/sitemap.xml.ts` عند `/sitemap.xml`:

```typescript fileName="src/routes/sitemap.xml.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { APIEvent } from "@solidjs/start/server";
import { generateSitemap } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

export const GET = (_event: APIEvent) => {
  const sitemap = generateSitemap(
    [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
    ],
    { siteUrl: SITE_URL }
  );

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

```xml fileName="output of GET /sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>https://example.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/about"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/about"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/about"/>
  </url>
</urlset>
```

> لا تدعم مسارات API المعلمات الاختيارية، لذا احتفظ بهذا الملف في جذر `src/routes`، خارج شريحة `[[locale]]`. تحتوي خريطة الموقع بالفعل على كل لغة.

يمكنك بناء `robots.txt` بنفس الطريقة باستخدام `getMultilingualUrls`، بحيث تغطي إدخالات `Disallow` كل إملاء مترجم لمسار حساس:

```typescript fileName="src/routes/robots.txt.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const disallowedPaths = ["/admin", "/private"].flatMap((path) =>
  Object.values(getMultilingualUrls(path))
);

export const GET = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      ...disallowedPaths.map((path) => `Disallow: ${path}`),
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  );
```

</Step>

<Step number={14} title="استرداد اللغة في دوال الخادم الخاص بك" isOptional={true}>

قد ترغب في الوصول إلى اللغة الحالية من داخل دالة خادم أو مسار API.

في إعداد قائم على البادئة مثل هذا الإعداد، **عنوان URL هو السلطة الإلزامية**: يقرا `getLocaleFromPath` البادئة من URL الطلب. `getLocale` هو الحل الاحتياطي للطلبات التي لا تحمل بادئة لغة — فهو يفحص ملف تعريف الارتباط `INTLAYER_LOCALE`، ثم ترويسة `x-intlayer-locale`، ثم يتفاوض على `Accept-Language`.

```tsx fileName="src/routes/[[locale]]/index.tsx" codeFormat="typescript"
import { createAsync } from "@solidjs/router";
import { getCookie, getIntlayer, getLocale, getLocaleFromPath } from "intlayer";
import { getRequestEvent } from "solid-js/web";

const loadLocalizedData = async () => {
  "use server";

  const request = getRequestEvent()?.request;

  const locale =
    getLocaleFromPath(request?.url) ??
    (await getLocale({
      // الحصول على ملف تعريف الارتباط من الطلب (افتراضيًا: 'INTLAYER_LOCALE')
      getCookie: (name) =>
        getCookie(name, request?.headers.get("cookie") ?? ""),
      // الحصول على الترويسة من الطلب (افتراضيًا: 'x-intlayer-locale')،
      // والرجوع إلى تفاوض Accept-Language
      getHeader: (name) => request?.headers.get(name) ?? undefined,
    }));

  // استرداد بعض المحتوى خارج المكون باستخدام getIntlayer()
  const content = getIntlayer("home-page", locale);

  return { locale, title: String(content.title) };
};

export default function Page() {
  const data = createAsync(() => loadLocalizedData());

  return <p>{data()?.title}</p>;
}
```

> لا تعتمد على `getLocale` بمفرده هنا: يتم كتابة ملف تعريف الارتباط الخاص باللغة فقط بمجرد أن يغير الزائر اللغة بنشاط، لذا فإن الزيارة الأولى لـ `/fr/...` ستقوم بالتحليل إلى اللغة الافتراضية.

</Step>

<Step number={15} title="استخراج محتوى مكوناتك" isOptional={true}>

إذا كان لديك قاعدة كود حالية، فقد يكون تحويل آلاف الملفات مستهلكًا للوقت.

لتسهيل هذه العملية، يقدم Intlayer [مترجمًا (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) / [أداة استخراج (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md) لتحويل مكوناتك واستخراج المحتوى.

لإعداده، يمكنك إضافة قسم `compiler` في ملف `intlayer.config.ts` الخاص بك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... باقي التكوين الخاص بك
  compiler: {
    /**
     * يحدد ما إذا كان ينبغي تفعيل المترجم.
     */
    enabled: true,

    /**
     * يحدد مسار ملفات المخرجات
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * يحدد ما إذا كان ينبغي حفظ المكونات بعد تحويلها.
     *
     * - إذا كان `true`، سيقوم المترجم بإعادة كتابة ملف المكون على القرص. وبالتالي سيكون التحويل دائمًا، وسيتجاوز المترجم التحويل في العملية التالية. بهذه الطريقة، يمكن للمترجم تحويل التطبيق، ثم إزالته.
     *
     * - إذا كان `false`، سيقوم المترجم بإقحام استدعاء الدالة `useIntlayer()` في الكود في مخرجات البناء فقط، ويحافظ على قاعدة الكود الأساسية كما هي. سيتم إجراء التحويل في الذاكرة فقط.
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

قم بتشغيل أداة الاستخراج لتحويل مكوناتك واستخراج المحتوى

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

> قم بنقل ملفات المحتوى المنشأة لصفحاتك خارج `src/routes` بعد ذلك، للسبب الموضح في الخطوة 5.

 </Tab>
 <Tab value='مترجم Babel'>

> منذ الإصدار v9، تم تضمين `intlayerCompiler` في ملحق `intlayer`. لذا لا تحتاج إلى إضافته يدويًا.

قم بتحديث `vite.config.ts` الخاص بك ليتضمن ملحق `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    solidStart({ middleware: "src/middleware.ts" }),
    nitro(),
    intlayer(),
    intlayerCompiler(), // يضيف ملحق المترجم
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

</Step>

<Step number={16} title="تكوين TypeScript">

يستخدم Intlayer زيادة النماذج (module augmentation) للاستفادة من مزايا TypeScript وجعل قاعدة الكود الخاصة بك أكثر قوة.

تأكد من أن تكوين TypeScript الخاص بك يتضمن الأنواع التلقائية المنشأة:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... التكوينات الحالية الخاصة بك
  },
  include: [
    "src",
    "*.ts",
    ".intlayer/**/*.ts", // تضمين الأنواع المنشأة تلقائيًا
  ],
}
```

مفاتيح القاموس ومسارات المحتوى يتم فحصها الآن في وقت التجميع (compile time):

```tsx
useIntlayer("home-page"); // ✅
useIntlayer("hom-page"); // ❌ Argument of type '"hom-page"' is not assignable to parameter of type 'keyof __DictionaryRegistry'
```

</Step>

</Steps>

---

## التحقق من الإعداد الخاص بك

قم ببناء الخادم وتشغيله، ثم تحقق من أن هذه الطلبات تعمل كما هو متوقع:

```bash
npm run build
node .output/server/index.mjs
```

| الطلب                                              | الاستجابة المتوقعة                     |
| -------------------------------------------------- | -------------------------------------- |
| `GET /`                                            | `200` — الإنجليزية                     |
| `GET /` مع `Accept-Language: fr`                   | `302` → `/fr`                          |
| `GET /` مع ملف تعريف الارتباط `INTLAYER_LOCALE=es` | `302` → `/es`                          |
| `GET /fr`                                          | `200` — الفرنسية, `<html lang="fr">`   |
| `GET /fr/about`                                    | `200` — صفحة حول بالفرنسية             |
| `GET /en/about`                                    | `302` → `/about` (إعادة توجيه معيارية) |
| `GET /xx`                                          | `404`                                  |
| `GET /fr/nonexistent`                              | `404` بالفرنسية                        |
| `GET /sitemap.xml`                                 | `200` — خريطة موقع XML متعددة اللغات   |

تعمل الصفوف التي تعرض صفحة بشكل مماثل تحت `vite dev`. تنطبق صفوف إعادة التوجيه الثلاثة فقط على خادم مجمّع ما لم تقم بتسجيل المعالج كوسيط بنفسك — انظر الخطوة 3.

> قم بتشغيل خادم التطوير على Node (`vite dev`) بدلاً من Bun (`bun --bun vite dev`): يفشل SSR الخاص بـ SolidStart حاليًا تحت بيئة تشغيل Bun مع الخطأ `Expected a Response object, but received 'NodeResponse'`. هذا غير مرتبط بـ Intlayer — يتم تكراره في القالب العادي — ويؤثر فقط على خادم التطوير، وليس على `vite build`.

---

## تكوين Git

يُوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب إرسالها إلى مستودع Git الخاص بك.

لقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات المنشأة بواسطة Intlayer
.intlayer
```

---

## إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **إضافة Intlayer الرسمية لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

تقدم هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة (inline)** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

---

## التعمق أكثر

للتعمق أكثر، يمكنك تطبيق [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) أو إخراج محتواك إلى الخارج باستخدام [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## مراجع التوثيق

- [توثيق Intlayer](https://intlayer.org)
- [توثيق SolidStart](https://start.solidjs.com)
- [خطاف useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useIntlayer.md)
- [خطاف useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/solid-intlayer/useLocale.md)
- [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

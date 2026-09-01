---
createdAt: 2025-11-20
updatedAt: 2026-06-23
title: "تدويل SvelteKit - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق SvelteKit متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - SvelteKit
  - جافا سكريبت
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "بدء التاريخ"
author: aymericzip
---

# ترجمة موقع SvelteKit الخاص بك باستخدام Intlayer | التدويل (i18n)

<Tabs defaultTab="code">
  <Tab label="كود" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="تجربة" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="تجربة - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## جدول المحتويات

<TOC/>

## لماذا Intlayer على البدائل؟

بالمقارنة مع الحلول الرئيسية مثل `svelte-i18n` أو `i18next`، يعد Intlayer حلاً يأتي مزودًا بتحسينات متكاملة مثل:

<AccordionGroup>
<Accordion header="تغطية SvelteKit الكاملة">

تم تحسين Intlayer للعمل بشكل مثالي مع SvelteKit من خلال تقديم **توجيه متعدد اللغات**، **دعم SSR**، وجميع الميزات اللازمة لتوسيع نطاق التدويل (i18n).

</Accordion>

<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة إلى صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعد Intlayer **في تقليل أحجام البندل وصفحاتك بنسبة تصل إلى 50%**.

</Accordion>

<Accordion header="قابلية الصيانة">

يؤدي تحديد نطاق محتوى تطبيقك ** إلى تسهيل الصيانة ** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزات واحد دون العبء العقلي لمراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تتم كتابة Intlayer **بالكامل** لضمان دقة المحتوى الخاص بك.

</Accordion>

<Accordion header="وكيل الذكاء الاصطناعي">

يؤدي تحديد موقع المحتوى المشترك ** إلى تقليل السياق المطلوب ** بواسطة نماذج اللغات الكبيرة (LLMs). يأتي Intlayer أيضًا مزودًا بمجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة،**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة للذكاء الاصطناعي وكلاء.

</Accordion>

<Accordion header="الأتمتة">

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. يقدم Intlayer أيضًا **مترجمًا** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

</Accordion>

<Accordion header="أداء">

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى حدوث مشكلات في الأداء والتفاعل. يعمل Intlayer على تحسين تحميل المحتوى الخاص بك في وقت الإنشاء.

</Accordion>

<Accordion header="التحجيم مع عدم وجود مطور">

أكثر من مجرد حل i18n، يوفر Intlayer **[محررًا مرئيًا] مستضافًا ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** و**[كامل CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين ومؤلفي النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بعد.

</Accordion>
</AccordionGroup>

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق SvelteKit

انظر إلى [Application Template](https://github.com/aymericzip/intlayer-sveltekit-template) على GitHub.

للبدء، أنشئ مشروع SvelteKit جديد. إليك الهيكل النهائي الذي سننشئه:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

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
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**: الحزمة الأساسية للترجمة الدولية (i18n).
- **svelte-intlayer**: يوفر موفري السياق والمخازن لـ Svelte/SvelteKit.
- **vite-intlayer**: إضافة Vite لدمج إعلانات المحتوى مع عملية البناء.

</Step>

<Step number={2} title="تكوين مشروعك">

قم بإنشاء ملف تكوين في جذر مشروعك:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="دمج Intlayer في تكوين Vite الخاص بك">

قم بتحديث ملف `vite.config.ts` الخاص بك ليشمل إضافة Intlayer. تتولى هذه الإضافة تحويل ملفات المحتوى الخاصة بك.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // ترتيب الإضافات مهم، يجب وضع Intlayer قبل SvelteKit
});
```

</Step>

<Step number={4} title="إعلان المحتوى الخاص بك">

قم بإنشاء ملفات إعلان المحتوى في أي مكان داخل مجلد `src` الخاص بك (مثلًا، `src/lib/content` أو بجانب مكوناتك). تقوم هذه الملفات بتعريف المحتوى القابل للترجمة لتطبيقك باستخدام دالة `t()` لكل لغة.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="استخدام Intlayer في مكوناتك">

الآن يمكنك استخدام دالة `useIntlayer` في أي مكون Svelte. تُرجع مخزنًا تفاعليًا يتم تحديثه تلقائيًا عند تغيير اللغة. ستحترم الدالة تلقائيًا اللغة الحالية (أثناء SSR والتنقل على جانب العميل).

للوصول إلى قيمته التفاعلية (مثلًا، `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" تتوافق مع المفتاح المُعرف في الخطوة 4
  const content = useIntlayer("hero-section");
</script>

<!-- عرض المحتوى كمحتوى بسيط -->
<h1>{$content.title}</h1>
<!-- لعرض المحتوى قابل للتحرير باستخدام المحرر -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- لعرض المحتوى كنص -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="إعداد التوجيه" isOptional={true}>

توضح الخطوات التالية كيفية إعداد التوجيه بناءً على اللغة في SvelteKit. يتيح هذا لعناوين URL الخاصة بك أن تتضمن بادئة اللغة (مثل `/en/about`، `/fr/about`) لتحسين تحسين محركات البحث وتجربة المستخدم.

```bash
.
└─── src
    ├── app.d.ts                  # تعريف نوع اللغة
    ├── hooks.server.ts           # إدارة توجيه اللغة
    ├── lib
    │   └── getLocale.ts          # التحقق من اللغة من الهيدر أو الكوكيز
    ├── params
    │   └── locale.ts             # تعريف معامل اللغة
    └── routes
        ├── [[locale=locale]]     # تغليف في مجموعة مسارات لتعيين اللغة
        │   ├── +layout.svelte    # التخطيط المحلي للمسار
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # التخطيط الجذري للخطوط والأنماط العامة
```

</Step>

<Step number={7} title="التعامل مع اكتشاف اللغة على جانب الخادم">

في SvelteKit، يحتاج الخادم إلى معرفة لغة المستخدم لعرض المحتوى الصحيح أثناء العرض من جانب الخادم (SSR). نستخدم `hooks.server.ts` لاكتشاف اللغة من عنوان URL أو ملفات تعريف الارتباط.

قم بإنشاء أو تعديل الملف `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // تحقق مما إذا كان المسار الحالي يبدأ بالفعل بلغة (مثل /fr، /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // إذا لم تكن هناك لغة في عنوان URL (مثل زيارة المستخدم لـ "/")، قم بإعادة توجيههم
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // إعادة توجيه مؤقتة
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

ثم، أنشئ مساعدًا للحصول على لغة المستخدم من حدث الطلب:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * الحصول على لغة المستخدم من حدث الطلب.
 * تُستخدم هذه الدالة في الخطاف `handle` في الملف `src/hooks.server.ts`.
 *
 * تحاول أولاً الحصول على اللغة من تخزين Intlayer (الكوكيز أو رؤوس مخصصة).
 * إذا لم يتم العثور على اللغة، تعود إلى تفاوض "Accept-Language" الخاص بالمتصفح.
 *
 * @param event - حدث الطلب من SvelteKit
 * @returns لغة المستخدم
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // محاولة الحصول على اللغة من تخزين Intlayer (الكوكيز أو الرؤوس)
  const storedLocale = getLocaleFromStorage({
    // الوصول إلى ملفات تعريف الارتباط في SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // الوصول إلى رؤوس الطلب في SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // الرجوع إلى تفاوض "Accept-Language" في المتصفح
  const negotiatorHeaders: Record<string, string> = {};

  // تحويل كائن رؤوس SvelteKit إلى سجل بسيط Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // التحقق من اللغة من رأس `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // إرجاع اللغة الافتراضية إذا لم يتم العثور على تطابق
  return defaultLocale;
};
```

> `getLocaleFromStorage` سيتحقق من اللغة من الهيدر أو الكوكي حسب تكوينك. راجع [Configuration](https://intlayer.org/doc/concept/configuration) لمزيد من التفاصيل.

> دالة `localeDetector` ستتعامل مع هيدر `Accept-Language` وتعيد أفضل تطابق.

إذا لم يتم تكوين اللغة، نريد إرجاع خطأ 404. لجعل الأمر أسهل، يمكننا إنشاء دالة `match` للتحقق مما إذا كانت اللغة صالحة:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **ملاحظة:** تأكد من أن ملف `src/app.d.ts` الخاص بك يتضمن تعريف اللغة:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

بالنسبة لملف `+layout.svelte`، يمكننا إزالة كل شيء، للاحتفاظ فقط بالمحتوى الثابت، غير المرتبط بالتدويل (i18n):

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

ثم، أنشئ صفحة وتخطيط جديد تحت مجموعة `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// استخدم النوع العام Load
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// تهيئة Intlayer باستخدام اللغة من المسار
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// استخدام قاموس محتوى التخطيط
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// استخدم قاموس محتوى الصفحة الرئيسية
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="الروابط الدولية" isOptional={true}>

من أجل تحسين محركات البحث (SEO)، يُنصح بإضافة بادئة اللغة إلى مساراتك (على سبيل المثال، `/en/about`، `/fr/about`). يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية لأي رابط.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // مساعد لإضافة بادئة اللغة إلى عنوان URL الحالي
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

إذا كنت تستخدم `goto` من SvelteKit، يمكنك استخدام نفس المنطق مع `getLocalizedUrl` للتنقل إلى عنوان URL المحلي:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // ينتقل إلى /en/about أو /fr/about حسب اللغة
```

</Step>

<Step number={9} title="مبدل اللغة" isOptional={true}>

للسماح للمستخدمين بتغيير اللغة، قم بتحديث عنوان URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // سيقوم بتعيين اللغة في المتجر وتفعيل onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="إضافة وكيل خلفي" isOptional={true}>

لإضافة وكيل خلفي إلى تطبيق SvelteKit الخاص بك، يمكنك استخدام دالة `intlayerProxy` المقدمة من إضافة `vite-intlayer`. ستقوم هذه الإضافة بالكشف تلقائيًا عن أفضل لغة للمستخدم بناءً على عنوان URL، والكوكيز، وتفضيلات لغة المتصفح.

> منذ Intlayer v9، يتم تجميع `intlayerProxy()` مباشرة في plugin `intlayer()` وتفعيله بشكل افتراضي من خلال خيار `routing.enableProxy` (`true` بشكل افتراضي). تسجيله بشكل منفصل كما هو موضح أدناه أصبح اختياريًا الآن — يتم الاحتفاظ به لأجل التوافق مع الإصدارات السابقة والإعدادات التي تحتاج إلى التحكم في ترتيب المكونات الإضافية. اضبط `routing.enableProxy: false` للاختيار من عدم المشاركة. راجع [ملاحظات الإصدار v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/releases/v9.md).

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="إعداد محرر / نظام إدارة محتوى intlayer" isOptional={true}>

لإعداد محرر intlayer، يجب عليك اتباع [توثيق محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

لإعداد نظام إدارة محتوى intlayer، يجب عليك اتباع [توثيق نظام إدارة محتوى intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

لكي تتمكن من عرض محدد محرر intlayer، سيتعين عليك استخدام بناء جملة المكون في محتوى intlayer الخاص بك.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- عرض المحتوى كمحتوى بسيط -->
  <h1>{$content.title}</h1>

  <!-- عرض المحتوى كمكون (مطلوب من قبل المحرر) -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="استخراج محتوى مكوناتك" isOptional={true}>

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

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

</Step>

</Steps>

### إعدادات Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer.

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

---

### التعمق أكثر

- **المحرر المرئي**: دمج [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) لتحرير الترجمات مباشرة من واجهة المستخدم.
- **نظام إدارة المحتوى (CMS)**: قم بفصل إدارة المحتوى الخاصة بك باستخدام [نظام إدارة المحتوى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات SvelteKit؟">

- **`svelte-i18n`** و **`typesafe-i18n`**: كتالوجات قائمة على المتاجر.
- **`Paraglide`**: مترجم رسائل.
- **`Intlayer`**: إعلان بجانب المكون، دعم SSR و SSG، استجابة Svelte كاملة، وترجمة بالذكاء الاصطناعي.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة SvelteKit لدي؟">

أقل بكثير من الحلول القائمة على فضاءات الأسماء، لأن الصفحة لا تُحمل أبدًا كتالوجًا لا تعرضه. يستبدل مترجم وقت البناء استدعاءات `useIntlayer` بإدخالات القاموس الدقيقة التي يستخدمها المكون، وتفصل [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) الباقي حسب اللغة، مما يقلل الحزمة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يمكنني الترحيل من svelte-i18n أو typesafe-i18n دون إعادة كتابة المكونات؟">

إلى حد كبير نعم. اتبع [دليل ترحيل Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/svelte-i18n.md).

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفاتك، ويسحب السلاسل النصية الموجهة للمستخدم، ويكتب ملف `.content` بجانب كل منها، حتى تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا.

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء: يمسح الكود عند كل تغيير، وينشئ القواميس ويزامنها مع HMR.

هناك حدان يجدر معرفتهما قبل تشغيل المترجم. إنه يعمل عن طريق التحليل الثابت، وبالتالي فإن السلاسل التي تظهر فقط في وقت التشغيل، مثل رموز أخطاء API أو حقول نظام إدارة المحتوى، تظل بعيدة عن متناوله. كما يتعين عليه التمييز بين النصوص الموجهة للمستخدم ومنطق التطبيق مثل `className="active"` أو رمز الحالة، الأمر الذي يتطلب بعض الملاحظات التوضيحية في قاعدة التعليمات البرمجية الكبيرة. يتجنب [أمر الاستخراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md) كلا الأمرين من خلال إبقائك متحكمًا في العملية.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="هل يعمل Intlayer مع العرض من جانب الخادم والعرض المسبق في SvelteKit؟">

نعم. تغطي الخطوة 7 اكتشاف اللغة من جانب الخادم في `hooks.server.ts`، بحيث يتم إرسال أول كود HTML إلى العميل مترجمًا بالكامل بالفعل.

</Question>

<Question title="كيف أقوم بإعداد المسارات والروابط المترجمة؟">

توضح الخطوتان 6 و 8 ذلك. مقطع `[locale]` في شجرة المسارات ودالة `getLocalizedUrl` يحافظان على التنقل ضمن اللغة النشطة.

</Question>

<Question title="كيف أنشئ مبدل لغة في Svelte؟">

توضح الخطوة 9 المكون. يوفر `useLocale` اللغة النشطة وقائمة اللغات ودالة التعيين للتبديل مع حفظ التفضيل.

</Question>

<Question title="كيف أترجم تطبيق SvelteKit تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. تكتشف الأداة السلاسل المفقودة وتملؤها باستخدام نموذج اللغة الذي تختاره. انظر [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md).

</Question>

<Question title="هل يدعم Intlayer صيغ الجمع والجنس والنصوص المنسقة؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، [المحتوى القائم على النوع الاجتماعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)، [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)، والمنسقات للأرقام والتواريخ والعملات.

</Question>

<Question title="كيف يمكن للمترجمين تحرير المحتوى دون لمس الكود؟">

من خلال [المحرر المرئي (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، الذي يسمح لأي شخص بتحرير النصوص مباشرة على التطبيق قيد التشغيل، أو عبر [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، الذي يفصل المحتوى ليتم تحديثه دون الحاجة لإعادة نشر الكود.

</Question>

<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي المستضاف هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>

---
createdAt: 2025-11-20
updatedAt: 2025-12-30
title: كيفية ترجمة تطبيق SvelteKit الخاص بك – دليل i18n 2026
description: اكتشف كيفية جعل موقع SvelteKit الخاص بك متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته باستخدام العرض من جانب الخادم (SSR).
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
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: إضافة أمر init
  - version: 7.1.10
    date: 2025-11-20
    changes: بدء التاريخ
---

# ترجمة موقع SvelteKit الخاص بك باستخدام Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. تعمل بسلاسة مع قدرات العرض من جانب الخادم (SSR) في **SvelteKit**.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكون.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** بأنواع مولدة تلقائيًا.
- **الاستفادة من SSR في SvelteKit** لتدويل صديق لمحركات البحث (SEO).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق SvelteKit

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

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

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: الحزمة الأساسية للترجمة الدولية (i18n).
- **svelte-intlayer**: يوفر موفري السياق والمخازن لـ Svelte/SvelteKit.
- **vite-intlayer**: إضافة Vite لدمج إعلانات المحتوى مع عملية البناء.

### الخطوة 2: تكوين مشروعك

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

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

قم بتحديث ملف `vite.config.ts` الخاص بك ليشمل إضافة Intlayer. تتولى هذه الإضافة تحويل ملفات المحتوى الخاصة بك.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // ترتيب الإضافات مهم، يجب وضع Intlayer قبل SvelteKit
});
```

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء ملفات إعلان المحتوى في أي مكان داخل مجلد `src` الخاص بك (مثلًا، `src/lib/content` أو بجانب مكوناتك). تقوم هذه الملفات بتعريف المحتوى القابل للترجمة لتطبيقك باستخدام دالة `t()` لكل لغة.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### الخطوة 5: استخدام Intlayer في مكوناتك

الآن يمكنك استخدام دالة `useIntlayer` في أي مكون Svelte. فهي تُرجع مخزنًا تفاعليًا يتم تحديثه تلقائيًا عند تغيير اللغة. ستلتزم الدالة تلقائيًا باللغة الحالية (سواء أثناء SSR أو التنقل على جانب العميل).

> **ملاحظة:** تُرجع `useIntlayer` مخزن Svelte، لذا تحتاج إلى استخدام بادئة `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: كيفية ترجمة تطبيق SvelteKit الخاص بك – دليل i18n 2025
> description: اكتشف كيفية جعل موقع SvelteKit الخاص بك متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته باستخدام العرض من جانب الخادم (SSR).
> keywords:

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
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: بدء التاريخ

---

# ترجمة موقع SvelteKit الخاص بك باستخدام Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة. تعمل بسلاسة مع قدرات العرض من جانب الخادم (SSR) في **SvelteKit**.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكون.
- **توطين البيانات الوصفية، والمسارات، والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** بأنواع مولدة تلقائيًا.
- **الاستفادة من SSR في SvelteKit** لتدويل صديق لمحركات البحث (SEO).

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق SvelteKit

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

### الخطوة 1: تثبيت التبعيات

قم بتثبيت الحزم اللازمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bunx intlayer init
```

- **intlayer**: الحزمة الأساسية للترجمة الدولية (i18n).
- **svelte-intlayer**: يوفر موفري السياق والمخازن لـ Svelte/SvelteKit.
- **vite-intlayer**: إضافة Vite لدمج إعلانات المحتوى مع عملية البناء.

### الخطوة 2: تكوين مشروعك

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

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

قم بتحديث ملف `vite.config.ts` الخاص بك ليشمل إضافة Intlayer. تتولى هذه الإضافة تحويل ملفات المحتوى الخاصة بك.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // ترتيب الإضافات مهم، يجب وضع Intlayer قبل SvelteKit
});
```

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء ملفات إعلان المحتوى في أي مكان داخل مجلد `src` الخاص بك (مثلًا، `src/lib/content` أو بجانب مكوناتك). تقوم هذه الملفات بتعريف المحتوى القابل للترجمة لتطبيقك باستخدام دالة `t()` لكل لغة.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
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

### الخطوة 5: استخدام Intlayer في مكوناتك

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
<h1><svelte:component this={$content.title} /></h1>
<!-- لعرض المحتوى كنص -->
<div aria-label={$content.title.value}></div>
```

### (اختياري) الخطوة 6: إعداد التوجيه

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

### الخطوة 7: التعامل مع اكتشاف اللغة على جانب الخادم (Hooks)

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

> `getLocaleFromStorage` سيتحقق من اللغة من الهيدر أو الكوكي حسب تكوينك. راجع [Configuration](https://intlayer.org/doc/configuration) لمزيد من التفاصيل.

> دالة `localeDetector` ستتعامل مع هيدر `Accept-Language` وتعيد أفضل تطابق.

إذا لم يتم تكوين اللغة، نريد إرجاع خطأ 404. لجعل الأمر أسهل، يمكننا إنشاء دالة `match` للتحقق مما إذا كانت اللغة صالحة:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
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
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// استخدم النوع العام Load
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
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
	import { useIntlayer } from 'svelte-intlayer';

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

### (اختياري) الخطوة 8: الروابط الدولية

من أجل تحسين محركات البحث (SEO)، يُنصح بإضافة بادئة اللغة إلى مساراتك (على سبيل المثال، `/en/about`، `/fr/about`). يقوم هذا المكون تلقائيًا بإضافة بادئة اللغة الحالية لأي رابط.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

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

### (اختياري) الخطوة 9: مبدل اللغة

للسماح للمستخدمين بتغيير اللغة، قم بتحديث عنوان URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
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

### (اختياري) الخطوة 10: إضافة وكيل خلفي (backend proxy)

لإضافة وكيل خلفي إلى تطبيق SvelteKit الخاص بك، يمكنك استخدام دالة `intlayerProxy` المقدمة من إضافة `vite-intlayer`. ستقوم هذه الإضافة بالكشف تلقائيًا عن أفضل لغة للمستخدم بناءً على عنوان URL، والكوكيز، وتفضيلات لغة المتصفح.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (اختياري) الخطوة 11: إعداد محرر / نظام إدارة محتوى intlayer

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
  <svelte:component this={$content.component} />
</div>
```

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

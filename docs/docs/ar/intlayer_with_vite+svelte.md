---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: كيفية ترجمة تطبيق Vite و Svelte الخاص بك – دليل i18n 2026
description: اكتشف كيفية جعل موقعك الإلكتروني باستخدام Vite و Svelte متعدد اللغات. اتبع الوثائق لتدويل (i18n) وترجمته.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - Vite
  - Svelte
  - جافا سكريبت
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: إضافة أمر init
  - version: 5.5.11
    date: 2025-11-19
    changes: تحديث الوثيقة
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء السجل
---

# ترجمة موقعك الإلكتروني باستخدام Vite و Svelte عبر Intlayer | التدويل (i18n)

## جدول المحتويات

<TOC/>

## ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل (i18n) مبتكرة ومفتوحة المصدر مصممة لتبسيط دعم اللغات المتعددة في تطبيقات الويب الحديثة.

مع Intlayer، يمكنك:

- **إدارة الترجمات بسهولة** باستخدام قواميس إعلانية على مستوى المكون.
- **توطين البيانات الوصفية والمسارات والمحتوى بشكل ديناميكي**.
- **ضمان دعم TypeScript** من خلال أنواع مولدة تلقائيًا، مما يحسن الإكمال التلقائي واكتشاف الأخطاء.
- **الاستفادة من ميزات متقدمة**، مثل الكشف الديناميكي عن اللغة والتبديل بينها.

---

## دليل خطوة بخطوة لإعداد Intlayer في تطبيق Vite و Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

راجع [قالب التطبيق](https://github.com/aymericzip/intlayer-vite-svelte-template) على GitHub.

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

- **intlayer**

  الحزمة الأساسية التي توفر أدوات التدويل لإدارة التكوين، الترجمة، [إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)، التحويل البرمجي، و[أوامر CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md).

- **svelte-intlayer**
  الحزمة التي تدمج Intlayer مع تطبيق Svelte. توفر مزودي السياق hooks للتدويل في Svelte.

- **vite-intlayer**
  يتضمن إضافة Vite لدمج Intlayer مع [مجمّع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط للكشف عن اللغة المفضلة للمستخدم، وإدارة الكوكيز، والتعامل مع إعادة توجيه URL.

### الخطوة 2: تكوين مشروعك

أنشئ ملف تكوين لتحديد لغات تطبيقك:

```typescript fileName="intlayer.config.ts"
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
};

export default config;
```

> من خلال ملف التكوين هذا، يمكنك إعداد عناوين URL محلية، وإعادة توجيه الوسيط، وأسماء الكوكيز، وموقع وامتداد إعلانات المحتوى الخاصة بك، وتعطيل سجلات Intlayer في وحدة التحكم، والمزيد. للحصول على قائمة كاملة بالمعلمات المتاحة، راجع [توثيق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### الخطوة 3: دمج Intlayer في تكوين Vite الخاص بك

أضف مكون intlayer الإضافي إلى تكوينك.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> يُستخدم مكون Vite الإضافي `intlayer()` لدمج Intlayer مع Vite. يضمن بناء ملفات إعلان المحتوى ويراقبها في وضع التطوير. كما يعرّف متغيرات بيئة Intlayer داخل تطبيق Vite. بالإضافة إلى ذلك، يوفر ألقابًا لتحسين الأداء.

### الخطوة 4: إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// تعريف محتوى التطبيق
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// تعريف محتوى التطبيق
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان داخل تطبيقك بمجرد تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### الخطوة 5: استخدام Intlayer في الكود الخاص بك

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- عرض المحتوى كمحتوى بسيط -->
<h1>{$content.title}</h1>
<!-- لعرض المحتوى قابل للتحرير باستخدام المحرر -->
<h1><svelte:component this={$content.title} /></h1>
<!-- لعرض المحتوى كسلسلة نصية -->
<div aria-label={$content.title.value}></div>
```

### (اختياري) الخطوة 6: تغيير لغة المحتوى الخاص بك

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// الحصول على معلومات اللغة ودالة setLocale
const { locale, availableLocales, setLocale } = useLocale();

// التعامل مع تغيير اللغة
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (اختياري) الخطوة 7: عرض Markdown

يدعم Intlayer عرض محتوى Markdown مباشرة في تطبيق Svelte الخاص بك. بشكل افتراضي، يتم التعامل مع Markdown كنص عادي. لتحويل Markdown إلى HTML غني، يمكنك دمج `@humanspeak/svelte-markdown`، أو أي محلل Markdown آخر.

> لرؤية كيفية إعلان محتوى markdown باستخدام حزمة `intlayer`، راجع [وثيقة markdown](https://github.com/aymericzip/intlayer/tree/main/docs/ar/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // عرض محتوى الماركداون كسلسلة نصية
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> يمكنك أيضًا الوصول إلى بيانات الـ front-matter الخاصة بالماركداون باستخدام الخاصية `content.markdownContent.metadata.xxx`.

### (اختياري) الخطوة 8: إعداد محرر intlayer / نظام إدارة المحتوى (CMS)

لإعداد محرر intlayer، يجب عليك اتباع [توثيق محرر intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).

لإعداد نظام إدارة المحتوى (CMS) الخاص بـ intlayer، يجب عليك اتباع [توثيق نظام إدارة المحتوى intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

بالتوازي، في تطبيق Svelte الخاص بك، يجب عليك إضافة السطر التالي في تخطيط (layout)، أو في جذر التطبيق:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (اختياري) الخطوة 7: إضافة التوجيه المحلي (localized Routing) لتطبيقك

للتعامل مع التوجيه المحلي في تطبيق Svelte الخاص بك، يمكنك استخدام `svelte-spa-router` مع `localeFlatMap` من Intlayer لتوليد المسارات لكل لغة.

أولاً، قم بتثبيت `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add svelte-spa-router
yarn intlayer init
```

```bash packageManager="bun"
bun add svelte-spa-router
```

ثم، أنشئ ملف `Router.svelte` لتعريف المسارات الخاصة بك:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

قم بتحديث ملف `main.ts` لتركيب مكون `Router` بدلاً من `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

أخيرًا، قم بتحديث ملف `App.svelte` الخاص بك لاستقبال الخاصية `locale` واستخدامها مع `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... بقية تطبيقك ... -->
</main>
```

#### تكوين التوجيه على جانب الخادم (اختياري)

بالتوازي، يمكنك أيضًا استخدام `intlayerProxy` لإضافة التوجيه من جانب الخادم إلى تطبيقك. سيقوم هذا الإضافة تلقائيًا باكتشاف اللغة الحالية بناءً على عنوان URL وتعيين ملف تعريف الارتباط الخاص باللغة المناسبة. إذا لم يتم تحديد لغة، فسيحدد الإضافة اللغة الأنسب بناءً على تفضيلات لغة متصفح المستخدم. إذا لم يتم اكتشاف أي لغة، فسيتم إعادة التوجيه إلى اللغة الافتراضية.

> ملاحظة: لاستخدام `intlayerProxy` في بيئة الإنتاج، تحتاج إلى نقل حزمة `vite-intlayer` من `devDependencies` إلى `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (اختياري) الخطوة 8: تغيير عنوان URL عند تغيير اللغة

للسماح للمستخدمين بتغيير اللغة وتحديث عنوان URL وفقًا لذلك، يمكنك إنشاء مكون `LocaleSwitcher`. سيستخدم هذا المكون `getLocalizedUrl` من `intlayer` و `push` من `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// الحصول على معلومات اللغة
const { locale, availableLocales } = useLocale();

// التعامل مع تغيير اللغة
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### تكوين Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

### إضافة VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف عن الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء التراجم وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

---

### التعمق أكثر

للمضي قدمًا، يمكنك تنفيذ [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو إخراج محتواك باستخدام [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

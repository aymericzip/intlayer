---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "الترحيل من svelte-i18n إلى Intlayer"
description: "رحّل تطبيق Svelte أو SvelteKit من svelte-i18n إلى Intlayer خطوة بخطوة. تستمر مخازن $_ و$date و$number في العمل مع compat adapter ‏@intlayer/svelte-i18n."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# الترحيل من svelte-i18n إلى Intlayer

## لماذا الترحيل من svelte-i18n إلى Intlayer؟

<AccordionGroup>
<Accordion header="حجم الـ bundle">

يسجّل svelte-i18n ملفات الـ locale كاملة عند بدء التشغيل. لا يرسل Intlayer إلا القواميس التي تستخدمها كل صفحة، مما **يقلل حجم الـ bundles والصفحات بنسبة تصل إلى 50%**.

</Accordion>
<Accordion header="سهولة الصيانة">

المفاتيح **مُنمَّطة** وفق قواميسك: تفشل المفاتيح غير الصالحة أثناء البناء. يمكن وضع المحتوى بجوار المكوّنات التي تستخدمه.

</Accordion>
<Accordion header="وكيل الذكاء الاصطناعي">

المحتوى الموضوع بجوار المكوّنات **يقلل السياق المطلوب** للنماذج اللغوية الكبيرة. يوفر Intlayer أداة **CLI** لاختبار الترجمات الناقصة، و**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، و**[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)** و**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**.

</Accordion>
<Accordion header="الأتمتة">

ترجم الرسائل الناقصة في خط CI/CD باستخدام النموذج اللغوي الذي تختاره، أو في الخلفية عبر [منصة الويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

</Accordion>
<Accordion header="التوسع مع غير المطورين">

يوفر Intlayer **[محررًا مرئيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)** قابلًا للاستضافة الذاتية و**[CMS كاملًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)** ليتمكن المترجمون وكتّاب المحتوى من تعديل المحتوى في الوقت الفعلي.

</Accordion>
</AccordionGroup>

> لفهم أصل هذه المكتبات، اقرأ [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md).

## استراتيجيات الترحيل

1. **Compat adapter (موصى به للتطبيقات القائمة)**: ثبّت `@intlayer/svelte-i18n`. يعرض نفس واجهة API الخاصة بـ `svelte-i18n` (`init` و`locale` و`$_` / `$t` و`$json` و`$date` و`$time` و`$number` و`getLocaleFromNavigator`…) ويقدم الرسائل من قواميس Intlayer. تعمل ICU MessageFormat كما كانت.
2. **الترحيل الكامل**: استبدل مخازن svelte-i18n تدريجيًا بـ `useIntlayer` من `svelte-intlayer` وملفات `.content.ts` بجوار مكوّناتك.

## جدول المحتويات

<TOC/>

## الترحيل السريع

<Steps>
<Step number={1} title="تثبيت الاعتماديات">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> الخيار `--interactive` اختياري. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

يكتشف الأمر بيئتك ويثبّت الحزم المطلوبة، على سبيل المثال:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> أبقِ `svelte-i18n` مثبّتًا: فهو يوفر أنواع TypeScript.

</Step>
<Step number={2} title="إعداد Intlayer">

وجّه إضافة `syncJSON` إلى ملفات الرسائل الحالية. مع ملف واحد لكل namespace ‏(`src/locales/en/home.json`)، يصبح كل ملف قاموسًا:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> يُحلّ `$_('home.title')` إلى الحقل `title` من القاموس `home`. إذا كنت تستخدم ملفًا واحدًا لكل locale ‏(`src/locales/en.json`) مع namespaces متداخلة، فاستخدم بدلًا من ذلك `source: ({ locale }) => \`./src/locales/${locale}.json\``: يصبح كل مفتاح من المستوى الأعلى قاموسًا.

</Step>
<Step number={3} title="إضافة إضافة Vite">

تشغّل `svelteI18nVitePlugin()` بناء Intlayer وتنشئ اسمًا مستعارًا من `svelte-i18n` إلى `@intlayer/svelte-i18n`، دون أي تغيير في ملفات المصدر.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> في SvelteKit، أضف `svelteI18nVitePlugin()` بعد `sveltekit()` في مصفوفة `plugins` نفسها.

</Step>
<Step number={4} title="تبسيط إعداد i18n">

أبقِ `init()`، لكن أزل `register()` و`addMessages()`: تأتي الرسائل من قواميس Intlayer.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

تستمر مكوّناتك في العمل دون تغيير:

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

تعيين `$locale = 'fr'` يغيّر اللغة لكل من مخازن svelte-i18n و`useIntlayer`.

## الترحيل الكامل

<Steps>
<Step number={5} title="إعادة تسمية الـ imports صراحةً (اختياري)" isOptional={true}>

تتولى إضافة Vite الأسماء المستعارة بالفعل. لجعل الاعتمادية صريحة:

| قبل                                          | بعد                                                    |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="نقل المحتوى إلى ملفات .content.ts" isOptional={true}>

يمكن للمكوّنات الجديدة استخدام محتوى Intlayer الأصلي جنبًا إلى جنب مع استدعاءات svelte-i18n الحالية:

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="تفعيل الترجمة بالذكاء الاصطناعي" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

تُكتب الترجمات المكتملة في ملفات JSON الخاصة بك. راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) لإعداد الذكاء الاصطناعي.

</Step>
</Steps>

## ما يمكنك حذفه بعد الترحيل

| الملف / النمط                            | لماذا لم يعد مطلوبًا                   |
| ---------------------------------------- | ------------------------------------- |
| استدعاءات `register()` / `addMessages()` | يصرّف Intlayer القواميس ويحمّلها.       |
| `waitLocale()` قبل العرض                 | تتوفر الرسائل بمجرد تعيين الـ locale. |

## إعداد TypeScript

أدرج الأنواع المولّدة في `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## إعداد Git

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/svelte-i18n.md)
- [إضافة sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)
- [Intlayer مع Vite وSvelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+svelte.md)
- [Intlayer مع SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_svelte_kit.md)
- [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)

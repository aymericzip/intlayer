---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "الترحيل من Lingui إلى Intlayer"
description: "رحّل تطبيق React من Lingui إلى Intlayer خطوة بخطوة. تستمر ماكروهات Lingui وuseLingui و<Trans> في العمل مع compat adapter ‏@intlayer/lingui."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# الترحيل من Lingui إلى Intlayer

## لماذا الترحيل من Lingui إلى Intlayer؟

<AccordionGroup>
<Accordion header="حجم الـ bundle">

يحمّل Lingui كتالوجًا مُصرَّفًا واحدًا لكل locale يضم كل رسائل التطبيق. يقسّم Intlayer المحتوى حسب القاموس ولا يرسل إلا ما تستخدمه كل صفحة، مما **يقلل حجم الـ bundles والصفحات بنسبة تصل إلى 50%**.

</Accordion>
<Accordion header="سهولة الصيانة">

قواميس Intlayer **مُنمَّطة بالكامل** ويمكن وضعها بجوار المكوّنات التي تستخدمها. لا توجد خطوات `extract` / `compile` يجب تذكرها: تبني إضافة الـ bundler القواميس.

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

1. **Compat adapter (موصى به للتطبيقات القائمة)**: ثبّت `@intlayer/lingui`. يعرض نفس واجهة API الخاصة بـ `@lingui/core` و`@lingui/react` (`i18n` و`setupI18n` و`I18nProvider` و`useLingui` و`Trans`) ويقدم الرسائل من قواميس Intlayer. تُصرَّف ماكروهاتك (`` t`…` `` و`<Trans>` و`msg` و`plural`) تمامًا كما كانت.
2. **الترحيل الكامل**: استبدل استدعاءات Lingui تدريجيًا بـ `useIntlayer` وملفات `.content.ts` بجوار مكوّناتك.

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
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> أبقِ `@lingui/core` و`@lingui/react` وإضافة الماكرو (`@lingui/babel-plugin-lingui-macro` أو `@lingui/swc-plugin`) مثبّتة. تستمر الماكروهات في العمل، وتوفر حزم Lingui أنواع TypeScript.

</Step>
<Step number={2} title="إعداد Intlayer">

يقرأ Intlayer كتالوجات Lingui بوصفها مصدر الحقيقة. مع البنية الافتراضية لـ Lingui (`src/locales/{locale}/messages.po`)، وجّه إضافة `syncPO` إليها:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="استخدام كتالوجات JSON">

مع `@lingui/format-json`، استخدم `syncJSON` بتنسيق ICU:

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> استخدم معرّفات رسائل صريحة (`t({ id: "hero.title", message: "Welcome" })` أو `<Trans id="hero.title">`). لا تُحلّ المعرّفات المولّدة من النص المصدر مقابل الكتالوجات.

</Step>
<Step number={3} title="استبدال إضافة Vite الخاصة بـ Lingui">

استبدل `@lingui/vite-plugin` بـ `@intlayer/lingui/plugin`. يبقى الاسم `lingui()`: تشغّل الإضافة بناء Intlayer وتنشئ أسماء مستعارة من `@lingui/core` و`@lingui/react` إلى `@intlayer/lingui`، دون أي تغيير في ملفات المصدر.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> أبقِ إضافة الماكرو داخل إضافة React (Babel أو `@lingui/swc-plugin`)، حتى تُصرَّف الماكروهات إلى استدعاءات `i18n._()` قبل أن يحلّها Intlayer.

</Step>
</Steps>

تستمر مكوّناتك في العمل دون تغيير:

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

يظل تبديل الـ locale عبر `i18n.activate(locale)`، الذي يحدّث كل مستخدم لـ `useLingui()`.

## الترحيل الكامل

<Steps>
<Step number={4} title="إزالة تحميل الكتالوجات وقت التشغيل" isOptional={true}>

تأتي الرسائل الآن من قواميس Intlayer المُصرَّفة وقت البناء. تعمل استدعاءات `i18n.load()` / `i18n.loadAndActivate()` كـ fallback فقط وتعرض تحذيرًا في وضع التطوير. استبدلها بـ `i18n.activate(locale)` وأزل خطوة `lingui compile`. احتفظ بـ `lingui extract` لجمع معرّفات الرسائل الجديدة.

</Step>
<Step number={5} title="إعادة تسمية الـ imports صراحةً (اختياري)" isOptional={true}>

تتولى إضافة Vite الأسماء المستعارة بالفعل. لجعل الاعتمادية صريحة:

| قبل                                                | بعد                                                   |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="نقل المحتوى إلى ملفات .content.ts" isOptional={true}>

يمكن للمكوّنات الجديدة استخدام محتوى Intlayer الأصلي جنبًا إلى جنب مع استدعاءات Lingui الحالية:

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
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

تُكتب الترجمات المكتملة في كتالوجات Lingui الخاصة بك. راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) لإعداد الذكاء الاصطناعي.

</Step>
</Steps>

## ما يمكنك حذفه بعد الترحيل

| الملف / النمط                                  | لماذا لم يعد مطلوبًا                              |
| ---------------------------------------------- | ------------------------------------------------ |
| `i18n.load()` / imports الديناميكية للكتالوجات | يصرّف Intlayer القواميس ويحمّلها.                  |
| `lingui compile` والكتالوجات `.js` المُصرَّفة     | يبني Intlayer القواميس مباشرةً من كتالوجاتك.      |
| `@lingui/vite-plugin`                          | حلّ محله `lingui()` من `@intlayer/lingui/plugin`. |

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

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md)
- [إضافة sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md)
- [Intlayer مع Vite وReact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)
- [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)

---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "الترحيل من react-intl (FormatJS) إلى Intlayer"
description: "رحّل تطبيق React من react-intl إلى Intlayer خطوة بخطوة. تستمر useIntl وFormattedMessage وكل مكوّنات Formatted* في العمل مع compat adapter ‏@intlayer/react-intl."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# الترحيل من react-intl (FormatJS) إلى Intlayer

## لماذا الترحيل من react-intl إلى Intlayer؟

<AccordionGroup>
<Accordion header="حجم الـ bundle">

مع react-intl، تُمرَّر كل رسائل الـ locale إلى `IntlProvider`، فتحمل كل صفحة الكتالوج كاملًا. لا يرسل Intlayer إلا القواميس التي تستخدمها كل صفحة، مما **يقلل حجم الـ bundles والصفحات بنسبة تصل إلى 50%**.

</Accordion>
<Accordion header="سهولة الصيانة">

معرّفات الرسائل **مُنمَّطة** وفق قواميسك: تفشل المعرّفات غير الصالحة أثناء البناء. يمكن وضع المحتوى بجوار المكوّنات التي تستخدمه.

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

1. **Compat adapter (موصى به للتطبيقات القائمة)**: ثبّت `@intlayer/react-intl`. يعرض نفس واجهة API الخاصة بـ `react-intl` (`IntlProvider` و`useIntl` و`FormattedMessage` و`FormattedNumber` و`FormattedDate` و`defineMessages` و`createIntl`…) ويقدم الرسائل من قواميس Intlayer. تعمل ICU MessageFormat والجموع وselect ووسوم النص المنسّق كما كانت.
2. **الترحيل الكامل**: استبدل استدعاءات react-intl تدريجيًا بـ `useIntlayer` وملفات `.content.ts` بجوار مكوّناتك.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> أبقِ `react-intl` مثبّتًا: فهو يوفر أنواع TypeScript.

</Step>
<Step number={2} title="إعداد Intlayer">

وجّه إضافة `syncJSON` إلى ملفات الرسائل الحالية. كتالوجات react-intl خرائط مسطّحة من معرّفات مفصولة بنقاط:

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

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
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> يصبح الجزء الأول من كل معرّف (`home`) قاموسًا في Intlayer، فلا تحمّل كل صفحة إلا القواميس التي تستخدمها. وعندما يكتب Intlayer الترجمات، يحتفظ الملف ببنيته المسطّحة.

</Step>
<Step number={3} title="إضافة إضافة Vite">

تشغّل `reactIntlVitePlugin()` بناء Intlayer وتنشئ اسمًا مستعارًا من `react-intl` إلى `@intlayer/react-intl`، دون أي تغيير في ملفات المصدر.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> تستخدم bundler آخر؟ أعد تسمية الـ imports إلى `@intlayer/react-intl` (انظر الخطوة 5) واستخدم إضافة Intlayer الخاصة بالـ bundler، مثل `withIntlayer` من `next-intlayer` لـ Next.js.

</Step>
<Step number={4} title="التوقف عن تمرير الرسائل إلى IntlProvider">

يستمر `IntlProvider` في العمل، لكن Intlayer هو من يحمّل الرسائل الآن. أزل الخاصية `messages` واستيراد الكتالوج:

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> إذا استمر تمرير `messages` فسيتم تجاهله وسيُعرض تحذير في وضع التطوير.

</Step>
</Steps>

تستمر مكوّناتك في العمل دون تغيير، مع معرّفات مُنمَّطة:

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## الترحيل الكامل

<Steps>
<Step number={5} title="إعادة تسمية الـ imports صراحةً (اختياري)" isOptional={true}>

تتولى إضافة Vite الأسماء المستعارة بالفعل. لجعل الاعتمادية صريحة:

| قبل                                             | بعد                                                       |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="نقل المحتوى إلى ملفات .content.ts" isOptional={true}>

يمكن للمكوّنات الجديدة استخدام محتوى Intlayer الأصلي جنبًا إلى جنب مع استدعاءات react-intl الحالية:

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

تُكتب الترجمات المكتملة في ملفات JSON الخاصة بك. راجع [توثيق CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) لإعداد الذكاء الاصطناعي.

</Step>
</Steps>

## ما يمكنك حذفه بعد الترحيل

| الملف / النمط                              | لماذا لم يعد مطلوبًا                                        |
| ------------------------------------------ | ---------------------------------------------------------- |
| الخاصية `messages` وتحميل الكتالوج         | يصرّف Intlayer القواميس ويحمّلها.                            |
| خطوة `formatjs compile`                    | يحلّل Intlayer رسائل ICU مباشرةً من ملفات JSON.              |
| توليد المعرّفات عبر `babel-plugin-formatjs` | استخدم معرّفات صريحة مفصولة بنقاط حتى يقابل كل معرّف قاموسًا. |

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

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-intl.md)
- [إضافة sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)
- [Intlayer مع Vite وReact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)
- [الترحيل من react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md)
- [المحرر المرئي لـ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)

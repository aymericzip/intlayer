---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: الترحيل من react-i18next / i18next إلى Intlayer | التدويل (i18n)
description: تعرّف على كيفية ترحيل تطبيق React أو Next.js الخاص بك من react-i18next أو i18next إلى Intlayer - خطوة بخطوة، دون كسر الكود الموجود لديك. استخدم محولات التوافق @intlayer/react-i18next و @intlayer/i18next للانتقال بدون انقطاع.
keywords:
  - react-i18next
  - i18next
  - intlayer
  - ترحيل
  - التدويل
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: بدء السجل
author: aymericzip
---

# الترحيل من react-i18next / i18next إلى Intlayer

## لماذا الترحيل من react-i18next / i18next إلى Intlayer؟

<AccordionGroup>

<Accordion header="حجم الـ Bundle">

بدلاً من تحميل ملفات JSON ضخمة في صفحاتك، قم بتحميل المحتوى الضروري فقط. يساعدك Intlayer على **تقليل حجم bundle والصفحات بنسبة تصل إلى 50%**.

</Accordion>

<Accordion header="سهولة الصيانة">

تقسيم محتوى التطبيق الخاص بك **يسهل الصيانة** للتطبيقات الكبيرة. يمكنك نسخ أو حذف مجلد ميزة واحد دون العبء الذهني لمراجعة قاعدة الكود كاملة. بالإضافة إلى ذلك، Intlayer **مكتوب بالكامل** لضمان دقة المحتوى الخاص بك.

Intlayer هو أيضًا الحل الذي يتمتع بـ **أنشط تطور** في نظام i18n البيئي - يتم إصلاح المشاكل بسرعة، وتصل محولات frameworks جديدة بانتظام، ويتم تحسين API الأساسي بشكل مستمر بناءً على ملاحظات الإنتاج الواقعية.

</Accordion>

<Accordion header="وكيل AI">

**يقلل** Co-locating المحتوى من السياق المطلوب بواسطة النماذج اللغوية الكبيرة (LLMs). يأتي Intlayer أيضًا مع مجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة، **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**، و **[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة حتى بالنسبة لوكلاء AI.

</Accordion>

<Accordion header="الأتمتة">

استخدم الأتمتة للترجمة في خط أنابيب CI/CD الخاص بك باستخدام LLM من اختيارك بتكلفة موفر AI الخاص بك. يوفر Intlayer أيضًا **مترجم** لأتمتة استخراج المحتوى، وكذلك [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) لمساعدتك في **الترجمة في الخلفية**.

</Accordion>

<Accordion header="الأداء">

ربط ملفات JSON ضخمة بمكونات قد يؤدي إلى مشاكل الأداء والتفاعل. يحسّن Intlayer تحميل المحتوى الخاص بك في وقت البناء.

</Accordion>

<Accordion header="التوسع مع غير المطورين">

أكثر من مجرد حل i18n، يوفر Intlayer **محرر بصري مستضاف على الخادم الخاص بك** و **CMS كامل** لمساعدتك في إدارة محتوى متعدد اللغات **في الوقت الفعلي**، مما يجعل التعاون مع المترجمين والمحررين وأعضاء الفريق الآخرين سلساً. يمكن تخزين المحتوى محليًا و/أو عن بعد.

</Accordion>

</AccordionGroup>

---

## استراتيجيات الترحيل

هناك استراتيجيتان متكاملتان للترحيل من `react-i18next` / `i18next` إلى Intlayer:

1. **محول التوافق (موصى به للتطبيقات الموجودة)** — قم بتثبيت `@intlayer/react-i18next` (لمكونات React) و/أو `@intlayer/i18next` (لمثيل `i18n` الأساسي). تعرض هذه الحزم **نفس API تماماً** كـ `react-i18next` / `i18next` لكنها توكل جميع أعمال الترجمة إلى Intlayer تحت الغطاء. تحتفظ باستدعاءات `useTranslation` و `Trans` و `withTranslation` و `i18next.t()` الموجودة - التغيير الوحيد هو مسار الاستيراد.

2. **الترحيل الكامل** — استبدل تدريجياً APIs من `react-i18next` بـ hooks Intlayer الأصلية (`useIntlayer`, `IntlayerProvider`) و ضع المحتوى في ملفات `.content.ts` بجانب مكوناتك.

يغطي هذا الدليل **الاستراتيجية 1** أولاً (محول التوافق drop-in)، ثم يمر عبر الترحيل الكامل الاختياري.

---

## جدول المحتويات

<TOC/>

---

## الترحيل السريع

الخطوات التالية هي الحد الأدنى المطلوب للحصول على تطبيق `react-i18next` الموجود يعمل على Intlayer دون تغييرات الكود.

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت حزم Intlayer الأساسية ومحولات التوافق:

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

> العلم `--interactive` اختياري. استخدم `intlayer-cli init` إذا كنت وكيلاً من AI.

> سيكتشف هذا الأمر بيئتك ويثبت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> يمكنك الاحتفاظ بـ `react-i18next` و `i18next` المثبتة - تستخدم محولات التوافق كـ `devDependencies` / `peerDependencies` اختياري لأنواع TypeScript. لا تحتاج إلى تغيير أي أقران `package.json`.

</Step>

<Step number={2} title="تكوين Intlayer">

ينشئ أمر `intlayer init` ملف `intlayer.config.ts` البداية. قم بتحديثه ليطابق المناطق الموجودة لديك وأشر مكون `syncJSON` إلى ملفات الرسائل الخاصة بك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // أضف جميع المناطق الموجودة لديك هنا
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // يطابق بناء جملة العنصر النائب من react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** يعيّن منطقة إلى مسار ملفها JSON. **`location`** يخبر المراقب Intlayer أي مجلد يجب مراقبته للتغييرات. يضمن الخيار `format: 'i18next'` أن العناصر النائبة مثل `{{name}}` يتم تحليلها بشكل صحيح.

</Step>

<Step number={3} title="إضافة مكون Intlayer إلى Bundler الخاص بك">

لف إعداد bundler الموجود لديك بمكون التوافق. يقوم بدمج مكون Intlayer الأساسي، ويربط مراقبة المحتوى، و - بشكل حاسم - **يحقن بدائل module** بحيث تتم إعادة توجيه استدعاءات `import … from 'react-i18next'` (و `'i18next'`) الموجودة بشفافية إلى `@intlayer/react-i18next` / `@intlayer/i18next` في وقت البناء. لا توجد حاجة لتغييرات ملفات المصدر.

**لـ Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` يلتف مكون `intlayer()` من `vite-intlayer` ويضيف بدائل `react-i18next` / `i18next`. استخدام مكون `intlayer()` البسيط من `vite-intlayer` يجمّع القواميس لكن **لا** يضيف تلك البدائل - ستقوم بعد ذلك بإعادة تسمية الاستيرادات إلى `@intlayer/*` يدويًا (انظر الخطوة 4).

**لـ Next.js:**

إذا كنت تستخدم `next-i18next` (تكامل Pages Router)، قم بتثبيت `@intlayer/next-i18next` و `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

ثم أضف مكون التوافق إلى `next.config.ts` (يحقن بدائل `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* الخيارات الخاصة بك */};

export default withIntlayer(nextConfig);
```

> **لا تحتاج أكثر إلى `i18next.init()` أو bootstrap موفر يدوي.** يجمّع Intlayer جميع القواامس في **وقت البناء**، لذا لا توجد خطوة تحميل وقت التشغيل. يتعامل موفر المستعار مع التهيئة لك.

</Step>

</Steps>

هذا كل ما هو مطلوب للترحيل السريع. تطبيقك يعمل الآن على Intlayer مع الحفاظ على كل استيراد واجهة برمجية من `react-i18next`.

> **مفاتيح ترجمة مكتوبة - تلقائي.** بمجرد أن يجمّع Intlayer القواامس، يتم كتابة `useTranslation` و `getFixedT` مقابل المحتوى الفعلي. يتم إكمال المفاتيح تلقائياً في محرر IDE ومسارات غير صحيحة تسبب أخطاء TypeScript في وقت البناء - لا يلزم إعداد إضافي.
>
> ```tsx
> // 'about' هو مفتاح قاموس مسجل → t() يقبل فقط نقاط منقوطة صحيحة
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ مكتمل
> t("does.not.exist"); // ✗ خطأ TypeScript
>
> // من جانب الخادم (مثيل i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ مكتوب
> ```

---

## الترحيل الكامل

الخطوات أدناه اختيارية ويمكن القيام بها بشكل تدريجي. تفتح مجموعة ميزات Intlayer الكاملة: محرر بصري، CMS، ملفات محتوى مكتوبة، ترجمة مدعومة بـ AI، والمزيد.

<Steps>

<Step number={4} title="إعادة تسمية الاستيراد الصريح (اختياري)" isOptional={true}>

تتعامل مكونات Intlayer بالفعل مع البدائل على مستوى bundler. إذا كنت تفضل جعل التبعية صريحة في ملفات المصدر، يمكنك إعادة تسمية الاستيرادات يدويًا:

| قبل                                                | بعد                                                          |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

لـ Next.js (`next-i18next`):

| قبل                                                                            | بعد                                                               |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="تفعيل أتمتة الترجمة المدعومة بـ AI" isOptional={true}>

بمجرد توصيل Intlayer، استخدم CLI الخاص به لملء الترجمات المفقودة تلقائياً:

```bash packageManager="npm"
# اختبر الترجمات المفقودة (أضف إلى CI)
npx intlayer test

# ملء الترجمات المفقودة بـ AI
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

أضف التكوين AI إلى `intlayer.config.ts`:

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
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // الافتراضي
    // model: "gpt-4o-mini",   // الافتراضي
  },
};

export default config;
```

> راجع [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) لجميع الخيارات المتاحة.

</Step>

</Steps>

---

## ما يمكنك حذفه بعد الترحيل

بمجرد وضع محولات التوافق، يمكن إزالة الكود النموذجي التالي من `react-i18next` / `i18next`:

| الملف / النمط                          | لماذا لا يكون مطلوباً بعد الآن                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| استدعاءات `i18next.init()`             | يقوم موفر Intlayer بتهيئة كل شيء تلقائياً؛ لا توجد خطوة تحميل وقت التشغيل.                                         |
| `I18nextProvider` / `initReactI18next` | يتعامل مكون Intlayer مع الحقن والـ bootstrap تحت الغطاء.                                                           |
| حزم اللغة JSON (`locales/*.json`)      | حزم JSON مطلوبة فقط إذا كنت تستخدم بعد مكون `syncJSON`. بمجرد الترحيل إلى ملفات `.content.ts` يمكنك حذف مجلد JSON. |

عندما تكون جاهزاً للمضي قدماً، يكتشف Intlayer **تلقائياً جميع ملفات `.content.ts` و `.content.json` في أي مكان في codebase** (افتراضياً، في أي مكان داخل `./src`). يمكنك وضع ملف `my-component.content.ts` بجوار `MyComponent.tsx` مباشرة وسيلتقطه Intlayer في وقت البناء دون تكوين إضافي - لا استيرادات، لا تسجيل، لا ملف فهرس مركزي مطلوب. هذا يجعل co-locating الترجمات مع الصفحات والمكونات خالياً من الاحتكاك تماماً.

---

## تكوين TypeScript

يستخدم Intlayer تعديل module لتوفير intellisense TypeScript الكامل لمفاتيح الترجمة. تأكد من أن `tsconfig.json` يتضمن الأنواع التي يتم إنشاؤها تلقائياً:

```json5 fileName="tsconfig.json"
{
  // ... تكويناتك TypeScript الموجودة
  "include": [
    // ... تكويناتك TypeScript الموجودة
    ".intlayer/**/*.ts", // قم بتضمين الأنواع التي تم إنشاؤها تلقائياً
  ],
}
```

---

## تكوين Git

أضف مجلد Intlayer المُنتج إلى `.gitignore`:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

---

## اذهب إلى ما هو أبعد

- **محرر بصري** — إدارة الترجمات بشكل مرئي في المتصفح: [محرر Intlayer البصري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
- **CMS** — تحويل إلى خارجي وإدارة المحتوى من بعيد: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- **VS Code Extension** — احصل على إكمال تلقائي واكتشاف خطأ ترجمة فوري: [ملحق Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)
- **مرجع CLI** — قائمة كاملة بأوامر CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- **Intlayer مع React** — دليل الإعداد الكامل لـ React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)
- **Intlayer مع Next.js** — دليل الإعداد الكامل لـ Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)

---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: الترحيل من next-i18next إلى Intlayer | التدويل (i18n)
description: تعرّف على كيفية ترحيل تطبيق Next.js الخاص بك من next-i18next إلى Intlayer - خطوة بخطوة، دون كسر الكود الموجود. استخدم محول التوافق @intlayer/next-i18next للانتقال بدون انقطاع.
keywords:
  - next-i18next
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
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: بدء السجل
author: aymericzip
---

# الترحيل من next-i18next إلى Intlayer

## لماذا الترحيل من next-i18next إلى Intlayer؟

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

نظراً لأن `next-i18next` يلتف حول `react-i18next` و `i18next` تحت الغطاء، هناك استراتيجيتان متكاملتان للترحيل إلى Intlayer:

1. **محول التوافق (موصى به للتطبيقات الموجودة)** — قم بتثبيت `@intlayer/next-i18next` و `@intlayer/react-i18next` و `@intlayer/i18next`. تعرض هذه الحزم **نفس API تماماً** كنظيراتها لكن توكل جميع أعمال الترجمة إلى Intlayer تحت الغطاء. تحتفظ باستدعاءات `useTranslation` و `appWithTranslation` و `serverSideTranslations` الموجودة والتوجيه Pages من Next.js دون تغيير - التغيير الوحيد هو التهيئة.

2. **الترحيل الكامل** — استبدل تدريجياً APIs من `next-i18next` بـ hooks Intlayer الأصلية (`useIntlayer`) وضع المحتوى في ملفات `.content.ts` بجانب مكوناتك.

يغطي هذا الدليل **الاستراتيجية 1** أولاً (محول التوافق drop-in)، ثم يمر عبر الترحيل الكامل الاختياري.

---

## جدول المحتويات

<TOC/>

---

## الترحيل السريع

الخطوات التالية هي الحد الأدنى المطلوب للحصول على تطبيق Next.js Pages Router الموجود يعمل على Intlayer دون تغييرات الكود في الصفحات والمكونات.

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت حزم Intlayer الأساسية ومحولات التوافق:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> العلم `--interactive` اختياري. استخدم `intlayer-cli init` إذا كنت وكيلاً من AI.

> سيكتشف هذا الأمر بيئتك ويثبت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> يمكنك بأمان الاحتفاظ بـ `next-i18next` و `react-i18next` و `i18next` المثبتة أثناء الترحيل، على الرغم من أنك ستزيلها بمجرد إنشاء بديل.

</Step>

<Step number={2} title="تكوين Intlayer">

ينشئ أمر `intlayer init` ملف `intlayer.config.ts` البداية. قم بتحديثه ليطابق المناطق الموجودة لديك وأشر مكون `syncJSON` إلى ملفات رسائل `next-i18next` (عادة داخل `public/locales`):

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
      // يطابق بناء جملة العنصر النائب من i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** يعيّن منطقة واسم مساحة (key) إلى مسار ملفها JSON. **`location`** يخبر المراقب Intlayer أي مجلد يجب مراقبته للتغييرات. يضمن الخيار `format: 'i18next'` أن العناصر النائبة يتم تحليلها بشكل صحيح لـ `next-i18next`.

</Step>

<Step number={3} title="تحديث إعداد Next.js">

لف إعداد `next.config.ts` (أو `.js`) الموجود مع `createNextI18nPlugin` من `@intlayer/next-i18next/plugin`. يقوم هذا الغلاف بدمج `withIntlayer` **و** حقن بدائل `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`، بحيث تتم إعادة توجيه استدعاءات `import { useTranslation } from 'next-i18next'` الموجودة بشفافية في وقت البناء. لا توجد حاجة لتغييرات ملفات المصدر.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// يمكنك إزالة التكوين i18n المستورد من next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // يدير Intlayer توجيه i18n في Next.js تحت الغطاء،
  // لذا لا تحتاج إلى تمرير كائن i18n هنا بعد الآن.
};

export default withIntlayer(nextConfig);
```

> **لا تحتاج أكثر إلى `next-i18next.config.js`.** يجمّع Intlayer جميع القواامس في **وقت البناء**، معالجة كشف locale والتوجيه وتحميل القاموس بسلاسة.
>
> تفضل `withIntlayer` البسيط من `next-intlayer/server`؟ يجمّع قواامسك لكن **لا** يضيف بدائل `next-i18next` / `react-i18next` / `i18next` - ستضطر بعد ذلك إلى إعادة تسمية الاستيرادات إلى `@intlayer/*` يدويًا (انظر الخطوة 4).

</Step>

</Steps>

هذا كل ما هو مطلوب للترحيل السريع. تطبيق Next.js الخاص بك يعمل الآن على Intlayer مع الحفاظ على كل استدعاء `useTranslation` و `serverSideTranslations` و `appWithTranslation` سليم.

> **مفاتيح ترجمة مكتوبة - تلقائي.** بمجرد أن يجمّع Intlayer القواامس، يتم كتابة `useTranslation` و `getFixedT` مقابل المحتوى الفعلي. يتم إكمال المفاتيح تلقائياً في محرر IDE ومسارات غير صحيحة تسبب أخطاء TypeScript في وقت البناء - لا يلزم إعداد إضافي.
>
> ```tsx
> // Pages Router - 'about' هو مفتاح قاموس مسجل
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ مكتمل
> t("does.not.exist"); // ✗ خطأ TypeScript
>
> // getStaticProps / getServerSideProps (مثيل i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ مكتوب
> ```

---

## الترحيل الكامل

الخطوات أدناه اختيارية ويمكن القيام بها بشكل تدريجي. تفتح مجموعة ميزات Intlayer الكاملة: محرر بصري، CMS، ملفات محتوى مكتوبة، ترجمة مدعومة بـ AI، والمزيد.

<Steps>

<Step number={4} title="إعادة تسمية الاستيراد الصريح (اختياري)" isOptional={true}>

يتعامل مكون Intlayer بالفعل مع البدائل على مستوى bundler. إذا كنت تفضل جعل التبعية صريحة في ملفات المصدر، يمكنك إعادة تسمية الاستيرادات يدويًا:

| قبل                                                                            | بعد                                                               |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

هذه **بدائل drop-in** - لا تغييرات على توقيعات الاستدعاء أو الحجج أو أنواع الإرجاع مطلوب.

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

بمجرد وضع محول التوافق، يمكن إزالة الكود النموذجي التالي من `next-i18next`:

| الملف / النمط                            | لماذا لا يكون مطلوباً بعد الآن                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `next-i18next.config.js`                 | يتعامل Intlayer مع التوجيه وتحميل القاموس والمناطق الافتراضية داخلياً بناءً على `intlayer.config.ts`.              |
| `next-i18next` من `package.json`         | تم استبدالها بالكامل بـ `@intlayer/next-i18next` والبدائل.                                                         |
| حزم اللغة JSON (`public/locales/*.json`) | حزم JSON مطلوبة فقط إذا كنت تستخدم بعد مكون `syncJSON`. بمجرد الترحيل إلى ملفات `.content.ts` يمكنك حذف مجلد JSON. |

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
- **Intlayer مع Next.js (Pages Router)** — دليل الإعداد الكامل لـ Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)

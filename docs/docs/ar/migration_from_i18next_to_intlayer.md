---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "الترحيل من i18next إلى Intlayer | التدويل (i18n)"
description: "تعرّف على كيفية ترحيل تطبيق JavaScript/TypeScript الخاص بك من i18next إلى Intlayer — خطوة بخطوة، دون كسر الكود الموجود. استخدم محول التوافق @intlayer/i18next للانتقال بدون انقطاع."
keywords:
  - i18next
  - intlayer
  - ترحيل
  - تدويل
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من i18next إلى Intlayer

## لماذا الترحيل من i18next إلى Intlayer؟

<AccordionGroup>

<Accordion header="حجم الحزمة">

بدلاً من تحميل ملفات JSON ضخمة في صفحاتك، قم بتحميل فقط المحتوى الضروري. يساعد Intlayer على **تقليل حجم الحزمة والصفحات بما يصل إلى 50%**.

</Accordion>

<Accordion header="سهولة الصيانة">

يسهل تحديد نطاق محتوى التطبيق **الصيانة** للتطبيقات واسعة النطاق. يمكنك نسخ أو حذف مجلد ميزة واحد دون الحاجة لمراجعة كود المحتوى بالكامل. بالإضافة إلى ذلك، Intlayer **مكتوب بشكل كامل** لضمان دقة المحتوى الخاص بك.

Intlayer أيضاً هو الحل ذو **التطوير الأكثر نشاطاً** في نظام i18n البيئي — تُصلح المشاكل بسرعة، وتُضاف محولات إطار عمل جديدة بانتظام، ويتم تحسين API الأساسي بناءً على ملاحظات الإنتاج الحقيقية.

</Accordion>

<Accordion header="وكيل ذكي">

يقلل دمج المحتوى **السياق المطلوب** من نماذج اللغة الكبيرة (LLMs). يأتي Intlayer أيضاً مع مجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة، **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**، و**[مهارات الوكيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة حتى للوكلاء الذكيين.

</Accordion>

<Accordion header="الأتمتة">

استخدم الأتمتة للترجمة في خط أنابيب CI/CD الخاص بك باستخدام نموذج LLM من اختيارك بتكلفة موفر الذكاء الاصطناعي الخاص بك. يوفر Intlayer أيضاً **compiler** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) لمساعدتك على **الترجمة في الخلفية**.

</Accordion>

<Accordion header="الأداء">

قد يؤدي ربط ملفات JSON الضخمة بالمكونات إلى مشاكل الأداء والاستجابة. يحسّن Intlayer تحميل المحتوى الخاص بك في وقت البناء.

</Accordion>

<Accordion header="التوسع مع غير المطورين">

أكثر من مجرد حل i18n، يوفر Intlayer **[محرر مرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)** ذاتي الاستضافة و**[CMS كامل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)** لمساعدتك على إدارة محتواك متعدد اللغات في **الوقت الفعلي**، مما يجعل التعاون مع المترجمين والكتاب والأعضاء الآخرين في الفريق بسيطاً. يمكن تخزين المحتوى محلياً و/أو بعداً.

</Accordion>

</AccordionGroup>

---

## استراتيجيات الترحيل

هناك استراتيجيتان متكاملتان للترحيل من `i18next` إلى Intlayer:

1. **محول التوافق (موصى به للتطبيقات الموجودة)** — قم بتثبيت `@intlayer/i18next`. تكشف هذه الحزمة عن **نفس API تماماً** من `i18next` ولكن تفوض كل عمل الترجمة إلى Intlayer تحت الغطاء. تحافظ على استدعاءات `i18next.t()` و `i18next.changeLanguage()` و `createInstance()` الموجودة — التغيير الوحيد هو مسار الاستيراد والتهيئة.

2. **الترحيل الكامل** — استبدل تدريجياً APIs من i18next بأدوات Intlayer الأصلية ودمج المحتوى في ملفات `.content.ts`.

يغطي هذا الدليل **الاستراتيجية 1** أولاً (محول التوافق drop-in)، ثم يرشدك عبر الترحيل الكامل الاختياري.

---

## جدول المحتويات

<TOC/>

---

## الترحيل السريع

الخطوات التالية هي الحد الأدنى المطلوب لتشغيل تطبيق `i18next` الموجود على Intlayer بدون تغيير الكود.

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت حزم Intlayer الأساسية ومحول التوافق:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> العلم `--interactive` اختياري. استخدم `intlayer-cli init` إذا كنت وكيل ذكي.

> سيكتشف هذا الأمر بيئتك وسيثبت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> يمكنك الاحتفاظ بـ `i18next` مثبتاً — يستخدم محول التوافق كـ `devDependency` / `peerDependency` لأنواع TypeScript.

</Step>

<Step number={2} title="تكوين Intlayer">

ينشئ أمر `intlayer init` ملف `intlayer.config.ts` بدء. حدثّه ليطابق البيئات المحلية الموجودة لديك وأشر إلى مكوّن `syncJSON` في ملفات الرسائل الخاصة بك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // أضف جميع البيئات المحلية الموجودة لديك هنا
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // يطابق صيغة ملاصقات i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** يعيّن بيئة محلية إلى مسار ملف JSON الخاص بها. **`location`** يخبر مراقب Intlayer أي مجلد للبحث عن التغييرات. يضمن الخيار `format: 'i18next'` أن الملاصقات مثل `{{name}}` يتم تحليلها بشكل صحيح.

</Step>

<Step number={3} title="تحديث أسماء Bundler المستعارة (اختياري)">

إذا كنت تستخدم bundler (Vite, Webpack, esbuild)، يمكنك حقن اسم مستعار للملف حتى يتم حل `import ... from 'i18next'` تلقائياً إلى `@intlayer/i18next`. يزيل الحاجة لتغيير الاستيرادات يدويياً في قاعدة الكود الخاصة بك.

**لـ Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` يغلف مكوّن `intlayer()` من `vite-intlayer` ويضيف
> اسم مستعار `i18next` → `@intlayer/i18next` لك. يجمّع المكوّن العادي `intlayer()`
> من `vite-intlayer` القواامس ولكن **لا** يضيف هذا الاسم المستعار — يمكنك حينها
> إعادة تسمية الاستيرادات إلى `@intlayer/i18next` يدويياً (انظر الخطوة التالية).

</Step>

</Steps>

هذا كل شيء للترحيل السريع. يعمل التطبيق الخاص بك الآن على Intlayer مع الاحتفاظ بكل استيراد API وـ `i18next` كما هي.

---

## الترحيل الكامل

الخطوات أدناه اختيارية ويمكن إنجازها بشكل تدريجي. تفتح مجموعة ميزات Intlayer الكاملة: محرر مرئي، CMS، ملفات محتوى مكتوبة، ترجمة مدفوعة بالذكاء الاصطناعي، والمزيد.

<Steps>

<Step number={4} title="إعادة تسمية الاستيراد الصريحة (اختياري)" isOptional={true}>

إذا كنت تفضل جعل التبعية صريحة في ملفات المصدر الخاصة بك، أو إذا لم تكن تستخدم مكوّن bundler لتحويل الاستيرادات، يمكنك إعادة تسمية الاستيرادات يدويياً:

| قبل                                        | بعد                                                  |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

هذه **بدائل drop-in** — لا تغييرات في توقيعات الدالة أو الحجج أو أنواع الإرجاع مطلوبة.

</Step>

<Step number={5} title="تفعيل أتمتة الترجمة المدفوعة بالذكاء الاصطناعي" isOptional={true}>

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

أضف تكوين AI إلى `intlayer.config.ts`:

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
    // provider: "openai",     // افتراضي
    // model: "gpt-4o-mini",   // افتراضي
  },
};

export default config;
```

> انظر [وثائق Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) لجميع الخيارات المتاحة.

</Step>

</Steps>

---

## ما يمكنك حذفه بعد الترحيل

بمجرد وضع محول التوافق، يمكن إزالة نموذج `i18next` التالي:

| الملف / النمط                      | لماذا لم تعد هناك حاجة                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| استدعاءات `i18next.init()`         | يهيّئ Intlayer كل شيء تلقائياً؛ لا توجد خطوة تحميل runtime.                                                         |
| `i18next.use(...)`                 | لا يستخدم Intlayer مكوّنات i18next أو backends أو كاشفات اللغات.                                                    |
| حزم اللغات JSON (`locales/*.json`) | تُحتاج حزم JSON فقط إذا كنت تستخدم مكوّن `syncJSON` بعد. بمجرد الترحيل إلى ملفات `.content.ts` يمكنك حذف مجلد JSON. |

عندما تكون جاهزاً للمضي أبعد، يكتشف Intlayer **تلقائياً جميع ملفات `.content.ts` و `.content.json` في أي مكان في قاعدة الكود الخاصة بك** (افتراضياً، في أي مكان داخل `./src`). يمكنك وضع ملف `my-component.content.ts` بجانب منطقك مباشرة وسيلتقطه Intlayer في وقت البناء بدون تكوين إضافي — لا استيرادات، لا تسجيل، لا حاجة لملف فهرس مركزي. هذا يجعل دمج الترجمات بدون احتكاك تماماً.

---

## تكوين TypeScript

يستخدم Intlayer module augmentation لتوفير intellisense TypeScript الكامل لمفاتيح الترجمة الخاصة بك. تأكد من أن `tsconfig.json` الخاص بك يتضمن الأنواع المُنتجة تلقائياً:

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الموجودة لديك
  "include": [
    // ... تكوينات TypeScript الموجودة لديك
    ".intlayer/**/*.ts", // تضمين الأنواع المُنتجة تلقائياً
  ],
}
```

---

## تكوين Git

أضف مجلد Intlayer المُنتج إلى `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات المُنتجة بواسطة Intlayer
.intlayer
```

---

## اذهب أبعد

- **محرر مرئي** — إدارة الترجمات بصرياً في متصفحك: [محرر Intlayer المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)
- **CMS** — خارج الخدمة وإدارة المحتوى بعداً: [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- **VS Code Extension** — الحصول على الإكمال التلقائي واكتشاف أخطاء الترجمة في الوقت الفعلي: [ملحق Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)
- **مرجع CLI** — قائمة كاملة بأوامر CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md)

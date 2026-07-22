---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: الترحيل من next-intl إلى Intlayer | التدويل (i18n)
description: تعرّف على كيفية ترحيل تطبيق Next.js الخاص بك من next-intl إلى Intlayer - خطوة بخطوة، دون كسر الكود الموجود. استخدم محول التوافق @intlayer/next-intl للانتقال بدون انقطاع.
keywords:
  - next-intl
  - intlayer
  - ترحيل
  - التدويل
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: بدء السجل
author: aymericzip
---

# الترحيل من next-intl إلى Intlayer

## لماذا الترحيل من next-intl إلى Intlayer؟

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

## استراتيجية الترحيل

الأسلوب الموصى به للتطبيقات الموجودة هو **محول التوافق**: قم بتثبيت `@intlayer/next-intl`، الذي يعرض **نفس API تماماً** كـ `next-intl` لكن يوكل جميع أعمال الترجمة إلى Intlayer تحت الغطاء.

تحتفظ باستدعاءات `useTranslations` و `getTranslations` و `NextIntlClientProvider` الموجودة - **التغيير الوحيد هو مسار الاستيراد**. لا يلزم إعادة بناء توقيعات الاستدعاء أو أشكال props أو بنية المكون.

بمرور الوقت، يمكنك بشكل اختياري ترحيل ملفات فردية إلى صيغة Intlayer الأكثر ثراءً `.content.ts` لفتح محرر بصري و CMS والنطاق المحتوى لكل مكون - لكن هذه الخطوة اختيارية تماماً ويمكن القيام بها بشكل تدريجي.

---

## جدول المحتويات

<TOC/>

---

## الترحيل السريع

الخطوات التالية هي الحد الأدنى المطلوب للحصول على تطبيق `next-intl` الموجود يعمل على Intlayer دون تغييرات الكود.

<Steps>

<Step number={1} title="تثبيت التبعيات">

قم بتثبيت حزم Intlayer الأساسية ومحول التوافق `@intlayer/next-intl`:

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> احتفظ بـ `next-intl` مثبتاً - لا يزال مطلوباً للتوجيه **عبر URL** (`createNavigation`، `createMiddleware`، `Link`، `redirect`، `usePathname`، `useRouter`). محول التوافق **لا** يستبدل طبقة التوجيه.

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
      // يطابق بناء جملة العنصر النائب من next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** يعيّن منطقة إلى مسار ملفها JSON. **`location`** يخبر المراقب Intlayer أي مجلد يجب مراقبته للتغييرات. يضمن الخيار `format: 'icu'` أن العناصر النائبة ICU مثل `{name}` و `{count, plural, one {# item} other {# items}}` يتم تحليلها بشكل صحيح.

> للحصول على قائمة كاملة بخيارات التكوين، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="إضافة مكون Intlayer إلى Next.js">

لف إعداد Next.js الموجود لديك مع `createNextIntlPlugin` من `@intlayer/next-intl/plugin`. يقوم هذا الغلاف بدمج `withIntlayer` **و** تسجيل بدائل `next-intl` → `@intlayer/next-intl` لك:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* خيارات التكوين الموجودة */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` يلتف `withIntlayer`، ويكتشف تلقائياً **Webpack** أو **Turbopack**، ويربط مراقبة المحتوى وترجمة القاموس، و - بشكل حاسم - **يحقن بدائل module** بحيث تتم إعادة توجيه استدعاءات `import … from 'next-intl'` الموجودة بشفافية إلى `@intlayer/next-intl` في وقت البناء. إدخال التوجيه `next-intl/routing` يترك يشير إلى الحزمة الحقيقية. لا توجد حاجة لتغييرات ملفات المصدر.
>
> تفضل `withIntlayer` البسيط من `next-intlayer/server`؟ سيجمّع قواامسك، لكنه **لا** يضيف بدائل `next-intl` - ستضطر بعد ذلك إلى إعادة تسمية الاستيرادات إلى `@intlayer/next-intl` يدويًا (انظر الخطوة 4).

> **لا تحتاج أكثر إلى `getRequestConfig` أو `loadMessages`.** مع `next-intl`، كان عليك كتابة ملف `src/i18n.ts` يحمل حزم رسائل JSON على كل طلب عبر `getRequestConfig`. يجمّع Intlayer جميع القواامس في **وقت البناء**، لذا لا توجد خطوة تحميل وقت التشغيل. يمكنك حذف هذا الملف بالكامل (أو الاحتفاظ بأجزاء التوجيه فقط إذا كنت تستخدم `createNavigation`).

</Step>

</Steps>

هذا كل ما هو مطلوب للترحيل السريع. تطبيقك يعمل الآن على Intlayer مع الحفاظ على كل استيراد واجهة برمجية من `next-intl`.

> **مفاتيح ترجمة مكتوبة - تلقائي.** بمجرد أن يجمّع Intlayer القواامس، يتم كتابة `useTranslations` و `getTranslations` مقابل المحتوى الفعلي. يتم إكمال المفاتيح تلقائياً في محرر IDE ومسارات غير صحيحة تسبب أخطاء TypeScript في وقت البناء - لا يلزم إعداد إضافي.
>
> ```tsx
> // مكون العميل - 'about' هو مفتاح قاموس مسجل
> const t = useTranslations("about");
> t("counter.label"); // ✓ مكتمل
> t("does.not.exist"); // ✗ خطأ TypeScript
>
> // مكون الخادم
> const t = await getTranslations("about");
> t("counter.label"); // ✓ مكتوب
> ```

---

## الترحيل الكامل

الخطوات أدناه اختيارية ويمكن القيام بها بشكل تدريجي. تفتح مجموعة ميزات Intlayer الكاملة: محرر بصري، CMS، ملفات محتوى مكتوبة، ترجمة مدعومة بـ AI، والمزيد.

<Steps>

<Step number={4} title="إعادة تسمية الاستيراد الصريح (اختياري)" isOptional={true}>

غلاف `createNextIntlPlugin()` يتعامل بالفعل مع بديل `next-intl` → `@intlayer/next-intl` على مستوى bundler. إذا كنت تفضل جعل التبعية صريحة في ملفات المصدر (واستخدام مكون `withIntlayer` البسيط بدلاً من ذلك)، يمكنك إعادة تسمية الاستيرادات يدويًا:

| قبل                                                  | بعد                                                            |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> احفظ دائماً استيرادات التوجيه من `next-intl` الحقيقية - محول التوافق **لا** يستبدل طبقة التوجيه عبر URL:
>
> ```ts
> // ✅ احفظ هذه دائماً من `next-intl` الحقيقية
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> بدلاً من ذلك، يمكنك استخدام `defineRouting` من `@intlayer/next-intl/routing` والذي يدمج إعداد locale من `intlayer.config.ts` تلقائياً.

</Step>

<Step number={5} title="تفعيل أتمتة الترجمة المدعومة بـ AI" isOptional={true}>

بمجرد توصيل Intlayer، يمكنك استخدام CLI الخاص به لملء الترجمات المفقودة تلقائياً باستخدام LLM من اختيارك:

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

أضف `OPENAI_API_KEY` (أو مفتاح موفر مفضل) إلى ملف `.env` الخاص بك، ثم قم بتوسيع `intlayer.config.ts`:

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
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

بمجرد وضع `@intlayer/next-intl`، يمكن إزالة الكود النموذجي التالي من `next-intl`:

| الملف / النمط                                         | لماذا لا يكون مطلوباً بعد الآن                                                                                                               |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` → تصدير `getRequestConfig`              | يجمّع Intlayer القواامس في وقت البناء؛ لا توجد رسالة تحميل لكل طلب. احتفظ بالملف فقط إذا كنت تصدّر أيضاً مساعدات التوجيه `createNavigation`. |
| استدعاء `loadMessages()` / `getMessages()` في التخطيط | يقرأ `NextIntlClientProvider` من `@intlayer/next-intl` من الإخراج المجمع؛ لا يلزم `messages` prop.                                           |
| استيرادات `locales/{locale}/*.json` في التخطيط        | حزم JSON مطلوبة فقط إذا كنت تستخدم بعد مكون `syncJSON`. بمجرد الترحيل إلى ملفات `.content.ts` يمكنك حذف مجلد JSON.                           |

عندما تكون جاهزاً للمضي قدماً، يكتشف Intlayer **تلقائياً جميع ملفات `.content.ts` و `.content.json` في أي مكان في codebase** (افتراضياً، في أي مكان داخل `./src`). يمكنك وضع ملف `about.content.ts` بجوار `about/page.tsx` مباشرة وسيلتقطه Intlayer في وقت البناء دون تكوين إضافي - لا استيرادات، لا تسجيل، لا ملف فهرس مركزي مطلوب. هذا يجعل co-locating الترجمات مع الصفحات والمكونات خالياً من الاحتكاك تماماً.

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
- **Intlayer مع Next.js** — دليل الإعداد الكامل لـ Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)

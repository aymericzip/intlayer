---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: محرر المرئي لِانتلاير | تحرير محتوىك باستخدام محرر المرئي
description: اكتشف كيفية استخدام محرر Intlayer لإدارة موقعك الإلكتروني متعدد اللغات. اتبع الخطوات في هذه الوثيقة عبر الإنترنت لإعداد مشروعك في بضع دقائق.
keywords:
  - محرر
  - تدويل
  - وثائق
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "بدء السجل"
author: aymericzip
---

# وثائق محرر Intlayer البصري

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

محرر Intlayer البصري هو أداة تقوم بتغليف موقعك الإلكتروني للتفاعل مع ملفات إعلان المحتوى الخاصة بك باستخدام محرر بصري.

![واجهة محرر Intlayer البصري](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

حزمة `intlayer-editor` مبنية على Intlayer ومتاحة لتطبيقات JavaScript، مثل React (Create React App)، Vite + React، و Next.js.

## المحرر البصري مقابل CMS

محرر Intlayer البصري هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر بصري للقواميس المحلية. بمجرد إجراء تغيير، سيتم استبدال المحتوى في قاعدة الكود. هذا يعني أن التطبيق سيتم إعادة بنائه وستتم إعادة تحميل الصفحة لعرض المحتوى الجديد.

على النقيض من ذلك، فإن [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) هو أداة تتيح لك إدارة المحتوى الخاص بك في محرر بصري للقواميس البعيدة. بمجرد إجراء تغيير، لن يؤثر المحتوى على قاعدة الكود الخاصة بك. وسيعرض الموقع تلقائيًا المحتوى الذي تم تغييره.

## دمج Intlayer في تطبيقك

لمزيد من التفاصيل حول كيفية دمج Intlayer، راجع القسم المناسب أدناه:

### الدمج مع Next.js

لدمج مع Next.js، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md).

### الدمج مع Create React App

لدمج مع Create React App، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md).

### الدمج مع Vite + React

لدمج مع Vite + React، راجع [دليل الإعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md).

## كيفية عمل محرر Intlayer

المحرر البصري في تطبيق يتضمن شيئين:

- تطبيق واجهة أمامية يعرض موقعك داخل iframe. إذا كان موقعك يستخدم Intlayer، سيكتشف المحرر البصري محتواك تلقائيًا، وسيسمح لك بالتفاعل معه. بمجرد إجراء تعديل، ستتمكن من تنزيل تغييراتك.

- بمجرد النقر على زر التنزيل، سيرسل المحرر البصري طلبًا إلى الخادم لاستبدال ملفات إعلان المحتوى الخاصة بك بالمحتوى الجديد (أينما تم إعلان هذه الملفات في مشروعك).

> لاحظ أنه في الوقت الحالي، سيكتب محرر Intlayer ملفات إعلان المحتوى الخاصة بك كملفات JSON.

## التثبيت

بمجرد تكوين Intlayer في مشروعك، قم ببساطة بتثبيت `intlayer-editor` كاعتماد تطوير:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

باستخدام `--with` flag، يمكنك بدء المحرر بالتوازي مع أمر آخر:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## التكوين

في ملف تكوين Intlayer الخاص بك، يمكنك تخصيص إعدادات المحرر:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... إعدادات التكوين الأخرى
  editor: {
    /**
     * مطلوب
     * عنوان URL للتطبيق.
     * هذا هو عنوان URL المستهدف من قبل المحرر البصري.
     * مثال: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * اختياري
     * الافتراضي هو `true`. إذا كان `false`، فإن المحرر غير نشط ولا يمكن الوصول إليه.
     * يمكن استخدامه لتعطيل المحرر لبيئات محددة لأسباب أمنية، مثل الإنتاج.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * اختياري
     * الافتراضي هو `8000`.
     * منفذ خادم المحرر.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * اختياري
     * الافتراضي هو "http://localhost:8000"
     * عنوان URL لخادم المحرر.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> لمشاهدة جميع المعلمات المتاحة، راجع [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## استخدام المحرر

1. عند تثبيت المحرر، يمكنك بدء تشغيل المحرر باستخدام الأمر التالي:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **لاحظ أنه يجب تشغيل تطبيقك بالتوازي.** يجب أن يتطابق عنوان URL للتطبيق مع الذي قمت بتعيينه في تكوين المحرر (`applicationURL`).

> **ملاحظة: يتم إعادة تصدير الأمر من خلال حزمة `intlayer`. يمكنك استخدام `npx intlayer editor start` بدلاً من ذلك.**

2. ثم افتح عنوان URL المقدم. الافتراضي هو `http://localhost:8000`.

   يمكنك عرض كل حقل مفهرس بواسطة Intlayer عن طريق التمرير فوق المحتوى الخاص بك باستخدام المؤشر.

   ![التمرير فوق المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. إذا كان محتواك محددًا، يمكنك الضغط عليه مطولاً لعرض درج التعديل.

## تكوين البيئة

يمكن تكوين المحرر لاستخدام ملف بيئة محدد. هذا مفيد عندما تريد استخدام نفس ملف التكوين للتطوير والإنتاج.

لاستخدام ملف بيئة محدد، يمكنك استخدام العلامة `--env-file` أو `-f` عند بدء تشغيل المحرر:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> لاحظ أن ملف البيئة يجب أن يكون موجودًا في الدليل الجذر لمشروعك.

أو يمكنك استخدام العلامة `--env` أو `-e` لتحديد البيئة:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## التصحيح

إذا واجهت أي مشاكل مع المحرر البصري، تحقق من التالي:

- المحرر البصري والتطبيق يعملان.

- تم إعداد [تكوين المحرر](https://intlayer.org/doc/concept/configuration#editor-configuration) بشكل صحيح في ملف تكوين Intlayer الخاص بك.
  - الحقول المطلوبة:
    - يجب أن يتطابق عنوان URL للتطبيق مع الذي قمت بتعيينه في تكوين المحرر (`applicationURL`).

- يستخدم المحرر المرئي iframe لعرض موقعك الإلكتروني. تأكد من أن سياسة أمان المحتوى (CSP) لموقعك تسمح بعنوان URL الخاص بنظام إدارة المحتوى (CMS) كـ `frame-ancestors` (`http://localhost:8000` بشكل افتراضي). تحقق من وحدة تحكم المحرر لأي أخطاء.

## الأسئلة الشائعة

<FAQ>

<Question title="ما الفرق بين المحرر المرئي ونظام إدارة المحتوى (CMS)؟">

يعدل المحرر المرئي القواميس المحلية ويحفظ التغييرات مباشرة في ملفات الكود المصدر الخاصة بك، وبالتالي يخضع لمراجعة Git القياسية. يخزن CMS المحتوى على خادم بعيد للنشر الفوري دون إعادة البناء.

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة (bundle) تطبيقي؟">

أقل بكثير من الإعدادات القائمة على فضاءات الأسماء، لأن الصفحة لا تُحمّل أبدًا كتالوجًا لا تعرضه. يُحل المحتوى المعروض على الخادم مباشرة على الخادم، ويستبدل مترجم وقت البناء استدعاءات `useIntlayer` بإدخالات القاموس الدقيقة التي يستخدمها المكون، لذلك يتم التخلص من المفاتيح واللغات غير المستخدمة. تقسم [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) الباقي حسب اللغة. مقارنة بالبدائل التقليدية، يقلل Intlayer حجم الحزمة والصفحة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يمكنني الترحيل من i18next أو next-intl أو react-i18next دون إعادة كتابة مكوناتي؟">

نعم، وبطريقتين. يمكنك ترحيل المحتوى تدريجيًا باستخدام [دليل ترحيل i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md) أو [دليل ترحيل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md). أو يمكنك الاحتفاظ بواجهة برمجة التطبيقات الحالية بالكامل: تكشف [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) نفس واجهات `i18next` و `react-i18next` و `next-intl` و `next-i18next` و `react-intl` و `use-intl` و `vue-i18n` و `Lingui`، ولكنها مدعومة بقواميس Intlayer، بحيث تتغير الاستيرادات فقط بينما يظل كود المكون كما هو.

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء على كود JSX و TSX و Vue و Svelte، منشئًا القواميس عند كل تغيير دون الحاجة إلى إدارة المفاتيح يدويًا.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="أين يعمل المحرر المرئي؟">

على بنيتك التحتية الخاصة. يحمل المحرر تطبيقك داخل iframe ويتواصل مع خادم المحرر المحلي، لذلك لا يتم إرسال المحتوى خارجيًا أبدًا.

</Question>

<Question title="هل يحتاج المحررون إلى معرفة كيفية كتابة الكود؟">

لا. يفتحون موقع الويب، وينقرون مباشرة على عنصر النص ويحررونه في مكانه. يحدد المحرر تلقائيًا إدخال القاموس المقابل.

</Question>

<Question title="هل التحرير عبر المحرر المرئي يغير ملفاتي المصدر؟">

نعم، تم تصميمه هكذا تحديدًا. تتم كتابة التغيير في ملف إعلان المحتوى في قاعدة الكود الخاصة بك ويظهر كتعديل عادي في git diff.

</Question>

<Question title="يعرض المحرر صفحة بيضاء أو يرفض تحميل الموقع. ماذا أفحص؟">

يعرض المحرر التطبيق في iframe، لذلك يجب أن تسمح سياسة أمان المحتوى (CSP) الخاصة بك بأصل المحرر في توجيه `frame-ancestors`. تحقق أيضًا من تشغيل كل من خادم التطبيق وخادم المحرر.

</Question>

<Question title="هل يمكنني استخدام المحرر المرئي في بيئة الإنتاج؟">

تم تصميمه لبيئات التطوير والمرحلة الانتقالية (staging)، حيث تكون إعادة البناء بعد التحرير مقبولة. لتحرير المحتوى على موقع إنتاج مباشر، يوصى باستخدام [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

</Question>

<Question title="هل المحرر المرئي مجاني؟">

نعم. المحرر المرئي جزء من المشروع مفتوح المصدر بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري.

</Question>

</FAQ>

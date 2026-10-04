---
createdAt: 2025-08-23
updatedAt: 2026-05-31
priority: 9
title: "تدويل Hono - الدليل الكامل لترجمة تطبيقك"
description: "إعداد Intlayer في Hono: اكتشاف اللغة لكل طلب عبر وسيط، وترجمة استجابات API على Node أو Bun أو بيئات edge."
keywords:
  - تدويل
  - توثيق
  - Intlayer
  - Hono
  - JavaScript
  - واجهة خلفية
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "تهيئة السجل"
author: aymericzip
---

# ترجم موقع Hono الخاص بك باستخدام Intlayer

`hono-intlayer` هو وسيط (middleware) قوي للتدويل (i18n) لتطبيقات Hono، مصمم لجعل خدماتك الخلفية متاحة عالميًا من خلال تقديم ردود محلية بناءً على تفضيلات العميل.

## حالات الاستخدام العملي

- **عرض أخطاء الواجهة الخلفية بلغة المستخدم**: عند حدوث خطأ، يؤدي عرض الرسائل بلغة المستخدم الأصلية إلى تحسين الفهم وتقليل الإحباط. هذا مفيد بشكل خاص لرسائل الخطأ الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل التنبيهات (toasts) أو النوافذ المنبثقة (modals).

- **استرجاع محتوى متعدد اللغات**: بالنسبة للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التدويل إمكانية تقديم هذا المحتوى بلغات متعددة. هذا أمر بالغ الأهمية لمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات والمحتويات الأخرى باللغة التي يفضلها المستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني للمعاملات أو حملات تسويقية أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **إشعارات دفع متعددة اللغات**: بالنسبة لتطبيقات الهاتف المحمول، يمكن أن يؤدي إرسال إشعارات الدفع بلغة المستخدم المفضلة إلى تعزيز التفاعل والاحتفاظ بالمستخدمين. هذه اللمسة الشخصية يمكن أن تجعل الإشعارات تبدو أكثر صلة وقابلة للتنفيذ.

- **اتصالات أخرى**: أي شكل من أشكال الاتصال من الواجهة الخلفية، مثل رسائل SMS أو تنبيهات النظام أو تحديثات واجهة المستخدم، يستفيد من كونه بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم الإجمالية.

من خلال تدويل الواجهة الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة أساسية في توسيع نطاق خدماتك في جميع أنحاء العالم.

## البدء

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-hono-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### التثبيت

لبدء استخدام `hono-intlayer` ، قم بتثبيت الحزمة باستخدام npm:

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

> علامة `--interactive` اختيارية. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

> سيقوم هذا الأمر باكتشاف بيئتك وتثبيت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

### الإعداد

قم بتكوين إعدادات التدويل من خلال إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.ARABIC,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### الإعلان عن المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="src/index.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ar: "مثال على المحتوى المرتجع باللغة العربية",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ar: "مثال على المحتوى المرجع باللغة العربية",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "ar": "مثال على المحتوى المرجع باللغة العربية",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا ، `./src`). وتطابق ملحق ملف إعلان المحتوى (افتراضيًا ، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل ، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

- [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)

### إعداد تطبيق Hono

قم بإعداد تطبيق Hono الخاص بك لاستخدام `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// تحميل معالج طلبات التدويل
app.use("*", intlayer());

// المسارات
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ar: "مثال على المحتوى المرتجع باللغة العربية",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### التوافق

`hono-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/exports.md)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/exports.md)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/exports.md)

كما يعمل بسلاسة مع أي حل تدويل عبر بيئات متنوعة ، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال العناوين أو ملفات تعريف الارتباط:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات التكوين الأخرى
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

افتراضيًا ، سيقوم `hono-intlayer` بتفسير عنوان `Accept-Language` لتحديد لغة العميل المفضلة.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة ، قم بزيارة [التوثيق الخاص بنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

- [إعدادات Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

### تكوين TypeScript

تستفيد `hono-intlayer` من إمكانيات TypeScript القوية لتعزيز عملية التدويل. تضمن الكتابة الثابتة في TypeScript مراعاة كل مفتاح ترجمة ، مما يقلل من مخاطر فقدان الترجمات ويحسن قابلية الصيانة.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

تأكد من تضمين الأنواع التي تم إنشاؤها تلقائيًا (افتراضيًا في `./types/intlayer.d.ts`) في ملف `tsconfig.json` الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### إضافة VS Code

لتحسين تجربة تطوير Intlayer الخاصة بك ، يمكنك تثبيت إضافة **Intlayer VS Code Extension** الرسمية.

- [التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة ، راجع [توثيق إضافة Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md).

- [توثيق إضافة Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك ، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات Hono؟">

لا يحتوي Hono على طبقة تدويل (i18n) خاصة به، لذا فإن الخيارات المتاحة هي استخدام مكتبة عامة مثل `i18next` موصولة يدويًا ببرمجية وسيطة (middleware)، أو استخدام `Intlayer` من خلال `hono-intlayer`، الذي يسجل البرمجية الوسيطة نيابة عنك، ويحدد اللغة لكل طلب، ويشارك نفس المحتوى المصرح به مع الواجهة الأمامية.

السبب في تدويل الواجهة الخلفية بالأساس هو أن جزءًا كبيرًا من النص الذي يقرأه المستخدم لا يمر أبدًا عبر الواجهة الأمامية: رسائل خطأ واجهة برمجة التطبيقات (API)، ورسائل البريد الإلكتروني الخاصة بالمعاملات، والإشعارات الفورية (push notifications)، والرسائل القصيرة (SMS)، وصادرات ملفات PDF. وتحتاج هذه النصوص إلى لغة المستلم، والتي تُحدد لكل طلب بدلاً من كل جلسة.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

- [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md)

</Question>
<Question title="كم يضيف i18n إلى حجم حزمة خادم Hono لدي؟">

القليل جدًا. تُجمَّع القواميس مسبقًا ولا تُضمَّن إلا اللغات التي تعلن عنها، لذلك لا يوجد تحميل للكتالوجات عند الإقلاع ولا قراءة للملفات أثناء معالجة الطلب. ويكتسب ذلك أهمية أكبر في عمليات النشر على البيئات عديمة الخوادم (serverless) وبيئات الحافة (edge)، حيث يحدد حجم الحزمة زمن البدء البارد (cold start). انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

- [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)

</Question>
<Question title="هل يمكنني الترحيل من `i18next` دون إعادة كتابة المعالجات (handlers) الخاصة بي؟">

نعم، وهناك مساران. يمكنك ترحيل المحتوى تدريجيًا باستخدام [دليل الترحيل من i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md). أو يمكنك الاحتفاظ بواجهتك البرمجية الحالية بالكامل: إذ توفّر [محولات التوافق (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) واجهة `i18next` نفسها تمامًا، لكن تخدمها قواميس Intlayer، فتتغير عمليات الاستيراد فقط ولا يتغير كود المعالجات.

- [دليل الترحيل من i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)
- [محولات التوافق (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md)

</Question>
<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

- [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md)
- [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md)
- [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md)

</Question>
<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج واحدة تلو الأخرى. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

- [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md)

وعلى جانب الواجهة الأمامية من المشروع نفسه، يذهب [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) أبعد من ذلك ويُنشئ القواميس في وقت البناء من كود JSX أو TSX أو Vue أو Svelte، بحيث يتشارك نصفا التطبيق طبقة محتوى واحدة دون أي مفاتيح تُدار يدويًا.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)

</Question>
<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى الذي يعلنه، واستخراج المحتوى من مكوّن، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو من علامة تبويب Intlayer مخصصة.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: الإدراك نفسه في أي محرر يدعم LSP، مع الانتقال إلى التعريف، والبحث عن جميع المراجع، ومعاينة القيمة المترجمة عند التمرير، والإكمال التلقائي للمفاتيح والحقول، وتحذير عندما لا يكون المفتاح معلنًا في أي مكان. كما يتعرف على استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`، مما يساعد أثناء الترحيل.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT، بحيث يجيب المساعد استنادًا إلى الوثائق الحالية بدلًا من التخمين، ويمكنه تشغيل أوامر مثل `intlayer fill` بنفسه.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مركّزة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`، بالإضافة إلى مهارة لكل إطار عمل، تعلّم الوكيل إعداد التوجيه لديك وأنواع عُقد المحتوى.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: ترصد قاعدة `no-raw-text` النصوص المكتوبة مباشرة في الكود، مع قواعد إضافية لمفاتيح القواميس الثابتة والمحتوى غير المستخدم.

</Question>
<Question title="كيف يعرف Intlayer اللغة التي يجب أن يجيب بها؟">

افتراضيًا، يقرأ `hono-intlayer` ترويسة `Accept-Language` للطلب الوارد ويختار أقرب لغة معلنة، مع الرجوع إلى لغتك الافتراضية. يمكنك تغيير المصدر عبر `routing.storage`، مثل ترويسة مخصصة أو ملف تعريف ارتباط (cookie) تضبطه الواجهة الأمامية، بحيث تجيب واجهة API باللغة التي اختارها المستخدم فعليًا بدلًا من اللغة التي يعلنها متصفحه. انظر [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

- [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

</Question>
<Question title="هل اللغة معزولة لكل طلب؟">

نعم. تحصر البرمجية الوسيطة اللغة النشطة ضمن نطاق الطلب، لذلك لا يقرأ طلبان متزامنان بلغتين مختلفتين لغة بعضهما أبدًا. وهذا ما يجعل استدعاء `t()` و `getIntlayer()` آمنًا من داخل خدمة (service) دون تمرير وسيط اللغة عبر كل دالة.

</Question>
<Question title="كيف أرسل رسائل البريد الإلكتروني الخاصة بالمعاملات بلغة المستلم؟">

أعلن محتوى البريد الإلكتروني في ملف محتوى مثل أي محتوى آخر، ثم استرجعه باستخدام `getIntlayer` بلغة المستلم المخزنة بدلًا من لغة الطلب. هذا مهم في المهام (jobs) وقوائم الانتظار (queues)، حيث تنتمي اللغة إلى سجل المستخدم ولا يوجد طلب وارد لقراءة ترويسة منه.

</Question>
<Question title="كيف أقوم بتوطين رسائل أخطاء API؟">

غلّف الرسالة بـ `t()` في الموضع الذي يُنشأ فيه الخطأ. تحلّها لغة الطلب النشطة، فيتلقى العميل رسالة يمكنه عرضها مباشرة، ولا تحتاج الواجهة الأمامية إلى كتالوج موازٍ لرموز الأخطاء.

</Question>
<Question title="هل يعمل على بيئات الحافة (edge) مثل Cloudflare Workers أو Deno أو Bun؟">

يستهدف Hono جميعها، ويحلّ Intlayer المحتوى من قواميس مُجمَّعة في وقت البناء بدلًا من قراءة ملفات الكتالوج من القرص في وقت التشغيل، وهو ما يتعطل عادةً في بيئات الحافة. أبقِ `dictionary.importMode` على قيمته الافتراضية `"static"` كي يُضمَّن المحتوى في حزمة الـ worker.

</Question>
<Question title="كيف أترجم محتوى الواجهة الخلفية تلقائيًا باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`، الذي يملأ الترجمات المفقودة باستخدام نموذج اللغة (LLM) الذي تختاره عبر مزودك ومفتاح API الخاص بك. أضف `--git-diff` لترجمة المحتوى الذي تغيّر في الفرع فقط. انظر [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

- [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md)
- [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md)

</Question>
<Question title="هل يدعم Intlayer صيغ الجمع والجنس والقيم المُدرجة على الخادم؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، و[المحتوى القائم على النوع الاجتماعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، والشروط، و[الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md) للقيم المُدرجة، و[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md) لنصوص رسائل البريد الإلكتروني، و[المنسّقات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md) للأرقام والتواريخ والعملات.

- [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)
- [المحتوى القائم على النوع الاجتماعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)
- [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)
- [المنسّقات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/formatters.md)

</Question>
<Question title="هل أحصل على الإكمال التلقائي لـ TypeScript على الخادم؟">

نعم. يُنشئ Intlayer أنواع قواميسك في `./types/intlayer.d.ts`، لذا يصبح المفتاح غير الموجود خطأ تجميع بدلًا من سلسلة فارغة في وقت التشغيل. شغّل `npx intlayer test` في CI لإفشال البناء عندما ينقص محتوى إحدى اللغات المعلنة.

</Question>
<Question title="هل يمكن للواجهة الأمامية والواجهة الخلفية مشاركة المحتوى نفسه؟">

نعم، وهذا هو الإعداد المعتاد. يعمل `hono-intlayer` جنبًا إلى جنب مع `react-intlayer` و `next-intlayer` و `vite-intlayer` على المحتوى المعلن نفسه، لذا فإن النص المستخدم في استجابة API وفي صفحة معًا يُعلَن مرة واحدة فقط. انظر [كيف يعمل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/how_works_intlayer.md).

- [كيف يعمل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/how_works_intlayer.md)

</Question>
<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) المستضاف خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- [استضافتها ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)

</Question>

</FAQ>

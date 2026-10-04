---
createdAt: 2025-12-30
updatedAt: 2026-05-31
priority: 9
title: "تدويل Fastify - الدليل الكامل لترجمة تطبيقك"
description: "إعداد Intlayer في Fastify: اكتشاف اللغة لكل طلب عبر الإضافة، وترجمة استجابات API ورسائل الأخطاء، مع أنواع من البداية إلى النهاية."
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - Fastify
  - JavaScript
  - الخادم
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.6.0
    date: 2025-12-31
    changes: "إضافة أمر init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "تهيئة السجل"
author: aymericzip
---

# ترجمة موقع الويب الخاص بخادم Fastify باستخدام Intlayer

`fastify-intlayer` هو ملحق (plugin) قوي للتدويل (i18n) لتطبيقات Fastify، مصمم لجعل خدمات الـ backend الخاصة بك متاحة عالميًا من خلال تقديم استجابات محلية حسب تفضيلات العميل.

> شاهد [تنفيذ الحزمة على GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer).

## حالات استخدام عملية

- **عرض أخطاء الـ backend بلغة المستخدم**: عند حدوث خطأ، عرض الرسائل بلغة المستخدم الأم يُحسّن الفهم ويقلل الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية للأخطاء التي قد تُعرض في مكونات الواجهة الأمامية مثل toasts أو modals.
- **استرجاع محتوى متعدد اللغات**: بالنسبة للتطبيقات التي تجلب المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بعدة لغات. هذا أمر حاسم لمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات ومحتويات أخرى باللغة التي يفضلها المستخدم.
- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني للمعاملات أو حملات تسويقية أو إشعارات، فإن إرسال الرسائل البريدية بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.
- **الإشعارات المتعددة اللغات**: بالنسبة لتطبيقات الجوال، إرسال إشعارات الدفع بلغة مفضلة لدى المستخدم يمكن أن يعزز التفاعل والاحتفاظ بالمستخدمين. تضيف هذه اللمسة الشخصية شعورًا بأن الإشعارات ذات صلة وقابلة للتنفيذ.
- **وسائل اتصال أخرى**: أي شكل من أشكال الاتصال من الـ backend، مثل رسائل SMS أو تنبيهات النظام أو تحديثات واجهة المستخدم، يستفيد من تقديمه بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم العامة.

من خلال تدويل الـ backend، لا يحترم تطبيقك الفروق الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة أساسية لتوسيع نطاق خدماتك عالميًا.

## البدء

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - كيفية تدويل تطبيقك باستخدام Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

شاهد [قالب التطبيق](https://github.com/aymericzip/intlayer-fastify-template) على GitHub.

### التثبيت

لبدء استخدام `fastify-intlayer`، قم بتثبيت الحزمة باستخدام npm:

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
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### الإعداد

قم بتكوين إعدادات التدويل بإنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### إعلان المحتوى

أنشئ وأدِر تعريفات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى في أي مكان داخل تطبيقك طالما أنها مضمنة في دليل `contentDir` (افتراضيًا `./src`). ويجب أن تتطابق مع امتداد ملف إعلان المحتوى (افتراضيًا `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

- [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)

### إعداد تطبيق Fastify

أعد إعداد تطبيق Fastify لاستخدام `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// تحميل إضافة التدويل
await fastify.register(intlayer);

// المسارات
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// بدء الخادم
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### التوافق

`fastify-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/exports.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/exports.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/exports.md) لتطبيقات Vite

كما يعمل بسلاسة مع أي حل للتدويل عبر بيئات متعددة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الـ middleware لاكتشاف اللغة عبر الرؤوس أو الكوكيز:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

بشكل افتراضي، سيقوم `fastify-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة لدى العميل.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة، قم بزيارة [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

- [إعدادات Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

### تكوين TypeScript

`fastify-intlayer` يستفيد من القدرات القوية لـ TypeScript لتحسين عملية التدويل. يضمن نظام الكتابة الثابتة في TypeScript أن كل مفتاح ترجمة مغطى، مما يقلل من خطر فقدان الترجمات ويحسن قابلية الصيانة.

تأكد من تضمين الأنواع المولدة تلقائيًا (بشكل افتراضي في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع المولدة تلقائيًا
  ],
}
```

### امتداد VS Code

لتحسين تجربة التطوير مع Intlayer، يمكنك تثبيت الامتداد الرسمي **Intlayer VS Code Extension**.

- [التثبيت من سوق إضافات VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يقدّم هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات مُضمّنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [وثائق امتداد Intlayer لـ VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md).

- [وثائق امتداد Intlayer لـ VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)

### تكوين Git

يوصى بتجاهل الملفات التي يولّدها Intlayer. يتيح ذلك تجنّب إضافتها في مستودع Git الخاص بك.

لتحقيق ذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer

```

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات Fastify؟">

- **مكونات Fastify الإضافية لـ `i18next`**: مكتبات وقت التشغيل القائمة على فضاءات أسماء JSON.
- **`Intlayer`**: مكون `fastify-intlayer` الإضافي المحسن لدورة حياة Fastify، أنواع TypeScript كاملة، ترجمة بالذكاء الاصطناعي، وقواميس مدمجة مع الواجهة الأمامية.

السبب وراء تدويل النهاية الخلفية (backend) في المقام الأول هو أن جزءًا كبيرًا من النصوص التي يقرأها المستخدم لا يمر أبدًا عبر الواجهة الأمامية (frontend): رسائل خطأ API، ورسائل البريد الإلكتروني الخاصة بالمعاملات، والإشعارات اللحظية، والرسائل القصيرة، وصادرات PDF. تحتاج هذه النصوص إلى لغة المستلم، والتي يتم تحديدها لكل طلب بدلاً من كل جلسة.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

- [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md)

</Question>
<Question title="كم يضيف i18n إلى حجم حزمة خادم Fastify لدي؟">

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

افتراضيًا، يقرأ `fastify-intlayer` ترويسة `Accept-Language` للطلب الوارد ويختار أقرب لغة معلنة، مع الرجوع إلى لغتك الافتراضية. يمكنك تغيير المصدر عبر `routing.storage`، مثل ترويسة مخصصة أو ملف تعريف ارتباط (cookie) تضبطه الواجهة الأمامية، بحيث تجيب واجهة API باللغة التي اختارها المستخدم فعليًا بدلًا من اللغة التي يعلنها متصفحه. انظر [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

- [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)

</Question>
<Question title="هل اللغة معزولة لكل طلب؟">

نعم. تحصر الإضافة (plugin) اللغة النشطة ضمن نطاق الطلب، لذلك لا يقرأ طلبان متزامنان بلغتين مختلفتين لغة بعضهما أبدًا. وهذا ما يجعل استدعاء `t()` و `getIntlayer()` آمنًا من داخل خدمة (service) دون تمرير وسيط اللغة عبر كل دالة.

</Question>
<Question title="كيف أرسل رسائل البريد الإلكتروني الخاصة بالمعاملات بلغة المستلم؟">

أعلن محتوى البريد الإلكتروني في ملف محتوى مثل أي محتوى آخر، ثم استرجعه باستخدام `getIntlayer` بلغة المستلم المخزنة بدلًا من لغة الطلب. هذا مهم في المهام (jobs) وقوائم الانتظار (queues)، حيث تنتمي اللغة إلى سجل المستخدم ولا يوجد طلب وارد لقراءة ترويسة منه.

</Question>
<Question title="كيف أقوم بتوطين رسائل أخطاء API؟">

غلّف الرسالة بـ `t()` في الموضع الذي يُنشأ فيه الخطأ. تحلّها لغة الطلب النشطة، فيتلقى العميل رسالة يمكنه عرضها مباشرة، ولا تحتاج الواجهة الأمامية إلى كتالوج موازٍ لرموز الأخطاء.

</Question>
<Question title="هل يعمل مع دورة حياة إضافات Fastify والتغليف (encapsulation)؟">

نعم. يُسجَّل `fastify-intlayer` كإضافة Fastify قياسية، لذا يتبع قواعد التغليف المعتادة. سجّله على مستوى الجذر، أو داخل النطاق الذي يحتاجه، قبل المسارات التي تقرأ المحتوى.

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

نعم، وهذا هو الإعداد المعتاد. يعمل `fastify-intlayer` جنبًا إلى جنب مع `react-intlayer` و `next-intlayer` و `vite-intlayer` على المحتوى المعلن نفسه، لذا فإن النص المستخدم في استجابة API وفي صفحة معًا يُعلَن مرة واحدة فقط. انظر [كيف يعمل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/how_works_intlayer.md).

- [كيف يعمل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/how_works_intlayer.md)

</Question>
<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) المستضاف خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- [استضافتها ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md)

</Question>

</FAQ>

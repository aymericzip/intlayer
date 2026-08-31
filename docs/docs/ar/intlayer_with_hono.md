---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "تدويل Hono - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Hono متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
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

# ترجم موقع Hono الخاص بك باستخدام Intlayer | التدويل (i18n)

`hono-intlayer` هو وسيط (middleware) قوي للتدويل (i18n) لتطبيقات Hono، مصمم لجعل خدماتك الخلفية متاحة عالميًا من خلال تقديم ردود محلية بناءً على تفضيلات العميل.

### حالات الاستخدام العملي

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
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite

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

### تكوين TypeScript

تستفيد `hono-intlayer` من إمكانيات TypeScript القوية لتعزيز عملية التدويل. تضمن الكتابة الثابتة في TypeScript مراعاة كل مفتاح ترجمة ، مما يقلل من مخاطر فقدان الترجمات ويحسن قابلية الصيانة.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

توفر هذه الإضافة:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الإضافة ، راجع [توثيق إضافة Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

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

- **كائنات التعيين الأساسية**: تفتقر إلى الأمان النوعي والمرونة.
- **`Intlayer`**: يعمل بشكل مثالي على Cloudflare Workers و Fastly و Deno و Bun و Node.js، مع ترجمة وقت البناء وزمن وصول صفري.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة خادم Hono لدي؟">

أقل بكثير من كتالوجات JSON التقليدية. يحسن مترجم Intlayer القواميس في وقت البناء ولا يعيد تحليلها عند كل طلب، مما يحافظ على استخدام الذاكرة ووقت بدء التشغيل البارد (cold start) في حده الأدنى. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

</Question>

<Question title="هل يمكنني الترحيل من i18next أو مكتبات الواجهة الخلفية الأخرى دون إعادة كتابة المعالجات؟">

نعم، عبر الترحيل التدريجي أو مزامنة ملفات الترجمة.

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء وينشئ القواميس عند كل تغيير.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح إلى ملف المحتوى، استخراج السلاسل، وتشغيل build و fill و test و push و pull من لوحة الأوامر.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي في أي محرر يدعم LSP. يتعامل أيضًا مع استدعاءات `i18next`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة يدويًا بدون تدويل.

</Question>

<Question title="كيف يتم اكتشاف لغة العميل في الطلبات الواردة؟">

تقرأ برمجية Hono الوسيطة ملفات تعريف الارتباط وترويسة `Accept-Language` عبر `c.req`، مما يوفر اللغة النشطة على `c.get('locale')`.

</Question>

<Question title="هل يمكن لنفس إعلان المحتوى أن يخدم استجابات API والواجهة الأمامية للويب؟">

نعم، هذه ميزة رئيسية في المستودعات الأحادية (monorepos) أو الحزم المشتركة. يمكن استيراد القاموس المصرح به في الواجهة الخلفية (رسائل البريد الإلكتروني، الأخطاء، استجابات API) والواجهة الأمامية (React, Vue, Svelte إلخ)، مما يحافظ على مصدر واحد للحقيقة لجميع النصوص.

</Question>

<Question title="هل يؤدي Intlayer إلى إبطاء معالجة الطلبات؟">

لا. يتم اكتشاف اللغة في برمجية وسيطة خفيفة الوزن للغاية (عن طريق قراءة ملفات تعريف الارتباط أو الاستعلام أو Accept-Language). يتم تجميع القواميس في وقت البناء وتبقى في الذاكرة، لذلك لا توجد قراءة للقرص أو تحليل للسلاسل عند وصول الطلب.

</Question>

<Question title="كيف أقوم بتوطين استجابات الأخطاء ورسائل البريد الإلكتروني وإشعارات الدفع؟">

عبر استدعاء الدالة `getIntlayer` أو `t()` استنادًا إلى لغة الطلب. إذا تم تخزين لغة المستخدم في قاعدة بيانات، يمكن استدعاء الدالة خارج سياق الطلب لمهام الخلفية مع تحديد اللغة المستهدفة صراحة.

</Question>

<Question title="هل يعمل Intlayer في بيئات Cloudflare Workers والـ Edge؟">

نعم. ينشئ Intlayer كود JavaScript خالص دون الاعتماد على نظام الملفات المحلي في وقت التشغيل، لذلك يعمل بسلاسة على Cloudflare Workers و Deno و Vercel Edge.

</Question>

<Question title="كيف أستخدم بادئات URL المترجمة في مسارات Hono؟">

باستخدام مقطع `/:locale/` أو إنشاء موجهات فرعية في Hono.

</Question>

<Question title="كيف أترجم التطبيق تلقائياً باستخدام الذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. يملأ هذا الأمر الترجمات المفقودة باستخدام نموذج اللغة الذي تختاره مع مزودك ومفتاح API الخاص بك، ويحد `--git-diff` العملية على الملفات المعدلة. انظر [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

</Question>

<Question title="هل يدعم Intlayer صيغ الجمع والجنس والنصوص المنسقة؟">

نعم: [صيغ الجمع (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/plurial.md)، [المحتوى القائم على النوع الاجتماعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender.md)، الشروط، [الإدراجات (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)، والمنسقات للأرقام والتواريخ والعملات.

</Question>

<Question title="كيف يمكن لأعضاء الفريق غير التقنيين تحرير قوالب البريد الإلكتروني ورسائل الخطأ دون لمس الكود؟">

خياران متاحان: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، الذي يفصل المحتوى عن قاعدة الكود ويسمح بالتحرير عبر الويب، أو [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، الذي يحفظ التغييرات مباشرة في ملفات الكود المحلية.

</Question>

<Question title="هل Intlayer مجاني ومفتوح المصدر؟">

نعم، بموجب ترخيص Apache 2.0، بما في ذلك الاستخدام التجاري. الـ CMS السحابي المستضاف هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>

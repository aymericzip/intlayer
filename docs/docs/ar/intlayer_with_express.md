---
createdAt: 2024-08-11
updatedAt: 2026-05-31
title: "تدويل Express - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق Express متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - دولية
  - توثيق
  - Intlayer
  - Express
  - JavaScript
  - الخلفية
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بداية التاريخ"
author: aymericzip
---

# ترجم Express backend باستخدام Intlayer | التدويل (i18n)

`express-intlayer` هو وسيط قوي للتدويل (i18n) لتطبيقات Express، مصمم لجعل خدماتك الخلفية متاحة عالميًا من خلال توفير استجابات محلية بناءً على تفضيلات العميل.

### حالات استخدام عملية

- **عرض أخطاء الخلفية بلغة المستخدم**: عند حدوث خطأ، عرض الرسائل بلغة المستخدم الأصلية يحسن الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل التوست أو النوافذ المنبثقة.

- **استرجاع المحتوى متعدد اللغات**: بالنسبة للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بلغات متعددة. هذا أمر حيوي للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات والمحتويات الأخرى باللغة المفضلة للمستخدم.
- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملاتية، حملات تسويقية، أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **إرسال رسائل بريد إلكترونية متعددة اللغات**: سواء كانت رسائل بريد إلكترونية معاملات أو حملات تسويقية أو إشعارات، يمكن لإرسال رسائل البريد الإلكترونية بلغة المستقبل أن يزيد بشكل كبير من الانخراط والفعالية.

- **إشعارات دفع متعددة اللغات**: بالنسبة لتطبيقات الهاتف المحمول، إرسال إشعارات الدفع بلغة المستخدم المفضلة يمكن أن يعزز التفاعل والاحتفاظ. هذه اللمسة الشخصية يمكن أن تجعل الإشعارات تبدو أكثر ملاءمة وقابلة للتنفيذ.

- **اتصالات أخرى**: أي شكل من أشكال الاتصال من الخلفية، مثل رسائل SMS، تنبيهات النظام، أو تحديثات واجهة المستخدم، يستفيد من أن يكون بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم بشكل عام.
  من خلال تدويل الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة رئيسية في توسيع خدماتك عالميًا.

من خلال جعل الخادم الخاص بك متعدد اللغات، لا تحترم تطبيقك الفروقات الثقافية فحسب، بل يتوافق أيضاً بشكل أفضل مع احتياجات السوق العالمي، مما يجعله خطوة أساسية في توسيع نطاق خدماتك عالمياً.

## البدء

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-express-template) on GitHub.

### التثبيت

لبدء استخدام `express-intlayer`، قم بتثبيت الحزمة باستخدام npm:

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
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### الإعداد

قم بتكوين إعدادات التدويل عن طريق إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

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

### إعلان المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

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
        "ar": "مثال على المحتوى المُعاد باللغة العربية",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان داخل تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا، `./src`). ويجب أن تطابق امتداد ملف إعلان المحتوى (افتراضيًا، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### إعداد تطبيق Express

قم بإعداد تطبيق Express الخاص بك لاستخدام `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// تحميل معالج طلبات التدويل
app.use(intlayer());

// المسارات
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      ar: "مثال على المحتوى المُعاد باللغة العربية",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// بدء الخادم
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### التوافق

`express-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite
  يعمل أيضًا بسلاسة مع أي حل للتدويل عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال الرؤوس أو ملفات تعريف الارتباط:

كما أنها تعمل بسلاسة مع أي حل دولي عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص middleware للكشف عن locale من خلال الرؤوس أو cookies:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات تكوين أخرى
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

بشكل افتراضي، سيقوم `express-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

> لمزيد من المعلومات حول التهيئة والمواضيع المتقدمة، قم بزيارة [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### تهيئة TypeScript

يستفيد `express-intlayer` من القدرات القوية لـ TypeScript لتعزيز عملية التدويل. يضمن النوع الثابت في TypeScript أن يتم تضمين كل مفتاح ترجمة، مما يقلل من خطر فقدان الترجمات ويحسن من سهولة الصيانة.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من تضمين الأنواع التي تم إنشاؤها تلقائيًا (افتراضيًا في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الحقيقي** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer لـ VS Code](https://intlayer.org/ar/doc/vs-code-extension).

### إعدادات Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب إضافتها إلى مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer
.intlayer
```

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات Express؟">

الخيار التاريخي هو `i18next` مع `i18next-http-middleware`، والذي يحمل كتالوجات JSON لكل مساحة اسم ويخزن اللغة في الطلب. البديل هو `Intlayer` عبر `express-intlayer`، والذي يعلن عن المحتوى في ملفات ذات أنواع محددة ومشتركة مع واجهتك الأمامية، ويحدد اللغة لكل طلب، ويضيف ترجمة بالذكاء الاصطناعي ونظام CMS.

السبب في تدويل الواجهة الخلفية بالأساس هو أن جزءًا كبيرًا من النص الذي يقرأه المستخدم لا يمر أبدًا عبر الواجهة الأمامية: رسائل خطأ واجهة برمجة التطبيقات (API)، ورسائل البريد الإلكتروني الخاصة بالمعاملات، والإشعارات الفورية (push notifications)، والرسائل القصيرة (SMS)، وصادرات ملفات PDF. وتحتاج هذه النصوص إلى لغة المستلم، والتي تُحدد لكل طلب بدلاً من كل جلسة.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة خادم Express لدي؟">

أقل بكثير من كتالوجات JSON التقليدية. يحسن مترجم Intlayer القواميس في وقت البناء ولا يعيد تحليلها عند كل طلب، مما يحافظ على استخدام الذاكرة ووقت بدء التشغيل البارد (cold start) في حده الأدنى. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

</Question>

<Question title="هل يمكنني الترحيل من i18next أو مكتبات الواجهة الخلفية الأخرى دون إعادة كتابة المعالجات؟">

نعم. يمكنك الترحيل تدريجيًا أو استخدام محولات التوافق للحفاظ على واجهات برمجة التطبيقات الحالية.

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

تفحص برمجية `app.use(intlayer())` الوسيطة بالترتيب بادئة URL، وملفات تعريف الارتباط، وترويسة `Accept-Language`، وتعود إلى اللغة الافتراضية. يتم تخزين اللغة المكتشفة في `req.locale`.

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

<Question title="هل يمكنني استخدام كاشف لغة مخصص؟">

نعم. يمكنك كتابة برمجية وسيطة مخصصة تستخرج اللغة من جلسة المستخدم أو ملف تعريف قاعدة البيانات وتعينها إلى `req.locale`.

</Question>

<Question title="كيف أستخدم بادئات URL المترجمة في مسارات Express؟">

من خلال خيارات توجيه Intlayer أو بإضافة مقطع `/:locale/` إلى مساراتك. يتحقق `validatePrefix` من اللغات الصالحة.

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

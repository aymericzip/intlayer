---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "تدويل AdonisJS - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق AdonisJS متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - AdonisJS
  - JavaScript
  - الواجهة الخلفية
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 8.0.0
    date: 2025-12-30
    changes: "تهيئة السجل"
author: aymericzip
---

# ترجمة الواجهة الخلفية لـ AdonisJS باستخدام Intlayer | التدويل (i18n)

`adonis-intlayer` هو حزمة تدويل (i18n) قوية لتطبيقات AdonisJS، مصممة لجعل خدمات الواجهة الخلفية الخاصة بك متاحة عالميًا من خلال تقديم استجابات مترجمة بناءً على تفضيلات العميل.

### حالات الاستخدام العملي

- **عرض أخطاء الواجهة الخلفية بلغة المستخدم**: عند حدوث خطأ، يؤدي عرض الرسائل بلغة المستخدم الأم إلى تحسين الفهم وتقليل الإحباط. هذا مفيد بشكل خاص لرسائل الخطأ الديناميكية التي قد يتم عرضها في مكونات الواجهة الأمامية مثل التنبيهات (toasts) أو النوافذ المنبثقة (modals).

- **استرداد المحتوى متعدد اللغات**: بالنسبة للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التدويل إمكانية تقديم هذا المحتوى بلغات متعددة. هذا أمر بالغ الأهمية لمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات والمحتويات الأخرى باللغة التي يفضلها المستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني للمعاملات، أو حملات تسويقية، أو إشعارات، فإن إرسال رسائل البريد الإلكتروني بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **إشعارات الدفع متعددة اللغات**: بالنسبة لتطبيقات الهاتف المحمول، يمكن أن يؤدي إرسال إشعارات الدفع بلغة المستخدم المفضلة إلى تعزيز التفاعل والاحتفاظ بالمستخدمين. هذه اللمسة الشخصية يمكن أن تجعل الإشعارات تبدو أكثر صلة وقابلية للتنفيذ.

- **الاتصالات الأخرى**: أي شكل من أشكال الاتصال من الواجهة الخلفية، مثل رسائل SMS، أو تنبيهات النظام، أو تحديثات واجهة المستخدم، يستفيد من كونه بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم الإجمالية.

من خلال تدويل الواجهة الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة رئيسية في توسيع خدماتك في جميع أنحاء العالم.

## البدء

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonis-template) on GitHub.

### التثبيت

لبدء استخدام `adonis-intlayer` ، قم بتثبيت الحزمة باستخدام npm:

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
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### الإعداد

قم بتكوين إعدادات التدويل عن طريق إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### التصريح عن المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ar: "مثال على المحتوى المرجع باللغة العربية",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "ar": "مثال على المحتوى المرجع باللغة العربية",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا ، `./src` أو `./app`). وتطابق ملحق ملف إعلان المحتوى (افتراضيًا ، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### إعداد تطبيق AdonisJS

قم بإعداد تطبيق AdonisJS الخاص بك لاستخدام `adonis-intlayer`.

#### تسجيل الوسيط (middleware)

أولاً، تحتاج إلى تسجيل وسيط `intlayer` في تطبيقك.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### تحديد المسارات الخاصة بك

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    ar: "مثال على المحتوى المرجع باللغة العربية",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### الدوال

يصدر `adonis-intlayer` عدة دوال للتعامل مع التدويل في تطبيقك:

- `t(content, locale?)`: دالة ترجمة أساسية.
- `getIntlayer(key, locale?)`: استرداد المحتوى بواسطة المفتاح من القواميس الخاصة بك.
- `getDictionary(dictionary, locale?)`: استرداد المحتوى من كائن قاموس معين.
- `getLocale()`: استرداد اللغة الحالية من سياق الطلب.

#### الاستخدام في المتحكمات (Controllers)

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        ar: "مرحبًا من المتحكم",
      })
    );
  }
}
```

### التوافق

`adonis-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md) لتطبيقات React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md) لتطبيقات Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md) لتطبيقات Vite

كما أنه يعمل بسلاسة مع أي حل تدويل عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات واجهة برمجة التطبيقات. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال العناوين أو ملفات تعريف الارتباط (cookies):

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

بشكل افتراضي، سيقوم `adonis-intlayer` بتفسير عنوان `Accept-Language` لتحديد اللغة المفضلة للعميل.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة، قم بزيارة [وثائقنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### تكوين TypeScript

يستفيد `adonis-intlayer` من القدرات القوية لـ TypeScript لتعزيز عملية التدويل. تضمن الكتابة الثابتة لـ TypeScript احتساب كل مفتاح ترجمة، مما يقلل من مخاطر فقدان الترجمات ويحسن إمكانية الصيانة.

![الإكمال التلقائي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![خطأ في الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من تضمين الأنواع التي تم إنشاؤها تلقائيًا (افتراضيًا في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  "include": [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### ملحق VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer ، يمكنك تثبيت ملحق **Intlayer VS Code Extension** الرسمي.

[التثبيت من VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الملحق:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **اكتشاف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء الترجمات وتحديثها بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الملحق، راجع [وثائق ملحق Intlayer VS Code](https://intlayer.org/ar/doc/vs-code-extension).

### تكوين Git

يوصى بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك هذا تجنب الالتزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات AdonisJS؟">

- **`@adonisjs/i18n`**: الحزمة الرسمية من AdonisJS.
- **`Intlayer`**: تكامل لكل من الواجهة الخلفية والواجهات الأمامية الحديثة، أنواع TypeScript كاملة، ترجمة بالذكاء الاصطناعي، ونظام CMS.

السبب وراء تدويل النهاية الخلفية (backend) في المقام الأول هو أن جزءًا كبيرًا من النصوص التي يقرأها المستخدم لا يمر أبدًا عبر الواجهة الأمامية (frontend): رسائل خطأ API، ورسائل البريد الإلكتروني الخاصة بالمعاملات، والإشعارات اللحظية، والرسائل القصيرة، وصادرات PDF. تحتاج هذه النصوص إلى لغة المستلم، والتي يتم تحديدها لكل طلب بدلاً من كل جلسة.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة خادم AdonisJS لدي؟">

أقل بكثير من كتالوجات JSON التقليدية. يحسن مترجم Intlayer القواميس في وقت البناء ولا يعيد تحليلها عند كل طلب، مما يحافظ على استخدام الذاكرة ووقت بدء التشغيل البارد (cold start) في حده الأدنى. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

</Question>

<Question title="هل يمكنني الترحيل من @adonisjs/i18n دون إعادة كتابة المعالجات؟">

إلى حد كبير نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات الترجمة الحالية.

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

تفحص برمجية AdonisJS الوسيطة ملفات تعريف الارتباط والترويسات عبر `HttpContext`، وتخزن اللغة في `ctx.locale`.

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

<Question title="هل يعمل Intlayer مع قوالب Edge (EdgeJS)؟">

نعم. من خلال ربط دوال Intlayer المساعدة بمتغيرات Edge العامة، يمكنك عرض النصوص المترجمة مباشرة في ملفات `.edge`.

</Question>

<Question title="كيف أقوم بتوطين رسائل التحقق من صحة VineJS؟">

في قواعد VineJS، يمكنك استدعاء `t()` أو `getIntlayer()` لإنشاء رسائل خطأ تطابق لغة المستخدم.

</Question>

<Question title="كيف أدير مقاطع اللغة في مسارات AdonisJS؟">

من خلال تحديد مجموعات مسارات باستخدام `prefix('/:locale')` وتطبيق برمجية وسيطة للتحقق من صحة اللغة.

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

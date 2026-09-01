---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "تدويل NestJS - الدليل الكامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل 2026 لبناء تطبيق NestJS متعدد اللغات (i18n). ترجم باستخدام وكلاء الذكاء الاصطناعي وحسّن حجم الحزمة وتحسين محركات البحث والأداء."
keywords:
  - التدويل
  - الوثائق
  - Intlayer
  - NestJS
  - جافا سكريبت
  - الخلفية
slugs:
  - doc
  - environment
  - nest
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "تحديث استخدام واجهة برمجة تطبيقات useIntlayer في Solid للوصول المباشر إلى الخصائص"
  - version: 7.5.9
    date: 2025-12-30
    changes: "إضافة أمر init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "الوثيقة الأولية"
---

# ترجم Nest backend باستخدام Intlayer | التدويل (i18n)

`express-intlayer` هو وسيط قوي للتدويل (i18n) لتطبيقات Express، مصمم لجعل خدمات الخلفية الخاصة بك متاحة عالميًا من خلال تقديم استجابات محلية بناءً على تفضيلات العميل. نظرًا لأن NestJS مبني على Express، يمكنك دمج `express-intlayer` بسلاسة في تطبيقات NestJS الخاصة بك للتعامل مع المحتوى متعدد اللغات بفعالية.

حالات الاستخدام العملية

- **عرض أخطاء الخادم بلغة المستخدم**: عند حدوث خطأ، يؤدي عرض الرسائل باللغة الأصلية للمستخدم إلى تحسين الفهم وتقليل الإحباط. وهذا مفيد بشكل خاص للرسائل الخطأ الديناميكية التي قد يتم عرضها في مكونات الواجهة الأمامية مثل التنبيهات أو النوافذ المنبثقة.

- **استرجاع المحتوى المتعدد اللغات**: بالنسبة للتطبيقات التي تستخرج المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بلغات متعددة. هذا أمر حاسم للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض وصفات المنتجات والمقالات والمحتوى الآخر باللغة المفضلة للمستخدم.

- **إرسال رسائل بريد إلكترونية متعددة اللغات**: سواء كانت رسائل بريد إلكترونية معاملات أو حملات تسويقية أو إشعارات، يمكن لإرسال رسائل البريد الإلكترونية بلغة المستقبل أن يزيد بشكل كبير من التفاعل والفعالية.

- **إشعارات Push متعددة اللغات**: بالنسبة للتطبيقات المحمولة، يمكن لإرسال إشعارات push بلغة المستخدم المفضلة أن يحسّن التفاعل والاحتفاظ بالمستخدمين. يمكن لهذا اللمس الشخصي أن يجعل الإشعارات تبدو أكثر صلة واقعية وقابلية للتطبيق.

- **اتصالات أخرى**: أي شكل من أشكال الاتصال من الخادم الخلفي، مثل رسائل SMS والتنبيهات النظامية أو تحديثات واجهة المستخدم، تستفيد من كونها بلغة المستخدم، مما يضمن الوضوح ويحسن تجربة المستخدم الشاملة.

من خلال دولية Backend، لا تحترم تطبيقك الفروقات الثقافية فحسب، بل تتوافق بشكل أفضل مع احتياجات السوق العالمية، مما يجعلها خطوة أساسية في توسع نطاق خدماتك على مستوى العالم.

## البدء

### إنشاء مشروع NestJS جديد

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

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

### تكوين tsconfig.json

لاستخدام Intlayer مع TypeScript، تأكد من إعداد ملف `tsconfig.json` لدعم وحدات ES. يمكنك القيام بذلك عن طريق تعيين خيارات `module` و `moduleResolution` إلى `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... خيارات أخرى
  },
}
```

### الإعداد

قم بتكوين إعدادات التدويل بإنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### أعلن عن المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      ar: "مرحباً بالعالم!",
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضياً، `./src`). ويجب أن تطابق امتداد ملف إعلان المحتوى (افتراضياً، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> لمزيد من التفاصيل، راجع [توثيق إعلان المحتوى](/doc/concept/content).

### إعداد وسيط Express

قم بدمج وسيط `express-intlayer` في تطبيق NestJS الخاص بك للتعامل مع التدويل:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // تطبيق على جميع المسارات
  }
}
```

### استخدام الترجمات في خدماتك أو وحدات التحكم الخاصة بك

يمكنك الآن استخدام دالة `getIntlayer` للوصول إلى الترجمات في خدماتك أو وحدات التحكم الخاصة بك:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### التوافق

`express-intlayer` متوافق تمامًا مع:

- [`react-intlayer`](/doc/packages/react-intlayer) لتطبيقات React
- [`next-intlayer`](/doc/packages/next-intlayer) لتطبيقات Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) لتطبيقات Vite

كما يعمل بسلاسة مع أي حل للتدويل عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص الوسيط لاكتشاف اللغة من خلال الرؤوس أو ملفات تعريف الارتباط:

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

بشكل افتراضي، سيقوم `express-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة، قم بزيارة [التوثيق](/doc/concept/configuration).

### تكوين TypeScript

يستفيد `express-intlayer` من القدرات القوية لـ TypeScript لتعزيز عملية التدويل. يضمن النوع الثابت في TypeScript أن يتم تضمين كل مفتاح ترجمة، مما يقلل من خطر فقدان الترجمات ويحسن من سهولة الصيانة.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

تأكد من تضمين الأنواع التي تم إنشاؤها تلقائيًا (افتراضيًا في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الحالية الخاصة بك
  include: [
    // ... تكوينات TypeScript الحالية الخاصة بك
    ".intlayer/**/*.ts", // تضمين الأنواع التي تم إنشاؤها تلقائيًا
  ],
}
```

### امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer الرسمي لـ VS Code**.

[التثبيت من سوق VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **الكشف الفوري عن الأخطاء** للترجمات المفقودة.
- **معاينات داخلية** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

لمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer لـ VS Code](https://intlayer.org/doc/vs-code-extension).

### إعداد Git

يوصى بتجاهل الملفات التي يتم إنشاؤها بواسطة Intlayer. هذا يسمح لك بتجنب إضافتها إلى مستودع Git الخاص بك.

لعمل ذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

## الأسئلة الشائعة

<FAQ>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات NestJS؟">

- **`nestjs-i18n`**: وحدة NestJS شائعة تستخدم JSON و YAML.
- **`Intlayer`**: توافق كامل مع حقن التبعيات (DI) والاعتراضات (interceptors)، فحص الأنواع وقت البناء، ترجمة بالذكاء الاصطناعي، وقواميس مشتركة مع الواجهة الأمامية.

السبب وراء تدويل النهاية الخلفية (backend) في المقام الأول هو أن جزءًا كبيرًا من النصوص التي يقرأها المستخدم لا يمر أبدًا عبر الواجهة الأمامية (frontend): رسائل خطأ API، ورسائل البريد الإلكتروني الخاصة بالمعاملات، والإشعارات اللحظية، والرسائل القصيرة، وصادرات PDF. تحتاج هذه النصوص إلى لغة المستلم، والتي يتم تحديدها لكل طلب بدلاً من كل جلسة.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md).

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة خادم NestJS لدي؟">

أقل بكثير من كتالوجات JSON التقليدية. يحسن مترجم Intlayer القواميس في وقت البناء ولا يعيد تحليلها عند كل طلب، مما يحافظ على استخدام الذاكرة ووقت بدء التشغيل البارد (cold start) في حده الأدنى. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

</Question>

<Question title="هل يمكنني الترحيل من nestjs-i18n دون إعادة كتابة المعالجات والخدمات؟">

إلى حد كبير نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على الملفات الحالية وتنشئ قواميس Intlayer منها.

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

يفحص معترض أو برمجية NestJS الوسيطة الترويسات وملفات تعريف الارتباط، ويربط اللغة بسياق الطلب.

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

<Question title="كيف يعمل Intlayer مع حقن التبعيات (DI) في NestJS؟">

يمكن حقن خدمات ومعترضات Intlayer في حاوية NestJS IoC، مما يتيح وصولاً سهلاً إلى اللغة عبر المتحكمات والموفرين.

</Question>

<Question title="هل يمكنني توطين رسائل التحقق من صحة NestJS DTO؟">

نعم. في مصممي `class-validator` المخصصين أو عوامل تصفية الاستثناءات، يمكنك استدعاء `t()` أو `getIntlayer()`.

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

---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - دليل شامل لترجمة تطبيقك"
description: "لا مزيد من i18next. دليل عام 2026 لبناء تطبيق Elysia متعدد اللغات (i18n). ترجم باستخدام وكلاء AI وحسّن حجم الحزمة وSEO والأداء."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# ترجم موقع Elysia الخلفي الخاص بك باستخدام Intlayer | التدويل (i18n)

`elysia-intlayer` هو plugin قوي للتدويل (i18n) لتطبيقات Elysia، مصمم لجعل خدماتك الخلفية في متناول العالم من خلال توفير استجابات محلية بناءً على تفضيلات العميل.

> اطلع على تنفيذ الحزمة على GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### حالات الاستخدام العملية

- **عرض أخطاء Backend بلغة المستخدم**: عند حدوث خطأ، يؤدي عرض الرسائل باللغة الأم للمستخدم إلى تحسين الفهم وتقليل الإحباط. وهذا مفيد بشكل خاص للرسائل الديناميكية التي قد تُعرض في مكونات front-end مثل toasts أو modals.
- **استرجاع محتوى متعدد اللغات**: بالنسبة للتطبيقات التي تسحب المحتوى من قاعدة بيانات، يضمن التدويل أنه يمكنك تقديم هذا المحتوى بلغات متعددة. وهذا أمر حاسم للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض وصفات المنتجات والمقالات والمحتويات الأخرى باللغة المفضلة للمستخدم.
- **إرسال رسائل بريد إلكترونية متعددة اللغات**: سواء كانت رسائل معاملات أو حملات تسويقية أو إشعارات، فإن إرسال رسائل بريد إلكترونية بلغة المستقبل يمكن أن يزيد بشكل كبير من الارتباط والفعالية.
- **إشعارات Push متعددة اللغات**: بالنسبة للتطبيقات المحمولة، يمكن لإرسال إشعارات push بلغة المستخدم المفضلة أن يعزز التفاعل والاحتفاظ. يمكن لهذا اللمس الشخصي أن يجعل الإشعارات تبدو أكثر ملاءمة وقابلية للتنفيذ.
- **الاتصالات الأخرى**: أي شكل من أشكال الاتصال من backend، مثل رسائل SMS أو التنبيهات الخاصة بالنظام أو تحديثات واجهة المستخدم، يستفيد من كونه بلغة المستخدم، مما يضمن الوضوح وتحسين تجربة المستخدم الإجمالية.

بفضل تدويل backend، لا يقتصر تطبيقك على احترام الفروقات الثقافية فحسب، بل يتماشى أيضاً بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة أساسية في توسيع خدماتك على مستوى العالم.

## البدء

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

شاهد [قالب التطبيق](https://github.com/aymericzip/intlayer-elysia-template) على GitHub.

### التثبيت

لبدء استخدام `elysia-intlayer`، قم بتثبيت الحزمة باستخدام npm:

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

> علم `--interactive` اختياري. استخدم `intlayer-cli init` إذا كنت وكيل ذكاء اصطناعي.

> سيكتشف هذا الأمر بيئتك وسيثبت الحزم المطلوبة. على سبيل المثال:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### الإعداد

قم بتكوين إعدادات الدولية بإنشاء ملف `intlayer.config.ts` في جذر مشروعك:

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

### أعلن عن محتواك

أنشئ وأدر إعلاناتك عن المحتوى لتخزين الترجمات:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

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

> يمكن تعريف إعلانات المحتوى الخاص بك في أي مكان في التطبيق الخاص بك طالما تم تضمينها في دليل `contentDir` (افتراضياً، `./src`). وتطابق امتداد ملف إعلان المحتوى (افتراضياً، `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> للحصول على مزيد من التفاصيل، راجع [وثائق إعلان المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md).

### إعداد تطبيق Elysia

قم بإعداد تطبيق Elysia الخاص بك لاستخدام `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // تحميل إضافة التدويل
  .use(intlayer())
  // المسارات
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

تقوم الإضافة أيضاً بحقن كائن `intlayer` في سياق المسار. فضّل استخدامه عندما تريد تبعية صريحة بدلاً من المساعدات المستقلة:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // اللغة المستخدمة لهذا الطلب، تم التفاوض عليها من `Accept-Language` أو قراءتها من التخزين
  locale: intlayer.locale,
  greeting: intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> يعرّض سياق المسار `locale` و `defaultLocale` و `locale_storage` (اللغة المحددة بشكل صريح من قبل العميل) و `locale_detected` (اللغة المفاوضة من الرؤوس) و `t` و `getIntlayer` و `getDictionary`.

### التوافق

`elysia-intlayer` متوافق بشكل كامل مع:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/index.md)>) لتطبيقات React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md)>) لتطبيقات Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md)>) لتطبيقات Vite

يعمل أيضًا بسلاسة مع أي حل internationalization عبر بيئات مختلفة، بما في ذلك المتصفحات وطلبات API. يمكنك تخصيص middleware لكشف locale من خلال headers أو cookies:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... خيارات الإعدادات الأخرى
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

بشكل افتراضي، سيقوم `elysia-intlayer` بتفسير رأس `Accept-Language` لتحديد اللغة المفضلة للعميل.

> للحصول على مزيد من المعلومات حول الإعدادات والمواضيع المتقدمة، تفضل بزيارة [التوثيق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md) الخاص بنا.

### تكوين TypeScript

يستفيد `elysia-intlayer` من القدرات القوية لـ TypeScript لتحسين عملية التدويل. يضمن التكتيب الثابت في TypeScript أن كل مفتاح ترجمة يتم حسابه، مما يقلل من خطر الترجمات المفقودة ويحسن القابلية للصيانة.

تأكد من تضمين الأنواع المُنشأة تلقائيًا (افتراضيًا في ./types/intlayer.d.ts) في ملف tsconfig.json الخاص بك.

```json5 fileName="tsconfig.json"
{
  // ... تكوينات TypeScript الموجودة لديك
  "include": [
    // ... تكوينات TypeScript الموجودة لديك
    ".intlayer/**/*.ts", // تضمين الأنواع المُنشأة تلقائيًا
  ],
}
```

### امتداد VS Code

لتحسين تجربة التطوير الخاصة بك مع Intlayer، يمكنك تثبيت **امتداد Intlayer VS Code** الرسمي.

[التثبيت من سوق VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

يوفر هذا الامتداد:

- **الإكمال التلقائي** لمفاتيح الترجمة.
- **كشف الأخطاء في الوقت الفعلي** للترجمات المفقودة.
- **معاينات مضمنة** للمحتوى المترجم.
- **إجراءات سريعة** لإنشاء وتحديث الترجمات بسهولة.

للمزيد من التفاصيل حول كيفية استخدام الامتداد، راجع [توثيق امتداد Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### إعدادات Git

يُنصح بتجاهل الملفات التي تم إنشاؤها بواسطة Intlayer. يتيح لك ذلك تجنب التزام بها في مستودع Git الخاص بك.

للقيام بذلك، يمكنك إضافة التعليمات التالية إلى ملف `.gitignore` الخاص بك:

```plaintext fileName=".gitignore"
# تجاهل الملفات التي تم إنشاؤها بواسطة Intlayer
.intlayer
```

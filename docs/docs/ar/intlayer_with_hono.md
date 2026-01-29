---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: تدويل Hono - كيفية ترجمة تطبيق Hono الخاص بك - دليل 2026
description: اكتشف كيفية جعل واجهة Hono الخلفية متعددة اللغات. اتبع التوثيق لتدويلها (i18n) وترجمتها.
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
  - version: 7.5.9
    date: 2025-12-30
    changes: إضافة أمر init
  - version: 5.5.10
    date: 2025-06-29
    changes: تهيئة السجل
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

### التثبيت

لبدء استخدام `hono-intlayer` ، قم بتثبيت الحزمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
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

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
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

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا ، `./src`). وتطابق ملحق ملف إعلان المحتوى (افتراضيًا ، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

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
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

افتراضيًا ، سيقوم `hono-intlayer` بتفسير عنوان `Accept-Language` لتحديد لغة العميل المفضلة.

> لمزيد من المعلومات حول التكوين والمواضيع المتقدمة ، قم بزيارة [التوثيق الخاص بنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

### تكوين TypeScript

تستفيد `hono-intlayer` من إمكانيات TypeScript القوية لتعزيز عملية التدويل. تضمن الكتابة الثابتة في TypeScript مراعاة كل مفتاح ترجمة ، مما يقلل من مخاطر فقدان الترجمات ويحسن قابلية الصيانة.

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

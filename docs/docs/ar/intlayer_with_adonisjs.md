---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - كيفية ترجمة تطبيق AdonisJS في 2026
description: اكتشف كيفية جعل الواجهة الخلفية لـ AdonisJS متعددة اللغات. اتبع الوثائق لتدويل (i18n) وترجمتها.
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
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: تهيئة السجل
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
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### التثبيت

لبدء استخدام `adonis-intlayer` ، قم بتثبيت الحزمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### الإعداد

قم بتكوين إعدادات التدويل عن طريق إنشاء ملف `intlayer.config.ts` في جذر مشروعك:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### التصريح عن المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
};

module.exports = indexContent;
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

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضيًا ، `./src` أو `./app`). وتطابق ملحق ملف إعلان المحتوى (افتراضيًا ، `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

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
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
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

---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: ترجمة خلفية Nest الخاصة بك (i18n)
description: اكتشف كيفية جعل خلفية vite الخاصة بك متعددة اللغات. اتبع الوثائق لتدويل (i18n) وترجمتها.
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
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
---

# البدء في التدويل (i18n) مع Intlayer و NestJS

`express-intlayer` هو وسيط قوي للتدويل (i18n) لتطبيقات Express، مصمم لجعل خدمات الخلفية الخاصة بك متاحة عالميًا من خلال تقديم استجابات محلية بناءً على تفضيلات العميل. نظرًا لأن NestJS مبني على Express، يمكنك دمج `express-intlayer` بسلاسة في تطبيقات NestJS الخاصة بك للتعامل مع المحتوى متعدد اللغات بفعالية.

## لماذا تقوم بتدويل الخلفية الخاصة بك؟

تدويل الخلفية الخاصة بك أمر ضروري لخدمة جمهور عالمي بفعالية. فهو يسمح لتطبيقك بتقديم المحتوى والرسائل باللغة المفضلة لكل مستخدم. تعزز هذه القدرة تجربة المستخدم وتوسع نطاق تطبيقك من خلال جعله أكثر وصولًا وملاءمة للأشخاص من خلفيات لغوية مختلفة.

### حالات الاستخدام العملية

- **عرض أخطاء الخلفية بلغة المستخدم**: عند حدوث خطأ، فإن عرض الرسائل بلغة المستخدم الأم يحسن الفهم ويقلل من الإحباط. هذا مفيد بشكل خاص للرسائل الديناميكية التي قد تظهر في مكونات الواجهة الأمامية مثل التنبيهات الصغيرة (toasts) أو النوافذ المنبثقة (modals).

- **استرجاع المحتوى متعدد اللغات**: بالنسبة للتطبيقات التي تستخرج المحتوى من قاعدة بيانات، يضمن التدويل إمكانية تقديم هذا المحتوى بعدة لغات. هذا أمر حيوي للمنصات مثل مواقع التجارة الإلكترونية أو أنظمة إدارة المحتوى التي تحتاج إلى عرض أوصاف المنتجات والمقالات والمحتويات الأخرى باللغة التي يفضلها المستخدم.

- **إرسال رسائل بريد إلكتروني متعددة اللغات**: سواء كانت رسائل بريد إلكتروني معاملاتية، حملات تسويقية، أو إشعارات، فإن إرسال الرسائل بلغة المستلم يمكن أن يزيد بشكل كبير من التفاعل والفعالية.

- **الإشعارات الفورية متعددة اللغات**: بالنسبة لتطبيقات الهواتف المحمولة، يمكن أن يعزز إرسال الإشعارات الفورية بلغة المستخدم المفضلة التفاعل والاحتفاظ به. هذه اللمسة الشخصية تجعل الإشعارات تبدو أكثر صلة وقابلية للتنفيذ.

- **الاتصالات الأخرى**: أي شكل من أشكال الاتصال من الخلفية، مثل رسائل SMS، تنبيهات النظام، أو تحديثات واجهة المستخدم، يستفيد من كونه بلغة المستخدم، مما يضمن الوضوح ويعزز تجربة المستخدم بشكل عام.

من خلال تدويل الخلفية، لا يحترم تطبيقك الاختلافات الثقافية فحسب، بل يتماشى أيضًا بشكل أفضل مع احتياجات السوق العالمية، مما يجعله خطوة أساسية في توسيع خدماتك على مستوى العالم.

## البدء

### إنشاء مشروع NestJS جديد

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### التثبيت

لبدء استخدام `express-intlayer`، قم بتثبيت الحزمة باستخدام npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// تكوين الإعدادات الدولية
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // اللغات المدعومة
    defaultLocale: Locales.ENGLISH, // اللغة الافتراضية
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// تكوين الإعدادات الدولية
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // اللغات المدعومة
    defaultLocale: Locales.ENGLISH, // اللغة الافتراضية
  },
};

module.exports = config;
```

### أعلن عن المحتوى الخاص بك

قم بإنشاء وإدارة إعلانات المحتوى الخاصة بك لتخزين الترجمات:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

> يمكن تعريف إعلانات المحتوى الخاصة بك في أي مكان في تطبيقك طالما تم تضمينها في دليل `contentDir` (افتراضياً، `./src`). ويجب أن تطابق امتداد ملف إعلان المحتوى (افتراضياً، `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

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
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
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

## تاريخ الوثيقة

| الإصدار | التاريخ    | التغييرات       |
| ------- | ---------- | --------------- |
| 5.8.0   | 2025-09-09 | الوثيقة الأولية |

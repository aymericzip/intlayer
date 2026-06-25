---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: التعبئة التلقائية
description: تعلّم كيفية استخدام وظيفة التعبئة التلقائية في Intlayer لملء المحتوى تلقائيًا بناءً على أنماط محددة مسبقًا. اتبع هذا التوثيق لتنفيذ ميزات التعبئة التلقائية بكفاءة في مشروعك.
keywords:
  - التعبئة التلقائية
  - أتمتة المحتوى
  - المحتوى الديناميكي
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 6.0.0
    date: 2025-09-20
    changes: "إضافة التهيئة العامة"
  - version: 6.0.0
    date: 2025-09-17
    changes: "إضافة متغير `{{fileName}}`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "بداية السجل"
author: aymericzip
---

# ملء ترجمات ملفات إعلان المحتوى

**ملء ملفات إعلان المحتوى تلقائياً** في CI الخاص بك هو وسيلة لتسريع سير عملك التطويري.

## فهم السلوك

يتضمن أمر `fill` وضعين:

- **Complete**: ملء جميع المحتوى المفقود تلقائياً لكل لغة وتعديل الملف الحالي، أو ملف آخر إذا تم تحديده. أي أن وضع الملء الكامل سيتخطى ترجمة المحتوى الموجود، إذا كان مترجماً بالفعل.
- **Review**: ملء **جميع** المحتوى تلقائياً لكل لغة وإنشاء ملف معين، أو ملف آخر إذا تم تحديده.

سيعالج أمر `fill` جميع ملفات إعلان المحتوى حسب اللغة. أي أنه لن يعالج محتواك البعيد من نظام إدارة المحتوى (CMS). يتضمن نظام إدارة المحتوى إدارة ترجمات خاصة به.
إذا استخدمت مكونات إضافية مثل `@intlayer/sync-json-plugin`، فسيحول Intlayer ملفات JSON إلى ملفات إعلان محتوى حسب اللغة. أي أنها ستتم معالجتها بواسطة أمر `fill`.

تتضمن الملفات المُنشأة حديثاً تعليمة `filled` كبيانات وصفية للقاموس. ستُستخدم هذه التعليمة بواسطة Intlayer لمعرفة ما إذا كان الملف قد تم ملؤه تلقائياً أم لا، وتخطيه من الترجمة مرة أخرى إذا كانت موجودة.

سيأخذ Intlayer في الاعتبار أيضاً التعليمة التالية للملء التلقائي:

- من `.content.{ts|js|json}` الخاص بك → تعليمة `fill`
- من ملف الإعدادات `.intlayer.config.ts` → تعليمة `dictionary.fill`
- سيتم تعيينها إلى `true` بشكل افتراضي وإلا

بالنسبة لملفات إعلان المحتوى حسب اللغة، ستتم استبدال تعليمة `true` بـ `./{{fileName}}.fill.content.json`. هذا لأن ملف إعلان المحتوى حسب اللغة لا يمكن أن يتلقى محتوى محلياً إضافياً. لذا سينشئ ملفاً جديداً لعدم الكتابة فوق الملف الموجود.

## السلوك الافتراضي

بشكل افتراضي، يتم تعيين `fill` إلى `true` عالميًا، مما يعني أن Intlayer سيملأ تلقائيًا جميع ملفات المحتوى وتحرير الملف نفسه. يمكن تخصيص هذا السلوك بعدة طرق:

### خيارات الإعدادات العامة

1. **`fill: true` (افتراضي)** - ملء جميع اللغات تلقائياً وتعديل الملف الحالي
2. **`fill: false`** - تعطيل الملء التلقائي لملف المحتوى هذا
3. **`fill: "./relative/path/to/file"`** - إنشاء/تحديث الملف المحدد دون تعديل الملف الحالي بالإشارة إلى مسار نسبي تم حله بناءً على موقع الملف الحالي
4. **`fill: "/absolute/path/to/file"`** - إنشاء/تحديث الملف المحدد دون تعديل الملف الحالي بالإشارة إلى مسار نسبي تم حله بناءً على موقع مجلد baseDir (الحقل `baseDir` في ملف الإعدادات `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - إنشاء/تحديث الملف المحدد دون تعديل الملف الحالي بالإشارة إلى مسار مطلق تم حله بناءً على نظام التشغيل الخاص بك
6. **`fill: { [key in Locales]?: string }`** - إنشاء/تحديث الملف المحدد لكل لغة

### تغييرات السلوك في الإصدار v7

في الإصدار v7، تم تحديث سلوك أمر `fill`:

- **`fill: true`** - يعيد كتابة الملف الحالي بمحتوى مملوء لجميع اللغات
- **`fill: "path/to/file"`** - يملأ الملف المحدد دون تعديل الملف الحالي
- **`fill: false`** - يعطل الملء التلقائي بالكامل

عند استخدام خيار المسار للكتابة إلى ملف آخر، تعمل آلية الملء من خلال علاقة _master-slave_ بين ملفات إعلان المحتوى. يعمل الملف الرئيسي (master) كمصدر الحقيقة، وعند تحديثه، سيقوم Intlayer تلقائياً بتطبيق تلك التغييرات على ملفات إعلان المحتوى المشتقة (المملوءة) المحددة بواسطة المسار.

# ترجمات ملف إعلان محتوى التعبئة التلقائية

**ملفات إعلان محتوى التعبئة التلقائية** هي وسيلة لتسريع سير عمل التطوير الخاص بك.

تعمل آلية التعبئة التلقائية من خلال علاقة _رئيسي-تابع_ بين ملفات إعلان المحتوى. عندما يتم تحديث الملف الرئيسي (الرئيسي)، يقوم Intlayer تلقائيًا بتطبيق تلك التغييرات على ملفات الإعلان المشتقة (المعبأة تلقائيًا).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "هذا مثال على المحتوى",
  },
} satisfies Dictionary;

export default exampleContent;
```

إليك [ملف إعلان محتوى لكل لغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) يستخدم تعليمة `autoFill`.

ثم، عند تشغيل الأمر التالي:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

سيقوم Intlayer تلقائيًا بإنشاء ملف الإعلان المشتق في `src/components/example/example.content.json`، مع ملء جميع اللغات التي لم تُعلن بعد في الملف الرئيسي.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

بعد ذلك، سيتم دمج كلا ملفي الإعلان في قاموس واحد، يمكن الوصول إليه باستخدام الخطاف القياسي `useIntlayer("example")` (react) / القابل للاستخدام (vue).

## الإعدادات العامة

يمكنك تكوين إعداد الملء التلقائي العام في ملف `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // إنشاء الترجمات المفقودة تلقائياً لجميع القواميس
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // إنشاء الترجمات المفقودة تلقائياً لجميع القواامس مثل استخدام "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

يمكنك بالفعل ضبط دقيق لكل قاموس باستخدام حقل `fill` في ملفات المحتوى. سيأخذ Intlayer في الاعتبار أولاً التكوين الخاص بكل قاموس ثم يعود إلى الإعدادات العامة.

## تنسيق الملف المعبأ تلقائيًا

التنسيق الموصى به لملفات الإعلان المعبأة تلقائيًا هو **JSON**، والذي يساعد في تجنب قيود التنسيق. ومع ذلك، يدعم Intlayer أيضًا صيغ `.ts`، `.js`، `.mjs`، `.cjs`، وصيغ أخرى.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // المحتوى الخاص بك
  },
};
```

سيتم إنشاء الملف في:

```
src/components/example/example.filled.content.ts
```

> يتم إنشاء ملفات `.js`، `.ts`، والملفات المشابهة كما يلي:
>
> - إذا كان الملف موجودًا بالفعل، سيقوم Intlayer بتحليله باستخدام شجرة البنية المجردة (AST) لتحديد كل حقل وإدخال أي ترجمات مفقودة.
> - إذا لم يكن الملف موجودًا، سيقوم Intlayer بإنشائه باستخدام قالب ملف إعلان المحتوى الافتراضي.

## المسارات المطلقة

يدعم الحقل `autoFill` أيضًا المسارات المطلقة.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // المحتوى الخاص بك
  },
};
```

سيتم إنشاء الملف في:

```
/messages/example.content.json
```

## إنشاء ملفات إعلان المحتوى لكل لغة تلقائيًا

يدعم الحقل `autoFill` أيضًا إنشاء ملفات إعلان المحتوى **لكل لغة**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // المحتوى الخاص بك
  },
};
```

سيتم إنشاء ملفين منفصلين:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> في هذه الحالة، إذا لم يحتوي الكائن على جميع اللغات، يتخطى Intlayer إنشاء اللغات المتبقية.

## تصفية تعبئة تلقائية للغة محددة

استخدام كائن للحقل `autoFill` يسمح لك بتطبيق عوامل تصفية وإنشاء ملفات لغة محددة فقط.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // المحتوى الخاص بك
  },
};
```

سيتم إنشاء ملف الترجمة الفرنسية فقط.

## متغيرات المسار

يمكنك استخدام المتغيرات داخل مسار `autoFill` لحل المسارات المستهدفة للملفات التي سيتم إنشاؤها بشكل ديناميكي.

**المتغيرات المتاحة:**

- `{{locale}}` – رمز اللغة (مثل `fr`، `es`)
- `{{fileName}}` – اسم الملف (مثل `index`)
- `{{key}}` – مفتاح القاموس (مثل `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // المحتوى الخاص بك
  },
};
```

سيؤدي هذا إلى إنشاء:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // المحتوى الخاص بك
  },
};
```

سيؤدي هذا إلى إنشاء:

- `./index.content.json`
- `./index.content.json`

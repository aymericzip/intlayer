---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: التعبئة التلقائية
description: تعلّم كيفية استخدام وظيفة التعبئة التلقائية في Intlayer لملء المحتوى تلقائيًا بناءً على أنماط محددة مسبقًا. اتبع هذا التوثيق لتنفيذ ميزات التعبئة التلقائية بكفاءة في مشروعك.
keywords:
  - التعبئة التلقائية
  - أتمتة المحتوى
  - المحتوى الديناميكي
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - auto-fill
---

# ملفات إعلان المحتوى بالتعبئة التلقائية

**ملفات إعلان المحتوى بالتعبئة التلقائية** هي طريقة لتسريع سير عمل التطوير الخاص بك.

The autofill mechanism works through a _master-slave_ relationship between content declaration files. When the main (master) file is updated, Intlayer will automatically apply those changes to the derived (autofilled) declaration files.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Here is a [per-locale content declaration file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) using the `autoFill` instruction.

Then, when you run the following command:
يعمل آلية التعبئة التلقائية من خلال علاقة _رئيسية-تابعة_ بين ملفات إعلان المحتوى. عندما يتم تحديث الملف الرئيسي (الرئيسي)، سيقوم Intlayer تلقائيًا بتطبيق تلك التغييرات على ملفات الإعلان المشتقة (المعبأة تلقائيًا).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

// تعريف محتوى المثال
const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH, // اللغة الافتراضية
  autoFill: "./example.content.json", // ملف التعبئة التلقائية المرتبط
  content: {
    contentExample: "This is an example of content", // مثال على المحتوى
  },
} satisfies Dictionary;

export default exampleContent;
```

إليك [ملف إعلان محتوى لكل لغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) يستخدم تعليمة `autoFill`.

ثم، عند تشغيل الأمر التالي:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

سيقوم Intlayer تلقائيًا بإنشاء ملف الإعلان المشتق في `src/components/example/example.content.json`، مع ملء جميع اللغات غير المعلنة بالفعل في الملف الرئيسي.

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

## تنسيق الملف المعبأ تلقائيًا

التنسيق الموصى به لملفات إعلان التعبئة التلقائية هو **JSON**، مما يساعد على تجنب قيود التنسيق. ومع ذلك، يدعم Intlayer أيضًا تنسيقات `.ts` و `.js` و `.mjs` و `.cjs` وغيرها.

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

> يتم إنشاء ملفات `.js` و `.ts` والملفات المشابهة كما يلي:
>
> - إذا كان الملف موجودًا بالفعل، سيقوم Intlayer بتحليله باستخدام شجرة البنية التجريدية (AST) لتحديد كل حقل وإدخال أي ترجمات مفقودة.
> - إذا لم يكن الملف موجودًا، فسيقوم Intlayer بإنشائه باستخدام قالب ملف إعلان المحتوى الافتراضي.

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

## التوليد التلقائي لملفات إعلان المحتوى لكل لغة

يدعم الحقل `autoFill` أيضًا توليد ملفات إعلان المحتوى **لكل لغة**.

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

سيؤدي هذا إلى إنشاء ملفين منفصلين:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## تصفية تعبئة تلقائية للغة محددة

استخدام كائن لحقل `autoFill` يسمح لك بتطبيق عوامل تصفية وإنشاء ملفات لغة محددة فقط.

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

سيؤدي هذا إلى إنشاء ملف الترجمة الفرنسية فقط.

## متغيرات المسار

يمكنك استخدام المتغيرات داخل مسار `autoFill` لحل المسارات المستهدفة للملفات التي تم إنشاؤها بشكل ديناميكي.

**المتغيرات المتاحة:**

- `{{locale}}` – رمز اللغة (مثل `fr`، `es`)
- `{{key}}` – مفتاح القاموس (مثل `example`)

```ts fileName="src/components/example/example.content.ts"
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

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ

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
    changes: إضافة التهيئة العامة
  - version: 6.0.0
    date: 2025-09-17
    changes: إضافة متغير `{{fileName}}`
  - version: 5.5.10
    date: 2025-06-29
    changes: بداية السجل
---

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

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
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

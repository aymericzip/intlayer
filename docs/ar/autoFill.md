# ملفات إعلان المحتوى المملوءة تلقائياً

**ملفات إعلان المحتوى المملوءة تلقائياً** هي طريقة لتسريع سير العمل في التطوير.

يعمل آلية الملء التلقائي من خلال علاقة _سيد-عبد_ بين ملفات إعلان المحتوى. عندما يتم تحديث الملف الرئيسي (السيد)، سيقوم Intlayer تلقائياً بتطبيق هذه التغييرات على ملفات الإعلان المشتقة (المملوءة تلقائياً).

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

هذا هو [ملف إعلان المحتوى لكل لغة](https://github.com/aymericzip/intlayer/blob/main/docs/ar/per_locale_file.md) باستخدام تعليمات `autoFill`.

ثم، عندما تقوم بتنفيذ الأمر التالي:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

سيقوم Intlayer تلقائياً بإنشاء ملف الإعلان المشتق في `src/components/example/example.content.json`، وملء جميع اللغات التي لم يتم الإعلان عنها بعد في الملف الرئيسي.

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

بعد ذلك، سيتم دمج ملفي الإعلان في قاموس واحد، يمكن الوصول إليه باستخدام الخطاف القياسي `useIntlayer("example")` (react) / قابل للتكوين (vue).

## تنسيق الملفات المملوءة تلقائياً

التنسيق الموصى به لملفات الإعلان المملوءة تلقائياً هو **JSON**، مما يساعد على تجنب قيود التنسيق. ومع ذلك، يدعم Intlayer أيضاً تنسيقات `.ts`، `.js`، `.mjs`، `.cjs` وغيرها.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // المحتوى الخاص بك
  },
};
```

سيقوم هذا بإنشاء الملف في:

```
src/components/example/example.filled.content.ts
```

> يعمل إنشاء ملفات `.js`، `.ts` وما شابه ذلك كما يلي:
>
> - إذا كان الملف موجوداً بالفعل، سيقوم Intlayer بتحليله باستخدام AST (شجرة البنية المجردة) لتحديد كل حقل وإدخال الترجمات المفقودة.
> - إذا لم يكن الملف موجوداً، سيقوم Intlayer بإنشائه باستخدام قالب الإعداد الافتراضي لملفات إعلان المحتوى.

## المسارات المطلقة

يدعم حقل `autoFill` أيضاً المسارات المطلقة.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // المحتوى الخاص بك
  },
};
```

سيقوم هذا بإنشاء الملف في:

```
/messages/example.content.json
```

## إنشاء ملفات إعلان المحتوى لكل لغة تلقائياً

يدعم حقل `autoFill` أيضاً إنشاء ملفات إعلان المحتوى **لكل لغة**.

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

سيقوم هذا بإنشاء ملفين منفصلين:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## تصفية الملء التلقائي حسب لغة محددة

يتيح استخدام كائن لحقل `autoFill` تطبيق المرشحات وإنشاء ملفات لغة محددة فقط.

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

سيقوم هذا بإنشاء ملف الترجمة الفرنسية فقط.

## متغيرات المسار

يمكنك استخدام متغيرات داخل مسار `autoFill` لحل مسارات الهدف للملفات المنشأة ديناميكياً.

**المتغيرات المتاحة:**

- `{{locale}}` – رمز اللغة (مثال: `fr`، `es`)
- `{{key}}` – مفتاح القاموس (مثال: `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // المحتوى الخاص بك
  },
};
```

سيقوم هذا بإنشاء:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

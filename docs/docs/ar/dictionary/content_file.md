---
createdAt: 2025-02-07
updatedAt: 2025-12-13
title: ملف المحتوى
description: تعلّم كيفية تخصيص الامتدادات لملفات إعلان المحتوى الخاصة بك. اتبع هذا التوثيق لتنفيذ الشروط بكفاءة في مشروعك.
keywords:
  - ملف المحتوى
  - التوثيق
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: إضافة دعم تنسيقات ICU و i18next
  - version: 6.0.0
    date: 2025-09-20
    changes: إضافة توثيق الحقول
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء السجل
---

# ملف المحتوى

<iframe title="i18n، ماركداون، JSON… حل واحد لإدارة كل شيء | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## ما هو ملف المحتوى؟

ملف المحتوى في Intlayer هو ملف يحتوي على تعريفات القواميس.
تعلن هذه الملفات عن محتوى نص تطبيقك، والترجمات، والموارد.
يتم معالجة ملفات المحتوى بواسطة Intlayer لإنشاء القواميس.

ستكون القواميس هي النتيجة النهائية التي سيستوردها تطبيقك باستخدام الخطاف `useIntlayer`.

### المفاهيم الأساسية

#### القاموس

القاموس هو مجموعة منظمة من المحتوى مرتبة بواسطة المفاتيح. يحتوي كل قاموس على:

- **المفتاح**: معرف فريد للقاموس
- **المحتوى**: القيم الفعلية للمحتوى (نصوص، أرقام، كائنات، إلخ)
- **البيانات الوصفية**: معلومات إضافية مثل العنوان، الوصف، العلامات، إلخ

#### ملف المحتوى

مثال على ملف المحتوى:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "مرحبا بالعالم",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      ar: "محتوى باللغة العربية",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "الكثير من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعل",
      false: "التحقق معطل",
    }),
    insertionContent: insert("مرحبًا {{name}}!"),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتضمين
      "login.button" // [اختياري] مسار المحتوى للتضمين
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# مثال على ماركداون"),

    /*
     * متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
     */
    jsxContent: <h1>عنواني</h1>,
  },
} satisfies Dictionary<Content>; // [اختياري] القاموس عام ويسمح لك بتقوية تنسيق قاموسك
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      ar: "محتوى باللغة العربية",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "التحقق مفعّل",
      false: "التحقق معطّل",
    }),
    insertionContent: insert("مرحبًا {{name}}!"),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتضمين
      "login.button" // [اختياري] المسار إلى المحتوى للتضمين
    ),
    markdownContent: md("# مثال على ماركداون"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
    jsxContent: <h1>عنواني</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "مرحبًا بالعالم",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      ar: "محتوى باللغة العربية",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "أقل من ناقص سيارة واحدة",
      "-1": "ناقص سيارة واحدة",
      "0": "لا سيارات",
      "1": "سيارة واحدة",
      ">5": "بعض السيارات",
      ">19": "العديد من السيارات",
    }),
    conditionalContent: cond({
      true: "تم تفعيل التحقق",
      false: "تم تعطيل التحقق",
    }),
    insertionContent: insert("مرحبًا {{name}}!"),
    nestedContent: nest(
      "navbar", // مفتاح القاموس للتضمين
      "login.button" // [اختياري] مسار المحتوى للتضمين
    ),
    markdownContent: md("# مثال على ماركداون"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // متاح فقط باستخدام `react-intlayer` أو `next-intlayer`
    jsxContent: <h1>عنواني</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "مرحبًا بالعالم",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "لا سيارات",
        "1": "سيارة واحدة",
        "<-1": "أقل من ناقص سيارة واحدة",
        "-1": "ناقص سيارة واحدة",
        ">5": "بعض السيارات",
        ">19": "العديد من السيارات",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "التحقق مفعّل",
        "false": "التحقق معطّل",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "مرحبًا {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# مثال على ماركداون",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["عنواني"],
      },
    },
  },
}
```

#### عقد المحتوى

عقد المحتوى هي اللبنات الأساسية لمحتوى القاموس. يمكن أن تكون:

- **قيم بدائية**: سلاسل نصية، أرقام، قيم منطقية، null، undefined
- **عقد ذات نوع**: أنواع محتوى خاصة مثل الترجمات، الشروط، الماركداون، إلخ.
- **دوال**: محتوى ديناميكي يمكن تقييمه أثناء وقت التشغيل [انظر جلب الدوال](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/function_fetching.md)
- **محتوى متداخل**: مراجع إلى قواميس أخرى

#### أنواع المحتوى

يدعم Intlayer أنواع محتوى مختلفة من خلال العقد ذات النوع:

- **محتوى الترجمة**: نص متعدد اللغات بقيم خاصة بكل لغة [انظر محتوى الترجمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation_content.md)
- **محتوى الشرط**: محتوى شرطي يعتمد على تعبيرات منطقية [انظر محتوى الشرط](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/condition_content.md)
- **محتوى التعداد**: محتوى يتغير بناءً على قيم معدودة [انظر محتوى التعداد](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration_content.md)
- **محتوى الإدراج**: محتوى يمكن إدراجه داخل محتويات أخرى [انظر محتوى الإدراج](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion_content.md)
- **محتوى ماركداون**: محتوى نص غني بصيغة ماركداون [انظر محتوى ماركداون](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown_content.md)
- **محتوى متداخل**: مراجع إلى قواميس أخرى [انظر المحتوى المتداخل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/nested_content.md)
- **محتوى حسب الجنس**: محتوى يختلف بناءً على الجنس [انظر محتوى الجنس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/gender_content.md)
- **محتوى ملف**: مراجع إلى ملفات خارجية [انظر محتوى الملف](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/file_content.md)

## هيكل القاموس

القاموس في Intlayer يُعرّف بواسطة نوع `Dictionary` ويحتوي على عدة خصائص تتحكم في سلوكه:

### الخصائص المطلوبة

#### `key` (سلسلة نصية)

المعرف الخاص بالقاموس. إذا كان هناك عدة قواميس لها نفس المفتاح، يقوم Intlayer بدمجها تلقائيًا.

> استخدم تسمية kebab-case (مثلًا، `"about-page-meta"`).

#### المحتوى (string | number | boolean | object | array | function)

خاصية `content` تحتوي على بيانات القاموس الفعلية وتدعم:

- **القيم الأولية**: سلاسل نصية، أرقام، قيم منطقية، null، undefined
- **العقد المطبقة**: أنواع محتوى خاصة باستخدام دوال مساعدة من Intlayer
- **الكائنات المتداخلة**: هياكل بيانات معقدة
- **المصفوفات**: مجموعات من المحتوى
- **الدوال**: تقييم المحتوى الديناميكي

### الخصائص الاختيارية

#### `title` (string)

عنوان قابل للقراءة من قبل الإنسان للقاموس يساعد في التعرف عليه في المحررين وأنظمة إدارة المحتوى. هذا مفيد بشكل خاص عند إدارة أعداد كبيرة من القواميس أو عند العمل مع واجهات إدارة المحتوى.

**مثال:**

```typescript
{
  key: "about-page-meta",
  title: "بيانات وصفية لصفحة حول",
  content: { /* ... */ }
}
```

#### `description` (string)

وصف تفصيلي يشرح غرض القاموس، إرشادات الاستخدام، وأي اعتبارات خاصة. يُستخدم هذا الوصف أيضًا كسياق لتوليد الترجمة المدعومة بالذكاء الاصطناعي، مما يجعله ذا قيمة للحفاظ على جودة الترجمة واتساقها.

**مثال:**

```typescript
{
  key: "about-page-meta",
  description: [
    "هذا القاموس يدير البيانات الوصفية لصفحة حول",
    "ضع في اعتبارك الممارسات الجيدة لتحسين محركات البحث (SEO):",
    "- يجب أن يكون العنوان بين 50 و 60 حرفًا",
    "- يجب أن يكون الوصف بين 150 و 160 حرفًا",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

مصفوفة من السلاسل النصية لتصنيف وتنظيم القواميس. توفر الوسوم سياقًا إضافيًا ويمكن استخدامها للتصفية أو البحث أو تنظيم القواميس في المحررات وأنظمة إدارة المحتوى.

**مثال:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

يحدد المُنسق الذي سيتم استخدامه لمحتوى القاموس. يسمح هذا باستخدام صيغ تنسيق رسائل مختلفة.

- `'intlayer'`: مُنسق Intlayer الافتراضي.
- `'icu'`: يستخدم تنسيق رسائل ICU.
- `'i18next'`: يستخدم تنسيق رسائل i18next.

**مثال:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

يقوم بتحويل القاموس إلى قاموس لكل لغة حيث يتم تلقائيًا تحويل كل حقل معلن في المحتوى إلى عقدة ترجمة. عند تعيين هذه الخاصية:

- يتم التعامل مع القاموس كقاموس بلغة واحدة فقط
- يصبح كل حقل عقدة ترجمة لتلك اللغة المحددة
- يجب ألا تستخدم عقد الترجمة (`t()`) في المحتوى عند استخدام هذه الخاصية
- إذا لم تكن موجودة، سيتم التعامل مع القاموس كقاموس متعدد اللغات

> راجع [إعلان المحتوى حسب اللغة في Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) لمزيد من المعلومات.

**مثال:**

```json
// قاموس حسب اللغة
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // تصبح هذه عقدة ترجمة للغة 'en'
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

تعليمات لملء محتوى القاموس تلقائيًا من مصادر خارجية. يمكن تكوين هذا عالميًا في `intlayer.config.ts` أو لكل قاموس على حدة. يدعم عدة تنسيقات:

- **`true`**: تمكين الملء التلقائي لجميع اللغات
- **`string`**: مسار لملف واحد أو قالب يحتوي على متغيرات
- **`object`**: مسارات ملفات لكل لغة على حدة

**أمثلة:**

```json
// تمكين لجميع اللغات
{
  "autoFill": true
}
// ملف واحد
{
  "autoFill": "./translations/aboutPage.content.json"
}
// قالب يحتوي على متغيرات
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// تكوين دقيق لكل لغة على حدة
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**المتغيرات المتاحة:**

- `{{locale}}` – رمز اللغة (مثل `fr`، `es`)
- `{{fileName}}` – اسم الملف (مثل `example`)
- `{{key}}` – مفتاح القاموس (مثل `example`)

> راجع [تكوين التعبئة التلقائية في Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md) لمزيد من المعلومات.

##### `priority` (عدد)

يشير إلى أولوية القاموس لحل التعارضات. عندما تحتوي عدة قواميس على نفس المفتاح، فإن القاموس ذو الرقم الأعلى في الأولوية سيتجاوز الآخرين. هذا مفيد لإدارة تسلسل المحتوى والتجاوزات.

**مثال:**

```typescript
// القاموس الأساسي
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// قاموس التجاوز
{
  key: "welcome-message",
  priority: 10,
  content: { message: "مرحبًا بك في خدمتنا المميزة!" }
}
// هذا سيتجاوز القاموس الأساسي
```

### خصائص نظام إدارة المحتوى

##### `version` (سلسلة نصية)

معرف الإصدار للقواميس البعيدة. يساعد في تتبع أي إصدار من القاموس يتم استخدامه حاليًا، وهو مفيد بشكل خاص عند العمل مع أنظمة إدارة المحتوى البعيدة.

##### `live` (قيمة منطقية)

بالنسبة للقواميس البعيدة، يشير إلى ما إذا كان يجب جلب القاموس مباشرة أثناء وقت التشغيل. عند التمكين:

- يتطلب تعيين `importMode` إلى "live" في ملف `intlayer.config.ts`
- يتطلب تشغيل خادم مباشر
- سيتم جلب القاموس أثناء وقت التشغيل باستخدام واجهة برمجة تطبيقات المزامنة الحية
- إذا كان مباشرًا ولكن فشل الجلب، يتم الرجوع إلى القيمة الديناميكية
- إذا لم يكن مباشرًا، يتم تحويل القاموس أثناء وقت البناء لأداء مثالي

### خصائص النظام (تم إنشاؤها تلقائيًا)

يتم إنشاء هذه الخصائص تلقائيًا بواسطة Intlayer ولا ينبغي تعديلها يدويًا:

##### `$schema` (سلسلة نصية)

مخطط JSON المستخدم للتحقق من صحة هيكل القاموس. يضاف تلقائيًا بواسطة Intlayer لضمان سلامة القاموس.

##### `id` (سلسلة نصية)

بالنسبة للقواميس البعيدة، هذا هو المعرف الفريد للقاموس في الخادم البعيد. يُستخدم لجلب وإدارة المحتوى البعيد.

##### `localId` (LocalDictionaryId)

معرف فريد للقواميس المحلية. يتم إنشاؤه تلقائيًا بواسطة Intlayer للمساعدة في تحديد القاموس وتحديد ما إذا كان محليًا أو بعيدًا، بالإضافة إلى موقعه.

##### `localIds` (LocalDictionaryId[])

بالنسبة للقواميس المدمجة، تحتوي هذه المصفوفة على معرفات جميع القواميس التي تم دمجها معًا. مفيد لتتبع مصدر المحتوى المدمج.

##### `filePath` (string)

مسار ملف القاموس المحلي، يشير إلى ملف `.content` الذي تم إنشاء القاموس منه. يساعد في تصحيح الأخطاء وتتبع المصدر.

##### `versions` (string[])

بالنسبة للقواميس البعيدة، تحتوي هذه المصفوفة على جميع الإصدارات المتاحة من القاموس. يساعد في تتبع الإصدارات المتوفرة للاستخدام.

##### `autoFilled` (true)

يشير إلى ما إذا كان القاموس قد تم تعبئته تلقائيًا من مصادر خارجية. في حالة وجود تعارضات، ستتجاوز القواميس الأساسية القواميس المعبأة تلقائيًا.

##### `location` ('distant' | 'locale')

يشير إلى موقع القاموس:

- `'locale'`: قاموس محلي (من ملفات المحتوى)
- `'distant'`: قاموس بعيد (من مصدر خارجي)

## أنواع عقد المحتوى

يوفر Intlayer عدة أنواع متخصصة من عقد المحتوى التي توسع القيم الأولية الأساسية:

### محتوى الترجمة (`t`)

محتوى متعدد اللغات يختلف حسب اللغة:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### محتوى الشرط (`cond`)

محتوى يتغير بناءً على شروط منطقية:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### محتوى التعداد (`enu`)

المحتوى الذي يختلف بناءً على القيم المعدودة:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "طلبك قيد الانتظار",
  approved: "تمت الموافقة على طلبك",
  rejected: "تم رفض طلبك",
});
```

### محتوى الإدراج (`insert`)

محتوى يمكن إدراجه داخل محتويات أخرى:

```typescript
import { insert } from "intlayer";

insertionContent: insert("يمكن إدراج هذا النص في أي مكان");
```

### المحتوى المتداخل (`nest`)

مراجع إلى قواميس أخرى:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### محتوى ماركداون (`md`)

محتوى نص غني بصيغة ماركداون:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# مرحبًا\n\nهذا نص **عريض** مع [روابط](https://example.com)"
);
```

### محتوى الجنس (`gender`)

محتوى يتغير بناءً على الجنس:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "هو مطور",
  female: "هي مطورة",
  other: "هم مطورون",
});
```

### محتوى الملف (`file`)

مراجع لملفات خارجية:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## إنشاء ملفات المحتوى

### الهيكل الأساسي لملف المحتوى

ملف المحتوى يصدر كائنًا افتراضيًا يفي بنوع `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "محتوى صفحة الترحيب",
  description: "محتوى الصفحة الرئيسية الرئيسية بما في ذلك قسم البطل والميزات",
  tags: ["صفحة", "ترحيب", "الصفحة الرئيسية"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### ملف محتوى JSON

يمكنك أيضًا إنشاء ملفات محتوى بصيغة JSON:

```json
{
  "key": "welcome-page",
  "title": "محتوى صفحة الترحيب",
  "description": "محتوى الصفحة الرئيسية للترحيب",
  "tags": ["صفحة", "ترحيب"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "مرحبًا بكم في منصتنا",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "قم ببناء تطبيقات مذهلة بسهولة",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### ملفات المحتوى حسب اللغة

للقواميس حسب اللغة، حدد خاصية `locale`:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "مرحبًا بكم في منصتنا",
      subtitle: "قم ببناء تطبيقات مذهلة بسهولة",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## امتدادات ملفات المحتوى

تتيح Intlayer تخصيص امتدادات ملفات إعلان المحتوى الخاصة بك. توفر هذه التخصيصات مرونة في إدارة المشاريع واسعة النطاق وتساعد على تجنب التعارضات مع الوحدات الأخرى.

### الامتدادات الافتراضية

بشكل افتراضي، تراقب Intlayer جميع الملفات التي تحمل الامتدادات التالية لإعلانات المحتوى:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

هذه الامتدادات الافتراضية مناسبة لمعظم التطبيقات. ومع ذلك، عندما تكون لديك احتياجات محددة، يمكنك تعريف امتدادات مخصصة لتبسيط عملية البناء وتقليل خطر التعارض مع المكونات الأخرى.

> لتخصيص امتدادات الملفات التي يستخدمها Intlayer لتحديد ملفات إعلان المحتوى، يمكنك تحديدها في ملف تكوين Intlayer. هذه الطريقة مفيدة للمشاريع واسعة النطاق حيث أن تحديد نطاق عملية المراقبة يحسن أداء البناء.

## مفاهيم متقدمة

### دمج القواميس

عندما تحتوي عدة قواميس على نفس المفتاح، يقوم Intlayer بدمجها تلقائيًا. يعتمد سلوك الدمج على عدة عوامل:

- **الأولوية**: القواميس ذات القيم الأعلى في `priority` تتجاوز تلك ذات القيم الأقل
- **الملء التلقائي مقابل القاعدة**: القواميس الأساسية تتجاوز القواميس المملوءة تلقائيًا
- **الموقع**: القواميس المحلية تتجاوز القواميس البعيدة (عندما تكون الأولويات متساوية)

### أمان النوع

يوفر Intlayer دعمًا كاملاً لـ TypeScript لملفات المحتوى:

```typescript
// تعريف نوع المحتوى الخاص بك
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// استخدامه في القاموس الخاص بك
export default {
  key: "welcome-page",
  content: {
    // TypeScript سيوفر الإكمال التلقائي وفحص النوع
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### تعشيش العقد

يمكنك بدون مشكلة تضمين الدوال داخل دوال أخرى.

مثال:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` يعيد `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يضم شرط، تعداد، ومحتوى متعدد اللغات
    // `getIntlayer('page','en').advancedContent(true)(10)` يعيد 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "لم يتم العثور على أي عنصر",
          es: "لم يتم العثور على عناصر",
        }),
        "1": t({
          en: "تم العثور على عنصر واحد",
          fr: "تم العثور على عنصر واحد",
          es: "تم العثور على عنصر واحد",
        }),
        ">1": t({
          en: "تم العثور على عدة عناصر",
          fr: "تم العثور على عدة عناصر",
          es: "تم العثور على عدة عناصر",
        }),
      }),
      false: t({
        en: "لا توجد بيانات صالحة متاحة",
        fr: "لا توجد بيانات صالحة متاحة",
        es: "لا توجد بيانات صالحة متاحة",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "جون دو";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` يعيد `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يدمج الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','en').advancedContent(true)(10)` يعيد 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "تم العثور على عدة عناصر",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "لا توجد بيانات صالحة متاحة",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "جون دو";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` returns `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "مرحبًا",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // محتوى مركب يدمج الشرط، التعداد، والمحتوى متعدد اللغات
    // `getIntlayer('page','en').advancedContent(true)(10)` يعيد 'تم العثور على عناصر متعددة'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi", // مرحباً
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          nodeType: "enumeration",
          enumeration: {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "ar": "لم يتم العثور على عناصر",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "ar": "تم العثور على عنصر واحد",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "ar": "تم العثور على عدة عناصر",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### أفضل الممارسات

1. **تسمية المتغيرات**:
   - استخدم نمط kebab-case لمفاتيح القاموس (`"about-page-meta"`)
   - اجمع المحتوى المرتبط تحت نفس بادئة المفتاح

2. **تنظيم المحتوى**:
   - احتفظ بالمحتوى المرتبط معًا في نفس القاموس
   - استخدم الكائنات المتداخلة لتنظيم هياكل المحتوى المعقدة
   - استغل الوسوم للتصنيف
   - استخدم `autoFill` لملء الترجمات المفقودة تلقائيًا

3. **الأداء**:
   - ضبط تكوين المحتوى لتحديد نطاق الملفات المراقبة
   - استخدم القواميس الحية فقط عندما تكون التحديثات في الوقت الحقيقي ضرورية، (مثل اختبار A/B، إلخ)
   - تأكد من تمكين مكون تحويل البناء (`@intlayer/swc`، أو `@intlayer/babel`) لتحسين القاموس أثناء وقت البناء

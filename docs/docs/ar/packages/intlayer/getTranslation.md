---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق دالة getTranslation | intlayer
description: تعرف على كيفية استخدام دالة getTranslation لحزمة intlayer
keywords:
  - getTranslation
  - الترجمة
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
---

# التوثيق: دالة `getTranslationContent` في `intlayer`

## الوصف

تقوم دالة `getTranslationContent` باسترجاع المحتوى المقابل للغة معينة من مجموعة محتويات لغوية قابلة للتخصيص. إذا لم يتم العثور على اللغة المحددة، فإنها تعيد بشكل افتراضي المحتوى الخاص باللغة الافتراضية المكونة في المشروع.

## المعاملات

- `languageContent: CustomizableLanguageContent<Content>`

  - **الوصف**: كائن يحتوي على ترجمات لمختلف اللغات. كل مفتاح يمثل لغة، وقيمته هي المحتوى المقابل.
  - **النوع**: `CustomizableLanguageContent<Content>`
    - يمكن أن يكون `Content` أي نوع، والافتراضي هو `string`.

- `locale: Locales`

  - **الوصف**: اللغة التي سيتم استرجاع المحتوى الخاص بها.
  - **النوع**: `Locales`

## القيم المرجعة

- **النوع**: `Content`
- **الوصف**: المحتوى المقابل للغة المحددة. إذا لم يتم العثور على اللغة، يتم إرجاع محتوى اللغة الافتراضية.

## مثال على الاستخدام

### الاستخدام الأساسي

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // الناتج: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // الناتج: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // الناتج: "Bonjour"
```

### اللغة غير موجودة:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // الناتج: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // الناتج: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // الناتج: "Hello" (محتوى اللغة الافتراضية)
```

### استخدام أنواع المحتوى المخصصة:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // الناتج: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // الناتج: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // الناتج: "Bonjour"
```

## الحالات الخاصة

- **اللغة غير موجودة:**
  - عندما لا يتم العثور على `locale` في `languageContent`، تقوم الدالة بإرجاع المحتوى الخاص باللغة الافتراضية.
- **محتوى اللغة غير مكتمل:**
  - إذا تم تعريف اللغة جزئيًا، فإن الدالة لا تدمج المحتويات. تسترجع بدقة قيمة اللغة المحددة أو تعود إلى اللغة الافتراضية.
- **فرض TypeScript:**
  - إذا لم تتطابق اللغات في `languageContent` مع تكوين المشروع، فإن TypeScript ستفرض تعريف جميع اللغات المطلوبة، مما يضمن أن المحتوى كامل وآمن من حيث النوع.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بدء التاريخ

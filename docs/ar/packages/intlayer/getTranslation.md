---
docName: package__intlayer__getTranslation
url: /doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: وثائق دالة getTranslation | intlayer
description: انظر كيف تستخدم دالة getTranslation لحزمة intlayer
keywords:
  - getTranslation
  - ترجمة
  - Intlayer
  - intlayer
  - الدولية
  - المستندات
  - Next.js
  - JavaScript
  - React
---

# التوثيق: وظيفة `getTranslationContent` في `intlayer`

## الوصف

تقوم وظيفة `getTranslationContent` باسترجاع المحتوى المقابل للغة معينة من مجموعة محتوى لغوي قابل للتخصيص. إذا لم يتم العثور على اللغة المحددة، فإنها تعود افتراضيًا إلى إرجاع المحتوى الخاص باللغة الافتراضية المكونة في المشروع.

## المعاملات

- `languageContent: CustomizableLanguageContent<Content>`

  - **الوصف**: كائن يحتوي على الترجمات للغات مختلفة. كل مفتاح يمثل لغة، وقيمته هي المحتوى المقابل.
  - **النوع**: `CustomizableLanguageContent<Content>`
    - `Content` يمكن أن يكون أي نوع، والافتراضي هو `string`.

- `locale: Locales`

  - **الوصف**: اللغة التي سيتم استرجاع المحتوى الخاص بها.
  - **النوع**: `Locales`

## الإرجاع

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
    ar: "مرحبًا",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Hello"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبًا",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Hello"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبًا",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Hello"
```

### لغة مفقودة:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبًا",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبًا",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبًا",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (محتوى اللغة الافتراضية)
```

### استخدام أنواع محتوى مخصصة:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    ar: { greeting: "مرحبًا" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    ar: { greeting: "مرحبًا" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    ar: { greeting: "مرحبًا" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## الحالات الخاصة

- **اللغة غير موجودة:**
  - عندما لا يتم العثور على `locale` في `languageContent`، تقوم الوظيفة بإرجاع المحتوى الخاص باللغة الافتراضية.
- **محتوى لغوي غير مكتمل:**
  - إذا كانت اللغة معرفة جزئيًا، فإن الوظيفة لا تدمج المحتويات. تسترجع فقط القيمة الخاصة باللغة المحددة أو تعود إلى الافتراضية.
- **فرض TypeScript:**
  - إذا لم تتطابق اللغات في `languageContent` مع تكوين المشروع، فإن TypeScript يفرض تعريف جميع اللغات المطلوبة، مما يضمن أن المحتوى كامل وآمن من حيث النوع.

---
docName: package__intlayer__getTranslationContent
url: https://intlayer.org/doc/package/intlayer/getTranslationContent
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getTranslationContent.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: دالة getTranslation - توثيق جافاسكريبت لـ Intlayer
description: توثيق دالة getTranslation في Intlayer، التي تسترجع المحتوى المحلي للغات محددة مع الرجوع إلى اللغة الافتراضية.
keywords:
  - getTranslation
  - intlayer
  - دالة
  - التوطين
  - i18n
  - جافاسكريبت
  - الترجمة
  - اللغة
---

# التوثيق: دالة `getTranslation` في `intlayer`

## الوصف

تسترجع دالة `getTranslation` المحتوى المقابل للغة معينة من مجموعة محتويات لغوية قابلة للتخصيص. إذا لم يتم العثور على اللغة المحددة، فإنها تعيد المحتوى الخاص باللغة الافتراضية المكونة في المشروع.

## المعاملات

- `languageContent: CustomizableLanguageContent<Content>`

  - **الوصف**: كائن يحتوي على ترجمات لمختلف اللغات. كل مفتاح يمثل لغة، وقيمته هي المحتوى المقابل.
  - **النوع**: `CustomizableLanguageContent<Content>`
    - يمكن أن يكون `Content` أي نوع، مع الافتراضي كـ `string`.

- `locale: Locales`

  - **الوصف**: اللغة التي سيتم استرجاع المحتوى الخاص بها.
  - **النوع**: `Locales`

## القيم المرجعة

- **النوع**: `Content`
- **الوصف**: المحتوى المقابل للغة المحددة. إذا لم يتم العثور على اللغة، يتم إرجاع محتوى اللغة الافتراضية.

## مثال على الاستخدام

### الاستخدام الأساسي

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // الناتج: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // الناتج: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
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
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // الناتج: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // الناتج: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // الناتج: "Hello" (محتوى اللغة الافتراضية)
```

### استخدام أنواع محتوى مخصصة:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // الناتج: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // الناتج: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
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
  - عندما لا يتم العثور على `locale` في `languageContent`، تقوم الدالة بإرجاع المحتوى للغة الافتراضية.
- **محتوى اللغة غير مكتمل:**
  - إذا كانت اللغة معرفة جزئيًا، لا تقوم الدالة بدمج المحتويات. تسترجع فقط قيمة اللغة المحددة أو تعود إلى اللغة الافتراضية.
- **تطبيق قواعد TypeScript:**
  - إذا لم تتطابق اللغات في `languageContent` مع تكوين المشروع، فإن TypeScript ستفرض تعريف جميع اللغات المطلوبة، مما يضمن أن المحتوى كامل وآمن من حيث النوع.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ

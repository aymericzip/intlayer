# وثائق: وظيفة `getTranslation` في `intlayer`

## الوصف

تقوم وظيفة `getTranslation` باسترجاع المحتوى المقابل للغة معينة من مجموعة محتويات لغوية قابلة للتخصيص. إذا لم يتم العثور على اللغة المحددة، فإنها تعود افتراضيًا إلى إرجاع المحتوى الخاص باللغة الافتراضية المُعدة في المشروع.

## المعلمات

- `languageContent: CustomizableLanguageContent<Content>`

  - **الوصف**: كائن يحتوي على الترجمات للغات مختلفة. يمثل كل مفتاح لغة معينة، وقيمته هي المحتوى المقابل.
  - **النوع**: `CustomizableLanguageContent<Content>`
    - يمكن أن يكون `Content` أي نوع، والافتراضي هو `string`.

- `locale: Locales`

  - **الوصف**: اللغة التي سيتم استرجاع المحتوى الخاص بها.
  - **النوع**: `Locales`

## العوائد

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
    ar: "مرحبا",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبا",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبا",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### لغة مفقودة:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبا",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبا",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (محتوى اللغة الافتراضية)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    ar: "مرحبا",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (محتوى اللغة الافتراضية)
```

### استخدام أنواع محتوى مخصصة:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    ar: { greeting: "مرحبا" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    ar: { greeting: "مرحبا" }
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
    ar: { greeting: "مرحبا" }
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## الحالات الخاصة

- **اللغة غير موجودة:**
  - عندما لا يتم العثور على `locale` في `languageContent`، تقوم الوظيفة بإرجاع المحتوى الخاص باللغة الافتراضية.
- **محتوى لغوي غير مكتمل:**
  - إذا تم تعريف لغة بشكل جزئي، فإن الوظيفة لا تدمج المحتويات. تقوم فقط باسترجاع قيمة اللغة المحددة أو تعود إلى الافتراضية.
- **فرض TypeScript:**
  - إذا لم تتطابق اللغات في `languageContent` مع إعدادات المشروع، فإن TypeScript يفرض تعريف جميع اللغات المطلوبة، مما يضمن اكتمال المحتوى وسلامة النوع.

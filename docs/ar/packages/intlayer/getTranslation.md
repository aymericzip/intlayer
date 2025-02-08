# الوثائق: دالة `getTranslation` في `intlayer`

## الوصف:

تسترد دالة `getTranslation` المحتوى المقابل لبيئة معينة من مجموعة محتوى لغوي قابلة للتخصيص. إذا لم يتم العثور على البيئة المحددة، فإنها ترجع بشكل افتراضي المحتوى لبيئة اللغة الافتراضية المكونة في المشروع.

## المعلمات:

- `languageContent: CustomizableLanguageContent<Content>`

  - **الوصف**: كائن يحتوي على الترجمات لبيئات مختلفة. يمثل كل مفتاح بيئة، وقيمته هي المحتوى المقابل.
  - **النوع**: `CustomizableLanguageContent<Content>`
    - يمكن أن يكون `Content` من أي نوع، ويكون بشكل افتراضي `string`.

- `locale: Locales`

  - **الوصف**: البيئة التي يجب استرداد المحتوى من أجلها.
  - **النوع**: `Locales`

## القيم المعادة:

- **النوع**: `Content`
- **الوصف**: المحتوى المقابل للبيئة المحددة. إذا لم يتم العثور على البيئة، يتم إرجاع محتوى البيئة الافتراضية.

## مثال على الاستخدام:

### الاستخدام الأساسي:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // الإخراج: "Bonjour"
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

console.log(content); // الإخراج: "Bonjour"
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

console.log(content); // الإخراج: "Bonjour"
```

### بيئة مفقودة:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // الإخراج: "Hello" (محتوى البيئة الافتراضية)
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

console.log(content); // الإخراج: "Hello" (محتوى البيئة الافتراضية)
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

console.log(content); // الإخراج: "Hello" (محتوى البيئة الافتراضية)
```

### استخدام أنواع المحتوى المخصصة:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // الإخراج: "Bonjour"
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

console.log(customContent.greeting); // الإخراج: "Bonjour"
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

console.log(customContent.greeting); // الإخراج: "Bonjour"
```

## حالات الحافة:

- **لم يتم العثور على البيئة:**
  - عندما لا يتم العثور على `locale` في `languageContent`، ترجع الدالة المحتوى للبيئة الافتراضية.
- **محتوى اللغة غير مكتمل:**

  - إذا كانت البيئة مُعرفة جزئيًا، فإن الدالة لا تدمج المحتويات. بل تسترد القيمة للبيئة المحددة أو تعود إلى الافتراضي.

- **فرضية TypeScript:**
  - إذا كانت البيئات في `languageContent` لا تتطابق مع تكوين المشروع، ستجبر TypeScript على تعريف جميع البيئات المطلوبة، مما يضمن أن المحتوى مكتمل وآمن من حيث النوع.

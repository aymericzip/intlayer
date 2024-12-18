# Documentation: `getTranslationContent` Function in `intlayer`

## Description:

وظيفة `getTranslationContent` تقوم باسترجاع المحتوى المقابل لبيئة معينة من مجموعة محتوى اللغات القابلة للتخصيص. إذا لم يتم العثور على البيئة المحددة، فإنها تعود إلى استرجاع المحتوى الخاص بالبيئة الافتراضية المكونة في المشروع.

## Parameters:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description**: كائن يحتوي على الترجمات لمختلف البيئات. كل مفتاح يمثل بيئة، وقيمته هي المحتوى المقابل.
  - **Type**: `CustomizableLanguageContent<Content>`
    - `Content` يمكن أن يكون أي نوع، يتم افتراضه كـ `string`.

- `locale: Locales`

  - **Description**: البيئة التي يجب استرجاع المحتوى لها.
  - **Type**: `Locales`

## Returns:

- **Type**: `Content`
- **Description**: المحتوى المقابل للبيئة المحددة. إذا لم يتم العثور على البيئة، يتم إرجاع محتوى البيئة الافتراضية.

## Example Usage:

### Basic Usage:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Missing Locale:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (default locale content)
```

### Using Custom Content Types:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Edge Cases:

- **Locale Not Found:**
  - عندما لا يتم العثور على `locale` في `languageContent`، فإن الوظيفة تعيد المحتوى الخاص بالبيئة الافتراضية.
- **Incomplete Language Content:**

  - إذا كانت البيئة مُعرفّة جزئيًا، فإن الوظيفة لا تقوم بدمج المحتويات. إنها تسترجع بدقة قيمة البيئة المحددة أو تعود إلى الافتراضي.

- **TypeScript Enforcement:**
  - إذا كانت البيئات في `languageContent` لا تتطابق مع إعدادات المشروع، فسوف تفرض TypeScript ضرورة تعريف جميع البيئات المطلوبة، مما يضمن أن المحتوى مكتمل وآمن نوعيًا.

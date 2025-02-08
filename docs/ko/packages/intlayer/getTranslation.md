# Documentation: `getTranslation` Function in `intlayer`

## Description

`getTranslation` 함수는 사용자 정의 언어 콘텐츠 집합에서 특정 로케일에 해당하는 콘텐츠를 검색합니다. 지정된 로케일이 발견되지 않으면 프로젝트에 구성된 기본 로케일의 콘텐츠를 반환하도록 기본값이 설정됩니다.

## Parameters

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description**: 다양한 로케일에 대한 번역을 포함하는 객체입니다. 각 키는 로케일을 나타내며, 값은 해당 콘텐츠입니다.
  - **Type**: `CustomizableLanguageContent<Content>`
    - `Content`는 어떤 유형도 가능하며, 기본값은 `string`입니다.

- `locale: Locales`

  - **Description**: 콘텐츠를 검색할 로케일입니다.
  - **Type**: `Locales`

## Returns

- **Type**: `Content`
- **Description**: 지정된 로케일에 해당하는 콘텐츠입니다. 로케일이 발견되지 않으면 기본 로케일의 콘텐츠가 반환됩니다.

## Example Usage

### Basic Usage

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
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
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Missing Locale:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (default locale content)
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

console.log(content); // Output: "Hello" (default locale content)
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

console.log(content); // Output: "Hello" (default locale content)
```

### Using Custom Content Types:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
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
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Edge Cases

- **Locale Not Found:**
  - `locale`가 `languageContent`에서 발견되지 않을 때, 함수는 기본 로케일의 콘텐츠를 반환합니다.
- **Incomplete Language Content:**

  - 로케일이 부분적으로 정의된 경우, 함수는 내용을 병합하지 않습니다. 지정된 로케일의 값만 검색하거나 기본값으로 돌아갑니다.

- **TypeScript Enforcement:**
  - `languageContent`의 로케일이 프로젝트 구성과 일치하지 않으면, TypeScript는 모든 필수 로케일이 정의되도록 강제하여 콘텐츠가 완전하고 타입 안전하게 유지됩니다.

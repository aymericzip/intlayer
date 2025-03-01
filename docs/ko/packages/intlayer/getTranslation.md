# 문서: `getTranslationContent` 함수 in `intlayer`

## 설명

`getTranslationContent` 함수는 사용자 정의 가능한 언어 콘텐츠에서 특정 로케일에 해당하는 콘텐츠를 검색합니다. 지정된 로케일이 발견되지 않으면, 프로젝트에서 구성된 기본 로케일의 콘텐츠를 반환합니다.

## 매개변수

- `languageContent: CustomizableLanguageContent<Content>`

  - **설명**: 다양한 로케일에 대한 번역을 포함하는 객체입니다. 각 키는 로케일을 나타내며, 값은 해당 로케일의 콘텐츠입니다.
  - **유형**: `CustomizableLanguageContent<Content>`
    - `Content`는 기본적으로 `string`이며, 모든 유형이 될 수 있습니다.

- `locale: Locales`

  - **설명**: 콘텐츠를 검색할 로케일입니다.
  - **유형**: `Locales`

## 반환값

- **유형**: `Content`
- **설명**: 지정된 로케일에 해당하는 콘텐츠입니다. 로케일이 발견되지 않으면 기본 로케일의 콘텐츠를 반환합니다.

## 사용 예시

### 기본 사용법

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 출력: "Bonjour"
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

console.log(content); // 출력: "Bonjour"
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

console.log(content); // 출력: "Bonjour"
```

### 로케일 누락:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 출력: "Hello" (기본 로케일 콘텐츠)
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

console.log(content); // 출력: "Hello" (기본 로케일 콘텐츠)
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

console.log(content); // 출력: "Hello" (기본 로케일 콘텐츠)
```

### 사용자 정의 콘텐츠 유형 사용:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 출력: "Bonjour"
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

console.log(customContent.greeting); // 출력: "Bonjour"
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

console.log(customContent.greeting); // 출력: "Bonjour"
```

## 엣지 케이스

- **로케일 없음:**
  - `locale`이 `languageContent`에서 발견되지 않을 경우, 함수는 기본 로케일의 콘텐츠를 반환합니다.
- **불완전한 언어 콘텐츠:**
  - 로케일이 부분적으로 정의된 경우, 함수는 콘텐츠를 병합하지 않습니다. 지정된 로케일의 값을 엄격히 검색하거나 기본값으로 대체합니다.
- **TypeScript 강제성:**
  - `languageContent`의 로케일이 프로젝트 구성과 일치하지 않을 경우, TypeScript는 모든 필수 로케일이 정의되도록 강제하여 콘텐츠가 완전하고 타입 안전성을 보장합니다.

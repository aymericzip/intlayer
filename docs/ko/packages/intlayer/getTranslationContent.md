# Documentation: `getTranslationContent` 함수 in `intlayer`

## 설명:

`getTranslationContent` 함수는 사용자 지정 언어 콘텐츠 집합에서 특정 로케일에 해당하는 콘텐츠를 검색합니다. 지정된 로케일을 찾을 수 없는 경우 프로젝트에 구성된 기본 로케일의 콘텐츠를 반환합니다.

## 매개변수:

- `languageContent: CustomizableLanguageContent<Content>`

  - **설명**: 다양한 로케일에 대한 번역을 포함하는 객체입니다. 각 키는 로케일을 나타내며, 그 값은 해당 콘텐츠입니다.
  - **유형**: `CustomizableLanguageContent<Content>`
    - `Content`는 모든 유형일 수 있으며, 기본적으로 `string`입니다.

- `locale: Locales`

  - **설명**: 검색할 콘텐츠의 로케일입니다.
  - **유형**: `Locales`

## 반환:

- **유형**: `Content`
- **설명**: 지정된 로케일에 해당하는 콘텐츠입니다. 로케일을 찾을 수 없는 경우 기본 로케일의 콘텐츠가 반환됩니다.

## 예제 사용법:

### 기본 사용법:

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

### 누락된 로케일:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (기본 로케일 콘텐츠)
```

### 사용자 정의 콘텐츠 유형 사용:

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

## 엣지 케이스:

- **로케일을 찾을 수 없음:**
  - `locale`이 `languageContent`에서 발견되지 않으면 함수는 기본 로케일의 콘텐츠를 반환합니다.
- **불완전한 언어 콘텐츠:**

  - 로케일이 부분적으로 정의되어 있는 경우, 함수는 내용을 병합하지 않습니다. 지정된 로케일의 값을 엄격하게 검색하거나 기본값으로 돌아갑니다.

- **TypeScript 규칙 적용:**
  - `languageContent`의 로케일이 프로젝트 구성과 일치하지 않으면 TypeScript는 모든 필수 로케일이 정의되도록 강제하여 콘텐츠가 완전하고 유형 안전하도록 보장합니다.

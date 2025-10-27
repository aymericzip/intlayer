---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getTranslation 함수 문서 | intlayer
description: intlayer 패키지의 getTranslation 함수 사용법 안내
keywords:
  - getTranslation
  - 번역
  - Intlayer
  - intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getTranslation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# 문서: `intlayer`의 `getTranslationContent` 함수

## 설명

`getTranslationContent` 함수는 사용자 정의 가능한 언어 콘텐츠 집합에서 특정 로케일에 해당하는 콘텐츠를 가져옵니다. 지정된 로케일을 찾을 수 없는 경우, 프로젝트에 설정된 기본 로케일의 콘텐츠를 반환합니다.

## 매개변수

- `languageContent: CustomizableLanguageContent<Content>`

  - **설명**: 여러 로케일에 대한 번역을 포함하는 객체입니다. 각 키는 로케일을 나타내며, 값은 해당 로케일에 맞는 콘텐츠입니다.
  - **타입**: `CustomizableLanguageContent<Content>`
    - `Content`는 기본적으로 `string` 타입이며, 어떤 타입도 될 수 있습니다.

- `locale: Locales`

  - **설명**: 콘텐츠를 가져올 대상 로케일입니다.
  - **타입**: `Locales`

## 반환값

- **타입**: `Content`
- **설명**: 지정된 로케일에 해당하는 콘텐츠입니다. 로케일을 찾을 수 없는 경우, 기본 로케일의 콘텐츠가 반환됩니다.

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

### 누락된 로케일:

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

### 사용자 정의 콘텐츠 타입 사용:

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

## 예외 상황

- **로케일을 찾을 수 없음:**
  - `locale`이 `languageContent`에 없을 경우, 함수는 기본 로케일의 콘텐츠를 반환합니다.
- **불완전한 언어 콘텐츠:**
  - 로케일이 부분적으로 정의된 경우, 함수는 콘텐츠를 병합하지 않습니다. 지정된 로케일의 값을 엄격하게 가져오거나 기본값으로 대체합니다.
- **TypeScript 강제 적용:**
  - `languageContent`의 로케일이 프로젝트 구성과 일치하지 않으면, TypeScript는 모든 필수 로케일이 정의되도록 강제하여 콘텐츠가 완전하고 타입 안전함을 보장합니다.

---
docName: package__intlayer__getTranslationContent
url: https://intlayer.org/doc/package/intlayer/getTranslationContent
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getTranslationContent.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: getTranslation 함수 - Intlayer 자바스크립트 문서
description: 특정 로케일에 대한 현지화된 콘텐츠를 기본 로케일로 대체하여 가져오는 Intlayer의 getTranslation 함수 문서입니다.
keywords:
  - getTranslation
  - intlayer
  - 함수
  - 현지화
  - i18n
  - 자바스크립트
  - 번역
  - 로케일
---

# 문서: `intlayer`의 `getTranslation` 함수

## 설명

`getTranslation` 함수는 사용자 정의 가능한 언어 콘텐츠 집합에서 특정 로케일에 해당하는 콘텐츠를 가져옵니다. 지정한 로케일이 없으면 프로젝트에 구성된 기본 로케일의 콘텐츠를 반환합니다.

## 매개변수

- `languageContent: CustomizableLanguageContent<Content>`

  - **설명**: 여러 로케일에 대한 번역을 포함하는 객체입니다. 각 키는 로케일을 나타내며, 값은 해당 로케일의 콘텐츠입니다.
  - **타입**: `CustomizableLanguageContent<Content>`
    - `Content`는 기본적으로 `string` 타입을 가지며, 어떤 타입도 될 수 있습니다.

- `locale: Locales`

  - **설명**: 콘텐츠를 가져올 로케일입니다.
  - **타입**: `Locales`

## 반환값

- **타입**: `Content`
- **설명**: 지정된 로케일에 해당하는 콘텐츠입니다. 만약 로케일을 찾을 수 없으면, 기본 로케일의 콘텐츠가 반환됩니다.

## 사용 예시

### 기본 사용법

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // 출력: "Bonjour"
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

console.log(content); // 출력: "Bonjour"
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

console.log(content); // 출력: "Bonjour"
```

### 누락된 로케일:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // 출력: "Hello" (기본 로케일 내용)
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

console.log(content); // 출력: "Hello" (기본 로케일 내용)
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

console.log(content); // 출력: "Hello" (기본 로케일 내용)
```

### 사용자 정의 콘텐츠 타입 사용:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // 출력: "Bonjour"
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

console.log(customContent.greeting); // 출력: "Bonjour"
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

console.log(customContent.greeting); // 출력: "Bonjour"
```

## 예외 상황

- **로케일을 찾을 수 없음:**
  - `locale`이 `languageContent`에 없을 경우, 함수는 기본 로케일의 콘텐츠를 반환합니다.
- **불완전한 언어 콘텐츠:**
  - 로케일이 부분적으로 정의된 경우, 함수는 콘텐츠를 병합하지 않습니다. 지정된 로케일의 값을 엄격히 가져오거나 기본값으로 대체합니다.
- **TypeScript 강제 적용:**
  - `languageContent`의 로케일이 프로젝트 구성과 일치하지 않으면, TypeScript는 모든 필수 로케일이 정의되도록 강제하여 콘텐츠가 완전하고 타입 안전함을 보장합니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력

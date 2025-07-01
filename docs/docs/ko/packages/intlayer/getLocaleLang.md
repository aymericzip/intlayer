---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleLang 함수 문서 | intlayer
description: intlayer 패키지의 getLocaleLang 함수 사용법 안내
keywords:
  - getLocaleLang
  - 번역
  - Intlayer
  - intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# 문서: `intlayer`의 `getLocaleLang` 함수

## 설명

`getLocaleLang` 함수는 로케일 문자열에서 언어 코드를 추출합니다. 국가 코드가 포함된 로케일과 포함되지 않은 로케일 모두를 지원합니다. 로케일이 제공되지 않으면 기본적으로 빈 문자열을 반환합니다.

## 매개변수

- `locale?: Locales`

  - **설명**: 언어 코드가 추출될 로케일 문자열 (예: `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`)
  - **타입**: `Locales` (선택 사항)

## 반환값

- **타입**: `string`
- **설명**: 로케일에서 추출된 언어 코드. 로케일이 제공되지 않으면 빈 문자열(`''`)을 반환합니다.

## 사용 예제

### 언어 코드 추출:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 출력: "en"
getLocaleLang(Locales.ENGLISH); // 출력: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 출력: "fr"
getLocaleLang(Locales.FRENCH); // 출력: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 출력: "en"
getLocaleLang(Locales.ENGLISH); // 출력: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 출력: "fr"
getLocaleLang(Locales.FRENCH); // 출력: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 출력: "en"
getLocaleLang(Locales.ENGLISH); // 출력: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 출력: "fr"
getLocaleLang(Locales.FRENCH); // 출력: "fr"
```

## 예외 상황

- **로케일이 제공되지 않은 경우:**

- `locale`가 `undefined`일 때 함수는 빈 문자열을 반환합니다.

- **잘못된 형식의 로케일 문자열:**
  - `locale`이 `language-country` 형식을 따르지 않는 경우(예: `Locales.ENGLISH-US`), 함수는 `'-'` 이전 부분을 안전하게 반환하거나 `'-'`가 없으면 전체 문자열을 반환합니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력

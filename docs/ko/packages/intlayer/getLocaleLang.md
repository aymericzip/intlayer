---
docName: package__intlayer__getLocaleLang
url: https://intlayer.org/doc/packages/intlayer/getLocaleLang
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getLocaleLang.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getLocaleLang 함수 문서 | intlayer
description: intlayer 패키지의 getLocaleLang 함수 사용 방법을 확인하세요
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

# 문서: `getLocaleLang` 함수 in `intlayer`

## 설명

`getLocaleLang` 함수는 로케일 문자열에서 언어 코드를 추출합니다. 국가 코드가 포함되거나 포함되지 않은 로케일을 지원합니다. 로케일이 제공되지 않으면 기본적으로 빈 문자열을 반환합니다.

## 매개변수

- `locale?: Locales`

  - **설명**: 언어 코드를 추출할 로케일 문자열 (예: `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`).
  - **유형**: `Locales` (선택 사항)

## 반환값

- **유형**: `string`
- **설명**: 로케일에서 추출된 언어 코드. 로케일이 제공되지 않으면 빈 문자열 (`''`)을 반환합니다.

## 사용 예시

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

## 경계 사례

- **로케일이 제공되지 않은 경우:**

  - `locale`이 `undefined`인 경우 함수는 빈 문자열을 반환합니다.

- **잘못된 로케일 문자열:**
  - `locale`이 `language-country` 형식을 따르지 않는 경우 (예: `Locales.ENGLISH-US`), 함수는 안전하게 `'-'` 이전 부분을 반환하거나 `'-'`가 없는 경우 전체 문자열을 반환합니다.

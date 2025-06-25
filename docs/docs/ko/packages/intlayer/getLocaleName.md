---
docName: package__intlayer__getLocaleName
url: https://intlayer.org/doc/packages/intlayer/getLocaleName
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: getLocaleName 함수 문서 | intlayer
description: intlayer 패키지의 getLocaleName 함수 사용 방법을 확인하세요
keywords:
  - getLocaleName
  - 번역
  - Intlayer
  - intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# 문서: `getLocaleName` 함수 in `intlayer`

## 설명

`getLocaleName` 함수는 주어진 로케일(`targetLocale`)의 로컬라이즈된 이름을 표시 로케일(`displayLocale`)에서 반환합니다. `targetLocale`이 제공되지 않으면, 표시 로케일의 이름을 해당 언어로 반환합니다.

## 매개변수

- `displayLocale: Locales`

  - **설명**: 대상 로케일의 이름이 표시될 로케일입니다.
  - **유형**: 유효한 로케일을 나타내는 열거형 또는 문자열.

- `targetLocale?: Locales`
  - **설명**: 로컬라이즈된 이름을 가져올 로케일입니다.
  - **유형**: 선택 사항. 유효한 로케일을 나타내는 열거형 또는 문자열.

## 반환값

- **유형**: `string`
- **설명**: `displayLocale`에서 `targetLocale`의 로컬라이즈된 이름 또는 `targetLocale`이 제공되지 않은 경우 `displayLocale` 자신의 이름. 번역을 찾을 수 없는 경우 `"Unknown locale"`을 반환합니다.

## 사용 예시

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 출력: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 출력: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 출력: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 출력: "English"

getLocaleName(Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 출력: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 출력: "French"

getLocaleName(Locales.CHINESE); // 출력: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 출력: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 출력: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 출력: "Chinese"

getLocaleName("unknown-locale"); // 출력: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 출력: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 출력: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 출력: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 출력: "English"

getLocaleName(Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 출력: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 출력: "French"

getLocaleName(Locales.CHINESE); // 출력: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 출력: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 출력: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 출력: "Chinese"

getLocaleName("unknown-locale"); // 출력: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // 출력: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 출력: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 출력: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 출력: "English"

getLocaleName(Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 출력: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 출력: "French"

getLocaleName(Locales.CHINESE); // 출력: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 출력: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 출력: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 출력: "Chinese"

getLocaleName("unknown-locale"); // 출력: "Unknown locale"
```

## 엣지 케이스

- **`targetLocale`가 제공되지 않은 경우:**
  - 함수는 기본적으로 `displayLocale` 자신의 이름을 반환합니다.
- **번역 누락:**
  - `localeNameTranslations`에 `targetLocale` 또는 특정 `displayLocale`에 대한 항목이 없으면, 함수는 `ownLocalesName`으로 대체하거나 `"Unknown locale"`을 반환합니다.

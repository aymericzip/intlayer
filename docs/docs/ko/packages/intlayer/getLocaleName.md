---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocaleName 함수 문서 | intlayer
description: intlayer 패키지의 getLocaleName 함수 사용법 보기
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
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# 문서: `intlayer`의 `getLocaleName` 함수

## 설명

`getLocaleName` 함수는 주어진 로케일(`targetLocale`)의 현지화된 이름을 표시 로케일(`displayLocale`)로 반환합니다. `targetLocale`이 제공되지 않으면, `displayLocale`의 이름을 해당 로케일의 언어로 반환합니다.

## 매개변수

- `displayLocale: Locales`

  - **설명**: 대상 로케일의 이름이 표시될 로케일입니다.
  - **타입**: 유효한 로케일을 나타내는 열거형 또는 문자열입니다.

- `targetLocale?: Locales`
  - **설명**: 이름이 현지화될 로케일입니다.
  - **타입**: 선택 사항이며, 유효한 로케일을 나타내는 열거형 또는 문자열입니다.

## 반환값

- **타입**: `string`
- **설명**: `targetLocale`가 제공되면 `displayLocale`에서 현지화된 `targetLocale`의 이름을 반환하며, 제공되지 않으면 `displayLocale` 자신의 이름을 반환합니다. 번역을 찾을 수 없으면 `"Unknown locale"`을 반환합니다.

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

getLocaleName("unknown-locale"); // 출력: "알 수 없는 로케일"
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

## 예외 상황

- **`targetLocale`가 제공되지 않은 경우:**
- 함수는 기본적으로 `displayLocale` 자신의 이름을 반환합니다.
- **번역 누락:**
  - `localeNameTranslations`에 `targetLocale` 또는 특정 `displayLocale`에 대한 항목이 없으면, 함수는 `ownLocalesName`을 사용하거나 `"Unknown locale"`을 반환합니다.

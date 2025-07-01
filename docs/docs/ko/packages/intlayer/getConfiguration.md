---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getConfiguration 함수 문서 | intlayer
description: intlayer 패키지의 getConfiguration 함수 사용법 안내
keywords:
  - getConfiguration
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
  - getConfiguration
---

# 문서: `intlayer`의 `getConfiguration` 함수

## 설명

`getConfiguration` 함수는 환경 변수를 추출하여 `intlayer` 애플리케이션의 전체 구성을 가져옵니다. 이 함수는 클라이언트와 서버 양쪽에서 동일한 구성을 사용할 수 있는 유연성을 제공하여 애플리케이션 전반에 걸쳐 일관성을 보장합니다.

---

## 매개변수

이 함수는 매개변수를 받지 않습니다. 대신 환경 변수를 사용하여 구성을 처리합니다.

### 반환값

- **타입**: `IntlayerConfig`
- **설명**: `intlayer`의 전체 구성을 포함하는 객체입니다. 구성은 다음 섹션을 포함합니다:

  - `internationalization`: 로케일 및 엄격 모드와 관련된 설정.
  - `middleware`: URL 및 쿠키 관리와 관련된 설정.
  - `content`: 콘텐츠 파일, 디렉토리 및 패턴과 관련된 설정.
  - `editor`: 에디터 전용 구성.

자세한 내용은 [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

---

## 사용 예시

### 전체 구성 가져오기

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 출력:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 출력:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// 출력:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### `availableLocales` 및 `defaultLocale` 추출하기

설정의 `internationalization` 섹션은 `locales` (사용 가능한 로케일) 및 `defaultLocale` (기본 언어)과 같은 로케일 관련 설정을 제공합니다.

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 출력 예시: ["en", "fr", "es"]
console.log(defaultLocale); // 출력 예시: "en"
console.log(cookieName); // 출력: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 출력 예시: ["en", "fr", "es"]
console.log(defaultLocale); // 출력 예시: "en"
console.log(cookieName); // 출력: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 출력 예시: ["en", "fr", "es"]
console.log(defaultLocale); // 출력 예시: "en"
console.log(cookieName); // 출력: "INTLAYER_LOCALE"
```

## 주의 사항

- 이 함수를 호출하기 전에 모든 필수 환경 변수가 올바르게 설정되어 있는지 확인하세요. 누락된 변수는 초기화 중 오류를 발생시킵니다.
- 이 함수는 클라이언트와 서버 양쪽에서 사용할 수 있어, 구성을 통합적으로 관리하는 데 유용한 도구입니다.

## 애플리케이션에서의 사용

`getConfiguration` 함수는 `intlayer` 애플리케이션의 설정을 초기화하고 관리하는 데 핵심적인 유틸리티입니다. 로케일, 미들웨어, 콘텐츠 디렉토리와 같은 설정에 접근할 수 있게 하여 다국어 및 콘텐츠 중심 애플리케이션 전반에 걸쳐 일관성과 확장성을 보장합니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력

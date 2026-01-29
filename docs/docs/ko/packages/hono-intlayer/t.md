---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t 함수 문서 | hono-intlayer
description: hono-intlayer 패키지의 t 함수 사용법 알아보기
keywords:
  - t
  - 번역
  - Intlayer
  - 국제화
  - 문서
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 히스토리 초기화
---

# 문서: `hono-intlayer`의 `t` 함수

`hono-intlayer` 패키지의 `t` 함수는 Hono 애플리케이션에서 현지화된 응답을 제공하기 위한 핵심 유틸리티입니다. 사용자의 선호 언어에 따라 콘텐츠를 동적으로 선택하여 국제화(i18n)를 단순화합니다.

---

## 개요

`t` 함수는 지정된 언어 세트에 대한 번역을 정의하고 검색하는 데 사용됩니다. `Accept-Language` 헤더와 같은 클라이언트의 요청 설정을 기반으로 반환할 적절한 언어를 자동으로 결정합니다. 선호 언어를 사용할 수 없는 경우 구성에 지정된 기본 로케일로 원활하게 폴백합니다.

---

## 주요 기능

- **동적 현지화**: 클라이언트에 가장 적합한 번역을 자동으로 선택합니다.
- **기본 로케일 폴백**: 클라이언트의 선호 언어를 사용할 수 없는 경우 기본 로케일로 폴백하여 사용자 경험의 연속성을 보장합니다.
- **가볍고 빠름**: 고성능 애플리케이션을 위해 설계되어 오버헤드를 최소화합니다.
- **엄격 모드 지원**: 신뢰할 수 있는 동작을 위해 선언된 로케일을 엄격히 준수하도록 강제합니다.

---

## 함수 시그니처

```typescript
t(translations: Record<string, string>): string;
```

### 매개변수

- `translations`: 키는 로케일 코드(예: `en`, `fr`, `ko`)이고 값은 해당 번역 문자열인 객체입니다.

### 반환값

- 클라이언트의 선호 언어로 된 콘텐츠를 나타내는 문자열입니다.

---

## 국제화 요청 핸들러 로드

`hono-intlayer`에서 제공하는 국제화 기능이 올바르게 작동하려면 Hono 애플리케이션의 시작 부분에서 국제화 미들웨어를 로드**해야 합니다**. 이렇게 하면 `t` 함수가 활성화되고 로케일 감지 및 번역이 적절하게 처리됩니다.

애플리케이션의 **모든 라우트 앞**에 `app.use("*", intlayer())` 미들웨어를 배치하여 모든 라우트가 국제화의 이점을 누릴 수 있도록 하세요.

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// 국제화 요청 핸들러 로드
app.use("*", intlayer());

// 미들웨어 로드 후 라우트 정의
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ko: "안녕하세요, 세상!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// 국제화 요청 핸들러 로드
app.use("*", intlayer());

// 미들웨어 로드 후 라우트 정의
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ko: "안녕하세요, 세상!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// 국제화 요청 핸들러 로드
app.use("*", intlayer());

// 미들웨어 로드 후 라우트 정의
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      ko: "안녕하세요, 세상!",
    })
  );
});
```

### 이것이 필요한 이유

- **로케일 감지**: `intlayer` 미들웨어는 헤더, 쿠키 또는 기타 구성된 방법을 기반으로 사용자의 선호 로케일을 감지하기 위해 들어오는 요청을 처리합니다.
- **번역 컨텍스트**: `t` 함수가 올바르게 작동하는 데 필요한 컨텍스트를 설정하여 번역이 올바른 언어로 반환되도록 합니다.
- **오류 방지**: 이 미들웨어가 없으면 필요한 로케일 정보를 사용할 수 없으므로 `t` 함수를 사용하면 런타임 오류가 발생합니다.

---

## 사용 예시

### 기본 예시

다양한 언어로 현지화된 콘텐츠 제공:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      ko: "환영합니다!",
    })
  );
});
```

**클라이언트 요청:**

- `Accept-Language: fr` 클라이언트는 `Bienvenue!`를 받습니다.
- `Accept-Language: ko` 클라이언트는 `환영합니다!`를 받습니다.
- `Accept-Language: de` 클라이언트는 `Welcome!`(기본 로케일)을 받습니다.

### 오류 처리

여러 언어로 오류 메시지 제공:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      ko: "예기치 않은 오류가 발생했습니다.",
    }),
    500
  );
});
```

---

### 로케일 변형 사용

로케일 특정 변형에 대한 번역 지정:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      ko: "안녕하세요!",
    })
  );
});
```

---

## 심화 주제

### 폴백 메커니즘

선호 로케일을 사용할 수 없는 경우 `t` 함수는 구성에 정의된 기본 로케일로 폴백합니다.

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.KOREAN],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### 엄격 모드 강제

선언된 로케일을 엄격히 준수하도록 `t` 함수를 구성합니다.

| 모드        | 동작                                                                                  |
| ----------- | ------------------------------------------------------------------------------------- |
| `strict`    | 선언된 모든 로케일에 번역이 제공되어야 합니다. 누락된 로케일은 오류를 발생시킵니다.   |
| `inclusive` | 선언된 로케일에 번역이 있어야 합니다. 누락된 로케일은 경고를 발생시키지만 허용됩니다. |
| `loose`     | 선언되지 않았더라도 기존의 모든 로케일이 허용됩니다.                                  |

---

### TypeScript 통합

TypeScript와 함께 사용하면 `t` 함수는 타입 안전합니다. 타입 안전한 번역 객체를 정의합니다.

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  ko: "좋은 아침입니다!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### 일반적인 오류 및 문제 해결

| 문제                     | 원인                                  | 해결 방법                                                         |
| ------------------------ | ------------------------------------- | ----------------------------------------------------------------- |
| `t` 함수가 작동하지 않음 | 미들웨어가 로드되지 않음              | 라우트 전에 `app.use("*", intlayer())`가 추가되었는지 확인하세요. |
| 번역 누락 오류           | 모든 로케일 없이 엄격 모드가 활성화됨 | 필요한 모든 번역을 제공하세요.                                    |

---

## 결론

`t` 함수는 백엔드 국제화를 위한 강력한 도구입니다. 이를 효과적으로 사용하여 글로벌 사용자를 위해 더 포용적이고 사용자 친화적인 애플리케이션을 만들 수 있습니다. 고급 사용법 및 자세한 구성 옵션은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)를 참조하세요.

---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t 함수 문서 | express-intlayer
description: express-intlayer 패키지의 t 함수 사용법 안내
keywords:
  - t
  - 번역
  - Intlayer
  - 국제화
  - 문서
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# 문서: `express-intlayer`의 `t` 함수

`express-intlayer` 패키지의 `t` 함수는 Express 애플리케이션에서 지역화된 응답을 제공하는 핵심 유틸리티입니다. 사용자의 선호 언어에 따라 동적으로 콘텐츠를 선택하여 국제화(i18n)를 간소화합니다.

---

## 개요

`t` 함수는 주어진 언어 집합에 대한 번역을 정의하고 검색하는 데 사용됩니다. 클라이언트의 요청 설정(예: `Accept-Language` 헤더)을 기반으로 반환할 적절한 언어를 자동으로 결정합니다. 선호하는 언어가 없을 경우, 구성에 지정된 기본 로케일로 우아하게 대체됩니다.

---

## 주요 기능

- **동적 지역화**: 클라이언트에 가장 적합한 번역을 자동으로 선택합니다.
- **기본 로케일로 대체**: 클라이언트가 선호하는 언어를 사용할 수 없을 경우 기본 로케일로 대체하여 사용자 경험의 연속성을 보장합니다.
- **경량 및 고속**: 고성능 애플리케이션을 위해 설계되어 최소한의 오버헤드를 보장합니다.
- **엄격 모드 지원**: 선언된 로케일을 엄격히 준수하도록 하여 신뢰할 수 있는 동작을 보장합니다.

---

## 함수 시그니처

```typescript
t(translations: Record<string, string>): string;
```

### 매개변수

- `translations`: 키는 로케일 코드(예: `en`, `fr`, `es-MX`)이고 값은 해당 번역 문자열인 객체입니다.

### 반환값

- 클라이언트가 선호하는 언어로 된 내용을 나타내는 문자열입니다.

---

## 국제화 요청 핸들러 로딩

`express-intlayer`에서 제공하는 국제화 기능이 올바르게 작동하도록 하려면, Express 애플리케이션의 시작 부분에서 반드시 국제화 미들웨어를 로드해야 합니다. 이렇게 하면 `t` 함수가 활성화되고, 로케일 감지 및 번역 처리가 제대로 이루어집니다.

애플리케이션 내 모든 라우트가 국제화의 혜택을 받을 수 있도록 `app.use(intlayer())` 미들웨어를 **모든 라우트보다 먼저** 배치하세요:

````typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 미들웨어 로드 후 라우트 정의
app.get("/", (_req, res) => {
  res.send(
`express-intlayer`에서 제공하는 국제화 기능이 올바르게 작동하려면, Express 애플리케이션의 시작 부분에서 반드시 국제화 미들웨어를 로드해야 합니다. 이렇게 하면 `t` 함수가 활성화되고, 로케일 감지 및 번역 처리가 제대로 이루어집니다.

애플리케이션의 모든 라우트가 국제화 기능을 활용할 수 있도록 `app.use(intlayer())` 미들웨어를 **모든 라우트보다 먼저** 배치하세요:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 미들웨어 로드 후 라우트 정의
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
````

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 미들웨어 로드 후 라우트 정의
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());

// 미들웨어 로드 후 라우트 정의
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### 이 작업이 필요한 이유

- **로케일 감지**: `intlayer` 미들웨어는 요청 헤더, 쿠키 또는 기타 설정된 방법을 통해 사용자의 선호 로케일을 감지합니다.
- **번역 컨텍스트 설정**: `t` 함수가 올바르게 작동할 수 있도록 필요한 컨텍스트를 설정하여 정확한 언어로 번역을 반환합니다.
- **오류 방지**: 이 미들웨어가 없으면 `t` 함수를 사용할 때 필요한 로케일 정보가 없어 런타임 오류가 발생합니다.

---

## 사용 예제

### 기본 예제

// 미들웨어를 로드한 후 라우트를 정의합니다
app.get("/", (\_req, res) => {
res.send(
t({
en: "Hello, World!",
fr: "Bonjour le monde!",
es: "¡Hola, Mundo!",
})
);
});

````

### 왜 이것이 필요한가

- **로케일 감지**: `intlayer` 미들웨어는 헤더, 쿠키 또는 기타 구성된 방법을 기반으로 사용자의 선호 로케일을 감지하기 위해 들어오는 요청을 처리합니다.
- **번역 컨텍스트**: `t` 함수가 올바르게 작동할 수 있도록 필요한 컨텍스트를 설정하여 번역이 올바른 언어로 반환되도록 보장합니다.
- **오류 방지**: 이 미들웨어가 없으면 `t` 함수를 사용할 때 필요한 로케일 정보가 없기 때문에 런타임 오류가 발생합니다.

---

## 사용 예제

### 기본 예제

다양한 언어로 현지화된 콘텐츠 제공:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
````

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**클라이언트 요청:**

- `Accept-Language: fr` 헤더를 가진 클라이언트는 `Bienvenue!`를 받습니다.
- `Accept-Language: es`를 가진 클라이언트는 `¡Bienvenido!`를 받습니다.
- `Accept-Language: de`를 가진 클라이언트는 `Welcome!` (기본 로케일)을 받습니다.

### 오류 처리

여러 언어로 오류 메시지를 제공합니다:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "예기치 않은 오류가 발생했습니다.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### 로케일 변형 사용하기

로케일별 변형에 대한 번역을 지정하세요:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "안녕, 친구!",
      fr: "안녕하세요!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "안녕하세요!",
      "en-GB": "안녕, 친구!",
      fr: "안녕하세요!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## 고급 주제

### 폴백 메커니즘

선호하는 로케일을 사용할 수 없는 경우, `t` 함수는 구성에서 정의된 기본 로케일로 폴백합니다:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

예를 들어:

- `defaultLocale`가 `Locales.CHINESE`로 설정되어 있고 클라이언트가 `Locales.DUTCH`를 요청하면, 반환되는 번역은 `Locales.CHINESE` 값으로 기본 설정됩니다.
- `defaultLocale`가 정의되어 있지 않으면, `t` 함수는 `Locales.ENGLISH` 값을 기본으로 사용합니다.

---

### 엄격 모드 적용

`t` 함수를 구성하여 선언된 로케일을 엄격하게 준수하도록 설정할 수 있습니다:

| 모드        | 동작                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `strict`    | 선언된 모든 로케일에 번역이 제공되어야 합니다. 누락된 로케일이 있으면 오류가 발생합니다.       |
| `inclusive` | 선언된 로케일은 번역을 반드시 포함해야 합니다. 누락된 로케일은 경고를 발생시키지만 허용됩니다. |
| `loose`     | 선언되지 않은 로케일이라도 존재하는 모든 로케일을 허용합니다.                                  |

구성 예시:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 기존 구성 유지
  internationalization: {
    // ... 기존 국제화 구성 유지
    strictMode: "strict", // 엄격 모드 적용
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 기존 구성 유지
  internationalization: {
    // ... 기존 국제화 설정
    strictMode: "strict", // 엄격 모드 적용
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기존 설정
  internationalization: {
    // ... 기존 국제화 설정
    strictMode: "strict", // 엄격 모드 적용
  },
};

module.exports = config;
```

---

### TypeScript 통합

` t` 함수는 TypeScript와 함께 사용할 때 타입 안전성을 제공합니다. 타입 안전한 번역 객체를 정의하세요:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
// 다국어 번역 객체 정의
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
// 다국어 번역 객체 정의
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### 일반적인 오류 및 문제 해결

| 문제                     | 원인                                  | 해결 방법                                                    |
| ------------------------ | ------------------------------------- | ------------------------------------------------------------ |
| `t` 함수가 작동하지 않음 | 미들웨어가 로드되지 않음              | 라우트 전에 `app.use(intlayer())`가 추가되었는지 확인하세요. |
| 번역 누락 오류           | 모든 로케일 없이 엄격 모드가 활성화됨 | 필요한 모든 번역을 제공하세요.                               |

---

## 효과적인 사용을 위한 팁

1. **번역 중앙 집중화**: 유지 관리를 개선하기 위해 번역 관리를 중앙 집중화된 모듈이나 JSON 파일을 사용하세요.
2. **번역 검증**: 불필요한 대체를 방지하기 위해 모든 언어 변형에 해당하는 번역이 있는지 확인하세요.
3. **프론트엔드 i18n과 결합**: 앱 전반에 걸쳐 원활한 사용자 경험을 위해 프론트엔드 국제화와 동기화하세요.
4. **성능 벤치마크**: 번역을 추가할 때 앱의 응답 시간을 테스트하여 최소한의 영향을 보장하세요.

---

## 결론

1. **번역 중앙화**: 유지보수를 용이하게 하기 위해 번역 관리를 중앙화된 모듈이나 JSON 파일로 수행하세요.
2. **번역 검증**: 모든 언어 변형에 해당하는 번역이 존재하는지 확인하여 불필요한 폴백을 방지하세요.
3. **프론트엔드 i18n과 결합**: 앱 전반에 걸쳐 원활한 사용자 경험을 위해 프론트엔드 국제화와 동기화하세요.
4. **성능 벤치마크**: 번역 추가 시 앱의 응답 시간을 테스트하여 최소한의 영향만 미치는지 확인하세요.

---

## 결론

`t` 함수는 백엔드 국제화를 위한 강력한 도구입니다. 이를 효과적으로 사용하면 전 세계 사용자를 위한 보다 포용적이고 사용자 친화적인 애플리케이션을 만들 수 있습니다. 고급 사용법과 상세한 구성 옵션은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

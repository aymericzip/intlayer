# 문서: `t` 함수 in `express-intlayer`

`express-intlayer` 패키지의 `t` 함수는 Express 애플리케이션에서 지역화된 응답을 제공하기 위한 핵심 유틸리티입니다. 사용자의 선호 언어에 따라 동적으로 콘텐츠를 선택하여 국제화(i18n)를 간소화합니다.

---

## 개요

`t` 함수는 특정 언어 세트에 대한 번역을 정의하고 검색하는 데 사용됩니다. 클라이언트의 요청 설정(예: `Accept-Language` 헤더)을 기반으로 적절한 언어를 자동으로 결정합니다. 선호하는 언어를 사용할 수 없는 경우, 구성에서 지정된 기본 로케일로 우아하게 대체됩니다.

---

## 주요 기능

- **동적 지역화**: 클라이언트에 가장 적합한 번역을 자동으로 선택합니다.
- **기본 로케일로 대체**: 클라이언트의 선호 언어가 사용 불가능한 경우 기본 로케일로 대체하여 사용자 경험의 연속성을 보장합니다.
- **경량 및 고속**: 고성능 애플리케이션을 위해 설계되어 최소한의 오버헤드를 보장합니다.
- **엄격 모드 지원**: 선언된 로케일에 대한 엄격한 준수를 강제하여 신뢰할 수 있는 동작을 보장합니다.

---

## 함수 시그니처

```typescript
t(translations: Record<string, string>): string;
```

### 매개변수

- `translations`: 키가 로케일 코드(예: `en`, `fr`, `es-MX`)이고 값이 해당 번역 문자열인 객체입니다.

### 반환값

- 클라이언트의 선호 언어로 된 콘텐츠를 나타내는 문자열입니다.

---

## 국제화 요청 핸들러 로드하기

`express-intlayer`에서 제공하는 국제화 기능이 올바르게 작동하려면 Express 애플리케이션의 시작 부분에서 국제화 미들웨어를 **반드시** 로드해야 합니다. 이를 통해 `t` 함수가 활성화되고 로케일 감지 및 번역 처리가 올바르게 수행됩니다.

애플리케이션의 **모든 라우트 전에** `app.use(intlayer())` 미들웨어를 배치하여 모든 라우트가 국제화의 이점을 누릴 수 있도록 합니다:

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
```

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

### 이것이 필요한 이유

- **로케일 감지**: `intlayer` 미들웨어는 헤더, 쿠키 또는 기타 구성된 방법을 기반으로 사용자의 선호 로케일을 감지하기 위해 들어오는 요청을 처리합니다.
- **번역 컨텍스트**: `t` 함수가 올바르게 작동하도록 필요한 컨텍스트를 설정하여 번역이 올바른 언어로 반환되도록 보장합니다.
- **오류 방지**: 이 미들웨어 없이 `t` 함수를 사용하면 필요한 로케일 정보가 없기 때문에 런타임 오류가 발생합니다.

---

## 사용 예시

### 기본 예시

다양한 언어로 지역화된 콘텐츠 제공:

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
```

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

- `Accept-Language: fr`를 가진 클라이언트는 `Bienvenue!`를 받습니다.
- `Accept-Language: es`를 가진 클라이언트는 `¡Bienvenido!`를 받습니다.
- `Accept-Language: de`를 가진 클라이언트는 `Welcome!`(기본 로케일)을 받습니다.

### 오류 처리

다양한 언어로 오류 메시지 제공:

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
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### 로케일 변형 사용

로케일별 변형에 대한 번역 지정:

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
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
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
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## 고급 주제

### 대체 메커니즘

선호 로케일을 사용할 수 없는 경우, `t` 함수는 구성에서 정의된 기본 로케일로 대체됩니다:

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

- `defaultLocale`가 `Locales.CHINESE`이고 클라이언트가 `Locales.DUTCH`를 요청하면 반환된 번역은 `Locales.CHINESE` 값으로 기본 설정됩니다.
- `defaultLocale`이 정의되지 않은 경우, `t` 함수는 `Locales.ENGLISH` 값으로 대체됩니다.

---

### 엄격 모드 적용

`t` 함수가 선언된 로케일에 대한 엄격한 준수를 강제하도록 구성:

| 모드        | 동작                                                                                  |
| ----------- | ------------------------------------------------------------------------------------- |
| `strict`    | 모든 선언된 로케일에 번역이 제공되어야 합니다. 누락된 로케일은 오류를 발생시킵니다.   |
| `inclusive` | 선언된 로케일에 번역이 있어야 합니다. 누락된 로케일은 경고를 발생시키지만 허용됩니다. |
| `loose`     | 선언되지 않은 로케일도 허용됩니다.                                                    |

구성 예시:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 기존 구성
  internationalization: {
    // ... 기존 국제화 구성
    strictMode: "strict", // 엄격 모드 적용
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... 기존 구성
  internationalization: {
    // ... 기존 국제화 구성
    strictMode: "strict", // 엄격 모드 적용
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기존 구성
  internationalization: {
    // ... 기존 국제화 구성
    strictMode: "strict", // 엄격 모드 적용
  },
};

module.exports = config;
```

---

### TypeScript 통합

`t` 함수는 TypeScript와 함께 사용할 때 타입 안전성을 제공합니다. 타입 안전한 번역 객체를 정의:

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

| 문제                     | 원인                                    | 해결책                                                |
| ------------------------ | --------------------------------------- | ----------------------------------------------------- |
| `t` 함수가 작동하지 않음 | 미들웨어가 로드되지 않음                | `app.use(intlayer())`가 라우트 전에 추가되었는지 확인 |
| 번역 누락 오류           | 엄격 모드가 활성화되고 모든 로케일 누락 | 필요한 모든 번역을 제공                               |

---

## 효과적인 사용을 위한 팁

1. **번역 중앙화**: 유지 관리를 개선하기 위해 번역을 중앙 모듈 또는 JSON 파일로 관리하세요.
2. **번역 검증**: 모든 언어 변형에 해당 번역이 있는지 확인하여 불필요한 대체를 방지하세요.
3. **프론트엔드 i18n과 결합**: 애플리케이션 전반에서 일관된 사용자 경험을 위해 프론트엔드 국제화와 동기화하세요.
4. **성능 벤치마크**: 번역을 추가할 때 애플리케이션의 응답 시간을 테스트하여 최소한의 영향을 보장하세요.

---

## 결론

`t` 함수는 백엔드 국제화를 위한 강력한 도구입니다. 이를 효과적으로 사용하면 글로벌 사용자에게 더 포괄적이고 사용자 친화적인 애플리케이션을 만들 수 있습니다. 고급 사용법 및 자세한 구성 옵션은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

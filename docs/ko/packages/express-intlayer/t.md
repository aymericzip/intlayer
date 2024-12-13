# Documentation: `t` 함수 in `express-intlayer`

`express-intlayer` 패키지의 `t` 함수는 Express 애플리케이션에서 로컬라이즈된 응답을 제공하는 핵심 유틸리티입니다. 사용자의 선호 언어에 따라 동적으로 콘텐츠를 선택하여 국제화를 단순화합니다.

---

## 개요

`t` 함수는 주어진 언어 집합에 대한 번역을 정의하고 검색하는 데 사용됩니다. 클라이언트의 요청 설정(예: `Accept-Language` 헤더)에 따라 적절한 언어를 자동으로 결정합니다. 선호 언어가 사용 가능하지 않으면 구성에서 지정한 기본 로케일로 우아하게 돌아갑니다.

---

## 주요 기능

- **역동적 로컬라이제이션**: 클라이언트에 가장 적절한 번역을 자동으로 선택합니다.
- **기본 로케일로의 대체**: 클라이언트의 선호 언어가 사용 가능하지 않으면 기본 로케일로 대체하여 사용자 경험의 연속성을 보장합니다.
- **경량 및 빠름**: 높은 성능의 애플리케이션을 위해 설계되어 최소한의 오버헤드를 보장합니다.
- **엄격 모드 지원**: 신뢰할 수 있는 동작을 위해 선언된 로케일에 대한 엄격한 준수를 강제합니다.

---

## 함수 시그니처

```typescript
t(translations: Record<string, string>): string;
```

### 매개변수

- `translations`: 키가 로케일 코드(예: `en`, `fr`, `es-MX`)이고 값이 해당 번역된 문자열인 객체입니다.

### 반환값

- 클라이언트의 선호 언어로 된 콘텐츠를 나타내는 문자열입니다.

---

## 국제화 요청 핸들러 로딩

`express-intlayer`에서 제공하는 국제화 기능이 올바르게 작동하려면 Express 애플리케이션의 시작 부분에서 국제화 미들웨어를 **반드시** 로드해야 합니다. 이렇게 하면 `t` 함수가 활성화되고 로케일 감지 및 번역 처리의 올바른 처리가 보장됩니다.

### 필수 미들웨어 설정

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// 국제화 요청 핸들러 로드
app.use(intlayer());
```

### 애플리케이션 내 배치

모든 라우트가 국제화의 혜택을 받을 수 있도록 `app.use(intlayer())` 미들웨어를 **모든 라우트 이전에** 배치하십시오:

```typescript
app.use(intlayer());

// 미들웨어 로드 후 라우트를 정의합니다.
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

- **로케일 감지**: `intlayer` 미들웨어는 헤더, 쿠키 또는 기타 구성된 방법에 따라 사용자의 선호 로케일을 감지하기 위해 수신 요청을 처리합니다.
- **번역 컨텍스트**: `t` 함수가 올바르게 작동하는 데 필요한 컨텍스트를 설정하여 번역이 올바른 언어로 반환됩니다.
- **오류 방지**: 이 미들웨어 없이는 `t` 함수를 사용하면 필요한 로케일 정보가 제공되지 않기 때문에 런타임 오류가 발생합니다.

---

## 사용 예시

### 기본 예시

다양한 언어로 로컬라이즈된 콘텐츠 제공:

```typescript
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

- `Accept-Language: fr` 클라이언트는 `Bienvenue!`를 받습니다.
- `Accept-Language: es` 클라이언트는 `¡Bienvenido!`를 받습니다.
- `Accept-Language: de` 클라이언트는 `Welcome!`을 받습니다 (기본 로케일).

### 오류 처리

여러 언어로 오류 메시지 제공:

```typescript
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

```typescript
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

선호 로케일이 사용 가능하지 않으면, `t` 함수는 구성에 정의된 기본 로케일로 돌아갑니다:

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

예를 들어:

- `defaultLocale`이 `Locales.CHINESE`이고 클라이언트가 `Locales.DUTCH`를 요청하면, 반환된 번역은 `Locales.CHINESE` 값으로 기본값이 됩니다.
- `defaultLocale`이 정의되지 않은 경우, `t` 함수는 `Locales.ENGLISH` 값으로 돌립니다.

---

### 엄격 모드 강제

`t` 함수가 선언된 로케일에 대한 엄격한 준수를 강제하도록 구성할 수 있습니다:

| 모드            | 동작                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| `strict`        | 모든 선언된 로케일에는 제공된 번역이 있어야 합니다. 누락된 로케일은 오류를 발생시킵니다. |
| `required_only` | 선언된 로케일에는 번역이 있어야 합니다. 누락된 로케일은 경고를 발생시켜도 허용됩니다.    |
| `loose`         | 선언되지 않은 경우에도 모든 기존 로케일이 허용됩니다.                                    |

설정 예시:

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // 엄격 모드 강제
  },
};
```

---

### TypeScript 통합

`t` 함수는 TypeScript와 함께 사용할 때 타입 안전성이 보장됩니다. 타입 안전한 번역 객체를 정의합니다:

```typescript
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

---

### 일반적인 오류 및 문제 해결

| 문제                   | 원인                              | 해결책                                                           |
| ---------------------- | --------------------------------- | ---------------------------------------------------------------- |
| `t` 함수 작동하지 않음 | 미들웨어가 로드되지 않음          | `app.use(intlayer())`가 라우트 이전에 추가되었는지 확인하십시오. |
| 누락된 번역 오류       | 모든 로케일 없이 엄격 모드 활성화 | 모든 필수 번역을 제공합니다.                                     |

---

## 효과적인 사용을 위한 팁

1. **번역 중앙 집중화**: 유지 관리를 개선하기 위해 번역 관리를 위한 중앙 집중 모듈 또는 JSON 파일을 사용합니다.
2. **번역 검증**: 모든 언어 변형에 해당하는 번역이 있는지 확인하여 불필요하게 기본값으로 전환되지 않도록 합니다.
3. **프론트엔드 i18n과 결합**: 앱 전반에 걸쳐 원활한 사용자 경험을 위해 프론트엔드 국제화와 동기화합니다.
4. **성능 벤치마킹**: 번역을 추가할 때 앱의 응답 시간을 테스트하여 미미한 영향을 확인합니다.

---

## 결론

`t` 함수는 백엔드 국제화를 위한 강력한 도구입니다. 이를 효과적으로 사용하여 전 세계 청중을 위한 보다 포괄적이고 사용자 친화적인 애플리케이션을 만들 수 있습니다. 고급 사용 및 세부 구성 옵션에 대해서는 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

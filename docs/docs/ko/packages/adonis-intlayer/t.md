---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: t 함수 문서 | adonis-intlayer
description: adonis-intlayer 패키지에서 t 함수를 사용하는 방법을 알아보세요
keywords:
  - t
  - 번역
  - Intlayer
  - 국제화
  - 문서
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 초기 문서
---

# 문서: `adonis-intlayer`의 `t` 함수

`adonis-intlayer` 패키지의 `t` 함수는 AdonisJS 애플리케이션에서 현지화된 응답을 제공하기 위한 핵심 유틸리티입니다. 사용자의 선호 언어에 따라 콘텐츠를 동적으로 선택하여 국제화(i18n)를 단순화합니다.

---

## 개요

`t` 함수는 주어진 언어 집합에 대한 번역을 정의하고 검색하는 데 사용됩니다. `Accept-Language` 헤더와 같은 클라이언트의 요청 설정을 기반으로 반환할 적절한 언어를 자동으로 결정합니다. 선호하는 언어를 사용할 수 없는 경우 구성에 지정된 기본 로케일로 적절하게 대체됩니다.

---

## 주요 특징

- **동적 현지화**: 클라이언트에 가장 적합한 번역을 자동으로 선택합니다.
- **기본 로케일로의 폴백**: 클라이언트의 선호 언어를 사용할 수 없는 경우 기본 로케일로 대체되어 사용자 경험의 연속성을 보장합니다.
- **비동기 컨텍스트**: Async Local Storage를 사용하여 AdonisJS 요청 수명 주기 내에서 원활하게 작동합니다.
- **TypeScript 지원**: 번역에 대한 유형 안전성을 강제합니다.

---

## 함수 시그니처

```typescript
t(translations: Record<string, any>): any;
```

### 매개변수

- `translations`: 키가 로케일 코드(예: `en`, `fr`, `es`)이고 값이 해당 번역된 콘텐츠인 객체입니다.

### 반환값

- 클라이언트의 선호 언어를 나타내는 콘텐츠입니다.

---

## 미들웨어 로드

`t` 함수가 올바르게 작동하려면 AdonisJS 애플리케이션에 `intlayer` 미들웨어를 등록**해야** 합니다.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## 사용 예시

### 기본 예시

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### 컨트롤러에서의 사용

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

---

## 고급 주제

### 폴백 메커니즘

선호하는 로케일을 사용할 수 없는 경우 `t` 함수는 `intlayer.config.ts`에 정의된 기본 로케일로 대체됩니다.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### TypeScript 통합

`t` 함수는 정의된 사전과 함께 사용할 때 유형 안전합니다. 자세한 내용은 [TypeScript 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

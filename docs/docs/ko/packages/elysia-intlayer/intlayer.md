---
createdAt: 2026-08-24
updatedAt: 2026-09-29
priority: 5
title: intlayer Elysia 플러그인 문서 | elysia-intlayer
description: "Elysia용 intlayer 플러그인은 사용자 로케일을 감지하고 각 요청의 라우트 컨텍스트에 번역 함수를 주입합니다."
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - 국제화
  - 문서
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "문서 초기화"
author: aymericzip
---

# intlayer Elysia 플러그인 문서

Elysia용 `intlayer` 플러그인은 사용자 로케일을 감지하고 라우트 컨텍스트에 `intlayer` 객체를 주입합니다. 또한 요청 컨텍스트 내에서 전역 번역 함수를 사용할 수 있게 합니다.

## 사용법

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    ko: "안녕하세요",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> 플러그인은 **전역** `derive`를 통해 컨텍스트를 등록하며, Elysia는 이를 `Partial<{ intlayer: IntlayerContext }>`로 타이핑합니다. `.use(intlayer())` 이후에 등록된 라우트에서는 런타임에 값이 항상 존재하므로, `strict` 모드의 TypeScript를 만족시키려면 non-null 어서션(`intlayer!.t`) 또는 옵셔널 체이닝을 사용하세요.

동일한 헬퍼는 독립 export로도 제공되므로, 라우트 컨텍스트를 구조 분해하지 않고도 호출할 수 있습니다:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    ko: "안녕하세요",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## 설명

이 플러그인은 다음 작업을 수행합니다:

1. **로케일 감지**: 클라이언트가 명시적으로 설정한 로케일을 스토리지(쿠키, 헤더)에서 읽고, 그다음 `Accept-Language` 헤더에서 협상된 로케일로 폴백합니다.
2. **컨텍스트 주입**: Elysia 라우트 컨텍스트에 `intlayer` 속성을 추가합니다 (아래 라우트 컨텍스트 표 참조).
3. **사전 준비**: 플러그인이 생성될 때 `prepareIntlayer`를 호출하므로, 앱이 부팅될 때 사전이 빌드됩니다.

### 라우트 컨텍스트

| 속성              | 타입                   | 설명                                                                              |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | 이 요청에 사용할 로케일이며, `locale_storage`가 `locale_detected`보다 우선합니다. |
| `locale_storage`  | `Locale` (선택)        | 쿠키 또는 헤더를 통해 클라이언트가 명시적으로 요청한 로케일.                      |
| `locale_detected` | `Locale`               | 요청 헤더에서 협상된 로케일.                                                      |
| `defaultLocale`   | `Locale`               | `intlayer.config.ts`에 폴백으로 설정된 로케일.                                    |
| `t`               | `TranslateFunction`    | 번역 함수.                                                                        |
| `getIntlayer`     | `typeof getIntlayer`   | 키로 사전을 가져오는 함수.                                                        |
| `getDictionary`   | `typeof getDictionary` | 사전 객체를 처리하는 함수.                                                        |

독립 헬퍼는 플러그인이 처리하는 요청 외부에서 호출되면 설정된 기본 로케일로 폴백합니다.

## 로케일 결정 순서

기본적으로 플러그인은 다음 순서로 로케일을 결정합니다:

1. `INTLAYER_LOCALE` 쿠키.
2. `x-intlayer-locale` 헤더.
3. `Accept-Language` 헤더 협상.
4. 설정된 `defaultLocale`.

```bash
# `Accept-Language`에서 협상됨
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# 쿠키가 `Accept-Language`보다 우선합니다
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# 헤더가 `Accept-Language`보다 우선합니다
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## 설정

플러그인은 `intlayer.config.ts` 파일을 읽습니다. 로케일 감지에 사용되는 쿠키와 헤더를 커스터마이즈할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> 설정에 대한 자세한 내용은 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참고하세요.

- [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

## 관련 문서

- [elysia-intlayer 패키지 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/elysia-intlayer/exports.md)
- [Elysia i18n - 앱을 번역하기 위한 완벽한 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_elysia.md)

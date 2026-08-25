---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: elysia-intlayer 패키지 문서
description: Intlayer용 Elysia 플러그인으로 번역 함수와 로케일 감지 기능을 제공합니다.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "모든 exports에 대한 통합 문서"
author: aymericzip
---

# elysia-intlayer 패키지

`elysia-intlayer` 패키지는 Elysia 애플리케이션에서 국제화를 처리하기 위한 플러그인을 제공합니다. 사용자 로케일을 감지하고 라우트 컨텍스트에 `intlayer` 객체를 주입합니다.

## 설치

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia`는 peer dependency입니다 (`>=1.0.0`). Elysia는 **Bun** 런타임을 대상으로 합니다.

## 내보내기

### 플러그인

임포트:

```ts
import { intlayer } from "elysia-intlayer";
```

| 함수       | 설명                                                                                                                                                                                                                                                                                             | 관련 문서                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Intlayer를 Elysia 애플리케이션에 통합하는 Elysia 플러그인. 스토리지(쿠키, 헤더)에서, 이어서 `Accept-Language`에서 로케일 감지를 처리하고, `locale`, `t`, `getIntlayer`, `getDictionary`를 노출하는 `intlayer` 객체를 라우트 컨텍스트에 주입하며, `AsyncLocalStorage` 요청 컨텍스트를 설정합니다. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/elysia-intlayer/intlayer.md) |

### 함수

임포트:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| 함수            | 설명                                                                                                                                                                                                                               | 관련 문서                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Elysia에서 현재 로케일의 콘텐츠를 가져오는 전역 번역 함수. `AsyncLocalStorage`를 사용해 `intlayer` 플러그인이 설정한 요청 컨텍스트에 접근하며, 그 외부에서는 기본 로케일로 폴백합니다. `intlayer.t`를 통해서도 접근할 수 있습니다. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |
| `getIntlayer`   | 생성된 선언에서 키로 사전을 가져와 현재 로케일의 콘텐츠를 반환합니다. `getDictionary`의 최적화 버전입니다. `AsyncLocalStorage`를 사용해 요청 컨텍스트에 접근합니다. `intlayer.getIntlayer`를 통해서도 접근할 수 있습니다.          | -                                                                                                      |
| `getDictionary` | 사전 객체를 처리하여 현재 로케일의 콘텐츠를 반환합니다. `t()` 번역, 열거형, markdown, HTML 등을 처리합니다. `AsyncLocalStorage`를 사용해 요청 컨텍스트에 접근합니다. `intlayer.getDictionary`를 통해서도 접근할 수 있습니다.       | -                                                                                                      |

### 타입

임포트:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| 타입                | 설명                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerContext`   | 모든 라우트 컨텍스트에 주입되는 `intlayer` 객체의 형태: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | 로케일 맵을 현재 요청 로케일에 해당하는 콘텐츠로 변환하는 번역 함수의 시그니처.                                                                              |

## 사용법

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // 국제화 플러그인 로드
  .use(intlayer())
  // 라우트 컨텍스트에서 로케일과 헬퍼를 읽기
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      ko: "안녕하세요",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // 또는 현재 요청에 바인딩된 독립 헬퍼 사용하기
  .get("/t_example", () =>
    t({
      ko: "영어로 반환된 콘텐츠의 예",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> 플러그인은 **전역** `derive`를 통해 컨텍스트를 등록하며, Elysia는 이를 `Partial<{ intlayer: IntlayerContext }>`로 타이핑합니다. `.use(intlayer())` 이후에 등록된 라우트에서는 런타임에 값이 항상 존재하므로, `strict` 모드의 TypeScript를 만족시키려면 non-null 어서션(`intlayer!.locale`) 또는 옵셔널 체이닝을 사용하세요.

## 관련 문서

- [Elysia i18n - 앱을 번역하기 위한 완벽한 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_elysia.md)
- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

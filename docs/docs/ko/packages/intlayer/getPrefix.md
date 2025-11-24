---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: getPrefix 함수 문서 | intlayer
description: intlayer 패키지의 getPrefix 함수 사용법을 확인하세요
keywords:
  - getPrefix
  - prefix
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: 초기 문서화
---

# 문서: `intlayer`의 `getPrefix` 함수

## 설명

`getPrefix` 함수는 라우팅 모드 설정에 따라 주어진 로케일의 URL 접두사를 결정합니다. 로케일을 기본 로케일과 비교하고, 유연한 URL 구성을 위해 세 가지 다른 접두사 형식을 포함하는 객체를 반환합니다.

**주요 기능:**

- 첫 번째 매개변수로 로케일을 받음 (필수)
- `defaultLocale`과 `mode`를 포함하는 선택적 `options` 객체
- `prefix`와 `localePrefix` 속성을 가진 객체를 반환
- 모든 라우팅 모드 지원: `prefix-no-default`, `prefix-all`, `no-prefix`, `search-params`
- 로케일 접두사를 추가할 시점을 결정하는 가벼운 유틸리티

---

## 함수 시그니처

```typescript
getPrefix(
  locale: Locales,               // 필수
  options?: {                    // 선택적
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // 예: 'fr/' 또는 ''
  localePrefix?: Locale; // 예: 'fr' 또는 undefined
}
```

---

## 매개변수

- `locale: Locales`
  - **설명**: 접두사를 생성할 로케일입니다. 값이 falsy(정의되지 않음, null, 빈 문자열)인 경우 함수는 빈 문자열을 반환합니다.
  - **타입**: `Locales`
  - **필수**: 예

- `options?: object`
  - **설명**: 접두사 결정에 대한 구성 객체입니다.
  - **타입**: `object`
  - **필수**: 아니요 (선택 사항)

  - `options.defaultLocale?: Locales`
    - **설명**: 애플리케이션의 기본 로케일입니다. 제공되지 않으면 프로젝트 구성에서 설정된 기본 로케일을 사용합니다.
    - **타입**: `Locales`
    - **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`

- **설명**: 로케일 처리를 위한 URL 라우팅 모드입니다. 제공되지 않으면 프로젝트 구성에서 설정된 모드를 사용합니다.
- **타입**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
- **기본값**: [`프로젝트 구성`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md#middleware)
- **모드**:
  - `prefix-no-default`: 로케일이 기본 로케일과 일치할 때 빈 문자열을 반환합니다.
  - `prefix-all`: 기본 로케일을 포함한 모든 로케일에 대해 접두사를 반환합니다.
  - `no-prefix`: 빈 문자열을 반환합니다 (URL에 접두사가 없음).
  - `search-params`: 빈 문자열을 반환합니다 (로케일이 쿼리 매개변수에 있음).

### 반환값

- **타입**: `GetPrefixResult`
- **설명**: 세 가지 다른 접두사 형식을 포함하는 객체:
  - `prefix`: 후행 슬래시가 포함된 경로 접두사 (예: `'fr/'`, `''`)
  - `localePrefix`: 슬래시가 없는 로케일 식별자 (예: `'fr'`, `undefined`)

---

## 사용 예제

### 기본 사용법

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// 영어 로케일에 대한 접두사 확인
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// 반환: { prefix: 'en/', localePrefix: 'en' }

// 프랑스어 로케일에 대한 접두사 확인
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// 반환: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// 반환: { prefix: '', localePrefix: undefined }
```

### 다양한 라우팅 모드

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: 항상 prefix를 반환
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// 반환: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: 로케일이 기본값과 일치할 때는 prefix 없음
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// 반환: { prefix: '', localePrefix: undefined }

javascript;
// prefix-no-default: 기본 로케일과 다를 경우 접두사를 반환합니다.
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// 반환값: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: 절대 접두사를 반환하지 않습니다.
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// 반환값: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// 반환값: { prefix: '', localePrefix: undefined }
```

### 실용적인 예제

```typescript
import { getPrefix, Locales } from "intlayer";

// 특정 로케일에 적합한 접두사를 사용하여 URL을 생성합니다.
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

typescript;
// 경로 구성을 위한 prefix 사용
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// 결과: "/fr/about"

// locale 식별을 위한 localePrefix 사용
console.log(`현재 로케일: ${localePrefix}`);
// 출력: "현재 로케일: fr"
```

---

## 관련 함수

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md): 특정 로케일에 대한 현지화된 URL 생성
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getMultilingualUrls.md): 구성된 모든 로케일에 대한 URL 생성

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // 슬래시가 포함된 경로 접두사 (예: 'fr/' 또는 '')
  localePrefix?: Locale; // 슬래시 없이 로케일 식별자 (예: 'fr' 또는 undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```

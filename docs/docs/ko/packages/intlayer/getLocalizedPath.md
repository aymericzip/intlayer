---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath 함수 문서 | intlayer
description: intlayer 패키지의 getLocalizedPath 함수 사용법 보기
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: 커스텀 URL 재작성 구현
---

# 문서: `intlayer`의 `getLocalizedPath` 함수

## 설명

`getLocalizedPath` 함수는 캐노니컬 경로(애플리케이션 내부 경로)를 제공된 로케일 및 리라이트 규칙에 따라 로컬라이즈된 등가 경로로 변환합니다. 언어별로 달라지는 SEO 친화적 URL을 생성할 때 특히 유용합니다.

**주요 기능:**

- `[param]` 구문을 사용한 동적 라우트 매개변수를 지원합니다.
- 구성(configuration)에 정의된 커스텀 리라이트(rewrite) 규칙에 따라 경로를 해석합니다.
- 지정된 로케일에 대한 리라이트 규칙이 없으면 자동으로 캐노니컬 경로로 폴백합니다.

---

## 함수 시그니처

```typescript
getLocalizedPath(
  canonicalPath: string,         // 필수
  locale: Locales,               // 필수
  rewriteRules?: RoutingConfig['rewrite'] // 선택사항
): string
```

---

## 매개변수

### 필수 매개변수

- `canonicalPath: string`
  - **설명**: 내부 애플리케이션 경로(예: `/about`, `/product/[id]`).
  - **타입**: `string`
  - **필수**: 예

- `locale: Locales`
  - **설명**: 경로를 로컬라이즈할 대상 로케일입니다.
  - **타입**: `Locales`
  - **필수**: 예

### 선택적 매개변수

- `rewriteRules?: RoutingConfig['rewrite']`
  - **설명**: 사용자 정의 리라이트 규칙을 정의하는 객체입니다. 제공하지 않으면 프로젝트 구성의 `routing.rewrite` 속성이 기본값으로 사용됩니다.
  - **타입**: `RoutingConfig['rewrite']`
  - **기본값**: `configuration.routing.rewrite`

---

## 반환값

- **타입**: `string`
- **설명**: 지정된 로케일에 대한 로컬라이즈된 경로입니다.

---

## 예시 사용법

### 기본 사용법 (구성 포함)

intlayer.config.ts에 사용자 지정 리라이트 규칙을 구성한 경우:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// 구성: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// 출력: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// 출력: "/about"
```

### 동적 라우트 사용법

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// 구성: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// 출력: "/produit/123"
```

### 수동 리라이트 규칙

함수에 수동 리라이트 규칙을 직접 전달할 수도 있습니다:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// 출력: "/contactez-nous"
```

---

## 관련 함수

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getCanonicalPath.md): 로컬라이즈된 경로를 내부 정규 경로로 되돌립니다.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md): 프로토콜, 호스트, 로케일 접두사를 포함한 완전한 로컬라이즈된 URL을 생성합니다.

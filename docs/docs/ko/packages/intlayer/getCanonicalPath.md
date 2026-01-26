---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getCanonicalPath 함수 문서 | intlayer
description: intlayer 패키지에서 getCanonicalPath 함수를 사용하는 방법을 확인하세요
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: 사용자 정의 URL 리라이트 구현
---

# 문서: `intlayer`의 `getCanonicalPath` 함수

## 설명

`getCanonicalPath` 함수는 로컬라이즈된 URL 경로(예: `/a-propos`)를 내부의 표준 애플리케이션 경로(예: `/about`)로 역해석합니다. 이는 URL 언어에 관계없이 라우터가 올바른 내부 라우트를 매칭하도록 하는 데 필수적입니다.

**주요 기능:**

- `[param]` 문법을 사용한 동적 라우트 파라미터를 지원합니다.
- 프로젝트 설정에 정의된 커스텀 리라이트 규칙과 로컬라이즈된 경로를 매칭합니다.
- 일치하는 리라이트 규칙이 없으면 원래 경로를 반환합니다.

---

## 함수 시그니처

```typescript
getCanonicalPath(
  localizedPath: string,         // 필수
  locale: Locales,               // 필수
  rewriteRules?: RoutingConfig['rewrite'] // 선택적
): string
```

---

## 매개변수

### 필수 매개변수

- `localizedPath: string`
  - **설명**: 브라우저에서 보이는 로컬라이즈된 경로(예: `/a-propos`).
  - **유형**: `string`
  - **필수**: 예

- `locale: Locales`
  - **설명**: 해결하려는 경로에 사용되는 로케일.
  - **유형**: `Locales`
  - **필수**: 예

### 선택적 매개변수

- `rewriteRules?: RoutingConfig['rewrite']`
  - **설명**: 사용자 정의 리라이트 규칙을 정의하는 객체입니다. 제공하지 않으면 프로젝트 구성의 `routing.rewrite` 속성을 기본값으로 사용합니다.
  - **유형**: `RoutingConfig['rewrite']`
  - **기본값**: `configuration.routing.rewrite`

---

## 반환값

- **유형**: `string`
- **설명**: 내부 canonical 경로.

---

## 예제 사용법

### 기본 사용법 (구성 사용)

만약 `intlayer.config.ts`에서 사용자 정의 리라이트 규칙을 구성한 경우:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// 구성: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Output: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Output: "/about"
```

### 동적 라우트에서의 사용

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// 구성: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Output: "/product/123"
```

### 수동 rewrite 규칙

함수에 수동 rewrite 규칙을 전달할 수도 있습니다:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// 출력: "/contact"
```

---

## 관련 함수

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedPath.md): 정규화된 경로(canonical path)를 해당 로케일의 등가 경로로 변환합니다.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md): 프로토콜, 호스트 및 로케일 접두사를 포함한 완전한 로컬라이즈된 URL을 생성합니다.

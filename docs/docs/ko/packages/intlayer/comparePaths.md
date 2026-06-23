---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths 함수 문서 | intlayer
description: intlayer 패키지의 comparePaths 함수 사용법 알아보기
keywords:
  - comparePaths
  - normalizePath
  - 활성 링크
  - 네비게이션
  - Intlayer
  - intlayer
  - 다국어 처리
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "초기 문서 작성"
author: aymericzip
---

# 문서: `intlayer`의 `comparePaths` 함수

## 설명

`comparePaths` 함수는 로케일 세그먼트, 프로토콜/호스트, 쿼리 문자열, 해시 및 후행 슬래시를 무시하면서 두 URL 또는 경로명이 같은지 비교합니다. 내비게이션 링크가 현재 페이지를 가리키는지 판단할 때(예: 활성 링크 강조 표시) 오류가 발생하기 쉬운 자체 정규화 로직을 만들 필요 없이 사용하는 권장 방법입니다.

내부적으로 [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md)을 재사용하여 로케일 세그먼트를 제거하므로, 설정된 라우팅 모드와 로케일을 따릅니다.

이 패키지는 또한 비교에 사용되는 로케일 독립적인 정규화된 경로명을 반환하는 기본 도우미인 [`normalizePath`](#normalizepath)를 내보냅니다.

**주요 기능:**

- 로케일 독립적 비교(`/ko/about`과 `/about`은 일치함)
- 절대 URL과 상대 경로 모두에서 작동
- 쿼리 문자열, 해시 및 후행 슬래시 무시
- 선행 슬래시 누락 및 빈 값 허용(`/`로 정규화)
- 가벼움 — `getPathWithoutLocale`을 기반으로 구축됨

---

## 함수 시그니처

```typescript
comparePaths(
  pathname: string,  // 필수
  href: string,      // 필수
  locales?: Locales[] // 선택
): boolean

normalizePath(
  inputUrl: string,   // 필수
  locales?: Locales[] // 선택
): string
```

---

## 매개변수

- `pathname: string`
  - **설명**: 비교할 첫 번째 URL 문자열 또는 경로명(일반적으로 현재 경로).
  - **타입**: `string`
  - **필수**: 예

- `href: string`
  - **설명**: 비교할 두 번째 URL 문자열 또는 경로명(일반적으로 내비게이션 링크의 `href`).
  - **타입**: `string`
  - **필수**: 예

- `locales: Locales[]`
  - **설명**: 지원되는 로케일의 선택적 배열입니다. 기본값은 프로젝트에 구성된 로케일입니다.
  - **타입**: `Locales[]`
  - **필수**: 아니오 (선택)

### 반환값

- **타입**: `boolean`
- **설명**: 두 입력이 동일한 로케일 독립적인 경로로 확인되면 `true`, 그렇지 않으면 `false`를 반환합니다.

---

## 사용 예시

### 기본 사용법

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### 절대 및 상대 URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### 활성 내비게이션 링크 강조 표시

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath`는 `comparePaths`에서 사용하는 로케일 독립적인 정규 경로명을 반환합니다. 로케일 세그먼트, 프로토콜/호스트, 쿼리 문자열 및 해시를 제거하고, 단일 선행 슬래시를 확인하며, 루트를 제외한 모든 후행 슬래시를 제거하고, 빈 값의 경우 `/`로 대체합니다.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## 관련 함수

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md): URL 또는 경로에서 로케일 세그먼트를 제거합니다.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPrefix.md): 주어진 로케일에 대한 URL 접두사를 결정합니다.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md): 특정 로케일에 대한 현지화된 URL을 생성합니다.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```

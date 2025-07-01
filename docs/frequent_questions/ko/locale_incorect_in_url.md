---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: URL에서 잘못된 로케일이 검색됨
description: URL에서 잘못된 로케일이 검색되는 문제를 해결하는 방법을 알아보세요.
keywords:
  - 로케일
  - url
  - intlayer
  - next.js
  - vite
  - 프레임워크
  - 미들웨어
  - 설정
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# URL에서 잘못된 로케일이 검색됨

## 문제 설명

URL에서 로케일 파라미터에 접근하려 할 때, 로케일 값이 잘못 나오는 문제가 발생할 수 있습니다:

```js
const { locale } = await params;
console.log(locale); // 예상한 로케일 대신 "about"이 반환됨
```

## 해결 방법

### 1. 파일 구조 확인

Next.js 앱 라우터 경로가 다음 구조를 따르는지 확인하세요:

```bash
src/app/[locale]/about/page.tsx
```

### 2. 미들웨어 설정 확인

이 문제는 미들웨어가 없거나 작동하지 않을 때 자주 발생합니다. 미들웨어 파일은 다음 위치에 있어야 합니다:

```bash
src/middleware.ts
```

이 미들웨어는 `prefixDefault`가 `false`로 설정된 경우 경로를 재작성하는 역할을 합니다. 예를 들어, `/en/about`를 `/about`으로 재작성합니다.

### 3. 설정에 따른 URL 패턴

#### 기본 설정 (`prefixDefault: false`, `noPrefix: false`)

- 영어: `/about`
- 프랑스어: `/fr/about`
- 스페인어: `/es/about`

#### `prefixDefault: true`인 경우

- 영어: `/en/about`
- 프랑스어: `/fr/about`
- 스페인어: `/es/about`

#### `noPrefix: true`인 경우

- 영어: `/about`
- 프랑스어: `/about`
- 스페인어: `/about`

이러한 구성 옵션에 대한 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

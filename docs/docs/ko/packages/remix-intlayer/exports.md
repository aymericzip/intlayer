---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: remix-intlayer 패키지 문서
description: Remix 3 애플리케이션에 국제화(i18n)를 제공하는 remix-intlayer 패키지의 내보내기 문서입니다.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "remix-intlayer 내보내기 초기 문서"
author: aymericzip
---

# remix-intlayer 패키지

`remix-intlayer` 패키지는 Remix 3 애플리케이션에 Intlayer를 통합하기 위한 도구를 제공합니다. 요청 로케일 감지를 위한 미들웨어, 요청 컨텍스트 접근, 사전 조회 및 로케일 관리를 위한 훅을 포함합니다.

## 설치

```bash
npm install remix-intlayer
```

## 패키지 내보내기

### 미들웨어

| 내보내기   | 타입          | 설명                                                                                          | 관련 문서                                                                                                                        |
| ---------- | ------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | 미들웨어 함수 | 요청 로케일을 감지하고, 리다이렉션을 처리하며, 요청 컨텍스트를 채우는 Remix 3 미들웨어입니다. | [intlayer 미들웨어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/intlayerMiddleware.md) |

### 컨텍스트 스토리지

| 내보내기   | 타입                         | 설명                                                                                                            | 관련 문서                                                                                                              |
| ---------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | RequestContext 키 / 스토리지 | Remix 3 요청 컨텍스트(`context.get(Intlayer)`)에서 Intlayer 상태를 가져오는 데 사용되는 요청 컨텍스트 키입니다. | [Intlayer 컨텍스트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/Intlayer.md) |

### 훅

| 내보내기        | 타입 | 설명                                                                                                 | 관련 문서                                                                                                                  |
| --------------- | ---- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | 훅   | 현재 요청 로케일에 맞춰 키로 지정된 사전 콘텐츠를 조회하고 해결합니다.                               | [useIntlayer 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | 훅   | 사전에 가져온 사전 객체에서 현재 요청 로케일에 해당하는 콘텐츠를 반환합니다.                         | [useDictionary 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | 훅   | 현재 요청 로케일, 기본 로케일 및 프로젝트에서 사용 가능한 전체 로케일 목록에 대한 접근을 제공합니다. | [useLocale 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/remix-intlayer/useLocale.md)         |

## 빠른 시작

### 라우터에서 미들웨어 구성

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### 뷰 및 컴포넌트에서 콘텐츠 사용

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```

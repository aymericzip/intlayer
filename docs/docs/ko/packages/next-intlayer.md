---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer 패키지 문서
description: Intlayer를 Next.js에 통합하기 위한 Next.js 전용 통합으로, App Router와 Page Router용 미들웨어 및 프로바이더를 제공합니다.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 문서 통합
---

# next-intlayer 패키지

`next-intlayer` 패키지는 Intlayer를 Next.js 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. App Router와 Page Router 모두를 지원하며, 로케일 기반 라우팅을 위한 미들웨어를 포함합니다.

## 설치

```bash
npm install next-intlayer
```

## 내보내기

### 미들웨어

| 함수                 | 설명                                                        |
| -------------------- | ----------------------------------------------------------- |
| `intlayerMiddleware` | 로케일 기반 라우팅 및 리디렉션을 처리하는 Next.js 미들웨어. |

### 프로바이더

| 컴포넌트                 | 설명                                                    |
| ------------------------ | ------------------------------------------------------- |
| `IntlayerClientProvider` | Next.js의 클라이언트 측 컴포넌트를 위한 Provider.       |
| `IntlayerServerProvider` | Next.js(App Router)의 서버 측 컴포넌트를 위한 Provider. |

### 훅 (클라이언트 측)

대부분의 훅을 `react-intlayer`에서 재내보냅니다.

| 훅              | 설명                                                |
| --------------- | --------------------------------------------------- |
| `useIntlayer`   | 키로 하나의 사전을 선택하고 해당 내용을 반환합니다. |
| `useDictionary` | 키로 하나의 사전을 선택하고 해당 내용을 반환합니다. |
| `useLocale`     | 현재 로케일과 로케일을 설정하는 함수를 반환합니다.  |
| `useI18n`       | 현재 Intlayer 컨텍스트 값을 반환합니다.             |

### 함수 (서버 측)

| 함수                   | 설명                                                |
| ---------------------- | --------------------------------------------------- |
| `t`                    | Next.js App Router를 위한 서버 측 번역 함수 버전.   |
| `generateStaticParams` | Next.js의 동적 라우트용 정적 파라미터를 생성합니다. |

### 타입

| 타입                 | 설명                                               |
| -------------------- | -------------------------------------------------- |
| `NextPageIntlayer`   | Intlayer 지원이 있는 Next.js 페이지를 위한 타입.   |
| `NextLayoutIntlayer` | Intlayer 지원이 있는 Next.js 레이아웃을 위한 타입. |

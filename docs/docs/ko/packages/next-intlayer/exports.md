---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer 패키지 문서
description: Next.js 전용 Intlayer 통합을 위한 미들웨어 및 App Router와 Page Router용 제공자들을 제공하는 패키지입니다.
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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 통합 문서화
---

# next-intlayer 패키지

`next-intlayer` 패키지는 Intlayer를 Next.js 애플리케이션에 통합하기 위한 필수 도구를 제공합니다. App Router와 Page Router 둘 다를 지원하며, 로케일 기반 라우팅을 위한 미들웨어도 포함합니다.

## 설치

```bash
npm install next-intlayer
```

## 내보내기

### 미들웨어

가져오기:

```tsx
import "next-intlayer/middleware";
```

| 함수                 | 설명                                                                                                                                            | 관련 문서                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | 로케일 기반 라우팅 및 리다이렉트를 처리하는 Next.js 미들웨어입니다. 요청 헤더/쿠키에서 로케일을 감지하고 적절한 로케일 경로로 리다이렉트합니다. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/intlayerMiddleware.md) |

### 구성 헬퍼

가져오기:

```tsx
import "next-intlayer/server";
```

| 함수               | 설명                                                                                                                                                  | 관련 문서 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `withIntlayer`     | Next.js 구성을 래핑하는 비동기 헬퍼로, 빌드 전에 Intlayer 딕셔너리가 준비되도록 보장합니다. 콘텐츠 파일을 준비하고 webpack/SWC 플러그인을 설정합니다. | -         |
| `withIntlayerSync` | 비동기 처리가 불가능하거나 원치 않는 설정에 적합한 Next.js 구성을 동기적으로 래핑하는 헬퍼입니다. 서버 시작 시 딕셔너리를 준비하지 않습니다.          | -         |

### 프로바이더

임포트:

```tsx
import "next-intlayer";
```

또는

```tsx
import "next-intlayer/server";
```

| 컴포넌트                 | 설명                                                                                                           | 관련 문서 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- | --------- |
| `IntlayerClientProvider` | Next.js App Router의 클라이언트 측 컴포넌트를 위한 Provider. react-intlayer의 `IntlayerProvider`를 래핑합니다. | -         |
| `IntlayerServerProvider` | Next.js(App Router)의 서버 측 컴포넌트를 위한 Provider. 서버에서 locale 컨텍스트를 제공합니다.                 | -         |
| `IntlayerServer`         | App Router에서 Intlayer 콘텐츠를 위한 서버 사이드 래퍼. 서버 컴포넌트에서 적절한 locale 처리를 보장합니다.     | -         |

### 훅 (클라이언트 측)

임포트:

```tsx
import "next-intlayer";
```

`react-intlayer`의 대부분의 훅을 재내보냅니다.

| 훅                     | 설명                                                                                                                                         | 관련 문서                                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | 키로 하나의 dictionary를 선택하여 그 내용을 반환하는 클라이언트 사이드 훅입니다. locale이 제공되지 않으면 context에서 가져옵니다.            | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | dictionary 객체를 변환하고 현재 locale에 맞는 콘텐츠를 반환하는 훅입니다. `t()` 번역, 열거형 처리 등도 수행합니다.                           | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | 비동기 사전을 처리하는 훅입니다. Promise 기반의 dictionary 맵을 받아 현재 로케일에 맞게 이를 해결(resolve)합니다.                            | -                                                                                                                       |
| `useDictionaryDynamic` | 키로 로드되는 동적 사전을 처리하는 훅입니다. 로딩 상태 관리를 위해 내부적으로 React Suspense를 사용합니다.                                   | -                                                                                                                       |
| `useLocale`            | 클라이언트 사이드 훅으로 현재 로케일과 이를 설정하는 함수를 제공합니다. Next.js App Router의 navigation 지원을 위해 확장되어 있습니다.       | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | URL 재작성(rewrite)을 관리하는 클라이언트 사이드 훅입니다. 보다 보기 좋은 로컬라이즈된 리라이트 규칙이 있으면 URL을 자동으로 업데이트합니다. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Next.js Page Router 전용 로케일 관리 훅입니다. 로케일 변경 시 리디렉션 및 페이지 리로드를 처리합니다.                                        | -                                                                                                                       |
| `useI18n`              | 키로 중첩된 콘텐츠에 접근하기 위한 번역 함수 `t()`를 제공하는 훅입니다. i18next/next-intl 패턴을 모방합니다.                                 | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | 로케일에 바인딩된 `Intl` 객체를 제공하는 훅. 현재 로케일을 자동으로 주입하고 최적화된 캐싱을 사용합니다.                                     | -                                                                                                                       |
| `useLoadDynamic`       | React Suspense를 사용해 동적 사전을 로드하는 훅. 키와 프라미스(promise)를 받아 결과를 캐시합니다.                                            | -                                                                                                                       |

### 함수들 (서버 사이드)

임포트:

```tsx
import "next-intlayer/server";
```

| 함수                   | 설명                                                                                                                                         | 관련 문서                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Next.js App Router용 번역 함수의 서버 측 버전입니다. 서버 로케일에 맞는 다국어 콘텐츠 번역을 반환합니다.                                     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |
| `getLocale`            | Next.js 헤더와 쿠키에서 현재 로케일을 추출하는 헬퍼 함수입니다. Server Components, Server Actions, 또는 Route Handlers용으로 설계되었습니다. | -                                                                                                      |
| `generateStaticParams` | 구성된 로케일을 기반으로 Next.js의 동적 라우트에 대한 정적 매개변수를 생성합니다. 사전 렌더링을 위해 로케일 객체의 배열을 반환합니다.        | -                                                                                                      |
| `locale`               | 서버 컨텍스트(App Router)에서 로케일을 가져오거나 설정하는 함수입니다. Server Components에서 로케일 관리를 제공합니다.                       | -                                                                                                      |

### 타입

Import:

```tsx
import "next-intlayer";
```

| 타입                   | 설명                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Intlayer 지원을 갖춘 Next.js 페이지용 타입. locale 매개변수를 포함하는 제네릭 타입.                        |
| `Next14PageIntlayer`   | Intlayer 지원을 갖춘 Next.js 14 페이지용 타입.                                                             |
| `Next15PageIntlayer`   | Intlayer 지원을 갖춘 Next.js 15 페이지용 타입.                                                             |
| `NextLayoutIntlayer`   | Intlayer 지원을 갖춘 Next.js 레이아웃용 타입. locale 매개변수를 포함하는 제네릭 타입.                      |
| `Next14LayoutIntlayer` | Intlayer 지원이 포함된 Next.js 14 레이아웃용 타입.                                                         |
| `Next15LayoutIntlayer` | Intlayer 지원이 포함된 Next.js 15 레이아웃용 타입.                                                         |
| `LocalParams`          | locale를 포함한 Next.js 라우트 매개변수용 타입. `locale` 속성을 가진 객체.                                 |
| `LocalPromiseParams`   | locale를 포함한 Next.js 라우트 매개변수용 타입(비동기 버전). `locale` 속성을 가진 객체로 해결되는 Promise. |

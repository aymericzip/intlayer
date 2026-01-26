---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-intlayer 패키지 문서
description: React 애플리케이션을 위한 Intlayer의 React 전용 구현으로, 훅과 프로바이더를 제공합니다.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# react-intlayer 패키지

The `react-intlayer` package provides the necessary tools to integrate Intlayer into React applications. It includes context providers, hooks, and components for handling multilingual content.

## 설치

```bash
npm install react-intlayer
```

## 내보내기

### 프로바이더

가져오기:

```tsx
import "react-intlayer";
```

| Component                 | 설명                                                                                                                    | 관련 문서                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | 애플리케이션을 감싸고 Intlayer 컨텍스트를 제공하는 주요 provider입니다. 기본적으로 에디터 지원을 포함합니다.            | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | 에디터 기능 없이 콘텐츠에만 집중된 provider 컴포넌트입니다. 시각적 에디터(visual editor)가 필요하지 않을 때 사용하세요. | -                                                                                                                             |
| `HTMLProvider`            | HTML 관련 국제화 설정을 위한 Provider입니다. HTML 태그에 대한 컴포넌트 오버라이드를 허용합니다.                         | -                                                                                                                             |

### 훅

임포트:

```tsx
import "react-intlayer";
```

| 훅 | 설명 | 관련 문서 |
| ---------------------- | 클라이언트 측 훅으로 키로 딕셔너리 하나를 선택하여 해당 로케일의 내용을 반환합니다. 로케일이 제공되지 않으면 컨텍스트의 로케일을 사용합니다. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md) |
| `useDictionary` | 딕셔너리 객체를 변환하고 현재 로케일의 내용을 반환하는 훅. `t()` 번역, enumerations 등을 처리합니다. | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync` | 비동기 딕셔너리를 처리하는 훅. 프로미스 기반 딕셔너리 맵을 받아 현재 로케일에 대해 이를 해결합니다. | - |
| `useDictionaryDynamic` | 키(key)로 로드되는 동적 딕셔너리를 처리하는 훅입니다. 내부적으로 로딩 상태를 위해 React Suspense를 사용합니다. | - |
| `useLocale` | 클라이언트 측 훅으로 현재 로케일, 기본 로케일, 사용 가능한 로케일들, 그리고 로케일을 업데이트하는 함수를 가져옵니다. | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md) |
| `useLocaleBase` | 컨텍스트에서 현재 로케일과 관련된 모든 필드(locale, defaultLocale, availableLocales, setLocale)를 가져오는 훅. | - |
| `useRewriteURL` | URL 재작성을 관리하는 클라이언트 측 훅. 현재 pathname과 로케일에 대한 rewrite 규칙이 존재하면 URL을 업데이트합니다. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useRewriteURL.md) |
| `useI18n` | 키로 중첩된 콘텐츠에 접근할 수 있는 번역 함수 `t()`을 제공하는 훅. i18next/next-intl 패턴을 따름. | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useI18n.md) |
| `useIntl` | 로케일에 바인딩된 `Intl` 객체를 제공하는 훅. 현재 로케일을 자동으로 주입하고 최적화된 캐싱을 사용함. | - |
| `useLocaleStorage` | 로컬 스토리지 또는 쿠키에 로케일을 저장해 지속성을 제공하는 훅입니다. getter 및 setter 함수를 반환합니다. | - |
| `useLocaleCookie` | 더 이상 사용되지 않습니다. 대신 `useLocaleStorage`를 사용하세요. 쿠키에 로케일 지속성을 관리하는 훅입니다. | - |
| `useLoadDynamic` | React Suspense를 사용하여 동적 딕셔너리를 로드하는 훅. 키와 Promise를 받아 결과를 캐시합니다. | - |
| `useIntlayerContext` | 현재 Intlayer 클라이언트 컨텍스트 값(locale, setLocale 등)을 제공하는 훅. | - |
| `useHTMLContext` | HTMLProvider 컨텍스트에서 HTML 컴포넌트 오버라이드를 접근하기 위한 훅. | - |

### 함수

가져오기:

```tsx
import "react-intlayer";
```

| 함수                 | 설명                                                                                                                    | 관련 문서                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `t`                  | 클라이언트 측 번역 함수로, 제공된 다국어 콘텐츠의 번역을 반환합니다. 제공되지 않을 경우 컨텍스트의 locale을 사용합니다. | [번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |
| `getDictionary`      | 사전 객체를 처리하고 지정된 로케일에 대한 콘텐츠를 반환합니다. `t()` 번역, 열거형, 마크다운, HTML 등을 처리합니다.      | -                                                                                               |
| `getIntlayer`        | 생성된 선언에서 키로 사전을 검색하고 지정된 로케일에 대한 콘텐츠를 반환합니다. `getDictionary`의 최적화된 버전입니다.   | -                                                                                               |
| `setLocaleInStorage` | 구성에 따라 스토리지(로컬 스토리지 또는 쿠키)에 로케일을 설정합니다.                                                    | -                                                                                               |
| `setLocaleCookie`    | 더 이상 사용되지 않음. 대신 `setLocaleInStorage`을 사용하세요. 쿠키에 로케일을 설정합니다.                              | -                                                                                               |
| `localeInStorage`    | 저장소(local storage 또는 cookie)에서 locale을 가져옵니다.                                                              | -                                                                                               |
| `localeCookie`       | 더 이상 사용되지 않음. 대신 `localeInStorage`을 사용하세요. 쿠키에서 locale을 가져옵니다.                               | -                                                                                               |

### 컴포넌트

가져오기:

```tsx
import "react-intlayer";
```

또는

```tsx
import "react-intlayer/markdown";
```

| `컴포넌트`         | 설명                                                                                                                  | 관련 문서                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | 마크다운 렌더링 컨텍스트용 Provider. 마크다운 요소에 대한 커스텀 컴포넌트 오버라이드를 허용합니다.                    | -                                                                                                                             |
| `MarkdownRenderer` | 커스텀 컴포넌트를 사용하여 마크다운 콘텐츠를 렌더링합니다. 모든 표준 마크다운 기능과 Intlayer 전용 구문을 지원합니다. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/MarkdownRenderer.md) |

### 타입

Import:

```tsx
import "react-intlayer";
```

| 타입           | 설명                                                                                |
| -------------- | ----------------------------------------------------------------------------------- |
| `IntlayerNode` | Intlayer 콘텐츠 트리 내 노드를 나타내는 타입. 타입 안전한 콘텐츠 조작에 사용됩니다. |

### 서버 측 (react-intlayer/server)

Import:

```tsx
import "react-intlayer/server";
```

| Export                   | Type        | Description                                    |
| ------------------------ | ----------- | ---------------------------------------------- |
| `IntlayerServerProvider` | `Component` | 서버 측 렌더링을 위한 Provider.                |
| `IntlayerServer`         | `Component` | Intlayer 콘텐츠의 서버 측 래퍼.                |
| `t`                      | `Function`  | 번역 함수의 서버 측 버전.                      |
| `useLocale`              | `Hook`      | 서버 측에서 로케일에 접근하기 위한 Hook.       |
| `useIntlayer`            | `Hook`      | 서버 측 버전의 `useIntlayer`.                  |
| `useDictionary`          | `Hook`      | 서버 측 버전의 `useDictionary`.                |
| `useI18n`                | `Hook`      | 서버 측 버전의 `useI18n`.                      |
| `locale`                 | `Function`  | 서버 측에서 로케일을 가져오거나 설정하는 함수. |

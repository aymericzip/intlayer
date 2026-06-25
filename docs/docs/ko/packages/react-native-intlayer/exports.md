---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: react-native-intlayer 패키지 문서
description: Intlayer용 React Native 지원으로, 프로바이더, 훅, 폴리필 및 Metro 구성을 제공합니다.
keywords:
  - react-native-intlayer
  - react-native
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "React Native 앱이 react-native-intlayer만 의존하도록 전체 react-intlayer API(훅, 유틸리티, format/html/markdown 서브패스)를 재내보내기"
  - version: 8.0.0
    date: 2026-01-21
    changes: "모든 exports에 대한 통합 문서"
author: aymericzip
---

# react-native-intlayer 패키지

`react-native-intlayer` 패키지는 Intlayer를 React Native 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. React Native 전용 `IntlayerProvider`와 함께 전체 `react-intlayer` API(훅 및 유틸리티)를 재내보내며, React Native에 필요한 폴리필과 Metro 구성도 포함합니다.

> React Native 앱에서는 `react-native-intlayer`에서 **모든 것**을 가져오세요. `react-intlayer`를 직접 설치하거나 가져올 필요가 없습니다.

## 설치

```bash
npm install react-native-intlayer
```

## 내보내기

### 프로바이더

| 컴포넌트           | 설명                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `IntlayerProvider` | 애플리케이션을 래핑하고 Intlayer 컨텍스트를 제공하는 Provider 컴포넌트. 필요한 폴리필을 자동으로 적용합니다. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### 훅 및 유틸리티

이것들은 `react-intlayer`에서 재내보내지므로 `react-native-intlayer`에서 직접 가져올 수 있습니다:

| 내보내기                                                                                                          | 설명                                   |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `useIntlayer`                                                                                                     | 사전 키에 대한 지역화된 콘텐츠에 접근. |
| `useLocale`                                                                                                       | 현재 로케일을 읽고 변경.               |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | 다양한 방식으로 사전 콘텐츠 로드.      |
| `useI18n`                                                                                                         | i18next 호환 훅.                       |
| `t`                                                                                                               | 인라인 번역 헬퍼.                      |
| `getIntlayer`, `getDictionary`                                                                                    | 명령형 콘텐츠 게터.                    |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | 로케일 지속성 헬퍼.                    |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### 폴리필

| 함수               | 설명                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| `intlayerPolyfill` | React Native에서 Intlayer를 지원하기 위해 필요한 폴리필을 적용하는 함수. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> `IntlayerProvider`를 가져올 때 폴리필이 자동으로 적용됩니다. 프로바이더가 마운트되기 전에 폴리필이 필요한 경우에만 `intlayerPolyfill`을 수동으로 호출하세요.

### 포맷터

숫자, 날짜 및 기타 Intl 기반 포맷팅 훅은 `/format` 서브패스에서 사용할 수 있습니다:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### 마크다운 및 HTML 렌더링

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Metro 구성

`react-native-intlayer` 패키지는 Intlayer가 React Native에서 올바르게 작동하도록 Metro 구성 유틸리티를 제공합니다.

| 함수                      | 설명                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer를 준비하고 Metro 구성을 병합하는 비동기 함수.                                    |
| `configMetroIntlayerSync` | Intlayer 리소스를 준비하지 않고 Metro 구성을 병합하는 동기 함수.                          |
| `exclusionList`           | 번들에서 콘텐츠 파일을 제외하기 위해 Metro의 blockList에 사용할 RegExp 패턴을 생성합니다. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```

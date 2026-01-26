---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: react-native-intlayer 패키지 문서
description: Intlayer용 React Native 지원으로, 프로바이더와 로케일 지원을 위한 폴리필을 제공합니다.
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
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 통합 문서
---

# react-native-intlayer 패키지

`react-native-intlayer` 패키지는 Intlayer를 React Native 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. 여기에는 프로바이더와 로케일 지원을 위한 폴리필이 포함되어 있습니다.

## 설치

```bash
npm install react-native-intlayer
```

## 내보내기

### 프로바이더

| 컴포넌트           | 설명                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| `IntlayerProvider` | 애플리케이션을 래핑하고 Intlayer 컨텍스트를 제공하는 Provider 컴포넌트. |

가져오기:

```tsx
import "react-native-intlayer";
```

### 폴리필

| 함수               | 설명                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| `intlayerPolyfill` | React Native에서 Intlayer를 지원하기 위해 필요한 폴리필을 적용하는 함수. |

가져오기:

```tsx
import "react-native-intlayer";
```

### Metro 구성

The `react-native-intlayer` 패키지는 Intlayer가 React Native에서 올바르게 작동하도록 Metro 구성 유틸리티를 제공합니다.

| 함수                      | 설명                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Intlayer를 준비하고 Metro 구성을 병합하는 비동기 함수.                                    |
| `configMetroIntlayerSync` | Intlayer 리소스를 준비하지 않고 Metro 구성을 병합하는 동기 함수.                          |
| `exclusionList`           | 번들에서 콘텐츠 파일을 제외하기 위해 Metro의 blockList에 사용할 RegExp 패턴을 생성합니다. |

임포트:

```tsx
import "react-native-intlayer/metro";
```

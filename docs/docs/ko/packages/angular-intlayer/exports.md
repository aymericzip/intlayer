---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer 패키지 문서
description: Angular 애플리케이션에 Intlayer를 통합하기 위한 Angular 전용 구성으로, 프로바이더와 서비스를 제공합니다.
keywords:
  - angular-intlayer
  - angular
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 문서 통합
---

# angular-intlayer 패키지

`angular-intlayer` 패키지는 Intlayer를 Angular 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. 다국어 콘텐츠를 처리하기 위한 프로바이더와 서비스를 포함합니다.

## 설치

```bash
npm install angular-intlayer
```

## 내보내기

가져오기:

```tsx
import "angular-intlayer";
```

### 설정

| 함수              | 설명                                                    |
| ----------------- | ------------------------------------------------------- |
| `provideIntlayer` | Angular 애플리케이션에서 Intlayer를 제공하기 위한 함수. |

### 훅

| 훅                     | 설명                                                                                           | 관련 문서 |
| ---------------------- | ---------------------------------------------------------------------------------------------- | --------- |
| `useIntlayer`          | `useDictionary`를 기반으로 하며, 생성된 declaration에서 딕셔너리의 최적화된 버전을 주입합니다. | -         |
| `useDictionary`        | 사전(key, content)처럼 보이는 객체를 처리합니다. `t()` 번역, 열거형 등도 처리합니다.           | -         |
| `useDictionaryAsync`   | `useDictionary`와 동일하지만 비동기 사전을 처리합니다.                                         | -         |
| `useDictionaryDynamic` | `useDictionary`와 동일하지만 동적 사전을 처리합니다.                                           | -         |
| `useLocale`            | 현재 로케일과 이를 설정하는 함수를 반환합니다.                                                 | -         |
| `useIntl`              | 현재 로케일에 대한 Intl 객체를 반환합니다.                                                     | -         |
| `useLoadDynamic`       | 동적 사전을 로드하는 훅.                                                                       | -         |

### 컴포넌트

| Component                   | 설명                                           |
| --------------------------- | ---------------------------------------------- |
| `IntlayerMarkdownComponent` | 마크다운 콘텐츠를 렌더링하는 Angular 컴포넌트. |

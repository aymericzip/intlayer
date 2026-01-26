---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer 패키지 문서
description: Vue 애플리케이션을 위한 플러그인과 composables를 제공하는 Intlayer의 Vue 전용 통합입니다.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 내보내기(exports)에 대한 문서 통합
---

# vue-intlayer 패키지

`vue-intlayer` 패키지는 Intlayer를 Vue 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. 다국어 콘텐츠를 처리하기 위한 Vue 플러그인과 composables를 포함합니다.

## 설치

```bash
npm install vue-intlayer
```

## 내보내기

### 플러그인

가져오기:

```tsx
import "vue-intlayer";
```

| 함수              | 설명                                                  |
| ----------------- | ----------------------------------------------------- |
| `installIntlayer` | Intlayer를 애플리케이션에 설치하기 위한 Vue 플러그인. |

### 컴포저블

가져오기:

```tsx
import "vue-intlayer";
```

| 컴포저블               | 설명                                                                                                                                  | 관련 문서                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary`를 기반으로 하며, 생성된 선언에서 딕셔너리의 최적화된 버전을 주입합니다.                                               | -                                                                                                                     |
| `useDictionary`        | 키와 내용(key, content)처럼 보이는 객체(딕셔너리 형태)를 처리합니다. `t()` 번역, 열거형(enumerations) 등도 처리합니다.                | -                                                                                                                     |
| `useDictionaryAsync`   | `useDictionary`와 동일하지만 비동기 dictionary를 처리합니다.                                                                          | -                                                                                                                     |
| `useDictionaryDynamic` | `useDictionary`와 동일하지만 동적 dictionary를 처리합니다.                                                                            | -                                                                                                                     |
| `useLocale`            | 현재 locale과 이를 설정하는 함수를 반환합니다.                                                                                        | -                                                                                                                     |
| `useRewriteURL`        | 클라이언트 측에서 URL 재작성(rewrite)을 관리하는 composable입니다. 로컬라이즈된 재작성 규칙이 존재하면 자동으로 URL을 업데이트합니다. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | 현재 로케일에 대한 Intl 객체를 반환합니다.                                                                                            | -                                                                                                                     |
| `useLoadDynamic`       | 동적 딕셔너리를 로드하는 composable입니다.                                                                                            | -                                                                                                                     |

### 함수

임포트:

```tsx
import "vue-intlayer";
```

| 함수            | 설명                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `getDictionary` | 딕셔너리처럼 보이는 객체(key, content)를 처리합니다. `t()` 번역, 열거형 등도 처리합니다.               |
| `getIntlayer`   | `getDictionary`를 기반으로 하지만, 생성된 선언(declaration)에서 딕셔너리의 최적화된 버전을 주입합니다. |

### 마크다운

임포트:

```tsx
import "vue-intlayer/markdown";
```

| 함수                      | 설명                                                      |
| ------------------------- | --------------------------------------------------------- |
| `installIntlayerMarkdown` | 애플리케이션에 Intlayer Markdown을 설치하는 Vue 플러그인. |

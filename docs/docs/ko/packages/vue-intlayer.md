---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vue-intlayer 패키지 문서
description: Vue 애플리케이션을 위해 플러그인 및 composables를 제공하는 Intlayer의 Vue 전용 통합입니다.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 내보내기(exports)에 대한 문서 통합
---

# vue-intlayer 패키지

`vue-intlayer` 패키지는 Intlayer를 Vue 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. 다국어 콘텐츠를 처리하기 위한 Vue 플러그인 및 composables를 포함합니다.

## 설치

```bash
npm install vue-intlayer
```

## 내보내기

### 플러그인

| 함수              | 설명                                             |
| ----------------- | ------------------------------------------------ |
| `installIntlayer` | 애플리케이션에 Intlayer를 설치하는 Vue 플러그인. |

### 컴포저블

| 컴포저블        | 설명                                                  |
| --------------- | ----------------------------------------------------- |
| `useIntlayer`   | 키로 딕셔너리 하나를 선택하여 해당 내용을 반환합니다. |
| `useDictionary` | 키로 딕셔너리 하나를 선택하여 해당 내용을 반환합니다. |
| `useLocale`     | 현재 locale과 이를 설정하는 함수를 반환합니다.        |
| `useIntl`       | 현재 locale에 대한 Intl 객체를 반환합니다.            |

### 함수

| 함수            | 설명                              |
| --------------- | --------------------------------- |
| `getDictionary` | 딕셔너리를 가져옵니다.            |
| `getIntlayer`   | 딕셔너리에서 콘텐츠를 가져옵니다. |

### 마크다운

| 함수                      | 설명                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| `installIntlayerMarkdown` | 애플리케이션에 Intlayer Markdown을 설치하기 위한 Vue 플러그인입니다. |

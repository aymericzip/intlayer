---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer 패키지 문서
description: Angular 애플리케이션을 위한 providers 및 services를 제공하는 Intlayer의 Angular 전용 통합.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 export에 대한 문서 통합
---

# angular-intlayer 패키지

`angular-intlayer` 패키지는 Intlayer를 Angular 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. 다국어 콘텐츠를 처리하기 위한 providers와 services를 포함하고 있습니다.

## 설치

```bash
npm install angular-intlayer
```

## 내보내기

### 설정

| 함수              | 설명                                               |
| ----------------- | -------------------------------------------------- |
| `provideIntlayer` | Angular 애플리케이션에서 Intlayer를 제공하는 함수. |

### 서비스

| 서비스            | 설명                                                              |
| ----------------- | ----------------------------------------------------------------- |
| `IntlayerService` | 키(key)로 하나의 dictionary를 선택하여 그 내용을 반환하는 서비스. |
| `LocaleService`   | 현재 locale을 반환하고 이를 설정하는 함수를 제공하는 서비스.      |

### 컴포넌트

| 컴포넌트                    | 설명                                               |
| --------------------------- | -------------------------------------------------- |
| `IntlayerMarkdownComponent` | Angular 컴포넌트로 Markdown 콘텐츠를 렌더링합니다. |

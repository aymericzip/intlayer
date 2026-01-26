---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: preact-intlayer 패키지 문서
description: Preact 전용 Intlayer 통합으로, Preact 애플리케이션을 위한 providers 및 hooks를 제공합니다.
keywords:
  - preact-intlayer
  - preact
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 문서 통합
---

# preact-intlayer 패키지

`preact-intlayer` 패키지는 Intlayer를 Preact 애플리케이션에 통합하기 위한 필수 도구를 제공합니다. 다국어 콘텐츠를 처리하기 위한 providers와 hooks를 포함합니다.

## 설치

```bash
npm install preact-intlayer
```

## 내보내기

### 프로바이더

| 컴포넌트           | 설명                                                                |
| ------------------ | ------------------------------------------------------------------- |
| `IntlayerProvider` | 애플리케이션을 감싸고 Intlayer 컨텍스트를 제공하는 메인 프로바이더. |

### 훅

| 훅              | 설명                                                                                             | 관련 문서                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | `useDictionary`를 기반으로 하며, 생성된 declaration에서 dictionary의 최적화된 버전을 주입합니다. | -                                                                                                      |
| `useDictionary` | 키와 내용(key, content)처럼 보이는 객체를 처리합니다. `t()` 번역, enumerations 등을 처리합니다.  | -                                                                                                      |
| `useLocale`     | 현재 로케일과 이를 설정하는 함수를 반환합니다.                                                   | -                                                                                                      |
| `t`             | 현재 로케일에 따라 콘텐츠를 선택합니다.                                                          | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |

### 컴포넌트

| Component          | 설명                                                       |
| ------------------ | ---------------------------------------------------------- |
| `MarkdownProvider` | 마크다운 렌더링 컨텍스트용 Provider.                       |
| `MarkdownRenderer` | 커스텀 컴포넌트를 사용하여 마크다운 콘텐츠를 렌더링합니다. |

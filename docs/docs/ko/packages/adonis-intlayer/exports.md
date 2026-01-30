---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: adonis-intlayer 패키지 문서
description: Intlayer용 AdonisJS 미들웨어, 번역 기능 및 로케일 감지 제공.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: 초기 문서
---

# adonis-intlayer 패키지

`adonis-intlayer` 패키지는 AdonisJS 애플리케이션이 국제화를 처리할 수 있도록 미들웨어를 제공합니다. 사용자의 로케일을 감지하고 번역 기능을 제공합니다.

## 설치

```bash
npm install adonis-intlayer
```

## 내보내기

### 미들웨어

이 패키지는 국제화를 처리하기 위한 AdonisJS 미들웨어를 제공합니다.

| 함수                 | 설명                                                                                                                                                                                                                                            | 관련 문서                                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | 사용자의 로케일을 감지하고 Intlayer 데이터로 요청 컨텍스트를 채우는 AdonisJS 미들웨어입니다. 또한 요청 수명 주기 액세스를 위해 CLS(Async Local Storage) 네임스페이스를 설정하여 `t`, `getIntlayer` 등과 같은 전역 함수를 사용할 수 있게 합니다. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/adonis-intlayer/intlayer.md) |

### 함수

| 함수            | 설명                                                                                                                                                                                     | 관련 문서                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | 현재 로케일에 대한 콘텐츠를 검색하는 번역 함수입니다. `intlayer` 미들웨어가 관리하는 요청 수명 주기 내에서 작동합니다. CLS(Async Local Storage)를 사용하여 요청 컨텍스트에 액세스합니다. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |
| `getIntlayer`   | 생성된 선언에서 키로 사전을 검색하고 지정된 로케일에 대한 콘텐츠를 반환합니다. `getDictionary`의 최적화된 버전입니다. CLS를 사용하여 요청 컨텍스트에 액세스합니다.                       | -                                                                                                      |
| `getDictionary` | 사전 개체를 처리하고 지정된 로케일에 대한 콘텐츠를 반환합니다. `t()` 번역, 열거형, markdown, HTML 등을 처리합니다. CLS를 사용하여 요청 컨텍스트에 액세스합니다.                          | -                                                                                                      |
| `getLocale`     | CLS를 사용하여 요청 컨텍스트에서 현재 로케일을 검색합니다.                                                                                                                               | -                                                                                                      |

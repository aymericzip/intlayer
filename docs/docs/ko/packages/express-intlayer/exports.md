---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer 패키지 문서
description: Intlayer용 Express 미들웨어로, 번역 함수와 로케일 감지를 제공합니다.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 문서 통합
---

# express-intlayer 패키지

`express-intlayer` 패키지는 Express 애플리케이션에서 국제화(i18n)를 처리하기 위한 미들웨어를 제공합니다. 사용자의 로케일(locale)을 감지하고 번역 함수(translation functions)를 제공합니다.

## 설치

```bash
npm install express-intlayer
```

## 내보내기

### 미들웨어

가져오기:

```tsx
import "express-intlayer";
```

| 함수       | 설명                                                                                                                                                                                                                                                      | 관련 문서                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | 사용자의 로케일을 감지하고 `res.locals`를 Intlayer 데이터로 채우는 Express 미들웨어입니다. 쿠키/헤더에서 로케일을 감지하고 `t`, `getIntlayer`, 및 `getDictionary`를 `res.locals`에 주입하며, 요청 라이프사이클 접근을 위한 CLS 네임스페이스를 설정합니다. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/express-intlayer/intlayer.md) |

### 함수

임포트:

```tsx
import "express-intlayer";
```

| 함수            | 설명                                                                                                                                                                                  | 관련 문서                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | 현재 로케일의 콘텐츠를 가져오는 번역 함수입니다. `intlayer` 미들웨어가 관리하는 요청 수명주기 내에서 동작합니다. 요청 컨텍스트에 접근하기 위해 CLS(Async Local Storage)를 사용합니다. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |
| `getIntlayer`   | 생성된 선언에서 키로 딕셔너리를 검색하고 지정된 로케일의 내용을 반환합니다. `getDictionary`의 최적화된 버전입니다. 요청 컨텍스트에 접근하기 위해 CLS를 사용합니다.                    | -                                                                                                      |
| `getDictionary` | 딕셔너리 객체를 처리하고 지정된 로케일의 내용을 반환합니다. `t()` 번역, 열거형(enumerations), 마크다운, HTML 등을 처리합니다. 요청 컨텍스트에 접근하기 위해 CLS를 사용합니다.         | -                                                                                                      |

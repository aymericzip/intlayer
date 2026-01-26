---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: fastify-intlayer 패키지 문서
description: Intlayer용 Fastify 플러그인으로 번역 함수와 로케일 감지 기능을 제공합니다.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 통합 문서
---

# fastify-intlayer 패키지

`fastify-intlayer` 패키지는 Fastify 애플리케이션에서 국제화를 처리하기 위한 플러그인을 제공합니다. 사용자 로케일을 감지하고 요청(request) 객체에 데코레이터를 추가합니다.

## 설치

```bash
npm install fastify-intlayer
```

## 내보내기

### 플러그인

임포트:

```tsx
import "fastify-intlayer";
```

| 함수       | 설명                                                                                                                                                                                                                                                                                        | 관련 문서                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Intlayer를 Fastify 애플리케이션에 통합하는 Fastify 플러그인입니다. 스토리지(쿠키, 헤더)에서 로케일 감지를 처리하고, 요청 객체를 `intlayer` 데이터(`t`, `getIntlayer`, `getDictionary` 포함)로 장식하며, 요청 수명주기 동안 프로그래매틱하게 접근할 수 있도록 CLS 네임스페이스를 설정합니다. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/fastify-intlayer/intlayer.md) |

### 함수

임포트:

```tsx
import "fastify-intlayer";
```

| 함수            | 설명                                                                                                                                                                                                                                     | 관련 문서                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `t`             | Fastify에서 현재 로케일의 콘텐츠를 가져오는 글로벌 번역 함수입니다. CLS(Async Local Storage)를 활용하며 `intlayer` 플러그인이 관리하는 요청 컨텍스트 내에서 사용해야 합니다. `req.intlayer.t`로도 접근할 수 있습니다.                    | [번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md) |
| `getIntlayer`   | 생성된 선언에서 키로 사전을 조회하여 지정된 로케일의 콘텐츠를 반환합니다. `getDictionary`의 최적화된 버전입니다. 요청 컨텍스트에 접근하기 위해 CLS를 사용합니다. `req.intlayer.getIntlayer`로도 접근할 수 있습니다.                      | -                                                                                               |
| `getDictionary` | 딕셔너리 객체를 처리하고 지정된 로케일의 콘텐츠를 반환합니다. `t()` 번역, 열거형(enumerations), 마크다운, HTML 등 을 처리합니다. CLS를 사용하여 요청 컨텍스트에 접근합니다. 또한 `req.intlayer.getDictionary`를 통해 접근할 수 있습니다. | -                                                                                               |

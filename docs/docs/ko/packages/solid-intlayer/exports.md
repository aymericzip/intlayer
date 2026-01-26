---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: solid-intlayer 패키지 문서
description: Solid 애플리케이션을 위한 Intlayer의 Solid 전용 통합으로, 프로바이더와 훅을 제공합니다.
keywords:
  - solid-intlayer
  - solidjs
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# solid-intlayer 패키지

`solid-intlayer` 패키지는 Intlayer를 Solid 애플리케이션에 통합하는 데 필요한 도구를 제공합니다. 다국어 콘텐츠를 처리하기 위한 프로바이더와 훅을 포함합니다.

## 설치

```bash
npm install solid-intlayer
```

## 내보내기

### 프로바이더

가져오기:

```tsx
import "solid-intlayer";
```

| 컴포넌트           | 설명                                                                  | 관련 문서                                                                                                                     |
| ------------------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | 애플리케이션을 래핑하고 Intlayer 컨텍스트를 제공하는 주요 프로바이더. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/IntlayerProvider.md) |

### 훅(Hooks)

가져오기:

```tsx
import "solid-intlayer";
```

| 훅                     | 설명                                                                                                                    | 관련 문서                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | `useDictionary`를 기반으로 하지만, 생성된 선언에서 사전의 최적화된 버전을 주입합니다.                                   | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | 키-컨텐츠(key, content) 형태의 딕셔너리처럼 보이는 객체를 처리합니다. `t()` 번역, 열거형(enumerations) 등도 처리합니다. | -                                                                                                                       |
| `useDictionaryAsync`   | `useDictionary`와 동일하지만 비동기 딕셔너리(asynchronous dictionaries)를 처리합니다.                                   | -                                                                                                                       |
| `useDictionaryDynamic` | `useDictionary`와 동일하지만 동적 딕셔너리(dynamic dictionaries)를 처리합니다.                                          | -                                                                                                                       |
| `useLocale`            | 현재 로케일과 그것을 설정하는 함수를 반환합니다.                                                                        | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | 클라이언트 측 훅으로 URL 재작성(rewrite)을 관리합니다. 로케일별 재작성 규칙이 존재하면 URL을 자동으로 업데이트합니다.   | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | 현재 로케일에 대한 Intl 객체를 반환합니다.                                                                              | -                                                                                                                       |
| `useLoadDynamic`       | 동적 딕셔너리(dictionaries)를 로드하는 훅.                                                                              | -                                                                                                                       |
| `t`                    | 현재 로케일에 따라 콘텐츠를 선택합니다.                                                                                 | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)                  |

### 컴포넌트

임포트:

```tsx
import "solid-intlayer";
```

| 컴포넌트           | 설명                                      |
| ------------------ | ----------------------------------------- |
| `MarkdownProvider` | 마크다운 렌더링 컨텍스트를 위한 Provider. |

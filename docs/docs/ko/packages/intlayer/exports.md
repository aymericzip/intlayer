---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer 패키지 문서
description: Intlayer의 핵심 패키지로, 국제화용 기본 함수와 타입을 제공합니다.
keywords:
  - intlayer
  - core
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 내보내기에 대한 문서 통합
---

# intlayer 패키지

`intlayer` 패키지는 Intlayer 에코시스템의 핵심 라이브러리입니다. JavaScript 및 TypeScript 애플리케이션에서 다국어 콘텐츠를 관리하기 위한 필수 함수, 타입 및 유틸리티를 제공합니다.

## 설치

```bash
npm install intlayer
```

## 내보내기

### 구성

가져오기:

```tsx
import "intlayer";
```

| 변수               | 타입                   | 설명                                                                                | 관련 문서                                                                                                               |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Intlayer 구성 객체.                                                                 | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Intlayer 구성 객체를 반환합니다. (**사용 중단**: 대신 `configuration`을 사용하세요) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | 지원되는 모든 로케일 목록입니다.                                                    | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | 필수 로케일 목록입니다.                                                             | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | 기본 로케일.                                                                        | -                                                                                                                       |

### 타입

가져오기:

```tsx
import "intlayer";
```

| 타입                  | 설명                                                      |
| --------------------- | --------------------------------------------------------- |
| `Dictionary`          | 사전의 구조를 정의하는 데 사용되는 Dictionary 타입입니다. |
| `DeclarationContent`  | (**Deprecated**) 대신 `Dictionary<T>`를 사용하세요.       |
| `IntlayerConfig`      | Intlayer 구성을 정의하는 타입입니다.                      |
| `ContentNode`         | 딕셔너리 콘텐츠의 노드입니다.                             |
| `Locale`              | 로케일을 나타내는 타입입니다.                             |
| `LocalesValues`       | 로케일에 대한 가능한 값들입니다.                          |
| `StrictModeLocaleMap` | 엄격한 타입 검사와 함께하는 로케일 맵입니다.              |

### 콘텐츠 함수

Import:

```tsx
import "intlayer";
```

| 함수                     | 타입       | 설명                                                                                           | 관련 문서                                                                                        |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | 현재 로케일을 기반으로 콘텐츠를 선택합니다.                                                    | [번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation.md)  |
| `enu` / `getEnumeration` | `Function` | 수량을 기반으로 콘텐츠를 선택합니다.                                                           | [수량](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration.md)  |
| `cond` / `getCondition`  | `Function` | 불리언 조건에 따라 콘텐츠를 선택합니다.                                                        | [조건](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/condition.md)    |
| `gender`                 | `Function` | 성별에 따라 콘텐츠를 선택합니다.                                                               | [성별](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md)       |
| `insert`                 | `Function` | 콘텐츠 문자열에 값을 삽입합니다.                                                               | [삽입](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md)    |
| `nest` / `getNesting`    | `Function` | 다른 딕셔너리를 중첩합니다.                                                                    | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/nesting.md)   |
| `md`                     | `Function` | Markdown 콘텐츠를 처리합니다.                                                                  | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md) |
| `html`                   | `Function` | HTML 콘텐츠를 처리합니다.                                                                      | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/html.md)         |
| `file`                   | `Function` | 파일 내용을 처리합니다.                                                                        | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/file.md)         |
| `getDictionary`          | `Function` | 딕셔너리처럼 보이는 객체(key, content)를 처리합니다. `t()` 번역, enumerations 등도 처리합니다. | -                                                                                                |
| `getIntlayer`            | `Function` | `getDictionary`를 기반으로 하지만 생성된 선언으로부터 딕셔너리의 최적화된 버전을 주입합니다.   | -                                                                                                |

### 로컬라이제이션 유틸리티

임포트:

```tsx
import "intlayer";
```

| 함수                   | 타입       | 설명                                          | 관련 문서                                                                                                                       |
| ---------------------- | ---------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | 문자열 또는 경로에서 로케일을 감지합니다.     | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | 로케일의 언어 부분을 가져옵니다.              | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | 로케일의 표시 이름을 가져옵니다.              | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | canonical 경로를 localized 경로로 변환합니다. | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | 로컬화된 경로를 정규 경로로 변환합니다.       | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | 현지화된 URL을 생성합니다.                    | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | 지원되는 모든 로케일에 대한 URL을 생성합니다. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | 경로에서 로케일 접두사를 제거합니다.          | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | 경로에서 로케일 접두사를 가져옵니다.          | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | 텍스트 방향(LTR/RTL)을 가져옵니다.            | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | 로케일 접두사를 검증합니다.                   | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/validatePrefix.md)             |

### 브라우저 유틸리티

임포트:

```tsx
import "intlayer";
```

| 함수                   | 유형       | 설명                                 |
| ---------------------- | ---------- | ------------------------------------ |
| `getBrowserLocale`     | `Function` | 브라우저의 선호 로케일을 감지합니다. |
| `getCookie`            | `Function` | 쿠키 값을 가져옵니다.                |
| `getLocaleFromStorage` | `Function` | 스토리지에서 로케일을 가져옵니다.    |
| `setLocaleInStorage`   | `Function` | 스토리지에 로케일을 저장합니다.      |

### 포맷터

임포트:

```tsx
import "intlayer";
```

| 함수           | 설명                             |
| -------------- | -------------------------------- |
| `number`       | 숫자를 포맷합니다.               |
| `currency`     | 통화 값을 포맷합니다.            |
| `percentage`   | 백분율을 포맷합니다.             |
| `compact`      | 숫자를 축약 형식으로 포맷합니다. |
| `date`         | 날짜를 포맷합니다.               |
| `relativeTime` | 상대 시간을 포맷합니다.          |
| `units`        | 단위를 포함한 값을 포맷합니다.   |
| `Intl`         | 표준 Intl 객체입니다.            |

---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: svelte-intlayer 패키지 문서
description: Svelte 애플리케이션을 위한 Intlayer 통합으로, Svelte용 설정 함수와 스토어를 제공합니다.
keywords:
  - svelte-intlayer
  - svelte
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 내보내기(exports)에 대한 문서 통합
---

# svelte-intlayer 패키지

`svelte-intlayer` 패키지는 Svelte 애플리케이션에 Intlayer를 통합하는 데 필요한 도구를 제공합니다. 여기에는 설정 함수와 다국어 콘텐츠 처리를 위한 스토어가 포함됩니다.

## 설치

```bash
npm install svelte-intlayer
```

## 내보내기

### 설정

가져오기:

```tsx
import "svelte-intlayer";
```

| 함수            | 설명                                                   |
| --------------- | ------------------------------------------------------ |
| `setupIntlayer` | Svelte 애플리케이션에서 Intlayer를 설정하기 위한 함수. |

### 스토어

가져오기:

```tsx
import "svelte-intlayer";
```

| 스토어          | 설명                                         |
| --------------- | -------------------------------------------- |
| `intlayerStore` | 현재 Intlayer 상태를 포함하는 Svelte 스토어. |

### 훅(컨텍스트)

가져오기:

```tsx
import "svelte-intlayer";
```

| Function               | Description                                                                                                             | Related Doc                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | `useDictionary`를 기반으로 하지만, 생성된 선언에서 가져온 사전의 최적화된 버전을 주입합니다.                            | -                                                                                                                        |
| `useDictionary`        | 사전(키, 내용)처럼 보이는 객체를 처리합니다. `t()` 번역, 열거형 등도 처리합니다.                                        | -                                                                                                                        |
| `useDictionaryAsync`   | `useDictionary`와 동일하지만 비동기 사전을 처리합니다.                                                                  | -                                                                                                                        |
| `useDictionaryDynamic` | `useDictionary`와 동일하지만 동적 사전을 처리합니다.                                                                    | -                                                                                                                        |
| `useLocale`            | 현재 로케일과 이를 설정하는 함수를 반환합니다.                                                                          | -                                                                                                                        |
| `useRewriteURL`        | URL 리라이트를 관리하는 클라이언트 측 함수입니다. 로컬라이즈된 리라이트 규칙이 있는 경우 URL을 자동으로 업데이트합니다. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | 현재 로케일에 대한 Intl 객체를 반환합니다.                                                                              | -                                                                                                                        |

### 마크다운

Import:

```tsx
import "svelte-intlayer";
```

| 함수                  | 설명                                                       |
| --------------------- | ---------------------------------------------------------- |
| `setIntlayerMarkdown` | Svelte 애플리케이션에서 마크다운 컨텍스트를 설정하는 함수. |

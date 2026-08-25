---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: intlayer package의 getIntlayerAsync 함수를 사용하는 방법을 알아보세요
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "초기 문서화"
author: aymericzip
---

# Documentation: `intlayer`의 `getIntlayerAsync` 함수

## Description

`getIntlayerAsync` 함수는 키로 하나의 딕셔너리를 선택하고 주어진 로캘에 대한 콘텐츠를 해결하며, **해당 로캘만 로드합니다**.

이는 [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayer.md)의 비동기 대응 함수로, 렌더링 외부에서 딕셔너리가 읽히는 곳 — 라우트 `head` / 메타데이터 빌더, 로더, 서버 함수를 위해 고안되었습니다.

`getIntlayer`가 모든 로캘을 포함하는 병합된 딕셔너리를 가져오는 반면, [빌드 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`)은 이 호출을 `getDictionaryAsync(loaderMap, key, locale)`로 다시 쓰고, `.intlayer/dynamic_dictionaries/`의 로캘별 청크를 가리킵니다. 따라서 번들은 실제로 요청된 로캘만 포함합니다.

이러한 플러그인 없이 — 최적화되지 않은 빌드 — 호출은 동기 딕셔너리 레지스트리를 통해 대신 해결됩니다: 로캘별 분할 없이 동일한 콘텐츠입니다.

**주요 기능:**

- `getIntlayer`와 동일한 타입 지정 키, 선택자 및 반환된 콘텐츠
- 최적화된 빌드에서 요청된 로캘 청크만 로드
- 동일한 청크에 대한 동시 호출은 단일 로드를 공유합니다
- `async` 메타데이터 빌더, 로더 및 서버 함수에서 안전하게 사용 가능

---

## 함수 서명

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // 필수
  localeOrSelector?: LocalesValues | DictionarySelector, // 선택사항
  plugins?: Plugins[]                         // 선택사항
): Promise<DeepTransformContent<...>>
```

---

## 매개변수

- `key: DictionaryKeys`
  - **Description**: 콘텐츠 파일에 선언된 대로 읽을 사전의 키입니다.
  - **Type**: `DictionaryKeys` — 선언된 모든 사전 키의 합집합입니다.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: 콘텐츠를 해석할 로케일 또는 [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)에 대한 선택자 객체입니다.
    - `'fr'` — 로케일
    - `{ item: 2 }` — [컬렉션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/collections.md) 항목 (`item`을 생략하면 배열로 모든 항목을 얻습니다)
    - `{ variant: 'black-friday' }` — 명명된 [변형](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md) (`default`를 원할 경우 생략)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — 구조화된 변형
    - 모든 선택자는 로케일을 포함할 수 있습니다: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — 기본값은 구성된 `defaultLocale`입니다.

- `plugins: Plugins[]`
  - **Description**: 기본 인터프리터 플러그인을 대체하는 커스텀 노드 변환기입니다. 고급 사용만 해당합니다.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — 선언에서 입력한 타입으로 지정된 dictionary의 해석된 내용으로 resolve되는 promise입니다.

---

## 사용 예시

### 기본 사용법

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Returns            | 컨텐츠                                                                                                          | 컨텐츠의 Promise                                  |
| Dictionary loaded  | 병합된 사전 (모든 로케일)                                                                                       | 요청된 로케일의 청크만                            |
| Best suited for    | 렌더링, 동기 코드 경로                                                                                          | 메타데이터, 로더, 서버 함수                       |
| Requires a plugin? | No                                                                                                              | No — per-locale 분할은 빌드 플러그인이 필요합니다 |

둘 다 동일한 인수를 수용하고 동일한 컨텐츠를 반환합니다: 둘 중 하나에서 다른 하나로 전환하면 **언제**와 **얼마나 많은**이 로드되는지만 변경됩니다.

---

## 관련 함수

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayer.md): 병합된 딕셔너리를 읽는 동기 동등물.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getDictionaryAsync.md): 빌드 플러그인이 이 호출을 다시 작성하는 하위 수준 함수.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocale.md): 들어오는 요청의 로케일을 감지합니다.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```

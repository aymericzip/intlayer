---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync 함수 문서 | intlayer
description: intlayer 패키지의 getDictionaryAsync 함수 사용 방법 알아보기
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: `getDictionaryAsync` Function in `intlayer`

## 설명

`getDictionaryAsync` 함수는 딕셔너리의 **단일 로케일 청크**를 로드하고 해석된 콘텐츠를 반환합니다.

이는 `.intlayer/dynamic_dictionaries/`에서 내보낸 로케일별 로더 맵에 대한 [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getDictionary.md)의 대응물입니다: 모든 로케일을 포함하는 딕셔너리를 받는 대신, 로더 맵을 받고 요청된 로케일이 필요로 하는 청크만 기다립니다.

> 애플리케이션 코드에서는 일반적으로 이 함수가 아닌 [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md)를 호출합니다. [빌드 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)은 모든 `getIntlayerAsync('key', locale)` 호출을 `getDictionaryAsync(loaderMap, 'key', locale)` 호출로 다시 쓰습니다. `getDictionaryAsync`는 커스텀 로더와 자체 로더 맵을 빌드하는 도구를 위해 내보내집니다.

**주요 기능:**

- 요청된 로케일 청크만 로드합니다
- 일반 (`locale → loader`) 및 한정된 (`locale → qualifierId → loader`) 로더 맵을 지원합니다
- 동일한 청크의 동시 로드를 중복 제거하고 해석된 콘텐츠를 캐시합니다
- 실패한 로드는 캐시에서 제거되므로 이후 호출이 청크를 재시도합니다

---

## 함수 시그니처

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // 필수
  key: string,                                           // 필수
  localeOrSelector?: LocalesValues | DictionarySelector, // 선택사항
  plugins?: Plugins[]                                    // 선택사항
): Promise<DeepTransformContent<...>>
```

---

## 매개변수

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **설명**: 로케일별 로더 맵입니다. 일반 맵은 로케일을 로더와 연결하고, 정규화된 맵(컬렉션 및 변형에서 사용됨)은 로케일을 정규화 id와 연결한 후 로더와 연결합니다. 정규화된 맵의 경우, 선택자가 대상으로 하는 청크만 로드됩니다.
  - **타입**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **필수**: Yes

- `key: string`
  - **설명**: 청크 캐시의 네임스페이스에 사용되는 딕셔너리 키입니다.
  - **타입**: `string`
  - **필수**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **설명**: 콘텐츠를 해석할 로케일이거나, 선택자 객체(`{ item }`, `{ variant }`, 선택적으로 `locale` 포함)입니다. [동적 딕셔너리](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)를 참조하세요.
  - **타입**: `LocalesValues | DictionarySelector`
  - **필수**: No (선택사항) — 구성된 `defaultLocale`로 기본 설정됩니다.

- `plugins: Plugins[]`
  - **설명**: Node 변환기입니다. 기본 인터프리터 세트로 기본 설정됩니다.
  - **타입**: `Plugins[]`
  - **필수**: No (선택사항)

### Returns

- **Type**: `Promise<Content>` — loaded chunk의 interpreted content로 resolve되는 promise입니다.
- **Description**: 요청된 locale에 대해 map이 chunk를 emit하지 않고 그 fallback 중 어느 것도 emit하지 않을 때 `null`로 resolve됩니다. 이는 missing qualified coordinate가 resolve되는 방식을 반영합니다.

---

## 사용 예시

### 생성된 로더 맵 사용

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### 사용자 정의 로더 맵으로

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### 정규화된 맵에서 선택자 사용

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## 동작 주의사항

### 캐싱 및 중복 제거

캐시는 각 `key + locale + selector` 조합의 **promise**를 저장하므로, 동일한 청크에 대한 동시 호출은 단일 로드를 기다립니다. 거부된 로드는 캐시에서 제거되므로, 실패한 청크는 동일한 실패를 계속 반복하는 대신 다음 호출 시 재시도됩니다.

### 로캘 폴백

일반 로더 맵은 동기 모드와 동일한 폴백 체인을 따라 탐색됩니다: 먼저 요청된 로캘, 그 다음 폴백, 마지막으로 어떤 청크도 방출되지 않은 경우 `null`입니다.

---

## 관련 함수

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md): 애플리케이션이 호출하는 함수이며, 빌드 플러그인이 이를 `getDictionaryAsync`로 다시 작성합니다.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getDictionary.md): 전체 사전을 받는 동기 대응 함수입니다.
- [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md): 컬렉션과 변형, 그리고 이들이 생성하는 로더 맵입니다.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```

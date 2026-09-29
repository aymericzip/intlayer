---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: getIntlayer 함수 문서 | intlayer
description: "getIntlayer로 어디서든 로케일에 맞는 사전 콘텐츠를 읽습니다. useIntlayer 훅의 프레임워크 독립적인 버전입니다."
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "로케일을 생략하면 기본 로케일보다 먼저 요청의 로케일 또는 저장된 로케일을 해석"
  - version: 9.4.0
    date: 2026-08-23
    changes: "초기 문서"
author: aymericzip
---

# Documentation: `intlayer`의 `getIntlayer` Function

## Description

`getIntlayer` 함수는 키로 하나의 딕셔너리를 선택하고 주어진 로케일에 대해 해석된 내용을 반환합니다. 이는 `useIntlayer` 훅의 프레임워크에 독립적인 대응물입니다: 동일한 내용, 동일한 선택자이지만 React 컨텍스트를 사용할 수 없는 곳(Node 스크립트, 서버 함수, 라우트 로더, 메타데이터 빌더, Express/Fastify 핸들러, 테스트)에서 사용 가능합니다.

`.intlayer/`에서 Intlayer가 생성한 딕셔너리를 읽으므로, `key` 인자는 타입이 지정되고 자신의 콘텐츠 선언에서 자동 완성되며, 반환된 객체는 각 리프까지 완전히 타입이 지정됩니다.

**주요 기능:**

- 타입이 지정된 딕셔너리 키와 타입이 지정된 반환 콘텐츠
- 모든 콘텐츠 노드 해석(`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- 로케일 또는 선택자 객체(컬렉션, 변형) 수용
- 결과는 `key + locale + selector`당 메모이제이션됨
- 개발 중 딕셔너리가 누락된 경우 충돌하는 대신 안전한 프록시로 폴백

## 함수 시그니처

```typescript
getIntlayer(
  key: DictionaryKeys,                        // 필수
  localeOrSelector?: LocalesValues | DictionarySelector, // 선택사항
  plugins?: Plugins[]                         // 선택사항
): DeepTransformContent<...>
```

## Parameters

- `key: DictionaryKeys`
  - **설명**: 콘텐츠 파일에 선언된 대로 읽을 사전의 키입니다.
  - **타입**: `DictionaryKeys`, 선언된 모든 사전 키의 합집합입니다.
  - **필수**: 예

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **설명**: 콘텐츠를 해석할 locale이거나, [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)용 selector 객체입니다.
    - `'fr'`: 로케일
    - `{ item: 2 }`: [컬렉션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/collections.md) 항목 (`item`을 생략하면 모든 항목을 배열로 가져옵니다)
    - `{ variant: 'black-friday' }`: 이름이 있는 [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md) (`default` variant는 생략)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: 구조화된 variant
    - 모든 selector에 로케일을 함께 지정할 수 있습니다: `{ item: 2, locale: 'fr' }`
  - **타입**: `LocalesValues | DictionarySelector`
  - **필수**: 아니요 (선택). 생략하면 [로케일 없이](#로케일-없이)를 참고하세요.

- `plugins: Plugins[]`
  - **설명**: 기본 interpreter plugins를 대체하는 커스텀 node transformers입니다. 고급 사용법이므로, 기본 동작을 유지하려면 생략하세요.
  - **타입**: `Plugins[]`
  - **필수**: 아니요 (선택)

### Returns

- **타입**: 선언된 타입으로 입력된 사전의 해석된 콘텐츠.
- **설명**: 사전의 `content` 필드를 반영하는 일반 객체로, 모든 Intlayer 노드가 요청된 로케일에 대한 최종 값으로 해석됩니다.

## 사용 예시

### 기본 사용법

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      ko: "안녕하세요",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### 로케일 없이

로케일을 전달하지 않으면 `getIntlayer`는 바로 기본 로케일로 넘어가지 않습니다. 다음 순서로 해석합니다.

1. **현재 요청의 로케일**: 서버에서 Intlayer 통합이 요청을 처리할 때입니다. `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer` middleware, `remix-intlayer` 및 `astro-intlayer` middleware, 그리고 React Server Components의 `IntlayerProvider` / `setLocale`이 해당합니다. 각 요청은 자신의 cookies와 headers로 해석되므로, 동시에 접속한 사용자끼리 로케일을 공유하는 일은 없습니다.
2. **브라우저에 저장된 로케일**(cookie, `localStorage`, `sessionStorage`): 로케일 전환기가 저장하는 로케일입니다.
3. [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 선언된 **`defaultLocale`**.

- [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // 요청의 로케일, 없으면 저장된 로케일, 없으면 기본 로케일
```

같은 해석이 `getDictionary`, [빌드 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)이 다시 작성한 호출, 그리고 provider 밖에서 렌더링되는 `useIntlayer` / `useDictionaryDynamic`에도 적용됩니다. 명시적으로 전달한 로케일이 항상 우선합니다.

- [빌드 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)

> `getIntlayer`는 반응형이 아닙니다. 로케일을 바꾼 뒤에는 새 로케일을 읽기 위해 다시 호출하세요. 서버에서 렌더링되는 페이지에서 어떤 provider 밖에서든 호출하면 서버에서는 기본 로케일, 브라우저에서는 저장된 로케일이 렌더링되어 hydration mismatch가 발생할 수 있습니다. 이 경우 프레임워크의 provider를 마운트하거나 로케일을 전달하세요.

### 서버 핸들러 내부

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### 선택자가 있는 경우 (컬렉션 및 변형)

```typescript
import { getIntlayer } from "intlayer";

// 단일 컬렉션 항목
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// 컬렉션의 모든 항목, 정렬된 배열로
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// 명명된 변형
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

## 동작 참고 사항

### Caching

결과는 `key + locale + selector`를 키로 하는 모듈 레벨 캐시에 메모이제이션됩니다. `getIntlayer("app", "fr")`을 반복적으로 호출해도 dictionary는 한 번만 해석되고 그 이후로는 동일한 객체를 반환합니다.

### 누락된 사전

개발 중에 생성된 사전이 없는 키를 요청하면 경고가 한 번 기록되고 안전한 폴백 프록시가 반환됩니다. `content.title`을 읽으면 오류를 던지는 대신 `"app.title"` 문자열이 반환됩니다. 이를 통해 누락된 선언이 수정될 때까지 페이지를 사용할 수 있게 유지됩니다. Intlayer 빌드(또는 dev 서버)를 실행하여 사전이 생성되도록 하세요.

### Bundle size

`getIntlayer`는 **모든** locale을 포함하는 병합된 사전을 읽습니다. 클라이언트 번들에서 [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)는 필요한 콘텐츠만 배송되도록 호출을 다시 작성합니다. 렌더링 외부에서 콘텐츠를 읽을 때(metadata, loaders, server functions) 단일 locale을 요청 시 로드하려면 [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md)를 대신 사용하세요.

- [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md)

## 관련 함수

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```

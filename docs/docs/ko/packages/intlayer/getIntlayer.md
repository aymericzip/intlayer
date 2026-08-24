---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayer 함수 문서 | intlayer
description: intlayer 패키지를 위한 getIntlayer 함수 사용 방법을 알아봅니다
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
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
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

---

## 함수 시그니처

```typescript
getIntlayer(
  key: DictionaryKeys,                        // 필수
  localeOrSelector?: LocalesValues | DictionarySelector, // 선택사항
  plugins?: Plugins[]                         // 선택사항
): DeepTransformContent<...>
```

---

## Parameters

- `key: DictionaryKeys`
  - **Description**: 콘텐츠 파일에 선언된 대로 읽을 사전의 키입니다.
  - **Type**: `DictionaryKeys` — 선언된 모든 사전 키의 합집합입니다.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: 콘텐츠를 해석할 locale이거나, [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)용 selector 객체입니다.
    - `'fr'` — a locale
    - `{ item: 2 }` — a [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/collections.md) item (omit `item` to get every item as an array)
    - `{ variant: 'black-friday' }` — a named [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md) (omit for the `default` one)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — a structured variant
    - Any selector can carry a locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — 설정된 `defaultLocale`으로 기본 설정됩니다.

- `plugins: Plugins[]`
  - **Description**: 기본 interpreter plugins를 대체하는 커스텀 node transformers입니다. 고급 사용법이므로, 기본 동작을 유지하려면 생략하세요.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: 선언된 타입으로 입력된 사전의 해석된 콘텐츠.
- **Description**: 사전의 `content` 필드를 반영하는 일반 객체로, 모든 Intlayer 노드가 요청된 로케일에 대한 최종 값으로 해석됩니다.

---

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

로케일을 생략하면 [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에서 선언된 `defaultLocale`로 콘텐츠를 해석합니다.

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // 기본 로케일로 해석됨
```

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

---

## 동작 참고 사항

### Caching

결과는 `key + locale + selector`를 키로 하는 모듈 레벨 캐시에 메모이제이션됩니다. `getIntlayer("app", "fr")`을 반복적으로 호출해도 dictionary는 한 번만 해석되고 그 이후로는 동일한 객체를 반환합니다.

### 누락된 사전

개발 중에 생성된 사전이 없는 키를 요청하면 경고가 한 번 기록되고 안전한 폴백 프록시가 반환됩니다. `content.title`을 읽으면 오류를 던지는 대신 `"app.title"` 문자열이 반환됩니다. 이를 통해 누락된 선언이 수정될 때까지 페이지를 사용할 수 있게 유지됩니다. Intlayer 빌드(또는 dev 서버)를 실행하여 사전이 생성되도록 하세요.

### Bundle size

`getIntlayer`는 **모든** locale을 포함하는 병합된 사전을 읽습니다. 클라이언트 번들에서 [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)는 필요한 콘텐츠만 배송되도록 호출을 다시 작성합니다. 렌더링 외부에서 콘텐츠를 읽을 때(metadata, loaders, server functions) 단일 locale을 요청 시 로드하려면 [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md)를 대신 사용하세요.

---

## 관련 함수

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayerAsync.md): 단일 locale 청크를 로드하는 비동기 counterpart입니다.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getDictionary.md): 키로 조회되는 대신 직접 전달하는 dictionary 객체를 해석합니다.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md): provider에서 locale을 읽는 React hook의 동등물입니다.

---

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

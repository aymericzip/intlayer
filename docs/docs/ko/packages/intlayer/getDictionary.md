---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionary 함수 문서 | intlayer
description: intlayer 패키지의 getDictionary 함수를 사용하는 방법을 참조하세요
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "초기 문서"
author: aymericzip
---

# `intlayer`의 `getDictionary` 함수 문서

## 설명

`getDictionary` 함수는 **직접 전달한 dictionary 객체**를 해석하고 주어진 로케일에 대해 해결된 콘텐츠를 반환합니다. 콘텐츠를 한 번에 순회하면서 필요에 따라 각 interpreter 플러그인을 적용하여 `t()` 번역, 열거형, 조건, 삽입, 중첩, markdown, HTML 및 파일 노드를 해결합니다.

생성된 레지스트리에서 키로 dictionary를 조회하는 [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayer.md)와 달리, `getDictionary`는 dictionary 자체를 받습니다. 이것이 런타임에 구축된 콘텐츠, API 또는 CMS에서 가져온 콘텐츠 또는 테스트에서 인라인으로 선언된 콘텐츠에 적합한 도구입니다.

**주요 기능:**

- dictionary 구조(`{ key, content }`)를 따르는 모든 객체와 함께 작동
- 선택자와 함께 정규화된 dictionary 그룹(컬렉션, 변형)도 수락
- 완전히 타입됨: 반환된 객체는 전달한 `content`를 미러링
- 사용자 정의 interpreter 플러그인 수락

---

## 함수 서명

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // 필수
  localeOrSelector?: LocalesValues | DictionarySelector, // 선택사항
  plugins?: Plugins[]                                // 선택사항
): DeepTransformContent<...>
```

---

## 매개변수

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **설명**: 해석할 dictionary (또는 qualified dictionary group).
  - **타입**: `Dictionary | QualifiedDictionaryGroup`
  - **필수**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **설명**: 콘텐츠를 해석할 locale, 또는 selector 객체 (`{ item }`, `{ variant }`, 선택적으로 `locale` 포함). [동적 dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)를 참조하세요.
  - **타입**: `LocalesValues | DictionarySelector`
  - **필수**: No (선택사항) — 설정된 `defaultLocale`로 기본값 설정.

- `plugins: Plugins[]`
  - **설명**: 인식된 노드가 어떻게 해석되는지를 정의하는 node transformer 배열. 생략되면 기본 interpreter plugin 세트가 사용됩니다.
  - **타입**: `Plugins[]`
  - **필수**: No (선택사항)

### Returns

- **Type**: 해석된 딕셔너리의 콘텐츠.
- **Description**: 전달한 `content`에서 요청된 로케일에 대해 모든 Intlayer 노드가 해석됩니다. `item` 선택자가 없는 컬렉션 그룹의 경우 해석된 항목의 정렬된 배열이 반환되며, 선택자가 아무것도 대상으로 하지 않으면 `null`이 반환됩니다.

---

## 예제 사용법

### 기본 사용법

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        ko: "안녕하세요",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### 런타임에 가져온 콘텐츠 해석

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### 선택자 사용

```typescript
import { getDictionary } from "intlayer";

// 한정된 dictionary group은 단일 entry로 해결됩니다…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …또는 `item`이 주어지지 않으면 정렬된 배열로 해결됩니다
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## 관련 함수

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getIntlayer.md): 동일한 해석이지만, 생성된 registry에서 key로 dictionary를 조회합니다.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getDictionaryAsync.md): locale별 loader maps의 대응 함수입니다.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useDictionary.md): React hook 동등물로, provider에서 locale을 읽습니다.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```

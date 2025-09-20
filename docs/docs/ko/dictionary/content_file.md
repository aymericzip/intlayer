---
createdAt: 2025-02-07
updatedAt: 2025-09-20
title: 콘텐츠 파일
description: 콘텐츠 선언 파일의 확장자를 사용자 정의하는 방법을 배우세요. 이 문서를 따라 프로젝트에서 조건을 효율적으로 구현하세요.
keywords:
  - 콘텐츠 파일
  - 문서
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# 콘텐츠 파일

<iframe title="i18n, Markdown, JSON… 모든 것을 관리하는 단일 솔루션 | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## 콘텐츠 파일이란 무엇인가요?

Intlayer에서 콘텐츠 파일은 사전 정의를 포함하는 파일입니다.  
이 파일들은 애플리케이션의 텍스트 콘텐츠, 번역 및 리소스를 선언합니다.  
콘텐츠 파일은 Intlayer에 의해 처리되어 사전을 생성합니다.

사전은 애플리케이션이 `useIntlayer` 훅을 사용하여 가져올 최종 결과물입니다.

### 주요 개념

#### 사전(Dictionary)

사전은 키로 구성된 콘텐츠의 구조화된 모음입니다. 각 사전은 다음을 포함합니다:

- **키(Key)**: 사전의 고유 식별자
- **콘텐츠(Content)**: 실제 콘텐츠 값(텍스트, 숫자, 객체 등)
- **메타데이터(Metadata)**: 제목, 설명, 태그 등 추가 정보

#### 콘텐츠 파일

콘텐츠 파일 예시:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      ko: "한국어 콘텐츠",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화됨",
      false: "검증이 비활성화됨",
    }),
    insertionContent: insert("안녕하세요 {{name}}!"),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠 경로
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# 마크다운 예제"),

    /*
     * `react-intlayer` 또는 `next-intlayer`를 사용할 때만 사용 가능
     */
    jsxContent: <h1>내 제목</h1>,
  },
} satisfies Dictionary<Content>; // [선택 사항] Dictionary는 제네릭이며 사전의 형식을 강화할 수 있습니다
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화됨",
      false: "검증이 비활성화됨",
    }),
    insertionContent: insert("안녕하세요 {{name}}!"),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠의 경로
    ),
    markdownContent: md("# 마크다운 예제"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` 또는 `next-intlayer`를 사용할 때만 사용 가능
    jsxContent: <h1>내 제목</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      ko: "한국어 콘텐츠",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "마이너스 1대 미만의 자동차",
      "-1": "마이너스 1대의 자동차",
      "0": "자동차 없음",
      "1": "자동차 1대",
      ">5": "몇 대의 자동차",
      ">19": "많은 자동차",
    }),
    conditionalContent: cond({
      true: "검증이 활성화됨",
      false: "검증이 비활성화됨",
    }),
    insertionContent: insert("안녕하세요 {{name}}!"),
    nestedContent: nest(
      "navbar", // 중첩할 사전의 키
      "login.button" // [선택 사항] 중첩할 콘텐츠 경로
    ),
    markdownContent: md("# 마크다운 예제"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // `react-intlayer` 또는 `next-intlayer`를 사용할 때만 사용 가능
    jsxContent: <h1>내 제목</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "안녕하세요 세계",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "차 없음",
        "1": "차 한 대",
        "<-1": "마이너스 1대 미만",
        "-1": "마이너스 1대",
        ">5": "몇 대의 차",
        ">19": "많은 차",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "검증이 활성화됨",
        "false": "검증이 비활성화됨",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "안녕하세요 {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# 마크다운 예제",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["내 제목"],
      },
    },
  },
}
```

#### 콘텐츠 노드

콘텐츠 노드는 사전 콘텐츠의 기본 구성 요소입니다. 다음과 같을 수 있습니다:

- **원시 값**: 문자열, 숫자, 불리언, null, undefined
- **타입이 지정된 노드**: 번역, 조건, 마크다운 등과 같은 특수 콘텐츠 유형
- **함수**: 런타임에 평가될 수 있는 동적 콘텐츠 [함수 가져오기 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/function_fetching.md)
- **중첩 콘텐츠**: 다른 사전에 대한 참조

#### 콘텐츠 유형

Intlayer는 타입이 지정된 노드를 통해 다양한 콘텐츠 유형을 지원합니다:

- **번역 콘텐츠**: 로케일별 값이 포함된 다국어 텍스트 [번역 콘텐츠 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/translation_content.md)
- **조건 콘텐츠**: 불리언 표현식에 기반한 조건부 콘텐츠 [조건 콘텐츠 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/condition_content.md)
- **열거형 콘텐츠**: 열거된 값에 따라 달라지는 콘텐츠 [열거형 콘텐츠 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/enumeration_content.md)
- **삽입 콘텐츠**: 다른 콘텐츠에 삽입할 수 있는 콘텐츠 [삽입 콘텐츠 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion_content.md)
- **Markdown Content**: 마크다운 형식의 리치 텍스트 콘텐츠 [Markdown Content 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown_content.md)
- **Nested Content**: 다른 사전을 참조하는 콘텐츠 [Nested Content 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/nested_content.md)
- **Gender Content**: 성별에 따라 달라지는 콘텐츠 [Gender Content 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender_content.md)
- **File Content**: 외부 파일을 참조하는 콘텐츠 [File Content 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/file_content.md)

## 사전 구조

Intlayer에서 사전은 `Dictionary` 타입으로 정의되며, 동작을 제어하는 여러 속성을 포함합니다:

### 필수 속성

#### `key` (string)

사전의 식별자입니다. 동일한 키를 가진 여러 사전이 있을 경우, Intlayer가 자동으로 병합합니다.

> 케밥 케이스 명명 규칙을 사용하세요 (예: `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

`content` 속성은 실제 사전 데이터를 포함하며 다음을 지원합니다:

- **원시 값**: 문자열, 숫자, 불리언, null, undefined
- **타입화된 노드**: Intlayer의 헬퍼 함수를 사용한 특수 콘텐츠 타입
- **중첩 객체**: 복잡한 데이터 구조
- **배열**: 콘텐츠 모음
- **함수**: 동적 콘텐츠 평가

### 선택적 속성

#### `title` (string)

사람이 읽을 수 있는 사전의 제목으로, 편집기 및 CMS 시스템에서 사전을 식별하는 데 도움이 됩니다. 이는 많은 수의 사전을 관리하거나 콘텐츠 관리 인터페이스에서 작업할 때 특히 유용합니다.

**예시:**

```typescript
{
  key: "about-page-meta",
  title: "About Page Metadata",
  content: { /* ... */ }
}
```

#### `description` (string)

사전의 목적, 사용 지침 및 특별 고려 사항을 설명하는 상세한 설명입니다. 이 설명은 AI 기반 번역 생성의 컨텍스트로도 사용되어 번역 품질과 일관성을 유지하는 데 중요합니다.

**예시:**

```typescript
{
  key: "about-page-meta",
  description: [
    "This dictionary manages the metadata of the About Page",
"SEO에 대한 좋은 관행을 고려하세요:",
"- 제목은 50자에서 60자 사이여야 합니다",
"- 설명은 150자에서 160자 사이여야 합니다",
].join('\n'),
content: { /* ... */ }
}
```

#### `tags` (string[])

사전을 분류하고 조직하기 위한 문자열 배열입니다. 태그는 추가적인 문맥을 제공하며, 편집기나 CMS 시스템에서 필터링, 검색 또는 사전 조직에 사용될 수 있습니다.

**예시:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `locale` (LocalesValues)

사전을 각 로케일별 사전으로 변환하며, content에 선언된 각 필드는 자동으로 번역 노드로 변환됩니다. 이 속성이 설정되면:

- 사전은 단일 로케일 사전으로 처리됩니다.
- 각 필드는 해당 특정 로케일에 대한 번역 노드가 됩니다.
- 이 속성을 사용할 때는 콘텐츠 내에서 번역 노드(`t()`)를 사용해서는 안 됩니다.
- 이 속성이 없으면 사전은 다국어 사전으로 처리됩니다.

> 자세한 내용은 [Intlayer의 로케일별 콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 참조하세요.

**예시:**

```json
// 로케일별 사전
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // 'en'에 대한 번역 노드가 됩니다.
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

외부 소스에서 사전 내용을 자동으로 채우기 위한 지침입니다. 이는 `intlayer.config.ts`에서 전역으로 설정하거나 각 사전별로 설정할 수 있습니다. 여러 형식을 지원합니다:

- **`true`**: 모든 로케일에 대해 자동 채우기 활성화
- **`string`**: 단일 파일 경로나 변수 템플릿
- **`object`**: 로케일별 파일 경로

**예시:**

```json
// 모든 로케일에 대해 활성화
{
  "autoFill": true
}
// 단일 파일
{
  "autoFill": "./translations/aboutPage.content.json"
}
// 변수 템플릿 사용
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// 로케일별 세부 설정
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**사용 가능한 변수들:**

- `{{locale}}` – 로케일 코드 (예: `fr`, `es`)
- `{{fileName}}` – 파일 이름 (예: `example`)
- `{{key}}` – 사전 키 (예: `example`)

> 자세한 내용은 [Intlayer의 자동 채우기 구성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md)을 참조하세요.

##### `priority` (숫자)

충돌 해결을 위한 사전의 우선순위를 나타냅니다. 여러 사전이 동일한 키를 가질 때, 우선순위 숫자가 가장 높은 사전이 다른 사전을 덮어씁니다. 이는 콘텐츠 계층 구조 및 덮어쓰기를 관리하는 데 유용합니다.

**예시:**

```typescript
// 기본 사전
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// 덮어쓰기 사전
{
  key: "welcome-message",
  priority: 10,
  content: { message: "프리미엄 서비스에 오신 것을 환영합니다!" }
}
// 이것은 기본 사전을 덮어씁니다
```

### CMS 속성

##### `version` (string)

원격 사전의 버전 식별자입니다. 현재 사용 중인 사전의 버전을 추적하는 데 도움이 되며, 특히 원격 콘텐츠 관리 시스템 작업 시 유용합니다.

##### `live` (boolean)

원격 사전의 경우, 사전을 런타임에 실시간으로 가져올지 여부를 나타냅니다. 활성화되면:

- `intlayer.config.ts`에서 `importMode`가 "live"로 설정되어 있어야 합니다.
- 라이브 서버가 실행 중이어야 합니다.
- 사전은 라이브 동기화 API를 사용하여 런타임에 가져옵니다.
- 라이브 상태이지만 가져오기에 실패하면 동적 값으로 대체됩니다.
- 라이브가 아니면 최적의 성능을 위해 빌드 시 사전이 변환됩니다.

### 시스템 속성 (자동 생성됨)

이 속성들은 Intlayer에 의해 자동으로 생성되며 수동으로 수정해서는 안 됩니다:

##### `$schema` (string)

사전 구조의 유효성을 검사하는 데 사용되는 JSON 스키마입니다. 사전 무결성을 보장하기 위해 Intlayer가 자동으로 추가합니다.

##### `id` (string)

원격 사전의 경우, 원격 서버에서 사전을 고유하게 식별하는 식별자입니다. 원격 콘텐츠를 가져오고 관리하는 데 사용됩니다.

##### `localId` (LocalDictionaryId)

로컬 사전의 고유 식별자입니다. Intlayer가 자동으로 생성하며, 사전이 로컬인지 원격인지 및 위치를 식별하는 데 도움을 줍니다.

##### `localIds` (LocalDictionaryId[])

병합된 사전의 경우, 이 배열에는 함께 병합된 모든 사전의 ID가 포함됩니다. 병합된 콘텐츠의 출처를 추적하는 데 유용합니다.

##### `filePath` (string)

로컬 사전의 파일 경로로, 사전이 생성된 `.content` 파일을 나타냅니다. 디버깅 및 출처 추적에 도움이 됩니다.

##### `availableVersions` (string[])

원격 사전의 경우, 이 배열에는 사전의 모든 사용 가능한 버전이 포함됩니다. 사용 가능한 버전을 추적하는 데 도움이 됩니다.

##### `autoFilled` (true)

사전이 외부 소스에서 자동으로 채워졌는지 여부를 나타냅니다. 충돌이 발생할 경우, 기본 사전이 자동 채워진 사전을 덮어씁니다.

##### `location` ('distant' | 'locale')

사전의 위치를 나타냅니다:

- `'locale'`: 로컬 사전 (콘텐츠 파일에서 가져옴)
- `'distant'`: 원격 사전 (외부 소스에서 가져옴)

## 콘텐츠 노드 유형

Intlayer는 기본 원시 값을 확장하는 여러 전문화된 콘텐츠 노드 유형을 제공합니다:

### 번역 콘텐츠 (`t`)

로케일에 따라 달라지는 다국어 콘텐츠:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### 조건 콘텐츠 (`cond`)

불리언 조건에 따라 변경되는 콘텐츠:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### 열거형 콘텐츠 (`enu`)

열거형 값에 따라 달라지는 콘텐츠:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "귀하의 요청이 보류 중입니다",
  approved: "귀하의 요청이 승인되었습니다",
  rejected: "귀하의 요청이 거부되었습니다",
});
```

### 삽입 콘텐츠 (`insert`)

다른 콘텐츠에 삽입할 수 있는 콘텐츠:

```typescript
import { insert } from "intlayer";

insertionContent: insert("이 텍스트는 어디에나 삽입할 수 있습니다");
```

### 중첩 콘텐츠 (`nest`)

다른 사전에 대한 참조:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### 마크다운 콘텐츠 (`md`)

마크다운 형식의 리치 텍스트 콘텐츠:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# 환영합니다\n\n이것은 [링크](https://example.com)가 포함된 **굵은** 텍스트입니다"
);
```

### 성별에 따른 콘텐츠 (`gender`)

성별에 따라 달라지는 콘텐츠:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "그는 개발자입니다",
  female: "그녀는 개발자입니다",
  other: "그들은 개발자입니다",
});
```

### 파일 콘텐츠 (`file`)

외부 파일에 대한 참조:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## 콘텐츠 파일 생성하기

### 기본 콘텐츠 파일 구조

콘텐츠 파일은 `Dictionary` 타입을 만족하는 기본 객체를 내보냅니다:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "환영 페이지 콘텐츠",
  description: "히어로 섹션과 기능을 포함한 메인 환영 페이지용 콘텐츠",
  tags: ["페이지", "환영", "홈페이지"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          ko: "사용하기 쉬움",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          ko: "모든 숙련도에 적합한 직관적인 인터페이스",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON Content File

You can also create content files in JSON format:

```json
{
  "key": "welcome-page",
  "title": "환영 페이지 콘텐츠",
  "description": "메인 환영 페이지용 콘텐츠",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "우리 플랫폼에 오신 것을 환영합니다",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "쉽게 놀라운 애플리케이션을 만드세요",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### 지역별 콘텐츠 파일

지역별 사전을 위해 `locale` 속성을 지정하세요:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "우리 플랫폼에 오신 것을 환영합니다",
      subtitle: "쉽게 놀라운 애플리케이션을 만드세요",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## 콘텐츠 파일 확장자

Intlayer는 콘텐츠 선언 파일의 확장자를 사용자 정의할 수 있도록 허용합니다. 이 사용자 정의는 대규모 프로젝트를 관리하는 데 유연성을 제공하며 다른 모듈과의 충돌을 방지하는 데 도움이 됩니다.

### 기본 확장자

기본적으로 Intlayer는 콘텐츠 선언을 위해 다음 확장자를 가진 모든 파일을 감시합니다:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

이 기본 확장자는 대부분의 애플리케이션에 적합합니다. 그러나 특정 요구 사항이 있는 경우, 빌드 프로세스를 간소화하고 다른 구성 요소와의 충돌 위험을 줄이기 위해 사용자 정의 확장자를 정의할 수 있습니다.

> Intlayer가 콘텐츠 선언 파일을 식별하는 데 사용하는 파일 확장자를 사용자 정의하려면 Intlayer 구성 파일에서 지정할 수 있습니다. 이 방법은 감시 프로세스의 범위를 제한하여 빌드 성능을 향상시키는 대규모 프로젝트에 유용합니다.

## 고급 개념

### 사전 병합

여러 사전이 동일한 키를 가질 때, Intlayer는 자동으로 이를 병합합니다. 병합 동작은 여러 요인에 따라 달라집니다:

- **우선순위**: `priority` 값이 높은 사전이 낮은 값을 가진 사전을 덮어씁니다
- **자동 채우기 대 기본**: 기본 사전이 자동 채우기 사전을 덮어씁니다.
- **위치**: 우선순위가 같을 때 로컬 사전이 원격 사전을 덮어씁니다.

### 타입 안전성

Intlayer는 콘텐츠 파일에 대해 완전한 TypeScript 지원을 제공합니다:

```typescript
// 콘텐츠 타입 정의
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// 사전에서 사용
export default {
  key: "welcome-page",
  content: {
    // TypeScript가 자동 완성 및 타입 검사를 제공합니다
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### 노드 중첩

함수들을 다른 함수 안에 문제없이 중첩할 수 있습니다.

예시:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다.
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 조건, 열거형, 다국어 콘텐츠를 중첩한 복합 콘텐츠
    // `getIntlayer('page','en').advancedContent(true)(10)`는 'Multiple items found'를 반환합니다.
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다.
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 조건, 열거형, 다국어 콘텐츠를 중첩한 복합 콘텐츠
    // `getIntlayer('page','en').advancedContent(true)(10)`는 'Multiple items found'를 반환합니다.
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage`는 `['Hi', ' ', 'John Doe']`를 반환합니다.
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // 조건, 열거형, 다국어 콘텐츠를 포함하는 복합 콘텐츠
    // `getIntlayer('page','en').advancedContent(true)(10)`는 '여러 항목이 발견됨'을 반환합니다.
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi", // 인사말
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
                "ko": "항목이 없습니다",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
                "ko": "항목 1개 발견",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
                "ko": "여러 항목 발견",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### 모범 사례

1. **명명 규칙**:
   - 사전 키에는 케밥 케이스(kebab-case)를 사용하세요 (`"about-page-meta"`)
   - 관련된 콘텐츠는 동일한 키 접두사 아래에 그룹화하세요

2. **콘텐츠 구성**:
   - 관련된 콘텐츠는 같은 사전에 함께 보관하세요
   - 복잡한 콘텐츠 구조는 중첩 객체를 사용하여 구성하세요
   - 분류를 위해 태그를 활용하세요
   - 누락된 번역은 `autoFill`을 사용하여 자동으로 채우세요

3. **성능**:
   - 감시 대상 파일의 범위를 제한하기 위해 콘텐츠 구성을 조정하세요.
   - 실시간 업데이트가 필요한 경우에만 라이브 사전을 사용하세요(예: A/B 테스트 등).
   - 빌드 시 사전을 최적화하기 위해 빌드 변환 플러그인(`@intlayer/swc` 또는 `@intlayer/babel`)이 활성화되어 있는지 확인하세요.

## 문서 이력

| 버전   | 날짜       | 변경 사항      |
| ------ | ---------- | -------------- |
| 6.0.0  | 2025-09-20 | 필드 문서 추가 |
| 5.5.10 | 2025-06-29 | 이력 초기화    |

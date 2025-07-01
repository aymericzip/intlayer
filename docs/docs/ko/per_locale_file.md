---
docName: dictionary__per_locale_file
url: https://intlayer.org/doc/concept/per-locale-file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Intlayer에서 `지역별` 콘텐츠 선언 방법
description: Intlayer에서 지역별로 콘텐츠를 선언하는 방법을 알아보세요. 다양한 형식과 사용 사례를 이해하기 위해 문서를 따라가세요.
keywords:
  - 국제화
  - 문서화
  - Intlayer
  - 지역별
  - TypeScript
  - JavaScript
---

# Intlayer에서 `지역별` 콘텐츠 선언 방법

Intlayer는 다국어 콘텐츠를 선언하는 두 가지 방식을 지원합니다:

- 모든 번역을 포함한 단일 파일
- 지역별로 하나씩 파일을 나누는 방식 (지역별 형식)

이 유연성은 다음을 가능하게 합니다:

- 다른 i18n 도구에서의 손쉬운 마이그레이션
- 자동 번역 워크플로우 지원
- 번역을 별도의 지역별 파일로 명확하게 조직화

## 여러 번역을 포함한 단일 파일

이 형식은 다음에 적합합니다:

- 코드 내 빠른 반복 작업
- CMS와의 원활한 통합

대부분의 사용 사례에 권장되는 접근 방식입니다. 번역을 중앙 집중화하여 반복 작업과 CMS 통합을 쉽게 만듭니다.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// 다국어 콘텐츠를 정의하는 객체
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component", // 영어 번역
      es: "Título de mi componente", // 스페인어 번역
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// 다국어 콘텐츠를 정의하는 객체
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component", // 영어 번역
      es: "Título de mi componente", // 스페인어 번역
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> 권장: 이 형식은 Intlayer의 시각적 편집기를 사용하거나 코드 내에서 직접 번역을 관리할 때 가장 적합합니다.

## 로케일별 형식

이 형식은 다음과 같은 경우에 유용합니다:

- 번역을 독립적으로 버전 관리하거나 재정의하려는 경우.
- 기계 번역 또는 인간 번역 워크플로우를 통합하는 경우.

로케일 필드를 지정하여 번역을 개별 로케일 파일로 분리할 수도 있습니다:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 중요
  content: { multilingualContent: "내 컴포넌트의 제목" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 중요
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 중요
  content: { multilingualContent: "내 컴포넌트의 제목" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 중요
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 중요
  content: {
    multilingualContent: "내 컴포넌트의 제목",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 중요
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // 중요
  "content": {
    "multilingualContent": "내 컴포넌트의 제목",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // 중요
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> 중요: locale 필드가 정의되어 있는지 반드시 확인하세요. 이 필드는 Intlayer에 해당 파일이 어떤 언어를 나타내는지 알려줍니다.

> 참고: 두 경우 모두, 콘텐츠 선언 파일은 Intlayer에서 인식되기 위해 `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` 명명 패턴을 따라야 합니다. `.[locale]` 접미사는 선택 사항이며 명명 규칙으로만 사용됩니다.

## 형식 혼합

동일한 콘텐츠 키에 대해 두 가지 선언 방식을 결합할 수 있습니다. 예를 들어:

- index.content.ts와 같은 파일에서 기본 콘텐츠를 정적으로 선언합니다.
- index.fr.content.ts 또는 index.content.json과 같은 별도의 파일에서 특정 번역을 추가하거나 덮어씁니다.

이 설정은 특히 다음과 같은 경우에 유용합니다:

- 코드에서 초기 콘텐츠 구조를 정의하려는 경우.
- 나중에 CMS 또는 자동화 도구를 사용하여 번역을 보완하거나 완성하려는 경우.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### 예시

다국어 콘텐츠 선언 파일 예시:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "내 컴포넌트의 제목",
    projectName: "내 프로젝트",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer는 다국어 및 로케일별 파일을 자동으로 병합합니다.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // 기본 로케일은 ENGLISH이므로 ENGLISH 콘텐츠를 반환합니다.

console.log(JSON.stringify(intlayer, null, 2));
// 결과:
// {
//  "multilingualContent": "내 컴포넌트의 제목",
//  "projectName": "내 프로젝트"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// 결과:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "내 프로젝트"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// 결과:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "내 프로젝트"
// }
```

### 자동 번역 생성

[intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 사용하여 선호하는 서비스를 기반으로 누락된 번역을 자동으로 채우세요.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력

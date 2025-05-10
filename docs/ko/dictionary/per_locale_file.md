# Intlayer는 다국어 콘텐츠를 선언하는 두 가지 방법을 지원합니다:

- 모든 번역이 포함된 단일 파일
- 로케일별 파일 (per-locale 형식)

이 유연성은 다음을 가능하게 합니다:

- 다른 i18n 도구에서의 쉬운 마이그레이션
- 자동 번역 워크플로우 지원
- 번역을 별도의 로케일별 파일로 명확하게 구성

## 여러 번역이 포함된 단일 파일

이 형식은 다음에 적합합니다:

- 코드에서 빠른 반복 작업.
- CMS와의 원활한 통합.

대부분의 사용 사례에서 권장되는 접근 방식입니다. 번역을 중앙 집중화하여 반복 작업 및 CMS와의 통합을 용이하게 합니다.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ko: "내 컴포넌트의 제목",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ko: "내 컴포넌트의 제목",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ko: "내 컴포넌트의 제목",
      en: "Title of my component",
      es: "Título de mi componente",
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
        "ko": "내 컴포넌트의 제목",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> 권장: 이 형식은 Intlayer의 시각적 편집기를 사용하거나 코드를 통해 번역을 직접 관리할 때 가장 적합합니다.

## Per-Locale 형식

이 형식은 다음과 같은 경우에 유용합니다:

- 번역을 독립적으로 버전 관리하거나 재정의하고 싶을 때.
- 기계 번역 또는 인간 번역 워크플로우를 통합할 때.

로케일 필드를 지정하여 번역을 개별 로케일 파일로 분할할 수도 있습니다:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 중요
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // 중요
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 중요
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // 중요
  content: { multilingualContent: "Title of my component" },
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
    multilingualContent: "Title of my component",
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
    "multilingualContent": "Title of my component",
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

> 중요: 로케일 필드가 정의되어 있는지 확인하세요. 이 필드는 파일이 어떤 언어를 나타내는지 Intlayer에 알려줍니다.

> 참고: 두 경우 모두 콘텐츠 선언 파일은 Intlayer에서 인식되기 위해 `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` 명명 패턴을 따라야 합니다. `.[locale]` 접미사는 선택 사항이며 명명 규칙으로만 사용됩니다.

## 형식 혼합

같은 콘텐츠 키에 대해 두 가지 접근 방식을 혼합할 수 있습니다. 예를 들어:

기본 또는 기본 콘텐츠를 정적으로 선언합니다 (예: `index.content.ts`).

로케일별 콘텐츠를 `index.content.json`, `index.fr.content.ts` 등으로 추가하거나 재정의합니다.

이는 특히 다음과 같은 경우에 유용합니다:

- 코드베이스에서 기본 콘텐츠를 정적으로 선언하고 CMS에서 번역으로 자동 채우기를 원할 때.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### 예제

다음은 다국어 콘텐츠 선언 파일입니다:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "ko": "내 컴포넌트의 제목",
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
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// 결과:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// 결과:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### 자동 번역 생성

[인틀레이어 CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)를 사용하여 선호하는 서비스를 기반으로 누락된 번역을 자동으로 채울 수 있습니다.

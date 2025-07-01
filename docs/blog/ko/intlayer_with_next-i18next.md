---
docName: intlayer_with_next-i18next
url: https://intlayer.org/blog/intlayer-with-next-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/intlayer_with_next-i18next.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Intlayer와 next-i18next
description: Next.js 앱을 위해 next-i18next와 Intlayer를 통합하다
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - 국제화
  - 문서화
  - Next.js
  - JavaScript
  - React
---

# Next.js 국제화 (i18n) with next-i18next 및 Intlayer

both next-i18next와 Intlayer는 Next.js 애플리케이션용으로 설계된 오픈 소스 국제화(i18n) 프레임워크입니다. 이들은 소프트웨어 프로젝트에서 번역, 지역화 및 언어 전환을 관리하는 데 널리 사용됩니다.

두 솔루션은 세 가지 주요 개념을 포함합니다:

1. **콘텐츠 선언**: 애플리케이션의 번역 가능한 콘텐츠를 정의하는 방법입니다.

   - `i18next`의 경우 `resource`라고 명명된 콘텐츠 선언은 하나 이상의 언어로된 번역의 키-값 쌍을 포함하는 구조화된 JSON 객체입니다. 자세한 내용은 [i18next 문서](https://www.i18next.com/translation-function/essentials)를 참조하십시오.
   - `Intlayer`의 경우 `content declaration file`이라고 명명된 콘텐츠 선언은 구조화된 데이터를 내보내는 JSON, JS 또는 TS 파일이 될 수 있습니다. 자세한 내용은 [Intlayer 문서](https://intlayer.org/fr/doc/concept/content)를 참조하십시오.

2. **유틸리티**: `getI18n()`, `useCurrentLocale()`, 또는 `useChangeLocale()`와 같은 애플리케이션 내 콘텐츠 선언을 구축하고 해석하기 위한 도구이며, next-i18next의 경우, `useIntlayer()` 또는 `useLocale()`는 Intlayer를 위한 것입니다.

3. **플러그인 및 미들웨어**: URL 리디렉션 관리, 번들 최적화 등을 위한 기능으로, next-i18next의 경우 `next-i18next/middleware` 또는 Intlayer의 경우 `intlayerMiddleware`가 있습니다.

## Intlayer vs. i18next: 주요 차이점

i18next와 Intlayer의 차이를 알고 싶다면 우리의 [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_next-intl_vs_intlayer.md) 블로그 게시물을 확인하십시오.

## Intlayer로 next-i18next 사전 생성하는 방법

### 왜 next-i18next와 함께 Intlayer를 사용해야 할까요?

Intlayer 콘텐츠 선언 파일은 일반적으로 더 나은 개발자 경험을 제공합니다. 두 가지 주요 이점으로 인해 더 유연하고 유지 관리가 용이합니다:

1. **유연한 배치**: Intlayer 콘텐츠 선언 파일은 애플리케이션의 파일 트리 어디에나 배치할 수 있어 중복되거나 삭제된 구성 요소를 관리하는 것을 단순화하며, 사용되지 않는 콘텐츠 선언을 남기지 않습니다.

   예시 파일 구조:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # 콘텐츠 선언 파일
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # 콘텐츠 선언 파일
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # 콘텐츠 선언 파일
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # 콘텐츠 선언 파일
               └── index.jsx
   ```

2. **중앙 집중식 번역**: Intlayer는 모든 번역을 단일 파일에 저장하여 누락된 번역이 없도록 보장합니다. TypeScript를 사용할 경우, 누락된 번역이 자동으로 검출되어 오류로 보고됩니다.

### 설치

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Intlayer를 구성하여 i18next 사전 내보내기

> i18next 리소스를 내보내는 것은 다른 프레임워크와의 1:1 호환성을 보장하지 않습니다. 문제를 최소화하려면 Intlayer 기반 구성을 유지하는 것이 권장됩니다.

i18next 리소스를 내보내기 위해, `intlayer.config.ts` 파일에서 Intlayer를 구성합니다. 예시 구성:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

여기서는 문서의 나머지 부분의 연속성과 수정을 제공하겠습니다:

---

### i18next 구성에 사전 가져오기

생성된 리소스를 i18next 구성에 가져오려면 `i18next-resources-to-backend`를 사용하십시오. 아래는 예시입니다:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### 콘텐츠 선언

다양한 형식의 콘텐츠 선언 파일 예시:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### next-i18next 리소스 빌드하기

next-i18next 리소스를 빌드하려면 다음 명령어를 실행하십시오:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

이렇게 하면 `./i18next/resources` 디렉토리에 리소스가 생성됩니다. 예상 출력:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

노트: i18next 네임스페이스는 Intlayer 선언 키에 해당합니다.

### Next.js 플러그인 구현

구성이 완료되면 Intlayer 콘텐츠 선언 파일이 업데이트될 때마다 i18next 리소스를 다시 빌드하기 위해 Next.js 플러그인을 구현합니다.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Next.js 컴포넌트에서 콘텐츠 사용하기

Next.js 플러그인을 구현한 후에는 컴포넌트에서 콘텐츠를 사용할 수 있습니다:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

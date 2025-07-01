---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer와 react-i18next
description: React 앱을 위해 react-i18next와 Intlayer를 비교하다
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - 국제화
  - 문서화
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-i18next
---

# React 국제화 (i18n) react-i18next 및 Intlayer와 함께

## 개요

- **Intlayer**는 **구성 요소 수준**의 콘텐츠 선언 파일을 통해 번역 관리를 도와줍니다.
- **react-i18next**는 **i18next**에 대한 인기 있는 React 통합으로, `useTranslation`과 같은 후크를 제공하여 구성 요소에서 지역화된 문자열을 가져옵니다.

결합하면, Intlayer는 **i18next 호환 JSON** 사전을 **내보내기**하므로 react-i18next가 런타임에서 이를 **소비**할 수 있습니다.

## 왜 react-i18next와 함께 Intlayer를 사용해야 할까요?

**Intlayer** 콘텐츠 선언 파일은 다음과 같은 장점으로 더 나은 개발자 경험을 제공합니다.

1. **파일 배치의 유연성**  
   각 콘텐츠 선언 파일을 필요로 하는 구성 요소 바로 옆에 배치하세요. 이 구조는 번역을 함께 보관할 수 있어, 구성 요소가 이동하거나 삭제될 때 고립된 번역이 발생하지 않도록 합니다.

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

2. **중앙 집중식 번역**  
   단일 콘텐츠 선언 파일이 구성 요소에 필요한 모든 번역을 수집하여 누락된 번역을 쉽게 식별할 수 있게 합니다.  
   TypeScript를 사용하면 번역이 누락될 경우 컴파일 타임 오류도 발생합니다.

## 설치

Create React App 프로젝트에서 다음 종속성을 설치하세요:

```bash
# npm으로
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# yarn으로
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# pnpm으로
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### 이 패키지들은 무엇인가요?

- **intlayer** – i18n 구성, 콘텐츠 선언 관리 및 사전 출력을 구축하기 위한 CLI 및 핵심 라이브러리입니다.
- **react-intlayer** – 사전 구축 자동화를 위한 스크립트를 제공하는 Intlayer의 React 전용 통합입니다.
- **react-i18next** – i18next를 위한 React 전용 통합 라이브러리로, `useTranslation` 후크를 포함합니다.
- **i18next** – 번역 처리를 위한 기본 프레임워크입니다.
- **i18next-resources-to-backend** – JSON 리소스를 동적으로 가져오는 i18next 백엔드입니다.

## Intlayer를 구성하여 i18next 사전 내보내기

프로젝트의 최상위에 `intlayer.config.ts`를 생성 (또는 업데이트) 하세요:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // 원하는 만큼의 로케일 추가
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer에 i18next 호환 JSON 생성을 지시
    dictionaryOutput: ["i18next"],

    // 생성된 리소스의 출력 디렉토리 선택
    // 이 폴더는 아직 존재하지 않는 경우 생성됩니다.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **참고**: TypeScript를 사용하지 않는 경우, 이 구성 파일을 `.cjs`, `.mjs` 또는 `.js`로 생성할 수 있습니다 (자세한 내용은 [Intlayer 문서](https://intlayer.org/en/doc/concept/configuration)를 참조하세요).

## i18next 리소스 구축

콘텐츠 선언이 준비된 후 (다음 섹션), **Intlayer 빌드 명령**을 실행하세요:

```bash
# npm으로
npx run intlayer build
```

```bash
# yarn으로
yarn intlayer build
```

```bash
# pnpm으로
pnpm intlayer build
```

> 이렇게 하면 기본적으로 `./i18next/resources` 디렉토리에 i18next 리소스가 생성됩니다.

일반적인 출력 예시는 다음과 같습니다:

```bash
.
└── i18next
    └── resources
       ├── ko
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

각 **Intlayer** 선언 키는 **i18next 네임스페이스**로 사용됩니다 (예: `my-content.json`).

## react-i18next 구성에 사전을 가져오기

런타임에서 이러한 리소스를 동적으로 로드하려면 [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend)를 사용하세요. 예를 들어, 프로젝트에 `i18n.ts` (또는 `.js`) 파일을 생성하세요:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // react-i18next 플러그인
  .use(initReactI18next)
  // 동적으로 리소스 로드
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // 리소스 디렉토리에 대한 가져오기 경로 조정
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // i18next 초기화
  .init({
    // 폴백 로케일
    fallbackLng: "en",

    // 여기에서 기타 i18next 구성 옵션을 추가할 수 있습니다. 참조:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "en",
  });

export default i18next;
```

그런 다음 **루트** 또는 **인덱스** 파일 (예: `src/index.tsx`)에서 `App`을 렌더링하기 전에 이 `i18n` 설정을 가져옵니다:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// 아무것도 하기 전에 i18n 초기화
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 콘텐츠 선언 작성 및 관리

Intlayer는 `./src` 아래에 위치한 "콘텐츠 선언 파일"에서 번역을 추출합니다 (기본값).  
여기 TypeScript의 최소 예시가 있습니다:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key"는 당신의 i18next 네임스페이스가 됩니다 (예: "my-component")
  key: "my-component",
  content: {
    // 각 "t" 호출은 별개의 번역 노드입니다
    heading: t({
      ko: "안녕하세요 세계",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      ko: "내 i18n 설명 텍스트...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

JSON, `.cjs` 또는 `.mjs`를 선호하는 경우 [Intlayer 문서](https://intlayer.org/en/doc/concept/content)를 참조하세요.

> 기본적으로 유효한 콘텐츠 선언은 파일 확장자 패턴과 일치합니다:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## React 구성 요소에서 번역 사용하기

Intlayer 리소스를 **구축**하고 react-i18next를 구성한 후, **react-i18next**에서 `useTranslation` 후크를 직접 사용할 수 있습니다.  
예를 들면:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * i18next "네임스페이스"는 "MyComponent.content.ts"의 Intlayer `key`입니다
 * 따라서 "my-component"를 useTranslation()에 전달하겠습니다.
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> `t` 함수는 생성된 JSON 내부의 **키**를 참조한다는 점에 유의하세요. Intlayer 콘텐츠 항목 이름이 `heading`인 경우, `t("heading")`을 사용합니다.

## 선택 사항: Create React App 스크립트와 통합 (CRACO)

**react-intlayer**는 사용자 정의 빌드 및 개발 서버 구성을 위한 CRACO 기반 접근 방식을 제공합니다. Intlayer의 빌드 단계를 원활하게 통합하고 싶다면:

1. **react-intlayer 설치** (아직 설치하지 않았다면):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **`package.json` 스크립트를 조정**하여 `react-intlayer` 스크립트를 사용하세요:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > `react-intlayer` 스크립트는 [CRACO](https://craco.js.org/)를 기반으로 합니다. 또한 intlayer craco 플러그인을 기반으로 한 자신의 설정을 구현할 수 있습니다. [여기에서 예시 확인](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

이제 `npm run build`, `yarn build` 또는 `pnpm build`를 실행하면 Intlayer와 CRA 빌드를 모두 트리거할 수 있습니다.

## TypeScript 구성

**Intlayer**는 콘텐츠에 대한 **자동 생성된 타입 정의**를 제공합니다. TypeScript가 이를 인식하도록 하려면, **`types`** (또는 다르게 구성한 경우 `types`)를 `tsconfig.json` **include** 배열에 추가하세요:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> 이렇게 하면 TypeScript가 번역의 형식을 추론하여 더 나은 자동 완성과 오류 감지를 제공합니다.

## Git 구성

자동 생성된 파일과 폴더를 Intlayer에서 **무시하는 것이 좋습니다**. 다음 줄을 `.gitignore`에 추가하세요:

```plaintext
# Intlayer에 의해 생성된 파일 무시
.intlayer
i18next
```

이러한 리소스나 `.intlayer` 내부 빌드 아티팩트를 커밋하지 않는 것이 일반적입니다, 왜냐하면 이들은 매 빌드마다 재생성될 수 있기 때문입니다.

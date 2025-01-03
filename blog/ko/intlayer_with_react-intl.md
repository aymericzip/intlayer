# React 국제화 (i18n) with **react-intl** and Intlayer

이 가이드는 **Intlayer**와 **react-intl**을 통합하여 React 애플리케이션에서 번역을 관리하는 방법을 보여줍니다. Intlayer로 귀하의 번역 가능한 콘텐츠를 선언하고, 그 메시지를 **react-intl**, [FormatJS](https://formatjs.io/docs/react-intl) 생태계의 인기 라이브러리로 소비합니다.

## 개요

- **Intlayer**는 프로젝트 내에서 **컴포넌트 수준** 콘텐츠 선언 파일(JSON, JS, TS 등)에 번역을 저장할 수 있습니다.
- **react-intl**은 로컬화된 문자열을 표시하기 위해 React 컴포넌트 및 훅(예: `<FormattedMessage>` 및 `useIntl()`)을 제공합니다.

Intlayer를 구성하여 **react-intl과 호환되는** 형식으로 번역을 **내보내기**하면, `<IntlProvider>`(react-intl의 컴포넌트)가 필요로 하는 메시지 파일을 자동으로 **생성**하고 **업데이트**할 수 있습니다.

---

## Why Use Intlayer with react-intl?

1. **컴포넌트별 콘텐츠 선언**  
   Intlayer 콘텐츠 선언 파일은 React 컴포넌트와 함께 존재할 수 있어, 컴포넌트가 이동하거나 제거될 경우 “고아” 번역을 방지합니다. 예를 들어:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Intlayer 콘텐츠 선언
               └── index.tsx          # React 컴포넌트
   ```

2. **중앙 집중식 번역**  
   각 콘텐츠 선언 파일은 컴포넌트에 필요한 모든 번역을 수집합니다. 이는 TypeScript 프로젝트에서 특히 유용합니다: 누락된 번역은 **컴파일 시간**에 포착될 수 있습니다.

3. **자동 빌드 및 재생성**  
   번역을 추가하거나 업데이트할 때마다 Intlayer는 메시지 JSON 파일을 재생성합니다. 그런 다음 이를 react-intl의 `<IntlProvider>`에 전달할 수 있습니다.

---

## 설치

전형적인 React 프로젝트에서 다음을 설치합니다:

```bash
# npm으로
npm install intlayer react-intl

# yarn으로
yarn add intlayer react-intl

# pnpm으로
pnpm add intlayer react-intl
```

### 이러한 패키지가 필요한 이유?

- **intlayer**: 콘텐츠 선언을 검색하고, 이를 병합하며, 사전 출력을 빌드하는 핵심 CLI 및 라이브러리입니다.
- **react-intl**: `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` 및 기타 국제화 원시 요소를 제공하는 FormatJS의 주요 라이브러리입니다.

> React가 이미 설치되어 있지 않다면, 이를 설치해야 합니다 (`react`와 `react-dom`).

## Intlayer에 react-intl 메시지를 내보내도록 구성하기

프로젝트의 루트에 **`intlayer.config.ts`** (또는 `.js`, `.mjs`, `.cjs`)를 다음과 같이 생성합니다:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // 원하는 만큼 로케일을 추가하세요
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Intlayer에 react-intl용 메시지 파일을 생성하라고 지시합니다.
    dictionaryOutput: ["react-intl"],

    // Intlayer가 메시지 JSON 파일을 쓸 디렉토리
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **참고**: 다른 파일 확장자(`.mjs`, `.cjs`, `.js`)에 대한 사용 세부정보는 [Intlayer 문서](https://intlayer.org/ko/doc/concept/configuration)에서 확인하세요.

---

## Intlayer 콘텐츠 선언 생성하기

Intlayer는 코드베이스를 스캔하여(기본적으로 `./src` 아래에서) `*.content.{ts,tsx,js,jsx,mjs,cjs,json}`와 일치하는 파일을 찾습니다.  
다음은 **TypeScript** 예제입니다:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type DeclarationContent } from "intlayer";

const content = {
  // "key"는 react-intl JSON 파일의 최상위 메시지 키가 됩니다.
  key: "my-component",

  content: {
    // t()를 호출할 때마다 번역 가능한 필드를 선언합니다.
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies DeclarationContent;

export default content;
```

JSON이나 다양한 JS 유형(`.cjs`, `.mjs`)을 선호하는 경우, 구조는 대부분 동일합니다 – [Intlayer 문서의 콘텐츠 선언](https://intlayer.org/ko/doc/concept/content)에서 확인하세요.

---

## react-intl 메시지 빌드하기

**react-intl**에 대한 실제 메시지 JSON 파일을 생성하려면 다음을 실행합니다:

```bash
# npm으로
npx intlayer build

# yarn으로
yarn intlayer build

# pnpm으로
pnpm intlayer build
```

이 명령은 모든 `*.content.*` 파일을 스캔하고, 이를 컴파일하며, 결과를 **`intlayer.config.ts`**에서 지정한 디렉토리(이번 예제에서는 `./react-intl/messages`)에 씁니다.  
일반적인 출력 예시는 다음과 같을 수 있습니다:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

각 파일은 **최상위 키**가 각 **`content.key`**에 해당하는 JSON 객체입니다. **하위 키**(예: `helloWorld`)는 해당 콘텐츠 항목 내에 선언된 번역을 반영합니다.

예를 들어, **en.json**은 다음과 같을 수 있습니다:

```json
{
  "my-component": {
    "helloWorld": "Hello World",
    "description": "This is a description"
  }
}
```

---

## Your React App에서 react-intl 초기화하기

### 1. 생성된 메시지 로드하기

앱의 루트 컴포넌트를 구성하는 곳(예: `src/main.tsx` 또는 `src/index.tsx`)에서 다음을 수행해야 합니다:

1. 생성된 메시지 파일을 **가져옵니다** (정적으로 또는 동적으로).
2. 이들을 `react-intl`의 `<IntlProvider>`에 **제공합니다**.

간단한 접근법은 정적으로 가져오는 것입니다:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// 빌드 출력에서 JSON 파일을 가져옵니다.
// 또는 사용자가 선택한 로케일에 따라 동적으로 가져올 수 있습니다.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// 사용자의 언어를 감지하는 메커니즘이 있다면, 여기서 설정하세요.
// 간단하게 영어를 선택해 보겠습니다.
const locale = "en";

// 메시지를 객체에 수집합니다 (또는 동적으로 선택할 수 있습니다)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **팁**: 실제 프로젝트에서는:
>
> - 런타임에 JSON 메시지를 동적으로 로드할 수 있습니다.
> - 환경 기반, 브라우저 기반 또는 사용자 계정 기반의 로케일 감지를 사용할 수 있습니다.

### 2. `<FormattedMessage>` 또는 `useIntl()` 사용하기

메시지가 `<IntlProvider>`에 로드되면, 자식 컴포넌트는 react-intl을 사용하여 로컬화된 문자열에 접근할 수 있습니다. 두 가지 주요 접근 방식이 있습니다:

- **`<FormattedMessage>`** 컴포넌트
- **`useIntl()`** 훅

---

## React 컴포넌트에서 번역 사용하기

### 접근법 A: `<FormattedMessage>`

빠른 인라인 사용을 위해:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld”은 en.json, fr.json 등에서 키를 참조합니다. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> `<FormattedMessage>`의 **`id`** 속성은 **최상위 키**(`my-component`)와 모든 하위 키(`helloWorld`)를 일치시켜야 합니다.

### 접근법 B: `useIntl()`

더 동적인 사용을 위해:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

어느 접근 방식이나 유효합니다 — 애플리케이션에 가장 적합한 스타일을 선택하세요.

---

## 새로운 번역 업데이트 또는 추가하기

1. 모든 `*.content.*` 파일에서 콘텐츠를 **추가 또는 수정**합니다.
2. `intlayer build`를 다시 실행하여 `./react-intl/messages` 아래에 JSON 파일을 재생성합니다.
3. React(및 react-intl)는 애플리케이션을 다음에 빌드하거나 다시 로드할 때 업데이트를 감지합니다.

---

## TypeScript 통합 (선택 사항)

TypeScript를 사용하는 경우, Intlayer는 번역에 대한 **타입 정의**를 생성할 수 있습니다.

- `tsconfig.json`에 Intlayer가 생성하는 `types` 폴더(또는 출력 폴더)를 `"include"` 배열에 포함시킵니다.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

생성된 타입은 React 컴포넌트에서 누락된 번역이나 잘못된 키를 컴파일 시간에 감지하는 데 도움을 줄 수 있습니다.

---

## Git 구성

Intlayer의 내부 빌드 아티팩트를 버전 관리에서 **제외**하는 것이 일반적입니다. `.gitignore`에 다음을 추가하세요:

```plaintext
# intlayer 빌드 아티팩트 무시
.intlayer
react-intl
```

작업 흐름에 따라 `./react-intl/messages`의 최종 사전을 무시하거나 커밋할 수 있습니다. CI/CD 파이프라인이 그것들을 재생성하는 경우, 안전하게 무시할 수 있으며; 그렇지 않으면, 프로덕션 배포에 필요하다면 커밋할 수 있습니다.

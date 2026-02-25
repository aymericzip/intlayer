---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite 및 React i18n - 기존 앱을 다국어 앱으로 변환하기 (i18n 가이드 2026)
description: Intlayer 컴파일러를 사용하여 기존 Vite 및 React 애플리케이션을 다국어화하는 방법을 알아보세요. 문서를 따라 국제화(i18n)를 수행하고 AI로 번역하세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - 컴파일러
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: 초기 릴리스
---

# 기존 Vite 및 React 애플리케이션을 나중에 다국어(i18n)로 만드는 방법 (i18n 가이드 2026)

<Tabs defaultTab="video">
  <Tab label="비디오" value="video">
  
<iframe title="Vite와 React를 위한 최고의 i18n 솔루션? Intlayer 알아보기" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="코드" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-vite-react-template)을 확인하세요.

## 목차

<TOC/>

## 왜 기존 애플리케이션을 국제화하는 것이 어려울까요?

단 하나의 언어만 고려하여 빌드된 앱에 여러 언어를 추가하려고 시도해 본 적이 있다면 그 고통을 아실 것입니다. 단순히 "어려운" 것이 아니라 지루합니다. 모든 파일을 샅샅이 뒤져 모든 텍스트 문자열을 찾아내고 이를 별도의 사전 파일로 옮겨야 합니다.

그다음 위험한 단계가 옵니다. 레이아웃이나 로직을 깨뜨리지 않고 모든 텍스트를 코드 훅으로 교체하는 것입니다. 이는 몇 주 동안 새로운 기능 개발을 중단시키고 끝없는 리팩토링처럼 느껴지는 작업입니다.

## Intlayer 컴파일러란 무엇인가요?

**Intlayer 컴파일러**는 이러한 수동 작업을 건너뛰기 위해 만들어졌습니다. 사용자가 직접 문자열을 추출하는 대신 컴파일러가 대신 해줍니다. 코드를 스캔하고 텍스트를 찾아 AI를 사용하여 백그라운드에서 사전을 생성합니다.
그런 다음 빌드 중에 코드를 수정하여 필요한 i18n 훅을 주입합니다. 기본적으로 앱을 단일 언어인 것처럼 계속 작성하면 컴파일러가 다국어 변환을 자동으로 처리합니다.

> 컴파일러 문서: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)

### 제한 사항

컴파일러는 **컴파일 타임**에 코드 분석 및 변환(훅 삽입 및 사전 생성)을 수행하므로 애플리케이션의 **빌드 프로세스가 느려질 수 있습니다**.

개발 중 이러한 영향을 완화하기 위해 컴파일러를 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md) 모드로 실행하도록 구성하거나 필요하지 않을 때 비활성화할 수 있습니다.

---

## Vite 및 React 애플리케이션에서 Intlayer를 설정하기 위한 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 프로바이더와 훅을 제공합니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.KOREAN],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // 개발 모드에서의 영향을 제한하기 위해 'build-only'로 설정 가능
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 접두사 comp- 없음
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "이 앱은 지도 앱입니다", // 참고: 앱 설명을 사용자 정의할 수 있습니다.
  },
};

export default config;
```

> **참고**: 환경 변수에 `OPEN_AI_API_KEY`가 설정되어 있는지 확인하세요.

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔의 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합

구성 파일에 intlayer 플러그인을 추가합니다.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭(alias)을 제공합니다.

> `intlayerCompiler()` Vite 플러그인은 컴포넌트에서 콘텐츠를 추출하고 `.content` 파일을 작성하는 데 사용됩니다.

### 4단계: 코드 컴파일

기본 로케일로 하드코딩된 문자열을 사용하여 컴포넌트를 작성하기만 하면 됩니다. 나머지는 컴파일러가 처리합니다.

페이지의 예시는 다음과 같습니다:

<Tabs>
 <Tab value="코드">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="출력">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      ko: {
        viteLogo: "Vite 로고",
        reactLogo: "React 로고",
        title: "Vite + React",
        countButton: "현재 카운트:",
        editMessage: "수정",
        hmrMessage: "후 저장하여 HMR을 테스트하세요",
        readTheDocs: "자세한 내용은 Vite 및 React 로고를 클릭하세요",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`**는 중첩된 컴포넌트에 로케일을 제공하는 데 사용됩니다.

### (선택 사항) 6단계: 콘텐츠 언어 변경

콘텐츠 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수를 사용하면 애플리케이션의 로케일을 설정하고 그에 따라 콘텐츠를 업데이트할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.KOREAN)}>
      언어를 한국어로 변경
    </button>
  );
};
```

> `useLocale` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 좋습니다. 이렇게 하면 Git 저장소에 커밋되는 것을 방지할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

### 더 알아보기

더 나아가 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

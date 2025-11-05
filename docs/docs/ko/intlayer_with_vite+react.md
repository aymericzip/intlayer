---
createdAt: 2024-03-07
updatedAt: 2024-03-07
title: Vite and React 앱 번역하는 방법 – i18n 가이드 2025
description: Intlayer를 사용하여 Vite 및 React 애플리케이션에 국제화(i18n)를 추가하는 방법을 배우세요. 이 가이드를 따라 앱을 다국어로 만드세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - i18n
  - 자바스크립트
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4---
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# Intlayer로 Vite 및 React 번역하기 | 국제화(i18n)

## 목차

<TOC/>

<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-vite-react-template)을 참조하세요.

## Intlayer란?

**Intlayer**는 최신 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여** 번역을 쉽게 관리할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능**을 활용할 수 있습니다.

---

## Vite 및 React 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지로, React 국제화를 위한 컨텍스트 프로바이더와 훅을 제공합니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과, 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위해 설정 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일들
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합하기

intlayer 플러그인을 구성에 추가하세요.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 추가로, 성능 최적화를 위한 별칭(alias)도 제공합니다.

### 4단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          <code>src/App.tsx</code>를 편집하고 저장하여 HMR을 테스트하세요
        </>
      ),
      fr: (
        <>
          HMR을 테스트하려면 <code>src/App.tsx</code>를 편집하고 저장하세요
        </>
      ),
      es: (
        <>
          HMR을 테스트하려면 <code>src/App.tsx</code>를 편집하고 저장하세요
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // 콘텐츠에 React 노드를 사용하는 경우 React를 반드시 import하세요
        en: (
          <>
            Edit <code>src/App.tsx</code> 파일을 수정하고 저장하여 HMR을
            테스트하세요
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // 콘텐츠에 React 노드를 사용하는 경우 React를 임포트하는 것을 잊지 마세요
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      ko: "Vite 및 React 로고를 클릭하여 자세히 알아보세요",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "ko": "Vite 로고"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "ko": "리액트 로고"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "ko": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "ko": "카운트는 "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "ko": "src/App.tsx를 편집하고 저장하여 HMR을 테스트하세요"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ko": "더 알아보려면 Vite 및 React 로고를 클릭하세요",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> 애플리케이션 내 어디에서든 `contentDir` 디렉토리(기본값: `./src`)에 포함되면 콘텐츠 선언을 정의할 수 있습니다. 그리고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

> 콘텐츠 파일에 TSX 코드가 포함된 경우, 콘텐츠 파일에 `import React from "react";`를 가져오는 것을 고려해야 합니다.

### 5단계: 코드에서 Intlayer 사용하기

애플리케이션 전반에서 콘텐츠 사전을 접근하세요:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

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
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
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

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

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
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

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
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면, 함수의 값을 호출해야 합니다. 예를 들어:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

### (선택 사항) 6단계: 콘텐츠의 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 그에 따라 콘텐츠를 업데이트할 수 있게 해줍니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>영어로 언어 변경</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>영어로 언어 변경</button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>영어로 언어 변경</button>
  );
};
```

> `useLocale` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

### (선택 사항) 7단계: 애플리케이션에 지역화된 라우팅 추가하기

이 단계의 목적은 각 언어별로 고유한 라우트를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다.
예시:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 기본적으로, 기본 로케일에 대해서는 경로에 접두사가 붙지 않습니다. 기본 로케일에 접두사를 붙이고 싶다면, 구성 설정에서 `middleware.prefixDefault` 옵션을 `true`로 설정할 수 있습니다. 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

애플리케이션에 지역화된 라우팅을 추가하려면, 애플리케이션의 라우트를 감싸고 로케일 기반 라우팅을 처리하는 `LocaleRouter` 컴포넌트를 생성할 수 있습니다. 다음은 [React Router](https://reactrouter.com/home)를 사용한 예제입니다:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 필요한 의존성과 함수들을 임포트합니다
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'에서 제공하는 유틸리티 함수 및 타입
import type { FC, PropsWithChildren } from "react"; // 함수형 컴포넌트 및 props 타입
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 프로바이더
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 네비게이션 관리를 위한 라우터 컴포넌트

// Intlayer에서 설정값 구조 분해 할당
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 로컬라이제이션을 처리하고 자식 컴포넌트를 적절한 로케일 컨텍스트로 감싸는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 검증을 관리합니다.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 현재 URL 경로를 가져옵니다.

  // 현재 로케일을 결정하며, 제공되지 않은 경우 기본 로케일로 대체합니다.
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 만듭니다.
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우, 기본 로케일은 항상 접두사로 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 업데이트된 경로와 함께 기본 로케일로 리다이렉트합니다.
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 현재 기록 항목을 새 항목으로 교체합니다
        />
      );
    }

    // 자식 컴포넌트를 IntlayerProvider로 감싸고 현재 로케일을 설정합니다
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 때, 기본 로케일은 접두사가 붙지 않습니다.
     * 현재 로케일이 유효하며 기본 로케일이 아님을 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인
    ) {
      // 로케일 접두어가 없는 경로로 리디렉션
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // IntlayerProvider로 자식 컴포넌트를 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * React Router를 사용하여 내비게이션을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // 로케일을 캡처하는 경로 패턴 (예: /en/, /fr/) 및 이후 모든 경로와 매칭
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 로케일 관리를 위해 children을 래핑
          />
        ))}

      {
        // 기본 로케일 접두어 사용이 비활성화된 경우, 루트 경로에서 직접 children을 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 로케일 관리를 위해 children을 래핑
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 필요한 의존성과 함수들을 임포트합니다.
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'에서 제공하는 유틸리티 함수와 타입
// 'intlayer'에서 제공하는 유틸리티 함수와 타입
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 프로바이더
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 네비게이션 관리를 위한 라우터 컴포넌트들

// Intlayer에서 설정을 구조 분해 할당합니다.
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 로컬라이제이션을 처리하고 자식 컴포넌트를 적절한 로케일 컨텍스트로 감싸는 컴포넌트입니다.
/**
 * URL 기반 로케일 감지 및 검증을 관리합니다.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 현재 URL 경로를 가져옵니다.

  // 현재 로케일을 결정하며, 제공되지 않은 경우 기본 로케일로 대체합니다.
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 구성합니다.
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우, 기본 로케일은 항상 접두사로 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일을 검증합니다.
    if (!locale || !locales.includes(locale)) {
      // 업데이트된 경로와 함께 기본 로케일로 리다이렉트합니다.
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 현재 기록 항목을 새 항목으로 교체합니다
        />
      );
    }

    // 자식 컴포넌트를 IntlayerProvider로 감싸고 현재 로케일을 설정합니다
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 때, 기본 로케일은 접두사가 붙지 않습니다.
     * 현재 로케일이 유효하며 기본 로케일이 아님을 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인
    ) {
      // 로케일 접두사가 없는 경로로 리디렉션
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // IntlayerProvider로 자식 컴포넌트를 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * React Router를 사용하여 내비게이션을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // 로케일을 캡처하는 라우트 패턴 (예: /en/, /fr/) 및 이후 모든 경로와 매칭
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 자식 컴포넌트를 로케일 관리로 감쌈
          />
        ))}

      {
        // 기본 로케일 접두어 사용이 비활성화된 경우, 루트 경로에서 자식 컴포넌트를 직접 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 자식 컴포넌트를 로케일 관리로 감쌈
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 필요한 종속성과 함수들을 가져옵니다.
const { configuration, getPathWithoutLocale } = require("intlayer"); // 'intlayer'에서 제공하는 유틸리티 함수 및 타입
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 국제화 컨텍스트를 위한 프로바이더
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // 내비게이션 관리를 위한 라우터 컴포넌트

// Intlayer에서 설정을 구조 분해 할당합니다.
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 로컬라이제이션을 처리하고 자식 컴포넌트를 적절한 로케일 컨텍스트로 감싸는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 검증을 관리합니다.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 현재 URL 경로를 가져옵니다.

  // 현재 로케일을 결정하며, 제공되지 않은 경우 기본 로케일로 대체합니다.
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 만듭니다.
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우, 기본 로케일은 항상 접두사로 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일을 검증합니다.
    if (!locale || !locales.includes(locale)) {
      // 업데이트된 경로와 함께 기본 로케일로 리다이렉트합니다.
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 현재 기록 항목을 새 항목으로 교체
        />
      );
    }

    // 자식 컴포넌트를 IntlayerProvider로 감싸고 현재 로케일을 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 때, 기본 로케일은 접두사가 붙지 않습니다.
     * 현재 로케일이 유효하며 기본 로케일이 아님을 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 포함되어 있는지 확인
    ) {
      // 로케일 접두사가 없는 경로로 리디렉션합니다.
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 자식 컴포넌트를 IntlayerProvider로 감싸고 현재 로케일을 설정합니다.
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * React Router를 사용하여 내비게이션을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // 로케일을 캡처하는 경로 패턴 (예: /en/, /fr/) 및 이후 모든 경로와 매칭합니다.
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 자식 컴포넌트를 로케일 관리로 감쌈
          />
        ))}

      {
        // 기본 로케일 접두어 사용이 비활성화된 경우, 루트 경로에서 자식 컴포넌트를 직접 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 자식 컴포넌트를 로케일 관리로 감쌈
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

그런 다음, 애플리케이션에서 `LocaleRouter` 컴포넌트를 사용할 수 있습니다:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... 여러분의 AppContent 컴포넌트

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... 여러분의 AppContent 컴포넌트

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... 여러분의 AppContent 컴포넌트

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

병행하여, `intlayerMiddleware`을 사용하여 애플리케이션에 서버 사이드 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 플러그인은 사용자의 브라우저 언어 설정을 기반으로 가장 적합한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerMiddleware()],
});
```

### (선택 사항) 8단계: 로케일이 변경될 때 URL 변경하기

로케일이 변경될 때 URL을 변경하려면, `useLocale` 훅에서 제공하는 `onLocaleChange` 속성을 사용할 수 있습니다. 동시에, `react-router-dom`의 `useLocation`과 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // 현재 URL 경로를 가져옵니다. 예: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 업데이트된 로케일로 URL을 구성합니다
      // 예: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL 경로를 업데이트합니다
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일에서의 언어명 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서의 언어명 - 예: Francés (현재 로케일이 Locales.SPANISH일 때) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // 현재 URL 경로를 가져옵니다. 예: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 업데이트된 로케일로 URL을 구성합니다.
      // 예: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL 경로를 업데이트합니다.
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서의 언어 - 예: Locales.SPANISH로 설정된 현재 로케일에서 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // 현재 URL 경로를 가져옵니다. 예: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // 업데이트된 로케일로 URL을 구성합니다.
      // 예: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // URL 경로를 업데이트합니다.
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로케일의 언어명 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서의 언어명 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 된 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> 문서 참고:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current)

아래는 추가 설명과 개선된 코드 예제가 포함된 업데이트된 **9단계**입니다:

---

### (선택 사항) 9단계: HTML의 언어 및 방향 속성 변경

애플리케이션이 다국어를 지원할 때, 현재 로케일에 맞게 `<html>` 태그의 `lang` 및 `dir` 속성을 업데이트하는 것이 매우 중요합니다. 이렇게 하면 다음을 보장할 수 있습니다:

- **접근성**: 화면 낭독기 및 보조 기술은 올바른 `lang` 속성에 의존하여 콘텐츠를 정확하게 발음하고 해석합니다.
- **텍스트 렌더링**: `dir`(방향) 속성은 텍스트가 올바른 순서로 렌더링되도록 보장합니다(예: 영어는 왼쪽에서 오른쪽으로, 아랍어나 히브리어는 오른쪽에서 왼쪽으로), 이는 가독성에 필수적입니다.
- **SEO**: 검색 엔진은 `lang` 속성을 사용하여 페이지의 언어를 판단하고, 검색 결과에서 적절한 현지화된 콘텐츠를 제공하는 데 도움을 줍니다.

로케일이 변경될 때 이러한 속성을 동적으로 업데이트하면, 지원되는 모든 언어에서 사용자에게 일관되고 접근 가능한 경험을 보장할 수 있습니다.

#### 훅 구현하기

HTML 속성을 관리하는 커스텀 훅을 만듭니다. 이 훅은 로케일 변경을 감지하여 속성을 적절히 업데이트합니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 * - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서(예: 영어는 'ltr', 아랍어는 'rtl')를 보장합니다.
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 현재 로케일로 언어 속성을 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일에 따라 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 * - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서(예: 영어는 'ltr', 아랍어는 'rtl')를 보장합니다.
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 현재 로케일로 언어 속성을 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일에 따라 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 * - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서 보장을 위해 설정합니다 (예: 영어는 'ltr', 아랍어는 'rtl').
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 현재 로케일에 맞게 언어 속성을 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일에 따라 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### 애플리케이션에서 훅 사용하기

로케일이 변경될 때마다 HTML 속성이 업데이트되도록 훅을 메인 컴포넌트에 통합하세요:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // 로케일에 따라 <html> 태그의 lang과 dir 속성을 업데이트하기 위해 훅을 적용합니다.
  useI18nHTMLAttributes();

  // ... 컴포넌트의 나머지 부분
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // 로케일에 따라 <html> 태그의 lang 및 dir 속성을 업데이트하기 위해 훅을 적용합니다.
  useI18nHTMLAttributes();

  // ... 나머지 컴포넌트 내용
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // 로케일에 따라 <html> 태그의 lang 및 dir 속성을 업데이트하기 위해 훅을 적용합니다.
  useI18nHTMLAttributes();

  // ... 컴포넌트의 나머지 부분
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

이 변경 사항을 적용하면 애플리케이션은 다음을 보장합니다:

- 현재 로케일을 올바르게 반영하는 **언어**(`lang`) 속성으로 SEO 및 브라우저 동작에 중요합니다.
- 로케일에 따라 **텍스트 방향**(`dir`)을 조정하여, 서로 다른 읽기 순서를 가진 언어에 대해 가독성과 사용성을 향상시킵니다.
- 보조 기술이 이러한 속성에 의존하므로 더 **접근성 높은** 경험을 제공합니다.

### (선택 사항) 10단계: 지역화된 링크 컴포넌트 만들기

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 커스텀 `Link` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 내부 URL에 자동으로 현재 언어 접두사를 붙여줍니다. 예를 들어, 프랑스어 사용자가 "About" 페이지로 가는 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 지역화된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하도록 돕고, 사용자가 선호하는 언어로 된 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에 걸쳐 지역화된 링크를 사용함으로써 내비게이션이 현재 로케일 내에서 유지되어 예기치 않은 언어 전환을 방지합니다.
- **유지보수성**: 로컬라이제이션 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화하여 애플리케이션이 성장함에 따라 코드베이스를 더 쉽게 유지보수하고 확장할 수 있습니다.

아래는 TypeScript로 구현한 로컬라이즈된 `Link` 컴포넌트입니다:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주합니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL 앞에 로케일을 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 링크가 내부 링크이고 유효한 href가 제공된 경우, 로케일이 적용된 URL을 가져옵니다.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주합니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL 앞에 로케일 접두사를 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 링크가 내부 링크이고 유효한 href가 제공된 경우, 지역화된 URL을 가져옵니다.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주합니다.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL 앞에 로케일을 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 이루어지도록 보장합니다.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 링크가 내부 링크이고 유효한 href가 제공된 경우, 로컬라이즈된 URL을 가져옵니다.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### 작동 원리

- **외부 링크 감지**:  
  헬퍼 함수 `checkIsExternalLink`는 URL이 외부 링크인지 여부를 판단합니다. 외부 링크는 현지화가 필요 없으므로 변경하지 않습니다.

- **현재 로케일 가져오기**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.

- **URL 현지화**:  
  내부 링크(즉, 외부 링크가 아닌 경우)에 대해 `getLocalizedUrl`을 사용하여 URL 앞에 현재 로케일을 자동으로 붙입니다. 예를 들어 사용자가 프랑스어 로케일에 있다면, `href`에 `/about`을 전달하면 `/fr/about`로 변환됩니다.

- **링크 반환**:  
  컴포넌트는 지역화된 URL을 가진 `<a>` 요소를 반환하여, 내비게이션이 현재 로케일과 일치하도록 보장합니다.

이 `Link` 컴포넌트를 애플리케이션 전반에 통합함으로써, 일관되고 언어 인식이 가능한 사용자 경험을 유지할 수 있으며, SEO 및 사용성 향상에도 도움이 됩니다.

### TypeScript 구성

Intlayer는 모듈 확장을 사용하여 TypeScript의 이점을 활용하고 코드베이스를 더욱 견고하게 만듭니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer가 생성한 파일들은 Git 저장소에 커밋하지 않도록 무시하는 것이 권장됩니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer로 Vite and React 번역하기 | 국제화(i18n)
.intlayer
```

### VS Code 확장 프로그램

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- **실시간 오류 감지**로 누락된 번역을 확인할 수 있습니다.
- **인라인 미리보기**를 통해 번역된 내용을 바로 확인할 수 있습니다.
- **빠른 작업**으로 번역을 쉽게 생성하고 업데이트할 수 있습니다.

확장 기능 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

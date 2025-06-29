---
docName: intlayer_with_react_native_and_expo
url: https://intlayer.org/doc/environment/react-native-and-expo
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md
createdAt: 2025-03-07
updatedAt: 2025-06-29
title: React Native와 Expo의 모바일 앱을 번역하십시오 (i18n)
description: React Native와 Expo를 사용하여 Page Router 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n)하고 번역하려면 문서를 따르세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - React
  - React Native
  - JavaScript
---

# Intlayer와 Vite 및 React를 사용한 국제화(i18n) 시작하기

<iframe title="Vite + React: Build a Multilingual App from Scratch using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

[애플리케이션 템플릿](https://github.com/aymericzip/intlayer-vite-react-template)를 GitHub에서 보십시오.

## Intlayer란 무엇인가?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**합니다.
- **메타데이터, 경로 및 콘텐츠를 동적으로 로컬라이즈**합니다.
- **TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 활용할 수 있습니다.

---

## Vite 및 React 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

- **vite-intlayer**
  [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 Intlayer를 통합하기 위한 Vite 플러그인을 포함하며, 사용자의 선호 로케일을 감지하고, 쿠키를 관리하며, URL 리디렉션을 처리하는 미들웨어를 제공합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일 추가
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
      // 다른 로케일 추가
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
      // 다른 로케일 추가
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합

구성에 Intlayer 플러그인을 추가합니다.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이는 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 별칭을 제공합니다.

### 4단계: 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

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
      ko: "Vite 로고",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      ko: "React 로고",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ko: "카운트는 ",
    }),

    edit: t<ReactNode>({
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
      ko: (
        <>
          <code>src/App.tsx</code>를 편집하고 저장하여 HMR을 테스트하세요
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      ko: "Vite 및 React 로고를 클릭하여 자세히 알아보세요",
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
      ko: "Vite 로고",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      ko: "React 로고",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ko: "카운트는 ",
    }),

    edit:
      t <
      ReactNode >
      {
        // React 노드를 콘텐츠에 사용할 경우 React를 가져오는 것을 잊지 마세요
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
        ko: (
          <>
            <code>src/App.tsx</code>를 편집하고 저장하여 HMR을 테스트하세요
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
      ko: "Vite 로고",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      ko: "React 로고",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ko: "카운트는 ",
    }),
---

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
        "ko": "React 로고"
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
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "ko": "Vite 및 React 로고를 클릭하여 자세히 알아보세요"
      }
    }
  }
}
```

> 콘텐츠 선언은 애플리케이션의 어디에서든 정의할 수 있으며, `contentDir` 디렉토리(기본값: `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

> 콘텐츠 파일에 TSX 코드가 포함된 경우, `import React from "react";`를 콘텐츠 파일에 가져오는 것을 고려해야 합니다.

### 5단계: 코드에서 Intlayer 활용하기

애플리케이션 전반에서 콘텐츠 사전을 액세스하세요:

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

> `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면, 함수의 값을 호출해야 합니다:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

### (선택 사항) 6단계: 콘텐츠 언어 변경하기

콘텐츠 언어를 변경하려면, `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 업데이트합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      언어를 영어로 변경
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      언어를 영어로 변경
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");

const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      언어를 영어로 변경
    </button>
  );
};
```

> `useLocale` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

### (선택 사항) 단계 7: 애플리케이션에 로컬화된 라우팅 추가

이 단계의 목적은 각 언어에 대해 고유한 라우트를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다.
예시:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 기본적으로, 기본 로케일에 대해서는 라우트가 접두어로 설정되지 않습니다. 기본 로케일에 접두어를 추가하려면 구성에서 `middleware.prefixDefault` 옵션을 `true`로 설정할 수 있습니다. 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

애플리케이션에 로컬화된 라우팅을 추가하려면, 애플리케이션의 라우트를 감싸고 로케일 기반 라우팅을 처리하는 `LocaleRouter` 컴포넌트를 생성할 수 있습니다. 아래는 [React Router](https://reactrouter.com/home)를 사용하는 예제입니다:

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat="typescript"
// 필요한 종속성과 함수 가져오기
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'에서 유틸리티 함수 및 타입 가져오기
import type { FC, PropsWithChildren } from "react"; // React의 함수형 컴포넌트 및 props 타입
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 Provider
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 네비게이션 관리를 위한 라우터 컴포넌트

// Intlayer에서 구성 요소 디스트럭처링
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 로컬화를 처리하고 적절한 로케일 컨텍스트로 자식을 감싸는 컴포넌트.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // 현재 URL 경로 가져오기

  // 현재 로케일을 결정하며, 제공되지 않은 경우 기본값으로 대체
  const currentLocale = locale ?? defaultLocale;

  // 로케일 접두어를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우, 기본 로케일은 항상 접두어로 설정되어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일과 업데이트된 경로로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 현재 히스토리 항목을 새로운 항목으로 대체
        />
      );
    }

    // 자식을 IntlayerProvider로 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우, 기본 로케일은 접두어로 설정되지 않습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아닌지 확인합니다.
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

    // 자식을 IntlayerProvider로 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 라우트를 설정하는 라우터 컴포넌트.
 * React Router를 사용하여 네비게이션을 관리하고 로컬화된 컴포넌트를 렌더링합니다.
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
            // 로케일을 캡처하고 모든 후속 경로와 일치하는 라우트 패턴
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 자식을 로케일 관리로 감쌈
          />
        ))}

      {
        // 기본 로케일 접두어가 비활성화된 경우, 루트 경로에서 자식을 직접 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 자식을 로케일 관리로 감쌈
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 필요한 종속성과 함수 가져오기
import { configuration, getPathWithoutLocale } from "intlayer"; // 'intlayer'에서 유틸리티 함수 및 타입 가져오기
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 Provider
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // 네비게이션 관리를 위한 라우터 컴포넌트

// Intlayer에서 구성 요소 디스트럭처링
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 로컬화를 처리하고 적절한 로케일 컨텍스트로 자식을 감싸는 컴포넌트.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 현재 URL 경로 가져오기

  // 현재 로케일을 결정하며, 제공되지 않은 경우 기본값으로 대체
  const currentLocale = locale ?? defaultLocale;

  // 로케일 접두어를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우, 기본 로케일은 항상 접두어로 설정되어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일과 업데이트된 경로로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 현재 히스토리 항목을 새로운 항목으로 대체
        />
      );
    }

    // 자식을 IntlayerProvider로 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우, 기본 로케일은 접두어로 설정되지 않습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아닌지 확인합니다.
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

    // 자식을 IntlayerProvider로 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * React Router를 사용하여 탐색을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
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
            // 로케일을 캡처하는 경로 패턴 (예: /en/, /fr/) 및 이후 모든 경로와 일치
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 자식을 로케일 관리로 래핑
          />
        ))}

      {
        // 기본 로케일 접두사가 비활성화된 경우, 루트 경로에서 자식을 직접 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 자식을 로케일 관리로 래핑
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 필요한 종속성과 함수 가져오기
const { configuration, getPathWithoutLocale } = require("intlayer"); // 'intlayer'에서 유틸리티 함수 및 타입 가져오기
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 국제화 컨텍스트를 위한 제공자
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // 탐색 관리를 위한 라우터 컴포넌트

// Intlayer에서 구성 가져오기
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * 로컬라이제이션을 처리하고 적절한 로케일 컨텍스트로 자식을 래핑하는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // 현재 URL 경로 가져오기

  // 현재 로케일 결정, 제공되지 않은 경우 기본값으로 대체
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로 구성
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우, 기본 로케일은 항상 접두사가 있어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일로 업데이트된 경로로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 현재 히스토리 항목을 새 항목으로 대체
        />
      );
    }

    // IntlayerProvider로 자식을 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우, 기본 로케일은 접두사가 없습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아닌지 확인합니다.
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

    // IntlayerProvider로 자식을 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * React Router를 사용하여 탐색을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
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
            // 로케일을 캡처하는 경로 패턴 (예: /en/, /fr/) 및 이후 모든 경로와 일치
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // 자식을 로케일 관리로 래핑
          />
        ))}

      {
        // 기본 로케일 접두사가 비활성화된 경우, 루트 경로에서 자식을 직접 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // 자식을 로케일 관리로 래핑
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

// ... AppContent 컴포넌트

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... AppContent 컴포넌트

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... AppContent 컴포넌트

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

동시에, `intLayerMiddlewarePlugin`을 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 사용자의 브라우저 언어 설정을 기반으로 가장 적합한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (선택 사항) Step 8: 로케일 변경 시 URL 변경

로케일 변경 시 URL을 변경하려면, `useLocale` 훅에서 제공하는 `onLocaleChange` 속성을 사용할 수 있습니다. 동시에, `react-router-dom`의 `useLocation` 및 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

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
  const { pathname, search } = useLocation(); // 현재 URL 경로 가져오기. 예: /fr/about?foo=bar
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
              {/* 현재 로케일의 언어 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
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
              {/* 현재 로케일의 언어 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
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
              {/* 해당 로케일의 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일의 언어 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
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

> 문서 참조:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (선택 사항) 단계 9: HTML 언어 및 방향 속성 전환

애플리케이션이 여러 언어를 지원할 경우 `<html>` 태그의 `lang` 및 `dir` 속성을 현재 로케일에 맞게 업데이트하는 것이 중요합니다. 이를 통해 다음을 보장할 수 있습니다:

- **접근성**: 스크린 리더 및 보조 기술은 올바른 `lang` 속성을 사용하여 콘텐츠를 정확히 발음하고 해석합니다.
- **텍스트 렌더링**: `dir`(방향) 속성은 텍스트가 올바른 순서로 렌더링되도록 보장합니다(예: 영어는 왼쪽에서 오른쪽, 아랍어나 히브리어는 오른쪽에서 왼쪽). 이는 가독성에 필수적입니다.
- **SEO**: 검색 엔진은 `lang` 속성을 사용하여 페이지의 언어를 결정하고, 검색 결과에서 적절한 로컬라이즈된 콘텐츠를 제공합니다.

로케일 변경 시 이러한 속성을 동적으로 업데이트하면 모든 지원 언어에서 일관되고 접근 가능한 사용자 경험을 보장할 수 있습니다.

#### 훅 구현

HTML 속성을 관리하는 커스텀 훅을 생성합니다. 이 훅은 로케일 변경을 감지하고 속성을 적절히 업데이트합니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

 * - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서를 보장합니다(예: 영어는 'ltr', 아랍어는 'rtl').
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 현재 로케일에 따라 언어 속성을 업데이트합니다.
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
 * - `dir`: 올바른 읽기 순서를 보장합니다(예: 영어는 'ltr', 아랍어는 'rtl').
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 현재 로케일에 따라 언어 속성을 업데이트합니다.
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
 * - `dir`: 올바른 읽기 순서를 보장합니다(예: 영어는 'ltr', 아랍어는 'rtl').
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 현재 로케일에 따라 언어 속성을 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일에 따라 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### 애플리케이션에서 훅 사용하기

로케일이 변경될 때마다 HTML 속성이 업데이트되도록 메인 컴포넌트에 훅을 통합하세요:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // 현재 로케일에 따라 <html> 태그의 lang 및 dir 속성을 업데이트하는 훅을 적용합니다.
  useI18nHTMLAttributes();

  // ... 나머지 컴포넌트
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
  // 현재 로케일에 따라 <html> 태그의 lang 및 dir 속성을 업데이트하는 훅을 적용합니다.
  useI18nHTMLAttributes();

  // ... 나머지 컴포넌트
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
  // 현재 로케일에 따라 <html> 태그의 lang 및 dir 속성을 업데이트하는 훅을 적용합니다.
  useI18nHTMLAttributes();

  // ... 나머지 컴포넌트
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

이 변경 사항을 적용하면 애플리케이션은 다음을 보장합니다:

- **언어**(`lang`) 속성이 현재 로케일을 정확히 반영하여 SEO 및 브라우저 동작에 중요합니다.
- **텍스트 방향**(`dir`)이 로케일에 따라 조정되어 다른 읽기 순서를 가진 언어의 가독성과 사용성을 향상시킵니다.
- **접근성**이 향상되며, 보조 기술이 이러한 속성에 의존하여 최적의 기능을 제공합니다.

### (선택 사항) 단계 10: 로케일화된 링크 컴포넌트 생성

애플리케이션의 탐색이 현재 로케일을 준수하도록 하려면 사용자 정의 `Link` 컴포넌트를 생성할 수 있습니다. 이 컴포넌트는 내부 URL에 현재 언어를 자동으로 접두사로 추가합니다. 예를 들어, 프랑스어 사용자가 "About" 페이지로 이동하는 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 다음과 같은 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로케일화된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하고 사용자가 선호하는 언어로 콘텐츠를 제공하도록 돕습니다.
- **일관성**: 애플리케이션 전체에서 로케일화된 링크를 사용하면 탐색이 현재 로케일 내에서 유지되며, 예기치 않은 언어 전환을 방지합니다.
- **유지 관리 용이성**: URL 로직을 단일 컴포넌트에 중앙 집중화하면 코드베이스를 더 쉽게 관리하고 애플리케이션이 성장함에 따라 확장할 수 있습니다.

아래는 TypeScript로 구현된 로케일화된 `Link` 컴포넌트입니다:

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
 * 주어진 URL이 외부 URL인지 확인하는 유틸리티 함수.
 * URL이 http:// 또는 https://로 시작하면 외부 URL로 간주됩니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 사용자 정의 Link 컴포넌트.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL에 로케일을 접두사로 추가합니다(예: /fr/about).
 * 이를 통해 탐색이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 링크가 내부 링크이고 유효한 href가 제공된 경우, 로케일화된 URL을 가져옵니다.
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
 * 주어진 URL이 외부 URL인지 확인하는 유틸리티 함수.
 * URL이 http:// 또는 https://로 시작하면 외부 URL로 간주됩니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 사용자 정의 Link 컴포넌트.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL에 로케일을 접두사로 추가합니다(예: /fr/about).
 * 이를 통해 탐색이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 링크가 내부 링크이고 유효한 href가 제공된 경우, 로컬라이즈된 URL을 가져옵니다.
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
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주됩니다.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트.
 * 내부 링크의 경우, `getLocalizedUrl`을 사용하여 URL에 로케일을 접두사로 추가합니다 (예: /fr/about).
 * 이를 통해 동일한 로케일 컨텍스트 내에서 탐색이 유지됩니다.
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

#### 작동 방식

- **외부 링크 감지**:  
  헬퍼 함수 `checkIsExternalLink`는 URL이 외부 링크인지 여부를 결정합니다. 외부 링크는 로컬라이제이션이 필요하지 않으므로 변경되지 않습니다.

- **현재 로케일 가져오기**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.

- **URL 로컬라이제이션**:  
  내부 링크(즉, 외부가 아닌 링크)의 경우, `getLocalizedUrl`을 사용하여 URL에 현재 로케일을 자동으로 접두사로 추가합니다. 예를 들어, 사용자가 프랑스어를 사용하는 경우 `/about`을 `href`로 전달하면 `/fr/about`으로 변환됩니다.

- **링크 반환**:  
  컴포넌트는 로컬라이즈된 URL을 가진 `<a>` 요소를 반환하여 로케일과 일관된 탐색을 보장합니다.

이 `Link` 컴포넌트를 애플리케이션 전반에 통합하면 일관되고 언어를 인식하는 사용자 경험을 유지하면서 SEO와 사용성을 개선할 수 있습니다.

### TypeScript 구성

Intlayer는 TypeScript의 모듈 확장을 사용하여 코드베이스를 더욱 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입을 포함해야 합니다.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 구성

Intlayer에서 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 해당 파일을 Git 저장소에 커밋하지 않도록 할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer에서 생성된 파일 무시
.intlayer
```

### 추가 학습

더 나아가려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

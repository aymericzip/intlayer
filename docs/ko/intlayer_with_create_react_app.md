# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## What is Intlayer?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하도록 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면:

- **선언형 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 경로 및 콘텐츠를 동적으로 지역화**할 수 있습니다.
- **TypeScript 지원을 보장**하며, 자동 생성된 타입으로 자동 완성과 오류 탐지를 개선합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 누릴 수 있습니다.

---

## Step-by-Step Guide to Set Up Intlayer in a React Application

### Step 1: Install Dependencies

필요한 패키지를 npm을 사용해 설치합니다:

```bash packageManager="npm"
npm install intlayer react-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md), 변환, [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**

  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 제공자와 후크를 제공합니다. 또한, Create React App 기반 애플리케이션에 Intlayer를 통합하는 플러그인도 포함되어 있습니다.

### Step 2: Configuration of your project

애플리케이션의 언어를 구성하기 위해 구성 파일을 생성합니다:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

### Step 3: Integrate Intlayer in Your CRA Configuration

react-intlayer를 사용하도록 스크립트를 변경합니다.

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-intlayer` 스크립트는 [craco](https://craco.js.org/)를 기반으로 합니다. 또한, intlayer의 craco 플러그인을 기반으로 한 자체 설정을 구현할 수 있습니다. [여기서 예를 확인하십시오](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Step 4: Declare Your Content

번역을 저장할 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> 콘텐츠 선언은 `contentDir` 디렉터리(기본적으로 `./src`)에 포함되기만 하면 애플리케이션의 어느 곳에나 정의할 수 있습니다. 콘텐츠 선언 파일 확장자와 일치해야 합니다(기본적으로 `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)를 참조하십시오.
> 내용 파일에 TSX 코드가 포함된 경우, 콘텐츠 파일에 `import React from "react";`를 가져오는 것을 고려해야 합니다.

### Step 5: Utilize Intlayer in Your Code

애플리케이션 전반에 걸쳐 콘텐츠 사전에 액세스합니다:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> 참고: `alt`, `title`, `href`, `aria-label` 등의 `string` 속성에서 콘텐츠를 사용하려면 함수의 값을 호출해야 합니다. 예:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하십시오.

### (Optional) Step 6: Change the language of your content

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 업데이트하는 데 사용됩니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
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
      Change Language to English
    </button>
  );
};
```

> `useLocale` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)를 참조하십시오.

### (Optional) Step 7: Add localized Routing to your application

이 단계의 목적은 각 언어에 대한 고유한 경로를 만드는 것입니다. 이는 SEO와 SEO 친화적인 URL에 유용합니다.
예:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 기본적으로, 경로는 기본 로케일에 대해 접두사가 없습니다. 기본 로케일에 접두사를 추가하려면 구성에서 `middleware.prefixDefault` 옵션을 `true`로 설정하면 됩니다. 더 많은 정보는 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

애플리케이션에 지역화된 라우팅을 추가하려면 애플리케이션의 경로를 래핑하고 로케일 기반 라우팅을 처리하는 `LocaleRouter` 구성 요소를 생성할 수 있습니다. 아래는 [React Router](https://reactrouter.com/home)를 사용하는 예입니다:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 필요한 종속성과 함수 가져오기
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'에서 유틸리티 함수 및 유형 가져오기
import type { FC, PropsWithChildren } from "react"; // 함수형 컴포넌트와 props에 대한 React 유형 가져오기
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 제공자
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 탐색 관리를 위한 라우터 컴포넌트

// Intlayer에서 설정을 구조분해하여 가져오기
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 지역화를 처리하고 자식 컴포넌트를 적절한 지역화 컨텍스트로 래핑하는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로 가져오기
  const { locale } = useParams<{ locale: Locales }>(); // URL에서 로케일 매개변수 추출

  // 현재 로케일을 결정하고 제공되지 않은 경우 기본값으로 설정
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    path // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우 기본 로케일은 항상 접두사가 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 업데이트된 경로를 가지고 기본 로케일로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 현재 기록 항목을 새 항목으로 대체
        />
      );
    }

    // 자식으로 IntlayerProvider를 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우 기본 로케일은 접두사가 없습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아니도록 해야 합니다.
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 자식으로 IntlayerProvider를 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * 탐색을 관리하고 지역화된 컴포넌트를 렌더링하기 위해 React Router를 사용합니다.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일(예: /en/, /fr/)을 캡처하고 이후 모든 경로와 매치하는 경로 패턴
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 자식을 지역화 관리로 감쌉니다.
      />

      {
        // 기본 로케일에 대한 접두사를 추가하는 것이 비활성화된 경우, 루트 경로에서 자식을 직접 렌더링합니다.
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 자식을 지역화 관리로 감쌉니다.
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 필요한 종속성과 함수 가져오기
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'에서 유틸리티 함수 및 유형 가져오기
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 제공자
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 탐색 관리를 위한 라우터 컴포넌트

// Intlayer에서 설정을 구조분해하여 가져오기
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 지역화를 처리하고 자식 컴포넌트를 적절한 지역화 컨텍스트로 래핑하는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로 가져오기
  const { locale } = useParams(); // URL에서 로케일 매개변수 추출

  // 현재 로케일을 결정하고 제공되지 않은 경우 기본값으로 설정
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    path // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우 기본 로케일은 항상 접두사가 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 업데이트된 경로를 가지고 기본 로케일로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 현재 기록 항목을 새 항목으로 대체
        />
      );
    }

    // 자식으로 IntlayerProvider를 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우 기본 로케일은 접두사가 없습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아니도록 해야 합니다.
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 자식으로 IntlayerProvider를 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * 탐색을 관리하고 지역화된 컴포넌트를 렌더링하기 위해 React Router를 사용합니다.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일(예: /en/, /fr/)을 캡처하고 이후 모든 경로와 매치하는 경로 패턴
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 자식을 지역화 관리로 감쌉니다.
      />

      {
        // 기본 로케일에 대한 접두사를 추가하는 것이 비활성화된 경우, 루트 경로에서 자식을 직접 렌더링합니다.
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 자식을 지역화 관리로 감쌉니다.
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 필요한 종속성과 함수 가져오기
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // 'intlayer'에서 유틸리티 함수 및 유형 가져오기
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 국제화 컨텍스트를 위한 제공자
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // 탐색 관리를 위한 라우터 컴포넌트

// Intlayer에서 설정을 구조분해하여 가져오기
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 지역화를 처리하고 자식 컴포넌트를 적절한 지역화 컨텍스트로 래핑하는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로 가져오기
  const { locale } = useParams(); // URL에서 로케일 매개변수 추출

  // 현재 로케일을 결정하고 제공되지 않은 경우 기본값으로 설정
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    path // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우 기본 로케일은 항상 접두사가 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 업데이트된 경로를 가지고 기본 로케일로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 현재 기록 항목을 새 항목으로 대체
        />
      );
    }

    // 자식으로 IntlayerProvider를 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우 기본 로케일은 접두사가 없습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아니도록 해야 합니다.
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // 자식으로 IntlayerProvider를 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * 탐색을 관리하고 지역화된 컴포넌트를 렌더링하기 위해 React Router를 사용합니다.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일(예: /en/, /fr/)을 캡처하고 이후 모든 경로와 매치하는 경로 패턴
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 자식을 지역화 관리로 감쌉니다.
      />

      {
        // 기본 로케일에 대한 접두사를 추가하는 것이 비활성화된 경우, 루트 경로에서 자식을 직접 렌더링합니다.
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 자식을 지역화 관리로 감쌉니다.
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Step 8: Change the URL when the locale changes

로케일이 변경될 때 URL을 변경하려면 `useLocale` 훅에서 제공하는 `onLocaleChange` prop을 사용할 수 있습니다. 병행하여, `react-router-dom`의 `useLocation` 및 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

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
  const location = useLocation(); // 현재 URL 경로 가져오기. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 업데이트된 로케일로 URL 구성
    // 예: 로케일이 스페인어로 설정된 경우 /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL 경로 업데이트
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 언어의 고유 로케일로 표시 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서 언어 표시 - 예: Francés로 로케일이 Locales.SPANISH로 설정됨 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 언어 표시 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 언어의 고유 로케일로 표시 - 예: FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // 현재 URL 경로 가져오기. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 업데이트된 로케일로 URL 구성
    // 예: 로케일이 스페인어로 설정된 경우 /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL 경로 업데이트
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 언어의 고유 로케일로 표시 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서 언어 표시 - 예: Francés로 로케일이 Locales.SPANISH로 설정됨 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 언어 표시 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 언어의 고유 로케일로 표시 - 예: FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // 현재 URL 경로 가져오기. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 업데이트된 로케일로 URL 구성
    // 예: 로케일이 스페인어로 설정된 경우 /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL 경로 업데이트
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* 언어의 고유 로케일로 표시 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서 언어 표시 - 예: Francés로 로케일이 Locales.SPANISH로 설정됨 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 언어 표시 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 언어의 고유 로케일로 표시 - 예: FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> 문서 참조:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Configure TypeScript

Intlayer는 모듈 증강을 사용하여 TypeScript의 이점을 얻고 코드베이스를 더 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인합니다.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    "types", // 자동 생성된 타입 포함
  ],
}
```

### Git Configuration

Intlayer에 의해 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 Git 리포지토리에 커밋되는 것을 피할 수 있습니다.

이를 위해 다음 지침을 `.gitignore` 파일에 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에 의해 생성된 파일 무시
.intlayer
```

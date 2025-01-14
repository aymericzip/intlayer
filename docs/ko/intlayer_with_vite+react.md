# 시작하기: Intlayer 및 Vite와 React를 이용한 국제화 (i18n)

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스 국제화 (i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **구성 요소 수준에서 선언적 사전을 사용하여** 번역을 쉽게 관리할 수 있습니다.
- **메타데이터, 경로 및 콘텐츠를 동적으로 지역화할 수 있습니다.**
- **오토 컴플리션과 오류 탐지를 개선하는** 자동 생성된 타입으로 TypeScript 지원을 보장합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능의 이점을 누릴 수 있습니다.

---

## Vite 및 React 애플리케이션에서 Intlayer 설정하기 위한 단계별 가이드

### Step 1: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

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

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md), 전환, 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다. 추가로, Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인을 포함하며, 사용자의 선호 로케일을 감지하고 쿠키를 관리하며 URL 리다이렉션을 처리하는 미들웨어도 포함되어 있습니다.

### Step 2: 프로젝트 구성

애플리케이션의 언어를 구성하기 위해 구성 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.KOREAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일 추가
    ],
    defaultLocale: Locales.KOREAN,
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
      Locales.KOREAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일 추가
    ],
    defaultLocale: Locales.KOREAN,
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
      Locales.KOREAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일 추가
    ],
    defaultLocale: Locales.KOREAN,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리다이렉션, 쿠키 이름, 콘텐츠 선언의 위치와 확장, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### Step 3: Vite 구성에서 Intlayer 통합

구성에 intlayer 플러그인을 추가합니다.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite 플러그인은 Intlayer와 Vite를 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 모니터링합니다. Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능을 최적화하기 위한 별칭도 제공합니다.

### Step 4: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
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
      // React 노드를 사용하는 경우 React를 import를 잊지 마세요
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
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
        // React 노드를 사용하는 경우 React를 import를 잊지 마세요
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
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
        // React 노드를 사용하는 경우 React를 import를 잊지 마세요
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
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> 귀하의 콘텐츠 선언은 `contentDir` 디렉토리(기본적으로 `./src`)에 포함된 한 애플리케이션의 아무 곳에서나 정의될 수 있습니다. 콘텐츠 선언 파일 확장자와 일치해야 합니다(기본적으로 `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> 더 많은 세부정보는 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)를 참조하세요.
> 콘텐츠 파일에 TSX 코드가 포함된 경우 콘텐츠 파일에 `import React from "react";`를 가져오는 것을 고려해야 합니다.

### Step 5: 코드에서 Intlayer 사용하기

애플리케이션 전체에서 콘텐츠 사전에 접근하세요:

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

> 콘텐츠를 `string` 속성(예: `alt`, `title`, `href`, `aria-label` 등)에서 사용하려면, 함수의 값을 호출해야 합니다. 다음은 그 예시입니다.
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> `useIntlayer` 훅에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

### (선택 사항) Step 6: 콘텐츠 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 업데이트합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.KOREAN)}>
      언어를 한국어로 변경하기
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
    <button onClick={() => setLocale(Locales.KOREAN)}>
      언어를 한국어로 변경하기
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
    <button onClick={() => setLocale(Locales.KOREAN)}>
      언어를 한국어로 변경하기
    </button>
  );
};
```

> `useLocale` 훅에 대한 자세한 내용은 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

### (선택 사항) Step 7: 애플리케이션에 지역화된 라우팅 추가하기

이 단계의 목적은 각 언어에 대한 고유한 경로를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다.
예시:

```plaintext
- https://example.com/about
- https://example.com/ko/about
- https://example.com/fr/about
```

> 기본적으로, 경로는 기본 로케일에 대해 접두사가 붙지 않습니다. 기본 로케일에 접두사를 추가하려면 구성에서 `middleware.prefixDefault` 옵션을 `true`로 설정할 수 있습니다. 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

애플리케이션에 지역화된 라우팅을 추가하려면 `LocaleRouter` 컴포넌트를 만들어 애플리케이션의 경로를 감싸고 로케일 기반 라우팅을 처리할 수 있습니다. 다음은 [React Router](https://reactrouter.com/home)를 사용한 예시입니다:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// 필요한 종속성과 함수를 가져옵니다.
import { Locales, getConfiguration, removeLocaleFromUrl } from "intlayer"; // 'intlayer'에서 유틸리티 함수와 타입
import type { FC, PropsWithChildren } from "react"; // 기능적 컴포넌트 및 props에 대한 React 타입
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트 제공자
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 탐색 관리를 위한 라우터 구성 요소

// Intlayer에서 구성을 비구조화합니다.
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 로컬라이제이션을 처리하고 자식 요소를 적절한 로케일 컨텍스트로 감싸는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 검증을 관리합니다.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로를 가져옵니다.
  const { locale } = useParams<{ locale: Locales }>(); // URL에서 로케일 파라미터를 추출합니다.

  // 현재 로케일을 결정하고 제공되지 않을 경우 기본값으로 되돌립니다.
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 구성합니다.
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 현재 URL 경로
  );

  /**
   * 만약 middleware.prefixDefault가 true이면 기본 로케일은 항상 접두사가 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일을 검증합니다.
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일과 함께 업데이트된 경로로 리다이렉션합니다.
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 현재 히스토리 항목을 새로 업데이트된 항목으로 대체합니다.
        />
      );
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일을 설정합니다.
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 경우 기본 로케일은 접두사가 붙지 않습니다.
     * 현재 로케일이 유효하며 기본 로케일이 아닌지 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인합니다.
    ) {
      // 로케일 접두사가 없는 경로로 리다이렉트합니다.
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일을 설정합니다.
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * 탐색을 관리하고 지역화된 구성 요소를 렌더링하기 위해 React Router를 사용합니다.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일을 캡처하는 경로 패턴(예: /ko/, /fr/) 및 이후 모든 경로와 일치합니다.
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 자식을 로케일 관리로 감쌉니다.
      />

      {
        // 기본 로케일의 접두사가 붙지 않도록 설정된 경우 루트 경로에서 자식을 직접 렌더링합니다.
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 자식을 로케일 관리로 감쌉니다.
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// 필요한 종속성과 함수를 가져옵니다.
import { Locales, getConfiguration, removeLocaleFromUrl } from "intlayer"; // 'intlayer'에서 유틸리티 함수와 타입
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트 제공자
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 탐색 관리를 위한 라우터 구성 요소

// Intlayer에서 구성을 비구조화합니다.
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 로컬라이제이션을 처리하고 자식 요소를 적절한 로케일 컨텍스트로 감싸는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 검증을 관리합니다.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로를 가져옵니다.
  const { locale } = useParams(); // URL에서 로케일 파라미터를 추출합니다.

  // 현재 로케일을 결정하고 제공되지 않을 경우 기본값으로 되돌립니다.
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 구성합니다.
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 현재 URL 경로
  );

  /**
   * 만약 middleware.prefixDefault가 true이면 기본 로케일은 항상 접두사가 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일을 검증합니다.
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일과 함께 업데이트된 경로로 리다이렉션합니다.
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 현재 히스토리 항목을 새로 업데이트된 항목으로 대체합니다.
        />
      );
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일을 설정합니다.
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 경우 기본 로케일은 접두사가 붙지 않습니다.
     * 현재 로케일이 유효하며 기본 로케일이 아닌지 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인합니다.
    ) {
      // 로케일 접두사가 없는 경로로 리다이렉트합니다.
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일을 설정합니다.
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * 탐색을 관리하고 지역화된 구성 요소를 렌더링하기 위해 React Router를 사용합니다.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일을 캡처하는 경로 패턴(예: /ko/, /fr/) 및 이후 모든 경로와 일치합니다.
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 자식을 로케일 관리로 감쌉니다.
      />

      {
        // 기본 로케일의 접두사가 붙지 않도록 설정된 경우 루트 경로에서 자식을 직접 렌더링합니다.
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 자식을 로케일 관리로 감쌉니다.
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// 필요한 종속성과 함수를 가져옵니다.
const {
  getConfiguration,
  getPathWithoutLocale,
  removeLocaleFromUrl,
} = require("intlayer"); // 'intlayer'에서 유틸리티 함수와 타입
const { IntlayerProvider, useLocale } = require("react-intlayer"); // 국제화 컨텍스트 제공자
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // 탐색 관리를 위한 라우터 구성 요소

// Intlayer에서 구성을 비구조화합니다.
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 로컬라이제이션을 처리하고 자식 요소를 적절한 로케일 컨텍스트로 감싸는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 검증을 관리합니다.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로를 가져옵니다.
  const { locale } = useParams(); // URL에서 로케일 파라미터를 추출합니다.

  // 현재 로케일을 결정하고 제공되지 않을 경우 기본값으로 되돌립니다.
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로를 구성합니다.
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 현재 URL 경로
  );

  /**
   * 만약 middleware.prefixDefault가 true이면 기본 로케일은 항상 접두사가 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일을 검증합니다.
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일과 함께 업데이트된 경로로 리다이렉션합니다.
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 현재 히스토리 항목을 새로 업데이트된 항목으로 대체합니다.
        />
      );
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일을 설정합니다.
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 경우 기본 로케일은 접두사가 붙지 않습니다.
     * 현재 로케일이 유효하며 기본 로케일이 아닌지 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인합니다.
    ) {
      // 로케일 접두사가 없는 경로로 리다이렉트합니다.
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일을 설정합니다.
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * 탐색을 관리하고 지역화된 구성 요소를 렌더링하기 위해 React Router를 사용합니다.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일을 캡처하는 경로 패턴(예: /ko/, /fr/) 및 이후 모든 경로와 일치합니다.
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 자식을 로케일 관리로 감쌉니다.
      />

      {
        // 기본 로케일의 접두사가 붙지 않도록 설정된 경우 루트 경로에서 자식을 직접 렌더링합니다.
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 자식을 로케일 관리로 감쌉니다.
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

그와 동시에, `intLayerMiddlewarePlugin`을 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL에 따라 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 플러그인은 사용자의 브라우저 언어 기본 설정에 따라 가장 적절한 로케일을 결정합니다. 로케일이 감지되지 않는 경우, 기본 로케일로 리다이렉트됩니다.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const {
  intlayerPlugin,
  intLayerMiddlewarePlugin,
} = require("react-intlayer/vite");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (선택 사항) Step 8: 로케일 변경 시 URL 변경하기

로케일이 변경될 때 URL을 변경하려면 `useLocale` 훅에서 제공하는 `onLocaleChange` prop을 사용할 수 있습니다. 동시에, `react-router-dom`의 `useLocation` 및 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

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
  const location = useLocation(); // 현재 URL 경로를 가져옵니다. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 업데이트된 로케일로 URL을 구성합니다.
    // 예: 로케일이 스페인어로 설정된 경우 /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL 경로를 업데이트합니다.
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
              {/* 각 로케일로 표현된 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 표현된 언어 - 예: Francés, 현재 로케일이 Locales.SPANISH로 설정된 경우 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 표현된 언어 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 각 로케일로 표현된 언어 - 예: FR */}
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
  const location = useLocation(); // 현재 URL 경로를 가져옵니다. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 업데이트된 로케일로 URL을 구성합니다.
    // 예: 로케일이 스페인어로 설정된 경우 /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL 경로를 업데이트합니다.
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
              {/* 각 로케일로 표현된 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 표현된 언어 - 예: Francés, 현재 로케일이 Locales.SPANISH로 설정된 경우 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 표현된 언어 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 각 로케일로 표현된 언어 - 예: FR */}
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
  const location = useLocation(); // 현재 URL 경로를 가져옵니다. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // 업데이트된 로케일로 URL을 구성합니다.
    // 예: 로케일이 스페인어로 설정된 경우 /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL 경로를 업데이트합니다.
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
              {/* 각 로케일로 표현된 언어 - 예: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일로 표현된 언어 - 예: Francés, 현재 로케일이 Locales.SPANISH로 설정된 경우 */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어로 표현된 언어 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* 각 로케일로 표현된 언어 - 예: FR */}
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

### TypeScript 구성

Intlayer는 TypeScript의 장점을 얻기 위해 모듈 증분을 사용하여 코드베이스를 강화합니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성이 자동 생성된 타입을 포함하도록 설정되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // 사용자 정의 설정
  "include": [
    "src",
    "types", // <- 자동 생성된 유형 포함
  ],
}
```

### Git 구성

Intlayer에 의해 생성된 파일을 무시하는 것이 좋습니다. 이는 Git 리포지토리에 커밋되는 것을 방지합니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer에 의해 생성된 파일 무시
.intlayer
```

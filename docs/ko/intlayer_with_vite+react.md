# Intlayer 및 Vite, React로 국제화(i18n) 시작하기

## Intlayer란 무엇입니까?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 단순화하도록 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면:

- **구성 요소 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 경로 및 콘텐츠를 동적으로 지역화**할 수 있습니다.
- **자동 생성된 유형을 통해 TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 개선할 수 있습니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 누릴 수 있습니다.

---

## Vite 및 React 애플리케이션에서 Intlayer 설정을 위한 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 구성 파일을 만듭니다:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 다른 로케일
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

사용 가능한 모든 매개변수는 [구성 문서에서 참조](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)하십시오.

### 3단계: Vite 구성에 Intlayer 통합

구성에 intlayer 플러그인을 추가합니다.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### 4단계: 콘텐츠 선언

콘텐츠 사전을 생성하고 관리합니다:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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
      // 콘텐츠에서 React 노드를 사용하는 경우 React를 가져오는 것을 잊지 마세요.
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

> 주의: 콘텐츠 파일에 TSX 코드가 포함된 경우, 콘텐츠 파일에 `import React from "react";`를 가져오는 것을 고려해야 합니다.

[Intlayer 선언 파일을 선언하는 방법을 참조하세요](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md).

### 5단계: 코드에서 Intlayer 활용하기

애플리케이션 전반에 걸쳐 콘텐츠 사전에 접근하세요:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
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
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> 주의: `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면 함수의 값을 호출해야 합니다:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (선택 사항) 6단계: 콘텐츠 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 해당에 따라 업데이트할 수 있습니다.

```tsx
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

### (선택 사항) 7단계: 애플리케이션에 지역화된 라우팅 추가하기

이 단계의 목적은 각 언어에 대한 고유한 경로를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다.
예시:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 기본적으로 기본 로케일의 경로는 접두어가 붙지 않습니다. 기본 로케일의 접두어를 붙이고 싶다면, 구성에서 `middleware.prefixDefault` 옵션을 `true`로 설정하면 됩니다. 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

애플리케이션에 지역화된 라우팅을 추가하려면 애플리케이션의 경로를 감싸고 로케일 기반 라우팅을 처리하는 `LocaleRouter` 구성 요소를 만들 수 있습니다. 다음은 [React Router](https://reactrouter.com/home)를 사용하는 예시입니다:

```tsx
// 필요한 종속성과 함수 가져오기
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'의 유틸리티 함수 및 유형
import { FC, PropsWithChildren } from "react"; // 함수형 구성 요소 및 props에 대한 React 유형
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 제공자
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 탐색 관리를 위한 라우터 구성 요소

// Intlayer에서 구성 구 destructuring하기
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 지역화 및 적절한 로케일 컨텍스트로 자식을 감싸는 구성 요소입니다.
 * URL 기반 로케일 감지 및 유효성 검사를 관리합니다.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로 가져오기
  const { locale } = useParams<{ locale: Locales }>(); // URL에서 로케일 매개변수 추출

  // 현재 로케일 결정, 제공된 경우 기본값으로 대체
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두어를 제거하여 기본 경로 만들기
  const pathWithoutLocale = getPathWithoutLocale(
    path // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true이면 기본 로케일은 항상 접두어가 붙어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일로 경로 업데이트하여 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 새 항목으로 현재 히스토리 항목 바꾸기
        />
      );
    }

    // IntlayerProvider로 자식 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false이면 기본 로케일은 접두어가 붙지 않습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아니도록 합니다.
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
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider로 자식 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 구성 요소입니다.
 * React Router를 사용하여 탐색 관리 및 지역화된 구성 요소 렌더링합니다.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일을 캡처하고 모든 후속 경로와 일치하는 경로 패턴
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 지역 관리를 위한 자식 감싸기
      />

      {
        // 기본 로케일의 접두어가 비활성화된 경우 루트 경로에서 자식을 직접 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 지역 관리를 위한 자식 감싸기
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

동시에, `intLayerMiddlewarePlugin`을 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않으면 플러그인은 사용자의 브라우저 언어 기본 설정을 기반으로 가장 적절한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션됩니다.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (선택 사항) 8단계: 로케일 변경 시 URL 변경하기

로케일이 변경될 때 URL을 변경하려면, `useLocale` 훅에서 제공하는 `onLocaleChange` prop을 사용할 수 있습니다. 동시에, `react-router-dom`의 `useLocation` 및 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // 현재 URL 경로 가져오기. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 업데이트된 로케일로 URL 구성
    // 예: 스페인어 설정 시 /es/about
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // URL 경로 업데이트
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

### TypeScript 구성

Intlayer는 모듈 증강을 사용하여 TypeScript의 이점을 누리고 코드베이스를 강화합니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 유형이 포함되었는지 확인하십시오.

```json5
// tsconfig.json

{
  // 사용자 정의 구성
  "include": [
    "src",
    "types", // <- 자동 생성된 유형 포함
  ],
}
```

### Git 구성

Intlayer에 의해 생성된 파일을 무시하는 것이 좋습니다. 이렇게 하면 Git 리포지토리에 이 파일이 커밋되는 것을 피할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer에 의해 생성된 파일 무시
.intlayer
```

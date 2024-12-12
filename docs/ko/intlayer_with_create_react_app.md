# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## What is Intlayer?

**Intlayer**는 현대 웹 애플리케이션에서 다국적 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면:

- **구성 요소 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터**, 경로 및 콘텐츠를 **동적으로 지역화**할 수 있습니다.
- **자동 생성된 유형으로 TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 **이용할 수 있습니다**.

---

## Step-by-Step Guide to Set Up Intlayer in a React Application

### Step 1: Install Dependencies

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

### Step 2: Configuration of your project

애플리케이션의 언어를 구성하기 위해 구성 파일을 만듭니다:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 기타 로케일 추가
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

사용 가능한 모든 매개변수를 보려면 [구성 문서 여기 참조](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md).

### Step 3: Integrate Intlayer in Your CRA Configuration

react-intlayer를 사용하기 위해 스크립트를 변경합니다.

```json
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

참고: react-intlayer 스크립트는 craco를 기반으로 합니다. intlayer craco 플러그인을 기반으로 자체 설정을 구현할 수도 있습니다. [여기 예제 보기](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Step 4: Declare Your Content

콘텐츠 사전을 생성하고 관리합니다:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

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

[여기에서 Intlayer 선언 파일을 선언하는 방법 보기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md).

### Step 5: Utilize Intlayer in Your Code

애플리케이션 전체에서 콘텐츠 사전에 접근합니다:

```tsx
import logo from "./logo.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";

function AppContent() {
  const content = useIntlayer("app");

  return (
    <header className="App-header">
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
    </header>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <div className="App">
        {/* useIntlayer 훅을 올바르게 사용하려면 자식 구성 요소에서 데이터를 접근해야 합니다 */}
        <AppContent />
      </div>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </IntlayerProvider>
  );
}

export default App;
```

> 참고: `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면, 함수의 값을 호출해야 합니다, 예를 들면:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Optional) Step 6: Change the language of your content

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 적절히 업데이트합니다.

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

### (Optional) Step 7: Add localized Routing to your application

이 단계의 목적은 각 언어에 대한 고유한 경로를 만드는 것입니다. 이는 SEO와 SEO 친화적인 URL에 유용합니다.
예시:

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> 기본적으로 경로는 기본 로케일에 대해 접두사가 없습니다. 기본 로케일에 접두사를 추가하려면 구성에서 `middleware.prefixDefault` 옵션을 `true`로 설정할 수 있습니다. [구성 문서 참조](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에서 더 많은 정보를 얻을 수 있습니다.

앱에 지역화된 라우팅을 추가하려면, 애플리케이션의 경로를 감싸고 로케일 기반 라우팅을 처리하는 `LocaleRouter` 구성 요소를 만들 수 있습니다. 다음은 [React Router](https://reactrouter.com/home)를 사용한 예시입니다:

```tsx
// 필요한 종속성 및 함수 가져오기
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // 'intlayer'에서 유틸리티 함수 및 유형 가져오기
import { FC, PropsWithChildren } from "react"; // 기능 구성 요소 및 소품을 위한 React 유형
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 제공자
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // 탐색 관리를 위한 라우터 구성 요소

// Intlayer에서 구성 분해
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * 로컬화 관리를 처리하는 구성 요소.
 * URL 기반 로케일 감지 및 유효성 검사를 처리합니다.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // 현재 URL 경로 가져오기
  const { locale } = useParams<{ locale: Locales }>(); // URL에서 로케일 매개변수 추출

  // 현재 로케일 결정, 제공되지 않을 경우 기본값으로 되돌아감
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두사를 제거하여 기본 경로 구성
  const pathWithoutLocale = removeLocaleFromUrl(
    path // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true이면 기본 로케일은 항상 접두사가 있어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 업데이트된 경로로 기본 로케일로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // 현재 기록 항목을 새 항목으로 대체
        />
      );
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 때, 기본 로케일은 접두사가 없습니다.
     * 현재 로케일이 유효하며 기본 로케일이 아닌지 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인
    ) {
      // 로케일 접두사 없이 경로로 리디렉션
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // IntlayerProvider로 자식을 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * 로케일별 경로를 설정하는 라우터 구성 요소.
 * React Router를 사용하여 탐색을 관리하고 지역화된 구성 요소를 렌더링합니다.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // 로케일을 캡처하는 경로 패턴 (예: /en/, /fr/) 및 모든 이후 경로와 일치
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // 로케일 관리를 위한 자식으로 감싸기
      />

      {
        // 기본 로케일 접두사가 비활성화된 경우 루트 경로에서 직접 자식을 렌더링
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // 로케일 관리를 위한 자식으로 감싸기
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Step 8: Change the URL when the locale changes

로케일이 변경될 때 URL을 변경하려면, `useLocale` 훅에서 제공하는 `onLocaleChange` 속성을 사용할 수 있습니다. 동시에, `react-router-dom`의 `useLocation` 및 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // 현재 URL 경로 가져오기. 예: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // 업데이트된 로케일로 URL 구성
    // 예: 로케일이 스페인어로 설정될 때 /es/about
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

### Configure TypeScript

Intlayer는 모듈 증강을 사용하여 TypeScript의 이점을 얻고 코드베이스를 더 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성이 자동 생성된 유형을 포함하도록 설정되어 있는지 확인합니다.

```json5
// tsconfig.json

{
  // 사용자 정의 구성
  include: [
    "src",
    "types", // <- 자동 생성된 유형 포함
  ],
}
```

### Git Configuration

Intlayer 의해 생성된 파일을 무시하는 것이 좋습니다. 이를 통해 Git 리포지토리에 파일을 커밋하지 않도록 할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```gitignore
# Intlayer 의해 생성된 파일 무시
.intlayer
```

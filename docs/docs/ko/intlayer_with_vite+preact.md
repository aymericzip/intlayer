---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite + Preact i18n - Preact 앱 번역 방법 2026
description: Vite와 Preact 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따라가세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - Preact
  - 자바스크립트
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: init 명령어 추가
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# Intlayer로 Vite and Preact 번역하기 | 국제화(i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

## Intlayer란 무엇인가요?

**Intlayer**는 최신 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **번역을 쉽게 관리**할 수 있습니다 (컴포넌트 수준의 선언적 사전 사용).
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **TypeScript 지원을 보장**합니다 (자동 생성된 타입을 통해 자동 완성 및 오류 감지 개선).
- **고급 기능을 활용**할 수 있습니다 (예: 동적 로케일 감지 및 전환).

---

## Vite 및 Preact 애플리케이션에서 Intlayer 설정 단계별 가이드

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-vite-preact-template)을 확인하세요.

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 컴파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 핵심 패키지입니다.

- **preact-intlayer**

  Intlayer를 Preact 애플리케이션과 통합하는 패키지입니다. Preact 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

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
  routing: {
    mode: "prefix-no-default", // 기본값: 기본 로케일을 제외한 모든 로케일에 접두사 추가
    storage: ["cookie", "header"], // 기본값: 쿠키에 로케일 저장 및 헤더에서 감지
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
  routing: {
    mode: "prefix-no-default", // 기본값: 기본 로케일을 제외한 모든 로케일에 접두사 추가
    storage: ["cookie", "header"], // 기본값: 쿠키에 로케일 저장 및 헤더에서 감지
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
  routing: {
    mode: "prefix-no-default", // 기본값: 기본 로케일을 제외한 모든 로케일에 접두사 추가
    storage: ["cookie", "header"], // 기본값: 쿠키에 로케일 저장 및 헤더에서 감지
  },
};

module.exports = config;
```

> 이 설정 파일을 통해 로컬라이즈된 URL, 라우팅 모드, 저장 옵션, 쿠키 이름, 콘텐츠 선언 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참고하세요.

### 3단계: Vite 구성에 Intlayer 통합하기

intlayer 플러그인을 구성에 추가하세요.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하기 위해 사용됩니다. 이 플러그인은 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위해 별칭(alias)도 제공합니다.

### 4단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // .mjs에서 JSX를 직접 사용하는 경우 필요

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite et Preact pour obtenir plus d'informations",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // .cjs에서 JSX를 직접 사용하는 경우 필요

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite et Preact pour en savoir plus",
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
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> 콘텐츠 선언은 애플리케이션 내 어디에서든 `contentDir` 디렉토리(기본값은 `./src`)에 포함되기만 하면 정의할 수 있습니다. 그리고 콘텐츠 선언 파일 확장자(기본값은 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참조하세요.

> 콘텐츠 파일에 TSX 코드가 포함된 경우, `import { h } from "preact";`를 임포트하거나 JSX 프래그마가 Preact에 맞게 올바르게 설정되어 있는지 확인해야 할 수 있습니다.

### 5단계: 코드에서 Intlayer 사용하기

애플리케이션 전반에서 콘텐츠 사전을 접근하세요:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // preact.svg 파일이 있다고 가정합니다
import viteLogo from "/vite.svg";
import "./app.css"; // CSS 파일 이름이 app.css라고 가정합니다
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      {/* Markdown 콘텐츠 */}
      <div>{content.myMarkdownContent}</div>

      {/* HTML 콘텐츠 */}
      <div>{content.myHtmlContent}</div>

      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> 만약 `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면, 함수의 값을 호출해야 합니다. 예를 들어:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 참고: Preact에서는 `className` 대신 일반적으로 `class`를 사용합니다.

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참고하세요 (`preact-intlayer`도 API가 유사합니다).

### (선택 사항) 6단계: 콘텐츠의 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 그에 따라 콘텐츠를 업데이트할 수 있게 해줍니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> `useLocale` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요 (`preact-intlayer`와 API가 유사합니다).

### (선택 사항) 7단계: 애플리케이션에 로컬라이즈된 라우팅 추가

이 단계의 목적은 각 언어별로 고유한 경로를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다.
예시:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 기본적으로 기본 로케일에 대해서는 경로에 접두사가 붙지 않습니다. 기본 로케일에도 접두사를 붙이려면 구성에서 `routing.mode` 옵션을 `"prefix-all"`로 설정할 수 있습니다. 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

애플리케이션에 로컬라이즈된 라우팅을 추가하려면, 애플리케이션의 경로를 래핑하고 로케일 기반 라우팅을 처리하는 `LocaleRouter` 컴포넌트를 만들 수 있습니다. 다음은 [preact-iso](https://github.com/preactjs/preact-iso)를 사용한 예시입니다:

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * preact-iso를 사용하여 내비게이션을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * preact-iso를 사용하여 내비게이션을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * preact-iso를 사용하여 내비게이션을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

그런 다음 애플리케이션에서 `LocaleRouter` 컴포넌트를 사용할 수 있습니다:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... AppContent 컴포넌트

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... AppContent 컴포넌트

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... AppContent 컴포넌트

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### (선택 사항) 8단계: 로캘이 변경될 때 URL 변경

로캘이 변경될 때 URL을 변경하려면 `useLocale` 훅에서 제공하는 `onLocaleChange` 속성을 사용할 수 있습니다. 이와 동시에 `preact-iso`의 `useLocation`에서 제공하는 `route` 메서드를 사용하여 URL 경로를 업데이트할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // 업데이트된 로캘로 URL 구성
      // 예시: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // URL 경로 업데이트
      route(pathWithLocale, true); // true는 교체(replace)를 의미
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // 로캘 설정 후의 프로그래밍 방식 내비게이션은 onLocaleChange에서 처리됩니다.
            }}
            key={localeItem}
          >
            <span>
              {/* 로캘 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 해당 로캘 자체에서의 언어명 - 예: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로캘에서의 언어명 - 예: 현재 로캘이 Locales.SPANISH일 때 Francés */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 영어에서의 언어명 - 예: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> 문서 참조:
>
> > - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md) (API는 `preact-intlayer`와 유사합니다)> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ko)> - [`lang` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/lang)> - [`dir` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` 속성](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/ko/docs/Web/API/Popover_API)

### (선택 사항) 9단계: HTML 언어 및 방향 속성 전환

애플리케이션이 다국어를 지원할 때, 현재 로케일에 맞춰 `<html>` 태그의 `lang` 및 `dir` 속성을 업데이트하는 것이 중요합니다. 이를 통해 다음을 보장할 수 있습니다:

- **접근성**: 화면 낭독기 및 보조 기술은 정확한 발음과 콘텐츠 해석을 위해 올바른 `lang` 속성에 의존합니다.
- **텍스트 렌더링**: `dir` (방향) 속성은 텍스트가 올바른 순서로 렌더링되도록 보장하여(예: 영어는 왼쪽에서 오른쪽, 아랍어나 히브리어는 오른쪽에서 왼쪽) 가독성에 필수적입니다.
- **SEO**:搜索引擎은 `lang` 속성을 사용하여 페이지의 언어를 결정하며, 이는 검색 결과에서 적절한 로컬라이즈된 콘텐츠를 제공하는 데 도움이 됩니다.

로케일이 변경될 때 이러한 속성을 동적으로 업데이트함으로써, 지원되는 모든 언어에서 사용자에게 일관되고 접근 가능한 경험을 보장할 수 있습니다.

#### 훅 구현하기

HTML 속성을 관리하기 위한 커스텀 훅을 만듭니다. 이 훅은 로케일 변경을 감지하고 그에 따라 속성을 업데이트합니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 * - `lang`: 브라우저와 검색 엔진에 페이지 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서를 보장합니다 (예: 영어는 'ltr', 아랍어는 'rtl').
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 언어 속성을 현재 로케일로 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일에 따라 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### 애플리케이션에서 훅 사용하기

로케일이 변경될 때마다 HTML 속성이 업데이트되도록 메인 컴포넌트에 훅을 통합하세요:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // AppContent에서 필요할 경우 useIntlayer는 이미 가져옴
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// 5단계에서의 AppContent 정의

const AppWithHooks: FunctionalComponent = () => {
  // 로케일에 따라 <html> 태그의 lang 및 dir 속성을 업데이트하기 위해 훅을 적용합니다.
  useI18nHTMLAttributes();

  // AppContent가 5단계의 메인 콘텐츠 표시 컴포넌트라고 가정합니다.
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// 5단계에서의 AppContent 정의

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// 5단계에서의 AppContent 정의

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

### (선택 사항) 10단계: 로컬라이즈된 링크 컴포넌트 만들기

애플리케이션의 내비게이션이 현재 로케일을 존중하도록 하려면, 커스텀 `Link` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 내부 URL에 자동으로 현재 언어 접두사를 붙입니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로컬라이즈된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하도록 돕고 사용자에게 선호하는 언어로 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에서 로컬라이즈된 링크를 사용함으로써 내비게이션이 현재 로케일 내에 머물도록 보장하여 예기치 않은 언어 전환을 방지합니다.
- **유지보수성**: 로컬라이제이션 로직을 단일 컴포넌트에 집중시켜 URL 관리를 단순화합니다.

아래는 Preact에서의 로컬라이즈된 `Link` 컴포넌트 구현 예시입니다:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주됩니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우, `getLocalizedUrl`을 사용하여 URL에 로케일 접두사를 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // 내부 링크이고 유효한 href가 제공된 경우, 로컬라이즈된 URL을 가져옵니다.
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

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주됩니다.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우, `getLocalizedUrl`을 사용하여 URL에 로케일 접두사를 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 내부 링크이고 유효한 href가 제공된 경우, 로컬라이즈된 URL을 가져옵니다.
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

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * 주어진 URL이 외부 링크인지 확인하는 유틸리티 함수입니다.
 * URL이 http:// 또는 https://로 시작하면 외부 링크로 간주됩니다.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 커스텀 Link 컴포넌트입니다.
 * 내부 링크의 경우, `getLocalizedUrl`을 사용하여 URL에 로케일 접두사를 붙입니다 (예: /fr/about).
 * 이를 통해 내비게이션이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // 내부 링크이고 유효한 href가 제공된 경우, 로컬라이즈된 URL을 가져옵니다.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### 작동 방식

- **외부 링크 감지**:  
  헬퍼 함수 `checkIsExternalLink`는 URL이 외부 링크인지 확인합니다. 외부 링크는 로컬라이제이션이 필요하지 않으므로 변경되지 않은 상태로 유지됩니다.
- **현재 로케일 검색**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.
- **URL 로컬라이즈**:  
  내부 링크(즉, 비외부 링크)의 경우, `getLocalizedUrl`을 사용하여 URL에 현재 로케일을 자동으로 접두사로 붙입니다. 즉, 사용자가 프랑스어 환경에 있을 때 `/about`을 `href`로 전달하면 `/fr/about`으로 변환됩니다.
- **링크 반환**:  
  컴포넌트는 로컬라이즈된 URL이 포함된 `<a>` 요소를 반환하여 내비게이션이 로케일과 일치하도록 보장합니다.

### (선택 사항) 11단계: Markdown 및 HTML 렌더링

Intlayer는 Preact에서 Markdown 및 HTML 콘텐츠의 렌더링을 지원합니다.

`.use()` 메서드를 사용하여 Markdown 및 HTML 콘텐츠의 렌더링을 커스터마이징할 수 있습니다. 이 메서드를 사용하면 특정 태그의 기본 렌더링을 오버라이드할 수 있습니다.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* 기본 렌더링 */}
    {myMarkdownContent}

    {/* Markdown을 위한 커스텀 렌더링 */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* HTML을 위한 기본 렌더링 */}
    {myHtmlContent}

    {/* HTML을 위한 커스텀 렌더링 */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### TypeScript 구성

Intlayer는 모듈 확장을 사용하여 TypeScript의 이점을 활용하고 코드베이스를 더 견고하게 만듭니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10 이상에서 권장됨
    // ...
  },
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

> `tsconfig.json`이 Preact에 맞게 설정되었는지 확인하세요. 특히 `jsx`와 `jsxImportSource`를 확인하고, `preset-vite`의 기본값을 사용하지 않는 구버전 Preact의 경우 `jsxFactory`/`jsxFragmentFactory`를 확인하세요.

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 커밋되는 것을 방지할 수 있습니다.

이렇게 하려면 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면, [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

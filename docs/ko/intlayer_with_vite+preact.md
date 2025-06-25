---
docName: intlayer_with_vite_preact
url: /doc/environment/vite-and-preact
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+preact.md
createdAt: 2025-04-18
updatedAt: 2025-04-18
title: Vite와 Preact의 웹사이트를 번역하십시오 (i18n)
description: Vite와 Preact를 사용한 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위해 문서를 참조하세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - Preact
  - JavaScript
---

# Intlayer와 Vite 및 Preact로 국제화(i18n) 시작하기

> 이 패키지는 개발 중입니다. 자세한 내용은 [이슈](https://github.com/aymericzip/intlayer/issues/118)를 참조하세요. 이슈에 좋아요를 눌러 Preact용 Intlayer에 대한 관심을 보여주세요.

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-vite-preact-template)을 참조하세요.

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **컴포넌트 수준의 선언적 사전을 사용하여 번역을 쉽게 관리**합니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 로컬라이즈**합니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선합니다.
- **동적 로케일 감지 및 전환**과 같은 고급 기능을 활용할 수 있습니다.

---

## Vite 및 Preact 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **preact-intlayer**
  Intlayer를 Preact 애플리케이션과 통합하는 패키지입니다. Preact 국제화를 위한 컨텍스트 공급자와 훅을 제공합니다.

- **vite-intlayer**
  [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 Intlayer를 통합하기 위한 Vite 플러그인을 포함하며, 사용자의 선호 로케일을 감지하고, 쿠키를 관리하며, URL 리디렉션을 처리하는 미들웨어를 제공합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 생성하세요:

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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합

구성에 intlayer 플러그인을 추가하세요.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite 플러그인은 Intlayer와 Vite를 통합하는 데 사용됩니다. 이는 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 별칭을 제공합니다.

### 4단계: 콘텐츠 선언

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ko: "Vite 로고",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      ko: "Preact 로고",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      ko: "카운트는 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      ko: "src/app.tsx를 편집하고 저장하여 HMR을 테스트하세요",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      ko: "Vite 및 Preact 로고를 클릭하여 자세히 알아보세요",
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
// import { h } from 'preact'; // JSX를 .mjs에서 직접 사용하는 경우 필요

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ko: "Vite 로고",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      ko: "Preact 로고",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      ko: "카운트는 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      ko: "src/app.jsx를 편집하고 저장하여 HMR을 테스트하세요",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      ko: "Vite 및 Preact 로고를 클릭하여 자세히 알아보세요",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // JSX를 .cjs에서 직접 사용하는 경우 필요

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ko: "Vite 로고",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      ko: "Preact 로고",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      ko: "카운트는 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      ko: "src/app.jsx를 편집하고 저장하여 HMR을 테스트하세요",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      ko: "Vite 및 Preact 로고를 클릭하여 자세히 알아보세요",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "ko": "Preact 로고"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "ko": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "ko": "src/app.tsx를 편집하고 저장하여 HMR을 테스트하세요"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "ko": "Vite 및 Preact 로고를 클릭하여 자세히 알아보세요"
      }
    }
  }
}
```

> 콘텐츠 선언은 애플리케이션의 어디에서나 정의할 수 있으며, `contentDir` 디렉토리(기본값: `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)를 참조하세요.

> 콘텐츠 파일에 TSX 코드가 포함된 경우, `import { h } from "preact";`를 가져오거나 JSX 프래그마가 Preact에 대해 올바르게 설정되었는지 확인해야 할 수 있습니다.

### 5단계: 코드에서 Intlayer 사용하기

애플리케이션 전반에서 콘텐츠 사전을 액세스합니다:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // preact.svg 파일이 있다고 가정
import viteLogo from "/vite.svg";
import "./app.css"; // CSS 파일 이름이 app.css라고 가정
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

> `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면 함수의 값을 호출해야 합니다:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> 참고: Preact에서는 `className` 대신 일반적으로 `class`를 사용합니다.

> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요 (`preact-intlayer`의 API도 유사합니다).

### (선택 사항) 6단계: 콘텐츠 언어 변경하기

`useLocale` 훅에서 제공하는 `setLocale` 함수를 사용하여 콘텐츠의 언어를 변경할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 콘텐츠를 업데이트합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      영어로 언어 변경

import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      언어를 영어로 변경
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
      언어를 영어로 변경
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> `useLocale` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요 (`preact-intlayer`의 API는 유사합니다).

### (선택 사항) 단계 7: 애플리케이션에 로컬화된 라우팅 추가

이 단계의 목적은 각 언어에 고유한 라우트를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다. 예:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> 기본적으로, 기본 로케일에 대해 라우트는 접두사가 없습니다. 기본 로케일에 접두사를 추가하려면 구성에서 `middleware.prefixDefault` 옵션을 `true`로 설정할 수 있습니다. 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

애플리케이션에 로컬화된 라우팅을 추가하려면 애플리케이션의 라우트를 래핑하고 로케일 기반 라우팅을 처리하는 `LocaleRouter` 컴포넌트를 생성할 수 있습니다. 다음은 [preact-iso](https://github.com/preactjs/preact-iso)를 사용하는 예제입니다:

먼저 `preact-iso`를 설치합니다:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * 로컬화를 처리하고 적절한 로케일 컨텍스트로 자식을 래핑하는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 현재 로케일을 결정하고 제공되지 않은 경우 기본값으로 대체
  const currentLocale = locale ?? defaultLocale;

  // 로케일 접두사를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우 기본 로케일은 항상 접두사가 있어야 합니다.
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

    // 자식을 IntlayerProvider로 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우 기본 로케일은 접두사가 없습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아닌지 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인
    ) {
      // 로케일 접두사가 없는 경로로 리디렉션
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 자식을 IntlayerProvider로 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * 로케일별 라우트를 설정하는 라우터 컴포넌트입니다.
 * preact-iso를 사용하여 탐색을 관리하고 로컬화된 컴포넌트를 렌더링합니다.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// 필요한 종속성과 함수 가져오기
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // JSX에 필요

// Intlayer에서 구성 구조 분해
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * 로컬화를 처리하고 적절한 로케일 컨텍스트로 자식을 래핑하는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 현재 로케일을 결정하고 제공되지 않은 경우 기본값으로 대체
  const currentLocale = locale ?? defaultLocale;

  // 로케일 접두사를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true인 경우 기본 로케일은 항상 접두사가 있어야 합니다.
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

    // 자식을 IntlayerProvider로 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false인 경우 기본 로케일은 접두사가 없습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아닌지 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인
    ) {
      // 로케일 접두사가 없는 경로로 리디렉션
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // 자식을 IntlayerProvider로 래핑하고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * middleware.prefixDefault가 false일 때, 기본 로케일은 접두어로 사용되지 않습니다.
 * 현재 로케일이 유효하고 기본 로케일이 아닌지 확인합니다.
 */
if (
  currentLocale.toString() !== defaultLocale.toString() &&
  !locales
    .filter(
      (loc) => loc.toString() !== defaultLocale.toString() // 기본 로케일 제외
    )
    .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인
) {
  // 로케일 접두어가 없는 경로로 리디렉션
  return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
}

// IntlayerProvider로 children을 감싸고 현재 로케일 설정
return (
  <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
);
}
};

const RouterContent = ({ children }) => {
const { path } = useLocation();

if (!path) {
  return null;
}

const pathLocale = path.split("/")[1];

const isLocaleRoute = locales
  .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
  .some((locale) => locale.toString() === pathLocale);

if (isLocaleRoute) {
  return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
}

return (
  <AppLocalized
    locale={!middleware.prefixDefault ? defaultLocale : undefined}
  >
    {children}
  </AppLocalized>
);
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * preact-iso를 사용하여 네비게이션을 관리하고 로케일화된 컴포넌트를 렌더링합니다.
 */
export const LocaleRouter = ({ children }) => (
<LocationProvider>
  <RouterContent>{children}</RouterContent>
</LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// 필요한 종속성과 함수 가져오기
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // JSX에 필요

// Intlayer에서 설정 구조 분해
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * 로케일 처리를 담당하며 children을 적절한 로케일 컨텍스트로 감싸는 컴포넌트입니다.
 * URL 기반 로케일 감지 및 유효성을 관리합니다.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // 현재 로케일을 결정하며, 제공되지 않은 경우 기본값을 사용
  const currentLocale = locale ?? defaultLocale;

  // 경로에서 로케일 접두어를 제거하여 기본 경로를 구성
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // 현재 URL 경로
  );

  /**
   * middleware.prefixDefault가 true일 경우, 기본 로케일은 항상 접두어로 사용되어야 합니다.
   */
  if (middleware.prefixDefault) {
    // 로케일 유효성 검사
    if (!locale || !locales.includes(locale)) {
      // 기본 로케일로 업데이트된 경로로 리디렉션
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // 현재 히스토리 항목을 새로운 항목으로 대체
        />
      );
    }

    // IntlayerProvider로 children을 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * middleware.prefixDefault가 false일 때, 기본 로케일은 접두어로 사용되지 않습니다.
     * 현재 로케일이 유효하고 기본 로케일이 아닌지 확인합니다.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // 기본 로케일 제외
        )
        .includes(currentLocale) // 현재 로케일이 유효한 로케일 목록에 있는지 확인
    ) {
      // 로케일 접두어가 없는 경로로 리디렉션
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // IntlayerProvider로 children을 감싸고 현재 로케일 설정
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * 로케일별 경로를 설정하는 라우터 컴포넌트입니다.
 * preact-iso를 사용하여 네비게이션을 관리하고 로케일화된 컴포넌트를 렌더링합니다.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

그런 다음, 애플리케이션에서 `LocaleRouter` 컴포넌트를 사용할 수 있습니다:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... AppContent 컴포넌트 (5단계에서 정의됨)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... AppContent 컴포넌트 (5단계에서 정의됨)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... AppContent 컴포넌트 (5단계에서 정의됨)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

동시에, `intLayerMiddlewarePlugin`을 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수도 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 사용자의 브라우저 언어 설정에 따라 가장 적합한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (선택 사항) 8단계: 로케일 변경 시 URL 변경

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso는 전체 URL을 제공합니다.
      // 업데이트된 로케일로 URL 생성
      // 예: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // URL 경로 업데이트
      route(pathWithLocale, true); // true는 replace를 의미
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // 로케일 설정 후 프로그래밍 탐색은 onLocaleChange에서 처리됩니다.
            }}
            key={localeItem}
          >
            <span>
              {/* 로케일 - 예: FR */}
              {localeItem}
            </span>
            <span>
              {/* 로케일 자체 언어 - 예: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 현재 로케일에서의 언어 - 예: Francés (현재 로케일이 Locales.SPANISH로 설정된 경우) */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // JSX를 위해 필요

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
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
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // JSX를 위해 필요

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
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

module.exports = LocaleSwitcher;
```

> 문서 참조:
>
> - [`useLocale` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md) (`preact-intlayer`와 API 유사)
> - [`getLocaleName` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` 훅](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/intlayer/getHTMLTextDir.md)
> - [`hreflang` 속성](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ko)
> - [`lang` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/lang)
> - [`dir` 속성](https://developer.mozilla.org/ko/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` 속성](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [Popover API](https://developer.mozilla.org/ko/docs/Web/API/Popover_API)

---

### (선택 사항) 단계 9: HTML 언어 및 방향 속성 전환

애플리케이션이 여러 언어를 지원할 경우, `<html>` 태그의 `lang` 및 `dir` 속성을 현재 로케일에 맞게 업데이트하는 것이 중요합니다. 이렇게 하면 다음을 보장할 수 있습니다:

- **접근성**: 스크린 리더 및 보조 기술은 올바른 `lang` 속성을 사용하여 콘텐츠를 정확히 발음하고 해석합니다.
- **텍스트 렌더링**: `dir`(방향) 속성은 텍스트가 올바른 순서로 렌더링되도록 보장합니다(예: 영어는 왼쪽에서 오른쪽, 아랍어나 히브리어는 오른쪽에서 왼쪽).
- **SEO**: 검색 엔진은 페이지의 언어를 결정하기 위해 `lang` 속성을 사용하며, 검색 결과에서 적절한 로컬라이즈된 콘텐츠를 제공합니다.

로케일 변경 시 이러한 속성을 동적으로 업데이트하면, 모든 지원 언어에서 일관되고 접근 가능한 사용자 경험을 보장할 수 있습니다.

#### 훅 구현

HTML 속성을 관리하는 커스텀 훅을 생성합니다. 이 훅은 로케일 변경을 감지하고 속성을 적절히 업데이트합니다:

import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/\*\*

- 현재 로케일에 따라 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
- - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
- - `dir`: 올바른 읽기 순서를 보장합니다 (예: 영어는 'ltr', 아랍어는 'rtl').
-
- 이 동적 업데이트는 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
  \*/
  export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

useEffect(() => {
// 현재 로케일에 따라 언어 속성을 업데이트합니다.
document.documentElement.lang = locale;

    // 현재 로케일에 따라 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);

}, [locale]);
};

````

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
````

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

로케일이 변경될 때마다 HTML 속성이 업데이트되도록 훅을 메인 컴포넌트에 통합합니다:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // AppContent가 필요하면 useIntlayer가 이미 가져와짐
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Step 5에서 정의된 AppContent

const AppWithHooks: FunctionalComponent = () => {
  // 로케일에 따라 <html> 태그의 lang 및 dir 속성을 업데이트하는 훅을 적용합니다.
  useI18nHTMLAttributes();

  // AppContent가 Step 5에서 가져온 메인 콘텐츠 디스플레이 컴포넌트라고 가정합니다.
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
// Step 5에서 정의된 AppContent

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
// Step 5에서 정의된 AppContent

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

이 변경 사항을 적용하면 애플리케이션은 다음을 보장합니다:

- **언어** (`lang`) 속성이 현재 로케일을 정확히 반영하여 SEO와 브라우저 동작에 중요합니다.
- 로케일에 따라 **텍스트 방향** (`dir`)을 조정하여 다른 읽기 순서를 가진 언어의 가독성과 사용성을 향상시킵니다.
- **접근성**을 개선하여 보조 기술이 최적의 방식으로 작동할 수 있도록 합니다.

### (선택 사항) Step 10: 로케일화된 링크 컴포넌트 생성

애플리케이션의 탐색이 현재 로케일을 준수하도록 하려면 사용자 정의 `Link` 컴포넌트를 생성할 수 있습니다. 이 컴포넌트는 내부 URL에 현재 언어를 자동으로 접두사로 추가합니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로케일화된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하고 사용자가 선호하는 언어로 콘텐츠를 제공하도록 돕습니다.
- **일관성**: 애플리케이션 전체에서 로케일화된 링크를 사용하면 탐색이 현재 로케일 내에서 유지되어 예상치 못한 언어 전환을 방지합니다.
- **유지 관리 용이성**: 로케일화 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화할 수 있습니다.

Preact에서 `preact-iso`를 사용하는 경우 탐색에는 일반적으로 표준 `<a>` 태그가 사용되며, `preact-iso`가 라우팅을 처리합니다. 클릭 시 프로그래밍 방식으로 탐색이 필요하다면(예: 탐색 전에 작업 수행), `useLocation`의 `route` 함수를 사용할 수 있습니다. 다음은 URL을 로케일화하는 사용자 정의 앵커 컴포넌트를 만드는 방법입니다:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // useLocation 및 route는 preact-intlayer에서 재내보내기되거나, 직접 가져오기
// 재내보내기되지 않은 경우 직접 가져오기: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // HTMLAttributes를 위해
import { forwardRef } from "preact/compat"; // ref 전달을 위해

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // 선택 사항: 히스토리 상태를 대체
}

/**
 * 주어진 URL이 외부 URL인지 확인하는 유틸리티 함수.
 * URL이 http:// 또는 https://로 시작하면 외부 URL로 간주됩니다.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * 현재 로케일에 따라 href 속성을 조정하는 사용자 정의 Link 컴포넌트.
 * 내부 링크의 경우 `getLocalizedUrl`을 사용하여 URL에 로케일을 접두사로 추가합니다 (예: /fr/about).
 * 이를 통해 탐색이 동일한 로케일 컨텍스트 내에서 유지되도록 보장합니다.
 * 표준 <a> 태그를 사용하지만 preact-iso의 `route`를 사용하여 클라이언트 측 탐색을 트리거할 수 있습니다.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // preact-iso에서 가져옴
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // href가 정의되어 있는지 확인
        event.button === 0 && // 왼쪽 클릭
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // 표준 수정자 확인
        !props.target // 새 탭/창을 대상으로 하지 않음
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // URL이 다를 경우에만 탐색
          route(hrefI18n, replace); // preact-iso의 route 사용
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";

import { useLocation, route } from "preact-iso"; // preact-iso에서 가져오기
import { forwardRef } from "preact/compat";
import { h } from "preact"; // JSX를 위해

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // preact-iso에서 가져오기
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // JSX를 위해

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### 작동 방식

- **외부 링크 감지**:  
  `checkIsExternalLink` 헬퍼 함수는 URL이 외부 링크인지 확인합니다. 외부 링크는 변경되지 않습니다.
- **현재 로케일 가져오기**:  
  `useLocale` 훅은 현재 로케일을 제공합니다.
- **URL 로컬라이징**:  
  내부 링크의 경우, `getLocalizedUrl`이 URL에 현재 로케일을 접두사로 추가합니다.
- **클라이언트 사이드 내비게이션**:  
  `handleClick` 함수는 내부 링크인지와 표준 내비게이션을 방지해야 하는지 확인합니다. 그렇다면, `preact-iso`의 `route` 함수를 사용하여 클라이언트 사이드 내비게이션을 수행합니다. 이를 통해 전체 페이지 새로고침 없이 SPA와 같은 동작을 제공합니다.
- **링크 반환**:  
  컴포넌트는 로컬라이즈된 URL과 커스텀 클릭 핸들러를 가진 `<a>` 요소를 반환합니다.

### TypeScript 구성

Intlayer는 TypeScript의 모듈 확장을 사용하여 코드베이스를 더 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입을 포함해야 합니다.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Preact 10+에 권장
    // ...
  },
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

> `tsconfig.json`이 Preact에 맞게 설정되었는지 확인하세요. 특히 `jsx`와 `jsxImportSource` 또는 `jsxFactory`/`jsxFragmentFactory`는 `preset-vite`의 기본값을 사용하지 않는 경우 필요합니다.

### Git 구성

Intlayer에서 생성된 파일을 Git에서 무시하는 것이 좋습니다. 이를 통해 이러한 파일을 Git 저장소에 커밋하지 않을 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성 및 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

## 더 나아가려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

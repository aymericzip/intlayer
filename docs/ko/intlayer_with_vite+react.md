# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**합니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 로컬라이즈**합니다.
- **자동 생성된 타입을 통해 TypeScript 지원을 보장**하여 자동 완성과 오류 감지를 개선합니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능**을 활용할 수 있습니다.

---

## Vite 및 React 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 컨텍스트 제공자 및 훅을 제공합니다.

- **vite-intlayer**
  [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 Intlayer를 통합하기 위한 Vite 플러그인을 포함하며, 사용자의 선호 로케일을 감지하고, 쿠키를 관리하며, URL 리디렉션을 처리하는 미들웨어를 제공합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 구성 파일을 생성합니다:

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

구성에 intlayer 플러그인을 추가합니다.

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

> `intlayerPlugin()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이는 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하고 성능 최적화를 위한 별칭을 제공합니다.

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
      // React 노드를 콘텐츠에 사용하는 경우 React를 가져오는 것을 잊지 마세요
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

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값: `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값: `.content.{ts,tsx,js,jsx,mjs,cjs}`)와 일치하는 한 애플리케이션 어디에서나 정의할 수 있습니다. 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/dictionary/get_started.md)를 참조하세요.  
> 콘텐츠 파일에 TSX 코드가 포함된 경우, 콘텐츠 파일에서 `import React from "react";`를 가져오는 것을 고려해야 합니다.

### 5단계: 코드에서 Intlayer 사용

애플리케이션 전반에서 콘텐츠 사전을 액세스합니다:

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

> `useIntlayer` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

### (선택 사항) 6단계: 콘텐츠 언어 변경

애플리케이션의 로케일을 설정하고 콘텐츠를 업데이트하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

> `useLocale` 훅에 대해 자세히 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/packages/react-intlayer/useLocale.md)를 참조하세요.

### (선택 사항) 7단계: 애플리케이션에 로컬라이즈된 라우팅 추가

이 단계의 목적은 각 언어에 대해 고유한 라우트를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다.  
예시:

```plaintext
- https://example.com/about
- https://example.com/ko/about
- https://example.com/fr/about
```

> 기본적으로 기본 로케일에 대해 라우트가 접두사가 붙지 않습니다. 기본 로케일에 접두사를 붙이고 싶다면 구성에서 `middleware.prefixDefault` 옵션을 `true`로 설정할 수 있습니다. 자세한 내용은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

### TypeScript 구성

Intlayer는 TypeScript의 모듈 확장을 사용하여 코드베이스를 더 강력하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

자동 생성된 타입을 포함하도록 TypeScript 구성을 설정하세요.

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

Intlayer에서 생성된 파일을 Git 저장소에 커밋하지 않도록 무시하는 것이 좋습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```plaintext
# Intlayer에서 생성된 파일 무시
.intlayer
```

### 더 알아보기

더 알아보려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

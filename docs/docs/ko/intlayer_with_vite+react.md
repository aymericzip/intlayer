---
createdAt: 2024-03-07
updatedAt: 2026-08-30
title: "Vite + React i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Vite + React 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 이력"
author: aymericzip
---

# Intlayer로 Vite 및 React 번역하기 | 국제화(i18n)

## 목차

<TOC/>

## 왜 다른 대안들 대신 Intlayer를 선택해야 하나요?

react-i18next나 i18next와 같은 주요 솔루션과 비교했을 때, Intlayer는 다음과 같은 통합된 최적화 기능을 제공하는 솔루션입니다:

<AccordionGroup>
<Accordion header="완벽한 Vite 및 React 지원">

Intlayer는 **컴포넌트 수준의 콘텐츠 스코핑**, **지연 로드(lazy-loaded) 번역**, 그리고 국제화(i18n) 확장에 필요한 모든 기능을 제공하여 Vite 및 React와 완벽하게 작동하도록 최적화되어 있습니다.

</Accordion>

<Accordion header="번들 크기">

페이지에 방대한 JSON 파일을 로드하는 대신, 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%까지 줄이는 데** 도움을 줍니다.

</Accordion>

<Accordion header="유지보수성">

애플리케이션의 콘텐츠를 스코핑하면 대규모 애플리케이션의 **유지보수가 용이해집니다**. 전체 콘텐츠 codebase를 검토해야 한다는 심리적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한, Intlayer는 콘텐츠의 정확성을 보장하기 위해 **완벽한 타입 지정(fully typed)**을 지원합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치(Co-locating)하면 대규모 언어 모델(LLM)에 필요한 문맥이 줄어듭니다. Intlayer는 또한 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**, 그리고 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**과 같은 도구 모음을 제공하여 AI 에이전트의 개발자 경험(DX)을 더욱 원활하게 만듭니다.

</Accordion>

<Accordion header="자동화">

AI 제공업체의 비용으로 원하는 LLM을 사용하여 CI/CD 파이프라인에서 번역을 자동화하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**뿐만 아니라, **백그라운드에서 번역**을 도와주는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

방대한 JSON 파일을 컴포넌트에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 타임에 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="비개발자와의 확장성">

단순한 i18n 솔루션 그 이상으로, Intlayer는 **자체 호스팅 가능한 [시각적 편집기(visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공하여 다국어 콘텐츠를 **실시간**으로 관리할 수 있게 도와주며, 번역가, 카피라이터 및 기타 팀원과의 협업을 원활하게 만듭니다. 콘텐츠는 로컬 및/또는 원격으로 저장할 수 있습니다.

</Accordion>
</AccordionGroup>

---

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Vite와 React를 위한 최고의 i18n 솔루션? Intlayer를 발견하세요" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

'react-i18next' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>
<Accordion header="전체 Vite 및 React 적용 범위">

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`을 사용하세요.

Intlayer는 **구성 요소 수준 콘텐츠 범위 지정**, **지연 로드 번역** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Vite 및 React와 완벽하게 작동하도록 최적화되었습니다.

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

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  국제화 도구를 제공하는 핵심 패키지로, 설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일레이션, 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 포함합니다.

- **react-intlayer**
  Intlayer를 React 애플리케이션과 통합하는 패키지입니다. React 국제화를 위한 context providers와 hooks을 제공합니다.

- **vite-intlayer**
  Intlayer를 [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인, 그리고 사용자의 선호 로케일 감지, 쿠키 관리, URL 리다이렉션 처리를 위한 미들웨어를 포함합니다.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 모든 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하십시오.

</Accordion>

<Accordion header="유지관리성">

intlayer 플러그인을 구성에 추가하세요.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ko: "Vite 로고",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ko: "React 로고",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ko: "카운트는 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      ko: (
        <>
          <code>src/App.tsx</code>를 수정하고 저장하여 HMR을 테스트하세요
        </>
      ),
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
      ko: "Vite 및 React 로고를 클릭하여 자세히 알아보세요",
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
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
        "ko": "Vite 로고",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "ko": "React 로고",
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "ko": "Vite + React",
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "ko": "카운트는 ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ko": "src/App.tsx를 수정하고 저장하여 HMR을 테스트하세요",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ko": "Vite 및 React 로고를 클릭하여 자세히 알아보세요",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값: `./src`)에 포함되는 한 애플리케이션의 어느 곳에든 정의할 수 있습니다. 그리고 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

> 콘텐츠 파일에 TSX 코드가 포함되어 있다면, 콘텐츠 파일에 `import React from "react";`를 import하는 것을 고려해야 합니다.

</Accordion>

<Accordion header="오토메이션">

애플리케이션 전체에서 콘텐츠 사전에 접근하세요:

```tsx {5,9} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

> `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면 함수의 값을 다음과 같이 사용할 수 있습니다:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참조하세요.

AI 공급자의 비용으로 선택한 LLM을 사용하여 CI/CD 파이프라인을 번역하려면 자동화를 사용하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**을 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

대규모 JSON 파일을 구성 요소에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> `useLocale` hook에 대해 자세히 알아보려면 [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useLocale.md)을 참조하세요.

</Accordion>

<Accordion header="개발자가 없는 경우 확장">

이 단계의 목적은 각 언어에 대한 고유한 경로를 만드는 것입니다. 이는 SEO 및 SEO 친화적인 URL에 유용합니다.
예시:

```- https://example.com/about
- https://example.com/ko/about
- https://example.com/fr/about
```

Intlayer는 단순한 i18n 솔루션 그 이상으로 관리에 도움이 되는 **자체 호스팅 [비주얼 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** 및 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공합니다. 다국어 콘텐츠를 **실시간**으로 제공하여 번역가, 카피라이터, 기타 팀원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

애플리케이션에 로컬라이제이션된 라우팅을 추가하려면 애플리케이션의 라우트를 래핑하고 로캘 기반 라우팅을 처리하는 `LocaleRouter` 컴포넌트를 만들 수 있습니다. 다음은 [React Router](https://reactrouter.com/home)를 사용한 예시입니다:

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer"; // 'intlayer'의 유틸리티 함수 및 타입
import type { FC, PropsWithChildren } from "react"; // 함수형 컴포넌트 및 props에 대한 React 타입
import { IntlayerProvider } from "react-intlayer"; // 국제화 컨텍스트를 위한 Provider
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 네비게이션을 관리하기 위한 Router 컴포넌트

/**
 * 로케일별 라우트를 설정하는 라우터 컴포넌트입니다.
 * React Router를 사용하여 네비게이션을 관리하고 로컬라이즈된 컴포넌트를 렌더링합니다.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // 로케일(/en/, /fr/ 등)을 캡처하고 이후의 모든 경로와 일치하는 라우트 패턴
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // 로케일 관리를 위해 children을 래핑합니다
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

> 참고: `routing.mode: 'no-prefix' | 'search-params'`를 사용하는 경우, `localeMap` 함수를 사용할 필요가 없을 가능성이 높습니다.

그러면 애플리케이션에서 `LocaleRouter` 컴포넌트를 사용할 수 있습니다:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Your AppContent component

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

또한 `intlayerProxy`를 사용하여 애플리케이션에 서버 측 라우팅을 추가할 수 있습니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 플러그인은 사용자의 브라우저 언어 설정을 기반으로 가장 적절한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리다이렉트합니다.

</Accordion>
</AccordionGroup>

---

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

<Steps>

<Step number={8} title="로케일이 변경될 때 URL 변경하기" isOptional={true}>

로케일이 변경될 때 URL을 변경하려면, `useLocale` 훅에서 제공하는 `onLocaleChange` 속성을 사용할 수 있습니다. 동시에, `react-router-dom`의 `useLocation`과 `useNavigate` 훅을 사용하여 URL 경로를 업데이트할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

</Step>

<Step number={9} title="HTML 언어 및 방향 속성 전환" isOptional={true}>

애플리케이션이 여러 언어를 지원할 때, `<html>` 태그의 `lang` 및 `dir` 속성을 현재 로케일과 일치하도록 업데이트하는 것이 중요합니다. 이렇게 하면 다음을 보장합니다:

- **접근성**: 스크린 리더와 보조 기술은 올바른 `lang` 속성에 의존하여 콘텐츠를 정확하게 발음하고 해석합니다.
- **텍스트 렌더링**: `dir` (방향) 속성은 텍스트가 올바른 순서로 렌더링되도록 보장합니다(예: 영어의 경우 좌에서 우로, 아랍어 또는 히브리어의 경우 우에서 좌로). 이는 가독성에 필수적입니다.
- **SEO**: 검색 엔진은 `lang` 속성을 사용하여 페이지의 언어를 결정하고 검색 결과에서 올바른 지역화된 콘텐츠를 제공하는 데 도움을 줍니다.

로케일이 변경될 때 이러한 속성들을 동적으로 업데이트함으로써, 지원하는 모든 언어에서 사용자에게 일관되고 접근 가능한 경험을 보장합니다.

#### Hook 구현하기

HTML 속성을 관리하기 위한 커스텀 hook을 생성합니다. 이 hook은 로케일 변경을 감지하고 그에 따라 속성을 업데이트합니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 현재 로케일을 기반으로 HTML <html> 요소의 `lang` 및 `dir` 속성을 업데이트합니다.
 * - `lang`: 브라우저와 검색 엔진에 페이지의 언어를 알립니다.
 * - `dir`: 올바른 읽기 순서를 보장합니다 (예: 영어의 경우 'ltr', 아랍어의 경우 'rtl').
 *
 * 이 동적 업데이트는 올바른 텍스트 렌더링, 접근성 및 SEO에 필수적입니다.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // 언어 속성을 현재 로케일로 업데이트합니다.
    document.documentElement.lang = locale;

    // 현재 로케일을 기반으로 텍스트 방향을 설정합니다.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### 훅 구현하기

HTML 속성을 관리하는 커스텀 훅을 만듭니다. 이 훅은 로케일 변경을 감지하여 속성을 적절히 업데이트합니다:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
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

이러한 변경 사항을 적용하면 애플리케이션은 다음을 수행합니다:

- **언어** (`lang`) 속성이 현재 로캘을 올바르게 반영하는지 확인하세요. 이는 SEO와 브라우저 동작에 중요합니다.
- 로캘에 따라 **텍스트 방향** (`dir`)을 조정하여 다양한 읽기 순서를 가진 언어의 가독성과 사용성을 향상시키세요.
- **접근성** 있는 경험을 제공하세요. 보조 기술은 최적의 기능을 위해 이러한 속성에 의존합니다.

</Step>

<Step number={10} title="지역화된 링크 컴포넌트 만들기" isOptional={true}>

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 커스텀 `Link` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 내부 URL에 자동으로 현재 언어 접두사를 붙여줍니다. 예를 들어, 프랑스어 사용자가 "About" 페이지로 가는 링크를 클릭하면 `/about` 대신 `/fr/about`로 리디렉션됩니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 지역화된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하도록 돕고, 사용자가 선호하는 언어로 된 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에 걸쳐 지역화된 링크를 사용함으로써 내비게이션이 현재 로케일 내에서 유지되어 예기치 않은 언어 전환을 방지합니다.
- **유지보수성**: 로컬라이제이션 로직을 단일 컴포넌트에 중앙 집중화하면 URL 관리를 단순화하여 애플리케이션이 성장함에 따라 코드베이스를 더 쉽게 유지보수하고 확장할 수 있습니다.

아래는 TypeScript로 구현한 로컬라이즈된 `Link` 컴포넌트입니다:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
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

#### 작동 방식

- **외부 링크 감지**:  
  헬퍼 함수 `checkIsExternalLink`는 지정된 URL이 외부 링크인지 여부를 판단합니다. 외부 링크는 현지화할 필요가 없으므로 변경되지 않은 상태로 유지됩니다.

- **현재 로케일 가져오기**:  
  `useLocale` 훅은 현재 로케일(예: 프랑스어의 경우 `fr`)을 제공합니다.

- **URL 현지화**:  
  내부 링크(즉, 외부 링크가 아닌 링크)의 경우, `getLocalizedUrl`을 사용하여 현재 로케일로 URL 접두사를 자동으로 붙입니다. 즉, 사용자가 프랑스어 환경인 경우 `/about`을 `href`로 전달하면 `/fr/about`으로 변환됩니다.

- **링크 반환**:  
  이 컴포넌트는 로컬라이즈된 URL이 적용된 `<a>` 요소를 반환하여 내비게이션이 로케일과 일치하도록 보장합니다.

애플리케이션 전반에 이 `Link` 컴포넌트를 통합함으로써, 일관되고 언어를 인식하는 사용자 경험을 유지하는 동시에 개선된 SEO 및 사용성 이점을 누릴 수 있습니다.

</Step>

<Step number={11} title="컴포넌트 콘텐츠 추출" isOptional={true}>

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 많이 걸릴 수 있습니다.

이 프로세스를 용이하게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하기 위한 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러 활성화 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환 후 컴포넌트를 저장할지 여부를 나타냅니다. 그렇게 하면 컴파일러를 한 번만 실행하여 앱을 변환한 다음 제거할 수 있습니다.
     */
    saveComponents: false,

    /**
     * 사전 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='추출 명령'>

컴포넌트를 변환하고 콘텐츠를 추출하기 위해 추출기를 실행합니다

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel 컴파일러'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함합니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # 또는 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 또는 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 또는 yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (선택) 사이트맵과 robots.txt(빌드 시 생성)

Intlayer는 `generateSitemap`과 `getMultilingualUrls`로 크롤러용 다국어 `sitemap.xml`과 `robots.txt`를 만들어 `public/`에 자동으로 쓸 수 있습니다. 보통 Vite 실행 **전에** 작은 Node 스크립트를 돌립니다(예: npm `predev` / `prebuild`).

#### 사이트맵

Intlayer 사이트맵 생성기는 로케일 설정을 반영하고 크롤러용 메타데이터를 포함합니다.

> 생성된 사이트맵은 `xhtml:link`(hreflang)를 지원합니다. 단순 URL 나열이 아니라 각 페이지의 모든 언어 버전을 양방향으로 연결합니다(예: `/about`, `/fr/about`, `/about?lang=fr` - 라우팅 모드에 따름).

#### Robots.txt

`getMultilingualUrls`로 `Disallow`가 민감 경로의 모든 현지화 변형에 적용되도록 하세요.

#### 1. 프로젝트 루트에 `generate-seo.mjs` 추가

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

스크립트가 `intlayer`를 import하려면 패키지가 설치되어 있어야 합니다. 프로덕션에서는 환경 변수 `SITE_URL`을 설정하세요(CI 등).

> Node ESM에는 `generate-seo.mjs` 사용을 권장합니다. `generate-seo.js`를 쓰면 `package.json`의 `"type": "module"` 등으로 ESM을 켜세요.

#### 2. Vite 전에 스크립트 실행

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

pnpm이나 yarn을 쓰면 명령을 맞게 바꾸세요. CI에서 호출해도 됩니다.

### TypeScript 설정

Intlayer는 TypeScript의 이점을 활용하고 codebase를 더욱 강력하게 만들기 위해 module augmentation을 사용합니다.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 설정에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer에 의해 생성된 파일들을 무시할 것을 권장합니다. 이를 통해 해당 파일들이 Git 리포지토리에 커밋되는 것을 방지할 수 있습니다.

이를 위해, `.gitignore` 파일에 다음 내용을 추가할 수 있습니다:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer와 함께하는 개발 환경을 개선하기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성(Autocompletion)**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업(Quick actions)**.

확장 프로그램 사용법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

## 자주 묻는 질문

<FAQ>

<Question title="Vite 및 React 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

Vite 자체는 i18n에 대해 특정 방식을 강제하지 않으므로 React 생태계의 일반적인 옵션들을 사용할 수 있습니다:

- **`react-i18next` / `i18next`**: 가장 널리 사용되며, 런타임에 JSON 네임스페이스를 로드합니다.
- **`react-intl`** 및 **`Lingui`**: ICU 메시지 포맷 기반이며, 추출(extraction) 방식을 사용합니다.
- **`Intlayer`**: 가장 진보된 솔루션입니다. 코드베이스 어디에나 콘텐츠를 선언할 수 있으며([각 컴포넌트 옆 또는 중앙 집중식](https://intlayer.org/ko/blog/per-component-vs-centralized-i18n)), 빌드 타임에 Vite 플러그인을 통해 컴파일되고, 완전한 타입 안전성을 제공하며 AI 번역, 비주얼 에디터 및 CMS를 지원합니다.

특히 Vite에서 Intlayer는 빌드 프로세스에 직접 연결되므로 번역이 런타임에 JSON으로 가져오는 대신 컴파일 타임에 해석되고 트리 쉐이킹(tree-shaking)됩니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="i18n이 Vite 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거되며, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 react-i18next나 react-intl에서 마이그레이션할 수 있나요?">

네, 두 가지 방법이 있습니다. [react-i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_react-i18next_to_intlayer.md) 또는 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 통해 콘텐츠를 점진적으로 마이그레이션할 수 있습니다. 또는 현재 API를 완전히 유지할 수도 있습니다. [호환 어댑터(compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)는 `react-i18next`, `react-intl`, `i18next`와 완전히 동일한 API를 노출하면서 Intlayer 사전에서 데이터를 제공하므로, import 구문만 변경하고 컴포넌트 코드는 그대로 유지할 수 있습니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 컴포넌트를 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. 이 가이드의 11단계를 확인하세요.

완전 자동화된 파이프라인을 위해 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)는 빌드 타임에 동일한 작업을 수행합니다: 변경될 때마다 JSX, TSX, Vue 및 Svelte 소스를 스캔하고 사전을 생성하며 핫 모듈 교체(HMR)를 통해 동기화 상태를 유지하므로 키를 수동으로 관리할 필요가 전혀 없습니다.

컴파일러를 활성화하기 전에 두 가지 제한 사항을 알아두면 좋습니다. 정적 분석으로 작동하므로 API 오류 코드나 CMS 필드와 같이 런타임에만 존재하는 문자열은 캡처할 수 없습니다. 또한 `className="active"`나 상태 코드와 같은 애플리케이션 로직과 사용자 대면 텍스트를 구분해야 하므로 대규모 코드베이스에서는 몇 가지 주석이 필요할 수 있습니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 사용하면 직접 검토하면서 이 두 가지 문제를 모두 피할 수 있습니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="Intlayer는 Vite의 개발 서버 및 HMR과 호환되나요?">

네. `intlayer()` Vite 플러그인은 `.content.ts` 파일을 감시하고 저장 시 사전을 다시 빌드하므로 개발 서버를 다시 시작하지 않아도 편집 내용이 반영됩니다. 타입 정의도 동시에 다시 생성되어 자동 완성이 동기화 상태를 유지합니다.

</Question>

<Question title="Vite 및 React SPA에서 로케일 인식 라우팅을 설정하려면 어떻게 하나요?">

Intlayer는 로케일 확인을 처리하고 라우팅은 사용 중인 라우터에 맡깁니다. React Router의 경우 전용 [React Router v7 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_router_v7.md)를 따르세요. 라우터가 없는 앱의 경우 `routing.mode`를 `"no-prefix"` 또는 `"search-params"`로 설정하여 로케일을 경로 대신 쿠키나 쿼리 파라미터에 저장할 수 있습니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="클라이언트 렌더링 Vite 앱에서 SEO 메타데이터는 어떻게 처리하나요?">

활성 로케일을 기반으로 `html` 요소의 `lang` 및 `dir` 속성을 설정하고, `getMultilingualUrls`를 사용하여 선언된 모든 로케일에 대해 `hreflang` 대체 링크를 생성합니다. 안정적인 크롤링이 필요한 페이지의 경우 [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_tanstack.md)나 [React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_router_v7.md)과 같은 사전 렌더링 또는 서버 렌더링 설정을 사용하는 것이 좋습니다.

</Question>

<Question title="AI를 사용하여 Vite 앱을 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. CLI가 누락된 번역을 감지하고 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 채워줍니다. `--git-diff`를 사용하면 브랜치에서 변경된 콘텐츠로만 번역 범위를 제한할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 복수형, 성별 및 서식 있는 텍스트(Rich Text)를 지원하나요?">

네: [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md), 긴 텍스트를 위한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md), 그리고 숫자, 날짜, 통화를 위한 [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)를 지원합니다.

</Question>

<Question title="번역가가 코드를 건드리지 않고 콘텐츠를 수정할 수 있나요?">

자체 호스팅되는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 통해 누구나 실행 중인 앱에서 직접 텍스트를 수정할 수 있으며, 배포 없이 콘텐츠를 변경해야 하는 경우에는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 활용할 수 있습니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>

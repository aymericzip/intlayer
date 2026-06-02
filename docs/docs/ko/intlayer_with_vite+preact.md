---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Vite + Preact i18n - 완전한 번역 가이드: Vite + Preact 앱"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Vite + Preact 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
applicationShowcase: https://intlayer-vite-preact-template.vercel.app
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
---

# Intlayer로 Vite and Preact 번역하기 | 국제화(i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-preact-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-vite-preact-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 - intlayer-vite-preact-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'preact-i18n' 또는 'i18next'와 같은 주요 솔루션과 비교하여 Intlayer는 다음과 같은 통합 최적화 기능을 제공하는 솔루션입니다.

<AccordionGroup>

<Accordion header="전체 Preact 적용 범위">

Intlayer는 **구성 요소 수준 콘텐츠 범위 지정**, **지연 로드 번역** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Preact와 완벽하게 작동하도록 최적화되었습니다.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

</Accordion>

<Accordion header="유지관리성">

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent)와 같은 도구 모음도 함께 제공됩니다. 기술](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

</Accordion>

<Accordion header="오토메이션">

AI 공급자의 비용으로 선택한 LLM을 사용하여 CI/CD 파이프라인을 번역하려면 자동화를 사용하세요. Intlayer는 또한 콘텐츠 추출을 자동화하는 **컴파일러**와 **백그라운드에서 번역**을 돕는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)을 제공합니다.

</Accordion>

<Accordion header="성능">

대규모 JSON 파일을 구성 요소에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시 콘텐츠 로딩을 최적화합니다.

</Accordion>

<Accordion header="개발자가 없는 경우 확장">

Intlayer는 단순한 i18n 솔루션 그 이상으로 관리에 도움이 되는 **자체 호스팅 [비주얼 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** 및 **[전체 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**를 제공합니다. 다국어 콘텐츠를 **실시간**으로 제공하여 번역가, 카피라이터, 기타 팀원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

</Accordion>
</AccordionGroup>

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
bun x intlayer init
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 컴파일 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 핵심 패키지입니다.

- **preact-intlayer**

  Intlayer를 Preact 애플리케이션과 통합하는 패키지입니다. Preact 국제화를 위한 컨텍스트 제공자와 훅을 제공합니다.

- **vite-intlayer**

  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과, 사용자의 선호 로케일 감지, 쿠키 관리, URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위해 설정 파일을 만드세요:

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
  routing: {
    mode: "prefix-no-default", // 기본값: 기본 로케일을 제외한 모든 로케일에 접두사 추가
    storage: ["cookie", "header"], // 기본값: 쿠키에 로케일 저장 및 헤더에서 감지
  },
};

export default config;
```

> 이 설정 파일을 통해 로컬라이즈된 URL, 라우팅 모드, 저장 옵션, 쿠키 이름, 콘텐츠 선언 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참고하세요.

### 3단계: Vite 구성에 Intlayer 통합하기

intlayer 플러그인을 구성에 추가하세요.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하기 위해 사용됩니다. 이 플러그인은 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위해 별칭(alias)도 제공합니다.

### 4단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

> 콘텐츠 파일에 TSX 코드가 포함된 경우, `import { h } from "preact";`를 임포트하거나 JSX 프래그마가 Preact에 맞게 올바르게 설정되어 있는지 확인해야 할 수 있습니다.

### 5단계: 코드에서 Intlayer 사용하기

애플리케이션 전반에서 콘텐츠 사전을 접근하세요:

```tsx {6,10} fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

> 만약 `alt`, `title`, `href`, `aria-label` 등과 같은 `string` 속성에서 콘텐츠를 사용하려면, 함수의 값을 호출해야 합니다. 예를 들어:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> 참고: Preact에서는 `className` 대신 일반적으로 `class`를 사용합니다.

> `useIntlayer` 훅에 대해 더 알아보려면 [문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/useIntlayer.md)를 참고하세요 (`preact-intlayer`도 API가 유사합니다).

### (선택 사항) 6단계: 콘텐츠의 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 훅에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이 함수는 애플리케이션의 로케일을 설정하고 그에 따라 콘텐츠를 업데이트할 수 있게 해줍니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
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

그런 다음 애플리케이션에서 `LocaleRouter` 컴포넌트를 사용할 수 있습니다:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

### (선택 사항) 8단계: 로캘이 변경될 때 URL 변경

로캘이 변경될 때 URL을 변경하려면 `useLocale` 훅에서 제공하는 `onLocaleChange` 속성을 사용할 수 있습니다. 이와 동시에 `preact-iso`의 `useLocation`에서 제공하는 `route` 메서드를 사용하여 URL 경로를 업데이트할 수 있습니다.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
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

#### 애플리케이션에서 훅 사용하기

로케일이 변경될 때마다 HTML 속성이 업데이트되도록 메인 컴포넌트에 훅을 통합하세요:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

### (선택 사항) 10단계: 로컬라이즈된 링크 컴포넌트 만들기

애플리케이션의 내비게이션이 현재 로케일을 존중하도록 하려면, 커스텀 `Link` 컴포넌트를 만들 수 있습니다. 이 컴포넌트는 내부 URL에 자동으로 현재 언어 접두사를 붙입니다.

이 동작은 여러 가지 이유로 유용합니다:

- **SEO 및 사용자 경험**: 로컬라이즈된 URL은 검색 엔진이 언어별 페이지를 올바르게 색인화하도록 돕고 사용자에게 선호하는 언어로 콘텐츠를 제공합니다.
- **일관성**: 애플리케이션 전반에서 로컬라이즈된 링크를 사용함으로써 내비게이션이 현재 로케일 내에 머물도록 보장하여 예기치 않은 언어 전환을 방지합니다.
- **유지보수성**: 로컬라이제이션 로직을 단일 컴포넌트에 집중시켜 URL 관리를 단순화합니다.

아래는 Preact에서의 로컬라이즈된 `Link` 컴포넌트 구현 예시입니다:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
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

```bash
#  Intlayer에서 생성된 파일 무시
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

<Steps>

<Step number={1} title="컴포넌트 콘텐츠 추출" isOptional={true}>

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

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함합니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 컴파일러 플러그인을 추가합니다
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

### 더 나아가기

더 나아가려면, [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

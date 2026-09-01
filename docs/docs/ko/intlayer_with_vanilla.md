---
createdAt: 2026-03-31
updatedAt: 2026-08-30
title: "Vanilla JS i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Vanilla JS 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 8.4.10
    date: 2026-03-31
    changes: "기록 초기화"
author: aymericzip
---

# Intlayer를 사용하여 Vanilla JS 웹사이트 번역하기 | 국제화(i18n)

<Tabs defaultTab="code">
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'i18next' 또는 'i18n.js'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>
<Accordion header="전체 바닐라 JS 적용 범위">

Intlayer는 **프레임워크에 구애받지 않는 콘텐츠 관리**, **TypeScript 지원** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Vanilla JavaScript와 완벽하게 작동하도록 최적화되었습니다.

</Accordion>

<Accordion header="번들 크기">

대용량 JSON 파일을 페이지에 로드하는 대신 필요한 콘텐츠만 로드하세요. Intlayer는 **번들 및 페이지 크기를 최대 50%** 줄이는 데 도움이 됩니다.

</Accordion>

<Accordion header="유지관리성">

애플리케이션 콘텐츠의 범위를 지정하면 대규모 애플리케이션의 **유지 관리가 용이해집니다**. 전체 콘텐츠 코드베이스를 검토해야 하는 정신적 부담 없이 단일 기능 폴더를 복제하거나 삭제할 수 있습니다. 또한 Intlayer는 **완전히 유형**되어 콘텐츠의 정확성을 보장합니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠를 같은 위치에 배치하면 LLM(대형 언어 모델)에 **필요한 컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 및 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**, AI 에이전트를 위한 개발자 경험(DX)을 더욱 원활하게 만듭니다.

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

## Vanilla JS 애플리케이션에 Intlayer를 설정하는 단계별 가이드

<Steps>

<Step number={1} title="종속성 설치">

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
# intlayer 및 vanilla-intlayer의 독립 실행형 번들 생성
# 이 파일은 HTML 파일에서 가져옵니다.
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 설정 파일로 intlayer 초기화
npx intlayer init --no-gitignore

# 딕셔너리 빌드
npx intlayer build
```

```bash packageManager="pnpm"
# intlayer 및 vanilla-intlayer의 독립 실행형 번들 생성
# 이 파일은 HTML 파일에서 가져옵니다.
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 설정 파일로 intlayer 초기화
pnpm intlayer init --no-gitignore

# 딕셔너리 빌드
pnpm intlayer build
```

```bash packageManager="yarn"
# intlayer 및 vanilla-intlayer의 독립 실행형 번들 생성
# 이 파일은 HTML 파일에서 가져옵니다.
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# intlayer 설정 파일, TypeScript(설정된 경우), 환경 변수 초기화
yarn intlayer init --no-gitignore

# 딕셔너리 빌드
yarn intlayer build
```

```bash packageManager="bun"
# intlayer 및 vanilla-intlayer의 독립 실행형 번들 생성
# 이 파일은 HTML 파일에서 가져옵니다.
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# 설정 파일로 intlayer 초기화
bun x intlayer init --no-gitignore

# 딕셔너리 빌드
bun x intlayer build
```

- **intlayer**
  설정 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **vanilla-intlayer**
  Intlayer를 순수 JavaScript / TypeScript 애플리케이션과 통합하는 패키지입니다. 발행/구독 싱글톤(`IntlayerClient`) 및 콜백 기반 헬퍼(`useIntlayer`, `useLocale` 등)를 제공하여 UI 프레임워크에 의존하지 않고도 앱의 모든 부분에서 로케일 변경에 반응할 수 있게 해줍니다.

> `intlayer standalone` CLI의 번들링 내보내기는 설정에 특화된 미사용 패키지, 로케일 및 비필수 로직(리디렉션 또는 접두사 등)을 트리 쉐이킹(tree-shaking)하여 최적화된 빌드를 생성합니다.

</Step>

<Step number={2} title="프로젝트 구성">

애플리케이션의 언어를 구성하기 위한 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 기타 언어
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 이 설정 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언 위치 및 확장자, 콘솔 내 Intlayer 로그 비활성화 등을 구성할 수 있습니다. 사용 가능한 전체 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="HTML에 번들 가져오기">

`intlayer.js` 번들을 생성한 후, HTML 파일에서 가져올 수 있습니다:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />

    <!-- 번들 가져오기 -->
    <script src="./intlayer.js" defer></script>
    <!-- 메인 스크립트 가져오기 -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

번들은 `window` 객체에 `Intlayer`와 `VanillaIntlayer`를 글로벌 객체로 노출합니다.

</Step>

<Step number={4} title="진입점에서 Intlayer 부트스트랩">

`src/main.js`에서 콘텐츠가 렌더링되기 **전**에 `installIntlayer()`를 호출하여 글로벌 로케일 싱글톤이 준비되도록 합니다.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// i18n 콘텐츠를 렌더링하기 전에 호출해야 합니다.
installIntlayer();
```

Markdown 렌더러도 사용하려면 `installIntlayerMarkdown()`을 호출하세요:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="콘텐츠 선언하기">

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리합니다:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값 `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치하면 애플리케이션의 어디에서나 정의할 수 있습니다.
>
> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={6} title="JavaScript에서 Intlayer 사용하기">

`window.VanillaIntlayer` 객체는 API 헬퍼를 제공합니다. `useIntlayer(key, locale?)`는 주어진 키에 대한 번역된 콘텐츠를 반환합니다.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// 현재 로케일에 대한 초기 콘텐츠를 가져옵니다.
// 로케일이 변경될 때마다 알림을 받으려면 .onChange()를 연결하세요.
const content = useIntlayer("app").onChange((newContent) => {
  // 영향을 받는 DOM 노드만 다시 렌더링하거나 패치합니다.
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// 초기 렌더링
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> 리프(leaf) 값을 `String()`으로 감싸서 문자열로 액세스하면 노드의 `toString()` 메서드가 호출되어 번역된 텍스트가 반환됩니다.
>
> 기본 HTML 속성(예: `alt`, `aria-label`)의 값이 필요한 경우 `.value`를 직접 사용하세요:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="콘텐츠 언어 변경하기" isOptional={true}>

콘텐츠의 언어를 변경하려면 `useLocale`에서 노출된 `setLocale` 함수를 사용하세요.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "언어");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // 다른 곳에서 로케일이 변경될 때 드롭다운을 동기화 상태로 유지합니다.
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="HTML 언어 및 방향 속성 전환" isOptional={true}>

접근성 및 SEO를 위해 `<html>` 태그의 `lang` 및 `dir` 속성을 현재 로케일에 맞게 업데이트합니다.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="로케일별 딕셔너리 지연 로드 (Lazy-load)" isOptional={true}>

로케일별로 딕셔너리를 지연 로드하려면 `useDictionaryDynamic`을 사용할 수 있습니다. 이는 초기 `intlayer.js` 파일에 모든 번역을 포함하고 싶지 않을 때 유용합니다.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> 참고: `useDictionaryDynamic`을 사용하려면 딕셔너리가 별도의 ESM 파일로 제공되어야 합니다. 이 방식은 일반적으로 딕셔너리를 제공하는 웹 서버가 있는 경우 사용됩니다.

</Step>

</Steps>

### TypeScript 구성

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### VS Code 확장 프로그램

Intlayer 개발 경험을 향상시키려면 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음 기능을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 알아보기

더 자세히 알아보려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

## 자주 묻는 질문

<FAQ>

<Question title="번들러나 프레임워크 없이 Intlayer를 사용할 수 있나요?">

네. 바로 그것이 이 가이드에서 다루는 내용입니다. 3단계에 표시된 대로 HTML에서 직접 `vanilla-intlayer` 번들을 가져오고, 엔트리 포인트에서 부트스트랩한 다음 `useIntlayer`로 콘텐츠를 읽으면 됩니다. Vite, webpack 또는 별도의 빌드 파이프라인이 필요하지 않습니다.

</Question>

<Question title="i18n이 페이지 용량에 얼마나 영향을 미치나요?">

런타임 카탈로그보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어를 절대 다운로드하지 않기 때문입니다. 콘텐츠는 미리 컴파일된 사전에서 확인되며, 로케일별 지연 로딩을 통해 방문자가 언어를 전환할 때까지 다른 언어가 초기 페이로드에 포함되지 않습니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md), [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md) 및 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="스크립트를 다시 작성하지 않고 i18next에서 마이그레이션할 수 있나요?">

대부분 가능합니다. 콘텐츠를 이전하려면 [i18next 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md)를 따르세요. 점진적으로 마이그레이션할 수도 있습니다: [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 기존 JSON 카탈로그를 단일 진실 공급원(source of truth)으로 유지하면서 Intlayer 사전을 생성하므로 스크립트를 하나씩 이전하는 동안 두 계층의 동기화가 유지됩니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 소스 파일을 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)을 참조하세요.

완전 자동화된 파이프라인을 위해 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)는 빌드 타임에 JSX, TSX, Vue 및 Svelte 소스에서 동일한 작업을 수행하여 변경될 때마다 사전을 생성하고 HMR을 통해 동기화하므로 수동으로 키를 관리할 필요가 없습니다. 정적 분석으로 작동하므로 런타임에만 존재하는 문자열은 제외되며, 사용자 텍스트와 애플리케이션 로직을 구분하기 위해 몇 가지 주석이 필요합니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="순수 JavaScript 사이트를 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

- **직접 작성한 사전 객체**, 일반적으로 `fetch`로 로드되는 언어당 하나의 JSON 파일: 의존성은 없지만 타입 안전성, 복수형 규칙이 없으며 번역 누락을 알려주는 도구가 없습니다.
- CDN을 통한 **`i18next`**: 성숙하고 프레임워크에 구애받지 않으며 플러그인 생태계가 있지만, 런타임 오버헤드와 자체 카탈로그 로딩이 추가됩니다.
- **`Intlayer`**: 복수형 및 성별 규칙, 로케일 감지, RTL 지원, 로케일별 지연 로딩을 선언형으로 지원하며, AI를 통해 누락된 번역을 채워주는 CLI와 비개발자를 위한 비주얼 에디터를 제공합니다.

[왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.

</Question>

<Question title="번역을 읽고 DOM에 어떻게 적용하나요?">

6단계에 나와 있듯이 사전 키로 `useIntlayer`를 호출하고 반환된 값을 노드에 직접 작성합니다. 프레임워크가 없기 때문에 스스로 다시 렌더링되지 않으며, 7단계에서 다루는 것처럼 로케일이 변경될 때 노드를 수동으로 업데이트합니다.

</Question>

<Question title="방문자의 언어는 어떻게 감지하나요?">

`routing.storage`에 나열된 소스(일반적으로 쿠키 우선, 그 다음 `Accept-Language` 헤더 순)에서 감지하며, 기본 로케일로 폴백됩니다. 방문자가 명시적으로 선택한 언어는 저장되어 다음 방문 시에도 유지됩니다. [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="아랍어나 히브리어와 같은 RTL(우에서 좌로 쓰는) 언어는 어떻게 지원하나요?">

8단계에서 다룹니다. `getHTMLTextDir`은 로케일에 대해 `ltr`, `rtl` 또는 `auto`를 반환하므로 활성 로케일에 따라 `html` 요소에 `lang` 및 `dir`을 설정하고 나머지는 CSS 논리적 속성에 맡기면 됩니다.

</Question>

<Question title="방문자가 모든 언어를 한 번에 다운로드하나요?">

원하지 않는다면 그렇지 않습니다. 9단계에서 로케일별 사전 지연 로딩을 다루므로 페이지는 한 언어만 로드하고 방문자가 전환할 때만 다른 언어를 가져옵니다. [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 참조하세요.

</Question>

<Question title="AI를 사용하여 앱을 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 누락된 번역을 채워주며, `--git-diff`를 사용하면 브랜치에서 변경된 콘텐츠로 번역 범위를 제한할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 복수형, 성별 및 서식 있는 텍스트(Rich Text)를 지원하나요?">

네: [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md), 긴 텍스트를 위한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md) 및 숫자, 날짜, 통화를 위한 [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)를 지원합니다.

</Question>

<Question title="번역가가 코드를 건드리지 않고 콘텐츠를 수정할 수 있나요?">

자체 인프라에서 실행되어 실행 중인 앱에서 직접 텍스트를 수정할 수 있는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 배포 없이 변경할 수 있도록 콘텐츠를 외부화하는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 통해 가능합니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>

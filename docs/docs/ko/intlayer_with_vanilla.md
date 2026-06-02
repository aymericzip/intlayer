---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: "Vanilla JS i18n - 완전한 번역 가이드: Vanilla JS"
description: 번들 크기, SEO, 성능 및 유지보수성을 위한 최고의 솔루션. 2026년에 Vanilla JS 웹사이트를 다국어로 만드세요, LLM 번역, Agent Skills & MCP.
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

## Vanilla JS 애플리케이션에 Intlayer를 설정하는 단계별 가이드

### 1단계: 종속성 설치

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

### 2단계: 프로젝트 구성

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

### 3단계: HTML에 번들 가져오기

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

### 4단계: 진입점에서 Intlayer 부트스트랩

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

### 5단계: 콘텐츠 선언하기

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

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값 `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치하면 애플리케이션의 어디에서나 정의할 수 있습니다.
>
> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 6단계: JavaScript에서 Intlayer 사용하기

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

### (선택 사항) 7단계: 콘텐츠 언어 변경하기

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

### (선택 사항) 8단계: HTML 언어 및 방향 속성 전환

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

### (선택 사항) 9단계: 로케일별 딕셔너리 지연 로드 (Lazy-load)

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

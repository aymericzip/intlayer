---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: Vanilla JS i18n - 2026년 Vanilla JS 앱 번역 방법
description: Vanilla JS 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따르세요.
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
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "기록 초기화"
---

# Intlayer를 사용하여 Vanilla JS 웹사이트 번역하기 | 국제화(i18n)

## 목차

<TOC/>

## Intlayer란 무엇인가요?

**Intlayer**는 현대적인 웹 애플리케이션에서 다국어 지원을 단순화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음과 같은 이점이 있습니다:

- **번역 관리 용이**: 컴포넌트 수준에서 선언적 딕셔너리를 사용합니다.
- **메타데이터, 라우트, 콘텐츠의 동적 로컬라이제이션**.
- **TypeScript 지원 보장**: 자동 생성된 타입을 통해 자동 완성 및 오류 감지 기능이 향상됩니다.
- **고급 기능 활용**: 동적 로케일 감지 및 전환과 같은 기능을 제공합니다.

이 가이드는 **패키지 관리자나 번들러**(Vite, Webpack 등)를 사용하지 않고 Vanilla JavaScript 애플리케이션에서 Intlayer를 사용하는 방법을 보여줍니다.

애플리케이션에 Vite와 같은 번들러를 사용하는 경우, 대신 [Vite + Vanilla JS 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+vanilla.md)를 따르는 것을 권장합니다.

독립 실행형 번들을 사용하면 단일 JavaScript 파일을 통해 HTML 파일에 Intlayer를 직접 가져올 수 있으므로, 레거시 프로젝트나 간단한 정적 사이트에 적합합니다.

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

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
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

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "Vite 로고를 클릭하여 자세히 알아보세요",
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

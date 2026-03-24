---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: i18n Vite + Vanilla JS - 2026년에 Vanilla JS 앱을 번역하는 방법
description: Vite와 Vanilla JS 웹사이트를 다국어화하는 방법을 알아보세요. 문서에 따라 국제화(i18n) 및 번역을 수행하세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayer를 사용하여 Vite 및 Vanilla JS 웹사이트 번역하기 | 국제화 (i18n)

## 목차

<TOC/>

## Intlayer란 무엇인가요?

**Intlayer**는 현대적인 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- 컴포넌트 수준에서 선언적 딕셔너리를 사용하여 **번역을 쉽게 관리**할 수 있습니다.
- 메타데이터, 라우트 및 콘텐츠를 **동적으로 로컬라이즈**할 수 있습니다.
- 자동 생성된 타입을 통해 **TypeScript 지원을 보장**하여 자동 완성 및 오류 감지 기능을 향상시킵니다.
- 동적 로케일 감지 및 전환과 같은 **고급 기능의 혜택**을 누릴 수 있습니다.

---

## Vite 및 Vanilla JS 애플리케이션에서 Intlayer를 설정하는 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **vanilla-intlayer**
  Intlayer를 순수 JavaScript / TypeScript 애플리케이션과 통합하는 패키지입니다. 펍/섭 싱글톤(`IntlayerClient`)과 콜백 기반 헬퍼(`useIntlayer`, `useLocale` 등)를 제공하여 UI 프레임워크에 의존하지 않고도 앱의 모든 부분에서 로케일 변경에 반응할 수 있습니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 미들웨어를 포함합니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위해 설정 파일을 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 기타 로케일
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
      // 기타 로케일
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
      // 기타 로케일
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 파라미터의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합

구성 파일에 intlayer 플러그인을 추가합니다.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [intlayer()],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭을 제공합니다.

### 4단계: 엔트리 포인트에서 Intlayer 부트스트랩

글로벌 로케일 싱글톤이 준비되도록 콘텐츠가 렌더링되기 **전**에 `installIntlayer()`를 호출합니다.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// i18n 콘텐츠를 렌더링하기 전에 호출해야 합니다.
installIntlayer();

// 앱 모듈을 가져와서 실행합니다.
import "./app.js";
```

`md()` 콘텐츠 선언(Markdown)을 사용하는 경우 마크다운 렌더러도 설치하세요:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
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
      es: "Vite 로고를 클릭하여 더 자세히 알아보세요",
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
      es: "Vite 로고를 클릭하여 더 자세히 알아보세요",
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
      es: "Vite 로고를 클릭하여 더 자세히 알아보세요",
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
        "es": "Vite 로고를 클릭하여 더 자세히 알아보세요"
      }
    }
  }
}
```

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값 `./src`)에 포함되어 있고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치하면 애플리케이션 어디에서나 정의할 수 있습니다.
>
> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 6단계: JavaScript에서 Intlayer 사용하기

`vanilla-intlayer`는 `react-intlayer` 서비스 API를 따릅니다: `useIntlayer(key, locale?)`는 번역된 콘텐츠를 직접 반환합니다. 결과에 `.onChange()`를 체이닝하여 로케일 변경을 구독할 수 있으며, 이는 React 리렌더링과 명시적으로 동일한 효과를 냅니다.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// 현재 로케일에 대한 초기 콘텐츠를 가져옵니다.
// 로케일이 변경될 때마다 알림을 받으려면 .onChange()를 체이닝합니다.
const content = useIntlayer("app").onChange((newContent) => {
  // 영향을 받는 DOM 노드만 다시 렌더링하거나 패치합니다.
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// 초기 렌더링
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> 리프 값들을 `String()`으로 감싸서 문자열로 액세스하면 노드의 `toString()` 메서드를 호출하여 번역된 텍스트를 반환합니다.
>
> 네이티브 HTML 속성(예: `alt`, `aria-label`)에 대한 값이 필요한 경우 `.value`를 직접 사용하세요:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

### (선택 사항) 7단계: 콘텐츠의 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale`에서 노출된 `setLocale` 함수를 사용하세요.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // 다른 곳에서 로케일이 변경될 때 드롭다운을 동기화 상태로 유지합니다.
  return subscribe((newLocale) => render(newLocale));
}
```

### (선택 사항) 8단계: 마크다운 및 HTML 콘텐츠 렌더링하기

Intlayer는 `md()` 및 `html()` 콘텐츠 선언을 지원합니다. Vanilla JS에서 컴파일된 출력은 `innerHTML`을 통해 원시 HTML로 삽입됩니다.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

HTML 컴파일 및 주입:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)`는 `IntlayerNode`에서 `toString()`을 호출하여 원시 마크다운 문자열을 반환합니다. 이를 `compileMarkdown`에 전달하여 HTML 문자열을 얻은 다음 `innerHTML`을 통해 설정하세요.

> [!WARNING]
> 신뢰할 수 있는 콘텐츠에만 `innerHTML`을 사용하세요. 마크다운이 사용자 입력에서 온 경우 먼저 살균(예: DOMPurify 사용) 처리하세요. 살균 렌더러를 동적으로 설치할 수 있습니다:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

### (선택 사항) 9단계: 애플리케이션에 로컬라이즈된 라우팅 추가하기

각 언어에 대해 고유한 라우트를 만들려면(SEO에 유용함) Vite 구성에서 서버 측 로케일 감지를 위해 `intlayerProxy`를 사용할 수 있습니다.

먼저, Vite 구성에 `intlayerProxy`를 추가합니다:

> 프로덕션에서 `intlayerProxy`를 사용하려면 `vite-intlayer`를 `devDependencies`에서 `dependencies`로 이동해야 한다는 점에 유의하세요.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // 가장 먼저 위치해야 합니다
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // 가장 먼저 위치해야 합니다
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // 가장 먼저 위치해야 합니다
    intlayer(),
  ],
});
```

### (선택 사항) 10단계: 로케일 변경 시 URL 변경하기

로케일이 변경될 때 브라우저 URL을 업데이트하려면 Intlayer를 설치한 후 `useRewriteURL()`을 호출하세요:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// 즉시 그리고 이후 로케일 변경 시마다 URL을 재정의합니다.
// 정리를 위해 구독 해제 함수를 반환합니다.
const stopRewriteURL = useRewriteURL();
```

### (선택 사항) 11단계: HTML 언어 및 방향 속성 전환하기

접근성 및 SEO를 위해 `<html>` 태그의 `lang` 및 `dir` 속성을 현재 로케일에 맞게 업데이트하세요.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (선택 사항) 12단계: 로케일별 딕셔너리 레이지 로딩 (Lazy-load)

대규모 앱의 경우 각 로케일의 딕셔너리를 자체 청크로 나누고 싶을 수 있습니다. Vite의 동적 `import()`와 함께 `useDictionaryDynamic`을 사용하세요:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> 각 로케일의 번들은 해당 로케일이 활성화될 때만 가져오고 결과는 캐시됩니다. 동일한 로케일로의 후속 전환은 즉시 이루어집니다.

### (선택 사항) 13단계: 컴포넌트의 콘텐츠 추출하기

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 많이 걸릴 수 있습니다.

이 프로세스를 쉽게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

이를 설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러 사용 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 컴포넌트를 변환한 후 저장할지 여부를 나타냅니다.
     * 그렇게 하면 컴파일러를 한 번만 실행하여 앱을 변환하고 제거할 수 있습니다.
     */
    saveComponents: false,

    /**
     * 딕셔너리 키 접두사
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract 명령'>

추출기를 실행하여 컴포넌트를 변환하고 콘텐츠를 추출합니다.

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
bunx intlayer extract
```

 </Tab>
 <Tab value='Babel 컴파일러'>

`intlayerCompiler` 플러그인을 포함하도록 `vite.config.ts`를 업데이트합니다:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 컴파일러 플러그인 추가
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
bun run build # 또는 bun run dev
```

 </Tab>
</Tabs>

### TypeScript 구성하기

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 좋습니다. 이를 통해 Git 저장소에 커밋하는 것을 방지할 수 있습니다.

이렇게 하려면 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```bash
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer 개발 환경을 개선하기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키 **자동 완료**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 만들고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 프로그램 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

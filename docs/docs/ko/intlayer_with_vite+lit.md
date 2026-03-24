---
createdAt: 2026-03-23
updatedAt: 2026-03-23
title: Vite + Lit i18n - 2026년에 Lit 앱을 번역하는 방법
description: Vite와 Lit 웹사이트를 다국어로 만드는 방법을 알아보세요. 문서를 따라 국제화(i18n) 및 번역을 진행하세요.
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Vite
  - Lit
  - Web Components
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-lit
applicationTemplate: https://github.com/aymericzip/intlayer-vite-lit-template
history:
  - version: 8.4.10
    date: 2026-03-23
    changes: "Init history"
---

# Intlayer를 사용하여 Vite 및 Lit 웹사이트 번역하기 | 국제화 (i18n)

## 목차

<TOC/>

## Intlayer란 무엇인가요?

**Intlayer**는 현대적인 웹 애플리케이션에서 다국어 지원을 간소화하도록 설계된 혁신적인 오픈 소스 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음과 같은 이점이 있습니다:

- 컴포넌트 수준의 선언적 딕셔너리를 사용하여 **번역을 쉽게 관리**할 수 있습니다.
- 메타데이터, 라우트 및 콘텐츠를 **동적으로 로컬라이즈**할 수 있습니다.
- 자동 생성된 타입을 통해 **TypeScript 지원을 보장**하여 자동 완성 및 오류 감지 기능을 향상시킵니다.
- 동적 로케일 감지 및 전환과 같은 **고급 기능을 활용**할 수 있습니다.

---

## Vite 및 Lit 애플리케이션에서 Intlayer를 설정하기 위한 단계별 가이드

### 1단계: 종속성 설치

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **lit-intlayer**
  Intlayer를 Lit 애플리케이션과 통합하는 패키지입니다. `ReactiveController` 기반 훅(`useIntlayer`, `useLocale` 등)을 제공하여 로케일이 변경될 때 LitElement가 자동으로 다시 렌더링되도록 합니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 미들웨어가 포함되어 있습니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위한 설정 파일을 만듭니다:

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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언 위치 및 확장자, 콘솔 내 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Vite 구성에 Intlayer 통합

Vite 구성에 intlayer 플러그인을 추가합니다.

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

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. Vite 애플리케이션 내에 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭을 제공합니다.

### 4단계: 엔트리 포인트에서 Intlayer 부트스트랩

첫 번째 엘리먼트가 연결될 때 글로벌 로케일 싱글톤이 준비되도록 커스텀 엘리먼트가 등록되기 **전**에 `installIntlayer()`를 호출하세요.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "lit-intlayer";

// LitElement가 DOM에 연결되기 전에 호출해야 합니다.
installIntlayer();

// 커스텀 엘리먼트를 임포트하고 등록합니다.
import "./my-element.js";
```

`md()` 콘텐츠 선언(Markdown)도 사용하는 경우 마크다운 렌더러도 설치하세요:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "lit-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./my-element.js";
```

### 5단계: 콘텐츠 선언

번역을 저장하기 위한 콘텐츠 선언을 생성하고 관리합니다:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "Vite + Lit",

    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    litLogo: t({
      en: "Lit logo",
      fr: "Logo Lit",
      es: "Logo Lit",
    }),

    count: t({
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Lit logos to learn more",
      fr: "Cliquez sur les logos Vite et Lit pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Lit para obtener más información",
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
    "title": "Vite + Lit",
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "litLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Lit logo",
        "fr": "Logo Lit",
        "es": "Logo Lit"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Lit logos to learn more",
        "fr": "Cliquez sur les logos Vite et Lit pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Lit para obtener más información"
      }
    }
  }
}
```

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값 `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs}`)와 일치하는 경우 애플리케이션 어디에서나 정의할 수 있습니다.
>
> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

### 6단계: LitElement에서 Intlayer 활용

`LitElement` 내에서 `useIntlayer`를 사용합니다. 활성 로케일이 변경될 때마다 자동으로 다시 렌더링을 트리거하는 `ReactiveController` 프록시를 반환하며 별도의 설정이 필요하지 않습니다.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { useIntlayer } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  @property({ type: Number })
  count = 0;

  // useIntlayer는 자신을 ReactiveController로 등록합니다.
  // 로케일이 변경되면 엘리먼트가 자동으로 다시 렌더링됩니다.
  private content = useIntlayer(this, "app");

  override render() {
    const { content } = this;

    return html`
      <h1>${content.title}</h1>

      <img src="/vite.svg" alt=${content.viteLogo.value} />
      <img src="/lit.svg" alt=${content.litLogo.value} />

      <button @click=${() => this.count++}>
        ${content.count({ count: this.count })}
      </button>

      <p>${content.readTheDocs}</p>
    `;
  }
}
```

> [!NOTE]
> 네이티브 HTML 속성(예: `alt`, `aria-label`, `title`)에서 번역된 문자열이 필요한 경우 리프 노드에서 `.value`를 호출하세요:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> ```

### (선택 사항) 7단계: 콘텐츠 언어 변경

콘텐츠 언어를 변경하려면 `useLocale` 컨트롤러에서 노출하는 `setLocale` 메서드를 사용합니다.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (선택 사항) 8단계: 마크다운 및 HTML 콘텐츠 렌더링

Intlayer는 `md()` 및 `html()` 콘텐츠 선언을 지원합니다. Lit에서 컴파일된 출력은 `unsafeHTML` 디렉티브를 통해 원시 HTML로 삽입됩니다.

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/my-element.ts` and save to test **HMR**",
        fr: "Modifiez `src/my-element.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/my-element.ts` y guarde para probar **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

엘리먼트에서 컴파일된 HTML을 렌더링합니다:

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { useIntlayer } from "lit-intlayer";
import { compileMarkdown } from "lit-intlayer/markdown";

@customElement("my-element")
export class MyElement extends LitElement {
  private content = useIntlayer(this, "app");

  override render() {
    return html`
      <div class="edit-note">
        ${unsafeHTML(compileMarkdown(String(this.content.editNote)))}
      </div>
    `;
  }
}
```

> [!TIP]
> `String(content.editNote)`는 원시 마크다운 문자열을 반환하는 `IntlayerNode`의 `toString()`을 호출합니다. 이를 `compileMarkdown`에 전달하여 HTML 문자열을 가져온 다음 Lit의 `unsafeHTML` 디렉티브로 렌더링합니다.

### (선택 사항) 9단계: 애플리케이션에 로컬라이즈된 라우팅 추가

각 언어에 대해 고유한 라우트를 만들려면(SEO에 유용) Intlayer의 `localeMap` / `localeFlatMap` 헬퍼와 서버 측 로케일 감지를 위한 `intlayerProxy` Vite 플러그인과 함께 클라이언트 측 라우터를 사용할 수 있습니다.

먼저 Vite 구성에 `intlayerProxy`를 추가합니다:

> 프로덕션에서 `intlayerProxy`를 사용하려면 `vite-intlayer`를 `devDependencies`에서 `dependencies`로 이동해야 합니다.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
  ],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

module.exports = defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
  ],
});
```

### (선택 사항) 10단계: 로케일 변경 시 URL 변경

로케일이 변경될 때 브라우저 URL을 업데이트하려면 로케일 스위처와 함께 `useRewriteURL`을 사용합니다:

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale, useRewriteURL } from "lit-intlayer";

@customElement("locale-switcher")
export class LocaleSwitcher extends LitElement {
  private locale = useLocale(this);

  // 로케일이 변경될 때 현재 URL을 자동으로 다시 작성합니다.
  private _rewriteURL = useRewriteURL(this);

  private _onChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.locale.setLocale(select.value as any);
  }

  override render() {
    return html`
      <select @change=${this._onChange}>
        ${this.locale.availableLocales.map(
          (loc) => html`
            <option value=${loc} ?selected=${loc === this.locale.locale}>
              ${getLocaleName(loc)}
            </option>
          `
        )}
      </select>
    `;
  }
}
```

### (선택 사항) 11단계: HTML 언어 및 방향 속성 전환

접근성 및 SEO를 위해 현재 로케일에 맞게 `<html>` 태그의 `lang` 및 `dir` 속성을 업데이트합니다.

```typescript fileName="src/my-element.ts" codeFormat="typescript"
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "lit-intlayer";

@customElement("my-element")
export class MyElement extends LitElement {
  private locale = useLocale(this, {
    onLocaleChange: (loc) => {
      document.documentElement.lang = loc;
      document.documentElement.dir = getHTMLTextDir(loc);
    },
  });

  override render() {
    return html`<!-- 여러분의 콘텐츠 -->`;
  }
}
```

### (선택 사항) 12단계: 컴포넌트의 콘텐츠 추출

기존 코드베이스가 있는 경우 수천 개의 파일을 변환하는 데 시간이 많이 걸릴 수 있습니다.

이 프로세스를 쉽게 하기 위해 Intlayer는 컴포넌트를 변환하고 콘텐츠를 추출하는 [컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md) / [추출기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)를 제안합니다.

설정하려면 `intlayer.config.ts` 파일에 `compiler` 섹션을 추가하면 됩니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 나머지 구성
  compiler: {
    /**
     * 컴파일러를 활성화할지 여부를 나타냅니다.
     */
    enabled: true,

    /**
     * 출력 파일 경로를 정의합니다.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 변환된 후 컴포넌트를 저장할지 여부를 나타냅니다.
     * 이렇게 하면 컴파일러를 한 번만 실행하여 앱을 변환한 다음 나중에 제거할 수 있습니다.
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

`vite.config.ts`를 업데이트하여 `intlayerCompiler` 플러그인을 포함합니다:

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

### TypeScript 구성

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

> `experimentalDecorators` 및 `useDefineForClassFields: false`는 Lit에서 데코레이터 지원을 위해 필요합니다.

### Git 구성

Intlayer에서 생성된 파일은 무시하는 것이 좋습니다. 이렇게 하면 Git 저장소에 커밋하는 것을 방지할 수 있습니다.

이렇게 하려면 `.gitignore` 파일에 다음 지침을 추가하면 됩니다:

```bash
# Intlayer에서 생성된 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer 개발 환경을 개선하기 위해 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장 프로그램은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 프로그램 사용 방법에 대한 자세한 내용은 [Intlayer VS Code Extension 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 알아보기

더 자세히 알아보려면 [시각적 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

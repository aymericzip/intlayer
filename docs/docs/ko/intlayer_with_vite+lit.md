---
createdAt: 2026-03-23
updatedAt: 2026-08-30
title: "Vite + Lit i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Vite + Lit 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
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
applicationShowcase: https://intlayer-vite-lit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용법을 직접 속성 액세스로 업데이트"
  - version: 8.4.10
    date: 2026-03-23
    changes: "초기 기록"
author: aymericzip
---

# Intlayer를 사용하여 Vite 및 Lit 웹사이트 번역하기 | 국제화 (i18n)

<Tabs defaultTab="code">
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-lit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-vite-lit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="데모 - intlayer-vite-lit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'lit-localize' 또는 'i18next'와 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>
<Accordion header="전체 조명 범위">

Intlayer는 **웹 구성요소 수준 콘텐츠 범위 지정**, **TypeScript 지원** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Lit와 완벽하게 작동하도록 최적화되었습니다.

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

GitHub에서 [Application Template](https://github.com/aymericzip/intlayer-vite-lit-template)을 참고하세요.

## Vite 및 Lit 애플리케이션에서 Intlayer를 설정하기 위한 단계별 가이드

<Steps>

<Step number={1} title="종속성 설치">

npm을 사용하여 필요한 패키지를 설치합니다:

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

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트인 경우 `intlayer-cli init`를 사용하세요.

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer lit-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer lit-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer lit-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer lit-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **lit-intlayer**
  Intlayer를 Lit 애플리케이션과 통합하는 패키지입니다. `ReactiveController` 기반 훅(`useIntlayer`, `useLocale` 등)을 제공하여 로케일이 변경될 때 LitElement가 자동으로 다시 렌더링되도록 합니다.

- **vite-intlayer**
  Intlayer를 [Vite 번들러](https://vite.dev/guide/why.html#why-bundle-for-production)와 통합하기 위한 Vite 플러그인과 사용자의 선호 로케일 감지, 쿠키 관리 및 URL 리디렉션 처리를 위한 미들웨어가 포함되어 있습니다.

</Step>

<Step number={2} title="프로젝트 구성">

애플리케이션의 언어를 구성하기 위한 설정 파일을 만듭니다:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언 위치 및 확장자, 콘솔 내 Intlayer 로그 비활성화 등을 설정할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Vite 구성에 Intlayer 통합">

Vite 구성에 intlayer 플러그인을 추가합니다.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> `intlayer()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. Vite 애플리케이션 내에 Intlayer 환경 변수를 정의합니다. 또한 성능 최적화를 위한 별칭을 제공합니다.

</Step>

<Step number={4} title="엔트리 포인트에서 Intlayer 부트스트랩">

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

</Step>

<Step number={5} title="콘텐츠 선언">

번역을 저장하기 위한 콘텐츠 선언을 생성하고 관리합니다:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> 콘텐츠 선언은 `contentDir` 디렉토리(기본값 `./src`)에 포함되고 콘텐츠 선언 파일 확장자(기본값 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치하는 경우 애플리케이션 어디에서나 정의할 수 있습니다.
>
> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={6} title="LitElement에서 Intlayer 활용">

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

> 네이티브 HTML 속성(예: `alt`, `aria-label`, `title`)에서 번역된 문자열이 필요한 경우 리프 노드에서 `.value`를 호출하세요:
>
> ```typescript
> html`<img alt=${content.viteLogo.value} />`;
> html`<img alt=${content.viteLogo.toString()} />`;
> html`<img alt=${String(content.viteLogo)} />`;
> ```

</Step>

<Step number={7} title="콘텐츠 언어 변경" isOptional={true}>

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

</Step>

<Step number={8} title="마크다운 및 HTML 콘텐츠 렌더링" isOptional={true}>

Intlayer는 `md()` 및 `html()` 콘텐츠 선언을 지원합니다. Lit에서 컴파일된 출력은 `unsafeHTML` 디렉티브를 통해 원시 HTML로 삽입됩니다.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

</Step>

<Step number={9} title="애플리케이션에 로컬라이즈된 라우팅 추가" isOptional={true}>

각 언어에 대해 고유한 라우트를 만들려면(SEO에 유용) Intlayer의 `localeMap` / `localeFlatMap` 헬퍼와 서버 측 로케일 감지를 위한 `intlayerProxy` Vite 플러그인과 함께 클라이언트 측 라우터를 사용할 수 있습니다.

먼저 Vite 구성에 `intlayerProxy`를 추가합니다:

> 프로덕션에서 `intlayerProxy`를 사용하려면 `vite-intlayer`를 `devDependencies`에서 `dependencies`로 이동해야 합니다.

> Intlayer v9부터 `intlayerProxy()`는 `intlayer()` 플러그인에 직접 번들로 제공되며 `routing.enableProxy` 옵션(`true`이 기본값)을 통해 기본적으로 활성화됩니다. 아래에 표시된 대로 별도로 등록하는 것은 이제 선택 사항입니다 — 이전 버전과의 호환성 및 플러그인 순서를 제어해야 하는 설정을 위해 유지됩니다. `routing.enableProxy: false`로 설정하여 옵트아웃할 수 있습니다. [v9 릴리스 노트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/releases/v9.md)를 참조하세요.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={10} title="로케일 변경 시 URL 변경" isOptional={true}>

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

</Step>

<Step number={11} title="HTML 언어 및 방향 속성 전환" isOptional={true}>

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

</Step>

<Step number={12} title="컴포넌트의 콘텐츠 추출" isOptional={true}>

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

더 자세히 알아보려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

## 자주 묻는 질문

<FAQ>

<Question title="Vite 및 Lit 앱을 국제화하는 데 사용할 수 있는 다양한 솔루션은 무엇인가요?">

Vite는 i18n에 대해 특정 방식을 강제하지 않으므로 Lit 생태계에서 라이브러리를 선택합니다:

- **`@lit/localize`**: XLIFF 추출과 로케일당 하나의 컴파일된 번들을 기반으로 하는 공식 옵션이므로, 런타임에 언어를 전환하려면 런타임 모드가 필요합니다.
- **수기 작성 사전(Hand-written dictionary)**: 각 요소로 import되는 방식이지만 의존성이 없는 대신 타입 안전성과 도구가 부족합니다.
- **`Intlayer`**: 가장 진보된 솔루션입니다. 코드베이스 어디에나 콘텐츠를 선언할 수 있으며([각 컴포넌트 옆 또는 중앙 집중식](https://intlayer.org/ko/blog/per-component-vs-centralized-i18n)), 빌드 타임에 Vite 플러그인에 의해 컴파일되고, 완전한 타입 안전성을 제공하며 AI 번역, 비주얼 에디터 및 CMS를 포함합니다.

Vite 특화된 장점은 번역이 런타임에 JSON으로 가져오는 대신 컴파일 타임에 확인되고 트리 쉐이킹(tree-shaking)되므로 페이지가 렌더링하는 항목만 정확히 전달된다는 점입니다. [왜 Intlayer인가](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="i18n이 Lit 번들 크기에 얼마나 영향을 미치나요?">

네임스페이스 기반 설정보다 훨씬 적습니다. 페이지는 렌더링하지 않는 언어의 카탈로그를 절대 다운로드하지 않기 때문입니다. 빌드 타임 컴파일러는 `useIntlayer` 호출을 컴포넌트가 사용하는 정확한 사전 항목으로 대체하므로 사용되지 않는 키와 언어는 제거되고, [동적 사전](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/index.md)을 통해 로케일별로 분할됩니다. 일반적인 대안들과 비교했을 때 Intlayer는 번들 및 페이지 크기를 최대 50%까지 줄여줍니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)와 [벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)를 참조하세요.

</Question>

<Question title="컴포넌트를 다시 작성하지 않고 @lit/localize에서 마이그레이션할 수 있나요?">

대부분 가능합니다. 콘텐츠를 이전하려면 [호환 어댑터(compat adapters) 개요](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 따르세요. 점진적으로 마이그레이션할 수도 있습니다: [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 기존 JSON 카탈로그를 단일 진실 공급원(source of truth)으로 유지하면서 Intlayer 사전을 생성하므로 컴포넌트를 하나씩 이전하는 동안 두 계층의 동기화가 유지됩니다.

</Question>

<Question title="기존 JSON 번역 파일을 유지할 수 있나요?">

네. [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)은 `/messages/{locale}/{namespace}.json` 파일을 단일 진실 공급원(source of truth)으로 유지하면서 양방향으로 Intlayer 사전을 생성합니다. [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)은 gettext 카탈로그에 대해 동일한 작업을 수행하며, [로케일별 파일](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)을 통해 로케일을 한 파일에 모으는 대신 언어별로 콘텐츠를 분할할 수도 있습니다.

</Question>

<Question title="콘텐츠를 키 단위로 하나씩 옮겨야 하나요?">

아닙니다. `npx intlayer extract`를 실행하면 Intlayer가 컴포넌트를 읽고 사용자 대면 문자열을 추출하여 각 컴포넌트 옆에 `.content` 파일을 생성하므로 카탈로그에 일일이 복사할 필요 없이 diff만 검토하면 됩니다. 이 가이드의 12단계를 확인하세요.

완전 자동화된 파이프라인을 위해 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)는 빌드 타임에 JSX, TSX, Vue 및 Svelte 소스에서 동일한 작업을 수행하여 변경될 때마다 사전을 생성하고 HMR을 통해 동기화하므로 수동으로 키를 관리할 필요가 없습니다.

컴파일러를 켜기 전에 알아두어야 할 두 가지 제한 사항이 있습니다. 정적 분석으로 작동하므로 API 오류 코드나 CMS 필드와 같이 런타임에만 존재하는 문자열은 처리할 수 없습니다. 또한 큰 코드베이스에서 몇 가지 어노테이션이 필요한 `className="active"` 또는 상태 코드와 같은 애플리케이션 로직과 사용자 대면 텍스트를 구분해야 합니다. [extract 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/extract.md)은 사용자가 직접 제어할 수 있도록 하여 두 가지 문제를 모두 방지합니다.

</Question>

<Question title="사용 가능한 에디터 및 AI 에이전트 도구는 무엇이 있나요?">

5가지 도구가 모두 선택 사항으로 제공됩니다:

- **[VS Code 확장 프로그램](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)**: `useIntlayer` 키에서 이를 선언한 콘텐츠 파일로 바로 이동하고, 컴포넌트에서 콘텐츠를 추출하며, 명령 팔레트나 전용 Intlayer 탭에서 build, fill, test, push, pull을 실행할 수 있습니다.
- **[LSP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**: LSP를 지원하는 모든 에디터에서 정의로 이동, 모든 참조 찾기, 번역 값 마우스 오버 미리보기, 키 및 필드 자동 완성, 선언되지 않은 키에 대한 경고 등 동일한 기능을 제공합니다. 또한 `i18next`, `react-i18next`, `next-intl`, `use-intl` 호출도 해석하므로 마이그레이션 시 유용합니다.
- **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code, ChatGPT에 Intlayer 문서와 CLI를 노출하여 AI 어시스턴트가 최신 문서를 기반으로 정확히 답변하고 `intlayer fill` 등의 명령을 직접 실행할 수 있게 합니다.
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**: `intlayer-config`, `intlayer-cli`, `intlayer-content` 및 각 프레임워크 전용 스킬을 통해 AI 에이전트에게 라우팅 설정과 콘텐츠 노드 타입을 학습시킵니다.
- **[ESLint 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)**: `no-raw-text` 규칙으로 하드코딩된 문자열을 표시하고, 정적 사전 키 및 사용되지 않는 콘텐츠에 대한 추가 규칙을 제공합니다.

</Question>

<Question title="Lit 컴포넌트에서 번역된 콘텐츠를 어떻게 사용하나요?">

6단계에서 보여주는 것처럼 Intlayer 바인딩을 통해 `LitElement` 렌더 메서드 내부에서 콘텐츠를 읽으면 됩니다. 로케일을 변경하면 해당 콘텐츠를 읽는 요소의 업데이트가 트리거되므로 언어를 전환할 때 페이지를 새로고침하거나 두 번째 번들을 제공할 필요가 없습니다.

</Question>

<Question title="Intlayer는 Vite 개발 서버 및 핫 리로드와 호환되나요?">

네. `intlayer()` Vite 플러그인은 `.content.ts` 파일을 감시하고 저장 시 영향을 받는 사전을 다시 빌드하므로 개발 서버를 다시 시작하지 않고도 수정 사항이 반영되며, 자동 완성 유지를 위해 생성된 타입도 동시에 재생성됩니다.

</Question>

<Question title="지역화된 라우팅은 어떻게 설정하나요?">

9단계와 10단계에서 지역화된 라우트 및 로케일 변경 시 URL 다시 쓰기를 다룹니다. `routing.mode`는 URL 체계를 결정합니다: `"prefix-no-default"`(기본값: `/about`, `/ko/about`), `"prefix-all"`, `"no-prefix"`(쿠키, 헤더 또는 도메인에서 확인) 또는 `"search-params"`(`/about?locale=ko`). [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Question>

<Question title="아랍어나 히브리어 같은 우측에서 좌측으로 쓰는 언어(RTL)는 어떻게 지원하나요?">

11단계에서 다룹니다. `getHTMLTextDir`은 로케일에 대해 `ltr`, `rtl` 또는 `auto`를 반환하므로 활성 로케일에서 루트 요소에 `lang`과 `dir`을 바인딩하고 CSS 논리 속성을 통해 레이아웃을 처리할 수 있습니다.

</Question>

<Question title="클라이언트 렌더링 Vite 앱에서 SEO 메타데이터는 어떻게 처리하나요?">

활성 로케일에서 `html` 요소의 `lang`과 `dir`을 설정하고, `x-default`를 포함하여 선언된 모든 로케일에 대해 `getMultilingualUrls`로 `hreflang` 대체를 출력합니다. 확실하게 크롤링되어야 하는 페이지의 경우 사전 렌더링(pre-render) 또는 서버 렌더링 설정을 사용하는 것이 좋습니다.

</Question>

<Question title="AI를 사용하여 앱을 자동으로 번역하려면 어떻게 하나요?">

`npx intlayer fill`을 실행하세요. 자체 제공업체 및 API 키를 사용하여 원하는 LLM으로 누락된 번역을 채워주며, `--git-diff`를 사용하면 브랜치에서 변경된 콘텐츠로 번역 범위를 제한할 수 있습니다. [fill 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/fill.md) 및 [CI/CD 통합](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/CI_CD.md)을 참조하세요.

</Question>

<Question title="Intlayer는 복수형, 성별 및 서식 있는 텍스트(Rich Text)를 지원하나요?">

네: [복수형(plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md), [성별 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/gender.md), 조건문, [삽입(insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md), 긴 텍스트를 위한 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/markdown.md), 그리고 숫자, 날짜, 통화를 위한 [포맷터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)를 지원합니다.

</Question>

<Question title="번역가가 코드를 건드리지 않고 콘텐츠를 수정할 수 있나요?">

자체 인프라에서 실행되어 실행 중인 앱에서 직접 텍스트를 수정할 수 있는 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md) 또는 배포 없이 변경할 수 있도록 콘텐츠를 외부화하는 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 통해 가능합니다.

</Question>

<Question title="Intlayer는 무료이며 오픈 소스인가요?">

네, 상업적 사용을 포함하여 Apache 2.0 라이선스에 따라 제공됩니다. 호스팅형 CMS는 선택적 유료 서비스이며 [자체 호스팅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md)도 가능합니다.

</Question>

</FAQ>

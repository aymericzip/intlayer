---
createdAt: 2025-04-18
updatedAt: 2026-05-31
title: "Angular 21 i18n - 앱을 번역하는 완전 가이드"
description: "i18next는 이제 그만. 2026년 다국어 (i18n) Angular 21 앱 구축 가이드. AI 에이전트로 번역하고 번들 크기, SEO, 성능을 최적화하세요."
keywords:
  - 국제화
  - 문서
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Solid useIntlayer API 사용을 직접 속성 액세스로 업데이트"
  - version: 8.0.0
    date: 2026-01-26
    changes: "안정화 버전 출시"
  - version: 8.0.0
    date: 2025-12-30
    changes: "init 명령어 추가"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 기록"
author: aymericzip
---

# Intlayer를 사용하여 Angular 21(Vite) 웹사이트 번역하기 | 국제화(i18n)

## 목차

<TOC/>

## 대안보다 Intlayer를 선택해야 하는 이유는 무엇입니까?

'ngx-translate' 또는 'angular-l10n'과 같은 주요 솔루션과 비교할 때 Intlayer는 다음과 같은 통합 최적화가 제공되는 솔루션입니다.

<AccordionGroup>

<Accordion header="완전한 각도 범위">

Intlayer는 **구성 요소 수준 콘텐츠 범위 지정**, **지연 로드 번역** 및 국제화 확장(i18n)에 필요한 모든 기능을 제공하여 Angular와 완벽하게 작동하도록 최적화되었습니다.

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

## Angular 애플리케이션에 Intlayer를 설정하는 단계별 가이드

<Tabs defaultTab="code">
  <Tab label="코드" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer를 사용하여 애플리케이션을 국제화하는 방법"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="데모" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

GitHub에서 [애플리케이션 템플릿](https://github.com/aymericzip/intlayer-angular-21-template)을 확인하세요.

<Steps>

<Step number={1} title="종속성 설치">

npm을 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> 이 명령은 환경을 감지하고 필요한 패키지를 설치합니다. 예를 들어:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md), 트랜스파일링 및 [CLI 명령](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)을 위한 국제화 도구를 제공하는 코어 패키지입니다.

- **angular-intlayer**
  Intlayer를 Angular 애플리케이션과 통합하는 패키지입니다. Angular 국제화를 위한 컨텍스트 공급자와 훅을 제공합니다.

- **@angular-builders/custom-esbuild**
  Angular CLI의 esbuild 구성을 사용자 정의하는 데 필요합니다.

</Step>

<Step number={2} title="프로젝트 구성">

애플리케이션의 언어를 구성하기 위해 구성 파일을 만듭니다:

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

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자를 설정하고 콘솔에서 Intlayer 로그를 비활성화할 수 있습니다. 사용 가능한 매개변수의 전체 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

</Step>

<Step number={3} title="Angular 구성에 Intlayer 통합">

Intlayer를 Angular CLI와 통합하려면 사용자 지정 빌더를 사용해야 합니다. 이 가이드에서는 Vite/esbuild(Angular 21 프로젝트의 기본값)를 사용한다고 가정합니다.

먼저 사용자 지정 esbuild 빌더를 사용하도록 `angular.json`을 수정합니다. `build` 및 `serve` 구성을 업데이트합니다:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application", // replace "@angular/build:application"
          "options": {
            "define": {
              "process.env": "{}",
            },
            "plugins": ["./esbuild.plugins.ts"],
            "browser": "src/main.ts",
            // ...
          },
        },
        "serve": {
          "builder": "@angular-builders/custom-esbuild:dev-server", // replace "@angular/build:dev-server"
          "options": {
            "prebundle": {
              "exclude": [
                "intlayer",
                "angular-intlayer",
                "@intlayer/config/built",
                "@intlayer/core"
              ]
          },
        },
      },
    },
  },
}
```

> `angular.json`에서 `your-app-name`을 프로젝트의 실제 이름으로 바꾸는 것을 잊지 마세요.

다음으로 프로젝트 루트에 `esbuild.plugins.ts` 파일을 만듭니다:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> `intlayerEsbuildPlugin` 함수는 esbuild를 Intlayer로 구성합니다. 콘텐츠 선언 파일을 처리하는 플러그인을 주입하고 최적의 성능을 위한 구성을 설정합니다.

> **NX 사용자**: NX의 Angular 빌더는 Node의 네이티브 ESM 해상도를 통해 플러그인 파일을 로드하며 TypeScript 플러그인 파일을 즉석에서 컴파일하지 않습니다. 대신 `.mjs` 파일을 사용하고 이에 따라 `angular.json`에서 `plugins` 참조를 업데이트하십시오:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> 그런 다음 `angular.json`에서 `"./esbuild.plugins.ts"` 대신 `"./esbuild.plugins.mjs"`를 가리킵니다.

</Step>

<Step number={4} title="콘텐츠 선언">

번역을 저장하기 위해 콘텐츠 선언을 만들고 관리합니다:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en execution. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> 콘텐츠 선언은 `contentDir` 디렉터리(기본값은 `./src`)에 포함되어 있는 한 애플리케이션의 아무 곳에나 정의할 수 있습니다. 그리고 콘텐츠 선언 파일 확장자(기본값은 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

</Step>

<Step number={5} title="코드에서 Intlayer 활용">

전체 Angular 애플리케이션에서 Intlayer의 국제화 기능을 활용하려면 애플리케이션 구성에 Intlayer를 제공해야 합니다.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // 여기에 Intlayer 공급자를 추가합니다
  ],
};
```

그런 다음 임의의 컴포넌트 내에서 `useIntlayer` 기능을 사용할 수 있습니다.

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

템플릿에서:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Intlayer 콘텐츠는 `Signal`로 반환되므로 신호를 호출하여 값에 액세스합니다: `content().title`.

</Step>

<Step number={6} title="콘텐츠 언어 변경" isOptional={true}>

콘텐츠 언어를 변경하려면 `useLocale` 함수에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이를 통해 애플리케이션의 로캘을 설정하고 이에 따라 콘텐츠를 업데이트할 수 있습니다.

언어를 전환하는 컴포넌트를 만듭니다:

```typescript fileName="src/app/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useLocale } from "angular-intlayer";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="locale-switcher">
      <select
        [value]="locale()"
        (change)="setLocale($any($event.target).value)"
      >
        @for (loc of availableLocales; track loc) {
          <option [value]="loc">{{ loc }}</option>
        }
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

그런 다음 이 컴포넌트를 `app.component.ts`에서 사용합니다:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "./locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LocaleSwitcherComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  content = useIntlayer("app");
}
```

</Step>

</Steps>

### TypeScript 구성

Intlayer는 모듈 증강(Module Augmentation)을 사용하여 TypeScript의 이점을 얻고 코드베이스를 더 강력하게 만듭니다.

![자동 완성](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![번역 오류](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

TypeScript 구성에 자동 생성된 유형이 포함되어 있는지 확인하십시오.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 구성
  "include": [
    // ... 기존 TypeScript 구성
    ".intlayer/**/*.ts", // 자동 생성된 유형 포함
  ],
}
```

### Git 구성

Intlayer에서 생성된 파일을 무시하는 것이 좋습니다. 이렇게 하면 Git 리포지토리에 커밋되는 것을 피할 수 있습니다.

이를 위해 `.gitignore` 파일에 다음 지침을 추가할 수 있습니다:

```bash
# Intlayer에 의해 생성된 파일 무시
.intlayer
```

### VS Code 확장

Intlayer를 통한 개발 경험을 개선하기 위해 공식 **Intlayer VS Code Extension**을 설치할 수 있습니다.

[VS Code Marketplace에서 설치](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

이 확장은 다음을 제공합니다:

- 번역 키를 위한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 만들고 업데이트할 수 있는 **빠른 작업**.

확장을 사용하는 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [시각적 편집기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

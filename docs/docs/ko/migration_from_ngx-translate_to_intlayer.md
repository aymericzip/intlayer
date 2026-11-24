---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "ngx-translate에서 Intlayer로 마이그레이션"
description: "Angular 앱을 ngx-translate에서 Intlayer로 단계별로 마이그레이션하세요. compat adapter @intlayer/ngx-translate로 translate 파이프, translate 디렉티브, TranslateService가 그대로 동작합니다."
keywords:
  - ngx-translate
  - "@ngx-translate/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - Angular
slugs:
  - doc
  - migration
  - ngx-translate
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# ngx-translate에서 Intlayer로 마이그레이션

## ngx-translate에서 Intlayer로 마이그레이션하는 이유

<AccordionGroup>
<Accordion header="HTTP 로더 불필요">

ngx-translate는 `TranslateHttpLoader`를 통해 런타임에 로케일 파일을 가져오므로 첫 렌더링이 지연됩니다. Intlayer는 빌드 시 사전을 컴파일하므로 번역을 즉시 사용할 수 있습니다.

</Accordion>
<Accordion header="유지보수성">

키는 사전에 대해 **타입이 지정**되어 있어 잘못된 키는 빌드 시 실패합니다. 콘텐츠는 이를 사용하는 컴포넌트 옆에 둘 수 있습니다.

</Accordion>
<Accordion header="AI 에이전트">

컴포넌트 옆에 있는 콘텐츠는 LLM에 **필요한 컨텍스트를 줄여 줍니다**. Intlayer는 누락된 번역을 검사하는 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**, **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**를 제공합니다.

</Accordion>
<Accordion header="자동화">

원하는 LLM으로 CI/CD 파이프라인에서 누락된 메시지를 번역하거나, [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)에서 백그라운드로 번역하세요.

</Accordion>
<Accordion header="비개발자와 함께 확장">

Intlayer는 셀프 호스팅 **[비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[완전한 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공하여 번역가와 카피라이터가 실시간으로 콘텐츠를 편집할 수 있습니다.

</Accordion>
</AccordionGroup>

> 이 라이브러리들이 어디서 왔는지 알고 싶다면 [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)를 읽어 보세요.

## 마이그레이션 전략

1. **Compat adapter (기존 앱에 권장)**: `@intlayer/ngx-translate`를 설치합니다. `@ngx-translate/core`와 동일한 API(`provideTranslateService`, `TranslateService`, `TranslatePipe`, `TranslateDirective`, `TranslateModule`)를 노출하고 메시지를 Intlayer 사전에서 제공합니다. 템플릿은 변경할 필요가 없습니다.
2. **전체 마이그레이션**: ngx-translate 호출을 `angular-intlayer`의 `useIntlayer`와 컴포넌트 옆의 `.content.ts` 파일로 점진적으로 교체합니다.

## 목차

<TOC/>

## 빠른 마이그레이션

<Steps>
<Step number={1} title="의존성 설치">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트라면 `intlayer-cli init`을 사용하세요.

이 명령은 환경을 감지하고 필요한 package를 설치합니다. 예:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
npm install -D @angular-builders/custom-esbuild
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
pnpm add -D @angular-builders/custom-esbuild
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
yarn add -D @angular-builders/custom-esbuild
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/ngx-translate @intlayer/sync-json-plugin
bun add -D @angular-builders/custom-esbuild
```

> `@ngx-translate/core`는 설치된 상태로 두세요. TypeScript 타입을 제공합니다. `@ngx-translate/http-loader`는 제거해도 됩니다.

</Step>
<Step number={2} title="Intlayer 설정">

`syncJSON` 플러그인이 기존 번역 파일을 가리키도록 설정하세요. namespace당 파일 하나(`src/i18n/en/home.json`)인 경우 각 파일이 하나의 사전이 됩니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // matches ngx-translate placeholder syntax: {{name}}
      format: "i18next",
      // ./src/i18n/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/i18n/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `'home.title' | translate`는 `home` 사전의 `title` 필드로 해석됩니다. 로케일당 파일 하나(`src/assets/i18n/en.json`)에 중첩된 키를 쓰고 있다면 대신 `source: ({ locale }) => \`./src/assets/i18n/${locale}.json\``을 사용하세요. 최상위 키 각각이 사전이 됩니다.

</Step>
<Step number={3} title="esbuild 플러그인 추가">

Angular CLI는 `@angular-builders/custom-esbuild`를 통해 esbuild 플러그인을 사용할 수 있습니다. 플러그인 파일을 만드세요.

```typescript fileName="esbuild.plugins.ts"
import { ngxTranslateEsbuildPlugin } from "@intlayer/ngx-translate/esbuild";

export default [ngxTranslateEsbuildPlugin()];
```

그다음 `angular.json`에서 참조하세요.

```json5 fileName="angular.json"
{
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-esbuild:application",
      "options": {
        "plugins": ["./esbuild.plugins.ts"],
        // ... your existing options
      },
    },
    "serve": {
      "builder": "@angular-builders/custom-esbuild:dev-server",
    },
  },
}
```

이 플러그인은 Intlayer 빌드를 실행하고 `@ngx-translate/core`를 `@intlayer/ngx-translate`로 해석하므로 소스 파일을 수정할 필요가 없습니다.

> Vite(Analog)로 빌드하나요? 대신 `@intlayer/ngx-translate/plugin`의 `ngxTranslateVitePlugin()`을 사용하세요.

</Step>
<Step number={4} title="HTTP 로더 제거">

`provideTranslateService()`는 유지하되 `loader` 옵션은 제거하세요. 메시지는 Intlayer 사전에서 제공됩니다.

```typescript fileName="src/app/app.config.ts"
import type { ApplicationConfig } from "@angular/core";
import { provideTranslateService } from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      lang: "en",
      fallbackLang: "en",
    }),
  ],
};
```

> 번역이 더 이상 로더를 거치지 않으므로 `TranslateHttpLoader`와 `@ngx-translate/http-loader`는 제거해도 됩니다.

</Step>
</Steps>

템플릿과 서비스는 변경 없이 계속 동작합니다.

```html fileName="src/app/app.html"
<h1>{{ 'home.title' | translate }}</h1>
<p [translate]="'home.greeting'" [translateParams]="{ name: 'Ada' }"></p>
<h2 translate>home.serviceSection</h2>
```

```typescript fileName="src/app/app.ts"
import { Component, inject } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  imports: [TranslatePipe],
  templateUrl: "./app.html",
})
export class App {
  private readonly translate = inject(TranslateService);

  readonly message = this.translate.instant("home.title");

  switchTo = (lang: string) => this.translate.use(lang);
}
```

## 전체 마이그레이션

<Steps>
<Step number={5} title="명시적인 import 이름 변경 (선택)" isOptional={true}>

alias는 이미 esbuild 플러그인이 처리합니다. 의존성을 명시적으로 드러내려면:

| 이전                                                            | 이후                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `import { TranslateService } from '@ngx-translate/core'`        | `import { TranslateService } from '@intlayer/ngx-translate'`        |
| `import { TranslatePipe } from '@ngx-translate/core'`           | `import { TranslatePipe } from '@intlayer/ngx-translate'`           |
| `import { provideTranslateService } from '@ngx-translate/core'` | `import { provideTranslateService } from '@intlayer/ngx-translate'` |

</Step>
<Step number={6} title="콘텐츠를 .content.ts 파일로 옮기기" isOptional={true}>

새 컴포넌트는 기존 ngx-translate 호출과 함께 네이티브 Intlayer 콘텐츠를 사용할 수 있습니다. `app.config.ts`에서 `provideTranslateService()` 옆에 `angular-intlayer`의 `provideIntlayer()`를 등록한 뒤:

```typescript fileName="src/app/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```typescript fileName="src/app/home.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  template: `<h1>{{ content().title }}</h1>`,
})
export class HomeComponent {
  content = useIntlayer("home");
}
```

</Step>
<Step number={7} title="AI 기반 번역 활성화" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

채워진 번역은 JSON 파일에 다시 기록됩니다. AI 설정은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참고하세요.

</Step>
</Steps>

## 마이그레이션 후 삭제할 수 있는 항목

| 파일 / 패턴                                    | 더 이상 필요 없는 이유                   |
| ---------------------------------------------- | ---------------------------------------- |
| `TranslateHttpLoader` / 커스텀 로더            | 사전은 Intlayer가 컴파일하고 로드합니다. |
| `@ngx-translate/http-loader`                   | 런타임에 번역 파일을 가져오지 않습니다.  |
| `provideHttpClient()` (번역에만 사용하는 경우) | 같은 이유입니다.                         |

## TypeScript 설정

생성된 타입을 `tsconfig.json`에 포함하세요.

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git 설정

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [ngx-translate compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/ngx-translate.md)
- [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)
- [Angular와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_angular_21.md)
- [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)

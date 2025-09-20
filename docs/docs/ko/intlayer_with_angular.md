---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Angular 웹사이트 번역하기 (i18n)
description: Angular 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위한 문서를 따라가세요.
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
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
---

# Intlayer를 사용한 Angular 국제화(i18n) 시작하기

> 이 패키지는 개발 중입니다. 자세한 내용은 [이슈](https://github.com/aymericzip/intlayer/issues/116)를 참고하세요. Angular용 Intlayer에 관심이 있다면 이 이슈에 좋아요를 눌러주세요.

<!-- GitHub에서 [Application Template](https://github.com/aymericzip/intlayer-angular-template)을 참조하세요. -->

## Intlayer란 무엇인가요?

**Intlayer**는 현대 웹 애플리케이션에서 다국어 지원을 간소화하도록 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다.

Intlayer를 사용하면 다음을 할 수 있습니다:

- **컴포넌트 수준에서 선언적 사전을 사용하여 번역을 쉽게 관리**할 수 있습니다.
- **메타데이터, 라우트 및 콘텐츠를 동적으로 현지화**할 수 있습니다.
- **자동 생성된 타입으로 TypeScript 지원을 보장**하여 자동 완성 및 오류 감지를 향상시킵니다.
- **동적 로케일 감지 및 전환과 같은 고급 기능**을 활용할 수 있습니다.

---

## Angular 애플리케이션에서 Intlayer 설정 단계별 가이드

### 1단계: 의존성 설치

npm을 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
```

- **intlayer**

  구성 관리, 번역, [콘텐츠 선언](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md), 트랜스파일링 및 [CLI 명령어](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)를 위한 국제화 도구를 제공하는 핵심 패키지입니다.

- **angular-intlayer**
  Intlayer를 Angular 애플리케이션과 통합하는 패키지로, Angular 국제화를 위한 컨텍스트 프로바이더와 훅을 제공합니다.

- **@intlayer/webpack**
  Intlayer를 Webpack과 통합하는 패키지입니다. Angular CLI가 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링하는 데 사용됩니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위해 설정 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Intlayer를 Webpack과 통합하는 패키지입니다. Angular CLI가 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링하는 데 사용됩니다.

### 2단계: 프로젝트 구성

애플리케이션의 언어를 구성하기 위해 설정 파일을 만드세요:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> 이 구성 파일을 통해 로컬라이즈된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언 위치 및 확장자, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Angular 구성에 Intlayer 통합

Intlayer를 Angular CLI와 통합하려면 빌더에 따라 `esbuild` 또는 `webpack` 두 가지 옵션이 있습니다.

#### 옵션 1: esbuild 사용 (권장)

먼저, `angular.json`을 수정하여 커스텀 esbuild 빌더를 사용하도록 합니다. `build` 구성을 업데이트하세요:

> 이 구성 파일을 통해 지역화된 URL, 미들웨어 리디렉션, 쿠키 이름, 콘텐츠 선언의 위치 및 확장자 설정, 콘솔에서 Intlayer 로그 비활성화 등 다양한 설정을 할 수 있습니다. 사용 가능한 모든 매개변수 목록은 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

### 3단계: Angular 구성에 Intlayer 통합하기

Intlayer를 Angular CLI와 통합하려면 빌더에 따라 두 가지 옵션이 있습니다: `esbuild` 또는 `webpack`.

#### 옵션 1: esbuild 사용 (권장)

먼저, `angular.json` 파일을 수정하여 커스텀 esbuild 빌더를 사용하도록 합니다. `build` 구성을 업데이트하세요:

> `angular.json`에서 `your-app-name`을 실제 프로젝트 이름으로 바꾸는 것을 잊지 마세요.

다음으로, 프로젝트 루트에 `esbuild/intlayer-plugin.ts` 파일을 생성하세요:

```typescript fileName="esbuild/intlayer-plugin.ts"
import { prepareIntlayer, watch } from "@intlayer/chokidar";
import { getConfiguration, logger } from "@intlayer/config";
import type { Plugin } from "esbuild";

const intlayer: Plugin = {
  name: "intlayer-esbuild-plugin",
  setup(build) {
    const configuration = getConfiguration();
    let isWatching = false;

    build.onStart(async () => {
      logger("Intlayer esbuild 플러그인 시작됨", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("감시 모드 활성화됨. 감시자 시작 중...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Intlayer esbuild 플러그인 오류: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> esbuild용 `intlayer`은 빌드 시작 전에 Intlayer가 준비되도록 보장하며 개발 모드에서 변경 사항을 감시합니다.

#### 옵션 2: Webpack 사용하기

먼저, `angular.json` 파일을 수정하여 커스텀 Webpack 빌더를 사용하도록 합니다. `build` 및 `serve` 설정을 업데이트하세요:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        },
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server"
        }
      }
    }
  }
}
```

> `angular.json`에서 `your-app-name`을 실제 프로젝트 이름으로 바꾸는 것을 잊지 마세요.

다음으로, 프로젝트 루트에 `webpack.config.js` 파일을 생성하세요:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> `IntlayerWebpackPlugin`은 Intlayer를 Webpack과 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일의 빌드를 보장하고 개발 모드에서 이를 모니터링합니다. 또한 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위한 별칭도 제공합니다.

### 4단계: 콘텐츠 선언하기

번역을 저장하기 위해 콘텐츠 선언을 생성하고 관리하세요:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
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
      ko: "축하합니다! 앱이 실행 중입니다. 🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      ko: "문서 탐색하기",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      ko: "튜토리얼로 배우기",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      ko: "앵귤러 언어 서비스",
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

> 콘텐츠 선언은 애플리케이션 내 어디서든 `contentDir` 디렉토리(기본값: `./src`)에 포함되기만 하면 정의할 수 있습니다. 또한 콘텐츠 선언 파일 확장자(기본값: `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`)와 일치해야 합니다.

> 자세한 내용은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/get_started.md)를 참고하세요.

### 5단계: 코드에서 Intlayer 사용하기

Angular 애플리케이션 전반에서 Intlayer의 국제화 기능을 활용하려면 컴포넌트 내에서 `useIntlayer` 함수를 사용해야 합니다. 이 함수는 `angular-intlayer`에서 제공되며, 반응형 시그널로 번역에 접근할 수 있게 해줍니다.
`IntlayerProvider`는 애플리케이션의 루트에 등록되어 있으므로, 모듈의 providers에 추가할 필요가 없습니다.

컴포넌트 클래스에서 콘텐츠 사전에 접근하세요:

```typescript fileName="src/app/hello-world.component.ts"
import { Component, signal } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-hello-world",
  standalone: true,
  template: `
    <h1>{{ content().title }}</h1>

    <div class="card">
      <button type="button" (click)="increment()">
        {{ content().count }} {{ count() }}
      </button>
      <p [innerHTML]="content().edit"></p>
    </div>

    <p class="read-the-docs">{{ content().readTheDocs }}</p>
  `,
})
export class HelloWorldComponent {
  content = useIntlayer("helloworld");
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
```

Intlayer 콘텐츠는 `Signal`로 반환되므로 템플릿에서 신호를 호출하여 값에 접근합니다: `content().title`.

### (선택 사항) 6단계: 콘텐츠의 언어 변경하기

콘텐츠의 언어를 변경하려면 `useLocale` 함수에서 제공하는 `setLocale` 함수를 사용할 수 있습니다. 이를 통해 애플리케이션의 로케일을 설정하고 콘텐츠를 업데이트할 수 있습니다.

언어를 전환하는 컴포넌트를 만듭니다:

````typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { getLocaleName } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  localeInfo = useLocale();
  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  // 템플릿에서 getLocaleName을 사용할 수 있도록 노출
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

그런 다음, 이 컴포넌트를 `app.component.ts`에서 사용하세요:

```typescript fileName="src/app/app.component.ts"
import { Component } from "@angular/core";
import { HelloWorldComponent } from "./hello-world.component";
import { LocaleSwitcherComponent } from "./components/locale-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HelloWorldComponent, LocaleSwitcherComponent],
  template: `
    <div>
      <app-locale-switcher />
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Angular logo"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
````

### (선택 사항) 7단계: 애플리케이션에 지역화된 라우팅 추가하기

Angular 애플리케이션에 지역화된 라우팅을 추가하려면 Angular Router를 사용하여 로케일 접두사를 붙이는 방식을 사용합니다. 이렇게 하면 각 언어별로 고유한 경로가 생성되어 SEO에 유리합니다.

예시:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

먼저, `@angular/router`가 설치되어 있는지 확인하세요.

그다음, `app.routes.ts`에서 로케일 기반 라우팅을 처리하는 라우터 구성을 만듭니다.

```typescript fileName="src/app/app.routes.ts"
import { Routes } from "@angular/router";
import { configuration, localeFlatMap } from "intlayer";
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root/root.component";

const { defaultLocale } = configuration.internationalization;

export const routes: Routes = [
  localeFlatMap((localizedData) => [
    {
      path: `${localizedData.urlPrefix}`,
      component: RootComponent,
      data: { locale: localizedData.locale },
    },
    {
      path: `${localizedData.urlPrefix}/home`,
      component: HomeComponent,
      data: { locale: localizedData.locale },
    },
  ]),
  { path: "**", redirectTo: `/${defaultLocale}/home` },
];
```

그런 다음, `app.config.ts`에서 라우터를 제공해야 합니다.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (선택 사항) 8단계: 로케일이 변경될 때 URL 변경하기

사용자가 언어를 변경할 때 URL을 자동으로 업데이트하려면 `LocaleSwitcher` 컴포넌트를 Angular의 Router를 사용하도록 수정할 수 있습니다:

```typescript fileName="src/app/components/locale-switcher.component.ts"
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="locale-switcher">
      <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
        <option *ngFor="let loc of availableLocales" [value]="loc">
          {{ getLocaleName(loc) }}
        </option>
      </select>
    </div>
  `,
})
export class LocaleSwitcherComponent {
  private router = inject(Router);

  localeInfo = useLocale({
    onLocaleChange: (newLocale) => {
      const currentPath = this.router.url;
      const localizedPath = getLocalizedUrl(currentPath, newLocale);
      this.router.navigateByUrl(localizedPath);
    },
  });

  locale = this.localeInfo.locale;
  availableLocales = this.localeInfo.availableLocales;

  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

### (선택 사항) 9단계: HTML 언어 및 방향 속성 변경하기

애플리케이션이 여러 언어를 지원할 때, 현재 로케일에 맞게 `<html>` 태그의 `lang` 및 `dir` 속성을 업데이트하는 것이 중요합니다.

이 작업을 자동으로 처리하는 서비스를 만들 수 있습니다.

```typescript fileName="src/app/services/i18n-html-attributes.service.ts"
import { Injectable, effect } from "@angular/core";
import { useLocale } from "angular-intlayer";
import { getHTMLTextDir } from "intlayer";

@Injectable({
  providedIn: "root",
})
export class I18nHtmlAttributesService {
  private localeInfo = useLocale();

  constructor() {
    effect(() => {
      const newLocale = this.localeInfo.locale();
      if (newLocale) {
        document.documentElement.lang = newLocale;
        document.documentElement.dir = getHTMLTextDir(newLocale);
      }
    });
  }

  // 이 메서드는 앱의 루트 컴포넌트에서 호출하여 서비스가 초기화되었는지 확인할 수 있습니다.
  init() {}
}
```

그런 다음, 이 서비스를 메인 `AppComponent`에 주입하고 초기화합니다:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... 기타 임포트
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ...
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
```

### (선택 사항) 10단계: 지역화된 링크 디렉티브 만들기

애플리케이션의 내비게이션이 현재 로케일을 준수하도록 하려면, 사용자 지정 디렉티브를 만들 수 있습니다. 이 디렉티브는 내부 URL에 자동으로 현재 언어 접두사를 붙입니다.

```typescript fileName="src/app/directives/localized-link.directive.ts"
import { Directive, Input, HostBinding, inject } from "@angular/core";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "angular-intlayer";

@Directive({
  selector: "a[appLocalizedLink]",
  standalone: true,
})
export class LocalizedLinkDirective {
  @Input("href") originalHref: string = "";

  private localeInfo = useLocale();

  @HostBinding("href")
  get localizedHref(): string {
    const locale = this.localeInfo.locale();
    const isExternalLink = /^https?:\/\//.test(this.originalHref);
    if (isExternalLink || !this.originalHref) {
      return this.originalHref;
    }

    return getLocalizedUrl(this.originalHref, locale);
  }
}
```

사용하려면 앵커 태그에 `appLocalizedLink` 디렉티브를 추가하고, 컴포넌트에서 해당 디렉티브를 반드시 임포트하세요.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Home</a> `,
})
export class AppComponent {}
```

### (선택 사항) 11단계: 마크다운 렌더링

Intlayer는 Markdown 콘텐츠 렌더링을 지원합니다. Markdown을 풍부한 HTML로 변환하려면 [markdown-it](https://github.com/markdown-it/markdown-it)을 통합할 수 있습니다.

먼저, `markdown-it`을 설치하세요:

```bash
npm install markdown-it
# 그리고 타입 정의도 함께 설치
npm install -D @types/markdown-it
```

다음으로, `app.config.ts`에서 `INTLAYER_MARKDOWN_TOKEN`을 구성합니다.

기본적으로 Intlayer는 렌더링된 HTML을 문자열로 반환합니다. `[innerHTML]`을 사용해 바인딩할 경우 보안 문제(XSS)에 주의해야 합니다. 항상 콘텐츠가 신뢰할 수 있는 출처에서 온 것인지 확인하세요.

더 복잡한 시나리오에서는 HTML을 안전하게 렌더링하기 위해 파이프를 생성할 수 있습니다.

### TypeScript 구성

Intlayer는 모듈 증강(module augmentation)을 사용하여 TypeScript의 이점을 활용하고 코드베이스를 더욱 견고하게 만듭니다.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

TypeScript 구성에 자동 생성된 타입이 포함되어 있는지 확인하세요.

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정 유지
  "include": [
    // ... 기존 TypeScript 설정 유지
    ".intlayer/**/*.ts", // 자동 생성된 타입 포함
  ],
}
```

### Git 설정

Intlayer가 생성하는 파일들은 Git 저장소에 커밋하지 않도록 무시하는 것이 좋습니다.

이를 위해 `.gitignore` 파일에 다음 내용을 추가할 수 있습니다:

```plaintext
# Intlayer가 생성한 파일 무시
.intlayer
```

### VS Code 확장 프로그램

Intlayer와 함께 개발 경험을 향상시키기 위해 공식 **Intlayer VS Code 확장 프로그램**을 설치할 수 있습니다.

[VS Code 마켓플레이스에서 설치하기](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
이 확장 기능은 다음을 제공합니다:

- 번역 키에 대한 **자동 완성**.
- 누락된 번역에 대한 **실시간 오류 감지**.
- 번역된 콘텐츠의 **인라인 미리보기**.
- 번역을 쉽게 생성하고 업데이트할 수 있는 **빠른 작업**.

확장 기능 사용 방법에 대한 자세한 내용은 [Intlayer VS Code 확장 기능 문서](https://intlayer.org/doc/vs-code-extension)를 참조하세요.

---

### 더 나아가기

더 나아가려면 [비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 구현하거나 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)를 사용하여 콘텐츠를 외부화할 수 있습니다.

---

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력

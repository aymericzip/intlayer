---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Как перевести ваше Angular – руководство i18n 2025
description: Узнайте, как сделать ваш сайт на Angular многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Переведите ваш Angular с Intlayer | Интернационализация (i18n)

> Этот пакет находится в разработке. Подробнее смотрите в [issue](https://github.com/aymericzip/intlayer/issues/116). Покажите интерес к Intlayer для Angular, поставив лайк этому issue

<!-- См. [Application Template](https://github.com/aymericzip/intlayer-angular-template) на GitHub. -->

## Что такое Intlayer?

**Intlayer** - это инновационная, открытая библиотека интернационализации (i18n), созданная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Воспользоваться расширенными возможностями**, такими как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в приложении Angular

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **angular-intlayer**

  Пакет, который интегрирует Intlayer с приложением Angular. Он предоставляет провайдеры контекста и хуки для интернационализации в Angular.

- **@intlayer/webpack**
  Пакет, который интегрирует Intlayer с Webpack. Он используется Angular CLI для сборки файлов декларации контента и их мониторинга в режиме разработки.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
```

Пакет, который интегрирует Intlayer с Webpack. Он используется Angular CLI для сборки файлов деклараций контента и их мониторинга в режиме разработки.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
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
      // Ваши другие локали
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
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправления в middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Angular

Для интеграции Intlayer с Angular CLI у вас есть два варианта в зависимости от билдера: `esbuild` или `webpack`.

#### Вариант 1: Использование esbuild (рекомендуется)

Сначала измените ваш `angular.json`, чтобы использовать кастомный билдер esbuild. Обновите конфигурацию `build`:

> Через этот файл конфигурации вы можете настроить локализованные URL-адреса, перенаправление в middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Angular

Для интеграции Intlayer с Angular CLI у вас есть два варианта в зависимости от используемого билдера: `esbuild` или `webpack`.

#### Вариант 1: Использование esbuild (рекомендуется)

Сначала измените ваш файл `angular.json`, чтобы использовать кастомный билдер esbuild. Обновите конфигурацию `build`:

````json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
> Убедитесь, что вы заменили `your-app-name` на фактическое имя вашего проекта в файле `angular.json`.

Далее создайте файл `esbuild/intlayer-plugin.ts` в корне вашего проекта:

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
      logger("Плагин Intlayer для esbuild запущен", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Режим наблюдения включен. Запуск наблюдателя...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Ошибка в плагине Intlayer для esbuild: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
````

> Плагин `intlayer` для esbuild гарантирует, что Intlayer подготовлен перед началом сборки и следит за изменениями в режиме разработки.

#### Вариант 2: Использование Webpack

Сначала измените ваш файл `angular.json`, чтобы использовать пользовательский сборщик Webpack. Обновите конфигурации `build` и `serve`:

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

> Обязательно замените `your-app-name` на фактическое имя вашего проекта в `angular.json`.

Далее создайте файл `webpack.config.js` в корне вашего проекта:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> Плагин `IntlayerWebpackPlugin` используется для интеграции Intlayer с Webpack. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Также он определяет переменные окружения Intlayer внутри приложения. Дополнительно предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявите Ваш Контент

Создайте и управляйте декларациями контента для хранения переводов:

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
      ru: "Поздравляем! Ваше приложение запущено. 🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      ru: "Изучите документацию",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      ru: "Учитесь с помощью учебников",
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "CLI Docs",
    angularLanguageService: t({
      ru: "Служба языка Angular",
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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они включены в директорию `contentDir` (по умолчанию, `./src`). И соответствовать расширению файлов объявлений контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

### Шаг 5: Использование Intlayer в вашем коде

Чтобы использовать возможности интернационализации Intlayer во всём вашем Angular-приложении, необходимо использовать функцию `useIntlayer` внутри компонента. Эта функция, доступная из `angular-intlayer`, предоставляет доступ к вашим переводам в виде реактивных сигналов.
`IntlayerProvider` зарегистрирован в корне приложения, поэтому вам не нужно добавлять его в провайдеры вашего модуля.

Доступ к вашим словарям контента осуществляется в классе компонента:

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

Контент Intlayer возвращается как `Signal`, поэтому вы получаете доступ к значениям, вызывая сигнал в вашем шаблоне: `content().title`.

### (Необязательно) Шаг 6: Изменение языка вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую функцией `useLocale`. Это позволяет установить локаль приложения и обновить контент соответственно.

Создайте компонент для переключения между языками:

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

  // Сделать getLocaleName доступным в шаблоне
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
Затем используйте этот компонент в вашем `app.component.ts`:

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
        <img src="/vite.svg" class="logo" alt="Логотип Vite" />
      </a>
      <a href="https://angular.dev/" target="_blank">
        <img
          src="/assets/angular.svg"
          class="logo angular"
          alt="Логотип Angular"
        />
      </a>
    </div>
    <app-hello-world />
  `,
})
export class AppComponent {}
````

### (Необязательно) Шаг 7: Добавьте локализованную маршрутизацию в ваше приложение

Добавление локализованной маршрутизации в приложение Angular предполагает использование Angular Router с префиксами локалей. Это создаёт уникальные маршруты для каждого языка, что полезно для SEO.

Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Сначала убедитесь, что у вас установлен пакет `@angular/router`.

Затем создайте конфигурацию маршрутизатора, которая обрабатывает маршрутизацию на основе локали, в файле `app.routes.ts`.

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

Затем необходимо зарегистрировать маршрутизатор в вашем файле `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (Необязательно) Шаг 8: Изменение URL при смене локали

Чтобы автоматически обновлять URL при смене языка пользователем, вы можете изменить компонент `LocaleSwitcher`, чтобы использовать маршрутизатор Angular:

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

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления в теге HTML

Когда ваше приложение поддерживает несколько языков, крайне важно обновлять атрибуты `lang` и `dir` тега `<html>`, чтобы они соответствовали текущей локали.

Вы можете создать сервис, который будет делать это автоматически.

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

  // Этот метод можно вызвать в корневом компоненте приложения, чтобы гарантировать инициализацию сервиса.
  init() {}
}
```

Затем внедрите и инициализируйте этот сервис в вашем основном `AppComponent`:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... другие импорты
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

### (Опционально) Шаг 10: Создание директивы локализованной ссылки

Чтобы навигация вашего приложения учитывала текущую локаль, вы можете создать пользовательскую директиву. Эта директива автоматически добавляет префикс с текущим языком к внутренним URL.

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

Чтобы использовать это, добавьте директиву `appLocalizedLink` к вашим тегам якоря и убедитесь, что импортировали её в вашем компоненте.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Главная</a> `,
})
export class AppComponent {}
```

### (Необязательно) Шаг 11: Отображение Markdown

Intlayer поддерживает рендеринг контента Markdown. Чтобы преобразовать Markdown в насыщенный HTML, вы можете интегрировать [markdown-it](https://github.com/markdown-it/markdown-it).

Сначала установите `markdown-it`:

```bash
npm install markdown-it
# и его типы
npm install -D @types/markdown-it
```

Далее настройте `INTLAYER_MARKDOWN_TOKEN` в вашем `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { createIntlayerMarkdownProvider } from "angular-intlayer/markdown";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    createIntlayerMarkdownProvider((markdown) => md.render(markdown)),
  ],
};
```

По умолчанию Intlayer возвращает отрендеренный HTML в виде строки. Если вы используете `[innerHTML]` для привязки, учитывайте риски безопасности (XSS). Всегда убеждайтесь, что ваш контент поступает из надежного источника.

Для более сложных сценариев вы можете создать pipe для безопасного рендеринга HTML.

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы использовать преимущества TypeScript и сделать ваш код более надежным.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие настройки TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их случайного коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
Это расширение предоставляет:

- **Автодополнение** ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.

Для получения подробной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешний [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

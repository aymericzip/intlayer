---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - Как перевести приложение Angular 21 (Vite) в 2026 году
description: Узнайте, как сделать ваш веб-сайт на Angular многоязычным. Следуйте документации, чтобы интернационализировать (i18n) и перевести его.
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновлено использование API Solid useIntlayer для прямого доступа к свойствам"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Релиз стабильной версии"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Добавлена команда init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Первая запись"
---

# Переведите ваш веб-сайт на Angular 21 (Vite) с помощью Intlayer | Интернационализация (i18n)

## Оглавление

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, разработанная для упрощения поддержки нескольких языков в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автоматически сгенерированными типами, улучшая автодополнение и обнаружение ошибок.
- **Использовать расширенные возможности**, такие как динамическое обнаружение и переключение языка.

---

## Пошаговое руководство по настройке Intlayer в приложении Angular

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-angular-21-template.vercel.app/"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [Шаблон Приложения](https://github.com/aymericzip/intlayer-angular-21-template) на GitHub.

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-esbuild --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-esbuild --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-esbuild --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-esbuild --dev
bun x intlayer init
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **angular-intlayer**
  Пакет, который интегрирует Intlayer с приложением Angular. Он предоставляет контекстные провайдеры и хуки для интернационализации Angular.

- **@angular-builders/custom-esbuild**
  Необходим для настройки конфигурации esbuild в Angular CLI.

### Шаг 2: Настройка вашего проекта

Создайте конфигурационный файл для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Другие языки
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через этот конфигурационный файл вы можете настроить локализованные URL, редиректы, названия cookie, расположение и расширение файлов ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Angular

Чтобы интегрировать Intlayer с Angular CLI, вам необходимо использовать кастомный сборщик. В этом руководстве предполагается, что вы используете Vite/esbuild (по умолчанию для проектов Angular 21).

Сначала измените ваш `angular.json` для использования пользовательского esbuild. Обновите конфигурации `build` и `serve`:

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

> Не забудьте заменить `your-app-name` на фактическое название вашего проекта в `angular.json`.

Далее создайте файл `esbuild.plugins.ts` в корневом каталоге вашего проекта:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> Функция `intlayerEsbuildPlugin` конфигурирует esbuild с Intlayer. Она внедряет плагин для обработки файлов деклараций контента и устанавливает настройки для достижения максимальной производительности.

> **Пользователи NX**: Сборщики Angular в NX загружают файлы плагинов через собственное разрешение ESM в Node и не компилируют файлы плагинов TypeScript на лету. Используйте вместо этого файл `.mjs` и соответствующим образом обновите ссылку `plugins` в `angular.json`:
>
> ```javascript fileName="esbuild.plugins.mjs"
> import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";
>
> export default [intlayerEsbuildPlugin()];
> ```
>
> Затем в `angular.json` укажите `"./esbuild.plugins.mjs"` вместо `"./esbuild.plugins.ts"`.

### Шаг 4: Объявите свой контент

Создавайте и управляйте декларациями вашего контента для хранения переводов:

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
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
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

> Ваши декларации контента могут быть определены в любом месте вашего приложения, при условии, что они находятся в каталоге `contentDir` (по умолчанию `./src`). А также они должны соответствовать расширению файлов для деклараций контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Подробнее см. в [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Шаг 5: Использование Intlayer в вашем коде

Чтобы использовать функции интернационализации Intlayer во всем вашем приложении Angular, вам необходимо предоставить Intlayer в конфигурации приложения.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Добавьте провайдер Intlayer здесь
  ],
};
```

После этого вы можете использовать функцию `useIntlayer` внутри любого компонента.

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

А в вашем шаблоне:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Контент Intlayer возвращается как сигнал (`Signal`), поэтому вы обращаетесь к значениям, вызывая сигнал: `content().title`.

### (Дополнительно) Шаг 6: Изменение языка контента

Чтобы изменить язык контента, вы можете использовать функцию `setLocale`, предоставляемую функцией `useLocale`. Это позволяет устанавливать локаль приложения и соответствующим образом обновлять контент.

Создайте компонент для переключения между языками:

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

Затем используйте этот компонент в `app.component.ts`:

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

### Настройка TypeScript

Intlayer использует расширение модулей (Module Augmentation) для использования преимуществ TypeScript и создания более надежной кодовой базы.

![Автодополнение](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Ошибка перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автосгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автосгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит вам не коммитить их в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в файл `.gitignore`:

```bash
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение для VS Code

Чтобы улучшить процесс разработки с Intlayer, вы можете установить официальное **Расширение Intlayer для VS Code**.

[Установите из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для недостающих переводов.
- **Встроенный предварительный просмотр** переведенного контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Подробнее о том, как использовать расширение, см. [в документации к расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Идти дальше

Чтобы пойти дальше, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или экстернализовать свой контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

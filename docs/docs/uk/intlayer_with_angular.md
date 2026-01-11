---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Як перекласти ваш додаток Angular — посібник з i18n 2026
description: Дізнайтеся, як зробити ваш вебсайт на Angular багатомовним. Слідуйте документації, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - angular
# applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть ваш вебсайт на Angular за допомогою Intlayer | Інтернаціоналізація (i18n)

> Цей пакет знаходиться в розробці. Див. [issue](https://github.com/aymericzip/intlayer/issues/116) для детальнішої інформації. Підтримайте Intlayer для Angular, поставивши лайк цьому issue

<!-- Див. [Application Template](https://github.com/aymericzip/intlayer-angular-template) на GitHub. -->

## Що таке Intlayer?

**Intlayer** — інноваційна, open-source бібліотека для інтернаціоналізації (i18n), створена для спрощення підтримки кількох мов у сучасних вебдодатках.

За допомогою Intlayer ви можете:

- **Просто керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані, маршрути та вміст.**
- **Забезпечити підтримку TypeScript** з автоматично згенерованими типами, що покращує автодоповнення та виявлення помилок.
  /// **Отримайте переваги розширених функцій**, таких як динамічне визначення локалі та її перемикання.

---

## Покроковий посібник з налаштування Intlayer у додатку Angular

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою менеджера пакетів:

```bash packageManager="npm"
npm install intlayer angular-intlayer @intlayer/webpack
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer @intlayer/webpack
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer @intlayer/webpack
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer @intlayer/webpack
bunx intlayer init
```

- **intlayer**

Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладів, [декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **angular-intlayer**
  Пакет, який інтегрує Intlayer з Angular-застосунком. Забезпечує провайдери контексту та хуки для інтернаціоналізації в Angular.

- **@intlayer/webpack**

  Пакет, який інтегрує Intlayer з Webpack. Використовується Angular CLI для побудови файлів декларації контенту та їх моніторингу в режимі розробки.

### Крок 2: Конфігурація вашого проєкту

Створіть файл конфігурації для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваші інші локалі
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
      // Ваші інші локалі
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
      // Інші ваші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логування Intlayer у консолі та інше. Для повного переліку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Angular

Щоб інтегрувати Intlayer з Angular CLI, у вас є два варіанти залежно від вашого builder'а: `esbuild` або `webpack`.

#### Варіант 1: Використання esbuild (рекомендовано)

По-перше, змініть `angular.json`, щоб використовувати кастомний esbuild builder. Оновіть конфігурацію `build`:

```json fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-esbuild:application",
          "options": {
            "plugins": ["./esbuild/intlayer-plugin.ts"]
          }
        }
      }
    }
  }
}
```

> Переконайтеся, що ви замінили `your-app-name` на фактичну назву вашого проєкту в `angular.json`.

Далі створіть файл `esbuild/intlayer-plugin.ts` у корені вашого проєкту:

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
      logger("Intlayer esbuild plugin started", {
        level: "info",
      });

      if (build.initialOptions.watch && !isWatching) {
        logger("Watch mode enabled. Starting watcher...", {
          level: "info",
        });
        watch(configuration);
        isWatching = true;
      }

      try {
        await prepareIntlayer(configuration);
      } catch (error) {
        logger(`Error in Intlayer esbuild plugin: ${error}`, {
          level: "error",
        });
      }
    });
  },
};

export default intlayer;
```

> Пакет `intlayer` для esbuild забезпечує підготовку Intlayer перед початком збірки та відстежує зміни в режимі розробки.

#### Варіант 2: Використання Webpack

Спочатку змініть `angular.json`, щоб використовувати custom Webpack builder. Оновіть конфігурації `build` та `serve`:

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

> Переконайтеся, що ви замінили `your-app-name` на фактичну назву вашого проєкту в `angular.json`.

Далі створіть файл `webpack.config.js` у корені вашого проєкту:

```javascript fileName="webpack.config.js"
const { IntlayerWebpackPlugin } = require("@intlayer/webpack");

module.exports = {
  plugins: [new IntlayerWebpackPlugin()],
};
```

> Плагін `IntlayerWebpackPlugin` використовується для інтеграції Intlayer з Webpack. Він забезпечує побудову файлів декларацій контенту та їх моніторинг у режимі розробки. Також плагін задає змінні середовища Intlayer у застосунку. Додатково він надає alias-и для оптимізації продуктивності.

### Крок 4: Оголосіть ваш контент

Створіть і керуйте своїми деклараціями контенту для збереження перекладів:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      uk: "Привіт",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    congratulations: t({
      uk: "Вітаємо! Ваш додаток працює. 🎉",
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
    }),
    exploreDocs: t({
      uk: "Перегляньте документацію",
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
    }),
    learnWithTutorials: t({
      uk: "Вчіться за допомогою туторіалів",
      en: "Learn with Tutorials",
>>>  (translated) <<<
      uk: "Вчіться за допомогою туторіалів",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
    }),
    cliDocs: "Документація CLI",
    angularLanguageService: t({
      uk: "Angular Language Service",
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

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку, як тільки вони включені у директорію `contentDir` (за замовчуванням, `./src`). І вони мають відповідати розширенню файлу декларації контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для отримання додаткових відомостей зверніться до [документації з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

Щоб використовувати можливості інтернаціоналізації Intlayer у всьому вашому Angular-застосунку, потрібно використовувати функцію `useIntlayer` всередині компонента. Ця функція, доступна з пакета `angular-intlayer`, надає доступ до ваших перекладів у вигляді реактивних сигналів.

`IntlayerProvider` зареєстрований у корені застосунку, тому вам не потрібно додавати його до providers вашого модуля.

Отримайте доступ до словників контенту у класі вашого компонента:

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

Значення контенту Intlayer повертаються як `Signal`, тому ви отримуєте доступ до значень, викликаючи сигнал у вашому шаблоні: `content().title`.

### (Необов'язково) Крок 6: Змініть мову вашого контенту

Щоб змінити мову вашого контенту, ви можете використовувати функцію `setLocale`, що надається функцією `useLocale`. Це дозволяє встановити локаль додатка та відповідно оновити контент.

Створіть компонент для перемикання між мовами:

```typescript fileName="src/app/components/locale-switcher.component.ts"
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

  // Зробити getLocaleName доступним у шаблоні
  getLocaleName = getLocaleName;

  changeLocale(newLocale: string) {
    this.localeInfo.setLocale(newLocale);
  }
}
```

Потім використайте цей компонент у файлі `app.component.ts`:

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
```

### (Необов'язково) Крок 7: Додайте локалізовану маршрутизацію до вашого застосунку

Додавання локалізованої маршрутизації в Angular-застосунку передбачає використання Angular Router з префіксами локалі. Це створює унікальні маршрути для кожної мови, що корисно для SEO.

Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Спочатку переконайтесь, що у вас встановлено `@angular/router`.

Далі створіть конфігурацію маршрутизатора, яка обробляє маршрути з урахуванням локалі в `app.routes.ts`.

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

Потім потрібно надати роутер у файлі `app.config.ts`.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

### (Необов'язково) Крок 8: Зміна URL під час зміни локалі

Щоб автоматично оновлювати URL при зміні мови користувачем, можна змінити компонент `LocaleSwitcher`, щоб він використовував Angular Router:

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

### (Необов'язково) Крок 9: Змінити мову та напрямок тексту в HTML атрибутах

Коли ваш застосунок підтримує кілька мов, важливо оновлювати атрибути `lang` та `dir` тега `<html>`, щоб вони відповідали поточній локалі.

Ви можете створити сервіс, який робитиме це автоматично.

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

  // Цей метод можна викликати в кореневому компоненті програми, щоб гарантувати ініціалізацію сервісу.
  init() {}
}
```

Потім інжектуйте та ініціалізуйте цей сервіс у вашому головному `AppComponent`:

```typescript fileName="src/app/app.component.ts"
import { Component, inject } from "@angular/core";
// ... інші імпорти
import { I18nHtmlAttributesService } from "./services/i18n-html-attributes.service";

@Component({
  // ... інші параметри
})
export class AppComponent {
  constructor() {
    inject(I18nHtmlAttributesService).init();
  }
}
```

### (Необов'язково) Крок 10: Створення директиви локалізованого посилання

Щоб навігація вашого застосунку враховувала поточну локаль, ви можете створити власну директиву. Ця директива автоматично додає префікс поточної мови до внутрішніх URL.

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

Щоб використовувати її, додайте директиву `appLocalizedLink` до ваших тегів <a> і переконайтеся, що імпортували її в компоненті.

```typescript fileName="src/app/app.component.ts"
// ...
import { LocalizedLinkDirective } from "./directives/localized-link.directive";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [/*...,*/ LocalizedLinkDirective],
  template: ` <a href="/home" appLocalizedLink>Головна</a> `,
})
export class AppComponent {}
```

### (Необов'язково) Крок 11: Відображення Markdown

Intlayer підтримує рендеринг вмісту Markdown. Щоб конвертувати Markdown у багатий HTML, ви можете інтегрувати [markdown-it](https://github.com/markdown-it/markdown-it).

Спочатку встановіть `markdown-it`:

```bash
npm install markdown-it
# і його типи
npm install -D @types/markdown-it
```

Далі налаштуйте `INTLAYER_MARKDOWN_TOKEN` у вашому `app.config.ts`.

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

За замовчуванням Intlayer повертає згенерований HTML у вигляді рядка. Якщо ви прив'язуєте його через `[innerHTML]`, будьте уважні до наслідків для безпеки (XSS). Завжди переконуйтеся, що ваш вміст походить з довіреного джерела.

Для більш складних сценаріїв ви можете створити pipe, щоб безпечно відрендерити HTML.

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб скористатися перевагами TypeScript і зробити вашу codebase надійнішою.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript містить автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх коміту в ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного контенту.
- **Швидкі дії** для швидкого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Далі

Щоб просунутися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---

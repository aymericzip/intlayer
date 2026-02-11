---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Angular i18n - Як перекласти ваш додаток Angular – посібник 2026
description: Дізнайтеся, як зробити свій Angular веб-сайт багатомовним. Дотримуйтесь документації для інтернаціоналізації (i18n) та перекладу.
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Додати команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть свій Angular веб-сайт за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим вихідним кодом, розроблена для спрощення підтримки багатомовності в сучасних веб-додатках.

З Intlayer ви можете:

- **Легко керувати перекладами**, використовуючи декларативні словники на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та вміст.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автодоповнення та виявлення помилок.
- **Користуватися розширеними можливостями**, такими як динамічне визначення та перемикання локалі.

---

## Покроковий посібник із налаштування Intlayer у додатку Angular

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-angular-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Дивіться [Шаблон додатка](https://github.com/aymericzip/intlayer-angular-template) на GitHub.

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-webpack --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-webpack --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-webpack --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-webpack --dev
bunx intlayer init
```

- **intlayer**

  Основний пакет, що надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **angular-intlayer**
  Пакет, що інтегрує Intlayer з додатком Angular. Він надає провайдери контексту та хуки для інтернаціоналізації Angular.

- **@angular-builders/custom-webpack**
  Необхідний для налаштування конфігурації Webpack в Angular CLI.

### Крок 2: Конфігурація вашого проекту

Створіть файл конфігурації для налаштування мов вашого додатка:

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
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логування Intlayer у консолі та інше. Для повного переліку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Angular

Щоб інтегрувати Intlayer з Angular CLI, вам потрібно використовувати спеціальний білдер (builder). Цей посібник припускає, що ви використовуєте Webpack (стандарт для багатьох проектів Angular).

Спочатку змініть ваш `angular.json`, щоб використовувати спеціальний білдер Webpack. Оновіть конфігурації `build` та `serve`:

```json5 fileName="angular.json"
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser", // replace "@angular-devkit/build-angular:application",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.ts",
              "mergeStrategies": { "module.rules": "prepend" },
            },
            "main": "src/main.ts", // replace "browser": "src/main.ts",
            // ...
          },
        },
      },
    },
  },
}
```

> Переконайтеся, що ви замінили `your-app-name` на фактичну назву вашого проекту в `angular.json`.

Далі створіть файл `webpack.config.ts` у корені вашого проекту:

```typescript fileName="webpack.config.ts"
import { mergeConfig } from "angular-intlayer/webpack";

export default mergeConfig({});
```

> Функція `mergeConfig` налаштовує Webpack за допомогою Intlayer. Вона впроваджує `IntlayerWebpackPlugin` (для обробки файлів декларації вмісту) та налаштовує псевдоніми для оптимальної продуктивності.

### Крок 4: Декларування вмісту

Створюйте та керуйте своїми деклараціями вмісту для зберігання перекладів:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
      uk: "Привіт",
    }),
    congratulations: t({
      en: "Congratulations! Your app is running. 🎉",
      fr: "Félicitations! Votre application est en cours d'exécution. 🎉",
      es: "¡Felicidades! Tu aplicación está en ejecución. 🎉",
      uk: "Вітаємо! Ваш додаток працює. 🎉",
    }),
    exploreDocs: t({
      en: "Explore the Docs",
      fr: "Explorer les Docs",
      es: "Explorar los Docs",
      uk: "Дослідити документацію",
    }),
    learnWithTutorials: t({
      en: "Learn with Tutorials",
      fr: "Apprendre avec les Tutoriels",
      es: "Aprender con los Tutorios",
      uk: "Навчатися за туторіалами",
    }),
    cliDocs: "CLI Документація",
    angularLanguageService: t({
      en: "Angular Language Service",
      fr: "Service de Langage Angular",
      es: "Servicio de Lenguaje Angular",
      uk: "Мовна служба Angular",
    }),
    angularDevTools: "Angular DevTools",
    github: "Github",
    twitter: "Twitter",
    youtube: "Youtube",
  },
} satisfies Dictionary;

export default appContent;
```

> Ваші декларації вмісту можуть бути визначені в будь-якому місці вашого додатка, якщо вони включені до каталогу `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для отримання додаткової інформації дивіться [документацію з декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

Щоб використовувати функції інтернаціоналізації Intlayer у всьому додатку Angular, вам потрібно надати Intlayer у конфігурації вашого додатка.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Додайте провайдер Intlayer тут
  ],
};
```

Потім ви можете використовувати функцію `useIntlayer` всередині будь-якого компонента.

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

І у вашому шаблоні:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Вміст Intlayer повертається як `Signal`, тому ви отримуєте доступ до значень, викликаючи сигнал: `content().title`.

### (Опціонально) Крок 6: Зміна мови вашого вмісту

Щоб змінити мову вмісту, ви можете використовувати функцію `setLocale`, яку надає функція `useLocale`. Це дозволяє встановити локаль додатка та відповідно оновити вміст.

Створіть компонент для перемикання між мовами:

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
  styles: [
    `
      .locale-switcher {
        margin: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: fit-content;
      }
    `,
  ],
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Потім використовуйте цей компонент у вашому `app.component.ts`:

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

### Конфігурація TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги TypeScript і зробити вашу кодову базу міцнішою.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

### Конфігурація Git

Рекомендується ігнорувати файли, створені Intlayer. Це дозволяє уникнути їх фіксації у вашому Git-репозиторії.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext
# Ігнорувати файли, створені Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про те, як користуватися розширенням, дивіться [документацію розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Йти далі

Щоб йти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) або винести свій вміст у зовнішню систему за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

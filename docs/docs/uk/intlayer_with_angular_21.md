---
createdAt: 2025-04-18
updatedAt: 2026-05-06
title: Angular i18n - Як перекласти додаток Angular 21 (Vite) у 2026 році
description: Дізнайтеся, як зробити ваш вебсайт на Angular багатомовним. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його.
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
applicationTemplate: https://github.com/aymericzip/intlayer-angular-21-template
applicationShowcase: https://intlayer-angular-21-template.vercel.app/
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлено використання API Solid useIntlayer для прямого доступу до властивостей"
  - version: 8.0.0
    date: 2026-01-26
    changes: "Реліз стабільної версії"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Додана команда init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Початкова історія"
---

# Перекладіть ваш вебсайт Angular 21 (Vite) за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим вихідним кодом, розроблена для спрощення підтримки багатьох мов у сучасних веб-додатках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами**, використовуючи декларативні словники на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** з автоматично згенерованими типами, що покращує автодоповнення та виявлення помилок.
- **Використовувати розширені можливості**, такі як динамічне виявлення та перемикання мови.

---

## Покроковий посібник із налаштування Intlayer у додатку Angular

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-21-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
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

Перегляньте [Шаблон Додатку](https://github.com/aymericzip/intlayer-angular-21-template) на GitHub.

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

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

  Основний пакет, що надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **angular-intlayer**
  Пакет, який інтегрує Intlayer із додатком Angular. Він надає контекстні провайдери та хуки для інтернаціоналізації Angular.

- **@angular-builders/custom-esbuild**
  Необхідний для налаштування конфігурації esbuild в Angular CLI.

### Крок 2: Налаштування вашого проєкту

Створіть файл конфігурації для налаштування мов вашого додатка:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Інші ваші мови
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, редиректи middleware, назви файлів cookie, розташування і розширення файлів ваших декларацій контенту, вимкнути логи Intlayer в консолі та багато іншого. Повний список доступних параметрів дивіться у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Angular

Щоб інтегрувати Intlayer з Angular CLI, вам потрібно використовувати кастомний збирач. У цьому посібнику передбачається, що ви використовуєте Vite/esbuild (за замовчуванням для проєктів Angular 21).

Спершу змініть ваш `angular.json` для використання користувацького esbuild. Оновіть конфігурації `build` та `serve`:

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

> Не забудьте замінити `your-app-name` на фактичну назву вашого проєкту в `angular.json`.

Далі створіть файл `esbuild.plugins.ts` у кореневому каталозі вашого проєкту:

```typescript fileName="esbuild.plugins.ts"
import { intlayerEsbuildPlugin } from "angular-intlayer/esbuild";

export default [intlayerEsbuildPlugin()];
```

> Функція `intlayerEsbuildPlugin` конфігурує esbuild з Intlayer. Вона впроваджує плагін для обробки файлів декларацій контенту та встановлює налаштування для оптимальної продуктивності.

### Крок 4: Оголосіть свій контент

Створюйте та керуйте деклараціями вашого контенту для зберігання перекладів:

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

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку за умови, що вони знаходяться у каталозі `contentDir` (за замовчуванням `./src`). А також вони повинні відповідати розширенню файлів для декларацій контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Докладніше див. у [документації з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

Щоб використовувати функції інтернаціоналізації Intlayer у всьому вашому додатку Angular, вам необхідно додати Intlayer до конфігурації додатка.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIntlayer } from "angular-intlayer";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIntlayer(), // Додайте провайдер Intlayer сюди
  ],
};
```

Після цього ви можете використовувати функцію `useIntlayer` всередині будь-якого компонента.

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

А у вашому шаблоні:

```html fileName="src/app/app.component.html"
<div class="content">
  <h1>{{ content().title }}</h1>
  <p>{{ content().congratulations }}</p>
</div>
```

Контент Intlayer повертається як `Signal`, тому ви отримуєте доступ до значень, викликаючи сигнал: `content().title`.

### (Додатково) Крок 6: Зміна мови контенту

Щоб змінити мову контенту, ви можете використовувати функцію `setLocale`, що надається функцією `useLocale`. Це дозволяє встановлювати локаль додатка та відповідним чином оновлювати контент.

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
})
export class LocaleSwitcherComponent {
  localeCtx = useLocale();

  locale = this.localeCtx.locale;
  availableLocales = this.localeCtx.availableLocales;
  setLocale = this.localeCtx.setLocale;
}
```

Потім використовуйте цей компонент у `app.component.ts`:

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

### Налаштування TypeScript

Intlayer використовує розширення модулів (Module Augmentation) для використання переваг TypeScript та створення міцнішої кодової бази.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript містить автозгенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші наявні конфігурації TypeScript
  "include": [
    // ... Ваші наявні конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автозгенеровані типи
  ],
}
```

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить вам не комітити їх у ваш Git-репозиторій.

Для цього ви можете додати такі інструкції у файл `.gitignore`:

```bash
# Ігнорувати файли, створені Intlayer
.intlayer
```

### Розширення для VS Code

Щоб покращити процес розробки з Intlayer, ви можете встановити офіційне **Розширення Intlayer для VS Code**.

[Встановіть з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії** для зручного створення та оновлення перекладів.

Докладніше про те, як використовувати розширення, див. у [документації до розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Іти далі

Щоб піти далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або екстерналізувати свій контент за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---

---
createdAt: 2025-04-18
updatedAt: 2026-10-08
priority: 9
title: "Angular 19 i18n - Повний посібник з перекладу вашого застосунку"
description: "Налаштування Intlayer в Angular 19 з Angular CLI: типізований контент поруч із компонентами, зміна локалі в рантаймі та локалізована маршрутизація."
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
  - 19
applicationTemplate: https://github.com/aymericzip/intlayer-angular-19-template
applicationShowcase: https://intlayer-angular-19-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Додати команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перекладіть свій Angular 19 (Webpack) веб-сайт за допомогою Intlayer

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `ngx-translate` або `angular-l10n`, Intlayer це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>
<Accordion header="Повне кутове покриття">

Intlayer оптимізовано для ідеальної роботи з Angular, пропонуючи **вибір вмісту на рівні компонентів**, **ліниво завантажені переклади** та всі функції, необхідні для масштабування інтернаціоналізації (i18n).

</Accordion>
<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>
<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>
<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** і **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)

</Accordion>
<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації вилучення контенту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

- [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

</Accordion>
<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>
<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)** і **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

- [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Покроковий посібник із налаштування Intlayer у додатку Angular

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-19-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-angular-19-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-angular-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Дивіться [Шаблон додатка](https://github.com/aymericzip/intlayer-angular-19-template) на GitHub.

<Steps>
<Step number={1} title="Встановлення залежностей">

Встановіть необхідні пакети за допомогою npm:

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

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer angular-intlayer
npm install @angular-builders/custom-webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer
pnpm add @angular-builders/custom-webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer
yarn add @angular-builders/custom-webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer angular-intlayer
bun add @angular-builders/custom-webpack --dev
```

- **intlayer**

  Основний пакет, що надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **angular-intlayer**
  Пакет, що інтегрує Intlayer з додатком Angular. Він надає провайдери контексту та хуки для інтернаціоналізації Angular.

- **@angular-builders/custom-webpack**
  Необхідний для налаштування конфігурації Webpack в Angular CLI.

</Step>
<Step number={2} title="Конфігурація вашого проекту">

### Архітектура

У цій архітектурі `angular-intlayer` надає `provideIntlayer()`, зареєстрований у `src/app/app.config.ts`, щоб кожен компонент міг читати свій вміст через сигнал `useIntlayer`. Angular CLI перемикається на кастомний збирач Webpack, а `webpack.config.ts` об'єднує плагін Intlayer зі збіркою для відстеження та перебудови оголошень вмісту. Оголошення вмісту розміщуються поруч із компонентами в `src/app/`.

```bash
.
├── src
│   ├── app
│   │   ├── app.component.html        # Root template reading the content signal
│   │   ├── app.component.ts          # Root component using useIntlayer
│   │   ├── app.config.ts             # Application config with provideIntlayer()
│   │   ├── app.content.ts            # App content declaration
│   │   └── locale-switcher.component.ts
│   └── main.ts
├── angular.json                      # Custom Webpack builder for build and serve
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── webpack.config.ts                 # mergeConfig() from angular-intlayer/webpack
```

### Конфігурація

Створіть файл конфігурації для налаштування мов вашого додатка:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логування Intlayer у консолі та інше. Для повного переліку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

</Step>
<Step number={3} title="Інтеграція Intlayer у вашу конфігурацію Angular">

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
        "serve": {
          "builder": "@angular-builders/custom-webpack:dev-server",
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

> Функція `mergeConfig` налаштовує Webpack за допомогою Intlayer. Вона впроваджує `IntlayerPlugin` (для обробки файлів декларації вмісту) та налаштовує псевдоніми для оптимальної продуктивності.

</Step>
<Step number={4} title="Декларування вмісту">

Створюйте та керуйте своїми деклараціями вмісту для зберігання перекладів:

```tsx fileName="src/app/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> Ваші декларації вмісту можуть бути визначені в будь-якому місці вашого додатка, якщо вони включені до каталогу `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання додаткової інформації дивіться [документацію з декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

- [документацію з декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)

</Step>
<Step number={5} title="Використання Intlayer у вашому коді">

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

</Step>
<Step number={6} title="Зміна мови вашого вмісту" isOptional={true}>

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

</Step>

</Steps>

### Конфігурація TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб отримати переваги TypeScript і зробити вашу кодову базу міцнішою.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

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

```bash
#  Ігнорувати файли, створені Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

- [Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення забезпечує:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для отримання додаткової інформації про те, як користуватися розширенням, дивіться [документацію розширення Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md).

- [документацію розширення Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)

### Додаткові можливості

Щоб йти далі, ви можете впровадити [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій вміст у зовнішню систему за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

- [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

## Поширені запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Angular 19?">

- **Вбудований `@angular/localize`**: офіційне рішення Angular, що компілює окремий бандл під кожну мову.
- **`ngx-translate`** та **`Transloco`**: завантаження JSON під час виконання за допомогою пайпів або директив.
- **`Intlayer`**: пряма інтеграція з Angular Signals, компіляція під час збирання, сувора типізація TypeScript, AI переклад та візуальний редактор.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

- [Angular 22 i18n - Повний посібник з перекладу вашого застосунку](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md)
- [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md)

</Question>
<Question title="Скільки i18n додає до розміру бандла Angular?">

Значно менше, ніж рішення на основі просторів імен, оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Компілятор часу збирання замінює виклики `useIntlayer` точними записами словника, а [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за локалями, зменшуючи бандл до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

- [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md)
- [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)
- [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md)

</Question>
<Question title="Чи можу я мігрувати з ngx-translate, Transloco або @angular/localize без переписування шаблонів?">

Більшою мірою так. Скористайтеся [оглядом адаптерів сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md). Ви також можете зберігати файли JSON через [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).

- [Міграція з NGX-Translate на Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate.md)
- [Посібник з міграції з Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/transloco.md)
- [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)

</Question>
<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

- [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)
- [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md)
- [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md)

</Question>
<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

- [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md)

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання та генерує словники під час кожної зміни.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)

</Question>
<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>
<Question title="Чи потрібна окрема збірка для кожної мови?">

Ні. Це модель `@angular/localize`, де кожна локаль компілюється в окремий бандл і розгортається окремо. З Intlayer одна збірка обслуговує всі оголошені локалі, а активна мова визначається під час виконання з URL, cookie або заголовка `Accept-Language`.

</Question>
<Question title="Чи підтримує Intlayer сигнали Angular (signals) та standalone компоненти?">

Так. Вміст надається через сигнали, тому шаблон повторно рендериться при зміні локалі без перезавантаження сторінки, а провайдер реєструється як будь-який інший standalone провайдер.

</Question>
<Question title="Як змінити мову під час виконання?">

Це описано в кроці 6. `useLocale` надає активну локаль, оголошені локалі та сеттер, який зберігає вибір, а `getLocalizedUrl` переписує поточний шлях, щоб користувач залишався на тому ж маршруті після перемикання.

</Question>
<Question title="Чи працює це з серверним рендерингом Angular Universal?">

Так. Локаль визначається на сервері з URL або заголовків запиту та передається провайдеру, тому HTML, відрендерений на сервері, вже має правильну мову, а клієнт виконує гідратацію без перемикання.

</Question>
<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Команда заповнює відсутні переклади за допомогою обраної вами LLM, використовуючи ваш власний провайдер і ключ API, а `--git-diff` обмежує запуск вмістом, зміненим у гілці. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

- [команда fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md)
- [інтеграція CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md)

</Question>
<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [вміст залежно від статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) та [форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) для чисел, дат і валют.

- [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md)
- [вміст залежно від статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md)
- [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md)
- [форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md)

</Question>
<Question title="Як виявити відсутні переклади перед релізом?">

Запустіть `npx intlayer test` у CI. Команда перериває збірку, коли в оголошеній локалі бракує вмісту. [Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md) повідомляє про ті самі помилки під час набору. Див. [тестування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).

- [Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- [тестування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md)

</Question>
<Question title="Як перекладачі можуть редагувати вміст без втручання в код?">

За допомогою [візуального редактора](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який працює на вашій власній інфраструктурі та дозволяє будь-кому редагувати текст безпосередньо в запущеному додатку, або [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка виносить вміст назовні, щоб його можна було змінювати без розгортання.

- [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

</Question>
<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, за ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це необов'язковий платний сервіс, який також можна [розгорнути самостійно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

- [самостійне розгортання](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)

</Question>

</FAQ>

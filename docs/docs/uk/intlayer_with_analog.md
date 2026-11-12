---
createdAt: 2025-04-18
updatedAt: 2026-10-08
priority: 9
title: "Analog i18n - Повний посібник з перекладу вашого застосунку"
description: "Налаштування Intlayer в Analog: типізований контент за компонентами, визначення та зміна локалі, локалізовані маршрути для Angular з Vite."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Analog
  - Angular
  - JavaScript
slugs:
  - doc
  - environment
  - analog
applicationTemplate: https://github.com/aymericzip/intlayer-analog-template
applicationShowcase: https://intlayer-analog-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 8.0.4
    date: 2026-01-26
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перекладіть свій додаток Analog (Angular) за допомогою Intlayer

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-analog-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-analog-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-analog-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `ngx-translate` або `angular-l10n`, Intlayer це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>
<Accordion header="Повне аналогове покриття">

Intlayer оптимізовано для ідеальної роботи з Analog, пропонуючи **багатомовну маршрутизацію**, **підтримку SSR** і всі функції, необхідні для інтернаціоналізації масштабування (i18n).

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

## Покроковий посібник з налаштування Intlayer у додатку Analog

Дивіться [Шаблон додатка](https://github.com/aymericzip/intlayer-analog-template) на GitHub.

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
npm install intlayer angular-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспайляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **angular-intlayer**
  Пакет, який інтегрує Intlayer з додатком Angular. Він надає провайдери контексту та хуки для інтернаціоналізації Angular.

- **vite-intlayer**
  Пакет, який інтегрує Intlayer з Vite. Він надає плагін для обробки файлів декларації вмісту та налаштовує аліаси для оптимальної продуктивності.

</Step>
<Step number={2} title="Конфігурація вашого проекту">

### Архітектура

У цій архітектурі `angular-intlayer` надає `provideIntlayer()`, зареєстрований у `src/app/app.config.ts`, щоб кожен компонент і файлова сторінка могли читати свій вміст через сигнал `useIntlayer`. Analog побудовано на базі Vite, тому плагін `intlayer()` з `vite-intlayer` додається поруч із `analog()` у `vite.config.ts` для відстеження та перебудови ваших оголошень вмісту, а також для роботи проксі локалі. Оголошення вмісту розміщуються поруч із компонентами та сторінками в `src/app/`.

```bash
.
├── src
│   ├── app
│   │   ├── pages
│   │   │   └── index.page.ts         # File-based route using useIntlayer
│   │   ├── app.config.ts             # Application config with provideIntlayer()
│   │   ├── app.content.ts            # App content declaration
│   │   └── locale-switcher.component.ts
│   └── main.ts
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts                    # analog() and intlayer() Vite plugins
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
      // Ваші інші мови
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через middleware, назви кукі, розташування та розширення ваших декларацій вмісту, вимкнути логи Intlayer у консолі та багато іншого. Повний список доступних параметрів дивіться у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

</Step>
<Step number={3} title="Інтеграція Intlayer у вашу конфігурацію Vite">

Щоб інтегрувати Intlayer з Analog, вам потрібно використовувати плагін `vite-intlayer`.

Змініть ваш файл `vite.config.ts`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import analog from "@analogjs/platform";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    analog(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
}));
```

> Плагін `intlayer()` налаштовує Vite для роботи з Intlayer. Він обробляє файли декларації вмісту та налаштовує аліаси для оптимальної продуктивності.

</Step>
<Step number={4} title="Декларування вашого вмісту">

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
  },
} satisfies Dictionary;

export default appContent;
```

> Ваші декларації вмісту можуть бути визначені будь-де у вашому додатку, якщо вони включені до директорії `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлів декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Докладнішу інформацію дивіться у [документації з декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

- [документації з декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)

</Step>
<Step number={5} title="Використання Intlayer у вашому коді">

Щоб використовувати функції інтернаціоналізації Intlayer у вашому додатку Analog, вам потрібно надати Intlayer у конфігурації вашого додатка.

```typescript fileName="src/app/app.config.ts"
import { ApplicationConfig } from "@angular/core";
import { provideIntlayer } from "angular-intlayer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideIntlayer(), // Додайте провайдер Intlayer сюди
  ],
};
```

Потім ви можете використовувати функцію `useIntlayer` у будь-якому компоненті.

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-home",
  standalone: true,
  template: `
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

Вміст Intlayer повертається як `Signal`, тому ви отримуєте доступ до значень, викликаючи сигнал: `content().title`.

</Step>
<Step number={6} title="Зміна мови вашого вмісту" isOptional={true}>

Щоб змінити мову вашого вмісту, ви можете використовувати функцію `setLocale`, яку надає функція `useLocale`. Це дозволяє вам встановлювати локаль додатка та відповідним чином оновлювати вміст.

Створіть компонент для перемикання мов:

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

Потім використовуйте цей компонент на ваших сторінках:

```typescript fileName="src/app/pages/index.page.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";
import { LocaleSwitcherComponent } from "../locale-switcher.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [LocaleSwitcherComponent],
  template: `
    <app-locale-switcher></app-locale-switcher>
    <div class="content">
      <h1>{{ content().title }}</h1>
      <p>{{ content().congratulations }}</p>
    </div>
  `,
})
export default class HomeComponent {
  content = useIntlayer("app");
}
```

</Step>

</Steps>

### Налаштування TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб скористатися перевагами TypeScript і зробити вашу кодову базу надійнішою.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включіть автогенеровані типи
  ],
}
```

### Конфігурація Git

Рекомендується ігнорувати файли, створені Intlayer. Це дозволяє уникнути їхнього коміту у ваш репозиторій Git.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```bash
#  Ігнорувати файли, створені Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

- [Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Докладнішу інформацію про використання розширення дивіться в [документації розширення Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md).

- [документації розширення Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)

### Додаткові можливості

Щоб розширити функціональність, ви можете імплементувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або керувати вашим контентом за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

- [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)

## Поширені запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Analog?">

Analog - це мета-фреймворк для Angular, побудований на Vite, тому він успадковує можливості Angular і додає можливості Vite:

- **`ngx-translate`** / **`Transloco`**: бібліотеки для клієнта, що вимагають ручного налаштування для Analog SSR.
- **`Intlayer`**: повна інтеграція з Vite, SSR та файловою маршрутизацією, оптимізація під час збирання, переклад за допомогою AI.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

- [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md)
- [Angular 22 i18n - Повний посібник з перекладу вашого застосунку](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md)

</Question>
<Question title="Скільки i18n додає до розміру бандла Analog?">

Значно менше, ніж рішення на основі просторів імен, оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Компілятор часу збирання замінює виклики `useIntlayer` точними записами словника, а [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за локалями, зменшуючи бандл до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

- [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md)
- [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)
- [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md)

</Question>
<Question title="Чи можу я мігрувати з `ngx-translate`, `Transloco` або `@angular/localize` без переписування шаблонів?">

Здебільшого так. Скористайтеся [посібником з міграції з ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate.md) або [посібником з міграції з Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/transloco.md), щоб перенести вміст. Також можна мігрувати поступово: [плагін синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші наявні JSON-каталоги як джерело істини та генерує з них словники Intlayer, тож обидва шари залишаються синхронізованими, поки ви переносите шаблони один за одним.

- [посібник з міграції з ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/ngx-translate.md)
- [посібник з міграції з Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/transloco.md)
- [плагін синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)

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
<Question title="Чи працює це з серверним рендерингом Analog та Vite?">

Так. Vite-плагін `intlayer()` компілює ваш вміст і відстежує його під час розробки, а локаль визначається на сервері, тож перша HTML-відповідь уже має правильну мову. Попередньо відрендерені (prerendered) маршрути отримують свій вміст під час збірки.

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

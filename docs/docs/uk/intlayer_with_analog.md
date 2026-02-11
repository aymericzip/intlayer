---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Analog i18n - Як перекласти ваш додаток Analog – посібник 2026
description: Дізнайтеся, як зробити свій додаток Analog багатомовним. Дотримуйтесь документації для інтернаціоналізації (i18n) та перекладу.
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
applicationTemplate: https://github.com/aymericzip/intlayer/tree/main/examples/analog-app-template
history:
  - version: 8.0.4
    date: 2026-01-26
    changes: Ініціалізація історії
---

# Перекладіть свій додаток Analog (Angular) за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна бібліотека інтернаціоналізації (i18n) з відкритим вихідним кодом, розроблена для спрощення багатомовної підтримки в сучасних веб-додатках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та вміст.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автодоповнення та виявлення помилок.
- **Скористатися розширеними функціями**, такими як динамічне визначення та перемикання мови.

---

## Покроковий посібник з налаштування Intlayer у додатку Analog

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer/tree/main/examples/vite-analog-app?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Дивіться [Шаблон додатка](https://github.com/aymericzip/intlayer/tree/main/examples/analog-app-template) на GitHub.

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer angular-intlayer vite-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer angular-intlayer vite-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer angular-intlayer vite-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer angular-intlayer vite-intlayer
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспайляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **angular-intlayer**
  Пакет, який інтегрує Intlayer з додатком Angular. Він надає провайдери контексту та хуки для інтернаціоналізації Angular.

- **vite-intlayer**
  Пакет, який інтегрує Intlayer з Vite. Він надає плагін для обробки файлів декларації вмісту та налаштовує аліаси для оптимальної продуктивності.

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
      // Ваші інші мови
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
      // Ваші інші мови
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
      // Ваші інші мови
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через middleware, назви кукі, розташування та розширення ваших декларацій вмісту, вимкнути логи Intlayer у консолі та багато іншого. Повний список доступних параметрів дивіться у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Vite

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
    intlayer(), // Додайте плагін Intlayer
  ],
}));
```

> Плагін `intlayer()` налаштовує Vite для роботи з Intlayer. Він обробляє файли декларації вмісту та налаштовує аліаси для оптимальної продуктивності.

### Крок 4: Декларування вашого вмісту

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
  },
} satisfies Dictionary;

export default appContent;
```

> Ваші декларації вмісту можуть бути визначені будь-де у вашому додатку, якщо вони включені до директорії `contentDir` (за замовчуванням `./src`) і відповідають розширенню файлів декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Докладнішу інформацію дивіться у [документації з декларації вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

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

### (Опціонально) Крок 6: Зміна мови вашого вмісту

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

### Налаштування TypeScript

Intlayer використовує розширення модулів (module augmentation), щоб скористатися перевагами TypeScript і зробити вашу кодову базу надійнішою.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

```plaintext
# Ігнорувати файли, створені Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Докладнішу інформацію про використання розширення дивіться в [документації розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

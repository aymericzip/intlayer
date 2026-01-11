---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Як перекласти ваш бекенд на Nest — посібник з i18n 2026
description: Дізнайтеся, як зробити ваш бекенд на NestJS багатомовним. Слідуйте документації для інтернаціоналізації (i18n) та перекладу.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - NestJS
  - JavaScript
  - Бекенд
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.8.0
    date: 2025-09-09
    changes: Початкова документація
---

# Перекладіть ваш бекенд на Nest за допомогою Intlayer | Інтернаціоналізація (i18n)

`express-intlayer` — це потужний middleware для інтернаціоналізації (i18n) для додатків на Express, призначений зробити ваші бекенд-сервіси доступними у всьому світі, надаючи локалізовані відповіді відповідно до уподобань клієнта. Оскільки NestJS побудований поверх Express, ви можете безшовно інтегрувати `express-intlayer` у свої додатки NestJS для ефективної роботи з багатомовним вмістом.

Типові випадки використання

- **Відображення помилок бекенду мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує фрустрацію. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися у front-end компонентах, таких як toasts або modals.

- **Отримання багатомовного контенту**: Для застосунків, які дістають контент із бази даних, інтернаціоналізація гарантує можливість надавати цей контент кількома мовами. Це критично важливо для платформ, таких як e-commerce-сайти або системи керування контентом (CMS), яким потрібно відображати описи продуктів, статті та інший контент мовою, яку віддає перевагу користувач.

- **Надсилання багатомовних електронних листів**: Чи то транзакційні листи, маркетингові кампанії або сповіщення — надсилання листів мовою отримувача може значно підвищити залученість та ефективність.

- **Багатомовні push-повідомлення**: Для мобільних застосунків відправлення push-повідомлень мовою, яку віддає перевагу користувач, може підвищити взаємодію та утримання. Такий персональний підхід робить повідомлення більш релевантними та такими, що спонукають до дії.

- **Інші комунікації**: Будь-яка форма комунікації з бекенду, наприклад SMS-повідомлення, системні оповіщення або оновлення інтерфейсу користувача, виграє від того, що надсилається мовою користувача, що забезпечує зрозумілість і покращує загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш застосунок не лише поважає культурні відмінності, а й краще відповідає потребам глобального ринку, що робить це ключовим кроком для масштабування ваших сервісів у світі.

## Початок роботи

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nestjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Перегляньте [шаблон застосунку](https://github.com/aymericzip/intlayer-nestjs-template) на GitHub.

### Створіть новий проект NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Встановлення

Щоб почати використовувати `express-intlayer`, встановіть пакет за допомогою npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer express-intlayer
bunx intlayer init
```

### Налаштуйте tsconfig.json

Щоб використовувати Intlayer з TypeScript, переконайтеся, що ваш `tsconfig.json` налаштовано для підтримки ES-модулів. Це можна зробити, встановивши параметри `module` та `moduleResolution` у `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... інші параметри
  },
}
```

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши `intlayer.config.ts` у корені вашого проєкту:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Оголосіть свій контент

Створюйте та керуйте деклараціями контенту для збереження перекладів:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      uk: "Привіт, світ!",
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Оголошення вашого вмісту можна розміщувати будь-де у вашому додатку, якщо вони включені в директорію `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для отримання додаткових відомостей зверніться до [документації щодо оголошень контенту](/doc/concept/content).

### Налаштування middleware для Express

Інтегруйте middleware `express-intlayer` у ваш додаток NestJS для обробки інтернаціоналізації:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Застосувати до всіх маршрутів
  }
}
```

### Використання перекладів у сервісах або контролерах

Тепер ви можете використовувати функцію `getIntlayer` для доступу до перекладів у ваших сервісах або контролерах:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### Сумісність

`express-intlayer` повністю сумісний з:

- [`react-intlayer`](/doc/packages/react-intlayer) для React-додатків
- [`next-intlayer`](/doc/packages/next-intlayer) для Next.js-додатків
- [`vite-intlayer`](/doc/packages/vite-intlayer) для Vite-додатків

Воно також безшовно працює з будь-якими рішеннями для інтернаціоналізації в різних середовищах, включно з браузерами та API-запитами. Ви можете налаштувати middleware для визначення локалі через заголовки (headers) або cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Other configuration options
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

За замовчуванням `express-intlayer` буде інтерпретувати заголовок `Accept-Language`, щоб визначити переважну мову клієнта.

> Для детальнішої інформації щодо конфігурації та просунутих тем відвідайте нашу [документацію](/doc/concept/configuration).

### Налаштування TypeScript

`express-intlayer` використовує потужні можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, зменшуючи ризик відсутніх перекладів і покращуючи підтримуваність.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що автозгенеровані типи (за замовчуванням у ./types/intlayer.d.ts) включені у ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  include: [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Розширення для VS Code

Щоб покращити робочий досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Щоб дізнатися більше про використання розширення, зверніться до [документації розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх додавання до вашого репозиторію Git.

Для цього ви можете додати такі інструкції у файл `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

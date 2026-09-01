---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "NestJS i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку NestJS. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Початкова документація"
author: aymericzip
---

# Перекладіть ваш бекенд на Nest за допомогою Intlayer | Інтернаціоналізація (i18n)

`express-intlayer`, це потужний middleware для інтернаціоналізації (i18n) для додатків на Express, призначений зробити ваші бекенд-сервіси доступними у всьому світі, надаючи локалізовані відповіді відповідно до уподобань клієнта. Оскільки NestJS побудований поверх Express, ви можете безшовно інтегрувати `express-intlayer` у свої додатки NestJS для ефективної роботи з багатомовним вмістом.

Типові випадки використання

- **Відображення помилок бекенду мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує фрустрацію. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися у front-end компонентах, таких як toasts або modals.

- **Отримання багатомовного контенту**: Для застосунків, які дістають контент із бази даних, інтернаціоналізація гарантує можливість надавати цей контент кількома мовами. Це критично важливо для платформ, таких як e-commerce-сайти або системи керування контентом (CMS), яким потрібно відображати описи продуктів, статті та інший контент мовою, яку віддає перевагу користувач.

- **Надсилання багатомовних електронних листів**: Чи то транзакційні листи, маркетингові кампанії або сповіщення, надсилання листів мовою отримувача може значно підвищити залученість та ефективність.

- **Багатомовні push-повідомлення**: Для мобільних застосунків відправлення push-повідомлень мовою, яку віддає перевагу користувач, може підвищити взаємодію та утримання. Такий персональний підхід робить повідомлення більш релевантними та такими, що спонукають до дії.

- **Інші комунікації**: Будь-яка форма комунікації з бекенду, наприклад SMS-повідомлення, системні оповіщення або оновлення інтерфейсу користувача, виграє від того, що надсилається мовою користувача, що забезпечує зрозумілість і покращує загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш застосунок не лише поважає культурні відмінності, а й краще відповідає потребам глобального ринку, що робить це ключовим кроком для масштабування ваших сервісів у світі.

## Початок роботи

### Створіть новий проект NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Встановлення

Щоб почати використовувати `express-intlayer`, встановіть пакет за допомогою npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Оголосіть свій контент

Створюйте та керуйте деклараціями контенту для збереження перекладів:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> Оголошення вашого вмісту можна розміщувати будь-де у вашому додатку, якщо вони включені в директорію `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків NestJS?">

- **`nestjs-i18n`**: модуль для NestJS, що використовує JSON та YAML.
- **`Intlayer`**: повна сумісність із Dependency Injection та інтерцепторами, типізація під час збирання, переклад AI та спільні словники з клієнтом.

Головна причина інтернаціоналізації бекенду полягає в тому, що значна частина тексту, який бачить користувач, ніколи не проходить через фронтенд: повідомлення про помилки API, транзакційні електронні листи, push-сповіщення, SMS та експорт у PDF. Вони потребують мови одержувача, яка визначається для кожного запиту, а не для всієї сесії.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру серверного бандла NestJS?">

Значно менше, ніж традиційні каталоги JSON. Компілятор Intlayer оптимізує словники під час збирання і не парсить їх заново під час кожного запиту, зменшуючи використання пам'яті та час холодного старту. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи можу я мігрувати з nestjs-i18n без переписування обробників та сервісів?">

Більшою мірою так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає існуючі файли, генеруючи з них словники Intlayer.

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання та генерує словники під час кожної зміни.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа до файлу контенту, вилучення рядків та запуск build, fill, test, push і pull із палітри команд.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: перехід до визначення, перегляд перекладеного значення під час наведення та автодоповнення ключів у будь-якому редакторі з підтримкою LSP. Також обробляє виклики `i18next`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Як визначається мова клієнта у вхідних запитах?">

Інтерцептор або middleware NestJS обробляє заголовки та cookie, прив'язуючи локаль до контексту запиту.

</Question>

<Question title="Чи можуть одні й ті самі оголошення контенту обслуговувати відповіді API та веб-інтерфейс?">

Так, у монорепозиторіях або спільних пакетах це є ключовою перевагою. Оголошений словник можна імпортувати як на бекенді (листи, помилки, відповіді API), так і на фронтенді (React, Vue, Svelte тощо), зберігаючи єдине джерело істини для всіх текстів.

</Question>

<Question title="Чи сповільнює Intlayer обробку запитів?">

Ні. Визначення локалі відбувається у швидкому middleware (читаються cookie, параметри або заголовок Accept-Language). Словники скомпільовані під час збирання та знаходяться в пам'яті, тому під час запиту немає читання з диска чи парсингу рядків.

</Question>

<Question title="Як локалізувати повідомлення про помилки, електронні листи та push-сповіщення?">

Викликаючи функцію `getIntlayer` або `t()` з урахуванням локалі запиту. Якщо мова користувача зберігається у базі даних, у фонових завданнях цільову мову можна передати у функцію явно.

</Question>

<Question title="Як Intlayer працює з Dependency Injection (DI) у NestJS?">

Сервіси та інтерцептори Intlayer можна інжектувати в IoC-контейнер NestJS, що забезпечує легкий доступ до активної мови в контролерах та провайдерах.

</Question>

<Question title="Чи можу я локалізувати повідомлення валідації NestJS DTO?">

Так. У кастомних декораторах `class-validator` або фільтрах винятків ви можете викликати `t()` або `getIntlayer()`.

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта заповнює відсутні переклади через обрану LLM з вашим провайдером та ключем API, а прапорець `--git-diff` обмежує обробку зміненими файлами. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md) та [форматування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md).

</Question>

<Question title="Як нетехнічні члени команди можуть редагувати шаблони листів та повідомлення про помилки без доступу до коду?">

Є два шляхи: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст від кодової бази і дозволяє редагувати тексти через веб-інтерфейс, або [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який записує зміни безпосередньо у файли коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>

---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "Express i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Express. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Express
  - JavaScript
  - Бекенд
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перекладіть свій бекенд на Express за допомогою Intlayer | Інтернаціоналізація (i18n)

`express-intlayer`, потужний middleware для інтернаціоналізації (i18n) для додатків Express, призначений зробити ваші бекенд-сервіси доступними глобально, надаючи локалізовані відповіді відповідно до переваг клієнта.

### Практичні сценарії використання

- **Відображення помилок бекенду мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує фрустрацію. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися у фронтенд-компонентах, таких як toasts або модальні вікна.

- **Отримання багатомовного контенту**: Для додатків, що отримують контент із бази даних, інтернаціоналізація забезпечує можливість надавати цей контент кількома мовами. Це критично важливо для платформ, таких як e-commerce сайти або системи управління контентом (CMS), які повинні відображати описи товарів, статті та інший контент мовою, яку віддає перевагу користувач.

- **Надсилання багатомовних електронних листів**: Незалежно від того, чи це транзакційні листи, маркетингові кампанії або сповіщення, надсилання листів мовою отримувача може суттєво підвищити залучення та ефективність.

- **Багатомовні push-повідомлення**: Для мобільних додатків надсилання push-повідомлень мовою, якої надає перевагу користувач, може підвищити взаємодію та утримання. Такий персоналізований підхід робить повідомлення більш релевантними та спонукає до дії.

- **Інші комунікації**: Будь-які форми комунікації з бекенду, такі як SMS-повідомлення, системні сповіщення або оновлення інтерфейсу користувача, виграють від локалізації мовою користувача, що забезпечує зрозумілість і покращує загальний досвід.

Інтернаціоналізація бекенду дозволяє вашому застосунку не лише поважати культурні відмінності, але й краще відповідати вимогам глобального ринку, що робить її ключовим кроком для масштабування ваших сервісів у всьому світі.

## Початок роботи

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-express-template) на GitHub.

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

### Налаштування

Налаштуйте параметри internationalization, створивши `intlayer.config.ts` у корені проєкту:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Оголосіть свій контент

Створюйте й керуйте деклараціями контенту для зберігання перекладів:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      uk: "Приклад поверненого вмісту українською",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "uk": "Приклад поверненого вмісту українською",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваші декларації вмісту можуть бути визначені будь-де у вашому додатку, доки вони включені до директорії `contentDir` (за замовчуванням `./src`). І відповідати розширенню файлу декларації вмісту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для детальнішої інформації зверніться до [документації щодо декларацій вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Налаштування Express-застосунку

Налаштуйте ваш Express-застосунок для використання `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// Підключення обробника інтернаціоналізації запитів
app.use(intlayer());

// Маршрути
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      uk: "Приклад поверненого вмісту українською",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Запуск сервера
app.listen(3000, () => console.log(`Сервер запущено на порту 3000`));
```

### Сумісність

`express-intlayer` повністю сумісний з:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/index.md) для додатків React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md) для додатків Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md) для додатків Vite

Воно також безшовно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включно з браузерами та API-запитами. Ви можете налаштувати middleware для визначення локалі через headers або cookies:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші параметри конфігурації
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

За замовчуванням `express-intlayer` буде інтерпретувати заголовок `Accept-Language` для визначення переважної мови клієнта.

> Для отримання додаткової інформації про конфігурацію та розширені теми перегляньте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Налаштування TypeScript

`express-intlayer` використовує потужні можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, зменшуючи ризик відсутніх перекладів та покращуючи підтримуваність.

![Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що автогенеровані типи (за замовчуванням у ./types/intlayer.d.ts) включені у ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Розширення для VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з Marketplace для VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного контенту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення див. [документацію розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх додавання до вашого Git-репозиторію.

Для цього ви можете додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Express?">

Історичним варіантом є `i18next` з `i18next-http-middleware`, який завантажує каталоги JSON для просторів імен і зберігає локаль у запиті. Альтернативою є `Intlayer` через `express-intlayer`, який оголошує вміст у типізованих файлах, спільних із вашим фронтендом, визначає локаль для кожного запиту та додає переклад за допомогою AI і CMS.

Причина інтернаціоналізації бекенду полягає в тому, що значна частина тексту, який бачить користувач, ніколи не проходить через фронтенд: повідомлення про помилки API, транзакційні електронні листи, push-сповіщення, SMS та експорт у PDF. Вони потребують мови одержувача, яка визначається для кожного запиту, а не для кожної сесії.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Question>

<Question title="Скільки i18n додає до розміру серверного бандла Express?">

Значно менше, ніж традиційні каталоги JSON. Компілятор Intlayer оптимізує словники під час збирання і не парсить їх заново під час кожного запиту, зменшуючи використання пам'яті та час холодного старту. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

</Question>

<Question title="Чи можу я мігрувати з i18next або інших бібліотек для бекенду без переписування обробників?">

Так. Можна мігрувати поступово або використовувати адаптери сумісності для збереження існуючих API.

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

Middleware `app.use(intlayer())` послідовно аналізує префікс URL, файли cookie, заголовок `Accept-Language` та мову за замовчуванням. Визначена локаль записується в `req.locale`.

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

<Question title="Чи можу я використовувати власний механізм визначення мови?">

Так. Ви можете створити власний middleware, який зчитує мову з даних сесії чи профілю користувача та призначає її у `req.locale`.

</Question>

<Question title="Як використовувати локалізовані префікси URL у маршрутах Express?">

Через налаштування маршрутизації Intlayer або додавши сегмент `/:locale/` до ваших маршрутів. `validatePrefix` перевіряє валідність мов.

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

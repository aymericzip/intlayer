---
createdAt: 2025-08-23
updatedAt: 2026-10-08
priority: 9
title: "Express i18n - Повний посібник з перекладу вашого застосунку"
description: "Налаштування Intlayer в Express: визначення локалі для кожного запиту через middleware, переклад відповідей API й помилок, наскрізна типізація."
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

# Перекладіть свій бекенд на Express за допомогою Intlayer

`express-intlayer`, потужний middleware для інтернаціоналізації (i18n) для додатків Express, призначений зробити ваші бекенд-сервіси доступними глобально, надаючи локалізовані відповіді відповідно до переваг клієнта.

## Практичні сценарії використання

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

- [документації щодо декларацій вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)

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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/exports.md)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/exports.md)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/exports.md)

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

- [Конфігурація Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

### Налаштування TypeScript

`express-intlayer` використовує потужні можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, зменшуючи ризик відсутніх перекладів та покращуючи підтримуваність.

![Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

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

- [Встановити з Marketplace для VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного контенту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення див. [документацію розширення Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md).

- [документацію розширення Intlayer для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх додавання до вашого Git-репозиторію.

Для цього ви можете додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

## Поширені запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Express?">

Історичним варіантом є `i18next` з `i18next-http-middleware`, який завантажує каталоги JSON для просторів імен і зберігає локаль у запиті. Альтернативою є `Intlayer` через `express-intlayer`, який оголошує вміст у типізованих файлах, спільних із вашим фронтендом, визначає локаль для кожного запиту та додає переклад за допомогою AI і CMS.

Причина інтернаціоналізації бекенду полягає в тому, що значна частина тексту, який бачить користувач, ніколи не проходить через фронтенд: повідомлення про помилки API, транзакційні електронні листи, push-сповіщення, SMS та експорт у PDF. Вони потребують мови одержувача, яка визначається для кожного запиту, а не для кожної сесії.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

- [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md)

</Question>
<Question title="Скільки i18n додає до розміру серверного бандла Express?">

Дуже мало. Словники компілюються заздалегідь, і до бандла потрапляють лише оголошені вами локалі, тому немає завантаження каталогів під час запуску та немає читання файлів під час обробки запиту. Це найважливіше для serverless- та edge-розгортань, де розмір бандла визначає час холодного старту. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md).

- [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)

</Question>
<Question title="Чи можу я мігрувати з `i18next` без переписування обробників?">

Так, і для цього є два шляхи. Ви можете мігрувати контент поступово за допомогою [посібника з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md). Або ви можете повністю зберегти поточний API: [compat-адаптери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) надають точно такий самий API, як `i18next`, але працюють на словниках Intlayer, тож змінюються лише імпорти, а код обробників залишається незмінним.

- [посібник з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md)
- [compat-адаптери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

</Question>
<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

- [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)
- [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md)
- [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md)

</Question>
<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші вихідні файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним із них, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог по одному. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

- [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md)

На фронтенд-стороні того ж проєкту [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) іде ще далі й генерує словники під час збирання з вашого коду JSX, TSX, Vue або Svelte, тож обидві половини застосунку спільно використовують один шар контенту без жодних ключів, які потрібно підтримувати вручну.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md)

</Question>
<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, який його оголошує, вилучення контенту з компонента та запуск build, fill, test, push і pull із палітри команд або окремої вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: те саме розуміння коду в будь-якому редакторі з підтримкою LSP: перехід до визначення, пошук усіх посилань, перегляд перекладеного значення під час наведення, автодоповнення ключів і полів та попередження, коли ключ ніде не оголошено. Він також розпізнає виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`, що допомагає під час міграції.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT, тож асистент відповідає на основі актуальної документації замість здогадок і може сам виконувати команди, як-от `intlayer fill`.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички, такі як `intlayer-config`, `intlayer-cli` та `intlayer-content`, а також по одній для кожного фреймворку, які навчають агента вашого налаштування маршрутизації та типів вузлів контенту.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` позначає жорстко закодовані рядки, а додаткові правила стосуються статичних ключів словників і невикористаного контенту.

</Question>
<Question title="Як Intlayer визначає, якою мовою відповідати?">

За замовчуванням `express-intlayer` читає заголовок `Accept-Language` вхідного запиту й обирає найближчу оголошену локаль, повертаючись до локалі за замовчуванням. Ви можете змінити джерело через `routing.storage`, наприклад на власний заголовок або cookie, встановлений вашим фронтендом, щоб API відповідав мовою, яку користувач справді обрав, а не тією, яку повідомляє його браузер. Див. [довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

</Question>
<Question title="Чи ізольована локаль для кожного запиту?">

Так. Middleware обмежує активну локаль межами запиту, тому два одночасні запити різними мовами ніколи не читають локаль один одного. Саме це робить виклики `t()` та `getIntlayer()` безпечними всередині сервісу без передавання аргументу локалі через кожну функцію.

</Question>
<Question title="Як надсилати транзакційні листи мовою одержувача?">

Оголосіть контент листа у файлі контенту, як і будь-який інший контент, а потім отримайте його через `getIntlayer` для збереженої локалі одержувача замість локалі запиту. Це важливо для фонових задач і черг, де мова належить до запису користувача і немає вхідного запиту, з якого можна прочитати заголовок.

</Question>
<Question title="Як локалізувати повідомлення про помилки API?">

Обгорніть повідомлення в `t()` у місці, де створюється помилка. Активна локаль запиту визначає його значення, тож клієнт отримує повідомлення, яке може відобразити напряму, а вашому фронтенду не потрібен паралельний каталог кодів помилок.

</Question>
<Question title="Чи працює це з наявним застосунком Express та іншими middleware?">

Так. `express-intlayer` є стандартним middleware для Express, тому він поєднується з вашим наявним стеком. Зареєструйте його перед маршрутами, які читають контент, щоб локаль була визначена на момент, коли обробник викликає `t()` або `getIntlayer()`.

</Question>
<Question title="Як автоматично перекласти контент бекенда за допомогою AI?">

Запустіть `npx intlayer fill`, що заповнює відсутні переклади за допомогою обраної вами LLM, використовуючи вашого власного провайдера та API-ключ. Додайте `--git-diff`, щоб перекладати лише контент, змінений у гілці. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

- [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md)
- [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md)

</Question>
<Question title="Чи підтримує Intlayer множину, рід та інтерпольовані значення на сервері?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент залежно від роду](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md) для інтерпольованих значень, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) для тексту листів та [форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) для чисел, дат і валют.

- [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md)
- [контент залежно від роду](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md)
- [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md)
- [форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md)

</Question>
<Question title="Чи отримую я автодоповнення TypeScript на сервері?">

Так. Intlayer генерує типи ваших словників у `./types/intlayer.d.ts`, тому неіснуючий ключ стає помилкою компіляції, а не порожнім рядком під час виконання. Запускайте `npx intlayer test` у CI, щоб збирання падало, коли для оголошеної локалі бракує контенту.

</Question>
<Question title="Чи можуть фронтенд і бекенд використовувати той самий контент?">

Так, і це звичайне налаштування. `express-intlayer` працює разом із `react-intlayer`, `next-intlayer` та `vite-intlayer` на тому самому оголошеному контенті, тож мітка, яка використовується і у відповіді API, і на сторінці, оголошується лише один раз. Див. [як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md).

- [як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md)

</Question>
<Question title="Чи є Intlayer безкоштовним і з відкритим кодом?">

Так, за ліцензією Apache 2.0, включно з комерційним використанням. Хостинговий [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) є необов'язковим платним сервісом, який також можна [розгорнути на власному сервері](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [розгорнути на власному сервері](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)

</Question>

</FAQ>

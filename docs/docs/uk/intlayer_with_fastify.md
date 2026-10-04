---
createdAt: 2025-12-30
updatedAt: 2026-05-31
priority: 9
title: "Fastify i18n - Повний посібник з перекладу вашого застосунку"
description: "Налаштування Intlayer у Fastify: визначення локалі для кожного запиту через плагін, переклад відповідей API й помилок, наскрізна типізація."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Fastify
  - JavaScript
  - Бекенд
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Додано команду init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Ініціалізовано історію"
author: aymericzip
---

# Перекладіть свій бекенд-сайт на Fastify за допомогою Intlayer

`fastify-intlayer` - це потужний плагін інтернаціоналізації (i18n) для додатків Fastify, розроблений для того, щоб зробити ваші бекенд-сервіси доступними в усьому світі, надаючи локалізовані відповіді на основі вподобань клієнта.

> Подивитися [реалізацію пакета на GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer).

## Практичні варіанти використання

- **Відображення помилок бекенда мовою користувача**: Коли виникає помилка, відображення повідомлень рідною мовою користувача покращує розуміння та зменшує роздратування. Це особливо корисно для динамічних повідомлень про помилки, які можуть відображатися в компонентах фронтенду, таких як тости або модальні вікна.
- **Отримання багатомовного контенту**: Для додатків, що витягують контент із бази даних, інтернаціоналізація гарантує, що ви зможете надавати цей контент декількома мовами. Це вкрай важливо для таких платформ, як сайти електронної комерції або системи управління контентом, яким необхідно відображати описи продуктів, статті та інший контент мовою, якій надає перевагу користувач.
- **Відправка багатомовних листів**: Будь то транзакційні листи, маркетингові кампанії чи сповіщення, відправка листів мовою одержувача може значно підвищити залученість та ефективність.
- **Багатомовні пуш-сповіщення**: Для мобільних додатків відправка пуш-сповіщень мовою користувача може покращити взаємодію та лояльність. Цей персоналізований підхід робить сповіщення більш релевантними та такими, що спонукають до дії.
- **Інші види комунікації**: Будь-яка форма комунікації з боку бекенда, така як SMS-повідомлення, системні оповіщення або оновлення інтерфейсу користувача, виграє від використання мови користувача, забезпечуючи ясність та покращуючи загальний досвід користувача.

Інтернаціоналізуючи бекенд, ваш додаток не лише поважає культурні відмінності, а й краще відповідає потребам глобального ринку, що є ключовим кроком у масштабуванні ваших послуг по всьому світу.

## Початок роботи

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Подивитися [шаблон додатка](https://github.com/aymericzip/intlayer-fastify-template) на GitHub.

### Встановлення

Щоб почати використовувати `fastify-intlayer`, встановіть пакет за допомогою npm:

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
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### Налаштування

Налаштуйте параметри інтернаціоналізації, створивши файл `intlayer.config.ts` у корені вашого проєкту:

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

### Оголошення контенту

Створюйте та керуйте оголошеннями контенту для зберігання перекладів:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
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
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваші оголошення контенту можуть бути визначені в будь-якому місці вашого додатка, за умови, що вони включені в каталог `contentDir` (за замовчуванням `./src`). І відповідають розширенню файлу оголошення контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для отримання більш детальної інформації зверніться до [документації з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

- [документації з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)

### Налаштування додатка Fastify

Налаштуйте ваш додаток Fastify для використання `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Завантажити плагін інтернаціоналізації
await fastify.register(intlayer);

// Маршрути
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Сумісність

`fastify-intlayer` повністю сумісний з:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/exports.md) для React-додатків
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/exports.md) для Next.js-додатків
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/exports.md) для Vite-додатків

Він також безшовно працює з будь-яким рішенням для інтернаціоналізації в різних середовищах, включаючи браузери та API-запити. Ви можете налаштувати проміжне ПЗ (middleware) для визначення локалі через заголовки або куки:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інші параметри налаштування
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

За замовчуванням `fastify-intlayer` інтерпретуватиме заголовок `Accept-Language` для визначення вподобаної мови клієнта.

> Для отримання додаткової інформації про налаштування та просунуті теми відвідайте нашу [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [Конфігурація Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

### Налаштування TypeScript

`fastify-intlayer` використовує потужні можливості TypeScript для покращення процесу інтернаціоналізації. Статична типізація TypeScript гарантує, що кожен ключ перекладу врахований, знижуючи ризик відсутності перекладів та покращуючи підтримуваність.

Переконайтеся, що автоматично згенеровані типи (за замовчуванням у ./types/intlayer.d.ts) включені у ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автоматично згенеровані типи
  ],
}
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer VS Code Extension**.

- [Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований попередній перегляд** перекладеного контенту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Більш детальну інформацію про використання розширення можна знайти в [документації розширення Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md).

- [документації розширення Intlayer VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)

### Конфігурація Git

Рекомендується ігнорувати файли, що генеруються Intlayer. Це дозволить вам уникнути їх коміту у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, що генеруються Intlayer
.intlayer

```

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Fastify?">

- **Плагіни `i18next` для Fastify**: бібліотеки часу виконання на основі просторів імен JSON.
- **`Intlayer`**: плагін `fastify-intlayer`, оптимізований під життєвий цикл Fastify, повна типізація TypeScript, AI переклад та єдині словники з фронтендом.

Головна причина інтернаціоналізації бекенду полягає в тому, що значна частина тексту, який бачить користувач, ніколи не проходить через фронтенд: повідомлення про помилки API, транзакційні електронні листи, push-сповіщення, SMS та експорт у PDF. Вони потребують мови одержувача, яка визначається для кожного запиту, а не для всієї сесії.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

- [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md)

</Question>
<Question title="Скільки i18n додає до розміру серверного бандла Fastify?">

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

За замовчуванням `fastify-intlayer` читає заголовок `Accept-Language` вхідного запиту й обирає найближчу оголошену локаль, повертаючись до локалі за замовчуванням. Ви можете змінити джерело через `routing.storage`, наприклад на власний заголовок або cookie, встановлений вашим фронтендом, щоб API відповідав мовою, яку користувач справді обрав, а не тією, яку повідомляє його браузер. Див. [довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

- [довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

</Question>
<Question title="Чи ізольована локаль для кожного запиту?">

Так. Плагін обмежує активну локаль межами запиту, тому два одночасні запити різними мовами ніколи не читають локаль один одного. Саме це робить виклики `t()` та `getIntlayer()` безпечними всередині сервісу без передавання аргументу локалі через кожну функцію.

</Question>
<Question title="Як надсилати транзакційні листи мовою одержувача?">

Оголосіть контент листа у файлі контенту, як і будь-який інший контент, а потім отримайте його через `getIntlayer` для збереженої локалі одержувача замість локалі запиту. Це важливо для фонових задач і черг, де мова належить до запису користувача і немає вхідного запиту, з якого можна прочитати заголовок.

</Question>
<Question title="Як локалізувати повідомлення про помилки API?">

Обгорніть повідомлення в `t()` у місці, де створюється помилка. Активна локаль запиту визначає його значення, тож клієнт отримує повідомлення, яке може відобразити напряму, а вашому фронтенду не потрібен паралельний каталог кодів помилок.

</Question>
<Question title="Чи працює це з життєвим циклом плагінів та інкапсуляцією Fastify?">

Так. `fastify-intlayer` реєструється як стандартний плагін Fastify, тому дотримується звичайних правил інкапсуляції. Зареєструйте його на кореневому рівні або всередині області, якій він потрібен, перед маршрутами, які читають контент.

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

Так, і це звичайне налаштування. `fastify-intlayer` працює разом із `react-intlayer`, `next-intlayer` та `vite-intlayer` на тому самому оголошеному контенті, тож мітка, яка використовується і у відповіді API, і на сторінці, оголошується лише один раз. Див. [як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md).

- [як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md)

</Question>
<Question title="Чи є Intlayer безкоштовним і з відкритим кодом?">

Так, за ліцензією Apache 2.0, включно з комерційним використанням. Хостинговий [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) є необов'язковим платним сервісом, який також можна [розгорнути на власному сервері](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [розгорнути на власному сервері](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)

</Question>

</FAQ>
